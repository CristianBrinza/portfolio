import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Page from '../components/Page.tsx';
import Title from '../components/Text/Title/Title.tsx';
import Parapraph from '../components/Text/Parapraph/Parapraph.tsx';
import { t } from 'i18next';
import Footer from '../components/Footer/Footer.tsx';

export default function About() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.about_page</Trans> },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Page gap="50px">
        <div>
          <Title>About</Title>
          <Parapraph style={{ marginTop: '10px' }}>
            {t('about_me.self_description')}
          </Parapraph>

          <br />
          <div>
            <b>Age:</b> 22 years
          </div>
          <div>
            <b>Location:</b> Chisinau, Moldova Republic of
          </div>
          <div>
            <b>Languages:</b> Romanian (maternal); English, Russian (High
            level); French (intermediate)
          </div>
          <div style={{ height: '10px' }}></div>
        </div>
        <div>
          <Title>Education</Title>

          <div style={{ marginTop: '10px' }}>
            <b> Technical University of Moldova</b>
            <br />
            <div style={{ marginLeft: '10px' }}>
              Bachelor of Science of Software Engineering (EnglishTaught Honors
              Program on Software Engineering)
              <br />
              <div style={{ margin: '5px 0' }}>
                • Courses: (First year) Data structures and algorithms, Applied
                Sciences, Equivalent Models, Numerical methods, Probability and
                statistics applied, Discrete math, Ethics and Academic
                Integrity, …
              </div>
              <a href="https://maps.app.goo.gl/Le3h2QtwcFxHBGaf7">
                9/7 Sudenilor street, Chisinau, Moldova
              </a>
              , <a href="https://utm.md/en/">https://utm.md/en/</a>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <b>
              {' '}
              I.P. Center of Excellence in Informatics and Information
              Technologies
            </b>
            <br />
            <div style={{ marginLeft: '10px' }}>
              Baccalaureate diploma and Programing and Program Analysis Student
              <div style={{ margin: '5px 0' }}>
                • Courses: OOP in C++, Compilers, Algorithms, Operating Systems,
                Data Structures, Software project planning, Database support,
                Basics of legislation in the field, Structural and procedural
                programming, SQL, Visual programming, Information processing, …
              </div>
              <a href="https://maps.app.goo.gl/eCz3HBmwwMMt6WqTA">
                48 Sarmizegetusa, Chișinău, Republic of Moldova , Chisinau,
                Moldova{' '}
              </a>
              , <a href="https://ceiti.md/">https://ceiti.md/</a>
            </div>
          </div>
        </div>

        <div>
          <Title>Useful Links</Title>
          <div>
            <b>Github: </b>
            <a href="https://www.github.com/CristianBrinza">
              github.com/CristianBrinza
            </a>
          </div>
          <div>
            <b>Linkedin: </b>
            <a href="https://www.linkedin.com/in/cristianbrinza/">
              linkedin.com/in/cristianbrinza/
            </a>
          </div>
        </div>
      </Page>
      <Footer />
    </>
  );
}
