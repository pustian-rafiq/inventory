import axios from "axios";
import { toast } from "react-toastify";

import {
  ADD_CASHDELIVERY_DATA,
  FETCH_CASHDELIVERY_SUCCESS,
  UPDATE_CASHDELIVERY,
} from "./types/cashDelivery";

import { baseUrl } from "../../RestApi/RestApi";

// Add cash delivery data
export const addCashDelivery = (cashDeliveryData, headers) => {
  return (dispatch) => { 
    axios
      .post(`${baseUrl}/cashcollections/delivery/`, cashDeliveryData, {
        headers,
      })
      .then((res) => {
        dispatch({
          type: ADD_CASHDELIVERY_DATA,
          payload: cashDeliveryData,
        });
      })
      .catch((error) => {
        console.log("Add Cash Delivery Error:" + error);
      });
  };
};

// Get cash delivery data
export const getCashDelivery = (headers) => {
  return (dispatch) => {
    //console.log(headers)
    axios
      .get(`${baseUrl}/cashcollections/delivery/`, { headers })
      .then((cashdelivery) => {
        dispatch({
          type: FETCH_CASHDELIVERY_SUCCESS,
          cashdelivery,
        });
      })
      .catch((error) => {
        console.log("Get Cash Delivery Error:" + error);
      });
  };
};

// update cash delivery
export const updateCashDelivery = (data, headers, id, onHide) => {

  return (dispatch) => {
    axios
      .put(`${baseUrl}/cashcollections/delivery/${id}/`, data, {
        headers,
      })
      .then((res) => {
        toast.success("cash delivery updated successfully");
        dispatch({
          type: UPDATE_CASHDELIVERY,
          payload: { data, id },
        });
        onHide();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
