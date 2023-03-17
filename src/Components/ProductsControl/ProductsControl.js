import { Component, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsControl.css'

class ProductsControl extends Component {
    constructor(props) {
        super(props);
        this.state = {page: 1, perPage: 12}; 
    }



    render() {

        let cards = [];
        let cardsCount = 0;
        let lastPage = 0;
        if(this.props.subCategoriesFilter.length <= 0){
            cardsCount = this.props.products.length;
            cards.push(this.props.products.slice((this.state.page-1)*12, ((this.state.page-1)*10)+12).map((x, idx) => {
                return <ProductCard key={`product=${idx}`} productId={`${x.id}`} productImg={x.photo} productName={x.name} productPrice={x.price}></ProductCard>}));
                lastPage = Math.round(cardsCount / this.state.perPage);
        }
        else{
            cardsCount = this.props.products.filter(p => this.props.subCategoriesFilter.some(c => c === p.subCategoryId)).length;
            cards.push(this.props.products.filter(p => this.props.subCategoriesFilter.some(c => c === p.subCategoryId)).slice((this.state.page-1)*12, ((this.state.page-1)*10)+12).map((x, idx) => {
                return <ProductCard key={`product=${idx}`} productId={`${x.id}`} productImg={x.photo} productName={x.name} productPrice={x.price}></ProductCard>
            }));
            lastPage = Math.round(cardsCount / this.state.perPage);
        }
        

        return (
            <div className='products-wrap'>
                <div id='allproducts' className='flexbox'>
                    {cards}
                </div>
                
                <Pagination size='lg'>
                    <Pagination.First onClick={() => this.setState({page: 1})}></Pagination.First>
                    <Pagination.Prev onClick={(e) => {
                        if(this.state.page > 1)
                            this.setState({page: this.state.page-1})
                    }}></Pagination.Prev>
                    <Pagination.Next onClick={(e) => {
                        if(this.state.page < lastPage)
                            this.setState({page: this.state.page+1})
                    }}></Pagination.Next>

                    <Pagination.Last onClick={() => this.setState({page: Math.round(this.props.products.length / this.state.perPage)})}></Pagination.Last>
                </Pagination>
                <p style={{fontSize:18, fontWeight:600}}>Page: {this.state.page}/{lastPage === 0 ? 1 : lastPage}</p>
            </div>  
        );
    }
}


export default ProductsControl;