import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../context/UserProfileContext';
import { MENTORS_DATA } from '../data/mentors.js';
import './Mentors.css';

/* ── Score Bar ── */
const ScoreBar = ({ score, max }) => {
  const pct = Math.min(100, Math.round((score / max) * 100));
  return (
    <div className="score-bar-track">
      <div className="score-bar-fill" style={{ width: `${pct}%` }} />
    </div>
  );
};

/* ── Star Rating ── */
const Stars = ({ rating }) => (
  <span className="mentor-stars">
    {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    <span className="rating-num">{rating}</span>
  </span>
);

const Mentors = () => {
  const { getMentorScore } = useUserProfile();
  const navigate = useNavigate();

  const mentorsWithScore = MENTORS_DATA.map(m => ({
    ...m,
    totalScore: m.baseScore + getMentorScore(m.id),
  })).sort((a, b) => b.totalScore - a.totalScore);

  const maxScore = mentorsWithScore[0]?.totalScore || 1;

  const top3 = mentorsWithScore.slice(0, 3);

  return (
    <div className="mentors-page">
      <div className="mentors-bg" />
      <div className="container">

        {/* ── Header ── */}
        <div className="page-header fade-in-up">
          <div className="page-header-badge">🎓 Mentör Kadrosu</div>
          <h1 className="page-title">Sektörün En İyi Mentörleri</h1>
          <p className="page-subtitle">
            Girişim serüveninizde yalnız değilsiniz. Deneyimli mentörlerden rehberlik alın ve ekosistemi birlikte büyütelim.
          </p>
        </div>

        {/* ── Leaderboard Podium ── */}
        <div className="leaderboard-section fade-in-up delay-1">
          <div className="lb-header">
            <span className="lb-trophy">🏆</span>
            <div>
              <h2 className="lb-title">Liderlik Tablosu</h2>
              <p className="lb-desc">Kazanımlar: Blog yazısı <strong>+10 ⭐</strong> · Yönlendirme <strong>+25 ⭐</strong></p>
            </div>
          </div>

          <div className="podium-row">
            {/* 2nd */}
            {top3[1] && (
              <div className="podium-item second" onClick={() => navigate(`/mentor/${top3[1].id}`)}>
                <img src={top3[1].photo} alt={top3[1].name} className="podium-photo" />
                <span className="podium-medal">🥈</span>
                <p className="podium-name">{top3[1].name.split(' ')[0]}</p>
                <p className="podium-score">⭐ {top3[1].totalScore}</p>
                <ScoreBar score={top3[1].totalScore} max={maxScore} />
              </div>
            )}
            {/* 1st */}
            {top3[0] && (
              <div className="podium-item first" onClick={() => navigate(`/mentor/${top3[0].id}`)}>
                <div className="podium-crown">👑</div>
                <img src={top3[0].photo} alt={top3[0].name} className="podium-photo" />
                <span className="podium-medal">🥇</span>
                <p className="podium-name">{top3[0].name.split(' ')[0]}</p>
                <p className="podium-score">⭐ {top3[0].totalScore}</p>
                <ScoreBar score={top3[0].totalScore} max={maxScore} />
              </div>
            )}
            {/* 3rd */}
            {top3[2] && (
              <div className="podium-item third" onClick={() => navigate(`/mentor/${top3[2].id}`)}>
                <img src={top3[2].photo} alt={top3[2].name} className="podium-photo" />
                <span className="podium-medal">🥉</span>
                <p className="podium-name">{top3[2].name.split(' ')[0]}</p>
                <p className="podium-score">⭐ {top3[2].totalScore}</p>
                <ScoreBar score={top3[2].totalScore} max={maxScore} />
              </div>
            )}
          </div>

          {/* Full Ranking List */}
          <div className="lb-list">
            {mentorsWithScore.map((m, i) => (
              <div key={m.id} className="lb-row" onClick={() => navigate(`/mentor/${m.id}`)}>
                <span className="lb-rank">{i + 1}</span>
                <img src={m.photo} alt={m.name} className="lb-photo" />
                <div className="lb-info">
                  <span className="lb-name">{m.name}</span>
                  <span className="lb-role">{m.title}</span>
                </div>
                <div className="lb-bar-wrap">
                  <ScoreBar score={m.totalScore} max={maxScore} />
                </div>
                <span className="lb-score">⭐ {m.totalScore}</span>
                <Stars rating={m.rating} />
              </div>
            ))}
          </div>
        </div>

        {/* ── All Mentor Cards ── */}
        <div className="mentor-grid">
          {mentorsWithScore.map((mentor, index) => (
            <div
              key={mentor.id}
              className={`mentor-card fade-in-up delay-${(index % 4) + 1}`}
              onClick={() => navigate(`/mentor/${mentor.id}`)}
            >
              <div className="mentor-card-photo-wrap">
                <img src={mentor.photo} alt={mentor.name} className="mentor-card-photo" />
                <div className="mentor-card-score-badge">⭐ {mentor.totalScore}</div>
              </div>
              <div className="mentor-body">
                <h3 className="mentor-name">{mentor.name}</h3>
                <p className="mentor-title">{mentor.title}</p>
                <Stars rating={mentor.rating} />
                <div className="mentor-tags">
                  {mentor.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                </div>
                <div className="mentor-card-footer">
                  <span className="mentor-sessions">🎯 {mentor.sessionsGiven} görüşme</span>
                  <span className="mentor-detail-link">Profile Git →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Mentors;
