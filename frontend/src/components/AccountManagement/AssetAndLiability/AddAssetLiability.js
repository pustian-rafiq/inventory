import React from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { investmentHeadData } from "../../AccountManagement/InvestmentHead/investmentHeadData";
import InvestmentSearch from "./AddInvestment/InvestmentSearch";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

function AddInvestmentHead({ show, onHide }) {
  
  return (
  
    <Modal
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    backdrop="static"
    keyboard="false"
    show={show}
    dialogAs={DraggableModal}
    dialogClassName="purchase-retun-modal"
  >
    <Modal.Header style={{cursor: "move"}} className="background_and_table_header" >
          <div> 
        <h2 className="modalHeadTitle"> Add Asset Liability </h2>
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
        <div >
         
          <form className="form-horizontal">
            <div className="container productBox">
              <div className="row">
                <div className="col-md-12">
                  <div className="row  mb-2">
                    <div className="col-md-4 col-lg-4">
                      <span className="spanTitle" for="code">
                        Invest Date
                      </span>
                    </div>
                    <div className="col-md-8 col-lg-8 ">
                      <input
                        type="date"
                        placeholder="Enter Code"
                        className="form-control productInput"
                        id="code"
                      />
                    </div>
                  </div>
                  <div className="row  mb-2">
                    <InvestmentSearch InvestmentHeadData={investmentHeadData} />
                  </div>
                  <div className="row  mb-2">
                    <div className="col-md-4 col-lg-4">
                      <span className="spanTitle" for="code">
                        Description
                      </span>
                    </div>
                    <div className="col-md-8 col-lg-8 ">
                       <textarea className="form-control"></textarea>
                    </div>
                  </div>
                  <div className="row  mb-2">
                    <div className="col-md-4 col-lg-4">
                      <span className="spanTitle" for="code">
                        Investment Amt.
                      </span>
                    </div>
                    <div className="col-md-8 col-lg-8 ">
                      <input
                        type="text"
                        placeholder="Enter name"
                        className="form-control productInput"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="btnContainer companyBox">
            <div className="row">
              <div className="col-md-12 pull-right responsive-btn">
                <Button className="saveCloseBtn border border-none closebtn"  onClick={onHide}>
                  Close
                </Button>
                <Button type="submit" className="saveCloseBtn border border-none" >
                  Save
                </Button>
              </div>
            </div>
          </div> 
        </div>
       </div>
    </Modal.Body>

  </Modal>

  );
}

export default AddInvestmentHead;
