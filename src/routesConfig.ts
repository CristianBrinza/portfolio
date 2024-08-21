//routesConfig.ts
import React from 'react'; // Make sure to import React if using JSX or createElement
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Blog from './pages/Blog.tsx';
import Contact from './pages/Contact.tsx';
import Portfolio from './pages/Portfolio.tsx';
import NotFound from './pages/NotFound.tsx';
import Resume from './pages/Resume.tsx';

export const routes = [
  { path: '/:lang/', element: React.createElement(Home) },
  { path: '/:lang/blog', element: React.createElement(Blog) },
  { path: '/:lang/about', element: React.createElement(About) },
  { path: '/:lang/contact', element: React.createElement(Contact) },
  { path: '/:lang/work', element: React.createElement(Portfolio) },
  { path: '/:lang/cv', element: React.createElement(Resume) },
  { path: '/:lang/resume', element: React.createElement(Resume) },
  { path: '*', element: React.createElement(NotFound) },
  { path: '/:lang/404', element: React.createElement(NotFound) },
];
