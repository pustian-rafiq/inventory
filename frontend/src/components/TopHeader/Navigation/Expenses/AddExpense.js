import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addExpenseData,
  getExpenseLists,
} from "../../../../redux/actions/expenseAction";
import ExpenseHeadSearch from "./AddExpenseHead/ExpenseHeadSearch";
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

const AddExpense = ({ show, onHide }) => {
  // Declare initial state
  const initialState = {
    voucher_no: "",
    entry_date: "",
    expense_item_id: "",
    amount: "",
    purpose: "",
  };

  const [getExpenseIncomeId, setGetExpenseIncomeId] = useState(initialState);
  const [getExpenseIncomeDescription, setGetExpenseIncomeDescription] =
    useState("");
  const date = moment(new Date()).format("YYYY-MM-DD");
  // Expense input field state
  const [voucherNo, setVoucherNo] = useState("");
  const [entryDate, setEntryDate] = useState(date);
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dispatch = useDispatch();

  // Form data submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("voucher_no", voucherNo);
    formData.append("entry_date", entryDate);
    formData.append("expense_item_id", getExpenseIncomeId);
    formData.append("expense_description", getExpenseIncomeDescription);
    formData.append("amount", amount);
    formData.append("purpose", purpose);

    if (
      voucherNo === "" ||
      entryDate === "" ||
      getExpenseIncomeId === "" ||
      amount === "" ||
      purpose === ""
    ) {
      toast.success("Any filed must not be empty");
    } else {
      dispatch(addExpenseData(formData, headers, onHide));
      toast.success("Expense is adding...");
    }
  };
  useEffect(() => {
    dispatch(getExpenseLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expenseIncomeIdHandler = (expenseIncomeId, description) => {
    setGetExpenseIncomeId(expenseIncomeId);
    setGetExpenseIncomeDescription(description);
  };
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
      // dialogClassName="add-expense-modal"
    >
      <Modal.Header className="background_and_table_header">
        <div>
          <h4 className=" responsive-head">Add Expense </h4>
        </div>
        <div className="pull-right">
          <i
            className="fa fa-close"
            onClick={onHide}
            style={{ cursor: "pointer", padding: "2px" }}
          ></i>
        </div>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        <div className="custom_modal_inner_content">
          <form onSubmit={submitHandler}>
            <div className="container companyBox py-2 my-2">
              <div className="row">
                <div className="col-md-12 mt-2">
                  <div className="row  mb-1">
                    <div className="col-md-12">
                      <div className="row my-1">
                        <div className="col-sm-12 col-md-3">
                          <span className="spanTitle" htmlFor="category">
                            Voucher No
                          </span>
                        </div>
                        <div className="col-sm-11 col-md-9 ">
                          <input
                            type="text"
                            className="form-control "
                            id="modelName"
                            placeholder="Enter voucher no"
                            name="voucher_no"
                            value={voucherNo}
                            onChange={(e) => setVoucherNo(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row  mb-1">
                    <div className="col-md-12">
                      <div className="row my-1">
                        <div className="col-sm-12 col-md-3">
                          <span className="spanTitle" htmlFor="category">
                            Expense Date
                          </span>
                        </div>
                        <div className="col-sm-11 col-md-9 ">
                          <input
                            type="date"
                            className="form-control "
                            id="modelName"
                            placeholder="Enter voucher no"
                            name="entry_date"
                            value={entryDate}
                            onChange={(e) => setEntryDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row  mb-1">
                    <div className="col-md-12">
                      <div className="row my-1">
                        <div className="col-sm-12 col-md-3">
                          <span className="spanTitle" for="category">
                            Expense Head
                          </span>
                        </div>
                        <div className="col-sm-11 col-md-9 ">
                          <ExpenseHeadSearch
                            expenseIncomeId={expenseIncomeIdHandler}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <ExpenseHeadSearch ExpenseData={expenseIncomeData} /> */}
                  </div>
                  <div className="row  mb-1">
                    <div className="col-md-12">
                      <div className="row my-1">
                        <div className="col-sm-12 col-md-3">
                          <span className="spanTitle" htmlFor="category">
                            Amount
                          </span>
                        </div>
                        <div className="col-sm-11 col-md-9 ">
                          <input
                            type="text"
                            className="form-control "
                            id="modelName"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Ex. 1000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row  mb-1">
                    <div className="col-md-12">
                      <div className="row my-1">
                        <div className="col-sm-12 col-md-3">
                          <span className="spanTitle" htmlFor="category">
                            Purpose
                          </span>
                        </div>
                        <div className="col-sm-11 col-md-9 ">
                          <input
                            type="text"
                            className="form-control "
                            id="modelName"
                            placeholder="Enter your purpose"
                            name="purpose"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
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
                    className="saveCloseBtn closebtn border border-none"
                    onClick={onHide}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="saveCloseBtn border border-none"
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

export default AddExpense;
