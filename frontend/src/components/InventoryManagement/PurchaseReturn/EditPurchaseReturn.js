/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import moment from "moment";
import { updatePurchaseReturn } from "../../../redux/actions/purchaseReturnActions";
class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const EditPurchaseReturn = ({ show, onHide, singlePurchaseReturn,select }) => {
  const { register, handleSubmit, reset } = useForm();

  const [currentCredit, setCurrentCredit] = useState(null);

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);

  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const backAmountHandler = (e) => {
    let grandTotal = singlePurchaseReturn && singlePurchaseReturn.grand_total;
    let backAmount = e.target.value;

    if (backAmount < grandTotal) {
      let curCredit = grandTotal - backAmount;
      setCurrentCredit(curCredit);
    } else {
      setCurrentCredit(0);
    }
  };

  // purchase return update handler
  const updatePurchaseReturnHandler = (data) => {
    data.curr_credit =
      currentCredit == null
        ? singlePurchaseReturn && singlePurchaseReturn.curr_credit
        : currentCredit;

    data.return_details = [];

    dispatch(
      updatePurchaseReturn(
        data,
        headers,
        singlePurchaseReturn && singlePurchaseReturn.id,
        onHide
      )
    );
    toast.warning("Purchase return is updating");
  };

  useEffect(() => {
    reset({});
    setCurrentCredit(null);
  }, [singlePurchaseReturn]);

  useEffect(() => {
    reset({});
  }, [singlePurchaseReturn && singlePurchaseReturn.curr_credit]);
  
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
      // dialogClassName="add-purchase-return-modal"
    >
      <div>
      <Modal.Header style={{cursor: "move",padding:'6px'}} className="background_and_table_header" >
          <div>
            <h4 className="responsive-head">Edit Purchase Return</h4>
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
          <div className="form-horizontal">
            <form onSubmit={handleSubmit(updatePurchaseReturnHandler)}>
              <div className="container productBox">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <h4 className="modalHeadTitle">Customer</h4>
                    <div className="row supplierBox">
                      <div className="col-md-12">
                        <div className="row mt-2">
                          <div className="col-md-12 col-lg-12">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-4 input-group input-group-sm">
                                    <span className="spanTitle">Invoice</span>
                                  </div>
                                  <div className="col-md-8 input-group input-group-sm">
                                    <input
                                      type="text"
                                      className="form-control productInput input-sm"
                                      defaultValue={
                                        singlePurchaseReturn &&
                                        singlePurchaseReturn.invoice_no
                                      }
                                      placeholder="invoice no"
                                      {...register("invoice_no")}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-4 input-group input-group-sm">
                                    <span className="spanTitle">
                                      Return Date
                                    </span>
                                  </div>
                                  <div className="col-md-8 input-group input-group-sm">
                                    <input
                                      type="text"
                                      className="form-control productInput input-sm"
                                      defaultValue={
                                        singlePurchaseReturn &&
                                        moment(
                                          singlePurchaseReturn.return_date
                                        ).format("Do MMM YY")
                                      }
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-2 mb-2">
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-4 input-group input-group-sm">
                                <span className="spanTitle">Supplier Code</span>
                              </div>
                              <div className="col-md-8 input-group input-group-sm">
                                <input
                                  type="number"
                                  className="form-control productInput input-sm"
                                  defaultValue={
                                    singlePurchaseReturn &&
                                    singlePurchaseReturn.supplier
                                  }
                                  {...register("supplier")}
                                  placeholder="supplier"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-4 input-group input-group-sm">
                                <span className="spanTitle">Supplier Name</span>
                              </div>
                              <div className="col-md-8 input-group input-group-sm">
                                <input
                                  type="text"
                                  className="form-control productInput input-sm"
                                  defaultValue={
                                    singlePurchaseReturn &&
                                    singlePurchaseReturn.suppliers_name
                                  }
                                  placeholder="supplier name"
                                  {...register("suppliers_name")}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="col-md-12 col-lg-8 supplierBox">
                    <div
                      className="tableContainer table-responsive"
                      style={{ height: "170px" }}
                    >
                      <table className="table">
                        <thead
                          style={{ position: "sticky", top: 0 }}
                          className="thead-dark"
                        >
                          <tr style={{ height: "5px", fontSize: "12px" }}>
                            <th className="header" scope="col">
                              SN
                            </th>
                            <th className="header" scope="col">
                              Model
                            </th>
                            <th className="header" scope="col">
                              Company
                            </th>
                            <th className="header" scope="col">
                              Category
                            </th>
                            <th className="header" scope="col">
                              Qty
                            </th>
                            <th className="header" scope="col">
                              U.Price
                            </th>
                            <th className="header" scope="col">
                              Total
                            </th>
                            <th className="header" scope="col">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4 supplierBox pt-3">
                    <div className="row mb-2">
                      <div className="col-md-4 col-lg-5 input-group input-group-sm">
                        <span className="spanTitle" htmlFor="grand_total">
                          Net Total
                        </span>
                      </div>
                      <div className="col-md-8 col-lg-7 input-group input-group-sm">
                        <input
                          type="number"
                          className="form-control productInput input-sm"
                          id="grand_total"
                          defaultValue={
                            singlePurchaseReturn &&
                            singlePurchaseReturn.grand_total
                          }
                          {...register("grand_total")}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-4 col-lg-5 input-group input-group-sm">
                        <span className="spanTitle" htmlFor="paid_amount">
                          Back Amount
                        </span>
                      </div>
                      <div className="col-md-8 col-lg-7 input-group input-group-sm">
                        <input
                          type="number"
                          required
                          className="form-control productInput input-sm"
                          id="paid_amount"
                          defaultValue={
                            singlePurchaseReturn &&
                            singlePurchaseReturn.paid_amount
                          }
                          {...register("paid_amount")}
                          onChange={backAmountHandler}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-4 col-lg-5 input-group input-group-sm">
                        <span className="spanTitle" htmlFor="curr_credit">
                          Curr. Credit
                        </span>
                      </div>
                      <div className="col-md-8 col-lg-7 input-group input-group-sm">
                        <input
                          type="number"
                          className="form-control productInput input-sm"
                          id="curr_credit"
                          value={
                            currentCredit === null
                              ? singlePurchaseReturn &&
                              singlePurchaseReturn.curr_credit
                              : currentCredit
                          }
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right responsive-btn">
                    <Button className="saveCloseBtn border border-none closebtn mr-2" onClick={closeHandler}>
                      Close
                    </Button>
                    <Button type="submit" className="saveCloseBtn border border-none updatebtn">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          </div>
          {/* Company Add Form End Here */}
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EditPurchaseReturn;
