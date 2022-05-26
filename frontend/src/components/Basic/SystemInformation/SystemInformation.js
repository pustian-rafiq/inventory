import React, { useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addSystemData } from "../../../redux/actions/systemInformationAction";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

function SystemInformation(props) {
  // const [customerPhotoPath, setCustomerPhotoPath] = useState("file")
  // const [supplierPhotoPath, setSupplierPhotoPath] = useState("file")
  // const [employeePhotoPath, setEmployeePhotoPath] = useState("file")
  // const [productPhotoPath, setProductPhotoPath] = useState("file")
  // const [userBasic, setUserBasic] = useState({});
  const initialState = {
    name: "",
    address: "",
    telephone_no: "",
    email_address: "",
    web_address: "",
    system_start_date: "",
    date: "",
  };

  const [systemInformation, setSystemInformation] = useState(initialState);
  const { user: currentUser } = useSelector((state) => state.auth);
  const systemData = useSelector((state) => state.systeminformation);

  const { name, address, phone, email, web_address, date } =
    systemData.activeUser;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setSystemInformation({ ...systemInformation, [fieldName]: fieldValue });
  };

  const submitHandler = (e) => {
    e.preventDefault();


    if (systemInformation.name === "" || systemInformation.address === "") {
      toast.warning("Field must not be empty!");
    } else {
      dispatch(addSystemData(systemInformation, headers));
      props.onHide();
      toast.success("System information added successfully!");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
  
        <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
          <div>
            <h4>System Information</h4>
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
          <form className="form-horizontal" onSubmit={submitHandler} id="mform">
            <h4
              className="modalHeadTitle mb-4 shadow p-3 text-center"
              style={{ paddingTop: "5px" }}
            >
              Company Information
            </h4>
            <div className="container productBox">
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="row  mb-2">
                    <div className="col-md-12 col-lg-4">
                      <span className="spanTitle" for="code">
                        Company Name
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        className="form-control "
                        id="code"
                        placeholder="Enter name"
                        defaultValue={name}
                        name="name"
                        onChange={changeHandler}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 ">
                      <span className="spanTitle" for="text">
                        Company Address
                      </span>
                    </div>

                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        placeholder="Enter address"
                        defaultValue={address}
                        name="address"
                        onChange={changeHandler}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 ">
                      <span className="spanTitle" for="modelName">
                        Telephone No
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-8  ">
                      <input
                        type="text"
                        className="form-control"
                        id="modelName"
                        placeholder="Enter telepone number Ex:+880...."
                        name="telephone_no"
                        defaultValue={phone}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 ">
                      <span className="spanTitle" for="warningQty">
                        Email Address
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="email"
                        className="form-control"
                        id="warningQty"
                        placeholder="Enter email address"
                        defaultValue={email}
                        name="email_address"
                        onChange={changeHandler}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-12 col-lg-4 ">
                      <span className="spanTitle" for="warningQty">
                        Web Address
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="text"
                        className="form-control"
                        id="warningQty"
                        placeholder="Enter web address"
                        defaultValue={web_address}
                        name="web_address"
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Reference /> */}
            <h4
              className="modalHeadTitle p-3 shadow mb-3 text-center"
              style={{ paddingTop: "4px" }}
            >
              System Information
            </h4>
            <div className="container productBox">
              <div className="row">
                <div className="col-md-12">
                  <div className="row ">
                    <div className="col-md-12 col-lg-4 ">
                      <span className="spanTitle " for="warningQty">
                        System Start Date
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-8 ">
                      <input
                        type="date"
                        className="form-control productInput input-sm"
                        id="warningQty"
                        name="system_start_date"
                        defaultValue={date}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 pull-right">
                  <Button className="saveCloseBtn border border-none closebtn" onClick={props.onHide}>
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
      
    </Modal>
  );
}

export default SystemInformation;

