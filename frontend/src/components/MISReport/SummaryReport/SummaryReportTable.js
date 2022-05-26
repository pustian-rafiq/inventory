import React from "react";
import { Modal, ModalDialog, Button } from "react-bootstrap";
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

const SummaryReportTable = React.forwardRef((props, ref) => {
  const currentDate = new Date().toLocaleString();
  const { summary_reports } = useSelector((state) => state.reports);
  // System information
  const sysInfo = summary_reports
    .slice(summary_reports.length - 1, summary_reports.length)
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
  const date = summary_reports
    .slice(summary_reports.length - 1, summary_reports.length)
    .map((data, i) => {
      return (
        <h5 className="text-center font-weight-bold">
          Summary Report From The Date :{" "}
          {moment(data.start_date).format("DD MMM YYYY")} To{" "}
          {moment(data.end_date).format("DD MMM YYYY")}
        </h5>
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
            <h4 className="responsive-head">Summary Reports</h4>
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
            <div className="summry-report-title mt-3 border p-2 border-secondary mt-4">
              {date}
            </div>
            {summary_reports
              .slice(0, summary_reports.length - 1)
              .map((data) => {
                return (
                  <div className="summmary-details">
                    <div className="row mt-2">
                      {/* selling price table */}
                      <div className="col-md-12 mb-2">
                        <ol className="font-weight-bold">
                          <div className="row mb-2 ">
                            <div className="col-8">
                              <li>Selling Price (Cash)</li>
                            </div>
                            <div className="col-4">
                              <span>{data?.sales_amount?.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-8">
                              <li>Selling Price (Credit)</li>
                            </div>
                            <div className="col-4">
                              <span>
                                {data?.credit_sales_amount?.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <div className="row my-2 py-2 border-top border-dark">
                            <div className="col-2"></div>
                            <div className="col-6">
                              <span>Total Selling Price : </span>
                            </div>
                            <div className="col-4">
                              <span>
                                {data?.total_sales_amount?.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </ol>
                      </div>
                      {/* Discount Price table  */}

                      <div className="col-md-12 mb-1">
                        <ol className="font-weight-bold">
                          <div className="row mb-2 ">
                            <div className="col-8">
                              <li>Discount Amount (Cash)</li>
                            </div>
                            <div className="col-4">
                              <span>{data?.sales_discount?.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="row mb-2">
                            <div className="col-8">
                              <li>Discount Amount (Credit)</li>
                            </div>
                            <div className="col-4">
                              <span>
                                {data?.credit_sales_discount?.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="row my-2 py-2 border-top border-dark">
                            <div className="col-2"></div>
                            <div className="col-6">
                              <span>Total Discount : </span>
                            </div>
                            <div className="col-4">
                              <span>{data?.total_discount?.toFixed(2)}</span>
                            </div>
                          </div>
                        </ol>
                      </div>

                      {/* received amount details  */}

                      <div className="col-md-12 mb-1">
                        <ol className="font-weight-bold">
                          <div className="row mb-2 ">
                            <div className="col-8">
                              <li>Received Amount (Cash)</li>
                            </div>
                            <div className="col-4">
                              <span>
                                {data?.sales_receive_amount?.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="row mb-2">
                            <div className="col-8">
                              <li>Received Amount (Credit)</li>
                            </div>
                            <div className="col-4">
                              <span>
                                {data?.credit_sales_receive_amount?.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-8">
                              <li>Received Amount (Down Payment)</li>
                            </div>
                            <div className="col-4">
                              <span>{data?.credit_receive?.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-8">
                              <li>Received Amount (Cash Collection)</li>
                            </div>
                            <div className="col-4">
                              <span>
                                {data?.cash_collection_receive?.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="row my-2 py-2 border-top border-dark">
                            <div className="col-2"></div>
                            <div className="col-6">
                              <span>Total Received : </span>
                            </div>
                            <div className="col-4">
                              <span>
                                {data?.total_receive_amount?.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </ol>
                      </div>

                      {/* payment due and remaining account  */}

                      <div className="col-md-12 mb-1">
                        <ol className="font-weight-bold">
                          <div className="row mb-2 ">
                            <div className="col-8">
                              <li>Payment Due (Cash)</li>
                            </div>
                            <div className="col-4">
                              <span>{data?.sales_due_amount?.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="row mb-2">
                            <div className="col-8">
                              <li>Remaining Amount (Credit)</li>
                            </div>
                            <div className="col-4">
                              <span>
                                {data?.credit_sales_due_amount?.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="row my-2 py-2 border-top border-dark">
                            <div className="col-2"></div>
                            <div className="col-6">
                              <span>Total Due : </span>
                            </div>
                            <div className="col-4">
                              <span>{data?.total_due_amount?.toFixed(2)}</span>
                            </div>
                          </div>
                        </ol>
                      </div>

                      {/* expense amount section  */}

                      <div className="col-md-12 mt-2">
                        <ol className="font-weight-bold">
                          <div className="row mb-2 ">
                            <div className="col-8">
                              <li>Expense Amount</li>
                            </div>
                            <div className="col-4">
                              <span>{data?.expense_amount?.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="row my-2 py-2 border-top border-dark">
                            <div className="col-2"></div>
                            <div className="col-6">
                              <span>Net Amount: </span>
                            </div>
                            <div className="col-4">
                              <span>{data?.sales_discount?.toFixed(2)}</span>
                            </div>
                          </div>
                        </ol>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default SummaryReportTable;
