import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { LoadingSkeleton } from './components/shared/LoadingSkeleton';
const CataloguePage = lazy(() => import('./pages/CataloguePage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const router = createBrowserRouter([{ element: <AppShell/>, children: [{ path: '/', element: <CataloguePage/> }, { path: '/product/:slug', element: <ProductDetailsPage/> }, { path: '*', element: <NotFoundPage/> }] }]);
export default function App() { return <Suspense fallback={<div className="container loading-wrap"><LoadingSkeleton/></div>}><RouterProvider router={router}/></Suspense>; }
