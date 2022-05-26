import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addIncomeData,
  getIncomeLists,
} from "../../../../redux/actions/incomeAction";
import ExpenseHeadSearch from "../Expenses/AddExpenseHead/ExpenseHeadSearch";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AddIncome = (props) => {
  const [getExpenseIncomeId, setGetExpenseIncomeId] = useState();
  const [getExpenseIncomeDes, setGetExpenseIncomeDes] = useState("");

  // Expense input field state
  const [voucherNo, setVoucherNo] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [amount, setAmount] = useState("0");
  const [purpose, setPurpose] = useState("");

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("voucher_no", voucherNo);
    formData.append("entry_date", entryDate);
    formData.append("expense_item_id", getExpenseIncomeId);
    formData.append("expense_description", getExpenseIncomeDes);
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
      dispatch(addIncomeData(formData, headers, props.onHide));
      toast.success("Income is adding...");
    }
  };

  useEffect(() => {
    dispatch(getIncomeLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const IncomeIdHandler = (expenseIncomeId, description) => {
    setGetExpenseIncomeId(expenseIncomeId);
    setGetExpenseIncomeDes(description); 
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
      dialogClassName="add-income-modal"
    >
      <Modal.Header className="background_and_table_header">
        <div>
          <h4 className="responsive-head"> Add Income </h4>
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
          <div>
            {/* Company Add Form Start Here */}
            <form onSubmit={submitHandler}>
              <div className="container companyBox py-2 my-2">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row  mb-2">
                      <div className="col-md-12">
                      

                        <div className="row mb-2">
                          <div className="col-sm-12 col-md-4">
                            <span className="spanTitle" for="category">
                              Voucher No
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-8 ">
                            <input
                              type="text"
                              className="form-control"
                              id="modelName"
                              placeholder="Enter voucher no"
                              name="voucher_no"
                              value={voucherNo}
                              onChange={(e) => setVoucherNo(e.target.value)}
                            />
                          </div>
                          <p className="errorMsg">{}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-sm-12 col-md-4">
                            <span className="spanTitle" for="category">
                              Income Date
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-8 ">
                            <input
                              type="date"
                              className="form-control"
                              id="modelName"
                              placeholder="Enter voucher no"
                              name="entry_date"
                              value={entryDate}
                              onChange={(e) => setEntryDate(e.target.value)}
                            />
                          </div>
                          <p className="errorMsg">{}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-sm-12 col-md-4">
                            <span className="spanTitle" for="category">
                              Income Head
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-8 ">
                            <ExpenseHeadSearch
                              expenseIncomeId={IncomeIdHandler}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <IncomeHeadSearch ExpenseIncomeData={expenseIncomeData} /> */}
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-sm-12 col-md-4">
                            <span className="spanTitle" for="category">
                              Amount
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-8 ">
                            <input
                              type="text"
                              className="form-control "
                              id="modelName"
                              defaultValue="0"
                              name="amount"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-sm-12 col-md-4">
                            <span className="spanTitle" for="category">
                              Purpose
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-8 ">
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
                      className="saveCloseBtn closebtn border border-0"
                      onClick={props.onHide}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="saveCloseBtn border border-0"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
            {/* Company Add Form End Here */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddIncome;
