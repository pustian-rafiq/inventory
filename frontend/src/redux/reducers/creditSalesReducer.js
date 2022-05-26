import {
  UPDATE_CREDIT_SALES,
  ADD_CREDITSALES_DATA,
  FETCH_CREDIT_SALES,
  FETCH_CREDIT_SALES_DETAILS,
  FETCH_CREDIT_SALES_CUSTOMER,
  UPDATE_INTEREST_AMOUNT,
} from "../actions/types/creditSales";

const initialState = {
  creditsales_list: [],
  creditsales_details: {},
  creditsales_customer_list: [],
  loading: true,
};

const creditSalesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CREDIT_SALES:
      return {
        ...state,
        creditsales_list: action.creditSalesData.data,
        loading: false,
      };
    //break;
    case FETCH_CREDIT_SALES_DETAILS:
      return {
        ...state,
        creditsales_details: action.creditSalesDetails.data,
        loading: false,
      };

    case ADD_CREDITSALES_DATA:
      return {
        ...state,
        creditsales_list: [action.payload, ...state.creditsales_list],
      };

    case UPDATE_CREDIT_SALES:
    case UPDATE_INTEREST_AMOUNT:
    case FETCH_CREDIT_SALES_CUSTOMER:
      return {
        ...state,
        creditsales_customer_list: action.creditSaleCustomerData.data,
        loading: false,
      };
    default:
      return state;
    //break;
  }
};
export default creditSalesReducer;
