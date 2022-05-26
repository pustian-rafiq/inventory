import React, { useState, useEffect } from "react";
import { Dropdown, Modal, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./topmenu.css";
import "../../assets/css/bootstrap.min.css";

import "../../assets/css/custom.css";
import { logout } from "../../redux/actions/auth";
import { clearMessage } from "../../redux/actions/message";
import { history } from "../../redux/helpers/history";
import AssetAndLiability from "../AccountManagement/AssetAndLiability/AssetAndLiability";
import { assetAndLiabilityData } from "../AccountManagement/AssetAndLiability/assetAndLiabilityData";
import BankTransaction from "../AccountManagement/BankTransaction/BankTransaction";
import CashCollection from "../AccountManagement/CashCollection/CashCollection";
import ExpenseIncome from "../AccountManagement/ExpenseIncome/ExpenseIncome";
import InvestmentHead from "../AccountManagement/InvestmentHead/InvestmentHead";
import BankList from "../Basic/Bank/BankList";
import CardTypeSetupList from "../Basic/CardTypeSetup/CardTypeSetupList";
import CategoryLists from "../Basic/Categories/CategoryLists";
import CompanyLists from "../Basic/Companies/CompanyLists";
import ProductLists from "../Basic/Products/ProductLists";
import SystemInformation from "../Basic/SystemInformation/SystemInformation";
import CustomerList from "../CustomerAndSupplier/Customer/CustomerList";
import SupplierList from "../CustomerAndSupplier/Supplier/SupplierList";
import Designation from "../Employee/Designation/Designation";
import Employee from "../Employee/Employee/Employee";
import { damagedData } from "../InventoryManagement/DamagedProduct/damagedData";
import DamagedProduct from "../InventoryManagement/DamagedProduct/DamagedProduct";
import PurchaseOrder from "../InventoryManagement/PurchaseOrder/PurchaseOrder";
import PurchaseReturn from "../InventoryManagement/PurchaseReturn/PurchaseReturn";
import { purchaseReturnData } from "../InventoryManagement/PurchaseReturn/purchaseReturnData";
//import SalesOrder from "../InventoryManagement/SalesOrder/SalesOrder";
import SalesReturn from "../InventoryManagement/SalesReturn/SalesReturn";

import DailySalesReport from "../MISReport/DailySalesReport/DailySalesReport";
import DailyPurchaseReport from "../MISReport/DailyPurchaseReport/DailyPurchaseReport";
import MonthlyPurchaseReport from "../MISReport/MonthlyPurchaseReport/MonthlyPurchaseReport";
import MonthlySalesReport from "../MISReport/MonthlySalesReport/MonthlySalesReport";
import SummaryReport from "../MISReport/SummaryReport/SummaryReport";
import SupplierwisePurchase from "../MISReport/SupplierwisePurchase/SupplierwisePurchase";
import YearlySalesReport from "../MISReport/YearlySalesReport/YearlySalesReport";
import AvailableStockReport from "../MISReport/AvailableStockReport/AvailableStockReport";
import CustomerWiseSales from "../MISReport/CustomerWiseSalesReport/CustomerWiseSales";
import ExpenditureReport from "../MISReport/ExpenditureReport/ExpenditureReport";
import YearlyPurchaseReport from "../MISReport/YearlyPurchaseReport/YearlyPurchaseReport";
//import Expendture from "../AccountManagement/Expenduture/Expendture";
import Expendture from "./Navigation/Expenses/Expense";
import { getSystemUser } from "../../redux/actions/systemUserAction";
import { Box, Paper } from "@mui/material";
import SalesOrder from "./Navigation/SalesOrder/SalesOrder";
//import { toast } from "react-toastify";

const MenuBar = () => {
  // Basic state management
  const [systemModalShow, setSystemModalShow] = useState(false);
  const [companyModalShow, setCompanyModalShow] = useState(false);
  const [categoryModalShow, setCategoryModalShow] = useState(false);
  const [productModalShow, setProductModalShow] = useState(false);
  const [bankModalShow, setBankModalShow] = useState(false);
  const [cardTypeModalShow, setCardTypeModalShow] = useState(false);
  // Designation and employee state management
  const [designationModalShow, setDesignationModalShow] = useState(false);
  const [employeeModalShow, setEmployeeModalShow] = useState(false);
  // Customer and supplier state management
  const [customerModalShow, setCustomerModalShow] = useState(false);
  const [supplierModalShow, setSupplierModalShow] = useState(false);

  // Inventory management state
  const [PurchaseOrderModalShow, setPurchaseOrderModalShow] = useState(false);
  const [salesOrderModalShow, setSalesOrderModalShow] = useState(false);
  const [damagedProductModalShow, setDamaedProductModalShow] = useState(false);
  const [purchaseReturnModalShow, setPurchaseReturnModalShow] = useState(false);
  const [salesReturnModalShow, setSalesReturnModalShow] = useState(false);

  // Account managemnt state
  const [cashCollectionModalShow, setCashCollectionModalShow] = useState(false);
  const [expenseIncomeModalShow, setExpenseIncomeModalShow] = useState(false);
  const [expendutureModalShow, setExpendutureModalShow] = useState(false);
  const [bankTransactionModalShow, setBankTransactionModalShow] =
    useState(false);
  const [investmentHeadModalShow, setInvestmentHeadModalShow] = useState(false);
  const [assetAndLiabilityModalShow, setAssetAndLiabilityModalShow] =
    useState(false);

  // MIS retport state management
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
  const [expenditureReportModalShow, setExpenditureReportModalShow] =
    useState(false);
  const [availableStockReportModalShow, setAvailableStockReportModalShow] =
    useState(false);
  const [customerWiseSalesModalShow, setCustomerWiseSalesModalShow] =
    useState(false);
  const [supplierwisePurchaseModalShow, setSupplierwisePurchaseModalShow] =
    useState(false);
  const [summaryReportModalShow, setSummaryReportModalShow] = useState(false);
  const [userModalShow, setUserModalShow] = useState(false);

  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  useEffect(() => {
    dispatch(getSystemUser(headers, setUserName, setUserImage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { systemUser } = useSelector((state) => state.systemUser);

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
    setUserName("");
    setUserImage("");
  };

  return (
    <div>
      {/* <div className="row">
        <div className="col-md-12 px-0"> */}
      <Navbar className="navBar px-1" expand="lg" sticky="top">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="top-header">
          <Nav className="mr-auto" variant="pills" defaultActiveKey="/home">
            {/* basic  */}
            <Nav.Link href="">
              <Dropdown>
                <Dropdown.Toggle className="dropDownToggle">
                  Basic
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropDownMenu">
                  <Dropdown.Item
                    onClick={() => setSystemModalShow(true)}
                    className="dropDownItem"
                  >
                    System Information
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => setCompanyModalShow(true)}
                    className="dropDownItem"
                  >
                    Companies
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => setCategoryModalShow(true)}
                    className="dropDownItem"
                  >
                    Category
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => setProductModalShow(true)}
                    className="dropDownItem"
                  >
                    Product
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setBankModalShow(true)}
                    className="dropDownItem"
                  >
                    Bank
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setCardTypeModalShow(true)}
                    className="dropDownItem"
                  >
                    Card Type Setup
                  </Dropdown.Item>

                  <Dropdown.Item className="dropDownItem">
                    <Link
                      to={"/"}
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={logOut}
                    >
                      Logout
                    </Link>
                    {/* <Navbar.Brand href="/" onClick={logOut} style={{ textDecoration: "none", color: "black", fontSize:'18px'}}>Logout</Navbar.Brand> */}
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={(e) => alert("Good")}
                    className="dropDownItem"
                  >
                    Exit
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>

            <Nav.Link>
              <Dropdown>
                <Dropdown.Toggle
                  className="dropDownToggle"
                  id="dropdown-button-dark-example1"
                >
                  Employee
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropDownMenu">
                  <Dropdown.Item
                    className="dropDownItem"
                    onClick={() => setDesignationModalShow(true)}
                  >
                    Designation
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setEmployeeModalShow(true)}
                    className="dropDownItem"
                  >
                    Employee
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
            <Nav.Link href="">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  className="dropDownToggle"
                >
                  Customer and Supplier
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropDownMenu">
                  <Dropdown.Item
                    onClick={() => setCustomerModalShow(true)}
                    className="dropDownItem"
                  >
                    Customer Information
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setSupplierModalShow(true)}
                    className="dropDownItem"
                  >
                    Supplier Information
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>

            <Nav.Link>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  className="dropDownToggle"
                >
                  Inventory Management
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropDownMenu">
                  <Dropdown.Item
                    onClick={(e) => setPurchaseOrderModalShow(true)}
                    className="dropDownItem"
                  >
                    Purchase Order
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setSalesOrderModalShow(true)}
                    className="dropDownItem"
                  >
                    Sales Order
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setDamaedProductModalShow(true)}
                    className="dropDownItem"
                  >
                    Damaged Product
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => setPurchaseReturnModalShow(true)}
                    className="dropDownItem"
                  >
                    Purchase Return
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setSalesReturnModalShow(true)}
                    className="dropDownItem"
                  >
                    Sales Return
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
            <Nav.Link>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  className="dropDownToggle"
                >
                  Account Management
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropDownMenu">
                  <Dropdown.Item
                    onClick={(e) => setCashCollectionModalShow(true)}
                    className="dropDownItem"
                  >
                    Cash Collection
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => setExpenseIncomeModalShow(true)}
                    className="dropDownItem"
                  >
                    Expense/Income Head
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => setExpendutureModalShow(true)}
                    className="dropDownItem"
                  >
                    Expenditure
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => setBankTransactionModalShow(true)}
                    className="dropDownItem"
                  >
                    Bank Transaction
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setInvestmentHeadModalShow(true)}
                    className="dropDownItem"
                  >
                    Investment Head
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => setAssetAndLiabilityModalShow(true)}
                    className="dropDownItem"
                  >
                    Asset and Liability
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
            <Nav.Link>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  className="dropDownToggle"
                >
                  MIS Report
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropDownMenu">
                  <Dropdown.Item
                    as="button"
                    onClick={(e) => setDailySalesReportyModalShow(true)}
                    className="dropDownItem"
                  >
                    Daily Sales Report
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => setDailyPurchaseReportyModalShow(true)}
                    className="dropDownItem"
                  >
                    Daily Purchase Report
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => setMonthlySalesReportyModalShow(true)}
                    className="dropDownItem"
                  >
                    Monthly Sales Report
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={(e) => setMonthlyPurchaseReportyModalShow(true)}
                    className="dropDownItem"
                  >
                    Monthly Purchase Report
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => setYearlySalesReportModalShow(true)}
                    className="dropDownItem"
                  >
                    Yearly Sales Report
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => setYearlyPurchaseReportModalShow(true)}
                    className="dropDownItem"
                  >
                    Yearly Purchase Report
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => setExpenditureReportModalShow(true)}
                    className="dropDownItem"
                  >
                    Expenditure Report
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => setAvailableStockReportModalShow(true)}
                    className="dropDownItem"
                  >
                    Stock Report
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => setCustomerWiseSalesModalShow(true)}
                    className="dropDownItem"
                  >
                    Customer Wise Sale
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => setSupplierwisePurchaseModalShow(true)}
                    className="dropDownItem"
                  >
                    Supplier Wise Purchase
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => setSummaryReportModalShow(true)}
                    className="dropDownItem"
                  >
                    Summary Report
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
          </Nav>
          {/* Useer Image  */}
          {/* ================================================= */}
          <Nav className="flex-lg align-items-lg-center text-center">
            {systemUser.name ? (
              <p className="admin-style text-white"> {userName}</p>
            ) : (
              <></>
            )}

            <Nav.Link className="" onClick={() => setUserModalShow(true)}>
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "40px",
                  height: "40px",
                  overflow: "hidden",
                  bordeRadius: "50%",
                  // marginLeft: "auto",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    clipPath: "circle()",
                  }}
                  src={
                    userImage
                      ? userImage
                      : "https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/user_logo.png"
                  }
                  alt=""
                />
              </div>
            </Nav.Link>
            {/* ################################################# */}
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={userModalShow}
              onHide={() => setUserModalShow(false)}
              onExit={() => setUserModalShow(false)}
              backdrop="static"
              keyboard="false"
            >
              <Modal.Header
                style={{
                  background: "rgb(174, 200, 242)",
                  cursor: "move",
                }}
                closeButton
              >
                <Modal.Title id="example-modal-sizes-title-sm">
                  <div style={{ float: "left", height: "3px" }}>
                    <h4>User Information</h4>
                  </div>
                </Modal.Title>
              </Modal.Header>

              <Modal.Body
                style={{
                  background: "#ffffff",
                }}
              >
                <div className="mt-3 d-lg-flex justify-content-lg-center px-lg-5 text-center">
                  {/* justify-content-lg-around */}
                  <div
                    style={{
                      display: "inline-block",
                      position: "relative",
                      width: "200px",
                      height: "200px",
                      overflow: "hidden",
                      bordeRadius: "50%",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        clipPath: "circle()",
                      }}
                      src={
                        userImage
                          ? userImage
                          : "https://i.pinimg.com/originals/98/1a/8a/981a8aff31c75f3b048d90b13a97a916.gif"
                      }
                      alt=""
                    />
                  </div>

                  {systemUser.name ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        "& > :not(style)": {
                          m: 1,
                          padding: 5,
                        },
                      }}
                    >
                      <Paper elevation={3}>
                        <div className="personal-details">
                          <h4>
                            HI I'M{" "}
                            <span
                              style={{
                                color: "red",
                                textTransform: "uppercase",
                              }}
                            >
                              {systemUser.name}
                            </span>{" "}
                          </h4>
                          <p>
                            <strong>Email : </strong>
                            {systemUser.email}
                          </p>
                          <p>
                            <strong>Phone : </strong>
                            {systemUser.contact_no}
                          </p>
                        </div>
                        <div className="social">
                          <ul>
                            <li>
                              <a href="https://www.facebook.com">
                                <i className="fa fa-facebook"></i>
                              </a>
                            </li>
                            <li>
                              <a href="https://www.twitter.com">
                                <i className="fa fa-twitter"></i>
                              </a>
                            </li>
                            <li>
                              <a href="https://www.google.com">
                                <i className="fa fa-google"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </Paper>
                    </Box>
                  ) : (
                    <></>
                  )}
                </div>
              </Modal.Body>
            </Modal>
            {/* ################################################# */}
          </Nav>
          {/* ================================================= */}
        </Navbar.Collapse>
      </Navbar>
      {/* </div>
      </div> */}

      {/* Call All the DropDown component */}
      <SystemInformation
        show={systemModalShow}
        onHide={() => setSystemModalShow(false)}
      />

      <CompanyLists
        show={companyModalShow}
        onHide={() => setCompanyModalShow(false)}
      />
      <CategoryLists
        show={categoryModalShow}
        onHide={() => setCategoryModalShow(false)}
      />
      <ProductLists
        show={productModalShow}
        onHide={() => setProductModalShow(false)}
      />
      <BankList show={bankModalShow} onHide={() => setBankModalShow(false)} />

      <CardTypeSetupList
        show={cardTypeModalShow}
        onHide={() => setCardTypeModalShow(false)}
      />
      <Designation
        show={designationModalShow}
        onHide={() => setDesignationModalShow(false)}
      />
      <Employee
        show={employeeModalShow}
        onHide={() => setEmployeeModalShow(false)}
      />

      <CustomerList
        show={customerModalShow}
        onHide={() => setCustomerModalShow(false)}
      />
      <SupplierList
        show={supplierModalShow}
        onHide={() => setSupplierModalShow(false)}
      />
      <PurchaseOrder
        show={PurchaseOrderModalShow}
        onHide={() => setPurchaseOrderModalShow(false)}
      />
      {/* 
      <SalesOrder
        show={salesOrderModalShow}
        onHide={() => setSalesOrderModalShow(false)}
        OrderList={orderData}
      /> */}
      <SalesOrder
        show={salesOrderModalShow}
        onHide={() => setSalesOrderModalShow(false)}
      />
      <DamagedProduct
        show={damagedProductModalShow}
        onHide={() => setDamaedProductModalShow(false)}
        DamagedProductList={damagedData}
      />
      <PurchaseReturn
        show={purchaseReturnModalShow}
        onHide={() => setPurchaseReturnModalShow(false)}
        PurchaseReturnList={purchaseReturnData}
      />
      <SalesReturn
        show={salesReturnModalShow}
        onHide={() => setSalesReturnModalShow(false)}
      />

      <CashCollection
        show={cashCollectionModalShow}
        onHide={() => setCashCollectionModalShow(false)}
      />

      <ExpenseIncome
        show={expenseIncomeModalShow}
        onHide={() => setExpenseIncomeModalShow(false)}
      />

      {/* <Expendture
        show={expendutureModalShow}
        onHide={() => setExpendutureModalShow(false)}
      /> */}

      <Expendture
        show={expendutureModalShow}
        onHide={() => setExpendutureModalShow(false)}
      />

      <BankTransaction
        show={bankTransactionModalShow}
        onHide={() => setBankTransactionModalShow(false)}
      />

      <InvestmentHead
        show={investmentHeadModalShow}
        onHide={() => setInvestmentHeadModalShow(false)}
      />
      <AssetAndLiability
        show={assetAndLiabilityModalShow}
        onHide={() => setAssetAndLiabilityModalShow(false)}
        AssetAndLiabilityData={assetAndLiabilityData}
      />

      {/* MIS Report component */}

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
      <ExpenditureReport
        show={expenditureReportModalShow}
        onHide={() => setExpenditureReportModalShow(false)}
      />
      <AvailableStockReport
        show={availableStockReportModalShow}
        onHide={() => setAvailableStockReportModalShow(false)}
      />
      <CustomerWiseSales
        show={customerWiseSalesModalShow}
        onHide={() => setCustomerWiseSalesModalShow(false)}
      />
      <SupplierwisePurchase
        show={supplierwisePurchaseModalShow}
        onHide={() => setSupplierwisePurchaseModalShow(false)}
      />

      <SummaryReport
        show={summaryReportModalShow}
        onHide={() => setSummaryReportModalShow(false)}
      />
    </div>
  );
};

export default MenuBar;
