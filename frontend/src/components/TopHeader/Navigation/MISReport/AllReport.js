import React, { useEffect, useState } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from "react-redux";
import { getSystemData } from "../../../../redux/actions/systemInformationAction";
import CustomerDueReport from "./BasicReport/CustomerDue/CustomerDueReport";
import YearlySalesReport from "../../../MISReport/YearlySalesReport/YearlySalesReport";
import SupplierDueReport from "./BasicReport/SupplierDue/SupplierDueReport";
import EmployeeInfo from "./BasicReport/EmployeeInfo/EmployeeInfo";
//import StockReport from "./BasicReport/StockReport/StockReport";
import InstallmentCollection from "./BasicReport/InstallmentCollection/InstallmentCollection";
import UpcomingInstallment from "./BasicReport/UpcomingInstallment/UpcomingInstallment";
import DefaultCustomerList from "./BasicReport/DefaultCustomerList/DefaultCustomerList";

import "./allreport.css";
// import ProductConfiguration from "./BasicReport/ProductConfiguration/ProductConfiguration";
import AvailableStockReport from "../../../MISReport/AvailableStockReport/AvailableStockReport";
import DailySalesReport from "../../../MISReport/DailySalesReport/DailySalesReport";
import DailyPurchaseReport from "../../../MISReport/DailyPurchaseReport/DailyPurchaseReport";
import MonthlySalesReport from "../../../MISReport/MonthlySalesReport/MonthlySalesReport";
import YearlyPurchaseReport from "../../../MISReport/YearlyPurchaseReport/YearlyPurchaseReport";
import CustomerWiseSales from "../../../MISReport/CustomerWiseSalesReport/CustomerWiseSales";
import DamageReport from "./OtherReport/DamageReport/DamageReport";
import BankLedge from "./OtherReport/BankLedge/BankLedge";
import SupplierLedger from "./OtherReport/SupplierLedger/SupplierLedger";
import CashDueCollection from "./OtherReport/CashReceiveDelivery/CashReceiveDelivery";
import ProductwiseSalesPurchase from "./OtherReport/ProductwiseSalesPurchase/ProductwiseSalesPurchase";
import CompanyBenefit from "./OtherReport/CompanyBenefit/CompanyBenefit";
import CustomerwiseBenefit from "./OtherReport/CustomerwiseBenefit/CustomerwiseBenefit";
import CustomerwiseReturn from "./OtherReport/CustomerwiseReturn/CustomerwiseReturn";
import CashInHand from "./OtherReport/CashInHand/CashInHand";
import ProfitAndLossReport from "./OtherReport/ProfitAndLossReport/ProfitAndLossReport";
import MonthlyPurchaseReport from "../../../MISReport/MonthlyPurchaseReport/MonthlyPurchaseReport";
import SupplierwisePurchase from "../../../MISReport/SupplierwisePurchase/SupplierwisePurchase";
import CustomerLedger from "./OtherReport/Customer Ledger/CustomerLedger";
import ProductConfiguration from "./BasicReport/ProductConfiguration/ProductConfiguration";
import ExpenditureReport from "../../../MISReport/ExpenditureReport/ExpenditureReport";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

