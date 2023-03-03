import token from '../../jwtToken';
import {  useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import './ProductsTabel.css';
import { useDispatch, useSelector } from "react-redux";
import { getAsync as selectSubCategories, selectValues as getSubCategories } from "../../app/subCategoriesSlice";
import { getAsync as selectCategories, selectValues as getCateogries } from "../../app/categoriesSlice";
import {getProductsInPage as selectProduct, selectValues as getResult} from "../../app/productsSlice";
import {UpdateModal} from '../UpdateProductModal/UpdateModal'

const ProductsTabel = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const subCategories = useSelector(getSubCategories);
    const categories = useSelector(getCateogries);
    const assets = useSelector(getResult);
    const [modalShow, setModalShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const managerInfo = token.getUserData();
        if(managerInfo.Manager === false)
            navigate('/');
        dispatch(selectSubCategories());
        dispatch(selectCategories());
        dispatch(selectProduct({perPage:perPage, page:page}))
    }, []);

    return(
        <div style={{padding:20}}>
             <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Image</td>
                            <td>Category</td>
                            <td>Sub Category</td>
                            <td>Sold</td>
                            <td>Quantity</td>
                            <td>Visibility</td>
                            <td>Popular</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((x, idx)=> (
                            <tr id={`productId=${x.id}`} key = {idx}>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.price}$</td>
                                <td><img src={x.photo} alt={x.photo} style={{width:50, height:50}}></img></td>
                                <td>{categories.find(y => y.id==x.categoryId).name}</td>
                                <td>{subCategories.find(y => y.id ==x.subCategoryId).name}</td>
                                <td>{x.sold}</td>
                                <td>{x.quantity}</td>
                                <td><input type='checkbox' defaultChecked={x.statusId === 1}></input></td>
                                <td><input type='checkbox' defaultChecked={x.statusId === 4}></input></td>
                                <td>
                                    <input type='button' onClick={() => {
                                    setModalShow(true);
                                    setSelectedProduct(x);
                                    }} value='Update' className="btn btn-warning"></input>
                                <input type='button' value='Delete' className="btn btn-danger"></input></td>  
                            </tr>                           
                        ))}
                    </tbody>    
                </table>
                <UpdateModal categories={categories} subcategories={subCategories} selectedproduct={selectedProduct} onHide={() => setModalShow(false)} show={modalShow}></UpdateModal>
        </div>
    )
}

export default ProductsTabel;