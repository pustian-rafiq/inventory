import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { baseUrl } from "../../RestApi/RestApi";
import {
  FETCH_CARDTYPE_SETUP_DATA,
  ADD_CARDTYPE_SETUP_DATA,
  FETCH_CARDTYPE_DATA,
  DELETE_CARDTYPE_SETUP,
  FETCH_CARDTYPE_SETUP_DETAILS,
  UPDATE_CARDTYPE_SETUP_DATA,
  ADD_CARDTYPE_DATA,
  FETCH_CARDTYPE_DETAILS,
  UPDATE_CARDTYPE_DETAIL
} from "./types/cardtypeSetup";

const getCardtypeSetups = (cardType) => ({
  type: FETCH_CARDTYPE_SETUP_DATA,
  payload: cardType,
});

const getCardTypeSetup = (cardType) => ({
  type: FETCH_CARDTYPE_SETUP_DETAILS,
  payload: cardType,
});

// Fetch all card type setup lists
export const getCardTypeSetupLists = (headers) => {
  return function (dispatch) {
    axios
      .get(`${baseUrl}/bank/card-type-setup/list/`, { headers })
      .then((resp) => {
        dispatch(getCardtypeSetups(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// Added card type setup data
export const addCardTypeSetUpData = (cardTypeData, headers) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/bank/card-type-setup/create/`, cardTypeData, {
        headers,
      })
      .then((res) => {
        toast.success("Card type added successfully");
        dispatch({
          type: ADD_CARDTYPE_SETUP_DATA,
          payload: cardTypeData,
        });
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
};

// Fetch cardtype setup details
export const getCardTypeSetupDetails = (id, headers) => {
  return function (dispatch) {
    axios
      .get(`${baseUrl}/bank/card-type-setup/list/${id}/`, { headers })
      .then((resp) => {
        dispatch(getCardTypeSetup(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// Delete cardtype setup
export const deleteCardtypeSetup = (id, headers) => {
  return function (dispatch) {
    axios
      .delete(`${baseUrl}/bank/card-type-setup/delete/${id}/`, { headers })
      .then((res) => {
        swal("Cardtype Setup Deleted successfully", {
          icon: "success",
        });
        dispatch({
          type: DELETE_CARDTYPE_SETUP,
          payload: id,
        });
      })
      .catch((error) => console.log(error));
  };
};



// update card type setup
export const updateCartTypeSetup = (data, headers, id, onHide) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/bank/card-type-setup/update/${id}/`, data, { headers })
      .then((res) => {
        toast.success("Card Type updated successfully");
        dispatch({
          type: UPDATE_CARDTYPE_SETUP_DATA,
          payload: { data, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("Card Type does not updated");
      });
  };
};


// Card type action start here
// Add Card type data 
export const addCardTypeData = (cardTypeData, headers) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/bank/card-type/create/`, cardTypeData, {
        headers,
      })
      .then((res) => {
        toast.success("Card type added successfully");
        dispatch({
          type: ADD_CARDTYPE_DATA,
          payload: cardTypeData,
        });
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
};

// Get Card type list
export const getCardTypeLists = (headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/bank/card-type/list/`, { headers })
      .then((cardTypeName) => {
        dispatch({
          type: FETCH_CARDTYPE_DATA,
          cardTypeName,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// Get Card type details
export const getCardTypeDetails = (id,headers) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/bank/card-type/list/${id}/`, { headers })
      .then((cardType) => {
        dispatch({
          type: FETCH_CARDTYPE_DETAILS,
          cardType,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// update card type
export const updateCartType = (id,data, headers, onHide) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/bank/card-type/update/${id}/`, data, { headers })
      .then((res) => {
        toast.success("Card Type updated successfully");
        dispatch({
          type: UPDATE_CARDTYPE_DETAIL,
          payload: { data, id },
        });
        onHide();
      })
      .catch((error) => {
        toast.error("Card Type does not updated");
      });
  };
};
