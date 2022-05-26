import {
  FETCH_EXPENSE_INCOME_DATA,
  ADD_EXPENSE_INCOME_DATA,
  UPDATE_EXPANSE_INCOME,
  DELETE_EXPENSE_INCOME_DATA,
} from "../actions/types/expenseIncomeTypes";
const initialState = [];

const expenseIncomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EXPENSE_INCOME_DATA:
      return action.expenseIncome.data;

    case ADD_EXPENSE_INCOME_DATA:
      return [action.payload, ...state];

    case UPDATE_EXPANSE_INCOME:
      const index = state.findIndex(
        (expanseIncome) => expanseIncome.id === action.payload.id
      );
      let newState = [...state];
      newState[index].code = action.payload.data.code;
      newState[index].description = action.payload.data.description;
      newState[index].status = action.payload.data.status;
      return newState;

    case DELETE_EXPENSE_INCOME_DATA:
      const newExpenseIncomeState = state.filter((exin) => exin.id !== action.payload);
      return [...newExpenseIncomeState];

    default:
      return state;
  }
};
export default expenseIncomeReducer;
