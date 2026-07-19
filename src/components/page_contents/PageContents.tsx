import { useEffect, useState } from 'react';
import './PageContents.css';

interface PageContentsProps {
  id?: string;
  sections: { id: string; label: string }[];
}

export default function PageContents({ sections, id }: PageContentsProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '');

  const smoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const elements = sections
      .map(section => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -68% 0px', threshold: 0 }
    );

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav aria-label="On this page" className="contents_component" id={id}>
      <div className="contents_component_title">On this page</div>
      <ol className="contents_component_list">
        {sections.map(({ id: sectionId, label }, index) => {
          const isActive = activeSection === sectionId;

          return (
            <li key={sectionId}>
              <button
                aria-current={isActive ? 'location' : undefined}
                className={`contents_component_link ${isActive ? 'contents_component_link_active' : ''}`}
                onClick={() => smoothScroll(sectionId)}
                type="button"
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {label}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
