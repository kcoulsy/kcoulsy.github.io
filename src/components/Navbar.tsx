import React from 'react';
import { Link } from 'react-router-dom';
import { PATH_CART, PATH_HOME } from './../constants/pageRoutes';

const Navbar: React.FC = () => {
    return (
        <nav data-test="component-navbar">
            <div>
                <Link to={PATH_HOME} data-test="navbar-link-home">
                    Home
                </Link>
                <input
                    placeholder="Search items..."
                    data-test="navbar-search"
                />
                <Link to={PATH_CART} data-test="navbar-link-cart">
                    Cart
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
