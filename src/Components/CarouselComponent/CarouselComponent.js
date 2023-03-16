import Carousel from 'react-bootstrap/Carousel';
import './CarouselComponent.css';
const CarouselComponet = () => {
    return (
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 slide-icon"
              src="https://blobsassetstore.blob.core.windows.net/site/slide1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>
               <a className='pa' href='https://dmarket.com/ua'>Image source</a>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 slide-icon"
              src="https://blobsassetstore.blob.core.windows.net/site/slide2.jpg"
              alt="Second slide"
            />
    
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>
               <a className='pa' href='https://www.ign.com/articles/biggest-games-of-2023'>Image source</a>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 slide-icon"
              src="https://blobsassetstore.blob.core.windows.net/site/slide3.jpg"
              alt="Third slide"
            />
    
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
               <a className='pa' href='https://www.ign.com/articles/biggest-games-of-2023'>Image source</a>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
}

export default CarouselComponet;