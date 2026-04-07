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
import MyApplications from './pages/MyApplications';
import AdminDashboard from './pages/AdminDashboard';
import SupabaseStatus from './pages/SupabaseStatus';
import NotFound from './pages/NotFound';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import OnboardingModal from './components/OnboardingModal';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
      <div className="app-wrapper">
        <OnboardingModal />
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/supabase" element={<SupabaseStatus />} />
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
            <Route path="/my-applications" element={
              <ProtectedRoute><MyApplications /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute><AdminDashboard /></ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute><Settings /></ProtectedRoute>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <ChatBot />
      </div>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default App;
