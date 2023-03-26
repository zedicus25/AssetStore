import { Link } from 'react-router-dom';
import './AdminNavigationBar.css'
import token from '../../jwtToken';
import { useNavigate } from 'react-router-dom';

const AdminNavigationBar = () => {

    const navigate = useNavigate();


    const logOut = () => {
        token.logOut();
        navigate('/');
    }
    return (
        <div className="admin-nav">
            <ul>
                <li><Link to='/admin/managerspage'>Managers</Link></li>
                <li><Link to="/admin/adminspage">Admins</Link></li>
                <li><Link to="/admin/userspage">Users</Link></li>
                <li><input onClick={() => navigate('/')} className='logout-btn' type='button' value='Back'></input></li>
                <li><input onClick={() => logOut()} className='logout-btn' type='button' value='Exit'></input></li>
            </ul>
        </div>

    );
}
export default AdminNavigationBar;