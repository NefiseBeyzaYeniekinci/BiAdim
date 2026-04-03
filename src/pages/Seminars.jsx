import { SEMINARS_DATA } from '../data/mentors.js';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Seminars.css';

const Seminars = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (seminar) => {
    if (!user) {
      navigate('/auth?mode=login');
      return;
    }
    alert(`"${seminar.title}" seminerine kaydınız başarıyla alındı! Detaylar email adresinize gönderilecektir.`);
  };

  return (
    <div className="seminars-page">
      <div className="seminars-bg" />
      <div className="container seminars-container">

        <div className="page-header fade-in-up">
          <div className="page-header-badge">🎓 Etkinlikler</div>
          <h1 className="page-title">Aktif & Yaklaşan Seminerler</h1>
          <p className="page-subtitle">
            Mentörlerimizin düzenlediği seminerlere kaydolun, girişimcilik ekosistemindeki gelişmelerden haberdar olun ve kendinizi geliştirin.
          </p>
        </div>

        <div className="seminars-grid">
          {SEMINARS_DATA.sort((a, b) => a.status === 'active' ? -1 : 1).map((seminar, idx) => {
            const statusMap = {
              active: { label: '🔴 CANLI', cls: 'status-live' },
              upcoming: { label: '🟡 Yaklaşan', cls: 'status-upcoming' },
              full: { label: '⛔ Dolu', cls: 'status-full' },
            };
            const st = statusMap[seminar.status] || statusMap.upcoming;
            const dateStr = new Date(seminar.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
            const pct = Math.round((seminar.registered / seminar.capacity) * 100);

            return (
              <div key={seminar.id} className={`seminar-card fade-in-up delay-${(idx % 4) + 1} ${seminar.status === 'active' ? 'seminar-live' : ''}`}>
                <div className="seminar-top">
                  <img src={seminar.mentorPhoto} alt={seminar.mentorName} className="seminar-mentor-photo" />
                  <div className="seminar-top-info">
                    <span className={`seminar-status ${st.cls}`}>{st.label}</span>
                    <p className="seminar-mentor-name">{seminar.mentorName}</p>
                  </div>
                  <span className="seminar-price">{seminar.price}</span>
                </div>

                <div className="seminar-body">
                  <h3 className="seminar-title">{seminar.title}</h3>
                  <p className="seminar-desc">{seminar.description}</p>

                  <div className="seminar-meta">
                    <span>📅 {dateStr}</span>
                    <span>🕐 {seminar.time}</span>
                    <span>⏱ {seminar.duration}</span>
                    <span>{seminar.type === 'online' ? '💻 Online' : '🏢 Yüz yüze'}</span>
                  </div>

                  <div className="seminar-capacity">
                    <div className="cap-bar-track">
                      <div className="cap-bar-fill" style={{ width: `${pct}%`, background: pct >= 100 ? '#ef4444' : pct > 75 ? '#f59e0b' : '#22c55e' }} />
                    </div>
                    <span className="cap-text">{seminar.registered}/{seminar.capacity} kayıt</span>
                  </div>
                </div>

                <button
                  className={`btn seminar-btn ${seminar.status === 'full' ? 'btn-disabled' : 'btn-primary'}`}
                  disabled={seminar.status === 'full'}
                  onClick={() => handleRegister(seminar)}
                >
                  {seminar.status === 'full' ? '⛔ Kontenjan Dolu' : seminar.status === 'active' ? '🔴 Şimdi Katıl' : '✅ Kayıt Ol'}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Seminars;
