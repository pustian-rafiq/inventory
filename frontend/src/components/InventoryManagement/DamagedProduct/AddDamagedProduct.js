import React, { useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addDamagedProduct } from "../../../redux/actions/damagedProduct";
import AddProduct from "./ProductSearch/AddProduct";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

function AddDamagedProduct(props) {
  const [getDamagedId, setGetDamagedId] = useState("");
  const [getDamagedStock, setGetDamagedStock] = useState("");

  const [unitPrice, setUnitPrice] = useState(0);
  const [entryDate, setEntryDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  //Create form data object and append all field value into its object
  const formData = new FormData();

  formData.append("productID", getDamagedId);
  formData.append("entry_date", entryDate);
  formData.append("unit_price", unitPrice);
  formData.append("total_price", totalPrice);
  formData.append("quantity", quantity);

  //const [customer, setCustomer] = useState(initialState);

  const { user: currentUser } = useSelector((state) => state.auth);
  //const customers = useSelector((state) => state.customers);
  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(addDamagedProduct(formData, headers));
    toast.success("Damaged product added successfully");
  };

  const damagedProductIdHandler = (damagedId) => {
    setGetDamagedId(damagedId);
  };
  const damagedProductStockHandler = (damagedStock) => {
    setGetDamagedStock(damagedStock);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
      // dialogClassName="damage-product-modal"
    >
      <div  className="background_and_table_header" >
      <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
          <div>
            <h4 className="responsive-head">Add Damaged Product</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={props.onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body  className="background_and_table_header" >
          <div className="custom_modal_inner_content">
          {/* Company Add Form Start Here */}
          <form className="form-horizontal" onSubmit={submitHandler}>
            <div className="container border border-light mb-2  py-3">
              <div className="row ">
                <div className="col-md-12 col-lg-3">
                  <div className="">
                    <span className="spanTitle">Product</span>
                  </div>
                </div>
                <div className="col-md-12 col-lg-9">
                  <AddProduct
                    damagedProductId={damagedProductIdHandler}
                    damagedProductStock={damagedProductStockHandler}
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12 col-lg-5">
                      <div className="">
                        <span className="spanTitle mt-2 d-inline-block">
                          Total Stock
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-7  ">
                      <input
                        type="number"
                        className="form-control"
                        readOnly
                        value={getDamagedStock}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12 col-lg-5">
                      <div className="">
                        <span className="spanTitle mt-2 d-inline-block">
                          Unit Price
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-7">
                      <input
                        type="number"
                        min={0}
                        className="form-control"
                        value={unitPrice}
                        name="unit_price"
                        onChange={(e) => setUnitPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12 col-lg-5">
                      <div className="">
                        <span className="spanTitle mt-2 d-inline-block">
                          Entry Date
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-7 ">
                      <input
                        type="date"
                        className="form-control "
                        name="entry_date"
                        onChange={(e) => setEntryDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>


                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12 col-lg-5">
                      <div className="">
                        <span className="spanTitle mt-2 d-inline-block">
                          Total Price
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-7 ">
                      <input
                        type="number"
                        min={0}
                        className="form-control "
                        value={totalPrice}
                        name="total_price"
                        onChange={(e) => setTotalPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>


              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="">
                        <span className="spanTitle">Quantity</span>
                      </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-9">
                      <input
                        type="number"
                        min={0}
                        className="form-control "
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        name="quantity"
                        // style={{ marginLeft: "-27px", width: "107%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="companyBox mt-2 p-2">
              <div className="row">
                <div className="col-md-12 pull-right responsive-btn">
                  <Button className="saveCloseBtn closebtn border border-none mr-3" onClick={props.onHide}>
                    Close
                  </Button>
                  <Button type="submit" className="saveCloseBtn border border-none">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </form>
          </div>

          {/* damage Add Form End Here */}
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default AddDamagedProduct;
