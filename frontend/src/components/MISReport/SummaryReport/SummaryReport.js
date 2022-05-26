import React, { useRef, Fragment, useState } from "react";
import { Modal, Button, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import SummaryReportTable from "./SummaryReportTable";
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getSummaryReport } from "../../../redux/actions/reportActions";

// import DatePicker from 'react-date-picker';
class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

function SummaryReport({ show, onHide }) {
  const [printTableModal, setPrintTableModal] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    //Check for customer and date
    if (startDate && endDate) {
      dispatch(getSummaryReport(formData, headers));
      setPrintTableModal(true);
    } else {
      swal("Please select the date!");
    }
  };

  const handleOnClose = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onExited={handleOnClose}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <Modal.Header className="background_and_table_header">
        <div>
          <h4 className="responsive-head">Summary Report </h4>
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
            <div className="row pt-3 pb-3">
              <div className="col-md-12">
                <div className="row align-items-center">
                  <div className="col-md-6 input-group input-group-sm align-items-center">
                    From
                    <input
                      type="date"
                      className="form-control productInput ml-2"
                      id="code"
                      onChange={(e) => {
                        setStartDate(
                          moment(e.target.value).format("YYYY-MM-DD")
                        );
                      }}
                    />
                  </div>
                  <div className="col-md-6 input-group input-group-sm align-items-center">
                    To{" "}
                    <input
                      type="date"
                      className="form-control productInput ml-4"
                      id="code"
                      onChange={(e) => {
                        setEndDate(moment(e.target.value).format("YYYY-MM-DD"));
                      }}
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
                <Button className="saveCloseBtn border-0" type="submit">
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </form>
        {/* Company Add Form End Here */}
      </Modal.Body>
      <SummaryReportTable
        handlePrint={handlePrint}
        //headerTitle={headerTitle}
        ref={componentRef}
        show={printTableModal}
        onHide={() => setPrintTableModal(false)}
      />
    </Modal>
  );
}

export default SummaryReport;
