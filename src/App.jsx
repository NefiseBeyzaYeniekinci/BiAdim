import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Mentors from './pages/Mentors';
import Sponsors from './pages/Sponsors';
import './App.css'; // Global App Layout

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/sponsors" element={<Sponsors />} />
        </Routes>
      </div>

      {/* Shared Footer */}
      <footer style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--color-text-muted)', borderTop: '1px solid var(--glass-border)' }}>
        <p>&copy; {new Date().getFullYear()} Bi Girişimim Var! (BiAdım). Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}

export default App;
