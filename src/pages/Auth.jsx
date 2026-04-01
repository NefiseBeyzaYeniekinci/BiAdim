import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  // Parse mode from URL query e.g. /auth?mode=signup
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location]);

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
