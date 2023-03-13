import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import token from '../../jwtToken';
import {  useNavigate } from "react-router-dom";
import { addCategory as createCategory } from "../../app/categoriesSlice";

const AddCategoryPanel = () => {

    const [categoryName, setCategoryName] = useState("");
    const [error, setErrors] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const managerInfo = token.getUserData();
        if(managerInfo.Manager === false)
            navigate('/');
    }, []);

    const addCategory = async() => {
        let reser = validate(categoryName);
        setErrors(reser);
        if(reser === ""){
            let res = await dispatch(createCategory({categoryName: categoryName}));
            console.log(res);
            if(res.payload.status == '200'){
                alert("Added!");
                setCategoryName("");
                window.location.reload(false);
            }else{
                alert('Try later!');
            }
        }
       
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
    return(
        <div>
            <form>
                <div className="flexbox-row">
                    <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} type="text" maxLength='40' minLength='5' className="form-control mt-1" placeholder="Category name"></input>
                    <input onClick={() => addCategory()} type='button' className="btn btn-primary" value="Add"></input>
                </div>
                <p className="error-text">{error}</p>
                
            </form>
        </div>
    )
}
export default AddCategoryPanel;