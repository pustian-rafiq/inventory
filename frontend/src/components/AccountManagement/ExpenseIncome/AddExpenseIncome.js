import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addExpenseIncomeData,
  getExpenseIncomeLists,
} from "../../../redux/actions/expenseIncome";
class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AddExpenseIncome = ({ show, onHide }) => {
  const initialState = {
    code: "",
    description: "",
    status: 2,
  };
  const [expenseIncome, setExpenseIncome] = useState(initialState);

  const changeHandler = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setExpenseIncome({ ...expenseIncome, [inputName]: inputValue });
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (expenseIncome.code === "" || expenseIncome.description === "") {
      toast.warn("Field must not be empty!");
    } else {
      console.log("expenseIncome  in submit handler :::::", expenseIncome);
      dispatch(addExpenseIncomeData(expenseIncome, headers, onHide));
      toast.success("Expense income data is adding...");
    }
  };

  useEffect(() => {
    dispatch(getExpenseIncomeLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      hide={onHide}
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
            <h4 className="responsive-head">Add expenseIncome Head</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content p-4">
            <div>
              {/* Company Add Form Start Here */}
              <form className="form-horizontal" onSubmit={submitHandler}>
                <div className="container border border-light p-2 mb-2">
                  <div className="row ">
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
                            value={expenseIncome.code}
                            onChange={changeHandler}
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
                            value={expenseIncome.description}
                            onChange={changeHandler}
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
                            onChange={changeHandler}
                            value={expenseIncome.status}
                          >
                            <option value="1">Income</option>
                            <option value="2">Expense</option>
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
                        onClick={onHide}
                      >
                        Close
                      </Button>
                      <Button type="submit" className="saveCloseBtn border-0">
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

export default AddExpenseIncome;
