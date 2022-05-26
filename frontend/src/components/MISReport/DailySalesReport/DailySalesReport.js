import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useReactToPrint } from "react-to-print";
import DailySalesReportTable from "./DailySalesReportTable";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getDailySalesReport } from "../../../redux/actions/reportActions";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const DailySalesReport = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const componentRef = useRef();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [summary, setSummary] = useState("");
  const [creditSales, setCreditSales] = useState("");

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [selected, setSelected] = useState(false);

  var headerTitle;
  if (selected) {
    headerTitle = "Summary Report";
  } else {
    headerTitle = "Report";
  }
  var tableTitle;
  // eslint-disable-next-line eqeqeq
  if (creditSales == "all_sales") {
    tableTitle = "All Sales Report";
  } else {
    tableTitle = "Credit Sales Report";
  }

  const handleSummary = (e) => {
    setSelected(!selected);
    if (selected) {
      setSummary("");
    } else {
      setSummary("summary");
    }
  };
  const radioHandler = (e) => {
    setCreditSales(e.target.value);
  };
  const startDateHandler = (e) => {
    const startDate = e.target.value;
    const sd = moment(startDate).format("YYYY-MM-DD");
    setStartDate(sd);
  };

  const endDateHandler = (e) => {
    const startDate = e.target.value;
    const ed = moment(startDate).format("YYYY-MM-DD");
    setEndDate(ed);
  };
  // User Authentication
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
    formData.append("sale_type", creditSales);
    formData.append("summary", summary);
    //Check for customer and date
    if (startDate && endDate) {
      dispatch(getDailySalesReport(formData, headers));
      setTableMOdal(true);
    } else {
      swal("Please select a sales and date!");
    }
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setCreditSales("");
    setSummary("");
    setSelected(false);
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard="false"
      onExit={handleClear}
      dialogAs={DraggableModal}
    >
      <Modal.Header className="background_and_table_header" closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          <div>
            <h4 className="responsive-head">Daily Sales Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        {/* Company Add Form Start Here */}

        <form className="form-horizontal mt-2" onSubmit={submitHandler}>
          <div className="container productBox custom_modal_inner_content">
            <div className="row pt-3">
              <div className="col-md-12">
                <div className="row justify-content-between align-items-center">
                  <div className="col-md-6 input-group input-group-sm align-items-center">
                    From
                    <input
                      type="date"
                      className="form-control productInput ml-2"
                      id="code"
                      name="start_date"
                      value={startDate}
                      onChange={startDateHandler}
                    />
                  </div>
                  <div className="col-md-6 input-group input-group-sm align-items-center">
                    To
                    <input
                      type="date"
                      className="form-control productInput ml-lg-3 ml-4"
                      id="code"
                      name="end_date"
                      value={endDate}
                      onChange={endDateHandler}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="mt-3" onChange={radioHandler}>
                  <input
                    type="checkbox"
                    id="summary"
                    onChange={handleSummary}
                    name="summary"
                    defaultChecked={selected}
                  />
                  <label htmlFor="summary">
                    {" "}
                    <span className="ml-1">Summary</span>{" "}
                  </label>
                  <input
                    type="radio"
                    className="ml-3"
                    name="sales"
                    id="salesall"
                    value="all_sales"
                    // onChange={startDateHandler}
                  />
                  <span className="ml-1">All Sales</span>
                  <input
                    type="radio"
                    className="ml-3"
                    name="sales"
                    id="credit"
                    value="credit_sale"
                    // onChange={startDateHandler}
                  />{" "}
                  <span className="ml-1">Credit</span>
                </div>
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
                <Button
                  type="submit"
                  className="saveCloseBtn border-0"
                  // onClick={() => setTableMOdal(true)}
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </form>

        <DailySalesReportTable
          show={tableMOdal}
          onHide={() => setTableMOdal(false)}
          handlePrint={handlePrint}
          headerTitle={headerTitle}
          tableTitle={tableTitle}
          ref={componentRef}
        />
        {/* Company Add Form End Here */}
      </Modal.Body>
    </Modal>
  );
};

export default DailySalesReport;
