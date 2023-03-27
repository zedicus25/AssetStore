import { useState } from "react";
import { Link } from "react-router-dom";
import './ManagerNavBar.css';
import token from '../../jwtToken';
import { useNavigate } from 'react-router-dom';

function ManagerNavBar(){

    const [prodControls, setProdControls] = useState(false);
    const [catControls, setCatControls] = useState(false);
    
    const [subCatControls, setSubCatControls] = useState(false);

    const navigate = useNavigate();
    const logOut = () => {
        token.logOut();
        navigate('/');
    }

    return(
        <div className="manager-nav">
            <ul>
                <li onClick={() => setCatControls(!catControls)}>
                    <div>
                        <h5><Link to='/manager/addproductpanel'>Add products</Link></h5>
                    </div>
                </li>
                <li onClick={() => setCatControls(!catControls)}>
                    <div>
                        <h5><Link to='/manager/updateproductpanel'>Update products</Link></h5>
                    </div>
                </li>
                <li onClick={() => setCatControls(!catControls)}>
                    <div>
                        <h5><Link to='/manager/categoriesmanagmentpanel'>Update categories</Link></h5>
                    </div>
                </li>
                <li onClick={() => setSubCatControls(!subCatControls)}>
                <div>
                        <h5><Link to='/manager/subcategoriesmanagmentpanel'>Update sub-categories</Link></h5>
                    </div>
                </li>
                <li><input onClick={() => navigate('/')} className='logout-btn' type='button' value='Back'></input></li>
                <li><input onClick={() => logOut()} className='logout-btn' type='button' value='Exit'></input></li>
            </ul>
        </div>
    );
}

export default ManagerNavBar;