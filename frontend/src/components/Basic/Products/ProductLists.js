import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getProductLists,
  deleteProduct,
  getProductListByDoubleClick,
  getColorLists,
  getProductListsWithQrBarCode,
} from "../../../redux/actions/productActions";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import QrBarCodeModal from "./QrBarCodeModal";
import "./product.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import swal from "sweetalert";
import ProductPrintTable from "./ProductPrintTable";
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
// Set table header name using material-ui
const columns = [
  { id: "code", label: "Code", minWidth: 30 },
  { id: "name", label: "Product Name", minWidth: 30 },
  { id: "category", label: "Category Name", minWidth: 30 },
  { id: "company", label: "Company Name", minWidth: 30 },
];

const ProductLists = ({ show, onHide }) => {
  const [addProductModal, setAddProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [printProductModal, setPrintProductModal] = useState(false);
  const [qrBarCodeModal, setQrBarCodeModal] = useState(false);
  const [searchProductText, setSearchProductText] = useState("");
  //Show Company data and searches real time
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isActive, setIsActive] = useState(null);

  const [isSelect, setIsSelect] = useState(true);
  const [selectId, setSelectId] = useState();

  const dispatch = useDispatch();

  // Fetch data from redux store
  const { products, loading, product_list } = useSelector(
    (state) => state.products
  );
  const { companyLists } = useSelector((state) => state.companies);
  const { categories } = useSelector((state) => state.categories);
  const colors = useSelector((state) => state.colors);
  const { user: currentUser } = useSelector((state) => state.auth);
  //Pass headers for authorized user access
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // console.log("products list in main componrnt ::", products);

  useEffect(() => {
    dispatch(getProductLists(headers));
    dispatch(getProductListsWithQrBarCode(headers));
    dispatch(getColorLists(headers));
  }, []);

  //it is used for print functions
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleClear = () => {
    setSearchProductText("");
  };

  // Delete product handler
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
          dispatch(deleteProduct(selectId, headers));
          toast.warn("Product is deleting...");
        } else {
          swal("Your data is safe!");
        }
      });
    } else {
      swal("Please select a row!");
    }
  };

  // select product for edit or delete
  const productActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    dispatch(getProductListByDoubleClick(id, headers));
  };

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

  // table body products
  const productData = productlists
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((product, index) => {
      return (
        <TableRow
          hover
          tabIndex={-1}
          key={index}
          style={
            isActive === index
              ? { background: "rgba(180, 216, 255, 1)" }
              : // ? { background: "rgba(126, 204, 227, .64)" }
                { background: "" }
          }
          onClick={() => productActive(index, product.id)}
        >
          {columns.map((column, index) => {
            const value = product[column.id];

            return (
              <TableCell
                style={{ fontSize: "16px", fontFamily: "Times New Roman" }}
                key={index}
              >
                {value}
                {/* {value
                  ? value
                  : column.id === "category"
                  ? product.category
                  : product.company} */}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  if (loading) {
    <p>Data is loading......</p>;
  }
  // This handler deselects the data
  const selectHandler = () => {
    setIsSelect(!isSelect);
    setIsActive(null);
  };

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
        dialogClassName="modal-bordar-radius-2"
      >
        <Modal.Header
          style={{ background: "rgb(180, 216, 255)", cursor: "move" }}
        >
          <div>
            <h4 className="responsive-head"> All Products</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content">
            <div className="container-fluid ">
              <div className="row justify-content-center">
                {/* body content  */}
                <div className="col-md-12 col-lg-9 col-sm-12 modal_showBox1">
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
                        <TableRow style={{ background: "" }}>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                minWidth: column.minWidth,
                                backgroundColor: "rgb(221, 221, 221)",
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

                      <TableBody>
                        {productData.length
                          ? productData
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
                    count={productlists.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Rows"
                    className="product_pagination px-2"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>

                {/* Perform Operation using some button */}
                <div className="col-md-12 col-lg-2 col-sm-12 modal_showBox2">
                  <div className="productBtns">
                    <Button
                      className="simpleBtn newbtn"
                      onClick={() => setAddProductModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn border-outline-none"
                      onClick={() =>
                        isSelect
                          ? setEditProductModal(true)
                          : swal("Select any product to edit!")
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="simpleBtn deletebtn"
                      onClick={confirmDelete}
                      disabled="true"
                    >
                      Delete
                    </Button>
            

                    <Button
                      className="simpleBtn"
                      onClick={() => setPrintProductModal(true)}
                    >
                      Print
                    </Button>

                    <Button
                      className="simpleBtn"
                      onClick={() => setQrBarCodeModal(true)}
                    >
                      Qr/Bar Code
                    </Button>
                    <Button className="simpleBtn closebtn" onClick={onHide}>
                      Close
                    </Button>
                  </div>

                  <strong className="mt-5 pt-3 d-block text-center">
                    Total: {products.length}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <AddProduct
          show={addProductModal}
          onHide={() => setAddProductModal(false)}
        />

        <EditProduct
          show={editProductModal}
          onHide={() => setEditProductModal(false)}
          product={product_list}
          companyList={companyLists}
          categories={categories}
          colors={colors}
          select={selectHandler}
        />
        <ProductPrintTable
          handlePrint={handlePrint}
          ref={componentRef}
          show={printProductModal}
          onHide={() => setPrintProductModal(false)}
        />

        <QrBarCodeModal
          show={qrBarCodeModal}
          onHide={() => setQrBarCodeModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default ProductLists;
