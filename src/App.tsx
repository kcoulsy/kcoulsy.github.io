import React from 'react';

import AppRouter from './AppRouter';
import Navbar from './components/Navbar';
import CartContextProvider from './contexts/cart';

function App() {
    return (
        <CartContextProvider>
            <AppRouter>
                <Navbar />
            </AppRouter>
        </CartContextProvider>
    );
}

export default App;
