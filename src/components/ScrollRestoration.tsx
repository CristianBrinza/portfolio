import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

interface ScrollPosition {
  x: number;
  y: number;
}

function scrollImmediately({ x, y }: ScrollPosition) {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  // The home page enables smooth scrolling globally. Route changes should not
  // animate from the previous page's scroll depth to the new position.
  root.style.scrollBehavior = 'auto';
  window.scrollTo(x, y);
  root.style.scrollBehavior = previousScrollBehavior;
}

export default function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map<string, ScrollPosition>());
  const isInitialRender = useRef(true);
  const previousDocument = useRef(`${location.pathname}${location.search}`);

  useLayoutEffect(() => {
    const previousMode = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousMode;
    };
  }, []);

  useLayoutEffect(() => {
    const locationKey = location.key;
    const documentKey = `${location.pathname}${location.search}`;
    const documentChanged = previousDocument.current !== documentKey;

    previousDocument.current = documentKey;

    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else if (documentChanged) {
      const restoredPosition =
        navigationType === 'POP' ? positions.current.get(locationKey) : null;

      scrollImmediately(restoredPosition ?? { x: 0, y: 0 });
    }

    const savePosition = () => {
      positions.current.set(locationKey, {
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', savePosition, { passive: true });

    return () => {
      savePosition();
      window.removeEventListener('scroll', savePosition);
    };
  }, [location.key, location.pathname, location.search, navigationType]);

  return null;
}
