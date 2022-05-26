import {
  FETCH_CASHDELIVERY_SUCCESS,
  ADD_CASHDELIVERY_DATA,
  UPDATE_CASHDELIVERY,
} from "../actions/types/cashDelivery";

const initialState = [];

const cashDelivery = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CASHDELIVERY_SUCCESS:
      return action.cashdelivery.data;

    case ADD_CASHDELIVERY_DATA:
      const cashDeliveryData = {};

      for (let key of action.payload.keys()) {
        cashDeliveryData[key] = action.payload.get(key);
      }

      console.log("cashDeliveryData ::", cashDeliveryData);

      return [cashDeliveryData, ...state];

    case UPDATE_CASHDELIVERY:
      const { data, id } = action.payload;

      // eslint-disable-next-line eqeqeq
      const index = state.findIndex((c) => c !== null && c.id == id);

      const newCashDeliveryState = [...state];
      newCashDeliveryState[index].receipt_no = data.receipt_no;
      newCashDeliveryState[index].bank_name = data.bank_name;
      newCashDeliveryState[index].branch_name = data.branch_name;
      newCashDeliveryState[index].account_no = data.account_no;
      newCashDeliveryState[index].mba_account_no = data.mba_account_no;
      newCashDeliveryState[index].check_no = data.check_no;
      newCashDeliveryState[index].payment_type = data.payment_type;
      newCashDeliveryState[index].issue_date = data.issue_date;
      newCashDeliveryState[index].bkash = data.bkash;
      newCashDeliveryState[index].amount = data.amount;
      newCashDeliveryState[index].adjust_amount = data.adjust_amount;
      newCashDeliveryState[index].balance_due = data.balance_due;

      return [...newCashDeliveryState];

    default:
      return state;
    //break;
  }
};
export default cashDelivery;
