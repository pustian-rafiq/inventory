import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateDesignation } from "../../../redux/actions/designationActions";
import { useForm } from "react-hook-form";

const EditDesignation = ({ show, onHide, designation, select }) => {
  const { register, handleSubmit, reset } = useForm();

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const updateDesignationHandler = (data) => {
    dispatch(
      updateDesignation(data, headers, designation && designation.id, onHide)
    );
    toast.success("Update Process is Going On",{
      icon: ({theme, type}) =>  <img height={'27px'} 
      src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"/>
    });
  };

  // for reseting the modal form
  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designation]);
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
      <div className="background_and_table_header">
        {/* modal header  */}
        <Modal.Header style={{cursor: "move",padding:'6px' }} className="background_and_table_header" >
          <div>
            <h4 className="responsive-head">
              Edit Designation
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
        <Modal.Body className="background_and_table_header">

        <div className="custom_modal_inner_content">
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(updateDesignationHandler)}>
            <div className="container companyBox py-2 my-2">
              <div className="row">
                <div className="col-md-12">
                  <div className="row  mb-2">
                    <div className="col-md-12">
                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-md-4" >
                              <label
                                className="responsive-desc"
                                htmlFor="designation_code"
                              >
                                Code
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control "
                                id="designation_code"
                                placeholder="Ex. 1452"
                                {...register("code")}
                                defaultValue={designation && designation.code}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-md-4">
                              <label
                                className="responsive-desc"
                                htmlFor="designation_desc"
                              >
                                Designation
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control "
                                placeholder="Ex. Teacher/Engineer"
                                {...register("description")}
                                defaultValue={
                                  designation && designation.description
                                }
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
                  <Button className="saveCloseBtn closebtn mr-2 border border-none" onClick={closeHandler}>
                    Close
                  </Button>

                  {/* update button  */}
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

export default EditDesignation;
