import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../RestApi/RestApi";
import swal from "sweetalert";

import {
  FETCH_COMPANY_DATA,
  ADD_COMPANY_DATA,
  DELETE_COMPANY,
  COMPANY_DETAILS,
  UPDATE_COMPANY,
} from "./types/companyTypes";

// Fetch all company
const getCompanies = (companies) => ({
  type: FETCH_COMPANY_DATA,
  payload: companies,
});

//get single company
const getCompany = (company) => ({
  type: COMPANY_DETAILS,
  payload: company,
});

//add company name
export const addCompanyData = (companyData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/products/company/create/`, companyData, { headers })
      .then((res) => {
        dispatch({
          type: ADD_COMPANY_DATA,
          payload: companyData,
        });
        swal(`Wow! Company Added successfully`, {
          icon: "success",
        });
      })
      .catch((error) => console.log(error.data));
  };
};

export const getCompanyLists = (headers) => {
  return function (dispatch) {
    axios
      .get(`${baseUrl}/products/company/list/`, { headers })
      .then((resp) => {
        dispatch(getCompanies(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

//Get single company details
export const getCompanyDetails = (id, headers) => {
  return function (dispatch) {
    axios
      .get(`${baseUrl}/products/company/list/${id}/`, { headers })
      .then((resp) => {
        dispatch(getCompany(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// Delete Company
export const deleteCompany = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/products/company/list/${id}/`, { headers })
      .then((resp) => {
        dispatch({
          type: DELETE_COMPANY,
          payload: { id: id },
        });

        swal(`Wow! Company Deleted successfully`, {
          icon: "success",
        });
      })
      .catch((error) => console.log(error));
  };
};

//Update company name
export const updateCompany = (data, headers, id, onHide) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/products/company/list/${id}/`, data, { headers })
      .then((res) => {
        toast.success("company updated successfully");
        dispatch({
          type: UPDATE_COMPANY,
          payload: { data, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("company does not updated");
      });
  };
};
