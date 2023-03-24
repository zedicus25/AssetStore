import ManagerNavBar from "../ManagerNavBar/ManagerNavBar";
import token from '../../jwtToken';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAsync as selectSubCategories, selectValues as getSubCategories } from "../../app/subCategoriesSlice";
import { getAsync as selectCategories, selectValues as getCateogries } from "../../app/categoriesSlice";
import { addProduct as createProduct, selectResult as getResult } from "../../app/productsSlice";


const AddProductPanel = () => {
    const navigate = useNavigate();
    const initProduct = { Name: "", Price: 0, Photo: "", Quantity: 0, Sold: 0, CategoryId: "", SubCategoryId: "", StatusId: 1, AssetFile: "" };
    const [newProducts, setNewProduct] = useState(initProduct);
    const [productsError, setProductsError] = useState({});
    const subCategories = useSelector(getSubCategories);
    const categories = useSelector(getCateogries);
    const addingResult = useSelector(getResult);
    const dispatch = useDispatch();
    useEffect(() => {
        const managerInfo = token.getUserData();
        if (managerInfo.Manager === false)
            navigate('/');
        dispatch(selectSubCategories());
        dispatch(selectCategories());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProducts, [name]: value });

    };

    const validate = (values) => {
        const errors = {};
        if (!values.Name) {
            errors.productName = "Product name is required!";
        }
        else if (!/^[a-zA-Z0-9+-]+$/.test(values.Name)) {
            errors.productName = "Login must contains only letters, numbers and symbols +-";
        }
        if (!values.Price) {
            errors.productPrice = "Products price is required!";
        } else if (!/^[0-9\.]+$/.test(values.productPrice)) {
            errors.productPrice = "Price can contains only numbers!";
        }
        if (!values.Photo) {
            errors.productImage = "Photo is required";
        }
        if (!values.AssetFile) {
            errors.productFile = "Asset file is required";
        }
        if (!values.Quantity)
            errors.productQuantity = "Product quantity is required";
        else if (!/^[0-9]+$/.test(values.productQuantity))
            errors.productQuantity = "Quantity can contains only numbers!";

        if (!values.categoryId)
            errors.categoryId = "Category is required!";
        if (!values.subCategoriesId)
            errors.subCategoryId = "Sub category is required!"
        return errors;
    };

    const addProduct = async (e) => {
        e.preventDefault();
        setProductsError(validate(newProducts));
        if (Object.keys(productsError).length === 0) {
            const formData = new FormData();
            formData.append('files', newProducts.Photo);
            formData.append('assetFile', newProducts.AssetFile);
            newProducts.Photo = "";
            newProducts.AssetFile = "";
            formData.append('product', JSON.stringify(newProducts));
            let res = await dispatch(createProduct(formData));
            if (res.payload.status == '200') {
                alert("Added!");
                clearInputs();
                window.location.reload(false);
            } else {
                alert('Try later!');
            }



        }
    }

    const clearInputs = () => {
        setNewProduct(initProduct);
        setProductsError({});
        document.getElementById('categoryDrop').selectedIndex = 0;
        document.getElementById('subCategoryDrop').selectedIndex = 0;
    }

    return (
        <div className="flexbox-row">
            <ManagerNavBar></ManagerNavBar>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'row' }}>
                <form>
                    <h5>Add new product</h5>
                    <div className="form-group mt-3">
                        <label>Product name</label>
                        <input name='Name' value={newProducts.productName} onChange={(e) => handleChange(e)} className="form-control mt-1" type='text' placeholder='Name'></input>
                        <p className="error-text">{productsError.productName}</p>
                    </div>
                    <div className="form-group mt-3">
                        <label>Product price</label>
                        <input name="Price" value={newProducts.productPrice} onChange={(e) => handleChange(e)} className="form-control mt-1" type='number' min='1' placeholder='Price'></input>
                        <p className="error-text">{productsError.productPrice}</p>
                    </div>
                    <div className="form-group mt-3">
                        <label>Product image</label>
                        <input name='Photo' onChange={(e) => {
                            newProducts.Photo = e.target.files.item(0);
                        }} type='file' className="form-control mt-1" accept="image/*"></input>
                        <p className="error-text">{productsError.productImage}</p>
                    </div>
                    <div className="form-group mt-3">
                        <label>Product image</label>
                        <input name='AssetFile' onChange={(e) => {
                            newProducts.AssetFile = e.target.files.item(0);
                        }}
                            type='file' className="form-control mt-1" accept=""></input>
                        <p className="error-text">{productsError.productFile}</p>
                    </div>
                    <div className="form-group mt-3">
                        <label>Quantity count</label>
                        <input name='Quantity' value={newProducts.productQuantity} onChange={(e) => handleChange(e)} className="form-control mt-1" min='1' type='number' placeholder='Quantity'></input>
                        <p className="error-text">{productsError.productQuantity}</p>
                    </div>
                    <div className="form-group mt-3">
                        <label>Sold count</label>
                        <input name="Sold" value={newProducts.soldCount} onChange={(e) => handleChange(e)} className="form-control mt-1" min='1' type='number' placeholder='Sold'></input>
                        <p className="error-text">{productsError.soldCount}</p>
                    </div>
                    <div className="form-group mt-3">
                        <label>Category</label>
                        <select name='CategoryId' onChange={(e) => handleChange(e)} className="form-select" id='categoryDrop'>
                            <option value='' disabled=''>Select</option>
                            {
                                categories.map((x, idx) => {
                                    return <option key={idx} value={x.id}>{x.name}</option>
                                })
                            }
                        </select>
                        <p className="error-text">{productsError.categoryId}</p>
                    </div>
                    <div className="form-group mt-3">
                        <label>Sub category</label>
                        <select name='SubCategoryId' onChange={(e) => handleChange(e)} className="form-select" id="subCategoryDrop">
                            <option value='' disabled=''>Select</option>
                            {
                                subCategories.map((x, idx) => {
                                    return <option key={idx} value={x.id}>{x.name}</option>
                                })
                            }
                        </select>
                        <p className="error-text">{productsError.subCategoryId}</p>
                    </div>
                    <div className="form-group mt-3">
                        <input onClick={(e) => addProduct(e)} type='button' className="btn btn-primary" value='Add product'></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProductPanel;