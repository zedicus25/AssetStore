import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBusket } from '../../app/busketSlice';
import CarouselComponet from '../CarouselComponent/CarouselComponent';
import NavigationBar from '../NavigationBar/NavigationBar';
import PopularProducts from '../PopularProducts/PopularProducts';

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      let local = localStorage.getItem('busket');
      if(local !== ""){
        dispatch(setBusket({products: JSON.parse(local)}));
      }
  },[]);
  
  return(
    <div className='main-padding'>
      <NavigationBar></NavigationBar>
      <CarouselComponet></CarouselComponet>
      <PopularProducts></PopularProducts>   
  </div>
);
}

export default MainPage;