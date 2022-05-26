import {
  FETCH_BANK_TRANSACTION_DATA,
  ADD_BANK_TRANSACTION_DATA,
  FETCH_BANK_TRANSACTION_DETAILS,
  UPDATE_BANK_TRANSACTION_DATA,
} from "../actions/types/bankType";

const initialState = {
  bankTransactions: [],
  bankTranDetails: {},
  loading: true,
};

// bank Transaction Reducer
const bankTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BANK_TRANSACTION_DATA:
      return {
        ...state,
        bankTransactions: action.bankTransaction.data,
        loading: false,
      };

    case ADD_BANK_TRANSACTION_DATA:
      const bankTranData = {};

      for (let key of action.payload.keys()) {
        bankTranData[key] = action.payload.get(key);
      }

      return {
        ...state,
        bankTransactions: [bankTranData, ...state.bankTransactions],
      };

    case UPDATE_BANK_TRANSACTION_DATA:
      const { data, id } = action.payload;

      const index = state.bankTransactions.findIndex((p) => p.id === id);
      const newBankTranState = [...state.bankTransactions];
      newBankTranState[index].transaction_date = data.transaction_date;
      newBankTranState[index].bank_name = data.bank_name;
      newBankTranState[index].brance_name = data.brance_name;
      newBankTranState[index].amount = data.amount;
      newBankTranState[index].transaction_type = data.transaction_type;
      newBankTranState[index].remarks = data.remarks;

      return {
        ...state,
        bankTransactions: [...newBankTranState],
      };

    case FETCH_BANK_TRANSACTION_DETAILS:
      return {
        ...state,
        bankTranDetails: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
export default bankTransactionReducer;
