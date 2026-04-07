import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-badge">Platformumuz Hakkında</div>
        <h1>Fikirleri Geleceğe Taşıyan Köprü</h1>
        <p>
          BiAdım, Türkiye'deki girişimcileri deneyimli mentörler ve vizyon sahibi yatırımcılarla
          buluşturmak için kurulmuş bir inovasyon platformudur. Amacımız; her fikrin doğru rehberlik
          ve finansmanla hayata geçmesini sağlamaktır.
        </p>
      </section>

      {/* Misyon & Vizyon */}
      <section className="about-section container">
        <div className="about-cards">
          <div className="about-card fade-in-up">
            <div className="about-card-icon">🎯</div>
            <h2>Misyonumuz</h2>
            <p>
              Girişimcilik ekosistemini demokratikleştirmek; coğrafi, ekonomik veya sosyal
              engellerden bağımsız olarak her bireyin sahip olduğu fikri gerçeğe dönüştürmesine
              zemin hazırlamak.
            </p>
          </div>
          <div className="about-card fade-in-up delay-1">
            <div className="about-card-icon">🔭</div>
            <h2>Vizyonumuz</h2>
            <p>
              Türkiye'nin en büyük ve en güvenilir girişimcilik köprüsü olmak; dünya sahnesinde
              yer alacak sürdürülebilir ve topluma değer katan girişimlerin beşiği haline gelmek.
            </p>
          </div>
          <div className="about-card fade-in-up delay-2">
            <div className="about-card-icon">💡</div>
            <h2>Değerlerimiz</h2>
            <p>
              Şeffaflık, erişilebilirlik, sürdürülebilirlik ve inovasyon. Her kararımızda
              topluluk önce gelir; girişimcilerin başarısı bizim başarımızdır.
            </p>
          </div>
        </div>
      </section>

      {/* Rakamlar */}
      <section className="about-stats">
        <div className="container about-stats-grid">
          <div className="stat-item fade-in-up">
            <span className="stat-number">500+</span>
            <span className="stat-label">Kayıtlı Girişimci</span>
          </div>
          <div className="stat-item fade-in-up delay-1">
            <span className="stat-number">80+</span>
            <span className="stat-label">Aktif Mentör</span>
          </div>
          <div className="stat-item fade-in-up delay-2">
            <span className="stat-number">40+</span>
            <span className="stat-label">Yatırımcı Partner</span>
          </div>
          <div className="stat-item fade-in-up delay-3">
            <span className="stat-number">120+</span>
            <span className="stat-label">Başarıyla Eşleşen Proje</span>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır */}
      <section className="about-section container">
        <h2 className="section-title-center">Nasıl Çalışıyoruz?</h2>
        <div className="how-steps">
          <div className="how-step fade-in-up">
            <div className="step-number">01</div>
            <h3>Kaydol & Profilini Oluştur</h3>
            <p>Girişimci, mentör ya da yatırımcı olarak platforma katıl; deneyim ve hedeflerini paylaş.</p>
          </div>
          <div className="how-step fade-in-up delay-1">
            <div className="step-number">02</div>
            <h3>Eşleş</h3>
            <p>Akıllı öneri sistemimiz seni en uygun mentör veya yatırımcıyla buluşturur.</p>
          </div>
          <div className="how-step fade-in-up delay-2">
            <div className="step-number">03</div>
            <h3>Büyü</h3>
            <p>Seminerler, bire bir görüşmeler ve blog içerikleriyle fikirlerini geliştir, ekosisteme katkı sun.</p>
          </div>
        </div>
      </section>

      {/* İletişim CTA */}
      <section className="about-cta">
        <h2>Bize Ulaşın</h2>
        <p>Sorularınız, önerileriniz veya iş birliği talepleriniz için her zaman buradayız.</p>
        <a href="mailto:iletisim@biadim.com" className="about-cta-btn">
          iletisim@biadim.com
        </a>
      </section>
    </div>
  );
};

export default About;
