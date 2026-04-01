import './Sponsors.css';

const MOCK_SPONSORS = [
  {
    id: 1,
    name: 'TechVision Fund',
    type: 'Melek Yatırımcı',
    budget: '100K ₺ - 500K ₺',
    sector: 'Yazılım & SaaS',
    portfolio: 12,
    logo: '🦋'
  },
  {
    id: 2,
    name: 'Anadolu Girişim',
    type: 'Risk Sermayesi (VC)',
    budget: '500K ₺ - 2M ₺',
    sector: 'E-Ticaret & Lojistik',
    portfolio: 27,
    logo: '🦅'
  },
  {
    id: 3,
    name: 'GreenSpark Capital',
    type: 'Kurumsal Yatırımcı',
    budget: '1M ₺ - 5M ₺',
    sector: 'Temiz Enerji & Sürdürülebilirlik',
    portfolio: 8,
    logo: '🌱'
  },
  {
    id: 4,
    name: 'İnovasyon Merkezi',
    type: 'Kamu Destekli Fon',
    budget: '50K ₺ - 250K ₺',
    sector: 'Tüm Sektörler',
    portfolio: 45,
    logo: '🏛️'
  },
  {
    id: 5,
    name: 'Bosphorus Ventures',
    type: 'Risk Sermayesi (VC)',
    budget: '2M ₺ - 10M ₺',
    sector: 'Fintech & Blockchain',
    portfolio: 18,
    logo: '⚡'
  },
  {
    id: 6,
    name: 'Akıllı Şehir Fonu',
    type: 'Tematik Yatırımcı',
    budget: '200K ₺ - 1M ₺',
    sector: 'Smart City & IoT',
    portfolio: 11,
    logo: '🏙️'
  }
];

const Sponsors = () => {
  return (
    <div className="sponsors-page">
      <div className="container">
        <div className="page-header fade-in-up">
          <h1 className="page-title">Sponsor & Yatırımcı Havuzu</h1>
          <p className="page-subtitle">
            Girişiminiz için uygun yatırımcıyı bulun. 50K ₺'den 10M ₺'ye kadar geniş bir fon yelpazesi sizi bekliyor.
          </p>
        </div>

        <div className="sponsors-grid">
          {MOCK_SPONSORS.map((sponsor, index) => (
            <div className={`sponsor-card fade-in-up delay-${(index % 3) + 1}`} key={sponsor.id}>
              <div className="sponsor-header">
                <div className="sponsor-logo">{sponsor.logo}</div>
                <div className="sponsor-info">
                  <h3 className="sponsor-name">{sponsor.name}</h3>
                  <p className="sponsor-type">{sponsor.type}</p>
                </div>
              </div>

              <div className="sponsor-meta">
                <div className="meta-row">
                  <span className="meta-label">Bütçe Aralığı</span>
                  <span className="meta-value">{sponsor.budget}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Sektör Odağı</span>
                  <span className="meta-value">{sponsor.sector}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Portföy Büyüklüğü</span>
                  <span className="meta-value">{sponsor.portfolio} Girişim</span>
                </div>
              </div>

              <button
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: 'auto' }}
                onClick={() => alert(`${sponsor.name} ile iletişim formu yakında yayında!`)}
              >
                Destek Talebi Gönder
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
