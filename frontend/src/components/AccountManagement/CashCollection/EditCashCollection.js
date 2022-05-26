import React, { useEffect } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { updateCashCollection } from "../../../redux/actions/cashCollectionActions";
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

const EditCashCollection = ({ show, onHide, cashCollection, select }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  //   get redux auth state
  const { user: currentUser } = useSelector((state) => state.auth);
  const { banks } = useSelector((state) => state.banks);

  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // update handler
  const updateFormHandler = (data) => {
    dispatch(
      updateCashCollection(
        data,
        headers,
        cashCollection && cashCollection.id,
        onHide
      )
    );
    toast.success("Update Process is Going On",{
      icon: ({theme, type}) =>  <img height={'27px'} 
      src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"/>
    });
  };

  // for reseting the modal form
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashCollection]);
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
      <div style={{ background: "#e0d4fa" }}>
        {/* modal header  */}
        <Modal.Header style={{cursor: "move",padding:'6px'}} className="background_and_table_header" >
          <div>
            <h4 className="responsive-head">Edit Cash Collection</h4>
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
          {/* update product  */}
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(updateFormHandler)}
          >
            <div className="container productBox mt-3">
              <div className="row ">
                <div className="col-md-12 mt-2">
                  <h5 className="shadow p-3 mb-5 rounded responsive-head">Personal Details</h5>
                </div>

                <div className="col-md-12">
                  {/* entry date and recept no  */}

                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-4">
                          <label  className="spanTitle">Entry Date</label>
                        </div>

                        <div className="col-md-8">
                          <input
                            type="text"
                            placeholder="entry date"
                            {...register("entry_date")}
                            defaultValue={moment(
                              cashCollection && cashCollection.entry_date
                            ).format("YYYY-MM-DD")}
                            className="form-control"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-4">
                          <label  className="spanTitle">Receipt No</label>
                        </div>

                        <div className="col-md-8">
                          <input
                            type="text"
                            placeholder="receipt no"
                            {...register("receipt_no")}
                            defaultValue={
                              cashCollection && cashCollection.receipt_no
                            }
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Name and Code */}

                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-4">
                          <label  className="spanTitle">Customer</label>
                        </div>

                        <div className="col-md-8">
                          <input
                            type="text"
                            placeholder="Customer Name.."
                            {...register("customer_name")}
                            defaultValue={
                              cashCollection && cashCollection.customer_name
                            }
                            className="form-control"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-4">
                          <label  className="spanTitle">Code</label>
                        </div>

                        <div className="col-md-8">
                          <input
                            type="text"
                            placeholder="Ex 12345"
                            {...register("customer_code")}
                            defaultValue={
                              cashCollection && cashCollection.customer_code
                            }
                            className="form-control"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details  */}

            <div className="py-3 border border-light my-3">
              <div className="col-md-12">
                <h4 className="shadow p-3 mb-5 rounded responsive-head">Bank Information</h4>
              </div>

              <div className="col-md-12">
                {/* entry date and recept no  */}

                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">Bank Name</label>
                      </div>

                      <div className="col-md-8">
                        <select
                          className="form-control"
                          {...register("bank_name")}
                          defaultValue={
                            cashCollection && cashCollection.bank_name
                          }
                        >
                          <option
                            value={cashCollection && cashCollection.bank_name}
                          >
                            {cashCollection && cashCollection.bank_name}
                          </option>
                          {banks &&
                            banks.map((bank) => (
                              <option key={bank.id} value={bank.bank_name}>
                                {bank.bank_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">Branch Name</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          placeholder="brance "
                          {...register("branch_name")}
                          defaultValue={
                            cashCollection && cashCollection.branch_name
                          }
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Name and Code */}

                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">Account No</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          placeholder="acc_number"
                          {...register("account_no")}
                          defaultValue={
                            cashCollection && cashCollection.account_no
                          }
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">Mobile Bank</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          placeholder="12345"
                          {...register("mba_account_no")}
                          defaultValue={
                            cashCollection && cashCollection.mba_account_no
                          }
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">Check No</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          placeholder="Check Number"
                          {...register("check_no")}
                          defaultValue={
                            cashCollection && cashCollection.check_no
                          }
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">Payment Type</label>
                      </div>

                      <div className="col-md-8">
                        <select
                          className="form-control"
                          {...register("payment_type")}
                          defaultValue={
                            cashCollection && cashCollection.payment_type
                          }
                        >
                          <option
                            value={
                              cashCollection && cashCollection.payment_type
                            }
                          >
                            {cashCollection && cashCollection.payment_type}
                          </option>
                          <option value="Cash">Cash</option>
                          <option value="Due">Due</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">Check Issu Date</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="date"
                          placeholder="issue date"
                          {...register("issue_date")}
                          defaultValue={
                            cashCollection && cashCollection.issue_date
                          }
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">BKash No</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="number"
                          placeholder="Enter Bcash number"
                          {...register("bkash")}
                          defaultValue={cashCollection && cashCollection.bkash}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3 border border-light my-3">
              <div className="col-md-12">
                <h4 className="shadow p-3 mb-5 rounded responsive-head">Amount Information</h4>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">Amount</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          placeholder="Customer Name.."
                          {...register("amount")}
                          defaultValue={cashCollection && cashCollection.amount}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">Total Due</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          placeholder="Ex 12345"
                          {...register("total_due")}
                          defaultValue={
                            cashCollection && cashCollection.total_due
                          }
                          className="form-control"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">Adjustment</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          placeholder="12345"
                          {...register("adjust_amount")}
                          defaultValue={
                            cashCollection && cashCollection.adjust_amount
                          }
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label  className="spanTitle">Due Amount</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          placeholder="due balance"
                          {...register("balance_due")}
                          defaultValue={
                            cashCollection && cashCollection.balance_due
                          }
                          className="form-control"
                        />
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
                  <Button className="saveCloseBtn border border-none closebtn" onClick={closeHandler}>
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

export default EditCashCollection;
