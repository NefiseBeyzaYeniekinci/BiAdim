import './LegalPage.css';

const TermsOfUse = () => {
  return (
    <div className="legal-page">
      <div className="legal-hero legal-hero--green">
        <div className="legal-badge">📋 Hukuki Belge</div>
        <h1>Kullanım Koşulları</h1>
        <p className="legal-meta">Son güncelleme: Nisan 2025</p>
      </div>

      <div className="legal-content container">
        <div className="legal-intro">
          BiAdım Platformu'na ("Platform") hoş geldiniz. Platformumuzu kullanmadan önce
          lütfen bu Kullanım Koşulları'nı dikkatlice okuyunuz. Platforma erişim sağlayarak
          ya da hesap oluşturarak bu koşulları kabul etmiş sayılırsınız.
        </div>

        <div className="legal-toc">
          <h3>İçindekiler</h3>
          <ol>
            <li><a href="#genel">Genel Bilgiler</a></li>
            <li><a href="#kullanici-yukumlulukleri">Kullanıcı Yükümlülükleri</a></li>
            <li><a href="#yasakli-davranislar">Yasaklı Davranışlar</a></li>
            <li><a href="#fikri-mulkiyet">Fikri Mülkiyet</a></li>
            <li><a href="#garanti-reddi">Garanti ve Sorumluluk Reddi</a></li>
            <li><a href="#hesap-askiya-alma">Hesap Askıya Alma ve Sonlandırma</a></li>
            <li><a href="#degisiklikler">Değişiklikler</a></li>
            <li><a href="#uyusmazlik">Uyuşmazlık Çözümü</a></li>
          </ol>
        </div>

        <div className="legal-section" id="genel">
          <h2><span className="section-num">1.</span> Genel Bilgiler</h2>
          <p>
            BiAdım, girişimcileri mentörler ve yatırımcılarla buluşturan dijital bir platformdur.
            Platform üzerinden seminer kaydı, blog yayını, mentör başvurusu ve yatırımcı iletişimi
            gibi hizmetlere erişebilirsiniz. Bu koşullar, tüm kullanıcılar için geçerlidir.
          </p>
        </div>

        <div className="legal-section" id="kullanici-yukumlulukleri">
          <h2><span className="section-num">2.</span> Kullanıcı Yükümlülükleri</h2>
          <p>Platforma kayıt olarak aşağıdakileri kabul etmektesiniz:</p>
          <ul>
            <li>18 yaşını doldurduğunuzu ya da ebeveyn/vasi onayına sahip olduğunuzu.</li>
            <li>Kayıt sırasında doğru, güncel ve eksiksiz bilgi sağlayacağınızı.</li>
            <li>Hesap bilgilerinizin güvenliğinden bizzat sorumlu olduğunuzu.</li>
            <li>Platform üzerindeki tüm faaliyetlerinizden yasal olarak sorumlu olduğunuzu.</li>
            <li>Diğer kullanıcılara saygılı ve yapıcı bir tutum sergileyeceğinizi.</li>
          </ul>
        </div>

        <div className="legal-section" id="yasakli-davranislar">
          <h2><span className="section-num">3.</span> Yasaklı Davranışlar</h2>
          <p>Platformu kullanırken aşağıdaki davranışlar kesinlikle yasaktır:</p>
          <ul>
            <li>Sahte kimlik veya yanlış bilgi ile kayıt olmak.</li>
            <li>Başka kullanıcıların hesaplarını ele geçirmeye çalışmak.</li>
            <li>Spam, zararlı yazılım veya phishing içeriği yaymak.</li>
            <li>Hakaret, ayrımcılık veya nefret söylemi içeren içerik paylaşmak.</li>
            <li>Telif hakkı korumalı içerikleri izinsiz kullanmak.</li>
            <li>Platform sistemlerine zarar vermeye yönelik saldırı düzenlemek.</li>
            <li>Ticari amaçla izinsiz reklam veya tanıtım yapmak.</li>
          </ul>
        </div>

        <div className="legal-section" id="fikri-mulkiyet">
          <h2><span className="section-num">4.</span> Fikri Mülkiyet</h2>
          <p>
            Platform üzerindeki tüm içerikler (logo, tasarım, yazılım kodu, metin, görsel vb.)
            BiAdım'a veya lisans verenlere aittir ve Türk Fikir ve Sanat Eserleri Kanunu kapsamında
            korunmaktadır. İzin almaksızın kopyalanamaz, dağıtılamaz ya da değiştirilemez.
          </p>
          <p>
            Platform'a yüklediğiniz içeriklerin (blog yazısı, proje açıklaması vb.) fikri mülkiyet
            hakları size aittir; ancak bu içerikleri platforma yükleyerek BiAdım'a yayın için
            gerekli kullanım hakkını münhasır olmayan bir şekilde vermiş olursunuz.
          </p>
        </div>

        <div className="legal-section" id="garanti-reddi">
          <h2><span className="section-num">5.</span> Garanti ve Sorumluluk Reddi</h2>
          <p>
            BiAdım, platform üzerinden gerçekleştirilen mentör-girişimci veya yatırımcı
            eşleşmelerinin başarısını garanti etmez. Platform "olduğu gibi" sunulmaktadır.
          </p>
          <ul>
            <li>Mentör veya yatırımcıların eşleşme sonrası davranışlarından sorumlu değiliz.</li>
            <li>Platformun kesintisiz veya hatasız çalışacağını taahhüt etmiyoruz.</li>
            <li>Üçüncü taraf bağlantılarındaki içeriklerden sorumlu değiliz.</li>
          </ul>
        </div>

        <div className="legal-section" id="hesap-askiya-alma">
          <h2><span className="section-num">6.</span> Hesap Askıya Alma ve Sonlandırma</h2>
          <p>
            Kullanım koşullarını ihlal etmeniz durumunda, önceden bildirim yapılmaksızın
            hesabınız geçici olarak askıya alınabilir veya kalıcı olarak kapatılabilir.
            Hesap kapatma kararlarına itiraz için bize e-posta ile ulaşabilirsiniz.
          </p>
          <p>
            Hesabınızı kendiniz kapatmak isterseniz, ayarlar sayfasından bu işlemi gerçekleştirebilirsiniz.
          </p>
        </div>

        <div className="legal-section" id="degisiklikler">
          <h2><span className="section-num">7.</span> Değişiklikler</h2>
          <p>
            BiAdım, bu Kullanım Koşulları'nı dilediği zaman güncelleme hakkını saklı tutar.
            Önemli değişiklikler e-posta veya platform bildirimi ile duyurulur. Platformu
            kullanmaya devam etmeniz, güncel koşulları kabul ettiğiniz anlamına gelir.
          </p>
        </div>

        <div className="legal-section" id="uyusmazlik">
          <h2><span className="section-num">8.</span> Uyuşmazlık Çözümü</h2>
          <p>
            Bu koşullardan doğan anlaşmazlıklarda Türkiye Cumhuriyeti hukuku geçerlidir.
            Uyuşmazlıkların çözümünde İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
            Öncelikle iletisim@biadim.com üzerinden anlaşmazlığı dostane yollarla çözmeyi denemenizi öneririz.
          </p>
          <div className="contact-info-box">
            <p>📧 <a href="mailto:iletisim@biadim.com">iletisim@biadim.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
