import AdminNavigationBar from '../AdminNavigationBar/AdminNavigationBar';
import './UpdateUsersPage.css'
import token from '../../jwtToken';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UsersTabel from '../UsersTabel/UsersTabel';

const UpdateUsersPage = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const managerInfo = token.getUserData();
        if (managerInfo.Admin === false)
            navigate('/');
    }, []);
    return (
        <>
            <AdminNavigationBar></AdminNavigationBar>
            <div className='page'>
                <UsersTabel></UsersTabel>
            </div>
        </>

    );
}
export default UpdateUsersPage;