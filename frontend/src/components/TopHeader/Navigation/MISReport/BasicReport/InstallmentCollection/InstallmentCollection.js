import moment from "moment";
import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";
import { getInstallmentCollectionReport } from "../../../../../../redux/actions/reportActions";
import PrintTable from "./PrintTable";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const InstallmentCollection = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const componentRef = useRef();
  const dispatch = useDispatch();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
    if (startDate && endDate) {
      dispatch(getInstallmentCollectionReport(formData, headers));
      setTableMOdal(true);
    } else {
      swal("Please select date!");
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
      onHide={onHide}
      onExit={handleOnClose}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <Modal.Header className="background_and_table_header" closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          <div>
            <h4 className=" responsive-head">Installment Collection Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        <form className="form-horizontal" onSubmit={submitHandler}>
          <div className="container productBox py-4 custom_modal_inner_content">
            <div className="row align-items-center">
              <div className="col-md-6 col-lg-6">
                <div className="row justify-content-between align-items-center">
                  <div className="col-3">
                    <span className="spanTitle">From</span>
                  </div>
                  <div className="col-9 input-group-sm">
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
                <div className="row justify-content-between align-items-center">
                  <div className="col-3">
                    <span className="spanTitle">To</span>
                  </div>
                  <div className="col-9 input-group-sm">
                    <input
                      type="date"
                      className="form-control productInput"
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
                  onClick={onHide}
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
        <div
          style={{
            background: "#ffffff",
            marginBottom: "10px",
          }}
        >
          <PrintTable
            show={tableMOdal}
            onHide={() => setTableMOdal(false)}
            handlePrint={handlePrint}
            ref={componentRef}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InstallmentCollection;
