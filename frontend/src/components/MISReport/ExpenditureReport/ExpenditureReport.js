/* eslint-disable eqeqeq */
import React, { useRef, Fragment, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import ExpenditureReportTable from "./ExpenditureReportTable";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import "../misreport.css";
import ExpenseHeadSearch from "./ExpenseHeadSearch";
import { getExpenditureReport } from "../../../redux/actions/reportActions";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

function ExpenditureReport({ show, onHide }) {
  const componentRef = useRef();
  const [printTableModal, setPrintTableModal] = useState(false);
  const [getExpenseHeadId, setGetExpenseHeadId] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expenseIncome, setExpenseIncome] = useState("");

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const expenseIncomeIdHandler = (expenseIncomeId) => {
    setGetExpenseHeadId(expenseIncomeId);
  };

  const radioHandler = (e) => {
    const status = parseInt(e.target.value);
    setExpenseIncome(status);
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("status", expenseIncome);
    formData.append("expense_head", getExpenseHeadId);

    // Check for expense and income with expense head and without expense head
    if (startDate && endDate && expenseIncome == 1 && getExpenseHeadId == 0) {
      dispatch(getExpenditureReport(formData, headers));
      setPrintTableModal(true);
    } else if (
      startDate &&
      endDate &&
      expenseIncome == 2 &&
      getExpenseHeadId == 0
    ) {
      dispatch(getExpenditureReport(formData, headers));
      setPrintTableModal(true);
    } else if (startDate && endDate && expenseIncome == 1 && getExpenseHeadId) {
      dispatch(getExpenditureReport(formData, headers));
      setPrintTableModal(true);
    } else if (startDate && endDate && expenseIncome == 2 && getExpenseHeadId) {
      dispatch(getExpenditureReport(formData, headers));
      setPrintTableModal(true);
    } else {
      swal("Please select a expense/income and date!");
    }
  };

  // Change title dynamically for expense and income
  var headerTitle;
  if (expenseIncome == 1) {
    headerTitle = "Income Report";
  } else {
    headerTitle = "Expense Report";
  }

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setGetExpenseHeadId(0);
    setExpenseIncome("");
  };

  return (
    <Fragment>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onExit={handleClear}
        backdrop="static"
        keyboard="false"
        dialogAs={DraggableModal}
      >
        <Modal.Header className="background_and_table_header">
          <div>
            <h4 className="responsive-head">Expenditure Report</h4>
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
          {/* Company Add Form Start Here */}
          <form className="form-horizontal mt-2" onSubmit={submitHandler}>
            <div className="container productBox custom_modal_inner_content">
              <div className="row mb-2">
                <ExpenseHeadSearch expenseIncomeId={expenseIncomeIdHandler} />
              </div>
              <div className="row align-items-center">
                <div className="col-md-6 col-lg-6">
                  <div className="row align-items-center">
                    <div className="col-md-4 col-lg-4 col-3">
                      <span className="spanTitle">From</span>
                    </div>
                    <div className="col-md-8 col-lg-8 col-9 input-group-sm">
                      <input
                        type="date"
                        className="form-control productInput"
                        onChange={(e) => {
                          setStartDate(
                            moment(e.target.value).format("YYYY-MM-DD")
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="row align-items-center">
                    <div className="col-md-2 col-lg-2 col-3">
                      <span className="spanTitle">To</span>
                    </div>
                    <div className="col-md-8 col-lg-8 col-9 input-group-sm">
                      <input
                        type="date"
                        className="form-control productInput"
                        onChange={(e) => {
                          setEndDate(
                            moment(e.target.value).format("YYYY-MM-DD")
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className=" ml-1 mt-3 text-center" onChange={radioHandler}>
                  <input
                    type="radio"
                    name="sales"
                    id="salesall"
                    value="2"
                    style={{ textAlign: "center !important" }}
                  />
                  <span className="ml-1">All Expense</span>
                  <input
                    type="radio"
                    className="ml-3"
                    name="sales"
                    id="credit"
                    value="1"
                  />{" "}
                  <span className="ml-1">All Income</span>
                </div>
              </div>
            </div>
            <div className="btnContainer companyBox custom_modal_inner_content">
              <div className="row">
                <div className="col-md-12 pull-right">
                  <Button
                    className="saveCloseBtn closebtn border-0"
                    onClick={() => {
                      onHide(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button className="saveCloseBtn border" type="submit">
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </form>
          {/* Company Add Form End Here */}
        </Modal.Body>
        <ExpenditureReportTable
          show={printTableModal}
          handlePrint={handlePrint}
          onHide={() => setPrintTableModal(false)}
          headerTitle={headerTitle}
          expenseHeadId={getExpenseHeadId}
          status={expenseIncome}
          ref={componentRef}
        />
      </Modal>
    </Fragment>
  );
}

export default ExpenditureReport;
