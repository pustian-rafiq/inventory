import moment from "moment";
import React, { useEffect, Fragment, useState, useRef } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import AddCreditSales from "./AddCreditSales";
import "./creditsales.css";
import EditCreditSales from "./EditCreditSales";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import swal from "sweetalert";
import {
  getCreditSales,
  getCreditSalesDetails,
} from "../../../../redux/actions/creditSales";
import { useReactToPrint } from "react-to-print";
import PrintCreditSales from "./PrintCreditSales";
import { Skeleton } from "@mui/material";

// Set purchase order table header name using material-ui
const columns = [
  { id: "invoice_number", label: "Invoice No", minWidth: 30 },
  { id: "sales_date", label: "Sales Date", minWidth: 30 },
  { id: "customer_name", label: "Customer", minWidth: 30 },
  { id: "customer_address", label: "Address", minWidth: 30 },
  { id: "customer_contact_no", label: "Contact No", minWidth: 30 },
  {
    id: "grand_total",
    label: "Total Price",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "down_payment",
    label: "D.Payment",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "remaining",
    label: "Remaining",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  { id: "status", label: "Status", minWidth: 30 },
];

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const CreditSales = ({ show, onHide }) => {
  const [addCreditSalesModal, setAddCreditSalesModal] = useState(false);
  const [editCreditSalesModal, setEditCreditSalesModal] = useState(false);

  const [printCreditSalesModal, setPrintCreditSalesModal] = useState(false);

  const [searchCreditSalesText, setSearchCreditSalesText] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [selectedId, setSelectId] = useState("");
  //const [singleCreditSale, setSingleCreditSale] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleClear = () => {
    setSearchCreditSalesText("");
  };
  // Fetch credit sales data from api
  const { creditsales_list } = useSelector((state) => state.creditsales);

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dispatch = useDispatch();
  //dispatch(getPurchaseStockLists(headers))
  useEffect(() => {
    dispatch(getCreditSales(headers));
  }, []);

  //it is show for print options
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // active credit sale handler
  const creditSaleActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setIsSelect(true);
      setSelectId(parseInt(id));
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Show purchase order data and searches real time
  const creditSales = creditsales_list.filter((search) => {
    return (
      search.invoice_number
        .toLowerCase()
        .includes(searchCreditSalesText.toLowerCase()) ||
      search.customer
        .toLowerCase()
        .includes(searchCreditSalesText.toLowerCase()) ||
      search.address.toLowerCase().includes(searchCreditSalesText.toLowerCase())
    );
  });

  // Purchase order table data show
  const creditSalesData = creditSales
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((creditData, index) => {
      if (creditData) {
        var date = creditData.sales_date;
        var dateFormat = moment(date).format("DoMMMYY");
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={creditData.id}
            style={
              isActive === index
              ? {background: "rgba(180, 216, 255, 1)"}
              : { background: "" }
            }
            onClick={() => creditSaleActive(index, creditData.id)}
          >
            {columns.map((column, i) => {
              const value = creditData[column.id];
              return (
                <TableCell key={i} className="tableRowData">
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : column.id === "sales_date"
                    ? dateFormat
                    : column.id == "status"
                    ? "Due"
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
  // When user close the modal, all properties are reset
  const closeHandler = () => {
    setIsActive(null);
    setIsSelect(false);
    onHide();
  };
  const editHandler = () => {
    if (isSelect && selectedId) {
      console.log("Id", selectedId)
      dispatch(getCreditSalesDetails(selectedId, headers))
      setEditCreditSalesModal(true)
    } else {
      swal("Select any row to edit!");
    }
  }
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
         dialogClassName="credit-sales-modal"
      >
        <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
          <div>
            <h2 className="responsive-head"> Credit Sales Customers </h2>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={closeHandler}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content">
            <div className="container-fluid ">
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-9 modal_showBox1">
                  <form onSubmit={(e) => e.preventDefault}>
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) =>
                            setSearchCreditSalesText(e.target.value)
                          }
                          type="text"
                          value={searchCreditSalesText}
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
                      sx={{ minWidth: 600 }}
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
                        {creditSalesData.length
                          ? creditSalesData
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
                    count={creditSales.length}
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
                  <div className="simpleBtns">
                    <Button
                      className="simpleBtn newbtn"
                      onClick={() => setAddCreditSalesModal(true)}
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
                      className="simpleBtn"
                      onClick={() => setPrintCreditSalesModal(true)}
                    >
                      Print
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
        </Modal.Body>
        <AddCreditSales
          show={addCreditSalesModal}
          onHide={() => setAddCreditSalesModal(false)}
        />
        <EditCreditSales
          show={editCreditSalesModal}
          onHide={() => setEditCreditSalesModal(false)}
          select={selectHandler}
        />
        <PrintCreditSales
          handlePrint={handlePrint}
          ref={componentRef}
          show={printCreditSalesModal}
          onHide={() => setPrintCreditSalesModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default CreditSales;
