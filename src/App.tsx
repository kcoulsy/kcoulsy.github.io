import React from 'react';
import { Link } from 'react-router-dom';

import AppRouter from './AppRouter';
import { PATH_CART, PATH_HOME } from './constants/pageRoutes';

function App() {
    return (
        <AppRouter>
            <ul>
                <li>
                    <Link to={PATH_HOME}>Home</Link>
                </li>
                <li>
                    <Link to={PATH_CART}>Cart</Link>
                </li>
            </ul>
        </AppRouter>
    );
}

export default App;
