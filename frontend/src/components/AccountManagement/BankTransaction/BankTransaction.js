import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";

import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import {
  getBankTransactionDetails,
  getBankTransactionLists,
} from "../../../redux/actions/bankTransactionActions ";
import AddBankTransaction from "./AddBankTransaction";
import "./bankTransaction.css";
import EditBankTransaction from "./EditBankTransaction";
import PrintBank from "./PrintBank";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const columns = [
  { id: "transaction_date", label: "Tran. Date", minWidth: 25 },
  { id: "bank_name", label: "Bank Name", minWidth: 25 },
  { id: "branch_name", label: "Branch Name", minWidth: 25 },
  { id: "amount", label: "Amount", minWidth: 25 },
  { id: "transaction_type", label: "Status", minWidth: 20 },
  { id: "remarks", label: "Remarks", minWidth: 20 },
];

const BankTransaction = ({ show, onHide }) => {
  const [addBankTransactionModal, setAddBankTransactionModal] = useState(false);
  const [editBankTransactionModal, setEditBankTransactionModal] =
    useState(false);
  const [printbanktrancModal, setPrintbanktrancModal] = useState(false);
  const [searchBankTransactionText, setSearchBankTransactionText] =
    useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedId, setSelectId] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [singleBankTransaction, setSingleBankTransaction] = useState(null);

  const handleClear = () => {
    setSearchBankTransactionText("");
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const { bankTransactions } = useSelector((state) => state.banktransactions);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const componentRef = useRef();

  const handleprint = useReactToPrint({
    content: () => componentRef.current,
  });

  // active Purchase order handler
  const bankActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }
 
    // Get bank transaction details from selecting id
    const singleBankTransaction = bankTransactions.find((b) => b.id === id);
    setSingleBankTransaction(singleBankTransaction);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBankTransactionLists(headers));
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Show bank data and searches real time
  const bankTranDatas = bankTransactions.filter((search) => {
    return (
      search.transaction_date
        .toLowerCase()
        .includes(searchBankTransactionText.toLowerCase()) ||
      search.bank_name
        .toLowerCase()
        .includes(searchBankTransactionText.toLowerCase()) ||
      search.branch_name
        .toLowerCase()
        .includes(searchBankTransactionText.toLowerCase())
    );
  });
  // Show bank data
  const bankTransactionData = bankTranDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((bankTran, index) => {
      if (bankTran) {
        var date = bankTran.transaction_date;
        var dateFormat = moment(date).format("DoMMMYY");
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={index}
            style={
              isActive === index
                ? { background: "rgba(180, 216, 255, 1)" }
                : { background: "" }
            }
            onClick={() => bankActive(index, bankTran.id)}
          >
            {columns.map((column, i) => {
              const value = bankTran[column.id];
              return (
                <TableCell
                  key={i}
                  style={
                    isActive === index
                      ? {
                          color: "#000",
                          fontSize: "16px",
                          fontFamily: "Times New Roman",
                        }
                      : {
                          color: "black",
                          fontSize: "16px",
                          fontFamily: "Times New Roman",
                        }
                  }
                >
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : column.id === "transaction_date"
                    ? dateFormat
                    : bankTran[column.id] == "1"
                    ? "Deposit"
                    : bankTran[column.id] == "2"
                    ? "Withdraw"
                    : bankTran[column.id] == "3"
                    ? "Transfer"
                    : value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      } else {
        return "";
      }
    });
  // Edit handler for editing data
  const editHandler = () => {
    if (isSelect && selectedId) {
      dispatch(getBankTransactionDetails(selectedId, headers));
      setEditBankTransactionModal(true);
    } else {
      swal("Select any row to edit!");
    }
  };
  // This handler deselects the data
  const selectHandler = () => {
    setIsSelect(!isSelect);
    setIsActive(null);
  };
  const closeHandler = () => {};
  return (
    <Modal
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
      show={show}
      dialogAs={DraggableModal}
      dialogClassName="show-bank-transaction"
    >
      <Modal.Header
        style={{ cursor: "move", padding: "6px" }}
        className="background_and_table_header"
      >
        <div>
          <h2 className="responsive-head"> Bank Transaction </h2>
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
        <div className="custom_modal_inner_content p-0">
          <div className="container-fluid ">
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-9 modal_showBox2">
                <form onSubmit={(e) => e.preventDefault}>
                  <div className="row searchBox">
                    <div className="searchInput ml-3 form-group">
                      <input
                        onChange={(e) =>
                          setSearchBankTransactionText(e.target.value)
                        }
                        type="text"
                        value={searchBankTransactionText}
                        placeholder="Search for date, bank name, branch name and transaction type.."
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
                    sx={{ minWidth: 600 }}
                    size="small"
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow style={{ background: "red" }}>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              backgroundColor: "rgb(227,227,227)",
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
                    <TableBody>{bankTransactionData}</TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={bankTranDatas.length}
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
                <div className="simpleBtns  ">
                  <Button
                    className="simpleBtn newbtn"
                    onClick={() => setAddBankTransactionModal(true)}
                  >
                    New
                  </Button>
                  <Button className="simpleBtn editbtn" onClick={editHandler}>
                    Edit
                  </Button>

                 
                  <Button
                    className="simpleBtn"
                    onClick={()=>setPrintbanktrancModal(true)}
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

      <AddBankTransaction
        show={addBankTransactionModal}
        onHide={() => setAddBankTransactionModal(false)}
      />
      <EditBankTransaction
        show={editBankTransactionModal}
        onHide={() => setEditBankTransactionModal(false)}
        select={selectHandler}
      />

      <PrintBank
        handlePrint={handleprint}
        ref={componentRef}
        show={printbanktrancModal}
        onHide={() => setPrintbanktrancModal(false)}
      />
    </Modal>
  );
};

export default BankTransaction;
