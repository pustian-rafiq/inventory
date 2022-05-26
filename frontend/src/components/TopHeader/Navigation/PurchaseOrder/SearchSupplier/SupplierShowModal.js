import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { Fragment, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useSelector } from 'react-redux';

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

function SupplierShowModal(props) {
  //Handle All Data .. this data will come from database and will update after new data addition

  //State Management for Search btn
  const [showSupplierSearchModal, setShowSupplierSearchModal] = useState(false);

  //State Management for New button
  const [newSupplierAddModal, setNewSupplierAddModal] = useState(false);

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


  /**
   * Don't need to comment this code
   * When we uncomment this, this modal re-renders continuosly
  */

  //  dispatch(getSupplierLists(headers))
  //  useEffect( ()=> {
  //    dispatch(getSupplierLists(headers))
  //  },[supplierLists])


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
          <TableRow hover tabIndex={-1} key={supplier.id} onDoubleClick={() => handleDbClick(supplier.id, supplier.code, supplier.name, supplier.total_due)} >
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

  //Handle New Form States
  const [newFormData, setNewFormData] = useState({
    id: "",
    code: "",
    name: "",
    address: "",
    contactNo: "",
    totalDue: "",
  });

  // When user double one row is selected and put the value in the form

  const handleDbClick = (id, code, name, totalDue) => {
    const newObject = formData;
    newObject.id = id;
    newObject.code = code;
    newObject.name = name;
    newObject.totalDue = totalDue;
    props.supplierId(id);
    props.supplierPrevDue(totalDue)
    setFormData(newObject);
    setShowSupplierSearchModal(false);
    console.log("Id:" + id + totalDue)
  };

  // Handle handleNewFormSubmission
  const handleNewFormSubmission = (e) => {
    console.log("form submitted");
    e.preventDefault();
    if (newFormData.code === "" || newFormData.name === "") {
      alert("You should fillup both name and code!!");
    } else {
      setFormData(newFormData);
      setNewSupplierAddModal(false);
    }
  };

  //Handle blur
  const handleSingleItem = (e) => {
    const newData = newFormData;
    const name = e.target.name;
    const theValue = e.target.value;

    newData[name] = theValue;
    setNewFormData(newData);
    console.log(newFormData);
  };

  const [supplierImagePreview, setSupplierImagePreview] = useState({
    file: null,
  });
  const handleChange = (event) =>
    setSupplierImagePreview({
      file: URL.createObjectURL(event.target.files[0]),
    });

  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-3 col-sm-3 col-lg-3 input-group input-group-sm codeBox">
          <input
            type="text"
            placeholder="Code"
            defaultValue={formData.code}
            className="form-control productInput input-group input-group-sm"
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
            defaultValue={formData.name}
          />
        </div>
        <div className="col-xs-3 col-sm-4 col-lg-4 input-group input-group-sm newCompany">
          <Button
            className="form-control productInput"
            onClick={() => setNewSupplierAddModal(true)}
          >
            New Supplier
          </Button>
        </div>
      </div>

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
        <Modal.Header style={{ cursor: "move" }} className="custom_modal_inner_content">
          <div >
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

        <Modal.Body className="custom_modal_inner_content">
            <div className="custom_modal_inner_content ">
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
                          placeholder="Search supplier......"
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
                    <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 450 }} size="small" >
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
            </div>
        </Modal.Body>
      </Modal>
      {/* New Supplier Add Modal */}

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={newSupplierAddModal}
        backdrop="static"
        keyboard="false"
        dialogAs={DraggableModal}
      >
  
          <Modal.Header
            style={{  cursor: "move" }}
            className="background_and_table_header"
          >
            <div style={{ float: "left", height: "3px" }}>
              <h4>Supplier Details</h4>
            </div>
            <div className="pull-right">
              <i
                className="fa fa-close"
                onClick={() => setNewSupplierAddModal(false)}
                style={{ cursor: "pointer", padding: "2px" }}
              ></i>
            </div>
          </Modal.Header>
          <Modal.Body className="background_and_table_header" >
            {/* Company Add Form Start Here */}
            <div className="custom_modal_inner_content ">
            <form
              className="form-horizontal"
              onSubmit={handleNewFormSubmission}
            >
              <div className="container productBox">
                <div className="row">
                  <div className="col-sm-12 col-lg-8">
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">Supplier Code</span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          onBlur={handleSingleItem}
                          type="text"
                          name="code"
                          placeholder="Enter supllier code"
                          className="form-control productInput"
                          id="code"
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">Supplier Name</span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          onBlur={handleSingleItem}
                          name="name"
                          type="text"
                          placeholder="Enter supllier name"
                          className="form-control productInput"
                          id="code"
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">Contact Person</span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          onBlur={handleSingleItem}
                          name="contactPerson"
                          type="text"
                          placeholder="Enter father name"
                          className="form-control productInput"
                          id="code"
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">Contact No</span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          onBlur={handleSingleItem}
                          name="contactNo"
                          type="text"
                          placeholder="Enter mother name"
                          className="form-control productInput"
                          id="code"
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">Address</span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <textarea
                          onBlur={handleSingleItem}
                          name="address"
                          placeholder="Enter address"
                          className="form-control productInput"
                          id="code"
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">Openning Due</span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          onBlur={handleSingleItem}
                          name="openningNew"
                          type="number"
                          defaultValue="0.00"
                          className="form-control productInput"
                          id="salary"
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-4">
                        <span className="spanTitle" for="code">Total Due</span>
                      </div>
                      <div className="col-md-12 col-lg-8 input-group input-group-sm">
                        <input
                          name="totalDue"
                          onBlur={handleSingleItem}
                          type="number"
                          defaultValue="0.00"
                          className="form-control productInput"
                          id="salary"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-4 supplierImage">
                    <div className="row ">
                      <div className="col-md-sm col-md-12 supplierImageBox">
                        <p>
                          {supplierImagePreview.file ? (
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src={supplierImagePreview.file}
                              alt=""
                            />
                          ) : (
                            "No image available"
                          )}
                        </p>
                      </div>
                      <div className="col-sm-12 col-md-12 supplierFile">
                        <input
                          type="file"
                          hidden
                          id="file1"
                          onChange={handleChange}
                        />
                        <label htmlFor="file1" className="">
                          Browse
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right">
                    <Button
                      className="saveCloseBtn closebtn"
                      onClick={() => setNewSupplierAddModal(false)}
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
            </div>
            {/* Company Add Form End Here */}
          </Modal.Body>
      
      </Modal>
    </Fragment>
  );
}

export default SupplierShowModal;
