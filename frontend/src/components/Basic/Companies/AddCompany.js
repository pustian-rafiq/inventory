import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCompanyData } from "../../../redux/actions/companyActions";
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

const AddCompany = (props) => {
  const initialState = {
    code: "",
    name: "",
  };
  const [company, setCompany] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // Fetch Category data from api
  const { companyLists } = useSelector((state) => state.companies);
  /*
   * ---This handler works on category form input field
   * ---Code validation --- code must be unique
   */
  const handleChange = (e) => {
    const companyCode = e.target.value;
    const code = companyLists.find(
      (b) => b.code === companyCode
    );
    if (code && code.code === companyCode) {
      toast.warn("This company code already exists!");
    }

    const formName = e.target.name;
    const formValue = e.target.value;
    setCompany({ ...company, [formName]: formValue });

  };
  //Pass headers for authorized user accessing
  const { user: currentUser } = useSelector((state) => state.auth);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!company.code) {
      errors.code = "Please fill the code";
    }
    if (!company.name) {
      errors.name = "Please fill the name";
    }
    let Error = Object.keys(errors).length > 0;

if(!Error){
  dispatch(addCompanyData(company, headers));
  toast.success("Company is adding...");
  setCompany(initialState);
  props.onHide();
};

}

   

  useEffect(() => {
    setErrors({});
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
        <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
          <div>
            <h4
              className="responsive-head"
              style={{
                // textShadow: "2px 3px 4px grey",
              }}
            >
              Add Company
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
        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content">
          {/* Company Add Form Start Here */}
          <form onSubmit={submitHandler}>
            <div className="container companyBox">
              <div className="row ">
                <div className="col-4">
                  <label htmlFor="companyCode">Code</label>
                </div>
                <div className="col-8 input-group input-group-sm">
                  <input
                    type="text"
                    id="companyCode"
                    name="code"
                    className="form-control productInput "
                    onChange={handleChange}
                    value={company.code}
                    placeholder="Company code.."
                    //required
                    data-title="My site"
                   // title="This field should not be left blank."
                  />
                  <span className="text-danger ">
                    {errors ? errors.code : ""}
                  </span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <label htmlFor="comapnayName">Company Name</label>
                </div>
                <div className="col-8 input-group input-group-sm">
                  <input
                    type="text"
                    id="comapnayName"
                    className="form-control productInput"
                    name="name"
                    onChange={handleChange}
                    value={company.name}
                    placeholder="Company name.."
                    //required
                  />
                     <span className="text-danger ">
                    {errors ? errors.name : "yyyuyu"}
                  </span>
                </div>
              </div>
            </div>
            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 pull-right responsive-btn">
                  <Button
                    className="saveCloseBtn closebtn border border-none"
                    onClick={props.onHide}
                  >
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
};

export default AddCompany;
