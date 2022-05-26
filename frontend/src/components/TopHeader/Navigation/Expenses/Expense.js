import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import React, { Fragment, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import swal from "sweetalert";
import ExpensePrint from "./ExpensePrint";
import { useReactToPrint } from "react-to-print";
import { Skeleton } from "@mui/material";
import "./expense.css";
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
  { id: "entry_date", label: "Expense Date", minWidth: 30 },
  { id: "voucher_no", label: "Voucher No", minWidth: 30 },
  { id: "expense_description", label: "Expense", minWidth: 30 },
  { id: "purpose", label: "Purpose", minWidth: 30 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
];

const Expense = ({ show, onHide, select }) => {
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [editExpenseModal, setEditExpenseModal] = useState(false);
  const [printExpenseModal, setPrintEditExpenseModal] = useState(false);
  const [searchExpenseText, setSearchExpenseText] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [singleExpense, setSingleExpense] = useState(null);

  const expenseLists = useSelector((state) => state.expenselists);

  // active expense handler
  const expenseActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setIsSelect(true);
    }

    const prod = expenseLists.find((el) => el.id === id);

    setSingleExpense(prod);
  };

  const handleClear = () => {
    setSearchExpenseText("");
  };
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

  //it is show for print options

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //Show Company data and searches real time
  const searchDatas = expenseLists.filter((search) => {
    return (
      search.voucher_no
        .toLowerCase()
        .includes(searchExpenseText.toLowerCase()) ||
      search.expense_description
        .toLowerCase()
        .includes(searchExpenseText.toLowerCase()) ||
      search.purpose.toLowerCase().includes(searchExpenseText.toLowerCase())
    );
  });
  const expenseData = searchDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((order, index) => {
      if (order) {
        var date = order.entry_date;
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
            onClick={() => expenseActive(index, order.id)}
          >
            {columns.map((column, i) => {
              // console.log(column.id)
              const value = order[column.id];
              return (
                <TableCell key={i} className="tableRowData">
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : column.id === "entry_date"
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
        // dialogClassName="expense-list"
      
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head">Expenses</h4>
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
                  <form onSubmit={(e) => e.preventDefault}>
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) => setSearchExpenseText(e.target.value)}
                          type="text"
                          value={searchExpenseText}
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
                        {expenseData.length
                          ? expenseData
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
                    count={expenseLists.length}
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
                      onClick={() => setAddExpenseModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn"
                      onClick={() =>
                        isSelect
                          ? setEditExpenseModal(true)
                          : swal("Select any row to edit!")
                      }
                    >
                      Edit
                    </Button>
             
                    <Button
                      className="simpleBtn"
                      onClick={() => setPrintEditExpenseModal(true)}
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
                      Total : {expenseLists.length}
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <AddExpense
          show={addExpenseModal}
          onHide={() => setAddExpenseModal(false)}
        />
        <EditExpense
          show={editExpenseModal}
          onHide={() => setEditExpenseModal(false)}
          expense={singleExpense}
          select={selectHandler}
        />
        <ExpensePrint
          handlePrint={handlePrint}
          ref={componentRef}
          show={printExpenseModal}
          onHide={() => setPrintEditExpenseModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default Expense;
