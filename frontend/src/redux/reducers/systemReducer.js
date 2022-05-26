import {
  ADD_SYSTEM_DATA,
  GET_SYSTEM_DATA,
} from "../actions/types/systemInformation";
const initialState = {
  activeUser: {},
};

const systemReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_SYSTEM_DATA:
      return [payload.systemData.data, ...state];

    case GET_SYSTEM_DATA:
      return { ...state, activeUser: payload.data };

    default:
      return state;
  }
};
export default systemReducer;
