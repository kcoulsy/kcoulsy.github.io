import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { PATH_CART, PATH_HOME } from './constants/pageRoutes';
import Home from './pages/Home';
import Cart from './pages/Cart';

const AppRouter: React.FC = ({ children }) => {
    return (
        <Router>
            {children}
            <Switch>
                <Route exact path={PATH_HOME}>
                    <Home />
                </Route>
                <Route path={PATH_CART}>
                    <Cart />
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;
