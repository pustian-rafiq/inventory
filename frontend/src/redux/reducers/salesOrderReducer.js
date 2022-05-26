/* eslint-disable no-fallthrough */
import {
  FETCH_ORDER_DATA,
  ADD_ORDER_DATA,
  ADD_ORDER_FAIL,
  FETCH_SALES_ORDER_DETAILS,
  DELETE_ORDER,
  SALES_RECEIPT,
  SALES_PRODUCT_DETAILS,
} from "../actions/types/salesOrder";

const initialState = {
  salesorder_list: [],
  salesReceipt: {},
  salesorder_details: {},
  salesProductDetais: {},
  loading: true,
};

const salesOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_DATA:
      return {
        ...state,
        salesorder_list: action.ordersData.data,
        loading: false,
      };

    case SALES_RECEIPT:
      return {
        ...state,
        salesReceipt: action.payload,
      };

    case FETCH_SALES_ORDER_DETAILS:
      return {
        ...state,
        salesorder_details: action.salesOrderDetails.data,
        loading: false,
      };

    case ADD_ORDER_DATA:
      return {
        ...state,
        salesorder_list: [action.payload, ...state.salesorder_list],
      };

    case DELETE_ORDER:
      let salesOrderAfterDelete = state.salesorder_list.filter(
        (so) => so.id !== action.payload
      );

    case SALES_PRODUCT_DETAILS:
      return {
        ...state,
        salesProductDetais: action.salesProductDetails.data,
        loading: false,
      };

    case ADD_ORDER_FAIL:
    default:
      return state;
  }
};
export default salesOrderReducer;
