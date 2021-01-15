import React from 'react';
import { Link } from 'react-router-dom';

import { useCartStateContext } from '../contexts/cart';
import CartProduct from './../components/CartProduct';
import { PATH_HOME } from './../constants/pageRoutes';

const Cart: React.FC = () => {
    const { items, totalPrice } = useCartStateContext();

    return (
        <div data-test="page-cart" className="container mx-auto mt-6">
            <div className="mx-10 md:mx-0">
                <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                    Cart
                </h2>
            </div>
            {!items.length ? (
                <div className="w-100 flex flex-col justify-center items-center mt-4">
                    <p data-test="cart-no-items" className="text-xl">
                        You currently have no items in your basket!
                    </p>

                    <Link
                        to={PATH_HOME}
                        data-test="cart-link-home"
                        className="mt-2 text-blue-500 text-md"
                    >
                        Click Here to view the products again!
                    </Link>
                </div>
            ) : (
                <div className="px-10">
                    <table className="w-full text-sm lg:text-base">
                        <thead>
                            <tr className="h-12 uppercase">
                                <th className="hidden md:table-cell"></th>
                                <th className="text-left">Product</th>
                                <th className="text-right pl-5 lg:pl-0 pr-2">
                                    Quantity
                                </th>
                                <th className="text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(({ product, quantity }) => {
                                return (
                                    <CartProduct
                                        key={product.id}
                                        quantity={quantity}
                                        product={product}
                                    />
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="p-4 md:w-1/2 md:float-right justify-center flex flex-col items-right">
                        <div className="flex justify-between pt-4 border-b">
                            <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                Total
                            </div>
                            <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                £{totalPrice}
                            </div>
                        </div>
                        <div>
                            <button className="float-right flex justify-center items-center px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                                <svg
                                    aria-hidden="true"
                                    data-prefix="far"
                                    data-icon="credit-card"
                                    className="w-8"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                                    />
                                </svg>
                                <span className="ml-2 mt-5px">
                                    Procceed to checkout
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
