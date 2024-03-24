import './App.css';
import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:lang" element={<Home />} />
        <Route path="/" element={<Navigate replace to="/en" />} />
        {/* Default to English */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
