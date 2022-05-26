import {
  FETCH_CASHCOLLECTION_SUCCESS,
  ADD_CASHCOLLECTION_DATA,
  UPDATE_CASH_COLLECTION,
} from "../actions/types/cashCollection";

const initialState = [];

const cashCollection = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CASHCOLLECTION_SUCCESS:
      return action.cashcollection.data;

    case ADD_CASHCOLLECTION_DATA:
      const cashData = {};

      for (let key of action.payload.keys()) {
        cashData[key] = action.payload.get(key);
      }

      return [cashData, ...state];

    case UPDATE_CASH_COLLECTION:
      const index = state.findIndex((cash) => cash.id === action.payload.id);
      let newState = [...state];
      newState[index].receipt_no = action.payload.data.receipt_no;
      newState[index].bank_name = action.payload.data.bank_name;
      newState[index].branch_name = action.payload.data.branch_name;
      newState[index].account_no = action.payload.data.account_no;
      newState[index].mba_account_no = action.payload.data.mba_account_no;
      newState[index].check_no = action.payload.data.check_no;
      newState[index].payment_type = action.payload.data.payment_type;
      newState[index].issue_date = action.payload.data.issue_date;
      newState[index].bkash = action.payload.data.bkash;
      newState[index].amount = action.payload.data.amount;
      newState[index].total_due = action.payload.data.total_due;
      newState[index].adjust_amount = action.payload.data.adjust_amount;
      newState[index].balance_due = action.payload.data.balance_due;
      return newState;

    default:
      return state;
    //break;
  }
};
export default cashCollection;
