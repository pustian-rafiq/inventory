import React, { Fragment, useState, useEffect } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { getProductLists } from "../../../redux/actions/productActions";

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
  { id: "code", label: "Code", minWidth: 30 },
  { id: "name", label: "Product Name", minWidth: 30 },
  { id: "category", label: "Category Name", minWidth: 30 },
  { id: "company", label: "Company Name", minWidth: 30 },
];

function ProductSearch({ setID }) {
  //State Management for Search btn
  const [showProductSearchModal, setShowProductSearchModal] = useState(false);
  const [searchProductText, setSearchProductText] = useState("");
  const handleClear = () => {
    setSearchProductText({ searchText: "" });
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
  //console.log(products);

  useEffect(() => {
    dispatch(getProductLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            onDoubleClick={() => {
              handleDbClick(
                product.id,
                product.code,
                product.category.name,
                product.name,
                product.stock
              );
              setID(product.id);
            }}
          >
            {columns.map((column) => {
              // console.log(column.id)
              const value = product[column.id];
              return (
                <TableCell
                  style={{ fontSize: "17px", fontFamily: "Times New Roman" }}
                >
                  {/* {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value} */}

                  {value
                    ? value
                    : column.id === "category.name"
                    ? product.category.name
                    : product.company.name}
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
    productName: "",
    productCategory: "",
    productCompany: "",
  });

  // When user double one row is selected and put the value in the form

  const handleDbClick = (id, code, productName) => {
    const newObject = formData;
    newObject.code = code;
    newObject.productName = productName;
    setFormData(newObject);
    setShowProductSearchModal(false);
  };

  return (
    <Fragment>
      <div className="col-12 col-md-2 col-lg-2">
        <div className="input-group input-group-sm">
          <span className="spanTitle">Product</span>
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-4 input-group input-group-sm codeBox">
        <input
          type="text"
          placeholder="Code"
          defaultValue={formData.code}
          className="form-control productInput input-group input-group-sm"
        />
      </div>
      <div
        className="col-12 col-md-1 col-lg-1 searchInput"
        style={{ cursor: "pointer" }}
        onClick={() => setShowProductSearchModal(true)}
      >
        <span className="spanTitle searchIcon">
          <i className="fa fa-search"></i>
        </span>
      </div>
      <div className="col-12 col-md-5 col-lg-5 input-group input-group-sm nameBox">
        <input
          className="form-control productInput"
          type="text"
          placeholder="Name"
          defaultValue={formData.productName}
        />
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
        dialogClassName="product-modal"
      >
        <Modal.Header className="background_and_table_header" >
          <div >
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
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default ProductSearch;
