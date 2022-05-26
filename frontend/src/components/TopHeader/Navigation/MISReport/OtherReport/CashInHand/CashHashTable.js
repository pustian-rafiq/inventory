import moment from "moment";
import React from "react";
import { Col, Container, Modal, ModalDialog, Row } from "react-bootstrap";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const CashHashTable = React.forwardRef((props, ref) => {
  const { cash_in_hand_report } = useSelector((state) => state.reports);
  const currentDate = new Date().toLocaleString();

  const style = {
    backgroundColor: "rgb(221,221,221)",
    color: "#000",
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <Modal.Header className="background_and_table_header" closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          <div>
            <h4 className="responsive-head">Cash In Hand Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        <div className="report_modal_inner_content px-3">
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
          <div ref={ref} className="px-lg-5 mt-4">
            <div className="row text-center">
              <div className="col-lg-12">
                <h4 style={{ fontSize: "18px" }}>
                  Company Name: {cash_in_hand_report[0]?.name}
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address: {cash_in_hand_report[0]?.address}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile: {cash_in_hand_report[0]?.phone}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email: {cash_in_hand_report[0]?.email}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(cash_in_hand_report[0]?.start_date).format(
                    "YYYY-MM-DD"
                  )}{" "}
                  To{" "}
                  {moment(cash_in_hand_report[0]?.end_date).format(
                    "YYYY-MM-DD"
                  )}
                </h5>
              </div>
            </div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>
            <div className="text-center mt-3">
              <p>Cash In Hand Report</p>
            </div>

            <div class="row justify-content-center">
              <div class="col-auto">
                <table className="print-receipt table-responsive">
                  <thead>
                    <tr className="thead">
                      <th style={style}>Debit Particulars</th>
                      <th style={style}>Debit Amount</th>
                      <th style={style}>Credit Partculars</th>
                      <th style={style}>Credit Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>
                        <strong>Opening Cash In Hands</strong>
                      </td>
                      <td>{cash_in_hand_report[1]?.opening_cash_in_hands}</td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr>
                      <td>Cash Sales</td>
                      <td>{cash_in_hand_report[1]?.cash_sales}</td>
                      <td>Cash Paid</td>
                      <td>{cash_in_hand_report[1]?.cash_purchase}</td>
                    </tr>
                    <tr>
                      <td>Cash Collection From Customer</td>
                      <td>
                        {cash_in_hand_report[1]?.cash_receive_from_customer}
                      </td>
                      <td>Cash Delivery to Supplier</td>
                      <td>
                        {cash_in_hand_report[1]?.cash_delivery_to_supplier}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total Debit</strong>
                      </td>
                      <td>{cash_in_hand_report[1]?.total_debit}</td>
                      <td>
                        <strong>Total Credit</strong>
                      </td>
                      <td>{cash_in_hand_report[1]?.total_credit}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <strong>Current Cash in Hand</strong>
                      </td>
                      <td>{cash_in_hand_report[1]?.current_cash_in_hand}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <strong>Closing Cash in Hand</strong>
                      </td>
                      <td>{cash_in_hand_report[1]?.total_cash_in_hand}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Container className="pt-5 mt-2 text-center">
              <Row>
                <Col sm={6} md={6} lg={6} xs={6}>
                  <h5
                    style={{
                      fontSize: "14px",
                      marginTop: "15px",
                    }}
                    className="text-lg-left"
                  >
                    Managing Director
                  </h5>
                </Col>

                <Col sm={6} md={6} lg={6} xs={6}>
                  <h5
                    style={{
                      fontSize: "14px",
                      marginTop: "15px",
                    }}
                    className="text-lg-right"
                  >
                    Showroom Manager
                  </h5>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default CashHashTable;
