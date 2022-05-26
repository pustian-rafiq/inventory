import React, { useRef } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useReactToPrint } from "react-to-print";
import PrintTable from "./PrintTable";
import SupplierSearch from "../../../../../MISReport/SupplierwisePurchase/SupplierSearch";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierDueReport } from "../../../../../../redux/actions/reportActions";
import swal from "sweetalert";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const SupplierDueReport = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const [getSupplierId, setGetSupplierId] = useState("");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const supplierIdHandler = (supplierId) => {
    setGetSupplierId(supplierId);
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("supplier", getSupplierId);
    if (getSupplierId) {
      dispatch(getSupplierDueReport(formData, headers));
      setTableMOdal(true);
    } else {
      swal("Please select a supplier and date!");
    }
  };
  const handleOnClose = () => {
    setGetSupplierId("");
  };
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
      onExit={handleOnClose}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <Modal.Header className="background_and_table_header" closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          <div>
            <h4 className="responsive-head">Supplier Due Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
      <div className="custom_modal_inner_content">
        <form className="form-horizontal mt-2" onSubmit={submitHandler}>
          <div className="container productBox custom_modal_inner_content">
            <div className="row mb-2 align-items-center">
              <SupplierSearch supplierId={supplierIdHandler} />
            </div>
          </div>
          <div className="btnContainer companyBox custom_modal_inner_content">
            <div className="row">
              <div className="col-md-12 pull-right">
                <Button
                  className="saveCloseBtn border closebtn"
                  onClick={onHide}
                >
                  Close
                </Button>
                <Button className="saveCloseBtn border" type="submit">
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
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SupplierDueReport;
