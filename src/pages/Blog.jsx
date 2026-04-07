import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserProfile } from '../context/UserProfileContext';
import { newsData, categories } from '../data/news.js';
import './Blog.css';

const Blog = () => {
  const { profile, getUserBlogPosts } = useUserProfile();
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  const isMentor = profile?.role === 'mentor';

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Statik haberlere dönüldü, ancak Firebase'den gelen kullanıcı postları da asenkron olarak çözümleniyor (opsiyonel)
    getUserBlogPosts().then(posts => {
      setUserPosts(posts || []);
    }).catch(e => {
      console.error(e);
      setUserPosts([]);
    });
  }, [getUserBlogPosts]);

  // Kullanıcı yazıları + statik haberler
  const allNews = [
    ...userPosts.map(p => ({ ...p, isUserPost: true })),
    ...newsData,
  ];

  const filtered = allNews.filter(item => {
    const matchCat = activeCategory === 'Tümü' || item.category === activeCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.summary || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

  const categoryColors = {
    'Fon': '#22c55e',
    'Teknoloji': '#6366f1',
    'Etkinlik': '#f59e0b',
    'Kariyer': '#ec4899',
    'Ekosistem': '#06b6d4',
    'Girişimcilik': '#8b5cf6',
  };

  return (
    <div className="blog-page">
      <div className="blog-bg" />

      <div className="container blog-container">
        {/* ── Hero ── */}
        <div className="blog-hero fade-in-up">

          <h1 className="blog-title">
            Girişimcilik <span className="text-gradient">Haberleri</span>
          </h1>
          <p className="blog-subtitle">
            Türkiye ve dünya girişim ekosisteminden en güncel haber ve fırsatlar
          </p>

          {/* Mentor "Yazı Yaz" butonu */}
          {isMentor && (
            <Link to="/write-blog" className="btn btn-primary write-blog-btn" id="write-blog-btn">
              ✍️ Blog Yazısı Yaz
            </Link>
          )}

        </div>

        {/* ── Search ── */}
        <div className="blog-search-wrap fade-in-up delay-1">
          <div className="blog-search">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              id="blog-search"
              className="blog-search-input"
              placeholder="Haber ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="blog-filters fade-in-up delay-2">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              id={`filter-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="blog-empty fade-in-up">
            <span>🔍</span>
            <p>Bu kriterlerde haber bulunamadı.</p>
          </div>
        ) : (
          <div className="blog-grid">
            {filtered.map((item, idx) => (
              <a
                key={item.id}
                href={item.isUserPost ? '#' : item.source}
                target={item.isUserPost ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`blog-card fade-in-up ${idx === 0 ? 'featured' : ''} ${item.isUserPost ? 'user-post' : ''}`}
                id={`news-card-${item.id}`}
                style={{ animationDelay: `${idx * 0.06}s` }}
              >


                <div className="blog-card-img-wrap">
                  <img
                    src={item.image || `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80`}
                    alt={item.title}
                    className="blog-card-img"
                    loading="lazy"
                  />
                  <span
                    className="blog-card-category"
                    style={{ background: categoryColors[item.category] || '#6366f1' }}
                  >
                    {item.category}
                  </span>
                </div>

                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-card-source">{item.sourceName}</span>
                    <span className="blog-card-dot">·</span>
                    <span className="blog-card-date">{formatDate(item.date || item.createdAt)}</span>
                    <span className="blog-card-dot">·</span>
                    <span className="blog-card-read">{item.readTime}</span>
                  </div>

                  <h2 className="blog-card-title">{item.title}</h2>
                  <p className="blog-card-summary">{item.summary}</p>

                  <div className="blog-card-tags">
                    {(item.tags || []).map(tag => (
                      <span key={tag} className="blog-tag">#{tag}</span>
                    ))}
                  </div>

                  <div className="blog-card-footer">
                    <span className="blog-read-link">
                      {item.isUserPost ? 'Yazıyı Oku' : 'Habere Git'}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14">
                        <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
