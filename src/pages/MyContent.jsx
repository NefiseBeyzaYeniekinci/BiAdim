import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './MyContent.css';

const MyContent = () => {
  const { user } = useAuth();
  const { profile, getUserBlogPosts } = useUserProfile();
  const navigate = useNavigate();
  const [deletedIds, setDeletedIds] = useState([]);
  const [confirmId, setConfirmId] = useState(null);

  if (profile?.role !== 'mentor') {
    return (
      <div className="mycontent-page">
        <div className="container mycontent-container">
          <div className="mycontent-restricted">
            <span>🔒</span>
            <h2>Bu alan mentörlere özel</h2>
            <p>İçeriklerini yönetmek için önce "Mentör" rolünü seçmen gerekiyor.</p>
            <button className="btn btn-primary" onClick={() => navigate('/profile')}>Profili Güncelle</button>
          </div>
        </div>
      </div>
    );
  }

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firestore'dan blog yazilarini al
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;
      const all = await getUserBlogPosts();
      setPosts(all.filter(p => p.authorId === user.uid));
      setLoading(false);
    };
    fetchPosts();
  }, [user, getUserBlogPosts]);

  const allPosts = posts.filter(p => !deletedIds.includes(p.id));

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'blogs', id));
      setDeletedIds(prev => [...prev, id]);
      setConfirmId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="mycontent-page">
      <div className="container mycontent-container">

        {/* Header */}
        <div className="mycontent-header">
          <div>
            <h1 className="mycontent-title">İçerik Panelim</h1>
            <p className="mycontent-subtitle">Yazdığın blog yazılarını yönet, düzenle veya sil.</p>
          </div>
          <Link to="/write-blog" className="btn btn-primary" id="new-post-btn">
            ✍️ Yeni Yazı Yaz
          </Link>
        </div>

        {/* Stats */}
        <div className="mycontent-stats">
          <div className="mc-stat">
            <span className="mc-stat-val">{allPosts.length}</span>
            <span className="mc-stat-lbl">Toplam Yazı</span>
          </div>
          <div className="mc-stat">
            <span className="mc-stat-val">⭐ {profile?.score || 0}</span>
            <span className="mc-stat-lbl">Kazanılan Yıldız</span>
          </div>
          <div className="mc-stat">
            <span className="mc-stat-val">{allPosts.length * 10}</span>
            <span className="mc-stat-lbl">Blog Yıldızı</span>
          </div>
        </div>

        {/* Posts List */}
        {allPosts.length === 0 ? (
          <div className="mycontent-empty">
            <span>📝</span>
            <h3>Henüz yazı yayınlamadın</h3>
            <p>İlk blog yazını yayınla ve +10 ⭐ kazan!</p>
            <Link to="/write-blog" className="btn btn-primary">İlk Yazını Yaz</Link>
          </div>
        ) : (
          <div className="mc-posts-list">
            {allPosts.map(post => (
              <div key={post.id} className="mc-post-card">
                {post.image && (
                  <div className="mc-post-img-wrap">
                    <img src={post.image} alt={post.title} className="mc-post-img" />
                  </div>
                )}
                <div className="mc-post-body">
                  <div className="mc-post-meta">
                    <span className="mc-post-cat" style={{ background: 'var(--color-primary)', color: 'var(--color-text-main)' }}>{post.category}</span>
                    <span className="mc-post-date">{formatDate(post.createdAt || post.date)}</span>
                    <span className="mc-post-read">{post.readTime}</span>
                  </div>
                  <h3 className="mc-post-title">{post.title}</h3>
                  <p className="mc-post-summary">{post.summary}</p>
                  <div className="mc-post-tags">
                    {(post.tags || []).map(t => <span key={t} className="mc-tag">#{t}</span>)}
                  </div>
                </div>
                <div className="mc-post-actions">
                  <span className="mc-score-badge">+10 ⭐</span>
                  {confirmId === post.id ? (
                    <div className="mc-confirm">
                      <span>Silmek istediğine emin misin?</span>
                      <button className="btn-sm btn-danger-sm" onClick={() => handleDelete(post.id)} id={`confirm-delete-${post.id}`}>Evet, Sil</button>
                      <button className="btn-sm btn-cancel-sm" onClick={() => setConfirmId(null)}>İptal</button>
                    </div>
                  ) : (
                    <button className="mc-delete-btn" onClick={() => setConfirmId(post.id)} id={`delete-post-${post.id}`}>
                      🗑️ Sil
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContent;
