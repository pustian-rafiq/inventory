import {
  FETCH_BANK_DATA,
  ADD_BANK_DATA,
  FETCH_BANK_DETAILS,
  UPDATE_BANK,
  DELETE_BANK,
} from "../actions/types/bankType";

const initialState = {
  banks: [],
  bank: {},
  loading: true,
};

const bankReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_BANK_DATA:
      return {
        ...state,
        banks: payload,
        loading: false,
      };
    case ADD_BANK_DATA:
      return { ...state, banks: [payload, ...state.banks] };

    case FETCH_BANK_DETAILS:
      return {
        ...state,
        bank: payload,
        loading: false,
      };

    case UPDATE_BANK:
      const { data, id } = payload;

      const index = state.banks.findIndex((c) => c.id === id);
      const newBankState = [...state.banks];
      newBankState[index].bank_name = data.bank_name;
      newBankState[index].account_no = data.account_no;
      newBankState[index].account_name = data.account_name;
      newBankState[index].branch_name = data.branch_name;
      newBankState[index].opening_balance = data.opening_balance;
      newBankState[index].total_amount = data.total_amount;

      return {
        ...state,
        banks: [...newBankState],
      };

    case DELETE_BANK:
      let bs_afterDelete = state.banks.filter((b) => b.id !== payload);

      return {
        ...state,
        banks: [...bs_afterDelete],
      };

    default:
      return state;
  }
};
export default bankReducer;
