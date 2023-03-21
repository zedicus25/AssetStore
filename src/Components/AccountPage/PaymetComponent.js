import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearBusket, selectProducts, selectTotalPrice } from '../../app/busketSlice';
import './AccountPage.css';
import CartItem from '../CartItem/CartItem';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../app/ordersSlice';

const PaymentComponent = () => {

    const [paymentData, setPaymentData] = useState({ number: "", cvv: "", month: "", year: "", owner: "" });
    const products = useSelector(selectProducts);
    const total = useSelector(selectTotalPrice);
    const [cardErrors, setCardErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };


    const validate = (values) => {
        const errors = {};
        if (!values.number) {
            errors.number = "Card number is required!";
        }
        else if (!/^[0-9]+$/.test(values.number)) {
            errors.number = "Card number can contains only numbers";
        }
        else if (values.number.length != 16) {
            errors.number = "Card number to short or to long";
        }
        if (!values.cvv) {
            errors.cvv = "Card CVV is required!";
        } else if (!/^[0-9]+$/.test(values.cvv)) {
            errors.cvv = "CVV can contains only numbers!";
        }
        else if (values.cvv.length != 3) {
            errors.number = "CVV length incorrect!";
        }
        if (!values.month) {
            errors.month = "Month is required";
        }
        else if (!/^[0-9]+$/.test(values.month)) {
            errors.month = "Month can contains only numbers";
        }
        else if (values.month < 1 || values.month > 12) {
            errors.month = "Incorrect month";
        }
        if (!values.year) {
            errors.year = "Year is required";
        }
        else if (!/^[0-9]+$/.test(values.year)) {
            errors.year = "Year can contains only numbers";
        }
        else if (values.year < 2023 || values.year > 2043) {
            errors.year = "Incorrect year";
        }
        if (!values.owner) {
            errors.owner = "Owner is required!";
        }


        return errors;
    };

    const buyProducts = async () => {
        setCardErrors(validate(paymentData));
        console.log(cardErrors);
        if (Object.keys(cardErrors).length === 0) {
            console.log("work")
            let res = await dispatch(createOrder({ products: products, totalPrice: total }));
            if (res.payload.request.status == '200') {
                await dispatch(clearBusket());
                setCardErrors({});
                setPaymentData({});
                navigate('/account/buyedassets');
            }
        }
    }

    return (
        <div className='payment-wrap'>
            <div className="card-input">
                <label htmlFor="number">Card number:</label>
                <input value={paymentData.number} onChange={(e) => handleChange(e)} type="number" id="card-number" name="number" placeholder="1234567890123456" />
                <p className="error-text">{cardErrors.number}</p>
                <label htmlFor="owner">Name on card:</label>
                <input value={paymentData.owner} onChange={(e) => handleChange(e)} type="text" id="card-name" name="owner" placeholder="Ivan Ivanov" />
                <p className="error-text">{cardErrors.owner}</p>
                <label htmlFor="card-expiry">Expiry:</label>
                <div className="expiry-input">
                    <input value={paymentData.month} onChange={(e) => handleChange(e)} type="number" min='1' max='12' id="card-expiry-month" name="month" placeholder="MM" />
                    <span>/</span>
                    <input value={paymentData.year} onChange={(e) => handleChange(e)} type="number" min='2023' max='2050' id="card-expiry-year" name="year" placeholder="YY" />
                </div>
                <p className="error-text">{cardErrors.month}/{cardErrors.year}</p>
                <label htmlFor="card-cvv">CVV:</label>
                <input value={paymentData.cvv} onChange={(e) => handleChange(e)} type="password" id="card-cvv" name="cvv" placeholder="123" />
                <p className="error-text">{cardErrors.cvv}</p>
            </div>
            <div className='width-600'>

                {products?.map((x, idx) => {
                    return <CartItem key={idx} productId={x.productId} productName={x.productName} productPrice={x.productPrice} productImage={x.productImage} productCount={x.productCount}></CartItem>
                })}
            </div>
            <div className='pay-foot'>
                <p className='total-price-pay'>Total: ${total}</p>
                <div>
                    <input onClick={() => buyProducts()} className='order-btn' type='button' value='Buy'></input>
                </div>
            </div>
        </div>

    );
}

export default PaymentComponent;