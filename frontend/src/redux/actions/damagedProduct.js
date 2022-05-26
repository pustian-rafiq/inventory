import axios from "axios";
import { baseUrl } from "../../RestApi/RestApi";
import {
  FETCH_DAMAGED_DATA,
  ADD_DAMAGED_DATA,
  UPDATE_DAMAGE_PRODUCT,
  DELETE_DAMAGE_PRODUCT
} from "./types/damagedProduct";
import { toast } from "react-toastify";

const getDamagedProductLists = (damagedProducts) => ({
  type: FETCH_DAMAGED_DATA,
  payload: damagedProducts,
});

const damageDeleted = () => ({
  type: DELETE_DAMAGE_PRODUCT
});

const damagedProductAdded = () => ({
  type: ADD_DAMAGED_DATA,
});

export const addDamagedProduct = (damagedData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/stocks/damage-product/list/`, damagedData, { headers })
      .then((resp) => {
        //console.log("resp")
        dispatch(damagedProductAdded());
        dispatch(getDamagedProducts(headers));
      })
      .catch((error) => console.log(error));
  };
};

export const getDamagedProducts = (headers) => {
  return function (dispatch) {
    axios
      .get(`${baseUrl}/stocks/damage-product/list/`, { headers })
      .then((resp) => {
        //console.log("resp")
        dispatch(getDamagedProductLists(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const updateDamageHandler = (data, headers, id, onHide) => {
  let newData = { ...data };

  console.log("ND ::",newData)
  newData.productID = parseInt(data.productID);
  newData.quantity = parseInt(data.quantity);
  newData.unit_price = parseFloat(data.unit_price);
  newData.total_price = parseInt(data.total_price);

  console.log("unit price :: ",newData.unit_price);
  console.log("ND 3 ::",newData);

  return function (dispatch) {
    axios
      .put(`${baseUrl}/stocks/damage-product/list/${parseInt(id)}/`, newData, {
        headers,
      })
      .then((resp) => {
        dispatch({
          type: UPDATE_DAMAGE_PRODUCT,
          payload: { newData, id },
        });
        toast.success("damage product is updated...");
        onHide();
      })
      .catch((error) => {
        console.log("data update hocche but error :: ",error);
        toast.error("damage product does not updated...");
      });
  };
};


// Delete damage product

export const delete_damage_product = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/stocks/damage-product/list/${id}/`, { headers })
      .then((resp) => {
  
        dispatch(damageDeleted());
        dispatch(getDamagedProducts(headers));
      })
      .catch((error) => console.log(error));
  };
};

