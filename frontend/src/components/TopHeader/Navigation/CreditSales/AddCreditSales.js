import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { useDispatch, useSelector } from "react-redux";
import { getBankTransactionLists } from "../../../../redux/actions/bankTransactionActions ";
import { getCardTypeLists } from "../../../../redux/actions/cardtypesetupActions";
import {
  addCreditSales,
} from "../../../../redux/actions/creditSales";
import CustomerSearch from "./AddCustomer/CustomerSearch";
import ProductShowModal from "./SearchProduct/ProductShowModal";
import { toast } from "react-toastify";
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

// getting the product data of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("creditSalesProducts");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
// getting the installment details of local storage
const getDatafromLStorage = () => {
  const data = localStorage.getItem("installmentDetails");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const AddCreditSales = (props) => {
  // Product details state management
  const [creditSalesProducts, setCreditSalesProducts] = useState(
    getDatafromLS()
  );
  const [installmentDetails, setInstallmentDetails] = useState(
    getDatafromLStorage()
  );
  // Get this state from child component -- CustomerSearch
  const [getCustomerId, setGetCustomerId] = useState("");
  const [getCustomerCode, setGetCustomerCode] = useState("");
  const [getCustomerName, setGetCustomerName] = useState("");
  const [getCustomerAddress, setGetCustomerAddress] = useState("");
  const [getCustomerContact, setGetCustomerContact] = useState("");
  const [getCustomerPrevDue, setGetCustomerPrevDue] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  // Get this state from child component -- ProductShowModal
  const [getProductId, setGetProductId] = useState("");
  const [getProductCode, setGetProductCode] = useState("");

  const [getPrevStockQty, setGetPrevStockQty] = useState(0);
  const [getPrevStockId, setGetPrevStockId] = useState("");
  const [getPrevStockDetailId, setGetPrevStockDetailId] = useState("");
  const [getProductCategory, setGetProductCategory] = useState("");
  const [getProductName, setGetProductName] = useState("");
  const [getProductCompressor, setGetProductCompressor] = useState(0);
  const [getProductMotor, setGetProductMotor] = useState(0);
  const [getProductPanel, setGetProductPanel] = useState(0);
  const [getProductSparepart, setGetProductSparepart] = useState(0);
  const [getProductService, setGetProductService] = useState(0);

  // Product section--- input field management state
  const [quantity, setQuantity] = useState(0);
  const [sgrand, setSgrand] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);

  // Card payment state
  const [bankId, setBankId] = useState("");
  const [cardTypeId, setCardTypeId] = useState("");
  const [cardPayment, setCardPayment] = useState(0);
  /*
   * ---Calculation of details information
   */
  const [grandTotal] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const date = moment(new Date()).format("YYYY-MM-DD");

  const [netAmount, setNetAmount] = useState(0);
  const [installments, setInstallments] = useState(0);
  const [cashPaid, setCashPaid] = useState(0);
  const [installDate, setInstallDate] = useState(date);
  const [saleDate, setSalesDate] = useState(date);
  const [isCalculate, setIsCalculate] = useState(false);

  const [netAmt] = useState(0);
  const [remarks] = useState(0);

  // Declare state for deleting products from localstorage
  const [selectId, setSelectId] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [isActive, setIsActive] = useState(null);

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  //Product form submit handler
  const productSubmitHandler = (e) => {
    e.preventDefault();
    var productId = getProductId;
    var sDeatilId = getPrevStockDetailId;
    var stockId = getPrevStockId;
    var productName = getProductName;
    var productCategory = getProductCategory;

    // creating an object for product detials
    let productDetails = {
      productName,
      productCategory,
      quantity,
      sgrand,
      unitPrice,
      total,
      interest,
      interestAmount,
      productId,
      sDeatilId,
      stockId,
    };
    // Set product details
    if (getPrevStockQty < quantity) {
      toast.warn("Stock less than quantity!");
    } else if (!getProductId) {
      toast.warn("Product must be selected!");
    } else {

      setCreditSalesProducts([...creditSalesProducts, productDetails]);
      // setQuantity(0);
      // setSgrand(0);
      // setUnitPrice(0);
      // setTotal(0);
      // setInterest(0);
      // setInterestAmount(0);
      // setGetPrevStockQty(0);
      reset();
      setGetPrevStockDetailId("")
      setGetProductId("");
      setGetProductCode("")
      setGetProductName("")
      setGetPrevStockQty(0)
      setGetPrevStockId("")
      setGetProductCategory("")
      setGetProductCompressor(0)
      setGetProductPanel(0)
      setGetProductMotor(0)
      setGetProductSparepart(0)
      setGetProductService(0)
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
  //Show installment details from local storage
  var i = 0;
  const installData = installmentDetails.map((data, index) => {
    if (data) {
      return (
        <tr style={{ height: "5px", fontSize: "12px" }} key={index}>
          <td>{++i}</td>
          <td>{moment(data?.payment_date).format("YYYY-MM-DD")}</td>
          <td>{moment(data?.payment_date).format("YYYY-MM-DD")}</td>
          <td>{data?.balance?.toFixed(2)}</td>
          <td>{data?.net_value?.toFixed(2)}</td>
          <td>{data?.hire_value?.toFixed(2)}</td>
          <td>{data?.installment_amount?.toFixed(2)}</td>
          <td>{data?.closing_balance?.toFixed(2)}</td>
          <td>{data?.payment_status}</td>
          <td>{data?.remarks}</td>
        </tr>
      );
    } else {
      return <p style={{ background: "red" }}>No data found</p>;
    }
  });

  // delete product from Local Storage
  const deleteProduct = (productId) => {
    const filteredProducts = creditSalesProducts.filter((element) => {
      reset();
      return element.productId !== productId;
    });
    setIsActive(null);
    setIsSelect(!isSelect);
    setCreditSalesProducts(filteredProducts);
  };
  // Store grand total and total discount and show in final calculation section
  var grandTotalTaka = parseFloat(grandTotal);
  var remainTaka = parseFloat(grandTotal);
  var netTaka = parseFloat(netAmount);
  var totalTaka = parseFloat(total)
  var totalInterestTaka = parseFloat(interestAmount);
  var i = 0;
  //Show product information from local storage
  const productData = creditSalesProducts.map((data, index) => {
    grandTotalTaka += parseFloat(data.sgrand);
    totalTaka += parseFloat(data.total);
    remainTaka += parseFloat(data.sgrand);
    netTaka += parseFloat(data.sgrand);
    totalInterestTaka += parseFloat(data.interestAmount);

    if (data) {
      return (
        <tr
          className="tableStyle"
          key={index}
          style={
            isActive === index
              ? { background: "#7b8bf9b8" }
              : { background: "" }
          }
          onClick={() => selectProduct(index, data.productId)}
        >
          <td>{++i}</td>
          <td>{data.productName}</td>
          <td>{data.productCategory}</td>
          <td>{data.quantity}</td>
          <td>{data.unitPrice}</td>
          <td>{data.interestAmount}</td>
          <td>{data.sgrand}</td>
          <td onClick={() => deleteProduct(data.productId)}>
            <Icon icon={trash} />
          </td>
        </tr>
      );
    } else {
      return <p style={{ background: "red" }}>No data found</p>;
    }
  });
  //const [rAmount, setRAmount] = useState(remainTaka);
  const [remainAmount, setRemainAmount] = useState(remainTaka);
  // saving product data to local storage
  useEffect(() => {
    localStorage.setItem(
      "creditSalesProducts",
      JSON.stringify(creditSalesProducts)
    );
  }, [creditSalesProducts]);

  // saving installment details data to local storage
  useEffect(() => {
    localStorage.setItem(
      "installmentDetails",
      JSON.stringify(installmentDetails)
    );
  }, [installmentDetails]);

  // Fetch credit sales data from api
  const { creditsales_list } = useSelector((state) => state.creditsales);
  // Format invoice for uniqueness
  const formatInvoice = moment(new Date()).format("DDMMMYY") + "-" + invoiceNo;
  const invoice = creditsales_list.find(
    (b) => b.invoice_number === formatInvoice
  );

  //Installments section ---it works after clicking calculate button
  const installDetailsCalculateHandler = (e) => {
    e.preventDefault();
    var dateFormat = new Date(installDate);

    localStorage.removeItem(installmentDetails);
    var insArray = [];
    var installTime = parseInt(installments);
    var installDetails = {
      schedule_date: "",
      payment_date: "",
      balance: "",
      net_value: "",
      hire_value: "",
      installment_amount: "",
      closing_balance: "",
      payment_status: "",
      remarks: "",
    };
    var close = remainAmount;
    if (installTime) {
      for (var i = 0; i < installTime; i++) {
        dateFormat.setMonth(dateFormat.getMonth() + 1);
        var date = moment(dateFormat).format("YYYY-MM-DD");
        var open = close;

        const totalHire = totalInterestTaka - discountAmount;
        const hire = totalHire / installTime;
        //setHireAmt(hire)
        const ins = remainAmount / installTime;

        //const net_rem = remainAmount - discountAmount
        const net = Math.max(0, ins - hire);
        //setNetAmt(net)

        close = open - ins;
        //setClosing(close)

        installDetails = {
          schedule_date: date,
          payment_date: date,
          balance: open,
          net_value: net,
          hire_value: hire,
          installment_amount: ins,
          closing_balance: close,
          payment_status: "Due",
          remarks: remarks,
        };

        insArray.push(installDetails);
      }
    } else {
      toast.warn("Please give installment!");
    }
    setInstallmentDetails(insArray);
    setIsCalculate(true);
  };

  const productHandler = (
    stockDetailId,
    productId,
    code,
    category,
    name,
    stockQty,
    stockId,
    compressor,
    panel,
    motor,
    sparepart,
    service
  ) => {
    setGetPrevStockDetailId(stockDetailId)
    setGetProductId(productId);
    setGetProductCode(code)
    setGetProductName(name)
    setGetPrevStockQty(stockQty)
    setGetPrevStockId(stockId)
    setGetProductCategory(category)
    setGetProductCompressor(compressor)
    setGetProductPanel(panel)
    setGetProductMotor(motor)
    setGetProductSparepart(sparepart)
    setGetProductService(service)
  };

  // Get supplier id and previous due from the child component --- SuppilerShowModal
  const customerHandler = (customerId, code, name, address, contact_no, due) => {
    setGetCustomerId(customerId);
    setGetCustomerCode(code)
    setGetCustomerName(name);
    setGetCustomerAddress(address);
    setGetCustomerContact(contact_no);
    setGetCustomerPrevDue(due)
  };

  // Declare this handler for handlinh disable button
  const installmentHandler = (e) => {
    setInstallments(e.target.value);
  };

  const invoiceHandler = (e) => {
    setInvoiceNo(e.target.value);
    const invoice = e.target.value;
    const format = moment(new Date()).format("DDMMMYY") + "-" + invoice;
    //setInvoiceNo(format);
    const invoice_no = creditsales_list.find(
      (b) => b.invoice_number === format
    );
    if (invoice_no && invoice_no.invoice_number === format) {
      toast.success("This invoice no already exists!");
    }
  };

  const quantityHandler = (e) => {
    setQuantity(e.target.value);
    const qty = e.target.value;
    const totalAmount = qty * unitPrice;
    setTotal(totalAmount);

    const intAmount = (interest * totalAmount) / 100;
    setInterestAmount(intAmount);

    const sGrand = intAmount + totalAmount;
    setSgrand(sGrand);
    if (getPrevStockQty < qty) {
      toast.success("Stock less than quantity!");
    }
  };

  const unitPriceHandler = (e) => {
    setUnitPrice(e.target.value);
    const uPrice = e.target.value;
    const totalAmount = uPrice * quantity;
    setTotal(totalAmount);

    const intAmount = (interest * totalAmount) / 100;
    setInterestAmount(intAmount);

    const sGrand = intAmount + totalAmount;
    setSgrand(sGrand);
  };
  const interestHandler = (e) => {
    setInterest(e.target.value);
    const interest = e.target.value;
    const interestAmount = (interest * total) / 100;
    setInterestAmount(interestAmount);
    const sGrand = interestAmount + total;
    setSgrand(sGrand);
  };

  const cardPaymentHandler = (e) => {
    setCardPayment(e.target.value);
    setRemainAmount(remainTaka);
    const cardPayment = e.target.value;
    const downPayment = parseFloat(cardPayment) + parseFloat(cashPaid);
    const remainAmount = parseFloat(netTaka) - downPayment;
    setDownPayment(downPayment);
    setRemainAmount(remainAmount);
  };

  const cashPaidHandler = (e) => {
    setCashPaid(e.target.value);
    setRemainAmount(remainTaka);
    const cashPaid = e.target.value;
    const downPayment = parseFloat(cardPayment) + parseFloat(cashPaid);
    const remainAmount = parseFloat(netTaka) - downPayment;
    setDownPayment(downPayment);
    setRemainAmount(remainAmount);
  };

  const discountHandler = (e) => {
    setDiscountAmount(e.target.value);
    const disAmt = e.target.value;
    const remainAmt = grandTotalTaka - disAmt - downPayment;
    const netAmt = grandTotal - disAmt;
    setRemainAmount(remainAmt);
    setNetAmount(netAmt);
  };
  const installDateHandler = (e) => {
    const insDate = e.target.value;
    setInstallDate(insDate);
  };
  const salesDatehandler = (e) => {
    const salesDate = e.target.value;
    setSalesDate(salesDate);
  };

  // Fetch Bank transaction no and card type id from bank transaction and card-type-setup api
  const { banks } = useSelector((state) => state.banks);
  const { card_types } = useSelector((state) => state.cardtypes);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBankTransactionLists(headers));
    dispatch(getCardTypeLists(headers));
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

  // Save credit sale data
  const creditSaleDataSaveHandler = (e) => {
    e.preventDefault();

    // Create array of object from credit sale product
    var creditSaleProduct = [];

    for (let pair of creditSalesProducts.entries()) {
      var creditProduct = {
        product: pair[1].productId,
        stock_detail: pair[1].sDeatilId,
        stock: pair[1].stockId,
        quantity: pair[1].quantity,
        unit_price: pair[1].unitPrice,
        interest_rate: pair[1].interest,
        total_interest: pair[1].interestAmount,
        ut_amount: pair[1].total,
        mp_rate_total: pair[1].sgrand,
      };
      creditSaleProduct.push(creditProduct);
    }

    // Create array of object from installment details --- creditSaleDetails
    var creditSaleDetails = [];

    for (let pair of installmentDetails.entries()) {
      var installmentDetail = {
        schedule_date: pair[1].schedule_date,
        payment_date: pair[1].payment_date,
        balance: pair[1].balance,
        net_value: pair[1].net_value,
        hire_value: pair[1].hire_value,
        installment_amount: pair[1].installment_amount,
        closing_balance: pair[1].closing_balance,
        payment_status: pair[1].payment_status,
        remarks: pair[1].remarks,
      };
      creditSaleDetails.push(installmentDetail);
    }

    // Save into database
    var creditSalesProductDetailsData = {
      invoice_number: moment(new Date()).format("DDMMMYY") + "-" + invoiceNo,
      customer: getCustomerId,
      customer_name: getCustomerName,
      customer_address: getCustomerAddress,
      customer_contact_no: getCustomerContact,
      bank: bankId,
      card_type: cardTypeId,
      card_paid_amount: cardPayment,
      grand_total: grandTotalTaka,
      down_payment: downPayment,
      discount: discountAmount,
      remaining: remainAmount,
      net_amount: netAmt,
      installments: installments,
      install_date: installDate,
      sales_date: saleDate,
      cash_paid: cashPaid,
      first_total_interest: totalInterestTaka,
      first_interest_rate: (totalInterestTaka / totalTaka) * 100,
      credit_sale_details: creditSaleDetails,
      credit_sale_product: creditSaleProduct,
    };
    if (!invoiceNo) {
      toast.warn("Please enter invoice number");
    } else if ((cardPayment && cardPayment > 0) && !bankId && !cardTypeId) {
      toast.warn("Please enter bank and card type!");
    } else if (invoice && invoice.invoice_number === formatInvoice) {
      toast.warn("This invoice already exists!");
    } else if (!getCustomerId) {
      toast.warn("Please select a customer!");
    } else if (!isCalculate && installmentDetails.length == 0) {
      toast.warn("Please first calculate installments then save!");
    } else {
      console.log(creditSalesProductDetailsData)
      dispatch(
        addCreditSales(creditSalesProductDetailsData, headers, props.onHide())
      );
      setGetCustomerId("");
      setGetCustomerPrevDue(0);
      setGetCustomerCode("")
      setGetCustomerName("")
      setInvoiceNo("")
      setBankId(null);
      setCardTypeId(null);
      reset();
      setCreditSalesProducts([])
      setInstallmentDetails([])
      localStorage.removeItem("installmentDetails");
      localStorage.removeItem("creditSalesProducts");
      toast.success("Credit sales product is adding...");
    }
  };
  const reset = () => {
    totalTaka = 0;
    grandTotalTaka = 0;
    remainTaka = 0;
    netTaka = 0;
    setQuantity(0);
    setSgrand(0);
    setUnitPrice(0);
    setTotal(0);
    setInterest(0);
    setInterestAmount(0);
    setGetPrevStockQty(0);
    setNetAmount(0)
    setCardPayment(0);
    setCashPaid(0);
    setDiscountAmount(0);
    setDownPayment(0);
    setGetPrevStockDetailId("")
    setGetPrevStockId("")
    setGetProductCode("")
    setGetProductId("")
    setInstallments(0)
  };

  const closeHandler = () => {
    reset()
    setGetProductCompressor(0)
    setGetProductPanel(0)
    setGetProductMotor(0)
    setGetProductSparepart(0)
    setGetProductService(0)
    setInstallments(0)
    setGetCustomerId("")
    setGetCustomerCode("")
    setInvoiceNo("");
    setDiscountAmount(0);
    setGetCustomerPrevDue(0);
    setGetCustomerName("")
    setBankId(null);
    setCardTypeId(null);
    props.onHide()
  }
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
      size="lg"
      dialogClassName="add-credit-sales"
    >
      <div>
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head">New Credit Sales </h4>
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
            {/*  Credit sales Add Form Start Here */}
            <div className="container companyBox">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  {/********** Customer section *************/}
                  <div className="row mt-2">
                    <div className="col-md-12 col-lg-12 companyBox">
                      <div className="row mt-2">
                        <div className="col-sm-12 col-md-2 col-lg-2 input-group input-group-sm">
                          <span className="spanTitle">Customer</span>
                        </div>
                        <div className="col-sm-12 col-md-10 col-lg-10">
                          <CustomerSearch
                            customerHandler={customerHandler}
                            code={getCustomerCode}
                            name={getCustomerName}
                          />
                        </div>
                      </div>
                      <div className="row mt-2 mb-2">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle" title="Sales Rate">
                                Prev. Due
                              </span>
                            </div>
                            <div className="col-md-8 col-lg-8 input-group input-group-sm">
                              <input
                                type="number"
                                className="form-control productInput"
                                placeholder="Previous due"
                                readOnly
                                value={getCustomerPrevDue}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle" title="Sales Rate">
                                InvoiceNo
                              </span>
                            </div>
                            <div className="col-md-8 col-lg-8 input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control productInput"
                                value={invoiceNo}
                                placeholder="Invoice no"
                                onChange={invoiceHandler}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/**********************Product Section ******************* */}

                  <div className="row mt-2">
                    <h4 className="sectionTitle">Product</h4>
                    <form onSubmit={productSubmitHandler}>
                      <div className="col-md-12 companyBox">
                        <div className="row">
                          <div className="col-md-12 col-lg-6">
                            <div className="row mt-2">
                              <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                <span className="spanTitle" title="Sales Rate">
                                  Barcode
                                </span>
                              </div>
                              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                <input
                                  type="text"
                                  className="form-control productInput"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="row mt-2">
                              <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                <span className="spanTitle" title="Sales Rate">
                                  Stock
                                </span>
                              </div>
                              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                <input
                                  type="text"
                                  className="form-control productInput"
                                  value={getPrevStockQty}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-lg-12">
                            <div className="row mt-2">
                              <div className="col-sm-12 col-md-12 col-lg-2 input-group input-group-sm">
                                <span className="spanTitle">Product</span>
                              </div>

                              <div className="col-sm-12 col-md-12 col-lg-10">
                                <ProductShowModal
                                  productHandler={productHandler}
                                  name={getProductName}
                                  code={getProductCode}

                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-12 col-lg-6">
                            <div className="row">
                              <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                <span className="spanTitle" title="Sales Rate">
                                  Quantity
                                </span>
                              </div>
                              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                <input
                                  type="number"
                                  className="form-control productInput"
                                  value={quantity}
                                  onChange={quantityHandler}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-6">
                            <div className="row">
                              <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                <span className="spanTitle" title="Sales Rate">
                                  U.Price
                                </span>
                              </div>
                              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                <input
                                  type="text"
                                  className="form-control productInput"
                                  value={unitPrice}
                                  onChange={unitPriceHandler}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2 mb-2">
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                <span className="spanTitle" title="Sales Rate">
                                  Interest(%)
                                </span>
                              </div>
                              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                <input
                                  type="text"
                                  className="form-control productInput"
                                  value={interest}
                                  onChange={interestHandler}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                <span className="spanTitle" title="Sales Rate">
                                  T.Interest
                                </span>
                              </div>
                              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                <input
                                  type="text"
                                  className="form-control productInput"
                                  value={interestAmount}
                                  //onChange={interestAmountHandler}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-12 col-lg-6">
                            <div className="row">
                              <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                <span className="spanTitle" title="Sales Rate">
                                  Total
                                </span>
                              </div>
                              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                <input
                                  type="text"
                                  className="form-control productInput"
                                  readOnly
                                  value={total}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="row">
                              <div className="col-md-12 col-lg-4 input-group input-group-sm">
                                <span className="spanTitle" title="Sales Rate">
                                  S.Grand
                                </span>
                              </div>
                              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                <input
                                  type="text"
                                  className="form-control productInput"
                                  readOnly
                                  value={sgrand}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-2 mb-2">
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-12 col-lg-4 input-group input-group-sm"></div>
                              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                                <Button
                                  className="addSlaesBtn w-100 bg-info border "
                                  type="submit"
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-12 col-lg-4 input-group input-group-sm salesBtnGroup"></div>
                              <div className="col-md-12 col-lg-8 input-group input-group-sm salesBtnGroup">
                                <Button
                                  className="addSlaesBtn w-100 bg-danger border"
                                  onClick={() => deleteProduct(selectId)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* Product section end here */}

                  {/* Warrenty section */}
                  <div className="row ">
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
                                readOnly
                                value={getProductCompressor}
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
                                readOnly
                                value={getProductPanel}
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
                                readOnly
                                value={getProductMotor}
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
                                readOnly
                                value={getProductSparepart}
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
                                readOnly
                                value={getProductService}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Warrenty section end here */}

                  {/* Product table section start here */}

                  <div className="row">
                    <div className="col-md-12 col-lg-12 supplierBox">
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
                                Category
                              </th>
                              <th className="header" scope="col">
                                QTY
                              </th>
                              <th className="header" scope="col">
                                U.Price
                              </th>
                              <th className="header" scope="col">
                                T.Interest
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
                  </div>

                  {/* Product table section end here */}

                  {/* Installment details info table start here*/}

                  <div className="row">
                    <h4 className="sectionTitle"> Installment Details</h4>
                    <div className="col-md-12 col-lg-12 supplierBox">
                      <div
                        className="tableContainer table-responsive"
                        style={{ height: "185px" }}
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
                                Schedule
                              </th>
                              <th className="header" scope="col">
                                Pay Date
                              </th>
                              <th className="header" scope="col">
                                Openning
                              </th>
                              <th className="header" scope="col">
                                Net
                              </th>
                              <th className="header" scope="col">
                                Hire
                              </th>
                              <th className="header" scope="col">
                                Ins
                              </th>

                              <th className="header" scope="col">
                                Closing
                              </th>
                              <th className="header" scope="col">
                                Status
                              </th>
                              <th className="header" scope="col">
                                Remarks
                              </th>
                            </tr>
                          </thead>
                          <tbody>{installData}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* Installment payment info table end here*/}
                </div>

                {/* Credit sales right side start here */}

                <div className="col-md-12 col-lg-4">
                  {/* Added Amount start here */}
                  <div
                    className="row supplierBox"
                    style={{ display: "block", textAlign: "center" }}
                  >
                    <h4 className="sectionTitle mb-0">Added Amount</h4>
                    <div className="col-md-12">
                      <div className="row mt-1">
                        <div className="col-sm-12 col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle">Interest Rate(%)</span>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput"
                            name="card_paid_amount"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row mt-1 mb-2">
                        <div className="col-sm-12 col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle">Interest Amount</span>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput"
                            name="card_paid_amount"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card payment start here */}
                  <div className="row mt-2">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <h4 className="sectionTitle">Card Payment</h4>
                      <div className="row supplierBox">
                        <div className="col-md-12">
                          <div className="row mt-2">
                            <div className="col-sm-12 col-md-12 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle">Bank</span>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8 input-group input-group-sm">
                              <select
                                className="form-control input-group input-group-sm productInput"
                                name="bank_tranId"
                                value={bankId}
                                onChange={(e) => setBankId(e.target.value)}
                              >
                                <option>Select Bank</option>
                                {bank}
                              </select>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-sm-12 col-md-12 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle">Card</span>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8 input-group input-group-sm">
                              <select
                                className="form-control productInput"
                                name="card_type_setupID"
                                value={cardTypeId}
                                onChange={(e) => setCardTypeId(e.target.value)}
                              >
                                <option>Select Card Type</option>
                                {cardTypeList}
                              </select>
                            </div>
                          </div>
                          <div className="row mt-2 mb-2">
                            <div className="col-sm-12 col-md-12 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle">Amount</span>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8 input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control productInput"
                                name="card_paid_amount"
                                value={cardPayment}
                                onChange={cardPaymentHandler}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Details Information start here */}
                  <div className="row mt-2">
                    <h4 className="sectionTitle">Details Information</h4>
                    <div className="col-md-12 col-lg-12 supplierBox pt-3 ">
                      <form className="mb-5">
                        <div className="row mb-2 ">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Grand Total
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              readOnly
                              value={parseFloat(grandTotalTaka).toFixed(3)}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Cash Paid
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              value={cashPaid}
                              onChange={cashPaidHandler}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Down Payment
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              readOnly
                              value={downPayment}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Discount Amt.
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              value={discountAmount}
                              onChange={discountHandler}
                            />
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Net Amount
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              readOnly
                              value={parseFloat(netTaka).toFixed(3)}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Remaining Amt.
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              readOnly
                              value={cashPaid == 0 && discountAmount == 0 && cardPayment == 0 ? parseFloat(grandTotalTaka).toFixed(2) : parseFloat(remainAmount).toFixed(3)}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Installments
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              value={installments}
                              onChange={installmentHandler}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Install Date
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="date"
                              value={installDate}
                              className="form-control productInput input-sm"
                              onChange={installDateHandler}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" for="warningQty">
                              Sales Date
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="date"
                              value={saleDate}
                              className="form-control productInput input-sm"
                              onChange={salesDatehandler}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="row mb-2 mt-0">
                          <div className="col-md-12 col-lg-12 input-group input-group-sm ">
                            <span className="spanTitle" for="warningQty">
                              Last Pay Adjustment
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-12 input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="row mb-2 mt-0">
                          <div className="col-md-12 col-lg-12 ">
                            <Button
                              type="submit"
                              className=" border border-none w-100 bg-info "
                              onClick={installDetailsCalculateHandler}
                            >
                              Calculate Installments
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 ">
                  <Button
                    className="saveCloseBtn border border-none"
                    onClick={props.onHide}
                  // disabled={isInstallment}
                  >
                    Sales Invoice
                  </Button>
                  <Button
                    type="submit"
                    className="saveCloseBtn pull-right closebtn border border-none"
                    onClick={closeHandler}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="saveCloseBtn pull-right updatebtn border border-none"
                    onClick={creditSaleDataSaveHandler}
                  >
                    Save
                  </Button>

                  <Button
                    type="submit"
                    className="saveCloseBtn editbtn  border border-none"
                  >
                    Money Receipt
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AddCreditSales;
