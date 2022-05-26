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
  const { company_benefit_report } = useSelector((state) => state.reports);

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
            <h4 className=" responsive-head">Company Benefit Report</h4>
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
              <div className="col-lg-12 col-md-12">
                <h4 style={{ fontSize: "18px" }}>
                  Company Name:{" "}
                  {
                    company_benefit_report[company_benefit_report.length - 1]
                      ?.name
                  }
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address:{" "}
                  {
                    company_benefit_report[company_benefit_report.length - 1]
                      ?.address
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile:{" "}
                  {
                    company_benefit_report[company_benefit_report.length - 1]
                      ?.phone
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email:{" "}
                  {
                    company_benefit_report[company_benefit_report.length - 1]
                      ?.email
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(
                    company_benefit_report[company_benefit_report.length - 1]
                      ?.start_date
                  ).format("YYYY-MM-DD")}{" "}
                  To{" "}
                  {moment(
                    company_benefit_report[company_benefit_report.length - 1]
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
              <p>Company Benefit Report</p>
            </div>
            <div class="row justify-content-center">
              <div class="col-auto">
                <table className="print-receipt table-responsive">
                  <thead>
                    <tr className="thead">
                      <th style={style}>Product Name</th>
                      <th style={style}>Product Code</th>
                      <th style={style}>Per Product Purchase</th>
                      <th style={style}>Per Product Sales</th>
                      <th style={style}>Per Product Benifit</th>
                      <th style={style}>Total Benifit</th>
                    </tr>
                  </thead>

                  {Array.isArray(company_benefit_report[0]) &&
                    company_benefit_report[0]?.map((productData) => {
                      return (
                        <tr>
                          <td>{productData?.product_name}</td>
                          <td>{productData?.product_code}</td>
                          <td>
                            {productData?.per_product_purchase?.toFixed(2)}
                          </td>
                          <td>{productData?.per_product_sales?.toFixed(2)}</td>
                          <td>
                            {productData?.per_product_benifit?.toFixed(2)}
                          </td>
                          <td>{productData?.total_benifit?.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  {!Array.isArray(company_benefit_report[0]) && (
                    <tr>
                      <td>{company_benefit_report[0]?.product_name}</td>
                      <td>{company_benefit_report[0]?.product_code}</td>
                      <td>
                        {company_benefit_report[0]?.per_product_purchase?.toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {company_benefit_report[0]?.per_product_sales?.toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {company_benefit_report[0]?.per_product_benifit?.toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {company_benefit_report[0]?.total_benifit?.toFixed(2)}
                      </td>
                    </tr>
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
