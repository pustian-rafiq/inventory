/* eslint-disable eqeqeq */
import React from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  ModalDialog,
  Row,
} from "react-bootstrap";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
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

const MonthlyPurchaseReportTable = React.forwardRef((props, ref) => {
  var headerData = props.headerTitle;
  const currentDate = new Date().toLocaleString();
  const { monthly_purchase } = useSelector((state) => state.reports);
  // System information
  const sysInfo = monthly_purchase
    .slice(monthly_purchase.length - 1, monthly_purchase.length)
    .map((data, i) => {
      return (
        <div className="col-lg-12" key={i}>
          <h4 style={{ fontSize: "18px" }}>Company Name: {data.name}</h4>
          <h5 style={{ fontSize: "15px" }}>Address: {data.address}</h5>
          <h5 style={{ fontSize: "15px" }}>Mobile: {data.phone}</h5>
          <h5 style={{ fontSize: "15px" }}>Email: {data.email}</h5>
          <h5 style={{ fontSize: "15px" }}>
            From Date: {moment(data.start_date).format("YYYY-MM-DD")} To{" "}
            {moment(data.end_date).format("YYYY-MM-DD")}
          </h5>
        </div>
      );
    });

  const len1 = monthly_purchase.length;
  const len2 = len1 == 2 ? len1 - 1 : len1 - 2;
  var summary = [];
  var totalSummary = [];
  // Show monthly sales total summary data
  if (len1 == 2) {
    console.log(summary);
    summary = monthly_purchase.slice(0, len2).map((data, i) => {
      return (
        <tr
          style={{
            fontSize: "16px",
            color: "white",
            backgroundColor: "#867D82",
          }}
          key={i}
        >
          <td>{data.summary_total_amount.toFixed(2)}</td>
          <td>{data.summary_net_amount.toFixed(2)}</td>
          <td>{data.summary_paid_amount.toFixed(2)}</td>
          <td>{data.summary_due_amount.toFixed(2)}</td>
          <td>{data.summary_discount.toFixed(2)}</td>
        </tr>
      );
    });
  } else {
    // Show monthly sales data
    var monthlyPurchaseData = monthly_purchase.slice(0, len2).map((data, i) => {
      return (
        <tr key={i}>
          <td>{data.date}</td>
          <td>{data.total_amount ? data.total_amount.toFixed(2) : 0}</td>
          <td>{data.net_amount ? data.net_amount.toFixed(2) : 0}</td>
          <td>{data.paid_amount ? data.paid_amount.toFixed(2) : 0}</td>
          <td>{data.due_amount ? data.due_amount.toFixed(2) : 0}</td>
          <td>{data.discount ? data.discount.toFixed(2) : 0}</td>
        </tr>
      );
    });

    totalSummary = monthly_purchase.slice(len2, len1 - 1).map((data, i) => {
      return (
        <tr
          style={{
            fontSize: "16px",
            color: "white",
            backgroundColor: "#867D82",
          }}
          key={i}
        >
          <td>Total Summary</td>
          <td>{data.summary_total_amount.toFixed(2)}</td>
          <td>{data.summary_net_amount.toFixed(2)}</td>
          <td>{data.summary_paid_amount.toFixed(2)}</td>
          <td>{data.summary_due_amount.toFixed(2)}</td>
          <td>{data.summary_discount.toFixed(2)}</td>
        </tr>
      );
    });
  }
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
            <h4 className="responsive-head">Monthly Purchase {headerData}</h4>
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
            <div className="row text-center">{sysInfo}</div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>

            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>

            <div className="text-center mt-3">
              <p>Monthly Purchase {headerData}</p>
            </div>
            {/* Show monthly purchase data */}
            {monthlyPurchaseData ? (
              <div class="row justify-content-center">
                <div class="col-auto">
                  <table className="print-receipt table-responsive">
                    <thead>
                      <tr className="thead">
                        <th style={style}>Date</th>
                        <th style={style}>Total Amount</th>
                        <th style={style}>Net Amount</th>
                        <th style={style}>Paid Amount</th>
                        <th style={style}>Due Amount</th>
                        <th style={style}>Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyPurchaseData}
                      <tr>
                        <td className="text-center" colspan="6">
                          Summary
                        </td>
                      </tr>
                      {totalSummary}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              //  Show monthly purchase summary data
              <div class="row justify-content-center">
                <div class="col-auto">
                  <table className="print-receipt table-responsive">
                    <thead>
                      <tr className="thead">
                        <th style={style}>Total Amount</th>
                        <th style={style}>Net Amount</th>
                        <th style={style}>Paid Amount</th>
                        <th style={style}>Due Amount</th>
                        <th style={style}>Discount</th>
                      </tr>
                    </thead>
                    <tbody>{summary}</tbody>
                  </table>
                </div>
              </div>
            )}
            <Container className="pt-5 text-center">
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

export default MonthlyPurchaseReportTable;