function AllReport(props) {
  // Basic report Modal State
  const [printTableModal, setPrintTableModal] = useState(false);
  const [employeeInfoModal, setEmployeeInfoModal] = useState(false);
  const [customerDueReportModal, setCustomerDueReportModal] = useState(false);
  const [supplierDueReportModal, setSupplierDueReportModal] = useState(false);
  const [stockReportModal, setStockReportModal] = useState(false);
  const [expenseIncomeReportModal, setExpenseIncomeReportModal] =
    useState(false);
  const [upcomInsReportModal, setUpcomInsReportModal] = useState(false);
  const [insColReportModal, setInsColReportModal] = useState(false);
  const [defaulCusListModal, setdefaultCusListModal] = useState(false);
  // Others report modal state
  const [dailySalesReportModalShow, setDailySalesReportyModalShow] =
    useState(false);
  const [dailyPurchaseReportModalShow, setDailyPurchaseReportyModalShow] =
    useState(false);
  const [monthlySalesReportModalShow, setMonthlySalesReportyModalShow] =
    useState(false);
  const [monthlyPurchaseReportModalShow, setMonthlyPurchaseReportyModalShow] =
    useState(false);
  const [yearlySalesReportModalShow, setYearlySalesReportModalShow] =
    useState(false);
  const [yearlyPurchaseReportModalShow, setYearlyPurchaseReportModalShow] =
    useState(false);
  const [customerWiseSalesModalShow, setCustomerWiseSalesModalShow] =
    useState(false);
  const [supplierwisePurchaseModalShow, setSupplierwisePurchaseModalShow] =
    useState(false);
  const [damageReportModalShow, setDamageReportModalShow] = useState(false);
  const [bankLedgeModalShow, setBankLedgeModalShow] = useState(false);
  const [supplierLedgerModalShow, setSupplierLedgerModalShow] = useState(false);
  const [customerLedgerModalShow, setCustomerLedgerModalShow] = useState(false);
  const [cashDueCollectionModalShow, setCashDueCollectionModalShow] =
    useState(false);
  const [productwiseSPModalShow, setProductwiseSPModalShow] = useState(false);
  const [companyBenefitModalShow, setCompanyBenefitModalShow] = useState(false);
  const [customerwiseBenefitModalShow, setCustomerwiseBenefitModalShow] =
    useState(false);
  const [customerwiseReturnModalShow, setCustomerwiseReturnModalShow] =
    useState(false);
  const [cashinHandModalShow, setCashinHandModalShow] = useState(false);
  const [profitLossModalShow, setProfitLossModalShow] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const headers = {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${currentUser.access}`,
  };

  useEffect(() => {
    dispatch(getSystemData(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
        backdrop="static"
        keyboard="false"
        dialogAs={DraggableModal}
        dialogClassName="all-report-modal"
      >
        <Modal.Header className="background_and_table_header">
          <div style={{ float: "left", height: "3px" }}>
            <h4>All Report</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={props.onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="custom_modal_inner_content">
          {/* Company Add Form Start Here */}
          <form className="form-horizontal">
            {/* Import two component */}
            {/* <BasicReport /> */}
            {/* BasicReport is Replaced with Original Content */}
            <div>
              <h4 className="modalHeadTitle">Basic Report</h4>
              <div className="container misReportBox reports">
                <div className="row">
                  <div className=" col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                      <div
                        className="col-md-1.33 reportBox firstBox"
                        style={{ cursor: "move" }}
                        onClick={() => setPrintTableModal(true)}
                      >
                        <p className="">Product Configuration</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setEmployeeInfoModal(true)}
                      >
                        <p className="">Employee Information</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setCustomerDueReportModal(true)}
                      >
                        <p className="">Customer Due Report</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setSupplierDueReportModal(true)}
                      >
                        <p className="">Supplier Due Report</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setStockReportModal(true)}
                      >
                        <p className="">Stock Report</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setExpenseIncomeReportModal(true)}
                      >
                        <p className="">Expenditure Report</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setUpcomInsReportModal(true)}
                      >
                        <p className="">Upcoming Installment</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setInsColReportModal(true)}
                      >
                        <p className="">Installment Collection</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setdefaultCusListModal(true)}
                      >
                        <p className="">Defaulting Customer List</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <OtherReport /> */}
            {/* OtherReport Component is Replaced with it's Original Content */}
            <div>
              <h4 className="modalHeadTitle mt-3">
                Sales, Credit Sales, Cash Collection and Purchase Report
              </h4>
              <div className="container misReportBox reports">
                <div className="row">
                  <div className=" col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                      <div
                        className="col-md-1.33 reportBox firstBox"
                        style={{ cursor: "move" }}
                        onClick={() => setDailySalesReportyModalShow(true)}
                      >
                        <p className="">Daily Sales Report</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setMonthlySalesReportyModalShow(true)}
                      >
                        <p className="">Monthly Sales Report</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setYearlySalesReportModalShow(true)}
                      >
                        <p className="">Yearly Sales Report</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setCustomerWiseSalesModalShow(true)}
                      >
                        <p className="">Customer Wise Sales</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setCustomerLedgerModalShow(true)}
                      >
                        <p className="">Customer Ledger</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setDailyPurchaseReportyModalShow(true)}
                      >
                        <p className="">Daily Purchase Report</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setMonthlyPurchaseReportyModalShow(true)}
                      >
                        <p className="">Monthly Purchase Report</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setYearlyPurchaseReportModalShow(true)}
                      >
                        <p className="">Yearly Purchase Report</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setSupplierwisePurchaseModalShow(true)}
                      >
                        <p className="">Supplier Wise Purchase</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setDamageReportModalShow(true)}
                      >
                        <p className="">Damage Report</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setBankLedgeModalShow(true)}
                      >
                        <p className="">Bank Ledger</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setSupplierLedgerModalShow(true)}
                      >
                        <p className="">Supplier Ledger</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setCashDueCollectionModalShow(true)}
                      >
                        <p className="">Cash Receive and Delivery</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setProductwiseSPModalShow(true)}
                      >
                        <p className="">Product Wise Sales and Purchase</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setCompanyBenefitModalShow(true)}
                      >
                        <p className="">Company Benefit(By Product)</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setCustomerwiseBenefitModalShow(true)}
                      >
                        <p className="">Customer Wise Benefit</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setCustomerwiseReturnModalShow(true)}
                      >
                        <p className="">Customer Wise Returns Details</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setCashinHandModalShow(true)}
                      >
                        <p className="">Cash In Hands</p>
                      </div>
                      <div
                        className="col-md-1.33 reportBox"
                        style={{ cursor: "move" }}
                        onClick={() => setProfitLossModalShow(true)}
                      >
                        <p className="">Profit and Loss</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* Company Add Form End Here */}
        </Modal.Body>
      </Modal>

      {/* Basic Report Modal-- product config(print table) */}

      <ProductConfiguration
        show={printTableModal}
        onHide={() => setPrintTableModal(false)}
      />
      <EmployeeInfo
        show={employeeInfoModal}
        onHide={() => setEmployeeInfoModal(false)}
      />
      <SupplierDueReport
        show={supplierDueReportModal}
        onHide={() => setSupplierDueReportModal(false)}
      />

      <CustomerDueReport
        show={customerDueReportModal}
        onHide={() => setCustomerDueReportModal(false)}
      />

      {/* StockReport refers to the Available stock report */}
      <AvailableStockReport
        show={stockReportModal}
        onHide={() => setStockReportModal(false)}
      />
      {/* <StockReport
        show={stockReportModal}
        onHide={() => setStockReportModal(false)}
      /> */}
      <ExpenditureReport
        show={expenseIncomeReportModal}
        onHide={() => setExpenseIncomeReportModal(false)}
      />
      <UpcomingInstallment
        show={upcomInsReportModal}
        onHide={() => setUpcomInsReportModal(false)}
      />
      <InstallmentCollection
        show={insColReportModal}
        onHide={() => setInsColReportModal(false)}
      />
      <DefaultCustomerList
        show={defaulCusListModal}
        onHide={() => setdefaultCusListModal(false)}
      />
      {/* Others reports component */}
      <DailySalesReport
        show={dailySalesReportModalShow}
        onHide={() => setDailySalesReportyModalShow(false)}
      />
      <DailyPurchaseReport
        show={dailyPurchaseReportModalShow}
        onHide={() => setDailyPurchaseReportyModalShow(false)}
      />
      <MonthlySalesReport
        show={monthlySalesReportModalShow}
        onHide={() => setMonthlySalesReportyModalShow(false)}
      />
      <MonthlyPurchaseReport
        show={monthlyPurchaseReportModalShow}
        onHide={() => setMonthlyPurchaseReportyModalShow(false)}
      />

      <YearlySalesReport
        show={yearlySalesReportModalShow}
        onHide={() => setYearlySalesReportModalShow(false)}
      />
      <YearlyPurchaseReport
        show={yearlyPurchaseReportModalShow}
        onHide={() => setYearlyPurchaseReportModalShow(false)}
      />
      <CustomerWiseSales
        show={customerWiseSalesModalShow}
        onHide={() => setCustomerWiseSalesModalShow(false)}
      />
      <DamageReport
        show={damageReportModalShow}
        onHide={() => setDamageReportModalShow(false)}
      />
      <BankLedge
        show={bankLedgeModalShow}
        onHide={() => setBankLedgeModalShow(false)}
      />

      <SupplierwisePurchase
        show={supplierwisePurchaseModalShow}
        onHide={() => setSupplierwisePurchaseModalShow(false)}
      />

      <SupplierLedger
        show={supplierLedgerModalShow}
        onHide={() => setSupplierLedgerModalShow(false)}
      />
      <CustomerLedger
        show={customerLedgerModalShow}
        onHide={() => setCustomerLedgerModalShow(false)}
      />
      <CashDueCollection
        show={cashDueCollectionModalShow}
        onHide={() => setCashDueCollectionModalShow(false)}
      />
      <ProductwiseSalesPurchase
        show={productwiseSPModalShow}
        onHide={() => setProductwiseSPModalShow(false)}
      />
      <CompanyBenefit
        show={companyBenefitModalShow}
        onHide={() => setCompanyBenefitModalShow(false)}
      />
      <CustomerwiseBenefit
        show={customerwiseBenefitModalShow}
        onHide={() => setCustomerwiseBenefitModalShow(false)}
      />
      <CustomerwiseReturn
        show={customerwiseReturnModalShow}
        onHide={() => setCustomerwiseReturnModalShow(false)}
      />
      <CashInHand
        show={cashinHandModalShow}
        onHide={() => setCashinHandModalShow(false)}
      />
      <ProfitAndLossReport
        show={profitLossModalShow}
        onHide={() => setProfitLossModalShow(false)}
      />
    </>
  );
}

export default AllReport;
