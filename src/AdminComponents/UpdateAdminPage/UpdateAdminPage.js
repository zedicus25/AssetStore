import AdminNavigationBar from '../AdminNavigationBar/AdminNavigationBar';
import './UpdateAdminPage.css'
import token from '../../jwtToken';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const UpdateAdminPage = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const managerInfo = token.getUserData();
        if(managerInfo.Admin === false)
          navigate('/');
      },[]);

    return(
        <>
        <AdminNavigationBar></AdminNavigationBar>
         <div className='page'>
            Some
        </div>
        </>
       
    );
}
export default UpdateAdminPage;