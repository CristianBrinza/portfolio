import './App.css';
import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './components/ThemeContext';
import Contact from './pages/Contact';
import About from "./pages/About.tsx";

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/:lang" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/en" />} />
          {/* Default to English */}
          <Route path="*" element={<NotFound />} />
          <Route path="/:lang/contact" element={<Contact />} />
          <Route path="/:lang/about" element={<About />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
