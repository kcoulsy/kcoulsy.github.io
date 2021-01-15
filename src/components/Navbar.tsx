import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStateContext } from '../contexts/cart';
import { PATH_CART, PATH_HOME } from './../constants/pageRoutes';

const Navbar: React.FC = () => {
    const { totalQuantity } = useCartStateContext();

    return (
        <nav data-test="component-navbar">
            <div>
                <Link to={PATH_HOME} data-test="navbar-link-home">
                    Home
                </Link>
                <Link to={PATH_CART} data-test="navbar-link-cart">
                    Cart {totalQuantity > 0 && `(${totalQuantity})`}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
