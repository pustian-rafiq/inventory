import React, { Fragment, useRef, useState } from "react";
import { Button, Form, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
// import { getExpenseLists } from "../../../../redux/actions/expenseAction";
// import { getIncomeLists } from "../../../../redux/actions/incomeAction";
import AddIncome from "./AddIncome";
import EditIncome from "./EditIncome";
import swal from "sweetalert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import IncomePrint from "./IncomePrint";
import { useReactToPrint } from "react-to-print";
import { Skeleton } from "@mui/material";

// Set table header name using material-ui
const columns = [
  { id: "entry_date", label: "Income Date", minWidth: 30 },
  { id: "voucher_no", label: "Voucher No", minWidth: 30 },
  { id: "expense_description", label: "Income", minWidth: 30 },
  { id: "purpose", label: "Purpose", minWidth: 30 },
  {
    id: "amount",
    label: "Amount",
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

const Income = ({ show, onHide, IncomeData }) => {
  const [addIncomeModal, setAddIncomeModal] = useState(false);
  const [editIncomeModal, setEditIncomeModal] = useState(false);

  const [printIncomeModal, setPrintIncomeModal] = useState(false);

  const [searchIncomeText, setSearchIncomeText] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [singleIncome, setSingleIncome] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const incomeLists = useSelector((state) => state.incomelists);

  // active income handler
  const incomeActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setIsSelect(true);
    }

    const prod = incomeLists.find((i) => i.id === id);

    setSingleIncome(prod);
  };

  const handleClear = () => {
    setSearchIncomeText("");
  };

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

  const searchDatas = incomeLists.filter((search) => {
    return (
      search.voucher_no
        .toLowerCase()
        .includes(searchIncomeText.toLowerCase()) ||
      search.expense_description
        .toLowerCase()
        .includes(searchIncomeText.toLowerCase()) ||
      search.purpose.toLowerCase().includes(searchIncomeText.toLowerCase())
    );
  });

  const incomeData = searchDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((order, index) => {
      if (order) {
        var date = order.entry_date;
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
            onClick={() => incomeActive(index, order.id)}
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
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head">Incomes</h4>
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
            <Form>
              <div className="container-fluid ">
                <div className="row">
                  <div className="col-lg-9 col-md-12 modal_showBox1">
                    <form onSubmit={(e) => e.preventDefault}>
                      <div className="row searchBox">
                        <div className="searchInput ml-3 form-group">
                          <input
                            type="text"
                            onChange={(e) =>
                              setSearchIncomeText(e.target.value)
                            }
                            value={searchIncomeText}
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
                          {incomeData.length
                            ? incomeData
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
                      count={incomeLists.length}
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
                        onClick={() => setAddIncomeModal(true)}
                      >
                        New
                      </Button>
                      <Button
                        className="simpleBtn editbtn"
                        onClick={() =>
                          isSelect
                            ? setEditIncomeModal(true)
                            : swal("Select any row to edit!")
                        }
                      >
                        Edit
                      </Button>
                   
                      <Button
                        className="simpleBtn"
                        onClick={() => setPrintIncomeModal(true)}
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
                        Total : {incomeLists.length}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
        <AddIncome
          show={addIncomeModal}
          onHide={() => setAddIncomeModal(false)}
        />
        <EditIncome
          show={editIncomeModal}
          onHide={() => setEditIncomeModal(false)}
          income={singleIncome}
          select={selectHandler}
        />
        <IncomePrint
          handlePrint={handlePrint}
          ref={componentRef}
          show={printIncomeModal}
          onHide={() => setPrintIncomeModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default Income;
