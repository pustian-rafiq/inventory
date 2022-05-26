import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProductLists } from "../../../redux/actions/productActions";
import EditProductWarrenty from "./EditProductWarrenty";
import { useForm } from "react-hook-form";
import { updateProductData } from "../../../redux/actions/productActions";

// Draggable feature
class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const EditProduct = ({
  show,
  onHide,
  product,
  companyList,
  categories,
  colors,
  select
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  //   get redux auth state
  const { user: currentUser } = useSelector((state) => state.auth);

  // company handler
  const companyHandler = (e) => {
    let id = e.target.value;
    const comp = companyList.find((company) => company.id === id);
    setSelectedCompany(comp.name);
  };

  // category handler
  const categoryHandler = (e) => {
    let id = e.target.value;
    const categ = categories.find((category) => category.id === id);
    setSelectedCategory(categ.name);
  };

  // color handler
  const colorHandler = (e) => {
    let id = e.target.value;
    const color = colors.find((color) => color.id === id);
    setSelectedColor(color.description);
  };

  const imagePreviewHandler = (e) => {
    setImagePreview(e.target.files[0]);
  };

  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${currentUser.access}`,
  };

  useEffect(() => {
    dispatch(getProductLists(headers));
  }, []);

  // update handler
  const updateFormHandler = (data) => {
    let formData = new FormData();

    for (let i in data) {
      if (i === "picture_path") {
        if (imagePreview != null) {
          formData.append(i, imagePreview, imagePreview.name);
        }
      } else {
        if (Array.isArray(product.extra_field)) {
          product.extra_field.forEach((item) => {
            if (item.name === i) {
              item.value = data[i];
            }
          });
          formData.append("extra_field", JSON.stringify(product.extra_field));
        }

        if (Array.isArray(product.extra_warrenty)) {
          product.extra_warrenty.forEach((item) => {
            if (item.w_name === i) {
              item.v_name = data[i];
            } else if (item.w_duration_name === i) {
              item.v_duration = data[i];
            }
          });
          formData.append(
            "extra_warrenty",
            JSON.stringify(product.extra_warrenty)
          );
        }

        formData.append(i, data[i]);
      }
    }

    // add extra field
    if (selectedCompany === "") {
      formData.append("com_name", product && product.company_name);
    } else {
      formData.append("com_name", selectedCompany);
    }

    if (selectedCategory === "") {
      formData.append("categ_name", product && product.category_name);
    } else {
      formData.append("categ_name", selectedCategory);
    }

    dispatch(
      updateProductData(formData, headers, onHide, product && product.id)
    );
    toast.success("Update Process is Going On", {
      icon: ({ theme, type }) => (
        <img
          height={"27px"}
          alt=""
          src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/uldateProcessing.gif"
        />
      ),
    });
  };

  // for reseting the modal form
  useEffect(() => {
    reset({});
    setImagePreview(null);
  }, [product]);

  // This handler hide this modal and send select state to the parent component
  const closeHandler = () => {
    onHide();
    select()
  }
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <div style={{ background: "#e0d4fa" }}>
        {/* modal header  */}
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">
          <div >
            <h4 className="responsive-head"
            >
              Edit Product Detalis
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
          {/* update product  */}
          <div className="custom_modal_inner_content">
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(updateFormHandler)}
          >
            <div className="container productBox">
              <div className="row">
                <div className="col-md-12 col-lg-9">
                  {/* code  */}
                  <div className="row  mb-0">
                    <div className="col-md-12 col-lg-3">
                      <label className="label Title" htmlFor="code">
                        Code
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-9 input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput"
                        id="code"
                        placeholder="Enter product code"
                        {...register("code")}
                        defaultValue={product && product.code}
                      />
                    </div>
                  </div>

                  {/* Company  */}
                  <div className="row mb-0">
                    <div className="col-md-12 col-lg-3 ">
                      <label className="label Title" htmlFor="company">
                        Company
                      </label>
                    </div>

                    {/* company code  */}
                    <div className="col-md-12 col-lg-4 input-group input-group-sm codeBox">
                      <select
                        className="form-control input-sm"
                        {...register("company")}
                        onChange={companyHandler}
                      >
                        <option value={product && product.company}>
                          {product && product.company_code}
                        </option>

                        {companyList &&
                          companyList.map((company) => (
                            <option key={company.id} value={company.id}>
                              {company.code}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* company name  */}
                    <div className="col-md-12 col-lg-5 input-group input-group-sm nameBox">
                      <label className="form-control productInput input-sm">
                        {selectedCompany === ""
                          ? product && product.company_name
                          : selectedCompany}
                      </label>
                    </div>
                  </div>

                  {/* Category  */}
                  <div className="row mb-0">
                    <div className="col-md-12 col-lg-3">
                      <label className="label Title" htmlFor="category">
                        Category
                      </label>
                    </div>

                    {/* Category code  */}
                    <div className="col-md-12 col-lg-4 input-group input-group-sm codeBox">
                      <select
                        className="form-control input-sm"
                        {...register("category")}
                        onChange={categoryHandler}
                      >
                        <option value={product && product.category}>
                          {product && product.category_code}
                        </option>

                        {categories &&
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.code}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Category name  */}
                    <div className="col-md-12 col-lg-5 input-group input-group-sm nameBox">
                      <label className="form-control productInput input-sm">
                        {selectedCategory === ""
                          ? product && product.category_name
                          : selectedCategory}
                      </label>
                    </div>
                  </div>

                  {/* Color  */}
                  <div className="row mb-0">
                    <div className="col-md-12 col-lg-3">
                      <label className="label Title" htmlFor="category">
                        Color
                      </label>
                    </div>

                    {/* Color code  */}
                    <div className="col-md-12 col-lg-4 input-group input-group-sm codeBox">
                      <select
                        className="form-control input-sm"
                        {...register("color")}
                        onChange={colorHandler}
                      >
                        <option value={product && product.color}>
                          {product && product.color_code}
                        </option>

                        {colors &&
                          colors.map((color) => (
                            <option key={color.id} value={color.id}>
                              {color.code}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Color name  */}
                    <div className="col-md-12 col-lg-5 input-group input-group-sm nameBox">
                      <label className="form-control productInput input-sm">
                        {selectedColor === ""
                          ? product
                            ? product.color_name
                            : "No color "
                          : selectedColor}
                      </label>
                    </div>
                  </div>

                  {/* Product Type  */}
                  <div className="row mb-0">
                    <div className="col-md-12 col-lg-3 input-group input-group-sm">
                      <label className="label Title" htmlFor="productTypess">
                        Product Type
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-9  input-group input-group-sm">
                      <select
                        className="form-control input-sm"
                        {...register("product_type")}
                        defaultValue={product && product.product_type}
                      >
                        <option
                          value={product && product.product_type}
                          className="text-capitalize"
                        >
                          {product && product.product_type}
                        </option>
                        <option value="serial_No">Serial_No</option>
                        <option value="Bar_Code">Bar_Code</option>
                        <option value="No_Bar_Code">No_Bar_Code</option>
                      </select>
                    </div>
                  </div>

                  {/* Product Name  */}
                  <div className="row mb-0">
                    <div className="col-md-12 col-lg-3 input-group input-group-sm">
                      <label className="label Title" htmlFor="productName">
                        Product Name
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-9  input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control productInput input-sm"
                        id="productName"
                        {...register("name")}
                        defaultValue={product && product.name}
                      />
                    </div>
                  </div>

                  {/* Warning Qty  */}
                  <div className="row mb-0">
                    <div className="col-md-12 col-lg-3 input-group input-group-sm">
                      <label className="label Title" htmlFor="warningQty">
                        Warning Qty
                      </label>
                    </div>
                    <div className="col-md-12 col-lg-9 input-group input-group-sm">
                      <input
                        type="number"
                        className="form-control productInput input-sm"
                        id="warningQty"
                        {...register("warning_qty")}
                        defaultValue={product && product.warning_qty}
                      />
                    </div>
                  </div>

                  {/* Extra Features Field  */}
                  {product && Array.isArray(product.extra_field)
                    ? product.extra_field.map((ef, index) => (
                      <div className="row mb-0" key={index}>
                        <div className="col-md-12 col-lg-3 input-group input-group-sm">
                          <label
                            className="label Title text-capitalize"
                            htmlFor="warningQty"
                          >
                            {ef.label}
                          </label>
                        </div>
                        <div className="col-md-12 col-lg-9 input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control productInput input-sm"
                            id="warningQty"
                            {...register(`${ef.name}`)}
                            defaultValue={ef.value}
                          />
                        </div>
                      </div>
                    ))
                    : ""}
                </div>

                {/* product image  */}
                <div className="col-md-12 col-lg-3 imageContainer mt-3 border-0">
                  <div className="row ">
                    {/* preview image  */}
                    <div className="col-md-12 col-lg-12 imageBox border-0">
                      <p>
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={
                            imagePreview == null
                              ? `${product && product.picture_path}`
                              : URL.createObjectURL(imagePreview)
                          }
                          alt="product"
                        />
                      </p>
                    </div>

                    {/* Browse Image  */}
                    <div className="col-md-12 col-lg-12 fileBrowse">
                      <input
                        type="file"
                        hidden
                        id="file"
                        {...register("picture_path")}
                        onChange={imagePreviewHandler}
                      />
                      <label htmlFor="file" className="">
                        Browse *
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Product Warrenty   */}
              <EditProductWarrenty product={product} register={register} />
            </div>

            {/* modal body footer  */}
            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 pull-right responsive-btn">
                  {/* close button  */}
                  <Button className="saveCloseBtn border border-none closebtn " onClick={closeHandler}>
                    Close
                  </Button>
                  {/* update button  */}
                  <Button type="submit" className="saveCloseBtn border border-none updatebtn">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </form>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EditProduct;
