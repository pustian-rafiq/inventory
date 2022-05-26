import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  deleteCategory,
  getCategories,
} from "../../../redux/actions/categoryAction";
import AddCategory from "./AddCategory";
import "./category.css";
import EditCategory from "./EditCategory";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CategoriesPrint from "./CategoriesPrint";
import { useReactToPrint } from "react-to-print";
import { Skeleton } from "@mui/material";

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
  // { id: "id", label: "SL No", minWidth: 30 },
  { id: "code", label: "Category Code", minWidth: 30 },
  { id: "name", label: "Category Name", minWidth: 30 },
];

const CategoryLists = ({ show, onHide }) => {
  const [selectId, setSelectId] = useState();
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(true);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [printCateroriesModal, setPrintCateroriesModal] = useState(false);

  const [searchCategoryText, setSearchCategoryText] = useState("");
  const [singleCategory, setSingleCategory] = useState(null);

  const { user: currentUser } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // select item for update or delete
  const companyActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    const categ = categories.find((c) => c.id === id);

    setSingleCategory(categ);
  };

  useEffect(() => {
    dispatch(getCategories(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleClear = () => {
    setSearchCategoryText("");
  };

  //Show category data per page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /*
   * ---For updating data, select a row when user double click on it
   * --- If condition is true, then (isSelect = false) unselect the selected row. Otherwise select another row (isSelect = true).
   */

  //Category Data Show and realtime search
  const categorylists = categories?.filter((search) => {
    return (
      search?.code.toLowerCase().includes(searchCategoryText.toLowerCase()) ||
      search?.name.toLowerCase().includes(searchCategoryText.toLowerCase())
    );
  });

  const categoryData = categorylists
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((category, index) => {
      if (category) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={category.id}
            style={
              isActive === index
                ? { background: "rgba(180, 216, 255, 1)" }
                : { background: "" }
            }
            onClick={() => companyActive(index, category.id)}
          >
            {columns.map((column, i) => {
              const value = category[column.id];
              return (
                <TableCell
                  key={i}
                  style={
                    isActive === index
                      ? {
                          color: "#000",
                          fontSize: "16px",
                          fontFamily: "Times New Roman",
                        }
                      : {
                          color: "black",
                          fontSize: "16px",
                          fontFamily: "Times New Roman",
                        }
                  }
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

  // Show Confirm Message for deleting
  const confirmDelete = () => {
    if (isSelect) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteCategory(selectId, headers));
          toast.warn("Category is deleting!");
          setIsSelect(false);
        } else {
          swal("Your data is safe!");
        }
      });
    } else {
      swal("Please select a row!");
    }
  };
  // When user close the modal, all properties are reset
  const closeHandler = () => {
    setIsActive(null);
    setIsSelect(false);
    onHide();
  };
  // This handler deselects the data  
  const selectHandler = () => {
    setIsSelect(!isSelect)
    setIsActive(null);
  }
  return (
    <Fragment>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={show}
        dialogAs={DraggableModal}
      >
      <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">
          <div>
            <h2> All Categories</h2>
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
            <div className="container-fluid ">
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-9 modal_showBox1">
                  <form
                    onSubmit={(e) => e.preventDefault}
                    style={{ paddingTop: "10px" }}
                  >
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) =>
                            setSearchCategoryText(e.target.value)
                          }
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
                        <TableRow>
                          {columns.map((column, i) => (
                            <TableCell
                              key={i}
                              align={column.align}
                              style={{
                                minWidth: column.minWidth,
                                backgroundColor: "rgb(221, 221, 221)",
                                color: "#000",
                                fontSize: "16px",
                                fontFamily: "Times New Roman"
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {categoryData.length
                          ? categoryData
                          : columns.map((column, i) => (
                              <TableCell key={i} align={column.align}>
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                              </TableCell>
                            ))}
                      </TableBody>
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

                <div className="col-md-12 col-lg-2 modal_showBox2">
                  <div>
                    <Button
                      className="simpleBtn newbtn"
                      onClick={() => setAddCategoryModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn"
                      onClick={() =>
                        isSelect
                          ? setEditCategoryModal(true)
                          : swal("Select any category to edit!")
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="simpleBtn deletebtn"
                      onClick={confirmDelete}
                    >
                      Delete
                    </Button>
               

                    <Button
                      className="simpleBtn"
                      onClick={() => setPrintCateroriesModal(true)}
                    >
                      Print
                    </Button>
                    <Button
                      className="simpleBtn closebtn"
                      onClick={closeHandler}
                    >
                      Close
                    </Button>

                    <strong className="mt-5 pt-3 d-block text-center">
                      Total Categories: {categories.length}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <AddCategory
          show={addCategoryModal}
          onHide={() => setAddCategoryModal(false)}
        />
        <EditCategory
          show={editCategoryModal}
          onHide={() => setEditCategoryModal(false)}
          category={singleCategory}
          select={selectHandler}
        />
        <CategoriesPrint
          handlePrint={handlePrint}
          ref={componentRef}
          show={printCateroriesModal}
          onHide={() => setPrintCateroriesModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default CategoryLists;
