import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MOCK_SPONSORS } from '../data/sponsors';
import './Sponsors.css';

const typeColors = {
  'Melek Yatırımcı': '#6366f1',
  'Risk Sermayesi (VC)': '#8b5cf6',
  'Kurumsal Yatırımcı': '#06b6d4',
  'Kamu Destekli Fon': '#22c55e',
  'Tematik Yatırımcı': '#f59e0b',
};

const Sponsors = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filterSector, setFilterSector] = useState('Tümü');

  const filteredSponsors = filterSector === 'Tümü'
    ? MOCK_SPONSORS
    : MOCK_SPONSORS.filter(s => s.sectors.some(sec => sec.toLowerCase().includes(filterSector.toLowerCase())));

  const allSectors = ['Tümü', ...Array.from(new Set(MOCK_SPONSORS.flatMap(s => s.sectors)))];

  const handleSponsorClick = (id) => {
    if (!user) { navigate('/auth?mode=login'); return; }
    navigate(`/sponsor-apply/${id}`);
  };

  return (
    <div className="sponsors-page">
      <div className="sponsors-bg" />
      <div className="container sponsors-container">

        {/* ── Header ── */}
        <div className="page-header fade-in-up">
          <div className="sp-header-badge">💼 Yatırımcı Havuzu</div>
          <h1 className="page-title">Sponsor & Yatırımcı Bul</h1>
          <p className="page-subtitle">
            Girişiminiz için doğru yatırımcıyı keşfedin. Projenizi, vizyonunuzu ve destek talebinizi doğrudan iletebilirsiniz.
          </p>
        </div>

        {/* ── Sector Filter ── */}
        <div className="sp-filters fade-in-up delay-1">
          {allSectors.map(s => (
            <button key={s} className={`filter-btn ${filterSector === s ? 'active' : ''}`} onClick={() => setFilterSector(s)}>{s}</button>
          ))}
        </div>

        {/* ── Sponsor Grid ── */}
        <div className="sponsors-grid">
          {filteredSponsors.map((sponsor, index) => (
            <div className={`sponsor-card fade-in-up delay-${(index % 3) + 1}`} key={sponsor.id}>
              <div className="sponsor-header">
                <div className="sponsor-logo">{sponsor.logo}</div>
                <div className="sponsor-info">
                  <h3 className="sponsor-name">{sponsor.name}</h3>
                  <span className="sponsor-type-badge" style={{ background: typeColors[sponsor.type] + '15', color: typeColors[sponsor.type], borderColor: typeColors[sponsor.type] + '33' }}>
                    {sponsor.type}
                  </span>
                </div>
              </div>

              <p className="sponsor-focus">{sponsor.focus}</p>

              <div className="sponsor-meta">
                <div className="meta-row">
                  <span className="meta-label">💰 Bütçe</span>
                  <span className="meta-value">{sponsor.budget}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">📊 Min. Aşama</span>
                  <span className="meta-value">{sponsor.minStage}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">💼 Portföy</span>
                  <span className="meta-value">{sponsor.portfolio} Girişim</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">🏷️ Sektörler</span>
                  <div className="sector-tags">
                    {sponsor.sectors.map(s => <span key={s} className="sector-tag">{s}</span>)}
                  </div>
                </div>
              </div>

              <button className="btn btn-primary sp-apply-btn" onClick={() => handleSponsorClick(sponsor.id)} id={`apply-btn-${sponsor.id}`}>
                📩 Destek Talebi Gönder
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
