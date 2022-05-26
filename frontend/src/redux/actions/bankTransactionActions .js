import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import { toast } from "react-toastify";
import {
  FETCH_BANK_TRANSACTION_DATA,
  ADD_BANK_TRANSACTION_DATA,
  FETCH_BANK_TRANSACTION_DETAILS,
  UPDATE_BANK_TRANSACTION_DATA,
} from "./types/bankType";

// Get bank transaction list

export const getBankTransactionLists = (headers) => {
  return (dispatch) => {
    //  console.log(headers)  axios.get(`${baseUrl}/bank/list`,{headers})
    axios
      .get(`${baseUrl}/bank/bank-transaction/list/`, { headers })
      .then((bankTransaction) => {
        dispatch({
          type: FETCH_BANK_TRANSACTION_DATA,
          bankTransaction,
        });
      })
      .catch((error) => {
        //console.log(error);
      });
  };
};

// Add new bank transaction
export const addBankTransactionData = (bankTranData, headers, onHide) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/bank/bank-transaction/create/`, bankTranData, {
        headers,
      })
      .then((res) => {
        dispatch({
          type: ADD_BANK_TRANSACTION_DATA,
          payload: bankTranData,
        });
        toast.success("Bank transaction added successfully");
        onHide();
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// update bank transaction
export const updateBankTransactionData = (
  data,
  headers,
  id,
  onHide
) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/bank/bank-transaction/update/${id}/`, data, {
        headers,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_BANK_TRANSACTION_DATA,
          payload: { data, id },
        });
        toast.success("Bank transaction updated successfully");
        onHide();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Bank transaction does not updated");
      });
  };
};

// Get bank transaction details using particular id
export const getBankTransactionDetails = (id, headers) => {
  return function (dispatch) {
    axios
      .get(`${baseUrl}/bank/bank-transaction/list/${id}/`, { headers })
      .then((resp) => {
        dispatch({
          type: FETCH_BANK_TRANSACTION_DETAILS,
          payload: resp.data,
        });
      })
      .catch((error) => console.log(error));
  };
};
