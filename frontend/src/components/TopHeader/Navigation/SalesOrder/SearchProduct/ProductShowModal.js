import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
//import { getProductLists } from "../../../../../redux/actions/productActions";
import { categoryData } from "../../../../Basic/Categories/categoryData";
import CategoryShowModal from "../../../../Basic/Products/SearchCategory/CategoryShowModal";
import CompanyShowModal from "../../../../Basic/Products/SearchCompany/CompanyShowModal";
import Warrenty from "../../../../Basic/Products/Warrenty";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getStockProducts } from "../../../../../redux/actions/stockAction";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

// Set table header name using material-ui
const columns = [
  { id: "product_code", label: "Code", minWidth: 30 },
  { id: "product_name", label: "Product Name", minWidth: 30 },
  {
    id: "product_category",
    label: "Category Name",
    minWidth: 30,
  },
  { id: "product_company", label: "Company Name", minWidth: 30 },
  { id: "sales_rate", label: "Sales Rate", minWidth: 30 },
  {
    id: "quantity",
    label: "Stock Qty",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
];

function ProductShowModal(props) {
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

  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStockProducts(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch Category data from api
  // const { products, loading } = useSelector((state) => state.products);

  const stockProducts = useSelector((state) => state.stocks);
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
  const productlists = stockProducts?.filter((search) => {
    return (
      search?.product_code
        ?.toLowerCase()
        .includes(searchProductText.toLowerCase()) ||
      search?.product_name
        ?.toLowerCase()
        .includes(searchProductText.toLowerCase())
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
                product?.id,
                product?.product,
                product?.quantity,
                product?.product_name,
                product?.product_code,
                product?.product_company,
                product?.product_category,
                product?.sales_rate,
                product?.compressor_warrenty,
                product?.panel_warrenty,
                product?.motor_warrenty,
                product?.spare_parts_warrenty,
                product?.service_warrenty
              )
            }
          >
            {columns.map((column, index) => {
              // console.log(column.id)
              const value = product[column.id];
              return (
                <TableCell
                  style={{ fontSize: "17px", fontFamily: "Times New Roman" }}
                  key={index}
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

  const handleDbClick = (
    stockDetailsId,
    productId,
    stock,
    productName,
    code,
    productCompany,
    productCategory,
    salesRate,
    productCompressorWarrenty,
    productPanelWarrenty,
    productMotorWarrenty,
    productSparepartWarrenty,
    productServiceWarrenty
  ) => {
    // const newObject = formData;
    // newObject.product_code = code;
    // newObject.product_name = productName;

    props.productHandler(
      stockDetailsId,
      productId,
      stock,
      productName,
      code,
      productCompany,
      productCategory,
      salesRate,
      productCompressorWarrenty,
      productPanelWarrenty,
      productMotorWarrenty,
      productSparepartWarrenty,
      productServiceWarrenty
    );

    // props.stockDetailsId(stockDetailsId);
    // props.productId(productId);
    // props.productCode(code);
    // props.productCompany(productCompany);
    // props.productName(productName);
    // props.productCategory(productCategory);
    // props.productStock(stock);
    // props.productSalesRate(salesRate);
    // props.productCompressorWarrenty(productCompressorWarrenty);
    // props.productPanelWarrenty(productPanelWarrenty);
    // props.productMotorWarrenty(productMotorWarrenty);
    // props.productSparepartWarrenty(productSparepartWarrenty);
    // props.productServiceWarrenty(productServiceWarrenty);
    // setFormData(newObject);
    setShowProductSearchModal(false);
  };

  // // Handle handleNewFormSubmission
  // const handleNewFormSubmission = (e) => {
  //   //console.log("form submitted");
  //   e.preventDefault();
  //   if (newFormData.product_code === "" || newFormData.product_name === "") {
  //     alert("You should fillup both name and code!!");
  //   } else {
  //     setFormData(newFormData);
  //     setNewProductAddModal(false);
  //   }
  // };

  //Handle blur
  // const handleSingleItem = (e) => {
  //   const newData = newFormData;
  //   const name = e.target.name;
  //   const theValue = e.target.value;

  //   newData[name] = theValue;
  //   setNewFormData(newData);
  //   //console.log(newFormData);
  // };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-3 col-sm-5 col-md-4 col-lg-5 input-group input-group-sm codeBox">
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
          <span className="spanTitle searchIcon">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="col-xs-3 col-sm-6 col-md-6 col-lg-6 input-group input-group-sm nameBox">
          <input
            className="form-control productInput"
            type="text"
            placeholder="Name"
            defaultValue={props.name}
            readOnly
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
        show={showProductSearchModal}
        dialogAs={DraggableModal}
        dialogClassName="product-modal modal-bordar-radius-2"
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4> All Products </h4>
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
                <div className="col-md-12 pt-3 ml-0 mt-2 modal_showBox1">
                  <form
                    onSubmit={(e) => e.preventDefault}
                    style={{ paddingTop: "10px" }}
                  >
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) => setSearchProductText(e.target.value)}
                          type="text"
                          value={searchProductText}
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
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/******************* New Product Add Modal ***************************************/}
      {/* <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={newProductAddModal}
        backdrop="static"
        keyboard="false"
        dialogAs={DraggableModal}
      >
        <div className="background_and_table_header">
          <Modal.Header className="background_and_table_header">
            <div>
              <h4>Product Details</h4>
            </div>
            <div className="pull-right">
              <i
                className="fa fa-close"
                onClick={() => setNewProductAddModal(false)}
                style={{ cursor: "pointer", padding: "2px" }}
              ></i>
            </div>
          </Modal.Header>
          <Modal.Body className="background_and_table_header">
            <div className="custom_modal_inner_content p-4">

              <form
                className="form-horizontal"
                onSubmit={handleNewFormSubmission}
              >
                <div className="container productBox">
                  <div className="row">
                    <div className="col-md-12 col-lg-9">
                      <div className="row  mb-2">
                        <div className="col-md-12 col-lg-3">
                          <span className="spanTitle" for="code">
                            Code
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-9 input-group input-group-sm">
                          <input
                            onBlur={handleSingleItem}
                            name="product_code"
                            type="text"
                            className="form-control productInput"
                            id="code"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-3 ">
                          <span className="spanTitle" for="company">
                            Company
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-9">

                          <CompanyShowModal />
                        </div>
                      </div>
   
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-3">
                          <span className="spanTitle" for="category">
                            Category
                          </span>
                        </div>
                        <div className="col-md-12 col-lg-9  input-group input-group-sm">
                          <CategoryShowModal CategoryData={categoryData} />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-12 col-lg-3 input-group input-group-sm">
                          <span className="spanTitle" for="text">
                            Product Type
                          </span>
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
                          <span className="spanTitle" for="modelName">
                            Model Name
                          </span>
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
                          <span className="spanTitle" for="warningQty">
                            Warning Qty
                          </span>
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
            </div>

          </Modal.Body>
        </div>
      </Modal> */}
    </Fragment>
  );
}

export default ProductShowModal;
