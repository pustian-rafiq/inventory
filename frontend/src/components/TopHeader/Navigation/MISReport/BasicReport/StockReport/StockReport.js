import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useReactToPrint } from "react-to-print";
import CustomerSearch from "../../../../../MISReport/CustomerWiseSalesReport/CustomerSearch";
import PrintTable from "./PrintTable";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const StockReport = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard="false"
        dialogAs={DraggableModal}
      >
        <div  className="background_and_table_header" >
          <Modal.Header
            style={{ cursor: "move" }}
            closeButton
            className="background_and_table_header"
          >
            <Modal.Title id="example-modal-sizes-title-sm">
              <div>
                <h4 className=" responsive-head">Stock Report</h4>
              </div>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="background_and_table_header">
            <form className="form-horizontal">
              <div className="container productBox">
                <div className="row mb-2">
                  <CustomerSearch />
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="text-center">
                      <input
                        type="radio"
                        id="html"
                        name="report"
                        value="All"
                        className="mr-1"
                      />
                      <label htmlfor="html" className="mr-2">
                        All
                      </label>
                      <input
                        type="radio"
                        id="retailer"
                        name="report"
                        value="Retailer"
                        className="mr-1"
                      />
                      <label htmlfor="retailer" className="mr-2">
                        Retailer
                      </label>
                      <input
                        type="radio"
                        id="delear"
                        name="report"
                        value="Delear"
                        className="mr-1"
                      />
                      <label htmlfor="delear" className="mr-2">
                        Delear
                      </label>
                      <input
                        type="radio"
                        id="credit"
                        name="report"
                        value="Credit"
                        className="mr-1"
                      />
                      <label htmlfor="credit">Credit</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right">
                    <Button className="saveCloseBtn" onClick={onHide}>
                      Close
                    </Button>
                    <Button
                      className="saveCloseBtn"
                      onClick={() => setTableMOdal(true)}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </form>
            <div
              style={{
                background: "#ffffff",
                marginBottom: "10px",
              }}
            >
              <PrintTable
                show={tableMOdal}
                onHide={() => setTableMOdal(false)}
                handlePrint={handlePrint}
                ref={componentRef}
              />
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default StockReport;
