import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import './WriteBlog.css';

const BLOG_TAGS = ['Girişimcilik', 'Yatırım', 'Pazarlama', 'Teknoloji', 'Kariyer', 'Büyüme', 'Deneyim', 'Finans'];
const CATEGORIES = ['Girişimcilik', 'Fon', 'Teknoloji', 'Etkinlik', 'Kariyer', 'Ekosistem'];

const WriteBlog = () => {
  const { user } = useAuth();
  const { profile, saveBlogPost } = useUserProfile();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    tags: [],
    category: 'Kariyer',
    imageUrl: '',
  });

  if (profile?.role !== 'mentor') {
    return (
      <div className="writeblog-page">
        <div className="container writeblog-container">
          <div className="writeblog-restricted">
            <span>🔒</span>
            <h2>Bu alan mentörlere özel</h2>
            <p>Blog yazısı yazabilmek için profil sayfasından "Mentör" rolünü seçmen gerekiyor.</p>
            <button className="btn btn-primary" onClick={() => navigate('/profile')}>Profili Güncelle</button>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleTag = (tag) => setForm(prev => ({
    ...prev,
    tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag],
  }));

  const handleImageUrl = (e) => {
    const url = e.target.value;
    setForm(prev => ({ ...prev, imageUrl: url }));
    setImagePreview(url || null);
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
      setForm(prev => ({ ...prev, imageUrl: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const wordCount = form.content.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setSaving(true);
    
    await saveBlogPost({
      ...form,
      image: form.imageUrl || `https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80`,
      readTime: `${readTime} dk`,
      sourceName: user?.displayName || 'Mentör',
      source: '#',
      date: new Date().toISOString().split('T')[0],
      isUserPost: true,
    });
    
    setSaving(false);
    navigate('/my-content');
  };

  return (
    <div className="writeblog-page">
      <div className="container writeblog-container">

        {/* Top Bar */}
        <div className="writeblog-topbar">
          <button className="wb-back-btn" onClick={() => navigate('/my-content')}>← Geri</button>
          <div className="wb-topbar-info">
            <span className="wb-wordcount">{wordCount} kelime · ~{readTime} dk okuma</span>
            <span className="wb-points-badge">+10 ⭐</span>
          </div>
          <button className="btn btn-primary wb-publish-btn" onClick={handlePublish} disabled={saving || !form.title.trim()} id="publish-blog-btn">
            {saving ? '⏳ Yayınlanıyor...' : '🚀 Yayınla'}
          </button>
        </div>

        <div className="writeblog-layout">
          {/* ── Left: Main Editor ── */}
          <div className="writeblog-editor">
            {/* Category */}
            <div className="wb-section">
              <label className="wb-label">Kategori</label>
              <div className="wb-cats">
                {CATEGORIES.map(cat => (
                  <button key={cat} type="button"
                    className={`wb-cat-btn ${form.category === cat ? 'active' : ''}`}
                    onClick={() => setForm(p => ({ ...p, category: cat }))}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="wb-section">
              <label className="wb-label wb-required">Yazı Başlığı</label>
              <input
                name="title"
                className="wb-title-input"
                placeholder="Etkileyici bir başlık girin..."
                value={form.title}
                onChange={handleChange}
                id="blog-title-input"
              />
              {!form.title.trim() && <span className="wb-hint">Başlık zorunludur</span>}
            </div>

            {/* Summary */}
            <div className="wb-section">
              <label className="wb-label">Kısa Özet <span className="wb-optional">(Blog kartında görünür)</span></label>
              <textarea
                name="summary"
                className="wb-summary-input"
                placeholder="Okuyucuyu içine çekecek 2-3 cümlelik bir özet yazın..."
                rows={2}
                value={form.summary}
                onChange={handleChange}
                id="blog-summary-input"
              />
            </div>

            {/* Content */}
            <div className="wb-section content-section">
              <label className="wb-label wb-required">
                Yazı İçeriği
                <span className="wb-char-count">{wordCount} kelime</span>
              </label>
              <textarea
                name="content"
                className="wb-content-input"
                placeholder="Deneyimlerinizi, tavsiyelerinizi ve içgörülerinizi burada paylaşın...

Girişimcilere ipuçları, sektör analizleri, başarı ve başarısızlık hikayeleri — her şeyi yazabilirsiniz.

Paragraf oluşturmak için Enter tuşuna basın."
                rows={18}
                value={form.content}
                onChange={handleChange}
                id="blog-content-input"
              />
              {!form.content.trim() && <span className="wb-hint">İçerik zorunludur</span>}
            </div>
          </div>

          {/* ── Right: Settings Panel ── */}
          <div className="writeblog-sidebar">
            {/* Image Upload */}
            <div className="wb-sidebar-card">
              <h3 className="wb-sidebar-title">📸 Kapak Görseli</h3>

              {imagePreview ? (
                <div className="wb-img-preview-wrap">
                  <img src={imagePreview} alt="önizleme" className="wb-img-preview"
                    onError={() => setImagePreview(null)} />
                  <button className="wb-img-remove" onClick={() => { setImagePreview(null); setForm(p => ({ ...p, imageUrl: '' })); }}>
                    ✕ Kaldır
                  </button>
                </div>
              ) : (
                <div className="wb-img-upload-area" onClick={() => document.getElementById('img-file-input').click()}>
                  <span>🖼️</span>
                  <p>Tıkla veya sürükle</p>
                  <span className="wb-img-formats">PNG, JPG, WebP</span>
                </div>
              )}

              <input type="file" id="img-file-input" accept="image/*" onChange={handleImageFile} style={{ display: 'none' }} />

              <div className="wb-or-divider"><span>veya URL ile ekle</span></div>
              <input
                type="url"
                className="wb-url-input"
                placeholder="https://ornek.com/gorsel.jpg"
                value={form.imageUrl.startsWith('data:') ? '' : form.imageUrl}
                onChange={handleImageUrl}
                id="blog-img-url"
              />
            </div>

            {/* Tags */}
            <div className="wb-sidebar-card">
              <h3 className="wb-sidebar-title">🏷️ Etiketler</h3>
              <div className="wb-tags-grid">
                {BLOG_TAGS.map(tag => (
                  <button key={tag} type="button"
                    className={`wb-tag-btn ${form.tags.includes(tag) ? 'active' : ''}`}
                    onClick={() => toggleTag(tag)}>
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="wb-sidebar-card wb-author-card">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="wb-author-photo" referrerPolicy="no-referrer" />
              ) : (
                <div className="wb-author-ph">{(user?.displayName || 'M')[0]}</div>
              )}
              <div>
                <p className="wb-author-name">{user?.displayName}</p>
                <p className="wb-author-role">🎓 Mentör</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
