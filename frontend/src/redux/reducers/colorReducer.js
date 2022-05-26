import {
  FETCH_COLOR_DATA,
  ADD_COLOR_DATA,
} from "../actions/types/productTypes";
const initialState = [];

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLOR_DATA:
      return action.payload;

    case ADD_COLOR_DATA:
      return [action.colorData, ...state];

    default:
      return state;
  }
};
export default colorReducer;
