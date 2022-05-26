/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddSupplier from "../../../CustomerAndSupplier/Supplier/AddSupplier";
import { getSupplierLists } from "../../../../redux/actions/supplierActions";

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
const SupplierShowModal = (props) => {
  //State Management for Search btn
  const [showSupplierSearchModal, setShowSupplierSearchModal] = useState(false);

  //State Management for New button
  const [newSupplierAddModal, setNewSupplierAddModal] = useState(false);

  const [searchSupplierText, setSearchSupplierText] = useState("");

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
    // eslint-disable-next-line
  }, [showSupplierSearchModal]);

  //Show supplier data per page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Show Company data and searches real time
  const supplierDataList = supplierLists.filter((search) => {
    return (
      search.name.toLowerCase().includes(searchSupplierText.toLowerCase()) ||
      search.address.toLowerCase().includes(searchSupplierText.toLowerCase()) ||
      search.contact_no.toLowerCase().includes(searchSupplierText.toLowerCase())
    );
  });
  // Show customer data
  const supplierData = supplierDataList
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((supplier) => {
      if (supplier) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={supplier.id}
            onDoubleClick={() =>
              handleDbClick(
                supplier.id,
                supplier.name,
                supplier.code,
                supplier.total_due,
                supplier.address,
                supplier.contact_no,
                supplier.contact_person,
                supplier.create_date,
               // supplier.total_due
              )
            }
          >
            {columns.map((column) => {
              const value = supplier[column.id];
              return (
                <TableCell
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
  const handleDbClick = (
    id,
    name,
    code,
    due,
    address,
    contact_no,
    contact_person,
    create_date,
  ) => {
    props.supplierHandler(id, name,code,due, address, contact_no, contact_person, create_date);
    setShowSupplierSearchModal(false);
  };


  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-3 col-sm-3 col-lg-3 input-group input-group-sm codeBox">
          <input
            type="text"
            placeholder="Code"
            defaultValue={props.code}
            className="form-control productInput input-group input-group-sm"
            readOnly
          />
        </div>
        <div
          className="col-xs-3 col-sm-1 col-lg-1 SearchIconField"
          style={{ cursor: "pointer" }}
          onClick={() => setShowSupplierSearchModal(true)}
        >
          <span className="searchIcon">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="col-xs-3 col-sm-4 col-lg-4 input-group input-group-sm nameBox">
          <input
            className="form-control productInput"
            type="text"
            placeholder="Name"
            defaultValue={props.name}
            readOnly
          />
        </div>
        <div className="col-xs-3 col-sm-4 col-lg-4 input-group input-group-sm newCompany">
          <Button
            className="form-control productInput bg-info border"
            onClick={() => setNewSupplierAddModal(true)}
          >
            New Supplier
          </Button>
        </div>
      </div>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={showSupplierSearchModal}
        dialogAs={DraggableModal}
        // dialogClassName="suppliermodal"
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div style={{ float: "left" }}>
            <h4 className="modalHeadTitle"> All Suppliers </h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={() => setShowSupplierSearchModal(false)}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content p-2">
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
                        onChange={(e) => setSearchSupplierText(e.target.value)}
                        type="text"
                        value={searchSupplierText}
                        placeholder="Search category......"
                      />
                    </div>
                    <div className="clearBtn">
                      <button type="reset" onClick={handleClear}>
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
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
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
                    <TableBody>{supplierData}</TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100, 500, 1000]}
                  component="div"
                  count={supplierDataList.length}
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

      {/* New Supplier Add Modal */}
      <AddSupplier
        show={newSupplierAddModal}
        onHide={() => setNewSupplierAddModal(false)}
      ></AddSupplier>
    </Fragment>
  );
};

export default SupplierShowModal;
