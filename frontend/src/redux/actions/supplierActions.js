import {
  FETCH_SUPPLIER_DATA,
  ADD_SUPPLIER_DATA,
  DELETE_SUPPLIER_DATA,
  UPDATE_SUPPLIER_DATA,
} from "./types/supplierTypes";
import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import { toast } from "react-toastify";
import swal from "sweetalert";

// Fetch all supplier
const getSuppliers = (suppliers) => ({
  type: FETCH_SUPPLIER_DATA,
  payload: suppliers,
});

export const getSupplierLists = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/suppliers/list/`, { headers })
      .then((suppliers) => {
        dispatch(getSuppliers(suppliers));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Add supplier
export const addSupplier = (supplierData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/suppliers/list/`, supplierData, { headers })
      .then((res) => {
        toast.success("Supplier added successfully");
        dispatch({
          type: ADD_SUPPLIER_DATA,
          payload: supplierData,
        });
      })
      .catch((error) => console.log(error));
  };
};

// Update supplier
export const updateSupplier = (data, headers, id, onHide, newData) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/suppliers/list/${id}/`, data, { headers })
      .then((res) => {
        toast.success("Supplier updated successfully");
        dispatch({
          type: UPDATE_SUPPLIER_DATA,
          payload: { newData, id },
        });
        onHide();
      })
      .catch((error) => console.log(error));
  };
};

// Delete supplier
export const deleteSupplier = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/suppliers/list/${id}/`, { headers })
      .then((resp) => {
        swal(`Supplier Deleted successfully`, {
          icon: "success",
        });
        dispatch({
          type: DELETE_SUPPLIER_DATA,
          payload: id,
        });
      })
      .catch((error) => console.log(error));
  };
};
