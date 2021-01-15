import React from 'react';
import { Link } from 'react-router-dom';

import { useCartStateContext } from '../contexts/cart';
import CartProduct from './../components/CartProduct';
import { PATH_HOME } from './../constants/pageRoutes';

const Cart: React.FC = () => {
    const cartItems = useCartStateContext();

    return (
        <div data-test="page-cart">
            {!cartItems.length ? (
                <>
                    <p>You currently have no items in your basket!</p>

                    <Link to={PATH_HOME} data-test="navbar-link-home">
                        Click Here to view the products again!
                    </Link>
                </>
            ) : (
                cartItems.map((cartItem) => {
                    return (
                        <CartProduct
                            key={cartItem.product.id}
                            quantity={cartItem.quantity}
                            product={cartItem.product}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Cart;
