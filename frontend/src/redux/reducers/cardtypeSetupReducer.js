import {
  FETCH_CARDTYPE_SETUP_DATA,
  ADD_CARDTYPE_SETUP_DATA,
  UPDATE_CARDTYPE_SETUP_DATA,
  DELETE_CARDTYPE_SETUP,
  FETCH_CARDTYPE_SETUP_DETAILS,
} from "../actions/types/cardtypeSetup";

const initialState = {
  cardtypeSetupLists: [],
  cardtypeSetup: {},
  loading: true,
};

// Card type setup reducer
const cardtypeSetupReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CARDTYPE_SETUP_DATA:
      return {
        ...state,
        cardtypeSetupLists: payload,
        loading: false,
      };

    case ADD_CARDTYPE_SETUP_DATA:
      return {
        ...state,
        cardtypeSetupLists: [payload, ...state.cardtypeSetupLists],
      };

    case UPDATE_CARDTYPE_SETUP_DATA:
      const { data, id } = payload;
      const index = state.cardtypeSetupLists.findIndex((c) => c.id === id);
      const newCardTypeSetupState = [...state.cardtypeSetupLists];
      newCardTypeSetupState[index].code = data.code;
      newCardTypeSetupState[index].bank = data.bank;
      newCardTypeSetupState[index].card_type = data.card_type;
      newCardTypeSetupState[index].percentage = data.percentage;

      return {
        ...state,
        cardtypeSetupLists: [...newCardTypeSetupState],
      };

    case FETCH_CARDTYPE_SETUP_DETAILS:
      return {
        ...state,
        cardtypeSetup: payload,
        loading: false,
      };

    case DELETE_CARDTYPE_SETUP:
      let cts_afterDelete = state.cardtypeSetupLists.filter(
        (card) => card.id !== payload
      );

      return { ...state, cardtypeSetupLists: [...cts_afterDelete] };

    default:
      return state;
  }
};
export default cardtypeSetupReducer;
