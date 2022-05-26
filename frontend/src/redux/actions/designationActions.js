import {
  FETCH_DESIGNATION_DATA,
  DELETE_DESIGNATION,
  UPDATE_DESIGNATION,
  ADD_DESIGNATION_DATA,
  ADD_DESIGNATION_FAIL,
  FETCH_DESIGNATION_DETAILS,
} from "./types/designationTypes";
import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import { toast } from "react-toastify";
import swal from "sweetalert";

const designationDetails = (designation) => ({
  type: FETCH_DESIGNATION_DETAILS,
  payload: designation,
});

export const getDesignationLists = (headers) => {
  //console.log(headers)
  return (dispatch) => {
    axios
      .get(`${baseUrl}/employees/desiglist/`, { headers })
      .then((designations) => {
        dispatch({
          type: FETCH_DESIGNATION_DATA,
          designations,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Add designation
export const addDesignation = (designationData, headers) => {
  console.log(designationData);

  return function (dispatch) {
    axios
      .post(`${baseUrl}/employees/desiglist/`, designationData, { headers })
      .then((res) => {
        dispatch({
          type: ADD_DESIGNATION_DATA,
          payload: designationData,
        });
        toast.success("Designation added successfully!");
      })
      .catch((error) => {
        dispatch({
          type: ADD_DESIGNATION_FAIL,
          designationData,
        });
        console.log(error);
      });
  };
};

export const getDesignationDetails = (id, headers) => {
  return function (dispatch) {
    axios
      .get(`${baseUrl}/employees/desiglist/${id}/`, { headers })
      .then((resp) => {
        //console.log("resp:"+resp)
        dispatch(designationDetails(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// Update designation
export const updateDesignation = (data, headers, id, onHide) => {
  return function (dispatch) {
    axios
      .put(`${baseUrl}/employees/desiglist/${id}/`, data, { headers })
      .then((res) => {
        toast.success("designation updated successfully");
        dispatch({
          type: UPDATE_DESIGNATION,
          payload: { data, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("designation does not updated");
      });
  };
};

//Delete designation
export const deleteDesignation = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/employees/desiglist/${id}/`, { headers })
      .then((res) => {
        swal(`Designation Deleted successfully`, {
          icon: "success",
        });
        dispatch({
          type: DELETE_DESIGNATION,
          payload: id,
        });
      })
      .catch((error) => console.log(error));
  };
};
