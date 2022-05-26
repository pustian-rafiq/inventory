import { FETCH_STOCK_PRODUCT } from "../actions/types/stockType";

const initialState = [];
const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STOCK_PRODUCT:
      return action.payload.data;
    default:
      return state;
  }
};

export default stockReducer;
