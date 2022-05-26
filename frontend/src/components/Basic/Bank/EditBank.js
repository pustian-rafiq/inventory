import React, { useEffect } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateBank } from "../../../redux/actions/bankActions";
import { useForm } from "react-hook-form";
import Draggable from "react-draggable";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const EditBank = ({ show, onHide, bank, select }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  //const name = getValues('bank_name')

  const editBankHandler = (data) => {
    dispatch(updateBank(data, headers, bank && bank.id, onHide));
    toast.success("Update Process is Going On", {
      icon: ({ theme, type }) => (
        <img
          height={"27px"}
          src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"
        />
      ),
    });
  };

  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bank]);
  // This handler hide this modal and send select state to the parent component
  const closeHandler = () => {
    onHide();
    select();
  };
  return (
    <Modal
      // size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
      dialogClassName="edit-bank-modal"
    >
      {/* modal header  */}
      <Modal.Header
        style={{ cursor: "move" }}
        className="background_and_table_header"
      >
        <div>
          <h4 className="responsive-head" >Edit Bank Detalis</h4>
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
        <div className="custom_modal_inner_content p-4">
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(editBankHandler)}
          >
            <div className="container companyBox py-2 my-2">
              <div className="row">
                <div className="col-md-12">
                  <div className="row  mb-2">
                    <div className="col-md-12">
                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-md-4">
                              <label className="label Title" htmlFor="bankname">
                                Bank Name
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control productInput"
                                id="bankname"
                                placeholder="Enter Bank Name"
                                {...register("bank_name")}
                                defaultValue={bank && bank.bank_name}
                                required
                              />

                              {/* bank code  */}
                              <input
                                type="hidden"
                                className="form-control productInput"
                                id="bankname"
                                placeholder="code"
                                {...register("code")}
                                defaultValue={bank && bank.code}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-md-4">
                              <label className="label Title" htmlFor="acc_no">
                                Bank_Account_No
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control productInput"
                                id="acc_no"
                                placeholder="Bank Account No..."
                                {...register("account_no")}
                                defaultValue={bank && bank.account_no}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-md-4">
                              <label className="label Title" htmlFor="acc_name">
                                Account Name
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control productInput"
                                id="acc_name"
                                placeholder="Bank Account Name..."
                                {...register("account_name")}
                                defaultValue={bank && bank.account_name}
                                required
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
                                className="label Title"
                                htmlFor="brance_name"
                              >
                                Branch Name
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control productInput"
                                id="branch_name"
                                placeholder="Branch Name..."
                                {...register("branch_name")}
                                defaultValue={bank && bank.branch_name}
                                required
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
                                className="label Title"
                                htmlFor="opening_Balance"
                              >
                                Opening_Balance
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control productInput"
                                id="opening_Balance"
                                placeholder="125.3582"
                                {...register("opening_balance")}
                                defaultValue={bank && bank.opening_balance}
                  
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
                                className="label Title"
                                htmlFor="Total_amount"
                              >
                                Total Amount
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control productInput"
                                id="Total_amount"
                                placeholder="150.3582"
                                {...register("total_amount")}
                                defaultValue={bank && bank.total_amount}

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
};

export default EditBank;
