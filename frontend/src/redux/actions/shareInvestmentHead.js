import axios from "axios";

 import { FETCH_SHARE_INVESTMENT_HEAD, ADD_SHARE_INVESTMENT_HEAD, FETCH_SHARE_INVESTMENT_DATA} from "./types/shareInvestmentHead";
import { baseUrl } from "../../RestApi/RestApi";


export const addBankData = (bankData,headers) => {
    return (dispatch, getState) => {
      //  console.log(headers)  axios.get(`${baseUrl}/bank/list`,{headers})
      axios
        .post(`${baseUrl}/bank/create/`, bankData, {headers} )
        .then((bankData) => {
          dispatch({
            type: ADD_SHARE_INVESTMENT_HEAD,
            bankData,
          });
        })
        .catch((error) => {
          console.log(error.data);
        });
    };
  };


export const getShareInvestmentHeadLists = (headers) => {
  return (dispatch) => {
    //  console.log(headers)  axios.get(`${baseUrl}/bank/list`,{headers})
    axios
      .get(`${baseUrl}/shareinvestments/head/list/`, { headers })
      .then((shareInvestment) => {
        dispatch({
          type: FETCH_SHARE_INVESTMENT_HEAD,
          shareInvestment,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
// Share investment data
export const getShareInvestmentLists = (headers) => {
  return (dispatch) => {
    //  console.log(headers)  axios.get(`${baseUrl}/bank/list`,{headers})
    axios
      .get(`${baseUrl}/shareinvestments/list/`, { headers })
      .then((shareInvestment) => {
        dispatch({
          type: FETCH_SHARE_INVESTMENT_DATA,
          shareInvestment,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

 