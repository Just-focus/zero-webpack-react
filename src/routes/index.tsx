import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/home';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage labelOn="On" labelOff="Off" />,
	},
]);

export default router;
