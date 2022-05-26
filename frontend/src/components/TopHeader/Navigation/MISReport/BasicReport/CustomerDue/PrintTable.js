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

const PrintTable = React.forwardRef((props, ref) => {
  const { customer_due_report } = useSelector((state) => state.reports);
  const currentDate = new Date().toLocaleString();

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
            <h4 className="responsive-head">Customer Due Report</h4>
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
                  {customer_due_report[customer_due_report.length - 1]?.name}
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address:{" "}
                  {customer_due_report[customer_due_report.length - 1]?.address}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile:{" "}
                  {customer_due_report[customer_due_report.length - 1]?.phone}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email:{" "}
                  {customer_due_report[customer_due_report.length - 1]?.email}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(
                    customer_due_report[customer_due_report.length - 1]
                      ?.start_date
                  ).format("YYYY-MM-DD")}{" "}
                  To{" "}
                  {moment(
                    customer_due_report[customer_due_report.length - 1]
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
              <p>Customer Due Report</p>
            </div>

            <div class="row justify-content-center">
              <div class="col-auto">
                <table className="table-responsive">
                  <thead>
                    <tr className="thead ">
                      <th
                        className="text-center"
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        {" "}
                        Cust. Type
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Code
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Customer Name
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Contact No
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
                        Total Due
                      </th>
                      {customer_due_report[0] &&
                        "This_months_payable_due" in customer_due_report[0] && (
                          <th
                            style={{
                              backgroundColor: "rgb(221,221,221)",
                              color: "#000",
                            }}
                          >
                            This Month Payable Due
                          </th>
                        )}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td rowSpan={customer_due_report?.length}>
                        {props.customerType.toUpperCase()}
                      </td>
                      <td colSpan={6} className="py-3"></td>
                    </tr>
                    {customer_due_report
                      .slice(0, customer_due_report.length - 1)
                      .map((dueReport) => {
                        return (
                          <tr>
                            <td>{dueReport?.customer_code}</td>
                            <td>{dueReport?.customer_name}</td>
                            <td>{dueReport?.customer_contact_no}</td>
                            <td>{dueReport?.customer_address}</td>
                            <td>{dueReport?.total_due?.toFixed(2)}</td>
                            {customer_due_report[0] &&
                              "This_months_payable_due" in
                                customer_due_report[0] && (
                                <td>
                                  {dueReport?.This_months_payable_due
                                    ? dueReport?.This_months_payable_due?.toFixed(
                                        2
                                      )
                                    : 0}
                                </td>
                              )}
                          </tr>
                        );
                      })}
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

export default PrintTable;
