import {
  FETCH_CATEGORY_SUCCESS,
  ADD_CATEGORY_DATA,
  FETCH_CATEGORY_DETAILS,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../actions/types/categoryTypes";
const initialState = {
  categories: [],
  category: {},
  loading: true,
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: payload,
        loading: false,
      };

    case UPDATE_CATEGORY:
      const { data, id } = payload;
      const index = state.categories.findIndex((c) => c.id === id);
      const newCategoryState = [...state.categories];
      newCategoryState[index].name = data.name;

      return {
        ...state,
        categories: [...newCategoryState],
      };

    case FETCH_CATEGORY_DETAILS:
      return {
        ...state,
        category: payload.data,
        loading: false,
      };

    case ADD_CATEGORY_DATA:
      return { ...state, categories: [payload, ...state.categories] };

    case DELETE_CATEGORY:
      let c_afterDelete = state.categories.filter(
        (categ) => categ.id !== payload
      );

      return { ...state, categories: [...c_afterDelete] };

    default:
      return state;
    //break;
  }
};
export default categoryReducer;
