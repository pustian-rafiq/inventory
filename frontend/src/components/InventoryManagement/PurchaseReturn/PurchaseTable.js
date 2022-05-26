import React from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
// import { Icon } from "react-icons-kit";
// import { trash } from "react-icons-kit/feather/trash";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addSalesReturn,
//   getSalesReturnLists,
// } from "../../../redux/actions/salesReturnActions";
// import { toast } from "react-toastify";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
// getting the values of local storage
// const getDatafromLS = () => {
//   const data = localStorage.getItem("salesReturns");
//   if (data) {
//     return JSON.parse(data);
//   } else {
//     return [];
//   }
// };

const PurchaseTable = (props) => {
  var nowDate = new Date();
  var date =
    nowDate.getFullYear() +
    "/" +
    (nowDate.getMonth() + 1) +
    "/" +
    nowDate.getDate();
  return (
    <div className="mainDiv m-0 px-5">
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
        <div style={{ background: "#9fa1ed" }}>
          <Modal.Header
            style={{ background: "rgb(174, 200, 242)", cursor: "move" }}
            closeButton
          >
            <Modal.Title id="example-modal-sizes-title-sm">
              <div style={{ float: "left", height: "3px" }}>
                <h4>Invoice Report</h4>
              </div>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{ background: "#ffffff" }}
            className="m-0 px-5"
            //   ref={ref}
          >
            {/* <Button className="mt-4 btn-danger" onClick={props.handlePrint}>
                Print Report
              </Button> */}
            <div className="text-center">
              <h3>Sokhina Enterprize</h3>
              <h5>New Market , Rajshahi</h5>
              <h5>Mobile : +880 1816 9457</h5>
              <span className="border border-dark py-2 px-4">
                return invoice
              </span>
            </div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {date}
            </span>

            <div className="container">
              <div className="row">
                <div className="col-md-12 py-3">
                  <div className="row">
                    <div className="col-md-6">
                      <span>
                        <b>Return No : </b>115
                      </span>
                    </div>
                    <div className="col-md-6 text-right">
                      <span>
                        <b>Return Date : </b>12/11/2022{" "}
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <span>
                        <b>Customer :</b> Hakkani
                      </span>
                    </div>
                    <div className="col-md-6 text-right">
                      <span>
                        <b>Mobile: </b> 01745126547{" "}
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <span>
                        <b>Address : </b>jamira,puthia,rajshahi
                      </span>
                    </div>
                    <div className="col-md-6"></div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <span>
                        <b>Propriter : </b> janu alom
                      </span>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container print-receipt">
              <div className="row">
                <div className="col-12">
                  <table className="tabfale">
                    <thead>
                      <tr>
                        <th scope="col">SL</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Company</th>
                        <th scope="col">Model</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>amardfs</td>
                        <td>12546</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@sdsfat</td>
                        <td>12546</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        <td>@sdstwitter</td>
                        <td>12546</td>
                      </tr>
                      <tr>
                        <td colspan="4" className="text-right ">
                          <b className="mr-4">Total</b>
                        </td>
                        <td>12546</td>
                      </tr>

                      <tr>
                        <td colspan="4" className="text-right ">
                          <b className="mr-4">Balance_Total</b>
                        </td>
                        <td>12546</td>
                      </tr>

                      <tr>
                        <td colspan="4" className="text-right ">
                          <b className="mr-4">Current_due</b>
                        </td>
                        <td>100.46</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <p
              style={{
                border: "none",
                borderBottom: "1px dotted black",
              }}
              className="mt-4"
            >
              In Words{" "}
              <b className="ml-5 text-muted">Three thousend taka only </b>
            </p>

            {/* signature part  */}

            <div className="container">
              <div className="row mt-4">
                <div className="col-md-4">
                  <span
                    style={{
                      borderTop: "2px solid black",
                      padding: "3px",
                      fontWeight: "bold",
                    }}
                  >
                    Receiver's
                  </span>
                </div>

                <div className="col-md-4">
                  <span
                    style={{
                      borderTop: "2px solid black",
                      padding: "3px",
                      fontWeight: "bold",
                    }}
                  >
                    Preparied By
                  </span>
                </div>

                <div className="col-md-4">
                  <span
                    style={{
                      borderTop: "2px solid black",
                      padding: "3px",
                      fontWeight: "bold",
                    }}
                  >
                    Authorized By
                  </span>
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: "14px",
                marginTop: "20px",
              }}
            >
              Date : 21/1/2022 12.00 PM
            </p>

            <p
              style={{
                fontSize: "14px",
                marginTop: "20px",
                float: "right",
                overflow: "hidden",
              }}
            >
              powered by Hakkani mim
            </p>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default PurchaseTable;
