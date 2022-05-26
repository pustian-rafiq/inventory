import React from 'react';
import CustomModal from '../../CustomModal/CustomModal';

const ProductWisePurchaseAndSales = ({ show, onHide }) => {
    return (
        <>
            <CustomModal isOpen={show} setIsOpen={onHide} headline='Product Wise Purchase and Sales Report'>
                <div className='w-100 h-100' style={{ background: "#97b4d4" }}>
                    <div className='p-3'>
                        <div className="border p-2 justify-content-center">
                            <div className='d-flex flex-column flex-sm-column flex-md-row align-items-center'>
                                {/* customerDue classname is coming from Customer Due Report  */}
                                <label className="custom-label" htmlFor="">
                                    <strong>Bank</strong>
                                </label>
                                <input
                                    className="custom-input"
                                    type="text"
                                    name=""
                                    id=""
                                />
                                <span className="custom-icon">
                                    <i className="fa fa-search"></i>
                                </span>
                                <input className="custom-input-second" type="text" />
                            </div>
                            <div className='d-flex flex-column flex-sm-column flex-md-row justify-content-around'>
                                <label htmlFor="">
                                    <strong className="mr-3">Month</strong>
                                    <input type="date" name="" id="" />
                                </label>
                                <label htmlFor="">
                                    <strong className="mr-3">To</strong>
                                    <input type="date" name="" id="" />
                                </label>
                            </div>
                        </div>
                        <div className='border p-3 mt-2 text-right'>
                            <button className='modal-btn mr-2'>Preview</button>
                            <button className='modal-btn' onClick={() => onHide(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </CustomModal>
        </>
    );
};

export default ProductWisePurchaseAndSales;