import token from '../../jwtToken';
import {  useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import './ProductsTabel.css';
import { useDispatch, useSelector } from "react-redux";
import { getAsync as selectSubCategories, selectValues as getSubCategories } from "../../app/subCategoriesSlice";
import { getAsync as selectCategories, selectValues as getCateogries } from "../../app/categoriesSlice";
import {getProductsInPage as selectProduct, selectValues as getResult, deleteProduct as delProd, setStatus as updateStatus} from "../../app/productsSlice";
import {UpdateModal} from '../UpdateProductModal/UpdateModal'
import PaginationControl from '../PaginationControl/PaginationControl';



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

    const deleteProduct = async(e, id) => {
        e.preventDefault();
        let res = await dispatch(delProd({productId: id}))
        if(res.payload.status == '200'){
            alert("Deleted!");
            window.location.reload(false);
        }else{
            alert('Try later!');
        }
    }

    const setStatus = async(e, productId, statusId) => {
        e.preventDefault();
        let res = await dispatch(updateStatus({productId: productId, statusId: statusId}));
        if(res.payload.status == '200'){
            alert("Saved!");
            window.location.reload(false);
        }else{
            alert('Try later!');
        }
    }

    const goToPage = (e,pg) =>{
        e.preventDefault();
        dispatch(selectProduct({perPage:perPage, page:pg}));
    }

    const goToNextPage = (e) => {
        e.preventDefault();
        setPage(page+1);
        console.log(page);
        dispatch(selectProduct({perPage:perPage, page:page}));
    }

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
                                <td><input type='checkbox' onClick={(e) => {
                                    if(e.target.checked){
                                        setStatus(e, x.id, 1);
                                        return;
                                    }
                                    setStatus(e, x.id, 2);
                                }} defaultChecked={x.statusId === 1}></input></td>
                                <td><input type='checkbox' onClick={(e) => {
                                    if(e.target.checked){
                                        setStatus(e, x.id, 4);
                                        return;
                                    }
                                    setStatus(e, x.id, 1);
                                }} defaultChecked={x.statusId === 4}></input></td>
                                <td>
                                    <input type='button' onClick={() => {
                                    setModalShow(true);
                                    setSelectedProduct(x);
                                    }} value='Update' className="btn btn-warning"></input>
                                <input type='button' value='Delete' onClick={(e) => {
                                    deleteProduct(e, x.id);
                                }} className="btn btn-danger"></input></td>  
                            </tr>                           
                        ))}
                    </tbody>    
                </table>
                <UpdateModal categories={categories} subcategories={subCategories} selectedproduct={selectedProduct} onHide={() => setModalShow(false)} show={modalShow}></UpdateModal> 
                <PaginationControl></PaginationControl>
        </div>
    )
}

export default ProductsTabel;