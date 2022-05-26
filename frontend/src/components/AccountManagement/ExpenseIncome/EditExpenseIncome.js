import React, { useEffect } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateExpanseIncome } from "../../../redux/actions/expenseIncome";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const EditExpenseIncome = ({ show, onHide, singleExpenseIncome, select }) => {
  const { register, handleSubmit, reset } = useForm();

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //Pass headers for authorized user access

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // update handler
  const updateFormHandler = (data) => {
    data.id = singleExpenseIncome?.id;
    dispatch(
      updateExpanseIncome(data, headers, singleExpenseIncome?.id, onHide)
    );
    toast.success("Update Process is Going On", {
      icon: ({ theme, type }) => (
        <img
          height={"27px"}
          alt=""
          src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"
        />
      ),
    });
  };

  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleExpenseIncome]);

  // This handler deselects the data
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
      <div>
        <Modal.Header
          style={{ cursor: "move", padding: "6px" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head">Edit expenseIncome Head </h4>
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
            <div>
              {/* Company Add Form Start Here */}
              <form
                className="form-horizontal "
                onSubmit={handleSubmit(updateFormHandler)}
              >
                <div className="container border border-light p-2   mb-2">
                  <div className="row">
                    <div className="col-md-10 offset-md-1 ">
                      <div className="row ">
                        <div className="col-md-3 col-lg-3">
                          <label className="spanTitle" forHtml="code">
                            Code
                          </label>
                        </div>
                        <div className="col-md-9 col-lg-9">
                          <input
                            type="text"
                            placeholder="Enter Code"
                            className="form-control"
                            id="code"
                            name="code"
                            defaultValue={singleExpenseIncome?.code}
                            {...register("code")}
                            // defaultValue={employee && employee.code}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 col-lg-3">
                          <label className="spanTitle" forHtml="code">
                            Name
                          </label>
                        </div>
                        <div className="col-md-9 col-lg-9">
                          <input
                            type="text"
                            placeholder="Enter name"
                            className="form-control productInput"
                            name="description"
                            defaultValue={singleExpenseIncome?.description}
                            {...register("description")}
                          />
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-md-3 col-lg-3">
                          <label className="spanTitle" forHtml="code">
                            Status
                          </label>
                        </div>
                        <div className="col-md-9 col-lg-9 ">
                          <select
                            className="form-control"
                            name="status"
                            defaultValue={
                              singleExpenseIncome?.status === 1
                                ? "Income"
                                : "Expense"
                            }
                            //  onChange={changeHandler}
                            //  value={expenseIncome.status}
                            {...register("status")}
                          >
                            <option value={2}>Expense</option>
                            <option value={1}>Income</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="btnContainer companyBox">
                  <div className="row">
                    <div className="col-md-12 pull-right responsive-btn">
                      <Button
                        className="saveCloseBtn border-0 closebtn"
                        onClick={closeHandler}
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        className="saveCloseBtn border-0 updatebtn"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EditExpenseIncome;
