import React, { useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCustomer } from "../../../redux/actions/customerActions";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
const AddCustomer = (props) => {
  const [imagePreview, setImagePreview] = useState({ file: null });
  // Declare field state for customer form
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [customertType, setCustomerType] = useState("Retail");
  const [nid, setNid] = useState("");
  const [openningDue, setOpenningDue] = useState(0);
  const [totalDue, setTotalDue] = useState(0);
  const [photoPath, setPhotoPath] = useState("");
  const [refName, setRefName] = useState("");
  const [refContact, setRefContact] = useState("");
  const [refFatherName, setRefFatherName] = useState("");
  const [refAddress, setRefAddress] = useState("");

  //Create form data object and append all field value into its object
  const formData = new FormData();

  formData.append("code", code);
  formData.append("name", name);
  formData.append("contact_no", contactNo);
  formData.append("address", address);
  formData.append("father_name", fatherName);
  formData.append("customer_type", customertType);
  formData.append("nid", nid);
  formData.append("opening_due", openningDue);
  formData.append("total_due", totalDue);
  formData.append("photo_path", photoPath);
  formData.append("ref_name", refName);
  formData.append("ref_father_name", refFatherName);
  formData.append("ref_contact", refContact);
  formData.append("ref_address", refAddress);

  const handleChange = (event) => {
    setPhotoPath(event.target.files[0]);

    setImagePreview({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  //const [customer, setCustomer] = useState(initialState);
  const customers = useSelector((state) => state.customers);
  const cusCode = customers.find((b) => b.code === code);

  const { user: currentUser } = useSelector((state) => state.auth);
  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const codeHandler = (e) => {
    setCode(e.target.value);
    const code = e.target.value;
    const customerCode = customers.find((b) => b.code === code);
    //console.log(typeof(code1))
    if (customerCode && customerCode.code == code) {
      toast.warn("Customer with this code already exists");
    }
  };
  const openningDueHandler = (e) => {
    setOpenningDue(e.target.value);
    const total_due = e.target.value;
    setTotalDue(total_due);
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    //Check validation
    // eslint-disable-next-line eqeqeq
    if (cusCode && cusCode.code == code) {
      toast.warn("Customer with this code already exists");
    } else if (
      !code ||
      !name ||
      !contactNo 
    ) {
      toast.error("Field must not be empty!");
    } else {
      dispatch(addCustomer(formData, headers));
      toast.success("Customer is adding...");
      setPhotoPath("");
      setOpenningDue(0)
      setTotalDue(0)
      props.onHide();
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
      <div>
        <Modal.Header
          style={{ cursor: "move", padding: "6px" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head"> Add Customer</h4>
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

            <form className="form-horizontal" onSubmit={submitHandler}>
              <h4 className="responsive-head mb-3">Customer Information</h4>
              <div className="container productBox">
                <div className="row">
                  <div className="col-md-12 col-lg-8">
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" htmlFor="code">
                          Code
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          className="form-control "
                          id="code"
                          placeholder="Enter account"
                          name="code"
                          onChange={codeHandler}
                        />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 ">
                        <span className="spanTitle" htmlFor="text">
                          Customer Name
                        </span>
                      </div>

                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          className="form-control "
                          id="code"
                          placeholder="Enter name"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 ">
                        <span className="spanTitle" htmlFor="modelName">
                          Mobile Number
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8  ">
                        <input
                          type="text"
                          className="form-control  input-sm"
                          id="modelName"
                          placeholder="Enter mobile number"
                          name="contact_no"
                          onChange={(e) => setContactNo(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 ">
                        <span className="spanTitle" htmlFor="warningQty">
                          Address
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          className="form-control  input-sm"
                          id="warningQty"
                          placeholder="Enter address"
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 ">
                        <span className="spanTitle" htmlFor="warningQty">
                          Father Name
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          className="form-control  input-sm"
                          id="warningQty"
                          placeholder="Enter father name"
                          name="father_name"
                          onChange={(e) => setFatherName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 ">
                        <span className="spanTitle" htmlFor="text">
                          Customer Type
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8  ">
                        <select
                          className="form-control input-sm "
                          name="customer_type"
                          value={customertType}
                          onChange={(e) => setCustomerType(e.target.value)}
                        >
                          <option value="Retail">Retail</option>
                          <option value="Dealer">Dealer</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 ">
                        <span className="spanTitle" htmlFor="warningQty">
                          NID Number
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          className="form-control  input-sm"
                          id="warningQty"
                          placeholder="Enter NID No"
                          name="nid"
                          onChange={(e) => setNid(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 ">
                        <span className="spanTitle" htmlFor="warningQty">
                          Openning Due
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="number"
                          value={openningDue}
                          className="form-control  input-sm"
                          id="warningQty"
                          name="openning_due"
                          onChange={openningDueHandler}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 ">
                        <span className="spanTitle" htmlFor="warningQty">
                          Total Due
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="number"
                          value={totalDue}
                          className="form-control  input-sm"
                          id="warningQty"
                          name="total_due"
                          readOnly
                          //onChange={(e) => setTotalDue(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4 imageContainer">
                    <div className="row ">
                      <div className="col-md-12 col-lg-12 imageBox">
                        <p>
                          {imagePreview.file ? (
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src={imagePreview.file}
                              alt=""
                            />
                          ) : (
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/Customer-7.gif"
                              alt=""
                            />
                          )}
                        </p>
                      </div>
                      <div className="col-md-12 col-lg-12 fileBrowse">
                        <input
                          type="file"
                          hidden
                          id="file"
                          onChange={handleChange}
                        />
                        <label htmlFor="file" className="">
                          Browse
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Reference /> */}
              <h4 className="responsive-head my-3">Reference Information</h4>
              <div className="container productBox">
                <div className="row ">
                  <div className="col-md-12 col-lg-6">
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-5 ">
                        <span className="spanTitle" htmlFor="warningQty">
                          Ref. Name
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-7 ">
                        <input
                          type="text"
                          className="form-control   "
                          id="warningQty"
                          placeholder="Enter reference name"
                          name="ref_name"
                          onChange={(e) => setRefName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-6">
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 ">
                        <span className="spanTitle" htmlFor="warningQty">
                          Contact
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          className="form-control  input-sm"
                          id="warningQty"
                          placeholder="Enter contact"
                          name="ref_contact"
                          onChange={(e) => setRefContact(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-5 ">
                        <span className="spanTitle" htmlFor="warningQty">
                          Father Name
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-7 ">
                        <input
                          type="text"
                          className="form-control  input-sm"
                          id="warningQty"
                          placeholder="Enter father name"
                          name="ref_father_name"
                          onChange={(e) => setRefFatherName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-12 col-lg-10">
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-3 ">
                        <span className="spanTitle" htmlFor="warningQty">
                          Address
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-9 ">
                        <textarea
                          type="text"
                          className="form-control  input-sm"
                          style={{
                            border: "1px solid none",
                            padding: "10px",
                            resize: "both",
                            overflow: "auto",
                          }}
                          id="warningQty"
                          placeholder="Enter address"
                          name="ref_address"
                          onChange={(e) => setRefAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="companyBox py-2 mt-2">
                <div className="row">
                  <div className="col-md-12 pull-right responsive-btn">
                    <Button
                      className="saveCloseBtn border border-none closebtn mr-2"
                      onClick={props.onHide}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="saveCloseBtn border border-none"
                    >
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

export default AddCustomer;
