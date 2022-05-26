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
import { getCategories } from "../../../redux/actions/categoryAction";

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
  { id: "id", label: "SL No", minWidth: 30 },
  { id: "code", label: "Category Code", minWidth: 30 },
  { id: "name", label: "Category Name", minWidth: 30 },
];

function CategorySearch({ setID }) {
  //State Management for Search btn
  const [showCategorySearchModal, setShowCategorySearchModal] = useState(false);
  const [searchCategoryText, setSearchCategoryText] = useState("");
  const handleClear = () => {
    setSearchCategoryText("");
  };

  // Pass Auth Token
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  // Fetch Category data from api
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  //console.log(categories);

  useEffect(() => {
    dispatch(getCategories(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Show category data per page
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Show category data and searches real time
  const categorylists = categories.filter((search) => {
    return (
      search.code.toLowerCase().includes(searchCategoryText.toLowerCase()) ||
      search.name.toLowerCase().includes(searchCategoryText.toLowerCase())
    );
  });

  const categoryData = categorylists
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((category, i) => {
      if (category) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={category.id}
            onDoubleClick={() => {
              handleDbClick(category.code, category.name);
              setID(category.id);
            }}
          >
            {columns.map((column, i) => {
              const value = category[column.id];
              return (
                <TableCell
                  key={i}
                  style={{ fontSize: "17px", fontFamily: "Times New Roman" }}
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
    categoryName: "",
  });

  // When user double one row is selected and put the value in the form

  const handleDbClick = (code, categoryName) => {
    const newObject = formData;
    newObject.code = code;
    newObject.categoryName = categoryName;
    setFormData(newObject);
    setShowCategorySearchModal(false);
  };

  return (
    <Fragment>
      <div className="row align-items-center">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2">
          <div className="input-group input-group-sm">
            <span className="spanTitle">Category</span>
          </div>
        </div>
        <div className="col-xs-2 col-sm-5 col-md-5 col-lg-4 input-group input-group-sm codeBox">
          <input
            type="text"
            placeholder="Code"
            defaultValue={formData.code}
            className="form-control productInput input-group input-group-sm"
          />
        </div>
        <div
          className="col-xs-4 col-sm-1 col-md-1 col-lg-1 searchInput"
          style={{ cursor: "pointer" }}
          onClick={() => setShowCategorySearchModal(true)}
        >
          <span className="spanTitle searchIcon">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="col-xs-4 col-sm-6 col-md-6 col-lg-5 input-group input-group-sm nameBox">
          <input
            className="form-control productInput"
            type="text"
            placeholder="Name"
            defaultValue={formData.categoryName}
          />
        </div>
      </div>
      {/***************************Product Show modal***************************** */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={showCategorySearchModal}
        dialogAs={DraggableModal}
      >
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header"> 
          <div>
            <h4 className="responsive-head"> All Category</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={() => setShowCategorySearchModal(false)}
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
                        onChange={(e) => setSearchCategoryText(e.target.value)}
                        type="text"
                        value={searchCategoryText}
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
                    sx={{ minWidth: 200 }}
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
                    <TableBody>{categoryData}</TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={categorylists.length}
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

export default CategorySearch;
