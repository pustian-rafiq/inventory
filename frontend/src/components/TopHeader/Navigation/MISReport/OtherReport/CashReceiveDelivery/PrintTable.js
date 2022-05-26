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
  const { cash_receive_delivery_report } = useSelector(
    (state) => state.reports
  );
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
            <h4 className="responsive-head">
              Cash Receive and Delivery Report
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
            <div className="row text-center px-5">
              <div className="col-lg-6 col-md-6">
                <h4 style={{ fontSize: "18px" }}>
                  Company Name:{" "}
                  {
                    cash_receive_delivery_report[
                      cash_receive_delivery_report.length - 1
                    ]?.name
                  }
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address:{" "}
                  {
                    cash_receive_delivery_report[
                      cash_receive_delivery_report.length - 1
                    ]?.address
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile:{" "}
                  {
                    cash_receive_delivery_report[
                      cash_receive_delivery_report.length - 1
                    ]?.phone
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email:{" "}
                  {
                    cash_receive_delivery_report[
                      cash_receive_delivery_report.length - 1
                    ]?.email
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(
                    cash_receive_delivery_report[
                      cash_receive_delivery_report.length - 1
                    ]?.start_date
                  ).format("YYYY-MM-DD")}{" "}
                  To{" "}
                  {moment(
                    cash_receive_delivery_report[
                      cash_receive_delivery_report.length - 1
                    ]?.end_date
                  ).format("YYYY-MM-DD")}
                </h5>
              </div>
              {/* contact_no */}
              <div className="col-lg-6 col-md-6">
                <h4 style={{ fontSize: "18px" }}>
                  {cash_receive_delivery_report[1]?.customer_name
                    ? `Customer Name: ${cash_receive_delivery_report[1]?.customer_name}`
                    : `Supplier Name: ${cash_receive_delivery_report[1]?.supplier_name}`}
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  {cash_receive_delivery_report[1]?.customer_name
                    ? `Customer Code: ${cash_receive_delivery_report[1]?.customer_code}`
                    : `Supplier Code: ${cash_receive_delivery_report[1]?.supplier_code}`}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Contact No: {cash_receive_delivery_report[1]?.contact_no}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Total Amount: {cash_receive_delivery_report[1]?.total_amounut}
                </h5>
              </div>
            </div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>
            <div className="text-center mt-3">
              <p>Cash Receive and Delivery Report</p>
            </div>
            <div class="row justify-content-center">
              <div class="col-auto">
                <table className="print-receipt table-responsive">
                  <thead>
                    <tr className="thead">
                      <th style={style}>Entry Date</th>
                      <th style={style}>Receipt No</th>
                      <th style={style}>Payment Type</th>
                      <th style={style}>Amount</th>
                    </tr>
                  </thead>

                  {cash_receive_delivery_report[0]?.map(
                    (receiveDeliveryData) => {
                      return (
                        <tr>
                          <td>
                            {moment(receiveDeliveryData?.entry_date).format(
                              "YY-MM-DD"
                            )}
                          </td>
                          <td>{receiveDeliveryData?.receipt_no}</td>
                          <td>{receiveDeliveryData?.payment_type}</td>
                          <td>{receiveDeliveryData?.amounts}</td>
                        </tr>
                      );
                    }
                  )}
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

export default PrintTable;
