import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  deleteCompany,
  getCompanyLists,
} from "../../../redux/actions/companyActions";
import AddCompany from "./AddCompany";
import "./company.css";
import EditCompany from "./EditCompany";
import CompanyTable from "./CompanyTable";
import { useReactToPrint } from "react-to-print";
import PrintTable from "./PrintTable";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const CompanyLists = ({ show, onHide }) => {
  const [addCompanyModal, setAddCompanyModal] = useState(false);
  const [editCompanyModal, setEditCompanyModal] = useState(false);
  const [printCompanyModal, setPrintCompanyModal] = useState(false);
  const [searchCompanyText, setSearchCompanyText] = useState("");

  const [selectId, setSelectId] = useState();
  const [isSelect, setIsSelect] = useState(false);

  const [isActive, setIsActive] = useState(null);
  const [singleCompany, setSingleCompany] = useState(null);

  const { user: currentUser } = useSelector((state) => state.auth);
  const { companyLists } = useSelector((state) => state.companies);

  const dispatch = useDispatch();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //Pass headers for authorized user access
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  useEffect(() => {
    dispatch(getCompanyLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          dispatch(deleteCompany(selectId, headers));
          toast.warn("Company is deleting...");
          setIsSelect(false);
        } else {
          swal("Your data is safe!");
        }
      });
    } else {
      swal("Please select a row!");
    }
  };

  const handleClear = () => {
    setSearchCompanyText("");
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
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header"> 
          <div>
            <h4
             className="responsive-head py-2" 
             style={{
                 textShadow: "2px 3px 4px grey",
               }}           
            > All Company</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={closeHandler}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        <Modal.Body className="background_and_table_header" > 
          <div className="custom_modal_inner_content">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-9 modal_showBox1">
                  <form onSubmit={(e) => e.preventDefault}>
                    <div className="row searchBox">
                      <div className="searchInput ml-3 form-group">
                        <input
                          onChange={(e) => setSearchCompanyText(e.target.value)}
                          type="text"
                          value={searchCompanyText}
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
                  <CompanyTable
                    companyLists={companyLists}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    setIsSelect={setIsSelect}
                    isSelect={isSelect}
                    setSelectId={setSelectId}
                    setSingleCompany={setSingleCompany}
                    searchCompanyText={searchCompanyText}
                    setSearchCompanyText={setSearchCompanyText}
                    //  handlePrint={handlePrint}
                  />
                </div>

                <div className="col-md-12 col-lg-2 modal_showBox2">
                  <div>
                    <Button
                      className="simpleBtn newbtn"
                      onClick={() => setAddCompanyModal(true)}
                    >
                      New
                    </Button>
                    <Button
                      className="simpleBtn editbtn"
                      onClick={() =>
                        isSelect
                          ? setEditCompanyModal(true)
                          : swal("Select any company to edit!")
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
                      className="simpleBtn printbtn"
                      onClick={() => setPrintCompanyModal(true)}
                      // onClick={handleprintmodel}
                    >
                      Print
                    </Button>
                    <Button
                      className="simpleBtn closebtn"
                      onClick={closeHandler}
                    >
                      Close
                    </Button>

                    <strong className="mt-5 pt-3 d-block text-center">
                      Total Company : {companyLists.length}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        {/* Add component for show modal  */}
        <AddCompany
          show={addCompanyModal}
          onHide={() => setAddCompanyModal(false)}
        />
        <EditCompany
          show={editCompanyModal}
          onHide={() => setEditCompanyModal(false)}
          company={singleCompany}
          select={selectHandler}
        />

        <PrintTable
          handlePrint={handlePrint}
          ref={componentRef}
          show={printCompanyModal}
          onHide={() => setPrintCompanyModal(false)}
          companttable={
            <CompanyTable
              companyLists={companyLists}
              isActive={isActive}
              setIsActive={setIsActive}
              setIsSelect={setIsSelect}
              isSelect={isSelect}
              setSelectId={setSelectId}
              setSingleCompany={setSingleCompany}
              searchCompanyText={searchCompanyText}
              setSearchCompanyText={setSearchCompanyText}
            />
          }
        />
      </Modal>
    </Fragment>
  );
};

export default CompanyLists;
