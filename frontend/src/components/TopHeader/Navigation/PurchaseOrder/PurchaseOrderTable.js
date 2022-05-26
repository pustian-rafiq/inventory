import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from 'moment';
import React, { Fragment, useEffect } from "react";
import { Modal,Button, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseOrderLists } from "../../../../redux/actions/purchaseOrderActions";
import "./purchase.css";



class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

// Set purchase order table header name using material-ui
const columns = [
  { id: "order_date", label: "Purchase Date", minWidth: 30 },
  { id: "challan_no", label: "Challan No", minWidth: 30 },
  { id: "supplier_name", label: "Supplier Name", minWidth: 30 },
  { id: "contact_person", label: "Contact Person", minWidth: 30 },
  { id: "address", label: "Address", minWidth: 30 },
  { id: "contact", label: "Contact No", minWidth: 30 },
  {
    id: "net_total",
    label: "Net Amount",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "pay_amount",
    label: "Paid Amt",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "payment_due",
    label: "Payment Due",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
];

// Create a demo class component for printing data- beacuse react-to-print only work on class component
// class Demo extends React.Component {
//   render() {
//     return (
//       <ComponentToPrint />
//     )
//   }
// }

const PurchaseOrderTable = React.forwardRef((props, ref) => {

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // Fetch purchase order and stock data from api
  const purchaseOrderLists = useSelector(state => state.purchaseorders)

  const dispatch = useDispatch()
  //dispatch(getPurchaseStockLists(headers))
  useEffect(() => {
    dispatch(getPurchaseOrderLists(headers))
  }, [])

  // Purchase order table data show
  const purchaseData = purchaseOrderLists

    .map((purchaseOrder) => {
      if (purchaseOrder) {
        var date = purchaseOrder.order_date;
        var dateFormat = moment(date).format("DoMMMYY")
        return (
          <TableRow hover tabIndex={-1} key={purchaseOrder.id}>
            {columns.map((column) => {
              // console.log(column.id)
              const value = purchaseOrder[column.id];
              return (
                <TableCell

                  className="tableRowData"
                >
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : column.id === "order_date" ? dateFormat : value}

                </TableCell>
              );
            })}
          </TableRow>
        );
      } else {
        return "";
      }
    });

  return (
    <Fragment>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={props.show}
        dialogAs={DraggableModal}
        dialogClassName="modal-bordar-radius-2"
      >
        <Modal.Header style={{ background: "#b4d8ff", cursor: "move" }}>
          <div style={{ float: "left" }}>
            <h4> All Products</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={props.onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body  ref={ref}>
      
          <div className=" ">
          <Button className="mt-4 btn-danger" onClick={props.handlePrint}>
              Print Report
            </Button>
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-12 pt-3 ml-1 showBox1">
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>

                    <TableContainer

                      style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    >
                      <Table
                        stickyHeader
                        aria-label="sticky table"
                        sx={{ minWidth: 550 }}
                        size="small"
                      >
                        <TableHead >
                          <TableRow >
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: "#6d2eff",

                                  fontFamily: "Times New Roman",
                                }}
                                className="tableHeadData"
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>{purchaseData}</TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
});
export default PurchaseOrderTable;