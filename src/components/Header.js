import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="menu-item">
                <h3 className="links"><Link to='/'>Users</Link></h3>
            </div>
            <div>
                <h3><Link to='/posts'>Posts</Link></h3>
            </div>
        </div>
    )
}

export default Header;