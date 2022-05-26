import React from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";
import moment from "moment";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

  const PrintStock = React.forwardRef((props, ref) => {
  const purchasestocks = useSelector((state) => state.purchasestocks);

  console.log(purchasestocks);

  const activeUser = useSelector((state) => state.systeminformation);
  const { name, address, phone, email, start_date, end_date } =
    activeUser?.activeUser;
  const currentDate = new Date().toLocaleString();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
  
   
      <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">
          <div style={{ padding:'2px'}}>
            <h4 
               className="responsive-head print-company"             
            >Stock Print Order</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={props.onHide}
              style={{ cursor: "pointer", padding: "2px", zIndex:'9999' }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body>
        <div className="d-flex justify-content-between"> 
                <button
                  className="
                  print-button 
                  px-lg-4 px-md-4 px-xs-2 py-1 
                  mt-4 mx-lg-5 mx-sm-5 mx-xs-2"
                  onClick={props.onHide}
                >
                  <i
                    className="fa fa-arrow-left mr-2"
                    style={{
                      fontSize: "15px",
                    }}
                  ></i>
                  Back
                </button>


                <button
                  className="print-button 
                  px-lg-4 px-md-4 px-xs-2 py-1 
                  mt-4 mx-lg-5 mx-sm-5 mx-xs-2
                  
                  "
                  onClick={props.handlePrint}
                >
                  <i
                    className="fa fa-print mr-2"
                    style={{
                      fontSize: "18px",
                    }}
                  ></i>
                  Print
                </button>

          </div>


          <div className="mainDiv m-0 px-lg-5 mt-4" ref={ref}>
            <div className="row text-center px-4 print-table-info">
              <div className="col-lg-12 col-md-12">
                <h4 style={{ fontSize: "18px" }}>Company Name: {name}</h4>
                <h5 style={{ fontSize: "15px" }}>Address: {address}</h5>
                <h5 style={{ fontSize: "15px" }}>Mobile: {phone}</h5>
                <h5 style={{ fontSize: "15px" }}>Email: {email}</h5>
                <h5 style={{ fontSize: "15px" }}>
                  From Date: {moment(start_date).format("YYYY-MM-DD")} To{" "}
                  {moment(end_date).format("YYYY-MM-DD")}
                </h5>
              </div>
            </div>

            <div style={{ border: "1px solid black", marginTop: "10px" }}></div>
            <span className="pull-right mb-3" style={{ fontSize: "10px" }}>
              Print Date: {currentDate}
            </span>
            <p className="text-center mt-3 font-weight-bold">Stock Order Print </p>

            <div class="row justify-content-center">
              <div class="col-auto">
                    <table
                          className="table-responsive table">
                            <thead>
                              <tr className="thead">
                                <th
                                  style={{
                                      backgroundColor: "rgb(221,221,221)",
                                      color: "#000",
                                    }}
                                  >
                                    Stock Code
                                </th>
                              <th
                                  style={{
                                    backgroundColor: "rgb(221,221,221)",
                                    color: "#000",
                                  }}
                              >
                                    Product Name
                            </th>
                              <th
                                  style={{
                                    backgroundColor: "rgb(221,221,221)",
                                    color: "#000",
                                  }}
                              >
                                Category
                              </th>
                              <th
                                  style={{
                                    backgroundColor: "rgb(221,221,221)",
                                    color: "#000",
                                  }}
                              >
                                Company
                              </th>
                              <th
                                  style={{
                                    backgroundColor: "rgb(221,221,221)",
                                    color: "#000",
                                  }}
                              >
                                Qty
                              </th>
                              <th
                                      style={{
                                        backgroundColor: "rgb(221,221,221)",
                                        color: "#000",
                                      }}
                              >
                                Pur.Rate
                              </th>

                              <th
                                  style={{
                                    backgroundColor: "rgb(221,221,221)",
                                    color: "#000",
                                  }}
                              >
                                SalesRate
                              </th>

                              <th
                                  style={{
                                    backgroundColor: "rgb(221,221,221)",
                                    color: "#000",
                                  }}
                              >
                                Total_Price
                              </th>
                            </tr>
                        </thead>
                        {purchasestocks.map((stock) => (
                          <tr key={stock?.id}>
                            <td>{stock?.stock_code}</td>
                            <td>{stock?.product_name}</td>
                            <td>{stock?.product_category}</td>
                            <td>{stock?.product_company}</td>
                            <td>{stock?.quantity}</td>
                            <td>{stock?.purchase_rate.toFixed(2)}</td>
                            <td>{stock?.sales_rate}</td>
                            <td>{stock?.total_purchase_amount.toFixed(2)}</td>
                            </tr>
                          ))}
                    </table>
                </div>
            </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default PrintStock;
