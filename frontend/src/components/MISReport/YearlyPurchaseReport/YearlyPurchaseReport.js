import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";
import { getYearlyPurchaseReport } from "../../../redux/actions/reportActions";
import YearlyPurchaseReportTable from "./YearlyPurchaseReportTable";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const YearlyPurchaseReport = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const [date, setDate] = useState(2022);
  const [summary, setSummary] = useState("");
  const [selected, setSelected] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("year", date);
    formData.append("summary", summary);
    if (date) {
      dispatch(getYearlyPurchaseReport(formData, headers));
      setTableMOdal(true);
    } else {
      swal("Please select a date!");
    }
  };

  const handleClear = () => {
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
            <h4 className="responsive-head">Yearly Purchase Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        {/* Company Add Form Start Here */}
        <form className="form-horizontal mt-2" onSubmit={submitHandler}>
          <div className="container productBox custom_modal_inner_content">
            <div className="row pt-3 pb-3">
              <div className="col-md-4">
                <input type="checkbox" id="summary" onChange={handleSummary} />
                <label htmlFor="summary">
                  {" "}
                  <span className="ml-1">Summary</span>{" "}
                </label>
              </div>
              <div className="col-md-8" style={{ marginTop: "10px" }}>
                <div className="row align-items-center">
                  <div className="col-3">
                    <span className="spanTitle" for="code">
                      Year
                    </span>
                  </div>
                  <div className="col-9 input-group input-group-sm">
                    <input
                      type="number"
                      min="2021"
                      max="2099"
                      step="1"
                      className="form-control productInput text-center"
                      defaultValue={2022}
                      onChange={(e) => setDate(e.target.value)}
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
                    setSelected(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  className="saveCloseBtn border-0"
                  onClick={() => {
                    handleSummaryValue();
                  }}
                  type="submit"
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </form>

        <YearlyPurchaseReportTable
          show={tableMOdal}
          onHide={() => setTableMOdal(false)}
          handlePrint={handlePrint}
          ref={componentRef}
          headerTitle={headerTitle}
          summary={summary}
        />

        {/* Company Add Form End Here */}
      </Modal.Body>
    </Modal>
  );
};

export default YearlyPurchaseReport;
