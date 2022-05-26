/* eslint-disable no-fallthrough */
import {
  FETCH_CUSTOMER_DATA,
  ADD_CUSTOMER_DATA,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
} from "../actions/types/customerTypes";

const initialState = [];

const customerReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_CUSTOMER_DATA:
      return action.customers.data;

    case UPDATE_CUSTOMER:
      const { newData, id } = payload;

      const index = state.findIndex((c) => c.id === id);

      const newCustomerState = [...state];
      newCustomerState[index].name = newData.name;
      newCustomerState[index].address = newData.address;
      newCustomerState[index].contact_no = newData.contact_no;
      newCustomerState[index].total_due = newData.total_due;

      return [...newCustomerState];

    //break;
    case DELETE_CUSTOMER:
      const newCusState = state.filter((c) => c.id !== payload);
      return [...newCusState];

    case ADD_CUSTOMER_DATA:
      const data = {};

      for (let key of payload.keys()) {
        data[key] = payload.get(key);
      }

      return [data, ...state];

    default:
      return state;
  }
};
export default customerReducer;
