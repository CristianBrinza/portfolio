//routesConfig.ts
import React from 'react'; // Make sure to import React if using JSX or createElement
import Home from './pages/Home/Home.tsx';
import About from './pages/About.tsx';
import Blog from './pages/Blog.tsx';
import Contact from './pages/Contact.tsx';
import Portfolio from './pages/portfolio/Portfolio.tsx';
import Resume from './pages/Resume.tsx';
import QR from './pages/utilities/qr/QR.tsx';
import Utilities from './pages/Utilities.tsx';
import PdfToWord from './pages/utilities/pdf_to_world/PdfToWord.tsx';
import Legal from './pages/Legal.tsx';
import Shortener from './pages/utilities/shrotner/Shortener.tsx';
import NameValidator from './pages/utilities/name_validator/NameValidator.tsx';
import BrowserHistoryAnalyzer from './pages/utilities/browser_history_analyzer/BrowserHistoryAnalyzer.tsx';
import RandomNumberGenerator from './pages/utilities/random_number_generator/RandomNumberGenerator.tsx';
import PasswordGenerator from './pages/utilities/password_generator/PasswordGenerator.tsx';
import ImageMetadataEditor from './pages/utilities/image_metadata_editor/ImageMetadataEditor.tsx';
import ColorConvertor from './pages/utilities/color_convertor/ColorConvertor.tsx';
import JsonFormatter from './pages/utilities/json-formatter/JsonFormatter.tsx';
import WordCounter from './pages/utilities/word_counter/WordCounter.tsx';
import JsonDiffTool from './pages/utilities/json_diff_tool/JsonDiffTool.tsx';
import StopwatchTimer from './pages/utilities/stopwatch_timer/StopwatchTimer.tsx';
import ImageColorPicker from './pages/utilities/image_color_picker/ImageColorPicker.tsx';
import PortfolioBackEnd from './pages/portfolio/PortfolioBackEnd.tsx';
import PortfolioFrontEnd from './pages/portfolio/PortfolioFrontEnd.tsx';
import PortfolioDesign from './pages/portfolio/PortfolioDesign.tsx';
import ScreenSize from './pages/utilities/screen_size/ScreenSize.tsx';
import OfflinePage from './pages/OfflinePage.tsx';
import Ip from "./pages/utilities/ip/Ip.tsx";
import Consent from "./pages/Consent.tsx";
import Test from "./pages/test/Test.tsx";
import Certifications from "./pages/certifications/Certifications.tsx";
import PortfolioManager from "./pages/admin/portfolio/PortfolioManager.tsx";
import Admin from "./pages/admin/admin/Admin.tsx";
import Dashboard from "./pages/admin/dashboard/Dashboard.tsx";
import GuestPage from "./pages/admin/guest/GuestPage.tsx";
import FileManager from "./pages/admin/file_manager/FileManager.tsx";
import ProfilePage from "./pages/admin/profile/ProfilePage.tsx";
import PasswordPage from "./pages/admin/profile/PasswordPage.tsx";
import CertificationManager from "./pages/admin/certification/CertificationManager.tsx";
import ImageManager from "./pages/admin/images/ImageManager.tsx";
import Login from "./pages/admin/login/Login.tsx";
import BlogManager from "./pages/admin/BlogManager/BlogManager.tsx";
import PagesManager from "./pages/admin/PagesManager/PagesManager.tsx";
import ShareManager from "./pages/admin/ShareManager/ShareManager.tsx";
import SharedFilesPage from "./pages/SharedFilesPage/SharedFilesPage.tsx";

