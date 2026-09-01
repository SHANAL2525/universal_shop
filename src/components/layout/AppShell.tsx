import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ShopFooter } from './ShopFooter';
import { ShopHeader } from './ShopHeader';

export function AppShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return <><ShopHeader/><main><Outlet/></main><ShopFooter/></>;
}
