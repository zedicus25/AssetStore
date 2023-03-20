
import './ProductCard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../app/busketSlice';

const ProductCard = (props) => {

    const dispatch = useDispatch();

    return(<div className="product-card">
        <img src={props['productImg']} alt={props['productName']}/>
        <div className="product-details">
        <h3 className="product-title">{props['productName']}</h3>
        <span className="product-price">${props['productPrice']}</span>
        <button onClick={() => dispatch(addProduct({productId:props.productId, productName: props.productName, productPrice: props.productPrice, productImage: props.productImg}))} className="add-to-cart-btn">Add to Cart</button>
    </div>
</div>);
}



export default ProductCard;