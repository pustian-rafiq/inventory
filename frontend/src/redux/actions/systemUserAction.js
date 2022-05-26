import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import { GET_SYSTEM_USER } from "./types/systemUserType";

export const getSystemUser = (headers, setUserName, setUserImage) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/custom-autentication/user-info/`, { headers })
      .then((data) => {
        dispatch({
          type: GET_SYSTEM_USER,
          payload: data,
        });
        setUserName(data.data.name);
        setUserImage(data.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
