import React, { Fragment } from 'react'
import ProductLists from '../../Basic/Products/ProductLists';
import { purchaseData } from './PurchaseOrder/purchaseData';
import PurchaseOrder from './PurchaseOrder/PurchaseOrder';
import { orderData } from './SalesOrder/orderData';
import SalesOrder from './SalesOrder/SalesOrder';
import CreditSales from './CreditSales/CreditSales';
import CashDelivery from './CashDelivery/CashDelivery'
import { cashDeliveryData } from './CashDelivery/cashDeliveryData';
import Clock from './Clock'
import Expense from './Expenses/Expense'
import { expenseData } from './Expenses/expenseData';
import Income from './Income/Income';
import { incomeData } from './Income/incomeData';
import AllReport from './MISReport/AllReport';
//import { Container } from 'react-bootstrap'

function NavigationMenu() {

 const [productModalShow, setProductModalShow] = React.useState(false); 
 const [PurchaseOrderModalShow, setPurchaseOrderModalShow] = React.useState(false);
 const [salesOrderModalShow, setSalesOrderModalShow] = React.useState(false);
 const [creditSalesModalShow, setCreditSalesModalShow] = React.useState(false);
 const [cashCollectionModalShow, setCashCollectionModalShow] = React.useState(false);
 const [cashDeliveryModalShow, setCashDeliveryModalShow] = React.useState(false);
 const [incomeModalShow, setIncomeModalShow] = React.useState(false);
 const [expenseModalShow, setExpenseModalShow] = React.useState(false);
 const [allReportModalShow, setAllReportModalShow] = React.useState(false);
    return (
        <Fragment>
             <div className="container-fluid navigation">

                 <div className="row">
                   

                       <div className="navLeft col-sm-6 col-md-7 col-lg-9">
                             <div className="row navSection">
                               <div className="col-md-1.33 mainBox" style={{cursor:'move'}} 
                                 onClick={() => setProductModalShow(true)}
                               >
                                 <p className="box productColor">Product Configuration</p>
                               </div>

                                <div className="col-md-1.33"
                                 style={{cursor:'move'}} 
                                 onClick={() => setPurchaseOrderModalShow(true)}
                                 >
                                 <p className="box purchaseColor">Purchase Order</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => setSalesOrderModalShow(true)}
                                 >
                                 <p className="box salesCreditColor">Sales Order</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => setCreditSalesModalShow(true)}
                                 >
                                 <p className="box salesCreditColor">Credit Sales</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => setCashCollectionModalShow(true)}
                                 >
                                 <p className="box cashColor">Cash Collection</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => setCashDeliveryModalShow(true)}
                                 >
                                 <p className="box cashColor">Cash Delivery</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => setIncomeModalShow(true)}
                                 >
                                 <p className="box incomeColor">Income</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => setExpenseModalShow(true)}
                                 >
                                 <p className="box incomeColor">Expenses</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => setAllReportModalShow(true)}
                                 >
                                 <p className="box reportColor">MIS Report</p>
                               </div>
                               

                             </div>
                        </div>
              

                    <div className="col-sm-6 col-md-5 col-lg-3 navRight">
                          
                           <div className="row">
                         
                            <div className="bottomLeft col-sm-12 col-md-12 col-lg-8">
                                <h2 className="title">EHSAN MARKETTING</h2>
                                <p className="subTitle">Inventory Management Software (MIS)</p>

                            </div>
                               <div className="bottomRight col-sm-12 col-md-12 col-lg-4 ">
                                <Clock/>

                              </div>

                          </div>
                     </div>
             </div>

              <ProductLists
                show={productModalShow}
                onHide={()=>setProductModalShow(false)}
                ProductLists={productData}
              />  
              <PurchaseOrder
                show={PurchaseOrderModalShow}
                onHide={()=>setPurchaseOrderModalShow(false)}
                PurchaseLists={purchaseData}
              />  
 
              <SalesOrder
                show={salesOrderModalShow}
                onHide={()=> setSalesOrderModalShow(false)}
                OrderList={orderData}
            />  
            <CreditSales
             show={creditSalesModalShow}
             onHide={()=> setCreditSalesModalShow(false)}
            />

              <CashCollection
                show={cashCollectionModalShow}
                onHide={()=> setCashCollectionModalShow(false)}
                CashCollectionList={cashCollectionData}
              />
              
              <CashDelivery
                show={cashDeliveryModalShow}
                onHide={()=> setCashDeliveryModalShow(false)}
                CashCollectionList={cashDeliveryData}
              />

              <Income
                show={incomeModalShow}
                onHide={()=> setIncomeModalShow(false)}
                IncomeData={incomeData}
              />
              <Expense
                show={expenseModalShow}
                onHide={()=> setExpenseModalShow(false)}
                ExpenseData={expenseData}
               />
               <AllReport
                 show={allReportModalShow}
                 onHide={()=> setAllReportModalShow(false)}
               />
 </div>    
            
        </Fragment>
    )
}

export default NavigationMenu
