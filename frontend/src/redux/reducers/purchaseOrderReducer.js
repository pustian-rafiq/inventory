/* eslint-disable no-fallthrough */
import {
  FETCH_PURCHASE_ORDER_DATA,
  ADD_PURCHASE_ORDER_DATA,
  ADD_PURCHASE_ORDER_FAIL,
  DELETE_PURCHASE_ORDER,
  UPDATE_PURCHASE_ORDER_DATA,
} from "../actions/types/purchaseOrder";

const initialState = [];

const purchaseOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PURCHASE_ORDER_DATA:
      return payload.data;

    case ADD_PURCHASE_ORDER_DATA:
      return [payload, ...state];

    case UPDATE_PURCHASE_ORDER_DATA:
      const targetPurchase = state.findIndex((p) => p.id === payload.id);

      const purchaseUpdateState = [...state];
      purchaseUpdateState[targetPurchase].net_total = payload.data.net_total;
      purchaseUpdateState[targetPurchase].pay_amount = payload.data.pay_amount;
      purchaseUpdateState[targetPurchase].payment_due =
        payload.data.payment_due;

      return [...purchaseUpdateState];

    case DELETE_PURCHASE_ORDER:
      let pso_afterDelete = state.filter((pso) => pso.id !== payload);

      return [...pso_afterDelete];

    case ADD_PURCHASE_ORDER_FAIL:
    default:
      return state;
  }
};
export default purchaseOrderReducer;
