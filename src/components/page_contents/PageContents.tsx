import { useState, useEffect } from 'react';
import './PageContents.css';

interface PageContentsProps {
  sections: { id: string; label: string }[];
  id?: string; // Add the optional id property
}

export default function PageContents({ sections, id }: PageContentsProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  const smoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset - 30;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is at most 100px from the top of the page
          if (rect.top <= 100 && rect.top >= -100) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div id={id} className={styles.contents_component}>
      <div className={styls.contents_component_title}>On this page</div>
      {sections.map(({ id, label }) => (
        <div
          key={id}
          className={`contents_component_link ${activeSection === id ? 'contents_component_link_active' : ''}`}
          onClick={() => smoothScroll(id)}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
