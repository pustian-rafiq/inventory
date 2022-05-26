import { FETCH_SHARE_INVESTMENT_DATA } from "../actions/types/shareInvestmentHead";
const initialState = [];

const shareInvestmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHARE_INVESTMENT_DATA:
      return action.shareInvestment.data;
      

    default:
      return state;
 
  }
};
export default shareInvestmentReducer;
