import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { Fragment, useEffect, useState } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { getBankLists } from "../../../../redux/actions/bankActions";

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

const BankSearch = (props) => {
  //State Management for Search btn
  const [showBankSearchModal, setShowBankSearchModal] = useState(false);
  const [searchBankText, setSearchBankText] = useState("");

  const handleClear = () => {
    setSearchBankText("");
  };
  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  // Fetch Bank data from api
  const { banks } = useSelector((state) => state.banks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBankLists(headers));
    // eslint-disable-next-line
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
    .map((bank) => {
      if (bank) {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={bank.id}
            onDoubleClick={() =>
              handleDbClick(
                bank.id,
                bank.code,
                bank.bank_name,
                bank.branch_name
              )
            }
          >
            {columns.map((column, index) => {
              const value = bank[column.id];
              return (
                <TableCell
                  style={{ fontSize: "17px", fontFamily: "Times New Roman" }}
                  key={index}
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

  //Main Form state management
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    accountName: "",
    accountNo: "",
    bankName: "",
  });

  // When user double one row is selected and put the value in the form

  const handleDbClick = (id, code, bankName, branch_name) => {
    const newObject = formData;
    newObject.code = code;
    newObject.bankName = bankName;
    props.bankId(id,bankName, branch_name);
    setFormData(newObject);
    setShowBankSearchModal(false);
  };

  return (
    <Fragment>
      <div className="col-xs-3 col-sm-5 col-md-5 col-lg-4 input-group input-group-sm codeBox">
        <input
          type="text"
          placeholder="Code"
          defaultValue={formData.code}
          className="form-control productInput input-group input-group-sm"
          readOnly
        />
      </div>
      <div
        className="col-xs-3 col-sm-1 col-md-1 col-lg-2 text-center SearchIconField"
        style={{ cursor: "pointer" }}
        onClick={() => setShowBankSearchModal(true)}
      >
        <span className="searchIcon">
          <i className="fa fa-search"></i>
        </span>
      </div>
      <div className="col-xs-3 col-sm-5 col-md-6 col-lg-4 input-group input-group-sm nameBox">
        <input
          className="form-control productInput"
          type="text"
          placeholder="Name"
          defaultValue={formData.bankName}
          readOnly
        />
      </div>

      {/* Search supplier modal */}

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard="false"
        show={showBankSearchModal}
        dialogAs={DraggableModal}
        // dialogClassName="add-supplier-modal"
      >
        <Modal.Header
          style={{ cursor: "move" }}
          className="background_and_table_header"
        >
          <div>
            <h2 className="modalHeadTitle"> All Banks </h2>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={() => setShowBankSearchModal(false)}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content p-4">
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
                          onChange={(e) => setSearchBankText(e.target.value)}
                          type="text"
                          value={searchBankText}
                          placeholder="Search customer......"
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
                        <TableRow style={{ background: "red" }}>
                          {columns.map((column, i) => (
                            <TableCell
                              key={i}
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
                      <TableBody>{bankData}</TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100, 500, 1000]}
                    component="div"
                    count={bankDatas.length}
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
};

export default BankSearch;
