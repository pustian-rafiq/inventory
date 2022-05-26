/* eslint-disable eqeqeq */
import React from "react";
import { Container, Row, Col, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import moment from "moment";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const ExpenditureReportTable = React.forwardRef((props, ref) => {
  var headerData = props.headerTitle;
  var expenseHeadId = props.expenseHeadId;
  var status = props.status;

  const currentDate = new Date().toLocaleString();
  const { expenditure_reports } = useSelector((state) => state.reports);

  // Check for expense and income with expense head and without expense head
  if (expenseHeadId == 0 && status == 1) {
    var incomeData = expenditure_reports
      .slice(0, expenditure_reports.length - 1)
      .map((data, i) => {
        return (
          <tr
            style={{
              fontSize: "16px",
              color: "white",
              backgroundColor: "#867D82",
            }}
            key={i}
          >
            <td>{data.total_amount}</td>
            <td>{data.status_type}</td>
          </tr>
        );
      });
  } else if (expenseHeadId == 0 && status == 2) {
    var expenseData = expenditure_reports
      .slice(0, expenditure_reports.length - 1)
      .map((data, i) => {
        return (
          <tr
            style={{
              fontSize: "16px",
              color: "white",
              backgroundColor: "#867D82",
            }}
            key={i}
          >
            <td>{data.total_amount}</td>
            <td>{data.status_type}</td>
          </tr>
        );
      });
  } else if (expenseHeadId && status == 1) {
    var incomeWithHead = expenditure_reports
      .slice(0, expenditure_reports.length - 1)
      .map((data, i) => {
        return (
          <tr key={i}>
            <td>{data.total_amount}</td>
            <td>{data.expense_head}</td>
            <td>{data.status_type}</td>
          </tr>
        );
      });
  } else if (expenseHeadId && status == 2) {
    var expenseWithHead = expenditure_reports
      .slice(0, expenditure_reports.length - 1)
      .map((data, i) => {
        return (
          <tr key={i}>
            <td>{data.total_amount}</td>
            <td>{data.expense_head}</td>
            <td>{data.status_type}</td>
          </tr>
        );
      });
  }
  // System information
  const sysInfo = expenditure_reports
    .slice(expenditure_reports.length - 1, expenditure_reports.length)
    .map((data, i) => {
      return (
        <div className="col-lg-12" key={i}>
          <h4 style={{ fontSize: "18px" }}>Company Name: {data.name}</h4>
          <h5 style={{ fontSize: "15px" }}>Address: {data.address}</h5>
          <h5 style={{ fontSize: "15px" }}>Mobile: {data.phone}</h5>
          <h5 style={{ fontSize: "15px" }}>Email: {data.email}</h5>
          <h5 style={{ fontSize: "15px" }}>
            From Date: {moment(data.start_date).format("YYYY-MM-DD")} To{" "}
            {moment(data.end_date).format("YYYY-MM-DD")}
          </h5>
        </div>
      );
    });

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
            <h4 className="responsive-head">Expenditure Reports</h4>
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
            <div className="row text-center">{sysInfo}</div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>
            <div className="text-center mt-3">
              <p>Expense and Income {headerData}</p>
            </div>
            {/* Show monthly sales data */}
            {expenseHeadId ? (
              <table className="print-receipt">
                <thead>
                  <tr className="thead">
                    <th
                      style={{
                        backgroundColor: "rgb(221,221,221)",
                        color: "#000",
                      }}
                    >
                      Total Amount
                    </th>
                    <th
                      style={{
                        backgroundColor: "rgb(221,221,221)",
                        color: "#000",
                      }}
                    >
                      Expense Head
                    </th>
                    <th
                      style={{
                        backgroundColor: "rgb(221,221,221)",
                        color: "#000",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expenseWithHead ? expenseWithHead : incomeWithHead}
                </tbody>
              </table>
            ) : (
              <table className="print-receipt">
                <thead>
                  <tr className="thead">
                    <th
                      style={{
                        backgroundColor: "rgb(221,221,221)",
                        color: "#000",
                      }}
                    >
                      Total Amount
                    </th>
                    <th
                      style={{
                        backgroundColor: "rgb(221,221,221)",
                        color: "#000",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>{expenseData ? expenseData : incomeData}</tbody>
              </table>
            )}
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

export default ExpenditureReportTable;
