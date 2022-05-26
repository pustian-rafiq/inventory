import moment from "moment";
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

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const DailyPurchaseReportTable = React.forwardRef((props, ref) => {
  const { daily_purchase } = useSelector((state) => state.reports);

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
            <h4 className="responsive-head">Daily Purchase Report</h4>
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
                  Company Name:{" "}
                  {daily_purchase[daily_purchase.length - 1]?.name}
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address: {daily_purchase[daily_purchase.length - 1]?.address}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile: {daily_purchase[daily_purchase.length - 1]?.phone}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email: {daily_purchase[daily_purchase.length - 1]?.email}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(
                    daily_purchase[daily_purchase.length - 1]?.start_date
                  ).format("YYYY-MM-DD")}{" "}
                  To{" "}
                  {moment(
                    daily_purchase[daily_purchase.length - 1]?.end_date
                  ).format("YYYY-MM-DD")}
                </h5>
              </div>
            </div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>
            <div className="text-center mt-3">
              <p>Daily Purchase Report</p>
            </div>

            <div class="row justify-content-center">
              <div class="col-auto">
                <table className="print-receipt text-center table-responsive">
                  <thead>
                    <tr className="thead">
                      <th style={style}>Date</th>
                      <th style={style}>Total Amount</th>
                      <th style={style}>Net Ammount</th>
                      <th style={style}>Paid Amount</th>
                      <th style={style}>Due Amount</th>
                      <th style={style}>Discount</th>
                    </tr>
                  </thead>

                  {props.purchaseType === "details" &&
                    daily_purchase
                      .slice(0, daily_purchase.length - 2)
                      .map((dailyData) => {
                        return (
                          <tr>
                            <td>{dailyData?.date}</td>
                            <td>{dailyData?.total_amount?.toFixed(2)}</td>
                            <td>{dailyData?.net_amount?.toFixed(2)}</td>
                            <td>{dailyData?.paid_amount?.toFixed(2)}</td>
                            <td>{dailyData?.due_amount?.toFixed(2)}</td>
                            <td>{dailyData?.discount?.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                  <tr>
                    <td className="text-center" colspan="6">
                      Summary
                    </td>
                  </tr>
                  {props.purchaseType === "summary" &&
                    daily_purchase.slice(0, 1).map((dailyData, i) => {
                      return (
                        <tr
                          style={{
                            fontSize: "16px",
                            color: "white",
                            backgroundColor: "#867D82",
                          }}
                          key={i}
                        >
                          <td>Total</td>
                          <td>{dailyData?.summary_total_amount?.toFixed(2)}</td>
                          <td>{dailyData?.summary_net_amount?.toFixed(2)}</td>
                          <td>{dailyData?.summary_paid_amount?.toFixed(2)}</td>
                          <td>{dailyData?.summary_due_amount?.toFixed(2)}</td>
                          <td>{dailyData?.summary_discount?.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  {props.purchaseType === "details" &&
                    daily_purchase
                      .slice(
                        daily_purchase.length - 2,
                        daily_purchase.length - 1
                      )
                      .map((dailyData, i) => {
                        return (
                          <tr
                            style={{
                              fontSize: "16px",
                              color: "white",
                              backgroundColor: "#867D82",
                            }}
                            key={i}
                          >
                            <td>Total</td>
                            <td>
                              {dailyData.summary_total_amount?.toFixed(2)}
                            </td>
                            <td>{dailyData.summary_net_amount?.toFixed(2)}</td>
                            <td>{dailyData.summary_paid_amount?.toFixed(2)}</td>
                            <td>{dailyData.summary_due_amount?.toFixed(2)}</td>
                            <td>{dailyData.summary_discount?.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                </table>
              </div>
            </div>
            <Container className="pt-4 text-center">
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

export default DailyPurchaseReportTable;
