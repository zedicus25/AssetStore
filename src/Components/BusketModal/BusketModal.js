import { useEffect } from 'react';
import { ModalFooter } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { clearBusket, selectProducts, selectTotalPrice } from '../../app/busketSlice';
import { createOrder } from '../../app/ordersSlice';
import CartItem from '../CartItem/CartItem';
import "./BusketModal.css"
import token from '../../jwtToken';
import { useNavigate } from 'react-router-dom';

const BusketModal = (props) => {
  const products = useSelector(selectProducts);
  const total = useSelector(selectTotalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const buyProducts = async () => {
    if (token.getToken() == null) {
      alert("You must be authorized!");
      return;
    }

    if (token.getUserData().User) {
      navigate('/account/payment');
      return;
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header style={{ backgroundColor: '#eeeeee' }} closeButton>
        <Modal.Title style={{ backgroundColor: '#eeeeee', fontWeight: 600, color: "#393E46" }} id="contained-modal-title-vcenter">
          Busket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#eeeeee' }}>
        {products?.map((x, idx) => {
          return <CartItem key={idx} productId={x.productId} productName={x.productName} productPrice={x.productPrice} productImage={x.productImage} productCount={x.productCount}></CartItem>
        })}
        <div className='busket-foot'>
          <p className='total-price'>Total: ${total}</p>
          <div>
            <input onClick={() => buyProducts()} className='order-btn' type='button' value='Buy'></input>
            <input onClick={() => dispatch(clearBusket())} className='clear-btn' type='button' value='Clear'></input>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BusketModal;