import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchProducts, selectValues } from '../../app/productsSlice';
import NavigationBar from '../NavigationBar/NavigationBar';
import ProductsControl from '../ProductsControl/ProductsControl';
import SubCategoriesFilter from '../SubCategoriesFilter/SubCategoriesFilter';
import './SearchPage.css'


const SearchPage = () => {
    const location = useLocation();
    const assets = useSelector(selectValues);
    const dispatch = useDispatch();
    const [lastSearchText, setLastSearchText] = useState("");

    useEffect(() => {
        dispatch(searchProducts({searchText: location.state.searchText}));
        setLastSearchText(location.state.searchText);
    },[]);
    if(lastSearchText !== location.state.searchText){
      dispatch(searchProducts({searchText: location.state.searchText}));
      setLastSearchText(location.state.searchText);
    }
      
    return(<div className='main-padding'>
        <NavigationBar/>
        <div className='main-grid'>
        <div className='products-grid'>
          <ProductsControl products={assets}></ProductsControl>
        </div>
        <div className='controls-grid'>
          <SubCategoriesFilter></SubCategoriesFilter>
        </div>
      </div>
    </div>)
}

export default SearchPage;