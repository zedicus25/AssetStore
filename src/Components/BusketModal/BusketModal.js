import { ModalFooter } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { selectProducts, selectTotalPrice } from '../../app/busket';
import CartItem from '../CartItem/CartItem';
import "./BusketModal.css"

const BusketModal = (props) => {
    const products = useSelector(selectProducts);
    const total = useSelector(selectTotalPrice);
    return(
        <Modal
        {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header style={{backgroundColor:'#eeeeee'}} closeButton>
          <Modal.Title style={{backgroundColor:'#eeeeee', fontWeight:600, color:"#393E46"}} id="contained-modal-title-vcenter">
              Busket
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:'#eeeeee'}}>
            {products.map((x, idx) => {
            return <CartItem key={idx} productId={x.productId} productName={x.productName} productPrice={x.productPrice} productImage={x.productImage} productCount={x.productCount}></CartItem>})}
             <div className='busket-foot'>
              <p className='total-price'>Total: ${total}</p>
              <input className='order-btn' type='button' value='Order'></input>
            </div>
          </Modal.Body>
        </Modal>
      );
};

export default BusketModal;