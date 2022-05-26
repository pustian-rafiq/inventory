import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useReactToPrint } from "react-to-print";
import MonthlySalesTable from "./MonthlySalesTable";
import swal from "sweetalert";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getMonthlySalesReport } from "../../../redux/actions/reportActions";
class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const MonthlySalesReport = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [selected, setSelected] = useState(false);
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const handleSummary = (e) => {
    setSelected(e.target.checked);
  };

  const handleSummaryValue = () => {
    if (selected) {
      setSummary("summary");
    } else {
      setSummary("");
    }
  };

  var headerTitle;
  if (selected) {
    headerTitle = "Summary Report";
  } else {
    headerTitle = "Report";
  }

  const dateHandler = (e) => {
    const Date = e.target.value;
    const sd = moment(Date).format("YYYY-MM-DD");
    setDate(sd);
  };
  const { user: currentUser } = useSelector((state) => state.auth);
  //const { customerwise_sales } = useSelector((state) => state.reports);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("summary", summary);
    //Check for customer and date
    if (date) {
      dispatch(getMonthlySalesReport(formData, headers));
      setTableMOdal(true);
    } else {
      swal("Please select a date!");
    }
  };
  const handleClear = () => {
    setDate("");
    setSelected(false);
    setSummary("");
  };
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
      onExit={handleClear}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <Modal.Header className="background_and_table_header" closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          <div>
            <h4 className=" responsive-head">Monthly Sales Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        {/* Company Add Form Start Here */}
        <form className="form-horizontal mt-2" onSubmit={submitHandler}>
          <div className="container productBox custom_modal_inner_content">
            <div className="row py-3 align-items-center">
              <div className="col-md-4">
                <input
                  type="checkbox"
                  id="summary"
                  name="summary"
                  onChange={handleSummary}
                />
                <label htmlFor="summary">
                  {" "}
                  <span className="ml-1">Summary</span>{" "}
                </label>
              </div>
              <div className="col-md-8">
                <div className="row align-items-center">
                  <div className="col-3">
                    <span className="spanTitle" for="code">
                      Month
                    </span>
                  </div>
                  <div className="col-9 input-group input-group-sm">
                    <input
                      type="date"
                      className="form-control productInput"
                      id="code"
                      name="date"
                      value={date}
                      onChange={dateHandler}
                    />
                  </div>
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
                  className="saveCloseBtn border-0"
                  onClick={handleSummaryValue}
                  type="submit"
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </form>
        <MonthlySalesTable
          show={tableMOdal}
          onHide={() => setTableMOdal(false)}
          handlePrint={handlePrint}
          headerTitle={headerTitle}
          ref={componentRef}
        />
        {/* Company Add Form End Here */}
      </Modal.Body>
    </Modal>
  );
};

export default MonthlySalesReport;
