import React, { Fragment, useState, useEffect } from "react";
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
import { getCompanyLists } from "../../../redux/actions/companyActions";

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

function CompanySearch({ setID }) {
  //State Management for Search btn
  const [showCompanySearchModal, setShowCompanySearchModal] = useState(false);
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
  const dispatch = useDispatch();
  // console.log(companyLists);

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
          onDoubleClick={() => {
            handleDbClick(company.id, company.code, company.name);
            setID(company.id);
          }}
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
    companyName: "",
  });

  // When user double one row is selected and put the value in the form

  const handleDbClick = (id, code, companyName) => {
    const newObject = formData;
    newObject.code = code;
    newObject.companyName = companyName;
    setFormData(newObject);
    setShowCompanySearchModal(false);
  };

  return (
    <Fragment>
      <div className="row align-items-center">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2">
          <div className="input-group input-group-sm">
            <span className="spanTitle">Company</span>
          </div>
        </div>
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-4 input-group input-group-sm codeBox">
          <input
            type="text"
            placeholder="Code"
            defaultValue={formData.code}
            className="form-control productInput input-group input-group-sm"
          />
        </div>
        <div
          className="col-xs-10 col-sm-1 col-md-1 col-lg-1 searchInput"
          style={{ cursor: "pointer" }}
          onClick={() => setShowCompanySearchModal(true)}
        >
          <span className="spanTitle searchIcon">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="col-xs-2 col-sm-6 col-md-6 col-lg-5 input-group input-group-sm nameBox">
          <input
            className="form-control productInput"
            type="text"
            placeholder="Name"
            defaultValue={formData.companyName}
          />
        </div>
      </div>
      {/***************************Company Show modal***************************** */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={showCompanySearchModal}
        dialogAs={DraggableModal}
      >
        <Modal.Header className="background_and_table_header">
          <div >
            <h4 className="responsive-head"> All Company</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={() => setShowCompanySearchModal(false)}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header" >
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
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default CompanySearch;
