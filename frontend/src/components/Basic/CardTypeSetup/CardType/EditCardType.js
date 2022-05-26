import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCartType } from "../../../../redux/actions/cardtypesetupActions";
import { useForm } from "react-hook-form";

class DraggableModal extends React.Component {
    render() {
        return (
            <Draggable handle=".modal-header">
                <ModalDialog {...this.props} />
            </Draggable>
        );
    }
}

const EditCardType = ({ show, onHide, cardType, id }) => {

    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    // Fetch card type setup data from api
    const { card_types } = useSelector((state) => state.cardtypes);

    // Change handler for card type setup input data
    const changeHandler = (e) => {
        console.log(e.target.value)
        const formName = e.target.name;
        const formValue = e.target.value;
        const cardTypeCode = e.target.value
       // const cardTypeDescription = e.target.value
        //const prevCardType = card_types.find((card) => card.code === cardTypeCode)
        // if (prevCardType && prevCardType.description === cardTypeDescription) {
        //     toast.warn("This card name already exists!")
        // }
    };

    //Pass headers for authorized user access
    const { user: currentUser } = useSelector((state) => state.auth);
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access}`,
    };

    //Store cardtype setup data into database

    const handleEditSubmit = (data) => {
       // e.preventDefault();
        dispatch(updateCartType(id, data, headers, onHide));
           toast.success("Card type is updating");
            //onHide();
    };

    useEffect(() => {
        reset({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [cardType]);

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
                        <h4>Edit Card Type</h4>
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

                        <form className="form-horizontal " onSubmit={handleSubmit(handleEditSubmit)}>
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
                                                    //onChange={changeHandler}
                                                    {...register("code")}
                                                    defaultValue={cardType && cardType.code}
                                                    onChange={changeHandler}
                                                    readOnly
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
                                                
                                                    {...register("description")}
                                                    defaultValue={cardType && cardType.description}
                                                    onChange={changeHandler}
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

export default EditCardType;
