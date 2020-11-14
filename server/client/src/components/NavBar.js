import logo from '../logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ mainLink, links }) => (
    <nav className='navbar navbar-expand-sm navbar-light bg-light'>
        <a href='/' className='navbar-brand'>
            <img src={logo} alt='logo' width='30' height='30' />
        </a>
        <Link to={mainLink.to} className='navbar-brand'>
            {mainLink.text}
        </Link>
        <div className='collpase navbar-collapse'>
            <ul className='navbar-nav mr-auto'>
                {links.map(link => (
                    <li className='navbar-item'>
                        <Link to={link.to} className='nav-link'>
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
);

export default NavBar;
