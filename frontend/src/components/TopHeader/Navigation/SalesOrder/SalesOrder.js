import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog, Nav } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPurchaseStockLists } from "../../../../redux/actions/purchaseOrderActions";
import {
  getOrderLists,
  getSalesOrderDetails,
  deleteSalesOrder,
} from "../../../../redux/actions/salesOredrActions";
import AddSalesOrder from "./AddSalesOrder";
import EditSalesOrder from "./EditSalesOrder";
import SalesOrderReceipt from "./SalesOrderReceipt";
import "./sales.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import swal from "sweetalert";
import PrintStock from "./PrintStock";
import { useReactToPrint } from "react-to-print";
import PrintOrder from "./PrintOrder";
import { Skeleton } from "@mui/material";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

// Set table header name using material-ui
const columns = [
  { id: "invoice_date", label: "Sales Date", minWidth: 30 },
  { id: "invoice_no", label: "Invoice No", minWidth: 30 },
  { id: "name", label: "Customer Name", minWidth: 30 },
  { id: "address", label: "Address", minWidth: 30 },
  { id: "contact_no", label: "Contact No", minWidth: 30 },
  {
    id: "net_total",
    label: "Total Amt",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "paid_Amt",
    label: "Rec.Amt",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "current_due",
    label: "Due Amt",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
];

// Set purchase stock table header name using material-ui
const stockColumn = [
  { id: "stock_code", label: "Stock Code", minWidth: 30 },
  { id: "product_name", label: "Product Name", minWidth: 30 },
  { id: "product_category", label: "Category", minWidth: 30 },
  { id: "product_company", label: "Company", minWidth: 30 },
  { id: "quantity", label: "Qty", minWidth: 30 },
  {
    id: "purchase_rate",
    label: "Pur.Rate",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "sales_rate",
    label: "Sales Rate",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "total_purchase_amount",
    label: "Total Price",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
];

const SalesOrder = ({ show, onHide }) => {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);


  const [addSalesOrderModal, setAddSalesOrderModal] = useState(false);
  const [editSalesOrderModal, setEditSalesOrderModal] = useState(false);
  const [salesOrderReceiptModal, setSalesOrderReceiptModal] = useState(false);

  const [printSalesOrderModal, setPrintSalesOrderModal] = useState(false);
  const [printstockOrderModal, setprintstockOrderModal] = useState(false);

  const [searchOrderText, setSearchOrderText] = useState("");
  const [searchStockText, setSearchStockText] = useState("");

  //State for selecting row and id
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [selectedId, setSelectId] = useState("");

  //const [singleSale, setSingleSale] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [purchaseOrderShow, setPurchaseOrderShow] = useState(true);

  // Fetch sales order and purchase nstocks data from api
  const { salesorder_list } = useSelector((state) => state.salesorders);
  const purchasestocks = useSelector((state) => state.purchasestocks);

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const dispatch = useDispatch();

  const handleClear = () => {
    setSearchOrderText("");
    setSearchStockText("");
  };

  // sales receipt handler
  const salesReceiptHandler = () => {
    setSalesOrderReceiptModal(true);
  };

  // active sale handler
  const salesOrderActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setIsSelect(true);
      setSelectId(parseInt(id));
    }
  };

  // Delete product handler
  const confirmDelete = () => {
    if (isSelect) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteSalesOrder(selectedId, headers));
          toast.warn("Sales order is deleting...");
        } else {
          swal("Your data is safe!");
        }
      });
    } else {
      swal("Please select a row!");
    }
  };

  //it is show for print options
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    dispatch(getOrderLists(headers));
  }, [currentUser.access, dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Show sales order data and searches real time
  const orderlists = salesorder_list.filter((search) => {
    return (
      search.invoice_no.toLowerCase().includes(searchOrderText.toLowerCase()) ||
      search.name.toLowerCase().includes(searchOrderText.toLowerCase()) ||
      search.address.toLowerCase().includes(searchOrderText.toLowerCase()) ||
      search.contact_no.toLowerCase().includes(searchOrderText.toLowerCase())
    );
  });

  const orderData = orderlists
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((order, index) => {
      if (order) {
        var date = order.invoice_date;
        var dateFormat = moment(date).format("DoMMMYY");
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={order.id}
            style={
              isActive === index
                ? { background: "rgba(180, 216, 255, 1)" }
                : { background: "" }
            }
            onClick={() => salesOrderActive(index, order.id)}
          >
            {columns.map((column, i) => {
              // console.log(column.id)
              const value = order[column.id];
              return (
                <TableCell
                  key={i}
                  className="tableRowData"
                  style={
                    isActive === index ? { color: "#000" } : { color: "black" }
                  }
                >
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : column.id === "invoice_date"
                    ? dateFormat
                    : value}

                  {/* {value? value: column.id ==="category.name"? order.category.name: order.company.name} */}
                </TableCell>
              );
            })}
          </TableRow>
        );
      } else {
        return "";
      }
    });

  // Purchase stock table data show and real time search
  const stockDatas = purchasestocks.filter((search) => {
    return (
      search.stock_code.toLowerCase().includes(searchStockText.toLowerCase()) ||
      search.product_name
        .toLowerCase()
        .includes(searchStockText.toLowerCase()) ||
      search.product_category
        .toLowerCase()
        .includes(searchStockText.toLowerCase()) ||
      search.product_company
        .toLowerCase()
        .includes(searchStockText.toLowerCase())
    );
  });

  const stockData = stockDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((purchaseStock) => {
      if (purchaseStock) {
        return (
          <TableRow hover tabIndex={-1} key={purchaseStock.id}>
            {stockColumn.map((column, i) => {
              // console.log(column.id)
              const value = purchaseStock[column.id];
              return (
                <TableCell key={i} className="tableRowData">
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : value}

                  {/* {value? value: column.id ==="category.name"? order.category.name: order.company.name} */}
                </TableCell>
              );
            })}
          </TableRow>
        );
      } else {
        return "";
      }
    });
  // Edit handler
  const editHandler = () => {
    if (isSelect && selectedId) {
      console.log("Id", selectedId);
      dispatch(getSalesOrderDetails(selectedId, headers));
      setEditSalesOrderModal(true);
    } else {
      swal("Please select any row to edit!");
    }
  };

  // When user close the modal, all properties are reset
  const closeHandler = () => {
    setIsActive(null);
    setIsSelect(false);
    onHide();
  };
  // This handler deselects the data
  const selectHandler = () => {
    setIsSelect(!isSelect);
    setIsActive(null);
  };

  return (
    <Fragment>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={show}
        dialogAs={DraggableModal}
        dialogClassName="sales-modal"
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h2 className="modalHeadTitle"> All Sales Order</h2>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={closeHandler}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        {purchaseOrderShow ? (
          <Modal.Body className="background_and_table_header">
            <div className="custom_modal_inner_content">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link href="#" onClick={() => setPurchaseOrderShow(true)}>
                    Order
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => {
                      setPurchaseOrderShow(false);
                      dispatch(getPurchaseStockLists(headers));
                    }}
                  >
                    Stock
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className="container-fluid ">
                <div className="row justify-content-center">
                  <div className="col-md-9 modal_showBox1">
                    <form onSubmit={(e) => e.preventDefault}>
                      <div className="row searchBox">
                        <div className="searchInput ml-3 form-group">
                          <input
                            onChange={(e) => setSearchOrderText(e.target.value)}
                            type="text"
                            value={searchOrderText}
                            placeholder="Search invoice no,customer name,address,contact no..."
                          />
                        </div>
                        <div className="clearBtn">
                          <button
                            type="reset"
                            onClick={handleClear}
                            className="rounded-pill bg-warning"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </form>
                    <TableContainer
                      sx={{ maxHeight: 440 }}
                      style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    >
                      <Table
                        stickyHeader
                        aria-label="sticky table"
                        sx={{ minWidth: 550 }}
                        size="small"
                      >
                        <TableHead>
                          <TableRow>
                            {columns.map((column, i) => (
                              <TableCell
                                key={i}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: "rgb(221, 221, 221)",
                                  color: "black",
                                  fontSize: "16px",
                                  fontFamily: "Times New Roman",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderData.length
                            ? orderData
                            : columns.map((column, i) => (
                                <TableCell key={i} align={column.align}>
                                  <Skeleton animation="wave" />
                                  <Skeleton animation="wave" />
                                  <Skeleton animation="wave" />
                                </TableCell>
                              ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100, 1000]}
                      component="div"
                      count={orderlists.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage="Rows"
                      className="product_pagination px-2"
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>

                  {/* Perform Operation using some button */}

                  <div className="col-md-2 modal_showBox2">
                    <div className="productBtns">
                      <Button
                        className="simpleBtn newbtn"
                        onClick={() => setAddSalesOrderModal(true)}
                      >
                        New
                      </Button>
                      <Button
                        className="simpleBtn editbtn"
                        onClick={editHandler}
                      >
                        Edit
                      </Button>
                      <Button
                        className="simpleBtn deletebtn"
                        onClick={confirmDelete}
                      >
                        Delete
                      </Button>

                      <Button
                        className="simpleBtn"
                        onClick={() => setPrintSalesOrderModal(true)}
                      >
                        Print
                      </Button>
                      <Button
                        className="simpleBtn"
                        onClick={() => salesReceiptHandler()}
                      >
                        Receipt
                      </Button>
                      <Button
                        className="simpleBtn closebtn"
                        onClick={closeHandler}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AddSalesOrder
              show={addSalesOrderModal}
              onHide={() => setAddSalesOrderModal(false)}
              salesReceiptHandler={salesReceiptHandler}
            />

            <EditSalesOrder
              show={editSalesOrderModal}
              onHide={() => setEditSalesOrderModal(false)}
              select={selectHandler}
            />

            <SalesOrderReceipt
              show={salesOrderReceiptModal}
              onHide={() => setSalesOrderReceiptModal(false)}
              handlePrint={handlePrint}
              ref={componentRef}
              
            />

            <PrintOrder
              handlePrint={handlePrint}
              ref={componentRef}
              show={printSalesOrderModal}
              onHide={() => setPrintSalesOrderModal(false)}
            />
          </Modal.Body>
        ) : (
          // Show Stock Data
          <Modal.Body className="background_and_table_header">
            <div className="custom_modal_inner_content">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link href="#" onClick={() => setPurchaseOrderShow(true)}>
                    Order
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => {
                      setPurchaseOrderShow(false);
                      dispatch(getPurchaseStockLists(headers));
                    }}
                  >
                    Stock
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className="container-fluid ">
                <div className="row justify-content-center">
                  <div className="col-md-9 modal_showBox1">
                    <form onSubmit={(e) => e.preventDefault}>
                      <div className="row searchBox">
                        <div className="searchInput ml-3 form-group">
                          <input
                            onChange={(e) => setSearchStockText(e.target.value)}
                            type="text"
                            value={searchStockText}
                            placeholder="Search stock code,product name,category and company.."
                          />
                        </div>
                        <div className="clearBtn">
                          <button
                            type="reset"
                            onClick={handleClear}
                            className="rounded-pill bg-warning"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </form>
                    <TableContainer
                      sx={{ maxHeight: 440 }}
                      style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    >
                      <Table
                        stickyHeader
                        aria-label="sticky table"
                        sx={{ minWidth: 550 }}
                        size="small"
                      >
                        <TableHead>
                          <TableRow>
                            {stockColumn.map((column, i) => (
                              <TableCell
                                key={i}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: "rgb(221, 221, 221)",
                                  color: "black",
                                  fontSize: "16px",
                                  fontFamily: "Times New Roman",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>{stockData}</TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100, 1000]}
                      component="div"
                      count={stockDatas.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage="Rows"
                      className="product_pagination px-2"
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>
                  <div className="col-md-2 modal_showBox2">
                    <div>
                      <Button
                        className="simpleBtn"
                        onClick={() => setprintstockOrderModal(true)}
                      >
                        Print
                      </Button>
                    </div>
                    <div>
                      <Button className="simpleBtn closebtn" onClick={onHide}>
                        Close
                      </Button>
                    </div>
                  </div>
                  {/* Perform Operation using some button */}
                </div>
              </div>
            </div>

            <AddSalesOrder
              show={addSalesOrderModal}
              onHide={() => setAddSalesOrderModal(false)}
              isLoading={isLoading}
            />
            <EditSalesOrder
              show={editSalesOrderModal}
              onHide={() => setEditSalesOrderModal(false)}
              select={selectHandler}
            />
            <PrintStock
              handlePrint={handlePrint}
              ref={componentRef}
              show={printstockOrderModal}
              onHide={() => setprintstockOrderModal(false)}
            />
          </Modal.Body>
        )}
      </Modal>
    </Fragment>
  );
};

export default SalesOrder;
