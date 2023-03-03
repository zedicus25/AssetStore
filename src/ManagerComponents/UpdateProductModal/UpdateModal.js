import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct as sendToDb } from '../../app/productsSlice';
export const UpdateModal = (props) => {

    const initProduct = {id:0,productName: "", productPrice: 0, productImage: "", productQuantity: 0, soldCount: 0, categoryId: "", subCategoryId: "",statusId:1};
    const [newProducts, setNewProduct] = useState(initProduct);
    const [productsError, setProductsError] = useState({});
    const dispatch = useDispatch();

   const refreshProduct = () => {
    setNewProduct({
        id: props.selectedproduct.id,
        productName: props.selectedproduct.name,
        productPrice: props.selectedproduct.price,
        productImage: props.selectedproduct.photo,
        productQuantity: props.selectedproduct.quantity,
        soldCount: props.selectedproduct.sold,
        categoryId: props.selectedproduct.categoryId,
        subCategoryId: props.selectedproduct.subCategoryId,
        statusId: props.selectedproduct.statusId
    });
   }
    
   const updateProduct = async(e) =>{
    e.preventDefault();
    setProductsError(validate(newProducts));
    if(Object.keys(productsError).length === 0){
        let res = await dispatch(sendToDb({
            id: newProducts.id,
            productName: newProducts.productName,
            productPrice: newProducts.productPrice,
            productPhoto: newProducts.productImage,
            categoryId: newProducts.categoryId,
            subCategoryId: newProducts.subCategoryId,
            quantity: newProducts.productQuantity,
            sold : newProducts.soldCount,
            statusId: newProducts.statusId
        }));    
        if(res.payload.status == '200'){
            alert("Updated!");
            clearInputs();
            props.onHide();
            window.location.reload(false);
        }else{
            alert('Try later!');
        }
    }
   };
   const clearInputs =() => {
    setNewProduct(initProduct);
    setProductsError({});
    document.getElementById('categoryDrop').selectedIndex = 0;
    document.getElementById('subCategoryDrop').selectedIndex = 0;
}

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProducts, [name]: value });
    };
    const validate = (values) => {
        const errors = {};
        if (!values.productName) {
            errors.productName = "Product name is required!";
        }
        else if(!/^[a-zA-Z0-9+-]+$/.test(values.username)){
            errors.productName = "Login must contains only letters, numbers and symbols +-";
        }
        if (!values.productPrice) {
            errors.productPrice = "Products price is required!";
        } else if (!/^[0-9\.]+$/.test(values.productPrice)) {
            errors.productPrice = "Price can contains only numbers!";
        }
        if (!values.productImage) {
            errors.productImage = "Photo is required";
        } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/.test(values.productImage)) {
            errors.productImage = "Not url";
        }
        if(!values.productQuantity)
            errors.productQuantity = "Product quantity is required";
        else if(!/^[0-9]+$/.test(values.productQuantity))
            errors.productQuantity = "Quantity can contains only numbers!";

        if(!values.categoryId)
            errors.categoryId = "Category is required!";
        if(!values.subCategoryId)
            errors.subCategoryId = "Sub category is required!"
        return errors;
    };

    return(
        <Modal onShow={() =>refreshProduct()}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update products:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
                <div className="form-group mt-3">
                    <label>Product name</label>
                    <input name='productName'  onChange={(e) => handleChange(e)}  value={newProducts.productName} className="form-control mt-1" type='text' placeholder='Name'></input>
                    <p className="error-text">{productsError.productName}</p>
                </div>
                <div className="form-group mt-3">
                    <label>Product price</label>
                    <input name='productPrice' onChange={(e) => handleChange(e)}  value={newProducts.productPrice}  className="form-control mt-1" type='number' min='1' placeholder='Price'></input>
                    <p className="error-text">{productsError.price}</p>
                </div>
                <div className="form-group mt-3">
                    <label>Product image url</label>
                    <input name='productImage' onChange={(e) => handleChange(e)}  value={newProducts.productImage}   className="form-control mt-1" type='url' placeholder='Image url'></input>
                    <p className="error-text">{productsError.productImage}</p>
                </div>
                <div className="form-group mt-3">
                    <label>Quantity count</label>
                    <input name='productQuantity' onChange={(e) => handleChange(e)} value={ newProducts.productQuantity}  className="form-control mt-1" min='1' type='number' placeholder='Quantity'></input>
                    <p className="error-text">{productsError.productQuantity}</p>
                </div>
                <div className="form-group mt-3">
                    <label>Sold count</label>
                    <input name='soldCount' onChange={(e) => handleChange(e)}  value={newProducts.soldCount}    className="form-control mt-1" min='1' type='number' placeholder='Sold'></input>
                    <p className="error-text">{productsError.soldCount}</p>
                </div>
                <div className="form-group mt-3">
                    <label>Category</label>
                    <select name='categoryId' onChange={(e) => handleChange(e)}  className="form-select" id='categoryDrop'>
                        {props.categories.map((x, idx) => {
                            return <option selected={x.id == props.selectedproduct.categoryId} value={x.id} key={idx}>{x.name}</option>
                        })};
                    </select>
                    <p className="error-text">{productsError.categoryId}</p>
                </div>
                <div className="form-group mt-3">
                    <label>Sub category</label>
                    <select name='subCategoryId' onChange={(e) => handleChange(e)} className="form-select" id='subCategoryDrop'>
                        <option value='' disabled=''>Select</option>
                        {props.subcategories.map((x, idx) => {
                            return <option selected={x.id == props.selectedproduct.subCategoryId} value={x.id} key={idx}>{x.name}</option>
                        })};
                    </select>
                    <p className="error-text">{productsError.subCategoryId}</p>
                </div>
                <div className="form-group mt-3">
                    <input onClick={(e) => {updateProduct(e)}} type='button' className="btn btn-primary" value='Update product'></input>
                </div>
            </form>
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
}