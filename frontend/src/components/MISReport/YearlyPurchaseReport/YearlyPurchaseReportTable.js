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

const YearlyPurchaseReportTable = React.forwardRef((props, ref) => {
  const currentDate = new Date().toLocaleString();
  const { yearly_purchase } = useSelector((state) => state.reports);
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
            <h4 className="responsive-head">
              Yearly Purchase {props.headerTitle}
            </h4>
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
                  {yearly_purchase[yearly_purchase.length - 1]?.name}
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address:{" "}
                  {yearly_purchase[yearly_purchase.length - 1]?.address}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile: {yearly_purchase[yearly_purchase.length - 1]?.phone}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email: {yearly_purchase[yearly_purchase.length - 1]?.email}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(
                    yearly_purchase[yearly_purchase.length - 1]?.start_date
                  ).format("YYYY-MM-DD")}{" "}
                  To{" "}
                  {moment(
                    yearly_purchase[yearly_purchase.length - 1]?.end_date
                  ).format("YYYY-MM-DD")}
                </h5>
              </div>
            </div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>
            <div className="text-center mt-3">
              <p>Yearly Purchase {props.headerTitle}</p>
            </div>
            <div class="row justify-content-center">
              <div class="col-auto">
                <table className="print-receipt table-responsive">
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

                  {props.summary === "" &&
                    yearly_purchase
                      .slice(0, yearly_purchase.length - 2)
                      .map((yearlyData) => {
                        return (
                          <tr>
                            <td>
                              {moment(yearlyData?.date).format("YYYY-MM-DD")}
                            </td>
                            <td>{yearlyData?.total_amount?.toFixed(2)}</td>
                            <td>{yearlyData?.net_amount?.toFixed(2)}</td>
                            <td>{yearlyData?.paid_amount?.toFixed(2)}</td>
                            <td>{yearlyData?.due_amount?.toFixed(2)}</td>
                            <td>{yearlyData?.discount?.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                  <tr>
                    <td className="text-center" colspan="6">
                      Summary
                    </td>
                  </tr>
                  {props.summary === "" &&
                    yearly_purchase
                      .slice(
                        yearly_purchase.length - 2,
                        yearly_purchase.length - 1
                      )
                      .map((yearlyData) => {
                        return (
                          <tr className="">
                            <td>Total</td>
                            <td>
                              {yearlyData.summary_total_amount?.toFixed(2)}
                            </td>
                            <td>{yearlyData.summary_net_amount?.toFixed(2)}</td>
                            <td>
                              {yearlyData.summary_paid_amount?.toFixed(2)}
                            </td>
                            <td>{yearlyData.summary_due_amount?.toFixed(2)}</td>
                            <td>{yearlyData.summary_discount?.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                  {props.summary === "summary" &&
                    yearly_purchase.slice(0, 1).map((yearlyData) => {
                      return (
                        <tr className="">
                          <td>Total</td>
                          <td>{yearlyData.summary_total_amount?.toFixed(2)}</td>
                          <td>{yearlyData.summary_net_amount?.toFixed(2)}</td>
                          <td>{yearlyData.summary_paid_amount?.toFixed(2)}</td>
                          <td>{yearlyData.summary_due_amount?.toFixed(2)}</td>
                          <td>{yearlyData.summary_discount?.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
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

export default YearlyPurchaseReportTable;
