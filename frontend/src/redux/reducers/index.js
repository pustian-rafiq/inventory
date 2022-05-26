import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import systemInformation from "./systemReducer";
import categoryReducer from "./categoryReducer";
import bankReducer from "./bankReducer";
import customerReducer from "./customerReducer";
import designationReducer from "./designationReducer";
import companyReducer from "./companyReducer";
import productReducer from "./productReducer";
import cardtypeSetupReducer from "./cardtypeSetupReducer";
import employeeReducer from "./employeeReducer";
import supplierReducer from "./supplierReducer";
import purchaseOrderReducer from "./purchaseOrderReducer";
import cardtypeReducer from "./cardtypeReducer";
import colorReducer from "./colorReducer";
import cashCollection from "./cashCollection";
import salesOrderReducer from "./salesOrderReducer";
import bankTransactionReducer from "./bankTransaction";
import purchaseStockReducer from "./purchaseStockReducer";
import expenseReducer from "./expenseReducer";
import expenseIncomeReducer from "./expenseIncomeReducer";
import shareInvestmentHeadReducer from "./shareInvestmentHead";
import shareInvestmentReducer from "./shareInvesment";
import damagedProductReducer from "./damagedProduct";
import incomeReducer from "./incomeReducer";
import cashDelivery from "./cashDelivery";
import purchaseReturnReducer from "./purchaseReturn";
import salesReturnReducer from "./salesReturn";
import reportsReducers from "./reportsReducers";
import creditSalesReducer from "./creditSalesReducer";
import stockReducer from "./stockReducer";
import systemUserReducer from "./systemUserReducer";

export default combineReducers({
  auth,
  message,
  systeminformation: systemInformation,
  categories: categoryReducer,
  banks: bankReducer,
  customers: customerReducer,
  designations: designationReducer,
  companies: companyReducer,
  products: productReducer,
  cardtypesetup: cardtypeSetupReducer,
  employees: employeeReducer,
  suppliers: supplierReducer,
  purchaseorders: purchaseOrderReducer,
  cardtypes: cardtypeReducer,
  colors: colorReducer,
  cashcollections: cashCollection,
  cashdelivery: cashDelivery,
  salesorders: salesOrderReducer,
  banktransactions: bankTransactionReducer,
  purchasestocks: purchaseStockReducer,
  expenselists: expenseReducer,
  incomelists: incomeReducer,
  expenseIncomelists: expenseIncomeReducer,
  shareInvestmentHead: shareInvestmentHeadReducer,
  shareInvestment: shareInvestmentReducer,
  damagedProducts: damagedProductReducer,
  purchasereturnLists: purchaseReturnReducer,
  salesreturnLists: salesReturnReducer,
  reports: reportsReducers,
  creditsales: creditSalesReducer,
  stocks: stockReducer,
  systemUser: systemUserReducer,
});
