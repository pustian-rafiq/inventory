import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { getCashCollection } from "../../../redux/actions/cashCollectionActions";
import AddCashCollection from "./AddCashCollection";
import "./cashcollection.css";
import EditCashCollection from "./EditCashCollection";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import swal from "sweetalert";
import PrintCashCollection from "./PrintCashCollection";
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
  { id: "entry_date", label: "Entry Date", minWidth: 30 },
  { id: "customer_name", label: "Customer Name", minWidth: 30 },
  { id: "contact_no", label: "Contact No", minWidth: 30 },
  { id: "amount", label: "Amount", minWidth: 30 },
  { id: "payment_type", label: "Status", minWidth: 30 },
];

const CashCollection = ({ show, onHide }) => {
  const [addCashCollectionModal, setAddCashCollectionModal] = useState(false);
  const [editCashCollectionModal, setEditCashCollectionModal] = useState(false);

  const [printCashCollectionModal, setPrintCashCollectionModal] =
    useState(false);

  const [searchCashCollectionText, setSearchCashCollectionText] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [singleCashCollection, setSingleCashCollection] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch data from api/redux store
  const { user: currentUser } = useSelector((state) => state.auth);
  const cashcollections = useSelector((state) => state.cashcollections);
  const dispatch = useDispatch();

  // request header
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const handleClear = () => {
    setSearchCashCollectionText("");
  };

  // active cashcollection handler
  const cashCollectionActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setIsSelect(true);
    }

    const prod = cashcollections.find((product) => product.id === id);

    setSingleCashCollection(prod);
  };

  useEffect(() => {
    dispatch(getCashCollection(headers));
  }, []);

  //this section is worked in print

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

  //Product Data Show
  const cashCollectionlists = cashcollections.filter((search) => {
    return (
      search.customer_name
        .toLowerCase()
        .includes(searchCashCollectionText.toLowerCase()) ||
      search.transaction_type
        .toLowerCase()
        .includes(searchCashCollectionText.toLowerCase())
    );
  });

  const cashCollectionData = cashCollectionlists
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((cashData, i) => {
      return (
        <TableRow
          hover
          tabIndex={-1}
          key={i}
          style={
            isActive === i ? { background: "rgba(180, 216, 255, 1)" }
            : { background: "" }
          }
          onClick={() => cashCollectionActive(i, cashData.id)}
        >
          {columns.map((column, i) => {
            // console.log(column.id)
            const value = cashData[column.id];
            var date = cashData.entry_date;
            return (
              <TableCell
                key={i}
                style={{ fontSize: "17px", fontFamily: "Times New Roman" }}
              >
                {column.format && typeof value === "number"
                  ? column.format(value)
                  : column.id === "entry_date"
                  ? moment(date).format("Do MMM YY")
                  : value}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
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
        // dialogClassName="purchase-retun-modal"
      >
    <Modal.Header style={{cursor: "move",padding:'6px'}} className="background_and_table_header" >
          <div>
            <h2 className="responsive-head"> Cash Collections</h2>
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
                  <form onSubmit={(e) => e.preventDefault}>
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) =>
                            setSearchCashCollectionText(e.target.value)
                          }
                          type="text"
                          value={searchCashCollectionText}
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
                      sx={{ minWidth: 650 }}
                      size="small"
                      stickyHeader
                      aria-label="sticky table"
                    >
                      <TableHead>
                        <TableRow>
                          {columns.map((column, i) => (
                            <TableCell
                              key={i}
                              align={column.align}
                              style={{
                                minWidth: column.minWidth,
                                backgroundColor: 'rgb(221, 221, 221)',
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
                        {cashCollectionData.length
                          ? cashCollectionData
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
                    count={cashCollectionlists.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Rows"
                    className="product_pagination px-2"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>

                <div className="col-md-12 col-lg-2 modal_showBox2">
                  <div className="productBtns">
                    <Button
                      className="simpleBtn newbtn"
                      onClick={() => setAddCashCollectionModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn"
                      onClick={() => {
                        isSelect
                          ? setEditCashCollectionModal(true)
                          : swal("Select any row to edit!");
                      }}
                    >
                      Edit
                    </Button>
                 
                    <Button
                      className="simpleBtn"
                      onClick={() => setPrintCashCollectionModal(true)}
                    >
                      Print
                    </Button>

                    <Button
                      className="simpleBtn closebtn"
                      onClick={closeHandler}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <AddCashCollection
          show={addCashCollectionModal}
          onHide={() => setAddCashCollectionModal(false)}
        />
        <EditCashCollection
          show={editCashCollectionModal}
          onHide={() => setEditCashCollectionModal(false)}
          cashCollection={singleCashCollection}
          select={selectHandler}
        />
        <PrintCashCollection
          handlePrint={handlePrint}
          ref={componentRef}
          show={printCashCollectionModal}
          onHide={() => setPrintCashCollectionModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default CashCollection;
