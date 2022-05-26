import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import {
  editCreditSales,
  updateInterestAmount,
} from "../../../../redux/actions/creditSales";
// Draggable feature
class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
// getting the installment details of local storage
const getDatafromLStorage = () => {
  const data = localStorage.getItem("installmentDetails");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
// getting the installment details of cash paid information
const getCashPaidDatafromLS = () => {
  const data = localStorage.getItem("cashPaidInstallments");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
const EditCreditSales = ({ show, onHide,select }) => {
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
 // const [selectedId, setSelectId] = useState("");
  const [singleInstallment, setSingleInstallment] = useState("");
  const [installCash, setInstallCash] = useState(0);
  const [installTotal, setInstallTotal] = useState(0);
  //const [creditStatus, setCreditStatus] = useState(false);
  const [isAllPaid, setIsAllPaid] = useState(false);
  const [lastPayAdjustment, setLastPayAdjustment] = useState(0);
  const [dueOpenning, setDueOpenning] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [totalRemain, setTotalRemain] = useState(0);
  const [installments, setInstallments] = useState(0);

  // Card payment state
  const [bankId, setBankId] = useState("");
  const [cardTypeId, setCardTypeId] = useState("");
  const [cardPayment, setCardPayment] = useState(0);

  const [installmentDetails, setInstallmentDetails] = useState(
    getDatafromLStorage()
  );
  const [cashPaidInstallments, setCashPaidInstallments] = useState(
    getCashPaidDatafromLS()
  );
  // saving installment details data to local storage
  useEffect(() => {
    localStorage.setItem(
      "installmentDetails",
      JSON.stringify(installmentDetails)
    );
  }, [installmentDetails]);
  // saving installment details data to local storage
  useEffect(() => {
    localStorage.setItem(
      "cashPaidInstallments",
      JSON.stringify(cashPaidInstallments)
    );
  }, [cashPaidInstallments]);
useEffect(()=> {
  setIsPaid(false)
  setCashPaidInstallments([])
  localStorage.removeItem("cashPaidInstallments")
},[])
  var status = false;
  // Get credit sales details
  const { creditsales_details } = useSelector((state) => state.creditsales);

  const credit_details =
    creditsales_details && creditsales_details.credit_sale_details;

    console.log(credit_details)
  //setInstallments(creditsales_details.installments)
  if (credit_details) {
    var installData = credit_details.map((data, i) => {
      return (
        <tr
          //style={{ height: "5px", fontSize: "12px" }}
          className="editCreditTable"
          key={data.id}
          style={isActive === i ? { background: "#7b8bf9b8" } : { background: "" }}
          onClick={() => creditSaleActive(i - 1, data.id)}
        >
          <td>{++i}</td>
          <td>{moment(data.schedule_date).format("YYYY-MM-DD")}</td>
          <td>{moment(data.payment_date).format("YYYY-MM-DD")}</td>
          <td>{data.balance.toFixed(2)}</td>
          <td>{data.net_value.toFixed(2)}</td>
          <td>{data.hire_value.toFixed(2)}</td>
          <td>{data.installment_amount.toFixed(2)}</td>
          <td>{data.closing_balance.toFixed(2)}</td>
          <td>{
            data.payment_status ==="Paid" ? <span className="badge badge-success">{data.payment_status}</span> : <span className="badge badge-danger">{data.payment_status}</span>
            }</td>
          {/* <td style={data.payment_status =="Paid" ? {background:"red"}: {background:'#e0d4fa'}}>{data.payment_status}</td> */}
          <td>{data.remarks}</td>
        </tr>
      );
    });
  }
 
  //Show installment details from local storage
  if (installmentDetails) {
    var localInstallData = installmentDetails.map((data, i) => {
      return (
        <tr
          //style={{ height: "5px", fontSize: "12px" }}
          className="editCreditTable"
          key={data.id}
          style={isActive === i ? { background: "#7b8bf9b8" } : { background: "" }}
          onClick={() => creditSaleActive(i - 1, data.id)}
        >
          <td>{++i}</td>
          <td>{moment(data?.schedule_date).format("YYYY-MM-DD")}</td>
          <td>{moment(data?.payment_date).format("YYYY-MM-DD")}</td>
          <td>{data?.balance?.toFixed(2)}</td>
          <td>{data?.net_value?.toFixed(2)}</td>
          <td>{data?.hire_value?.toFixed(2)}</td>
          <td>{data?.installment_amount?.toFixed(2)}</td>
          <td>{data?.closing_balance?.toFixed(2)}</td>
          <td>{
            data.payment_status ==="Paid" ? <span className="badge badge-success">{data.payment_status}</span> : <span className="badge badge-danger">{data.payment_status}</span>
            }</td>
          <td>{data?.remarks}</td>
        </tr>
      );
    });
  }

   //Show installment details from local storage after paying taka

   if (cashPaidInstallments) {
    var cashPaidInstallData = cashPaidInstallments.map((data, i) => {
      return (
        <tr
          className="editCreditTable"
          key={data.id}
          style={isActive === i ? { background: "#7b8bf9b8" } : { background: "" }}
          onClick={() => creditSaleActive(i - 1, data.id)}
        >
          <td>{++i}</td>
          <td>{moment(data?.schedule_date).format("YYYY-MM-DD")}</td>
          <td>{moment(data?.payment_date).format("YYYY-MM-DD")}</td>
          <td>{data?.balance?.toFixed(2)}</td>
          <td>{data?.net_value?.toFixed(2)}</td>
          <td>{data?.hire_value?.toFixed(2)}</td>
         <td>{parseFloat(data?.installment_amount)?.toFixed(2)}</td>  
          <td>{data?.closing_balance?.toFixed(2)}</td>
          <td>{data.payment_status ==="Paid" ? <span className="badge badge-success">{data.payment_status}</span> : <span className="badge badge-danger">{data.payment_status}</span>}</td>
          <td>{data?.remarks}</td>
        </tr>
      );
    });
  }

  //Show product information from local storage
  const product_details =
    creditsales_details && creditsales_details.credit_sale_product;
   console.log("product_details", product_details);
  if (product_details) {
    var productData = product_details.map((data, i) => {
      if (data) {
        return (
          <tr style={{ height: "5px", fontSize: "12px" }} key={data.id}>
            <td>{++i}</td>
            <td>{data.product_code}</td>
            <td>{data.product_name}</td>
            <td>{data.quantity}</td>
            <td>{data.unit_price}</td>
            <td>{data.total_interest}</td>
            <td>{data.mp_rate_total}</td>
          </tr>
        );
      } else {
        return <p style={{ background: "red" }}>No data found</p>;
      }
    });
  }
  // Select installment data for updating
  const creditSaleActive = (i, id) => {
    if (isActive === i) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(i);
      setIsSelect(true);
      //setSelectId(parseInt(id));
    }
    var installmentData = credit_details.find((data) => data.id === id);
    setSingleInstallment(installmentData);
  };
  const dispatch = useDispatch();

  // Fetch Bank transaction no and card type id from bank transaction and card-type-setup api
  const { banks } = useSelector((state) => state.banks);
  const {card_types} = useSelector((state) => state.cardtypes);

  // Map bank name
  const bankTransaction = banks.map((data) => {
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
  //   get redux auth state
  const { user: currentUser } = useSelector((state) => state.auth);
  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // Card payment handler
  const cardPaymentHandler = (e) => {
    setCardPayment(e.target.value);
    if(isAllPaid){
      const cardPayment = e.target.value;
      const cash = installTotal - cardPayment
      setDueOpenning(cash)

    }else{
      const cardPayment = e.target.value;
      const total = parseFloat(cardPayment) + parseFloat(installCash);
      setInstallTotal(total)  
    }
     
  };

  const installCashHandler = (e) => {
    const cash = e.target.value;
    const total = parseFloat(cardPayment) + parseFloat(cash);
    setInstallCash(cash);
    setInstallTotal(total);
  };

  let paid_details = [];
  let due_details = [];
  let due_count = 0;
  let paid_count = 0;

  // Separate due and paid status data
  credit_details?.forEach((details) => {
    for (let key in details) {
      if (details[key] === "Due") {
        due_details.push(details);
        due_count++;
        //console.log("Due details", due_details);
      } else if (details[key] === "Paid") {
        paid_details.push(details);
        paid_count++;
        //console.log("paid details", paid_details);
      }
    }
  });
  // Save installments data into database after clicking paid button
  const cashPaidHandler = (e) => {
    setCashPaidInstallments([])
  localStorage.removeItem("cashPaidInstallments")
    const prev_openning = singleInstallment && singleInstallment.balance;
    const prev_insNo = creditsales_details && creditsales_details.installments;
    const prev_installDate =
      creditsales_details && creditsales_details.install_date;
    const prev_salesDate =
      creditsales_details && creditsales_details.sales_date;

    const prev_net = singleInstallment && singleInstallment.net_value;
    const prev_hire = singleInstallment && singleInstallment.hire_value;
    const prev_ins = singleInstallment && singleInstallment.installment_amount;
    const prev_insDate = singleInstallment && singleInstallment.payment_date;
    const customer_id = creditsales_details && creditsales_details.customer;
    const prev_remarks = creditsales_details && creditsales_details.remarks;
    // calculate the percentage of net and higher amount
    const percentage_net = (prev_net * 100) / prev_ins;
    const percentage_hire = (prev_hire * 100) / prev_ins;
    //Create an empty array and a object of isnatll details
    var insArray = [];
    var installDetails = {
      schedule_date: "",
      payment_date: "",
      balance: 0,
      net_value: 0,
      hire_value: 0,
      installment_amount: 0,
      closing_balance: 0,
      payment_status: "",
      remarks: "",
    };

    var dateFormat = new Date(prev_insDate);
    dateFormat.setMonth(dateFormat.getMonth());
    var date = moment(prev_insDate).format("YYYY-MM-DD");
    //console.log("schedule date", date);

    const currentDate = moment(new Date()).format("YYYY-MM-DD");

    const closing = prev_openning - installCash;
    const ins = installCash;
    const net = (percentage_net / 100) * ins;
    const hire = (percentage_hire / 100) * ins;
    var openning = prev_openning;
    // Put the calculate result into the object install details and push insArray

    installDetails = {
      schedule_date: date,
      payment_date: currentDate,
      balance: openning,
      net_value: net,
      hire_value: hire,
      installment_amount: ins,
      closing_balance: closing,
      payment_status: "Paid",
      remarks: prev_remarks,
    };
    //console.log("Out loop", installDetails);
    insArray.push(installDetails);
    paid_details.push(installDetails)

    if (due_count - 1 > 0 && !isAllPaid) {
      const install = closing / (due_count - 1);
      openning = closing;
      for (var i = 0; i < due_count - 1; i++) {
        var insPayDateFormat = new Date(prev_insDate);
        insPayDateFormat.setMonth(insPayDateFormat.getMonth() + (i + 1));
        var insPayDate = moment(insPayDateFormat).format("YYYY-MM-DD");

        const open = installDetails.closing_balance;
        const closing = open - install;
        const ins = install;
        const net = (percentage_net / 100) * ins;
        const hire = (percentage_hire / 100) * ins;
        // openning = closing;

        installDetails = {
          schedule_date: insPayDate,
          payment_date: insPayDate,
          balance: openning,
          net_value: net,
          hire_value: hire,
          installment_amount: ins,
          closing_balance: closing,
          payment_status: "Due",
          remarks: prev_remarks,
        };
        //console.log("In loop", installDetails);
        insArray.push(installDetails);
        paid_details.push(installDetails)
        openning = closing;
      }
    } else {
       status = true
      setLastPayAdjustment(closing);
    }
    //setCashPaidInstallments(paid_details)
    var install_details = [];
    // Store into database
    for (let pair of insArray.entries()) {
      var installmentDetail = {
        schedule_date: pair[1].schedule_date,
        payment_date: pair[1].payment_date,
        balance: pair[1].balance,
        net_value: pair[1].net_value,
        hire_value: pair[1].hire_value,
        installment_amount: pair[1].installment_amount,
        closing_balance: pair[1].closing_balance,
        payment_status: pair[1].payment_status,
        last_pay_adjustment: lastPayAdjustment,
      };
      install_details.push(installmentDetail);
    }

    var creditSalesProductDetailsData = {
      invoice_number: creditsales_details && creditsales_details.invoice_number,
      customer: customer_id,
      installments: prev_insNo,
      cash_paid: installCash,
      status: status,
      sales_date: prev_salesDate,
      install_date: prev_installDate,
      card_paid_amount: cardPayment,
      card_type: cardTypeId,
      bank: bankId,
      //last_pay_adjustment: lastPayAdjustment,
      credit_sale_details: install_details,
      //credit_sale_product: creditSaleProduct,
    };
    console.log("creditSalesProductDetailsData",creditSalesProductDetailsData)
    if(cardPayment && !bankId){
      toast.warn("Please select a bank!");
    }else if(cardPayment && !cardTypeId){
      toast.warn("Please select a card!");
    }else if(!isSelect && !isAllPaid){
      toast.warn("Please select an installment payment for paying!");
    }
    else{
      // Testn for auto loading after click paid button 
      // console.log("install_details",install_details)
    
      setCashPaidInstallments(paid_details)
      setIsPaid(true)
      dispatch(
        editCreditSales(
          creditSalesProductDetailsData,
          headers,
          creditsales_details.id
        )    
      );

      toast.success("Update Process is Going On")
      //dispatch(getCreditSalesDetails(creditsales_details.id,headers))
      // toast.success("Update Process is Going On", {
      //   icon: ({ theme, type }) => (
      //     <img
      //     alt=""
      //       height={"27px"}
      //       src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"
      //     />
      //   ),
      // });
    }  
  };

  /**
   *  Installments  for interest section ---it works after clicking calculate button
   *  saveInterestHandler works for calculating new installment's calculation and store into localstorage.
   */

  const interestCalculateHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem(installmentDetails);

    var installTime = parseInt(installments);
    var date;
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
    var close = totalRemain;
    if (due_details.length > 0) {
      for (var i = 0; i < installTime; i++) {
        if (due_details.payment_date) {
          var dateFormat = new Date(due_details.payment_date);
          dateFormat.setMonth(dateFormat.getMonth() + (i + 1));
            date = moment(dateFormat).format("YYYY-MM-DD");
        } else {
          var payDateFormat = new Date();
          payDateFormat.setMonth(payDateFormat.getMonth() + (i + 1));
           date = moment(payDateFormat).format("YYYY-MM-DD");
        }
        var open = close;

        const totalHire = totalRemain - interestAmount;
        const hire = totalHire / installTime;
        //setHireAmt(hire)
        const ins = totalRemain / installTime;
        const net = Math.max(0, ins - hire);
        close = open - ins;

        installDetails = {
          schedule_date: date,
          payment_date: date,
          balance: open,
          net_value: net,
          hire_value: hire,
          installment_amount: ins,
          closing_balance: close,
          payment_status: "Due",
          remarks: 0,
        };
        paid_details.push(installDetails);
      }
    }
    setInstallmentDetails(paid_details);
  };

  /**
   * When user click all paid, then select first data of installmentDetails.
   * After giving adjustment amount, user click paid button to submit into database.
   * First work IsAllPaid and then cashPaidHandler.
  */

  const allpaidHandler = (e) => {
    const allPiad = e.target.checked;
    setIsAllPaid(allPiad);
    if (due_details.length > 0 && allPiad) {
      var due_openning = due_details[0].balance;
      //setCreditStatus(true);
      const totalCashPaid = due_details[0].balance - lastPayAdjustment;
      setInstallCash(totalCashPaid);
      setInstallTotal(totalCashPaid);
      setDueOpenning(due_openning);
      const id = due_details[0].id;
      var installmentData = due_details.find((data) => data.id === id);
      setSingleInstallment(installmentData);
    } else {
      setInstallCash(0);
      setInstallTotal(0);
      setDueOpenning(0);
      //setCreditStatus(false);
    }
  };
  const lastPayHandler = (e) => {
    const lastPay = e.target.value;
    setLastPayAdjustment(lastPay);
    const totalCashPaid = due_details[0].balance - lastPay;
    setInstallCash(totalCashPaid);
    setInstallTotal(totalCashPaid);
    setDueOpenning(totalCashPaid);
  };
  const interestRateHandler = (e) => {
    const intRate = e.target.value;
    setInterestRate(intRate);
    const prevRemaining = creditsales_details && creditsales_details.remaining;
    const intAmount = (prevRemaining * intRate) / 100;
    const totalRemaining = prevRemaining + intAmount;
    setTotalRemain(totalRemaining);
    setInterestAmount(intAmount);
  };

  const closeHandler = () => {
    setIsAllPaid(false);
    setDueOpenning(0);
    setInstallCash(0);
    setLastPayAdjustment(0);
    select()
    onHide();
    setCashPaidInstallments([])
    setIsPaid(false)
    localStorage.removeItem("cashPaidInstallments");
  };
  /**
   * When some interest and installment time are added, then we click calculate button for calculating new installment datails.
   * After calculating new installment, we click save button to store all data into database.
   *  saveInterestHandler works for storing final data into database.
   */

  const saveInterestHandler = (e) => {
    e.preventDefault();
    //const prev_installDate = creditsales_details && creditsales_details.install_date;
    const prev_invoice =
      creditsales_details && creditsales_details.invoice_number;
    const customer_id = creditsales_details && creditsales_details.customer;
    const prev_salesDate =
      creditsales_details && creditsales_details.sales_date;
    const prev_insDate =
      creditsales_details && creditsales_details.install_date;
    var creditSaleProduct = [];
    // Create array of object from installment details --- creditSaleDetails
    var creditSaleDetails = [];
    for (let pair of installmentDetails.entries()) {
      var installmentDetail = {
        schedule_date: moment(pair[1].schedule_date).format("YYYY-MM-DD"),
        payment_date: moment(pair[1].payment_date).format("YYYY-MM-DD"),
        balance: pair[1].balance,
        net_value: pair[1].net_value,
        hire_value: pair[1].hire_value,
        installment_amount: pair[1].installment_amount,
        closing_balance: pair[1].closing_balance,
        payment_status: pair[1].payment_status,
      };
      creditSaleDetails.push(installmentDetail);
    }
    console.log("creditSaleDetails", creditSaleDetails);
    // Save into database
    var creditSalesProductDetailsData = {
      invoice_number: prev_invoice,
      customer: customer_id,
      remaining: totalRemain,
      installments: installments,
      install_date: moment(prev_insDate).format("YYYY-MM-DD"),
      sales_date: moment(prev_salesDate).format("YYYY-MM-DD"),
      credit_sale_details: creditSaleDetails,
      credit_sale_product: creditSaleProduct,
    };
    dispatch(
      updateInterestAmount(
        creditSalesProductDetailsData,
        headers,
        creditsales_details.id
      )
    );
    //console.log("Submmiting Data:", creditSalesProductDetailsData);
    localStorage.removeItem("installmentDetails");
    onHide();
    toast.success("Credit sales product updated successfully");
  };
 
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
     dialogClassName="edit-credit-sales"
      size="lg"
    >
      <div>
        <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
          <div>
            <h4 className="responsive-head">Edit Credit Sales</h4>
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
          {/*  Credit sales Add Form Start Here */}
          <div className="custom_modal_inner_content">
            <div className="container companyBox">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  {/********** Customer section *************/}
                  <div className="row ">
                    <div className="col-md-12 col-lg-10 companyBox">
                      <div className="row mt-2">
                        <div className="col-sm-12 col-md-3 input-group input-group-sm ">
                          <span className="spanTitle">Customer</span>
                        </div>
                        <div className="col-sm-12 col-md-5 input-group input-group-sm">
                          <input
                            type="text"
                            placeholder="Code"
                            value={
                              creditsales_details &&
                              creditsales_details.customer_code
                            }
                            readOnly
                            className="form-control productInput"
                          />
                        </div>
                        <div className="col-sm-12 col-md-4 input-group input-group-sm">
                          <input
                            className="form-control productInput"
                            type="text"
                            placeholder="Name"
                            value={
                              creditsales_details &&
                              creditsales_details.customer_name
                            }
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row mt-2 mb-2">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-5 input-group input-group-sm">
                              <span className="spanTitle" title="Sales Rate">
                                Prev. Due
                              </span>
                            </div>
                            <div className="col-md-7 input-group input-group-sm">
                              <input
                                type="number"
                                className="form-control productInput"
                                readOnly
                                value={
                                  creditsales_details &&
                                  parseFloat(creditsales_details.customer_prev_due).toFixed(2)
                                }
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
                                value={
                                  creditsales_details &&
                                  creditsales_details.invoice_number
                                }
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 col-lg-2 companyBox  chekcPaid">
                      <input type="checkbox" onClick={allpaidHandler} /> Is All
                      Paid
                    </div>
                  </div>

                  {/* Product table section start here */}

                  <div className="row mt-2">
                    <div className="col-md-12 col-lg-12 supplierBox">
                      <div
                        className="tableContainer table-responsive"
                        style={{ height: "160px" }}
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
                            </tr>
                          </thead>
                          <tbody>{productData && productData}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Product table section end here */}
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
                            type="number"
                            className="form-control productInput"
                            name="card_paid_amount"
                            value={interestRate}
                            onChange={interestRateHandler}
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
                            type="number"
                            className="form-control productInput"
                            name="card_paid_amount"
                            value={interestAmount}
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
                                <option value="">Select Bank Transaction</option>
                                {bankTransaction}
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
                                <option  value="">Select Card Type</option>
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
                </div>
              </div>
              {/* Col-md-8 end here */}

              {/* Details Information start here */}
              <div className="row mt-2">
                <h4 className="sectionTitle">Details Information</h4>
                <div className="col-md-12 col-lg-12 supplierBox pt-3 ">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="warningQty">
                            Grand Total
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={
                              creditsales_details &&
                              creditsales_details.grand_total
                            }
                            readOnly
                            // value={parseFloat(totalTaka).toFixed(3)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="warningQty">
                            Cash Paid
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={
                              creditsales_details && creditsales_details.cash_paid
                            }
                            readOnly
                            // value={cashPaid}
                            // onChange={cashPaidHandler}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="warningQty">
                            Down Payment
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={
                              creditsales_details &&
                              creditsales_details.down_payment
                            }
                            readOnly
                            // value={downPayment}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="warningQty">
                            Discount Amt.
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={
                              creditsales_details && creditsales_details.discount
                            }
                            readOnly
                            // value={discountAmount}
                            // onChange={discountHandler}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      {totalRemain ? (
                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" htmlFor="warningQty">
                              Remaining Amt.
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              value={totalRemain}
                              readOnly
                              // value={parseFloat(remainAmount).toFixed(3)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" htmlFor="warningQty">
                              Remaining Amt.
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              value={
                                creditsales_details &&
                                creditsales_details.remaining
                              }
                              readOnly
                              // value={parseFloat(remainAmount).toFixed(3)}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="warningQty">
                            Net Amount
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={
                              creditsales_details &&
                              creditsales_details.net_amount
                            }
                            readOnly
                            // value={netTaka.toFixed(3)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      {interestRate ? (
                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" htmlFor="warningQty">
                              Installments
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              value={installments}
                              //value={creditsales_details && creditsales_details.installments}
                              onChange={(e) => setInstallments(e.target.value)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="row mb-2">
                          <div className="col-md-12 col-lg-5 input-group input-group-sm">
                            <span className="spanTitle" htmlFor="warningQty">
                              Installments
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-7 input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              value={
                                creditsales_details &&
                                creditsales_details.installments
                              }
                              readOnly
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="warningQty">
                            Install Date
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="date"
                            className="form-control productInput input-sm"
                            value={
                              creditsales_details &&
                              moment(creditsales_details.install_date).format(
                                "YYYY-MM-DD"
                              )
                            }
                            // onChange={(e) => setInstallDate(e.target.value)}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="warningQty">
                            Sales Date
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="date"
                            className="form-control productInput input-sm"
                            value={
                              creditsales_details &&
                              moment(creditsales_details.sales_date).format(
                                "YYYY-MM-DD"
                              )
                            }
                            // onChange={(e) => setSalesDate(e.target.value)}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    {
                      dueOpenning?
                      <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="warningQty">
                            Last Pay Adjustment
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={lastPayAdjustment}
                            onChange={lastPayHandler}
                          />
                        </div>
                      </div>
                    </div>
                      :
                      due_count == 1 ?
                      <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="warningQty">
                            Last Pay Adjustment
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={lastPayAdjustment}
                            onChange={lastPayHandler}
                          />
                        </div>
                      </div>
                    </div>
                    
                       :
                      <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-5 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="warningQty">
                            Last Pay Adjustment
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-7 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={lastPayAdjustment}
                            //onChange={lastPayHandler}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    }
                
                  </div>
                </div>
              </div>
              {/* Details Information end here */}

              {/* Installment details info table start here*/}
              <div className="row mt-2">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-8 col-lg-9 supplierBox">
                      <h4 className="sectionTitle"> Installment Details</h4>
                      <div
                        className="tableContainer table-responsive"
                        style={{ height: "200px" }}
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
                          <tbody>{cashPaidInstallData.length > 0 ? cashPaidInstallData : localInstallData.length > 0 ? localInstallData: installData }</tbody>
                        </table>
                      </div>
                    </div>
                    {/* Installment payment info */}
                    <div className="col-sm-12 col-md-4 col-lg-3 supplierBox">
                      <h4 className="sectionTitle">Installment Payment Info</h4>
                      {dueOpenning ? (
                        <div className="row mt-2 mb-2">
                          <div className="col-sm-12 col-md-12 col-lg-4 input-group input-group-sm">
                            <span className="spanTitle">Cash</span>
                          </div>
                          <div className="col-sm-12 col-md-12 col-lg-8 input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput"
                              name="card_paid_amount"
                              value={dueOpenning}
                              readOnly
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="row mt-2 mb-2">
                          <div className="col-sm-12 col-md-12 col-lg-4 input-group input-group-sm">
                            <span className="spanTitle">Cash</span>
                          </div>
                          <div className="col-sm-12 col-md-12 col-lg-8 input-group input-group-sm">
                            <input
                              type="number"
                              className="form-control productInput"
                              name="card_paid_amount"
                              value={installCash}
                              onChange={installCashHandler}
                            />
                          </div>
                        </div>
                      )}

                      {/* <div className="col-sm-12 col-md-12 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle">Total</span>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput"
                            name="card_paid_amount"
                            value={dueOpenning ? dueOpenning : installTotal}
                            //onChange={installCashHandler}
                            readOnly
                          />
                        </div> */}

                      {dueOpenning ? (
                        <div className="row mt-2 mb-2">
                          <div className="col-sm-12 col-md-12 col-lg-4 input-group input-group-sm">
                            <span className="spanTitle">Total</span>
                          </div>
                          <div className="col-sm-12 col-md-12 col-lg-8 input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput"
                              name="card_paid_amount"
                              value={installTotal}
                              readOnly
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="row mt-2 mb-2">
                          <div className="col-sm-12 col-md-12 col-lg-4 input-group input-group-sm">
                            <span className="spanTitle">Total</span>
                          </div>
                          <div className="col-sm-12 col-md-12 col-lg-8 input-group input-group-sm">
                            <input
                              type="number"
                              className="form-control productInput"
                              name="card_paid_amount"
                            // value={parseFloat(installTotal).toFixed(2)}
                              value={installTotal}
                              readOnly
                              //onChange={installCashHandler}
                            /> 
                          </div>
                        </div>
                      )}

                      <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-8 input-group input-group-sm salesBtnGroup">
                          <Button
                            className="addSlaesBtn w-100 btn-info"
                            type="submit"
                            onClick={cashPaidHandler}
                            disabled={isPaid}
                          >
                            Paid
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Installment payment info table end here*/}
                  </div>
                </div>
              </div>
            </div>
            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 ">
                  <Button
                  className="saveCloseBtn border btn-info" 
                  onClick={onHide}
                  disabled={isAllPaid}
                  >
                    Sales Invoice
                  </Button>
                  <Button
                    type="submit"
                    className="saveCloseBtn pull-right border closebtn"
                    onClick={onHide}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="saveCloseBtn pull-right border updatebtn"
                    onClick={saveInterestHandler}
                    disabled={isAllPaid}
                  >
                    Save
                  </Button>
                  <Button
                    type="submit"
                    className="saveCloseBtn pull-right border btn-warning"
                    onClick={interestCalculateHandler}
                    disabled={isAllPaid}
                  >
                    Calculate
                  </Button>
                  <Button 
                  type="submit" 
                  className="saveCloseBtn pull-right border border-0 px-4"
                  disabled={isAllPaid}              
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

export default EditCreditSales;
