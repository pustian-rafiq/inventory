import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSupplier,
  getSupplierLists,
} from "../../../redux/actions/supplierActions";
import AddSupplier from "./AddSupplier";
import EditSupplier from "./EditSupplier";
import "./supplier.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import swal from "sweetalert";
import { toast } from "react-toastify";
import SupplierPrint from "./SupplierPrint";
import { useReactToPrint } from "react-to-print";
import { Skeleton } from "@mui/material";

// import './product.css'
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
  { id: "code", label: "Code", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 30 },
  { id: "address", label: "Address", minWidth: 30 },
  { id: "contact_no", label: "Contact No", minWidth: 30 },
  {
    id: "total_due",
    label: "Total Due",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
];

const SupplierList = ({ show, onHide }) => {
  const [addSupplierModal, setAddSupplierModal] = useState(false);
  const [editSupplierModal, setEditSupplierModal] = useState(false);
  const [printSupplierModal, setPrintSupplierModal] = useState(false);
  const [searchSupplierText, setSearchSupplierText] = useState("");

  const [singleSupplier, setSingleSupplier] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [selectId, setSelectId] = useState();
  const [isActive, setIsActive] = useState(null);

  const handleClear = () => {
    setSearchSupplierText("");
  };
  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  //Fetch supplier data from api
  const supplierLists = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSupplierLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // select item for update or delete
  const supplierActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    const supplier = supplierLists.find((d) => d.id === id);
    setSingleSupplier(supplier);
  };

  //Show customer data per page
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
  const supplierDataList = supplierLists?.filter((search) => {
    return (
      search?.code.toLowerCase().includes(searchSupplierText.toLowerCase()) ||
      search?.name.toLowerCase().includes(searchSupplierText.toLowerCase()) ||
      search?.address
        .toLowerCase()
        .includes(searchSupplierText.toLowerCase()) ||
      search?.contact_no
        .toLowerCase()
        .includes(searchSupplierText.toLowerCase())
    );
  });

  const supplierData = supplierDataList
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((supplier, index) => {
      return (
        <TableRow
          hover
          tabIndex={-1}
          key={supplier.id}
          style={
            isActive === index
              ? { background: "rgba(180, 216, 255, 1)" }
              : { background: "" }
          }
          onClick={() => supplierActive(index, supplier.id)}
        >
          {columns.map((column, i) => {
            const value = supplier[column.id];

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

  //it is show for print options

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
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
          dispatch(deleteSupplier(selectId, headers));
          toast.warn("Supplier is deleting...");
          setIsSelect(false);
        } else {
          swal("Your data is safe!");
        }
      });
    } else {
      swal("Please select a row!");
    }
  };

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
        // dialogClassName="modalSize"
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h2 className="responsive-head"> All Supplier </h2>
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
            <div className="custom_modal_inner_content">
              <div className="container-fluid ">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-9 modal_showBox1">
                    <form onSubmit={(e) => e.preventDefault}>
                      <div className="row searchBox">
                        <div className="searchInput ml-3 form-group">
                          <input
                            onChange={(e) =>
                              setSearchSupplierText(e.target.value)
                            }
                            type="text"
                            value={searchSupplierText}
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
                        sx={{ minWidth: 400 }}
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
                          {supplierData.length
                            ? supplierData
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
                      rowsPerPageOptions={[10, 25, 100, 500, 1000]}
                      component="div"
                      count={supplierDataList.length}
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
                    <div>
                      <Button
                        className="simpleBtn newbtn"
                        onClick={() => setAddSupplierModal(true)}
                      >
                        New
                      </Button>
                      <Button
                        className="simpleBtn editbtn"
                        onClick={() => setEditSupplierModal(true)}
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
                        onClick={() => setPrintSupplierModal(true)}
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
                      Total: {supplierLists.length}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <AddSupplier
          show={addSupplierModal}
          onHide={() => setAddSupplierModal(false)}
        />
        <EditSupplier
          show={editSupplierModal}
          onHide={() => setEditSupplierModal(false)}
          supplier={singleSupplier}
          select={selectHandler}
        />
        <SupplierPrint
          handlePrint={handlePrint}
          ref={componentRef}
          show={printSupplierModal}
          onHide={() => setPrintSupplierModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default SupplierList;
