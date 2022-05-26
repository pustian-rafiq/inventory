import {
  FETCH_SUPPLIER_DATA,
  DELETE_SUPPLIER_DATA,
  ADD_SUPPLIER_DATA,
  UPDATE_SUPPLIER_DATA,
} from "../actions/types/supplierTypes";

const initialState = [];

const supplierReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUPPLIER_DATA:
      return action.payload.data;

    case ADD_SUPPLIER_DATA:
      const data = {};

      for (let key of action.payload.keys()) {
        data[key] = action.payload.get(key);
      }

      console.log("data in supplier reducer ::", data);

      return [data, ...state];

    case UPDATE_SUPPLIER_DATA:
      const { newData, id } = action.payload;
      const index = state.findIndex((c) => c.id === id);
      const newSupplierState = [...state];
      newSupplierState[index].name = newData.name;
      newSupplierState[index].address = newData.address;
      newSupplierState[index].contact_no = newData.contact_no;

      return [...newSupplierState];

    case DELETE_SUPPLIER_DATA:
      const newSupState = state.filter((sup) => sup.id !== action.payload);
      return [...newSupState];

    default:
      return state;
    //break;
  }
};
export default supplierReducer;
