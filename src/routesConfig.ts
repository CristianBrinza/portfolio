//routesConfig.ts
import React from 'react'; // Make sure to import React if using JSX or createElement
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Blog from './pages/Blog.tsx';
import Contact from './pages/Contact.tsx';
import Portfolio from './pages/portfolio/Portfolio.tsx';
import NotFound from './pages/NotFound.tsx';
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
import Login from "./pages/admin/login/Login.tsx";

export const routes = [
  { path: '/:lang/', element: React.createElement(Home) },
  { path: '/:lang/blog', element: React.createElement(Blog) },
  { path: '/:lang/about', element: React.createElement(About) },
  { path: '/:lang/contact', element: React.createElement(Contact) },
  { path: '/:lang/portfolio', element: React.createElement(Portfolio) },
  { path: '/:lang/cv', element: React.createElement(Resume) },
  { path: '/:lang/resume', element: React.createElement(Resume) },
  { path: '/:lang/legal', element: React.createElement(Legal) },
  { path: '/:lang/login', element: React.createElement(Login) },

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

  { path: '*', element: React.createElement(NotFound) },
  { path: '/:lang/404', element: React.createElement(NotFound) },
];
