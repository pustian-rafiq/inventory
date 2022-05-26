import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import { toast } from "react-toastify";
import {
  FETCH_EXPENSE_DATA,
  ADD_EXPENSE_DATA,
  EXPANSE_UPDATE,
} from "./types/expenseTypes";
//import { baseUrl } from "../../RestApi/RestApi";

// Add new expense
export const addExpenseData = (expenseData, headers, onHide) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/expense/expense-list/`, expenseData, { headers })
      .then((res) => {
        dispatch({
          type: ADD_EXPENSE_DATA,
          payload: expenseData,
        });
        toast.success("Expense added successfully");
        onHide();
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Get expense list
export const getExpenseLists = (headers) => {
  return (dispatch) => {
    //  console.log(headers)  axios.get(`${baseUrl}/bank/list`,{headers})
    axios
      .get(`${baseUrl}/expense/expense-list/`, { headers })
      .then((expenses) => {
        dispatch({
          type: FETCH_EXPENSE_DATA,
          expenses,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//  update expanse
export const updateExpense = (data, headers, id, onHide) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/expense/expense-list/${id}/`, data, { headers })
      .then((res) => {
        toast.success("expense updated successfully");
        dispatch({
          type: EXPANSE_UPDATE,
          payload: { data, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("expense does not updated");
      });
  };
};
