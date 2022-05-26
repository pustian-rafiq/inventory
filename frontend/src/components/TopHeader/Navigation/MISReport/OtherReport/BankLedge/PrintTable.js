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
                <h4>Bank Ledger Report</h4>
              </div>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ background: "#ffffff" }} className="m-0">
            <Button
              className="mt-4 mx-5 btn-danger"
              onClick={props.handlePrint}
            >
              Print Report
            </Button>
            <div ref={ref} className="px-5 mt-4">
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
              <div
                style={{ border: "1px solid black", marginTop: "10px" }}
              ></div>
              <div className="text-center mt-3">
                <p>Bank Ledger Report</p>
              </div>

              <table className="print-receipt">
                <thead>
                  <tr className="thead">
                    <th>Date</th>
                    <th>Total Purchase</th>
                    <th>TDiscount/Adjust</th>
                    <th>Net Purchase</th>
                    <th>Cash Paid</th>
                    <th>Due/Remaining</th>
                  </tr>
                </thead>
                <tr>
                  <td>1 Aug 2021</td>
                  <td>7000</td>
                  <td>0</td>
                  <td>6700</td>
                  <td>6700</td>
                  <td>5000</td>
                </tr>
                <tr>
                  <td>1 Aug 2021</td>
                  <td>7000</td>
                  <td>0</td>
                  <td>6700</td>
                  <td>6700</td>
                  <td>5000</td>
                </tr>
                <tr>
                  <td>1 Aug 2021</td>
                  <td>7000</td>
                  <td>0</td>
                  <td>6700</td>
                  <td>6700</td>
                  <td>5000</td>
                </tr>
                <tr>
                  <td>1 Aug 2021</td>
                  <td>7000</td>
                  <td>0</td>
                  <td>6700</td>
                  <td>6700</td>
                  <td>5000</td>
                </tr>
                <tr>
                  <td>1 Aug 2021</td>
                  <td>7000</td>
                  <td>0</td>
                  <td>6700</td>
                  <td>6700</td>
                  <td>5000</td>
                </tr>
                <tr>
                  <td>1 Aug 2021</td>
                  <td>7000</td>
                  <td>0</td>
                  <td>6700</td>
                  <td>6700</td>
                  <td>5000</td>
                </tr>
                <tr>
                  <td>1 Aug 2021</td>
                  <td>7000</td>
                  <td>0</td>
                  <td>6700</td>
                  <td>6700</td>
                  <td>5000</td>
                </tr>
                <tr>
                  <td>1 Aug 2021</td>
                  <td>7000</td>
                  <td>0</td>
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
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
});

export default PrintTable;
