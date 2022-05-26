import {
  FETCH_INCOME_DATA,
  ADD_INCOME_DATA,
  UPDATE_INCOME,
} from "../actions/types/incomeType";
const initialState = [];

const incomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INCOME_DATA:
      return action.incomes.data;

    case ADD_INCOME_DATA:
      const incomeData = {};

      for (let key of action.payload.keys()) {
        incomeData[key] = action.payload.get(key);
      }

      return [incomeData, ...state];

    case UPDATE_INCOME:
      const { data, id } = action.payload;

      const index = state.findIndex((c) => c.id === id);
      const newIncomeState = [...state];
      newIncomeState[index].amount = data.amount;
      newIncomeState[index].purpose = data.purpose;
      newIncomeState[index].voucher_no = data.voucher_no;

      return [...newIncomeState];

    default:
      return state;
  }
};
export default incomeReducer;
