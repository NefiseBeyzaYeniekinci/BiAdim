import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProfileProvider } from './context/UserProfileContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Mentors from './pages/Mentors';
import MentorProfile from './pages/MentorProfile';
import Seminars from './pages/Seminars';
import Sponsors from './pages/Sponsors';
import SponsorApply from './pages/SponsorApply';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Blog from './pages/Blog';
import WriteBlog from './pages/WriteBlog';
import MyContent from './pages/MyContent';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
      <div className="app-wrapper">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/mentor/:id" element={<MentorProfile />} />
            <Route path="/seminars" element={<Seminars />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/sponsor-apply/:id" element={
              <ProtectedRoute><SponsorApply /></ProtectedRoute>
            } />
            <Route path="/write-blog" element={
              <ProtectedRoute><WriteBlog /></ProtectedRoute>
            } />
            <Route path="/my-content" element={
              <ProtectedRoute><MyContent /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute><Settings /></ProtectedRoute>
            } />
          </Routes>
        </div>

        <footer style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--color-text-muted)', borderTop: '1px solid var(--glass-border)' }}>
          <p>&copy; {new Date().getFullYear()} Bi Girişimim Var! (BiAdım). Tüm hakları saklıdır.</p>
        </footer>
      </div>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default App;
