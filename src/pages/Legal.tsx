import { Trans } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Title from '../components/Text/Title/Title.tsx';
import Page from '../components/Page.tsx';
import Footer from '../components/Footer/Footer.tsx';
import '../styles/Legal.css';
import PageContents from '../components/page_contents/PageContents.tsx';

export default function Legal() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.legal_page</Trans> },
  ];

  const sections = [
    { id: 'legal_page_text_title_1', label: 'Legal Disclaimer' },
    { id: 'legal_page_text_title_2', label: 'Contributing' },
    { id: 'legal_page_text_title_3', label: 'Cookies Policy' },
    { id: 'legal_page_text_title_4', label: 'Privacy Policy' },
    { id: 'legal_page_text_title_5', label: 'Your Rights' },
    { id: 'legal_page_text_title_6', label: 'Third-Party ' },
    { id: 'legal_page_text_title_7', label: 'Modifications' },
    { id: 'legal_page_text_title_8', label: 'Contact' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <Page gap="20px" id="legal_page">
        <div id="legal_page_text">
          <Title>Legal, Privacy, and Compliance</Title>
          <div>
            <div className="legal_page_title" id="legal_page_text_title_1">
              1. Legal Disclaimer and Limitation of Liability
            </div>
            <div>
              &nbsp;&nbsp;&nbsp; This website and all associated content,
              including but not limited to, text, graphics, code, and
              multimedia, are provided solely for informational purposes. The
              content does not constitute professional advice, whether legal,
              financial, or technical. By accessing and using this website, you
              agree that your engagement with the content is entirely at your
              own risk.
              <br />
              <br />
              &nbsp;&nbsp;&nbsp; All content is provided “as is,” without
              warranty of any kind, either express or implied, including but not
              limited to, implied warranties of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              rights. No responsibility or liability is assumed for any errors
              or omissions in the content, nor for any losses, injuries, or
              damages (whether direct, indirect, special, incidental, or
              consequential) arising from reliance on the information contained
              herein.
              <br />
              <br />
              &nbsp;&nbsp;&nbsp; To the fullest extent permissible under
              applicable law, I disclaim any and all liability arising from
              access to or use of this website, including liability for
              incidental or consequential damages, regardless of the nature of
              the cause of action.
            </div>
          </div>
          <div>
            <div>
              <div className="legal_page_title" id="legal_page_text_title_2">
                2. Contributing Guidelines and Intellectual Property Rights
              </div>
              <div className="legal_page_subtitle">Code of Conduct</div>
              &nbsp;&nbsp;&nbsp; In the spirit of fostering an inclusive and
              collaborative environment, all contributions must adhere to a
              clearly defined code of conduct. This includes, but is not limited
              to:
              <br />
              &nbsp;&nbsp;&nbsp; • Respect for Diversity: Contributors must
              treat all individuals with respect, regardless of race, ethnicity,
              gender identity, sexual orientation, or socioeconomic status.{' '}
              <br />
              &nbsp;&nbsp;&nbsp; • No Tolerance for Harassment: Any form of
              harassment, bullying, or discrimination will not be tolerated.
              Contributions violating this standard will be rejected and
              appropriate action may be taken.
              <div className="legal_page_subtitle">
                Intellectual Property Assignment
              </div>
              &nbsp;&nbsp;&nbsp; By submitting a contribution, you agree to
              assign all intellectual property rights, including copyrights, to
              me unless otherwise agreed upon in a separate agreement. Your
              submission will be governed by the same licensing terms under
              which the project is released, typically open-source licenses such
              as the MIT License, GPL, or equivalent.
              <div className="legal_page_subtitle">Submission Guidelines</div>
              &nbsp;&nbsp;&nbsp; To ensure a seamless integration of
              contributions, please observe the following requirements: <br />
              &nbsp;&nbsp;&nbsp; • Quality Control: Ensure that the submitted
              code or design is well-documented, readable, and tested. <br />
              &nbsp;&nbsp;&nbsp; • Compatibility: All contributions should be
              compatible with the project’s development stack (e.g., React,
              Node.js, etc.) and follow the specified coding standards. <br />
              &nbsp;&nbsp;&nbsp; • Pull Requests: All submissions should be made
              via pull requests, accompanied by detailed commit messages and an
              explanation of the functionality being added or changed. <br />
              &nbsp;&nbsp;&nbsp; • Testing and Validation: Thorough testing is
              required for all contributions, particularly for backend services
              and frontend UI components. Please provide test cases where
              applicable.
              <div className="legal_page_subtitle">Review Process</div>
              &nbsp;&nbsp;&nbsp; All contributions are subject to peer review.
              Depending on the complexity of the submission, the review process
              may take several days or weeks. Contributors will receive feedback
              and may be required to make adjustments before the contribution is
              accepted.
            </div>
          </div>
          <div>
            <div className="legal_page_title" id="legal_page_text_title_3">
              3. Cookies Policy and Tracking Technologies
            </div>
            <div className="legal_page_subtitle">Definition of Cookies</div>
            &nbsp;&nbsp;&nbsp; Cookies are small pieces of data stored on your
            device that enable this website to recognize your preferences and
            tailor content accordingly. Cookies may also be used for security
            purposes, ensuring that your session remains authenticated and
            secure.
            <div className="legal_page_subtitle">
              Categories of Cookies Used
            </div>
            &nbsp;&nbsp;&nbsp; We utilize various types of cookies, each serving
            distinct purposes:
            <br />
            &nbsp;&nbsp;&nbsp; 1. Strictly Necessary Cookies: Essential for the
            operation of the website, these cookies enable core functionalities
            such as user authentication and security.
            <br />
            &nbsp;&nbsp;&nbsp; 2. Performance and Analytical Cookies: These
            cookies collect anonymous data related to website performance, user
            interaction, and visitor behavior. They enable us to optimize the
            website’s design, content, and navigation.
            <br />
            &nbsp;&nbsp;&nbsp; 3. Functionality Cookies: These cookies remember
            your choices, such as language preferences and personalized
            settings, ensuring a customized and consistent experience.
            <br />
            &nbsp;&nbsp;&nbsp; 4. Advertising and Targeting Cookies: These
            cookies track your browsing activities to provide you with relevant
            advertisements and offers. Third-party services, such as Google
            Analytics and Facebook Pixel, may use these cookies to provide
            insights into user behavior.
            <div className="legal_page_subtitle">
              Legal Basis for Processing Cookies
            </div>
            &nbsp;&nbsp;&nbsp; The use of cookies on this website is governed by
            applicable data protection laws, including the General Data
            Protection Regulation (GDPR) in the European Union and the
            California Consumer Privacy Act (CCPA) in the United States. Where
            required by law, explicit consent is sought from users before
            storing cookies on their devices.
            <div className="legal_page_subtitle">
              Managing and Disabling Cookies
            </div>
            &nbsp;&nbsp;&nbsp; You have the right to manage cookies via your
            browser settings. However, please note that disabling cookies may
            impair your ability to use certain features and functionalities of
            the website.
            <div></div>
            <div className="legal_page_title" id="legal_page_text_title_4">
              4. Privacy Policy: Collection, Use, and Protection of Personal
              Data
            </div>
            <div className="legal_page_subtitle">Scope and Applicability</div>
            &nbsp;&nbsp;&nbsp; This Privacy Policy outlines the types of
            personal data collected, how it is processed, and the rights users
            have concerning their data. This policy is designed to comply with
            relevant data protection laws, including the GDPR, CCPA, and other
            applicable national regulations.
            <div className="legal_page_subtitle">
              Categories of Data Collected
            </div>
            &nbsp;&nbsp;&nbsp; We may collect the following categories of
            personal data:
            <br />
            &nbsp;&nbsp;&nbsp; 1. Personally Identifiable Information (PII):
            This includes, but is not limited to, your name, email address,
            phone number, and any other identifying information provided through
            forms or correspondence.
            <br />
            &nbsp;&nbsp;&nbsp; 2. Usage Data: Non-personally identifiable
            information, such as IP addresses, browser types, device
            identifiers, and browsing patterns. This data is collected to
            understand how visitors engage with the website.
            <br />
            &nbsp;&nbsp;&nbsp; 3. Cookies and Similar Technologies: As outlined
            in the Cookies Policy above, we may collect data through cookies and
            other tracking technologies to analyze user behavior and improve
            website performance.
            <div className="legal_page_subtitle">
              Purposes for Processing Data
            </div>
            &nbsp;&nbsp;&nbsp; Personal data is processed based on legitimate
            interests or explicit consent obtained from users, in compliance
            with applicable laws. The primary purposes of data processing
            include: &nbsp;&nbsp;&nbsp; • Service Delivery: Providing,
            maintaining, and improving the functionality of the website.
            <br />
            &nbsp;&nbsp;&nbsp; • User Interaction: Responding to inquiries,
            comments, or requests submitted via contact forms or other
            communication channels.
            <br />
            &nbsp;&nbsp;&nbsp; • Personalization: Customizing content based on
            user preferences and improving the user experience.
            <br />
            &nbsp;&nbsp;&nbsp; • Security: Protecting against unauthorized
            access, cyberattacks, and other security threats.
            <br />
            &nbsp;&nbsp;&nbsp; • Analytics: Analyzing website traffic and user
            behavior to optimize performance and content.
            <div className="legal_page_subtitle">Data Retention Policy</div>
            &nbsp;&nbsp;&nbsp; Personal data is retained only for as long as
            necessary to fulfill the purposes for which it was collected or as
            required by law. Retention periods vary depending on the type of
            data and the specific legal or business requirements.
            <div className="legal_page_subtitle">Third-Party Processors</div>
            &nbsp;&nbsp;&nbsp; We may engage third-party service providers to
            assist with data processing, analytics, and other operational
            functions. Any third-party processors we employ are subject to
            strict contractual obligations, ensuring that personal data is
            processed in accordance with applicable laws and solely for the
            intended purpose.
            <div className="legal_page_subtitle">
              International Data Transfers
            </div>
            &nbsp;&nbsp;&nbsp; Where personal data is transferred outside of the
            European Economic Area (EEA), appropriate safeguards, such as
            Standard Contractual Clauses (SCCs) or Binding Corporate Rules
            (BCRs), are implemented to ensure the protection of personal data.
          </div>
          <div>
            <div className="legal_page_title" id="legal_page_text_title_5">
              5. Your Rights Under Data Protection Laws
            </div>
            <div style={{ marginBottom: '5px' }}>
              &nbsp;&nbsp;&nbsp; In accordance with applicable data protection
              laws, including the GDPR, users are entitled to exercise the
              following rights:
            </div>
            <div>
              <div className="legal_page_subtitle">
                &nbsp;&nbsp;&nbsp; - Right of Access
              </div>
              &nbsp;&nbsp;&nbsp; You have the right to request confirmation as
              to whether personal data concerning you is being processed and, if
              so, to obtain access to that data, along with details regarding
              its processing.
            </div>
            <div>
              <div className="legal_page_subtitle">
                &nbsp;&nbsp;&nbsp; - Right to Rectification
              </div>
              &nbsp;&nbsp;&nbsp; You may request that inaccurate or incomplete
              personal data be corrected or updated without undue delay.
            </div>
            <div>
              <div className="legal_page_subtitle">
                &nbsp;&nbsp;&nbsp; - Right to Erasure (‘Right to Be Forgotten’)
              </div>
              &nbsp;&nbsp;&nbsp; You have the right to request the deletion of
              personal data if it is no longer necessary for the purposes for
              which it was collected, if you withdraw your consent, or if it has
              been unlawfully processed.
            </div>
            <div>
              <div className="legal_page_subtitle">
                &nbsp;&nbsp;&nbsp; - Right to Data Portability
              </div>
              &nbsp;&nbsp;&nbsp; You have the right to receive personal data
              that you provided in a structured, commonly used, and
              machine-readable format. You may also request that such data be
              transmitted directly to another data controller.
            </div>
            <div>
              <div className="legal_page_subtitle">
                &nbsp;&nbsp;&nbsp; - Right to Object
              </div>
              &nbsp;&nbsp;&nbsp; You may object to the processing of your
              personal data where the processing is based on legitimate
              interests or is used for direct marketing purposes.
            </div>
            <div>
              <div className="legal_page_subtitle">
                &nbsp;&nbsp;&nbsp; - Right to Withdraw Consent
              </div>
              &nbsp;&nbsp;&nbsp; Where consent is the basis for processing your
              personal data, you may withdraw your consent at any time.
              <br />
              &nbsp;&nbsp;&nbsp; This will not affect the lawfulness of
              processing based on consent before its withdrawal.
            </div>
            <br />
            &nbsp;&nbsp;&nbsp; To exercise any of these rights, please contact
            me through the form available on this website, and your request will
            be processed in accordance with applicable legal requirements.
          </div>
          <div>
            <div className="legal_page_title" id="legal_page_text_title_6">
              6. Third-Party Links, Services, and Liability
            </div>
            &nbsp;&nbsp;&nbsp; This website may contain links to third-party
            websites, services, or platforms that are not under my control. I am
            not responsible for the content, policies, or practices of any
            third-party sites. It is recommended that you review the privacy and
            legal terms of any third-party services you interact with via this
            website.
            <br />
            <br />
            &nbsp;&nbsp;&nbsp; By accessing third-party links through this
            website, you acknowledge and agree that I bear no liability for any
            loss, damage, or other harm resulting from your use of or reliance
            on third-party content or services.
          </div>
          <div>
            <div className="legal_page_title" id="legal_page_text_title_7">
              7. Modifications to the Policy
            </div>
            &nbsp;&nbsp;&nbsp; This Legal, Privacy & Compliance page is subject
            to updates and revisions. Any changes will be published on this page
            with a revised “Last Updated” date. Your continued use of the
            website following such modifications constitutes your acceptance of
            the updated terms.
          </div>
          <div>
            <div className="legal_page_title" id="legal_page_text_title_8">
              8. Contact Information &nbsp;&nbsp;&nbsp;{' '}
            </div>
            For any inquiries or concerns regarding this Legal, Privacy, and
            Compliance page, including the exercise of your data protection
            rights, please reach out via the contact details provided on the
            website.

          </div>
        </div>
        <PageContents id="about_page_contents" sections={sections} />
      </Page>
      <Footer />
    </>
  );
}
