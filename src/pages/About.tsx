import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Footer from '../components/Footer/Footer.tsx';
import PageContents from '../components/page_contents/PageContents.tsx';
import '../styles/About.css';

const aboutSections = [
  { id: 'about-story', label: 'Profile' },
  { id: 'about-education', label: 'Education' },
  { id: 'about-connect', label: 'Connect' },
];

const education = [
  {
    number: '01',
    institution: 'Technical University of Moldova',
    program: 'Bachelor of Science in Software Engineering',
    courses: [
      'Data Structures',
      'Algorithms',
      'Applied Sciences',
      'Numerical Methods',
      'Probability',
      'Discrete Math',
    ],
    address: '9/7 Studenților Street, Chișinău, Moldova',
    map: 'https://maps.app.goo.gl/Le3h2QtwcFxHBGaf7',
    website: 'https://utm.md/en/',
  },
  {
    number: '02',
    institution:
      'Center of Excellence in Informatics and Information Technologies',
    program: 'Programming and Program Analysis',
    courses: [
      'OOP / C++',
      'Compilers',
      'Operating Systems',
      'SQL',
      'Databases',
      'Visual Programming',
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

            <section id="about-education">
              <div className="aboutPage_sectionNumber">(02)</div>
              <div className="aboutPage_sectionBody">
                <span className="aboutPage_sectionLabel">Education</span>
                <h2>Software engineering and programming education.</h2>

                <div className="aboutPage_educationList">
                  {education.map(item => (
                    <article
                      className="aboutPage_educationCard"
                      key={item.number}
                    >
                      <div className="aboutPage_educationHead">
                        <span>({item.number})</span>
                        <a href={item.website} rel="noreferrer" target="_blank">
                          Website ↗
                        </a>
                      </div>
                      <h3>{item.institution}</h3>
                      <strong>{item.program}</strong>
                      <div className="aboutPage_courseList">
                        {item.courses.map(course => (
                          <span key={course}>{course}</span>
                        ))}
                      </div>
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
              <div className="aboutPage_sectionNumber">(03)</div>
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
