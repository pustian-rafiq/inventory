import axios from "axios";
import {
  FETCH_CUSTOMER_WISE_SALES,
  FETCH_MONTHLY_SALES,
  FETCH_DAILY_SALES,
  FETCH_YEARLY_SALES,
  FETCH_DAILY_PURCHASE,
  FETCH_MONTHLY_PURCHASE,
  FETCH_YEARLY_PURCHASE,
  FETCH_EXPENDITURE_REPORTS,
  FETCH_AVAILABLE_STOCK,
  FETCH_SUPPLIER_WISE_PURCHASE,
  FETCH_SUMMARY_REPORTS,
  FETCH_CUSTOMER_DUE,
  FETCH_SUPPLIER_DUE,
  FETCH_SUPPLIER_LEDGER,
  FETCH_DAMAGE_PRODUCTS,
  FETCH_CASH_RECEIVE_AND_DELIVERY_REPORT,
  FETCH_PRODUCT_SALE_PUR,
  FETCH_COMPANY_BENEFIT_BY_PRODUCT,
  FETCH_CUSTOMER_RETURN,
  FETCH_CUSTOMER_LEDGER,
  FETCH_UPCOMMING_INSTALLMENT,
  FETCH_INSTALLMENT_COLLECTION,
  FETCH_DEFAULTING_CUSTOMER,
  FETCH_BANK_LEDGER,
  FETCH_CUSTOMER_BENEFIT,
  FETCH_CASH_IN_HAND,
  FETCH_PROFIT_LOSS,
} from "./types/reports";
import { baseUrl } from "../../RestApi/RestApi";

const getDailySales = (data) => ({
  type: FETCH_DAILY_SALES,
  payload: data.data,
});
const getMonthlySales = (data) => ({
  type: FETCH_MONTHLY_SALES,
  payload: data.data,
});
const getYearlySales = (data) => ({
  type: FETCH_YEARLY_SALES,
  payload: data.data,
});
const getDailyPurchase = (data) => ({
  type: FETCH_DAILY_PURCHASE,
  payload: data.data,
});
const getMonthlyPurchase = (data) => ({
  type: FETCH_MONTHLY_PURCHASE,
  payload: data.data,
});
const getYearlyPurchase = (data) => ({
  type: FETCH_YEARLY_PURCHASE,
  payload: data.data,
});
const getExpenditure = (data) => ({
  type: FETCH_EXPENDITURE_REPORTS,
  payload: data.data,
});
const getAvailableStock = (data) => ({
  type: FETCH_AVAILABLE_STOCK,
  payload: data.data,
});
const getSupplierWiseReport = (data) => ({
  type: FETCH_SUPPLIER_WISE_PURCHASE,
  payload: data.data,
});
const getCustomerWiseReport = (data) => ({
  type: FETCH_CUSTOMER_WISE_SALES,
  payload: data.data,
});
const getSummary = (data) => ({
  type: FETCH_SUMMARY_REPORTS,
  payload: data.data,
});
const getSupplierDue = (data) => ({
  type: FETCH_SUPPLIER_DUE,
  payload: data.data,
});
const getCustomerDue = (data) => ({
  type: FETCH_CUSTOMER_DUE,
  payload: data.data,
});
const getSupplierLedger = (data) => ({
  type: FETCH_SUPPLIER_LEDGER,
  payload: data.data,
});
const getDamageProducts = (data) => ({
  type: FETCH_DAMAGE_PRODUCTS,
  payload: data.data,
});
const getCashReceiveDelivery = (data) => ({
  type: FETCH_CASH_RECEIVE_AND_DELIVERY_REPORT,
  payload: data.data,
});
const getProductSalePur = (data) => ({
  type: FETCH_PRODUCT_SALE_PUR,
  payload: data.data,
});
const getCompanyBenefit = (data) => ({
  type: FETCH_COMPANY_BENEFIT_BY_PRODUCT,
  payload: data.data,
});
const getCustomerReturn = (data) => ({
  type: FETCH_CUSTOMER_RETURN,
  payload: data.data,
});
const getCustomerLedger = (data) => ({
  type: FETCH_CUSTOMER_LEDGER,
  payload: data.data,
});
const getUpcommingInstallment = (data) => ({
  type: FETCH_UPCOMMING_INSTALLMENT,
  payload: data.data,
});
const getInstallmentCollection = (data) => ({
  type: FETCH_INSTALLMENT_COLLECTION,
  payload: data.data,
});
const getDefaultingCustomer = (data) => ({
  type: FETCH_DEFAULTING_CUSTOMER,
  payload: data.data,
});
const getBankLedger = (data) => ({
  type: FETCH_BANK_LEDGER,
  payload: data.data,
});
const getCustomerBenefit = (data) => ({
  type: FETCH_CUSTOMER_BENEFIT,
  payload: data.data,
});
const getCashInHand = (data) => ({
  type: FETCH_CASH_IN_HAND,
  payload: data.data,
});
const getProfitLoss = (data) => ({
  type: FETCH_PROFIT_LOSS,
  payload: data.data,
});

