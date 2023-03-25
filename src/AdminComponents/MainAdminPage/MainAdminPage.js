import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import token from '../../jwtToken';
import AdminNavigationBar from "../AdminNavigationBar/AdminNavigationBar";

const MainAdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const managerInfo = token.getUserData();
    if(managerInfo.Admin === false)
      navigate('/');
  });
    return(
      <div className="admin-main-page">
        <AdminNavigationBar></AdminNavigationBar>
      </div>
    );
  }
  export default MainAdminPage;