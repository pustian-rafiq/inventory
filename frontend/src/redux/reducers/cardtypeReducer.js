import {
  FETCH_CARDTYPE_DATA,
  ADD_CARDTYPE_DATA,
  FETCH_CARDTYPE_DETAILS,
  UPDATE_CARDTYPE_DETAIL
} from "../actions/types/cardtypeSetup";
const initialState ={
  card_types:[],
  card_type_details: {}
};

// Card type setup reducer
const cardtypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDTYPE_DATA:
      return {
        ...state,
        card_types :action.cardTypeName.data,
      }
    case FETCH_CARDTYPE_DETAILS:
      return {
        ...state,
        card_type_details :action.cardType.data,
      }
    case ADD_CARDTYPE_DATA:
      return {
        ...state,
        card_types: [action.payload, ...state.card_types], // state update after adding
      };
    case UPDATE_CARDTYPE_DETAIL:
      const { data, id } = action.payload;

      const index = state.card_types.findIndex((c) => c.id === id);
      const newCardTypeState = [...state.card_types];
      newCardTypeState[index].code = data.code;
      newCardTypeState[index].description = data.description;
      return {
        ...state,
        card_types: [...newCardTypeState],
      };
    break;

    default:
      return state;
  }
};
export default cardtypeReducer;
