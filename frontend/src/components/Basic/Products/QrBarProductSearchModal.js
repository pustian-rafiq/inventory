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
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";

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

const ProductShowModal = ({
  productHandler,
  register,
  productCode,
  productName,
  errors,
}) => {
  //State Management for Search btn
  const [showProductSearchModal, setShowProductSearchModal] = useState(false);

  //State Management for New button
  const [searchProductText, setSearchProductText] = useState("");

  const handleClear = () => {
    setSearchProductText("");
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);

  // Fetch product data from api
  const { product_list_with_qr_bar_code: products } = useSelector(
    (state) => state.products
  );

  // console.log("products list with qr and bar code 1:::", products);

  //Show Company data and searches real time
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
                product.barcode_image,
                product.qrcode_image,
                product.sales_rate
              )
            }
          >
            {columns.map((column) => {
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

  //   select product by double click
  const handleDbClick = (id, code, name, barCode, qrCode, mrp) => {
    productHandler(id, code, name, barCode, qrCode, mrp);
    setShowProductSearchModal(false);
  };

  return (
    <Fragment>
      <div className="form-row">
        {/* code  */}
        <div className="form-group col-md-2">
          <label htmlFor="Quantity">Code</label>
        </div>

        <div className="form-group col-md-4">
          <input
            type="text"
            className={`form-control ${errors.code && "invalid"}`}
            value={productCode}
            {...register("code", { required: "Product code is required" })}
            placeholder="Product Code"
            readOnly
          />
          {errors.code && (
            <span className="text-danger">{errors.code.message}</span>
          )}
        </div>

        {/* search button  */}
        <div
          className="form-group col-md-1 text-center mt-2"
          style={{ cursor: "pointer" }}
          onClick={() => setShowProductSearchModal(true)}
        >
          <span className="searchIcon">
            <i className="fa fa-search"></i>
          </span>
        </div>

        {/* name  */}
        <div className="form-group col-md-1">
          <label htmlFor="Quantity">Name</label>
        </div>

        <div className="form-group col-md-4">
          <input
            className={`form-control ${errors.name && "invalid"}`}
            type="text"
            placeholder="Product Name"
            value={productName}
            {...register("name", { required: "Product name is required" })}
            readOnly
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>
      </div>

      {/* modal  */}
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
    </Fragment>
  );
};

export default ProductShowModal;
