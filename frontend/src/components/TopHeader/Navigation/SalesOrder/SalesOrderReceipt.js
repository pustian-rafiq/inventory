import React, { useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";

import "./Receipt.css";

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

const SalesOrderReceipt = React.forwardRef((props, ref) => {
  const { salesReceipt } = useSelector((state) => state.salesorders);

  // Sales print handler
  // const salesReceiptHandler = () => {
  //   let printHtmlContent = document.getElementById("receiptContent").innerHTML;
  //   let originalHtmlContent = document.body.innerHTML;
  //   document.body.innerHTML = printHtmlContent;
  //   window.print();
  //   document.body.innerHTML = originalHtmlContent;
  // };

  // console.log("receipt Data after form submit from redux:::", salesReceipt);

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
            <h4 className="responsive-head">Sales Receipt </h4>
          </div>

          <div className="pull-right" onClick={props.onHide}>
            <i
              className="fa fa-close"
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        {/* modal body  */}
        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content px-3">
            <div className="d-flex justify-content-between">
              <button
                className="
                  print-button bg-white
                  px-lg-4 px-md-4 px-xs-2 py-1 
                  mt-4 mx-lg-5 mx-sm-5 mx-xs-2 mb-2"
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
                className="print-button bg-white
                  px-lg-4 px-md-4 px-xs-2 py-1 
                  mt-4 mx-lg-5 mx-sm-5 mx-xs-2 mb-2
                  
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

            {/* Choose product */}
            <div
              className="receipt_container bg-light mb-3 p-4 mx-auto rounded text-center"
              // id="receiptContent"
              ref={ref}
            >
              {/* Receipt section  */}
              <div className="dashed_border_bottom">
                {/* shop name  */}
                <div>
                  <h6 className="">
                    Shop Name:{" "}
                    {salesReceipt
                      ? salesReceipt.systemInfo && salesReceipt.systemInfo.name
                      : ""}
                  </h6>
                  <h6 className="">
                    Address:{" "}
                    {salesReceipt
                      ? salesReceipt.systemInfo &&
                        salesReceipt.systemInfo.address
                      : ""}
                  </h6>
                  <h6 className="">
                    Email:{" "}
                    {salesReceipt
                      ? salesReceipt.systemInfo && salesReceipt.systemInfo.email
                      : ""}
                  </h6>
                </div>
                {/* receipt  */}
                <div className="my-2">
                  {" "}
                  <h6 className="text-uppercase font-weight-bold">Receipt</h6>
                </div>
              </div>

              {/* Terminal section  */}
              <div className="d-flex justify-content-between align-items-center py-1 dashed_border_bottom mt-2">
                <div className="flex-grow-1 px-0 mx-0 text-left">
                  <p>Tarminal#1</p>
                </div>
                <div className="mr-1">
                  <p>01-02-2022</p>
                </div>
                <div className="mx-1">
                  <p>12:02:20 PM</p>
                </div>
              </div>

              {/* sales quantity section  */}
              <div className="quantity dashed_border_bottom">
                <p>Product</p>
                {salesReceipt
                  ? salesReceipt.sales_order_details &&
                    salesReceipt.sales_order_details.map((item) => (
                      <div className="d-flex justify-content-between my-1">
                        <div>
                          <p>
                            {item.quantity} x {item.productName}
                          </p>
                        </div>
                        <div>
                          <p>{parseFloat(item.total_amount).toFixed(2)}</p>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>

              {/* amount section  */}
              <div className="amount dashed_border_top mt-1">
                <div className="d-flex justify-content-between my-1">
                  <div>
                    <p>Grand Total</p>
                  </div>
                  <div>
                    <p>
                      {salesReceipt &&
                        parseFloat(salesReceipt.grand_total).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-between my-1">
                  <div>
                    <p>Net Discunt</p>
                  </div>
                  <div>
                    <p>{salesReceipt && salesReceipt.net_discount}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between my-1">
                  <div>
                    <hp>Vat</hp>
                  </div>
                  <div>
                    <p>
                      {salesReceipt && salesReceipt.vat_amount
                        ? parseFloat(salesReceipt.vat_amount).toFixed(2)
                        : 0}
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-between my-1">
                  <div>
                    <p>Payable Amount</p>
                  </div>
                  <div>
                    <p>{salesReceipt && salesReceipt.paid_Amt}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between my-1">
                  <div>
                    <p>Cash Paid</p>
                  </div>
                  <div>
                    <p>
                      {salesReceipt &&
                        parseFloat(salesReceipt.cash_paid).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-between my-1">
                  <div>
                    <p>Adjusment Amount</p>
                  </div>
                  <div>
                    <p>{salesReceipt && salesReceipt.adjustment}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between my-1">
                  <div>
                    <p>Curr. Due</p>
                  </div>
                  <div>
                    <p>
                      {salesReceipt &&
                        parseFloat(salesReceipt.current_due).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-between my-1">
                  <div>
                    <p>Cash Back</p>
                  </div>
                  <div>
                    <p>{salesReceipt && salesReceipt.cashBack}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between mb-1 mt-3">
                  <div>
                    <p>Bank Card</p>
                  </div>
                  <div>
                    <p>{"****"}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between my-1">
                  <div>
                    <p>Bank Amount</p>
                  </div>
                  <div>
                    <p>{salesReceipt && salesReceipt.card_paid_amount}</p>
                  </div>
                </div>
              </div>

              {/* thank you section  */}
              <div className="dashed_border_bottom dashed_border_top py-1">
                <p>Thank You</p>
              </div>

              {/* Qr/Bar Code section  */}
              <div className="dashed_border_bottom py-1">
                <p>Qr or Bar Code</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
});

export default SalesOrderReceipt;
