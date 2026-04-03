import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import { MOCK_SPONSORS } from '../data/sponsors';
import { Navigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import './MyApplications.css';

const STATUS_MAP = {
  pending: { label: 'İnceleniyor', color: 'yellow', icon: '🟡' },
  approved: { label: 'Görüşmeye Çağrıldı', color: 'green', icon: '🟢' },
  rejected: { label: 'Olumsuz Sonuçlandı', color: 'red', icon: '🔴' }
};

const MyApplications = () => {
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'applications'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const apps = [];
        querySnapshot.forEach((doc) => {
          apps.push({ id: doc.id, ...doc.data() });
        });
        setApplications(apps);
      } catch (error) {
        // eger orderBy + where yuzunden index arizasi atarsa gecici olarak sadece where yapilabilir 
        // veya composite index eklenmesi gerekecektir.
        // Firebase console'dan composite index uyarisi gelecegi icin yedek olarak sadece where cekelim
        console.error("Firebase'den basvurular okunamadi, index hatasi olabilir.", error);
        try {
           const fallbackQ = query(
             collection(db, 'applications'),
             where('userId', '==', user.uid)
           );
           const fallbackSnap = await getDocs(fallbackQ);
           const fallbackApps = [];
           fallbackSnap.forEach(doc => {
             fallbackApps.push({ id: doc.id, ...doc.data() });
           });
           setApplications(fallbackApps);
        } catch (err2) {
           console.error("Yedek sorgu da basarisiz oldu:", err2);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [user]);

  if (profile?.role !== 'girisimci') {
    return <Navigate to="/" />;
  }

  return (
    <div className="myapp-page">
      <div className="myapp-bg" />
      <div className="container myapp-container fade-in-up">
        
        <div className="myapp-header">
          <h1>Sponsorluk Başvurularım</h1>
          <p>Yatırım ağlarına ve sponsorlara yaptığın destek taleplerinin güncel durumları.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>Yükleniyor...</div>
        ) : applications.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem', color: '#666' }}>
            Henüz hiç başvuru yapmadınız.
          </div>
        ) : (
          <div className="myapp-list">
            {applications.map((app, idx) => {
              const sponsor = MOCK_SPONSORS.find(s => s.id === app.sponsorId);
              const statusConfig = STATUS_MAP[app.status] || STATUS_MAP['pending'];
              
              // Tarihi formatla
              let formattedDate = 'Bilinmiyor';
              if (app.createdAt) {
                 const d = app.createdAt.toDate ? app.createdAt.toDate() : new Date(app.createdAt);
                 formattedDate = typeof d.toLocaleDateString === 'function' 
                                  ? d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) 
                                  : 'Yeni';
              }

              return (
                <div key={app.id} className={`myapp-card fade-in-up delay-${Math.min(idx+1, 5)}`}>
                  <div className="myapp-card-top">
                    <div className="myapp-sponsor-info">
                      <span className="myapp-sponsor-logo">{sponsor?.logo || '🏛️'}</span>
                      <div>
                        <h3>{app.sponsorName || sponsor?.name || 'Bilinmeyen Sponsor'}</h3>
                        <span className="myapp-date">Başvuru Tarihi: {formattedDate}</span>
                      </div>
                    </div>
                    <div className={`myapp-status-badge status-${statusConfig.color}`}>
                      {statusConfig.icon} {statusConfig.label}
                    </div>
                  </div>
                  <div className="myapp-card-body">
                    <h4 className="myapp-note-title">Son Bildirim:</h4>
                    <p className="myapp-note">{app.note || 'Başvurunuz başarıyla alındı.'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyApplications;
