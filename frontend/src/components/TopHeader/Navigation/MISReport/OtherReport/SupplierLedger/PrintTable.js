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
  const { supplier_ledgerz_report } = useSelector((state) => state.reports);

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
            <h4 className="responsive-head">Supplier Ledger Report </h4>
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
                  Company Name: {supplier_ledgerz_report[4]?.name}
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address: {supplier_ledgerz_report[4]?.address}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile: {supplier_ledgerz_report[4]?.phone}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email: {supplier_ledgerz_report[4]?.email}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(supplier_ledgerz_report[4]?.start_date).format(
                    "YYYY-MM-DD"
                  )}{" "}
                  To{" "}
                  {moment(supplier_ledgerz_report[4]?.end_date).format(
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
              <p>Supplier Ledger Report</p>
            </div>

            <div className="mb-4">
              <div class="row justify-content-center">
                <div class="col-auto">
                  <div className="amar-table">
                    <h4 className="my-3 font-weight-bold text-center">
                      Amount Result
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
                              <th style={style}>Challan No.</th>
                              <th style={style}>Order Date</th>
                              <th style={style}>Net Amount</th>
                              <th style={style}>Received Amount</th>
                              <th style={style}>Total Discount</th>
                              <th style={style}>Due</th>
                              <th style={style}>Grand Total</th>
                            </tr>
                          </thead>

                          {supplier_ledgerz_report[0]?.map((amountData) => {
                            return (
                              <tr>
                                <td>{amountData?.challan_no}</td>
                                <td>
                                  {moment(amountData?.order_date).format(
                                    "YYYY-MM-DD"
                                  )}
                                </td>
                                <td>{amountData?.net_amounts.toFixed(2)}</td>
                                <td>{amountData?.receive_amount.toFixed(2)}</td>
                                <td>{amountData?.total_discount.toFixed(2)}</td>
                                <td>{amountData?.due.toFixed(2)}</td>
                                <td>{amountData?.grand_total.toFixed(2)}</td>
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
              <div class="row justify-content-center">
                <div class="col-auto">
                  <div className="amar-table">
                    <h4 className="my-3 font-weight-bold text-center">
                      Ruturning Product
                    </h4>

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

                      {supplier_ledgerz_report[1]?.map((reurnData) => {
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

            <div className="mt-4 text-center">
              <div class="row justify-content-center">
                <div class="col-auto">
                  <h4 className="my-3 font-weight-bold">Cash Received Table</h4>
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

                    {supplier_ledgerz_report[2]?.map((cashReceivedData) => {
                      return (
                        <tr>
                          <td>
                            {moment(cashReceivedData?.entry_date).format(
                              "YYYY-MM-DD"
                            )}
                          </td>
                          <td>{cashReceivedData?.receipt_no}</td>
                          <td>{cashReceivedData?.total_amount.toFixed(2)}</td>
                          <td>{cashReceivedData?.adjustment.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
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

export default PrintTable;
