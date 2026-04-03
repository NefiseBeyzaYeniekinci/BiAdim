# BiAdım (Bi Girişimim Var!) 🚀

BiAdım, girişimcileri, yatırımcıları ve deneyimli mentörleri tek bir dijital ekosistemde buluşturan yeni nesil bir girişimcilik platformudur. Proje, Türkiye girişim ekosistemini canlandırmak, erken aşama girişimlere rehberlik etmek ve yatırım süreçlerini demokratikleştirmek amacıyla geliştirilmiştir.

![BiAdım Platform](https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80) 
*(Örnek Görsel)*

## 🌟 Öne Çıkan Özellikler

- **🎓 Mentör Kadrosu ve Eşleştirme:** Alanında uzman mentörlerin listelendiği, liderlik tablosu içeren dinamik mentör havuzu. Girişimciler uzmanlık alanlarına göre filtreleme yaparak doğru mentörü bulabilir.
- **💼 Yatırımcı ve Sponsor Bulma:** Melek yatırımcılar, VC'ler ve kuluçka merkezlerinin bütçe, odak ve minimum aşama filtreleriyle listelendiği pazar yeri.
- **📅 Etkinlik ve Seminerler:** Online veya yüz yüze canlı girişimcilik eğitimleri, kapasite takibi ve kayıt sistemi.
- **📝 Açık Kaynak Blog ve Haber Portalı:** Ekosistemdeki son haberler ve içgörülerin paylaşıldığı, mentörlerin doğrudan yazı yazabildiği haber platformu.
- **🛡️ Yönetim Paneli (Admin Dashboard):** Platform istatistiklerinin, bekleyen sponsor başvurularının ve blog içeriklerinin yönetildiği güvenli admin arayüzü.
- **✨ Premium UI/UX:** "Glassmorphism" odaklı, modern, pürüzsüz geçişlere sahip, karanlık mod esintili tam duyarlı (responsive) tasarım.

## 🛠️ Kullanılan Teknolojiler

- **Frontend:** React.js, Vite, React Router DOM
- **Stil & Tasarım:** Özel yazılmış Vanilla CSS (Glassmorphism & Modern Animasyonlar)
- **Arka Plan & Veritabanı:** Firebase (Authentication, Firestore entegrasyonuna hazır mimari) & Local Context/State Management
- **Veri Mimarisi:** Gerçek zamanlı veritabanı esnekliğine sahip, ancak sunucu ihtiyacı olmadan çalışabilen statik `Mock Data` fallback özelliği.

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1. Depoyu bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/NefiseBeyzaYeniekinci/BiAdim.git
   ```
2. Proje dizinine girin:
   ```bash
   cd BiAdim
   ```
3. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
   *Tarayıcınızda `http://localhost:5173` adresine giderek platformu görüntüleyebilirsiniz.*

## 📂 Klasör Yapısı

```text
src/
├── components/      # Tekrar kullanılabilir UI bileşenleri (Header, Footer, Modallar)
├── context/         # React Context API ile global state yönetimi (Auth, UserProfile)
├── data/            # Platformun statik (Mock) verileri
├── pages/           # Sayfa bileşenleri (Mentors, Sponsors, AdminDashboard vb.)
├── App.jsx          # Ana yönlendirme ve root bileşen
├── index.css        # Global tasarım değişkenleri ve sınıflar (Design System)
└── firebase.js      # Firebase yapılandırma dosyası
```

## 🤝 Katkıda Bulunma

Bu proje açık geliştirmeye uygundur. Pull Request (PR) göndermekten veya Issue oluşturmaktan çekinmeyin. Yeni bir özellik eklemeden önce lütfen bir Issue açarak fikrinizi tartışmaya sunun.

---
*Girişimcilik yolculuğunuzda **BiAdım** atın, gerisi gelsin!*
