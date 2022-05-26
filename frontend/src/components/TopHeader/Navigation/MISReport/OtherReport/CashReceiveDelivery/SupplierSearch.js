import React, { Fragment, useState } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// import DatePicker from 'react-date-picker';
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

  { id: 'code', label: 'Code', minWidth: 30 },
  { id: 'name', label: 'Name', minWidth: 30 },
  { id: 'address', label: 'Address', minWidth: 30 },
  { id: 'contact_no', label: 'Contact No', minWidth: 30 },
  { id: 'total_due', label: 'Total Due', minWidth: 30, format: (value) => value.toFixed(2) },

]

function SupplierSearch({ SupplierData }) {
 
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
 const supplierLists = useSelector(state => state.suppliers)
 const dispatch = useDispatch()

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
 const supplierDataList = supplierLists.filter(
   search => {
     return (
       search.name.toLowerCase().includes(searchSupplierText.toLowerCase()) ||
       search.address.toLowerCase().includes(searchSupplierText.toLowerCase()) ||
       search.contact_no.toLowerCase().includes(searchSupplierText.toLowerCase())

     );
   })
 // Show customer data
 const supplierData = supplierDataList
   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
   .map((supplier) => {
     if (supplier) {
       return (
         <TableRow hover tabIndex={-1} key={supplier.id} onDoubleClick={() => handleDbClick(supplier.id, supplier.code, supplier.name)} >
           {columns.map((column) => {
             const value = supplier[column.id];
             return (
               <TableCell style={{ fontSize: '17px', fontFamily: 'Times New Roman' }}>
                 {column.format && typeof value === "number"
                   ? column.format(value)
                   : value}
               </TableCell>
             );
           })}
         </TableRow>
       );
     } else {
       return ""
     }

   })

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

  const handleDbClick = (id,code, name) => {
    const newObject = formData;
    newObject.code = code;
    newObject.name = name;
    setFormData(newObject);
    setShowSupplierSearchModal(false);
  };



  return (
    <Fragment>
      <div className="col-sm-12 col-md-2 col-lg-2">
        <div className="input-group input-group-sm">
          <span className="spanTitle">Supplier</span>
        </div>
      </div>
      <div className="col-xs-5 col-sm-5 col-md-4 col-lg-4 input-group input-group-sm codeBox">
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
        onClick={() => setShowSupplierSearchModal(true)}
      >
        <span className="spanTitle" className="searchIcon">
          <i className="fa fa-search"></i>
        </span>
      </div>
      <div className="col-xs-3 col-sm-6 col-md-5 col-lg-5 input-group input-group-sm nameBox">
        <input
          className="form-control productInput"
          type="text"
          placeholder="Name"
          defaultValue={formData.name}
        />
      </div>
      {/* Search supplier modal */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={showSupplierSearchModal}
        dialogAs={DraggableModal}
        dialogClassName="suppliermodal"
      >
        <Modal.Header style={{ background: "var(--modalHeadColor)", cursor: "move" }}>
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

        <Modal.Body style={{ background: "var(--modalBodyColor)" }}>
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-12 pt-3 ml-1 showBox1">
                <form onSubmit={(e) => e.preventDefault} style={{ paddingTop: '10px' }}>
                      <div className="row searchBox">
                        <div className="searchInput ml-3 form-group" >
                          <input

                            onChange={(e) => setSearchSupplierText(e.target.value)}
                            type="text"
                            value={searchSupplierText}
                            placeholder="Search category......"
                          />
                        </div>
                        <div className="clearBtn" >

                          <button type="reset" onClick={handleClear}>
                            Clear
                          </button>
                        </div>
                      </div>
                    </form>
                    <TableContainer sx={{ maxHeight: 440 }} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 550 }} size="small" >
                        <TableHead >
                          <TableRow style={{ background: 'red' }}>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth, backgroundColor: '#6d2eff', color: 'white', fontSize: '16px', fontFamily: 'Times New Roman' }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {supplierData}
                        </TableBody>
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
            </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default SupplierSearch;
