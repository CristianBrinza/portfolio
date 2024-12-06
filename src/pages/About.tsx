import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Page from '../components/Page.tsx';
import Footer from '../components/Footer/Footer.tsx';
import PageContents from '../components/page_contents/PageContents.tsx';
import '../styles/About.css';
import DynamicMeta from '../components/DynamicMeta/DynamicMeta.tsx';

export default function About() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.about_page</Trans> },
  ];

  const sections = [
    { id: 'about_page_text', label: 'About' },
    { id: 'about_page_text_title_2', label: 'Education' },
    { id: 'about_page_text_title_3', label: 'More' },
  ];

  return (
    <>
      <DynamicMeta
        title="Cristian Brinza - About me"
        description="This the About me page"
        keywords="Portfolio, About me, Cristian Brinza"
      />
      <Breadcrumb items={breadcrumbItems} />
      <Page gap="50px" id="about_page">
        <div id="about_page_text">
          <div>
            <div>
              <div id="about_page_title">
                Meet the Designer <br />
                and Developer <br />
              </div>

              <div id="about_page_title_small">
                "The Person Behind the Projects"
              </div>

              <div id="about_page_text_first_sub_block">
                <div
                  className="about_page_text_color"
                  style={{ marginTop: '10px' }}
                >
                  Hi, I'm Cristian Brinza. As a proficient Developer, I have a
                  passion for visually appealing and user-friendly websites,
                  applications and other types of projects. Proven my ability to
                  deliver high-quality work, adapt to new technologies,
                  collaborate with cross-functional teams, and stay currently
                  with industry trends. I am a young software-engineer student,
                  at the beginning of my career, having a ton of ambitious ideas
                  and the motivation and discipline to realize them in
                  management, design and development.
                </div>
              </div>
              <img
                src="/images/.jpg"
                style={{ display: 'none' }}
                id="about_page_img"
                alt="About Me"
              />
              <br />
              <div>
                <b>Age:</b>{' '}
                <span className="about_page_text_color">22 years</span>
              </div>
              <div>
                <b>Location:</b>{' '}
                <span className="about_page_text_color">
                  Chisinau, Moldova Republic of
                </span>
              </div>
              <div>
                <b>Languages:</b>{' '}
                <span className="about_page_text_color">
                  Romanian (maternal); English, Russian (High level); French
                  (intermediate)
                </span>
              </div>
            </div>

            <div className="about_page_text_title" id="about_page_text_title_2">
              Education
            </div>

            <div
              style={{ marginTop: '10px' }}
              className="about_page_text_color"
            >
              <b>Technical University of Moldova</b>
              <br />
              <div style={{ marginLeft: '10px' }}>
                Bachelor of Science of Software Engineering (EnglishTaught
                Honors Program on Software Engineering)
                <br />
                <div style={{ margin: '5px 0' }}>
                  • Courses: (First year) Data structures and algorithms,
                  Applied Sciences, Equivalent Models, Numerical methods,
                  Probability and statistics applied, Discrete math, Ethics and
                  Academic Integrity, …
                </div>
                <a href="https://maps.app.goo.gl/Le3h2QtwcFxHBGaf7">
                  9/7 Sudenilor street, Chisinau, Moldova
                </a>
                , <a href="https://utm.md/en/">https://utm.md/en/</a>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <b>
                I.P. Center of Excellence in Informatics and Information
                Technologies
              </b>
              <br />
              <div style={{ marginLeft: '10px' }}>
                Baccalaureate diploma and Programming and Program Analysis
                Student
                <div style={{ margin: '5px 0' }}>
                  • Courses: OOP in C++, Compilers, Algorithms, Operating
                  Systems, Data Structures, Software project planning, Database
                  support, Basics of legislation in the field, Structural and
                  procedural programming, SQL, Visual programming, Information
                  processing, …
                </div>
                <a href="https://maps.app.goo.gl/eCz3HBmwwMMt6WqTA">
                  48 Sarmizegetusa, Chișinău, Republic of Moldova
                </a>
                , <a href="https://ceiti.md/">https://ceiti.md/</a>
              </div>
            </div>
          </div>

          <div>
            <div className="about_page_text_title" id="about_page_text_title_3">
              Useful Links
            </div>
            <div>
              <b>Github: </b>
              <a href="https://www.github.com/CristianBrinza">
                github.com/CristianBrinza
              </a>
            </div>
            <div>
              <b>LinkedIn: </b>
              <a href="https://www.linkedin.com/in/cristianbrinza/">
                linkedin.com/in/cristianbrinza/
              </a>
            </div>
          </div>
        </div>
        {/* Use the PageContents component */}
        <PageContents id="about_page_contents" sections={sections} />
      </Page>
      <Footer />
    </>
  );
}
