/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { addPurchaseOrder } from "../../../redux/actions/purchaseOrderActions";
import ProductShowModal from "./SearchProduct/ProductShowModal";
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

const AddPurchaseOrder = (props) => {
  // Product details state management
  const [products, setProducts] = useState(getDatafromLS());
  const [productName, setProductName] = useState("")
  const [productId, setProductId] = useState("")
  const [productCode, setProductCode] = useState("")
  const [productCategory, setProductCategory] = useState("")

  const date = moment(new Date()).format("YYYY-MM-DD");
  // Get this state from child component -- SupplierShowModal
  const [getSupplierId, setGetSupplierId] = useState("");
  const [getSupplierName, setGetSupplierName] = useState("");
  const [getSupplierCode, setGetSupplierCode] = useState("");
  const [getSupplierAddress, setGetSupplierAddress] = useState("");
  const [getSupplierCN, setGetSupplierCN] = useState("");
  const [getSupplierCP, setGetSupplierCP] = useState("");
  const [getSupplierDue, setGetSupplierDue] = useState(0);
  const [challanNo, setChallanNo] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(date);

  // Get this state from child component -- ProductShowModal
  //const [getProductId, setGetProductId] = useState("");
  //const [getProductName, setGetProductName] = useState("");
  const [getPrevStock, setGetPrevStock] = useState("");
  //const [getProductCategory, setGetProductCategory] = useState("");

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
  // const [netTotal, setNetTotal] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);


  // Declare state for deleting products from localstorage
  const [selectId, setSelectId] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [isActive, setIsActive] = useState(null);

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // product handler final
  const productHandler = (id, code, name, category) => {
    setProductName(name);
    setProductCode(code);
    setProductId(id)
    setProductCategory(category)
  };

  const dispatch = useDispatch();
  //Product form submit handler
  const handleProductSubmit = (e) => {
    e.preventDefault();
    var product = productId;
    var name = productName;
    var category = productCategory;
    // creating an object for product detials
    let productDetails = {
      name,
      category,
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
    if (!productId) {
      toast.warn("Product must be selected!");
    } else {
      // set null all calculated field
      reset();
      setProducts([...products, productDetails]);
      setQuantity(0);
      setMrp(0);
      setSalesRate(0);
      setPpdiscount(0);
      setPurchaseRate(0);
      setTotalAmount(0);
      setTotalDiscount(0);
      setProductCode("")
      setProductName("")
    }
  };

  // Select a product for deleting
  const selectProduct = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }
  };
  // delete product from Local Storage using product id
  const deleteProduct = (productId) => {
    const filteredProducts = products.filter((element) => {
      reset();
      return element.product !== productId;
    });
    setIsActive(null)
    setIsSelect(!isSelect)
    setProducts(filteredProducts);
  };
  // Store grand total and total discount and show in final calculation section
  var grandTotalTaka = parseFloat(grandTotal);
  var netDiscountTaka = parseFloat(netDiscount);
  var i = 0;

  const productData = products.map((data, index) => {
    grandTotalTaka += parseFloat(data.total_amount);
    netDiscountTaka += parseFloat(data.ppdis_amount);

    if (data) {
      return (
        <tr
          className="tableStyle"
          key={data.product}
          style={
            isActive === index
              ? { background: "green", height: "5px", fontSize: "12px" }
              : { background: "", height: "5px", fontSize: "12px" }
          }
          onClick={() => selectProduct(index, data.product)}
        >
          <td>{++i}</td>
          <td>{data.name}</td>
          <td>{data.category}</td>
          <td>{data.quantity}</td>
          <td>{data.mrp_rate}</td>
          <td>{data.ppdis_per}</td>
          <td>{data.ppdis_amount.toFixed(2)}</td>
          <td>{data.purchase_rate.toFixed(2)}</td>
          <td>{data.total_amount}</td>
          <td onClick={() => deleteProduct(data.product)}>
            <Icon icon={trash} />
          </td>
        </tr>
      );
    } else {
      return <p style={{ background: "red" }}>No data found</p>;
    }
  });
  const [netTotal, setNetTotal] = useState(grandTotalTaka);
  const [currentDue, setCurrentDue] = useState(grandTotalTaka);
  // Fetch credit sales data from api
  const purchaseOrderLists = useSelector((state) => state.purchaseorders);
  const { product_list } = useSelector((state) => state.products);

  // Format challan no for uniqueness
  const formatChallan = moment(new Date()).format("DDMMMYY") + "-" + challanNo;
  const challan = purchaseOrderLists.find(
    (b) => b.challan_no === formatChallan
  );

  // Get supplier information from the child component --- SuppilerShowModal
  const supplierHandler = (
    suplierID,
    name,
    code,
    due,
    address,
    contact_no,
    contact_person
    //create_date
  ) => {
    setGetSupplierId(suplierID);
    setGetSupplierName(name);
    setGetSupplierCode(code)
    setGetSupplierDue(due)
    setGetSupplierAddress(address);
    setGetSupplierCN(contact_no);
    setGetSupplierCP(contact_person);
  };
