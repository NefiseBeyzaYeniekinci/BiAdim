import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');

  // Zaten giriş yapmışsa ana sayfaya yönlendir
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Parse mode from URL query e.g. /auth?mode=signup
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location]);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setGoogleError('');
    try {
      await signInWithPopup(auth, googleProvider);
      // Başarılı giriş → useEffect user değişimini yakalar ve yönlendirir
    } catch (err) {
      console.error('Google giriş hatası:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setGoogleError('Giriş penceresi kapatıldı. Tekrar dene.');
      } else {
        setGoogleError('Google ile giriş yapılamadı. Lütfen tekrar dene.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg"></div>

      <div className="auth-container fade-in-up">
        <div className="auth-header">
          <h1 className="auth-title">Bi Girişimim Var!</h1>
          <p className="auth-subtitle">
            {isLogin ? 'Tekrar hoş geldin! Hesabına giriş yap.' : 'Ekosisteme katıl, fikrini büyüt.'}
          </p>
        </div>

        <div className="auth-toggle">
          <button
            type="button"
            className={`auth-toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Kayıt Ol
          </button>
        </div>

        {/* Google ile Giriş Yap */}
        <div className="auth-google-section fade-in-up delay-1">
          <button
            type="button"
            className="btn-google"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            id="google-signin-btn"
          >
            {googleLoading ? (
              <span className="google-spinner"></span>
            ) : (
              <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            <span>{googleLoading ? 'Giriş yapılıyor...' : 'Google ile devam et'}</span>
          </button>

          {googleError && (
            <p className="auth-error">{googleError}</p>
          )}
        </div>

        {/* Ayırıcı */}
        <div className="auth-divider fade-in-up delay-2">
          <span>veya e-posta ile</span>
        </div>

        {/* E-posta Formu */}
        <form onSubmit={(e) => { e.preventDefault(); alert('Veritabanı bağlantısı kapalı, deneme formu!'); }}>
          {!isLogin && (
            <div className="form-group fade-in-up delay-1">
              <label className="form-label" htmlFor="name">Ad Soyad</label>
              <input type="text" id="name" className="form-input" placeholder="Elon Musk" required />
            </div>
          )}

          <div className="form-group fade-in-up delay-1">
            <label className="form-label" htmlFor="email">E-posta Adresi</label>
            <input type="email" id="email" className="form-input" placeholder="mail@example.com" required />
          </div>

          <div className="form-group fade-in-up delay-2">
            <label className="form-label" htmlFor="password">Şifre</label>
            <input type="password" id="password" className="form-input" placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn btn-primary auth-submit fade-in-up delay-3">
            {isLogin ? 'Giriş Yap' : 'Hesabımı Oluştur'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
