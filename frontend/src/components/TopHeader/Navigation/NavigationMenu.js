import React, { useState, useEffect } from "react";

import CashCollection from "../../AccountManagement/CashCollection/CashCollection";
import { cashCollectionData } from "../../AccountManagement/CashCollection/cashCollectionData";
import { productData } from "../../Basic/Products/productData";
import ProductLists from "../../Basic/Products/ProductLists";
import { orderData } from "../Navigation/SalesOrder/orderData";
import SalesOrder from "../Navigation/SalesOrder/SalesOrder";
import CreditSales from "../Navigation/CreditSales/CreditSales";
import CashDelivery from "../Navigation/CashDelivery/CashDelivery";
import { cashDeliveryData } from "./CashDelivery/cashDeliveryData";
import Clock from "./Clock";
import Expense from "../Navigation/Expenses/Expense";
import { expenseData } from "./Expenses/expenseData";
import Income from "./Income/Income";
import { incomeData } from "./Income/incomeData";
import AllReport from "./MISReport/AllReport";
import axios from "axios";
import { baseUrl } from "../../../RestApi/RestApi";
import PurchaseOrder from "../../InventoryManagement/PurchaseOrder/PurchaseOrder";

const NavigationMenu = () => {
  const [productModalShow, setProductModalShow] = useState(false);
  const [PurchaseOrderModalShow, setPurchaseOrderModalShow] = useState(false);
  const [salesOrderModalShow, setSalesOrderModalShow] = useState(false);
  const [creditSalesModalShow, setCreditSalesModalShow] = useState(false);
  const [cashCollectionModalShow, setCashCollectionModalShow] = useState(false);
  const [cashDeliveryModalShow, setCashDeliveryModalShow] = useState(false);
  const [incomeModalShow, setIncomeModalShow] = useState(false);
  const [expenseModalShow, setExpenseModalShow] = useState(false);
  const [allReportModalShow, setAllReportModalShow] = useState(false);
  const [userBasic, setUserBasic] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.user);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
    };

    axios
      .get(`${baseUrl}/basics/my-sys-info/`, config)
      .then((data) => {
        //console.log("user data ", data.data);
        setUserBasic(data.data);
      })
      .catch((err) => {
        console.log("user basic info error ", err);
      });
  }, []);

  return (
    <div className="container-fluid navigation px-4">
      {/* <div className="navigation"> */}
      <div className="row">
        <div className="col-sm-6 col-md-7 col-lg-9">
          <div className="row justify-content-lg-start justify-content-sm-center">
            <div
              className="col-md-1.33 mainBox"
              style={{ cursor: "move" }}
              onClick={() => setProductModalShow(true)}
            >
              <p className="box productColor">Product Configuration</p>
            </div>

            <div
              className="col-md-1.33"
              style={{ cursor: "move" }}
              onClick={() => setPurchaseOrderModalShow(true)}
            >
              <p className="box purchaseColor">Purchase Order</p>
            </div>
            <div
              className="col-md-1.33"
              style={{ cursor: "move" }}
              onClick={() => setSalesOrderModalShow(true)}
            >
              <p className="box salesCreditColor">Sales Order</p>
            </div>
            <div
              className="col-md-1.33"
              style={{ cursor: "move" }}
              onClick={() => setCreditSalesModalShow(true)}
            >
              <p className="box salesCreditColor">Credit Sales</p>
            </div>
            <div
              className="col-md-1.33"
              style={{ cursor: "move" }}
              onClick={() => setCashCollectionModalShow(true)}
            >
              <p className="box cashColor">Cash Collection</p>
            </div>
            <div
              className="col-md-1.33"
              style={{ cursor: "move" }}
              onClick={() => setCashDeliveryModalShow(true)}
            >
              <p className="box cashColor">Cash Delivery</p>
            </div>
            <div
              className="col-md-1.33"
              style={{ cursor: "move" }}
              onClick={() => setIncomeModalShow(true)}
            >
              <p className="box incomeColor">Income</p>
            </div>
            <div
              className="col-md-1.33"
              style={{ cursor: "move" }}
              onClick={() => setExpenseModalShow(true)}
            >
              <p className="box incomeColor">Expenses</p>
            </div>
            <div
              className="col-md-1.33"
              style={{ cursor: "move" }}
              onClick={() => setAllReportModalShow(true)}
            >
              <p className="box reportColor">MIS Report</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-5 col-lg-3 navRight">
          <div className="row align-items-center">
            <div className="bottomLeft col-sm-12 col-md-12 col-lg-8 px-0 mx-0">
              <h2 className="nav-title text-uppercase">
                {userBasic ? userBasic.name : "Company Name"}
              </h2>
              <h2 className="nav-title">
                {userBasic ? userBasic.email : "Company Email"}
              </h2>
              <h2 className="nav-title text-uppercase">
                {userBasic ? userBasic.phone : "Company Phone"}
              </h2>
            </div>
            <div className="bottomRight col-sm-12 col-md-12 col-lg-4 px-0 mx-0">
              <Clock />
            </div>
          </div>
        </div>
      </div>

      <ProductLists
        show={productModalShow}
        onHide={() => setProductModalShow(false)}
        ProductLists={productData}
      />
      <PurchaseOrder
        show={PurchaseOrderModalShow}
        onHide={() => setPurchaseOrderModalShow(false)}
      />

      <SalesOrder
        show={salesOrderModalShow}
        onHide={() => setSalesOrderModalShow(false)}
        OrderList={orderData}
      />
      <CreditSales
        show={creditSalesModalShow}
        onHide={() => setCreditSalesModalShow(false)}
      />

      <CashCollection
        show={cashCollectionModalShow}
        onHide={() => setCashCollectionModalShow(false)}
        CashCollectionList={cashCollectionData}
      />

      <CashDelivery
        show={cashDeliveryModalShow}
        onHide={() => setCashDeliveryModalShow(false)}
        CashCollectionList={cashDeliveryData}
      />

      <Income
        show={incomeModalShow}
        onHide={() => setIncomeModalShow(false)}
        IncomeData={incomeData}
      />
      <Expense
        show={expenseModalShow}
        onHide={() => setExpenseModalShow(false)}
        ExpenseData={expenseData}
      />
      <AllReport
        show={allReportModalShow}
        onHide={() => setAllReportModalShow(false)}
      />
    </div>
  );
};

export default NavigationMenu;
