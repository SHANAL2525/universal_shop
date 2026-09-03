import { useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';

export function AppShell() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef(new Map<string, number>());

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const historyKey = location.key;
    const targetPosition = navigationType === 'POP'
      ? scrollPositions.current.get(historyKey) ?? 0
      : 0;

    window.scrollTo({ top: targetPosition, left: 0, behavior: 'auto' });

    return () => {
      scrollPositions.current.set(historyKey, window.scrollY);
    };
  }, [location.key, navigationType]);

  return <Outlet/>;
}
