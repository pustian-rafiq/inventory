import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addCategory,
  getCategories,
} from "../../../redux/actions/categoryAction";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AddCategory = (props) =>{
  const initialState = {
    code: "",
    name: "",
  };

  const [category, setCategory] = useState(initialState);
  const [error, setError] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const dispatch = useDispatch();

  /*
   * ---This handler works on category form input field
   * ---Code validation --- code must be unique
   */
  const changeHandler = (e) => {
    const categoryCode = e.target.value;
    const code = categories.find(
      (b) => b.code === categoryCode
    );
    if (code && code.code === categoryCode) {
      toast.warn("This category code already exists!");
    }
    const nameField = e.target.name;
    const valueField = e.target.value;
    setCategory({ ...category, [nameField]: valueField });
  };

  /*
   * ---When user submit add button, then it works properly
   * ---Check category--if category code aleady exists then show error
   */

  const submitHandler = (e) => {
    e.preventDefault();

    if (!category.code || !category.name) {
      toast.warn("Please fill code or category name");
    } else {
      dispatch(addCategory(category, headers));
      setCategory(initialState);
      toast.success("Category is adding");
      props.onHide();
    }
  };

  useEffect(() => {
    dispatch(getCategories(headers));
  }, []);

  useEffect(() => {
    setError("");
  }, []);

  return (
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
            <h4 
                className="responsive-head py-2" 
                style={{
                    // textShadow: "2px 3px 4px grey",
                  }}>Add Categories
            </h4>

          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={props.onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body  className="background_and_table_header">
          {/* Company Add Form Start Here */}
          <div className="custom_modal_inner_content">
            <form onSubmit={submitHandler}>
              <div className="container companyBox">
                <div className="row">
                  <div className="col-40">
                    <label htmlFor="categoryCode">Code</label>
                  </div>
                  <div className="col-60">
                    <input
                      type="text"
                      id="categoryCode"
                      name="code"
                      onChange={changeHandler}
                      value={category.code}
                      placeholder="Category code.."
                      className="form-control productInput"
                      required
                    />
                    <span className="text-danger ">{error && error.code}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-40">
                    <label htmlFor="categoryName">New Category</label>
                  </div>
                  <div className="col-60">
                    <input
                      type="text"
                      id="categoryName"
                      name="name"
                      onChange={changeHandler}
                      value={category.name}
                      placeholder="Category name.."
                      className="form-control productInput"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right responsive-btn">
                    <Button className="saveCloseBtn closebtn border border-none" onClick={props.onHide}>
                      Close
                    </Button>
                    <Button type="submit" className="saveCloseBtn border border-none">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* Company Add Form End Here */}
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default AddCategory;
