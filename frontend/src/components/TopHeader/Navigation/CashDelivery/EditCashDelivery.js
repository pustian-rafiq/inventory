/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  getCashDelivery,
  updateCashDelivery,
} from "../../../../redux/actions/cashDelivery";
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

const EditCashDelivery = ({ show, onHide, cashDelivery, select }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  //   get redux auth state
  const { user: currentUser } = useSelector((state) => state.auth);

  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // console.log(cashDelivery.amount);

  // update cash handler
  const updateCashDeliveryHandler = (data) => {
    dispatch(
      updateCashDelivery(data, headers, cashDelivery && cashDelivery.id, onHide)
    );
    toast.success("Update Process is Going On",{
      icon: ({theme, type}) =>  <img height={'27px'} 
      src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"/>
    });

  };

  useEffect(() => {
    dispatch(getCashDelivery(headers));
  }, []);

  // for reseting the modal form
  useEffect(() => {
    reset({});
  }, [cashDelivery]);
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
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">
          <div>
            <h4 className="responsive-head">Edit Cash Delivery</h4>
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
            onSubmit={handleSubmit(updateCashDeliveryHandler)}
            // encType="multipart/form-data"
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
                          <label>Entry Date</label>
                        </div>
                        <div className="col-md-8">
                          <label className="form-control" label>
                            {moment(cashDelivery?.entry_date).format("L")}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-4">
                          <label>Receipt No</label>
                        </div>

                        <div className="col-md-8">
                          <input
                            type="text"
                            defaultValue={cashDelivery?.receipt_no}
                            placeholder="receipt no"
                            {...register("receipt_no")}
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
                          <label>Supplier</label>
                        </div>

                        <div className="col-md-8">
                          <input
                            type="text"
                            defaultValue={cashDelivery?.supplier_name}
                            placeholder="Supplier Name.."
                            {...register("supplier_name")}
                            className="form-control"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-4">
                          <label>Code</label>
                        </div>

                        <div className="col-md-8">
                          <input
                            type="text"
                            defaultValue={cashDelivery?.supplier_code}
                            placeholder="Ex 12345"
                            {...register("supplier_code")}
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
                        <label>Bank Name</label>
                      </div>

                      <div className="col-md-8">
                        <select
                          className="form-control"
                          defaultValue={cashDelivery?.bank_name}
                          {...register("bank_name")}
                        >
                          <option>Abs Bank</option>
                          <option>Sonali Bank</option>
                          <option>Rupali Bank</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label>Branch Name</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          defaultValue={cashDelivery?.branch_name}
                          placeholder="brance "
                          {...register("branch_name")}
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
                        <label>Account No</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          defaultValue={cashDelivery?.account_no}
                          placeholder="account_number"
                          {...register("account_no")}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label>Mobile Bank</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          defaultValue={cashDelivery?.mba_account_no}
                          placeholder="01xxxxxxxxx"
                          {...register("mba_account_no")}
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
                        <label>Check No</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          defaultValue={cashDelivery?.check_no}
                          placeholder="Check Number"
                          {...register("check_no")}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label>Payment Type</label>
                      </div>

                      <div className="col-md-8">
                        <select
                          defaultValue={cashDelivery?.payment_type}
                          className="form-control"
                          {...register("payment_type", { required: true })}
                        >
                          <option
                            value={cashDelivery && cashDelivery.payment_type}
                          >
                            {cashDelivery && cashDelivery.payment_type}
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
                        <label>Check Issu Date</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="date"
                          defaultValue={moment(cashDelivery?.issue_date).format(
                            "L"
                          )}
                          placeholder="issue date"
                          {...register("issue_date")}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label>BKash No</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="number"
                          defaultValue={cashDelivery?.bkash}
                          placeholder="Enter Bcash number"
                          {...register("bkash")}
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
                <h4 className="shadow p-3 mb-5 rounded">Amount Information</h4>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label>Amount</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          defaultValue={cashDelivery?.amount}
                          placeholder="Customer Name.."
                          {...register("amount")}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label>Total Due</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          defaultValue={cashDelivery?.total_due}
                          placeholder="Ex 12345"
                          {...register("total_due")}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label>Adjustment</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          defaultValue={cashDelivery?.adjust_amount}
                          placeholder="12345"
                          {...register("adjust_amount")}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label>Due Amount</label>
                      </div>

                      <div className="col-md-8">
                        <input
                          type="text"
                          defaultValue={cashDelivery?.balance_due}
                          placeholder="due balance"
                          {...register("balance_due")}
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
    
    </Modal>
  );
};

export default EditCashDelivery;
