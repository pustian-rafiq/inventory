import moment from "moment";
import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const PrintTable = React.forwardRef((props, ref) => {
  const employeeLists = useSelector((state) => state.employees);
  console.log(employeeLists);

  const activeUser = useSelector((state) => state.systeminformation);

  const { name, address, phone, email, start_date, end_date } =
    activeUser?.activeUser;

  const currentDate = new Date().toLocaleString();

  return (
    // mainDiv
    <div className="px-2">
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
        <span className="pull-right" style={{ fontSize: "10px" }}>
          Print Date: {currentDate}
        </span>
        <div className="text-center mt-3">
          <p>All Employee</p>
        </div>

        <div class="row justify-content-center">
          <div class="col-auto">
            <table className="table-responsive">
              <thead>
                <tr className="thead">
                  <th
                    className="px-lg-4 px-2"
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Code
                  </th>
                  <th
                    className="px-lg-4 px-2"
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Employee Name
                  </th>
                  <th
                    className="px-lg-4 px-2"
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Desination Type
                  </th>
                  <th
                    className="px-lg-4 px-2"
                    style={{
                      backgroundColor: "rgb(221,221,221)",
                      color: "#000",
                    }}
                  >
                    Contact No
                  </th>
                </tr>
              </thead>

              {employeeLists?.map((employeeData) => {
                return (
                  <tr>
                    <td>{employeeData?.code}</td>
                    <td>{employeeData?.name}</td>
                    <td>{employeeData?.designation}</td>
                    <td>{employeeData?.contact_no}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PrintTable;
