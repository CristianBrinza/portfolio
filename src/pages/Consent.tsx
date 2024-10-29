import { Trans } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Title from '../components/Text/Title/Title.tsx';
import Page from '../components/Page.tsx';
import Footer from '../components/Footer/Footer.tsx';
import '../styles/Consent.css';
import PageContents from '../components/page_contents/PageContents.tsx';

export default function Consent() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.consent_page</Trans> },
  ];

  const sections = [
    { id: 'consent_page_text_title_1', label: 'Consent' },
    { id: 'consent_page_text_title_2', label: 'What Are Cookies?' },
    { id: 'consent_page_text_title_3', label: 'Why Do We Use Cookies?' },
    { id: 'consent_page_text_title_5', label: 'Third-Party Cookies' },
    { id: 'consent_page_text_title_6', label: 'Your Rights and Choices' }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <Page gap="20px" id="consent_page">
        <div id="consent_page_text">
          <Title>We Respect Your Privacy: Manage Your Cookie Preferences</Title>
          <div>
            <div className="consent_page_title" id="consent_page_text_title_1">
              Consent to Use Cookies and Data
            </div>
            <div>
              &nbsp;&nbsp;&nbsp; We value your privacy and are committed to being transparent about how we collect and
              use your data. This website uses cookies and similar technologies to enhance your browsing experience,
              analyze website traffic, and personalize content. Below is an explanation of how we use these technologies
              and your rights concerning your personal data.
              <br/>
              <br/>
              &nbsp;&nbsp;&nbsp; All content is provided “as is,” without
              warranty of any kind, either express or implied, including but not
              limited to, implied warranties of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              rights. No responsibility or liability is assumed for any errors
              or omissions in the content, nor for any losses, injuries, or
              damages (whether direct, indirect, special, incidental, or
              consequential) arising from reliance on the information contained
              herein.

            </div>
            <div>
              <div className="consent_page_title" id="consent_page_text_title_2">
                What Are Cookies?
              </div>
              <div>
                &nbsp;&nbsp;&nbsp; Cookies are small text files placed on your device when you visit a website. They
                allow the website to recognize your device, store preferences, and collect information to improve your
                experience.
              </div>
            </div>
            <div>
              <div className="consent_page_title" id="consent_page_text_title_3">
                Why Do We Use Cookies?
              </div>
              <div>
                &nbsp;&nbsp;&nbsp; We use cookies for several purposes:
                <br/>

                &nbsp;&nbsp;&nbsp;1.	<b>Essential Cookies:</b> These cookies are necessary for the proper functioning of our website. They enable basic features like page navigation, security, and access to secure areas of the website.
                <br/>
                &nbsp;&nbsp;&nbsp;2.	<b>Performance and Analytics Cookies:</b> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us optimize the website and improve user experience.
                <br/>
                &nbsp;&nbsp;&nbsp;3.	<b>Functional Cookies:</b> These cookies allow the website to remember choices you make (such as language preference or region) and provide enhanced, personalized features.
               <br/>
                &nbsp;&nbsp;&nbsp;4.	<b>Advertising and Targeting Cookies:</b> We and our third-party advertising partners may use cookies to display advertisements that are relevant to you. These cookies track your browsing activity and can provide targeted ads based on your interests.
              </div>
            </div>

            <div>
              <div className="consent_page_title" id="consent_page_text_title_4">
               Cookies may remain on your device for different durations:
              </div>

              &nbsp;&nbsp;&nbsp; <b>• Session Cookies:</b> These are temporary and deleted once you close your browser.
             <br/>
              &nbsp;&nbsp;&nbsp; <b>• Persistent Cookies:</b> These stay on your device until they expire or you manually delete them.
              <div className="consent_page_title" id="consent_page_text_title_5">
                Third-Party Cookies
              </div>


              &nbsp;&nbsp;&nbsp;  We work with third-party service providers (such as Google Analytics and advertising partners) who may
              also place cookies on your device when you visit our website. These third-party cookies are subject to the
              privacy policies of the respective providers.
              <div className="consent_page_title" id="consent_page_text_title_6">
                Your Rights and Choices
              </div>

              &nbsp;&nbsp;&nbsp;  You have the right to:
 <br/>
              &nbsp;&nbsp;&nbsp; <b>• Accept or Decline Cookies:</b> You can accept or decline cookies by clicking the appropriate button on this
              banner. If you decline, we will only store essential cookies that are necessary for the website to
              function properly.
             <br/> &nbsp;&nbsp;&nbsp;  <b>• Manage Cookie Preferences:</b> You can adjust your cookie settings at any time by visiting our Cookie
              Settings page or configuring your browser settings to block or delete cookies.
             <br/> &nbsp;&nbsp;&nbsp; <b> • Withdraw Consent:</b> You may withdraw your consent for non-essential cookies at any time. Your consent
              preferences will remain in effect until withdrawn or adjusted.
            </div>
          </div>
        </div>
        <PageContents id="about_page_contents" sections={sections}/>
      </Page>
      <Footer/>
    </>
  );
}
