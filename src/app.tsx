import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import './styles/reset.scss';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<RouterProvider router={router} />);
