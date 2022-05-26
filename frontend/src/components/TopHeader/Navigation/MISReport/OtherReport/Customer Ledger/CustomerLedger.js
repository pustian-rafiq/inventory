import moment from "moment";
import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";
import { getCustomerLedgerReport } from "../../../../../../redux/actions/reportActions";
import CustomerSearch from "../../../../../MISReport/CustomerWiseSalesReport/CustomerSearch";
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

const CustomerLedger = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const [getCustomerId, setGetCustomerId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const componentRef = useRef();
  const dispatch = useDispatch();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const customerIdHandler = (customerId) => {
    setGetCustomerId(customerId);
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("customer", getCustomerId);

    if (
      startDate &&
      endDate &&
      getCustomerId &&
      startDate !== "Invalid date" &&
      endDate !== "Invalid date"
    ) {
      dispatch(getCustomerLedgerReport(formData, headers));
      setTableMOdal(true);
    } else {
      swal("Please select date and customer!");
    }
  };

  const handleOnClose = () => {
    setStartDate("");
    setEndDate("");
    setGetCustomerId("");
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
            <h4 className="responsive-head">Customer Ledger Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        <form className="form-horizontal" onSubmit={submitHandler}>
          <div className="container productBox mt-2 custom_modal_inner_content">
            <div className="row mb-2 align-items-center">
              <CustomerSearch customerId={customerIdHandler} />
            </div>
            <div className="row my-4 justify-content-between align-items-center">
              <div className="col-md-6 col-lg-6">
                <div className="row align-items-center">
                  <div className="col-3 col-md-4 col-lg-4">
                    <span className="spanTitle">From</span>
                  </div>
                  <div className="col-9 col-md-8 col-lg-8 input-group input-group-sm">
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
                  <div className="col-3 col-lg-2 col-md-2">
                    <span className="spanTitle">To</span>
                  </div>
                  <div className="col-lg-10 col-md-10 col-9 input-group input-group-sm">
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

        <PrintTable
          show={tableMOdal}
          onHide={() => setTableMOdal(false)}
          handlePrint={handlePrint}
          ref={componentRef}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CustomerLedger;
