import axios from "axios";

import { baseUrl } from "../../RestApi/RestApi";
import { FETCH_STOCK_PRODUCT } from "./types/stockType";

export const getStockProducts = (headers) => {
  return (dispatch) => {
    //  console.log(headers)  axios.get(`${baseUrl}/bank/list`,{headers})
    axios
      .get(`${baseUrl}/stocks/stock-detail/list/`, { headers })
      .then((stockProducts) => {
        dispatch({
          type: FETCH_STOCK_PRODUCT,
          payload: stockProducts,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
