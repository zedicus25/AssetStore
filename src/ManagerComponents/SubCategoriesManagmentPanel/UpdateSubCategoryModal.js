import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { updateSubCategory } from '../../app/subCategoriesSlice';

const UpdateSubCategoryModal = (props) => {

    const [categoryName, setCategoryName] = useState("");
    const [error, setErrors] = useState("");
    const dispatch = useDispatch();

    const refreshCategory = () => {
        setCategoryName(props.selectedCategory.name);
    }

    const validate = (category) => {
        let errors = "";
        if (!category) {
            errors = "Category name is required!";
        }
        else if(category.length < 5){
            errors = "Category name must contains 5 or more symbols"
        }
        else if(!/^[a-zA-Z0-9]+$/.test(category)){
            errors = "Category must contains only letter and numbers";
        }
        return errors;
    };

    const saveChanges = async(e) => {
        e.preventDefault();
        let reser = validate(categoryName);
        setErrors(reser);
        if(reser === ""){
            let res = await dispatch(updateSubCategory({id: props.selectedCategory.id, name: categoryName}));
            if(res.payload.status == '200'){
                alert("Updated!");
                setCategoryName("");
                props.onHide();
                window.location.reload(false);
            }else{
                alert('Try later!');
            }
        }
    }

    return(
        <Modal onShow={() =>refreshCategory()}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update category:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group mt-3">
                    <label>Category name:</label>
                    <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="form-control mt-1" type='text' placeholder='Category name'></input>
                    <p className="error-text">{error}</p>
                    <input onClick={(e) => saveChanges(e)} type='button' className='btn btn-primary' value='Save'></input>
                </div>
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
}
export default UpdateSubCategoryModal;