import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MOCK_SPONSORS } from '../data/sponsors';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
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
  const [filterSector, setFilterSector] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [sponsorsData, setSponsorsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSponsorsData(MOCK_SPONSORS);
    setLoading(false);
  }, []);

  const filteredSponsors = sponsorsData.filter(s => {
    const matchName = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSector = filterSector === '' || s.sectors.some(sec => sec.includes(filterSector));
    const matchStage = filterStage === '' || s.minStage.includes(filterStage);
    return matchName && matchSector && matchStage;
  });

  const allSectors = Array.from(new Set(sponsorsData.flatMap(s => s.sectors))).sort();
  const allStages = Array.from(new Set(sponsorsData.map(s => s.minStage))).sort();

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

        {/* ── Search & Filters ── */}
        <div className="filter-bar fade-in-up delay-1" style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Yatırımcı/Fon adı ara..." 
            className="form-input" 
            style={{ flex: 2, minWidth: '200px' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select 
            className="form-input form-select" 
            style={{ flex: 1, minWidth: '150px' }}
            value={filterSector}
            onChange={e => setFilterSector(e.target.value)}
          >
            <option value="">Tüm Sektörler</option>
            {allSectors.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select 
            className="form-input form-select" 
            style={{ flex: 1, minWidth: '150px' }}
            value={filterStage}
            onChange={e => setFilterStage(e.target.value)}
          >
            <option value="">Tüm Aşamalar</option>
            {allStages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* ── Sponsor Grid ── */}
        <div className="sponsors-grid">
          {loading ? (
             <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem' }}>Yükleniyor...</div>
          ) : filteredSponsors.length === 0 ? (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: 'var(--color-text-muted)' }}>
              Kriterlerinize uygun yatırımcı bulunamadı. Lütfen filtreleri esnetin.
            </div>
          ) : filteredSponsors.map((sponsor, index) => (
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
