import { Trans } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Footer from '../components/Footer/Footer.tsx';
import PageContents from '../components/page_contents/PageContents.tsx';
import '../styles/Legal.css';

interface LegalSubsection {
  bullets?: { label: string; text: string }[];
  paragraphs?: string[];
  title: string;
}

interface LegalSection {
  id: string;
  paragraphs?: string[];
  subsections?: LegalSubsection[];
  title: string;
}

const legalSections: LegalSection[] = [
  {
    id: 'legal-disclaimer',
    title: 'Legal Disclaimer and Limitation of Liability',
    paragraphs: [
      'This website and its associated content—including text, graphics, code, and multimedia—are provided solely for informational purposes. Nothing on this website constitutes legal, financial, technical, or other professional advice. You access and use the website at your own risk.',
      'All content is provided “as is” without express or implied warranties, including warranties of merchantability, fitness for a particular purpose, and non-infringement. No responsibility is assumed for errors or omissions, or for losses, injuries, or damages arising from reliance on information published here.',
      'To the fullest extent permitted by applicable law, I disclaim liability arising from access to or use of this website, including incidental, indirect, special, or consequential damages, regardless of the form of action.',
    ],
  },
  {
    id: 'contributing',
    title: 'Contributing Guidelines and Intellectual Property',
    subsections: [
      {
        title: 'Code of conduct',
        paragraphs: [
          'Contributions should support an inclusive, respectful, and collaborative environment.',
        ],
        bullets: [
          {
            label: 'Respect for diversity',
            text: 'Treat every person with respect regardless of race, ethnicity, gender identity, sexual orientation, disability, religion, or socioeconomic status.',
          },
          {
            label: 'No harassment',
            text: 'Harassment, bullying, discrimination, and abusive conduct are not tolerated. Contributions that violate this standard may be rejected.',
          },
        ],
      },
      {
        title: 'Intellectual property assignment',
        paragraphs: [
          'By submitting a contribution, you agree to assign the necessary intellectual-property rights, including copyright, unless a separate written agreement says otherwise. Submissions are governed by the licensing terms of the relevant project, such as the MIT License, GPL, or an equivalent license.',
        ],
      },
      {
        title: 'Submission guidelines',
        paragraphs: [
          'To make review and integration straightforward, contributions should meet the following requirements.',
        ],
        bullets: [
          {
            label: 'Quality control',
            text: 'Submit readable, documented, and tested code or design work.',
          },
          {
            label: 'Compatibility',
            text: 'Follow the project stack, architecture, and documented coding standards.',
          },
          {
            label: 'Pull requests',
            text: 'Include clear commit messages and explain the purpose and impact of each change.',
          },
          {
            label: 'Testing',
            text: 'Validate new behavior and provide relevant test cases whenever practical.',
          },
        ],
      },
      {
        title: 'Review process',
        paragraphs: [
          'Every contribution is subject to review. Review time depends on scope and complexity, and contributors may be asked to make adjustments before acceptance.',
        ],
      },
    ],
  },
  {
    id: 'cookies-policy',
    title: 'Cookies Policy and Tracking Technologies',
    subsections: [
      {
        title: 'What cookies are',
        paragraphs: [
          'Cookies are small pieces of data stored on your device. They can remember preferences, maintain security, and support consistent website functionality.',
        ],
      },
      {
        title: 'Categories used',
        bullets: [
          {
            label: 'Strictly necessary',
            text: 'Required for core functions such as security, consent storage, and language preferences.',
          },
          {
            label: 'Performance and analytics',
            text: 'Help measure website performance and understand how visitors interact with content.',
          },
          {
            label: 'Functionality',
            text: 'Remember choices that support a more consistent, personalized experience.',
          },
          {
            label: 'Marketing',
            text: 'May support campaign measurement or advertising-related services when you consent.',
          },
        ],
      },
      {
        title: 'Legal basis',
        paragraphs: [
          'Cookie use is governed by applicable data-protection law, including the GDPR where it applies. Optional technologies are used only when a valid legal basis exists, including consent where consent is required.',
        ],
      },
      {
        title: 'Managing cookies',
        paragraphs: [
          'You can manage optional categories through the website’s cookie settings and can also control cookies in your browser. Disabling necessary storage may affect some website features.',
        ],
      },
    ],
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy and Personal Data',
    subsections: [
      {
        title: 'Scope',
        paragraphs: [
          'This policy explains which personal data may be collected, how it is used and protected, and which choices and rights are available to you under applicable law.',
        ],
      },
      {
        title: 'Data that may be collected',
        bullets: [
          {
            label: 'Information you provide',
            text: 'Your name, email address, and other information included in forms or correspondence.',
          },
          {
            label: 'Usage and device data',
            text: 'Information such as IP address, browser type, device identifiers, and interaction patterns.',
          },
          {
            label: 'Cookies and similar technologies',
            text: 'Data collected according to the cookie choices described above.',
          },
        ],
      },
      {
        title: 'Why data is processed',
        bullets: [
          {
            label: 'Service delivery',
            text: 'Operate, maintain, secure, and improve the website.',
          },
          {
            label: 'Communication',
            text: 'Respond to questions, feedback, and requests.',
          },
          {
            label: 'Personalization',
            text: 'Remember preferences and improve the experience.',
          },
          {
            label: 'Analytics',
            text: 'Understand performance and usage when the required permission has been provided.',
          },
        ],
      },
      {
        title: 'Retention',
        paragraphs: [
          'Personal data is retained only for as long as needed for its stated purpose, to satisfy legal obligations, or to resolve disputes. Retention periods vary by data type and context.',
        ],
      },
      {
        title: 'Processors and international transfers',
        paragraphs: [
          'Service providers may process limited data on my behalf for hosting, analytics, communication, or other operational functions. They must process it only for the intended purpose and under appropriate contractual safeguards.',
          'When personal data is transferred internationally, safeguards required by applicable law—such as Standard Contractual Clauses—are used where necessary.',
        ],
      },
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Data-Protection Rights',
    paragraphs: [
      'Depending on where you live and which law applies, you may have the following rights regarding your personal data.',
    ],
    subsections: [
      {
        title: 'Available rights',
        bullets: [
          {
            label: 'Access',
            text: 'Request confirmation that your data is being processed and obtain a copy of it.',
          },
          {
            label: 'Rectification',
            text: 'Ask for inaccurate or incomplete personal data to be corrected.',
          },
          {
            label: 'Erasure',
            text: 'Request deletion when the data is no longer needed or has been processed unlawfully.',
          },
          {
            label: 'Portability',
            text: 'Receive eligible data in a structured, commonly used, machine-readable format.',
          },
          {
            label: 'Objection or restriction',
            text: 'Object to certain processing or ask for processing to be limited where the law allows.',
          },
          {
            label: 'Withdraw consent',
            text: 'Withdraw consent at any time without affecting processing that was lawful before withdrawal.',
          },
        ],
      },
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Links and Services',
    paragraphs: [
      'This website may link to websites, services, or platforms that I do not control. I am not responsible for their content, security, availability, or privacy practices. Review the policies of each third party before sharing information or using its services.',
      'By following a third-party link, you acknowledge that your interaction is governed by that third party’s terms and that I am not liable for loss or harm arising from its content or services.',
    ],
  },
  {
    id: 'policy-updates',
    title: 'Policy Updates',
    paragraphs: [
      'This page may be revised as the website, its services, or applicable requirements change. Material updates will be published here with a revised “Last updated” date. Continued use of the website after an update constitutes acceptance of the revised terms where permitted by law.',
    ],
  },
  {
    id: 'legal-contact',
    title: 'Contact',
    paragraphs: [
      'For questions about this page, privacy practices, cookie choices, or the exercise of data-protection rights, contact me using the details below.',
    ],
  },
];

const pageSections = legalSections.map(section => ({
  id: section.id,
  label: section.title,
}));

export default function Legal() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.legal_page</Trans> },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <main className="legalPage" id="legal-page">
        <header className="legalPage_hero">
          <span className="legalPage_eyebrow">( Legal / Privacy )</span>
          <h1>Legal, Privacy &amp; Compliance</h1>
          <div className="legalPage_intro">
            <p>
              Clear terms for using this website, contributing to projects, and
              understanding how privacy choices are handled.
            </p>
            <time dateTime="2026-07-19">Last updated · July 19, 2026</time>
          </div>
        </header>

        <div className="legalPage_layout">
          <PageContents id="legal_page_contents" sections={pageSections} />

          <article className="legalPage_document">
            {legalSections.map((section, index) => (
              <section id={section.id} key={section.id}>
                <div className="legalPage_number">
                  ({String(index + 1).padStart(2, '0')})
                </div>
                <div className="legalPage_sectionBody">
                  <h2>{section.title}</h2>

                  {section.paragraphs?.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {section.subsections?.map(subsection => (
                    <div
                      className="legalPage_subsection"
                      key={subsection.title}
                    >
                      <h3>{subsection.title}</h3>
                      {subsection.paragraphs?.map(paragraph => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {subsection.bullets && (
                        <ul>
                          {subsection.bullets.map(item => (
                            <li key={item.label}>
                              <strong>{item.label}.</strong> {item.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {section.id === 'legal-contact' && (
                    <a
                      className="legalPage_email"
                      href="mailto:inbox.cristian.brinza@gmail.com"
                    >
                      inbox.cristian.brinza@gmail.com ↗
                    </a>
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
