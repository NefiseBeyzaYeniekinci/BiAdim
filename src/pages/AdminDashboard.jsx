import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import { Navigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { MENTORS_DATA } from '../data/mentors';
import { MOCK_SPONSORS } from '../data/sponsors';
import './AdminDashboard.css';

const MOCK_STATS = {
  totalUsers: 142,
  totalMentors: 35,
  totalEntrepreneurs: 107,
  activeSeminars: 8,
  pendingSponsorApps: 12,
  totalBlogs: 48,
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const { getUserBlogPosts } = useUserProfile();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [allBlogs, setAllBlogs] = useState([]);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');
  const [weeklyIncrease] = useState(() => Math.floor(Math.random() * 10));

  useEffect(() => {
    if (localStorage.getItem('admin_session') === 'active') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeTab === 'dashboard' || activeTab === 'blogs') {
      getUserBlogPosts().then(setAllBlogs).catch(console.error);
    }
  }, [isAuthenticated, activeTab, getUserBlogPosts]);

  const handleSeedDatabase = async () => {
    if(!window.confirm("Tüm statik veriler Firestore'a kopyalanacak. Onaylıyor musunuz?")) return;
    setIsSeeding(true);
    setSeedMessage('Mentörler yükleniyor...');
    try {
      for (const m of MENTORS_DATA) {
        await setDoc(doc(db, 'mentors', m.id.toString()), m);
      }
      setSeedMessage('Sponsorlar yükleniyor...');
      for (const s of MOCK_SPONSORS) {
        await setDoc(doc(db, 'sponsors', s.id.toString()), s);
      }
      setSeedMessage('Veritabanı başarıyla senkronize edildi! ✅');
    } catch (e) {
      console.error(e);
      setSeedMessage('Hata: ' + e.message);
    }
    setIsSeeding(false);
  };


  const handleLogin = (e) => {
    e.preventDefault();
    // Secret password
    if (password === 'biadimadmin') {
      localStorage.setItem('admin_session', 'active');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Hatalı şifre. Erişim reddedildi.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
  };

  if (!user) return <Navigate to="/auth?mode=login" />;

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-box fade-in-up">
          <div className="admin-lock-icon">🔒</div>
          <h2>Yönetim Paneli</h2>
          <p>Lütfen yetkili şifrenizi girin.</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Şifre (biadimadmin)" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              autoFocus
            />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="btn btn-primary admin-btn">Giriş Yap</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          Bi<span className="accent">Adım</span> Admin
        </div>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            📊 İstatistikler
          </button>
          <button className={`admin-nav-item ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>
            📝 Blog Denetimi
          </button>
          <button className={`admin-nav-item ${activeTab === 'sponsors' ? 'active' : ''}`} onClick={() => setActiveTab('sponsors')}>
            🤝 Başvurular
          </button>
        </nav>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className="admin-nav-item" onClick={handleSeedDatabase} disabled={isSeeding} style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--color-primary)' }}>
            {isSeeding ? 'Yükleniyor...' : '💽 DB Doldur'}
          </button>
          <button className="admin-logout-btn" onClick={handleLogout}>Güvenli Çıkış</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{
            activeTab === 'dashboard' ? 'Genel Bakış' :
            activeTab === 'blogs' ? 'Kullanıcı Blog Yazıları' : 'Sponsor Başvuruları'
          }</h1>
          <div className="admin-user-info">
            <span>Admin, {user.displayName || 'Yetkili'}</span>
          </div>
        </header>

        <div className="admin-content fade-in-up">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <>
              <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <h3>👥 Toplam Kullanıcı</h3>
                <div className="stat-val">{MOCK_STATS.totalUsers}</div>
                <div className="stat-sub">+{weeklyIncrease} bu hafta</div>
              </div>
              <div className="admin-stat-card">
                <h3>🎓 Mentör Sayısı</h3>
                <div className="stat-val">{MOCK_STATS.totalMentors}</div>
              </div>
              <div className="admin-stat-card">
                <h3>🚀 Girişimci Sayısı</h3>
                <div className="stat-val">{MOCK_STATS.totalEntrepreneurs}</div>
              </div>
              <div className="admin-stat-card">
                <h3>📝 Aktif Blog</h3>
                <div className="stat-val">{MOCK_STATS.totalBlogs + allBlogs.length}</div>
              </div>
              <div className="admin-stat-card">
                <h3>📅 Yaklaşan Seminer</h3>
                <div className="stat-val">{MOCK_STATS.activeSeminars}</div>
              </div>
              <div className="admin-stat-card alert">
                <h3>⚠️ Bekleyen Başvuru</h3>
                <div className="stat-val">{MOCK_STATS.pendingSponsorApps}</div>
              </div>
            </div>
            
            {seedMessage && (
              <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <strong>Sistem Mesajı:</strong> {seedMessage}
              </div>
            )}
            </>
          )}

          {/* Blogs Tab */}
          {activeTab === 'blogs' && (
            <div className="admin-table-container">
              {allBlogs.length === 0 ? (
                <div className="admin-empty">Platformda henüz kullanıcı tarafından yazılan blog yok.</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tarih</th>
                      <th>Yazar</th>
                      <th>Başlık</th>
                      <th>Kategori</th>
                      <th>İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBlogs.map(blog => (
                      <tr key={blog.id}>
                        <td>{new Date(blog.createdAt).toLocaleDateString('tr-TR')}</td>
                        <td>{blog.authorName}</td>
                        <td>{blog.title.substring(0, 40)}{blog.title.length > 40 ? '...' : ''}</td>
                        <td>{blog.category}</td>
                        <td>
                          <button className="admin-action-btn view">İncele</button>
                          <button className="admin-action-btn delete">Kaldır</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Sponsors Tab */}
          {activeTab === 'sponsors' && (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Başvuru No</th>
                    <th>Girişim Adı</th>
                    <th>Hedef Yatırımcı</th>
                    <th>Aşama</th>
                    <th>Durum</th>
                    <th>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#APP-1029</td>
                    <td>PayFlow Inc.</td>
                    <td>TechVision Fund</td>
                    <td>MVP</td>
                    <td><span className="admin-badge pending">İnceleniyor</span></td>
                    <td><button className="admin-action-btn">Yönet</button></td>
                  </tr>
                  <tr>
                    <td>#APP-1028</td>
                    <td>AgriSmart</td>
                    <td>GreenSpark Capital</td>
                    <td>Fikir Aş.</td>
                    <td><span className="admin-badge pending">İnceleniyor</span></td>
                    <td><button className="admin-action-btn">Yönet</button></td>
                  </tr>
                  <tr>
                    <td>#APP-1025</td>
                    <td>MedAI</td>
                    <td>Anadolu Girişim</td>
                    <td>Erken Aş.</td>
                    <td><span className="admin-badge approved">Kabul Edildi</span></td>
                    <td><button className="admin-action-btn">Görüntüle</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
