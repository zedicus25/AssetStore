import { Component, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsControl.css'

class ProductsControl extends Component {
    constructor(props) {
        super(props);
        this.state = {page: 1, perPage: 10}; 
    }



    render() {
        return (
            <div className='products-wrap'>
                <div id='allproducts' className='flexbox'>
                    {this.props.products.slice((this.state.page-1)*10, ((this.state.page-1)*10)+10).map((x, idx) => {
            return <ProductCard key={`product=${idx}`} productId={`productdId=${x.id}`} productImg={x.photo} productName={x.name} productPrice={x.price}></ProductCard>
        })}
                </div>
                
                <Pagination size='lg'>
                    <Pagination.First onClick={() => this.setState({page: 1})}></Pagination.First>
                    <Pagination.Prev onClick={(e) => {
                        if(this.state.page > 1)
                            this.setState({page: this.state.page-1})
                    }}></Pagination.Prev>
                    <Pagination.Next onClick={(e) => {
                        if(this.state.page < Math.round(this.props.products.length / this.state.perPage))
                            this.setState({page: this.state.page+1})
                    }}></Pagination.Next>

                    <Pagination.Last onClick={() => this.setState({page: Math.round(this.props.products.length / this.state.perPage)})}></Pagination.Last>
                </Pagination>
                <p style={{fontSize:18, fontWeight:600}}>Page: {this.state.page}/{Math.round(this.props.products.length / this.state.perPage) === 0 ? 1 : Math.round(this.props.products.length / this.state.perPage)   }</p>
            </div>  
        );
    }
}


export default ProductsControl;