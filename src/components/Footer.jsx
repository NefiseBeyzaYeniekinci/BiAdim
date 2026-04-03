import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        
        <div className="footer-brand fade-in-up">
          <div className="footer-logo">Bi<span className="accent">Adım</span></div>
          <p className="footer-desc">
            Girişimcileri yatırımcılar ve mentörlerle buluşturan, fikirleri geleceğe taşıyan inovasyon merkezi.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon">𝕏</a>
            <a href="#" className="social-icon">in</a>
            <a href="#" className="social-icon">IG</a>
          </div>
        </div>

        <div className="footer-links-group fade-in-up delay-1">
          <h4>Platform</h4>
          <Link to="/mentors">Mentörler</Link>
          <Link to="/sponsors">Yatırımcılar</Link>
          <Link to="/seminars">Seminerler</Link>
          <Link to="/blog">Blog</Link>
        </div>

        <div className="footer-links-group fade-in-up delay-2">
          <h4>Kurumsal</h4>
          <Link to="#">Hakkımızda</Link>
          <Link to="#">İletişim</Link>
          <Link to="#">Gizlilik Politikası</Link>
          <Link to="#">Kullanım Koşulları</Link>
        </div>

      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BiAdım Platformu. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
