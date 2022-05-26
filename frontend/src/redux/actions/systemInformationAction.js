import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import { ADD_SYSTEM_DATA, GET_SYSTEM_DATA } from "./types/systemInformation";
//import { baseUrl } from "../../RestApi/RestApi";

export const addSystemData = (systemData, headers) => {
  return (dispatch, getState) => {
    //  console.log(headers)  axios.get(`${baseUrl}/bank/list`,{headers})
    axios
      .post(`${baseUrl}/basics/sysinfo/`, systemData, { headers })
      .then((systemData) => {
        dispatch({
          type: ADD_SYSTEM_DATA,
          systemData,
        });
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
};

export const getSystemData = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/basics/my-sys-info/`, { headers })
      .then((data) => {
        dispatch({
          type: GET_SYSTEM_DATA,
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
