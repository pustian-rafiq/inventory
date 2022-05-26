import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../RestApi/RestApi";
import {
  FETCH_EXPENSE_INCOME_DATA,
  ADD_EXPENSE_INCOME_DATA,
  UPDATE_EXPANSE_INCOME,
  DELETE_EXPENSE_INCOME_DATA,
} from "./types/expenseIncomeTypes";
import swal from "sweetalert";

// add the expense income data

export const addExpenseIncomeData = (expenseIncomeData, headers, onHide) => {
  console.log("expenseIncomeData in action :::", expenseIncomeData);

  return (dispatch) => {
    axios
      .post(`${baseUrl}/expense/expenseitemlist/`, expenseIncomeData, {
        headers,
      })
      .then((res) => {
        if (expenseIncomeData.status == 1) {
          expenseIncomeData.status = "Income";
        } else {
          expenseIncomeData.status = "Expense";
        }
        dispatch({
          type: ADD_EXPENSE_INCOME_DATA,
          payload: expenseIncomeData,
        });
        toast.success("Expense income data added successfully");
        onHide();
      })
      .catch((error) => {
        toast.error("Expense income data does not added");
      });
  };
};

//fetch the expense income lists

export const getExpenseIncomeLists = (headers) => {
  return (dispatch) => {
    //  console.log(headers)  axios.get(`${baseUrl}/bank/list`,{headers})
    axios
      .get(`${baseUrl}/expense/expenseitemlist/`, { headers })
      .then((expenseIncome) => {
        dispatch({
          type: FETCH_EXPENSE_INCOME_DATA,
          expenseIncome,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//  update expanse income
export const updateExpanseIncome = (data, headers, id, onHide) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/expense/expenseitemlist/${id}/`, data, { headers })
      .then((res) => {
        toast.success("Expanse Income Updated Successfully");
        dispatch({
          type: UPDATE_EXPANSE_INCOME,
          payload: { data, id },
        });
        dispatch(getExpenseIncomeLists(headers));
        onHide();
      })
      .catch((error) => console.log(error));
  };
};

//delete the expense income data
export const deleteExpenseIncome = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/expense/expenseitemlist/${id}/`, { headers })
      .then((res) => {
        swal(`Expense/Income Deleted successfully`, {
          icon: "success",
        });
        dispatch({
          type: DELETE_EXPENSE_INCOME_DATA,
          payload: id,
        });
      })
      .catch((error) => console.log(error));
  };
};
