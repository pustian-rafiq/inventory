import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  deleteDesignation,
  getDesignationLists,
} from "../../../redux/actions/designationActions";
import AddDesignation from "./AddDesignation";
import EditDesignation from "./EditDesignation";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DesignationTable from "./DesignationTable";
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
  { id: "description", label: "Designation Name", minWidth: 30 },
];

const Designation = ({ show, onHide }) => {
  const [addDesignationModal, setAddDesignationModal] = useState(false);
  const [editDesignationModal, setEditDesignationModal] = useState(false);
  const [printDesignationModal, setPrintDesignationModal] = useState(false);
  const [searchDesignationText, setSearchDesignationText] = useState("");
  const [singleDesignation, setSingleDesignation] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [selectId, setSelectId] = useState();
  const [isActive, setIsActive] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { user: currentUser } = useSelector((state) => state.auth);
  const { designations } = useSelector((state) => state.designations);
  const dispatch = useDispatch();

  // select item for update or delete
  const designationActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    const desig = designations.find((d) => d.id === id);
    setSingleDesignation(desig);
  };

  const handleClear = () => {
    setSearchDesignationText("");
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  useEffect(() => {
    dispatch(getDesignationLists(headers));
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
  const designationslists = designations.filter((search) => {
    return (
      search.description
        .toLowerCase()
        .includes(searchDesignationText.toLowerCase()) ||
      search.code.toLowerCase().includes(searchDesignationText.toLowerCase())
    );
  });

  const designationData = designationslists
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((designation, index) => {
      return (
        <TableRow
          hover
          tabIndex={-1}
          key={designation.id}
          style={
            isActive === index
              ? { background: "rgba(180, 216, 255, 1)" }
              : { background: "" }
          }
          onClick={() => designationActive(index, designation.id)}
        >
          {columns.map((column, i) => {
            const value = designation[column.id];

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
        text: "Once deleted, you will not be able to recover your data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteDesignation(selectId, headers));
          toast.warn("Designation is deleting...");
        } else {
          swal("Your imaginary file is safe!");
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
            <h2 className="responsive-head"> Designations</h2>
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
                            setSearchDesignationText(e.target.value)
                          }
                          type="text"
                          value={searchDesignationText}
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
                                fontSize: "16px",
                                fontFamily: "Times New Roman",
                                backgroundColor: "rgb(221, 221, 221)",
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {designationData.length
                          ? designationData
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
                    count={designationslists.length}
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
                      onClick={() => setAddDesignationModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn"
                      onClick={() => {
                        isSelect
                          ? setEditDesignationModal(true)
                          : swal("Select any designation to edit!");
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
                      onClick={() => setPrintDesignationModal(true)}
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

                  <strong className="mt-5 pt-3 d-block text-center">
                    Total Data:{designations.length}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <AddDesignation
          show={addDesignationModal}
          onHide={() => setAddDesignationModal(false)}
        />
        <EditDesignation
          show={editDesignationModal}
          onHide={() => setEditDesignationModal(false)}
          designation={singleDesignation}
          select={selectHandler}
        />
        <DesignationTable
          handlePrint={handlePrint}
          ref={componentRef}
          show={printDesignationModal}
          onHide={() => setPrintDesignationModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default Designation;
