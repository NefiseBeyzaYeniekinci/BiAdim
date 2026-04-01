import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';

const Home = () => {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      
      {/* Simple Footer for completeness */}
      <footer style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--color-text-muted)', borderTop: '1px solid var(--glass-border)' }}>
        <p>&copy; {new Date().getFullYear()} Bi Gelişimim Var! (BiAdım). Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

export default Home;
