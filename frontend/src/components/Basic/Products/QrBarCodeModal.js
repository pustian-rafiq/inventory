import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Draggable from "react-draggable";

import QrBarCodePrintModal from "./QrBarCodePrintModal";
import QrBarProductSearchModal from "./QrBarProductSearchModal";

import "./QrBarCodeModal.css";
import { useReactToPrint } from "react-to-print";

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

const QrBarCodeModal = ({ show, onHide }) => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productBarCode, setProductBarCode] = useState("");
  const [productQrCode, setProductQrCode] = useState("");
  const [productMrp, setProductMrp] = useState("");
  const [selectedProductList, setSelectedProductList] = useState([]);
  const [qrBarCodePrintModal, setQrBarCodePrintModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
    setValue,
  } = useForm();
  // Fetch data from redux store

  // close modal
  const closeHandler = () => {
    onHide();
  };

  // set code value
  if (productName !== "") {
    setValue("name", productName);
  }

  // set name value
  if (productCode !== "") {
    setValue("code", productCode);
  }

  // product handler final
  const productHandler = (id, code, name, barCode, qrCode, mrp) => {
    setProductId(id);
    setProductName(name);
    setProductCode(code);
    setProductBarCode(barCode);
    setProductQrCode(qrCode);
    setProductMrp(mrp);

    // console.log("qr code : ",barCode, qrCode, mrp);
  };

  // add selected product handler
  const addProductQrBarHandler = (data) => {
    data.id = productId;
    data.name = productName;
    data.code = productCode;
    data.barCode = productBarCode;
    data.qrCode = productQrCode;
    data.mrp = productMrp;

    console.log("data with images ::", data);

    let index = selectedProductList.findIndex(
      (item) =>
        item.id == data.id && item.qrbar == data.qrbar && item.vat == data.vat
    );

    if (index >= 0) {
      const duplicate_selectedProductList = [...selectedProductList];
      duplicate_selectedProductList[index].quantity =
        parseInt(duplicate_selectedProductList[index].quantity) +
        parseInt(data.quantity);
      setSelectedProductList([...duplicate_selectedProductList]);
    } else {
      setSelectedProductList([...selectedProductList, data]);
    }

    reset();
    setProductName("");
    setProductCode("");
  };

  //  deleted selected product handler
  const deleteSelectedProductHandler = (id, qrbar, vat) => {
    const deletedProduct = selectedProductList.filter(
      (p) => p.id !== id || p.qrbar !== qrbar || p.vat !== vat
    );
    setSelectedProductList([...deletedProduct]);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
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
            <h4 className="responsive-head">Qr Bar Code Print</h4>
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
            {/* Choose product */}
            <div className="bg-white p-4 rounded">
              <h4 className="responsive-head">Choose Product</h4>
              <form onSubmit={handleSubmit(addProductQrBarHandler)}>
                {/* Product Code and Name  */}
                <div>
                  <QrBarProductSearchModal
                    productHandler={productHandler}
                    productName={productName}
                    productCode={productCode}
                    register={register}
                    errors={errors}
                  />
                </div>

                {/* Quantity and Vat  */}
                <div className="form-row">
                  <div className="form-group col-md-2">
                    <label htmlFor="Quantity">Quantity</label>
                  </div>

                  <div className="form-group col-md-4">
                    <input
                      type="text"
                      className={`form-control ${errors.quantity && "invalid"}`}
                      id="Quantity"
                      {...register("quantity", {
                        required: "Quantity is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Only numbers are allowed",
                        },
                        min: {
                          value: 1,
                          message: "Please select minimum 1 quantiy",
                        },
                      })}
                      onKeyUp={() => trigger("quantity")}
                      placeholder="Ex. 100"
                    />
                    {errors.quantity && (
                      <span className="text-danger">
                        {errors.quantity.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group col-md-1 ml-auto">
                    <label htmlFor="Vat">Vat</label>
                  </div>

                  <div className="form-group col-md-4">
                    <input
                      type="text"
                      className={`form-control ${errors.vat && "invalid"}`}
                      id="Vat"
                      {...register("vat", {
                        required: "Vat is required",
                        pattern: {
                          value: /^\d*\.?\d*$/,
                          message: "Only numbers are allowed",
                        },
                      })}
                      onKeyUp={() => trigger("vat")}
                      placeholder="Ex. 10%"
                    />
                    {errors.vat && (
                      <span className="text-danger">{errors.vat.message}</span>
                    )}
                  </div>
                </div>

                {/* radio button  */}
                <div className="form-row">
                  <div class="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      {...register("qrbar", {
                        required: "Qr code or bar code is required",
                      })}
                      id="qr_code"
                      value="Qr Code"
                    />
                    <label className="form-check-label" htmlFor="qr_code">
                      Qr Code
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      {...register("qrbar", {
                        required: "Qr code or bar code is required",
                      })}
                      id="bar_code"
                      value="Bar Code"
                    />
                    <label className="form-check-label" htmlFor="bar_code">
                      Bar Code
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      {...register("qrbar", {
                        required: "Qr code or bar code is required",
                      })}
                      id="both"
                      value="Both"
                    />
                    <label className="form-check-label" htmlFor="both">
                      Both
                    </label>
                  </div>
                  <div className="mt-3">
                    {errors.qrbar && (
                      <span className="text-danger">
                        {errors.qrbar.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* add button  */}
                <div className="form-row">
                  <button type="submit" className="btn btn-primary">
                    + Add
                  </button>
                </div>
              </form>
            </div>

            {/* show selected product  */}
            <div className="my-5 bg-white p-4 rounded">
              <h4>Selected Product</h4>
              <div className="row pt-2">
                <div className="col-md-12 ">
                  <div
                    className="tableContainer table-responsive"
                    style={{ height: "300px" }}
                  >
                    <table className="table">
                      <thead
                        style={{ position: "sticky", top: 0 }}
                        className="thead-dark"
                      >
                        <tr style={{ height: "5px", fontSize: "12px" }}>
                          <th className="header" scope="col">
                            Code
                          </th>
                          <th className="header" scope="col">
                            Name
                          </th>
                          <th className="header" scope="col">
                            Quantity
                          </th>
                          <th className="header" scope="col">
                            Status
                          </th>
                          <th className="header" scope="col">
                            Vat(%)
                          </th>
                          <th className="header" scope="col">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProductList.map((item) => (
                          <tr>
                            {" "}
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.qrbar}</td>
                            <td>{item.vat}</td>
                            <td>
                              <i
                                class="fa fa-trash"
                                aria-hidden="true"
                                onClick={() =>
                                  deleteSelectedProductHandler(
                                    item.id,
                                    item.qrbar,
                                    item.vat
                                  )
                                }
                              ></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white px-4 py-1 rounded">
              <Button
                // variant="secondary"
                onClick={closeHandler}
                className="mr-3 my-3 closebtn"
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="my-3"
                onClick={() => setQrBarCodePrintModal(true)}
              >
                Next
              </Button>
            </div>
          </div>
        </Modal.Body>
      </div>

      <QrBarCodePrintModal
        show={qrBarCodePrintModal}
        onHide={() => setQrBarCodePrintModal(false)}
        selectedProductList={selectedProductList}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </Modal>
  );
};

export default QrBarCodeModal;
