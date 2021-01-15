import React from 'react';

import { Product } from '../types';
import {
    useCartDispatchContext,
    CartActionType,
    useCartStateContext,
} from './../contexts/cart';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { items } = useCartStateContext();
    const dispatch = useCartDispatchContext();
    const productInCart = items.find(
        (cartItem) => cartItem.product.id === product.id,
    );
    const qtyInCart = productInCart?.quantity;

    const handleAddToCart = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        dispatch({
            type: CartActionType.AddToCart,
            payload: product,
        });
    };

    return (
        <div
            data-test="component-productcard"
            className="transition-all duration-150 flex w-full px-4 py-6 md:w-1/2 lg:w-1/3 "
        >
            <div className="card flex flex-col  m-2 p-3 md:p-6 bg-white rounded-lg shadow-2xl">
                <div className="flex-grow">
                    <p className="text-2xl uppercase text-gray-900 font-bold">
                        {product.name}
                    </p>
                </div>

                <div className="md:my-5 relative">
                    <img
                        src={product.img}
                        alt={product.name}
                        className="w-full object-cover object-center"
                        data-test="productcard-image"
                    />
                    {qtyInCart && (
                        <div className=" absolute bottom-0 w-full bg-gray-900">
                            <p className="text-center text-gray-200 text-md my-1 pl-2">
                                You have {qtyInCart} in your cart!
                            </p>
                        </div>
                    )}
                </div>
                <div className="grid gap-10">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
                        <p className="font-bold text-xl">£{product.price}</p>
                        <button
                            data-test="productcard-addtocart"
                            onClick={handleAddToCart}
                            className="px-4 py-1 text-sm transition ease-in duration-200 uppercase rounded-md hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
