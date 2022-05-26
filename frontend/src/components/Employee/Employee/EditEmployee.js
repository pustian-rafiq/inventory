/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateEmployee } from "../../../redux/actions/employeeAction";
import { useForm } from "react-hook-form";

const EditEmployee = ({ show, onHide, employee,select }) => {
  const { register, handleSubmit, reset } = useForm();

  const [selectedDesignation, setSelectedDesignation] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);
  const { designations } = useSelector((state) => state.designations);

  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const employeeDesigHandler = (e) => {
    let id = e.target.value;
    const desig = designations.find((desig) => desig.id == id);
    setSelectedDesignation(desig.description);
  };

  // eslint-disable-next-line no-unused-vars
  const imagePreviewHandler = (e) => {
    setImagePreview(e.target.files[0]);
  };

  const updateEmployeeHandler = (data) => {
    let formData = new FormData();
    let newData = { ...data };

    if (selectedDesignation === "") {
      newData.description = employee && employee.designation;
    } else {
      newData.description = selectedDesignation;
    }

    for (let i in data) {
      if (i === "photo_path") {
        if (imagePreview != null) {
          formData.append(i, imagePreview, imagePreview.name);
        }
      } else {
        formData.append(i, data[i]);
      }
    }
    console.log("update company ::: ", data);

    dispatch(
      updateEmployee(data, headers, employee && employee.id, onHide, newData)
    );
    
    toast.success("Update Process is Going On",{
      icon: ({theme, type}) =>  <img height={'27px'} 
      src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"/>
    });

  };

  // for reseting the modal form
  useEffect(() => {
    reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);
  // This handler hide this modal and send select state to the parent component
  const closeHandler = () => {
    onHide();
    select()
  }
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
    >
   <div className="background_and_table_header">
        {/* modal header  */}
        <Modal.Header style={{cursor: "move",padding:'6px' }} className="background_and_table_header" >
          <div>
            <h4
            className="responsive-head"
            >
              Edit Employee Details
            </h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={closeHandler}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        {/* modal body  */}
        <Modal.Body className="background_and_table_header">

        <div className="custom_modal_inner_content">
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(updateEmployeeHandler)}
          >
            <div className="container companyBox py-2 my-2">
              <div className="row">
                <div className="col-md-12 col-lg-9">
                  <div className="row  ">
                    <div className="col-md-12">
                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label
                                className="responsive-desc mt-2"
                                htmlFor="designation_code"
                              >
                                Code
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <input
                                type="text"
                                className="form-control "
                                id="designation_code"
                                placeholder="Ex. 1452"
                                {...register("code")}
                                defaultValue={employee && employee.code}
                                readOnly
                              />

                              {/* enployee id  */}
                              <input
                                type="hidden"
                                className="form-control "
                                {...register("id")}
                                defaultValue={employee && employee.id}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label
                                className="responsive-desc mt-2"
                                htmlFor="designation_desc"
                              >
                                Designation
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <select
                                className="form-control input-sm"
                                {...register("designation_id")}
                                onChange={employeeDesigHandler}
                              >
                                <option
                                  value={employee && employee.designation_id}
                                >
                                  {employee && employee.designation}
                                </option>

                                {designations &&
                                  designations.map((designation) => (
                                    <option
                                      key={designation.id}
                                      value={designation.id}
                                    >
                                      {designation.description}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label
                                className="responsive-desc mt-2"
                                htmlFor="employee_name"
                              >
                                Employee_Name
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <input
                                type="text"
                                className="form-control "
                                id="employee_name"
                                placeholder="Enter employee name"
                                {...register("name")}
                                defaultValue={employee && employee.name}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label
                                className="responsive-desc mt-2"
                                htmlFor="employee_contact"
                              >
                                Contact_no
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <input
                                type="text"
                                className="form-control "
                                id="employee_name"
                                name=""
                                placeholder="Ex. 01XXXXXXXXX"
                                {...register("contact_no")}
                                defaultValue={employee && employee.contact_no}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label
                                className="responsive-desc mt-2"
                                htmlFor="fatherName"
                              >
                                Father_Name
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <input
                                type="text"
                                className="form-control "
                                id="fatherName"
                                name=""
                                placeholder="Enter Father Name"
                                {...register("fathers_name")}
                                defaultValue={employee && employee.fathers_name}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label
                                className="responsive-desc mt-2"
                                htmlFor="MotherName"
                              >
                                Mother_Name
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <input
                                type="text"
                                className="form-control "
                                id="MotherName"
                                name=""
                                placeholder="Enter Mother Name"
                                {...register("mothers_name")}
                                defaultValue={employee && employee.mothers_name}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label className="responsive-desc mt-2" htmlFor="emailNo">
                                Email
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <input
                                type="text"
                                className="form-control "
                                id="emailNo"
                                name=""
                                placeholder="Email"
                                {...register("email")}
                                defaultValue={employee && employee.email}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label className="responsive-desc mt-2" htmlFor="Nid">
                                National_id
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <input
                                type="text"
                                className="form-control "
                                id="Nid"
                                name=""
                                placeholder="National_id"
                                {...register("nid")}
                                defaultValue={employee && employee.nid}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label
                                className="responsive-desc mt-2"
                                htmlFor="BloodGroup"
                              >
                                Blood Group
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <input
                                type="text"
                                className="form-control "
                                id="BloodGroup"
                                name=""
                                placeholder="Blood Group"
                                {...register("blood_group")}
                                defaultValue={employee && employee.blood_group}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label
                                className="responsive-desc mt-2"
                                htmlFor="presentAddress"
                              >
                                Present Address
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <input
                                type="text"
                                className="form-control "
                                id="presentAddress"
                                name=""
                                placeholder="Present Address"
                                {...register("present_address")}
                                defaultValue={
                                  employee && employee.present_address
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label
                                className="responsive-desc mt-2"
                                htmlFor="permanentAddress"
                              >
                                Permanent Address
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <input
                                type="text"
                                className="form-control "
                                id="permanentAddress"
                                name=""
                                placeholder="Permanent Address"
                                {...register("permanent_address")}
                                defaultValue={
                                  employee && employee.permanent_address
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  ">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-lg-4 col-md-12">
                              <label className="responsive-desc mt-2" htmlFor="gsalary">
                                Gross Salary
                              </label>
                            </div>
                            <div className="col-sm-12 col-lg-8 col-md-12">
                              <input
                                type="text"
                                className="form-control "
                                id="gsalary"
                                name=""
                                placeholder="Gross Salary"
                                {...register("gross_salary")}
                                defaultValue={employee && employee.gross_salary}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              

                <div className="col-sm-12 col-lg-3 employeeImage">
                  <div className="row ">
                    <div className="col-md-sm col-md-12 employeeImageBox">
                      <p>
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={
                            imagePreview == null
                              ? `${employee && employee.photo_path}`
                              : URL.createObjectURL(imagePreview)
                          }
                          alt="employeer"
                        />
                      </p>
                    </div>
                    <div className="col-sm-12 col-md-12 employeeFile">
                      <input
                        type="file"
                        hidden
                        id="file"
                  
                      />
                      <label htmlFor="file" className="">
                        Browse
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* modal body footer  */}
            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 pull-right responsive-btn">
                  {/* close button  */}
                  <Button className="saveCloseBtn border border-none closebtn mr-3" onClick={closeHandler}>
                    Close
                  </Button>

                  {/* update button  */}
                  <Button type="submit" className="saveCloseBtn border border-none updatebtn">
                    Update
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

export default EditEmployee;