// Challan no handler 
  const challanHandler = (e) => {
    setChallanNo(e.target.value);
    const challan = e.target.value;
    const challanFormat = moment(new Date()).format("DDMMMYY") + "-" + challan;
    const getChallan = purchaseOrderLists.find(
      (b) => b.challan_no === challanFormat
    );
    if (getChallan && getChallan.challan_no === challanFormat) {
      toast.success("This challan no already exists!");
    }
  };

 
  // Product input change handler
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
    const qty = e.target.value;
    const tAmount = purchase_rate * qty;
    setTotalAmount(tAmount);
  };

  // Per product discount handler
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
  // Per product mrp handler
  const mrphandler = (e) => {
    setMrp(e.target.value);
    const mrp = e.target.value;
    const discount = (mrp * ppdis_per) / 100;
    const purchseRate = mrp - discount;
    const total = purchseRate * quantity;
    setTotalDiscount(discount);
    setPurchaseRate(purchseRate);
    setTotalAmount(total);
  };
  // Total amount handler
  const totalAmountHandler = (e) => {
    setTotalAmount(e.target.value);
  };
  // Flat discount handler
  const flatDiscountHandler = (e) => {
    setFlatDiscount(e.target.value);
    const flat_discount = e.target.value;
    const fdicountAmount = (flat_discount / 100) * grandTotalTaka;
    const netTotal = grandTotalTaka - fdicountAmount;
    const currentDue = netTotal - paymentAmount;

    setCurrentDue(currentDue)
    setNetTotal(netTotal);
    setFlatDiscountAmount(fdicountAmount);
    setNetDiscount(fdicountAmount);
  };
  // Payment handler handler
  const paymentHandler = (e) => {
    setPaymentAmount(e.target.value);
    const payment = e.target.value;
    const currentDue = grandTotalTaka - payment - flatDiscountAmount;
    setCurrentDue(currentDue);
  };

  // saving product data to local storage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Add purchaseorder data is saved into database
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
    //console.log("purchaseDate", purchaseDate);

    var ppDetailsData = {
      order_date: purchaseDate,
      challan_no: moment(purchaseDate).format("DDMMMYY") + "-" + challanNo,
      supplier: getSupplierId,
      address: getSupplierAddress,
      supplier_name: getSupplierName,
      contact: getSupplierCN,
      contact_person: getSupplierCP,
      // create_date: getSupplierCD,
      grand_total: grandTotalTaka,
      flat_discount: flatDiscount,
      net_total: netTotal ? netTotal : grandTotalTaka,
      pay_amount: paymentAmount,
      payment_due: currentDue,
      net_discount: netDiscountTaka,
      ProductOrderDetails: ProductOrderDetails,
    };

    if (!challanNo) {
      toast.warn("Please enter challan no!");
    } else if (challan && challan.challan_no == formatChallan) {
      toast.warn("This challan no already exists!");
    } else if (!getSupplierId) {
      toast.warn("Please select a customer!");
    } else {
      dispatch(addPurchaseOrder(ppDetailsData, headers, props.onHide));
      toast.success("Purchase order is adding...");
      setProducts([]);
      setGetSupplierDue(0)
      setGetSupplierCode("")
      setGetSupplierName("")
      setChallanNo("")
      reset()
      localStorage.removeItem("products");

    }
  };

  // reset addpurchase order component
  const reset = () => {
    grandTotalTaka = 0;
    //setGrandTotal("")
    setNetTotal(0)
    setCurrentDue(0)
    setFlatDiscount(0)
    setFlatDiscountAmount(0)
    setPaymentAmount(0)

  }
  return (
    <Modal
      {...props}
      size="lg"
      // eslint-disable-next-line jsx-a11y/aria-props
      aria-spanledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
      dialogClassName="add-modal"
    >
      <div>
        <Modal.Header
          style={{ cursor: "move", padding: "6px" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head">Add Purchase Order</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={props.onHide}
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
                  <div className="col-md-12 col-lg-8">
                    <h4 className="modalHeadTitle">Supplier</h4>
                    <form>
                      <div className="row supplierBox">
                        <div className="col-md-12">
                          <div className="row mt-2">
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4 input-group input-group-sm">
                                  <span className="sapnTitle">Pur. Date</span>
                                </div>
                                <div className="col-md-8 input-group input-group-sm">
                                  <input
                                    type="date"
                                    className="form-control productInput input-sm"
                                    value={purchaseDate}
                                    onChange={(e) =>
                                      setPurchaseDate(e.target.value)
                                    }
                                    name="order_date"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 responsive-challan ">
                              <div className="row">
                                <div className="col-md-4 input-group input-group-sm">
                                  <span className="sapnTitle">Challan No</span>
                                </div>
                                <div className="col-md-8 input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control productInput"
                                    placeholder="Enter challan no"
                                    value={challanNo}
                                    onChange={challanHandler}
                                    name="challan_no"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-md-2">
                              <div className="input-group input-group-sm">
                                <span className="sapnTitle">Supplier</span>
                              </div>
                            </div>
                            <div className="col-md-10">
                              <SupplierShowModal
                                supplierHandler={supplierHandler}
                                name={getSupplierName}
                                code={getSupplierCode}
                              />
                            </div>
                          </div>
                          <div className="row mt-2 mb-2">
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4 input-group input-group-sm">
                                  <span className="sapnTitle">Prev. Due</span>
                                </div>
                                <div className="col-md-8 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput input-sm"
                                    value={getSupplierDue}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-12 col-lg-4 supplierBox">
                    <div className="row">
                      <div
                        className="tableContainer table-responsive"
                        style={{ height: "150px" }}
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
                    </div>
                  </div>
                </div>
                {/*********************  Product Section Start Here **********************/}

                <h4 className="modalHeadTitle">Product</h4>
                <form onSubmit={handleProductSubmit}>
                  <div className="row supplierBox">
                    <div className="col-md-12">
                      <div className="row mt-2">
                        <div className="col-md-8">
                          <div className="row">
                            <div className="col-md-2">
                              <div className="input-group input-group-sm">
                                <span className="sapnTitle">Product</span>
                              </div>
                            </div>
                            <div className="col-md-10">
                              <div className="row">
                                <div className="col-md-12">
                                  {/* Product Add Component */}
                                  <ProductShowModal
                                    //productName={productNameuHandler}
                                    //productCategory={productCategoryHandler}
                                    //productId={productIdHandler}
                                    //productStock={productStockHandler}
                                    name={productName}
                                    code={productCode}
                                    productHandler={productHandler}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-md-4 input-group input-group-sm">
                              <span className="sapnTitle">Prev. Stock</span>
                            </div>
                            <div className="col-md-8 input-group input-group-sm">
                              <input
                                type="number"
                                className="form-control productInput input-sm"
                                value={product_list.stock}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-2 mb-2">
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-md-4 input-group input-group-sm">
                              <span className="sapnTitle">Quantity</span>
                            </div>
                            <div className="col-md-8 input-group input-group-sm">
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
                            <div className="col-md-4 input-group input-group-sm">
                              <span className="sapnTitle">MRP Rate</span>
                            </div>
                            <div className="col-md-8 input-group input-group-sm">
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
                            <div className="col-md-4 input-group input-group-sm">
                              <span className="sapnTitle">Total Amt</span>
                            </div>
                            <div className="col-md-8 input-group input-group-sm">
                              <input
                                type="number"
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
                            <div className="col-md-4 input-group input-group-sm">
                              <span className="sapnTitle">Sales Rate</span>
                            </div>
                            <div className="col-md-8 input-group input-group-sm">
                              <input
                                type="number"
                                min={0}
                                className="form-control productInput input-sm"
                                required
                                onChange={(e) => setSalesRate(e.target.value)}
                                value={parseFloat(sales_rate)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-md-4 input-group input-group-sm">
                              <span className="sapnTitle">Pur. Rate</span>
                            </div>
                            <div className="col-md-8 input-group input-group-sm">
                              <input
                                type="number"
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
                            <div className="col-md-4 input-group input-group-sm">
                              <span className="sapnTitle">PP DIS</span>
                            </div>
                            <div className="col-md-8 input-group input-group-sm">
                              <input
                                type="number"
                                min={0}
                                className="form-control productInput input-sm"
                                onChange={ppDiscounthandler}
                                value={ppdis_per}
                                name="ppdis_per"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-md-4 input-group input-group-sm">
                              <span className="sapnTitle">%</span>
                            </div>
                            <div className="col-md-8 input-group input-group-sm">
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
                            <div className="col-md-6 col-6 input-group input-group-sm">
                              <Button
                                type="submit"
                                className="addSlaesBtn bg-info w-100 h-75 border-0 mb-2"
                              >
                                Add
                              </Button>
                            </div>

                            <div className="col-md-6 col-6 input-group input-group-sm">
                              <Button
                                className=" w-100 h-75 border-0 addSlaesBtn bg-danger mb-2"
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
                </form>
                {/* Product Section end Here*/}

                {/* Bottom Section */}
                <div className="row pt-2">
                  <div className="col-md-8 col-lg-8 supplierBox">
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

                  <div className="col-md-4 col-lg-4 supplierBox pt-3">
                    <form>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="sapnTitle" htmlFor="grandTotal">
                            G.Total
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control productInput input-sm"
                            id="grandTotal"
                            readOnly
                            value={
                              grandTotal
                                ? grandTotal.toFixed(2)
                                : parseFloat(grandTotalTaka).toFixed(2)
                            }
                            //value={parseFloat(grandTotalTaka).toFixed(3)}
                            //onChange={(e) => setGrandTotal(e.target.value)}
                            name="grand_total"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="sapnTitle" htmlFor="Flatdis">
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
                            id="Flatdis"
                          />

                          <span className="sapnTitle"> % </span>
                          <input
                            type="number"
                            min={0}
                            className="form-control productInput input-sm"
                            value={parseFloat(flatDiscountAmount).toFixed(2)}
                            name="flat_discount"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="sapnTitle" htmlFor="netdis">
                            Net Dis
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control productInput input-sm"
                            id="netdis"
                            readOnly
                            value={parseFloat(netDiscountTaka).toFixed(2)}
                            name="net_discount"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="sapnTitle" htmlFor="nettotal">
                            Net Total
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="number"
                            min={0}
                            className="form-control productInput input-sm"
                            id="nettotal"
                            value={
                              netTotal
                                ? parseFloat(netTotal).toFixed(2)
                                : parseFloat(grandTotalTaka).toFixed(2)
                            }
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="sapnTitle" htmlFor="payamt">
                            Pay Amt.
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="number"
                            min={0}
                            className="form-control productInput input-sm"
                            id="payamt"
                            onChange={paymentHandler}
                            name="pay_amount"
                            value={paymentAmount}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="sapnTitle" htmlFor="currdue">
                            Curr Due
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            id="currdue"
                            //value={paymentAmount == 0 && flatDiscount == 0 ? parseFloat(grandTotalTaka.toFixed(2)) : parseFloat(currentDue).toFixed(2)}
                            value={
                              paymentAmount != 0
                                ? currentDue
                                : parseFloat(grandTotalTaka).toFixed(2)
                            }
                            name="payment_due"
                            readOnly
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Product Section */}

              {/* Product Section End Here */}

              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right responsive-btn">
                    <Button
                      className="saveCloseBtn border border-none closebtn "
                      onClick={props.onHide}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="saveCloseBtn border border-none"
                      onClick={dataSaveHandler}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* Company Add Form End Here */}
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AddPurchaseOrder;
