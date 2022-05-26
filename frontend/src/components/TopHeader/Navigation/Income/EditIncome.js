import React, { useEffect } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { updateIncome } from "../../../../redux/actions/incomeAction";
import moment from "moment";

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

const EditIncome = ({ show, onHide, income, select }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  //   get redux auth state
  const { user: currentUser } = useSelector((state) => state.auth);

  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };



  // update handler
  const updateFormHandler = (data) => {
    console.log("Income update Data: ", data);
    dispatch(updateIncome(data, headers, income && income.id, onHide));
    toast.warn("Income is updating...", {
      icon: ({ theme, type }) => <img height={'27px'}
        src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif" alt="" />
    });
  };

  // for reseting the modal form
  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income]);
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
  
        {/* modal header  */}
        <Modal.Header className="background_and_table_header" >
          <div >
            <h4 className="responsive-head">Edit Income</h4>
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
          {/* update product  */}
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(updateFormHandler)}
          >
            <div className="container companyBox py-2 my-2">
              <div className="row">
                <div className="col-md-12">
                  <div className="row  mb-2">
                    <div className="col-md-12">

                      <div className="row mb-2">
                        <div className="col-sm-12 col-md-4">
                          <span className="spanTitle" htmlFor="category">
                            Voucher No
                          </span>
                        </div>
                        <div className="col-sm-11 col-md-8 ">
                          <input
                            type="text"
                            className="form-control"
                            id="modelName"
                            placeholder="Enter voucher no"
                            {...register("voucher_no")}
                            defaultValue={income && income.voucher_no}
                          />
                        </div>
                      </div>

                      <input
                        type="hidden"
                        className="form-control"
                        id="modelName"
                        {...register("expense_item_id")}
                        defaultValue={income && income.expense_item_id}
                      />
                    </div>
                  </div>
                  <div className="row  mb-2">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-sm-12 col-md-4">
                          <span className="spanTitle" htmlFor="category">
                            Income Date
                          </span>
                        </div>
                        <div className="col-sm-11 col-md-8 ">
                          <input
                            type="date"
                            className="form-control"
                            id="modelName"
                            placeholder="Enter voucher no"
                            defaultValue={moment(
                              income && income.entry_date
                            ).format("L")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row  mb-2">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-sm-12 col-md-4">
                          <span className="spanTitle" htmlFor="category">
                            Amount
                          </span>
                        </div>
                        <div className="col-sm-11 col-md-8 ">
                          <input
                            type="text"
                            className="form-control "
                            id="modelName"
                            {...register("amount")}
                            defaultValue={income && income.amount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row  mb-2">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-sm-12 col-md-4">
                          <span className="spanTitle" htmlFor="category">
                            Purpose
                          </span>
                        </div>
                        <div className="col-sm-11 col-md-8 ">
                          <input
                            type="text"
                            className="form-control "
                            id="modelName"
                            placeholder="Enter your purpose"
                            {...register("purpose")}
                            defaultValue={income && income.purpose}
                          />
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
                    <Button
                      className="saveCloseBtn closebtn border border-0"
                      onClick={closeHandler}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="saveCloseBtn border border-0 updatebtn"
                    >
                      update
                    </Button>
                  </div>
                </div>
              </div>
          </form>
          </div>
        </Modal.Body>
      
    </Modal>
  );
};

export default EditIncome;
