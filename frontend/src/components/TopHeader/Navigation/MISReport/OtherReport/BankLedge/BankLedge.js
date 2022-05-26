import moment from "moment";
import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useReactToPrint } from "react-to-print";
import BankSearch from "../../../../../AccountManagement/BankTransaction/AddBank/BankSearch";
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

const BankLedge = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <Modal.Header className="background_and_table_header" closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          <div>
            <h4 className="responsive-head">Bank Ledger Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        {/* Company Add Form Start Here */}

        <form className="form-horizontal">
          <div className="container productBox custom_modal_inner_content">
            <div className=" d-flex align-items-center">
              <p className="mt-2 mr-2">Bank</p>
              <div className="row mb-2 align-items-center">
                <BankSearch />
              </div>
            </div>

            <div className="row pt-3 pb-3">
              <div className="col-md-12">
                <div className="row align-items-center">
                  <div className="col-md-6 input-group input-group-sm align-items-center">
                    From
                    <input
                      type="date"
                      className="form-control productInput ml-2"
                      id="code"
                      onChange={(e) => {
                        setStartDate(
                          moment(e.target.value).format("YYYY-MM-DD")
                        );
                      }}
                    />
                  </div>
                  <div className="col-md-6 input-group input-group-sm align-items-center">
                    To{" "}
                    <input
                      type="date"
                      className="form-control productInput ml-4"
                      id="code"
                      onChange={(e) => {
                        setEndDate(moment(e.target.value).format("YYYY-MM-DD"));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btnContainer companyBox custom_modal_inner_content">
            <div className="row">
              <div className="col-md-12 pull-right">
                <Button
                  className="saveCloseBtn closebtn border-0"
                  onClick={() => {
                    onHide(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  className="saveCloseBtn border-0"
                  onClick={() => setTableMOdal(true)}
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </form>

        <PrintTable
          show={tableMOdal}
          onHide={() => setTableMOdal(false)}
          handlePrint={handlePrint}
          ref={componentRef}
        />

        {/* Company Add Form End Here */}
      </Modal.Body>
    </Modal>
  );
};

export default BankLedge;
