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

const CustomerwiseBenefitTable = React.forwardRef((props, ref) => {
  const { customer_benefit_report } = useSelector((state) => state.reports);
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
            <h4 className=" responsive-head">Customer Wise Benefit Report</h4>
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
                    customer_benefit_report[customer_benefit_report.length - 1]
                      ?.name
                  }
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address:{" "}
                  {
                    customer_benefit_report[customer_benefit_report.length - 1]
                      ?.address
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile:{" "}
                  {
                    customer_benefit_report[customer_benefit_report.length - 1]
                      ?.phone
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email:{" "}
                  {
                    customer_benefit_report[customer_benefit_report.length - 1]
                      ?.email
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(
                    customer_benefit_report[customer_benefit_report.length - 1]
                      ?.start_date
                  ).format("YYYY-MM-DD")}{" "}
                  To{" "}
                  {moment(
                    customer_benefit_report[customer_benefit_report.length - 1]
                      ?.end_date
                  ).format("YYYY-MM-DD")}
                </h5>
              </div>
              {/* contact_no */}
              <div className="col-lg-6 col-md-6">
                <h4 style={{ fontSize: "18px" }}>
                  Customer Name:{" "}
                  {
                    customer_benefit_report[customer_benefit_report.length - 2]
                      ?.customer_name
                  }
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Customer Code:{" "}
                  {
                    customer_benefit_report[customer_benefit_report.length - 2]
                      ?.customer_code
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Contact No:{" "}
                  {
                    customer_benefit_report[customer_benefit_report.length - 2]
                      ?.customer_contact_no
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Total Benefit:{" "}
                  {
                    customer_benefit_report[customer_benefit_report.length - 2]
                      ?.total_benifit
                  }
                </h5>
              </div>
            </div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>
            <div className="text-center mt-3">
              <p>Customer Wise Benefit Report</p>
            </div>

            {props.selected ? (
              <table className="print-receipt">
                <thead>
                  <tr className="thead">
                    <th style={style}>Customer Code</th>
                    <th style={style}>Customer Name</th>
                    <th style={style}>Contact No.</th>
                    <th style={style}>Total Benefit</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    <tr>
                      <td>
                        {
                          customer_benefit_report[
                            customer_benefit_report.length - 2
                          ]?.customer_code
                        }
                      </td>
                      <td>
                        {
                          customer_benefit_report[
                            customer_benefit_report.length - 2
                          ]?.customer_name
                        }
                      </td>
                      <td>
                        {
                          customer_benefit_report[
                            customer_benefit_report.length - 2
                          ]?.customer_contact_no
                        }
                      </td>
                      <td>
                        {customer_benefit_report[
                          customer_benefit_report.length - 2
                        ]?.total_benifit.toFixed(2)}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            ) : (
              <table className="print-receipt">
                <thead>
                  <tr className="thead">
                    <th style={style}>Product Code</th>
                    <th style={style}>Product Name</th>
                    <th style={style}>Product Sold</th>
                    <th style={style}>Benefit</th>
                  </tr>
                </thead>

                <tbody>
                  {customer_benefit_report
                    ?.slice(0, customer_benefit_report.length - 2)
                    ?.map((benefitData) => {
                      return (
                        <tr>
                          <td>{benefitData?.ProductID__code}</td>
                          <td>{benefitData?.ProductID__name}</td>
                          <td>{benefitData?.quantity}</td>
                          <td>{benefitData?.benifit.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
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

export default CustomerwiseBenefitTable;
