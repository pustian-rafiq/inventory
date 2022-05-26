import moment from "moment";
import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { getCustomerwiseSales } from "../../../redux/actions/reportActions";
import CustomerSearch from "./CustomerSearch";
import CustomerWiseSalesTable from "./CustomerWiseSalesTable";
import swal from "sweetalert";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const CustomerWiseSales = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [getCustomerId, setGetCustomerId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const customerIdHandler = (customerId) => {
    setGetCustomerId(customerId);
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
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("customer", getCustomerId);
    //Check for customer and date
    if (getCustomerId && startDate && endDate) {
      dispatch(getCustomerwiseSales(formData, headers));
      setTableMOdal(true);
    } else {
      swal("Please select a customer and date!");
    }
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

  const handleClear = () => {
    setGetCustomerId("");
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
      onExit={handleClear}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <Modal.Header className="background_and_table_header" closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          <div>
            <h4 className=" responsive-head">Customer Wise Sales</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        {/* Company Add Form Start Here */}
        <form className="form-horizontal" onSubmit={submitHandler}>
          <div className="container productBox mt-2 custom_modal_inner_content">
            <div className="row mb-2 justify-content-between align-items-center">
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
                      name="start_date"
                      value={startDate}
                      onChange={startDateHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 ">
                <div className="row align-items-center justify-content-between">
                  <div className="col-3 col-lg-2 col-md-2">
                    <span className="spanTitle">To</span>
                  </div>
                  <div className="col-lg-10 col-md-10 col-9 input-group input-group-sm">
                    <input
                      type="date"
                      className="form-control productInput"
                      name="end_date"
                      value={endDate}
                      onChange={endDateHandler}
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
                  // onClick={() => setTableMOdal(true)}
                  type="submit"
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </form>
        <CustomerWiseSalesTable
          show={tableMOdal}
          onHide={() => setTableMOdal(false)}
          handlePrint={handlePrint}
          ref={componentRef}
        />
      </Modal.Body>
    </Modal>
  );
};
export default CustomerWiseSales;
