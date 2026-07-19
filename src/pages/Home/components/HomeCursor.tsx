import { useEffect, useRef } from 'react';
import styles from '../Home.module.css';

interface Point {
  x: number;
  y: number;
}

export default function HomeCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    if (!finePointer || !dotRef.current || !ringRef.current) return;

    const root = dotRef.current.closest<HTMLElement>('[data-theme]');
    if (!root) return;

    const dot = dotRef.current;
    const ringElement = ringRef.current;
    const mouse: Point = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const ring: Point = { ...mouse };
    const magnets = Array.from(
      root.querySelectorAll<HTMLElement>('[data-magnetic]')
    );
    const parallaxItems = Array.from(
      root.querySelectorAll<HTMLElement>('[data-home-parallax]')
    );
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      dot.dataset.visible = 'true';
      ringElement.dataset.visible = 'true';
      const target = event.target as Element | null;
      ringElement.dataset.active = String(
        Boolean(target?.closest('a, button, [data-cursor-grow]'))
      );
    };

    const onLeave = () => {
      dot.dataset.visible = 'false';
      ringElement.dataset.visible = 'false';
    };

    const animate = () => {
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      ringElement.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;

      magnets.forEach(magnet => {
        const bounds = magnet.getBoundingClientRect();
        const dx = mouse.x - (bounds.left + bounds.width / 2);
        const dy = mouse.y - (bounds.top + bounds.height / 2);
        const distance = Math.hypot(dx, dy);
        const radius = Math.max(bounds.width * 0.7, 70);
        if (distance < radius) {
          const pull = 0.12 * (1 - distance / radius);
          magnet.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
          magnet.style.transition = 'transform 80ms linear';
        } else {
          magnet.style.transform = 'translate(0, 0)';
          magnet.style.transition =
            'transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1)';
        }
      });

      const nx = mouse.x / window.innerWidth - 0.5;
      const ny = mouse.y / window.innerHeight - 0.5;
      parallaxItems.forEach(item => {
        const depth = Number(item.dataset.homeParallax) || 14;
        item.style.transform = `translate(${(-nx * depth).toFixed(1)}px, ${(-ny * depth).toFixed(1)}px)`;
      });

      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      magnets.forEach(magnet => {
        magnet.style.removeProperty('transform');
        magnet.style.removeProperty('transition');
      });
      parallaxItems.forEach(item => item.style.removeProperty('transform'));
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className={styles.cursorDot} ref={dotRef} />
      <div aria-hidden="true" className={styles.cursorRing} ref={ringRef} />
    </>
  );
}
