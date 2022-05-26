import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCardTypeData } from "../../../../redux/actions/cardtypesetupActions";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AddCardType = ({ show, onHide }) => {
  const initialState = {
    code: "",
    description: "",
  };
  const [cardTypeData, setCardTypeData] = useState(initialState);
  const [error, setError] = useState("");
  // Check validation
  // function validate() {
  //   let codeError = "";
  //   let bankError = "";
  //   let cardError = "";
  //   let percentageError = "";

  //   if (!cardTypeData.code) {
  //     codeError = "Code field is required";
  //   }

  //   if (!cardTypeData.bankID) {
  //     bankError = "Bank field is required";
  //   }
  //   if (!cardTypeData.card_typeID) {
  //     cardError = "Card field is required";
  //   }
  //   if (!cardTypeData.percentage) {
  //     percentageError = "Percentage field is required";
  //   }

  //   if (codeError || bankError || cardError || percentageError) {
  //     setCardTypeData({ codeError, bankError, cardError, percentageError });
  //     return false;
  //   }

  //   return true;
  // }

  const dispatch = useDispatch();
  // Fetch card type setup data from api
  const { cardtypeSetupLists } = useSelector((state) => state.cardtypesetup);
  const { card_types } = useSelector((state) => state.cardtypes);

  // Change handler for card type setup input data
  const changeHandler = (e) => {
    const formName = e.target.name;
    const formValue = e.target.value;

    const cardTypeCode = e.target.value.toLowerCase();
    const cardTypeDescription = e.target.value.toLowerCase();
    const prevCardTypeCode = card_types.find((card) => card.code === cardTypeCode)
    const prevCardTypeDes = card_types.find((card) => card.description.toLowerCase() === cardTypeDescription)

    if (prevCardTypeCode && prevCardTypeCode.code === cardTypeCode) {
      toast.warn("This card code already exists!")
    }
    if (prevCardTypeDes && prevCardTypeDes.description.toLowerCase() === cardTypeDescription.toLowerCase()) {
      toast.warn("This card name already exists!")
    }
    setCardTypeData({ ...cardTypeData, [formName]: formValue });
  };

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  //Store cardtype setup data into database

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardTypeData.code || cardTypeData.description) {
      dispatch(addCardTypeData(cardTypeData, headers));
      toast.success("Card type is adding");
      onHide();
    } else {
      toast.warn("Please give code and description!")
    }
  };


  useEffect(() => {

  }, []);


  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}

    >
      <div>
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">
          <div>
            <h4>Add Card Type</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="background_and_table_header" >
          <div className="custom_modal_inner_content">
            {/* Company Add Form Start Here */}

            <form className="form-horizontal " onSubmit={handleSubmit}>
              <div className="container ">
                <div className="row">
                  <div className="col-md-12 border border-light py-2">
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-3">
                        <span className="spanTitle" htmlFor="code">
                          Code
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-9">
                        <input
                          type="text"
                          placeholder="Enter Code"
                          className="form-control"
                          id="code"
                          name="code"
                          onChange={changeHandler}
                          value={cardTypeData.code}
                        />
                      </div>
                    </div>
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-3">
                        <span className="spanTitle" htmlFor="code">
                          Description
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-9">
                        <input
                          type="text"
                          placeholder="Enter Description"
                          className="form-control"
                          id="code"
                          name="description"
                          onChange={changeHandler}
                          value={cardTypeData.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" container ">
                <div className="row border border-light p-2">
                  <div className="col-md-12 pull-right">
                    <Button className="saveCloseBtn border border-none closebtn" onClick={onHide}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="saveCloseBtn border border-none"
                    //onClick={onHide}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* Company Add Form End Here */}
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AddCardType;
