import {
  FETCH_PURCHASE_ORDER_DATA,
  ADD_PURCHASE_ORDER_DATA,
  ADD_PURCHASE_ORDER_FAIL,
  FETCH_PURCHASE_STOCK_DATA,
  ADD_PURCHASE_STOCK_DATA,
  DELETE_PURCHASE_ORDER,
  UPDATE_PURCHASE_ORDER_DATA,
} from "./types/purchaseOrder";
import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import { toast } from "react-toastify";
import swal from "sweetalert";

// get purchase orders
export const getPurchaseOrderLists = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/orders/purchase-order/`, { headers })
      .then((purchaseOrders) => {
        dispatch({
          type: FETCH_PURCHASE_ORDER_DATA,
          payload: purchaseOrders,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addPurchaseOrder = (purchaseOrderData, headers, onHide) => {
  console.log("purchaseOrderData in action :::", purchaseOrderData);

  return (dispatch) => {
    axios
      .post(`${baseUrl}/orders/purchase-order/`, purchaseOrderData, {
        headers,
      })
      .then((res) => {
        dispatch({
          type: ADD_PURCHASE_ORDER_DATA,
          payload: purchaseOrderData,
        });
        toast.success("Purchase Order added successfully");
        onHide();
      })
      .catch((error) => {
        dispatch({
          type: ADD_PURCHASE_ORDER_FAIL,
          purchaseOrderData,
        });
        console.log(error);
      });
  };
};

// Purchase stock action here
export const getPurchaseStockLists = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/stocks/stock-detail/list/`, { headers })
      .then((purchaseStocks) => {
        dispatch({
          type: FETCH_PURCHASE_STOCK_DATA,
          purchaseStocks,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Update Purchase stock action here
export const addPurchaseStockLists = (data) => {
  return (dispatch) => {
    console.log("data in addPurchaseStockLists ::: ", data);
    dispatch({ type: ADD_PURCHASE_STOCK_DATA, payload: data });
  };
};

//  update purchase
export const updatePurchase = (data, headers, id, onHide) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/orders/update/${id}/`, data, { headers })
      .then((res) => {
        dispatch({
          type: UPDATE_PURCHASE_ORDER_DATA,
          payload: { data, id },
        });
        toast.success("purchase order updated successfully");
        onHide();
      })
      .catch((error) => {
        toast.error("purchase order does not updated");
      });
  };
};

// Delete purchase order
export const deletePurchaseOrder = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/orders/purchase-order/${id}/`, { headers })
      .then((res) => {
        dispatch({
          type: DELETE_PURCHASE_ORDER,
          payload: id,
        });
        swal(`Purchase Ordere Deleted successfully`, {
          icon: "success",
        });
      })
      .catch((error) => console.log(error));
  };
};
