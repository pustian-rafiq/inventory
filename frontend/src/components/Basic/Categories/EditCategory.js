import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCategory } from "../../../redux/actions/categoryAction";
import { useForm } from "react-hook-form";

function EditCategory({ show, onHide, category,select }) {
  const { register, handleSubmit, reset } = useForm();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const updateCategoryHandler = (data) => {
    console.log("update category ::: ", data);
    dispatch(updateCategory(data, headers, category && category.id, onHide));
    toast.success("Update Process is Going On",{
      icon: ({theme, type}) =>  <img height={'27px'} 
      src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"/>
    });
  };

  // for reseting the modal form
  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  // This handler hide this modal and send select state to the parent component
  const closeHandler = () => {
    onHide();
    select()
  }
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
    >
  
        {/* modal header  */}
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">
          <div  >
            <h4 className="responsive-head">Edit Category Detalis</h4>
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
          <div className="custom_modal_inner_content">
          {/* update product  */}
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(updateCategoryHandler)}
          >
            <div className="container CategoryBox py-2 my-2 border border-light">
              <div className="row">
                <div className="col-md-12">
                  <div className="row  mb-2">
                    <div className="col-md-12">
                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-md-4 responsive-lh ">
                              <label
                                className="label Title"
                                htmlFor="category_code"
                              >
                                Category Code
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control "
                                id="modelName"
                                name="category_code"
                                placeholder="Enter the Category Code"
                                {...register("code")}
                                defaultValue={category && category.code}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-md-4 responsive-lh">
                              <label
                                className="label Title"
                                htmlFor="category_name"
                              >
                                Category Name
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control "
                                id="category_name"
                                placeholder="Enter the Category Name"
                                {...register("name")}
                                defaultValue={category && category.name}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* modal body footer  */}
            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 pull-right responsive-btn">
                  {/* close button  */}
                  <Button className="saveCloseBtn closebtn border  closebtn"
                   onClick={closeHandler}
                   >
                    Close
                  </Button>

                  {/* update button  */}
                  <Button type="submit" 
                  className="saveCloseBtn 
                  updatebtn 
                  border 
                  border-none">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </form>
          </div>
        </Modal.Body>
     
    </Modal>
  );
}

export default EditCategory;
