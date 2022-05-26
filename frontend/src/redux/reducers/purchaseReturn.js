/* eslint-disable no-unused-vars */
import {
  FETCH_PURCHASE_RETURN_DATA,
  ADD_PURCHASE_RETURN_DATA,
  ADD_PURCHASE_RETURN_FAIL,
  UPDATE_PURCHASE_RETURN,
} from "../actions/types/purchaseReturn";

const initialState = [];

const purchaseReturnReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PURCHASE_RETURN_DATA:
      return action.purchasereturns.data;
    //break;

    case ADD_PURCHASE_RETURN_DATA:
      return [action.purchaseReturnData.data, ...state];
    //break;
    case ADD_PURCHASE_RETURN_FAIL:
      return [action.purchaseReturnData.data, ...state];
    //break;

    case UPDATE_PURCHASE_RETURN:
      const { data, id } = action.payload;

      const index = state.findIndex((c) => c.id === id);
      const newPurchaseReturnState = [...state];
      newPurchaseReturnState[index].paid_amount = data.paid_amount;
      newPurchaseReturnState[index].curr_credit = data.curr_credit;

      return [...newPurchaseReturnState];

    default:
      return state;
    //break;
  }
};
export default purchaseReturnReducer;
