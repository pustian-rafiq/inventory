import React, { Fragment, useState } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

//import {SupplierData} from '../../../CustomerAndSupplier/Supplier/'

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

function CustomerSearch(props) {
  //State Management for Search btn
  const [showCustomerSearchModal, setShowCustomerSearchModal] = useState(false);
  const [customerSearchText, setCustomerSearchText] = useState("");
  const handleClear = () => {
    setCustomerSearchText({ searchText: "" });
  };

  //Fetch customer data from api calling
  const customers = useSelector((state) => state.customers);
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

  const customerList = customers.filter((search) => {
    return (
      search.name.toLowerCase().includes(customerSearchText.toLowerCase()) ||
      search.address.toLowerCase().includes(customerSearchText.toLowerCase()) ||
      search.contact_no.toLowerCase().includes(customerSearchText.toLowerCase())
    );
  });
  // Show customer data
  const customerData = customerList
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((customer) => {
      if (customer) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={customer.id}
            onDoubleClick={() =>
              handleDbClick(customer.id, customer.code, customer.name)
            }
          >
            {columns.map((column, i) => {
              const value = customer[column.id];
              return (
                <TableCell
                  key={i}
                  style={{ fontSize: "17px", fontFamily: "Times New Roman" }}
                >
                  {column.format && typeof value === "string"
                    ? column.format(value)
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

  //Main Form state management
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    name: "",
    address: "",
    contactNo: "",
    totalDue: "",
  });

  // When user double one row is selected and put the value in the form
  const handleDbClick = (id, code, name) => {
    const newObject = formData;
    newObject.code = code;
    newObject.name = name;
    props.customerId(id);
    setFormData(newObject);
    setShowCustomerSearchModal(false);
  };

  return (
    <Fragment>
      <div className="col-sm-12 col-md-2 col-lg-2">
        <div className="input-group input-group-sm">
          <span className="spanTitle">Customer</span>
        </div>
      </div>
      <div className="col-xs-5 col-sm-5 col-md-4 col-lg-4 input-group input-group-sm">
        <input
          type="text"
          placeholder="Code"
          defaultValue={formData.code}
          className="form-control productInput input-group input-group-sm"
        />
      </div>
      <div
        className="col-xs-3 col-sm-1 col-lg-1 searchInput"
        style={{ cursor: "pointer" }}
        onClick={() => setShowCustomerSearchModal(true)}
      >
        <span className="spanTitle searchIcon">
          <i className="fa fa-search"></i>
        </span>
      </div>
      <div className="col-xs-3 col-sm-6 col-md-5 col-lg-5 input-group input-group-sm">
        <input
          className="form-control productInput"
          type="text"
          placeholder="Name"
          defaultValue={formData.name}
        />
      </div>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={showCustomerSearchModal}
        dialogAs={DraggableModal}
        dialogClassName="add-supplier-modal"
      >
        <Modal.Header className="background_and_table_header">
          <div>
            <h2 className="modalHeadTitle"> All Customers </h2>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={() => setShowCustomerSearchModal(false)}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header">
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
                        onChange={(e) => setCustomerSearchText(e.target.value)}
                        type="text"
                        value={customerSearchText}
                        placeholder="Search customer......"
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
                              backgroundColor: "rgb(227,227,227)",
                              color: "#000000",
                              fontSize: "16px",
                              fontFamily: "Times New Roman",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>{customerData}</TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100, 500, 1000]}
                  component="div"
                  count={customerList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {/*                   
                <div className="printBtn pull-left">
                    <button className=" btn btn-danger" type="button">
                      Print
                    </button>
                    <span className="spanTitle" className="pull-right pt-2 pr-5 ">Total: {count>9? `${count} rows` : `${count} rows`} </span>
                  </div> */}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default CustomerSearch;
