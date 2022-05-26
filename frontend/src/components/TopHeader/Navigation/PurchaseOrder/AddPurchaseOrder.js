import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addPurchaseOrder,
  getPurchaseOrderLists,
} from "../../../../redux/actions/purchaseOrderActions";
import ProductShowModal from "../../Navigation/PurchaseOrder/SearchProduct/ProductShowModal";
import SupplierShowModal from "./SearchSupplier/SupplierShowModal";

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
  const data = localStorage.getItem("products");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function AddPurchaseOrder(props) {
  // Product details state management
  const [products, setProducts] = useState(getDatafromLS());

  // Get this state from child component -- SupplierShowModal
  const [getSupplierId, setGetSupplierId] = useState("");
  const [getPrevDue, setGetPrevDue] = useState("");
  const [challanNo, setChallanNo] = useState("");

  // Get this state from child component -- ProductShowModal
  const [getProductId, setGetProductId] = useState("");
  const [getPrevStock, setGetPrevStock] = useState(0);
  const [getProductCategory, setGetProductCategory] = useState("");
  const [getProductName, setGetProductName] = useState("");

  // Product section--- input field management state
  const [quantity, setQuantity] = useState(0);
  const [mrp_rate, setMrp] = useState(0);
  const [sales_rate, setSalesRate] = useState(0);
  const [ppdis_per, setPpdiscount] = useState(0);
  const [ppdis_amount, setTotalDiscount] = useState(0);
  const [total_amount, setTotalAmount] = useState(0);
  const [purchase_rate, setPurchaseRate] = useState(0);

  // Final calculation state management
  const [grandTotal, setGrandTotal] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [flatDiscountAmount, setFlatDiscountAmount] = useState(0);
  const [netDiscount, setNetDiscount] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [currentDue, setCurrentDue] = useState(0);

  //Product form submit handler
  const handleProductSubmit = (e) => {
    e.preventDefault();
    var product = getProductId;
    var productName = getProductName;
    var productCategory = getProductCategory;

    // creating an object for product detials
    let productDetails = {
      productName,
      productCategory,
      quantity,
      purchase_rate,
      total_amount,
      ppdis_per,
      ppdis_amount,
      mrp_rate,
      sales_rate,
      product,
    };
    // Set product details
    if (product) {
      setProducts([...products, productDetails]);
      setQuantity(0);
      setMrp(0);
      setSalesRate(0);
      setPpdiscount(0);
      setPurchaseRate(0);
      setTotalAmount(0);
      setTotalDiscount(0);
    } else {
      toast.warn("Please select a product");
    }
  };

  // Get supplier id and previous due from the child component --- SuppilerShowModal
  const supplierIdHandler = (suplierID) => {
    setGetSupplierId(suplierID);
  };
  const supplierPrevDueHandler = (prevDue) => {
    setGetPrevDue(prevDue);
    
  };

  // Get product id, name, category and stock from the child component --- ProductShowModal
  const productIdHandler = (productID) => {
    setGetProductId(productID);
  };
  const productStockHandler = (productStock) => {
    setGetPrevStock(productStock);
  };
  const productCategoryHandler = (productCategory) => {
    setGetProductCategory(productCategory);
  };
  const productNameuHandler = (productName) => {
    setGetProductName(productName);
  };
  // Product input change handler
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
    const qty = e.target.value;
    const tAmount = purchase_rate * qty;
    setTotalAmount(tAmount);
  };

  const ppDiscounthandler = (e) => {
    setPpdiscount(e.target.value);
    const ppdiscount = e.target.value;
    const tDiscount = (ppdiscount / 100) * mrp_rate;
    const purrate = mrp_rate - tDiscount;
    const tAmount = purrate * quantity;
    setTotalAmount(tAmount);
    setPurchaseRate(purrate);
    setTotalDiscount(tDiscount);
  };

  const mrphandler = (e) => {
    setMrp(e.target.value);
    // setTotalAmount(purchaseRate * quantity)
  };
  const totalAmountHandler = (e) => {
    setTotalAmount(e.target.value);
  };

  const flatDiscountHandler = (e) => {
    setFlatDiscount(e.target.value);
    const flat_discount = e.target.value;
    const fdicountAmount = (flat_discount / 100) * totalTaka;
    const netTotal = totalTaka - fdicountAmount;
    setNetTotal(netTotal);
    setFlatDiscountAmount(fdicountAmount);
  };
  const paymentHandler = (e) => {
    setPaymentAmount(e.target.value);

    const payment = e.target.value;
    const currentDue = netTotal - payment;

    setCurrentDue(currentDue);
  };

  // delete product from Local Storage
  const deleteProduct = (productId) => {
    const filteredProducts = products.filter((element, index) => {
      //return element.productId !== productId
      return element.product === productId;
    });
    setProducts(filteredProducts);
  };

  // saving product data to local storage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Store grand total and total discount and show in final calculation section
  var totalTaka = parseFloat(grandTotal);
  var netDiscountTaka = parseFloat(netDiscount);

  //console.log(totalTaka);
  const productData = products.map((data) => {
    totalTaka += parseFloat(data.total_amount);
    netDiscountTaka += parseFloat(data.ppdis_amount);
    if (data) {
      return (
        <tr style={{ height: "5px", fontSize: "12px" }} key={data.id}>
          <td>{data.product}</td>
          <td>{data.productName}</td>
          <td>{data.productCategory}</td>
          <td>{data.quantity}</td>
          <td>{data.mrp_rate}</td>
          <td>{data.ppdis_per}</td>
          <td>{data.ppdis_amount}</td>
          <td>{data.purchase_rate}</td>
          <td>{data.total_amount}</td>
          <td onClick={() => deleteProduct(getProductId)}>
            <Icon icon={trash} />
          </td>
        </tr>
      );
    } else {
      return <p style={{ background: "red" }}>No data found</p>;
    }
  });

  const dispatch = useDispatch();

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dataSaveHandler = () => {
    var ProductOrderDetails = [];
    for (var pair of products.entries()) {
      var ppDetails = {
        product: pair[1].product,
        quantity: pair[1].quantity,
        purchase_rate: pair[1].purchase_rate,
        mrp_rate: pair[1].mrp_rate,
        ppdis_per: pair[1].ppdis_per,
        ppdis_amount: pair[1].ppdis_amount,
        total_amount: pair[1].total_amount,
        sales_rate: pair[1].sales_rate,
      };
      ProductOrderDetails.push(ppDetails);
    }

    var ppDetailsData = {
      challan_no: challanNo,
      supplier: getSupplierId,
      grand_total: totalTaka,
      flat_discount: flatDiscount,
      net_total: netTotal,
      pay_amount: paymentAmount,
      payment_due: currentDue,
      net_discount: netDiscountTaka,

      ProductOrderDetails: ProductOrderDetails,
    };
    if (challanNo === null) {
    } else {
      dispatch(addPurchaseOrder(ppDetailsData, headers, props.onHide));
    }
  };
  //When close addpurchase modal set the input field to zero
  const closeHandler = () => {
    setGetPrevDue(0);
    setGetPrevStock(0);
    setQuantity(0);
    setMrp(0);
    setSalesRate(0);
    setPpdiscount(0);
    setPurchaseRate(0);
    setTotalAmount(0);
    setTotalDiscount(0);
    props.onHide();
  };
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
      dialogClassName="add-modal"
    >
      <div>
        <Modal.Header
          style={{cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="modalHeadTitle">Add Purchase Order</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={closeHandler}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body  className="background_and_table_header">
          <div className="custom_modal_inner_content ">
            {/* Company Add Form Start Here */}
            <div className="form-horizontal add_product_container">
              <div className="container productBox">
                <div className="row productBoxInner1">
                  {/* left box  */}
                  <div className="col-md-12 col-lg-8">
                    <h4 className="modalHeadTitle">Supplier</h4>
                    <form>
                      <div className="row supplierBox">
                        <div className="col-md-12">
                          <div className="row mt-2">
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4 input-group input-group-sm">
                                  <span className="spanTitle">Pur. Date</span>
                                </div>
                                <div className="col-md-8 input-group input-group-sm">
                                  <input
                                    type="date"
                                    className="form-control productInput input-sm"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4 input-group input-group-sm">
                                  <span className="spanTitle">Challan No</span>
                                </div>
                                <div className="col-md-8 input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control productInput"
                                    placeholder="Enter challan no"
                                    value={challanNo}
                                    onChange={(e) =>
                                      setChallanNo(e.target.value)
                                    }
                                    name="challan_no"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-md-2">
                              <div className="input-group input-group-sm">
                                <span className="spanTitle">Supplier</span>
                              </div>
                            </div>
                            <div className="col-md-10">
                              <SupplierShowModal
                                supplierId={supplierIdHandler}
                                supplierPrevDue={supplierPrevDueHandler}
                              />
                            </div>
                          </div>
                          <div className="row mt-2 mb-2">
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4 input-group input-group-sm">
                                  <span className="spanTitle">Prev. Due</span>
                                </div>
                                <div className="col-md-8 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput input-sm"
                                    value={parseFloat(getPrevDue).toFixed(3)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    {/*********************  Product Section Start Here ******************************************/}

                    <h4 className="modalHeadTitle">Product</h4>
                    <form onSubmit={handleProductSubmit}>
                      <div className="row supplierBox">
                        <div className="col-md-12">
                          <div className="row mt-2">
                            <div className="col-md-2">
                              <div className="input-group input-group-sm">
                                <span className="spanTitle">Product</span>
                              </div>
                            </div>
                            <div className="col-md-10">
                              <div className="row">
                                <div className="col-md-7">
                                  {/* Product Add Component */}
                                  <ProductShowModal
                                    productName={productNameuHandler}
                                    productCategory={productCategoryHandler}
                                    productId={productIdHandler}
                                    productStock={productStockHandler}
                                  />
                                </div>
                                <div className="col-md-5">
                                  <div className="row">
                                    <div className="col-md-6 input-group input-group-sm">
                                      <span className="spanTitle">
                                        Prev. Stock
                                      </span>
                                    </div>
                                    <div className="col-md-6 input-group input-group-sm">
                                      <input
                                        type="text"
                                        className="form-control productInput input-sm"
                                        value={getPrevStock}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2 mb-2">
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">Quantity</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    min={0}
                                    className="form-control productInput input-sm"
                                    required
                                    onChange={quantityHandler}
                                    value={quantity}
                                    name="quantity"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">MRP Rate</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    min={0}
                                    className="form-control productInput"
                                    required
                                    onChange={mrphandler}
                                    value={parseFloat(mrp_rate)}
                                    name="mrp_rate"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">Total Amt</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control productInput"
                                    value={parseFloat(total_amount).toFixed(3)}
                                    readOnly
                                    onChange={totalAmountHandler}
                                    name="total_amount"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2 mb-2">
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">Sales Rate</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    min={0}
                                    className="form-control productInput input-sm"
                                    required
                                    onChange={(e) =>
                                      setSalesRate(e.target.value)
                                    }
                                    value={parseFloat(sales_rate)}
                                    name="sales_rate"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">Pur. Rate</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control productInput"
                                    value={parseFloat(purchase_rate).toFixed(3)}
                                    readOnly
                                    name="purchase_rate"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2 mb-2">
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">PP DIS</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    min={0}
                                    className="form-control productInput input-sm"
                                    required
                                    onChange={ppDiscounthandler}
                                    value={parseFloat(ppdis_per)}
                                    name="ppdis_per"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">%</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput"
                                    value={parseFloat(ppdis_amount).toFixed(3)}
                                    readOnly
                                    //onChange={tDiscountHandler}
                                    name="ppdis_amount"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <Button type="submit" className="productBtn">
                                    Add
                                  </Button>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <Button className="productBtn">Remove</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* Product Section end Here*/}
                  </div>

                  {/* right box  */}
                  <div className="col-md-12 col-lg-4 supplierBox">
                    <div className="tableContainer table-responsive">
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
                              Name
                            </th>
                            <th className="header" scope="col">
                              Bar Code
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ height: "5px", fontSize: "12px" }}>
                            <td>1</td>
                            <td>Banana</td>
                            <td>100</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <form>
                        <div className="row mb-2">
                          <div className="col-md-4 col-lg-4 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              G.Total
                            </span>
                          </div>
                          <div className="col-md-8 col-lg-8 input-group input-group-sm">
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              id="warningQty"
                              readOnly
                              value={parseFloat(totalTaka).toFixed(3)}
                              onChange={(e) => setGrandTotal(e.target.value)}
                              name="grand_total"
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-4 col-lg-4 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Flat Dis.
                            </span>
                          </div>
                          <div className="col-md-8 col-lg-8 input-group input-group-sm">
                            <input
                              type="number"
                              min={0}
                              className="form-control productInput input-sm"
                              value={parseFloat(flatDiscount)}
                              onChange={flatDiscountHandler}
                              name="td_per"
                            />
                            <span className="spanTitle"> % </span>
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              id="warningQty"
                              value={parseFloat(flatDiscountAmount).toFixed(3)}
                              name="flat_discount"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-4 col-lg-4 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Net Dis
                            </span>
                          </div>
                          <div className="col-md-8 col-lg-8 input-group input-group-sm">
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              id="warningQty"
                              readOnly
                              value={parseFloat(netDiscountTaka).toFixed(3)}
                              onChange={(e) => setNetDiscount(e.target.value)}
                              name="net_discount"
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-4 col-lg-4 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Net Total
                            </span>
                          </div>
                          <div className="col-md-8 col-lg-8 input-group input-group-sm">
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              id="warningQty"
                              value={netTotal}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-4 col-lg-4 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Pay Amt.
                            </span>
                          </div>
                          <div className="col-md-8 col-lg-8 input-group input-group-sm">
                            <input
                              type="number"
                              min={0}
                              className="form-control productInput input-sm"
                              id="warningQty"
                              onChange={paymentHandler}
                              name="pay_amount"
                              value={paymentAmount}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-4 col-lg-4 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Curr Due
                            </span>
                          </div>
                          <div className="col-md-8 col-lg-8 input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              id="warningQty"
                              value={currentDue}
                              name="payment_due"
                              readOnly
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="row mt-2 productBoxInner2">
                  <div className="col-md-12 supplierBox">
                    <div
                      className="tableContainer table-responsive"
                      style={{ height: "300px" }}
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
                              Name
                            </th>
                            <th className="header" scope="col">
                              Category
                            </th>
                            <th className="header" scope="col">
                              QTY
                            </th>
                            <th className="header" scope="col">
                              MRP
                            </th>
                            <th className="header" scope="col">
                              Dis(%)
                            </th>
                            <th className="header" scope="col">
                              D.Amt
                            </th>
                            <th className="header" scope="col">
                              P.Rate
                            </th>
                            <th className="header" scope="col">
                              Total
                            </th>
                            <th className="header" scope="col">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Show Product */}
                          {productData}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* close and save  */}
              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right">
                    <Button className="saveCloseBtn" onClick={props.onHide}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="saveCloseBtn"
                      onClick={dataSaveHandler}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default AddPurchaseOrder;
