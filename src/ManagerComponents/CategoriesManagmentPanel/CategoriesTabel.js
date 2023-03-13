import token from '../../jwtToken';
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getAsync as selectCategories, selectValues as getCateogries } from "../../app/categoriesSlice";
import UpdateCategoryModal from './UpdateCategoryModal';

const CategoriesTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const categories = useSelector(getCateogries);
    const [modalShow, setModalShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});

    useEffect(() => {
        const managerInfo = token.getUserData();
        if(managerInfo.Manager === false)
            navigate('/');
        dispatch(selectCategories());
    }, []);

    const delCategory = async(e, categoryId) => {
        e.preventDefault();
        let res = await dispatch(deleteCategory({categoryId: categoryId}));
        if(res.payload.status == '200'){
            alert("Saved!");
            window.location.reload(false);
        }else{
            alert('Try later!');
        }
    }
    
    return(
        <div>
            <table>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {categories.map((x, idx) => (
                    <tr id={`categoryId=${x.id}`} key = {idx}>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>
                            <input onClick={(e) => {
                                e.preventDefault();
                                setSelectedCategory(x,setModalShow(true));
                            }} type='button' value="Update" className='btn btn-warning'></input>
                            <input onClick={(e) => delCategory(e, x.id)} type='button' value="Delete" className='btn btn-danger'></input>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            <UpdateCategoryModal onHide={() => setModalShow(false)} show={modalShow} selectedCategory={selectedCategory}></UpdateCategoryModal>
        </div>
        
        
    );
}

export default CategoriesTable;