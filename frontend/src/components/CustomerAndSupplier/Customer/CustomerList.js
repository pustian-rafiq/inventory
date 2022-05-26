import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  getCustomerLists,
} from "../../../redux/actions/customerActions";
import "./customer.css";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-toastify";
import swal from "sweetalert";
import CustomerPrint from "./CustomerPrint";
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

const columns = [
  { id: "code", label: "Code", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 30 },
  { id: "address", label: "Address", minWidth: 30 },
  { id: "contact_no", label: "Contact No", minWidth: 30 },
  { id: "total_due", label: "Total Due", minWidth: 30 },
];

const CustomerList = ({ show, onHide }) => {
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [editCustomerModal, setEditCustomerModal] = useState(false);
  const [printCustomerModal, setPrintCustomerModal] = useState(false);
  const [searchCustomerText, setSearchCustomerText] = useState("");

  const [selectId, setSelectId] = useState();
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(true);

  const [singleCustomerType, setSingleCustomerType] = useState(null);
  const customers = useSelector((state) => state.customers);

  const customerTypeActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    const card = customers.find((c) => c.id === id);

    setSingleCustomerType(card);
  };

  //const [rowColor, setRowColor] = useState(false)
  const handleClear = () => {
    setSearchCustomerText("");
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  //Fetch customer data from api calling
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Show customer data per page
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const customerList = customers?.filter((search) => {
    return (
      search.name.toLowerCase().includes(searchCustomerText.toLowerCase()) ||
      search.address.toLowerCase().includes(searchCustomerText.toLowerCase()) ||
      search.contact_no.toLowerCase().includes(searchCustomerText.toLowerCase())
    );
  });
  // Show customer data
  const customerData = customerList
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((customer, index) => {
      if (customer) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={customer.id}
            style={
              isActive === index
                ? { background: "rgba(180, 216, 255, 1)" }
                : { background: "" }
            }
            onClick={() => customerTypeActive(index, customer.id)}
          >
            {columns.map((column, i) => {
              const value = customer[column.id];
              return (
                <TableCell
                  key={i}
                  style={
                    isActive === index
                      ? {
                          color: "",
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
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      } else {
        return "";
      }
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
          dispatch(deleteCustomer(selectId, headers));
          toast.warn("Customer is deleting...");
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
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={show}
        dialogAs={DraggableModal}
        dialogClassName="customer-list"
      >
        <div className="modal-content">
          <Modal.Header
            style={{ cursor: "move" }}
            className="background_and_table_header"
          >
            <div>
              <h2 className="responsive-head"> All Customers</h2>
            </div>
            <div className="pull-right ">
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
                                setSearchCustomerText(e.target.value)
                              }
                              type="text"
                              value={searchCustomerText}
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
                            {customerData.length
                              ? customerData
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
                        count={customerList?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        labelRowsPerPage="Rows"
                        className="product_pagination px-2"
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </div>

                    <div className="col-md-12 col-lg-2 modal_showBox2">
                      <div className="">
                        <Button
                          className="simpleBtn newbtn"
                          onClick={() => setAddCustomerModal(true)}
                        >
                          New
                        </Button>
                        <Button
                          className="simpleBtn editbtn"
                          onClick={() => setEditCustomerModal(true)}
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
                          onClick={() => setPrintCustomerModal(true)}
                        >
                          Print
                        </Button>
                        <Button
                          className="simpleBtn closebtn"
                          onClick={closeHandler}
                        >
                          Close
                        </Button>

                        <strong className="mt-5 pt-3 d-block text-center">
                          Customers: {customers.length}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

          <AddCustomer
            show={addCustomerModal}
            onHide={() => setAddCustomerModal(false)}
          />
          <EditCustomer
            show={editCustomerModal}
            onHide={() => setEditCustomerModal(false)}
            customer={singleCustomerType}
            select={selectHandler}
          />
          <CustomerPrint
            handlePrint={handlePrint}
            ref={componentRef}
            show={printCustomerModal}
            onHide={() => setPrintCustomerModal(false)}
          />
        </div>
      </Modal>
    </Fragment>
  );
};

export default CustomerList;
