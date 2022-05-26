import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8000/products/category/list/";

export const getCategories = () => {
     alert("response")
  return axios.post(API_URL).then((response)=>{
      alert(response)
      return response.data;
  });
};

export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

// export default {
//   getCategories,
//   getUserBoard,
//   getModeratorBoard,
//   getAdminBoard,
// };