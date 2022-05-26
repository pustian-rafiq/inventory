import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addCompanyData,
  getCompanyLists,
} from "../../../../redux/actions/companyActions";
import Draggable from "react-draggable";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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
  { id: "name", label: "Company Name", minWidth: 30 },
];

function CompanyShowModal(props) {
  //State Management for Search btn
  const [showSearchModal, setShowSearchModal] = useState(false);

  //State Management for New company modal
  const [newCompanyAddModal, setNewCompanyAddModal] = useState(false);
  const [searchCompanyText, setSearchCompanyText] = useState("");

  const handleClear = () => {
    setSearchCompanyText("");
  };

  // Pass Auth Token
  const { user: currentUser } = useSelector((state) => state.auth);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  // Fetch Company data from api and show the data
  const { companyLists } = useSelector((state) => state.companies);

  //Get the last id for company data
  const len = companyLists.length;
  const lastId = companyLists.slice(0, len - (len - 1)).map((data) => {
    return data.id;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Show company data per page
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
  const CompanyListData = companyLists.filter((search) => {
    return (
      search.name.toLowerCase().includes(searchCompanyText.toLowerCase()) ||
      search.code.toLowerCase().includes(searchCompanyText.toLowerCase())
    );
  });

  // Show company data
  const companyData = CompanyListData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ).map((company, i) => {
    if (company) {
      return (
        <TableRow
          hover
          tabIndex={-1}
          key={i}
          onDoubleClick={() =>
            handleDbClick(company.id, company.code, company.name)
          }
        >
          {columns.map((column, i) => {
            const value = company[column.id];
            return (
              <TableCell
                key={i}
                style={{ fontSize: "15px", fontFamily: "Times New Roman" }}
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

  //Main Form state management
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    name: "",
  });

  // When user double click one row is selected and put the value in the form

  const handleDbClick = (id, code, name) => {
    // Set company id of selected row and pass to the parent component
    props.companyId(id, name);
    const newObject = formData;
    newObject.id = id;
    newObject.code = code;
    newObject.name = name;
    setFormData(newObject);
    setShowSearchModal(false);
  };

  /********* Add new company during product adding****************/
  const initialState = {
    code: "",
    name: "",
  };
  const [company, setCompany] = useState(initialState);
  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    const companyCode = e.target.value;
    const code = companyLists.find((b) => b.code === companyCode);
    if (code && code.code === companyCode) {
      toast.warn("This company code already exists!");
    }

    const formName = e.target.name;
    const formValue = e.target.value;

    setCompany({ ...company, [formName]: formValue });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!company.code) {
      errors.code = "Please fill the code";
    }
    if (!company.name) {
      errors.name = "Please fill the name";
    }
    let Error = Object.keys(errors).length > 0;

    if (!Error) {
      dispatch(addCompanyData(company, headers));
      handleDbClick(
        lastId.length > 0 ? lastId[0] + 1 : 1,
        company.code,
        company.name
      );
      //Reset color form field
      setCompany("");
      toast.success("New company added successfully!");
      setNewCompanyAddModal(false);
    } else {
      setErrors("");
    }
  };

  // Action with closehandler

  const closeHandler = () => {
    setNewCompanyAddModal(false);
    setErrors({});
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-3 col-sm-3  col-lg-3 input-group input-group-sm codeBox">
          <input
            type="text"
            placeholder="Code"
            defaultValue={formData.code}
            readOnly
            className="form-control productInput input-group input-group-sm"
          />
        </div>
        <div
          className="col-xs-3 col-sm-1  col-lg-1 SearchIconField"
          style={{ cursor: "pointer" }}
          onClick={() => setShowSearchModal(true)}
        >
          <span className="spanTitle searchIcon">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="col-xs-3 col-sm-4   col-lg-4 input-group input-group-sm nameBox">
          <input
            className="form-control productInput"
            type="text"
            placeholder="Name"
            defaultValue={formData.name}
            readOnly
          />
        </div>
        <div className="col-xs-3 col-sm-4  col-lg-4 input-group input-group-sm newCompany">
          <Button
            className="form-control productInput btn-info "
            onClick={() => setNewCompanyAddModal(true)}
          >
            New Company
          </Button>
        </div>
      </div>

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={showSearchModal}
        dialogAs={DraggableModal}
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4> All Company</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={() => setShowSearchModal(false)}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content">
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-12 pt-3 ml-1 showBox1">
                  <form onSubmit={(e) => e.preventDefault}>
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) => setSearchCompanyText(e.target.value)}
                          type="text"
                          value={searchCompanyText}
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

                  {/* table  */}
                  <TableContainer
                    sx={{ maxHeight: 440 }}
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                  >
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      sx={{ minWidth: 200 }}
                      size="small"
                    >
                      <TableHead>
                        <TableRow>
                          {columns.map((column, index) => (
                            <TableCell
                              key={index}
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
                      <TableBody>{companyData}</TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100, 500, 1000]}
                    component="div"
                    count={CompanyListData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Rows"
                    className="product_pagination px-2"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>

                {/* Perform Operation using some button */}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* New Company Add Modal */}

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={newCompanyAddModal}
        backdrop="static"
        keyboard="false"
      >
        <div className="background_and_table_header">
          <Modal.Header className="background_and_table_header">
            <div>
              <h4>Company</h4>
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
            {/* Company Add Form Start Here */}
            <div className="custom_modal_inner_content">
              <form onSubmit={submitHandler}>
                <div className="container companyBox">
                  <div className="row">
                    <div className="col-40">
                      <label htmlFor="companyCode">Code</label>
                    </div>
                    <div className="col-60">
                      <input
                        type="text"
                        id="code"
                        name="code"
                        onChange={changeHandler}
                        value={company.code}
                        placeholder="Company code.."
                        className="form-control productInput {errors.code ? 'is-invalid' : ''} "
                      />
                      <div className="">
                        <span style={{ color: "red" }}>{errors.code}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-40">
                      <label htmlFor="comapnayName">Company Name</label>
                    </div>
                    <div className="col-60">
                      <input
                        type="text"
                        id="companyName"
                        name="name"
                        onChange={changeHandler}
                        value={company.name}
                        placeholder="Company name...."
                        className="form-control productInput {errors.name ? 'is-invalid' : ''} "
                      />
                      <div className="">
                        <span style={{ color: "red" }}>{errors.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btnContainer companyBox">
                  <div className="row">
                    <div className="col-md-12 pull-right responsive-btn">
                      <Button
                        className="saveCloseBtn closebtn border-0"
                        onClick={closeHandler}
                      >
                        Close
                      </Button>
                      <Button type="submit" className="saveCloseBtn border-0 ">
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* Company Add Form End Here */}
          </Modal.Body>
        </div>
      </Modal>
    </Fragment>
  );
}

export default CompanyShowModal;
