import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  deleteCardtypeSetup,
  getCardTypeSetupLists,
} from "../../../redux/actions/cardtypesetupActions";
import AddCardType from "./AddCardTypeSetup";
import EditCardType from "./EditCardTypeSetup";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CartTypePrint from "./CartTypePrint";
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
  { id: "bank", label: "Bank Name", minWidth: 30 },
  { id: "card_type", label: "card Type", minWidth: 30 },
  { id: "percentage", label: "Percentage(%)", minWidth: 30 },
];

const CardTypeList = ({ show, onHide }) => {
  const [addCardModal, setAddCardModal] = useState(false);
  const [editCardModal, setEditCardModal] = useState(false);
  const [printCardModal, setPrintCardModal] = useState(false);
  const [searchCardText, setSearchCardText] = useState("");
  const [selectId, setSelectId] = useState();
  const [isActive, setIsActive] = useState(null);
  const [isSelect, setIsSelect] = useState(true);
  const [singleCartType, setSingleCartType] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { cardtypeSetupLists } = useSelector((state) => state.cardtypesetup);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // select item for update or delete
  const cardTypeActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    const card = cardtypeSetupLists.find((c) => c.id === id);

    setSingleCartType(card);
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const handleClear = () => {
    setSearchCardText("");
  };

  //it is used for print functions

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    dispatch(getCardTypeSetupLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Show card type setup data and searches real time

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //Show card type setup data and searches real time
  const cardDatas = cardtypeSetupLists.filter((search) => {
    return (
      search.percentage
        .toString()
        .toLowerCase()
        .includes(searchCardText.toLowerCase()) ||
      search.code
        .toString()
        .toLowerCase()
        .includes(searchCardText.toLowerCase()) ||
      search.bank.toLowerCase().includes(searchCardText.toLowerCase()) ||
      search.card_type.toLowerCase().includes(searchCardText.toLowerCase())
    );
  });

  const cardData = cardDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((card, index) => {
      if (card) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={card.id}
            style={
              isActive === index
                ? { background: "rgba(180, 216, 255, 1)" }
                : { background: "" }
            }
            onClick={() => cardTypeActive(index, card.id)}
          >
            {columns.map((column, i) => {
              const value = card[column.id];
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
          dispatch(deleteCardtypeSetup(selectId, headers));
          toast.warn("Cardtype setup is deleting...");
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
    setIsSelect(!isSelect);
    setIsActive(null);
  };
  return (
    <Fragment>
      <Modal
        // size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={show}
        dialogAs={DraggableModal}
        dialogClassName="card-type-setup"
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head"> Card Type Setup</h4>
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
                <div className=" col-md-12 col-lg-9 col-sm-12 modal_showBox1">
                  <form
                    onSubmit={(e) => e.preventDefault}
                    style={{ paddingTop: "10px" }}
                  >
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) => setSearchCardText(e.target.value)}
                          type="text"
                          value={searchCardText}
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
                        <TableRow style={{ background: "red" }}>
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
                        {cardData.length
                          ? cardData
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
                    count={cardDatas.length}
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
                      onClick={() => setAddCardModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn"
                      onClick={() => {
                        isSelect
                          ? setEditCardModal(true)
                          : swal("Slelect any card to edit!");
                      }}
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
                      onClick={() => setPrintCardModal(true)}
                    >
                      Print
                    </Button>
                    <Button
                      className="simpleBtn closebtn"
                      onClick={closeHandler}
                    >
                      Close
                    </Button>

                    <strong className="mt-5 pt-3 d-block">
                      Total:{cardtypeSetupLists.length}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <AddCardType
          show={addCardModal}
          onHide={() => setAddCardModal(false)}
        />
        <EditCardType
          show={editCardModal}
          onHide={() => setEditCardModal(false)}
          cardType={singleCartType}
          select={selectHandler}
        />
        <CartTypePrint
          handlePrint={handlePrint}
          ref={componentRef}
          show={printCardModal}
          onHide={() => setPrintCardModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default CardTypeList;
