import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { routes } from './config/routes.config';

const TemplateSelectorPage = lazy(() => import('./pages/TemplateSelectorPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const Style01Shell = lazy(() => import('./templates/clothing/style-01/Shell'));
const Style01Catalogue = lazy(() => import('./templates/clothing/style-01/CatalogueView'));
const Style01Product = lazy(() => import('./templates/clothing/style-01/ProductDetailsView'));
const Style02Shell = lazy(() => import('./templates/clothing/style-02/Shell'));
const Style02Catalogue = lazy(() => import('./templates/clothing/style-02/CatalogueView'));
const Style02Product = lazy(() => import('./templates/clothing/style-02/ProductDetailsView'));
const Style03Shell = lazy(() => import('./templates/clothing/style-03/Shell'));
const Style03Catalogue = lazy(() => import('./templates/clothing/style-03/CatalogueView'));
const Style03Product = lazy(() => import('./templates/clothing/style-03/ProductDetailsView'));

const router = createBrowserRouter([{
  element: <AppShell/>,
  children: [
    { path: routes.selector, element: <TemplateSelectorPage/> },
    {
      path: routes.clothing('style-01'),
      element: <Style01Shell/>,
      children: [
        { index: true, element: <Style01Catalogue/> },
        { path: 'product/:slug', element: <Style01Product/> },
      ],
    },
    {
      path: routes.clothing('style-02'),
      element: <Style02Shell/>,
      children: [
        { index: true, element: <Style02Catalogue/> },
        { path: 'product/:slug', element: <Style02Product/> },
      ],
    },
    {
      path: routes.clothing('style-03'),
      element: <Style03Shell/>,
      children: [
        { index: true, element: <Style03Catalogue/> },
        { path: 'product/:slug', element: <Style03Product/> },
      ],
    },
    { path: '*', element: <NotFoundPage/> },
  ],
}]);

export default function App() {
  return <Suspense fallback={<div className="app-loading" role="status">Loading preview…</div>}><RouterProvider router={router}/></Suspense>;
}
