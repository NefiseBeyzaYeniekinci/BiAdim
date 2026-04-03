import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import './Profile.css';

const SECTORS = ['Teknoloji', 'FinTech', 'HealthTech', 'EdTech', 'E-ticaret', 'SaaS', 'Sürdürülebilirlik', 'Diğer'];
const STAGES = ['Fikir Aşaması', 'MVP', 'Erken Aşama', 'Büyüme', 'Ölçeklendirme'];
const EXPERTISE = ['Yazılım', 'Pazarlama', 'Finans', 'UX/UI', 'Hukuk', 'İş Geliştirme', 'Yatırım', 'İK', 'Operasyon', 'Büyüme'];

const Profile = () => {
  const { user } = useAuth();
  const { profile, saveProfile } = useUserProfile();
  const [saved, setSaved] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm] = useState({
    projectName: '', sector: '', stage: '', bio: '',
    linkedin: '', twitter: '', website: '',
    expertise: [], // Mentöre özel
    mentorTitle: '', // Mentöre özel
  });

  useEffect(() => {
    if (profile) {
      setSelectedRole(profile.role || null);
      setForm(prev => ({ ...prev, ...profile }));
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const toggleExpertise = (tag) => {
    setForm(prev => ({
      ...prev,
      expertise: prev.expertise.includes(tag)
        ? prev.expertise.filter(t => t !== tag)
        : [...prev.expertise, tag],
    }));
    setSaved(false);
  };

  const handleRoleSelect = (role) => {
    if (profile?.role) {
      alert('Güvenlik gereği, kayıtlı rolünüzü sonradan değiştiremezsiniz.');
      return;
    }
    setSelectedRole(role);
    setSaved(false);
  };

  const isRoleLocked = !!profile?.role;

  const handleSave = (e) => {
    e.preventDefault();
    saveProfile({ ...form, role: selectedRole });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const isMentor = selectedRole === 'mentor';
  const isEntrepreneur = selectedRole === 'girisimci';

  return (
    <div className="profile-page">
      <div className="profile-bg" />
      <div className="container profile-container">

        {/* ── User Card ── */}
        <div className="profile-hero fade-in-up">
          <div className="profile-avatar-wrap">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="profile-avatar" referrerPolicy="no-referrer" />
            ) : (
              <div className="profile-avatar-placeholder">
                {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <div className="profile-avatar-ring" />
          </div>
          <div className="profile-hero-info">
            <h1 className="profile-name">{user?.displayName || 'Kullanıcı'}</h1>
            <p className="profile-email">{user?.email}</p>
            <div className="profile-hero-badges">
              {selectedRole === 'mentor' && <span className="profile-badge mentor-badge">🎓 Mentör</span>}
              {selectedRole === 'girisimci' && <span className="profile-badge entrepreneur-badge">🚀 Girişimci</span>}
              {form.projectName && <span className="profile-badge">💡 {form.projectName}</span>}
              {isMentor && profile?.score > 0 && (
                <span className="profile-badge score-badge">⭐ {profile.score} Yıldız</span>
              )}
            </div>
          </div>
        </div>

        <form className="profile-form fade-in-up delay-1" onSubmit={handleSave}>

          {/* ── Rol Seçimi ── */}
          <div className="profile-section">
            <h2 className="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Platforma Katılım Rolü
            </h2>
            <p className="section-desc">
              {isRoleLocked 
                ? 'Rolünüz belirlenmiştir. Tekrar değiştirilemez.' 
                : 'Platforma nasıl katkı sağlamak istiyorsun? (Seçiminiz daha sonra değiştirilemez)'}
            </p>
            <div className={`role-cards ${isRoleLocked ? 'locked' : ''}`}>
              <button
                type="button"
                className={`role-card ${selectedRole === 'mentor' ? 'active' : ''} ${isRoleLocked && selectedRole !== 'mentor' ? 'disabled' : ''}`}
                onClick={() => handleRoleSelect('mentor')}
                id="role-mentor-btn"
              >
                <span className="role-emoji">🎓</span>
                <span className="role-label">Mentör</span>
                <span className="role-desc">Deneyimlerimi paylaşır, girişimcilere yol gösteririm</span>
                {selectedRole === 'mentor' && <span className="role-check">✓</span>}
              </button>
              <button
                type="button"
                className={`role-card ${selectedRole === 'girisimci' ? 'active' : ''} ${isRoleLocked && selectedRole !== 'girisimci' ? 'disabled' : ''}`}
                onClick={() => handleRoleSelect('girisimci')}
                id="role-entrepreneur-btn"
              >
                <span className="role-emoji">🚀</span>
                <span className="role-label">Girişimci</span>
                <span className="role-desc">Girişimimi büyütmek için mentör ve sponsor arıyorum</span>
                {selectedRole === 'girisimci' && <span className="role-check">✓</span>}
              </button>
            </div>
          </div>

          {/* ── Mentör Bilgileri ── */}
          {isMentor && (
            <div className="profile-section">
              <h2 className="section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                Mentör Bilgileri
              </h2>
              <div className="form-group">
                <label className="form-label" htmlFor="mentorTitle">Unvan / Pozisyon</label>
                <input id="mentorTitle" name="mentorTitle" type="text" className="form-input"
                  placeholder="örn. Kurucu Ortak @TechStart, Melek Yatırımcı"
                  value={form.mentorTitle} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label className="form-label">Uzmanlık Alanları</label>
                <div className="expertise-tags">
                  {EXPERTISE.map(tag => (
                    <button
                      key={tag} type="button"
                      className={`expertise-tag ${form.expertise?.includes(tag) ? 'active' : ''}`}
                      onClick={() => toggleExpertise(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Girişim Bilgileri (Girişimci) ── */}
          {isEntrepreneur && (
            <div className="profile-section">
              <h2 className="section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                Girişim Bilgileri
              </h2>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="projectName">Proje / Startup Adı</label>
                  <input id="projectName" name="projectName" type="text" className="form-input"
                    placeholder="örn. PayFlow, MedAI..." value={form.projectName} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row two-col">
                <div className="form-group">
                  <label className="form-label" htmlFor="sector">Sektör</label>
                  <select id="sector" name="sector" className="form-input form-select" value={form.sector} onChange={handleChange}>
                    <option value="">Seçiniz</option>
                    {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="stage">Aşama</label>
                  <select id="stage" name="stage" className="form-input form-select" value={form.stage} onChange={handleChange}>
                    <option value="">Seçiniz</option>
                    {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ── Hakkında (herkese ortak) ── */}
          <div className="profile-section">
            <h2 className="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              Hakkında & Bağlantılar
            </h2>
            <div className="form-group">
              <label className="form-label" htmlFor="bio">
                {isMentor ? 'Mentör Vizyonun' : 'Girişim Vizyonun'}
              </label>
              <textarea id="bio" name="bio" className="form-input form-textarea"
                placeholder={isMentor
                  ? 'Hangi alanlarda rehberlik edebilirsin? Deneyimlerini paylaş...'
                  : 'Girişimini, vizyonunu ve hedeflerini kısaca anlat...'}
                rows={4} value={form.bio} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="linkedin">LinkedIn</label>
                <div className="input-with-icon">
                  <span className="input-prefix">linkedin.com/in/</span>
                  <input id="linkedin" name="linkedin" type="text" className="form-input has-prefix"
                    placeholder="kullanici-adi" value={form.linkedin} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="form-row two-col">
              <div className="form-group">
                <label className="form-label" htmlFor="twitter">Twitter / X</label>
                <div className="input-with-icon">
                  <span className="input-prefix">@</span>
                  <input id="twitter" name="twitter" type="text" className="form-input has-prefix"
                    placeholder="kullanici" value={form.twitter} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="website">Website</label>
                <input id="website" name="website" type="url" className="form-input"
                  placeholder="https://..." value={form.website} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button type="submit" className="btn btn-primary" id="save-profile-btn">
              {saved ? (
                <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16"><polyline points="20 6 9 17 4 12"/></svg>Kaydedildi!</>
              ) : 'Profili Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
