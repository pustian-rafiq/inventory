import React, { Fragment, useState } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";

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

// Set table header name using material-ui
const columns = [
  { id: "ProductID__code", label: "Code", minWidth: 30 },
  { id: "ProductID__name", label: "Product Name", minWidth: 30 },
  { id: "ProductID__company__name", label: "Company Name", minWidth: 30 },
  { id: "ProductID__category__name", label: "Category Name", minWidth: 30 },
  {
    id: "stock",
    label: "Sold Qty",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "stock_detail_id__sales_rate",
    label: "Sales Rate",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
];

function AddProduct(props) {
  //State Management for Search btn
  const [showProductSearchModal, setShowProductSearchModal] = useState(false);
  const [searchProductText, setSearchProductText] = useState("");

  const handleClear = () => {
    setSearchProductText({ searchText: "" });
  };

  // Fetch purchase product data from api
  const { salesProducts, loading } = useSelector((state) => state.products);

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
  const productlists = salesProducts.filter((search) => {
    return (
      search.ProductID__code.toLowerCase().includes(searchProductText.toLowerCase()) ||
      search.productID__name.toLowerCase().includes(searchProductText.toLowerCase())  ||
      search.productID__company__name.toLowerCase().includes(searchProductText.toLowerCase()) ||
      search.productID__category__name.toLowerCase().includes(searchProductText.toLowerCase()) 
    );
  });
  var k = 2;
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
                product.stock,
                product.ProductID_id,
                product.ProductID__code,
                product.ProductID__name,
                product.ProductID__company__name,
                product.ProductID__category__name,
                product.stock_detail_id,
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
                   {column.format && typeof value === 'number'
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
  if (loading) {
    <p>Data is loading......</p>;
  }
  //Main Form state management
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    productName: "",
    productCategory: "",
    productCompany: "",
  });

  // When user double one row is selected and put the value in the form

  const handleDbClick = (stock, id, code, name, company, category, stockDetailId) => {
    const newObject = formData;
    newObject.code = code;
    newObject.productName = name;
    props.productStock(stock);
    props.productId(id);
    props.productName(name);
    props.productCompany(company);
    props.productCategory(category);
    props.productStockDetailId(stockDetailId);
    setFormData(newObject);
    setShowProductSearchModal(false);
  };

  return (
    <Fragment>
      <div className="col-lg-3">
        <div className="input-group input-group-sm">
          <span className="spanTitle">Product</span>
        </div>
      </div>
      <div className="col-xs-5 col-sm-3 col-md-5 col-lg-3 input-group input-group-sm codeBox">
        <input
          type="text"
          placeholder="Code"
          defaultValue={formData.code}
          className="form-control productInput input-group input-group-sm"
          readOnly
        />
      </div>
      <div
        className="col-xs-4 col-sm-3 col-md-1 col-lg-1 searchInput"
        style={{ cursor: "pointer" }}
        onClick={() => setShowProductSearchModal(true)}
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
          defaultValue={formData.productName}
          readOnly
        />
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
        dialogClassName="product-modal modal-bordar-radius-2"
      >
        <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
          <div >
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
              <div className="col-md-12 pt-3 ml-1 modal_showBox1">
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
    </Fragment>
  );
}

export default AddProduct;
