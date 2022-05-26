/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useFocus } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBankTransactionLists } from "../../../../redux/actions/bankTransactionActions ";
import CustomerSearch from "./AddCustomer/CustomerSearch";
import ProductShowModal from "./SearchProduct/ProductShowModal";
import moment from "moment";
import {
  addSalesOrder,
  getSalesProductDetails,
} from "../../../../redux/actions/salesOredrActions";
import { getCardTypeLists } from "../../../../redux/actions/cardtypesetupActions";
import AddCustomer from "../../../CustomerAndSupplier/Customer/AddCustomer";
import SalesOrderReceipt from "./SalesOrderReceipt";
import { SALES_RECEIPT } from "../../../../redux/actions/types/salesOrder";
import { useReactToPrint } from "react-to-print";

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
  const data = localStorage.getItem("salesProducts");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const AddSalesOrder = (props) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [inputRef.current]);

  // Addnew customer modal
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  // Product details state management
  const [salesProducts, setSalesProducts] = useState(getDatafromLS());
  // Get this state from child component -- CustomerSearch
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const [getCustomerId, setGetCustomerId] = useState("");
  const [getCustomerCode, setGetCustomerCode] = useState("");
  const [getCustomerName, setGetCustomerName] = useState("");
  const [getCustomerAddress, setGetCustomerAddress] = useState("");
  const [getCustomerCN, setGetCustomerCN] = useState("");
  const [getCustomerPrevDue, setGetCustomerPrevDue] = useState("");
  const [salesDate, setSalesDate] = useState(currentDate);
  // const [salesPrintData, setSalesPrintData] = useState({});

  /*
   * ---Get this state from child component -- ProductShowModal
   */
  const [getProductId, setGetProductId] = useState("");
  const [stockDetailsId, setStockDetailsId] = useState("");
  const [getPrevStock, setGetPrevStock] = useState(0);
  const [getProductCompany, setGetProductCompany] = useState("");
  const [getProductCode, setGetProductCode] = useState("");
  const [getProductCategory, setGetProductCategory] = useState("");
  const [getProductName, setGetProductName] = useState("");
  const [getSalesRate, setGetSalesRate] = useState(0);
  const [getProductCompressor, setGetProductCompressor] = useState("");
  const [getProductMotor, setGetProductMotor] = useState("");
  const [getProductPanel, setGetProductPanel] = useState("");
  const [getProductSparepart, setGetProductSparepart] = useState("");
  const [getProductService, setGetProductService] = useState("");

  /*
   * ---Product section--- input field management state
   */
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [s_rate, setSalesRate] = useState(10);
  const [total_amount, setTotalAmount] = useState(0);
  const [ppd_percentage, setDiscount] = useState(0);
  const [ppd_amount, setDiscountAmount] = useState(0);
  const [unit_price, setUnitPrice] = useState(0);

  /*
   * ---Supplier,Remind date and Card Payment section--- input field management state
   */
  const [invoiceNo, setInvoiceNo] = useState("");
  const [remindDate, setRemindDate] = useState(currentDate);
  const [remaindPeriod, setRemindPeriod] = useState("");
  const [status, setStatus] = useState("DAY");
  const [bankId, setBankId] = useState(null);
  const [cardTypeId, setCardTypeId] = useState(null);
  const [cardPaymentAmount, setcardPaymentAmount] = useState(0);

  /*
   * ---Final calculation state management here
   */

  const [grandTotal, setGrandTotal] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [flatDiscountAmount, setFlatDiscountAmount] = useState(0);
  const [netDiscount, setNetDiscount] = useState(0);
  const [vat, setVat] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [cashBack, setCashBack] = useState(0);
  const [remarks, setRemarks] = useState("");
  // const [netTotal, setNetTotal] = useState(0);

  // const [cashPaid, setCashPaid] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [adjustAmount, setAdjustAmount] = useState(0);
  // const [currentDue, setCurrentDue] = useState(0);

  // Declare state for deleting products from localstorage
  const [selectId, setSelectId] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [isActive, setIsActive] = useState(null);

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);

  // Fetch SalesOrder data from api
  const { salesorder_list, salesProductDetais } = useSelector(
    (state) => state.salesorders
  );

  const { activeUser } = useSelector((state) => state.systeminformation);

  useEffect(() => {
    dispatch(getSalesProductDetails(barcode, headers));
  }, [barcode]);

  useEffect(() => {
    if (salesProductDetais) {
      setGetProductId(salesProductDetais?.product);
      setGetProductCode(salesProductDetais?.product_code);
      setGetProductName(salesProductDetais?.product_name);
      setGetPrevStock(salesProductDetais?.stock);
      // setGetProductCategory(productCategory);
      // setGetProductCompany(productCompany);
      setGetSalesRate(salesProductDetais?.sales_rate);
    }
  }, [salesProductDetais]);

  // Format invoice for uniqueness
  const formatInvoice = moment(new Date()).format("DDMMMYY") + "-" + invoiceNo;
  const invoice = salesorder_list.find((b) => b.invoice_no === formatInvoice);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // ============================================BarCode============
  var barcode1 = "";
  var interval;
  const onKeyDownEvent = (evt) => {
    if (interval) clearInterval(interval);
    if (evt.code === "Enter") {
      if (barcode1) handleBarcode(barcode1);
      barcode1 = "";
      return;
    }
    if (evt.key !== "Shift") barcode1 += evt.key;
    interval = setInterval(() => (barcode1 = ""), 20);
  };

  function handleBarcode(scanned_barcode) {
    document.querySelector("#SearchbyScanning").innerHTML = scanned_barcode;
  }
  // ============================================barcode============
  const productHandler = (
    stockDetailsId,
    productId,
    stock,
    productName,
    code,
    productCompany,
    productCategory,
    salesRate,
    compressorWarrenty,
    panelWarrenty,
    motorWarrenty,
    sparepartWarrenty,
    serviceWarrenty
  ) => {
    setStockDetailsId(stockDetailsId);
    setGetProductId(productId);
    setGetProductCode(code);
    setGetProductName(productName);
    setGetPrevStock(stock);
    setGetProductCategory(productCategory);
    setGetProductCompany(productCompany);
    setGetSalesRate(salesRate);
    setGetProductCompressor(compressorWarrenty);
    setGetProductMotor(panelWarrenty);
    setGetProductPanel(motorWarrenty);
    setGetProductService(serviceWarrenty);
    setGetProductSparepart(sparepartWarrenty);
  };
  //Product form submit handler
  const handleSalesProductSubmit = (e) => {
    e.preventDefault();

    var ProductID = getProductId;
    var stock_detail_id = stockDetailsId;
    var stock = getPrevStock;
    var product_name = getProductName;
    var product_category = getProductCategory;
    var s_rate = getSalesRate;
    var product_code = getProductCode;
    var product_company = getProductCompany;
    var compressor_warrenty = getProductCompressor;
    var panel_warrenty = getProductMotor;
    var motor_warrenty = getProductPanel;
    var spare_parts_warrenty = getProductSparepart;
    var service_warrenty = getProductService;

    // creating an object for product detials
    let salesProductDetails = {
      product_name,
      product_category,
      product_code,
      product_company,
      quantity,
      s_rate,
      total_amount,
      ppd_amount,
      ppd_percentage,
      unit_price,
      ProductID,
      stock,
      stock_detail_id,
      compressor_warrenty,
      panel_warrenty,
      motor_warrenty,
      spare_parts_warrenty,
      service_warrenty,
    };

    // Set product details
    if (getPrevStock < quantity) {
      toast.warn("Stock less than quantity!");
    } else if (!getProductId) {
      toast.warn("Please select a product!");
    } else if (!quantity) {
      toast.warn("Please select some quantity!");
    } else {
      // set null all calculated field
      reset();
      setSalesProducts([...salesProducts, salesProductDetails]);
      setQuantity(0);
      setSalesRate(0);
      setTotalAmount(0);
      setDiscount(0);
      setUnitPrice(0);
      setDiscountAmount(0);
      setGetProductId("");
      setGetProductName("");
      setGetProductCode("");
      setGetPrevStock(0);
      setGetSalesRate(0);
      setGetProductCompressor("");
      setGetProductMotor("");
      setGetProductPanel("");
      setGetProductSparepart("");
      setGetProductService("");
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

  // saving product data to local storage
  useEffect(() => {
    localStorage.setItem("salesProducts", JSON.stringify(salesProducts));
  }, [salesProducts]);

  // Store grand total and total discount and show in final calculation section
  var totalTaka = parseFloat(grandTotal);
  var netDiscountTaka = parseFloat(netDiscount);
  var ndiscount = parseFloat(netDiscount);
  var i = 0;

  /**** print section ****/

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  /***********/

  //console.log(totalTaka);
  const productData = salesProducts.map((data, index) => {
    totalTaka += parseFloat(data.total_amount);
    netDiscountTaka += parseFloat(data.ppd_amount);
    ndiscount += parseFloat(data.ppd_amount);
    if (data) {
      return (
        <tr
          className="tableStyle"
          key={data.id}
          style={
            isActive === index
              ? { background: "#7b8bf9b8" }
              : { background: "" }
          }
          onClick={() => selectProduct(index, data.ProductID)}
        >
          <td>{++i}</td>
          <td>{data.product_name}</td>
          <td>{data.product_category}</td>
          <td>{data.quantity}</td>
          <td>{parseFloat(data.unit_price).toFixed(2)}</td>
          <td>{parseFloat(data.ppd_percentage).toFixed(2)}</td>
          <td>{parseFloat(data.ppd_amount).toFixed(2)}</td>
          <td>{parseFloat(data.total_amount).toFixed(2)}</td>
          <td onClick={() => deleteProduct(data.ProductID)}>
            <Icon icon={trash} />
          </td>
        </tr>
      );
    } else {
      return <p style={{ background: "red" }}>No data found</p>;
    }
  });
  // Set netDiscount taka for updatingnetTotalDiscount
  const [netDTaka, setNdTaka] = useState(netDiscountTaka);
  const [payableAmount, setPayableAmount] = useState(totalTaka);
  const [netTotal, setNetTotal] = useState(totalTaka);
  const [currentDue, setCurrentDue] = useState(totalTaka);

  // delete product from Local Storage
  const deleteProduct = (productId) => {
    const filteredProducts = salesProducts.filter((element) => {
      reset();
      return element.ProductID !== productId;
    });
    setIsActive(null);
    setIsSelect(!isSelect);
    setSalesProducts(filteredProducts);
  };

  // Get customer id and previous due from the child component --- CustomerSearch
  const customerHandler = (
    customerId,
    code,
    name,
    address,
    contact_no,
    due
  ) => {
    setGetCustomerId(customerId);
    setGetCustomerCode(code);
    setGetCustomerName(name);
    setGetCustomerPrevDue(due);
    setGetCustomerAddress(address);
    setGetCustomerCN(contact_no);
  };

  // Quantity handler
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
    const quantity = e.target.value;
    // setFocus(false)
    //const tDiscountAmount = (ppdiscount / 100) * getSalesRate;
    const unitPrice = getSalesRate - ppd_amount;
    const totalAmount = (unit_price ? unit_price : getSalesRate) * quantity;
    setUnitPrice(unitPrice);
    //setDiscountAmount(tDiscountAmount);
    setTotalAmount(totalAmount);

    if (getPrevStock < quantity) {
      toast.success("Stock less than quantity!");
    }
  };
  const invoiceHandler = (e) => {
    setInvoiceNo(e.target.value);
    const invoice = e.target.value;
    const format = moment(new Date()).format("DDMMMYY") + "-" + invoice;
    const invoice_no = salesorder_list.find((b) => b.invoice_no === format);
    if (invoice_no && invoice_no.invoice_no === format) {
      toast.warn("This invoice no already exists!");
    }
  };

  const ppDiscounthandler = (e) => {
    setDiscount(e.target.value);
    const ppdiscount = e.target.value;
    const tDiscountAmount = (ppdiscount / 100) * getSalesRate;
    const unitPrice = getSalesRate - tDiscountAmount;
    const totalAmount = unitPrice * quantity;
    setUnitPrice(unitPrice);
    setDiscountAmount(tDiscountAmount);
    setTotalAmount(totalAmount);
  };

  const flatDiscountHandler = (e) => {
    setFlatDiscount(e.target.value);
    const fd = e.target.value;
    const fdAmount = (fd / 100) * totalTaka;
    const netTotal = totalTaka - fdAmount;
    const netdtaka = netDiscountTaka + fdAmount;

    // calculate vat, payable and due amount
    const vatamount = (vat / 100) * (totalTaka - fdAmount);
    const payableAmt = netTotal + vatamount;
    const dueAmt = payableAmt - paidAmount - adjustAmount - cardPaymentAmount;
    // const payableAmt = totalTaka  - fdAmount + vatamount;
    // const dueAmt = totalTaka - fdAmount + vatamount - paidAmount - adjustAmount - cardPaymentAmount;

    setVatAmount(vatamount);
    setNdTaka(netdtaka);
    setNetTotal(netTotal);
    setPayableAmount(payableAmt);
    if (dueAmt >= 0) {
      setCashBack(0);
      setCurrentDue(dueAmt);
    } else {
      setCashBack(-dueAmt);
    }
    setFlatDiscountAmount(fdAmount);
  };

  const vatHandler = (e) => {
    setVat(e.target.value);
    const vatPercentage = e.target.value;
    const vatAmount = (vatPercentage / 100) * (totalTaka - flatDiscountAmount);
    const netTotal = totalTaka - paidAmount - flatDiscountAmount + vatAmount;
    const cashpaid = totalTaka - flatDiscountAmount + vatAmount;
    const curDue = netTotal - adjustAmount - cardPaymentAmount;
    // const curDue = totalTaka - flatDiscountAmount + vatAmount - paidAmount  - adjustAmount - cardPaymentAmount;
    setPayableAmount(cashpaid);
    if (curDue >= 0) {
      setCashBack(0);
      setCurrentDue(curDue);
    } else {
      setCashBack(-curDue);
    }
    // setCurrentDue(parseFloat(cashpaid) + parseFloat(adjustAmount));
    setVatAmount(vatAmount);
  };

  //Bank Card payment handler
  const cardPaymentHandler = (e) => {
    setcardPaymentAmount(e.target.value);
    const cardAmount = e.target.value;
    const currentDue =
      totalTaka -
      paidAmount -
      flatDiscountAmount -
      adjustAmount -
      cardAmount +
      vatAmount;
    if (currentDue >= 0) {
      setCashBack(0);
      setCurrentDue(currentDue);
    } else {
      setCashBack(-currentDue);
    }
  };

  // Cash paid handler
  const paidAmountHandler = (e) => {
    setPaidAmount(e.target.value);
    const payAmount = e.target.value;
    const currentDue =
      totalTaka -
      adjustAmount -
      cardPaymentAmount -
      payAmount -
      flatDiscountAmount +
      vatAmount;
    if (currentDue >= 0) {
      setCashBack(0);
      setCurrentDue(currentDue);
    } else {
      setCashBack(-currentDue);
    }
  };

  const adjustHandler = (e) => {
    setAdjustAmount(e.target.value);
    const adjust = e.target.value;
    const curDue =
      totalTaka -
      paidAmount -
      adjust -
      cardPaymentAmount +
      vatAmount -
      flatDiscountAmount;
    if (curDue >= 0) {
      setCashBack(0);
      setCurrentDue(curDue);
    } else {
      setCashBack(-curDue);
    }
  };

  // Fetch Bank transaction no and card type id from bank transaction and card-type-setup api
  const { banks } = useSelector((state) => state.banks);
  const { card_types } = useSelector((state) => state.cardtypes);

  // Problem here render again and again
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBankTransactionLists(headers));
    dispatch(getCardTypeLists(headers));
    // dispatch(getCardTypeSetupLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Map bank name
  const bank = banks.map((data) => {
    return (
      <option key={data.id} value={data.id}>
        {data.bank_name}
      </option>
    );
  });
  // Map card type name
  const cardTypeList = card_types.map((data) => {
    return (
      <option key={data.id} value={data.id}>
        {data.description}
      </option>
    );
  });

  // Add sales order data
  const dataSaveHandler = () => {
    var salesProductDetails = [];
    for (var pair of salesProducts.entries()) {
      var salesProduct = {
        productName: pair[1].product_name,
        productCompany: pair[1].product_company,
        ProductID: pair[1].ProductID,
        quantity: pair[1].quantity,
        unit_price: pair[1].unit_price,
        s_rate: pair[1].s_rate,
        total_amount: pair[1].total_amount,
        ppd_percentage: pair[1].ppd_percentage,
        ppd_amount: pair[1].ppd_amount,
        stock: pair[1].stock,
        stock_detail_id: pair[1].stock_detail_id,
      };

      salesProductDetails.push(salesProduct);
    }

    var salesProductDetailsData = {
      invoice_no: moment(new Date()).format("DDMMMYY") + "-" + invoiceNo,
      cumtomerID: getCustomerId,
      name: getCustomerName,
      address: getCustomerAddress,
      contact_no: getCustomerCN,
      remind_date: remindDate,
      remind_day: remaindPeriod,
      status: status,
      bank: parseInt(bankId),
      card_type: parseInt(cardTypeId),
      card_paid_amount: cardPaymentAmount ? cardPaymentAmount : 0,
      grand_total: totalTaka,
      flat_discount: flatDiscount,
      fd_amount: flatDiscountAmount ? flatDiscountAmount : 0,
      net_discount: netDiscount,
      net_total: netTotal ? netTotal : totalTaka,
      vat_percentage: vat,
      vat_amount: vatAmount ? vatAmount : 0,
      cash_paid: payableAmount,
      paid_Amt: paidAmount,
      adjustment: adjustAmount ? adjustAmount : 0,
      current_due: currentDue,
      total_due: parseFloat(currentDue + getCustomerPrevDue).toFixed(2),
      sales_order_details: salesProductDetails,
    };

    if (!invoiceNo) {
      toast.warn("Please enter invoice number");
    } else if (cardPaymentAmount && !bankId && !cardTypeId) {
      toast.warn("Please enter bank and card type!");
    } else if (invoice && invoice.invoice_no == formatInvoice) {
      toast.warn("This invoice already exists!");
    } else if (!getCustomerId) {
      toast.warn("Please select a customer!");
    } else {
      dispatch(
        addSalesOrder(
          salesProductDetailsData,
          headers,
          props.onHide,
          props.salesReceiptHandler,
          activeUser
        )
      );
      toast.success("Sales Order is adding...");
      // setSalesProducts([]);
      // localStorage.removeItem("salesProducts");
      setGetCustomerCode("");
      setGetCustomerName("");
      setGetCustomerPrevDue(0);
      setInvoiceNo("");
      setBankId(null);
      setCardTypeId(null);
      setSalesProducts([]);
      localStorage.removeItem("salesProducts");
      reset();
    }
  };

  const reset = () => {
    totalTaka = 0;
    setAdjustAmount(0);
    setPayableAmount(0);
    setCurrentDue(0);
    setPaidAmount(0);
    setDiscount(0);
    setFlatDiscount(0);
    setFlatDiscountAmount(0);
    setcardPaymentAmount(0);
    setGetCustomerPrevDue(0);
    setNetDiscount(0);
    setVat(0);
    setVatAmount(0);
    setNdTaka(0);
    setNetTotal(0);
    setCashBack(0);
    setRemarks("");
  };
  const closeHandler = () => {
    reset();
    setGetCustomerCode("");
    setGetCustomerName("");
    setGetCustomerPrevDue(0);
    setQuantity(0);
    setSalesRate(0);
    setTotalAmount(0);
    setDiscount(0);
    setUnitPrice(0);
    setDiscountAmount(0);
    setGetProductId("");
    setGetProductName("");
    setGetProductCode("");
    setGetPrevStock(0);
    setGetSalesRate(0);
    setGetProductCompressor("");
    setGetProductMotor("");
    setGetProductPanel("");
    setGetProductSparepart("");
    setGetProductService("");
    setBarcode("");
    setBankId(null);
    setCardTypeId(null);
    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onExit={closeHandler}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
      dialogClassName="add-modal"
    >
      <div>
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="modalHeadTitle">Add Sales Order </h4>
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
          <div className="custom_modal_inner_content">
            {/* Company Add Form Start Here */}

            {/* <h4 className="modalHeadTitle">Customer Information</h4> */}
            <div className="container productBox">
              <div className="row">
                <div className="col-md-8 col-lg-9">
                  <h4 className="sectionTitle">Customer</h4>
                  <div className="row supplierBox">
                    <div className="col-md-12">
                      <div className="row mt-3">
                        <div className="col-md-6 col-lg-4">
                          <div className="row">
                            <div className="col-md-12 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle">Invoice</span>
                            </div>
                            <div className="col-md-12 col-lg-8 input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control productInput"
                                placeholder="Ex:123"
                                value={invoiceNo}
                                onChange={invoiceHandler}
                                name="invoice_no"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="row">
                            <div className="col-md-12 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle">Sales Date</span>
                            </div>
                            <div className="col-md-12 col-lg-8 input-group input-group-sm">
                              <input
                                type="date"
                                className="form-control productInput"
                                value={salesDate}
                                onChange={(e) => setSalesDate(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="row">
                            <div className="col-md-12 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle">Prev.Due</span>
                            </div>
                            <div className="col-md-12 col-lg-8 input-group input-group-sm">
                              <input
                                type="number"
                                className="form-control productInput"
                                value={getCustomerPrevDue}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Customer Search */}

                      <div className="row  mb-3 topMargin">
                        <div className="col-md-8">
                          <div className="row">
                            <div className="col-md-12 col-lg-2 input-group input-group-sm">
                              <span className="spanTitle">Customer</span>
                            </div>
                            <div className="col-md-12 col-lg-10 input-group input-group-sm">
                              <CustomerSearch
                                customerHandler={customerHandler}
                                code={getCustomerCode}
                                name={getCustomerName}
                                //customerDue={customerDueHandler}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 input-group input-group-sm nameBox">
                          <Button
                            className="addCustomerBtn bg-info w-100 border"
                            onClick={() => setAddCustomerModal(true)}
                          >
                            Add New Customer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Remind section start here */}
                <div className="col-sm-12 col-md-4 col-lg-3">
                  <h4 className="sectionTitle">Remind Date</h4>
                  <div className="row supplierBox">
                    <div className="col-md-12">
                      <div className="row mt-1">
                        <div className="col-sm-12 col-md-4 input-group input-group-sm">
                          <span className="spanTitle">R.Date</span>
                        </div>
                        <div className="col-sm-12 col-md-8 input-group input-group-sm">
                          <input
                            type="date"
                            className="form-control productInput"
                            name="remind_date"
                            value={remindDate}
                            onChange={(e) => setRemindDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-4 input-group input-group-sm">
                          <span className="spanTitle">R.Period</span>
                        </div>
                        <div className="col-sm-12 col-md-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput"
                            name="remind_day"
                            placeholder="Ex: 1 month"
                            value={remaindPeriod}
                            onChange={(e) => setRemindPeriod(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-12"></div>
                        <div className="col-sm-12 col-md-4 input-group input-group-sm">
                          <span className="spanTitle">R.Status</span>
                        </div>
                        <div className="col-sm-12 col-md-8 input-group input-group-sm">
                          <select
                            className="form-control input-group input-group-sm"
                            name="status"
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            {/* <option value="">Select Status</option> */}
                            <option value="DAY">Days</option>
                            <option value="MONTH">Months</option>
                            <option value="YEAR">Years</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <h4 className="sectionTitle">Product</h4>
                  <div className="row supplierBox">
                    <div className="col-md-7 col-lg-8">
                      <form onSubmit={handleSalesProductSubmit}>
                        <div className="row mt-2">
                          <div className="col-md-12 col-lg-8">
                            <div className="row ">
                              <div className="col-md-12 col-lg-2 input-group input-group-sm">
                                <span className="spanTitle">Barcode</span>
                              </div>
                              <div className="col-md-12 col-lg-10 input-group input-group-sm">
                                <input
                                  id="SearchbyScanning"
                                  ref={inputRef}
                                  onKeyPress={onKeyDownEvent}
                                  type="text"
                                  className="productInput"
                                  placeholder="Enter barcode"
                                  name="bar_code"
                                  value={barcode}
                                  onChange={(e) => setBarcode(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <div className="row">
                              <div className="col-md-12 col-lg-3 input-group input-group-sm">
                                <span className="spanTitle">Stock</span>
                              </div>
                              <div className="col-md-12 col-lg-9 input-group input-group-sm">
                                <input
                                  type="number"
                                  className="form-control productInput"
                                  value={getPrevStock}
                                  readOnly
                                  name="stock"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row topMargin">
                          <div className="col-sm-12 col-md-12 col-lg-8">
                            <div className="row ">
                              <div className="col-sm-12 col-md-12 col-lg-2 input-group input-group-sm">
                                <span className="spanTitle">Product</span>
                              </div>
                              <div className="col-sm-12 col-md-12 col-lg-10 input-group input-group-sm">
                                <ProductShowModal
                                  productHandler={productHandler}
                                  name={getProductName}
                                  code={getProductCode}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <div className="row">
                              <div className="col-md-12 col-lg-3 input-group input-group-sm">
                                <span className="spanTitle" title="Sales Rate">
                                  S.Rate
                                </span>
                              </div>
                              <div className="col-md-12 col-lg-9 input-group input-group-sm">
                                <input
                                  type="number"
                                  className="form-control productInput"
                                  value={getSalesRate}
                                  onChange={(e) => setSalesRate(e.target.value)}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-12 col-lg-8">
                            <div className="row ">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                    <span className="spanTitle">Quantity</span>
                                  </div>
                                  <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                    <input
                                      type="number"
                                      className="form-control productInput"
                                      value={quantity}
                                      onChange={quantityHandler}
                                      name="quantity"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                    <span
                                      className="spanTitle"
                                      title="Unit Price"
                                    >
                                      U.Price
                                    </span>
                                  </div>
                                  <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                    <input
                                      type="text"
                                      className="form-control productInput"
                                      name="unit_price"
                                      value={unit_price}
                                      onChange={(e) =>
                                        setUnitPrice(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4">
                            <div className="row">
                              <div className="col-md-12 col-lg-3 input-group input-group-sm">
                                <span className="spanTitle">Total</span>
                              </div>
                              <div className="col-md-12 col-lg-9 input-group input-group-sm">
                                <input
                                  type="number"
                                  className="form-control productInput"
                                  value={parseFloat(total_amount).toFixed(3)}
                                  name="total_amount"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2 mb-2">
                          <div className="col-md-12 col-lg-8">
                            <div className="row ">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                    <span className="spanTitle">Discount</span>
                                  </div>
                                  <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                    <input
                                      type="text"
                                      className="form-control productInput"
                                      onChange={ppDiscounthandler}
                                      value={ppd_percentage}
                                      name="ppd_percentage"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                    <span className="spanTitle">%</span>
                                  </div>
                                  <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                    <input
                                      type="number"
                                      className="form-control productInput"
                                      value={ppd_amount}
                                      name="ppd_amount"
                                      readOnly
                                      // onChange={(e)=> setDiscountAmount(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4 mt-0">
                            <div className="row">
                              <div className="col-md-6 input-group input-group-sm salesBtnGroup">
                                <Button
                                  className="addSlaesBtn bg-info w-100 border-0"
                                  type="submit"
                                >
                                  Add
                                </Button>
                              </div>
                              <div className="col-md-6 input-group input-group-sm salesBtnGroup">
                                <Button
                                  className="addSlaesBtn bg-danger w-100 border-0"
                                  onClick={() => deleteProduct(selectId)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* Card Payment Start Here */}
                    <div className="col-sm-12 col-md-5 col-lg-4">
                      <h4 className="sectionTitle">Card Payment</h4>
                      <div className="row supplierBox">
                        <div className="col-md-12">
                          <div className="row mt-2">
                            <div className="col-sm-12 col-md-4 input-group input-group-sm">
                              <span className="spanTitle">Bank</span>
                            </div>
                            <div className="col-sm-12 col-md-8 input-group input-group-sm">
                              <select
                                className="form-control productInput input-group input-group-sm"
                                name="bank_tranId"
                                onChange={(e) => setBankId(e.target.value)}
                              >
                                <option>Select Bank</option>
                                {bank}
                              </select>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-sm-12 col-md-4 input-group input-group-sm">
                              <span className="spanTitle">Card</span>
                            </div>
                            <div className="col-sm-12 col-md-8 input-group input-group-sm">
                              <select
                                className="form-control productInput"
                                name="card_type_setupID"
                                onChange={(e) => setCardTypeId(e.target.value)}
                              >
                                <option>Select Card Type</option>
                                {cardTypeList}
                              </select>
                            </div>
                          </div>
                          <div className="row mt-2 mb-2">
                            <div className="col-sm-12 col-md-4 input-group input-group-sm">
                              <span className="spanTitle">Amount</span>
                            </div>
                            <div className="col-sm-12 col-md-8 input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control productInput"
                                name="card_paid_amount"
                                value={cardPaymentAmount}
                                onChange={cardPaymentHandler}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product section end here */}

                {/* Warranty section start here */}

                <div className="col-md-12">
                  <h4 className="sectionTitle">Warrenty</h4>

                  <div className="row supplierBox warrantyBox">
                    <div className=" warrantyItem">
                      <div className="row mt-2 mb-2">
                        <div className="col-md-12 input-group input-group-sm">
                          <span className="spanTitle">Compressor</span>
                        </div>
                        <div className="col-md-12 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput"
                            value={getProductCompressor}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="  warrantyItem">
                      <div className="row mt-2 mb-2">
                        <div className="col-md-12 input-group input-group-sm">
                          <span className="spanTitle">Panel</span>
                        </div>
                        <div className="col-md-12 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput"
                            value={getProductPanel}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="  warrantyItem">
                      <div className="row mt-2 mb-2">
                        <div className="col-md-12 input-group input-group-sm">
                          <span className="spanTitle">Motor</span>
                        </div>
                        <div className="col-md-12 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput"
                            value={getProductMotor}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="  warrantyItem">
                      <div className="row mt-2 mb-2">
                        <div className="col-md-12 input-group input-group-sm">
                          <span className="spanTitle">Spareparts</span>
                        </div>
                        <div className="col-md-12 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput"
                            value={getProductSparepart}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="  warrantyItem">
                      <div className="row mt-2 mb-2">
                        <div className="col-md-12 input-group input-group-sm">
                          <span className="spanTitle">Service</span>
                        </div>
                        <div className="col-md-12 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput"
                            value={getProductService}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                            U.Price
                          </th>
                          <th className="header" scope="col">
                            Dis(%)
                          </th>
                          <th className="header" scope="col">
                            D.Amt
                          </th>
                          <th className="header" scope="col">
                            Total
                          </th>
                          <th className="header" scope="col">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>{productData}</tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-4 col-lg-4 supplierBox pt-3 ">
                  <h4 className="sectionTitle">Details Information</h4>

                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 input-group input-group-sm">
                      <span className="spanTitle" htmlFor="warningQty">
                        Grand Total
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-8 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        value={
                          grandTotal
                            ? grandTotal.toFixed(2)
                            : parseFloat(totalTaka).toFixed(2)
                        }
                        name="grand_total"
                        // onChange={grandTotalHandler}

                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 input-group input-group-sm">
                      <span className="spanTitle" htmlFor="warningQty">
                        Flat Dis(%)
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-8 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        value={flatDiscount}
                        name="flat_discount"
                        onChange={flatDiscountHandler}
                      />
                      <span className="spanTitle"> % </span>
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        value={parseFloat(flatDiscountAmount).toFixed(2)}
                        name="fd_amount"
                        readOnly
                        //onChange={grandTotalHandler}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 input-group input-group-sm">
                      <span
                        className="spanTitle"
                        for="warningQty"
                        title="Net discount amount"
                      >
                        Net Dis.
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-8 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        value={
                          netDTaka
                            ? parseFloat(netDTaka).toFixed(2)
                            : parseFloat(netDiscountTaka).toFixed(2)
                        }
                        name="net_discount"
                        // onChange={(e)=>setNetDiscount(e.target.value)}
                        readOnly
                        //onChange={netDiscountHandler}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 input-group input-group-sm">
                      <span className="spanTitle" htmlFor="warningQty">
                        Net Total
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-8 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        value={
                          netTotal
                            ? parseFloat(netTotal).toFixed(2)
                            : parseFloat(totalTaka).toFixed(2)
                        }
                        name="net_total"
                        //onChange={netTotalHandler}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 input-group input-group-sm">
                      <span className="spanTitle" htmlFor="warningQty">
                        Vat
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-8 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        value={vat}
                        name="vat_percentage"
                        onChange={vatHandler}
                      />
                      <span className="spanTitle"> % </span>
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        value={vatAmount.toFixed(2)}
                        name="vat_amount"
                        readOnly
                        //onChange={grandTotalHandler}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 input-group input-group-sm">
                      <span className="spanTitle">Payable Amt.</span>
                    </div>
                    <div className="col-md-12 col-lg-8 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        value={
                          payableAmount
                            ? parseFloat(payableAmount).toFixed(2)
                            : totalTaka.toFixed(2)
                        }
                        // value={cashPaid.toFixed(2)}
                        name="cash_paid"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 input-group input-group-sm">
                      <span className="spanTitle">Cash Paid</span>
                    </div>
                    <div className="col-md-12 col-lg-8 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        value={paidAmount}
                        name="paid_amount"
                        onChange={paidAmountHandler}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 input-group input-group-sm">
                      <span className="spanTitle">Adjust Amt.</span>
                    </div>
                    <div className="col-md-12 col-lg-8 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        value={adjustAmount}
                        name="adjust"
                        onChange={adjustHandler}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 input-group input-group-sm">
                      <span className="spanTitle">Curr. Due</span>
                    </div>
                    <div className="col-md-12 col-lg-8 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        id="warningQty"
                        value={
                          cardPaymentAmount == 0 &&
                          adjustAmount == 0 &&
                          paidAmount == 0 &&
                          flatDiscountAmount == 0 &&
                          vatAmount == 0
                            ? parseFloat(totalTaka).toFixed(2)
                            : parseFloat(currentDue).toFixed(2)
                        }
                        // value={currentDue.toFixed(3)}
                        name="current_due"
                        // onChange={grandTotalHandler}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 input-group input-group-sm">
                      <span className="spanTitle">Cash Back</span>
                    </div>
                    <div className="col-md-12 col-lg-8 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        id="warningQty"
                        value={cashBack}
                        name="current_due"
                        // onChange={grandTotalHandler}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 input-group input-group-sm">
                      <span className="spanTitle">Remarks</span>
                    </div>
                    <div className="col-md-12 col-lg-8 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        id="warningQty"
                        value={remarks}
                        name="current_due"
                        onChange={(e) => setRemarks(e.target.value)}
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
                  <Button
                    className="saveCloseBtn closebtn border border-none mr-3"
                    onClick={closeHandler}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="saveCloseBtn  border border-none"
                    onClick={dataSaveHandler}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Company Add Form End Here */}
        </Modal.Body>
      </div>
      <AddCustomer
        show={addCustomerModal}
        onHide={() => setAddCustomerModal(false)}
      />

      <SalesOrderReceipt
        show={props.show}
        onHide={props.onHide}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </Modal>
  );
};

export default AddSalesOrder;
