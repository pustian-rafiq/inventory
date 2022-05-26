import React, { Fragment, useState } from "react";
import { Button, ModalDialog, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCategory } from "../../../../redux/actions/categoryAction";
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
  { id: "id", label: "SL No", minWidth: 30 },
  { id: "code", label: "Category Code", minWidth: 30 },
  { id: "name", label: "Category Name", minWidth: 30 },
];

function CategoryShowModal(props) {
  //State Management for Search btn
  const [showCategorySearchModal, setShowCategorySearchModal] = useState(false);

  //State Management for New button
  const [newCategoryAddModal, setNewCategoryAddModal] = useState(false);
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
  //Get the last id for category data
  const len = categories.length;
  const lastId = categories.slice(0, len - (len - 1)).map((data) => {
    return data.id;
  });
  const dispatch = useDispatch();
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
            onDoubleClick={() =>
              handleDbClick(category.id, category.code, category.name)
            }
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
    name: "",
  });

  // When user double one row is selected and put the value in the form

  const handleDbClick = (id, code, name) => {
    const newObject = formData;
    newObject.code = code;
    newObject.name = name;
    props.categoryId(id, name);
    setFormData(newObject);
    setShowCategorySearchModal(false);
  };

  /********************** Add new category during product adding*****************/

  const initialState = {
    code: "",
    name: "",
  };
  const [category, setCategory] = useState(initialState);
  const [errors, setErrors] = useState({
    code:'',
    name:''
  });
  
  const changeHandler = (e) => {
    const categoryCode = e.target.value;
    const code = categories.find(
      (b) => b.code === categoryCode
    );
    if (code && code.code === categoryCode) {
      toast.warn("This category code already exists!");
    }

    const nameField = e.target.name;
    const valueField = e.target.value;
    setCategory({ ...category, [nameField]: valueField });
  };

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    if (!category.code) {
      errors.code = "Please fill the code"
    }
    if (!category.name) {
      errors.name = "Please fill the name"
    }
    let Error = Object.keys(errors).length > 0

    if (!Error) {
      dispatch(addCategory(category, headers));
      handleDbClick(lastId.length >0 ? lastId[0] + 1 : 1, category.code, category.name);
      //Reset color form field
      setCategory("");
      toast.success("New Category added successfully!");
      setNewCategoryAddModal(false);
    }
   
  };

  // Action with closehandler

  const closeHandler = () => {
    setNewCategoryAddModal(false);
    setErrors("")
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-3 col-sm-3 col-lg-3 input-group input-group-sm codeBox">
          <input
            type="text"
            placeholder="Code"
            defaultValue={formData.code}
            readOnly
            className="form-control productInput input-group input-group-sm"
          />
        </div>
        <div
          className="col-xs-3 col-sm-1 col-lg-1 SearchIconField"
          style={{ cursor: "pointer" }}
          onClick={() => setShowCategorySearchModal(true)}
        >
          <span className="spanTitle searchIcon">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="col-xs-3 col-sm-4 col-lg-4 input-group input-group-sm nameBox">
          <input
            className="form-control productInput"
            type="text"
            placeholder="Name"
            defaultValue={formData.name}
            readOnly
          />
        </div>
        <div className="col-xs-3 col-sm-4 col-lg-4 input-group input-group-sm newCompany">
          <Button
            className="form-control productInput btn-info"
            onClick={() => setNewCategoryAddModal(true)}
          >
            New Category
          </Button>
        </div>
      </div>

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={showCategorySearchModal}
        dialogAs={DraggableModal}
      >
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header" >
          <div style={{ float: "left" }}>
            <h4> All Category</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={() => setShowCategorySearchModal(false)}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header" >
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
                      <TableRow style={{ background: "" }}>
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
              {/* Perform Operation using some button */}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* New Category Add Modal */}

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={newCategoryAddModal}
        backdrop="static"
        keyboard="false"
      >
   
          <Modal.Header className="background_and_table_header">
            <div>
              <h4>Category</h4>
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
          <div className="custom_modal_inner_content">
            {/* Company Add Form Start Here */}
            <form onSubmit={submitHandler}>
              {/* {errors && <p className="text-danger text-center">{errors}</p>} */}
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
                      value={category.code}
                      placeholder="Category code.."
                      className="form-control productInput {errors.code ? 'is-invalid' : ''} "
                    />
                      <div className="">
                     <span style={{color: 'red'}}>{errors.code}</span> 
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-40">
                    <label htmlFor="comapnayName">Category Name</label>
                  </div>
                  <div className="col-60">
                    <input
                      type="text"
                      id="companyName"
                      name="name"
                      onChange={changeHandler}
                      value={category.name}
                      placeholder="Category name.."
                      className="form-control productInput {errors.name ? 'is-invalid' : ''} "
                    />
                      <div className="">
                     <span style={{color: 'red'}}>{errors.name}</span> 
                    </div>
                  </div>
                </div>
              </div>
              <div className="btnContainer companyBox mt-2">
                <div className="row">
                  <div className="col-md-12 pull-right responsive-btn">
                    <Button className="saveCloseBtn  closebtn border-0" onClick={closeHandler}>
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
       
      </Modal>
    </Fragment>
  );
}

export default CategoryShowModal;
