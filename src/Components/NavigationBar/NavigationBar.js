import {Link, Outlet} from 'react-router-dom'
import './NavigationBar.css';
import SearchBlock from '../SearchBlock/SearchBlock';
import token from '../../jwtToken';

import { useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import BusketModal from '../BusketModal/BusketModal';

function NavigationBar(props){
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [busketModal, setbusketModalShow] = useState(false);
    
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
            <Link to='/account' className='nick'>{token.getUserData().username === "" ? "" : token.getUserData().username}</Link>
            <img onClick={() => setLoginModalShow(true)} className="icon login-icon" src="user_icon.png" alt="login"></img>
            <img onClick={() => setbusketModalShow(true)}  className="icon" src="cart_icon.png" alt="cart"></img>
        </div>
        <LoginModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
        <BusketModal show={busketModal} onHide={() => setbusketModalShow(false)}></BusketModal>
    
        <Outlet></Outlet>
    </div>);
}
export default NavigationBar;