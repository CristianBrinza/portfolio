import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import styles from '../Home.module.css';

interface InfiniteMarqueeProps {
  items: string[];
}

export default function InfiniteMarquee({ items }: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(4);
  const [distance, setDistance] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const group = groupRef.current;
    if (!container || !group) return;

    const updateMarquee = () => {
      const groupWidth = group.getBoundingClientRect().width;
      if (groupWidth <= 0) return;
      setDistance(groupWidth);
      setCopies(Math.max(3, Math.ceil(container.clientWidth / groupWidth) + 2));
    };

    updateMarquee();
    const observer = new ResizeObserver(updateMarquee);
    observer.observe(container);
    observer.observe(group);
    document.fonts.ready.then(updateMarquee).catch(() => undefined);

    return () => observer.disconnect();
  }, [items]);

  return (
    <div aria-hidden="true" className={styles.marquee} ref={containerRef}>
      <div
        className={styles.marqueeTrack}
        style={{ '--marquee-distance': `${distance}px` } as CSSProperties}
      >
        {Array.from({ length: copies }, (_, groupIndex) => (
          <div
            className={styles.marqueeGroup}
            key={groupIndex}
            ref={groupIndex === 0 ? groupRef : undefined}
          >
            {items.map((item, itemIndex) => (
              <span key={`${item}-${itemIndex}`}>
                {item} <b>✦</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
