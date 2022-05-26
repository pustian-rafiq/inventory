import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { updatePurchase } from "../../../redux/actions/purchaseOrderActions";
import { useForm } from "react-hook-form";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const EditPurchaseOrder = ({ show, onHide, purchase, select }) => {
  const { register, handleSubmit, reset } = useForm();
  const [flatDiscount, setFlatDiscount] = useState(null);
  const [netDiscount, setNetDiscount] = useState(null);
  const [netTotal, setNetTotal] = useState(null);
  const [payAmount, setPayAmount] = useState(null);
  const [currentDue, setCurrentDue] = useState(null);

  const { user: currentUser } = useSelector((state) => state.auth);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const dispatch = useDispatch();


  const updadatePurchaseHandler = (data) => {
    data.challan_no = purchase && purchase.challan_no;
    data.grand_total = purchase && purchase.grand_total;
    data.flat_discount =
      flatDiscount == null ? purchase && purchase.flat_discount : flatDiscount;

    data.net_discount =
      netDiscount == null ? purchase && purchase.net_discount : netDiscount;

    data.net_total =
      netTotal == null ? purchase && purchase.net_total : netTotal;

    data.pay_amount =
      payAmount == null
        ? purchase && purchase.pay_amount == null
          ? 0
          : purchase.pay_amount
        : payAmount;

    data.payment_due =
      currentDue == null ? purchase && purchase.payment_due : currentDue;

    dispatch(updatePurchase(data, headers, purchase && purchase.id, onHide));

    toast.success("Update Process is Going On", {
      icon: ({ theme, type }) => (
        <img
          height={"27px"}
          src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"
        />
      ),
    });
  };

  const flatDiscountHandler = (e) => {
    let flat_dis = (e.target.value / 100) * purchase.grand_total;
    setFlatDiscount(
      flat_dis <= purchase.grand_total ? flat_dis : purchase.grand_total
    );

    const net_dis = purchase.net_discount + flat_dis;
    const net_total = purchase.net_total - flat_dis;
    setNetDiscount(net_dis);
    setNetTotal(net_total);
    setCurrentDue(net_total);
  };

  const paymentHandler = (e) => {
    const payment = parseInt(e.target.value);
    if (netTotal === null) {
      const curDue_initial = purchase.net_total - payment;
      setCurrentDue(curDue_initial);
    } else {
      const curDue_after = netTotal - payment;
      setCurrentDue(curDue_after);
    }

    setPayAmount(payment);
  };

  // This handler hide this modal and send select state to the parent component
  const closeHandler = () => {
    onHide();
    select();
  };

  useEffect(() => {
    reset({});
    setFlatDiscount(null);
    setNetDiscount(null);
    setNetTotal(null);
    setPayAmount(null);
    setCurrentDue(null);
  }, [purchase]);

  return (
    <Modal
      size="lg"
      // eslint-disable-next-line jsx-a11y/aria-props
      aria-spanledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
      // dialogClassName="add-modal"
    >
      <div style={{ background: "#e0d4fa" }}>
        {/* modal header  */}
        <Modal.Header
          style={{ cursor: "move", padding: "6px" }}
          className="background_and_table_header"
        >
          <div>
            <h4
              className="responsive-head"
            >
              Edit Purchase Order
            </h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={closeHandler}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        {/* modal body  */}

        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content p-4">
            <div className="form-horizontal">
              <form onSubmit={handleSubmit(updadatePurchaseHandler)}>
                <div className="container">
                  <div className="row pt-2">
                    <div className="col-md-12 col-lg-8">
                      <div className="row supplierBox">
                        <div className="col-md-12 col-lg-12  border border-light py-2">
                          <h4 className="modalHeadTitle">Supplier</h4>
                          <div className="row ">
                            <div className="col-md-12">
                              <div className="row mt-2">
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-4 input-group input-group-sm">
                                      <span className="spanTitle">
                                        Pur. Date
                                      </span>
                                    </div>
                                    <div className="col-md-8 input-group input-group-sm">
                                      <span className="form-control productInput input-sm">
                                        {purchase &&
                                          moment(purchase.order_date).format(
                                            "Do MMM YY"
                                          )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-4 input-group input-group-sm">
                                      <span className="spanTitle">
                                        Challan No
                                      </span>
                                    </div>
                                    <div className="col-md-8 input-group input-group-sm">
                                      <p className="w-100 bg-white p-2 rounded">
                                        {purchase && purchase.challan_no}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-4">
                                      Supplier Code
                                    </div>
                                    <div className="col-md-8 input-group input-group-sm">
                                      <span className="form-control productInput input-sm ">
                                        {purchase && purchase.supplier_code}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-4">
                                      Supplier Name
                                    </div>
                                    <div className="col-md-8 input-group input-group-sm">
                                      <span className="form-control productInput input-sm ">
                                        {purchase && purchase.supplier_name}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2 mb-2">
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-4 input-group input-group-sm">
                                      <span className="spanTitle">
                                        Prev. Due
                                      </span>
                                    </div>
                                    <div className="col-md-8 input-group input-group-sm">
                                      <span className="form-control productInput input-sm ">
                                        {purchase && purchase.payment_due}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-12 px-1 mt-2">
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
                                {purchase && purchase.product_order_details ? (
                                  purchase.product_order_details.map(
                                    (p, index) => (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{p.product}</td>
                                        <td>{p.purchase_rate}</td>
                                        <td>{p.quantity}</td>
                                        <td>{p.mrp_rate}</td>
                                        <td>{p.ppdis_per}</td>
                                        <td>{p.ppdis_amount}</td>
                                        <td>{p.purchase_rate}</td>
                                        <td>{p.total_amount}</td>
                                        <td>{p.id}</td>
                                      </tr>
                                    )
                                  )
                                ) : (
                                  <tr>
                                    <td>Data is loading ...</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* update form  */}
                    <div className="col-md-12 col-lg-4 supplierBox pt-3">
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="grand_total">
                            G.Total
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control productInput input-sm"
                            id="grand_total"
                            defaultValue={purchase && purchase.grand_total}
                            {...register("grand_total")}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle">Flat Dis.</span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control productInput input-sm"
                            defaultValue={purchase && purchase.td_per}
                            {...register("td_per")}
                            onChange={flatDiscountHandler}
                          />
                          <span className="spanTitle"> % </span>
                          {flatDiscount == null ? (
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              {...register("flat_discount")}
                              defaultValue={0}
                            />
                          ) : (
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              {...register("flat_discount")}
                              value={flatDiscount}
                            />
                          )}
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="netDis">
                            Net Dis
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          {netDiscount == null ? (
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              id="netDis"
                              {...register("net_discount")}
                              defaultValue={purchase && purchase.net_discount}
                              readOnly
                            />
                          ) : (
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              id="netDis"
                              {...register("net_discount")}
                              value={netDiscount}
                              readOnly
                            />
                          )}
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4 col-lg-4 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="net_total">
                            Net Total
                          </span>
                        </div>
                        <div className="col-md-8 col-lg-8 input-group input-group-sm">
                          {netTotal == null ? (
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              id="net_total"
                              {...register("net_total")}
                              defaultValue={purchase && purchase.net_total}
                              readOnly
                            />
                          ) : (
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              id="net_total"
                              {...register("net_total")}
                              value={netTotal}
                              readOnly
                            />
                          )}
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
                            type="number"
                            className="form-control productInput input-sm"
                            id="PayAmt"
                            {...register("pay_amount")}
                            onChange={paymentHandler}
                            defaultValue={0}
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
                          {currentDue == null ? (
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              id="CurrDue"
                              {...register("payment_due")}
                              defaultValue={purchase && purchase.payment_due}
                              readOnly
                            />
                          ) : (
                            <input
                              type="number"
                              className="form-control productInput input-sm"
                              id="CurrDue"
                              {...register("payment_due")}
                              value={currentDue}
                              readOnly
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btnContainer companyBox">
                  <div className="row">
                    <div className="col-md-12 pull-right responsive-btn">
                      <Button
                        className="saveCloseBtn border border-0 closebtn"
                        onClick={closeHandler}
                      >
                        Close
                      </Button>

                      <Button
                        className="saveCloseBtn border border-0 updatebtn"
                        type="submit"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EditPurchaseOrder;
