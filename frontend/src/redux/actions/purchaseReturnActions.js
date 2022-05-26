import {
    FETCH_PURCHASE_RETURN_DATA,
    ADD_PURCHASE_RETURN_DATA,
    ADD_PURCHASE_RETURN_FAIL,
    UPDATE_PURCHASE_RETURN,
  } from "./types/purchaseReturn";
  import axios from "axios";
  import { toast } from "react-toastify";
 import { baseUrl } from "../../RestApi/RestApi";


  // Get purchase return list
  export const getPurchaseReturnLists = (headers) => {
    return (dispatch) => {
      axios
        .get(`${baseUrl}/returns/purchase-list/`, { headers })
        .then((purchasereturns) => {
          dispatch({
            type: FETCH_PURCHASE_RETURN_DATA,
            purchasereturns,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  // Add new purchase return
  export const addPurchaseReturn = (purchaseReturnData, headers) => {

    return (dispatch) => {
      axios
        .post(`${baseUrl}/returns/purchase-list/`, purchaseReturnData, {
          headers,
        })
        .then((purchaseReturnData) => {
          dispatch({
            type: ADD_PURCHASE_RETURN_DATA,
            purchaseReturnData,
          });
        })
        .catch((error) => {
          dispatch({
            type: ADD_PURCHASE_RETURN_FAIL,
            purchaseReturnData,
          });
          console.log(error);
        });
    };
  };


//  update purchase return
export const updatePurchaseReturn = (data, headers, id, onHide) => {

  return (dispatch) => {
    axios
      .put(`${baseUrl}/returns/purchase-list/${id}/`, data, { headers })
      .then((res) => {
        toast.success("purchase return updated successfully");
        dispatch({
          type: UPDATE_PURCHASE_RETURN,
          payload: { data, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("purchase return  does not updated");
      });
  };
};
  