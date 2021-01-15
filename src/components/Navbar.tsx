import React from 'react';
import { Link } from 'react-router-dom';

import { useCartStateContext } from '../contexts/cart';
import { PATH_CART, PATH_HOME } from './../constants/pageRoutes';
import Icon, { IconType } from './Icon';

const Navbar: React.FC = () => {
    const { totalQuantity } = useCartStateContext();

    return (
        <header data-test="component-navbar" className="bg-gray-100">
            <nav className="container mx-auto flex items-center justify-between w-full text-gray-800 p-4">
                <Link
                    to={PATH_HOME}
                    data-test="navbar-link-home"
                    className="font-semibold text-3xl tracking-tight hover:text-gray-600"
                >
                    PLT
                </Link>
                <div className="md:items-center md:w-auto flex">
                    <Link
                        to={PATH_CART}
                        data-test="navbar-link-cart"
                        className="block text-gray-800 mr-4 font-bold hover:text-gray-600"
                    >
                        <Icon icon={IconType.Basket} styles="w-8 h-8 mx-auto" />
                        Cart {totalQuantity > 0 && `(${totalQuantity})`}
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
