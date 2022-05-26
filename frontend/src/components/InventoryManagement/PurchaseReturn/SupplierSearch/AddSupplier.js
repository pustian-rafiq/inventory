import React, { Fragment, useState } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getProductListsById } from "../../../../redux/actions/productActions";

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

function AddSupplier(props) {
  //Handle All Data .. this data will come from database and will update after new data addition

  //State Management for Search btn
  const [showSupplierSearchModal, setShowSupplierSearchModal] = useState(false);

  const [searchSupplierText, setSearchSupplierText] = useState("");

  const handleClear = () => {
    setSearchSupplierText({ searchText: "" });
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  //Fetch supplier data from api
  const supplierLists = useSelector((state) => state.suppliers);

  //Show supplier data per page
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
    .map((supplier,i) => {
      if (supplier) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={i}
            onDoubleClick={() =>
              handleDbClick(
                supplier.id,
                supplier.code,
                supplier.name,
                supplier.total_due
              )
            }
          >
            {columns.map((column,i) => {
              const value = supplier[column.id];
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

  //Main Form state management
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    name: "",
    address: "",
    contact_no: "",
    total_due: "",
  });

  // When user double one row is selected and put the value in the form
  //Pass headers for authorized user access

  // Pass multipart/form-data for file uploading

  const dispatch = useDispatch();
  const handleDbClick = (id, code, name, totalDue) => {
    const newObject = formData;
    newObject.code = code;
    newObject.name = name;
    newObject.total_due = totalDue;
    props.supplierId(id);
    //props.supplierPrevDue(totalDue)
    dispatch(getProductListsById(id, headers));
    setFormData(newObject);
    setShowSupplierSearchModal(false);
  };

  // useEffect(()=> {
  //   dispatchEvent(getProductListsById)
  // })

  return (
    <Fragment>
      <div className="col-md-8">
        <div className="row">
          <div className="col-lg-3">
            <div className="input-group input-group-sm">
              <span className="spanTitle">Supplier</span>
            </div>
          </div>

          <div className="col-xs-3 col-sm-3 col-lg-3 input-group input-group-sm codeBox">
            <input
              type="text"
              placeholder="Code"
              defaultValue={formData.code}
              className="form-control productInput input-group input-group-sm"
              readOnly
            />
          </div>
          <div
            className="col-xs-3 col-sm-1 col-lg-1 searchInput"
            style={{ cursor: "pointer" }}
            onClick={() => setShowSupplierSearchModal(true)}
          >
            <span className="spanTitle searchIcon">
              <i className="fa fa-search"></i>
            </span>
          </div>
          <div className="col-xs-3 col-sm-4 col-lg-5 input-group input-group-sm nameBox">
            <input
              className="form-control productInput"
              type="text"
              placeholder="Name"
              defaultValue={formData.name}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="row">
          <div className="col-md-6 input-group input-group-sm">
            <span className="spanTitle">Prev. Due</span>
          </div>
          <div className="col-md-6 input-group input-group-sm">
            <input
              type="number"
              className="form-control productInput input-sm"
              value={formData.total_due}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Search supplier modal */}

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={showSupplierSearchModal}
        dialogAs={DraggableModal}
        dialogClassName="add-supplier-modal"
      >
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">
          <div>
            <h2 className="modalHeadTitle"> All Suppliers </h2>
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
            <div className="custom_modal_inner_content p-4">
                <div className="container-fluid ">
                  <div className="row">
                    <div className="col-md-12 pt-3 ml-0 mt-2 showBox1">
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
                              placeholder="Search supplier......"
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
                          sx={{ minWidth: 450 }}
                          size="small"
                        >
                          <TableHead>
                            <TableRow style={{ background: "red" }}>
                              {columns.map((column,i) => (
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
    </Fragment>
  );
}

export default AddSupplier;
