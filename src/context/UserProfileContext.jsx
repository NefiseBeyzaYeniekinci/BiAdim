import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const UserProfileContext = createContext(null);

/**
 * Kullanıcı profilini localStorage'da tutar.
 * Yapı: { role, projectName, sector, stage, bio, expertise, linkedin, twitter, website, score }
 */
export const UserProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  // Kullanıcı değişince profili yükle
  useEffect(() => {
    if (!user) { setProfile(null); return; }
    const stored = localStorage.getItem(`profile_${user.uid}`);
    if (stored) {
      setProfile(JSON.parse(stored));
    } else {
      setProfile({ role: null });
    }
  }, [user]);

  const saveProfile = (updates) => {
    if (!user) return;
    const next = { ...profile, ...updates };
    localStorage.setItem(`profile_${user.uid}`, JSON.stringify(next));
    setProfile(next);
  };

  // Blog yazısı kaydet (mentöre özel)
  const saveBlogPost = (post) => {
    if (!user) return null;
    const key = 'blog_posts';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const newPost = {
      id: Date.now(),
      authorId: user.uid,
      authorName: user.displayName || 'Mentör',
      authorPhoto: user.photoURL || null,
      createdAt: new Date().toISOString(),
      ...post,
    };
    localStorage.setItem(key, JSON.stringify([newPost, ...existing]));
    // Her yazı = 10 puan
    saveProfile({ score: (profile?.score || 0) + 10 });
    return newPost;
  };

  // Tüm blog yazılarını getir (statik + kullanıcı yazıları)
  const getUserBlogPosts = () => {
    return JSON.parse(localStorage.getItem('blog_posts') || '[]');
  };

  // Girişimci mentör seçince mentörün puanı artar
  const guidedByMentor = (mentorId) => {
    const key = `mentor_score_${mentorId}`;
    const current = parseInt(localStorage.getItem(key) || '0');
    localStorage.setItem(key, current + 25);
  };

  const getMentorScore = (mentorId) => {
    return parseInt(localStorage.getItem(`mentor_score_${mentorId}`) || '0');
  };

  return (
    <UserProfileContext.Provider value={{
      profile,
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
