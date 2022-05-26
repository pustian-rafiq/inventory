import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog, Nav } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { getShareInvestmentHeadLists } from "../../../redux/actions/shareInvestmentHead";
import AddInvestmentHead from "./AddInvestmentHead";
import EditInvestmentHead from "./EditInvestmentHead";
import "./investment.css";
import "../../../assets/css/custom.css";
import { useReactToPrint } from "react-to-print";
import PrintInvestmentHead from "./PrintInvestmentHead";

// Set fixed asset table header name using material-ui
const columns = [
  { id: "code", label: "Code", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 30 },
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

const InvestmentHead = ({ show, onHide }) => {
  const [addInvestmentHeadModal, setAddInvestmentHeadModal] = useState(false);
  const [editInvestmentHeadModal, setEditInvestmentHeadModal] = useState(false);

  const [printinvestmentheadModal, setPrintinvestmentheadModal] =
    useState(false);

  const [searchFixedAssetText, setSearchFixedAssetText] = useState("");
  const [searchCurrentAssetText, setSearchCurrentAssetText] = useState("");
  const [searchLiabilityText, setSearchLiabilityText] = useState("");

  const [fixedAssetShow, setFixedAssetShow] = React.useState(true);
  const [currentAssetShow, setCurrentAssetShow] = React.useState(false);
  const [liabilityShow, setLiabilityShow] = React.useState(false);
  //const [stockComponentShow, setStockComponentShow] = React.useState(false);
  const [selectId, setSelectId] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [isActive, setIsActive] = useState(null);

  const handleClear = () => {
    setSearchFixedAssetText("");
    setSearchCurrentAssetText("");
    setSearchLiabilityText("");
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const shareInvestHeadLists = useSelector(
    (state) => state.shareInvestmentHead
  );

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShareInvestmentHeadLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  // active fixedAsset handler
  const fixedAssetActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }
  };
  //Show fixed asset data and searches real time
  const searchDatas = shareInvestHeadLists.filter((search) => {
    return (
      search.code.toLowerCase().includes(searchFixedAssetText.toLowerCase()) ||
      search.name.toLowerCase().includes(searchFixedAssetText.toLowerCase())
    );
  });
  const fixedAssetData = searchDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((shareinvestment, index) => {
      if (shareinvestment) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={shareinvestment.id}
            style={
              isActive === index
                ? { background: "rgba(180, 216, 255, 1)" }
                : { background: "" }
            }
            onClick={() => fixedAssetActive(index, shareinvestment.id)}
          >
            {columns.map((column, i) => {
              // console.log(column.id)
              const value = shareinvestment[column.id];
              return (
                <TableCell key={i} className="tableRowData">
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

  //Show current asset data and searches real time

  const currentDatas = shareInvestHeadLists.filter((search) => {
    return (
      search.code
        .toLowerCase()
        .includes(searchCurrentAssetText.toLowerCase()) ||
      search.name.toLowerCase().includes(searchCurrentAssetText.toLowerCase())
    );
  });
  const currentAssetData = currentDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((expense) => {
      if (expense) {
        return (
          <TableRow hover tabIndex={-1} key={expense.id}>
            {columns.map((column, i) => {
              // console.log(column.id)
              const value = expense[column.id];
              return (
                <TableCell key={i} className="tableRowData">
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

  //Show liability data and searches real time

  const liabilityDatas = shareInvestHeadLists.filter((search) => {
    return (
      search.code
        .toLowerCase()
        .includes(searchCurrentAssetText.toLowerCase()) ||
      search.name.toLowerCase().includes(searchCurrentAssetText.toLowerCase())
    );
  });
  const liabilityData = liabilityDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((expense) => {
      if (expense) {
        return (
          <TableRow hover tabIndex={-1} key={expense.id}>
            {columns.map((column, i) => {
              // console.log(column.id)
              const value = expense[column.id];
              return (
                <TableCell key={i} className="tableRowData">
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : value === true
                    ? "Income"
                    : value === false
                    ? "Expense"
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
        // dialogClassName="fixed-asset-modal"
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h4 className="responsive-head"> Investment Head</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        {fixedAssetShow ? (
          <Modal.Body className="background_and_table_header">
            <div className="custom_modal_inner_content p-2">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    onClick={() => {
                      setFixedAssetShow(true);
                      setCurrentAssetShow(false);
                      setLiabilityShow(false);
                    }}
                  >
                    Fixed Asset
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(true);
                      setLiabilityShow(false);
                    }}
                  >
                    Current Asset
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(false);
                      setLiabilityShow(true);
                    }}
                  >
                    Liability
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className="container-fluid ">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-9 modal_showBox1">
                    <form onSubmit={(e) => e.preventDefault}>
                      <div className="row searchBox">
                        <div className="searchInput ml-3 form-group">
                          <input
                            onChange={(e) =>
                              setSearchFixedAssetText(e.target.value)
                            }
                            type="text"
                            value={searchFixedAssetText}
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
                        sx={{ minWidth: 550 }}
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
                        <TableBody>{fixedAssetData}</TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100, 1000]}
                      component="div"
                      count={searchDatas.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage="Rows"
                      className="product_pagination px-2"
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>

                  {/* Perform Operation using some button */}

                  <div className="col-md-12 col-lg-2  modal_showBox2">
                    <div className="simpleBtns">
                      <Button
                        className="simpleBtn newbtn"
                        onClick={() => setAddInvestmentHeadModal(true)}
                      >
                        New
                      </Button>
                      <Button
                        className="simpleBtn editbtn"
                        onClick={() => setEditInvestmentHeadModal(true)}
                      >
                        Edit
                      </Button>
                      <Button className="simpleBtn deletebtn">Delete</Button>

                    
                      <Button
                        className="simpleBtn"
                        onClick={() => setPrintinvestmentheadModal(true)}
                      >
                        Print
                      </Button>
                      <Button className="simpleBtn closebtn" onClick={onHide}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AddInvestmentHead
              show={addInvestmentHeadModal}
              onHide={() => setAddInvestmentHeadModal(false)}
            />
            <EditInvestmentHead
              show={editInvestmentHeadModal}
              onHide={() => setEditInvestmentHeadModal(false)}
            />
            <PrintInvestmentHead
              handlePrint={handlePrint}
              ref={componentRef}
              show={printinvestmentheadModal}
              onHide={() => setPrintinvestmentheadModal(false)}
            />
          </Modal.Body>
        ) : (
          ""
        )}
        {currentAssetShow ? (
          <Modal.Body className="background_and_table_header">
            <div className="custom_modal_inner_content p-2">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    onClick={() => {
                      setFixedAssetShow(true);
                      setCurrentAssetShow(false);
                      setLiabilityShow(false);
                    }}
                  >
                    Fixed Asset
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(true);
                      setLiabilityShow(false);
                    }}
                  >
                    Current Asset
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-2"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(true);
                      setLiabilityShow(false);
                    }}
                  >
                    Liability
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className="container-fluid ">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-9 modal_showBox1">
                    <form onSubmit={(e) => e.preventDefault}>
                      <div className="row searchBox">
                        <div className="searchInput ml-3 form-group">
                          <input
                            onChange={(e) =>
                              setCurrentAssetShow(e.target.value)
                            }
                            type="text"
                            value={searchCurrentAssetText}
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
                        sx={{ minWidth: 550 }}
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
                        <TableBody>{currentAssetData}</TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100, 1000]}
                      component="div"
                      count={currentDatas.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage="Rows"
                      className="product_pagination px-2"
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>

                  {/* Perform Operation using some button */}
                  <div className="col-md-12 col-lg-2  modal_showBox2">
                    <div className="simpleBtns">
                      <Button
                        className="simpleBtn newbtn"
                        onClick={() => setAddInvestmentHeadModal(true)}
                      >
                        New
                      </Button>
                      <Button
                        className="simpleBtn editbtn"
                        onClick={() => setEditInvestmentHeadModal(true)}
                      >
                        Edit
                      </Button>
                      <Button className="simpleBtn deletebtn">Delete</Button>
                
                      <Button
                        className="simpleBtn"
                        onClick={() => setPrintinvestmentheadModal(true)}
                      >
                        Print
                      </Button>
                      <Button className="simpleBtn closebtn" onClick={onHide}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AddInvestmentHead
              show={addInvestmentHeadModal}
              onHide={() => setAddInvestmentHeadModal(false)}
            />
            <EditInvestmentHead
              show={editInvestmentHeadModal}
              onHide={() => setEditInvestmentHeadModal(false)}
            />
            <PrintInvestmentHead
              handlePrint={handlePrint}
              ref={componentRef}
              show={printinvestmentheadModal}
              onHide={() => setPrintinvestmentheadModal(false)}
            />
          </Modal.Body>
        ) : (
          ""
        )}
        {liabilityShow ? (
          <Modal.Body className="background_and_table_header">
            <div className="custom_modal_inner_content p-2">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    onClick={() => {
                      setFixedAssetShow(true);
                      setCurrentAssetShow(false);
                      setLiabilityShow(false);
                    }}
                  >
                    Fixed Asset
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(true);
                      setLiabilityShow(false);
                    }}
                  >
                    Current Asset
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-2"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(false);
                      setLiabilityShow(true);
                    }}
                  >
                    Liability
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className="container-fluid ">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-9 modal_showBox1">
                    <form onSubmit={(e) => e.preventDefault}>
                      <div className="row searchBox">
                        <div className="searchInput ml-3 form-group">
                          <input
                            onChange={(e) =>
                              setSearchLiabilityText(e.target.value)
                            }
                            type="text"
                            value={searchLiabilityText}
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
                        sx={{ minWidth: 550 }}
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
                        <TableBody>{liabilityData}</TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100, 1000]}
                      component="div"
                      count={liabilityDatas.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage="Rows"
                      className="product_pagination px-2"
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>

                  {/* Perform Operation using some button */}
                  <div className="col-md-12 col-lg-2  modal_showBox2">
                    <div className="simpleBtns">
                      <Button
                        className="simpleBtn newbtn"
                        onClick={() => setAddInvestmentHeadModal(true)}
                      >
                        New
                      </Button>
                      <Button
                        className="simpleBtn editbtn"
                        onClick={() => setEditInvestmentHeadModal(true)}
                      >
                        Edit
                      </Button>
                      <Button className="simpleBtn deletebtn">Delete</Button>
                    
                      <Button
                        className="simpleBtn"
                        onClick={() => setPrintinvestmentheadModal(true)}
                      >
                        Print
                      </Button>
                      <Button className="simpleBtn closebtn" onClick={onHide}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal>

      <AddInvestmentHead
        show={addInvestmentHeadModal}
        onHide={() => setAddInvestmentHeadModal(false)}
      />
      <EditInvestmentHead
        show={editInvestmentHeadModal}
        onHide={() => setEditInvestmentHeadModal(false)}
        select={selectHandler}
      />

      <PrintInvestmentHead
        handlePrint={handlePrint}
        ref={componentRef}
        show={printinvestmentheadModal}
        onHide={() => setPrintinvestmentheadModal(false)}
      />
    </Fragment>
  );
};

export default InvestmentHead;

//********************************************************* */

//  step : three navigation er jonno 3 ta api lagbe may be but i use print in one
//  i) fixed asserts (ok -> api)
//  ii) current asserts (Not Ok ->api)
//  iii)liabilities(Not Ok ->api)
//********************************************************* */
