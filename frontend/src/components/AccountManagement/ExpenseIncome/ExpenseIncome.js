import { Skeleton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  deleteExpenseIncome,
  getExpenseIncomeLists,
} from "../../../redux/actions/expenseIncome";
import AddExpenseIncome from "./AddExpenseIncome";
import EditExpenseIncome from "./EditExpenseIncome";
import PrintExpenseIncome from "./PrintExpenseIncome";

// Set table header name using material-ui
const columns = [
  { id: "code", label: "Code", minWidth: 30 },
  { id: "description", label: "Description", minWidth: 30 },
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

const ExpenseIncome = ({ show, onHide, ExpenseIncomeList }) => {
  const [addExpenseIncomeModal, setAddExpenseIncomeModal] = useState(false);
  const [editExpenseIncomeModal, setEditExpenseIncomeModal] = useState(false);
  const [printExpenseIncomeModal, setPrintExpenseIncomeModal] = useState(false);
  const [searchExpenseIncomeText, setSearchExpenseIncomeText] = useState("");

  const handleClear = () => {
    setSearchExpenseIncomeText("");
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);

  const expenseIncomeLists = useSelector((state) => state.expenseIncomelists);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenseIncomeLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Show Company data and searches real time
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectId, setSelectId] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [isActive, setIsActive] = useState(null);

  const [singleExpenseIncome, setSingleExpenseIncome] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //this section is worked in print

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // active cashcollection handler
  const expenseIncomeActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    const expenseIncome = expenseIncomeLists.find((data) => data.id === id);

    setSingleExpenseIncome(expenseIncome);
  };

  //Show Company data and searches real time
  const searchDatas = expenseIncomeLists.filter((search) => {
    return (
      search.code
        .toLowerCase()
        .includes(searchExpenseIncomeText.toLowerCase()) ||
      search.description
        .toLowerCase()
        .includes(searchExpenseIncomeText.toLowerCase())
    );
  });

  const expenseIncomeData = searchDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((expense, i) => {
      return (
        <TableRow
          hover
          tabIndex={-1}
          key={i}
          style={
            isActive === i
              ? { background: "rgba(180, 216, 255, 1)" }
              : { background: "" }
          }
          onClick={() => expenseIncomeActive(i, expense.id)}
        >
          {columns.map((column, i) => {
            // console.log(column.id)
            const value = expense[column.id];
            return (
              <TableCell
                key={i}
                style={{ fontSize: "17px", fontFamily: "Times New Roman" }}
              >
                {value === 1 ? "Income" : value === 2 ? "Expense" : value}
              </TableCell>
            );
          })}
        </TableRow>
      );
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
          dispatch(deleteExpenseIncome(selectId, headers));
          toast.warn("ExpenseIncome is deleting...");
          setIsSelect(false);
        } else {
          swal("Your data is safe!");
        }
      });
    } else {
      swal("Please select a row!");
    }
  };

  // This handler deselects the data
  const selectHandler = () => {
    setIsSelect(!isSelect);
    setIsActive(null);
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
      show={show}
      dialogAs={DraggableModal}
      // dialogClassName="purchase-retun-modal"
    >
      <Modal.Header
        style={{ cursor: "move", padding: "6px" }}
        className="background_and_table_header"
      >
        <div>
          <h2 className="responsive-head"> All Expense/Incomes Head</h2>
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
        <div className="custom_modal_inner_content p-4">
          <div className="container-fluid ">
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-9 modal_showBox1">
                <form onSubmit={(e) => e.preventDefault}>
                  <div className="row searchBox">
                    <div className="searchInput ml-3 form-group">
                      <input
                        onChange={(e) =>
                          setSearchExpenseIncomeText(e.target.value)
                        }
                        type="text"
                        value={searchExpenseIncomeText}
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
                      {expenseIncomeData.length
                        ? expenseIncomeData
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
                    onClick={() => setAddExpenseIncomeModal(true)}
                  >
                    New
                  </Button>
                  <Button
                    className="simpleBtn editbtn"
                    onClick={() => setEditExpenseIncomeModal(true)}
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
                    onClick={() => setPrintExpenseIncomeModal(true)}
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
      <AddExpenseIncome
        show={addExpenseIncomeModal}
        onHide={() => setAddExpenseIncomeModal(false)}
      />
      <EditExpenseIncome
        show={editExpenseIncomeModal}
        onHide={() => setEditExpenseIncomeModal(false)}
        singleExpenseIncome={singleExpenseIncome}
        select={selectHandler}
      />
      <PrintExpenseIncome
        handlePrint={handlePrint}
        ref={componentRef}
        show={printExpenseIncomeModal}
        onHide={() => setPrintExpenseIncomeModal(false)}
      />
    </Modal>
  );
};

export default ExpenseIncome;
