import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStateContext } from '../contexts/cart';
import { PATH_CART, PATH_HOME } from './../constants/pageRoutes';

const Navbar: React.FC = () => {
    const cartItems = useCartStateContext();
    const totalQty = cartItems.reduce((acc, curr) => {
        acc += curr.quantity;
        return acc;
    }, 0);

    return (
        <nav data-test="component-navbar">
            <div>
                <Link to={PATH_HOME} data-test="navbar-link-home">
                    Home
                </Link>
                <Link to={PATH_CART} data-test="navbar-link-cart">
                    Cart {totalQty > 0 && `(${totalQty})`}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
