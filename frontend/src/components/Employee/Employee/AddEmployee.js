/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addEmployee } from "../../../redux/actions/employeeAction";

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AddEmployee = (props) => {
  const [imagePreview, setImagePreview] = useState({ file: null });
  // Declare field state for employee form
  const [Code, setCode] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [joinDate, setJoinDate] = useState("");
  const [designation, setDesignation] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [grossSalary, setGrossSalary] = useState(0);
  const [photoPath, setPhotoPath] = useState("");

  //Fetch designation data to show dropdown menu
  const { designations } = useSelector((state) => state.designations);

  //Error handler
  const initialError = {
    code: "",
    email: "",
  };
  const [errors, setErrors] = useState(initialError);

  //Create form data object and append all field value into its object
  const formData = new FormData();

  const desig_name =
    designations && designations.find((d) => d.id == designation);

  formData.append("code", Code);
  formData.append("name", name);
  formData.append("fathers_name", fatherName);
  formData.append("mothers_name", motherName);
  formData.append("contact_no", contactNo);
  formData.append("email", emailId);
  formData.append("nid", nationalId);
  formData.append("blood_group", bloodGroup);
  formData.append("joining_date", joinDate);
  formData.append("designation_id", designation);
  formData.append("designation", desig_name && desig_name.description);
  formData.append("present_address", presentAddress);
  formData.append("permanent_address", permanentAddress);
  formData.append("gross_salary", grossSalary);
  formData.append("photo_path", photoPath);

  //Check either employee code is exist or not
  const employeeLists = useSelector((state) => state.employees);

  const employeeCodeHandler = (e) => {
    setCode(e.target.value);
    const empcode = e.target.value;
    //toast.success("This code already exist!")
    const employeeCode = employeeLists.filter((search) => {
      return search.code.toLowerCase().includes(empcode.toLowerCase());
    });
    employeeCode.map((data) => {
      if (data.code === empcode) {
        setErrors({ ...errors, code: "This employee code already exist!" });
        return toast.success("Employee code must be unique");
      }
    });
  };
  //Check either employee email is exist or not
  const employeeEmailHandler = (e) => {
    setEmailId(e.target.value);
    const empemail = e.target.value;
    //toast.success("This code already exist!")
    const employeeEmail = employeeLists.filter((search) => {
      return search.email.toLowerCase().includes(empemail.toLowerCase());
    });
    console.log(employeeEmail);
    employeeEmail.map((data, i) => {
      if (data.email === empemail) {
        setErrors({ ...errors, email: "This employee email already exist!" });
        return toast.success("Employee email must be unique");
      } else {
        setErrors("");
      }
    });
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dispatch = useDispatch();

  // Submit form data into database
  const submitHandler = (e) => {
    e.preventDefault();

    // Check validation
    if (
      formData.get("code") === "" ||
      formData.get("name") === "" ||
      formData.get("fathers_name") === "" ||
      formData.get("mothers_name") === "" ||
      formData.get("contact_no") === "" ||
      formData.get("email") === "" ||
      formData.get("nid") === "" ||
      formData.get("blood_group") === "" ||
      formData.get("joining_date") === "" ||
      formData.get("designation_id") === "" ||
      formData.get("present_address") === "" ||
      formData.get("permanent_address") === "" ||
      formData.get("gross_salary") === "" ||
      formData.get("photo_path") === ""
    ) {
      toast.success("Any field must not be empty!");
    } else {
      dispatch(addEmployee(formData, headers, props.onHide, errors, setErrors));
      // toast.success("Employee is adding...");
      // props.onHide();
    }
  };

  const handleChange = (event) => {
    setPhotoPath(event.target.files[0]);

    setImagePreview({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  useEffect(() => {
    setErrors("");
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
      <div>
        <Modal.Header
          style={{ cursor: "move", padding: "6px" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head"> Add Employee </h4>
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
            <form className="form-horizontal" onSubmit={submitHandler}>
              <div className="container productBox">
                <div className="row">
                  <div className="col-sm-12 col-lg-9">
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Employee Code
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          placeholder="Enter employee code"
                          className="form-control w-100"
                          name="code"
                          onChange={employeeCodeHandler}
                        />
                        <span className="text-danger ">
                          {errors && errors.code}
                        </span>
                      </div>
                    </div>

                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Employee Name
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          placeholder="Enter employee name"
                          className="form-control "
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Father Name
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          placeholder="Enter father name"
                          className="form-control "
                          name="fathers_name"
                          onChange={(e) => setFatherName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Mother Name
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          placeholder="Enter mother name"
                          className="form-control "
                          name="mothers_name"
                          onChange={(e) => setMotherName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Contact No
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          placeholder="Enter contact no"
                          className="form-control "
                          name="contact_no"
                          onChange={(e) => setContactNo(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Email ID
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          placeholder="Enter email id"
                          className="form-control w-100"
                          name="email"
                          onChange={employeeEmailHandler}
                        />
                        <span className="text-danger">
                          {errors && errors.email}
                        </span>
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          National ID
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          placeholder="Enter national id"
                          className="form-control "
                          name="nid"
                          onChange={(e) => setNationalId(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Blood Group
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <select
                          className="form-control input-sm "
                          value={bloodGroup}
                          name="blood_group"
                          onChange={(e) => setBloodGroup(e.target.value)}
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Joining Date
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="date"
                          className="form-control "
                          name="joining_date"
                          onChange={(e) => setJoinDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 ">
                        <span className="spanTitle" for="text">
                          Designation
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8  ">
                        <select
                          className="form-control input-sm "
                          name="designation"
                          onChange={(e) => setDesignation(e.target.value)}
                        >
                          <option>Select Designation</option>
                          {designations &&
                            designations.map((designation, i) => (
                              <option value={designation.id} key={i}>
                                {designation.description}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Present Address
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <textarea
                          placeholder="Enter present address"
                          className="form-control "
                          name="present_address"
                          onChange={(e) => setPresentAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Permanent Address
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <textarea
                          placeholder="Enter permanent address"
                          className="form-control "
                          name="permanent_address"
                          onChange={(e) => setPermanentAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Gross Salary
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 ">
                        <input
                          type="text"
                          defaultValue="0.00"
                          className="form-control "
                          name="gross_salary"
                          onChange={(e) => setGrossSalary(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 col-lg-3 employeeImage">
                    <div className="row ">
                      <div className="col-md-sm col-md-12 employeeImageBox">
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
                              src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/clientes-gif-7.gif"
                              alt="defaultimg"
                            />
                          )}
                        </p>
                      </div>
                      <div className="col-sm-12 col-md-12 employeeFile">
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
              <div className="companyBox mt-2 p-2">
                <div className="row">
                  <div className="col-md-12 pull-right responsive-btn">
                    <Button
                      className="saveCloseBtn closebtn border border-0 mr-3"
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
          {/* Company Add Form End Here */}
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AddEmployee;
