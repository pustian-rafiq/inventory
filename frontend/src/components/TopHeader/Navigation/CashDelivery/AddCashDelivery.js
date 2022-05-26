import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Draggable from "react-draggable";
import { getBankLists } from "../../../../redux/actions/bankActions";
//import CompanySearch from "../../../MISReport/AvailableStockReport/CompanySearch";
import {
  addCashDelivery,
  getCashDelivery,
} from "../../../../redux/actions/cashDelivery";
import SupplierSearch from "./AddSupplier/SupplierSearch";
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

const AddCashDelivery = (props) => {
  const [getSupplierId, setGetSupplierId] = useState("");
  const [getSupplierName, setGetSupplierName] = useState("");
  const [getSupplierCN, setGetSupplierCN] = useState("");
  const [getSupplierTotalDue, setGetSupplierTotalDue] = useState("0.00");
  const [errors, seterrors] = useState({});

  //Cash delivery input field state
  const [entryDate, setEntryDate] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [bankName, setBankName] = useState("");
  const [checkNo, setCheckNo] = useState("");
  const [checkIssueDate, setCheckIssueDate] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [mbaAcountNo, setMbaAccountNo] = useState("");
  const [bkash, setBkash] = useState("");
  const [totalDue, setTotalDue] = useState(getSupplierTotalDue);
  const [amount, setAmount] = useState(0);
  const [adjustAmount, setAdjustmentAmount] = useState(0);
  const [balanceDue, setBalanceDue] = useState(0);

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const currentDate = new Date().toLocaleString();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  //Create form data object and append all field value into its
  const formData = new FormData();

  formData.append("entry_date", entryDate);
  formData.append("receipt_no", receiptNo);
  formData.append("supplier", getSupplierId);
  formData.append("supplier_name", getSupplierName);
  formData.append("contact_no", getSupplierCN);
  formData.append("payment_type", paymentType);
  formData.append("total_due", balanceDue);
  formData.append("amount", amount);
  formData.append("adjust_amount", adjustAmount);
  formData.append("balance_due", balanceDue);

  // Check validation of input field
  let errorMessage = {};
  function validateForm() {
    let validForm = true;
    if (!receiptNo) {
      validForm = false;
      errorMessage["receipt_no"] = "*Please enter receipt no.";
    }

    if (!getSupplierId) {
      validForm = false;
      errorMessage["supplier"] = "*Please enter supplier code and name.";
    }
    if (!paymentType) {
      validForm = false;
      errorMessage["payment_type"] = "*Please enter payment type.";
    }

    if (!amount) {
      validForm = false;
      errorMessage["amount"] = "*Please enter amount.";
    }
    seterrors(errorMessage);
    return validForm;
  }

  function validateBank() {
    let validForm = true;
    if (!bankName) {
      validForm = false;
      errorMessage["bank_name"] = "*Please enter bank name.";
    }
    if (!checkNo) {
      validForm = false;
      errorMessage["check_no"] = "*Please enter check no.";
    }
    if (!checkIssueDate) {
      validForm = false;
      errorMessage["issue_date"] = "*Please enter check issue date.";
    }
    if (!branchName) {
      validForm = false;
      errorMessage["branch_name"] = "*Please enter branch name.";
    }
    if (!accountNo) {
      validForm = false;
      errorMessage["account_no"] = "*Please enter account no.";
    }
    seterrors(errorMessage);
    return validForm;
  }

  function validateBkash() {
    let validForm = true;
    if (!bkash) {
      validForm = false;
      errorMessage["bkash"] = "*Please enter bkash account.";
    }
    if (typeof bkash !== "undefined") {
      if (!bkash.match(/^[0-9]{11}$/)) {
        validForm = false;
        errorMessage["bkash"] = "*Please enter valid Bkash account no.";
      }
    }
    seterrors(errorMessage);
    return validForm;
  }

  function validateMobileBank() {
    let validForm = true;
    if (!mbaAcountNo) {
      validForm = false;
      errorMessage["mba_account_no"] = "*Please enter mobile account.";
    }
    if (typeof mbaAcountNo !== "undefined") {
      if (!mbaAcountNo.match(/[0-9]/)) {
        validForm = false;
        errorMessage["mba_account_no"] =
          "*Please enter valid mobile account no.";
      }
    }
    seterrors(errorMessage);
    return validForm;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    switch (paymentType) {
      case "Bkash":
        formData.append("bkash", bkash);
        break;
      case "Cash":
        break;
      case "Other Mobile Banking":
        formData.append("mba_account_no", mbaAcountNo);
        break;
      case "Bank":
        formData.append("bank_name", bankName);
        formData.append("check_no", checkNo);
        formData.append("issue_date", checkIssueDate);
        formData.append("branch_name", branchName);
        formData.append("account_no", accountNo);
        break;

      default:
        break;
    }

    if (
      (validateForm() && validateBank()) ||
      (validateForm() && validateBkash()) ||
      (validateForm() && validateMobileBank()) ||
      (validateForm() && paymentType === "Cash")
    ) {
      dispatch(addCashDelivery(formData, headers));
      toast.success("Cash delivery is adding...");
      props.onHide();
    } else {
      toast.warn("Cash delivery not added");
    }
  };

  //Fetch bank namne list
  const { banks } = useSelector((state) => state.banks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBankLists(headers));
  }, []);

  // Map bank name
  const bankNameList = banks.map((data) => {
    return (
      <option key={data.id} value={data.bank_name}>
        {data.bank_name}
      </option>
    );
  });

  // Get customer id and total due from customer table
  const supplierIdHandler = (supplierId, name, contact_no) => {
    setGetSupplierId(supplierId);
    setGetSupplierName(name);
    setGetSupplierCN(contact_no);
  };

  const supplierTotalDueHandler = (supplierTotalDue) => {
    setGetSupplierTotalDue(supplierTotalDue);
    setTotalDue(supplierTotalDue);
    // console.log("Due"+ customerTotalDue  + getCustomerTotalDue)
  };

  const amountHandler = (e) => {
    setAmount(e.target.value);
    const amount = e.target.value;
    const due_amount = totalDue - amount;
    setBalanceDue(due_amount);
  };

  const adjustmentHandler = (e) => {
    setAdjustmentAmount(e.target.value);
    const adjust_amount = e.target.value;
    const due_amount = totalDue - amount - adjust_amount;
    setBalanceDue(due_amount);
    setBalanceDue(due_amount);
  };

  const onClose = () => {
    setEntryDate("");
    setReceiptNo("");
    setGetSupplierId("");
    setPaymentType("");
    setBankName("");
    setCheckNo("");
    setCheckIssueDate("");
    setBranchName("");
    setAccountNo("");
    setMbaAccountNo("");
    setBkash("");
    setTotalDue("");
    setAmount("");
    setAdjustmentAmount("");
    setBalanceDue("");
    seterrors({});
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onExit={onClose}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <Modal.Header className="background_and_table_header">
        <div>
          <h4>Add Cash Delivery</h4>
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
        <div className="custom_modal_inner_content">
          {/* Company Add Form Start Here */}
          <form onSubmit={submitHandler}>
            <div className="container companyBox">
              <div className="row">
                <div className="col-md-12">
                  <div className="row my-2 border border-light py-2">
                    <div className="col-md-12 my-3">
                      <h4 className="shadow p-3 letter-spacing-2 responsive-head ">
                        {" "}
                        Personal Information
                      </h4>
                    </div>
                    <div className="col-md-6">
                      <div className="row ">
                        <div className="col-md-12 col-lg-4">
                          <span className="spanTitle" htmlFor="category">
                            Entry Date
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8  input-group input-group-sm">
                          <input
                            type="date"
                            className="form-control productInput input-sm"
                            id="modelName"
                            name="entry_date"
                            onChange={(e) => setEntryDate(e.target.value)}
                            defaultValue={moment(currentDate).format(
                              "YYYY-MM-DD"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <span className="spanTitle" htmlhtmlFor="category">
                            Receipt No
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8  input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            id="modelName"
                            placeholder="Enter receipt no ex: R-100"
                            name="receipt_no"
                            onChange={(e) => setReceiptNo(e.target.value)}
                            value={receiptNo}
                          />
                          <div className="errorMsg" style={{ width: "100%" }}>
                            {errors.receipt_no ? errors.receipt_no : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mt-2">
                      <div className="row">
                        <SupplierSearch
                          supplierId={supplierIdHandler}
                          supplierTotalDue={supplierTotalDueHandler}
                        />
                        <div className="errorMsg  col-md-8 offset-md-2">
                          {errors.supplier}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Company Component Show here */}

                  <div className="additonal-information border border-light px-2 my-2 py-2">
                    <div className="row">
                      <div className="col-md-12 mt-2">
                        <h4 className="shadow p-3 mb-5 responsive-head rounded">
                          Payment Information
                        </h4>
                      </div>
                    </div>
                    <div className="row  mb-1">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="category">
                              Payment Type
                            </span>
                          </div>
                          <div className="col-md-12 col-lg-8  input-group input-group-sm">
                            <select
                              className="form-control productInput input-sm"
                              onChange={(e) => setPaymentType(e.target.value)}
                              name="payment_type"
                            >
                              <option>Select payment type</option>
                              <option value="Cash">Cash</option>
                              <option value="Bkash">Bkash</option>
                              <option value="Other Mobile Banking">
                                Other Mobile Banking
                              </option>
                              <option value="Bank">Bank</option>
                            </select>
                            <div className="errorMsg" style={{ width: "100%" }}>
                              {errors.payment_type}
                            </div>
                          </div>
                        </div>
                      </div>
                      {paymentType === "Bkash" && (
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-12 col-lg-4">
                              <span className="spanTitle" htmlFor="bkash">
                                Bkash No
                              </span>
                            </div>
                            <div className="col-md-12 col-lg-8  input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control productInput input-sm"
                                id="bkash"
                                placeholder="Enter bkash no"
                                name="bkash"
                                onChange={(e) => setBkash(e.target.value)}
                              />
                              <div
                                className="errorMsg"
                                style={{ width: "100%" }}
                              >
                                {errors.bkash}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {paymentType === "Other Mobile Banking" && (
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-12 col-lg-4">
                              <span className="spanTitle" htmlFor="category">
                                Account Number
                              </span>
                            </div>
                            <div className="col-md-12 col-lg-8  input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control"
                                id="modelName"
                                placeholder="Enter mobile bank"
                                name="mba_account_no"
                                onChange={(e) =>
                                  setMbaAccountNo(e.target.value)
                                }
                              />
                              <div
                                className="errorMsg"
                                style={{ width: "100%" }}
                              >
                                {errors.mba_account_no}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {paymentType === "Bank" && (
                      <div className="row">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-12 col-lg-4">
                              <span className="spanTitle" htmlFor="category">
                                Account No
                              </span>
                            </div>
                            <div className="col-md-12 col-lg-8  input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control"
                                id="modelName"
                                placeholder="Enter account no"
                                name="account_no"
                                onChange={(e) => setAccountNo(e.target.value)}
                              />
                              <div
                                className="errorMsg"
                                style={{ width: "100%" }}
                              >
                                {errors.account_no}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-12 col-lg-4">
                              <span className="spanTitle" htmlFor="category">
                                Branch Name
                              </span>
                            </div>
                            <div className="col-md-12 col-lg-8  input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control productInput input-sm"
                                id="modelName"
                                placeholder="Enter branch name"
                                name="branch_name"
                                onChange={(e) => setBranchName(e.target.value)}
                              />
                              <div
                                className="errorMsg"
                                style={{ width: "100%" }}
                              >
                                {errors.branch_name}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row ">
                            <div className="col-md-12 col-lg-4">
                              <span className="spanTitle" htmlFor="category">
                                Check No
                              </span>
                            </div>
                            <div className="col-md-12 col-lg-8  input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control productInput input-sm"
                                id="modelName"
                                placeholder="Enter check no"
                                name="check_no"
                                onChange={(e) => setCheckNo(e.target.value)}
                              />
                              <div
                                className="errorMsg"
                                style={{ width: "100%" }}
                              >
                                {errors.check_no}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-12 col-lg-4">
                              <span className="spanTitle">C.Issue Date</span>
                            </div>
                            <div className="col-md-12 col-lg-8  input-group input-group-sm">
                              <input
                                type="date"
                                className="form-control productInput input-sm"
                                name="issue_date"
                                onChange={(e) =>
                                  setCheckIssueDate(e.target.value)
                                }
                              />
                              <div
                                className="errorMsg"
                                style={{ width: "100%" }}
                              >
                                {errors.issue_date}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-12 col-lg-4">
                              <span className="spanTitle" htmlFor="category">
                                Bank Name
                              </span>
                            </div>
                            <div className="  col-md-12 col-lg-8  input-group input-group-sm">
                              <select
                                onChange={(e) => setBankName(e.target.value)}
                                className="wrapper form-control"
                                name="bank_name"
                              >
                                <option>Select Bank</option>
                                {bankNameList}
                              </select>
                              <div
                                className="errorMsg"
                                style={{ width: "100%" }}
                              >
                                {errors.bank_name}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* total amount due adjustment design bellow  */}

                  <div className="row my-3 border border-light py-2">
                    <div className="col-md-12">
                      <h4 className="shadow p-3 my-3 responsive-head">Amount Information</h4>
                    </div>

                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <span className="spanTitle" htmlFor="category">
                            Total Due
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8  input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            id="modelName"
                            name="total_due"
                            // onChange={(e)=> setTotalDue(e.target.value)}
                            value={totalDue}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <span className="spanTitle" htmlFor="category">
                            Amount
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8  input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control productInput input-sm"
                            id="modelName"
                            defaultValue={0}
                            name="amount"
                            onChange={amountHandler}
                            value={amount}
                          />
                          <div className="errorMsg" style={{ width: "100%" }}>
                            {errors.amount}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <span className="spanTitle" htmlFor="category">
                            Adjustment
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8  input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control productInput input-sm"
                            id="modelName"
                            name="adjust_amount"
                            onChange={adjustmentHandler}
                            value={parseFloat(adjustAmount)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <span className="spanTitle" htmlFor="category">
                            Due Amount
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8  input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control productInput input-sm"
                            id="modelName"
                            name="balance_due"
                            //onChange={(e)=> setBalanceDue(e.target.value)}
                            value={balanceDue}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 pull-right responsive-btn">
                  <Button
                    className="saveCloseBtn border border-none closebtn"
                    onClick={props.onHide}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="saveCloseBtn border border-none "
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Company Add Form End Here */}
      </Modal.Body>
    </Modal>
  );
};

export default AddCashDelivery;
