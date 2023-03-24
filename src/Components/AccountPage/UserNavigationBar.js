import { Link } from 'react-router-dom';
import './AccountPage.css'
import token from '../../jwtToken';
import { useNavigate } from 'react-router-dom';

const UserNavigationPage = () => {

    const navigate = useNavigate();

    const logOut = () => {
        token.logOut();
        navigate('/');
    }
    return(
        <div className="user-nav">
        <ul>
        <li><Link to='/account/payment'>Payment</Link></li>
        <li><Link to="/account/buyedassets">You orders</Link></li>
        <li><input onClick={() => navigate('/')} className='logout-btn' type='button' value='Back'></input></li>
        <li><input onClick={() => logOut()} className='logout-btn' type='button' value='Exit'></input></li>
        </ul>
    </div>
    
    );
}
export default UserNavigationPage;