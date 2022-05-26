import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  getEmployeeLists,
} from "../../../redux/actions/employeeAction";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import "./employee.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import swal from "sweetalert";
import { toast } from "react-toastify";
import PrintEmploye from "./PrintEmploye";
import { useReactToPrint } from "react-to-print";
import { Skeleton } from "@mui/material";

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
  { id: "code", label: "Code", minWidth: 30 },
  { id: "name", label: "Employee Name", minWidth: 30 },
  { id: "designation", label: "Desination Type", minWidth: 30 },
  { id: "contact_no", label: "Contact No", minWidth: 30 },
];

const Employee = ({ show, onHide }) => {
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);
  const [printEmployeeModal, setPrintEmployeeModal] = useState(false);

  const [searchEmployeeText, setSearchEmployeeText] = useState("");
  const [selectId, setSelectId] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [singleEmployee, setSingleEmployee] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { user: currentUser } = useSelector((state) => state.auth);
  const employeeLists = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  // select item for update or delete
  const employeeActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    const emp = employeeLists.find((e) => e.id === id);

    setSingleEmployee(emp);
  };

  const handleClear = () => {
    setSearchEmployeeText("");
  };

  //Pass headers for authorized user access
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // Fetch employee data from api
  useEffect(() => {
    dispatch(getEmployeeLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //it is show for print options

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Product Data Show
  const employeeListData = employeeLists.filter((search) => {
    return (
      search.name.toLowerCase().includes(searchEmployeeText.toLowerCase()) ||
      search.code.toLowerCase().includes(searchEmployeeText.toLowerCase()) ||
      search.designation
        .toLowerCase()
        .includes(searchEmployeeText.toLowerCase())
    );
  });

  const employeeData = employeeListData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((employee, index) => {
      return (
        <TableRow
          hover
          tabIndex={-1}
          key={employee.id}
          style={
            isActive === index
              ? { background: "rgba(180, 216, 255, 1)" }
              : { background: "" }
          }
          onClick={() => employeeActive(index, employee.id)}
        >
          {columns.map((column, i) => {
            const value = employee[column.id];

            return (
              <TableCell
                key={i}
                style={
                  isActive === index
                    ? {
                        color: "#000",
                        fontSize: "17px",
                        fontFamily: "Times New Roman",
                      }
                    : {
                        color: "black",
                        fontSize: "17px",
                        fontFamily: "Times New Roman",
                      }
                }
              >
                {column.format && typeof value === "number"
                  ? column.format(value)
                  : value}
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
          dispatch(deleteEmployee(selectId, headers));
          toast.warn("Employee is deleting");
          setIsSelect(false);
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
            <h2 className="responsive-head"> All Employee </h2>
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
                  <form
                    onSubmit={(e) => e.preventDefault}
                    style={{ paddingTop: "10px" }}
                  >
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) =>
                            setSearchEmployeeText(e.target.value)
                          }
                          type="text"
                          value={searchEmployeeText}
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
                      stickyHeader
                      aria-label="sticky table"
                      x={{ minWidth: 430 }}
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
                        {employeeData.length
                          ? employeeData
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
                    count={employeeListData.length}
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
                      onClick={() => setAddEmployeeModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn"
                      onClick={() => {
                        isSelect
                          ? setEditEmployeeModal(true)
                          : swal("Please select any employee!");
                      }}
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
                      onClick={() => setPrintEmployeeModal(true)}
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

                  <strong className="mt-5 pt-3 d-block">
                   Employee: {employeeLists.length}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <AddEmployee
          show={addEmployeeModal}
          onHide={() => setAddEmployeeModal(false)}
        />
        <EditEmployee
          show={editEmployeeModal}
          onHide={() => setEditEmployeeModal(false)}
          employee={singleEmployee}
          select={selectHandler}
        />
      </Modal>
      <PrintEmploye
        handlePrint={handlePrint}
        ref={componentRef}
        show={printEmployeeModal}
        onHide={() => setPrintEmployeeModal(false)}
      />
    </Fragment>
  );
};

export default Employee;
