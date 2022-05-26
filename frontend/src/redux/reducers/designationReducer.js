import {
  FETCH_DESIGNATION_DATA,
  ADD_DESIGNATION_DATA,
  UPDATE_DESIGNATION,
  ADD_DESIGNATION_FAIL,
  FETCH_DESIGNATION_DETAILS,
  DELETE_DESIGNATION,
} from "../actions/types/designationTypes";

const initialState = {
  designations: [],
  designation: {},
  loading: true,
};

const designationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_DESIGNATION_DATA:
      return {
        ...state,
        designations: action.designations.data,
        loading: false,
      };

    case ADD_DESIGNATION_DATA:
      return { ...state, designations: [payload, ...state.designations] };

    case FETCH_DESIGNATION_DETAILS:
      return {
        ...state,
        designation: payload,
        loading: false,
      };
    case ADD_DESIGNATION_FAIL:
      return [action.designationData.data, ...state];

    case UPDATE_DESIGNATION:
      const { data, id } = payload;

      const index = state.designations.findIndex((c) => c.id === id);
      const newDesigbationState = [...state.designations];
      newDesigbationState[index].description = data.description;

      return {
        ...state,
        designations: [...newDesigbationState],
      };

    case DELETE_DESIGNATION:
      let dns_afterDelete = state.designations.filter(
        (dsn) => dsn.id !== payload
      );

      return { ...state, designations: [...dns_afterDelete] };

    default:
      return state;
    //break;
  }
};
export default designationReducer;
