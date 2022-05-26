import React from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";
import moment from "moment";

const PrintSalesReturn = React.forwardRef((props, ref) => {
  const salesreturnLists = useSelector((state) => state.salesreturnLists);

  const activeUser = useSelector((state) => state.systeminformation);
  const { name, address, phone, email, start_date, end_date } =
    activeUser?.activeUser;
  const currentDate = new Date().toLocaleString();

  class DraggableModal extends React.Component {
    render() {
      return (
        <Draggable handle=".modal-header">
          <ModalDialog {...this.props} />
        </Draggable>
      );
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <div>
      <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">

          <div>
            <h4>Print Sales Return</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={props.onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body style={{ background: "#fff" }}>
    
          <button
            className="print-button px-4 py-1 mt-4 mx-5"
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
            className="print-button px-4 py-1 mt-4 mx-5 float-right"
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

          <div className="mainDiv m-0 px-5 mt-4" ref={ref}>
            <div className="row text-center px-5">
              <div className="col-lg-12 col-md-12">
                <h4 style={{ fontSize: "18px" }}>Company Name: {name}</h4>
                <h5 style={{ fontSize: "15px" }}>Address: {address}</h5>
                <h5 style={{ fontSize: "15px" }}>Mobile: {phone}</h5>
                <h5 style={{ fontSize: "15px" }}>Email: {email}</h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date: {moment(start_date).format("YYYY-MM-DD")} To{" "}
                  {moment(end_date).format("YYYY-MM-DD")}
                </h5>
              </div>
            </div>

            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right mb-3" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>

        
            <table style={{ border: "1px solid #000!important",marginBottom:'10px' }}>
              <tr>
                <th
                  style={{
                    backgroundColor: "rgb(221,221,221)",
                    color: "#000",
                  }}
                >
                  Return Date
                </th>

                <th
                  style={{
                    backgroundColor: "rgb(221,221,221)",
                    color: "#000",
                  }}
                >
                  Invoice No
                </th>

                <th
                  style={{
                    backgroundColor: "rgb(221,221,221)",
                    color: "#000",
                  }}
                >
                  Customer
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
                  Paid Amount
                </th>

                <th
                     style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                >
                  Due Amount
                </th>
              </tr>

              {salesreturnLists.map((selesreturn) => (
                <tr key={selesreturn.id}>
                  <td>
                    {moment(selesreturn.return_date).format("DD-MM-YYYY")}
                  </td>
                  <td>{selesreturn.invoice_no}</td>
                  <td>{selesreturn.customers_name}</td>
                  <td>{selesreturn.cusomters_contact_no}</td>
                  <td>{selesreturn.paid_amount}</td>
                  <td>{selesreturn.curr_credit}</td>
                </tr>
              ))}
            </table>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
});

export default PrintSalesReturn;
