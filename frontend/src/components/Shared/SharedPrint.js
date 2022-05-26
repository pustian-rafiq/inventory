
import moment from "moment";
import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const SharedPrint=()=> {

  const activeUser = useSelector((state) => state.systeminformation);

  const { name, address, phone, email, start_date, end_date } =
    activeUser?.activeUser;

  const currentDate = new Date().toLocaleString();

  return (
    <div className="mainDiv m-0 px-5">
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

      
    </div>
  );
};

export default SharedPrint;
