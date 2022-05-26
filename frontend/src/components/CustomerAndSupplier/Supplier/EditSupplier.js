import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { updateSupplier } from "../../../redux/actions/supplierActions";

function EditSupplier({ show, onHide, supplier,select }) {
  const [imagePreview, setImagePreview] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // eslint-disable-next-line no-unused-vars
  const imagePreviewHandler = (e) => {
    setImagePreview(e.target.files[0]);
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const updateSupplierHandler = (data) => {
    // let formData = new FormData();
    let newData = { ...data };
    dispatch(updateSupplier(data, headers, supplier?.id, onHide, newData));
    toast.success("Update Process is Going On",{
      icon: ({theme, type}) =>  <img height={'27px'} 
      src="https://i.ibb.co/Z8XDqgS/Reload-1-4s-51px-1.gif"/>
    });
  };

  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplier]);
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
      // dialogAs={DraggableModalDialog}
    >
      <div className="background_and_table_header" >
      <Modal.Header style={{cursor: "move",padding:'6px'}} className="background_and_table_header" >
          <div>
            <h4 className="py-2 responsive-head">Edit Supplier Details</h4>
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
         
         <div className="custom_modal_inner_content p-4">
          {/* Company Add Form Start Here */}
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(updateSupplierHandler)}
          >
            <div className="container border border-light mb-2">
              <div className="row">
                <div className="col-sm-12 col-lg-8">
                  <div className="row  ">
                    <div className="col-md-12 col-lg-4">
                      <label className="spanTitle" htmlFor="code">
                        Supplier Code
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8">
                      <input
                        type="text"
                        placeholder="Enter supllier code"
                        className="form-control w-100"
                        id="code"
                        name="code"
                        defaultValue={supplier?.code}
                        {...register("code")}
                      />
                    </div>
                  </div>
                  <div className="row  ">
                    <div className="col-md-12 col-lg-4">
                      <label className="spanTitle" htmlFor="supplier_name">
                        Supplier Name
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        placeholder="Enter suplier name"
                        className="form-control "
                        id="name"
                        name="name"
                        defaultValue={supplier?.name}
                        {...register("name")}
                      />
                    </div>
                  </div>
                  <div className="row  ">
                    <div className="col-md-12 col-lg-4">
                      <label className="spanTitle" htmlFor="contactPerson">
                        Contact Person
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        placeholder="Contact Person name"
                        className="form-control "
                        id="contactPerson"
                        name="contact_person"
                        defaultValue={supplier?.contact_person}
                        {...register("contact_person")}
                      />
                    </div>
                  </div>
                  <div className="row  ">
                    <div className="col-md-12 col-lg-4">
                      <label className="spanTitle" htmlFor="contact_number">
                        Contact No
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        placeholder="01xxxxx"
                        className="form-control "
                        id="contact_number"
                        name="contact_no"
                        defaultValue={supplier?.contact_no}
                        {...register("contact_no")}
                      />
                    </div>
                  </div>

                  <div className="row  ">
                    <div className="col-md-12 col-lg-4">
                      <label className="spanTitle" htmlFor="address_no">
                        Address
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <textarea
                        placeholder="Enter address"
                        className="form-control "
                        id="address_no"
                        name="address"
                        defaultValue={supplier?.address}
                        {...register("address")}
                      />
                    </div>
                  </div>

                  <div className="row  ">
                    <div className="col-md-12 col-lg-4">
                      <label className="spanTitle" htmlFor="openingDue">
                        Openning Due
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 mt-2">
                      <input
                        type="text"
                        readOnly
                        defaultValue={supplier?.opening_due}
                        className="form-control "
                        id="openingDue"
                        name="opening_due"
                        {...register("opening_due")}
                      />
                    </div>
                  </div>
                  <div className="row  ">
                    <div className="col-md-12 col-lg-4">
                      <label className="spanTitle" htmlFor="TotalDue">
                        Total Due
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        readOnly
                        className="form-control "
                        id="ToalDue"
                        name="total_due"
                        defaultValue={supplier?.total_due}
                        {...register("total_due")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-lg-3 imageContainer employeeImage" >
                  <div className="row ">
                    {/* preview image  */}
                    <div className="col-md-12 col-lg-12 imageBox">
                      <p>
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={
                            imagePreview == null
                              ? `${supplier && supplier.photo_path}`
                              : URL.createObjectURL(imagePreview)
                          }
                          alt="product "
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

            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 pull-right responsive-btn">
                  <Button className="saveCloseBtn border border-0 closebtn mr-3" onClick={closeHandler}>
                    Close
                  </Button>
                  <Button type="submit" className="saveCloseBtn border border-0 updatebtn">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </form>
          </div>
          {/* Company Add Form End Here */}
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default EditSupplier;

/************************main api from postman details*******************************/

// "id": 1,
// "code": "000005",
// "name": "samsadf",
// "contact_person": "asdfasd",
// "contact_no": "6543",
// "address": "asfdsad",
// "photo_path": "http://myshop3.localhost:8000/media/supplier/Screenshot_from_2021-10-07_01-39-55.png",
// "total_due": 0.0,
// "opening_due": 0.0,
// "create_date": "2021-12-26T17:00:47.052854+06:00"

// required field is here from the edit supplier
// {
//   "contact_person": [
//       "This field is required."
//   ],
//   "photo_path": [
//       "The submitted data was not a file. Check the encoding type on the form."
//   ]
// }
