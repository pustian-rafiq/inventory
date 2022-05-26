/* eslint-disable eqeqeq */
import React, { Fragment, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { addBankData } from "../../../redux/actions/bankActions";
import { toast } from "react-toastify";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AddBank = (props) => {
  const initialState = {
    code: "",
    bank_name: "",
    account_no: "",
    account_name: "",
    branch_name: "",
    opening_balance: "0",
    total_amount: "0",
  };
  const [bankData, setBankData] = useState(initialState);

  const isEnabled =
    bankData.code.length > 0 &&
    bankData.bank_name.length &&
    bankData.account_name.length > 0 &&
    bankData.account_no.length > 0 &&
    bankData.opening_balance.length > 0 &&
    bankData.total_amount.length > 0;
    const dispatch = useDispatch();

  //Get bank data from database
  const { banks } = useSelector((state) => state.banks);
  const bnkCode = banks.find((b) => b.code === bankData.code);
  const bnkName = banks.find((b) => b.bank_name === bankData.bank_name);

  // Input change handler
  const handleChange = (e) => {
    const bank_code = e.target.value;
    const bank_name = e.target.value.toLowerCase();
    const bnkCode = banks.find((b) => b.code === bank_code);
    const bnkName = banks.find((b) => b.bank_name.toLowerCase() === bank_name);

    if(bnkCode && bnkCode.code === bank_code){
      toast.warn("This bank code already exists!")
    }
    if(bnkName && bnkName.bank_name.toLowerCase() === bank_name.toLowerCase()){
      toast.warn("This bank name already exists!")
    }

    const formName = e.target.name;
    const formValue = e.target.value;
    setBankData({ ...bankData, [formName]: formValue });
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (bnkCode && bnkCode.code == bankData.code) {
      toast.warn("This bank code already exists!");
    } else if (bnkName && bnkName.bank_name.toLowerCase() == bankData.bank_name.toLowerCase()) {
      toast.warn("This bank name already exists!");
    } else {
      dispatch(addBankData(bankData, headers, props.onHide));
      toast.warn("New bank is adding...");
      setBankData(initialState);
    }
  };

  return (
    <Fragment>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
        backdrop="static"
        keyboard="false"
        dialogAs={DraggableModal}
      >
        <div>
          <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">
            <div>
              <h4 className="responsive-head" >Add New Bank</h4>
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

              <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className="container productBox">
                  <div className="row">
                    <div className="col-md-12 ">
                      <div className="row  mb-2 ">
                        <div className="col-md-12 col-lg-4">
                          <span className="response-category" htmlFor="code">
                            Code
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8">
                          <input
                            type="text "
                            placeholder="Enter Code"
                            className="form-control productInput"
                            id="code"
                            name="code"
                            onChange={handleChange}
                            value={bankData.code}
                            required
                          />
                        </div>
                      </div>
                      <div className="row  mb-2">
                        <div className="col-md-12 col-lg-4">
                          <span className="response-category" htmlFor="code">
                            Bank
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8 ">
                          <input
                            type="text"
                            placeholder="Enter bank name"
                            className="form-control productInput"
                            name="bank_name"
                            onChange={handleChange}
                            value={bankData.bank_name}
                            required
                          />
                        </div>
                      </div>
                      <div className="row  mb-2">
                        <div className="col-md-12 col-lg-4">
                          <span className="response-category" htmlFor="code">
                            Branch
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8 ">
                          <input
                            type="text"
                            placeholder="Enter branch name"
                            className="form-control productInput"
                            name="branch_name"
                            onChange={handleChange}
                            value={bankData.branch_name}
                            required
                          />
                        </div>
                      </div>
                      <div className="row  mb-2">
                        <div className="col-md-12 col-lg-4">
                          <span className="response-category" htmlFor="code">
                            Account Name
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8 ">
                          <input
                            type="text"
                            placeholder="Enter account name"
                            className="form-control productInput"
                            name="account_name"
                            onChange={handleChange}
                            value={bankData.account_name}
                            required
                          />
                        </div>
                      </div>

                      <div className="row  mb-2">
                        <div className="col-md-12 col-lg-4">
                          <span className="response-category" htmlFor="accountno">
                            Account No.
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8 ">
                          <input
                            id="accountno"
                            placeholder="Enter account no"
                            type="text"
                            className="form-control productInput"
                            name="account_no"
                            onChange={handleChange}
                            value={bankData.account_no}
                            required
                          />
                        </div>
                      </div>

                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-4 ">
                          <span className="response-category" htmlFor="modelName">
                            Opening Amt.
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8  ">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            id="modelName"
                            name="opening_balance"
                            onChange={handleChange}
                            value={bankData.opening_balance}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-4 ">
                          <span className="response-category" htmlFor="totalammount">
                            Total Amt.
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8 ">
                          <input
                            id="totalammount"
                            type="number"
                            className="form-control productInput input-sm"
                            name="total_amount"
                            readOnly
                            value={bankData.opening_balance}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="btnContainer companyBox">
                  <div className="row">
                    <div className="col-md-12 pull-right responsive-btn">
                      {/* close button  */}
                      <Button className="saveCloseBtn closebtn border  closebtn"
                        onClick={props.onHide}
                      >
                        Close
                      </Button>

                      {/* update button  */}
                      <Button type="submit"
                        className="saveCloseBtn 
                  border 
                  border-none">
                        Save
                      </Button>
                    </div>
                  </div>
                </div>



              </form>
              {/* Company Add Form End Here */}
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </Fragment>
  );
}

export default AddBank;
