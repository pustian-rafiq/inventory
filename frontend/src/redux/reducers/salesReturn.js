import {
  FETCH_SALES_RETURN_DATA,
  ADD_SALES_RETURN_DATA,
  ADD_SALES_RETURN_FAIL,
  UPDATE_SALES_RETURN,
} from "../actions/types/salesReturn";

const initialState = [];

const salesReturnReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SALES_RETURN_DATA:
      return action.salesreturns.data;

    case ADD_SALES_RETURN_DATA:
      return [action.salesReturnData.data, ...state];

    case ADD_SALES_RETURN_FAIL:
      return [action.salesReturnData.data, ...state];

    case UPDATE_SALES_RETURN:
      const { data, id } = action.payload;

      const index = state.findIndex((c) => c.id === id);
      const newSalesReturnState = [...state];
      newSalesReturnState[index].paid_amount = data.paid_amount;
      newSalesReturnState[index].curr_credit = data.curr_credit;

      return [...newSalesReturnState];

    default:
      return state;
  }
};
export default salesReturnReducer;
