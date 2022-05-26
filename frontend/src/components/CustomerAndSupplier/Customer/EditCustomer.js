/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { updatecustomer } from "../../../redux/actions/customerActions";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const EditCustomer = ({ show, onHide, customer, select }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const updateCustomerHandler = (data) => {
    let formData = new FormData();
    let newData = { ...data };

    // if (selectedC_Name === "") {
    //   newData.description = customer && customer.designation;
    // } else {
    //   newData.description = selectedC_Name;
    // }

    for (let i in data) {
      if (i === "photo_path") {
        if (imagePreview != null) {
          formData.append(i, imagePreview, imagePreview.name);
        }
      } else {
        formData.append(i, data[i]);
      }
    }

    dispatch(
      updatecustomer(data, headers, customer && customer.id, onHide, newData)
    );
    toast.success("Update Process is Going On",{
      icon: ({theme, type}) =>  <img height={'27px'} 
      src="https://i.ibb.co/Z8XDqgS/Reload-1-4s-51px-1.gif"/>
    });
  };

  // for reseting the modal form
  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);
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
      dialogAs={DraggableModal}
    >
      <div>
      <Modal.Header style={{cursor: "move",padding:'6px'}} className="background_and_table_header" >
          <div>
            <h4 className="p-2 responsive-head">Edit Customer Details </h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={closeHandler}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="background_and_table_header">

         <div className="custom_modal_inner_content">
          {/* Company Add Form Start Here */}

          <form
            className="form-horizontal"
            onSubmit={handleSubmit(updateCustomerHandler)}
          >
            <h4 className=" responsive-head px-3 py-2">Customer Information</h4>
            <div className="container productBox">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="row  ">
                    <div className="col-md-12 col-lg-4">
                      <label className="labelTitle" htmlFor="code">
                        Code
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        placeholder="Enter account"
                        name="code"
                        {...register("code")}
                        defaultValue={customer && customer.code}
                      />
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-md-12 col-lg-4 ">
                      <label className="labelTitle" htmlFor="customerName">
                        Customer Name
                      </label>
                    </div>

                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        className="form-control"
                        id="customerName"
                        placeholder="Enter Customer name"
                        name="name"
                        {...register("name")}
                        defaultValue={customer && customer.name}
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12 col-lg-4 ">
                      <label className="labelTitle" htmlFor="modelName">
                        Mobile Number
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8  ">
                      <input
                        type="text"
                        className="form-control "
                        id="modelName"
                        // placeholder="Enter mobile number"
                        name="contact_no"
                        placeholder="01XXXXX"
                        {...register("contact_no")}
                        defaultValue={customer && customer?.contact_no}
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12 col-lg-4 ">
                      <label className="labelTitle" htmlFor="warningQty">
                        Address
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        className="form-control "
                        id="warningQty"
                        placeholder="Enter address"
                        name="address"
                        {...register("address")}
                        defaultValue={customer && customer?.address}
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12 col-lg-4 ">
                      <label className="labelTitle" htmlFor="warningQty">
                        Father Name
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        className="form-control "
                        id="warningQty"
                        placeholder="Enter father name"
                        name="father_name"
                        {...register("father_name")}
                        defaultValue={customer && customer?.father_name}
                      />
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-md-12 col-lg-4 ">
                      <label className="labelTitle" htmlFor="text">
                        Customer Type
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8  ">
                      <select
                        className="form-control input-sm productInput"
                        name="customer_type"
                        value="selecttt"
                        {...register("customer_type")}
                      >
                        <option value="Retail">Retail</option>
                        <option value="Dealer">Dealer</option>
                      </select>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-md-12 col-lg-4 ">
                      <label className="labelTitle" htmlFor="warningQty">
                        NID Number
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        className="form-control "
                        id="warningQty"
                        placeholder="Enter NID No"
                        name="nid"
                        {...register("nid")}
                        defaultValue={customer && customer?.nid}
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12 col-lg-4 ">
                      <label className="labelTitle" htmlFor="warningQty">
                        Openning Due
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="number"
                        // defaultValue="0.00"
                        placeholder="0.00"
                        className="form-control "
                        id="warningQty"
                        name="openning_due"
                        {...register("opening_due")}
                        defaultValue={customer && customer?.opening_due}
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12 col-lg-4 ">
                      <label className="labelTitle" htmlFor="warningQty">
                        Total Due
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="number"
                        // defaultValue="0.00"
                        className="form-control"
                        placeholder="0.00"
                        id="warningQty"
                        name="total_due"
                        {...register("total_due")}
                        defaultValue={customer && customer?.total_due}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-lg-3 imageContainer">
                  <div className="row ">
                    {/* preview image  */}
                    <div className="col-md-12 col-lg-12 imageBox">
                      <p>
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={
                            imagePreview == null
                              ? `${customer && customer.photo_path}`
                              : URL.createObjectURL(imagePreview)
                          }
                          alt="product"
                        />
                      </p>
                    </div>

                    {/* Browse Image  */}
                    <div className="col-md-12 col-lg-12 fileBrowse">
                      <input
                        type="file"
                        hidden
                        id="file"
                        // {...register("photo_path")}

                        // onChange={handleChange}
                      />
                      <label htmlFor="file" className="">
                        Browse
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <Reference /> */}
            <h4 className=" px-3 py-2 responsive-head">Reference Information</h4>
            <div className="container productBox mb-2">
              <div className="row ">
                <div className="col-md-12 col-lg-6">
                  <div className="row ">
                    <div className="col-md-12 col-lg-5 ">
                      <label className="labelTitle" htmlFor="refName">
                        Ref. Name
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-7 ">
                      <input
                        type="text"
                        className="form-control"
                        id="refName"
                        placeholder="Enter reference name"
                        name="ref_name"
                        {...register("ref_name")}
                        defaultValue={customer && customer?.ref_name}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-lg-6">
                  <div className="row ">
                    <div className="col-md-12 col-lg-4 ">
                      <label className="labelTitle" htmlFor="refContact">
                        Ref.Contact
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        className="form-control "
                        id="refContact"
                        placeholder="Reference contact info"
                        name="ref_contact"
                        {...register("ref_contact")}
                        defaultValue={customer && customer?.ref_contact}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div className="row ">
                    <div className="col-md-12 col-lg-5 ">
                      <label className="labelTitle" htmlFor="reffather">
                        Ref. Father Name
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-7 ">
                      <input
                        type="text"
                        className="form-control "
                        id="reffather"
                        placeholder="Reference father name"
                        name="ref_father_name"
                        {...register("ref_father_name")}
                        defaultValue={customer && customer?.ref_father_name}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-lg-6"></div>
              </div>

              <div className="row">
                <div className="col-md-12 col-lg-10">
                  <div className="row ">
                    <div className="col-md-12 col-lg-3 ">
                      <label className="labelTitle" htmlFor="refadd">
                        Address
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-9 ">
                      <textarea
                        type="text"
                        className="form-control "
                        style={{
                          border: "1px solid none",
                          padding: "10px",
                          resize: "both",
                          overflow: "auto",
                        }}
                        id="refadd"
                        placeholder="Enter address"
                        name="ref_address"
                        {...register("ref_address")}
                        defaultValue={customer && customer?.ref_address}
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

export default EditCustomer;
