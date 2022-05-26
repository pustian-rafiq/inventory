import React from "react";
import { Button, Modal } from "react-bootstrap";

function AddInvestmentHead({ show, onHide }) {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
      show={show}
      // dialogAs={DraggableModal}
      // dialogClassName="purchase-retun-modal"
    >
      <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">
        <div style={{ float: "left" }}>
          <h2 className="responsive-head">Add Investment Head</h2>
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
            <div className="custom_modal_inner_content p-2">
            {/* Company Add Form Start Here */}
            <form className="form-horizontal mt-1">
              <div className="container productBox">
                <div className="row ">
                  <div className="col-md-12">
                    <div className="row  mb-2">
                      <div className="col-md-4 col-lg-3">
                        <span className="spanTitle" for="code">
                          Code
                        </span>
                      </div>
                      <div className="col-md-8 col-lg-9">
                        <input
                          type="text"
                          placeholder="Enter Code"
                          className="form-control "
                          id="code"
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-4 col-lg-3">
                        <span className="spanTitle" for="code">
                          Invest Name
                        </span>
                      </div>
                      <div className="col-md-8 col-lg-9 ">
                        <input
                          type="text"
                          placeholder="Enter name"
                          className="form-control "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btnContainer companyBox">
                <div className="row">
                  <div className="col-md-12 pull-right responsive-btn">
                    <Button className="saveCloseBtn border border-none closebtn" onClick={onHide}>
                      Close
                    </Button>
                    <Button type="submit" className="saveCloseBtn border border-none">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddInvestmentHead;
