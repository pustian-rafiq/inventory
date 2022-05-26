/* eslint-disable no-unused-vars */
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductListByDoubleClick,
  getProductLists,
} from "../../../../redux/actions/productActions";
import AddProduct from "../../../Basic/Products/AddProduct";

// Set table header name using material-ui
const columns = [
  { id: "code", label: "Code", minWidth: 30 },
  { id: "name", label: "Product Name", minWidth: 30 },
  { id: "category", label: "Category Name", minWidth: 30 },
  { id: "company", label: "Company Name", minWidth: 30 },
];

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const ProductShowModal = (props) => {
  const [imagePreview, setImagePreview] = useState({ file: null });
  const handleChange = (event) =>
    setImagePreview({
      file: URL.createObjectURL(event.target.files[0]),
    });

  //State Management for Search btn
  const [showProductSearchModal, setShowProductSearchModal] = useState(false);

  //State Management for New button
  const [newProductAddModal, setNewProductAddModal] = useState(false);
  const [searchProductText, setSearchProductText] = useState("");
  const handleClear = () => {
    setSearchProductText("");
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  // Fetch product data from api
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductLists(headers));
    // eslint-disable-next-line
  }, [showProductSearchModal]);

  //Show Company data and searches real time
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Product Data Show
  const productlists = products.filter((search) => {
    return (
      search.code.toLowerCase().includes(searchProductText.toLowerCase()) ||
      search.category.toLowerCase().includes(searchProductText.toLowerCase()) ||
      search.company.toLowerCase().includes(searchProductText.toLowerCase()) ||
      search.name.toLowerCase().includes(searchProductText.toLowerCase())
    );
  });

  const productData = productlists
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((product) => {
      if (product) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={product.id}
            onDoubleClick={() =>
              handleDbClick(
                product.id,
                product.code,
                product.name,
                product.category,
                product.stock
              )
            }
          >
            {columns.map((column) => {
              // console.log(column.id)
              const value = product[column.id];
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

  const handleDbClick = (id, code, name, category) => {
    //const newObject = formData;
    //newObject.code = code;
    //newObject.name = name;
    // newObject.stock = stock;
    dispatch(getProductListByDoubleClick(id, headers));

    //props.productId(id);
    //props.productName(name);
   // props.productCategory(category);
    // props.productStock(stock);
    //setFormData(newObject);
    props.productHandler(id, code, name,category);
    setShowProductSearchModal(false);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 input-group input-group-sm codeBox">
          <input
            type="text"
            placeholder="Code"
            defaultValue={props.code}
            className="form-control productInput input-group input-group-sm"
            readOnly

          />
        </div>
        <div
          className="col-xs-3 col-sm-1 col-md-1 col-lg-1 SearchIconField"
          style={{ cursor: "pointer" }}
          onClick={() => setShowProductSearchModal(true)}
        >
          <span className="searchIcon">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="col-xs-3 col-sm-4 col-md-4  col-lg-4 input-group input-group-sm nameBox">
          <input
            className="form-control productInput"
            type="text"
            placeholder="Name"
            defaultValue={props.name}
            readOnly
          />
        </div>
        <div className="col-xs-3 col-sm-4 col-md-3 col-lg-3  p-0 m-0 input-group input-group-sm newCompany">
          <Button
            className="form-control productInput bg-info  border w-100"
            onClick={() => setNewProductAddModal(true)}
          >
            New
          </Button>
        </div>
      </div>
      {/***************************Product Show modal***************************** */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={showProductSearchModal}
        dialogAs={DraggableModal}
        // dialogClassName="product-modal"
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h2 className="modalHeadTitle"> All Products </h2>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={() => setShowProductSearchModal(false)}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content p-4">
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-12 pt-3 ml-1 showBox1">
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <form
                      onSubmit={(e) => e.preventDefault}
                      style={{ paddingTop: "10px" }}
                    >
                      <div className="row searchBox">
                        <div className="searchInput ml-3 form-group">
                          <input
                            onChange={(e) =>
                              setSearchProductText(e.target.value)
                            }
                            type="text"
                            value={searchProductText}
                            placeholder="Search for code, name, comapany or category..."
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
                      style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    >
                      <Table
                        stickyHeader
                        aria-label="sticky table"
                        sx={{ minWidth: 450 }}
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
                        <TableBody>{productData}</TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={productlists.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/******************* New Product Add Modal ***************************************/}

      <AddProduct
        show={newProductAddModal}
        onHide={() => setNewProductAddModal(false)}
      />

      {/* <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={newProductAddModal}
        backdrop="static"
        keyboard="false"
        dialogAs={DraggableModal}
      >
        <div style={{ background: "#9fa1ed" }}>
          <Modal.Header style={{ background: "rgb(174, 200, 242)" }}>
            <div style={{ float: "left", height: "3px" }}>
              <h4>Product Details</h4>
            </div>
            <div className="pull-right">
              <i className="fa fa-minus mr-2"></i>
              <i
                className="fa fa-close"
                onClick={() => setNewProductAddModal(false)}
                style={{ cursor: "pointer", padding: "2px" }}
              ></i>
            </div>
          </Modal.Header>
          <Modal.Body style={{ background: "#9fa1ed" }}>
            <form
              className="form-horizontal"
              onSubmit={handleNewFormSubmission}
            >
              <div className="container productBox">
                <div className="row">
                  <div className="col-md-12 col-lg-9">
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-3">
                        <span className="spanTitle" for="code">Code</span>
                      </div>
                      <div className="col-md-12 col-lg-9 input-group input-group-sm">
                        <input
                          onBlur={handleSingleItem}
                          name="code"
                          type="text"
                          className="form-control productInput"
                          id="code"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-3 ">
                        <span className="spanTitle" for="company">Company</span>
                      </div>
                      <div className="col-md-12 col-lg-9">
                        <CompanyShowModal />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-3">
                        <span className="spanTitle" for="category">Category</span>
                      </div>
                      <div className="col-md-12 col-lg-9  input-group input-group-sm">
                        <CategoryShowModal CategoryData={categoryData} />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-3 input-group input-group-sm">
                        <span className="spanTitle" for="text">Product Type</span>
                      </div>
                      <div className="col-md-12 col-lg-9  input-group input-group-sm">
                        <select className="form-control input-sm">
                          <option>SerialNo</option>
                          <option>BarCode</option>
                          <option>NoBarCode</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-3 input-group input-group-sm">
                        <span className="spanTitle" for="modelName">Model Name</span>
                      </div>
                      <div className="col-md-12 col-lg-9  input-group input-group-sm">
                        <input
                          onBlur={handleSingleItem}
                          name="modelName"
                          type="text"
                          className="form-control productInput input-sm"
                          id="modelName"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12 col-lg-3 input-group input-group-sm">
                        <span className="spanTitle" for="warningQty">Warning Qty</span>
                      </div>
                      <div className="col-md-12 col-lg-9 input-group input-group-sm">
                        <input
                          onBlur={handleSingleItem}
                          name="Qty"
                          type="number"
                          className="form-control productInput input-sm"
                          id="warningQty"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-3 imageContainer">
                    <div className="row ">
                      <div className="col-md-12 col-lg-12 imageBox">
                        <p>
                          {imagePreview.file ? (
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src={imagePreview.file}
                              alt=""
                            />
                          ) : (
                            "No image available"
                          )}
                        </p>
                      </div>
                      <div className="col-md-12 col-lg-12 fileBrowse">
                        <input
                          onBlur={handleSingleItem}
                          name="file"
                          type="file"
                          hidden
                          id="file"
                          onChange={handleChange}
                        />
                        <label htmlFor="file" className="">
                          Browse
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <Warrenty />
              </div>

              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right">
                    <Button
                      className="saveCloseBtn"
                      onClick={() => setNewProductAddModal(false)}
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
          </Modal.Body>
        </div>
      </Modal> */}
    </Fragment>
  );
};

export default ProductShowModal;
