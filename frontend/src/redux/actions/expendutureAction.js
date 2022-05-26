import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../RestApi/RestApi";
import {
  FETCH_EXPENDUTURE_DATA,
  ADD_EXPENDUTURE_DATA,
  UPDATE_EXPANSE_INCOME,
  DELETE_EXPENSE_INCOME_DATA
} from "./types/expendutureypes";
//import { baseUrl } from "../../RestApi/RestApi";


const expendutureDeleted = () => ({
  type: DELETE_EXPENSE_INCOME_DATA,
});

// add the expense income data 

export const addExpendutureData = (expendutureData, headers,onHide) => {

  return (dispatch, getState) => {
    //  console.log(headers)  axios.get(`${baseUrl}/bank/list`,{headers})
    axios
      .post(`${baseUrl}/expense/expenseitemlist/`, expendutureData, {
        headers,
      })

      .then((expendutureData) => {
        //console.log("Action:"+expendutureData)
        dispatch({
          type: ADD_EXPENDUTURE_DATA,
          expendutureData,
        });
        dispatch(getExpenseIncomeLists(headers));
        onHide();
      })
      .catch((error) => {
        console.log(error.expendutureData);
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
          type: FETCH_EXPENDUTURE_DATA,
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
      .catch((error) => {
        toast.error("Expanse Income did not update!");
      });
  };
};


//delete the expense income data

export const deleteExpenseIncome = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/expense/expenseitemlist/${id}/`, { headers })
      .then((resp) => {
        // console.log("Delete expense income data successful",resp)
        dispatch(expendutureDeleted());
        dispatch(getExpenseIncomeLists(headers));
      })
      .catch((error) => console.log(error));
  };
};