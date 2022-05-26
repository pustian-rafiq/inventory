import moment from "moment";
import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";
import { getDailyPurchaseReport } from "../../../redux/actions/reportActions";
import DailyPurchaseReportTable from "./DailyPurchaseReportTable";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const DailyPurchaseReport = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [purchaseType, setPurchaseType] = useState("");

  const componentRef = useRef();
  const dispatch = useDispatch();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleOnClose = () => {
    setStartDate("");
    setEndDate("");
    setPurchaseType("");
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  //const { customerwise_sales } = useSelector((state) => state.reports);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("summary", purchaseType);
    if (
      startDate &&
      endDate &&
      purchaseType &&
      startDate !== "Invalid date" &&
      endDate !== "Invalid date"
    ) {
      dispatch(getDailyPurchaseReport(formData, headers));
      setTableMOdal(true);
    } else {
      swal("Please select date and purchase type!");
    }
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
      onExit={handleOnClose}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <Modal.Header className="background_and_table_header" closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          <div>
            <h4 className="responsive-head">Daily Purchase Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        {/* Company Add Form Start Here */}
        <form className="form-horizontal mt-2" onSubmit={submitHandler}>
          <div className="container productBox custom_modal_inner_content">
            <div className="row pt-0 pb-3">
              <div className="col-md-12 mb-4">
                <div className="row mt-3 align-items-baseline justify-content-start">
                  <input
                    type="radio"
                    name="sales"
                    id="salesall"
                    value={"summary"}
                    onChange={(e) => setPurchaseType(e.target.value)}
                  ></input>{" "}
                  <span className="ml-1">Purchase Summary</span>
                  <input
                    type="radio"
                    className="ml-3"
                    name="sales"
                    id="credit"
                    value={"details"}
                    onChange={(e) => setPurchaseType(e.target.value)}
                  ></input>{" "}
                  <span className="ml-1">Purchase Details</span>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-md-6 input-group input-group-sm align-items-center">
                  From
                  <input
                    type="date"
                    className="form-control productInput ml-2"
                    id="code"
                    onChange={(e) => {
                      setStartDate(moment(e.target.value).format("YYYY-MM-DD"));
                    }}
                  />
                </div>
                <div className="col-md-6 input-group input-group-sm align-items-center">
                  To
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

        <DailyPurchaseReportTable
          show={tableMOdal}
          onHide={() => setTableMOdal(false)}
          handlePrint={handlePrint}
          purchaseType={purchaseType}
          ref={componentRef}
        />

        {/* Company Add Form End Here */}
      </Modal.Body>
    </Modal>
  );
};

export default DailyPurchaseReport;
