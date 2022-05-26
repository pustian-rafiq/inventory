import React, { useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import BankSearch from "./AddBank/BankSearch";
import CustomerSearch from "./AddCustomer/CustomerSearch";
import SupplierSearch from "./AddSupplier/SupplierSearch";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import {
  addBankTransactionData,
} from "../../../redux/actions/bankTransactionActions ";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[25, 25]}
        scale={1}
      >
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AddBankTransaction = (props) => {
  const initialState = {
    transaction_date: "",
    transaction_no: "",
    transaction_type: "",
    bankID: "",
    another_bankID: "",
    supplier: "",
    customer: "",
    amount: "0",
    check_no: "0",
    remarks: "0",
  };

  const date = moment(new Date()).format("YYYY-MM-DD");
  const [bankData, setBankData] = useState(initialState);
  const [bankFromId, setBankFromId] = useState("");
  const [bankFromName, setBankFromName] = useState("");
  const [bankFromBranch, setBankFromBranch] = useState("");
  const [bankToId, setBankToId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [tranDate, setTranDate] = useState(date);
  const [tranNo, setTranNo] = useState("");
  const [tranType, setTranType] = useState("");
  const [amount, setAmount] = useState("");
  const [checkNo, setCheckNo] = useState("");
  const [remarks, setRemarks] = useState("");
  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const formName = e.target.name;
    const formValue = e.target.value;
    setBankData({ ...bankData, [formName]: formValue });
  };
  const bankFromIdHandler = (bankID, name, branch_name) => {
    setBankFromId(bankID);
    setBankFromName(name);
    setBankFromBranch(branch_name);
  };
  const bankToIdHandler = (bankID) => {
    setBankToId(bankID);
  };
  const supplierIdHandler = (supplierID) => {
    setSupplierId(supplierID);
  };
  const customerIdHandler = (customerID) => {
    setCustomerId(customerID);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("transaction_date", moment(tranDate).format("YYYY-MM-DD"));
    formData.append("transaction_no", tranNo);
    formData.append("transaction_type", tranType);
    formData.append("bankID", bankFromId);
    formData.append("bank_name", bankFromName);
    formData.append("branch_name", bankFromBranch);
    formData.append("another_bankID", bankToId);
    formData.append("customer", customerId);
    formData.append("supplier", supplierId);
    formData.append("check_no", checkNo);
    formData.append("amount", amount);
    formData.append("remarks", remarks);

    if (!tranType) {
      toast.warn("Please select transaction type!");
    } else if (!bankFromId) {
      toast.warn("Please select your bank!");
    } else if (!bankToId) {
      toast.warn("Please select your destination bank!");
    } else if (!checkNo) {
      toast.warn("Please select check no!");
    } else if (!amount) {
      toast.warn("Please select transaction amount!");
    } else {
      dispatch(addBankTransactionData(formData, headers, props.onHide));
      toast.success("Bank transaction data is adding...");
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
      show={props.show}
      dialogAs={DraggableModal}
      // dialogClassName="purchase-retun-modal"
    >
      <div>
        <Modal.Header
          style={{ cursor: "move", padding: "6px" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head">Add Bank Transectiom </h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={props.onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content p-4">
            {/* Company Add Form Start Here */}
            <form onSubmit={handleSubmit}>
              <div className="container companyBox">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row mb-1">
                      <div className="col-md-6">
                        <div className="row ">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="category">
                              Entry Date
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <input
                              type="date"
                              className="form-control productInput input-sm"
                              id="modelName"
                              value={tranDate}
                              onChange={(e) => setTranDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className=" col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="category">
                              Tran. No
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              id="modelName"
                              placeholder="Enter receipt no ex: R-100"
                              value={tranNo}
                              onChange={(e) => setTranNo(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row  mb-1">
                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="category">
                              Tran. Type
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <select
                              className="form-control productInput input-sm"
                              value={tranType}
                              name="blood_group"
                              onChange={(e) => setTranType(e.target.value)}
                            >
                              <option value="">Select transaction type</option>
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
                            <span className="spanTitle" htmlFor="category">
                              Check No
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              id="modelName"
                              placeholder="Enter check no"
                              value={checkNo}
                              onChange={(e) => setCheckNo(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-1">
                      <div className="col-sm-12 col-md-12 col-lg-2">
                        <div className="input-group input-group-sm">
                          <span className="spanTitle">Bank From</span>
                        </div>
                      </div>
                      <BankSearch bankId={bankFromIdHandler} />
                    </div>
                    <div className="row mb-1">
                      <CustomerSearch customerId={customerIdHandler} />
                    </div>
                    <div className="row mb-1">
                      <SupplierSearch supplierId={supplierIdHandler} />
                    </div>
                    <div className="row mb-1">
                      <div className="col-sm-12 col-md-12 col-lg-2">
                        <div className="input-group input-group-sm">
                          <span className="spanTitle">Bank To</span>
                        </div>
                      </div>
                      <BankSearch bankId={bankToIdHandler} />
                    </div>
                    
                    <div className="row  mb-1">
                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="category">
                              Amount
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              id="modelName"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-4">
                            <span className="spanTitle" htmlFor="category">
                              Remarks
                            </span>
                          </div>
                          <div className="col-sm-11 col-md-12 col-lg-8  input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control productInput input-sm"
                              id="modelName"
                              placeholder="Enter remarks"
                              value={remarks}
                              onChange={(e) => setRemarks(e.target.value)}
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
                      onClick={props.onHide}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="saveCloseBtn border border-0"
                    >
                      Save
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

export default AddBankTransaction;
