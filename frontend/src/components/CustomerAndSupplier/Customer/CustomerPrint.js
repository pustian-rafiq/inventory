import React from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";
import moment from "moment";

const CustomerPrint = React.forwardRef((props, ref) => {
  const customers = useSelector((state) => state.customers);

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
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4>Customer Print Table </h4>
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
          <div className="d-flex justify-content-between">
            <button
              className="
                  print-button 
                  px-lg-4 px-md-4 px-xs-2 py-1 
                  mt-4 mx-lg-5 mx-sm-5 mx-xs-2"
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
              className="print-button 
                  px-lg-4 px-md-4 px-xs-2 py-1 
                  mt-4 mx-lg-5 mx-sm-5 mx-xs-2
                  
                  "
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

          <div className="px-lg-5 mt-4" ref={ref}>
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
            <br />
            <div className="text-center mt-2">
              <p className="text-center">Customer List</p>
            </div>

            <div className=" row justify-content-center">
              <div className=" col-auto">
                <table
                  className=" table-responsive"
                  style={{
                    border: "1px solid #000!important",
                    marginBottom: "10px",
                  }}
                >
                  <thead>
                    <tr className="thead">
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
                        Name
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
                        Contact No
                      </th>

                      <th
                        style={{
                          backgroundColor: "rgb(221,221,221)",
                          color: "#000",
                        }}
                      >
                        Total Due
                      </th>
                    </tr>
                  </thead>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer?.code}</td>
                      <td>{customer?.name}</td>
                      <td>{customer?.address}</td>
                      <td>{customer?.contact_no}</td>
                      <td>{customer?.total_due.toFixed(2)}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
});

export default CustomerPrint;
