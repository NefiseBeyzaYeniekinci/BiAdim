import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    newMentor: true,
    newSponsor: false,
    weeklyDigest: true,
    eventReminders: true,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const toggleNotif = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logout();
    navigate('/');
  };

  const notifItems = [
    { key: 'newMentor', label: 'Yeni Mentör Bildirimleri', desc: 'Profilinle eşleşen yeni mentörler eklendiğinde bildirim al' },
    { key: 'newSponsor', label: 'Yeni Sponsor Fırsatları', desc: 'Sektöründe yeni sponsor kampanyaları açıldığında haberdar ol' },
    { key: 'weeklyDigest', label: 'Haftalık Özet', desc: 'Her Pazartesi girişimcilik ekosisteminden haftalık özet' },
    { key: 'eventReminders', label: 'Etkinlik Hatırlatmaları', desc: 'Kayıtlı etkinliklerden 24 saat önce hatırlatma al' },
  ];

  return (
    <div className="settings-page">
      <div className="settings-bg" />

      <div className="container settings-container">
        <div className="settings-header fade-in-up">
          <h1 className="settings-title">Ayarlar</h1>
          <p className="settings-subtitle">Hesap tercihlerini ve bildirim ayarlarını yönet</p>
        </div>

        {/* Account Info */}
        <div className="settings-card fade-in-up delay-1">
          <div className="settings-card-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <h2>Hesap Bilgileri</h2>
          </div>
          <div className="account-info-row">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="account-avatar" referrerPolicy="no-referrer" />
            ) : (
              <div className="account-avatar-placeholder">
                {(user?.displayName || 'U')[0]}
              </div>
            )}
            <div>
              <p className="account-name">{user?.displayName || 'Kullanıcı'}</p>
              <p className="account-email">{user?.email}</p>
              <span className="account-badge">Google ile giriş yapıldı</span>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-card fade-in-up delay-2">
          <div className="settings-card-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <h2>Bildirim Tercihleri</h2>
          </div>
          <div className="notif-list">
            {notifItems.map(item => (
              <div className="notif-item" key={item.key}>
                <div className="notif-info">
                  <span className="notif-label">{item.label}</span>
                  <span className="notif-desc">{item.desc}</span>
                </div>
                <button
                  className={`toggle-btn ${notifications[item.key] ? 'active' : ''}`}
                  onClick={() => toggleNotif(item.key)}
                  id={`toggle-${item.key}`}
                  aria-label={item.label}
                >
                  <span className="toggle-thumb" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-card danger-card fade-in-up delay-3">
          <div className="settings-card-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <h2>Tehlikeli Bölge</h2>
          </div>

          <div className="danger-actions">
            <button
              className="btn btn-outline logout-btn"
              onClick={handleLogout}
              disabled={logoutLoading}
              id="settings-logout-btn"
            >
              {logoutLoading ? 'Çıkış yapılıyor...' : 'Hesaptan Çıkış Yap'}
            </button>

            {!showDeleteConfirm ? (
              <button
                className="btn btn-danger"
                onClick={() => setShowDeleteConfirm(true)}
                id="delete-account-btn"
              >
                Hesabı Sil
              </button>
            ) : (
              <div className="delete-confirm">
                <p className="delete-warning">⚠️ Bu işlem geri alınamaz. Emin misin?</p>
                <div className="delete-confirm-actions">
                  <button className="btn btn-outline" onClick={() => setShowDeleteConfirm(false)}>İptal</button>
                  <button className="btn btn-danger" id="confirm-delete-btn">Evet, Hesabımı Sil</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
