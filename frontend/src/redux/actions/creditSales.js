import {
  ADD_CREDITSALES_DATA,
  FETCH_CREDIT_SALES,
  FETCH_CREDIT_SALES_CUSTOMER,
  FETCH_CREDIT_SALES_DETAILS,
  UPDATE_CREDIT_SALES,
  UPDATE_INTEREST_AMOUNT,
} from "./types/creditSales";
import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import { toast } from "react-toastify";

export const getCreditSales = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/creditsales/list-show/`, { headers })
      .then((creditSalesData) => {
        dispatch({
          type: FETCH_CREDIT_SALES,
          creditSalesData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Get credit sales details using particular id
export const getCreditSalesDetails = (id, headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/creditsales/creditsalelist/${id}/`, { headers })
      .then((creditSalesDetails) => {
        // console.log(creditSalesDetails)
        dispatch({
          type: FETCH_CREDIT_SALES_DETAILS,
          creditSalesDetails,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Get credit sales details using interest amount
export const updateInterestAmount = (creditSalesDetails, headers, id) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/creditsales/creditsalelist/${id}/`, creditSalesDetails, {
        headers,
      })
      .then((creditSalesDetails) => {
        // console.log(creditSalesDetails)
        dispatch({
          type: UPDATE_INTEREST_AMOUNT,
          creditSalesDetails,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCreditSales = (creditSalesData, headers, onHide) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/creditsales/creditsalelist/`, creditSalesData, {
        headers,
      })
      .then((res) => {
        dispatch({
          type: ADD_CREDITSALES_DATA,
          payload: creditSalesData,
        });
        toast.success("Credit sales product added successfully");
        onHide();
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const editCreditSales = (creditSalesData, headers, id) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/creditsales/update/${id}/`, creditSalesData, { headers })
      .then((creditSalesData) => {
        toast.success("Credit Sales updated successfully");
        dispatch({
          type: UPDATE_CREDIT_SALES,
          creditSalesData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//GET CREDIT SALE CUSTOMER
export const getCreditSaleCustomer = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/creditsales/credit-sale-customers/`, { headers })
      .then((creditSaleCustomerData) => {
        dispatch({
          type: FETCH_CREDIT_SALES_CUSTOMER,
          creditSaleCustomerData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
