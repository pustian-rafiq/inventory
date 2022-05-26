import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../RestApi/RestApi";
import {
  FETCH_INCOME_DATA,
  ADD_INCOME_DATA,
  UPDATE_INCOME,
} from "./types/incomeType";

// Add new income
export const addIncomeData = (incomeData, headers, onHide) => {
  console.log("incomeData in income action :::", incomeData);

  return (dispatch) => {
    axios
      .post(`${baseUrl}/expense/income-list/`, incomeData, { headers })
      .then((res) => {
        dispatch({
          type: ADD_INCOME_DATA,
          payload: incomeData,
        });
        toast.success("Income added successfully");
        onHide();
      })
      .catch((error) => {
        console.log(error.incomeData);
      });
  };
};

// get Income lists
export const getIncomeLists = (headers) => {
  return (dispatch) => {
    //  console.log(headers)  axios.get(`${baseUrl}/bank/list`,{headers})
    axios
      .get(`${baseUrl}/expense/income-list/`, { headers })
      .then((incomes) => {
        dispatch({
          type: FETCH_INCOME_DATA,
          incomes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//  update income
export const updateIncome = (data, headers, id, onHide) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/expense/income-list/${id}/`, data, { headers })
      .then((res) => {
        toast.success("income updated successfully");
        dispatch({
          type: UPDATE_INCOME,
          payload: { data, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("income does not updated");
      });
  };
};
