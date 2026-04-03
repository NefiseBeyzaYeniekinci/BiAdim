import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import { MOCK_SPONSORS, SECTORS, STAGES, SUPPORT_TYPES } from '../data/sponsors';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './SponsorApply.css';

const STEPS = ['Proje Bilgileri', 'Vizyon & Fikir', 'Destek Talebi', 'Önizleme'];

const SponsorApply = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sponsor = MOCK_SPONSORS.find(s => s.id === parseInt(id));

  const [form, setForm] = useState({
    projectName: profile?.projectName || '',
    sector: profile?.sector || '',
    stage: profile?.stage || '',
    teamSize: '',
    website: '',
    vision: '',
    problem: '',
    solution: '',
    targetMarket: '',
    traction: '',
    supportType: '',
    supportAmount: '',
    supportUse: '',
    contactEmail: user?.email || '',
    contactName: user?.displayName || '',
    linkedin: '',
  });

  if (!sponsor) {
    return (
      <div className="sp-apply-page">
        <div className="container" style={{ textAlign: 'center', padding: '10rem 0' }}>
          <h2>Yatırımcı bulunamadı</h2>
          <button className="btn btn-primary" onClick={() => navigate('/sponsors')}>Sponsorlara Dön</button>
        </div>
      </div>
    );
  }

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'applications'), {
        ...form,
        sponsorId: sponsor.id,
        sponsorName: sponsor.name,
        userId: user?.uid || 'guest',
        status: 'pending', // pending, approved, rejected
        note: 'Başvurunuz inceleme komitesine iletilmiştir.',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Başvuru gönderilirken hata oluştu:", error);
      alert("Hata oluştu. Tekrar deneyiniz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sp-apply-page">
      <div className="container sp-apply-container">
        <button className="sp-back-btn" onClick={() => navigate('/sponsors')}>← Sponsorlara Dön</button>

        <div className="sp-form-card">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="sp-form-header">
                <div className="sp-form-sponsor">
                  <span className="sp-logo">{sponsor.logo}</span>
                  <div>
                    <h1 className="sp-to">{sponsor.name} Başvuru Formu</h1>
                    <p className="sp-budget">Yatırım Bütçesi: {sponsor.budget}</p>
                  </div>
                </div>
                {/* Progress */}
                <div className="sp-progress">
                  {STEPS.map((s, i) => (
                    <div key={s} className={`sp-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                      <div className="sp-step-dot">{i < step ? '✓' : i + 1}</div>
                      <span className="sp-step-label">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Step 0: Proje Bilgileri ── */}
              {step === 0 && (
                <div className="sp-step-body fade-in-up">
                  <h2 className="sp-step-title">Proje Bilgileri</h2>
                  <p className="sp-step-desc">Yatırımcı sizi tanısın. Temel proje bilgilerinizi girin.</p>
                  <div className="form-group">
                    <label className="form-label">Ad Soyad *</label>
                    <input name="contactName" className="form-input" value={form.contactName} onChange={handleChange} placeholder="Adınız Soyadınız" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-posta *</label>
                    <input name="contactEmail" type="email" className="form-input" value={form.contactEmail} onChange={handleChange} placeholder="iletisim@startup.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Startup / Proje Adı *</label>
                    <input name="projectName" className="form-input" value={form.projectName} onChange={handleChange} placeholder="örn: PayFlow, MedAI..." required />
                  </div>
                  <div className="sp-two-col">
                    <div className="form-group">
                      <label className="form-label">Sektör *</label>
                      <select name="sector" className="form-input" value={form.sector} onChange={handleChange}>
                        <option value="">Seçiniz</option>
                        {SECTORS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Aşama *</label>
                      <select name="stage" className="form-input" value={form.stage} onChange={handleChange}>
                        <option value="">Seçiniz</option>
                        {STAGES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="sp-two-col">
                    <div className="form-group">
                      <label className="form-label">Ekip Büyüklüğü</label>
                      <input name="teamSize" className="form-input" value={form.teamSize} onChange={handleChange} placeholder="örn: 3 kişi" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Website / Demo</label>
                      <input name="website" type="url" className="form-input" value={form.website} onChange={handleChange} placeholder="https://..." />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 1: Vizyon & Fikir ── */}
              {step === 1 && (
                <div className="sp-step-body fade-in-up">
                  <h2 className="sp-step-title">Vizyon & Fikir</h2>
                  <p className="sp-step-desc">Çözdüğünüz problemi ve sunduğunuz çözümü anlatın.</p>
                  <div className="form-group">
                    <label className="form-label">Misyon & Vizyon *</label>
                    <textarea name="vision" className="form-input form-textarea" value={form.vision} onChange={handleChange} rows={3} placeholder="Girişiminizin misyonunu ve 5 yıllık vizyonunu kısaca açıklayın." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Çözdüğünüz Problem *</label>
                    <textarea name="problem" className="form-input form-textarea" value={form.problem} onChange={handleChange} rows={3} placeholder="Hangi sorunu çözüyorsunuz? Bu sorunun büyüklüğü nedir?" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Çözümünüz *</label>
                    <textarea name="solution" className="form-input form-textarea" value={form.solution} onChange={handleChange} rows={3} placeholder="Ürününüz / hizmetiniz bu problemi nasıl çözüyor? Rekabetten farkınız nedir?" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hedef Pazar</label>
                    <input name="targetMarket" className="form-input" value={form.targetMarket} onChange={handleChange} placeholder="Hedef kitleniz kimler? Pazar büyüklüğünüz nedir?" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mevcut Traction (Kullanıcı / Gelir / MVP)</label>
                    <textarea name="traction" className="form-input form-textarea" value={form.traction} onChange={handleChange} rows={2} placeholder="Bugüne kadar ne elde ettiniz? Kullanıcı sayısı, gelir, beta dönemi vb." />
                  </div>
                </div>
              )}

              {/* ── Step 2: Destek Talebi ── */}
              {step === 2 && (
                <div className="sp-step-body fade-in-up">
                  <h2 className="sp-step-title">Destek Talebi</h2>
                  <p className="sp-step-desc">Ne tür bir desteğe ihtiyacınız var? Yatırımcıya net bir tablo sunun.</p>
                  <div className="form-group">
                    <label className="form-label">Destek Türü *</label>
                    <div className="sp-support-types">
                      {SUPPORT_TYPES.map(t => (
                        <button key={t} type="button"
                          className={`support-type-btn ${form.supportType === t ? 'active' : ''}`}
                          onClick={() => setForm(p => ({ ...p, supportType: t }))}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Talep Edilen Tutar / Katkı</label>
                    <input name="supportAmount" className="form-input" value={form.supportAmount} onChange={handleChange} placeholder="örn: 500.000 TL, 50.000 dolar..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bu Destek Nasıl Kullanılacak? *</label>
                    <textarea name="supportUse" className="form-input form-textarea" value={form.supportUse} onChange={handleChange} rows={4} placeholder="Alacağınız desteği hangi alanlarda (ürün geliştirme, pazarlama, ekip, vb.) ve ne kadar sürede kullanmayı planlıyorsunuz?" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LinkedIn Profili</label>
                    <input name="linkedin" className="form-input" value={form.linkedin} onChange={handleChange} placeholder="linkedin.com/in/kullanici-adi" />
                  </div>
                </div>
              )}

              {/* ── Step 3: Preview ── */}
              {step === 3 && (
                <div className="sp-step-body fade-in-up">
                  <h2 className="sp-step-title">Başvurunuzu Önizleyin</h2>
                  <p className="sp-step-desc">Göndermeden önce bilgilerinizi gözden geçirin.</p>
                  <div className="sp-preview">
                    <div className="preview-row"><span>👤 Ad Soyad</span><strong>{form.contactName}</strong></div>
                    <div className="preview-row"><span>📧 E-posta</span><strong>{form.contactEmail}</strong></div>
                    <div className="preview-row"><span>🚀 Proje</span><strong>{form.projectName}</strong></div>
                    <div className="preview-row"><span>🏷️ Sektör</span><strong>{form.sector}</strong></div>
                    <div className="preview-row"><span>📊 Aşama</span><strong>{form.stage}</strong></div>
                    <div className="preview-row"><span>💰 Destek Türü</span><strong>{form.supportType}</strong></div>
                    <div className="preview-row"><span>💵 Talep</span><strong>{form.supportAmount || '—'}</strong></div>
                    {form.vision && <div className="preview-full"><span>🎯 Vizyon</span><p>{form.vision}</p></div>}
                    {form.problem && <div className="preview-full"><span>❗ Problem</span><p>{form.problem}</p></div>}
                    {form.solution && <div className="preview-full"><span>✅ Çözüm</span><p>{form.solution}</p></div>}
                    {form.supportUse && <div className="preview-full"><span>📋 Kullanım Planı</span><p>{form.supportUse}</p></div>}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="sp-nav">
                {step > 0 && <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>← Geri</button>}
                <div style={{ flex: 1 }} />
                {step < 3
                  ? <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} id="next-step-btn">Devam →</button>
                  : <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting} id="submit-application-btn">
                      {isSubmitting ? 'Geliştiriliyor...' : '🚀 Başvuruyu Gönder'}
                    </button>
                }
              </div>
            </>
          ) : (
            <div className="sp-success fade-in-up">
              <div className="sp-success-icon">🎉</div>
              <h2>Başvurunuz İletildi!</h2>
              <p><strong>{sponsor.name}</strong>'a başvurunuz başarıyla gönderildi.</p>
              <p className="sp-success-sub">Değerlendirme süreci ortalama 5-10 iş günü sürmektedir. <strong>{form.contactEmail}</strong> adresinize dönüş yapılacaktır.</p>
              <button className="btn btn-primary" onClick={() => navigate('/sponsors')} style={{ marginTop: '1.5rem' }}>Ana Sayfaya Dön</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SponsorApply;
