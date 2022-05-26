import { GET_SYSTEM_USER } from "../actions/types/systemUserType";

const initialState = {
  systemUser: {},
};

const systemUserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SYSTEM_USER:
      return { ...state, systemUser: payload.data };

    default:
      return state;
  }
};
export default systemUserReducer;
