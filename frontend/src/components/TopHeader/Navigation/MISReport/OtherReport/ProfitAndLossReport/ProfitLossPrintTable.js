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

const ProfitLossPrintTable = React.forwardRef((props, ref) => {
  const { profit_loss_report } = useSelector((state) => state.reports);
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
            <h4 className="responsive-head">Profit and Loss Report</h4>
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
                  Company Name: {profit_loss_report[0]?.name}
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address: {profit_loss_report[0]?.address}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile: {profit_loss_report[0]?.phone}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email: {profit_loss_report[0]?.email}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(profit_loss_report[0]?.start_date).format(
                    "YYYY-MM-DD"
                  )}{" "}
                  To{" "}
                  {moment(profit_loss_report[0]?.end_date).format("YYYY-MM-DD")}
                </h5>
              </div>
            </div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>
            <div className="text-center mt-3">
              <p>Profit and Loss Report</p>
            </div>
            <div class="row justify-content-center">
              <div class="col-auto">
                {props.duration === "year" ? (
                  <table className="print-receipt table-responsive">
                    <thead>
                      <tr className="thead">
                        <th style={style}>Income Acc.</th>
                        <th style={style}>Amount</th>
                        <th style={style}>Expens Acc.</th>
                        <th style={style}>Amount</th>
                      </tr>
                    </thead>

                    <tr>
                      <td>Sales Amount</td>
                      <td>{profit_loss_report[1]?.sales?.toFixed(2)}</td>
                      <td>Purchase Amount of Sold Products</td>
                      <td>
                        {profit_loss_report[1]?.total_purchase?.toFixed(2)}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={2}></td>
                      <td>Last Pay Adjustment</td>
                      <td>
                        {profit_loss_report[1]?.last_pay_adjustment?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td>Adjustment Cash Delevery</td>
                      <td>
                        {profit_loss_report[1]?.adjustment_cash_delilvery?.toFixed(
                          2
                        )}
                      </td>
                      <td>Adjudtment Cash Collection</td>
                      <td>
                        {profit_loss_report[1]?.adjustment_cash_collection?.toFixed(
                          2
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Income</td>
                      <td>{profit_loss_report[1]?.income?.toFixed(2)}</td>
                      <td>Expense</td>
                      <td>{profit_loss_report[1]?.expense?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Total Income</b>
                      </td>
                      <td>
                        <strong>
                          {profit_loss_report[1]?.total_income?.toFixed(2)}
                        </strong>{" "}
                      </td>
                      <td>
                        <strong>Total Expense</strong>
                      </td>
                      <td>
                        <strong>
                          {profit_loss_report[1]?.total_expense?.toFixed(2)}
                        </strong>
                      </td>
                    </tr>

                    <tr style={{ backgroundColor: "#C8C8C8" }}>
                      <td colSpan={4}>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <td>Total Purchase This Year</td>
                      <td>
                        {profit_loss_report[1]?.total_purchase_this_year?.toFixed(
                          2
                        )}
                      </td>
                      <td>Current Year Profit</td>
                      <td>
                        {profit_loss_report[1]?.current_year_profit?.toFixed(2)}
                      </td>
                    </tr>

                    <tr>
                      <td>Profit by Selling</td>
                      <td>{profit_loss_report[1]?.profit?.toFixed(2)}</td>
                      <td>Previous Profit</td>
                      <td>
                        {profit_loss_report[1]?.previous_year_profit?.toFixed(
                          2
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                      <td>
                        <strong>Total Profit</strong>
                      </td>
                      <td>
                        <strong>
                          {profit_loss_report[1]?.total_profit
                            ? profit_loss_report[1]?.total_profit?.toFixed(2)
                            : "N/A"}
                        </strong>
                      </td>
                    </tr>
                  </table>
                ) : (
                  <table className="print-receipt table-responsive">
                    <thead>
                      <tr className="thead">
                        <th style={style}>Income Acc.</th>
                        <th style={style}>Amount</th>
                      </tr>
                    </thead>
                    <tr>
                      <td className="px-5">Sales Amount</td>
                      <td className="px-4">
                        {profit_loss_report[1]?.sales?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td>Profit</td>
                      <td>{profit_loss_report[1]?.profit?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Other Income</td>
                      <td>{profit_loss_report[1]?.other_income?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>
                        {(
                          parseFloat(profit_loss_report[1]?.other_income) +
                          parseFloat(profit_loss_report[1]?.profit)
                        )?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Expense</strong>
                      </td>
                      <td>{profit_loss_report[1]?.expense?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Net Total</strong>
                      </td>
                      <td className="px-4">
                        {profit_loss_report[1]?.net_profit?.toFixed(2)}
                      </td>
                    </tr>
                  </table>
                )}
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

export default ProfitLossPrintTable;
