import moment from "moment";
import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";
import { getCashReceiveDeliveryReport } from "../../../../../../redux/actions/reportActions";
import CustomerSearch from "../../../../../MISReport/CustomerWiseSalesReport/CustomerSearch";
import SupplierSearch from "../../../../../MISReport/SupplierwisePurchase/SupplierSearch";
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

const CashReceiveDelivery = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const [getCustomerId, setGetCustomerId] = useState("");
  const [getSupplierId, setGetSupplierId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const componentRef = useRef();
  const dispatch = useDispatch();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const customerIdHandler = (customerId) => {
    setGetCustomerId(customerId);
  };

  const supplierIdHandler = (supplierId) => {
    setGetSupplierId(supplierId);
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

    if (
      startDate &&
      endDate &&
      transactionType === "1" &&
      getCustomerId &&
      startDate !== "Invalid date" &&
      endDate !== "Invalid date"
    ) {
      formData.append("customer", getCustomerId);
      formData.append("transaction_type", transactionType);
      dispatch(getCashReceiveDeliveryReport(formData, headers));
      setTableMOdal(true);
    } else if (
      startDate &&
      endDate &&
      transactionType === "2" &&
      getSupplierId &&
      startDate !== "Invalid date" &&
      endDate !== "Invalid date"
    ) {
      formData.append("supplier", getSupplierId);
      formData.append("transaction_type", transactionType);
      dispatch(getCashReceiveDeliveryReport(formData, headers));
      setTableMOdal(true);
    } else {
      swal("Please select date, purchase type and customer/supplier!");
    }
  };

  const handleOnClose = () => {
    setStartDate("");
    setEndDate("");
    setGetSupplierId("");
    setGetCustomerId("");
    setTransactionType("");
  };

  return (
    <Modal
      size="lg"
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
            <h4 className="responsive-head">
              Cash Receive and Delivery Report
            </h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        {/* Company Add Form Start Here */}

        <form className="form-horizontal" onSubmit={submitHandler}>
          <div className="container productBox custom_modal_inner_content">
            <div className="row my-3">
              <div className="col-md-3"></div>

              <div className="col-md-3">
                <input
                  type="radio"
                  id=""
                  name="cashhandle"
                  value={1}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <span className="ml-2">Cash Collection</span>
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-4">
                <input
                  type="radio"
                  id=""
                  name="cashhandle"
                  value={2}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <span className="ml-2">Cash Delevery</span>
              </div>
            </div>
            {transactionType === "1" && (
              <div className="row mb-2">
                <CustomerSearch customerId={customerIdHandler} />
              </div>
            )}
            {transactionType === "2" && (
              <div className="row mb-2">
                <SupplierSearch supplierId={supplierIdHandler} />
              </div>
            )}
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
                  <div className="col-md-10 col-lg-10 col-9 input-group-sm">
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
          transactionType={transactionType}
        />

        {/* Company Add Form End Here */}
      </Modal.Body>
    </Modal>
  );
};

export default CashReceiveDelivery;
