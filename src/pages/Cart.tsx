import React from 'react';
import { useCartStateContext } from '../contexts/cart';
import CartProduct from './../components/CartProduct';
import { Link } from 'react-router-dom';
import { PATH_HOME } from './../constants/pageRoutes';

const Cart: React.FC = () => {
    const cartItems = useCartStateContext();
    return (
        <>
            {!cartItems.length ? (
                <>
                    <p>You currently have no items in your basket!</p>

                    <Link to={PATH_HOME} data-test="navbar-link-home">
                        Click Here to view the products again!
                    </Link>
                </>
            ) : (
                cartItems.map((cartItem) => (
                    <CartProduct
                        key={cartItem.productId}
                        productId={cartItem.productId}
                        quantity={cartItem.quantity}
                    />
                ))
            )}
        </>
    );
};

export default Cart;
