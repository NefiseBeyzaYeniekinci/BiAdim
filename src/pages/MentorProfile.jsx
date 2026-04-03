import { useParams, useNavigate, Link } from 'react-router-dom';
import { MENTORS_DATA } from '../data/mentors.js';
import { useUserProfile } from '../context/UserProfileContext';
import { useAuth } from '../context/AuthContext';
import './MentorProfile.css';

/* Mock yorumlar — ileride Firestore'dan gelecek */
const MOCK_REVIEWS = {
  m1: [
    { id: 1, name: 'Ayça D.', role: 'Girişimci', text: 'Mustafa Bey ile 3 seans yaptık. Pitch deck\'imizi baştan aşağı yeniden yapılandırdı. Yatırımcı toplantısına çok daha hazır girdik.', rating: 5, date: '2025-03-10' },
    { id: 2, name: 'Serhat K.', role: 'Startup Kurucusu', text: 'Teknik mimari konusunda paha biçilmez tavsiyeler aldım. MVP sürecimizi 2 aydan 3 haftaya indirdi.', rating: 5, date: '2025-02-28' },
    { id: 3, name: 'Melis T.', role: 'Co-founder', text: 'Yatırımcı ağına erişim gerçekten fark yarattı. Tohum turunu kapatmamıza büyük katkısı oldu.', rating: 4, date: '2025-02-14' },
  ],
  m2: [
    { id: 1, name: 'Berk A.', role: 'E-ticaret Girişimcisi', text: 'Marka kimliğimizi sıfırdan oluşturduk. Elif Hanım\'ın verdiği yönlendirmelerle 6 ayda %300 büyüme elde ettik.', rating: 5, date: '2025-03-15' },
    { id: 2, name: 'Nur Y.', role: 'SaaS Kurucusu', text: 'İçerik stratejimizi ve sosyal medya planımızı kurgulamamıza yardımcı oldu. Çok pratik ve uygulanabilir tavsiyeler.', rating: 5, date: '2025-02-20' },
  ],
  m3: [
    { id: 1, name: 'Kaan S.', role: 'FinTech Girişimcisi', text: 'Finansal modelimizi yatırımcıların anlayacağı dile çevirdi. Due diligence sürecinde yanımızda olması çok değerliydi.', rating: 5, date: '2025-03-05' },
  ],
  m4: [
    { id: 1, name: 'Ece B.', role: 'Ürün Yöneticisi', text: 'Kullanıcı araştırması metodolojisini kökten değiştirdi. Artık gerçek verilere dayalı kararlar alıyoruz.', rating: 5, date: '2025-03-20' },
    { id: 2, name: 'Ali M.', role: 'Startup Kurucusu', text: 'Figma\'da interaktif prototip oluşturmayı öğrendik. Müşterilerle çok daha verimli toplantılar yapıyoruz.', rating: 4, date: '2025-02-10' },
  ],
};

const DEFAULT_REVIEWS = [
  { id: 1, name: 'Kullanıcı A.', role: 'Girişimci', text: 'Çok faydalı bir mentorluk deneyimiydi. Kesinlikle tavsiye ederim.', rating: 5, date: '2025-03-01' },
];

const CASE_STUDIES = {
  m1: [
    { title: 'TechStart\'ın İlk Yatırım Turu', desc: '3 ayda 1.5M dolar tohum yatırımı kapattık', metric: '1.5M $', icon: '💰' },
    { title: 'Ürün-Pazar Uyumu Bulma', desc: '6 aylık pivot sürecinde doğru müşteri segmentini keşfettik', metric: '6 ay', icon: '🎯' },
    { title: 'Uluslararası Genişleme', desc: 'DACH bölgesine açılım stratejisi ve ilk satışlar', metric: '3 ülke', icon: '🌍' },
  ],
  m2: [
    { title: 'Sıfır Bütçeyle Viral Kampanya', desc: 'Sosyal medya stratejisiyle 2 haftada 50K takipçi', metric: '50K takipçi', icon: '📱' },
    { title: 'Marka Kimliği Yenileme', desc: 'Rebranding sonrası %40 dönüşüm artışı', metric: '%40 artış', icon: '✨' },
  ],
  m3: [
    { title: 'SaaS Gelir Modeli Optimizasyonu', desc: 'Fiyatlandırma stratejisi revizyonuyla MRR\'ı 3x artırdık', metric: '3x MRR', icon: '📈' },
  ],
};

const DEFAULT_CASES = [
  { title: 'Başarılı Danışmanlık Projesi', desc: 'Girişimlerin büyüme hedeflerine ulaşmalarına katkı sağladım', metric: '25+ danışan', icon: '🏆' },
];

