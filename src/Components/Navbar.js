import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Styles.css';

const NavBar = () => {
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();
    React.useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);
    const getLinkClassName = (path) => (
        path === activeLink ? 'navbarItems active' : 'navbarItems'
    );

    return (
        <div className='container'>
            <h2 className='icon'>INDIA TV</h2>
            <nav className='navbar'>
                <Link to="/home" className={getLinkClassName('/home')}
                    onClick={() => setActiveLink('/home')}>Home</Link>
                <Link to="/about" className={getLinkClassName('/about')}
                    onClick={() => setActiveLink('/about')}>About Us</Link>
                <Link to="/services" className={getLinkClassName('/services')}
                    onClick={() => setActiveLink('/services')}>Services</Link>
                <Link to="/gallery" className={getLinkClassName('/gallery')}
                    onClick={() => setActiveLink('/gallery')}>Gallery</Link>
                <Link to="/contact" className={getLinkClassName('/contact')}
                    onClick={() => setActiveLink('/contact')}>Contact Us</Link>
            </nav>
        </div>
    );
};

export default NavBar;
