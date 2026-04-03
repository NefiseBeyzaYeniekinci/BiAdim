import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, onSnapshot, collection, addDoc, getDocs, query, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const UserProfileContext = createContext(null);

/**
 * Kullanıcı profilini ve içeriklerini Firestore'da tutar.
 */
export const UserProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Kullanıcı değişince profili yükle (Real-time dinle)
  useEffect(() => {
    if (!user) { 
      setProfile(null); 
      setLoadingProfile(false);
      return; 
    }

    const userRef = doc(db, 'users', user.uid);
    
    // Gerçek zamanlı okuma (onSnapshot)
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        // İlk kez giren kullanıcı için geçici veya boş kayıt 
        // Asıl role seçimi yapıldığında saveProfile üzerinden oluşturulacak
        setProfile({ role: null, score: 0 });
      }
      setLoadingProfile(false);
    }, (error) => {
      console.error("Profil okunurken hata oluştu:", error);
      setLoadingProfile(false);
    });

    return () => unsubscribe();
  }, [user]);

  const saveProfile = async (updates) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    try {
      await setDoc(userRef, updates, { merge: true });
    } catch (error) {
      console.error("Profil güncellenemedi:", error);
    }
  };

  // Blog yazısı kaydet (mentöre özel)
  const saveBlogPost = async (post) => {
    if (!user) return null;
    try {
      const newPost = {
        authorId: user.uid,
        authorName: user.displayName || 'Mentör',
        authorPhoto: user.photoURL || null,
        createdAt: new Date().toISOString(),
        ...post,
      };
      const docRef = await addDoc(collection(db, 'blogs'), newPost);
      
      // Her yazı = 10 puan, Firestore'da artır
      const currentScore = profile?.score || 0;
      await saveProfile({ score: currentScore + 10 });
      
      return { id: docRef.id, ...newPost };
    } catch (error) {
      console.error("Blog kaydedilemedi:", error);
      return null;
    }
  };

  // Tüm blog yazılarını getir (Asenkron)
  const getUserBlogPosts = async () => {
    try {
      const blogsRef = collection(db, 'blogs');
      const q = query(blogsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const blogs = [];
      snapshot.forEach(doc => {
        blogs.push({ id: doc.id, ...doc.data() });
      });
      return blogs;
    } catch (error) {
      console.error("Bloglar çekilemedi:", error);
      return [];
    }
  };

  // Girişimci mentör seçince mentörün puanı artar
  const guidedByMentor = async (mentorId) => {
    try {
      const mentorRef = doc(db, 'mentors', mentorId); 
      // Not: Eğer mentor 'users' tablosundaysa 'users' koleksiyonunu hedeflemelisiniz
      // Ancak henüz mentorlar ayrı bir kolleksiyonda (veya statik veriden geldiği için) 
      // Firestore'da güncellerken dikkatli olmalıyız.
      const mentorSnap = await getDoc(mentorRef);
      if (mentorSnap.exists()) {
        const currentData = mentorSnap.data();
        await updateDoc(mentorRef, {
          score: (currentData.score || 0) + 25
        });
      }
    } catch (error) {
      console.error("Mentör puanı güncellenemedi:", error);
    }
  };

  const getMentorScore = async (mentorId) => {
    try {
      const mentorRef = doc(db, 'mentors', mentorId);
      const mentorSnap = await getDoc(mentorRef);
      if (mentorSnap.exists()) {
        return mentorSnap.data().score || 0;
      }
      return 0;
    } catch (error) {
      console.error("Mentör puanı alınamadı:", error);
      return 0;
    }
  };

  return (
    <UserProfileContext.Provider value={{
      profile,
      loadingProfile,
      saveProfile,
      saveBlogPost,
      getUserBlogPosts,
      guidedByMentor,
      getMentorScore,
    }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
