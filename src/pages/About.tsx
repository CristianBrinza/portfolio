import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Footer from '../components/Footer/Footer.tsx';
import PageContents from '../components/page_contents/PageContents.tsx';
import '../styles/About.css';

const aboutSections = [
  { id: 'about-story', label: 'Profile' },
  { id: 'about-work', label: 'Work' },
  { id: 'about-education', label: 'Education' },
  { id: 'about-connect', label: 'Connect' },
];

interface WorkItem {
  number: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  description?: string;
  projects?: { label: string; url: string }[];
}

const workGroups: { label: string; items: WorkItem[] }[] = [
  {
    label: 'Professional Experience',
    items: [
      {
        number: '01',
        company: 'Freelance',
        role: 'Full-Stack Developer and UI/UX Design',
        period: '2020 — Present',
        description:
          'I design and build complete websites for organizations and businesses, from interface and front-end implementation to backend development, deployment, and ongoing improvements.',
        projects: [
          { label: 'Science.md', url: 'https://www.science.md/ro/' },
          {
            label: 'Utilitas Energy',
            url: 'https://www.utilitasenergy.net/ro',
          },
          { label: 'Shades.md', url: 'https://shades.md/' },
          {
            label: 'Trafficking Escape',
            url: 'https://www.traffickingescape.com/',
          },
          { label: 'Spatium UTM', url: 'https://spatium.utm.md/' },
        ],
      },
      {
        number: '02',
        company: 'Moldtelecom',
        role: 'Full-Stack Developer',
        period: 'March 2023 — Present',
        location: 'Chișinău, Moldova',
        description:
          'Built more than 200 landing pages and delivered the official Zero website across front-end, backend, and DevOps. Improved UI/UX, created a reusable web kit and direct-mail experiences, optimized databases and loading performance, developed animations, wrote unit and integration tests, integrated APIs, documented code, and managed FTP server workflows.',
        projects: [{ label: 'Moldtelecom.md', url: 'https://moldtelecom.md/' }],
      },
    ],
  },
  {
    label: 'Internships',
    items: [
      {
        number: '01',
        company: 'EBS Integrator',
        role: 'React Front-End Developer',
        period: 'Summer 2022',
        projects: [
          {
            label: 'CEITI × EBS Internship',
            url: 'https://github.com/CristianBrinza/ceiti-ebs-internship',
          },
        ],
      },
      {
        number: '02',
        company: 'Esempla',
        role: 'Full-Stack Developer · UTM Practice',
        period: 'Summer 2023',
        projects: [
          {
            label: 'thePOS Project',
            url: 'https://github.com/FAF-UTM/thePOS',
          },
        ],
      },
      {
        number: '03',
        company: 'AMDARIS',
        role: 'Full-Stack Developer · UTM Practice',
        period: 'Winter 2023–2024',
        description:
          'Contributed to the StudySpace project as a full-stack developer.',
      },
    ],
  },
];

interface EducationItem {
  number: string;
  period: string;
  institution: string;
  program: string;
  courseLabel: string;
  courses: string[];
  professors?: string;
  address: string;
  map: string;
  website: string;
}

const education: EducationItem[] = [
  {
    number: '01',
    period: '2025 — Present',
    institution: 'Technical University of Moldova',
    program: "Master's Degree in Digital Marketing",
    courseLabel: 'Courses',
    courses: [
      'Inteligența artificială în business',
      'Marketing internațional',
      'Publicitate și planificare media',
      'Managementul proiectelor',
      'Comportamentul consumatorului',
      'Fundamentele marketingului',
      'Cercetări avansate de marketing',
    ],
    professors:
      'Dumitru Talmazan (Talmazan School), Dumitru Slonovschi (Magenta Consulting), V. Cunev (Deeplace), and others.',
    address: '9/7 Studenților Street, Chișinău, Moldova',
    map: 'https://maps.app.goo.gl/Le3h2QtwcFxHBGaf7',
    website: 'https://utm.md/en/',
  },
  {
    number: '02',
    period: '2021 — 2025',
    institution: 'Technical University of Moldova',
    program: 'Bachelor of Science in Software Engineering',
    courseLabel: 'Courses (first year)',
    courses: [
      'Data Structures',
      'Algorithms',
      'Applied Sciences',
      'Equivalent Models',
      'Numerical Methods',
      'Probability and Statistics Applied',
      'Discrete Math',
      'Ethics and Academic Integrity',
    ],
    address: '9/7 Studenților Street, Chișinău, Moldova',
    map: 'https://maps.app.goo.gl/Le3h2QtwcFxHBGaf7',
    website: 'https://utm.md/en/',
  },
  {
    number: '03',
    period: '2018 — 2022',
    institution:
      'Center of Excellence in Informatics and Information Technologies',
    program: 'Programming and Program Analysis',
    courseLabel: 'Courses',
    courses: [
      'OOP in C++',
      'Compilers',
      'Algorithms',
      'Operating Systems',
      'Data Structures',
      'Software Project Planning',
      'Database Support',
      'Basics of Legislation in the Field',
      'Structural and Procedural Programming',
      'SQL',
      'Visual Programming',
      'Information Processing',
    ],
    address: '48 Sarmizegetusa Street, Chișinău, Moldova',
    map: 'https://maps.app.goo.gl/eCz3HBmwwMMt6WqTA',
    website: 'https://ceiti.md/',
  },
];

