import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";
import { getAvailableStockReport } from "../../../redux/actions/reportActions";
import CategorySearch from "./CategorySearch";
import CompanySearch from "./CompanySearch";
import PrintTable from "./PrintTable";
import ProductSearch from "./ProductSearch";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AvailableStockReport = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const [id, setID] = useState(0);
  const [reportType, setReportType] = useState("");

  const componentRef = useRef();
  const dispatch = useDispatch();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { user: currentUser } = useSelector((state) => state.auth);
  //const { customerwise_sales } = useSelector((state) => state.reports);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const handleOnClose = () => {
    setID(null);
    setReportType("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (id && reportType) {
      setTableMOdal(true);

      const formData = new FormData();
      formData.append("val", reportType);
      formData.append("id", id);
      dispatch(getAvailableStockReport(formData, headers));
      console.log(formData);
    } else {
      swal("Please select type, code and name!");
    }
  };

  return (
    <Modal
      size="lg"
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
            <h4 className=" responsive-head">Stock Report </h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        <form className="form-horizontal mt-2 " onSubmit={submitHandler}>
          <div className="container productBox custom_modal_inner_content">
            <div className="row mb-2 align-items-center">
              <input
                className="col-1"
                type="radio"
                name="stock"
                id="company"
                value={"company"}
                onChange={(e) => setReportType(e.target.value)}
              ></input>
              {reportType === "company" ? (
                <span className="col-11">
                  <CompanySearch setID={setID} />
                </span>
              ) : (
                <span className="col-11">Company</span>
              )}
            </div>

            <div className="row my-2 align-items-center">
              <input
                className="col-1"
                type="radio"
                name="stock"
                id="category"
                value={"category"}
                onChange={(e) => setReportType(e.target.value)}
              ></input>
              {reportType === "category" ? (
                <span className="col-11">
                  <CategorySearch setID={setID} />
                </span>
              ) : (
                <span className="col-11">Category</span>
              )}
            </div>
            <div className="row mt-2 align-items-center">
              <input
                className="col-1"
                type="radio"
                name="stock"
                id="product"
                value={"product"}
                onChange={(e) => setReportType(e.target.value)}
              ></input>
              {reportType === "product" ? (
                <span className="col-11">
                  <div className="row align-items-center">
                    <ProductSearch setID={setID} />
                  </div>
                </span>
              ) : (
                <span className="col-11">Product</span>
              )}
            </div>
          </div>
          <div className="btnContainer companyBox custom_modal_inner_content">
            <div className="row">
              <div className="col-md-12 pull-right">
                <Button
                  className="saveCloseBtn closebtn border"
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
            reportType={reportType}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AvailableStockReport;
