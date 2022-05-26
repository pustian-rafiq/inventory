import axios from "axios";
import { toast } from "react-toastify";

import {
  FETCH_CASHCOLLECTION_SUCCESS,
  ADD_CASHCOLLECTION_DATA,
  UPDATE_CASH_COLLECTION,
} from "./types/cashCollection";

import { baseUrl } from "../../RestApi/RestApi";

export const addCashCollection = (cashCollectionData, headers, onHide) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/cashcollections/collection/`, cashCollectionData, {
        headers,
      })
      .then((res) => {
        toast.success("Cash collection added successfully");
        dispatch({
          type: ADD_CASHCOLLECTION_DATA,
          payload: cashCollectionData,
        });
        onHide();
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getCashCollection = (headers) => {
  return (dispatch) => {
    //console.log(headers)
    axios
      .get(`${baseUrl}/cashcollections/collection/`, { headers })
      .then((cashcollection) => {
        dispatch({
          type: FETCH_CASHCOLLECTION_SUCCESS,
          cashcollection,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//  update cash collection
export const updateCashCollection = (data, headers, id, onHide) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/cashcollections/collection/${id}/`, data, { headers })
      .then((res) => {
        toast.success("cashcollection updated successfully");

        dispatch({
          type: UPDATE_CASH_COLLECTION,
          payload: { data, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("cashcollection does not updated");
      });
  };
};
