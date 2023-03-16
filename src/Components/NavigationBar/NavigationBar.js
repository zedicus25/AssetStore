import {Link, Outlet} from 'react-router-dom'
import './NavigationBar.css';
import SearchBlock from '../SearchBlock/SearchBlock';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';






function NavigationBar(props){
    const [loginModalShow, setLoginModalShow] = useState(false);
    

    return(<div>
        <SearchBlock></SearchBlock>
        <nav className='justify-center'>
            <ul >
                <li >
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/threedpage'>3D</Link>
                </li>
                <li >
                    <Link  to='/twodpage'>2D</Link>
                </li>
                <li >
                    <Link  to='/addonspage'>Add-Ons</Link>
                </li>
                <li >
                    <Link  to='/audiopage'>Audio</Link>
                </li>
                <li >
                    <Link  to='/vfxpage'>VFX</Link>
                </li>
            </ul> 
            
        </nav>
        <div className='controls-btn'>
            <img onClick={() => setLoginModalShow(true)} className="icon login-icon" src="https://blobsassetstore.blob.core.windows.net/site/loginIcon.png" alt="login"></img>
            <img  className="icon" src="https://blobsassetstore.blob.core.windows.net/site/cartIcon.png" alt="cart"></img>
        </div>
        <LoginModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
        
    
        <Outlet></Outlet>
    </div>);
}
export default NavigationBar;