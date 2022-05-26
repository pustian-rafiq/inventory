import React from "react";
import { Button, Modal } from "react-bootstrap";

function EditInvestmentHead({ show, onHide,select }) {
  // This handler hide this modal and send select state to the parent component
  const closeHandler = () => {
    onHide();
    select()
  }
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
      <Modal.Header style={{cursor: "move" }} className="background_and_table_header">
        <div style={{ float: "left" }}>
          <h2 className="responsive-head">Edit Investment_Head</h2>
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
            <div className="custom_modal_inner_content p-2">
          <div>
            {/* Company Add Form Start Here */}
            <form className="form-horizontal">
              <div className="container productBox">
                <div className="row">
                  <div className="col-md-10 offset-md-1 ">
                    <div className="row  mb-2">
                      <div className="col-md-3 col-lg-3">
                        <span className="spanTitle" for="code">
                          Code
                        </span>
                      </div>
                      <div className="col-md-9 col-lg-9">
                        <input
                          type="text"
                          placeholder="Enter Code"
                          className="form-control "
                          id="code"
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-3 col-lg-3">
                        <span className="spanTitle" for="code">
                          Invest_Name
                        </span>
                      </div>
                      <div className="col-md-9 col-lg-9 ">
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
                    <Button className="saveCloseBtn border border-none closebtn" onClick={closeHandler}>
                      Close
                    </Button>
                    <Button type="submit" className="saveCloseBtn updatebtn border border-none">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </form>
            {/* Company Add Form End Here */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditInvestmentHead;
