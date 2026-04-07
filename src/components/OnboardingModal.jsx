import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import './OnboardingModal.css';

const OnboardingModal = () => {
  const { user } = useAuth();
  const { profile, loadingProfile, saveProfile } = useUserProfile();
  const [selectedRole, setSelectedRole] = useState(null);
  const [saving, setSaving] = useState(false);

  // Profil yüklenirken ya da zaten rol varsa modal gösterme
  if (!user || loadingProfile || profile?.role) return null;

  const handleSave = () => {
    if (!selectedRole) return;
    setSaving(true);
    // Mimic slight delay for UX
    setTimeout(() => {
      saveProfile({ role: selectedRole });
      setSaving(false);
    }, 800);
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal fade-in-up">
        
        <div className="onb-header">
          <div className="onb-logo">Bi<span className="onb-accent">Adım</span></div>
          <h2>Aramıza Hoş Geldin! 🎉</h2>
          <p>Seni daha iyi tanıyıp doğru içeriklerle eşleştirebilmemiz için platformdaki rolünü seçmelisin.</p>
        </div>

        <div className="onb-roles">
          <div
            className={`onb-role-card ${selectedRole === 'mentor' ? 'active' : ''}`}
            onClick={() => setSelectedRole('mentor')}
          >
            <div className="onb-role-icon">🎓</div>
            <h3>Mentörüm</h3>
            <p>Deneyimlerimi paylaşıp girişimcilere yol gösterebilirim.</p>
            {selectedRole === 'mentor' && <div className="onb-check">✓</div>}
          </div>

          <div
            className={`onb-role-card ${selectedRole === 'girisimci' ? 'active' : ''}`}
            onClick={() => setSelectedRole('girisimci')}
          >
            <div className="onb-role-icon">🚀</div>
            <h3>Girişimciyim</h3>
            <p>Girişimimi büyütmek için yatırımcı, sponsor ve mentör arıyorum.</p>
            {selectedRole === 'girisimci' && <div className="onb-check">✓</div>}
          </div>
        </div>

        <div className="onb-footer">
          <p className="onb-warning">⚠️ Güvenlik gereği rol seçimi sonradan değiştirilemez.</p>
          <button
            className={`btn btn-primary onb-submit-btn ${!selectedRole ? 'disabled' : ''}`}
            onClick={handleSave}
            disabled={!selectedRole || saving}
          >
            {saving ? 'Kaydediliyor...' : 'Tadını Çıkar →'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default OnboardingModal;
