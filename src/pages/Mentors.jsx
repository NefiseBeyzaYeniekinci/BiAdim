import './Mentors.css';

const MOCK_MENTORS = [
  {
    id: 1,
    name: 'Mustafa Yılmaz',
    title: 'Kurucu Ortak @TechStart, Melek Yatırımcı',
    tags: ['Yazılım', 'Büyüme (Growth)', 'Yatırım Ağı'],
    emoji: '👨🏻‍💻'
  },
  {
    id: 2,
    name: 'Elif Şahin',
    title: 'Pazarlama Direktörü @GlobalBrands',
    tags: ['Pazarlama', 'Marka Yönetimi', 'PR'],
    emoji: '👩🏼‍💼'
  },
  {
    id: 3,
    name: 'Ahmet Arslan',
    title: 'Finansal Stratejist & Ekonomist',
    tags: ['Finans', 'Gelir Modelleri', 'Fintech'],
    emoji: '📈'
  },
  {
    id: 4,
    name: 'Zeynep Kaya',
    title: 'Ürün Yöneticisi & UX Uzmanı',
    tags: ['UX/UI', 'Ürün Geliştirme', 'Proje Yönetimi'],
    emoji: '👩🏻‍🎨'
  }
];

const Mentors = () => {
  return (
    <div className="mentors-page">
      <div className="container">
        <div className="page-header fade-in-up">
          <h1 className="page-title">Sektörün En İyi Mentörleri</h1>
          <p className="page-subtitle">
            Girişim serüveninizde yalnız değilsiniz. Uzmanlık alanınıza uygun mentörlerimizden sertifikalı seminerler alın ve tecrübelerinden faydalanın.
          </p>
        </div>

        <div className="mentor-grid">
          {MOCK_MENTORS.map((mentor, index) => (
            <div className={`mentor-card fade-in-up delay-${(index % 3) + 1}`} key={mentor.id}>
              <div className="mentor-avatar-wrap">
                {mentor.emoji}
              </div>
              <div className="mentor-body">
                <h3 className="mentor-name">{mentor.name}</h3>
                <p className="mentor-title">{mentor.title}</p>
                <div className="mentor-tags">
                  {mentor.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
                <button 
                  className="btn btn-primary mentor-book"
                  onClick={() => alert(`${mentor.name} ile görüşme planlama ekranı yakında eklenecek.`)}
                >
                  Seminere Katıl
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
