import {
  FETCH_EMPLOYEE_DATA,
  ADD_EMPLOYEE_DATA,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "./types/employeeTypes";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../RestApi/RestApi";
import swal from "sweetalert";

//Get the url
export const getEmployeeLists = (headers) => {
  //console.log(path)
  return (dispatch) => {
    axios
      .get(`${baseUrl}/employees/employeelist/`, { headers })
      .then((employees) => {
        dispatch({
          type: FETCH_EMPLOYEE_DATA,
          employees,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Add employee
export const addEmployee = (
  employeeData,
  headers,
  onHide,
  errors,
  setErrors
) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/employees/employeelist/`, employeeData, { headers })
      .then((res) => {
        dispatch({
          type: ADD_EMPLOYEE_DATA,
          payload: employeeData,
        });
        toast.success("Employee is adding...");
        onHide();
      })
      .catch((error) => {
        toast.error(error.response.data[0]);
        setErrors({ ...errors, email: error.response.data[0] });
        console.log(error);
      });
  };
};

//Update employee name
export const updateEmployee = (data, headers, id, onHide, newData) => {
  console.log("data ", data);
  console.log("id ", id);
  return (dispatch) => {
    axios
      .put(`${baseUrl}/employees/employeelist/${id}/`, data, { headers })
      .then((res) => {
        toast.success("employee updated successfully");
        dispatch({
          type: UPDATE_EMPLOYEE,
          payload: { newData, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("employee does not updated");
      });
  };
};

// Delete Company
export const deleteEmployee = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/employees/employeelist/${id}/`, { headers })
      .then((res) => {
        swal(`Employee Deleted successfully`, {
          icon: "success",
        });
        dispatch({
          type: DELETE_EMPLOYEE,
          payload: id,
        });
      })
      .catch((error) => console.log(error));
  };
};
