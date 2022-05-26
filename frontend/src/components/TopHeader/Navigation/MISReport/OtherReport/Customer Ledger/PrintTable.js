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

const PrintTable = React.forwardRef((props, ref) => {
  const { customer_ledger_report } = useSelector((state) => state.reports);

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
            <h4 className=" responsive-head">Customer Ledger Report</h4>
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
                  {
                    customer_ledger_report[customer_ledger_report.length - 1]
                      ?.name
                  }
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address:{" "}
                  {
                    customer_ledger_report[customer_ledger_report.length - 1]
                      ?.address
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile:{" "}
                  {
                    customer_ledger_report[customer_ledger_report.length - 1]
                      ?.phone
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email:{" "}
                  {
                    customer_ledger_report[customer_ledger_report.length - 1]
                      ?.email
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(
                    customer_ledger_report[customer_ledger_report.length - 1]
                      ?.start_date
                  ).format("YYYY-MM-DD")}{" "}
                  To{" "}
                  {moment(
                    customer_ledger_report[customer_ledger_report.length - 1]
                      ?.end_date
                  ).format("YYYY-MM-DD")}
                </h5>
              </div>
            </div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>
            <div className="text-center mt-3">
              <p>Customer Ledger Report</p>
            </div>

            <div className="mb-4">
              <div className="row">
                <div className="col-md-12">
                  <div className="amar-table">
                    <h4 className="my-3 font-weight-bold text-center">
                      Amount Result(Cash)
                    </h4>

                    <div class="row justify-content-center">
                      <div class="col-auto">
                        <table
                          className="print-receipt table-responsive overflow-auto"
                          style={{
                            maxHeight: "400px",
                          }}
                        >
                          <thead>
                            <tr className="thead">
                              <th style={style}>Invoice No</th>
                              <th style={style}>Invoice Date</th>
                              <th style={style}>Total</th>
                              <th style={style}>Adjustment</th>
                              <th style={style}>Discount</th>
                              <th style={style}>Net Amount</th>
                              <th style={style}>Received Amount</th>
                              <th style={style}>Due</th>
                            </tr>
                          </thead>

                          {customer_ledger_report[0]?.map((cashAmountData) => {
                            return (
                              <tr>
                                <td>{cashAmountData?.invoice_no}</td>
                                <td>
                                  {moment(cashAmountData?.invoice_date).format(
                                    "YYYY-MM-DD"
                                  )}
                                </td>
                                <td>
                                  {cashAmountData?.sales_grand_total.toFixed(2)}
                                </td>
                                <td>
                                  {cashAmountData?.adjustment_in_sales.toFixed(
                                    2
                                  )}
                                </td>
                                <td>
                                  {cashAmountData?.total_discount.toFixed(2)}
                                </td>
                                <td>
                                  {cashAmountData?.net_amounts.toFixed(2)}
                                </td>
                                <td>
                                  {cashAmountData?.receive_amount.toFixed(2)}
                                </td>
                                <td>{cashAmountData?.due.toFixed(2)}</td>
                              </tr>
                            );
                          })}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="row">
                <div className="col-md-12">
                  <div className="amar-table">
                    <h4 className="my-3 font-weight-bold text-center">
                      Amount Result(Credit)
                    </h4>
                    <div class="row justify-content-center">
                      <div class="col-auto">
                        <table
                          className="print-receipt table-responsive overflow-auto"
                          style={{
                            maxHeight: "400px",
                          }}
                        >
                          <thead>
                            <tr className="thead">
                              <th style={style}>Invoice No</th>
                              <th style={style}>Sales Date</th>
                              <th style={style}>Total</th>
                              <th style={style}>Discount</th>
                              <th style={style}>Net Amount</th>
                              <th style={style}>Received Amount</th>
                              <th style={style}>Due</th>
                            </tr>
                          </thead>

                          {customer_ledger_report[1]?.map(
                            (creditAmountData) => {
                              return (
                                <tr>
                                  <td>{creditAmountData?.invoice_number}</td>
                                  <td>
                                    {moment(
                                      creditAmountData?.sales_date
                                    ).format("YYYY-MM-DD")}
                                  </td>
                                  <td>
                                    {creditAmountData?.credit_sales_grand_total.toFixed(
                                      2
                                    )}
                                  </td>
                                  <td>
                                    {creditAmountData?.total_discount.toFixed(
                                      2
                                    )}
                                  </td>
                                  <td>
                                    {creditAmountData?.net_amounts.toFixed(2)}
                                  </td>
                                  <td>
                                    {creditAmountData?.receive_amount.toFixed(
                                      2
                                    )}
                                  </td>
                                  <td>{creditAmountData?.due.toFixed(2)}</td>
                                </tr>
                              );
                            }
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" mb-4">
              <div className="row">
                <div className="col-md-12">
                  <div className="amar-table">
                    <h4 className="my-3 font-weight-bold text-center">
                      Ruturning Product
                    </h4>
                    <div class="row justify-content-center">
                      <div class="col-auto">
                        <table
                          className="print-receipt table-responsive overflow-auto"
                          style={{
                            maxHeight: "261px",
                          }}
                        >
                          <thead>
                            <tr className="thead">
                              <th className="px-2" style={style}>
                                Retn. Date
                              </th>
                              <th className="px-2" style={style}>
                                Invoice No
                              </th>
                              <th className="px-2" style={style}>
                                Back Amount
                              </th>
                              <th className="px-2" style={style}>
                                Grandtotal
                              </th>
                              <th className="px-2" style={style}>
                                Due Amount
                              </th>
                            </tr>
                          </thead>

                          {customer_ledger_report[2]?.map((reurnData) => {
                            return (
                              <tr>
                                <td>
                                  {moment(reurnData?.return_date).format(
                                    "YYYY-MM-DD"
                                  )}
                                </td>
                                <td>{reurnData?.invoice_no}</td>
                                <td>{reurnData?.back_amount.toFixed(2)}</td>
                                <td>{reurnData?.grandtotal.toFixed(2)}</td>
                                <td>{reurnData?.due_amount.toFixed(2)}</td>
                              </tr>
                            );
                          })}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" mt-4 text-center">
              <div className="row">
                <div className="col-md-12">
                  {/* cash received number  */}

                  <h4 className="my-3 font-weight-bold">Cash Received Table</h4>
                  <div class="row justify-content-center">
                    <div class="col-auto">
                      <table
                        className="print-receipt table-responsive overflow-auto"
                        style={{
                          maxHeight: "261px",
                        }}
                      >
                        <thead>
                          <tr className="thead">
                            <th className="px-3" style={style}>
                              Entry Date
                            </th>
                            <th className="px-3" style={style}>
                              Receipt No
                            </th>
                            <th className="px-3" style={style}>
                              Total Amount
                            </th>
                            <th className="px-3" style={style}>
                              Adjustment
                            </th>
                          </tr>
                        </thead>

                        {customer_ledger_report[3]?.map((cashReceivedData) => {
                          return (
                            <tr>
                              <td>
                                {moment(cashReceivedData?.entry_date).format(
                                  "YYYY-MM-DD"
                                )}
                              </td>
                              <td>{cashReceivedData?.receipt_no}</td>
                              <td>
                                {cashReceivedData?.total_amount.toFixed(2)}
                              </td>
                              <td>{cashReceivedData?.adjustment.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
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

export default PrintTable;
