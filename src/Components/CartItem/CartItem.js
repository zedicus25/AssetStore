import { useDispatch } from "react-redux";
import { decreaseProductCount, increaseProductCount, removeProduct, setItemCount } from "../../app/busketSlice";
import "./CartItem.css"
const CartItem = (props) => {

    const dispatch = useDispatch();

    return(
        <div className="cart-item">
            <img src={props.productImage} alt="Image"/>
            <div className="product-info">
            <h4 className="product-name">{props.productName}</h4>
            <p className="product-price">${`${props.productPrice*props.productCount}`}</p>
            <div className="quantity-input">
                <p className="quantity-label">Quantity:</p>
                <input value="-" type='button' onClick={() => dispatch(decreaseProductCount({productId: props.productId}))} className="quantity-btn minus-btn"/>
                <input onChange={(e) => dispatch(setItemCount({productId:props.productId, productCount:e.target.value}))} type="number" min="1" max='50' value={props.productCount}/>
                <input value="+" type='button' onClick={() => dispatch(increaseProductCount({productId: props.productId}))} className="quantity-btn plus-btn"/>
            </div>
            <input onClick={() => dispatch(removeProduct({productId: props.productId}))} className="delete-btn" type='button' value='Remove'></input>
    </div>
</div>);
}

export default CartItem;