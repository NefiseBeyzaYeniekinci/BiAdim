import './LegalPage.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="legal-badge">📄 Hukuki Belge</div>
        <h1>Gizlilik Politikası</h1>
        <p className="legal-meta">Son güncelleme: Nisan 2025</p>
      </div>

      <div className="legal-content container">
        <div className="legal-intro">
          BiAdım Platformu olarak kişisel verilerinizin gizliliğine büyük önem veriyoruz.
          Bu Gizlilik Politikası, platformumuzu kullanırken hangi verileri topladığımızı,
          bu verileri nasıl kullandığımızı ve haklarınızı açıklamaktadır.
          6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında hazırlanmıştır.
        </div>

        <div className="legal-toc">
          <h3>İçindekiler</h3>
          <ol>
            <li><a href="#toplanan-veriler">Toplanan Veriler</a></li>
            <li><a href="#veri-kullanimi">Verilerin Kullanımı</a></li>
            <li><a href="#veri-paylasimi">Üçüncü Taraflarla Paylaşım</a></li>
            <li><a href="#cerezler">Çerezler (Cookies)</a></li>
            <li><a href="#veri-guvenligi">Veri Güvenliği</a></li>
            <li><a href="#haklariniz">Haklarınız</a></li>
            <li><a href="#iletisim">İletişim</a></li>
          </ol>
        </div>

        <div className="legal-section" id="toplanan-veriler">
          <h2><span className="section-num">1.</span> Toplanan Veriler</h2>
          <p>Platformumuza kayıt olduğunuzda ve hizmetlerimizi kullandığınızda aşağıdaki kişisel verilerinizi toplayabiliriz:</p>
          <ul>
            <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, doğum tarihi.</li>
            <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası.</li>
            <li><strong>Profil Bilgileri:</strong> Fotoğraf, biyografi, uzmanlık alanı, sosyal medya hesapları.</li>
            <li><strong>Kullanım Verileri:</strong> Platform içi davranışlar, sayfa görüntüleme süreleri, tıklama verileri.</li>
            <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, işletim sistemi, cihaz bilgisi.</li>
          </ul>
        </div>

        <div className="legal-section" id="veri-kullanimi">
          <h2><span className="section-num">2.</span> Verilerin Kullanımı</h2>
          <p>Topladığımız verileri yalnızca aşağıdaki amaçlarla kullanırız:</p>
          <ul>
            <li>Hesabınızı oluşturmak ve kimliğinizi doğrulamak.</li>
            <li>Mentör-girişimci ve yatırımcı eşleşme sisteminin çalışması.</li>
            <li>Seminer ve blog içeriklerinin kişiselleştirilmesi.</li>
            <li>Platform güvenliğinin sağlanması ve dolandırıcılığın önlenmesi.</li>
            <li>İzin vermeniz halinde, kampanya ve duyuru e-postaları göndermek.</li>
            <li>Yasal yükümlülüklerimizin yerine getirilmesi.</li>
          </ul>
        </div>

        <div className="legal-section" id="veri-paylasimi">
          <h2><span className="section-num">3.</span> Üçüncü Taraflarla Paylaşım</h2>
          <p>
            Kişisel verilerinizi açık rızanız olmaksızın üçüncü taraflarla satmıyor veya kiralamıyoruz.
            Verileriniz yalnızca aşağıdaki durumlarda paylaşılabilir:
          </p>
          <ul>
            <li>Platforma kayıtlı mentörler veya yatırımcılarla, eşleşme sürecinde ve yalnızca sizin onayınızla.</li>
            <li>Firebase (Google) gibi altyapı hizmet sağlayıcılarımızla; bu sağlayıcılar verilerinizi yalnızca hizmet kapsamında işler.</li>
            <li>Yasal zorunluluk veya mahkeme kararı durumunda yetkili makamlarla.</li>
          </ul>
        </div>

        <div className="legal-section" id="cerezler">
          <h2><span className="section-num">4.</span> Çerezler (Cookies)</h2>
          <p>
            Platformumuz, daha iyi bir kullanıcı deneyimi sunmak amacıyla çerezler kullanmaktadır.
            Çerezler, tarayıcınızda depolanan küçük metin dosyalarıdır.
          </p>
          <ul>
            <li><strong>Zorunlu Çerezler:</strong> Platformun temel işlevleri için gereklidir, devre dışı bırakılamaz.</li>
            <li><strong>Analitik Çerezler:</strong> Platformun kullanımını anlamamıza yardımcı olur (örn. Google Analytics).</li>
            <li><strong>Tercih Çerezleri:</strong> Dil ve tema gibi tercihlerinizi hatırlar.</li>
          </ul>
          <p>Tarayıcı ayarlarınızdan çerezleri yönetebilir veya reddedebilirsiniz.</p>
        </div>

        <div className="legal-section" id="veri-guvenligi">
          <h2><span className="section-num">5.</span> Veri Güvenliği</h2>
          <p>
            Verilerinizi korumak için endüstri standardı güvenlik önlemleri alıyoruz:
          </p>
          <ul>
            <li>SSL/TLS şifreli bağlantı ile veri aktarımı.</li>
            <li>Firebase güvenlik kuralları ile yetkisiz erişimin önlenmesi.</li>
            <li>Şifreler asla düz metin olarak saklanmaz; güçlü hash algoritmaları kullanılır.</li>
            <li>Düzenli güvenlik denetimleri yapılır.</li>
          </ul>
        </div>

        <div className="legal-section" id="haklariniz">
          <h2><span className="section-num">6.</span> Haklarınız</h2>
          <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme hakkı.</li>
            <li>İşleniyorsa bu veriler hakkında bilgi talep etme hakkı.</li>
            <li>Yanlış veya eksik verilerin düzeltilmesini isteme hakkı.</li>
            <li>Verilerin silinmesini veya anonimleştirilmesini talep etme hakkı.</li>
            <li>Veri işlemeye itiraz etme hakkı.</li>
            <li>Veri taşınabilirliği talep etme hakkı.</li>
          </ul>
          <p>Bu haklarınızı kullanmak için <strong>iletisim@biadim.com</strong> adresine yazabilirsiniz.</p>
        </div>

        <div className="legal-section" id="iletisim">
          <h2><span className="section-num">7.</span> İletişim</h2>
          <p>
            Gizlilik politikamıza ilişkin soru ve görüşleriniz için bize ulaşabilirsiniz:
          </p>
          <div className="contact-info-box">
            <p>📧 <a href="mailto:iletisim@biadim.com">iletisim@biadim.com</a></p>
            <p>🏢 BiAdım Platformu, Türkiye</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
