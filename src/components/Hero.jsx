import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      {/* Animated Background blobs for Glassmorphism depth */}
      <div className="hero-bg"></div>
      <div className="hero-blob blob-1"></div>
      <div className="hero-blob blob-2"></div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge fade-in-up">
            #1 Girişimcilik ve Mentörlük Platformu
          </div>
          
          <h1 className="hero-title fade-in-up delay-1">
            Bi Girişimim Var!<br/>
            <span className="text-gradient">Fikirlerini Gerçeğe Dönüştür</span>
          </h1>
          
          <p className="hero-description fade-in-up delay-2">
            Girişim fikriniz mi var? Yetkin girişimcilerden mentörlük alın, sponsorlar bulun, 
            yapay zeka danışmanımızla sorularınızı çözün ve saniyeler içinde kendi web sayfanızı yayınlayın.
          </p>

          <div className="hero-actions fade-in-up delay-3">
            <div className="hero-cta">
              <a href="#sponsor" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                Sponsor Bul
              </a>
              <a href="#demo" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                Nasıl Çalışır?
              </a>
            </div>
          </div>

          <div className="hero-stats fade-in-up delay-3">
            <div className="stat-item">
              <span className="stat-value">500+</span>
              <span className="stat-label">Aktif Girişim</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">50M ₺</span>
              <span className="stat-label">Bulunan Fon</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2M+</span>
              <span className="stat-label">AI Yanıt Görüşmesi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
