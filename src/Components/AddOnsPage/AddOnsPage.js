import NavigationBar from '../NavigationBar/NavigationBar';
import "./AddOnsPage.css";
import { useEffect } from 'react';
import SubCategoriesFilter from '../SubCategoriesFilter/SubCategoriesFilter';
import ProductsControl from '../ProductsControl/ProductsControl';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInCategory, selectValues } from '../../app/productsSlice';
import { selectSubCategories } from '../../app/filtersSlice';

  const AddOnsPage = () => {
    const assest = useSelector(selectValues);
    const dispatch = useDispatch();
    const filter = useSelector(selectSubCategories);

    useEffect(() => {
      dispatch(getProductsInCategory({categoryId : 3}));
      sessionStorage.setItem('categoryId', 3);
    }, []);

    return(
      <div className='main-padding'>
      <NavigationBar ></NavigationBar>
      <div className='main-grid'>
        <div className='products-grid'>
          <ProductsControl  products={assest} subCategoriesFilter={filter}></ProductsControl>
        </div>
        <div className='controls-grid'>
          <SubCategoriesFilter></SubCategoriesFilter>
        </div>
      </div>
    </div>
    );
  };
  
  export default AddOnsPage;