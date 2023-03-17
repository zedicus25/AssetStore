
import { useNavigate } from 'react-router-dom';
import token from '../../jwtToken';

const AccountPage = () => {

    const navigate = useNavigate();
return(
    <div>
        <input type='button' value="Log out" onClick={(e) => {
             token.logOut();
             navigate('/');
        }}></input>
    </div>
);
};
export default AccountPage;