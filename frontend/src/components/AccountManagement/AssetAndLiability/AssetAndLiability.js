//import Paper from "@mui/material/Paper";
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
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { getShareInvestmentLists } from "../../../redux/actions/shareInvestmentHead";
import AddInvestmentHead from "./AddAssetLiability";
import AssetAndLiabilityPrint from "./AssetAndLiabilityPrint";
import EditInvestmentHead from "./EditAssetLiability";


// Set fixed asset table header name using material-ui
const columns = [
  { id: "entry_date", label: "Invest Date", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 30 },
  { id: "SIHID", label: "Investment Head", minWidth: 30 },
  { id: "purpose", label: "Purpose", minWidth: 30 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
];
// Set fixed asset table header name using material-ui
const currentAssetColumns = [
  { id: "entry_date", label: "Entry Date", minWidth: 30 },
  { id: "name", label: "Purpose", minWidth: 30 },
  { id: "SIHID", label: "Invest Head", minWidth: 30 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  }
];
// Set fixed asset table header name using material-ui
const liabilityReceiveColumns = [
  { id: "entry_date", label: "Entry Date", minWidth: 30 },
  { id: "name", label: "Purpose", minWidth: 30 },
  { id: "SIHID", label: "Invest Head", minWidth: 30 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  }
];
// Set fixed asset table header name using material-ui
const liabilityPayColumns = [
  { id: "entry_date", label: "Entry Date", minWidth: 30 },
  { id: "name", label: "Purpose", minWidth: 30 },
  { id: "SIHID", label: "Invest Head", minWidth: 30 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  }
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

function AssetAndLiability({ show, onHide, AssetAndLiabilityData }) {
  const [addInvestmentHeadModal, setAddInvestmentHeadModal] = useState(false);
  const [editInvestmentHeadModal, setEditInvestmentHeadModal] = useState(false);
  const [printInvestmentHeadModal, setPrintInvestmentHeadModal] = useState(false);
  const [searchFixedAssetText, setSearchFixedAssetText] = useState("");
  const [searchCurrentAssetText, setSearchCurrentAssetText] = useState("");

  const [fixedAssetShow, setFixedAssetShow] = React.useState(true);
  const [currentAssetShow, setCurrentAssetShow] = React.useState(false);
  const [liabilityReceiveShow, setLiabilityReceiveShow] = React.useState(false);
  const [liabilityPayShow, setLiabilityPayShow] = React.useState(false);
  //const [stockComponentShow, setStockComponentShow] = React.useState(false);

  const handleClear = () => {
    setSearchFixedAssetText("");
    setSearchCurrentAssetText("");
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const shareInvestLists = useSelector((state) => state.shareInvestment);


  const dispatch = useDispatch();

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser.access}`,
    };
    dispatch(getShareInvestmentLists(headers));
  }, [currentUser.access, dispatch]);



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

  //Show fixed asset data and searches real time
  const searchDatas = shareInvestLists.filter((search) => {
    return (
      search.entry_date
        .toLowerCase()
        .includes(searchFixedAssetText.toLowerCase()) ||
      search.purpose.toLowerCase().includes(searchFixedAssetText.toLowerCase())
    );
  });
  const fixedAssetData = searchDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((shareinvestment) => {
      if (shareinvestment) {
        return (
          <TableRow hover tabIndex={-1} key={shareinvestment.id}>
            {columns.map((column,i) => {
              // console.log(column.id)
              const value = shareinvestment[column.id];
              return (
                <TableCell className="tableRowData" key={i}>
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
  const currentAssetData = shareInvestLists.filter((search) => {
    return (
      search.investHead
        .toLowerCase()
        .includes(searchFixedAssetText.toLowerCase()) ||
      search.purpose.toLowerCase().includes(searchFixedAssetText.toLowerCase())
    );
  });
  const currentAssetList = currentAssetData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((shareinvestment) => {
      if (shareinvestment) {
        var date = shareinvestment.entryDate;
        var dateFormat = moment(date).format("DoMMMYY");
        return (
          <TableRow hover tabIndex={-1} key={shareinvestment.id}>
            {columns.map((column,i) => {
              // console.log(column.id)
              const value = shareinvestment[column.id];
              return (
                <TableCell className="tableRowData" key={i}>
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : column.id === "entryDate"
                    ? dateFormat
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

      //Show liability receive data and searches real time
  const liabilityReceiveData = shareInvestLists.filter((search) => {
    return (
      search.investHead
        .toLowerCase()
        .includes(searchFixedAssetText.toLowerCase()) ||
      search.purpose.toLowerCase().includes(searchFixedAssetText.toLowerCase())
    );
  });
  const liabilityReceiveList = liabilityReceiveData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((shareinvestment) => {
      if (shareinvestment) {
        var date = shareinvestment.entryDate;
        var dateFormat = moment(date).format("DoMMMYY");
        return (
          <TableRow hover tabIndex={-1} key={shareinvestment.id}>
            {columns.map((column,i) => {
              // console.log(column.id)
              const value = shareinvestment[column.id];
              return (
                <TableCell className="tableRowData" key={i}>
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : column.id === "entryDate"
                    ? dateFormat
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

  //Show liability pay data and searches real time
  const liabilityPayData = shareInvestLists.filter((search) => {
    return (
      search.investHead
        .toLowerCase()
        .includes(searchFixedAssetText.toLowerCase()) ||
      search.purpose.toLowerCase().includes(searchFixedAssetText.toLowerCase())
    );
  });
  const liabilityPayList = liabilityPayData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((shareinvestment) => {
      if (shareinvestment) {
        var date = shareinvestment.entryDate;
        var dateFormat = moment(date).format("DoMMMYY");
        return (
          <TableRow hover tabIndex={-1} key={shareinvestment.id}>
            {columns.map((column,i) => {
              // console.log(column.id)
              const value = shareinvestment[column.id];
              return (
                <TableCell className="tableRowData" key={i}>
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : column.id === "entryDate"
                    ? dateFormat
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

  // Stock

  // const stockDatas = AssetAndLiabilityData.filter((search) => {
  //   return (
  //     search.investHead
  //       .toLowerCase()
  //       .includes(searchCurrentAssetText.toLowerCase()) ||
  //     search.purpose
  //       .toLowerCase()
  //       .includes(searchCurrentAssetText.toLowerCase())
  //   );
  // });



  // var count2 = 0;
  // const stockData = stockDatas.map((data, index) => {
  //   ++count2;
  //   if (data) {
  //     return (
  //       <tr style={{ height: "5px", fontSize: "12px" }} key={index}>
  //         <td>{data.entryDate}</td>
  //         <td>{data.investHead}</td>
  //         <td>{data.purpose}</td>
  //         <td>{data.amount}</td>
  //       </tr>
  //     );
  //   } else {
  //     return <p style={{ background: "red" }}>No data found</p>;
  //   }
  // });

  return (
    <Fragment>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-center"
        centered
        backdrop="static"
        keyboard="false"
        show={show}
        dialogAs={DraggableModal}
        // dialogClassName="purchase-retun-modal"
      >
        <Modal.Header style={{cursor: "move"}} className="background_and_table_header" >
          <div> 
            <h2 className="responsive-head">Asset And Liability </h2>
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
         
               
          {/* er poretee ki ase     */}
          {fixedAssetShow ? (
            <div className="custom_modal_inner_content">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    onClick={() => {
                      setFixedAssetShow(true);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Fixed Assets
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(true);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Current Assets
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(true);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Liabilities Receive
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-3"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(true);
                    }}
                  >
                    Liabilities Pay
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className="container-fluid ">
                <div className="row justify-content-center">
                  <div className="col-md-9 modal_showBox1">
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
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: 'rgb(221, 221, 221)',
                                  color: "#000",
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

                  <div className="col-md-2 modal_showBox2">
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
                     
                      <Button className="simpleBtn"
                        onClick={() => setPrintInvestmentHeadModal(true)}
                      >Print</Button>

                       <Button className="simpleBtn closebtn" onClick={onHide}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/*********************** Current Assets************************** */}
          {currentAssetShow ? (
            <div className="custom_modal_inner_content">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    onClick={() => {
                      setFixedAssetShow(true);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Fixed Assets
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(true);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Current Assets
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-2"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(true);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Liabilities Receive
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-3"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(true);
                    }}
                  >
                    Liabilities Pay
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className="container-fluid ">
                <div className="row justify-content-center">
                  <div className="col-md-9 modal_showBox1">
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
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: 'rgb(221, 221, 221)',
                                  color: "#000",
                                  fontFamily: "Times New Roman",
                                }}
                               
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>{currentAssetList}</TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100, 1000]}
                      component="div"
                      count={currentAssetData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage="Rows"
                      className="product_pagination px-2"
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>

                  {/* Perform Operation using some button */}
                  <div className="col-md-2 modal_showBox2">
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
                    
                      <Button className="simpleBtn"
                        onClick={() => setPrintInvestmentHeadModal(true)}
                      >Print</Button>
                      
                      <Button className="simpleBtn closebtn" onClick={onHide}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/*********************** Liabilities Receive************************** */}

          {liabilityReceiveShow ? (
            //    <StockComponent orderShow={purchaseOrderShow} StockList={stockData}/>
            <div className="custom_modal_inner_content">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    onClick={() => {
                      setFixedAssetShow(true);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Fixed Assets
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(true);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Current Assets
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-2"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(true);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Liabilities Receive
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-3"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(true);
                    }}
                  >
                    Liabilities Pay
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className="container-fluid ">
                <div className="row justify-content-center">
                  <div className="col-md-9 modal_showBox1">
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
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: 'rgb(221, 221, 221)',
                                  color: "#000",
                                  fontFamily: "Times New Roman",
                                }}
                              
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>{liabilityReceiveList}</TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100, 1000]}
                      component="div"
                      count={liabilityReceiveData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage="Rows"
                      className="product_pagination px-2"
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>

                  {/* Perform Operation using some button */}
                  <div className="col-md-2 modal_showBox2">
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
         
                      <Button className="simpleBtn"
                        onClick={() => setPrintInvestmentHeadModal(true)}
                      >Print</Button>
                     <Button className="simpleBtn closebtn" onClick={onHide}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/*********************** Liabilities Pay************************** */}
          {liabilityPayShow ? (
            //    <StockComponent orderShow={purchaseOrderShow} StockList={stockData}/>
            <div className="custom_modal_inner_content">
              <Nav variant="tabs" defaultActiveKey="#">
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    onClick={() => {
                      setFixedAssetShow(true);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Fixed Assets
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(true);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Current Assets
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-2"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(true);
                      setLiabilityPayShow(false);
                    }}
                  >
                    Liabilities Receive
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-3"
                    onClick={() => {
                      setFixedAssetShow(false);
                      setCurrentAssetShow(false);
                      setLiabilityReceiveShow(false);
                      setLiabilityPayShow(true);
                    }}
                  >
                    Liabilities Pay
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className="container-fluid ">
                <div className="row justify-content-center">
                  <div className="col-md-9 modal_showBox1">
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
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: 'rgb(221, 221, 221)',
                                  color: "#000",
                                  fontFamily: "Times New Roman",
                                }}
                                
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>{liabilityPayList}</TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100, 1000]}
                      component="div"
                      count={liabilityPayData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage="Rows"
                      className="product_pagination px-2"
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>
                  {/* Perform Operation using some button */}
                  <div className="col-md-2 modal_showBox2">
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
                     
                      <Button className="simpleBtn "
                        onClick={() => setPrintInvestmentHeadModal(true)}
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
          ) : (
            ""
          )}

        </Modal.Body>

        <AddInvestmentHead
          show={addInvestmentHeadModal}
          onHide={() => setAddInvestmentHeadModal(false)}
        />
        <EditInvestmentHead
          show={editInvestmentHeadModal}
          onHide={() => setEditInvestmentHeadModal(false)}
        />
        <AssetAndLiabilityPrint
          AssetAndLiabilityData={AssetAndLiabilityData}
          handlePrint={handlePrint}
          ref={componentRef}
          show={printInvestmentHeadModal}
          onHide={() => setPrintInvestmentHeadModal(false)}

        />


      </Modal>




    </Fragment>
  );
}

export default AssetAndLiability;