const Stars = ({ rating }) => (
  <span className="mp-stars">
    {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
  </span>
);

const MentorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, guidedByMentor, getMentorScore } = useUserProfile();

  const mentor = MENTORS_DATA.find(m => m.id === id);

  if (!mentor) {
    return (
      <div className="mp-not-found">
        <h2>Mentör bulunamadı</h2>
        <Link to="/mentors" className="btn btn-primary">← Mentörlere Dön</Link>
      </div>
    );
  }

  const totalScore = mentor.baseScore + getMentorScore(mentor.id);
  const reviews = MOCK_REVIEWS[mentor.id] || DEFAULT_REVIEWS;
  const cases = CASE_STUDIES[mentor.id] || DEFAULT_CASES;
  const isEntrepreneur = profile?.role === 'girisimci';

  const handleGuide = () => {
    if (!user) { navigate('/auth?mode=login'); return; }
    guidedByMentor(mentor.id);
    alert(`${mentor.name} ile mentorluk talebi oluşturuldu! (+25 ⭐ kazanıldı)`);
  };

  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="mp-page">
      {/* ── Hero ── */}
      <div className="mp-hero">
        <div className="mp-hero-bg" />
        <div className="container mp-hero-container">
          <button className="mp-back-btn" onClick={() => navigate('/mentors')}>← Mentörlere Dön</button>

          <div className="mp-hero-card">
            <div className="mp-photo-wrap">
              <img src={mentor.photo} alt={mentor.name} className="mp-photo" />
              <div className="mp-score-ring">⭐ {totalScore}</div>
            </div>

            <div className="mp-hero-info">
              <div className="mp-tags-row">
                {mentor.tags.map(t => <span key={t} className="mp-tag">{t}</span>)}
              </div>
              <h1 className="mp-name">{mentor.name}</h1>
              <p className="mp-title">{mentor.title}</p>
              <p className="mp-subtitle">{mentor.subtitle}</p>

              <div className="mp-meta-row">
                <span>📍 {mentor.location}</span>
                <span>🌍 {mentor.languages.join(' · ')}</span>
                <span>🎯 {mentor.sessionsGiven} görüşme</span>
                <span><Stars rating={parseFloat(avgRating)} /> {avgRating} ({reviews.length} yorum)</span>
              </div>

              {isEntrepreneur && (
                <button className="btn btn-primary mp-action-btn" onClick={handleGuide} id={`guide-btn-${mentor.id}`}>
                  🤝 Mentorluk Talep Et
                </button>
              )}
              {!user && (
                <Link to="/auth?mode=login" className="btn btn-primary mp-action-btn">Giriş Yap → Mentorluk Al</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mp-body">
        <div className="mp-grid">
          {/* ── Left Column ── */}
          <div className="mp-left">
            {/* About */}
            <section className="mp-section">
              <h2 className="mp-section-title">Hakkında</h2>
              <p className="mp-bio">{mentor.bio}</p>
            </section>

            {/* Expertise */}
            <section className="mp-section">
              <h2 className="mp-section-title">Uzmanlık Alanları</h2>
              <div className="mp-expertise-grid">
                {mentor.expertise.map(ex => (
                  <div key={ex} className="mp-expertise-item">
                    <span>✓</span>
                    <span>{ex}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Case Studies */}
            <section className="mp-section">
              <h2 className="mp-section-title">Başarı Hikayeleri</h2>
              <div className="mp-cases">
                {cases.map((c, i) => (
                  <div key={i} className="mp-case-card">
                    <span className="mp-case-icon">{c.icon}</span>
                    <div className="mp-case-body">
                      <h3>{c.title}</h3>
                      <p>{c.desc}</p>
                    </div>
                    <span className="mp-case-metric">{c.metric}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="mp-section">
              <div className="mp-reviews-header">
                <h2 className="mp-section-title">Yorumlar</h2>
                <span className="mp-avg-rating">⭐ {avgRating} / 5</span>
              </div>
              <div className="mp-reviews">
                {reviews.map(r => (
                  <div key={r.id} className="mp-review-card">
                    <div className="mp-review-top">
                      <div className="mp-reviewer-avatar">{r.name[0]}</div>
                      <div>
                        <p className="mp-reviewer-name">{r.name}</p>
                        <p className="mp-reviewer-role">{r.role}</p>
                      </div>
                      <Stars rating={r.rating} />
                    </div>
                    <p className="mp-review-text">"{r.text}"</p>
                    <span className="mp-review-date">{new Date(r.date).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="mp-right">
            {/* Stats */}
            <div className="mp-sidebar-card">
              <h3 className="mp-sidebar-title">İstatistikler</h3>
              <div className="mp-stats">
                <div className="mp-stat"><span className="mp-stat-val">⭐ {totalScore}</span><span className="mp-stat-lbl">Toplam Yıldız</span></div>
                <div className="mp-stat"><span className="mp-stat-val">📝 {mentor.blogCount}</span><span className="mp-stat-lbl">Blog Yazısı</span></div>
                <div className="mp-stat"><span className="mp-stat-val">🤝 {mentor.guidedCount}</span><span className="mp-stat-lbl">Yönlendirme</span></div>
                <div className="mp-stat"><span className="mp-stat-val">🎯 {mentor.sessionsGiven}</span><span className="mp-stat-lbl">Toplam Görüşme</span></div>
              </div>
            </div>

            {/* Links */}
            <div className="mp-sidebar-card">
              <h3 className="mp-sidebar-title">Bağlantılar</h3>
              <a href={`https://linkedin.com/in/${mentor.linkedin}`} target="_blank" rel="noopener noreferrer" className="mp-link-btn">
                <span>💼</span> LinkedIn Profili
              </a>
            </div>

            {/* CTA */}
            {isEntrepreneur && (
              <div className="mp-sidebar-cta">
                <h3>Bu mentörden destek al</h3>
                <p>Girişimini bir üst seviyeye taşımak için {mentor.name.split(' ')[0]} ile çalış.</p>
                <button className="btn btn-primary" onClick={handleGuide} style={{ width: '100%' }}>
                  🤝 Mentorluk Talep Et
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
