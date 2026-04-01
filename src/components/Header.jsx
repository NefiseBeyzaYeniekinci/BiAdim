import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="header-logo">
          Bi<span className="header-accent">Adım</span>
        </Link>
        
        <nav className="header-nav">
          <Link to="/" className="header-link">Ana Sayfa</Link>
          <Link to="/mentors" className="header-link">Mentörler</Link>
          <Link to="/sponsors" className="header-link">Sponsor Bul</Link>
          {/* AI Page is mapped to home features for now */}
          <Link to="/#features" className="header-link">AI Danışman</Link> 
        </nav>

        <div className="header-actions">
          <Link to="/auth?mode=login" className="btn btn-outline">Giriş Yap</Link>
          <Link to="/auth?mode=signup" className="btn btn-primary">Ücretsiz Başla</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
