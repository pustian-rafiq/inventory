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
  FETCH_SUPPLIER_DUE,
  FETCH_CUSTOMER_DUE,
  FETCH_BANK_LEDGER,
  FETCH_CUSTOMER_BENEFIT,
  FETCH_CASH_IN_HAND,
  FETCH_PROFIT_LOSS,
} from "../actions/types/reports";
const initialState = {
  daily_sales: [],
  monthly_sales: [],
  yearly_sales: [],
  daily_purchase: [],
  monthly_purchase: [],
  yearly_purchase: [],
  expenditure_reports: [],
  available_stock: [],
  customerwise_sales: [],
  supplierwise_purchase: [],
  summary_reports: [],
  supplier_due_report: [],
  customer_due_report: [],
  supplier_ledgerz_report: [],
  damage_products_report: [],
  cash_receive_delivery_report: [],
  product_sale_pur_report: [],
  company_benefit_report: [],
  customer_return_report: [],
  customer_ledger_report: [],
  upcomming_installment_report: [],
  installment_collection_report: [],
  defaulting_customer_report: [],
  bank_ledger_report: [],
  customer_benefit_report: [],
  cash_in_hand_report: [],
  profit_loss_report: [],
  loading: true,
};

const reportsReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DAILY_SALES:
      return {
        ...state,
        daily_sales: action.payload,
        loading: false,
      };
    case FETCH_MONTHLY_SALES:
      return {
        ...state,
        monthly_sales: action.payload,
        loading: false,
      };
    case FETCH_YEARLY_SALES:
      return {
        ...state,
        yearly_sales: action.payload,
        loading: false,
      };
    case FETCH_DAILY_PURCHASE:
      return {
        ...state,
        daily_purchase: action.payload,
        loading: false,
      };
    case FETCH_MONTHLY_PURCHASE:
      return {
        ...state,
        monthly_purchase: action.payload,
        loading: false,
      };
    case FETCH_YEARLY_PURCHASE:
      return {
        ...state,
        yearly_purchase: action.payload,
        loading: false,
      };
    case FETCH_EXPENDITURE_REPORTS:
      return {
        ...state,
        expenditure_reports: action.payload,
        loading: false,
      };
    case FETCH_AVAILABLE_STOCK:
      return {
        ...state,
        available_stock: action.payload,
        loading: false,
      };
    case FETCH_SUPPLIER_WISE_PURCHASE:
      return {
        ...state,
        supplierwise_purchase: action.payload,
        loading: false,
      };
    case FETCH_CUSTOMER_WISE_SALES:
      return {
        ...state,
        customerwise_sales: action.payload,
        loading: false,
      };
    case FETCH_SUMMARY_REPORTS:
      return {
        ...state,
        summary_reports: action.payload,
        loading: false,
      };
    case FETCH_SUPPLIER_DUE:
      return {
        ...state,
        supplier_due_report: action.payload,
        loading: false,
      };
    case FETCH_CUSTOMER_DUE:
      return {
        ...state,
        customer_due_report: action.payload,
        loading: false,
      };
    case FETCH_SUPPLIER_LEDGER:
      return {
        ...state,
        supplier_ledgerz_report: action.payload,
        loading: false,
      };
    case FETCH_DAMAGE_PRODUCTS:
      return {
        ...state,
        damage_products_report: action.payload,
        loading: false,
      };
    case FETCH_CASH_RECEIVE_AND_DELIVERY_REPORT:
      return {
        ...state,
        cash_receive_delivery_report: action.payload,
        loading: false,
      };
    case FETCH_PRODUCT_SALE_PUR:
      return {
        ...state,
        product_sale_pur_report: action.payload,
        loading: false,
      };
    case FETCH_COMPANY_BENEFIT_BY_PRODUCT:
      return {
        ...state,
        company_benefit_report: action.payload,
        loading: false,
      };
    case FETCH_CUSTOMER_RETURN:
      return {
        ...state,
        customer_return_report: action.payload,
        loading: false,
      };
    case FETCH_CUSTOMER_LEDGER:
      return {
        ...state,
        customer_ledger_report: action.payload,
        loading: false,
      };
    case FETCH_UPCOMMING_INSTALLMENT:
      return {
        ...state,
        upcomming_installment_report: action.payload,
        loading: false,
      };
    case FETCH_INSTALLMENT_COLLECTION:
      return {
        ...state,
        installment_collection_report: action.payload,
        loading: false,
      };
    case FETCH_DEFAULTING_CUSTOMER:
      return {
        ...state,
        defaulting_customer_report: action.payload,
        loading: false,
      };
    case FETCH_BANK_LEDGER:
      return {
        ...state,
        bank_ledger_report: action.payload,
        loading: false,
      };
    case FETCH_CUSTOMER_BENEFIT:
      return {
        ...state,
        customer_benefit_report: action.payload,
        loading: false,
      };
    case FETCH_CASH_IN_HAND:
      return {
        ...state,
        cash_in_hand_report: action.payload,
        loading: false,
      };
    case FETCH_PROFIT_LOSS:
      return {
        ...state,
        profit_loss_report: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default reportsReducers;
