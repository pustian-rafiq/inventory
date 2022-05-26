import {FETCH_SHARE_INVESTMENT_HEAD, ADD_SHARE_INVESTMENT_HEAD } from "../actions/types/shareInvestmentHead";
const initialState = [];

const shareInvestmentHeadReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHARE_INVESTMENT_HEAD:
      return action.shareInvestment.data;
      
    case ADD_SHARE_INVESTMENT_HEAD:
        return [action.shareInvestment.data, ...state]

    default:
      return state;
 
  }
};
export default shareInvestmentHeadReducer;
