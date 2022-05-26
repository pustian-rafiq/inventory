import React, { useState, useEffect } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import AddProduct from "./ProductSearch/AddProduct";
import AddSupplier from "./SupplierSearch/AddSupplier";
import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addPurchaseReturn,
  getPurchaseReturnLists,
} from "../../../redux/actions/purchaseReturnActions";
import moment from "moment";
class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("purchaseReturns");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function AddPurchaseReturn(props) {
  // Purchase return state management for local storage
  const [purchaseReturn, setPurchaseReturn] = useState(getDatafromLS());

  // Get this state from child component -- SupplierShowModal
  const date = moment(new Date()).format("YYYY-MM-DD");
  const [getSupplierId, setGetSupplierId] = useState("");
  const [return_date, setReturnDate] = useState(date);

  // Get this state from child component -- ProductShowModal
  const [getProductId, setGetProductId] = useState("");
  const [getProductQty, setGetProductQty] = useState();
  const [getProductStockDetailId, setGetProductStockDetailId] = useState();
  const [getProductCategory, setGetProductCategory] = useState("");
  const [getProductName, setGetProductName] = useState("");
  const [getProductCompany, setGetProductCompany] = useState("");

  // Product section--- input field management state
  const [invoice_no, setInvoiceNo] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [backAmount, setBackAmount] = useState(0);
  const [currentCredit, setCurrentCredit] = useState(0);

  // Declare state for deleting products from localstorage
  const [selectId, setSelectId] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [isActive, setIsActive] = useState(null);

  // Fetch purchase return data from api
  const purchasereturnLists = useSelector((state) => state.purchasereturnLists);

  //Product form submit handler
  const handleProductSubmit = (e) => {
    console.log("Submit");
    e.preventDefault();
    var product = getProductId;
    var productStockDetail = getProductStockDetailId;
    var productName = getProductName;
    var productCompany = getProductCompany;
    var productCategory = getProductCategory;

    // creating an object for product detials
    let productDetails = {
      productName,
      productCategory,
      productCompany,
      quantity,
      unitPrice,
      total,
      product,
      productStockDetail
    };
    // Set product details
    if (!getProductId) {
      toast.warn("Please select a product!")
    } else if (!quantity || !unitPrice) {
      toast.warn("Quantity or unit price must not be empty!")
    } else {
      setPurchaseReturn([...purchaseReturn, productDetails]);
      setQuantity(0);
      setUnitPrice(0);
      setTotal(0);
    }

  };
  // delete product from Local Storage
  const deleteProduct = (productId) => {
    const filteredProducts = purchaseReturn.filter((element, index) => {
      return element.product !== productId;
    });
    setIsSelect(false)
    setSelectId()
    setPurchaseReturn(filteredProducts);
  };

  // saving product data to local storage
  useEffect(() => {
    localStorage.setItem("purchaseReturns", JSON.stringify(purchaseReturn));
  }, [purchaseReturn]);


