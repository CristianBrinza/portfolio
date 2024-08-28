//routesConfig.ts
import React from 'react'; // Make sure to import React if using JSX or createElement
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Blog from './pages/Blog.tsx';
import Contact from './pages/Contact.tsx';
import Portfolio from './pages/Portfolio.tsx';
import NotFound from './pages/NotFound.tsx';
import Resume from './pages/Resume.tsx';
import QR from './pages/utilities/qr/QR.tsx';
import Utilities from './pages/Utilities.tsx';
import PdfToWord from './pages/utilities/pdf_to_world/PdfToWord.tsx';
import Legal from './pages/Legal.tsx';
import Shortener from './pages/utilities/shrotner/Shortener.tsx';
import NameValidator from './pages/utilities/name_validator/NameValidator.tsx';
import BrowserHistoryAnalyzer from "./pages/utilities/browser_history_analyzer/BrowserHistoryAnalyzer.tsx";
import RandomNumberGenerator from "./pages/utilities/random_number_generator/RandomNumberGenerator.tsx";
import PasswordGenerator from "./pages/utilities/password_generator/PasswordGenerator.tsx";

export const routes = [
  { path: '/:lang/', element: React.createElement(Home) },
  { path: '/:lang/blog', element: React.createElement(Blog) },
  { path: '/:lang/about', element: React.createElement(About) },
  { path: '/:lang/contact', element: React.createElement(Contact) },
  { path: '/:lang/portfolio', element: React.createElement(Portfolio) },
  { path: '/:lang/cv', element: React.createElement(Resume) },
  { path: '/:lang/resume', element: React.createElement(Resume) },
  { path: '/:lang/legal', element: React.createElement(Legal) },

  { path: '/:lang/utilities', element: React.createElement(Utilities) },
  { path: '/:lang/qr', element: React.createElement(QR) },
  { path: '/:lang/pdf-to-world', element: React.createElement(PdfToWord) },
  { path: '/:lang/shortener', element: React.createElement(Shortener) },
  { path: '/:lang/browser-history', element: React.createElement(BrowserHistoryAnalyzer) },
  { path: '/:lang/random-number-generator', element: React.createElement(RandomNumberGenerator) },
  { path: '/:lang/password-generator', element: React.createElement(PasswordGenerator) },
  {
    path: '/:lang/name-validator',
    element: React.createElement(NameValidator),
  },

  { path: '*', element: React.createElement(NotFound) },
  { path: '/:lang/404', element: React.createElement(NotFound) },
];
