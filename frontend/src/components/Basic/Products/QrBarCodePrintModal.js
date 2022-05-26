import React, { useState } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import "./QrBarCodeModal.css";

// Draggable feature
class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

// ({ show, onHide, selectedProductList })
const QrBarCodePrintModal = React.forwardRef((props, ref) => {
  // close modal
  const closeHandler = () => {
    props.onHide();
  };

  // console.log("Selected Product List ::::", selectedProductList);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <div>
        {/* modal header  */}
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head">Qr/Bar Code</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={closeHandler}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        {/* modal body  */}
        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content px-3">
            <div
              style={{
                height: "500px",
                width: "100%",
                margin: "0px auto",
                backgroundColor: "white",
                padding: "20px",
              }}
            >
              <div className="d-flex justify-content-between my-2 mx-auto">
                <div>
                  <p>Qr/Bar Code</p>
                </div>
                <div>
                  <button className="print-button" onClick={props.handlePrint}>
                    <i
                      className="fa fa-print mr-2"
                      style={{
                        fontSize: "18px",
                      }}
                    ></i>
                    Print
                  </button>
                </div>
              </div>

              <div className="" style={{ height: "85%", overflow: "auto" }}>
                <div ref={ref}>
                  {props.selectedProductList.map((item) => (
                    <div className="p-1 m-1">
                      {item.qrbar == "Both" ? (
                        <div className="row">
                          <table>
                            <thead></thead>
                            <tbody>
                              {[...Array(parseInt(item.quantity))].map((el) => (
                                <tr className="col-4">
                                  <td>
                                    <div className="mt-3 p-3 mx-2 custom_border">
                                      <h6 className="font_size">
                                        Product Name : {item.name}
                                      </h6>
                                      <h6 className="font_size">
                                        Mrp : {item.mrp} Tk.
                                      </h6>
                                      <h6 className="font_size">
                                        Vat: {item.vat} %
                                      </h6>
                                      <div className="mt-2">
                                        <h6 className="font_size">Bar Code</h6>
                                        <img
                                          src={`${item.barCode}`}
                                          alt="qr code"
                                        />
                                      </div>

                                      <div className="mt-2">
                                        <h6 className="font_size">Qr Code</h6>
                                        <img
                                          src={`${item.qrCode}`}
                                          alt="qr code"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : item.qrbar == "Bar Code" ? (
                        <div className="row">
                          <table>
                            <thead></thead>
                            <tbody>
                              {[...Array(parseInt(item.quantity))].map((el) => (
                                <tr className="col-4">
                                  <td>
                                    <div className="mt-3 p-3 mx-2 custom_border">
                                      <div>
                                        <h6 className="font_size">
                                          Product Name : {item.name}
                                        </h6>
                                        <h6 className="font_size">
                                          Mrp : {item.mrp} Tk.
                                        </h6>
                                      </div>
                                      <h6 className="font_size">
                                        Vat: {item.vat} %
                                      </h6>
                                      <img
                                        src={`${item.barCode}`}
                                        alt="qr code"
                                      />{" "}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="row">
                          <table>
                            <thead></thead>
                            <tbody>
                              {[...Array(parseInt(item.quantity))].map((el) => (
                                <tr className="col-4">
                                  <td>
                                    <div className="mt-3 p-3 mx-2 custom_border">
                                      <div>
                                        <h6 className="font_size">
                                          Product Name : {item.name}
                                        </h6>
                                        <h6 className="font_size">
                                          Mrp : {item.mrp} Tk.
                                        </h6>
                                      </div>
                                      <h6 className="font_size">
                                        Vat: {item.vat} %
                                      </h6>
                                      <img
                                        src={`${item.qrCode}`}
                                        alt="qr code"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
});

export default QrBarCodePrintModal;
