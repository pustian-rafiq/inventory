import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { getDesignationDetails, updateDesignation } from "../../../redux/actions/designationActions";
import { useForm } from "react-hook-form";
import SupplierShowModal from "./SearchSupplier/SupplierShowModal";
import ProductShowModal from "./SearchProduct/ProductShowModal";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

function EditPurchaseOrder({ show, onHide, selectedId }) {
  const { register, handleSubmit } = useForm();

  const handleProductSubmit = (e) => {};

  return (
    <Modal
      size="lg"
      aria-spanledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
      dialogClassName="add-modal"
    >
      <div style={{ background: "#e0d4fa" }}>
        {/* modal header  */}
        <Modal.Header style={{ background: "#9fa1ed", cursor: "move" }}>
          <div>
            <h4
              style={{
                textShadow: "2px 3px 4px grey",
              }}
            >
              Edit Purchase Order
            </h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        {/* modal body  */}

        <Modal.Body style={{ background: "var(--modalBodyColor)" }}>
          <div style={{ background: "var(--modalBodyColor)" }}>
            <div className="form-horizontal">
              <div className="container productBox">
                <div className="row">
                  <div className="col-md-12 col-lg-8">
                    <h4 className="modalHeadTitle">Supplier</h4>

                    <form>
                      <div className="row supplierBox">
                        <div className="col-md-12">
                          <div className="row mt-2">
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4 input-group input-group-sm">
                                  <span className="spanTitle">Pur. Date</span>
                                </div>
                                <div className="col-md-8 input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control productInput input-sm"
                                    defaultValue={"20th feb 2021"}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4 input-group input-group-sm">
                                  <span className="spanTitle">Challan No</span>
                                </div>
                                <div className="col-md-8 input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control productInput"
                                    placeholder="Enter challan no"
                                    name="challan_no"
                                    {...register("challan_no")}
                                    defaultValue={20}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-2">
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4 input-group input-group-sm">
                                  <span className="spanTitle">
                                    Supplier Code
                                  </span>
                                </div>
                                <div className="col-md-8 input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control productInput input-sm"
                                    defaultValue={"100"}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4 input-group input-group-sm">
                                  <span className="spanTitle">Name</span>
                                </div>
                                <div className="col-md-8 input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control productInput"
                                    placeholder="Enter challan no"
                                    name="challan_no"
                                    {...register("name")}
                                    defaultValue={"ehsan"}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2 mb-2">
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4 input-group input-group-sm">
                                  <span className="spanTitle">Prev. Due</span>
                                </div>
                                <div className="col-md-8 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput input-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="modalHeadTitle">Product Section</h4>
                      </div>

                      <div className="row supplierBox">
                        <div className="col-md-12">
                          <div className="row mt-2">
                            <div className="col-md-2">
                              <div className="input-group input-group-sm">
                                <span className="spanTitle">Code</span>
                              </div>
                            </div>

                            <div className="col-md-10">
                              <div className="row">
                                <div className="col-md-7">
                                  <div className="col-md-4">
                                    <div className="row">
                                      <div className="col-md-6 input-group input-group-sm">
                                        <span className="spanTitle">
                                          Sales Rate
                                        </span>
                                      </div>
                                      <div className="col-md-6 input-group input-group-sm">
                                        <input
                                          type="number"
                                          className="form-control productInput input-sm"
                                          {...register("sales_rate")}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-5">
                                  <div className="row">
                                    <div className="col-md-6 input-group input-group-sm">
                                      <span className="spanTitle">
                                        Prev. Stock
                                      </span>
                                    </div>
                                    <div className="col-md-6 input-group input-group-sm">
                                      <input
                                        type="number"
                                        className="form-control productInput input-sm"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-2 mb-2">
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">Quantity</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput input-sm"
                                    required
                                    name="quantity"
                                    {...register("quantity")}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">MRP Rate</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput"
                                    required
                                    name="mrp_rate"
                                    {...register("mrp_rate")}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">Total Amt</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput"
                                    // value={parseFloat(total_amount).toFixed(3)}
                                    // readOnly
                                    // onChange={totalAmountHandler}
                                    name="total_amount"
                                    {...register("total_amount")}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-2 mb-2">
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">Sales Rate</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput input-sm"
                                    // required
                                    // onChange={(e) => setSalesRate(e.target.value)}
                                    // value={parseFloat(sales_rate)}
                                    {...register("sales_rate")}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">Pur. Rate</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput"
                                    // value={parseFloat(purchase_rate).toFixed(3)}
                                    // readOnly
                                    name="purchase_rate"
                                    {...register("purchase_rate")}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-2 mb-2">
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">PP DIS</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput input-sm"
                                    // required
                                    // onChange={ppDiscounthandler}
                                    // value={ppdis_per}
                                    {...register("ppdis_amount")}
                                    name="ppdis_per"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <span className="spanTitle">%</span>
                                </div>
                                <div className="col-md-6 input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control productInput"
                                    // value={parseFloat(ppdis_amount).toFixed(3)}
                                    // readOnly
                                    //onChange={tDiscountHandler}
                                    {...register("ppdis_per")}
                                    name="ppdis_amount"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 input-group input-group-sm">
                                  <Button type="submit" className="productBtn">
                                    Add
                                  </Button>
                                </div>

                                <div className="col-md-6 input-group input-group-sm">
                                  <Button className="productBtn">Remove</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-12 col-lg-4 supplierBox">
                    <div className="row">
                      <div
                        className="tableContainer table-responsive"
                        style={{ height: "350px" }}
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
                                Bar Code
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ height: "5px", fontSize: "12px" }}>
                              <td>1</td>
                              <td>Banana</td>
                              <td>100</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom table Section to show the total,due,discocunt ,mrp and another */}

                <div className="row pt-2">
                  <div className="col-md-8 col-lg-8 supplierBox">
                    <div
                      className="tableContainer table-responsive"
                      style={{ height: "300px" }}
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
                              MRP
                            </th>
                            <th className="header" scope="col">
                              Dis(%)
                            </th>
                            <th className="header" scope="col">
                              D.Amt
                            </th>
                            <th className="header" scope="col">
                              P.Rate
                            </th>
                            <th className="header" scope="col">
                              Total
                            </th>
                            <th className="header" scope="col">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Show Product */}
                          {/* {productData} */}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-4 supplierBox pt-3">
                    <form>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="grand_totall">
                            G.Total
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control productInput input-sm"
                            id="grand_totall"
                            // readOnly
                            // value={parseFloat(totalTaka).toFixed(3)}
                            // onChange={(e) => setGrandTotal(e.target.value)}
                            name="grand_total"
                            {...register("grand_total")}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="FlatDis">
                            Flat Dis.
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            // value={parseFloat(flatDiscount)}
                            // onChange={flatDiscountHandler}
                            id="FlatDis"
                            name="td_per"
                            {...register("flat_discount")}
                          />
                          <span className="spanTitle"> % </span>
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            id="warningQty"
                            // value={parseFloat(flatDiscountAmount).toFixed(3)}
                            name="flat_discount"
                            {...register("td_per")}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="netDis">
                            Net Dis
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control productInput input-sm"
                            id="netDis"
                            // readOnly
                            // value={parseFloat(netDiscountTaka).toFixed(3)}
                            // onChange={(e) => setNetDiscount(e.target.value)}
                            name="net_discount"
                            {...register("net_discount")}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="nettotal">
                            Net Total
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control productInput input-sm"
                            id="nettotal"
                            {...register("net_total")}

                            // value={netTotal}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="PayAmt">
                            Pay Amt.
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            id="PayAmt"
                            // onChange={paymentHandler}
                            // name="pay_amount"
                            // value={paymentAmount}
                            {...register("pay_amount")}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="CurrDue">
                            Curr Due
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            id="CurrDue"
                            // value={currentDue}
                            name="payment_due"
                            {...register("payment_due")}
                            readOnly
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Product Section End Here */}

              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right">
                    <Button className="saveCloseBtn" onClick={onHide}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="saveCloseBtn"
                      // onClick={dataSaveHandler}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default EditPurchaseOrder;
