import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { getCashDelivery } from "../../../../redux/actions/cashDelivery";
import AddCashDelivery from "./AddCashDelivery";
import "./cashdelivery.css";
import EditCashDelivery from "./EditCashDelivery";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import swal from "sweetalert";
import { useReactToPrint } from "react-to-print";
import PrintCashDelivery from "./PrintCashDelivery";
import { Skeleton } from "@mui/material";

const columns = [
  { id: "entry_date", label: "Entry Date", minWidth: 30 },
  { id: "supplier_name", label: "Supplier Name", minWidth: 30 },
  { id: "contact_no", label: "Contact No", minWidth: 30 },
  { id: "account_no", label: "Account No", minWidth: 30 },
  { id: "amount", label: "Amount", minWidth: 30 },
  { id: "payment_type", label: "Status", minWidth: 30 },
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

const CashDelivery = ({ show, onHide }) => {
  const [addCashDeliveryModal, setAddCashDeliveryModal] = useState(false);
  const [editCashDeliveryModal, setEditCashDeliveryModal] = useState(false);
  const [printCashDeliveryModal, setPrintCashDeliveryModal] = useState(false);
  const [searchCashDeliveryText, setSearchCashDeliveryText] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [singleCashDelivery, setSingleCashDelivery] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch data from api/fredux store
  const { user: currentUser } = useSelector((state) => state.auth);
  const cashDelivery = useSelector((state) => state.cashdelivery);

  // request header
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCashDelivery(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //it is show for print options
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  }); 
  

  // active cashdelivery handler
  const cashDeliveryActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setIsSelect(true);
    }

    const prod = cashDelivery && cashDelivery.find((cd) => cd && cd.id === id);

    setSingleCashDelivery(prod);
  };

  const handleClear = () => {
    setSearchCashDeliveryText("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Cash delivery Data Show and real time searching
  // eslint-disable-next-line array-callback-return
  const cashdeliverylists = cashDelivery.filter((search) => {
    if (search != null) {
      //console.log(search);
      return (
        search.supplier_name
          .toLowerCase()
          .includes(searchCashDeliveryText.toLowerCase()) ||
        search.account_no
          .toLowerCase()
          .includes(searchCashDeliveryText.toLowerCase()) ||
          search.entry_date
          .toLowerCase()
          .includes(searchCashDeliveryText.toLowerCase()) ||
          search.contact_no
          .toLowerCase()
          .includes(searchCashDeliveryText.toLowerCase()) ||
          search.payment_type
          .toLowerCase()
          .includes(searchCashDeliveryText.toLowerCase())
      );
    } else {
      //console.log("Null Data: "+ search);
    }
  });

  const cashDeliveryData =
    cashdeliverylists.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ).length > 0 ? (
      cashdeliverylists
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((cashData, index) => {
          return (
            <TableRow
              hover
              tabIndex={-1}
              key={cashData.id}
              style={
                isActive === index
                  ? { background: "rgba(180, 216, 255, 1)" }
                  : { background: "" }
              }
              onClick={() => cashDeliveryActive(index, cashData.id)}
            >
              {columns.map((column, i) => {
                const value = cashData[column.id];
                var date = cashData.entry_date;
                return (
                  <TableCell
                    key={i}
                    style={{
                      fontSize: "17px",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {/* 
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : column.id === "entry_date"
                      ? moment(date).format("Do MMM YY")
                      : cashData.bkash ? cashData.bkash
                      : cashData.mba_account_no ? cashData.mba_account_no
                      : value} 
                    */}

                    {
                     column.id === "entry_date"
                      ? moment(date).format("Do MMM YY")
                      : column.id === 'account_no' && cashData.payment_type === 'Bkash' ? cashData.bkash
                      : column.id === 'account_no' && cashData.payment_type === 'Cash' ? ''
                      : column.id === 'account_no' && cashData.payment_type === 'Bank' ? cashData.account_no
                      : value
                      }

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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={show}
        dialogAs={DraggableModal}
        dialogClassName="cash-delivery-modal"
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h2 className="responsive-head"> Cash Delivery</h2>
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
                <div className="col-md-9 modal_showBox1">
                  <form
                    onSubmit={(e) => e.preventDefault}
                    style={{ paddingTop: "10px" }}
                  >
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) =>
                            setSearchCashDeliveryText(e.target.value)
                          }
                          type="text"
                          value={searchCashDeliveryText}
                          placeholder="Search category......"
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
                        {cashDeliveryData.length
                          ? cashDeliveryData
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
                    count={cashdeliverylists.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Rows"
                    className="product_pagination px-2"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>

                {/* Perform Operation using some button */}

                <div className="col-md-12 col-lg-2 col-11 modal_showBox2">
                  <div className="simpleBtns">
                    <Button
                      className="simpleBtn newbtn"
                      onClick={() => setAddCashDeliveryModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn"
                      onClick={() => {
                        isSelect
                          ? setEditCashDeliveryModal(true)
                          : swal("Select any row to edit!");
                      }}
                    >
                      Edit
                    </Button>
          
                    <Button
                      className="simpleBtn"
                      onClick={() => setPrintCashDeliveryModal(true)}
                    >
                      Print
                    </Button>
                    <Button
                      className="simpleBtn closebtn"
                      onClick={closeHandler}
                    >
                      Close
                    </Button>

                    <b className="d-block mt-5">
                      Total : {cashDelivery.length}
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <AddCashDelivery
          show={addCashDeliveryModal}
          onHide={() => setAddCashDeliveryModal(false)}
        />
        <EditCashDelivery
          show={editCashDeliveryModal}
          onHide={() => setEditCashDeliveryModal(false)}
          cashDelivery={singleCashDelivery}
          select={selectHandler}
        />
        <PrintCashDelivery
          handlePrint={handlePrint}
          ref={componentRef}
          show={printCashDeliveryModal}
          onHide={() => setPrintCashDeliveryModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default CashDelivery;
