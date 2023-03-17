import "./CartItem.css"
const CartItem = (props) => {
    return(
        <div className="cart-item">
            <img src={props.productImage} alt="Image"/>
            <div className="product-info">
            <h4 className="product-name">{props.productName}</h4>
            <p className="product-price">${`${props.productPrice}`}</p>
            <div className="quantity-input">
                <button className="quantity-btn minus-btn">-</button>
                <input type="number" min="1" value={props.productCount}/>
                <button className="quantity-btn plus-btn">+</button>
            </div>
    </div>
</div>);
}

export default CartItem;