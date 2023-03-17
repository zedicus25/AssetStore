import CarouselComponet from '../CarouselComponent/CarouselComponent';
import NavigationBar from '../NavigationBar/NavigationBar';
import PopularProducts from '../PopularProducts/PopularProducts';

const MainPage = () => {
  return(
    <div className='main-padding'>
      <NavigationBar></NavigationBar>
      <CarouselComponet></CarouselComponet>
      <PopularProducts></PopularProducts>   
  </div>
);
}

export default MainPage;