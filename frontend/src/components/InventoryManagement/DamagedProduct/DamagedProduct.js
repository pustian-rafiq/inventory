import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_damage_product,
  getDamagedProducts,
} from "../../../redux/actions/damagedProduct";
import AddDamagedProduct from "./AddDamagedProduct";
import "./damage.css";
import EditDamagedProduct from "./EditDamagedProduct";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import swal from "sweetalert";
import { toast } from "react-toastify";
import PrintDamageProduct from "./PrintDamageProduct";
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

// Set purchase order table header name using material-ui
const columns = [
  { id: "entry_date", label: "Entry Date", minWidth: 20 },
  { id: "product_name", label: "Product", minWidth: 30 },
  { id: "quantity", label: "Qty", minWidth: 30 },

  {
    id: "unit_price",
    label: "P.Rate",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "total_price",
    label: "Total Price",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
];

const DamagedProduct = ({ show, onHide }) => {
  const [addDamagedProductModal, setAddDamagedProductModal] = useState(false);
  const [editDamagedProductModal, setEditDamagedProductModal] = useState(false);

  const [printDamagedProductModal, setPrintDamagedProductModal] =
    useState(false);
  const [searchDamagedProductText, setSearchDamagedProductText] = useState("");
  const [selectId, setSelectId] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [isActive, setIsActive] = useState(null);

  const [singleDamageProduct, setSingleDamageProduct] = useState(null);
  //Show Company data and searches real time
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  // Fetch purchase order and stock data from api
  const { damagedProducts } = useSelector((state) => state.damagedProducts);
  const dispatch = useDispatch();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const handleClear = () => {
    setSearchDamagedProductText("");
  };

  // select item for update or delete
  const damageProductActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    const dam = damagedProducts.find((c) => c.id === id);

    setSingleDamageProduct(dam);
  };

  useEffect(() => {
    dispatch(getDamagedProducts(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //it is show for print options

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Show purchase order data and searches real time
  const damagedProductLists = damagedProducts.filter((search) => {
    return (
      search.entry_date
        .toLowerCase()
        .includes(searchDamagedProductText.toLowerCase()) ||
      search.product_name
        .toLowerCase()
        .includes(searchDamagedProductText.toLowerCase())
    );
  });

  // Purchase order table data show
  const damagedProductData = damagedProductLists
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((purchaseOrder, i) => {
      if (purchaseOrder) {
        var date = purchaseOrder.entry_date;
        var dateFormat = moment(date).format("Do MMM YY");
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={purchaseOrder.id}
            style={
              isActive === i ? { background: "rgba(180, 216, 255, 1)" } : { background: "" }
            }
            onClick={() => damageProductActive(i, purchaseOrder.id)}
          >
            {columns.map((column, i) => {
              // console.log(column.id)
              const value = purchaseOrder[column.id];
              return (
                <TableCell className="tableRowData" key={i}>
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : column.id === "entry_date"
                    ? dateFormat
                    : value}

                  {/* {value? value: column.id ==="category.name"? order.category.name: order.company.name} */}
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
          dispatch(delete_damage_product(selectId, headers));
          swal(`Wow! Data Deleted successfully`, {
            icon: "success",
          });
          toast.success("Damage Product deleted successfully!");
          setIsSelect(false);
        } else {
          swal("Your data is safe!");
        }
      });
    } else {
      swal("Please select a row!");
    }
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

    <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
          <div>
            <h4 className="responsive-head"> Damaged Products</h4>
          </div>

          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>


        </Modal.Header>

      <Modal.Body  className="background_and_table_header" >
          <div className="custom_modal_inner_content">
            <div className="container-fluid ">
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-9 modal_showBox1">
                  <form onSubmit={(e) => e.preventDefault}>
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) =>
                            setSearchDamagedProductText(e.target.value)
                          }
                          type="text"
                          value={searchDamagedProductText}
                          placeholder="Search invoice no, name,address,contact no......"
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
                      sx={{ minWidth: 500 }}
                      size="small"
                    >
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                minWidth: column.minWidth,
                                backgroundColor: 'rgb(221, 221, 221)',
                                color: "black",
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
                        {damagedProductData.length
                          ? damagedProductData
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
                    rowsPerPageOptions={[10, 25, 100, 1000]}
                    component="div"
                    count={damagedProductLists.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Rows"
                    className="product_pagination px-2"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>

                {/* Perform Operation using some button */}

                <div className="col-md-12 col-lg-2 modal_showBox2">
                  <div className="productBtns">
                    <Button
                      className="simpleBtn newbtn"
                      onClick={() => setAddDamagedProductModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn"
                      onClick={() => setEditDamagedProductModal(true)}
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
                      onClick={() => setPrintDamagedProductModal(true)}
                    >
                      Print
                    </Button>
                    <Button className="simpleBtn closebtn" onClick={onHide}>
                      Close
                    </Button>

                    <b className="mt-5 pt-3 d-block text-center" >
                      Total :{damagedProducts.length}
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <AddDamagedProduct
          show={addDamagedProductModal}
          onHide={() => setAddDamagedProductModal(false)}
        />
        <EditDamagedProduct
          show={editDamagedProductModal}
          onHide={() => setEditDamagedProductModal(false)}
          damageProduct={singleDamageProduct}
          select={selectHandler}
        />
        <PrintDamageProduct
          handlePrint={handlePrint}
          ref={componentRef}
          show={printDamagedProductModal}
          onHide={() => setPrintDamagedProductModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default DamagedProduct;
