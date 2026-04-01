import './Features.css';

const features = [
  {
    title: 'Mentörlük & Eğitimler',
    description: 'Yetkin girişimciler tarafından düzenlenen sertifikalı seminerlere katılarak vizyonunuzu geliştirin.',
    icon: '🎓', // Can replace with SVG if needed
    isAi: false
  },
  {
    title: 'Yapay Zeka Asistanı',
    description: 'Fikrinize özel takıldığınız soruları, 5 saniye içinde yapay zeka mentörümüzle çözün.',
    icon: '🧠',
    isAi: true
  },
  {
    title: 'Sponsor Ağımız',
    description: 'Projenize maddi destek bulamıyorsanız, melek yatırımcı ve marka havuzumuzdan faydalanın.',
    icon: '🤝',
    isAi: false
  },
  {
    title: 'Hızlı Web Sitesi',
    description: 'Kod yazmadan platform üzerinden yeni girişiminiz için dakikalar içinde tanıtım sayfası hazırlayın.',
    icon: '🚀',
    isAi: false
  }
];

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="features-header">
          <h2 className="features-title">Girişiminizi Büyüten Çözümler</h2>
          <p className="features-subtitle">Fikriniz var ancak nereden başlayacağınızı bilmiyorsanız, BiAdım size ihtiyacınız olan her şeyi sunar.</p>
        </div>
        
        <div className="features-grid">
          {features.map((item, index) => (
            <div className={`feature-card ${item.isAi ? 'ai-card' : ''}`} key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
