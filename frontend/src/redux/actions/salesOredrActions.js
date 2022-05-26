import {
  FETCH_ORDER_DATA,
  ADD_ORDER_DATA,
  ADD_ORDER_FAIL,
  DELETE_ORDER,
  FETCH_SALES_ORDER_DETAILS,
  SALES_RECEIPT,
  SALES_PRODUCT_DETAILS,
} from "./types/salesOrder";
import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import { toast } from "react-toastify";
import swal from "sweetalert";

export const getOrderLists = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/sales/sales-order/list/`, { headers })
      .then((ordersData) => {
        dispatch({
          type: FETCH_ORDER_DATA,
          ordersData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addSalesOrder = (
  orderData,
  headers,
  onHide,
  salesReceiptHandler,
  systemInfo
) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/sales/sales-order/list/`, orderData, { headers })
      .then((res) => {
        toast.success("Sales Order added successfully");
        orderData.systemInfo = systemInfo;
        dispatch({
          type: SALES_RECEIPT,
          payload: orderData,
        });

        onHide();
        salesReceiptHandler();
        dispatch({
          type: ADD_ORDER_DATA,
          payload: orderData,
        });
      })
      .catch((error) => {
        console.log("Sales order does not added :::", error);
        toast.error("Sales Order does not added");
      });
  };
};

//  update Sale Order
export const updateSale = (data, headers, id, onHide) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/expense/income-list/${id}/`, data, { headers })
      .then((res) => {
        toast.success("cashcollection updated successfully");
        onHide();
      })
      .catch((error) => {
        toast.error("cashcollection does not updated");
      });
  };
};

// Delete Sales Order
export const deleteSalesOrder = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/sales/sales-order/list/${id}/`, { headers })
      .then((res) => {
        dispatch({
          type: DELETE_ORDER,
          payload: id,
        });
        swal(`Sales Order Deleted successfully`, {
          icon: "success",
        });
      })
      .catch((error) => console.log(error));
  };
};

// Get sales order details using particular id
export const getSalesOrderDetails = (id, headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/sales/sales-order/update/${id}/`, { headers })
      .then((salesOrderDetails) => {
        // console.log(creditSalesDetails)
        dispatch({
          type: FETCH_SALES_ORDER_DETAILS,
          salesOrderDetails,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Get product details after scanning bar/qr code
export const getSalesProductDetails = (id, headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/stocks/stock-detail/code/${id}/`, { headers })
      .then((salesProductDetails) => {
        dispatch({
          type: SALES_PRODUCT_DETAILS,
          salesProductDetails,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
