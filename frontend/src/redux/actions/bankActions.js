import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";

import {
  FETCH_BANK_DATA,
  ADD_BANK_DATA,
  FETCH_BANK_DETAILS,
  UPDATE_BANK,
  DELETE_BANK,
} from "./types/bankType";
import { baseUrl } from "../../RestApi/RestApi";

const getBanks = (banks) => ({
  type: FETCH_BANK_DATA,
  payload: banks,
});
const getBank = (bank) => ({
  type: FETCH_BANK_DETAILS,
  payload: bank,
});

export const addBankData = (bankData, headers, onHide) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/bank/create/`, bankData, { headers })
      .then((res) => {
        dispatch({
          type: ADD_BANK_DATA,
          payload: bankData,
        });
        toast.success("Bank added successfully");
        onHide();
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
};

// Fetch all bank's list
export const getBankLists = (headers) => {
  return function (dispatch) {
    axios
      .get(`${baseUrl}/bank/list/`, { headers })
      .then((resp) => {
        console.log("resp.data",resp.data)
        console.log("resp.data",resp)
        dispatch(getBanks(resp.data));
      })
      .catch((error) => {
        //console.log(error)
      });
  };
};

// Fetch bank details
export const getBankDetails = (id, headers) => {
  return function (dispatch) {
    axios
      .get(`${baseUrl}/bank/list/${id}/`, { headers })
      .then((resp) => {
        dispatch(getBank(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

//Update bank information
export const updateBank = (data, headers, id, onHide) => {
  return function (dispatch) {
    axios
      .put(`${baseUrl}/bank/update/${id}/`, data, { headers })
      .then((res) => {
        toast.success("bank updated successfully");
        dispatch({
          type: UPDATE_BANK,
          payload: { data, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("bank does not updated");
      });
  };
};

// Delete Bank
export const deleteBank = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/bank/delete/${id}/`, { headers })
      .then((resp) => {
        dispatch({
          type: DELETE_BANK,
          payload: id,
        });
        swal(`Bank Deleted successfully`, {
          icon: "success",
        });
      })
      .catch((error) => console.log(error));
  };
};
