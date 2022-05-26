import React, { Fragment, useState, useEffect, useRef } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import AddPurchaseReturn from "./AddPurchaseReturn";
import EditPurchaseReturn from "./EditPurchaseReturn";
import "./purchasereturn.css";
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
import { getPurchaseReturnLists } from "../../../redux/actions/purchaseReturnActions";
import PurchaseTable from "./PurchaseTable";
import PrintPurchaseReturn from "./PrintPurchaseReturn";
import { useReactToPrint } from "react-to-print";
import { Skeleton } from "@mui/material";

// Set table header name using material-ui
const columns = [
  { id: "return_date", label: "Return Date", minWidth: 30 },
  { id: "invoice_no", label: "Invoice No", minWidth: 30 },
  { id: "suppliers_name", label: "Supplier", minWidth: 30 },
  { id: "suppliers_contact_no", label: "Contact No", minWidth: 30 },
  {
    id: "paid_amount",
    label: "Paid Amount",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
 
  {
    id: "curr_credit",
    label: "Due Amount",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
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

const PurchaseReturn = ({ show, onHide }) => {
  const [addPurchaseReturnModal, setAddPurchaseReturnModal] = useState(false);
  const [editPurchaseReturnModal, setEditPurchaseReturnModal] = useState(false);
  const [printPurchaseReturnModal, setPrintPurchaseReturnModal] =
    useState(false);
  const [invoiceTable, setInvoiceTable] = useState(false);
  const [searchPurchaseReturnText, setSearchPurchaseReturnText] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [singlePurchaseReturn, setSinglePurchaseReturn] = useState(null);
  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  // Fetch purchase return data from api
  const purchasereturnLists = useSelector((state) => state.purchasereturnLists);
  const dispatch = useDispatch();
  //Show Company data and searches real time
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(200);

  const handleClear = () => {
    setSearchPurchaseReturnText("");
  };
  // active purchase return handler
  const purchaseReturnActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setIsSelect(true);
    }
    const prl = purchasereturnLists.find((il) => il.id === id);
    setSinglePurchaseReturn(prl);
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  useEffect(() => {
    dispatch(getPurchaseReturnLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //it is show for print options

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Cash delivery Data Show and real time searching
  const searchDatas = purchasereturnLists?.filter((search) => {
    //console.log(search);
    return (
      search?.invoice_no
        .toLowerCase()
        .includes(searchPurchaseReturnText.toLowerCase()) ||
      search?.return_date
        .toLowerCase()
        .includes(searchPurchaseReturnText.toLowerCase()) ||
      search?.suppliers_name
        .toLowerCase()
        .includes(searchPurchaseReturnText.toLowerCase()) ||
      search?.suppliers_contact_no
        .toLowerCase()
        .includes(searchPurchaseReturnText.toLowerCase())
    );
  });

  const PurchaseReturnData =
    searchDatas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .length > 0 ? (
      searchDatas
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((purchaseReturnData, index) => {
          return (
            <TableRow
              hover
              tabIndex={-1}
              key={purchaseReturnData.id}
              style={
                isActive === index
                  ? { background: "rgba(180, 216, 255, 1)" }
                  : { background: "" }
              }
              onClick={() => purchaseReturnActive(index, purchaseReturnData.id)}
            >
              {columns.map((column, i) => {
                const value = purchaseReturnData[column.id];
                var date = purchaseReturnData.return_date;
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
const editPurchaseReturnHandler=()=>{
  if(isSelect){
    setEditPurchaseReturnModal(true)
  }else{
    swal("Select any product to edit!")
  }  
}
const selectHandler =()=> {
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
        // dialogClassName="purchase-return-modal"
      >
        <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
          <div>
        
            <h4 className="responsive-head"> Purchase Return</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        
        <Modal.Body  className="background_and_table_header" >
          <div className="custom_modal_inner_content">
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
                            setSearchPurchaseReturnText(e.target.value)
                          }
                          type="text"
                          value={searchPurchaseReturnText}
                          placeholder="Search for date, invoice, supplier.."
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
                        {PurchaseReturnData.length
                          ? PurchaseReturnData
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
                    rowsPerPageOptions={[10, 25, 100, 200]}
                    component="div"
                    count={searchDatas.length}
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
                      onClick={() => setAddPurchaseReturnModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn"
                      onClick={editPurchaseReturnHandler}
                    >
                      Edit
                    </Button>
                    <Button
                      className="simpleBtn newbtn"
                      onClick={() => setInvoiceTable(true)}
                    >
                      Invoice
                    </Button>
               

                    <Button
                      className="simpleBtn"
                      onClick={() => setPrintPurchaseReturnModal(true)}
                    >
                      Print
                    </Button>
                    <Button className="simpleBtn closebtn" onClick={onHide}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <AddPurchaseReturn
          show={addPurchaseReturnModal}
          onHide={() => setAddPurchaseReturnModal(false)}
        />
        <EditPurchaseReturn
          show={editPurchaseReturnModal}
          onHide={() => setEditPurchaseReturnModal(false)}
          singlePurchaseReturn={singlePurchaseReturn}
          select={selectHandler}
        />

        <PurchaseTable
          show={invoiceTable}
          onHide={() => setInvoiceTable(false)}
        />
        <PrintPurchaseReturn
          handlePrint={handlePrint}
          ref={componentRef}
          show={printPurchaseReturnModal}
          onHide={() => setPrintPurchaseReturnModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default PurchaseReturn;