export const routes = [
  { path: '/:lang/', element: React.createElement(Home) },
  { path: '/:lang/blog', element: React.createElement(Blog) },
  { path: '/:lang/about', element: React.createElement(About) },
  { path: '/:lang/contact', element: React.createElement(Contact) },
  { path: '/:lang/portfolio', element: React.createElement(Portfolio) },
  { path: '/:lang/cv', element: React.createElement(Resume) },
  { path: '/:lang/resume', element: React.createElement(Resume) },
  { path: '/:lang/legal', element: React.createElement(Legal) },
  { path: '/:lang/privacy', element: React.createElement(Consent) },
  { path: '/:lang/offline', element: React.createElement(OfflinePage) },
  { path: '/:lang/certifications', element: React.createElement(Certifications) },
  { path: '/:lang/test', element: React.createElement(Test) },

  { path: '/:lang/utilities', element: React.createElement(Utilities) },
  { path: '/:lang/qr', element: React.createElement(QR) },
  { path: '/:lang/pdf-to-world', element: React.createElement(PdfToWord) },
  { path: '/:lang/shortener', element: React.createElement(Shortener) },
  {
    path: '/:lang/browser-history',
    element: React.createElement(BrowserHistoryAnalyzer),
  },
  {
    path: '/:lang/random-number-generator',
    element: React.createElement(RandomNumberGenerator),
  },
  {
    path: '/:lang/password-generator',
    element: React.createElement(PasswordGenerator),
  },
  {
    path: '/:lang/image-metadata-editor',
    element: React.createElement(ImageMetadataEditor),
  },
  {
    path: '/:lang/color-convertor',
    element: React.createElement(ColorConvertor),
  },
  {
    path: '/:lang/name-validator',
    element: React.createElement(NameValidator),
  },
  {
    path: '/:lang/json-formatter',
    element: React.createElement(JsonFormatter),
  },
  {
    path: '/:lang/word-counter',
    element: React.createElement(WordCounter),
  },
  {
    path: '/:lang/json-diff-tool',
    element: React.createElement(JsonDiffTool),
  },
  {
    path: '/:lang/stopwatch-timer',
    element: React.createElement(StopwatchTimer),
  },
  {
    path: '/:lang/image-color-picker',
    element: React.createElement(ImageColorPicker),
  },
  {
    path: '/:lang/screen-size',
    element: React.createElement(ScreenSize),
  },
  {
    path: '/:lang/ip',
    element: React.createElement(Ip),
  },
  {
    path: '/:lang/portfolio-design',
    element: React.createElement(PortfolioDesign),
  },
  {
    path: '/:lang/portfolio-back-end',
    element: React.createElement(PortfolioBackEnd),
  },
  {
    path: '/:lang/portfolio-front-end',
    element: React.createElement(PortfolioFrontEnd),
  },
  {
    path: '/:lang/login',
    element: React.createElement(Login),
  },

  {
  path: '/:lang/dashboard',
    element: React.createElement(Dashboard),
    allowedRoles: ['guest', 'user', 'admin'],
},
  {
    path: '/:lang/admin',
    element: React.createElement(Admin),
    allowedRoles: ['admin'],
  },
  {
    path: '/:lang/guest',
    element: React.createElement(GuestPage),
    allowedRoles: ['guest', 'user', 'admin'],
  },
  {
    path: '/:lang/dashboard/portfolio-manager',
    element: React.createElement(PortfolioManager),
    allowedRoles: ['admin', 'user'],
  },
  {
    path: '/:lang/dashboard/storage',
    element: React.createElement(FileManager),
    allowedRoles: ['admin', 'user'],
  },
  {
    path: '/:lang/dashboard/certification-manager',
    element: React.createElement(CertificationManager),
    allowedRoles: ['admin', 'user'],
  },
  {
    path: '/:lang/dashboard/image-manager',
    element: React.createElement(ImageManager),
    allowedRoles: ['admin', 'user'],
  },
  {
    path: '/:lang/dashboard/blog-manager',
    element: React.createElement(BlogManager),
    allowedRoles: ['admin', 'user'],
  }, {
    path: '/:lang/dashboard/pages-manager',
    element: React.createElement(PagesManager),
    allowedRoles: ['admin', 'user'],
  },
  {
    path: '/:lang/dashboard/share-manager',
    element: React.createElement(ShareManager),
    allowedRoles: ['admin', 'user'],
  },
  {
    path: '/:lang/dashboard/profile',
    element: React.createElement(ProfilePage),
    allowedRoles: ['admin', 'user', 'guest'],
  },
  {
    path: '/:lang/dashboard/profile/password',
    element: React.createElement(PasswordPage),
    allowedRoles: ['admin', 'user', 'guest'],
  },
  {
    path: '/:lang/share/:code',
    element: React.createElement(SharedFilesPage),
  },


  // { path: '*', element: React.createElement(NotFound) },
 // { path: '/:lang/404', element: React.createElement(NotFound) },
];
