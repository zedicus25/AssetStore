import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../app/busket';
import CartItem from '../CartItem/CartItem';

const BusketModal = (props) => {
    const products = useSelector(selectProducts);

    return(
        <Modal
        {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              Busket
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {products.map((x, idx) => {
            return <CartItem key={idx} productId={x.productId} productName={x.productName} productPrice={x.productPrice} productImage={x.productImage} productCount={x.productCount}></CartItem>})}
          </Modal.Body>
        </Modal>
      );
};

export default BusketModal;