export default function About() {
  const { i18n } = useTranslation();
  const language = ['en', 'ro', 'ru'].includes(i18n.resolvedLanguage ?? '')
    ? i18n.resolvedLanguage
    : 'en';
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.about_page</Trans> },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <main className="aboutPage" id="about-page">
        <header className="aboutPage_hero">
          <span className="aboutPage_eyebrow">( About / Profile )</span>
          <h1>
            Meet the designer
            <span>&amp; developer</span>
          </h1>

          <div className="aboutPage_heroBottom">
            <p>
              Software engineer and product designer based in Chișinău, building
              web products from interface to backend.
            </p>

            <div aria-hidden="true" className="aboutPage_motionMark">
              <svg viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="69" />
                <path d="M21 90h138" />
                <path d="M90 21v138" />
                <circle className="aboutPage_motionDot" cx="90" cy="21" r="7" />
              </svg>
              <span>Form / Function / Feeling</span>
            </div>
          </div>
        </header>

        <div className="aboutPage_layout">
          <PageContents id="about_page_contents" sections={aboutSections} />

          <article className="aboutPage_content">
            <section id="about-story">
              <div className="aboutPage_sectionNumber">(01)</div>
              <div className="aboutPage_sectionBody">
                <span className="aboutPage_sectionLabel">Profile</span>
                <h2>Software engineer and product designer.</h2>

                <div className="aboutPage_profileLayout">
                  <figure className="aboutPage_portrait">
                    <div className="aboutPage_portraitFrame">
                      <img
                        alt="Portrait of Cristian Brinza"
                        decoding="async"
                        height="2400"
                        loading="lazy"
                        src="/images/about/cristian-brinza-portrait.jpg"
                        width="2399"
                      />
                      <span aria-hidden="true">( Portrait / 01 )</span>
                    </div>
                    <figcaption>
                      <span>Cristian Brinza</span>
                      <span>Chișinău · MD</span>
                    </figcaption>
                  </figure>

                  <div>
                    <p className="aboutPage_profileCopy">
                      I design and develop websites and applications from
                      product structure and interface design through front-end
                      and backend implementation.
                    </p>

                    <dl className="aboutPage_facts">
                      <div>
                        <dt>Based in</dt>
                        <dd>Chișinău, Moldova</dd>
                      </div>
                      <div>
                        <dt>Education</dt>
                        <dd>Software Engineering · UTM</dd>
                      </div>
                      <div>
                        <dt>Languages</dt>
                        <dd>Romanian · English · Russian · French</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </section>

            <section id="about-work">
              <div className="aboutPage_sectionNumber">(02)</div>
              <div className="aboutPage_sectionBody">
                <span className="aboutPage_sectionLabel">Work</span>
                <h2>Professional experience and selected client work.</h2>

                {workGroups.map(group => (
                  <div className="aboutPage_workGroup" key={group.label}>
                    <h3 className="aboutPage_workGroupLabel">{group.label}</h3>
                    <div className="aboutPage_workList">
                      {group.items.map(item => (
                        <article
                          className="aboutPage_workCard"
                          key={item.number}
                        >
                          <div className="aboutPage_workHead">
                            <span>({item.number})</span>
                            <time>{item.period}</time>
                          </div>

                          <div className="aboutPage_workTitle">
                            <h3>{item.company}</h3>
                            <strong>{item.role}</strong>
                            {item.location && <small>{item.location}</small>}
                          </div>

                          {item.description && <p>{item.description}</p>}

                          {item.projects && (
                            <div className="aboutPage_projectLinks">
                              {item.projects.map(project => (
                                <a
                                  href={project.url}
                                  key={project.url}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  {project.label} ↗
                                </a>
                              ))}
                              {item.company === 'Freelance' && (
                                <span>and more</span>
                              )}
                            </div>
                          )}
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="about-education">
              <div className="aboutPage_sectionNumber">(03)</div>
              <div className="aboutPage_sectionBody">
                <span className="aboutPage_sectionLabel">Education</span>
                <h2>
                  Digital marketing, software engineering, and programming.
                </h2>

                <div className="aboutPage_educationList">
                  {education.map(item => (
                    <article
                      className="aboutPage_educationCard"
                      key={item.number}
                    >
                      <div className="aboutPage_educationHead">
                        <span>({item.number})</span>
                        <time>{item.period}</time>
                      </div>
                      <h3>{item.program}</h3>
                      <strong>{item.institution}</strong>
                      <p className="aboutPage_courseSummary">
                        <strong>{item.courseLabel}:</strong>{' '}
                        {item.courses.join(', ')}, …
                      </p>
                      {item.professors && (
                        <p className="aboutPage_professorSummary">
                          <strong>Professors include:</strong> {item.professors}
                        </p>
                      )}
                      <a
                        className="aboutPage_address"
                        href={item.website}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Website ↗
                      </a>
                      <a
                        className="aboutPage_address"
                        href={item.map}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.address} ↗
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="about-connect">
              <div className="aboutPage_sectionNumber">(04)</div>
              <div className="aboutPage_sectionBody">
                <span className="aboutPage_sectionLabel">Connect</span>
                <h2>Portfolio and professional profiles.</h2>

                <div className="aboutPage_links">
                  <a
                    href="https://github.com/CristianBrinza"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>GitHub</span>
                    <small>Code &amp; open source</small>
                    <b aria-hidden="true">↗</b>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/cristianbrinza/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>LinkedIn</span>
                    <small>Experience &amp; network</small>
                    <b aria-hidden="true">↗</b>
                  </a>
                  <Link to={`/${language}/portfolio`}>
                    <span>Portfolio</span>
                    <small>Selected projects</small>
                    <b aria-hidden="true">→</b>
                  </Link>
                  <a href="mailto:inbox.cristian.brinza@gmail.com">
                    <span>Email</span>
                    <small>Start a conversation</small>
                    <b aria-hidden="true">↗</b>
                  </a>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
