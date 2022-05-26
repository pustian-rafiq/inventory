import {
  FETCH_COMPANY_DATA,
  ADD_COMPANY_DATA,
  UPDATE_COMPANY,
  COMPANY_DETAILS,
  DELETE_COMPANY,
} from "../actions/types/companyTypes";
const initialState = {
  companyLists: [],
  company: {},
  loading: true,
};

const companyReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_COMPANY_DATA:
      return {
        ...state,
        companyLists: payload,
        loading: false,
      };

    case ADD_COMPANY_DATA:
      return { ...state, companyLists: [payload, ...state.companyLists] };

    case DELETE_COMPANY:
      let ncs_afterDelete = state.companyLists.filter(
        (comp) => comp.id !== payload.id
      );

      return { ...state, companyLists: [...ncs_afterDelete] };

    case COMPANY_DETAILS:
      return {
        ...state,
        company: payload,
        loading: false,
      };

    case UPDATE_COMPANY:
      const { data, id } = payload;

      const index = state.companyLists.findIndex((c) => c.id === id);
      const newCompanyState = [...state.companyLists];
      newCompanyState[index].name = data.name;

      return {
        ...state,
        companyLists: [...newCompanyState],
      };

    default:
      return state;
    //break;
  }
};
export default companyReducer;
