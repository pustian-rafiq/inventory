import React, { useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./login.css";

import { login } from "../../../redux/actions/auth";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert" style={{ width: "70%" }}>
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  //const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then((response) => {
          props.history.push("/dashboard");
          //window.location.reload();
          // - Save the JWT in localStorage
          localStorage.setItem("token", response.data.token);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      //console.log("elseif")
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <div className="loginContainer">
        <Container>
          <Row>
            <Col md={3} lg={3}></Col>
            <Col sm={12} md={12} lg={6}>
              <div className="loginPage">
                <div className="loginTitle text-center">
                  <h2>User Login</h2>
                </div>
                <Form onSubmit={handleLogin} ref={form}>
                  <div className="loginForm">
                    <div className="loginField">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        placeholder="Enter your email"
                        validations={[required]}
                        className="Input"
                      />
                    </div>
                    <div className="loginField">
                      <label htmlFor="password">Password</label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                        className="Input"
                        placeholder="Enter your correct password"
                      />
                    </div>
                    <div className="loginBtn">
                      {/* <input type="submit" value="Sign In" /> */}
                      <button
                        className="btn btn-primary btn-block"
                        disabled={loading}
                      >
                        {loading && (
                          <span className="spanTitle spinner-border spinner-border-sm"></span>
                        )}
                        <span className="spanTitle">Login</span>
                      </button>
                    </div>
                    <div className="forgotPassword">
                      <span className="spanTitle">
                        {" "}
                        <a href="#1"> Forgot your password?</a>{" "}
                      </span>
                    </div>
                  </div>

                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
              </div>
            </Col>
            <Col md={3} lg={3}></Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Login;
