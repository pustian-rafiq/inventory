import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { deleteBank, getBankLists } from "../../../redux/actions/bankActions";
import AddBank from "./AddBank";
import EditBank from "./EditBank";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./bank.css";
import BankprintTable from "./BankprintTable";
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
  { id: "code", label: "Code", minWidth: 30 },
  { id: "account_name", label: "Account Name", minWidth: 30 },
  { id: "account_no", label: "Account No", minWidth: 30 },
  { id: "bank_name", label: "Bank Name", minWidth: 30 },
];

const BankList = ({ show, onHide }) => {
  const [selectId, setSelectId] = useState();
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [addBankModal, setAddBankModal] = useState(false);
  const [editBankModal, setEditBankModal] = useState(false);
  const [printBankModal, setPrintBankModal] = useState(false);

  const [searchBankText, setSearchBankText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [singleBank, setSingleBank] = useState(null);

  const { banks } = useSelector((state) => state.banks);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // select item for update or delete
  const bankActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }
    const bnk = banks.find((b) => b.id === id);
    setSingleBank(bnk);
  };
  const handleClear = () => {
    setSearchBankText("");
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  useEffect(() => {
    dispatch(getBankLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (newPage) => {
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

  //Show bank data and searches real time
  const bankDatas = banks.filter((search) => {
    return (
      search.account_name
        .toLowerCase()
        .includes(searchBankText.toLowerCase()) ||
      search.account_no.toLowerCase().includes(searchBankText.toLowerCase()) ||
      search.bank_name.toLowerCase().includes(searchBankText.toLowerCase())
    );
  });
  // Show bank data
  const bankData = bankDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((bank, index) => {
      if (bank) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={index}
            style={
              isActive === index
                ? {  background: "rgba(180, 216, 255, 1)" }
                : { background: "" }
            }
            onClick={() => bankActive(index, bank.id)}
          >
            {columns.map((column, i) => {
              const value = bank[column.id];
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

  // used for print functionalities

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Show Confirm Message for deleting
  const confirmDelete = () => {
    if (isSelect) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteBank(selectId, headers));
          toast.warn("Bank is deleting...");
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
        <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
          <div>
            <h4 className="responsive-head text-center"> Banks</h4>
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
                          onChange={(e) => setSearchBankText(e.target.value)}
                          type="text"
                          value={searchBankText}
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
                      sx={{ minWidth: 430 }}
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
                                fontFamily: "Times New Roman",
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bankData.length
                          ? bankData
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
                    rowsPerPageOptions={[10, 25, 100,200,500]}
                    component="div"
                    count={bankDatas.length}
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
                      onClick={() => setAddBankModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn"
                      onClick={() =>
                        isSelect
                          ? setEditBankModal(true)
                          : swal("Select any bank to edit!")
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
                      onClick={() => setPrintBankModal(true)}
                    >
                      Print
                    </Button>
                  </div>
                  <Button
                      className="simpleBtn closebtn"
                      onClick={closeHandler}
                    >
                      Close
                    </Button>

                  <strong className="mt-5 pt-3 d-block">
                    Total_Banks:{banks.length}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <AddBank show={addBankModal} onHide={() => setAddBankModal(false)} />
        <EditBank
          show={editBankModal}
          onHide={() => setEditBankModal(false)}
          bank={singleBank}
          select={selectHandler}
        />
        <BankprintTable
          handlePrint={handlePrint}
          ref={componentRef}
          show={printBankModal}
          onHide={() => setPrintBankModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default BankList;
