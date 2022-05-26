import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBankLists } from "../../../redux/actions/bankActions";

import {
  addCardTypeSetUpData,
  getCardTypeDetails,
  getCardTypeLists,
} from "../../../redux/actions/cardtypesetupActions";
import AddCardType from './CardType/AddCardType'
import EditCardType from "./CardType/EditCardType";
class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AddCardTypeSetup = ({ show, onHide }) => {
  const [addCardTypeModal, setAddCardTypeModal] = useState(false);
  const [editCardTypeModal, setEditCardTypeModal] = useState(false);
  const [select, setSelect] = useState(false);
  const [singleCardType, setSingleCardType] = useState(null);

  const initialState = {
    code: "",
    bankID: "",
    bank: "",
    card_typeID: "",
    card_type: "",
    percentage: "",
  };
  const [cardTypeSetup, setCardTypeSetup] = useState(initialState);
  const [error, setError] = useState("");
  // Check validation
  function validate() {
    let codeError = "";
    let bankError = "";
    let cardError = "";
    let percentageError = "";

    if (!cardTypeSetup.code) {
      codeError = "Code field is required";
    }

    if (!cardTypeSetup.bankID) {
      bankError = "Bank field is required";
    }
    if (!cardTypeSetup.card_typeID) {
      cardError = "Card field is required";
    }
    if (!cardTypeSetup.percentage) {
      percentageError = "Percentage field is required";
    }

    if (codeError || bankError || cardError || percentageError) {
      setCardTypeSetup({ codeError, bankError, cardError, percentageError });
      return false;
    }

    return true;
  }

  const dispatch = useDispatch();
  // Fetch card type setup bank and card type data from api
  const { cardtypeSetupLists } = useSelector((state) => state.cardtypesetup);
  const { banks } = useSelector((state) => state.banks);
  const { card_types } = useSelector((state) => state.cardtypes);

  // Change handler for card type setup input data
  const changeHandler = (e) => {
    const formName = e.target.name;
    const formValue = e.target.value;
    const card_type_id = e.target.value;
    if (card_type_id) {
      setSelect(true)
      console.log(card_type_id)
    }else {
      setSelect(false)
    }
    const cardType = card_types.find((card)=> card.id === parseInt(card_type_id))
    setSingleCardType(cardType)
    console.log(card_types)
    console.log(cardType)
    console.log(typeof(card_type_id))
   // Card type and bank do not show 
    if (formName === "bankID") {
      const bankName = banks.find((bank) => bank.id === formValue);
      cardTypeSetup.bank =bankName && bankName.bank_name;
    }
    if (formName === "card_typeID") {
      const cardName = card_types.find((card) => card.id == formValue);
      cardTypeSetup.card_type = cardName && cardName.description;
    }

    setCardTypeSetup({ ...cardTypeSetup, [formName]: formValue });

    //Card type setup Code validation start here
    const cardTypeSetupCode = e.target.value;
    const cardTypeCode = cardtypeSetupLists.filter((search) => {
      return search.code
        .toLowerCase()
        .includes(cardTypeSetupCode.toLowerCase());
    });
    // eslint-disable-next-line array-callback-return
    cardTypeCode.map((data) => {
      if (data.code === cardTypeSetupCode) {
        setError({ code: "This code already exist!" });
        return toast.success("Category code must be unique");
      } else {
        setError({code: ""});
      }
    });
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
    if (validate()) {
      dispatch(addCardTypeSetUpData(cardTypeSetup, headers, onHide));
      toast.success("Card type setup is adding");
      onHide();
      cardTypeSetup.card_typeID=''
      cardTypeSetup.percentage=''
      cardTypeSetup.code=''
    }
  };

  useEffect(() => {
    dispatch(getBankLists(headers));
    dispatch(getCardTypeLists(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Map bank name
  const bankNameList = banks.map((data) => {
    return (
      <option key={data.id} value={data.id}>
        {data.bank_name}
      </option>
    );
  });
  // Map card type name
  const cardTypeList = card_types.map((data,i) => {

    return (
      <option key={initialState} value={data.id}>
        {data.description}
      </option>
    );
  });
const editCardTypeHandler = ()=> {
  if(select){
    dispatch(getCardTypeDetails(cardTypeSetup.card_typeID, headers))
    setEditCardTypeModal(true)
  } 
}
  return (
    <Modal
      // size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
      dialogClassName="add-card-typesetup"

    >
      <div>
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">

          <div>
            <h4 className="responsive-head"> Add Card Type Setup</h4>
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

            <form className="form-horizontal" onSubmit={handleSubmit}>
              <div className="container">
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
                          value={cardTypeSetup.code}
                        />
                        <span className="text-danger ">
                          {error ? error.code : ""}
                        </span>
                      </div>
                    </div>

                    {/* Fetch card type list from card type api and show as dropdown */}
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-3 col-sm-12 col-12">
                        <span className="spanTitle" htmlFor="code">
                          Card Type
                        </span>
                      </div>
                      <div className="col-md-9 col-lg-7 col-sm-9 col-9">
                        <select
                          onChange={changeHandler}
                          className="form-control "
                          name="card_typeID"
                        >
                          <option value="">Select Card Type</option>
                          {cardTypeList}
                        </select>
                        <span className="text-danger">
                          {cardTypeSetup.cardError}
                        </span>
                      </div>
                      <div className="col-md-2 col-lg-2 col-sm-3 col-3">
                        <span onClick={ editCardTypeHandler} className=" fa fa-pencil   mt-0 mr-1 " style={
                          select
                            ? { display: "",cursor: 'move', background: '#F5F5F5', padding: '10px 8px' }
                            : { display: "none" }
                        }  title="Edit CardType Setup"></span>
                        <span onClick={() => setAddCardTypeModal(true)} className="fa fa-plus  mt-0" style={{ cursor: 'move', background: '#F5F5F5', padding: '10px 8px' }} title="New CardType Setup"></span>
                      </div>

                    </div>

                    {/* Fetch bank list from bank api and show as dropdown */}
                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-3">
                        <span className="spanTitle" htmlFor="code">
                          Bank Name
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-9">
                        <select
                          onChange={changeHandler}
                          className="form-control "
                          name="bankID"
                        >
                          <option>Select Bank</option>
                          {bankNameList}
                        </select>
                        <span className="text-danger">
                          {cardTypeSetup.bankError}
                        </span>
                      </div>
                    </div>

                    <div className="row  mb-2">
                      <div className="col-md-12 col-lg-3">
                        <span className="spanTitle" htmlFor="code">
                          Percentage(%)
                        </span>
                      </div>
                      <div className="col-md-12 col-lg-9">
                        <input
                          type="number"
                          className="form-control"
                          name="percentage"
                          onChange={changeHandler}
                          value={cardTypeSetup.percentage}
                        />
                        <span className="text-danger">
                          {cardTypeSetup.percentageError}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" container ">
                <div className="row border border-light p-2">
                  <div className="col-md-12 pull-right responsive-btn">
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
      <AddCardType
        show={addCardTypeModal}
        onHide={() => setAddCardTypeModal(false)}
      />
      <EditCardType
      show={editCardTypeModal}
      onHide={()=> setEditCardTypeModal(false)}
      cardType={singleCardType}
      id={cardTypeSetup.card_typeID}
      />
    </Modal>
  );
};

export default AddCardTypeSetup;
