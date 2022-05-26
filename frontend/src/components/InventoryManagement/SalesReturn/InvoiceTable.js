/* eslint-disable no-unused-vars */
// import React from 'react';

// const InvoiceTable = () => {
//     return (
//         <div>

//         </div>
//     );
// };

// export default InvoiceTable;

import React, { useEffect, useState } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { useDispatch, useSelector } from "react-redux";
import {
  addSalesReturn,
  getSalesReturnLists,
} from "../../../redux/actions/salesReturnActions";
import { toast } from "react-toastify";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("salesReturns");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function InvoiceTable(props) {
  // Sales return state management for local storage
  const [salesReturn, setSalesReturn] = useState(getDatafromLS());
  //Get customer id from child component
  const [getCustomerId, setGetCustomerId] = useState("");
  const [return_date, setReturnDate] = useState("");
  const customerIdhandler = (customerId) => {
    setGetCustomerId(customerId);
  };

  // Get product id, name, category  from the child component --- AddProduct
  const [getProductId, setGetProductId] = useState("");
  const [getProductQty, setGetProductQty] = useState("");
  const [getProductStock, setGetProductStock] = useState(0);
  const [getProductCategory, setGetProductCategory] = useState("");
  const [getProductName, setGetProductName] = useState("");
  const [getProductCompany, setGetProductCompany] = useState("");

  // Product section--- input field management state
  const [invoice_no, setInvoiceNo] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [backAmount, setBackAmount] = useState(0);
  const [currentCredit, setCurrentCredit] = useState(0);

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  //Product form submit handler
  const handleProductSubmit = (e) => {
    e.preventDefault();
    var product = getProductId;
    var productName = getProductName;
    var productCompany = getProductCompany;
    var productCategory = getProductCategory;

    // creating an object for product detials
    let productDetails = {
      productName,
      productCategory,
      productCompany,
      quantity,
      unitPrice,
      total,
      product,
    };
    // Set product details
    setSalesReturn([...salesReturn, productDetails]);
    setQuantity(0);
    setUnitPrice(0);
    setTotal(0);
  };

  // Save data into database
  const dataSaveHandler = () => {
    var SalesReturnDetails = [];
    for (var pair of salesReturn.entries()) {
      var srDetails = {
        product: pair[1].product,
        quantity: pair[1].quantity,
        unit_price: pair[1].unitPrice,
        ut_amount: pair[1].total,
      };
      SalesReturnDetails.push(srDetails);
    }

    var prDetailsData = {
      invoice_no: invoice_no,
      return_date: return_date,
      customer: getCustomerId,
      grand_total: totalTaka,
      paid_amount: backAmount,
      curr_credit: currentCredit,

      return_details: SalesReturnDetails,
    };

    if (invoice_no === null) {
    } else {
      dispatch(addSalesReturn(prDetailsData, headers));
      dispatch(getSalesReturnLists(headers));
      toast.success("Sales return added successfully");
    }
  };

  // delete product from Local Storage
  const deleteProduct = (productId) => {
    const filteredProducts = salesReturn.filter((element, index) => {
      //return element.productId !== productId
      return element.product === productId;
    });
    setSalesReturn(filteredProducts);
  };

  // saving product data to local storage
  useEffect(() => {
    localStorage.setItem("salesReturns", JSON.stringify(salesReturn));
  }, [salesReturn]);

  // Store grand total and total discount and show in final calculation section
  var totalTaka = parseFloat(grandTotal);
  //var netDiscountTaka = parseFloat(netDiscount);

  //console.log(totalTaka);
  const productData = salesReturn.map((data) => {
    totalTaka += parseFloat(data.total);
    //netDiscountTaka += parseFloat(data.ppdis_amount);
    if (data) {
      return (
        <tr style={{ height: "5px", fontSize: "12px" }} key={data.id}>
          <td>{data.product}</td>
          <td>{data.productName}</td>
          <td>{data.productCompany}</td>
          <td>{data.productCategory}</td>
          <td>{data.quantity}</td>
          <td>{data.unitPrice}</td>
          <td>{data.total}</td>
          <td onClick={() => deleteProduct(getProductId)}>
            <Icon icon={trash} />
          </td>
        </tr>
      );
    } else {
      return <p style={{ background: "red" }}>No data found</p>;
    }
  });

  const productQtyHandler = (productQty) => {
    setGetProductQty(productQty);
  };
  const productIdHandler = (productID) => {
    setGetProductId(productID);
  };
  const productCategoryHandler = (productCategory) => {
    setGetProductCategory(productCategory);
  };
  const productNameHandler = (productName) => {
    setGetProductName(productName);
  };
  const productCompanyHandler = (productCompany) => {
    setGetProductCompany(productCompany);
  };
  const productStockHandler = (productStock) => {
    setGetProductStock(productStock);
  };
  // Product input change handler
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
    const qty = e.target.value;
    const total = qty * unitPrice;
    setTotal(total);
    setGrandTotal(total);
  };

  const unitPriceHandler = (e) => {
    setUnitPrice(e.target.value);
    const uPrice = e.target.value;
    const total = quantity * uPrice;
    setTotal(total);
    setGrandTotal(total);
  };
  const backAmountHandler = (e) => {
    setBackAmount(e.target.value);
    const backAmount = e.target.value;
    const curCredit = totalTaka - backAmount;
    setCurrentCredit(curCredit);
  };
  var nowDate = new Date();
  var date =
    nowDate.getFullYear() +
    "/" +
    (nowDate.getMonth() + 1) +
    "/" +
    nowDate.getDate();

  return (
    <div className="mainDiv m-0 px-5">
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        keyboard="false"
        dialogAs={DraggableModal}
      >
        <div style={{ background: "#9fa1ed" }}>
          <Modal.Header
            style={{ background: "rgb(174, 200, 242)", cursor: "move" }}
            closeButton
          >
            <Modal.Title id="example-modal-sizes-title-sm">
              <div style={{ float: "left", height: "3px" }}>
                <h4>Invoice Report</h4>
              </div>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{ background: "#ffffff" }}
            className="m-0 px-5"
            //   ref={ref}
          >
            {/* <Button className="mt-4 btn-danger" onClick={props.handlePrint}>
            Print Report
          </Button> */}
            <div className="text-center">
              <h3>Sokhina Enterprize</h3>
              <h5>New Market , Rajshahi</h5>
              <h5>Mobile : +880 1816 9457</h5>
              <span className="border border-dark py-2 px-4">
                return invoice
              </span>
            </div>
            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right" style={{ fontSize: "10px" }}>
              Print Date: {date}
            </span>

            <div className="container">
              <div className="row">
                <div className="col-md-12 py-3">
                  <div className="row">
                    <div className="col-md-6">
                      <span>
                        <b>Return No : </b>115
                      </span>
                    </div>
                    <div className="col-md-6 text-right">
                      <span>
                        <b>Return Date : </b>12/11/2022{" "}
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <span>
                        <b>Customer :</b> Hakkani
                      </span>
                    </div>
                    <div className="col-md-6 text-right">
                      <span>
                        <b>Mobile: </b> 01745126547{" "}
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <span>
                        <b>Address : </b>jamira,puthia,rajshahi
                      </span>
                    </div>
                    <div className="col-md-6"></div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <span>
                        <b>Propriter : </b> janu alom
                      </span>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container print-receipt">
              <div className="row">
                <div className="col-12">
                  <table className="tabfale">
                    <thead>
                      <tr>
                        <th scope="col">SL</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Company</th>
                        <th scope="col">Model</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>amardfs</td>
                        <td>12546</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@sdsfat</td>
                        <td>12546</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        <td>@sdstwitter</td>
                        <td>12546</td>
                      </tr>
                      <tr>
                        <td colspan="4" className="text-right ">
                          <b className="mr-4">Total</b>
                        </td>
                        <td>12546</td>
                      </tr>

                      <tr>
                        <td colspan="4" className="text-right ">
                          <b className="mr-4">Balance_Total</b>
                        </td>
                        <td>12546</td>
                      </tr>

                      <tr>
                        <td colspan="4" className="text-right ">
                          <b className="mr-4">Current_due</b>
                        </td>
                        <td>100.46</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <p
              style={{
                border: "none",
                borderBottom: "1px dotted black",
              }}
              className="mt-4"
            >
              In Words{" "}
              <b className="ml-5 text-muted">Three thousend taka only </b>
            </p>

            {/* signature part  */}

            <div className="container">
              <div className="row mt-4">
                <div className="col-md-4">
                  <span
                    style={{
                      borderTop: "2px solid black",
                      padding: "3px",
                      fontWeight: "bold",
                    }}
                  >
                    Receiver's
                  </span>
                </div>

                <div className="col-md-4">
                  <span
                    style={{
                      borderTop: "2px solid black",
                      padding: "3px",
                      fontWeight: "bold",
                    }}
                  >
                    Preparied By
                  </span>
                </div>

                <div className="col-md-4">
                  <span
                    style={{
                      borderTop: "2px solid black",
                      padding: "3px",
                      fontWeight: "bold",
                    }}
                  >
                    Authorized By
                  </span>
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: "14px",
                marginTop: "20px",
              }}
            >
              Date : 21/1/2022 12.00 PM
            </p>

            <p
              style={{
                fontSize: "14px",
                marginTop: "20px",
                float: "right",
                overflow: "hidden",
              }}
            >
              powered by Hakkani mim
            </p>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}

export default InvoiceTable;