// Fetch Daily sale reports
export const getDailySalesReport = (dailyData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/daily-sales/`, dailyData, { headers })
      .then((resp) => {
        dispatch(getDailySales(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch monthly sale reports
export const getMonthlySalesReport = (monthlyData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/monthly-sales/`, monthlyData, { headers })
      .then((resp) => {
        dispatch(getMonthlySales(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch yearly sale reports
export const getYearlySalesReport = (yearlyData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/yearly-sales/`, yearlyData, { headers })
      .then((resp) => {
        dispatch(getYearlySales(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch Daily purchase reports
export const getDailyPurchaseReport = (dailyData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/daily-purchase/`, dailyData, { headers })
      .then((resp) => {
        dispatch(getDailyPurchase(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch monthly purchase reports
export const getMonthlyPurchaseReport = (monthlyData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/monthly-purchase/`, monthlyData, { headers })
      .then((resp) => {
        dispatch(getMonthlyPurchase(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch monthly purchase reports
export const getYearlyPurchaseReport = (yearlyData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/yearly-purchase/`, yearlyData, { headers })
      .then((resp) => {
        dispatch(getYearlyPurchase(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch expenditure reports
export const getExpenditureReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/expenditure-report/`, Data, { headers })
      .then((resp) => {
        dispatch(getExpenditure(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch available stock reports
export const getAvailableStockReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/stock-report/`, Data, { headers })
      .then((resp) => {
        dispatch(getAvailableStock(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch suppllierwise purchase reports
export const getSupplierwisePurchase = (supplierData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/per-supplier/`, supplierData, { headers })
      .then((resp) => {
        dispatch(getSupplierWiseReport(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch customereise sale reports
export const getCustomerwiseSales = (customerData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/per-customer/`, customerData, { headers })
      .then((resp) => {
        dispatch(getCustomerWiseReport(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch customereise sale reports
export const getSummaryReport = (summaryData, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/summary-report/`, summaryData, { headers })
      .then((resp) => {
        dispatch(getSummary(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch supplier due reports
export const getSupplierDueReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/suppliers/supplier-due-report/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getSupplierDue(resp));
      })
      .catch((error) => console.log(error));
  };
};
// Fetch upcomming installment reports
export const getCustomerDueReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/customers/customer-due-report/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getCustomerDue(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch supplier ledger report
export const getSupplierLedgerReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/suppliers/supplier-ledger/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getSupplierLedger(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch damage products report
export const getDamageProductsReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/damage-product/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getDamageProducts(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch cash receive and delivery report
export const getCashReceiveDeliveryReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/cashcollections/report/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getCashReceiveDelivery(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch cash receive and delivery report
export const getProductSalePurReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/product-sales-purchase-report/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getProductSalePur(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch company benefit by product report
export const getCompanyBenefitReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/benifit-by-product/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getCompanyBenefit(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch customer return report
export const getCustomerReturnReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/customers/customer-return-details/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getCustomerReturn(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch customer ledger report
export const getCustomerLedgerReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/customers/customer-ledger/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getCustomerLedger(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch upcomming installment report
export const getUpcommingInstallmentReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/upcomming-installment/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getUpcommingInstallment(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch installment collection report
export const getInstallmentCollectionReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/installment-collection/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getInstallmentCollection(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch Defaulting Customer report
export const getDefaultingCustomerReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/default-customers/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getDefaultingCustomer(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch Bank Ledger report
export const getBankLedgerReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/bank-ledger-demo/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getBankLedger(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch Customer Benefit report
export const getCustomerBenefitReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/benifit-by-customer/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getCustomerBenefit(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch Cash in Hand report
export const getCashInHandReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/cash-in-hands/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getCashInHand(resp));
      })
      .catch((error) => console.log(error));
  };
};

// Fetch Profit and Loss report
export const getProfitLossReport = (Data, headers) => {
  return function (dispatch) {
    axios
      .post(`${baseUrl}/reports/profit-or-loss/`, Data, {
        headers,
      })
      .then((resp) => {
        dispatch(getProfitLoss(resp));
      })
      .catch((error) => console.log(error));
  };
};
