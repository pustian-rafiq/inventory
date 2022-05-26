/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addSupplier,
  getSupplierLists,
} from "../../../redux/actions/supplierActions";

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AddSupplier = (props) => {
  // Declare field state for customer form
  const [Code, setCode] = useState("");
  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [openningDue, setOpenningDue] = useState(0);
  //const [totalDue, setTotalDue] = useState(0);
  const [photoPath, setPhotoPath] = useState("");

  const [error, setError] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);
  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const supplierLists = useSelector((state) => state.suppliers);
  const supCode = supplierLists.find((b) => b.code === Code);

  const dispatch = useDispatch();

  //Create form data object and append all field value into its object
  const formData = new FormData();
  formData.append("code", Code);
  formData.append("name", name);
  formData.append("contact_person", contactPerson);
  formData.append("contact_no", contactNo);
  formData.append("address", address);
  formData.append("opening_due", openningDue);
  formData.append("total_due", openningDue);
  formData.append("photo_path", photoPath);

  //Preview supplier image
  const [imagePreview, setImagePreview] = useState({ file: null });
  const handleChange = (event) => {
    setPhotoPath(event.target.files[0]);
    setImagePreview({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //Check validation
    if (supCode && supCode.code == Code) {
      toast.warn("Supplier with this code already exists");
    } else if (!Code || !name || !contactNo) {
      toast.error("Field must not be empty!");
    } else {
      dispatch(addSupplier(formData, headers));
      toast.success("Supplier is adding...");
      props.onHide();
    }
  };

  useEffect(() => {
    dispatch(getSupplierLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set error empty
  useEffect(() => {
    setError("");
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModalDialog}
    >
      <div className="background_and_table_header">
        <Modal.Header
          style={{ cursor: "move", padding: "6px" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="py-2 responsive-head"> Add Supplier Details</h4>
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
              <div className="container productBox mb-2">
                <div className="row ">
                  <div className="col-sm-12 col-lg-8">
                    <div className="row ">
                      <div className="col-md-12 col-lg-4">
                        <label className="spanTitle" htmlFor="code">
                          Supplier Code
                        </label>
                      </div>
                      <div className="col-md-12 col-lg-8">
                        <input
                          type="text"
                          placeholder="Enter supllier code"
                          className="form-control w-100"
                          id="code"
                          name="code"
                          onChange={(e) => setCode(e.target.value)}
                        />
                        {/* <label className="text-danger">{error}</label> */}
                      </div>
                    </div>
                    <div className="row  ">
                      <div className="col-md-12 col-lg-4">
                        <label className="spanTitle" htmlFor="s_name">
                          Supplier Name
                        </label>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          placeholder="Enter suplier name"
                          className="form-control "
                          id="s_name"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row  ">
                      <div className="col-md-12 col-lg-4">
                        <label className="spanTitle" htmlFor="c_person">
                          Contact Person
                        </label>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          placeholder="Enter contact person"
                          className="form-control "
                          id="c_person"
                          name="contact_person"
                          onChange={(e) => setContactPerson(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row  ">
                      <div className="col-md-12 col-lg-4">
                        <label className="spanTitle" htmlFor="contact_number">
                          Contact No
                        </label>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          placeholder="Enter contact number"
                          className="form-control "
                          id="contact_number"
                          name="contact-No"
                          onChange={(e) => setContactNo(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row  ">
                      <div className="col-md-12 col-lg-4">
                        <label className="spanTitle" htmlFor="adddress_number">
                          Address
                        </label>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <textarea
                          placeholder="Enter address"
                          className="form-control "
                          id="adddress_number"
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row  ">
                      <div className="col-md-12 col-lg-4">
                        <label className="spanTitle" htmlFor="openingDue">
                          Openning Due
                        </label>
                      </div>
                      <div className="col-md-12 col-lg-8 mt-2">
                        <input
                          type="text"
                          value={openningDue}
                          className="form-control "
                          id="openingDue"
                          name="opening_due"
                          onChange={(e) => setOpenningDue(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row  ">
                      <div className="col-md-12 col-lg-4">
                        <label className="spanTitle" htmlFor="totalDue">
                          Total Due
                        </label>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          className="form-control "
                          id="totalDue"
                          name="total_due"
                          value={openningDue}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-4 imageContainer employeeImage">
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
                              src="https://thehustle.co/wp-content/uploads/2018/03/xxx-9.gif"
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

export default AddSupplier;
