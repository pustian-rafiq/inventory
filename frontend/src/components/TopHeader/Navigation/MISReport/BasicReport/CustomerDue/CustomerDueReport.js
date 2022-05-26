import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";
import { getCustomerDueReport } from "../../../../../../redux/actions/reportActions";
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

const CustomerDueReport = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);

  const [customerType, setCustomerType] = useState("");
  const [getCustomerId, setGetCustomerId] = useState("");
  const [credit, setCredit] = useState("");
  const [selected, setSelected] = useState(false);

  const dispatch = useDispatch();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleCredit = (e) => {
    setSelected(e.target.checked);
  };

  const handleCreditValue = () => {
    if (selected) {
      setCredit("credit");
    } else {
      setCredit("");
    }
  };

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
    formData.append("credit", credit);
    if (customerType === "customer" && getCustomerId) {
      formData.append("customer", getCustomerId);
      dispatch(getCustomerDueReport(formData, headers));
      setTableMOdal(true);
    } else {
      if (customerType && customerType !== "customer") {
        formData.append(`${customerType}`, customerType);
        dispatch(getCustomerDueReport(formData, headers));
        setTableMOdal(true);
      } else {
        swal("Please select customer and customer type!");
      }
    }
    // if (customerType) {
    //   dispatch(getCustomerDueReport(formData, headers));
    //   setTableMOdal(true);
    // } else {
    //   swal("Please select customer and customer type!");
    // }
  };

  const handleOnClose = () => {
    setGetCustomerId("");
    setCustomerType("");
    setSelected(false);
  };

  return (
    <div>
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
              <h4 className="responsive-head">Customer Due Report</h4>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="background_and_table_header">
          <form className="form-horizontal mt-2" onSubmit={submitHandler}>
            <div className="container productBox custom_modal_inner_content">
              <div className="row align-items-center">
                <input
                  type="radio"
                  id="customer"
                  name="report"
                  value="customer"
                  className="col-1"
                  onChange={(e) => setCustomerType(e.target.value)}
                />
                <div className="col-11">
                  <label htmlfor="customer" className="row align-items-center">
                    <CustomerSearch customerId={customerIdHandler} />
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-lg-9">
                      <input
                        type="radio"
                        id="html"
                        name="report"
                        value="all"
                        className="mr-1"
                        onChange={(e) => setCustomerType(e.target.value)}
                      />
                      <label htmlfor="html" className="mr-2">
                        All
                      </label>
                      <input
                        type="radio"
                        id="retailer"
                        name="report"
                        value="retailer"
                        className="mr-1"
                        onChange={(e) => setCustomerType(e.target.value)}
                      />
                      <label htmlfor="retailer" className="mr-2">
                        Retailer
                      </label>
                      <input
                        type="radio"
                        id="dealer"
                        name="report"
                        value="dealer"
                        className="mr-1"
                        onChange={(e) => setCustomerType(e.target.value)}
                      />
                      <label htmlfor="delear" className="mr-2">
                        Dealer
                      </label>
                    </div>
                    <div className="col-lg-3">
                      <input
                        type="checkbox"
                        id="credit"
                        name="report"
                        value="credit"
                        className="mr-1"
                        onChange={handleCredit}
                      />
                      <label htmlfor="credit">Credit</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnContainer companyBox custom_modal_inner_content">
              <div className="row">
                <div className="col-md-12 pull-right">
                  <Button
                    className="saveCloseBtn border closebtn"
                    onClick={onHide}
                  >
                    Close
                  </Button>
                  <Button
                    className="saveCloseBtn border"
                    type="submit"
                    onClick={handleCreditValue}
                  >
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
              customerType={customerType}
              ref={componentRef}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomerDueReport;
