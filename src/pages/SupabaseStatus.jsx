import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './SupabaseStatus.css';

const maskUrl = (url) => {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.host}`;
  } catch {
    return '(geçersiz URL)';
  }
};

const SupabaseStatus = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const { data, error: err } = await supabase.auth.getSession();
        if (err) throw err;
        if (!alive) return;
        setResult({
          supabaseUrl: maskUrl(import.meta.env.VITE_SUPABASE_URL),
          hasAnonKey: Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY),
          sessionExists: Boolean(data?.session),
          userId: data?.session?.user?.id || null,
        });
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Bilinmeyen hata');
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="sb-status-page">
      <div className="sb-status-bg" />
      <div className="container sb-status-container">
        <div className="sb-status-card fade-in-up">
          <h1 className="sb-status-title">Supabase Bağlantı Durumu</h1>
          <p className="sb-status-sub">
            Bu sayfa, .env içindeki VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY ayarlarını doğrular.
          </p>

          {loading ? (
            <div className="sb-status-row">🔄 Kontrol ediliyor...</div>
          ) : error ? (
            <div className="sb-status-error">
              <strong>Bağlantı başarısız.</strong>
              <div className="sb-mono">{error}</div>
              <div className="sb-hint">
                - .env güncel mi ve dev server yeniden başlatıldı mı?<br />
                - URL https://....supabase.co formatında mı?<br />
                - Anahtar anon public anahtar mı?
              </div>
            </div>
          ) : (
            <div className="sb-status-ok">
              <div className="sb-status-row"><strong>URL</strong>: <span className="sb-mono">{result.supabaseUrl}</span></div>
              <div className="sb-status-row"><strong>Anon key var mı?</strong>: {result.hasAnonKey ? 'Evet' : 'Hayır'}</div>
              <div className="sb-status-row"><strong>Session var mı?</strong>: {result.sessionExists ? 'Evet' : 'Hayır (normal)'} </div>
              <div className="sb-status-row"><strong>User ID</strong>: <span className="sb-mono">{result.userId || '—'}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupabaseStatus;
