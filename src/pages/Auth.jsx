import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import './Auth.css';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveProfile } = useUserProfile();

  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1: form, 2: rol seçimi (sadece kayıtta)
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [savingRole, setSavingRole] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Zaten giriş yapmışsa → rol seçimi bekliyorsa adım 2'ye, yoksa ana sayfaya
  useEffect(() => {
    if (user && step !== 2) {
      navigate('/');
    }
  }, [user, step, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'signup') setIsLogin(false);
    else setIsLogin(true);
  }, [location]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Google ile giriş — yeni kullanıcıysa rol seçim adımına geç
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setAuthError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // result.additionalUserInfo.isNewUser (opsiyonel ama kullanılabilir)
      // Kolaylık için: rol yoksa OnboardingModal devreye girer zaten.
      // Google ile girişte doğrudan /, yeni kullanıcı OnboardingModal'ı görür.
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') setAuthError('Giriş penceresi kapatıldı.');
      else setAuthError('Google ile giriş yapılamadı.');
    } finally {
      setGoogleLoading(false);
    }
  };

  // Email/şifre kayıt/giriş
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailLoading(true);
    setAuthError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        // Giriş tamam, useEffect yönlendirecek
      } else {
        // Kayıt: kullanıcı oluştur → adım 2'ye geç (rol seçimi)
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName: formData.name });
        }
        // Rol seçimi adımına geç (useEffect'in yönlendirmesini engelle)
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') setAuthError('Bu e-posta kullanımda.');
      else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') setAuthError('E-posta veya şifre hatalı.');
      else if (err.code === 'auth/weak-password') setAuthError('Şifre en az 6 karakter olmalı.');
      else setAuthError('Hata oluştu: ' + err.message);
    } finally {
      setEmailLoading(false);
    }
  };

  // Rol kaydet ve ana sayfaya git
  const handleRoleSave = async () => {
    if (!selectedRole) return;
    setSavingRole(true);
    await saveProfile({ role: selectedRole });
    setSavingRole(false);
    navigate('/');
  };

  // ── ADIM 2: Rol Seçimi ──
  if (step === 2) {
    return (
      <div className="auth-page">
        <div className="auth-bg"></div>
        <div className="auth-container fade-in-up">
          <div className="auth-header">
            <h1 className="auth-title">Aramıza Hoş Geldin! 🎉</h1>
            <p className="auth-subtitle">Platformdaki rolünü seç — bu seçim hesabına kaydedilir ve bir daha sorulmaz.</p>
          </div>

          <div className="onb-roles" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <div
              className={`onb-role-card ${selectedRole === 'mentor' ? 'active' : ''}`}
              onClick={() => setSelectedRole('mentor')}
              style={{ cursor: 'pointer', padding: '1.5rem 1rem', borderRadius: '16px', textAlign: 'center', border: `2px solid ${selectedRole === 'mentor' ? 'var(--color-primary)' : 'var(--color-border)'}`, background: selectedRole === 'mentor' ? 'var(--color-primary)10' : 'var(--color-surface)', transition: 'all 0.2s', marginBottom: '1rem' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
              <h3 style={{ marginBottom: '0.4rem' }}>Mentörüm</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Deneyimlerimi paylaşıp girişimcilere yol gösterebilirim.</p>
              {selectedRole === 'mentor' && <div style={{ color: 'var(--color-primary)', fontWeight: 700, marginTop: '0.5rem' }}>✓ Seçildi</div>}
            </div>

            <div
              className={`onb-role-card ${selectedRole === 'girisimci' ? 'active' : ''}`}
              onClick={() => setSelectedRole('girisimci')}
              style={{ cursor: 'pointer', padding: '1.5rem 1rem', borderRadius: '16px', textAlign: 'center', border: `2px solid ${selectedRole === 'girisimci' ? 'var(--color-primary)' : 'var(--color-border)'}`, background: selectedRole === 'girisimci' ? 'var(--color-primary)10' : 'var(--color-surface)', transition: 'all 0.2s' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚀</div>
              <h3 style={{ marginBottom: '0.4rem' }}>Girişimciyim</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Girişimimi büyütmek için yatırımcı, sponsor ve mentör arıyorum.</p>
              {selectedRole === 'girisimci' && <div style={{ color: 'var(--color-primary)', fontWeight: 700, marginTop: '0.5rem' }}>✓ Seçildi</div>}
            </div>
          </div>

          <button
            className={`btn btn-primary auth-submit`}
            onClick={handleRoleSave}
            disabled={!selectedRole || savingRole}
          >
            {savingRole ? 'Kaydediliyor...' : 'Platforma Gir →'}
          </button>
        </div>
      </div>
    );
  }

  // ── ADIM 1: Giriş / Kayıt Formu ──
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
            onClick={() => { setIsLogin(true); setAuthError(''); }}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(false); setAuthError(''); }}
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

          {authError && <p className="auth-error">{authError}</p>}
        </div>

        {/* Ayırıcı */}
        <div className="auth-divider fade-in-up delay-2">
          <span>veya e-posta ile</span>
        </div>

        {/* E-posta Formu */}
        <form onSubmit={handleEmailSubmit}>
          {!isLogin && (
            <div className="form-group fade-in-up delay-1">
              <label className="form-label" htmlFor="name">Ad Soyad</label>
              <input type="text" id="name" className="form-input" placeholder="Elon Musk" required value={formData.name} onChange={handleInputChange} />
            </div>
          )}

          <div className="form-group fade-in-up delay-1">
            <label className="form-label" htmlFor="email">E-posta Adresi</label>
            <input type="email" id="email" className="form-input" placeholder="mail@example.com" required value={formData.email} onChange={handleInputChange} />
          </div>

          <div className="form-group fade-in-up delay-2">
            <label className="form-label" htmlFor="password">Şifre</label>
            <input type="password" id="password" className="form-input" placeholder="••••••••" required minLength="6" value={formData.password} onChange={handleInputChange} />
          </div>

          <button type="submit" className="btn btn-primary auth-submit fade-in-up delay-3" disabled={emailLoading}>
            {emailLoading ? 'İşleniyor...' : (isLogin ? 'Giriş Yap' : 'Devam Et →')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
