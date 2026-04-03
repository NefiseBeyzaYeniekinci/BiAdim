import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-content fade-in-up">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Görünüşe Göre Kayboldunuz!</h2>
        <p className="notfound-text">
          Aradığınız sayfayı bulamadık. Ya bu sayfa silindi ya da hiç var olmadı.
          Girişimcilik zorlu bir yolculuktur, doğru adımı atıp ana sayfaya dönebilirsiniz.
        </p>
        <Link to="/" className="btn btn-primary notfound-btn">Ana Sayfaya Dön</Link>
      </div>
    </div>
  );
};

export default NotFound;
