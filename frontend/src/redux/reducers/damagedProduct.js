/* eslint-disable no-fallthrough */
import {
  ADD_DAMAGED_DATA,
  DELETE_DAMAGE_PRODUCT,
  FETCH_DAMAGED_DATA,
  UPDATE_DAMAGE_PRODUCT,
} from "../actions/types/damagedProduct";
const initialState = {
  damagedProducts: [],
  damagedProduct: {},
  loading: true,
};

const damagedProductReducer = (state = initialState, action) => {
  switch (action.type) {
    // case FETCH_CATEGORY_SUCCESS:
    //   return {
    //     ...state,
    //     categories: action.payload,
    //     loading:false

    //   }
    // case UPDATE_CATEGORY:
    //   return {
    //     ...state,
    //     loading: false
    //   };

    case FETCH_DAMAGED_DATA:
      return {
        ...state,
        damagedProducts: action.payload,
        loading: false,
      };

    case UPDATE_DAMAGE_PRODUCT:
      const { newData, id } = action.payload;

      const index = state.damagedProducts.findIndex((c) => c.id === id);
      const newDamageState = [...state.damagedProducts];
      newDamageState[index].unit_price = newData.unit_price;
      newDamageState[index].total_price = newData.total_price;
      newDamageState[index].quantity = newData.quantity;

      return {
        ...state,
        damagedProducts: [...newDamageState],
      };

    case ADD_DAMAGED_DATA:

    case DELETE_DAMAGE_PRODUCT:

    default:
      return state;
    //break;
  }
};
export default damagedProductReducer;
