import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useReactToPrint } from "react-to-print";
import YearlySalesTable from "./YearlySalesTable";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { getYearlySalesReport } from "../../../redux/actions/reportActions";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const YearlySalesReport = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [selected, setSelected] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [summary, setSummary] = useState("");
  const handleSummary = (e) => {
    setSelected(e.target.checked);
  };

  // Put summary null after modal close
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

  const yearHandler = (e) => {
    const year = e.target.value;
    setYear(year);
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
    formData.append("year", year);
    formData.append("summary", summary);
    //Check for customer and date
    if (year) {
      dispatch(getYearlySalesReport(formData, headers));
      setTableMOdal(true);
    } else {
      swal("Please select a date!");
    }
  };
  const handleClear = () => {
    setYear(new Date().getFullYear());
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
            <h4 className=" responsive-head">Yearly Sales Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        {/* Company Add Form Start Here */}
        <form className="form-horizontal mt-2" onSubmit={submitHandler}>
          <div className="container productBox custom_modal_inner_content">
            <div className="row pt-3 pb-3">
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
                      min="2000"
                      max={new Date().getFullYear()}
                      className="form-control productInput"
                      defaultValue={year}
                      id="code"
                      name="year"
                      onChange={yearHandler}
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
                  type="submit"
                  onClick={handleSummaryValue}
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </form>
        <YearlySalesTable
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

export default YearlySalesReport;
