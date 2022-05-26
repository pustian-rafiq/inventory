import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { updateDamageHandler } from "../../../redux/actions/damagedProduct";
import moment from "moment";

const EditPurchaseOrder = ({ show, onHide, damageProduct, select }) => {
  const { register, handleSubmit, reset } = useForm();

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // console.log("damageProduct ::", damageProduct && damageProduct.product_name);

  // Authorization header
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // update handler
  const damageProductUpdate = (data) => {
    dispatch(
      updateDamageHandler(
        data,
        headers,
        damageProduct && damageProduct.id,
        onHide
      )
    );
    toast.success("Update Process is Going On",{
      icon: ({theme, type}) =>  <img height={'27px'} alt=""
      src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"/>
    });
  };

  // for reseting the modal form
  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [damageProduct]);
  // This handler hide this modal and send select state to the parent component
  const closeHandler = () => {
    onHide();
    select()
  }
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
    >
      <div  className="background_and_table_header" >
      <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
          <div>
            <h4
             className="responsive-head"
            >
              Edit Damage Product
            </h4>
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
        <Modal.Body  className="background_and_table_header" >
          <div className="custom_modal_inner_content">
            <form
              className="form-horizontal"
              onSubmit={handleSubmit(damageProductUpdate)}
            >
              <div className="container border border-light mb-2  py-3">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <span className="spanTitle">Product</span>
                      </div>
                      <div className="col-md-6">
                        <label className="form-control">
                          {damageProduct && damageProduct.product_name}
                        </label>
                        <input
                          type="hidden"
                          className="form-control"
                          {...register("productID")}
                          defaultValue={damageProduct && damageProduct.productID}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <span className="spanTitle">Entry Date</span>
                      </div>
                      <div className="col-md-6">
                        <label className="form-control">
                          {damageProduct &&
                            moment(damageProduct.entry_date).format("Do MMM YY")}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <span className="spanTitle">Modified Date</span>
                      </div>
                      <div className="col-md-6">
                        <label className="form-control">
                          {damageProduct &&
                            moment(damageProduct.modified_date).format(
                              "Do MMM YY"
                            )}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <span className="spanTitle">Unit Price</span>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="number"
                          className="form-control"
                          {...register("unit_price")}
                          defaultValue={damageProduct && damageProduct.unit_price}
                        />
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <span className="spanTitle">Quantity</span>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="number"
                          className="form-control"
                          {...register("quantity")}
                          defaultValue={damageProduct && damageProduct.quantity}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <span className="spanTitle">Total Price</span>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="number"
                          className="form-control"
                          {...register("total_price")}
                          defaultValue={
                            damageProduct && damageProduct.total_price
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right responsive-btn">
                    <Button className="saveCloseBtn border border-none closebtn" onClick={closeHandler}>
                      Close
                    </Button>
                    <Button type="submit" className="saveCloseBtn border border-none updatebtn">
                      Update 
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EditPurchaseOrder;
