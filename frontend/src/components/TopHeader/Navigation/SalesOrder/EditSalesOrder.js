/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { useForm } from "react-hook-form";
import { getBankTransactionLists } from "../../../../redux/actions/bankTransactionActions ";
import {
  addSalesOrder,
  getOrderLists,
} from "../../../../redux/actions/salesOredrActions";

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
  const data = localStorage.getItem("salesProducts");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function EditSalesOrder({ show, onHide, select }) {
  const { register } = useForm();

  // Product details state management
  const [salesProducts, setSalesProducts] = useState(getDatafromLS());

  /*
   * ---Get this state from child component -- CustomerSearch
   */
  const [getCustomerId, setGetCustomerId] = useState("");
  const [getCustomerPrevDue, setGetCustomerPrevDue] = useState("");

  /*
   * ---Get this state from child component -- ProductShowModal
   */
  const [getProductId, setGetProductId] = useState("");
  const [getPrevStock, setGetPrevStock] = useState("");
  const [getProductCategory, setGetProductCategory] = useState("");
  const [getProductName, setGetProductName] = useState("");
  const [getSalesRate, setGetSalesRate] = useState("");
  const [getProductCompressor, setGetProductCompressor] = useState("");
  const [getProductMotor, setGetProductMotor] = useState("");
  const [getProductPanel, setGetProductPanel] = useState("");
  const [getProductSparepart, setGetProductSparepart] = useState("");
  const [getProductService, setGetProductService] = useState("");

  /*
   * ---Product section--- input field management state
   */
  const [quantity, setQuantity] = useState("");
  const [s_rate, setSalesRate] = useState("");
  const [total_amount, setTotalAmount] = useState("");
  const [ppd_percentage, setDiscount] = useState("");
  const [ppd_amount, setDiscountAmount] = useState("");
  const [unit_price, setUnitPrice] = useState("");

  /*
   * ---Supplier,Remind date and Card Payment section--- input field management state
   */
  const [invoiceNo, setInvoiceNo] = useState("");
  const [remindDate, setRemindDate] = useState("");
  const [remaindPeriod, setRemindPeriod] = useState("");
  const [status, setStatus] = useState("");
  const [bankTranId, setbankTranId] = useState("");
  const [cardTypeSetupId, setCardTypeSetupId] = useState("");
  const [cardPaymentAmount, setcardPaymentAmount] = useState("");

  /*
   * ---Final calculation state management here
   */

  const [grandTotal, setGrandTotal] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [flatDiscountAmount, setFlatDiscountAmount] = useState(0);
  const [netDiscount, setNetDiscount] = useState(0);
  const [vat, setVat] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [cashPaid, setCashPaid] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [adjustAmount, setAdjustAmount] = useState(0);
  const [currentDue, setCurrentDue] = useState(0);

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // Get credit sales details
  const { salesorder_details } = useSelector((state) => state.salesorders);

  const sales_details =
    salesorder_details && salesorder_details.sales_order_details;

  if (sales_details) {
    var salesProductData = sales_details.map((data, i) => {
      if (data) {
        return (
          <tr style={{ height: "5px", fontSize: "12px" }} key={data.id}>
            <td>{++i}</td>
            <td>{data.salesProductName}</td>
            <td>{data.salesProductCategory}</td>
            <td>{data.quantity}</td>
            <td>{data.unit_price}</td>
            <td>{data.ppd_percentage}</td>
            <td>{data.ppd_amount}</td>
            <td>{data.total_amount}</td>
          </tr>
        );
      } else {
        return <p style={{ background: "red" }}>No data found</p>;
      }
    });
  }

  const quantityHandler = (e) => {
    setQuantity(e.target.value);
    const quantity = e.target.value;
    if (getPrevStock < quantity) {
      toast.success("Stock less than quantity!");
    }
  };

  const ppDiscounthandler = (e) => {
    setDiscount(e.target.value);
    const ppdiscount = e.target.value;
    const tDiscountAmount = (ppdiscount / 100) * getSalesRate;
    const unitPrice = getSalesRate - tDiscountAmount;
    const totalAmount = unitPrice * quantity;

    setUnitPrice(unitPrice);
    setDiscountAmount(tDiscountAmount);
    setTotalAmount(totalAmount);
  };

  const flatDiscountHandler = (e) => {};
  const grandTotalHandler = (e) => {};
  const vatHandler = (e) => {};
  const cashPaidHandler = (e) => {};

  const adjustHandler = (e) => {};

  // Fetch Bank transaction no and card type id from bank transaction and card-type-setup api
  const { banks } = useSelector((state) => state.banks);
  const {card_types} = useSelector((state) => state.cardtypes);

  // Problem here render again and again
  //console.log(bankTransactionList);
  //console.log(cardtypeSetupLists);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBankTransactionLists(headers));
    // dispatch(getCardTypeSetupLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Map bank name
  const bank = banks.map((data) => {
    return (
      <option key={data.id} value={data.id}>
        {data.bank_name}
      </option>
    );
  });
  // Map card type name
  const cardTypeList = card_types.map((data) => {
    return (
      <option key={data.id} value={data.id}>
        {data.description}
      </option>
    );
  });

  // Add sales order data
  const dataSaveHandler = () => {
    var salesProductDetails = [];

    for (var pair of salesProducts.entries()) {
      var salesProduct = {
        ProductID: pair[1].productID,
        quantity: pair[1].quantity,
        unit_price: pair[1].unit_price,
        s_rate: pair[1].s_rate,
        total_amount: pair[1].total_amount,
        ppd_percentage: pair[1].ppd_percentage,
        ppd_amount: pair[1].ppd_amount,
      };

      salesProductDetails.push(salesProduct);
    }

    var salesProductDetailsData = {
      invoice_no: invoiceNo,
      cumtomerID: getCustomerId,
      remind_date: remindDate,
      remind_day: remaindPeriod,
      status: status,
      bank_tranId: bankTranId,
      card_type_setupID: cardTypeSetupId,
      card_paid_amount: cardPaymentAmount,
      grand_total: 0,
      flat_discount: flatDiscount,
      fd_amount: flatDiscountAmount,
      net_discount: netDiscount,
      net_total: netTotal,
      vat_percentage: vat,
      vat_amount: vatAmount,
      cash_paid: cashPaid,
      paid_Amt: paidAmount,
      adjustment: adjustAmount,
      current_due: currentDue,
      total_due: currentDue + getCustomerPrevDue,

      sales_order_details: salesProductDetails,
    };

    if (invoiceNo === null) {
    } else {
      //console.log("Form Data" + salesProductDetailsData);

      dispatch(addSalesOrder(salesProductDetailsData, headers));
      dispatch(getOrderLists(headers));
      toast.success("Sales Order Product added successfully");
    }
  };
  // This handler hide this modal and send select state to the parent component
  const closeHandler = () => {
    onHide();
    select();
  };
  return (
    <Modal
      size="lg"
      // eslint-disable-next-line jsx-a11y/aria-props
      // aria-spanledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
      dialogClassName="add-modal"
    >
      <div>
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="modalHeadTitle">Edit Sales Order</h4>
          </div>
          <div className="pull-right">
            <i className="fa fa-minus mr-2"></i>
            <i
              className="fa fa-close"
              onClick={closeHandler}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content">
            {/* Company Add Form Start Here */}

            {/* <h4 className="modalHeadTitle">Customer Information</h4> */}
            <div className="container productBox">
              <div className="row ">
                <div className="col-md-8 col-lg-9">
                  <h4 className="sectionTitle">Customer</h4>
                  <div className="row supplierBox ">
                    <div className="col-md-12">
                      <div className="row mt-4">
                        <div className="col-md-6 col-lg-4">
                          <div className="row">
                            <div className="col-md-12 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle">Invoice</span>
                            </div>
                            <div className="col-md-12 col-lg-8 input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control productInput"
                                value={salesorder_details.invoice_no}
                                name="invoice_no"
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="row">
                            <div className="col-md-12 col-lg-5 input-group input-group-sm">
                              <span className="spanTitle">Sales Date</span>
                            </div>
                            <div className="col-md-12 col-lg-7 input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control productInput"
                                value={moment(
                                  salesorder_details.invoice_date
                                ).format("YYYY-MM-DD")}
                                readOnly
                                //onChange={(e)=> setSalesDate(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="row">
                            <div className="col-md-12 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle">Prev.Due</span>
                            </div>
                            <div className="col-md-12 col-lg-8 input-group input-group-sm">
                              <input
                                type="number"
                                className="form-control productInput"
                                //value={salesorder_details}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Customer Search */}

                      <div className="row  mb-3  topMargin">
                        <div className="col-md-12 col-lg-4">
                          <div className="row">
                            <div className="col-md-12 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle">Code</span>
                            </div>
                            <div className="col-md-12 col-lg-8 input-group input-group-sm">
                              <input
                                type=""
                                className="form-control productInput"
                                value={salesorder_details.customer_code}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-5">
                          <div className="row">
                            <div className="col-md-12 col-lg-4 input-group input-group-sm">
                              <span className="spanTitle">Name</span>
                            </div>
                            <div className="col-md-12 col-lg-8 input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control productInput"
                                value={salesorder_details.customer_name}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Remind section start here */}
                <div className="col-sm-12 col-md-4 col-lg-3">
                  <h4 className="sectionTitle">Remind Date</h4>
                  <div className="row supplierBox">
                    <div className="col-md-12">
                      <div className="row mt-2">
                        <div className="col-sm-12 col-md-4 input-group input-group-sm">
                          <span className="spanTitle">R.Date</span>
                        </div>
                        <div className="col-sm-12 col-md-8 input-group input-group-sm">
                          <input
                            type="date"
                            className="form-control productInput"
                            name="remind_date"
                            value={remindDate}
                            onChange={(e) => setRemindDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-4 input-group input-group-sm">
                          <span className="spanTitle">R.Period</span>
                        </div>
                        <div className="col-sm-12 col-md-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput"
                            name="remind_day"
                            placeholder="Ex: 1 month"
                            value={remaindPeriod}
                            onChange={(e) => setRemindPeriod(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-md-12"></div>
                        <div className="col-sm-12 col-md-4 input-group input-group-sm">
                          <span className="spanTitle">R.Status</span>
                        </div>
                        <div className="col-sm-12 col-md-8 input-group input-group-sm">
                          <select
                            className="form-control input-group input-group-sm"
                            name="status"
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            {/* <option value="">Select Status</option> */}
                            <option value="DAY">Days</option>
                            <option value="MONTH">Months</option>
                            <option value="YEAR">Years</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <h4 className="responsive-head">Product</h4>
                  <div className="row supplierBox">
                    <div className="col-md-8 col-lg-8 supplierBox">
                      <div
                        className="tableContainer table-responsive"
                        style={{ height: "150px" }}
                      >
                        <table className="table">
                          <thead
                            style={{ position: "sticky", top: 0 }}
                            className="thead-dark"
                          >
                            <tr style={{ height: "5px", fontSize: "12px" }}>
                              <th className="header" scope="col">
                                SN
                              </th>
                              <th className="header" scope="col">
                                Name
                              </th>
                              <th className="header" scope="col">
                                Category
                              </th>
                              <th className="header" scope="col">
                                QTY
                              </th>
                              <th className="header" scope="col">
                                U.Price
                              </th>
                              <th className="header" scope="col">
                                Dis(%)
                              </th>
                              <th className="header" scope="col">
                                D.Amt
                              </th>
                              <th className="header" scope="col">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>{salesProductData}</tbody>
                        </table>
                      </div>
                    </div>
                    {/* Card Payment Start Here */}
                    <div className="col-sm-12 col-md-5 col-lg-4">
                      <h4 className=" responsive-head text-center">Card Payment</h4>
                      <div className="row supplierBox">
                        <div className="col-md-12">
                          <div className="row mt-2">
                            <div className="col-sm-12 col-md-4 input-group input-group-sm">
                              <span className="spanTitle">Bank</span>
                            </div>
                            <div className="col-sm-12 col-md-8 input-group input-group-sm">
                              <select
                                className="form-control input-group input-group-sm"
                                name="bank_tranId"
                                onChange={(e) => setbankTranId(e.target.value)}
                              >
                                <option>Select Bank</option>
                                {bank}
                              </select>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-sm-12 col-md-4 input-group input-group-sm">
                              <span className="spanTitle">Card</span>
                            </div>
                            <div className="col-sm-12 col-md-8 input-group input-group-sm">
                              <select
                                className="form-control"
                                name="card_type_setupID"
                                onChange={(e) =>
                                  setCardTypeSetupId(e.target.value)
                                }
                              >
                                <option>Select Card Type</option>
                                {cardTypeList}
                              </select>
                            </div>
                          </div>
                          <div className="row mt-2 mb-2">
                            <div className="col-sm-12 col-md-4 input-group input-group-sm">
                              <span className="spanTitle">Amount</span>
                            </div>
                            <div className="col-sm-12 col-md-8 input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control productInput"
                                name="card_paid_amount"
                                value={cardPaymentAmount}
                                onChange={(e) =>
                                  setcardPaymentAmount(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section  table secttionn */}
              <h4 className=" mt-2 responsive-head text-center">Details Information</h4>
              <div className="row pt-2">
                <div className="col-md-12 col-lg-12 supplierBox pt-3 ">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle">Grand Total</span>
                        </div>
                        <div className="col-md-12 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={parseFloat(
                              salesorder_details.grand_total
                            ).toFixed(3)}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle">Flat Dis(%)</span>
                        </div>
                        <div className="col-md-12 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={parseFloat(salesorder_details.flat_discount)}
                          />
                          <span className="spanTitle"> % </span>
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={parseFloat(flatDiscountAmount).toFixed(3)}
                            name="fd_amount"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-4 input-group input-group-sm">
                          <span
                            className="spanTitle"
                            title="Net discount amount"
                          >
                            Net Dis.
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            //value={parseFloat(netDTaka).toFixed(3)}
                            name="net_discount"
                            value={parseFloat(
                              salesorder_details.net_discount
                            ).toFixed(3)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle">Net Total</span>
                        </div>
                        <div className="col-md-12 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            name="net_total"
                            value={parseFloat(
                              salesorder_details.net_total
                            ).toFixed(3)}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle">Vat</span>
                        </div>
                        <div className="col-md-12 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            name="vat_percentage"
                            value={parseFloat(
                              salesorder_details.vat_percentage
                            ).toFixed(3)}
                          />
                          <span className="spanTitle"> % </span>
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            // value={vatAmount.toFixed(3)}
                            name="vat_percentage"
                            value={parseFloat(
                              salesorder_details.vat_amount
                            ).toFixed(3)}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle">Payable Amt.</span>
                        </div>
                        <div className="col-md-12 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={parseFloat(
                              salesorder_details.cash_paid
                            ).toFixed(3)}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle">Cash Paid</span>
                        </div>
                        <div className="col-md-12 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            name="paid_amount"
                            value={parseFloat(
                              salesorder_details.paid_Amt
                            ).toFixed(3)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle">Adjust Amt.</span>
                        </div>
                        <div className="col-md-12 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            value={parseFloat(
                              salesorder_details.adjustment
                            ).toFixed(3)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle">Curr. Due</span>
                        </div>
                        <div className="col-md-12 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            id="warningQty"
                            value={parseFloat(
                              salesorder_details.current_due
                            ).toFixed(3)}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 pull-right responsive-btn">
                  <Button
                    className="saveCloseBtn closebtn border border-none mr-3"
                    onClick={closeHandler}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="saveCloseBtn border border-none"
                    onClick={dataSaveHandler}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Company Add Form End Here */}
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default EditSalesOrder;

// { api name : ( update sales order  => ArifBro)

//   "id": 5,
//   "invoice_no": "10Jan22-001",
//   "invoice_date": "2022-01-10T18:23:03.710884+06:00",
//   "remaind_date": "2022-01-10T18:23:03.711015+06:00",
//   "remaind_day": 0,
//   "status": "DAY",
//   "card_paid_amount": 10.0,
//   "flat_discount": 0.0,
//   "fd_amount": 0.0,
//   "net_discount": 0.0,
//   "vat_percentage": 0.0,
//   "vat_amount": 0.0,
//   "net_total": 0.0,
//   "cash_paid": 0.0,
//   "total_due": -1.0,
//   "adjustment": 0.0,
//   "current_due": 0.0,
//   "grand_total": 890.0,
//   "paid_Amt": 0.0,
//   "created_date": "2022-01-10T18:23:03.711181+06:00",
//   "modified_date": "2022-01-11T16:53:50.940583+06:00",
//   "remarks": "Sels order",
//   "deposite_charge": 0.0,
//   "cumtomerID": 3,
//   "bank_tranId": null,
//   "card_type_setupID": 4,
//   "created_by": null,
//   "modified_by": null,
//   "customer_name": "Tonay",
//   "customer_code": "456",
//   "sales_order_details": [
//       {
//           "id": 3,
//           "unit_price": 890.0,
//           "ppd_percentage": 11.0,
//           "ppd_amount": 110.0,
//           "quantity": 1,
//           "total_amount": 890.0,
//           "mp_rate": 0.0,
//           "mp_rate_total": 0.0,
//           "is_free": false,
//           "p_rate": 0.0,
//           "s_rate": 1000.0,
//           "w_status": true,
//           "compressor_warrenty": 9,
//           "panel_warrenty": 9,
//           "motor_warrenty": 9,
//           "spare_parts_warrenty": 9,
//           "service_warrenty": 9,
//           "ProductID": 2,
//           "s_orderID": 5,
//           "stock_detail_id": 3
//       }
//   ]
// }
