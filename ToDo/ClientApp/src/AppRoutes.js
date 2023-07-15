import React from 'react';
import Home from './components/Home';
import About from './components/About/About.js'

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    },
];

export default AppRoutes;
