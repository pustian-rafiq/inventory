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
  { id: "product__code", label: "Code", minWidth: 30 },
  { id: "product__name", label: "Product Name", minWidth: 30 },
  { id: "product__company__name", label: "Company Name", minWidth: 30 },
  { id: "product__category__name", label: "Category Name", minWidth: 30 },
  {
    id: "stock",
    label: "Purchased Qty",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "stockdetail__purchase_rate",
    label: "Purchase Rate",
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
  const { purchaseProducts } = useSelector((state) => state.products);
console.log("purchaseProducts",purchaseProducts)
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProductLists(headers));
  // }, []);

  //Show product data and searches real time
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const scoreArr = Object.entries(purchaseProducts);
  //Product Data Show
  const productlists = purchaseProducts.filter((search) => {
    return (
      search.product__code.toLowerCase().includes(searchProductText.toLowerCase()) ||
      search.product__name.toLowerCase().includes(searchProductText.toLowerCase())  ||
      search.product__company__name.toLowerCase().includes(searchProductText.toLowerCase()) ||
      search.product__category__name.toLowerCase().includes(searchProductText.toLowerCase()) 
    );
  });

  const productData = productlists
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((product,i) => {
      if (product) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={product.product__id}
            onDoubleClick={() =>
              handleDbClick(
                product.stock,
                product.product__id,
                product.product__code,
                product.product__name,
                product.product__company__name,
                product.product__category__name,
                product.stockdetail,
              )
            }
          >
            {columns.map((column,index) => {
              const value = product[column.id];
              return (
                <TableCell
                  style={{ fontSize: "17px", fontFamily: "Times New Roman" }}
                  key={index}
                >
                   {column.format && typeof value === "number"
                    ? column.format(value)
                      : value}
                  {/* {value
                    ? value
                    : column.id === "category.name"
                    ? product.category.name
                    : product.company.name} */}
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
    category: "",
    company: "",
    stock: "",
  });

  // When user double one row is selected and put the value in the form

  const handleDbClick = (qty, id, code, name, company, category,stockDetail) => {
    const newObject = formData;
    newObject.code = code;
    newObject.productName = name;
    props.productQty(qty);
    props.productId(id);
    props.productName(name);
    props.productCompany(company);
    props.productCategory(category);
    props.productStockDetail(stockDetail);
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
        dialogClassName="product-modal"
      >
        <Modal.Header style={{cursor: "move" }}  className="background_and_table_header">
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
              <div className="col-md-12 pt-3 ml-0 mt-2 showBox1">
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
                      <button type="reset" onClick={handleClear}>
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