  // Select a product for deleting
  const selectProduct = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
      //console.log("If", selectId)
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
      //console.log(selectId)
    }
  }

  // Store grand total and total discount and show in final calculation section
  var totalTaka = 0;
  var i = 0;
  const productData = purchaseReturn.map((data, index) => {
    totalTaka += parseFloat(data.total);
    //netDiscountTaka += parseFloat(data.ppdis_amount);
    if (data) {
      return (
        <tr className="tableStyle" key={data.id}
          style={
            isActive === index ? { background: "green" } : { background: "" }
          }
          onClick={() => selectProduct(index, data.product)}
        >
          <td>{++i}</td>
          <td>{data.productName}</td>
          <td>{data.productCompany}</td>
          <td>{data.productCategory}</td>
          <td>{data.quantity}</td>
          <td>{data.unitPrice}</td>
          <td>{data.total}</td>
          <td onClick={() => deleteProduct(data.product)}>
            <Icon icon={trash} />
          </td>
        </tr>
      );
    } else {
      return <p style={{ background: "red" }}>No data found</p>;
    }
  });

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // Save data into database
  const dataSaveHandler = () => {
    var PurchaseReturnDetails = [];
    for (var pair of purchaseReturn.entries()) {
      var prDetails = {
        product: pair[1].product,
        quantity: pair[1].quantity,
        unit_price: pair[1].unitPrice,
        ut_amount: pair[1].total,
        stockdetail: pair[1].productStockDetail,
      };
      PurchaseReturnDetails.push(prDetails);
    }

    var prDetailsData = {
      invoice_no: invoice_no,
      return_date: return_date,
      supplier: getSupplierId,
      grand_total: totalTaka,
      paid_amount: backAmount,
      curr_credit: currentCredit,

      return_details: PurchaseReturnDetails,
    };

    if (!invoice_no) {
      toast.warn("Invoice no must not be empty!");
    } else if (!backAmount) {
      toast.warn("Back amount must not be empty!");
    } else {
      dispatch(addPurchaseReturn(prDetailsData, headers));
      dispatch(getPurchaseReturnLists(headers));
      localStorage.removeItem("purchaseReturns");
      toast.success("Purchase return successfully");
      props.onHide();
    }
  };

  // Get supplier id and previous due from the child component --- SuppilerShowModal
  const supplierIdHandler = (supplierID) => {
    setGetSupplierId(supplierID);
  };
  // Get product id, name, category  from the child component --- AddProduct
  const productQtyHandler = (productQty) => {
    setGetProductQty(productQty);
  };
  const productIdHandler = (productID) => {
    setGetProductId(productID);
  };
  const productStockDetailHandler = (productStockDetailId) => {
    setGetProductStockDetailId(productStockDetailId);
  };
  const productCategoryHandler = (productCategory) => {
    setGetProductCategory(productCategory);
  };
  const productNameHandler = (productName) => {
    setGetProductName(productName);
  };
  const productCompanyHandler = (productCompany) => {
    setGetProductCompany(productCompany);
  };

  // Invoice handler
  const invoiceHandler = (e) => {
    setInvoiceNo(e.target.value);
    const invoice = e.target.value;
    const format = moment(new Date()).format("DDMMMYY") + "-" + invoice;
    const invoice_no = purchasereturnLists.find(
      (b) => b.invoice_no === format
    );
    if (invoice_no && invoice_no.invoice_no === format) {
      toast.success("This invoice no already exists!");
    }
  };
  // Product input change handler
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
    const qty = e.target.value;
    const total = qty * unitPrice;
    setTotal(total);
    if (getProductQty < qty) {
      toast.warn("Quantity is greater than stock!")
    }
  };

  const unitPriceHandler = (e) => {
    setUnitPrice(e.target.value);
    const uPrice = e.target.value;
    const total = quantity * uPrice;
    setTotal(total);

  };
  const backAmountHandler = (e) => {
    setBackAmount(e.target.value);
    const backAmount = e.target.value;
    const curCredit = totalTaka - backAmount;
    setCurrentCredit(curCredit);
  };
  const closeHandler = () => {
    props.onHide();
    setTotal(0)
    setBackAmount(0)
    setSelectId()
    setIsSelect(false)
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
      // dialogClassName="add-purchase-return-modal"
    >
      <div>
      <Modal.Header style={{cursor: "move",padding:'6px'}} className="background_and_table_header" >
          <div>
            <h4 className="responsive-head">Add Purchase Return</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={closeHandler}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="background_and_table_header">
         
         <div className="custom_modal_inner_content p-4">
          {/* Company Add Form Start Here */}
          <div className="form-horizontal">
            {/* <h4 className="modalHeadTitle">Customer Information</h4> */}
            <div className="container productBox">
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <h4 className="modalHeadTitle">Customer</h4>
                  <div className="row supplierBox">
                    <div className="col-md-12">
                      <div className="row mt-2">
                        <div className="col-md-12 col-lg-12">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">Invoice</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control productInput input-sm"
                                    name="invoice"
                                    value={invoice_no}
                                    onChange={invoiceHandler}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-5 input-group input-group-sm">
                                  <span className="spanTitle">Return Date</span>
                                </div>
                                <div className="col-md-7 input-group input-group-sm">
                                  <input
                                    type="date"
                                    className="form-control productInput"
                                    value={return_date}
                                    onChange={(e) =>
                                      setReturnDate(
                                        moment(e.target.value).format(
                                          "YYYY-MM-DD"
                                        )
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-5 col-lg-6 input-group input-group-sm">
                                  <span className="spanTitle">Grand Total</span>
                                </div>
                                <div className="col-md-7  col-lg-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput"
                                    value={totalTaka}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-2 mb-2">
                        <AddSupplier supplierId={supplierIdHandler} />
                      </div>
                    </div>
                  </div>

                  {/*********************  Product Section Start Here ******************************************/}

                  <h4 className="modalHeadTitle">Product</h4>
                  <form onSubmit={handleProductSubmit}>
                    <div className="row supplierBox">
                      <div className="col-md-12">
                        <div className="row mt-2">
                          <div className="col-md-12 col-lg-8">
                            <div className="row mt-2">
                              <AddProduct
                                productQty={productQtyHandler}
                                productName={productNameHandler}
                                productCompany={productCompanyHandler}
                                productCategory={productCategoryHandler}
                                productId={productIdHandler}
                                productStockDetail={productStockDetailHandler}
                              />
                            </div>
                            <div className="row mt-2 mb-2">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-6 input-group input-group-sm">
                                    <span className="spanTitle">Quantity</span>
                                  </div>
                                  <div className="col-md-6 input-group input-group-sm">
                                    <input
                                      type="number"
                                      min={0}
                                      className="form-control productInput input-sm"
                                      value={quantity}
                                      onChange={quantityHandler}
                                      name="quantity"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-6 input-group input-group-sm">
                                    <span className="spanTitle">
                                      Total PO Qty.
                                    </span>
                                  </div>
                                  <div className="col-md-6 input-group input-group-sm">
                                    <input
                                      type="number"
                                      className="form-control productInput"
                                      value={getProductQty}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2 mb-2">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-6 input-group input-group-sm">
                                    <span className="spanTitle">U.Price</span>
                                  </div>
                                  <div className="col-md-6 input-group input-group-sm">
                                    <input
                                      type="number"
                                      min={0}
                                      className="form-control productInput input-sm"
                                      name="unit_price"
                                      value={unitPrice}
                                      onChange={unitPriceHandler}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-6 input-group input-group-sm">
                                    <span className="spanTitle">Total</span>
                                  </div>
                                  <div className="col-md-6 input-group input-group-sm">
                                    <input
                                      type="number"
                                      className="form-control productInput"
                                      value={total}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/************************ Right Column *******************************/}
                          <div className="col-md-4 col-lg-4">
                            <div className="row mt-1">
                              <div className="col-md-2 col-lg-2"></div>
                              <div className="col-md-10 col-lg-10">
                                <div className="row">
                                  <div className="col-md-12 col-lg-12 input-group input-group-sm">
                                    <span className="spanTitle mr-2">
                                      Stock
                                    </span>
                                    <input
                                      type="number"
                                      className="form-control productInput"
                                    // value={grandTotal}
                                    // readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>


                          <div className="responsive-btn mx-auto">
                            <div className="row mt-1">
                              <div className="col-md-2 col-lg-2"></div>
                              <div className="col-md-10 col-lg-10">
                                <div className="row">
                                  <div className="col-md-2"></div>
                                  <div className="col-md-10">
                                    <Button
                                      type="submit"
                                      className="productBtn bg-info text-white"
                                    >
                                      Add
                                    </Button>
                                  </div>

                                </div>
                              </div>
                            </div>
                            <div className="row mt-1">
                              <div className="col-md-2 col-lg-2"></div>
                              <div className="col-md-10 col-lg-10">
                                <div className="row">
                                  <div className="col-md-2"></div>
                                  <div className="col-md-10">
                                    <Button className="productBtn bg-danger text-white"
                                      onClick={() => deleteProduct(selectId)}
                                    >
                                      Remove
                                    </Button>
                                  </div>

                                </div>
                              </div>
                            </div>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* Product Section end Here*/}
                </div>
              </div>

              {/* Bottom Section */}

              <div className="row pt-2">
                <div className="col-md-12 col-lg-8 supplierBox">
                  <div
                    className="tableContainer table-responsive"
                    style={{ height: "170px" }}
                  >
                    <table className="table">
                      <thead
                        style={{ position: "sticky", top: 0 }}
                        className="thead-dark"
                      >
                        <tr style={{ height: "5px", fontSize: "12px" }}>
                          <th className="header" scope="col">
                            SN
                          </th>
                          <th className="header" scope="col">
                            Model
                          </th>
                          <th className="header" scope="col">
                            Company
                          </th>
                          <th className="header" scope="col">
                            Category
                          </th>
                          <th className="header" scope="col">
                            Qty
                          </th>
                          <th className="header" scope="col">
                            U.Price
                          </th>
                          <th className="header" scope="col">
                            Total
                          </th>
                          <th className="header" scope="col">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>{productData}</tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4 supplierBox pt-3">
                  <div className="row mb-2">
                    <div className="col-md-4 col-lg-5 input-group input-group-sm">
                      <span className="spanTitle" htmlFor="warningQty">
                        Net Total
                      </span>
                    </div>
                    <div className="col-md-8 col-lg-7 input-group input-group-sm">
                      <input
                        type="number"
                        className="form-control productInput input-sm"
                        id="warningQty"
                        value={totalTaka}
                        readOnly
                        name="net_total"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-4 col-lg-5 input-group input-group-sm">
                      <span className="spanTitle" htmlFor="warningQty">
                        Back Amount
                      </span>
                    </div>
                    <div className="col-md-8 col-lg-7 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        id="warningQty"
                        value={backAmount}
                        onChange={backAmountHandler}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-4 col-lg-5 input-group input-group-sm">
                      <span className="spanTitle" htmlFor="warningQty">
                        Curr. Credit
                      </span>
                    </div>
                    <div className="col-md-8 col-lg-7 input-group input-group-sm">
                      <input
                        type="number"
                        className="form-control productInput input-sm"
                        id="warningQty"
                        value={currentCredit}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Section */}

            {/* Product Section End Here */}

            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 pull-right responsive-btn">
                  <Button className="saveCloseBtn border border-none closebtn"  onClick={closeHandler}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="saveCloseBtn border border-none"
                    onClick={dataSaveHandler}
                  >
                    Return
                  </Button>
                </div>
              </div>
            </div>

          </div>
          </div>
          {/* Company Add Form End Here */}
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default AddPurchaseReturn;
