import {
  FETCH_CUSTOMER_DATA,
  ADD_CUSTOMER_DATA,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
} from "./types/customerTypes";
import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import { toast } from "react-toastify";
import swal from "sweetalert";

// fetch the customer details

export const getCustomerLists = (headers) => {
  //console.log(headers)
  return (dispatch) => {
    axios
      .get(`${baseUrl}/customers/customerlist/`, { headers })
      .then((customers) => {
        dispatch({
          type: FETCH_CUSTOMER_DATA,
          customers,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Add customer
export const addCustomer = (customerData, headers) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/customers/customerlist/`, customerData, { headers })
      .then((res) => {
        dispatch({
          type: ADD_CUSTOMER_DATA,
          payload: customerData,
        });
      })
      .catch((error) => console.log(error));
  };
};

//Update customer name
export const updatecustomer = (data, headers, id, onHide, newData) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/customers/customerlist/${id}/`, data, { headers })
      .then((res) => {
        toast.success("customer updated successfully");
        dispatch({
          type: UPDATE_CUSTOMER,
          payload: { newData, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("customers does not updated");
      });
  };
};

// Delete Customer
export const deleteCustomer = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/customers/customerlist/${id}/`, { headers })
      .then((resp) => {
        swal(`Customer Deleted successfully`, {
          icon: "success",
        });
        dispatch({
          type: DELETE_CUSTOMER,
          payload: id,
        });
      })
      .catch((error) => console.log(error));
  };
};
