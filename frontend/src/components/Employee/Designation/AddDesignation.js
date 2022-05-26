import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addDesignation,
} from "../../../redux/actions/designationActions";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AddDesignation = (props) => {
  const initialState = {
    code: "",
    description: "",
  };
  const [designation, setDesignation] = useState(initialState);
  const [error, setError] = useState("");

  /*
   * ---This handler works on category form input field
   * ---Code validation --- code must be unique
   */
  const changeHandler = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setDesignation({ ...designation, [fieldName]: fieldValue });

    //Code validation start here
    const desigcode = e.target.value;
    const employeeCode = designations.filter((search) => {
      return search.code.toLowerCase().includes(desigcode.toLowerCase());
    });
    // eslint-disable-next-line array-callback-return
    employeeCode.map((data) => {
      if (data.code === desigcode) {
        setError({ ...error, code: "This designation code already exist!" });
        return toast.success("Designation code must be unique");
      } else {
        setError("");
      }
    });
  };

  //Check whether designation code is exist or not
  const { designations } = useSelector((state) => state.designations);

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      designation.code.length === "" ||
      designation.description.length === ""
    ) {
      toast.success("Please fill all the fields!");
    } else {
      dispatch(addDesignation(designation, headers));
      toast.success("Designation is adding...");
      props.onHide(true);
    }
  };
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
        <Modal.Header
          style={{ cursor: "move", padding: "6px" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head" >Add Designation</h4>
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
          <div className="custom_modal_inner_content">
            <form className="form-horizontal" onSubmit={submitHandler}>
              <div className="container productBox p-3 mb-2">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-5">
                        <span className="spanTitle" htmlFor="code">
                          Code
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-7 input-group input-group-sm">
                        <input
                          type="text"
                          placeholder="Enter Code"
                          className="form-control productInput w-100"
                          id="code"
                          name="code"
                          onChange={changeHandler}
                          value={designation.code}
                          required
                        />
                        <span className="text-danger ">
                          {error && error.code}
                        </span>
                      </div>
                    </div>

                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-5">
                        <span className="spanTitle" htmlFor="code">
                          New Designation
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-7 input-group input-group-sm">
                        <input
                          type="text"
                          placeholder="Enter new designation"
                          className="form-control productInput"
                          name="description"
                          onChange={changeHandler}
                          value={designation.description}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right responsive-btn">
                    <Button className="saveCloseBtn closebtn border border-0" onClick={props.onHide}>
                      Close
                    </Button>
                    <Button type="submit" className="saveCloseBtn border border-0">
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
};

export default AddDesignation;
