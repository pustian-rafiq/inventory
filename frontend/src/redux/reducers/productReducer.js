import {
  FETCH_PRODUCT_DATA,
  ADD_PRODUCT_DATA,
  UPDATE_PRODUCT_DATA,
  FETCH_PURCHASE_PRODUCT_DATA,
  FETCH_SALES_PRODUCT_DATA,
  DELETE_PRODUCT,
  FETCH_PRODUCT_SHORTAGE,
  FETCH_PROUDCT_LIST,
  FETCH_PRODUCT_DATA_WITH_QR_BAR_CODE,
} from "../actions/types/productTypes";

const initialState = {
  products: [],
  product: {},
  purchaseProducts: [],
  salesProducts: [],
  shortageProducts: [],
  product_list: [],
  product_list_with_qr_bar_code: [],
  loading: true,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PRODUCT_DATA:
      return {
        ...state,
        products: payload.data,
        loading: false,
      };

    case FETCH_PRODUCT_DATA_WITH_QR_BAR_CODE:
      return {
        ...state,
        product_list_with_qr_bar_code: payload,
      };

    case UPDATE_PRODUCT_DATA:
      let dt = {};
      const { formData, id } = payload;

      for (let key of formData.keys()) {
        dt[key] = formData.get(key);
      }

      const index = state.products.findIndex((p) => p.id === id);
      const newProductsState = [...state.products];
      newProductsState[index].name = dt.name;
      newProductsState[index].code = dt.code;
      newProductsState[index].category = dt.categ_name;
      newProductsState[index].company = dt.com_name;

      return {
        ...state,
        products: [...newProductsState],
      };

    case ADD_PRODUCT_DATA:
      let addData = {};

      for (let key of action.payload.keys()) {
        addData[key] = action.payload.get(key);
      }

      const addProductState = [
        {
          code: addData.code,
          name: addData.name,
          category: addData.comp_name,
          company: addData.categ_name,
        },
        ...state.products,
      ];

      return {
        ...state,
        products: [...addProductState],
      };

    case DELETE_PRODUCT:
      let productsAfterDelete = state.products.filter(
        (product) => product.id !== payload
      );

      return {
        ...state,
        products: productsAfterDelete,
      };

    case FETCH_PURCHASE_PRODUCT_DATA:
      return {
        ...state,
        purchaseProducts: payload.data,
        loading: false,
      };

    case FETCH_SALES_PRODUCT_DATA:
      return {
        ...state,
        salesProducts: payload.data,
        loading: false,
      };

    case FETCH_PRODUCT_SHORTAGE:
      return {
        ...state,
        shortageProducts: payload.data,
        loading: false,
      };
    case FETCH_PROUDCT_LIST:
      return {
        ...state,
        product_list: payload.data,
        loading: false,
      };
    default:
      return state;
  }
};

export default productReducer;
