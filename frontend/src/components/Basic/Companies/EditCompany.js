import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCompany } from "../../../redux/actions/companyActions";
import { useForm } from "react-hook-form";

function EditCompany({ show, onHide, company,select }) {
  const { register, handleSubmit, reset } = useForm();

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const updateCompanyHandler = (data) => {
    dispatch(updateCompany(data, headers, company && company.id, onHide));
    toast.success("Update Process is Going On",{
      icon: ({theme, type}) =>  <img height={'27px'} 
      src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"/>
    });
  };

  // for reseting the modal form
  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);
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
      // onExit={reset()}
      keyboard="false"
    >
        {/* modal header  */}
        <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
          <div>
            <h4
            className="responsive-head" 
            style={{
                textShadow: "2px 3px 4px grey",
              }}
            >
              Edit Company Detalis
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
      
        <Modal.Body className="background_and_table_header" > 
          <div className="custom_modal_inner_content">
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(updateCompanyHandler)}
          >
            <div className="container companyBox py-2 my-2">
              <div className="row">
                <div className="col-md-12">
                  <div className="row  mb-2">
                    <div className="col-md-12">
                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row responsive-lh">
                            <div className="col-sm-12 col-md-4 ">
                              <label className="" htmlFor="code">
                                Company Code
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control "
                                id="code"
                                placeholder="Enter the Company Code"
                                {...register("code")}
                                defaultValue={company?.code}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  mb-2 " >
                        <div className="col-md-12">
                          <div className="row ">
                            <div className="col-sm-12 col-md-4">
                              <span className="response-category" htmlFor="name">
                                Company Name
                              </span>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control "
                                id="name"
                                placeholder="Enter the Company Name"
                                {...register("name")}
                                defaultValue={company?.name}
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

export default EditCompany;
