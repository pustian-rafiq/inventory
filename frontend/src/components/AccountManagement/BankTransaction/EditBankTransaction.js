import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import BankSearch from "./AddBank/BankSearch";
import CustomerSearch from "./AddCustomer/CustomerSearch";
import SupplierSearch from "./AddSupplier/SupplierSearch";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateBankTransactionData } from "../../../redux/actions/bankTransactionActions ";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const EditBankTransaction = ({
  show,
  onHide,
  select,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [bankName, setBankName] = useState("");
  const { register, handleSubmit, reset } = useForm(); 

  const { banks } = useSelector((state) => state.banks);
  const { bankTranDetails } = useSelector((state) => state.banktransactions);
  const customers = useSelector((state) => state.customers);
  const supplierLists = useSelector((state) => state.suppliers);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const bankHandler = (e) => {
    console.log(e.target.value);
    let b_id = e.target.value;
    const bank = banks.find((item) => item.id == b_id);
    console.log("selected bank ", bank);
    setBankName(bank.bank_name);
    setBankBranch(bank.branch_name);
  };

  const customerNameHandler = (e) => {
    let id = e.target.value;
    const singleCustomer = customers.find((c) => c.id == id);
    setCustomerName(singleCustomer.name);
  };

  const supplierNameHandler = (e) => {
    let s_id = e.target.value;
    const singleSupplier = supplierLists.find((s) => s.id == s_id);
    setSupplierName(singleSupplier.name);
  };

  // Map bank name
  const fromBank = banks.map((data) => {
    return (
      <option key={data.id} value={data.id}>
        {data.bank_name}
      </option>
    );
  });

  const toBank = banks.map((data) => {
    return (
      <option key={data.id} value={data.id}>
        {data.bank_name}
      </option>
    );
  });

  const updateBankTransactionHandler = (data) => {
    data.another_bankID = data.another_bankID;
    data.bank_name = bankName == "" ? bankTranDetails.bank_name : bankName;
    data.brance_name =
      bankBranch == "" ? bankTranDetails.brance_name : bankBranch;

    dispatch(
      updateBankTransactionData(
        data,
        headers,
        bankTranDetails && bankTranDetails.id,
        onHide
      )
    );
    toast.warn("Bank transaction data is updating...");
  };

  const closeHandler = () => {
    onHide();
    select();
  };

  useEffect(() => {
    reset({});
    setBankBranch("");
    setBankName("");
    setCustomerName("");
    setSupplierName("");
  }, [bankTranDetails]);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
      show={show}
      dialogAs={DraggableModal}
      // dialogClassName="purchase-retun-modal"
    >
      <div>
        <Modal.Header
          style={{ cursor: "move", padding: "6px" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head">Edit Bank Transectiom </h4>
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
            <form onSubmit={handleSubmit(updateBankTransactionHandler)}>
              <div className="container companyBox">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row mb-1">
                      <div className="col-md-6">
                        <div className="row ">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span
                              className="spanTitle"
                              htmlFor="transaction_date"
                            >
                              Entry Date
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <input
                              type="date"
                              className="form-control productInput input-sm"
                              id="transaction_date"
                              defaultValue={
                                bankTranDetails &&
                                bankTranDetails.transaction_date
                              }
                              {...register("transaction_date")}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span
                              className="spanTitle"
                              htmlFor="transaction_no"
                            >
                              Tran. No
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              id="transaction_no"
                              placeholder="Enter receipt no ex: R-100"
                              defaultValue={
                                bankTranDetails &&
                                bankTranDetails.transaction_no
                              }
                              {...register("transaction_no")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row  mb-1">
                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span
                              className="spanTitle"
                              htmlFor="transaction_type"
                            >
                              Tran. Type
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <select
                              className="form-control productInput input-sm"
                              {...register("transaction_type")}
                              defaultValue={
                                bankTranDetails &&
                                bankTranDetails.transaction_type
                              }
                            >
                              <option
                                value={
                                  bankTranDetails &&
                                  bankTranDetails.transaction_type
                                }
                              >
                                {bankTranDetails &&
                                  bankTranDetails.transaction_type == 1 &&
                                  "Deposite"}
                                {bankTranDetails &&
                                  bankTranDetails.transaction_type == 2 &&
                                  "Withdraw"}
                                {bankTranDetails &&
                                  bankTranDetails.transaction_type == 3 &&
                                  "Transfer"}
                              </option>
                              <option value="1">Deposite</option>
                              <option value="2">Withdraw</option>
                              <option value="3">Transfer</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="bank_name">
                              Bank From
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <select
                              className="form-control input-group input-group-sm productInput"
                              defaultValue={
                                bankTranDetails && bankTranDetails.bankID
                              }
                              {...register("bankID")}
                              onChange={(e) => {
                                bankHandler(e);
                              }}
                            >
                              <option
                                value={
                                  bankTranDetails && bankTranDetails.bankID
                                }
                              >
                                {bankTranDetails && bankTranDetails.bank_name}
                              </option>
                              {fromBank}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* customer  */}
                    <div className="row mb-1">
                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="customer_code">
                              Customer Code
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <select
                              className="form-control productInput input-sm"
                              id="customer_code"
                              {...register("customer")}
                              defaultValue={
                                bankTranDetails && bankTranDetails.customer
                              }
                              onChange={(e) => customerNameHandler(e)}
                            >
                              <option
                                value={
                                  bankTranDetails && bankTranDetails.customer
                                }
                              >
                                {bankTranDetails &&
                                  bankTranDetails.customer_code}
                              </option>

                              {customers.map((customer) => (
                                <option value={customer.id}>
                                  {customer.code}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="customer_name">
                              Customer Name
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <label
                              className="form-control productInput input-sm"
                              id="customer_name"
                            >
                              {customerName === ""
                                ? bankTranDetails &&
                                  bankTranDetails.customer_name
                                : customerName}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* supplier  */}
                    <div className="row mb-1">
                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="supplier_code">
                              Supplier Code
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <select
                              className="form-control productInput input-sm"
                              id="supplier_code"
                              {...register("supplier")}
                              defaultValue={
                                bankTranDetails && bankTranDetails.supplier
                              }
                              onChange={(e) => supplierNameHandler(e)}
                            >
                              <option
                                value={
                                  bankTranDetails && bankTranDetails.supplier
                                }
                              >
                                {bankTranDetails &&
                                  bankTranDetails.supplier_code}
                              </option>

                              {supplierLists.map((supplier) => (
                                <option value={supplier.id}>
                                  {supplier.code}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="supplier_name">
                              Supplier Name
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <label
                              className="form-control productInput input-sm"
                              id="supplier_name"
                            >
                              {supplierName === ""
                                ? bankTranDetails &&
                                  bankTranDetails.supplier_name
                                : supplierName}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row  mb-1">
                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span
                              className="spanTitle"
                              htmlFor="another_bankID"
                            >
                              Bank To
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <select
                              className="form-control input-group input-group-sm productInput"
                              defaultValue={
                                bankTranDetails &&
                                bankTranDetails.another_bankID
                              }
                              {...register("another_bankID")}
                            >
                              <option
                                value={
                                  bankTranDetails &&
                                  bankTranDetails.another_bankID
                                }
                              >
                                {bankTranDetails &&
                                  bankTranDetails.another_bank_name}
                              </option>
                              {toBank}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="amount">
                              Amount
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              id="amount"
                              defaultValue={
                                bankTranDetails && bankTranDetails.amount
                              }
                              {...register("amount")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row  mb-1">
                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="check_no">
                              Check No
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              id="check_no"
                              placeholder="Enter check no"
                              defaultValue={
                                bankTranDetails && bankTranDetails.check_no
                              }
                              {...register("check_no")}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="remarks">
                              Remarks
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              id="remarks"
                              placeholder="Enter remarks"
                              {...register("remarks")}
                              defaultValue={
                                bankTranDetails && bankTranDetails.remarks
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right responsive-btn">
                    <Button
                      className="saveCloseBtn border border-0 closebtn"
                      onClick={closeHandler}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="saveCloseBtn border border-0 updatebtn"
                    >
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

export default EditBankTransaction;
