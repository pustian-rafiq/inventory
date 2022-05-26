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
  const { product_sale_pur_report } = useSelector((state) => state.reports);

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
              Product Wise Sales and Purchase Report
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
              <div className="col-lg-12 col-md-12">
                <h4 style={{ fontSize: "18px" }}>
                  Company Name:{" "}
                  {
                    product_sale_pur_report[product_sale_pur_report.length - 1]
                      ?.name
                  }
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address:{" "}
                  {
                    product_sale_pur_report[product_sale_pur_report.length - 1]
                      ?.address
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile:{" "}
                  {
                    product_sale_pur_report[product_sale_pur_report.length - 1]
                      ?.phone
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email:{" "}
                  {
                    product_sale_pur_report[product_sale_pur_report.length - 1]
                      ?.email
                  }
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(
                    product_sale_pur_report[product_sale_pur_report.length - 1]
                      ?.start_date
                  ).format("YYYY-MM-DD")}{" "}
                  To{" "}
                  {moment(
                    product_sale_pur_report[product_sale_pur_report.length - 1]
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
              <p>Product Wise Sales and Purchase Report</p>
            </div>

            {/* Purchase details report table */}
            <table className="print-receipt mb-5">
              <thead>
                <tr>
                  <td className="text-center" colspan="2">
                    Purchase Details
                  </td>
                </tr>
              </thead>
              <thead>
                <tr className="thead">
                  <th style={style}>Quantity</th>
                  <th style={style}>Amounts</th>
                </tr>
              </thead>
              <tr>
                <td>{product_sale_pur_report[0]?.quantity}</td>
                <td>{product_sale_pur_report[0]?.total_amounts}</td>
              </tr>
            </table>

            {/* Sale details report table */}
            <table className="print-receipt mb-5">
              <thead>
                <tr>
                  <td className="text-center" colspan="2">
                    Sale Details
                  </td>
                </tr>
              </thead>
              <thead>
                <tr className="thead">
                  <th style={style}>Quantity</th>
                  <th style={style}>Amounts</th>
                </tr>
              </thead>
              <tr>
                <td>{product_sale_pur_report[1]?.quantity}</td>
                <td>{product_sale_pur_report[1]?.total_amounts}</td>
              </tr>
            </table>

            {/* Credit Sale details report table */}
            <table className="print-receipt mb-5">
              <thead>
                <tr>
                  <td className="text-center" colspan="2">
                    Credit Sale Details
                  </td>
                </tr>
              </thead>
              <thead>
                <tr className="thead">
                  <th style={style}>Quantity</th>
                  <th style={style}>Amounts</th>
                </tr>
              </thead>
              <tr>
                <td>{product_sale_pur_report[2]?.quantity}</td>
                <td>{product_sale_pur_report[2]?.total_amounts}</td>
              </tr>
            </table>

            {/* Total Sale details report table */}
            <table className="print-receipt mb-5">
              <thead>
                <tr>
                  <td className="text-center" colspan="2">
                    Total Sale Details
                  </td>
                </tr>
              </thead>
              <thead>
                <tr className="thead">
                  <th style={style}>Quantity</th>
                  <th style={style}>Amounts</th>
                </tr>
              </thead>
              <tr>
                <td>{product_sale_pur_report[3]?.total_sales_quanitity}</td>
                <td>{product_sale_pur_report[3]?.total_sales_amounts}</td>
              </tr>
            </table>

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
