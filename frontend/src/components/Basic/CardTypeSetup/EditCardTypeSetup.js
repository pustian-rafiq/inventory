/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBankLists } from "../../../redux/actions/bankActions";
import {
  updateCartTypeSetup,
  getCardTypeLists,
} from "../../../redux/actions/cardtypesetupActions";

import { useForm } from "react-hook-form";

const EditCardType = ({ show, onHide, cardType, select}) => {
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCardType, setSelectedCardType] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const { user: currentUser } = useSelector((state) => state.auth);

  const { banks } = useSelector((state) => state.banks);
  const {card_types} = useSelector((state) => state.cardtypes);

  const dispatch = useDispatch();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // bank handler
  const bankHandler = (e) => {
    let id = e.target.value;
    const bank = banks.find((bank) => bank.id == id);
    setSelectedBank(bank.bank_name);
  };

  const cardTypeHandler = (e) => {
    let id = e.target.value;
    const cardType = card_types.find((ct) => ct.id == id);
    setSelectedCardType(cardType.description);
  };

  // card update handler
  const cardUpdateHandler = (data) => {
    if (selectedBank === "") {
      data.bank = cardType && cardType.bank;
    } else {
      data.bank = selectedBank;
    }

    if (selectedCardType === "") {
      data.card_type = cardType && cardType.card_type;
    } else {
      data.card_type = selectedCardType;
    }

    dispatch(
      updateCartTypeSetup(data, headers, cardType && cardType.id, onHide)
    );
    toast.success("Update Process is Going On",{
      icon: ({theme, type}) =>  <img height={'27px'} 
      alt=""
      src="https://i.ibb.co/Z8XDqgS/Reload-1-4s-51px-1.gif"/>
    });
  };

  // for reseting the modal form
  useEffect(() => {
    reset({});
  }, [cardType]);

  useEffect(() => {
    dispatch(getBankLists(headers));
    dispatch(getCardTypeLists(headers));
  }, []);
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
      show={show}
      backdrop="static"
      keyboard="false"
    >
  
        {/* modal header  */}
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">
          <div>
            <h4
             className="responsive-head"
            >
              Edit Cart Types
            </h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={closeHandler}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>

        {/* modal body  */}
        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content">
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(cardUpdateHandler)}
          >
            <div className="container companyBox py-2 my-2">
              <div className="row">
                <div className="col-md-12">
                  <div className="row  mb-2">
                    <div className="col-md-12">
                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-md-4">
                              <label
                                className="responsive-desc"
                                htmlFor="cartType_code"
                              >
                                Code
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control "
                                id="cartType_code"
                                placeholder="Ex 1452"
                                {...register("code")}
                                defaultValue={cardType && cardType.code}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-md-4">
                              <label
                                className="responsive-desc"
                                htmlFor="cartType_bankname"
                              >
                                Bank Name
                              </label>
                            </div>

                            <div className="col-sm-11 col-md-8 ">
                              <select
                                className="form-control input-sm"
                                {...register("bankID")}
                                defaultValue={cardType && cardType.bankID}
                                onChange={bankHandler}
                              >
                                <option value={cardType && cardType.bankID}>
                                  {cardType && cardType.bank}
                                </option>

                                {banks &&
                                  banks.map((bank) => (
                                    <option key={bank.id} value={bank.id}>
                                      {bank.bank_name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-md-4">
                              <label
                                className="responsive-desc"
                                htmlFor="cartType_name"
                              >
                                Cart Type
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <select
                                className="form-control input-sm"
                                {...register("card_typeID")}
                                defaultValue={cardType && cardType.card_typeID}
                                onChange={cardTypeHandler}
                              >
                                <option
                                  value={cardType && cardType.card_typeID}
                                >
                                  {cardType && cardType.card_type}
                                </option>

                                {card_types &&
                                  card_types.map((cardtype) => (
                                    <option
                                      key={cardtype.id}
                                      value={cardtype.id}
                                    >
                                      {cardtype.description}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row  mb-2">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-sm-12 col-md-4">
                              <label
                                className="responsive-desc"
                                htmlFor="cartType_percentage"
                              >
                                Percentage
                              </label>
                            </div>
                            <div className="col-sm-11 col-md-8 ">
                              <input
                                type="text"
                                className="form-control "
                                id="cartType_percentage"
                                placeholder="Ex. 5.0"
                                {...register("percentage")}
                                defaultValue={cardType && cardType.percentage}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* modal body footer  */}
            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 pull-right responsive-btn">
                  {/* close button  */}
                  <Button className="saveCloseBtn border border-0 closebtn" onClick={closeHandler}>
                    Close
                  </Button>

                  {/* update button  */}
                  <Button type="submit" className="saveCloseBtn border border-0 updatebtn">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </form>
          </div>
        </Modal.Body>
      
    </Modal>
  );
};

export default EditCardType;
