import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";

import {
  FETCH_CATEGORY_SUCCESS,
  DELETE_CATEGORY,
  ADD_CATEGORY_DATA,
  FETCH_CATEGORY_DETAILS,
  UPDATE_CATEGORY,
} from "./types/categoryTypes";
import { baseUrl } from "../../RestApi/RestApi";

const getCategoryLists = (categories) => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload: categories,
});

export const addCategory = (categoryData, headers) => {
  console.log("category action :::", categoryData);

  return function (dispatch) {
    axios
      .post(`${baseUrl}/products/category/create/`, categoryData, { headers })
      .then((res) => {
        dispatch({
          type: ADD_CATEGORY_DATA,
          payload: categoryData,
        });
      })
      .catch((error) => console.log(error));
  };
};

// Fetch all categories
export const getCategories = (headers) => {
  return function (dispatch) {
    axios
      .get(`${baseUrl}/products/category/list/`, { headers })
      .then((resp) => {
        dispatch(getCategoryLists(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch category details
export const getCategoryDetails = (id, headers) => {
  return (dispatch) => {
    //console.log("Id:"+id)
    axios
      .get(`${baseUrl}/products/category/list/${id}/`, { headers })
      .then((categoryDetails) => {
        dispatch({
          type: FETCH_CATEGORY_DETAILS,
          payload: categoryDetails,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// update category
export const updateCategory = (data, headers, id, onHide) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/products/category/list/${id}/`, data, { headers })
      .then((res) => {
        toast.success("category updated successfully");
        dispatch({
          type: UPDATE_CATEGORY,
          payload: { data, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("category does not updated");
      });
  };
};

// Delete category
export const deleteCategory = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/products/category/list/${id}/`, { headers })
      .then((resp) => {
        dispatch({
          type: DELETE_CATEGORY,
          payload: id,
        });
        swal(`Wow! Category Deleted successfully`, {
          icon: "success",
        });
      })
      .catch((error) => console.log(error));
  };
};
