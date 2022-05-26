import {
  FETCH_SALES_RETURN_DATA,
  ADD_SALES_RETURN_DATA,
  ADD_SALES_RETURN_FAIL,
  UPDATE_SALES_RETURN,
} from "./types/salesReturn";

import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";

// Get purchase return list
export const getSalesReturnLists = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/returns/sales-list/`, { headers })
      .then((salesreturns) => {
        dispatch({
          type: FETCH_SALES_RETURN_DATA,
          salesreturns,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Add new purchase return
export const addSalesReturn = (salesReturnData, headers) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/returns/sales-list/`, salesReturnData, {
        headers,
      })
      .then((salesReturnData) => {
        dispatch({
          type: ADD_SALES_RETURN_DATA,
          salesReturnData,
        });
      })
      .catch((error) => {
        dispatch({
          type: ADD_SALES_RETURN_FAIL,
          salesReturnData,
        });
        console.log(error);
      });
  };
};

//  update sales return
export const updateSalesReturn = (data, headers, id, onHide) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/returns/sales-list/${id}/`, data, { headers })
      .then((res) => {
        toast.success("sales return updated successfully");
        dispatch({
          type: UPDATE_SALES_RETURN,
          payload: { data, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("sales return  does not updated");
      });
  };
};
