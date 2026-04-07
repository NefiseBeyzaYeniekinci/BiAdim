import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import './WriteBlog.css';

const DEFAULT_TAGS = ['Girişimcilik', 'Yatırım', 'Pazarlama', 'Teknoloji', 'Kariyer', 'Büyüme', 'Deneyim', 'Finans'];
const CATEGORIES = ['Girişimcilik', 'Fon', 'Teknoloji', 'Etkinlik', 'Kariyer', 'Ekosistem'];
const DRAFT_KEY = 'biadim_blog_draft';

const emptyForm = {
  title: '',
  summary: '',
  content: '',
  tags: [],
  category: 'Kariyer',
  imageUrl: '',
};

const WriteBlog = () => {
  const { user } = useAuth();
  const { profile, saveBlogPost } = useUserProfile();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // Custom tags state (user-defined + defaults)
  const [allTags, setAllTags] = useState(DEFAULT_TAGS);
  const [customTagInput, setCustomTagInput] = useState('');
  const [customTagError, setCustomTagError] = useState('');

  // Draft banner
  const [draftRestored, setDraftRestored] = useState(false);

  // ── Restore draft from sessionStorage on mount ──
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.title || parsed.content || parsed.summary)) {
          setForm(prev => ({ ...prev, ...parsed }));
          // Restore any custom tags that aren't in defaults
          if (parsed.tags?.length) {
            setAllTags(prev => {
              const extra = parsed.tags.filter(t => !prev.includes(t));
              return extra.length ? [...prev, ...extra] : prev;
            });
          }
          if (parsed.imageUrl && !parsed.imageUrl.startsWith('data:')) {
            setImagePreview(parsed.imageUrl);
          }
          setDraftRestored(true);
        }
      }
    } catch {/* ignore */}
  }, []);

  // ── Auto-save draft to sessionStorage whenever form changes ──
  const saveDraft = useCallback((formData) => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    } catch {/* ignore */}
  }, []);

  useEffect(() => {
    // Only save if there's something worth saving
    if (form.title || form.content || form.summary) {
      saveDraft(form);
    }
  }, [form, saveDraft]);

  const clearDraft = () => {
    try { sessionStorage.removeItem(DRAFT_KEY); } catch {/* ignore */}
  };

  // ── Role guard ──
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

  // ── Handlers ──
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

  // ── Custom tag creation ──
  const handleCustomTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addCustomTag();
    }
  };

  const addCustomTag = () => {
    const raw = customTagInput.trim().replace(/^#/, '');
    if (!raw) return;

    if (raw.length > 24) {
      setCustomTagError('Etiket en fazla 24 karakter olabilir.');
      return;
    }
    if (allTags.map(t => t.toLowerCase()).includes(raw.toLowerCase())) {
      setCustomTagError('Bu etiket zaten var.');
      return;
    }

    setAllTags(prev => [...prev, raw]);
    // Auto-select newly created tag
    setForm(prev => ({ ...prev, tags: [...prev.tags, raw] }));
    setCustomTagInput('');
    setCustomTagError('');
  };

  const removeCustomTag = (tag) => {
    if (DEFAULT_TAGS.includes(tag)) return; // Can't remove defaults
    setAllTags(prev => prev.filter(t => t !== tag));
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const wordCount = form.content.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setSaving(true);
    setPublishError('');

    try {
      const result = await saveBlogPost({
        ...form,
        image: form.imageUrl || `https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80`,
        readTime: `${readTime} dk`,
        sourceName: user?.displayName || 'Mentör',
        source: '#',
        date: new Date().toISOString().split('T')[0],
        isUserPost: true,
      });

      if (!result) {
        // saveBlogPost null döndürdü → Firestore hatası
        setPublishError('Blog yayınlanamadı. İnternet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.');
        setSaving(false);
        return;
      }

      clearDraft();
      navigate('/my-content');
    } catch (err) {
      console.error('Yayınlama hatası:', err);
      setPublishError('Beklenmedik bir hata oluştu: ' + (err?.message || 'Bilinmeyen hata'));
    } finally {
      setSaving(false);
    }
  };

  const handleDiscardDraft = () => {
    clearDraft();
    setForm(emptyForm);
    setImagePreview(null);
    setAllTags(DEFAULT_TAGS);
    setDraftRestored(false);
  };

  return (
    <div className="writeblog-page">
      <div className="container writeblog-container">

        {/* Draft Restored Banner */}
        {draftRestored && (
          <div className="wb-draft-banner" role="alert">
            <span className="wb-draft-icon">💾</span>
            <span>
              <strong>Taslağın geri yüklendi!</strong>{' '}
              Tarayıcı kapanmadan önceki çalışman burada seni bekliyordu.
            </span>
            <div className="wb-draft-actions">
              <button className="wb-draft-dismiss" onClick={() => setDraftRestored(false)}>✓ Tamam</button>
              <button className="wb-draft-discard" onClick={handleDiscardDraft}>Sil &amp; Temizle</button>
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div className="writeblog-topbar">
          <button className="wb-back-btn" onClick={() => navigate('/my-content')}>← Geri</button>
          <div className="wb-topbar-info">
            <span className="wb-wordcount">{wordCount} kelime · ~{readTime} dk okuma</span>
            <span className="wb-points-badge">+10 ⭐</span>
            {(form.title || form.content) && (
              <span className="wb-draft-live-badge">💾 Otomatik kaydediliyor</span>
            )}
          </div>
          <button
            className="btn btn-primary wb-publish-btn"
            onClick={handlePublish}
            disabled={saving || !form.title.trim()}
            id="publish-blog-btn"
          >
            {saving ? '⏳ Yayınlanıyor...' : '🚀 Yayınla'}
          </button>
        </div>

        {/* Publish Error Banner */}
        {publishError && (
          <div className="wb-error-banner" role="alert">
            <span>⚠️</span>
            <span>{publishError}</span>
            <button className="wb-error-close" onClick={() => setPublishError('')}>✕</button>
          </div>
        )}

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
                placeholder={`Deneyimlerinizi, tavsiyelerinizi ve içgörülerinizi burada paylaşın...\n\nGirişimcilere ipuçları, sektör analizleri, başarı ve başarısızlık hikayeleri — her şeyi yazabilirsiniz.\n\nParagraf oluşturmak için Enter tuşuna basın.`}
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
                {allTags.map(tag => (
                  <div key={tag} className="wb-tag-wrap">
                    <button
                      type="button"
                      className={`wb-tag-btn ${form.tags.includes(tag) ? 'active' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      #{tag}
                    </button>
                    {!DEFAULT_TAGS.includes(tag) && (
                      <button
                        className="wb-tag-remove"
                        onClick={() => removeCustomTag(tag)}
                        title="Etiketi sil"
                        type="button"
                      >×</button>
                    )}
                  </div>
                ))}
              </div>

              {/* Custom tag input */}
              <div className="wb-custom-tag-row">
                <input
                  type="text"
                  className="wb-custom-tag-input"
                  placeholder="Yeni etiket ekle..."
                  value={customTagInput}
                  onChange={e => { setCustomTagInput(e.target.value); setCustomTagError(''); }}
                  onKeyDown={handleCustomTagKeyDown}
                  id="custom-tag-input"
                  maxLength={25}
                />
                <button
                  type="button"
                  className="wb-custom-tag-add"
                  onClick={addCustomTag}
                  disabled={!customTagInput.trim()}
                  title="Enter veya tıkla"
                >
                  +
                </button>
              </div>
              {customTagError && <p className="wb-tag-error">{customTagError}</p>}
              <p className="wb-tag-hint">Enter veya + ile yeni etiket oluştur</p>
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
