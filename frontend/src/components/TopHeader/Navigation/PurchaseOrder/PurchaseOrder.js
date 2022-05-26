import React, { Fragment, useRef, useEffect, useState } from "react";
import { Button, Modal, ModalDialog, Nav } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePurchaseOrder,
  getPurchaseOrderLists,
} from "../../../../redux/actions/purchaseOrderActions";
import AddPurchaseOrder from "./AddPurchaseOrder";
import EditPurchaseOrder from "./EditPurchaseOrder";
import "./purchase.css";
import PurchaseOrderTable from "./PurchaseOrderTable";
import { useReactToPrint } from "react-to-print";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import swal from "sweetalert";
import { toast } from "react-toastify";
import PurchaseOrderStockPrint from "./PurchaseOrderStockPrint";

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
    id: "mrp",
    label: "MRP",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "total_price",
    label: "Total Price",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
];

const PurchaseOrder = ({ show, onHide }) => {
  


  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState(false);
  const [editPurchaseOrderModal, setEditPurchaseOrderModal] = useState(false);

  const [stockPurchaseOrderModal, setStockPurchaseOrderModal] = useState(false);

  const [singlePurchase, setSinglePurchase] = useState(false);
  const [searchPurchaseOrderText, setSearchPurchaseOrderText] = useState("");
  const [searchStockText, setSearchStockText] = useState("");

  const [isActive, setIsActive] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null);

  const [isSelect, setIsSelect] = useState(false);
  const [selectId, setSelectId] = useState();

  const [purchaseOrderShow, setPurchaseOrderShow] = useState(true);
  const [purchaseOrderTable, setPurchaseOrderTable] = useState(false);
  const [formState, setFormState] = useState({
    checkin: new Date(),
    checkout: new Date(2022, 1, 20),
    additionalComments: "",
  });

  // Fetch purchase order and stock data from api
  const purchaseOrderLists = useSelector((state) => state.purchaseorders);
  const purchasestocks = useSelector((state) => state.purchasestocks);
  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);

  //Show Company data and searches real time
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();

  const purchaseActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    const prod = purchaseOrderLists.find((product) => product.id === id);

    setSinglePurchase(prod);
  };

  const today = new Date();

  const handleChange = (event) => {
    let name = event.target.name || event.target.element.current.name;
    setFormState({ ...formState, [name]: event.target.value });
  };

  const handleClear = () => {
    setSearchPurchaseOrderText("");
    setSearchStockText("");
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  //dispatch(getPurchaseStockLists(headers))
  useEffect(() => {
    dispatch(getPurchaseOrderLists(headers));
    // dispatch(getPurchaseStockLists(headers))
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
        .includes(searchPurchaseOrderText.toLowerCase())
        ||
      search.contact
        .toLowerCase()
        .includes(searchPurchaseOrderText.toLowerCase())
        ||
      search.address
        .toLowerCase()
        .includes(searchPurchaseOrderText.toLowerCase())
    );
  });

  // Purchase order table data show
  const purchaseData = purchaseOrders
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((purchaseOrder, index) => {
      if (purchaseOrder) {
        var date = purchaseOrder.order_date;
        var dateFormat = moment(date).format("DoMMMYY");
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={purchaseOrder.id}
            style={
              isActive === index ? { background: "green" } : { background: "" }
            }
            onClick={() => purchaseActive(index, purchaseOrder.id)}
          >
            {columns.map((column, index) => {
              // console.log(column.id)
              const value = purchaseOrder[column.id];
              return (
                <TableCell className="tableRowData" key={index}>
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
      search.productName
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
  //Delete purchase order
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
          swal("Purchase order Deleted successfully!", {
            icon: "success",
          });
          //dispatch(getPurchaseOrderLists(headers));
          toast.success("Purchase order deleted successfully!");
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
        <Modal.Header style={{  cursor: "move" }} >
          <div >
            <h4 className="modalHeadTitle"> Purchase Orders</h4>
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
                    PurchaseOrder
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => setPurchaseOrderShow(false)}
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
                            onChange={(e) =>
                              setSearchPurchaseOrderText(e.target.value)
                            }
                            type="text"
                            value={searchPurchaseOrderText}
                            placeholder="Search invoice no, name,address, contact person or contact no......"
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
                                  backgroundColor: "blueviolet",
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

                  <div className="col-md-2 modal_showBox2">
                    <div className="productBtns">
                      <Button
                        className="productBtn newbtn"
                        onClick={() => setAddPurchaseOrderModal(true)}
                      >
                        New
                      </Button>
                      <Button
                        className="productBtn editbtn"
                        onClick={() => setEditPurchaseOrderModal(true)}
                      >
                        Edit
                      </Button>
                      <Button className="productBtn deletebtn" onClick={confirmDelete}>
                        Delete
                      </Button>
                      <Button className="productBtn closebtn" onClick={closeHandler}>
                        Close
                      </Button>
                      <Button
                        className="productBtn"
                        onClick={() => setPurchaseOrderTable(true)}
                      >
                        Print
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <PurchaseOrderTable
          date={formState.checkin}
          show={purchaseOrderTable}
          onHide={() => setPurchaseOrderTable(false)}
          handlePrint={handlePrint}
          ref={componentRef}
        />

        <AddPurchaseOrder
          show={addPurchaseOrderModal}
          onHide={() => setAddPurchaseOrderModal(false)}
        />

        <EditPurchaseOrder
          show={editPurchaseOrderModal}
          onHide={() => setEditPurchaseOrderModal(false)}
          purchase={singlePurchase}
        />
          </Modal.Body>
        ) : (
          // End purchase order form
          <Modal.Body>
            <div className="custom_modal_inner_content">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link href="#" onClick={() => setPurchaseOrderShow(true)}>
                    PurchaseOrder
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => setPurchaseOrderShow(false)}
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
                            onChange={(e) =>
                              setSearchPurchaseOrderText(e.target.value)
                            }
                            type="text"
                            value={searchPurchaseOrderText}
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
                                  backgroundColor: "blueviolet",
                                  fontFamily: "Times New Roman",
                                }}
                                className="tableHeadData"
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
                      <Button className="simpleBtn"
                       onClick={()=>setStockPurchaseOrderModal(true)}>Print</Button>
                    </div>
                  </div>
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
          purchase={singlePurchase}
        />
          </Modal.Body>
        )}

       
      </Modal>
    </Fragment>
  );
};

export default PurchaseOrder;
