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
  const { available_stock } = useSelector((state) => state.reports);
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
            <h4 className="responsive-head">Available Stock Report</h4>
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
                  {available_stock[available_stock.length - 1]?.name}
                </h4>
                <h5 style={{ fontSize: "15px" }}>
                  Address:{" "}
                  {available_stock[available_stock.length - 1]?.address}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Mobile: {available_stock[available_stock.length - 1]?.phone}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  Email: {available_stock[available_stock.length - 1]?.email}
                </h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date:{" "}
                  {moment(
                    available_stock[available_stock.length - 1]?.start_date
                  ).format("YYYY-MM-DD")}{" "}
                  To{" "}
                  {moment(
                    available_stock[available_stock.length - 1]?.end_date
                  ).format("YYYY-MM-DD")}
                </h5>
              </div>
            </div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>
            <div className="text-center mt-3">
              <p>Available Stock Report</p>
            </div>

            <table className="table-responsive">
              <thead>
                <tr className="thead">
                  <th
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Product Name
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Product Code
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Company Name
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Quantity Shortage
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Sales Rate
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Total Saleable Amount
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Purchase Rate
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Total Purchase Amount
                  </th>
                </tr>
              </thead>
              {
                // props.reportType === "company" &&
                available_stock[0]?.map((stockData) => {
                  return (
                    <tr>
                      <td>{stockData?.product__category__name}</td>
                      <td>{stockData?.product__code}</td>
                      <td>{stockData?.product__company__name}</td>
                      <td>{stockData?.product__category__name}</td>
                      <td>{stockData?.quantity_shortage}</td>
                      <td>{stockData?.Sales_rate?.toFixed(2)}</td>
                      <td>{stockData?.total_salable_amount?.toFixed(2)}</td>
                      <td>{stockData?.Purchase_rate?.toFixed(2)}</td>
                      <td>{stockData?.total_purchase_amount?.toFixed(2)}</td>
                    </tr>
                  );
                })
              }
            </table>
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
