import React, { Fragment, useState, useEffect, useRef } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import AddSalesReturn from "./AddSalesReturn";
import EditSalesReturn from "./EditSalesReturn";
import "./salesreturn.css";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { getSalesReturnLists } from "../../../redux/actions/salesReturnActions";
import InvoiceTable from "./InvoiceTable";
import PrintSalesReturn from "./PrintSalesReturn";
import { useReactToPrint } from "react-to-print";
import { Skeleton } from "@mui/material";

// Set table header name using material-ui
const columns = [
  { id: "return_date", label: "Return Date", minWidth: 20 },
  { id: "invoice_no", label: "Invoice No", minWidth: 30 },
  { id: "customers_name", label: "Customer", minWidth: 30 },
  { id: "cusomters_contact_no", label: "Contact No", minWidth: 30 },
  { id: "paid_amount", label: "Paid Amount", minWidth: 30 },
  { id: "curr_credit", label: "Due Amount", minWidth: 30 },
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

const SalesReturn = ({ show, onHide }) => {
  const [addSalesReturnModal, setAddSalesReturnModal] = useState(false);
  const [editSalesReturnModal, setEditSalesReturnModal] = useState(false);
  const [printSalesReturnModal, setPrintSalesReturnModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [searchSalesReturnText, setSearchSalesReturnText] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [singleSalesReturn, setSingleSalesReturn] = useState(null);
  //Show Company data and searches real time
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  // Fetch purchase order and stock data from api
  const salesreturnLists = useSelector((state) => state.salesreturnLists);
  const dispatch = useDispatch();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const handleClear = () => {
    setSearchSalesReturnText("");
  };

  // active sales return handler
  const salesReturnActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setIsSelect(true);
    }
    const srl = salesreturnLists.find((sr) => sr.id === id);
    setSingleSalesReturn(srl);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //it is show for print options
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getSalesReturnLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //Cash delivery Data Show and real time searching
  // eslint-disable-next-line array-callback-return
  const SalesReturn = salesreturnLists.filter((search) => {
    if (search != null) {
      //console.log(search);
      return (
        search.invoice_no
          .toLowerCase()
          .includes(searchSalesReturnText.toLowerCase()) ||
        search.cusomters_contact_no
          .toLowerCase()
          .includes(searchSalesReturnText.toLowerCase()) ||
        search.return_date
          .toLowerCase()
          .includes(searchSalesReturnText.toLowerCase()) ||
        search.customers_name
          .toLowerCase()
          .includes(searchSalesReturnText.toLowerCase())
      );
    } else {
      //console.log("Null Data: "+ search);
    }
  });

  const SalesReturnData =
    SalesReturn.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .length > 0 ? (
      SalesReturn.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ).map((SalesReturnData, index) => {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={SalesReturnData.id}
            style={
              isActive === index
                ? { background: "rgba(180, 216, 255, 1)" }
                : { background: "" }
            }
            onClick={() => salesReturnActive(index, SalesReturnData.id)}
          >
            {columns.map((column, i) => {
              const value = SalesReturnData[column.id];
              var date = SalesReturnData.return_date;
              return (
                <TableCell
                  key={i}
                  style={{
                    fontSize: "17px",
                    fontFamily: "Times New Roman",
                  }}
                >
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : column.id === "return_date"
                      ? moment(date).format("Do MMM YY")
                      : value}

                  {/* {value? value: column.id ==="category.name"? product.category.name: product.company.name} */}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })
    ) : (
      <TableRow hover tabIndex={-1}>
        {columns.map((column, i) => {
          return (
            <TableCell
              key={i}
              style={{
                fontSize: "14px",
                fontFamily: "Times New Roman",
              }}
            >
              No Data
            </TableCell>
          );
        })}
      </TableRow>
    );
  const editPurchaseReturnHandler = () => {
    if (isSelect) {
      setEditSalesReturnModal(true)
    } else {
      swal("Select any product to edit!")
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
        dialogClassName="sales-retun-modal"
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div style={{ float: "left" }}>
            <h4 className="modalHeadTitle"> Sales Return</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content">
            <div className="container-fluid ">
              <div className="row justify-content-center">
                <div className="col-md-9 modal_showBox1">
                  <form
                    onSubmit={(e) => e.preventDefault}
                    style={{ paddingTop: "10px" }}
                  >
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) =>
                            setSearchSalesReturnText(e.target.value)
                          }
                          type="text"
                          value={searchSalesReturnText}
                          placeholder="Search for date, invoice, customer and contact.."
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
                      sx={{ minWidth: 730 }}
                      size="small"
                      stickyHeader
                      aria-label="sticky table"
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
                        {SalesReturnData.length
                          ? SalesReturnData
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
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={SalesReturn.length}
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
                      onClick={() => setAddSalesReturnModal(true)}
                    >
                      New
                    </Button>

                    <Button
                      className="productBtn editbtn"
                      onClick={editPurchaseReturnHandler}
                    >
                      Edit
                    </Button>

                    <Button
                      className="productBtn newbtn"
                      onClick={() => setInvoiceModal(true)}
                    >
                      Invoice
                    </Button>

              

                    <Button
                      className="productBtn"
                      onClick={() => setPrintSalesReturnModal(true)}
                    >
                      Print
                    </Button>
                    <Button className="productBtn closebtn" onClick={onHide}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <AddSalesReturn
          show={addSalesReturnModal}
          onHide={() => setAddSalesReturnModal(false)}
        />
        <EditSalesReturn
          show={editSalesReturnModal}
          onHide={() => setEditSalesReturnModal(false)}
          singleSalesReturn={singleSalesReturn}
          select={selectHandler}
        />

        <InvoiceTable
          show={invoiceModal}
          onHide={() => setInvoiceModal(false)}
        />
        <PrintSalesReturn
          handlePrint={handlePrint}
          ref={componentRef}
          show={printSalesReturnModal}
          onHide={() => setPrintSalesReturnModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default SalesReturn;
