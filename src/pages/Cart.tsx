import React from 'react';
import { Link } from 'react-router-dom';

import { useCartStateContext } from '../contexts/cart';
import CartProduct from './../components/CartProduct';
import { PATH_HOME } from './../constants/pageRoutes';

const Cart: React.FC = () => {
    const { items } = useCartStateContext();

    return (
        <div data-test="page-cart">
            {!items.length ? (
                <>
                    <p>You currently have no items in your basket!</p>

                    <Link to={PATH_HOME} data-test="navbar-link-home">
                        Click Here to view the products again!
                    </Link>
                </>
            ) : (
                items.map(({ product, quantity }) => {
                    return (
                        <CartProduct
                            key={product.id}
                            quantity={quantity}
                            product={product}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Cart;
