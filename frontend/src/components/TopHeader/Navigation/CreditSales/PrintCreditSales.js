import React from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";
import moment from "moment";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const PrintCreditSales = React.forwardRef((props, ref) => {
  const { creditsales_list } = useSelector((state) => state.creditsales);
  
  const activeUser = useSelector((state) => state.systeminformation);
  const { name, address, phone, email, start_date, end_date } =
    activeUser?.activeUser;
  const currentDate = new Date().toLocaleString();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <div>
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div style={{ padding: "2px" }}>
            <h4
              className="responsive-head print-company"
              style={{
                textShadow: "2px 3px 4px grey",
              }}
            >
              Sales Order Print Data
            </h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={props.onHide}
              style={{ cursor: "pointer", padding: "2px", zIndex: "9999" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body>
          {/* style={{ padding: "0px 5px 40px 5px" }} */}
          <div className="d-flex justify-content-between">
            <button
              className="print-button px-4 py-1 mt-4 mx-lg-5"
              onClick={props.onHide}
            >
              <i
                className="fa fa-arrow-left mr-2"
                style={{
                  fontSize: "15px",
                }}
              ></i>
              Back
            </button>

            <button
              className="print-button px-4 py-1 mt-4 mx-lg-5"
              onClick={props.handlePrint}
            >
              <i
                className="fa fa-print mr-2"
                style={{
                  fontSize: "18px",
                }}
              ></i>
              Print
            </button>
          </div>
          <div className="px-lg-5 mt-4" ref={ref}>
            <div className="row text-center print-table-info">
              <div className="col-lg-12 col-md-12">
                <h4 style={{ fontSize: "18px" }}>Company Name: {name}</h4>
                <h5 style={{ fontSize: "15px" }}>Address: {address}</h5>
                <h5 style={{ fontSize: "15px" }}>Mobile: {phone}</h5>
                <h5 style={{ fontSize: "15px" }}>Email: {email}</h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date: {moment(start_date).format("YYYY-MM-DD")} To{" "}
                  {moment(end_date).format("YYYY-MM-DD")}
                </h5>
              </div>
            </div>

            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>
            <div className="text-center mt-3">
              <p>Credit Sales</p>
            </div>

            <div class="row justify-content-center">
              <div class="col-auto">
                <table
                  className="table-responsive"
                  // style={{
                  //   border: "1px solid #000!important",
                  //   marginBottom: "10px",
                  // }}
                >
                  <thead>
                    <tr className="thead">
                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Invoice_No
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Sales_Date
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Customer
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Address
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Contact_No
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Total_Price
                      </th>

                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        D.Payment
                      </th>

                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Remaining
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  {creditsales_list.map((credit_sell) => (
                    <tr key={credit_sell?.id}>
                      <td>{credit_sell?.invoice_number}</td>
                      <td>
                        {moment(credit_sell?.sales_date).format("YYYY-MM-DD")}
                      </td>
                      <td>{credit_sell?.customer_name}</td>
                      <td>{credit_sell?.customer_address}</td>
                      <td>{credit_sell?.customer_contact_no}</td>
                      <td>{credit_sell?.grand_total.toFixed(2)}</td>
                      <td>{credit_sell?.down_payment.toFixed(2)}</td>
                      <td>{credit_sell?.remaining.toFixed(2)}</td>
                      <td>{credit_sell?.status ? "Cash":"Due"}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
});

export default PrintCreditSales;
