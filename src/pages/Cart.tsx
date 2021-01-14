import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCartStateContext } from '../contexts/cart';
import CartProduct from './../components/CartProduct';
import { PATH_HOME } from './../constants/pageRoutes';
import { fetchCart } from '../actions';
import { Product } from '../types';

const Cart: React.FC = () => {
    const cartItems = useCartStateContext();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const itemIds = cartItems.map((cartItem) => cartItem.productId);
        if (itemIds.length) {
            setLoading(true);
            fetchCart(itemIds).then((response) => {
                setLoading(false);
                setProducts(response.data);
            });
        }
    }, []);

    if (loading) {
        return <>Loading cart</>;
    }

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
                    const product = products.find(
                        (product) => product.id === cartItem.productId,
                    );
                    if (!product) return null;
                    return (
                        <CartProduct
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            product={product}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Cart;
