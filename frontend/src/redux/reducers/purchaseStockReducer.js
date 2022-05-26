import {
  FETCH_PURCHASE_STOCK_DATA,
  ADD_PURCHASE_STOCK_DATA,
} from "../actions/types/purchaseOrder";

const initialState = [];

const purchaseStockReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PURCHASE_STOCK_DATA:
      return action.purchaseStocks.data;

    case ADD_PURCHASE_STOCK_DATA:
      return [action.payload, ...state];

    default:
      return state;
  }
};
export default purchaseStockReducer;
