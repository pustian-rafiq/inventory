import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
//const API_URL = "myshop2.localhost:8000/custom-autentication/users/login/";
const API_URL = `${baseUrl}/custom-autentication/users/login/`;
// const API_URL = "http://localhost:8000/custom-autentication/users/login/";
class AuthService {
  login(email, password) {
    return axios.post(API_URL, { email, password }).then((response) => {
      // console.log(API_URL1)

      if (response.data.accessToken) {
        //console.log("user Token")
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
