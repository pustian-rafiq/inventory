import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./registration.css";

const Registration = () => {
  return (
    <>
      <div className="registerContainer">
        <Container>
          <Row>
            <Col md={2} lg={2}></Col>
            <Col sm={12} md={8} lg={8}>
              <div className="registerPage">
                <div className="registerTitle text-center">
                  <h2>User Sign Up</h2>
                </div>
                <div className="registerForm">
                  <div className="registerField">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="registerField">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="registerField">
                    <label htmlFor="conatct">Contact No</label>
                    <input
                      type="text"
                      id="conatct"
                      placeholder="Enter your conatct no"
                    />
                  </div>
                  <div className="registerField">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your correct password"
                    />
                  </div>
                  <div className="registerField">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Enter your confirm password"
                    />
                  </div>
                  <div className="registerField">
                    <label htmlFor="userType">User Type</label>
                    <input type="number" id="userType" defaultValue="0" />
                  </div>
                  <div className="registerField">
                    <label htmlFor="status">Status</label>
                    <input type="number" id="status" defaultValue="0" />
                  </div>
                  <div className="editableField">
                    <label htmlFor="editable">IsEditable</label>
                    <span className="spanTitle">
                      <input type="checkbox" id="editable" />
                    </span>
                  </div>
                  <div className="registerBtn">
                    <input type="submit" value="Sign Up" />
                  </div>
                </div>
              </div>
            </Col>
            <Col md={2} lg={2}></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Registration;
