import {Component} from 'react';
import './ProductCard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class ProductCard extends Component{
    constructor(props){
        super(props);
    }

 buyProduct() {
    let token = sessionStorage.getItem('token');
    if(token == null || token == '')
        alert("Log in or register to purchase");
}
    render(){
        return(<div className="product-card">
        <img src={this.props['productImg']} alt={this.props['productName']}/>
        <div className="product-details">
        <h3 className="product-title">{this.props['productName']}</h3>
        <span className="product-price">${this.props['productPrice']}</span>
        <button className="add-to-cart-btn">Add to Cart</button>
    </div>
</div>)

    }
}

export default ProductCard;