import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBankLists } from "../../../redux/actions/bankActions";
import {
  addCardTypeSetUpData,
  getCardTypeLists,
} from "../../../redux/actions/cardtypesetupActions";

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
    bankID: "",
    bank: "",
    card_typeID: "",
    card_type: "",
    percentage: "",
  };
  const [cardTypeData, setCardTypeData] = useState(initialState);
  const [error, setError] = useState("");
  // Check validation
  function validate() {
    let codeError = "";
    let bankError = "";
    let cardError = "";
    let percentageError = "";

    if (!cardTypeData.code) {
      codeError = "Code field is required";
    }

    if (!cardTypeData.bankID) {
      bankError = "Bank field is required";
    }
    if (!cardTypeData.card_typeID) {
      cardError = "Card field is required";
    }
    if (!cardTypeData.percentage) {
      percentageError = "Percentage field is required";
    }

    if (codeError || bankError || cardError || percentageError) {
      setCardTypeData({ codeError, bankError, cardError, percentageError });
      return false;
    }

    return true;
  }

  const dispatch = useDispatch();
  // Fetch card type setup data from api
  const { cardtypeSetupLists } = useSelector((state) => state.cardtypesetup);

  // Change handler for card type setup input data
  const changeHandler = (e) => {
    const formName = e.target.name;
    const formValue = e.target.value;

    if (formName === "bankID") {
      const bankName = banks.find((bank) => bank.id == formValue);
      cardTypeData.bank = bankName.bank_name;
    } else if (formName === "card_typeID") {
      const cardName = cardtypes.find((card) => card.id == formValue);
      cardTypeData.card_type = cardName.description;
    }

    setCardTypeData({ ...cardTypeData, [formName]: formValue });

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
        setError("");
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
      dispatch(addCardTypeSetUpData(cardTypeData, headers, onHide));
      toast.success("Card type is adding");
      onHide();
    }
  };

  // Fetch Bank data from api
  const { banks } = useSelector((state) => state.banks);
  const cardtypes = useSelector((state) => state.cardtypes);
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
  const cardTypeList = cardtypes.map((data) => {
    return (
      <option key={data.id} value={data.id}>
        {data.description}
      </option>
    );
  });

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
            <h4 className="responsive-head">Card Type Setup</h4>
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
                    <div className="col-md-12 col-lg-5">
                      <span className="spanTitle" for="code">
                        Code
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-7">
                      <input
                        type="text"
                        placeholder="Enter Code"
                        className="form-control"
                        id="code"
                        name="code"
                        onChange={changeHandler}
                        value={cardTypeData.code}
                      />
                      <span className="text-danger ">
                        {error ? error.code : ""}
                      </span>
                    </div>
                  </div>

                  {/* Fetch card type list from card type api and show as dropdown */}
                  <div className="row  mb-2">
                    <div className="col-md-12 col-lg-5">
                      <span className="spanTitle" for="code">
                        Card Type
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-7">
                      <select
                        onChange={changeHandler}
                        className="form-control "
                        name="card_typeID"
                      >
                        <option>Select Card Type</option>
                        {cardTypeList}
                      </select>
                      <span className="text-danger">
                        {cardTypeData.cardError}
                      </span>
                    </div>
                  </div>

                  {/* Fetch bank list from bank api and show as dropdown */}
                  <div className="row  mb-2">
                    <div className="col-md-12 col-lg-5">
                      <span className="spanTitle" for="code">
                        Bank Name
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-7">
                      <select
                        onChange={changeHandler}
                        className="form-control "
                        name="bankID"
                      >
                        <option>Select Bank</option>
                        {bankNameList}
                      </select>
                      <span className="text-danger">
                        {cardTypeData.bankError}
                      </span>
                    </div>
                  </div>

                  <div className="row  mb-2">
                    <div className="col-md-12 col-lg-5">
                      <span className="spanTitle" for="code">
                        Percentage(%)
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-7">
                      <input
                        type="number"
                        className="form-control"
                        name="percentage"
                        onChange={changeHandler}
                        value={cardTypeData.percentage}
                      />
                      <span className="text-danger">
                        {cardTypeData.percentageError}
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
    </Modal>
  );
};

export default AddCardType;
