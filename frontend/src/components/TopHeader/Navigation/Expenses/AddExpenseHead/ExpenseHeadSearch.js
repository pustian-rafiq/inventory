import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { Fragment, useState } from "react";
import { Modal, Form, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";

// Set table header name using material-ui
const columns = [
  { id: "code", label: "Code", minWidth: 10 },
  { id: "description", label: "Description", minWidth: 10 },
  { id: "status", label: "Status", minWidth: 10 },
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

const IncomeHeadSearch = (props) => {
  //State Management for Search btn
  const [showExpenseHeadSearchModal, setShowExpenseHeadSearchModal] =
    useState(false);
  const [searchExpenseHeadText, setSearchExpenseHeadText] = useState("");
  const handleClear = () => {
    setSearchExpenseHeadText("");
  };

  //Pass headers for authorized user access
  const expenseIncomeLists = useSelector((state) => state.expenseIncomelists);

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

  //Show Company data and searches real time
  const searchDatas = expenseIncomeLists.filter((search) => {
    return (
      search.code.toLowerCase().includes(searchExpenseHeadText.toLowerCase()) ||
      search.description
        .toLowerCase()
        .includes(searchExpenseHeadText.toLowerCase())
    );
  });

  const expenseIncomeData = searchDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((expense) => {
      if (expense) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={expense.id}
            onDoubleClick={() =>
              handleDbClick(expense.id, expense.code, expense.description)
            }
          >
            {columns.map((column) => {
              // console.log(column.id)
              const value = expense[column.id];
              return (
                <TableCell className="tableRowData">
                  {value === 1 ? "Income" : value === 2 ? "Expense" : value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      } else {
        return "";
      }
    });

  //Main Form state management
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    description: "",
    status: "",
  });
  // When user double one row is selected and put the value in the form

  const handleDbClick = (id, code, description) => {
    const newObject = formData;
    newObject.code = code;
    newObject.description = description;
    props.expenseIncomeId(id, description);
    setFormData(newObject);
    setShowExpenseHeadSearchModal(false);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 input-group input-group-sm codeBox">
          <input
            type="text"
            placeholder="Code"
            defaultValue={formData.code}
            className="form-control productInput input-group input-group-sm"
          />
        </div>
        <div
          className="col-xs-4 col-sm-1 col-md-2 col-lg-1 SearchIconField"
          style={{ cursor: "pointer" }}
          onClick={() => setShowExpenseHeadSearchModal(true)}
        >
          <span className="searchIcon">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="col-xs-4 col-sm-5 col-md-5 col-lg-6 input-group input-group-sm nameBox">
          <input
            className="form-control productInput"
            type="text"
            placeholder="Name"
            defaultValue={formData.description}
          />
        </div>
      </div>

      {/***************************Product Show modal***************************** */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={showExpenseHeadSearchModal}
        dialogAs={DraggableModal}
        dialogClassName="expense-head-modal"
      >
        <Modal.Header style={{  cursor: "move" }} className="background_and_table_header">
          <div >
            <h4> Expense/Income Head </h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={() => setShowExpenseHeadSearchModal(false)}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content p-4">
          <Form>
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-12 pt-3 ml-1 showBox1">
                  <form
                    onSubmit={(e) => e.preventDefault}
                    style={{ paddingTop: "10px" }}
                  >
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) =>
                            setSearchExpenseHeadText(e.target.value)
                          }
                          type="text"
                          value={searchExpenseHeadText}
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
                      sx={{ minWidth: 400 }}
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
                                backgroundColor: "rgb(227,227,227)",
                                color:'#000',
                                fontFamily: "Times New Roman",
                              }}
                          
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>{expenseIncomeData}</TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100, 1000]}
                    component="div"
                    count={searchDatas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </div>
            </div>
          </Form>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default IncomeHeadSearch;
