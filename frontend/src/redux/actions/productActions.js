import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import {
  FETCH_PRODUCT_DATA,
  ADD_PRODUCT_DATA,
  UPDATE_PRODUCT_DATA,
  FETCH_COLOR_DATA,
  ADD_COLOR_DATA,
  FETCH_PURCHASE_PRODUCT_DATA,
  FETCH_SALES_PRODUCT_DATA,
  DELETE_PRODUCT,
  FETCH_PRODUCT_SHORTAGE,
  FETCH_PROUDCT_LIST,
  FETCH_PRODUCT_DATA_WITH_QR_BAR_CODE,
} from "./types/productTypes";
import { toast } from "react-toastify";
import swal from "sweetalert";

//fetch all product lists
export const getProductLists = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/products/product/show/`, { headers })
      .then((products) => {
        dispatch({
          type: FETCH_PRODUCT_DATA,
          payload: products,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// fetch all products with Qr and Bar code s
export const getProductListsWithQrBarCode = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/stocks/stock-detail/show/`, { headers })
      .then((res) => {
        dispatch({
          type: FETCH_PRODUCT_DATA_WITH_QR_BAR_CODE,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};




//add product data
export const addProductData = (formData, headers) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/products/product/create/`, formData, { headers })
      .then((res) => {
        toast.success("product added successfully");
        dispatch({
          type: ADD_PRODUCT_DATA,
          payload: formData,
        });
      })
      .catch((error) => {
        console.log("Product Add Error", error);
      });
  };
};

//update product data
export const updateProductData = (formData, headers, onHide, id) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/products/product/list/${id}/`, formData, { headers })
      .then((res) => {
        toast.success("product updated successfully");
        dispatch({
          type: UPDATE_PRODUCT_DATA,
          payload: { formData, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("product does not updated");
      });
  };
};

// Get all colors information
export const getColorLists = (headers) => {
  return (dispatch) => {
    //  console.log(headers)  axios.get(`${baseUrl}/bank/list`,{headers})
    axios
      .get(`${baseUrl}/models/colorlist/`, { headers })
      .then((res) => {
        dispatch({
          type: FETCH_COLOR_DATA,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Add new color
export const addColor = (colorData, headers) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/models/colorlist/`, colorData, { headers })
      .then((res) => {
        dispatch({
          type: ADD_COLOR_DATA,
          colorData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// get product of a particular supplier
export const getProductListsById = (id, headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/suppliers/supplier-purchase-product-report/${id}/`, {
        headers,
      })
      .then((products) => {
        dispatch({
          type: FETCH_PURCHASE_PRODUCT_DATA,
          payload: products,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// get product of a particular customer
export const getProductListsByCustomerId = (id, headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/customers/customer-sales-product-report/${id}/`, {
        headers,
      })
      .then((products) => {
        dispatch({
          type: FETCH_SALES_PRODUCT_DATA,
          payload: products,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Delete product
export const deleteProduct = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/products/product/list/${id}/`, { headers })
      .then((resp) => {
        dispatch({
          type: DELETE_PRODUCT,
          payload: id,
        });
        swal("Product Deleted successfully!", {
          icon: "success",
        });
      })
      .catch((error) => console.log(error));
  };
};

//GET PRODUCT SHORTAGE LIST
export const getProductShortageList = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/stocks/product-shortage/`, { headers })
      .then((shortageProduct) => {
        dispatch({
          type: FETCH_PRODUCT_SHORTAGE,
          payload: shortageProduct,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// get product list for select data using double click
export const getProductListByDoubleClick = (id, headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/products/product/list/${id}/`, {
        headers,
      })
      .then((products) => {
        dispatch({
          type: FETCH_PROUDCT_LIST,
          payload: products,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
