import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog, Nav } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import AddPurchaseOrder from "./AddPurchaseOrder";
import EditPurchaseOrder from "./EditPurchaseOrder";
import "./purchase.css";
import axios from "axios";
import { baseUrl } from "../../../RestApi/RestApi";
import {
  deletePurchaseOrder,
  getPurchaseOrderLists,
  getPurchaseStockLists,
} from "../../../redux/actions/purchaseOrderActions";
import { toast } from "react-toastify";
import PrintPuschase from "./PrintPuschase";
import { useReactToPrint } from "react-to-print";
import PurchaseOrderStockPrint from "./PurchaseOrderStockPrint";
import { containerClasses, Skeleton } from "@mui/material";

//import { getOrderLists } from "../../../../redux/actions/salesOredrActions";

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

const PurchaseOrder = ({ show, onHide, PurchaseLists }) => {
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState(false);
  const [editPurchaseOrderModal, setEditPurchaseOrderModal] = useState(false);
  const [printPurchaseOrderModal, setPrintpurchaseModal] = useState(false);
  const [searchPurchaseOrderText, setSearchPurchaseOrderText] = useState("");
  const [searchStockText, setSearchStockText] = useState("");
  const [stockPurchaseOrderModal, setStockPurchaseOrderModal] = useState(false);
  const [purchaseOrderShow, setPurchaseOrderShow] = useState(true);

  const [selectId, setSelectId] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [isActive, setIsActive] = useState(null);

  const [singlePurchaseOrder, setSinglePurchaseOrder] = useState(null);
  const dispatch = useDispatch();

  const handleClear = () => {
    setSearchPurchaseOrderText("");
    setSearchStockText("");
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // Fetch purchase order and stock data from api
  const purchaseOrderLists = useSelector((state) => state.purchaseorders);
  const purchasestocks = useSelector((state) => state.purchasestocks);

  useEffect(() => {
    dispatch(getPurchaseOrderLists(headers));
  }, []);

  //it is show for print options
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //Show Company data and searches real time
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Show purchase order data and searches real time
  const purchaseOrders = purchaseOrderLists.filter((search) => {
    return (
      search.challan_no
        .toLowerCase()
        .includes(searchPurchaseOrderText.toLowerCase()) ||
      search.supplier_name
        .toLowerCase()
        .includes(searchPurchaseOrderText.toLowerCase()) ||
      search.contact_person
        .toLowerCase()
        .includes(searchPurchaseOrderText.toLowerCase()) ||
      search.contact
        .toLowerCase()
        .includes(searchPurchaseOrderText.toLowerCase()) ||
      search.address
        .toLowerCase()
        .includes(searchPurchaseOrderText.toLowerCase())
    );
  });

  // active Purchase order handler
  const orderActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    axios
      .get(`${baseUrl}/orders/update/${id}/`, { headers })
      .then((data) => {
        setSinglePurchaseOrder(data.data);
      })
      .catch((err) => {
        console.log("data not found");
      });
  };

  // Purchase order table data show
  const purchaseData = purchaseOrders
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((order, index) => {
      if (order) {
        var date = order.order_date;
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
            onClick={() => orderActive(index, order.id)}
          >
            {columns.map((column, i) => {
              // console.log(column.id)
              const value = order[column.id];
              return (
                <TableCell key={i} className="tableRowData">
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : column.id === "order_date"
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
            {stockColumn.map((column, index) => {
              // console.log(column.id)
              const value = purchaseStock[column.id];
              return (
                <TableCell className="tableRowData" key={index}>
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

  // Show Confirm Message for deleting

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
          dispatch(deletePurchaseOrder(selectId, headers));
          toast.warn("Purchase order is deleting...");
          setIsSelect(false);
        } else {
          swal("Your data is safe!");
        }
      });
    } else {
      swal("Please select a row!");
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
    setIsSelect(!isSelect)
    setIsActive(null);
  }

  return (
    <Fragment>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={show}
        dialogAs={DraggableModal}
        dialogClassName="purchase"
      >
      <Modal.Header style={{cursor: "move",padding:'6px'}} className="background_and_table_header" >
          <div>
            <h4 className="modalHeadTitle"> Purchase Orders </h4>
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
         
        <div className="custom_modal_inner_content p-4">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link href="#" onClick={() => setPurchaseOrderShow(true)}>
                    Purchase Order
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
                  <div className="col-md-12 col-lg-9 modal_showBox1">
                    <form
                      onSubmit={(e) => e.preventDefault}
                      style={{ paddingTop: "10px" }}
                    >
                      <div className="row searchBox">
                        <div className="searchInput ml-3 form-group">
                          <input
                            onChange={(e) =>
                              setSearchPurchaseOrderText(e.target.value)
                            }
                            type="text"
                            value={searchPurchaseOrderText}
                            placeholder="Search invoice no, name,address, contact person or contact no.."
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
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: 'rgb(221, 221, 221)',
                                  color: "#000",
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
                          {purchaseData.length
                            ? purchaseData
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
                      count={purchaseOrders.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage="Rows"
                      className="product_pagination px-2"
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>

                  {/* Perform Operation using some button */}

                  <div className="col-md-12 col-lg-2 modal_showBox2">
                    <div className="productBtns">
                      <Button
                        className="simpleBtn newbtn"
                        onClick={() => setAddPurchaseOrderModal(true)}
                      >
                        New
                      </Button>
                      <Button
                        className="simpleBtn editbtn"
                        onClick={() => {
                          isSelect
                            ? setEditPurchaseOrderModal(true)
                            : swal("Select any row to edit!");
                        }}
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
                        onClick={() => setPrintpurchaseModal(true)}
                      >
                        Print
                      </Button>
                      <Button
                        className="simpleBtn closebtn"
                        onClick={closeHandler}
                      >
                        Close
                      </Button>

                      <b className="mt-5 d-block text-center">
                        Total Orders: {purchaseOrderLists.length}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <PrintPuschase
              handlePrint={handlePrint}
              ref={componentRef}
              show={printPurchaseOrderModal}
              onHide={() => setPrintpurchaseModal(false)}
            />

            <AddPurchaseOrder
              show={addPurchaseOrderModal}
              onHide={() => setAddPurchaseOrderModal(false)}
            />

            <EditPurchaseOrder
              show={editPurchaseOrderModal}
              onHide={() => setEditPurchaseOrderModal(false)}
              purchase={singlePurchaseOrder}
              select={selectHandler}
            />
          </Modal.Body>
        ) : (
          <Modal.Body className="background_and_table_header">
         
          <div className="custom_modal_inner_content p-4">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    onClick={(e) => {
                      setPurchaseOrderShow(true);
                    }}
                  >
                    Purchase Order
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

              {/* stock content  */}
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-md-9 modal_showBox1">
                    {/* search form  */}
                    <form onSubmit={(e) => e.preventDefault}>
                      <div className="row searchBox">
                        <div className="searchInput ml-3 form-group">
                          <input
                            onChange={(e) => setSearchStockText(e.target.value)}
                            type="text"
                            value={searchStockText}
                            placeholder="Search invoice no, name,address,contact no......"
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

                    {/* stock data table  */}
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
                            {stockColumn.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: 'rgb(221, 221, 221)',
                                  color: "#000",
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
                          {stockData.length
                            ? stockData
                            : stockColumn.map((column, i) => (
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
                        onClick={() => setStockPurchaseOrderModal(true)}
                      >
                        Print
                      </Button>
                    </div>
                  </div>

                  {/* Perform Operation using some button */}
                </div>
              </div>
            </div>
            <PurchaseOrderStockPrint
              handlePrint={handlePrint}
              ref={componentRef}
              show={stockPurchaseOrderModal}
              onHide={() => setStockPurchaseOrderModal(false)}
            />

            <AddPurchaseOrder
              show={addPurchaseOrderModal}
              onHide={() => setAddPurchaseOrderModal(false)}
            />

            <EditPurchaseOrder
              show={editPurchaseOrderModal}
              onHide={() => setEditPurchaseOrderModal(false)}
              purchase={singlePurchaseOrder}
              select={selectHandler}
            />
          </Modal.Body>
        )}
      </Modal>
    </Fragment>
  );
};

export default PurchaseOrder;
