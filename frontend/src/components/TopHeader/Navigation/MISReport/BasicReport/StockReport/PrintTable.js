import React from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  ModalDialog,
  Row,
} from "react-bootstrap";
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
  const activeUser = useSelector((state) => state.systeminformation);

  const { name, address, phone } = activeUser?.activeUser;

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
      <Modal.Header
        style={{ background: "rgb(174, 200, 242)", cursor: "move" }}
        closeButton
      >
        <Modal.Title id="example-modal-sizes-title-sm">
          <div style={{ float: "left", height: "3px" }}>
            <h4>Sock Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{ background: "#ffffff" }}
        className="m-0 px-5"
        ref={ref}
      >
        <Button className="mt-4 btn-danger" onClick={props.handlePrint}>
          Print Report
        </Button>
        <div className="row text-center">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <h4>{name}</h4>
            <h5>{address}</h5>
            <h5>Mobile: {phone}</h5>
          </div>

          <div className="col-lg-4">
            <span className="">Date: {currentDate}</span>
          </div>
        </div>
        <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
        <div className="text-center mt-3">
          <p>Stock Report</p>
        </div>

        <table className="print-receipt ">
          <thead>
            <tr className="thead ">
              <th className="text-center"> Cust. Type</th>
              <th>Code</th>
              <th>Customer Name</th>
              <th>Contact No</th>
              <th>Address</th>
              <th>Total Due</th>
            </tr>
          </thead>

          <tr>
            <td rowSpan={17}>Retailer</td>
            <td colSpan={5} className="py-3"></td>
          </tr>
          <tr>
            <td>7000</td>
            <td>abdur rahim</td>
            <td>0175698745</td>
            <td>kishorgong</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>abdur rahim</td>
            <td>0175698745</td>
            <td>kishorgong</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>abdur rahim</td>
            <td>0175698745</td>
            <td>kishorgong</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>abdur rahim</td>
            <td>0175698745</td>
            <td>kishorgong</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>abdur rahim</td>
            <td>0175698745</td>
            <td>kishorgong</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>Rafiqul islam</td>
            <td>6700</td>
            <td>6700</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>Munna vai</td>
            <td>6700</td>
            <td>6700</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>Khalid</td>
            <td>6700</td>
            <td>6700</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>abdur rahim</td>
            <td>0175698745</td>
            <td>kishorgong</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>Hakkani</td>
            <td>6700</td>
            <td>6700</td>
            <td>5000</td>
          </tr>

          <tr>
            <td>7000</td>
            <td>abdur rahim</td>
            <td>0175698745</td>
            <td>kishorgong</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>Ariful islam</td>
            <td>6700</td>
            <td>6700</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>najmul via</td>
            <td>6700</td>
            <td>6700</td>
            <td>5000</td>
          </tr>

          <tr>
            <td>7000</td>
            <td>abdur rahim</td>
            <td>0175698745</td>
            <td>kishorgong</td>
            <td>5000</td>
          </tr>

          <tr>
            <td>7000</td>
            <td>abdur rahim</td>
            <td>0175698745</td>
            <td>kishorgong</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>7000</td>
            <td>Baki nam </td>
            <td>6700</td>
            <td>6700</td>
            <td>5000</td>
          </tr>
        </table>
        <Container className="pt-4 text-center">
          <Row>
            <Col sm={6} md={6} lg={6}>
              <h5
                style={{
                  fontSize: "14px",
                  marginTop: "15px",
                }}
                className="text-left"
              >
                Signature by Managing Director
              </h5>
            </Col>

            <Col sm={6} md={6} lg={6}>
              <h5
                style={{
                  fontSize: "14px",
                  marginTop: "15px",
                }}
                className="text-right"
              >
                Signature By Showroom Manager
              </h5>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
});

export default PrintTable;
