import React, { useEffect } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { updateExpense } from "../../../../redux/actions/expenseAction";
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

const EditExpense = ({ show, onHide, expense, select }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  //   get redux auth state
  const { user: currentUser } = useSelector((state) => state.auth);

  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // update expanse handler
  const updateFormHandler = (data) => {
    dispatch(updateExpense(data, headers, expense && expense.id, onHide));
    toast.warn("Expense is updating...", {
      icon: ({ theme, type }) => (
        <img
          height={"27px"}
          alt=""
          src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"
        />
      ),
    });
  };

  // for reseting the modal form
  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expense]);
  // This handler hide this modal and send select state to the parent component
  const closeHandler = () => {
    onHide();
    select();
  };
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
      <Modal.Header className="background_and_table_header">
        <div>
          <h4 className=" responsive-head">Edit Expense</h4>
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
            onSubmit={handleSubmit(updateFormHandler)}
            // encType="multipart/form-data"
          >
            <div className="container companyBox py-2 my-2">
              <div className="row">
                <div className="col-md-12">
                  <div className="row  mb-2">
                    <div className="col-md-12">
                      <div className="row mb-3">
                        <h5 className="shadow p-2 font-weight-bold text-center w-100 responsive-head">
                          Edit Expense Details
                        </h5>
                      </div>

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
                            name="voucher_no"
                            {...register("voucher_no")}
                            defaultValue={expense && expense.voucher_no}
                          />
                        </div>
                      </div>

                      <input
                        type="hidden"
                        className="form-control"
                        id="modelName"
                        name="expensrer"
                        {...register("expense_item_id")}
                        defaultValue={expense && expense.expense_item_id}
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
                              expense && expense.entry_date
                            ).format("L")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row  mb-2">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-sm-12 col-md-4">
                          <span className="spanTitle" htmlFor="category">Income Head</span>
                        </div>
                        <div className="col-sm-11 col-md-8 ">
                          <ExpenseHeadSearch expenseIncomeId={IncomeIdHandler} />
                        </div>
                      </div>
                    </div>
                     <IncomeHeadSearch ExpenseIncomeData={expenseIncomeData} /> */}

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
                            name="amount"
                            {...register("amount")}
                            defaultValue={expense && expense.amount}
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
                            name="purpose"
                            {...register("purpose")}
                            defaultValue={expense && expense.purpose}
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
                  {/* close button  */}
                  <Button
                    className="saveCloseBtn closebtn border border-none"
                    onClick={closeHandler}
                  >
                    Close
                  </Button>

                  {/* update button  */}
                  <Button
                    type="submit"
                    className="saveCloseBtn border border-none updatebtn"
                  >
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
};

export default EditExpense;
