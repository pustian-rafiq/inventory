import {
  FETCH_EXPENSE_DATA,
  ADD_EXPENSE_DATA,
  EXPANSE_UPDATE,
} from "../actions/types/expenseTypes";

const initialState = [];

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EXPENSE_DATA:
      return action.expenses.data;

    case ADD_EXPENSE_DATA:
      const expenseData = {};

      for (let key of action.payload.keys()) {
        expenseData[key] = action.payload.get(key);
      }

      return [expenseData, ...state];

    case EXPANSE_UPDATE:
      const { data, id } = action.payload;

      const index = state.findIndex((c) => c.id === id);
      const newExpanseState = [...state];
      newExpanseState[index].amount = data.amount;
      newExpanseState[index].purpose = data.purpose;
      newExpanseState[index].voucher_no = data.voucher_no;

      return [...newExpanseState];

    default:
      return state;
  }
};
export default expenseReducer;
