/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-toastify";
import { addCustomer } from "../../../../../redux/actions/customerActions";
import { useDispatch, useSelector } from "react-redux";
import AddCustomer from "../../../../CustomerAndSupplier/Customer/AddCustomer";

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

const CustomerSearch = (props) => {
  //State Management for Search btn
  const [showCustomerSearchModal, setShowCustomerSearchModal] = useState(false);
  const [customerSearchText, setCustomerSearchText] = useState("");

  const [addCustomerModal, setAddCustomerModal] = useState(false);

  const handleClear = () => {
    setCustomerSearchText("");
  };
  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
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
              handleDbClick(
                customer.id,
                customer.code,
                customer.name,
                customer.address,
                customer.contact_no,
                customer.total_due
              )
            }
          >
            {columns.map((column, i) => {
              const value = customer[column.id];
              return (
                <TableCell
                  key={i}
                  style={{ fontSize: "17px", fontFamily: "Times New Roman" }}
                >
                  {column.format && typeof value === "number"
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


  // When user double one row is selected and put the value in the form
  const handleDbClick = (id, code, name, address, contact_no, due) => {
    props.customerHandler(id,code, name, address, contact_no,due);
    setShowCustomerSearchModal(false);
  };


  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-3 col-sm-3 col-md-6 col-lg-5 input-group input-group-sm codeBox">
          <input
            type="text"
            placeholder="Code"
            defaultValue={props.code}
            className="form-control productInput input-group input-group-sm"
            readOnly
          />
        </div>
        <div
          className=" col-sm-1 col-md-1 col-lg-1 SearchIconField"
          style={{ cursor: "pointer" }}
          onClick={() => setShowCustomerSearchModal(true)}
        >
          <span className="searchIcon">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="col-xs-3 col-sm-4 col-md-5 col-lg-6 input-group input-group-sm nameBox">
          <input
            className="form-control productInput"
            type="text"
            placeholder="Name"
            defaultValue={props.name}
            readOnly
          />
        </div>
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
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
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
          <div className="custom_modal_inner_content p-4">
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
                            setCustomerSearchText(e.target.value)
                          }
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
                        <TableRow style={{ background: "red" }}>
                          {columns.map((column, i) => (
                            <TableCell
                              key={i}
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
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* 
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={addCustomerModal}
        backdrop="static"
        keyboard="false"
        dialogAs={DraggableModal}
      >
        <div>
          <Modal.Header style={{ background: "#9fa1ed", cursor: "move" }}>
            <div style={{ float: "left", height: "3px" }}>
              <h4>Customer Details</h4>
            </div>
            <div className="pull-right">
              <i
                className="fa fa-close"
                onClick={() => setAddCustomerModal(false)}
                style={{ cursor: "pointer", padding: "2px" }}
              ></i>
            </div>
          </Modal.Header>
          <Modal.Body style={{ background: "#e0d4fa" }}>
 

            <form className="form-horizontal" onSubmit={submitHandler}>
              <h4 className="modalHeadTitle">Customer Information</h4>
              <div className="container productBox">
                <div className="row">
                  <div className="col-md-12 col-lg-8">
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">
                          Code
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control productInput"
                          id="code"
                          placeholder="Enter account"
                          name="code"
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 input-group input-group-sm">
                        <span className="spanTitle" for="text">
                          Customer Name
                        </span>
                      </div>

                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control productInput"
                          id="code"
                          placeholder="Enter name"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 input-group input-group-sm">
                        <span className="spanTitle" for="modelName">
                          Mobile Number
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8  input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control productInput input-sm"
                          id="modelName"
                          placeholder="Enter mobile number"
                          name="contact_no"
                          onChange={(e) => setContactNo(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 input-group input-group-sm">
                        <span className="spanTitle" for="warningQty">
                          Address
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control productInput input-sm"
                          id="warningQty"
                          placeholder="Enter address"
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 input-group input-group-sm">
                        <span className="spanTitle" for="warningQty">
                          Father Name
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control productInput input-sm"
                          id="warningQty"
                          placeholder="Enter father name"
                          name="father_name"
                          onChange={(e) => setFatherName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 input-group input-group-sm">
                        <span className="spanTitle" for="text">
                          Customer Type
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8  input-group input-group-sm">
                        <select
                          className="form-control input-sm productInput"
                          name="customer_type"
                          value={customertType}
                          onChange={(e) => setCustomerType(e.target.value)}
                        >
                          <option value="Retail">Retail</option>
                          <option value="Dealer">Dealer</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 input-group input-group-sm">
                        <span className="spanTitle" for="warningQty">
                          NID Number
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control productInput input-sm"
                          id="warningQty"
                          placeholder="Enter NID No"
                          name="nid"
                          onChange={(e) => setNid(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 input-group input-group-sm">
                        <span className="spanTitle" for="warningQty">
                          Openning Due
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          type="number"
                          value={openningDue}
                          className="form-control productInput input-sm"
                          id="warningQty"
                          name="openning_due"
                          onChange={(e) => setOpenningDue(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 input-group input-group-sm">
                        <span className="spanTitle" for="warningQty">
                          Total Due
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          type="number"
                          value={totalDue}
                          className="form-control productInput input-sm"
                          id="warningQty"
                          name="total_due"
                          onChange={(e) => setTotalDue(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4 imageContainer">
                    <div className="row ">
                      <div className="col-md-12 col-lg-12 imageBox">
                        <p>
                          {imagePreview.file ? (
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src={imagePreview.file}
                              alt=""
                            />
                          ) : (
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src="https://as1.ftcdn.net/v2/jpg/01/96/95/72/500_F_196957269_UjsnYtkrceBGNA93p50ECcU5haJedoUx.jpg"
                              alt=""
                            />
                          )}
                        </p>
                      </div>
                      <div className="col-md-12 col-lg-12 fileBrowse">
                        <input
                          type="file"
                          hidden
                          id="file"
                          onChange={handleChange}
                        />
                        <label htmlFor="file" className="">
                          Browse
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
              <h4 className="modalHeadTitle">Reference Information</h4>
              <div className="container productBox">
                <div className="row ">
                  <div className="col-md-12 col-lg-6">
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-5 input-group input-group-sm">
                        <span className="spanTitle" for="warningQty">
                          Ref. Name
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-7 input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control productInput  "
                          id="warningQty"
                          placeholder="Enter reference name"
                          name="ref_name"
                          onChange={(e) => setRefName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-6">
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-4 input-group input-group-sm">
                        <span className="spanTitle" for="warningQty">
                          Contact
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control productInput input-sm"
                          id="warningQty"
                          placeholder="Enter contact"
                          name="ref_contact"
                          onChange={(e) => setRefContact(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-5 input-group input-group-sm">
                        <span className="spanTitle" for="warningQty">
                          Father Name
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-7 input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control productInput input-sm"
                          id="warningQty"
                          placeholder="Enter father name"
                          name="ref_father_name"
                          onChange={(e) => setRefFatherName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-12 col-lg-10">
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-3 input-group input-group-sm">
                        <span className="spanTitle" for="warningQty">
                          Address
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-9 input-group input-group-sm">
                        <textarea
                          type="text"
                          className="form-control productInput input-sm"
                          style={{
                            border: "1px solid none",
                            padding: "10px",
                            resize: "both",
                            overflow: "auto",
                          }}
                          id="warningQty"
                          placeholder="Enter address"
                          name="ref_address"
                          onChange={(e) => setRefAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right">
                    <Button
                      className="saveCloseBtn"
                      onClick={() => setAddCustomerModal(false)}
                    >
                      Close
                    </Button>
                    <Button type="submit" className="saveCloseBtn">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
        
          </Modal.Body>
        </div>
      </Modal> */}
      <AddCustomer
        show={addCustomerModal}
        onHide={() => setAddCustomerModal(false)}
      />
    </Fragment>
  );
};

export default CustomerSearch;
