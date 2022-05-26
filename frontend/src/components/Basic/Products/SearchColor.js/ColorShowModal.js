import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addColor,
  getColorLists,
} from "../../../../redux/actions/productActions";
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
  { id: "description", label: "Color Name", minWidth: 30 },
];

const ColorShowModal = (props) => {
  //State Management for Search btn
  const [showSearchModal, setShowSearchModal] = useState(false);

  //State Management for New Color add modal
  const [newColorAddModal, setNewColorAddModal] = useState(false);

  const [searchColorText, setSearchColorText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // Fetch Bank data from api
  const colors = useSelector((state) => state.colors);

  const handleClear = () => {
    setSearchColorText("");
  };

  //Get the last id for colors data
  const len = colors.length;

  let lastId = colors.slice(0, len - (len - 1)).map((data) => {
    return data.id;
  });

  // When user double one row is selected and put the value in the form
  const handleDbClick = (id, code, description) => {
    const newObject = formData;
    newObject.code = code;
    props.colorId(id);
    newObject.description = description;
    setFormData(newObject);
    setShowSearchModal(false);
  };

  // console.log("colors lastId :: ", lastId[0], Array.isArray(lastId));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColorLists(headers));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //Show Company data and searches real time
  const colorListData = colors.filter((search) => {
    return (
      search.description
        .toLowerCase()
        .includes(searchColorText.toLowerCase()) ||
      search.code.toLowerCase().includes(searchColorText.toLowerCase())
    );
  });

  // Show company data
  const colorData = colorListData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((color, i) => {
      if (color) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={i}
            onDoubleClick={() =>
              handleDbClick(color.id, color.code, color.description)
            }
          >
            {columns.map((column, i) => {
              const value = color[column.id];
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
    description: "",
  });

  /********************** Add new color during product adding*****************/

  const initialState = {
    code: "",
    description: "",
  };

  const [color, setColor] = useState(initialState);
  const [errors, setErrors] = useState({});
  //const [isError, setIsError] = useState(false);


  const changeHandler = (e) => {
    const colorCode = e.target.value;
    const code = colors.find(
      (b) => b.code === colorCode
    );
    if (code && code.code === colorCode) {
      toast.warn("This color code already exists!");
    }

    let nameField = e.target.name;
    let valueField = e.target.value;

    setColor({ ...color, [nameField]: valueField });
  };

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();  
    if (!color.code) {
      errors.code = "Please fill the code"
    }
    if (!color.description) {
      errors.description = "Please fill the description"
    }
    let Error = Object.keys(errors).length > 0
 
    if (!Error) {
      dispatch(addColor(color, headers));
      handleDbClick(lastId.length > 0 ? lastId[0] + 1 : 1, color.code, color.description);
      //Reset color form field
      setColor("");
      toast.success("New color added successfully!");
      setNewColorAddModal(false);
    }
  };

  // Action with closehandler
  const closeHandler = () => {
    setNewColorAddModal(false);
   setErrors("")

  };

  return (
    <Fragment>
      {/* New Color Add Field */}
      <div className="row">
        <div className="col-xs-3 col-sm-3  col-lg-3 input-group input-group-sm codeBox">
          <input
            type="text"
            placeholder="Code"
            defaultValue={formData.code}
            className="form-control productInput input-group input-group-sm"
            readOnly
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
            placeholder="Color"
            defaultValue={formData.description}
            readOnly
          />
        </div>
        <div className="col-xs-3 col-sm-4  col-lg-4 input-group input-group-sm newCompany">
          <Button
            className="form-control productInput btn-info"
            onClick={() => setNewColorAddModal(true)}
          >
            New Color
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
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header" >
          <div>
            <h4> All Colors</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={() => setShowSearchModal(false)}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header" >
        <div className="custom_modal_inner_content">
          <div className="container-fluid ">
            <div className="row">
              <div className="col-md-12 pt-3 ml-1 showBox1">
                <form onSubmit={(e) => e.preventDefault}>
                  <div className="row searchBox">
                    <div className="searchInput ml-3 form-group">
                      <input
                        onChange={(e) => setSearchColorText(e.target.value)}
                        type="text"
                        value={searchColorText}
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
                    <TableBody>{colorData}</TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[10, 25, 100, 500, 1000]}
                  component="div"
                  count={colorListData.length}
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
        show={newColorAddModal}
        backdrop="static"
        keyboard="false"
      >
        <div className="background_and_table_header" >
          <Modal.Header className="background_and_table_header">
            <div style={{ float: "left", height: "3px" }}>
              <h4>Color</h4>
            </div>
            <div className="pull-right">
              <i
                className="fa fa-close"
                onClick={closeHandler}
                style={{ cursor: "pointer", padding: "2px" }}
              ></i>
            </div>
          </Modal.Header>
          <Modal.Body className="background_and_table_header" >
             <div className="custom_modal_inner_content">
            {/* Company Add Form Start Here */}
            <form onSubmit={submitHandler}>
              {/* {errors && <p className="text-danger text-center">{errors}</p>} */}
              <div className="container companyBox mt-2">
                <div className="row">
                  <div className="col-40">
                    <label htmlFor="companyCode">Code *</label>
                  </div>
                  <div className="col-60">
                    <input
                      type="text"
                      id="code"
                      name="code"
                      onChange={changeHandler}
                      value={color.code}
                      placeholder="Color code.."
                      className="form-control productInput {errors.code ? 'is-invalid' : ''} "
                    />
                    <div>
                     <span style={{color: 'red'}}>{errors.code}</span> 
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-40">
                    <label htmlFor="comapnayName">Color Name *</label>
                  </div>
                  <div className="col-60">
                    <input
                      type="text"
                      id="description"
                      name="description"
                      onChange={changeHandler}
                      value={color.description}
                      placeholder="Color name.."
                      className="form-control productInput {errors.description ? 'is-invalid' : ''} "
                    />
                    <div>
                    <span style={{color: 'red'}}>{errors.description}</span> 
                    </div>
                  </div>
                </div>
              </div>
              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right responsive-btn">
                    <Button className="saveCloseBtn closebtn border-0" onClick={closeHandler}>
                      Close
                    </Button>
                    <Button type="submit" className="saveCloseBtn border-0">
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
};

export default ColorShowModal;
