import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8000/accounts/users/login/";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
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

//   getPublicContent,
//   getUserBoard,
//   getModeratorBoard,
//   getAdminBoard,
// }