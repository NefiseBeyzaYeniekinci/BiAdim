import { useState, useEffect } from 'react';
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
        <a href="/" className="header-logo">
          Bi<span className="header-accent">Adım</span>
        </a>
        
        <nav className="header-nav">
          <a href="#features" className="header-link">Özellikler</a>
          <a href="#mentors" className="header-link">Mentörler</a>
          <a href="#sponsors" className="header-link">Sponsor Bul</a>
          <a href="#ai" className="header-link">AI Danışman</a>
        </nav>

        <div className="header-actions">
          <a href="#login" className="btn btn-outline">Giriş Yap</a>
          <a href="#signup" className="btn btn-primary">Ücretsiz Başla</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
