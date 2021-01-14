import React from 'react';

import AppRouter from './AppRouter';
import Navbar from './components/Navbar';

function App() {
    return (
        <AppRouter>
            <Navbar />
        </AppRouter>
    );
}

export default App;
