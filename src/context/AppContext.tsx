import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'zh' | 'en' | 'ja' | 'fr';
export type ThemeMode = 'candle' | 'daylight' | 'starry';

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  favorites: string[]; // mural IDs
  collectedStamps: string[];
  createdArtworks: {
    id: string;
    title: string;
    dataUrl: string;
    date: string;
  }[];
  notes: Record<string, string>; // muralId -> note
}

interface AudioGuideState {
  isPlaying: boolean;
  muralId: string | null;
  currentText: string;
  title: string;
  progress: number;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  user: UserProfile;
  toggleFavorite: (muralId: string) => void;
  isFavorite: (muralId: string) => boolean;
  saveArtwork: (title: string, dataUrl: string) => void;
  saveNote: (muralId: string, note: string) => void;
  audioGuide: AudioGuideState;
  playAudioGuide: (muralId: string, title: string, text: string) => void;
  pauseAudioGuide: () => void;
  stopAudioGuide: () => void;
  isOffline: boolean;
  t: (key: string) => string;
}

const UI_STRINGS: Record<string, Record<Language, string>> = {
  appName: {
    zh: '莫高幻境',
    en: 'Mogao Mirage',
    ja: '莫高幻境',
    fr: 'Mirage de Mogao'
  },
  appSubtitle: {
    zh: '敦煌壁画数字化沉浸漫游与鉴赏平台',
    en: 'Dunhuang Murals Digital Immersive Tour & Art Gallery',
    ja: '敦煌壁画デジタル没入型回遊＆美術鑑賞プラットフォーム',
    fr: 'Visite immersive numérique et galerie d’art des fresques de Dunhuang'
  },
  navHome: { zh: '藻井迎宾', en: 'Caisson Portal', ja: '藻井迎賓', fr: 'Portail du Caisson' },
  navVR: { zh: 'VR全景漫游', en: '360° VR Caves', ja: '360° VR洞窟', fr: 'Grottes 360° VR' },
  navGallery: { zh: '微距壁画鉴赏', en: 'Deep Zoom Gallery', ja: '高精細壁画鑑賞', fr: 'Galerie Haute Définition' },
  navDigitalGuide: { zh: '数字人妙音', en: 'AI Celestial Guide', ja: 'AI案内人 妙音', fr: 'Guide Céleste IA' },
  navWorkshop: { zh: '非遗矿彩工坊', en: 'Mineral Art Workshop', ja: '鉱物彩色工房', fr: 'Atelier de Pigments' },
  navEncyclopedia: { zh: '敦煌交互百科', en: 'Encyclopedia', ja: '敦煌百科', fr: 'Encyclopédie' },
  navGame: { zh: '壁画寻宝拼图', en: 'Cultural Puzzle', ja: '壁画パズル', fr: 'Jeu de Fresque' },
  navAR: { zh: '增强现实AR', en: 'AR Vision', ja: 'AR拡張現実', fr: 'Vision AR' },
  navProfile: { zh: '个人画谱图鉴', en: 'Passport & Passport', ja: '個人図鑑', fr: 'Passeport d’Art' },
  exploreNow: { zh: '开启沉浸漫游', en: 'Enter the Grottoes', ja: '洞窟の旅へ', fr: 'Entrer dans les Grottes' },
  audioGuideLabel: { zh: 'AI语音解说', en: 'AI Audio Guide', ja: 'AI音声解説', fr: 'Guide Audio IA' },
  candleMode: { zh: '莫高烛光', en: 'Candlelight', ja: '窟内灯火', fr: 'Lueur de Bougie' },
  daylightMode: { zh: '大漠曜金', en: 'Desert Sun', ja: '大漠陽光', fr: 'Soleil du Désert' },
  starryMode: { zh: '鸣沙星空', en: 'Starry Night', ja: '星空の砂漠', fr: 'Nuit Étoilée' },
  saveToPassport: { zh: '珍藏壁画', en: 'Bookmark', ja: '図鑑に保存', fr: 'Sauvegarder' },
  savedInPassport: { zh: '已入图鉴', en: 'Bookmarked', ja: '保存済み', fr: 'Enregistré' },
  generateShareCard: { zh: '生成艺术图鉴', en: 'Create Art Passport', ja: '美術証書発行', fr: 'Créer le Passeport' },
  offlineStatus: { zh: '离线模式激活', en: 'Offline Cache Active', ja: 'オフライン有効', fr: 'Mode Hors-Ligne Actif' },
  onlineStatus: { zh: '在线云端同步', en: 'Cloud Connected', ja: 'オンライン接続', fr: 'Connecté' },
};

const DEFAULT_USER: UserProfile = {
  id: 'dh-user-001',
  name: '敦煌行者 · 乐音',
  title: '莫高窟数字化特约守护人',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  favorites: ['mural-deer', 'mural-pipa', 'mural-threehares'],
  collectedStamps: ['stamp-wei', 'stamp-tang', 'stamp-sui'],
  createdArtworks: [],
  notes: {
    'mural-deer': '北魏西域凹凸晕染与连环叙事结构极其前卫，神鹿昂首无惧的眼神震颤人心。'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('dh_lang') as Language) || 'zh';
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('dh_theme') as ThemeMode) || 'candle';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('dh_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [audioGuide, setAudioGuide] = useState<AudioGuideState>({
    isPlaying: false,
    muralId: null,
    currentText: '',
    title: '',
    progress: 0,
  });

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    localStorage.setItem('dh_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('dh_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('dh_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Web Speech API synthesis handler
  useEffect(() => {
    if (!audioGuide.isPlaying || !audioGuide.currentText) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(audioGuide.currentText);
    utterance.rate = 0.95; // gentle, measured guide pace
    utterance.pitch = 1.05;

    // Pick voice by language
    const langCodes: Record<Language, string> = {
      zh: 'zh-CN',
      en: 'en-US',
      ja: 'ja-JP',
      fr: 'fr-FR'
    };
    utterance.lang = langCodes[language] || 'zh-CN';

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang.slice(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      setAudioGuide(prev => ({ ...prev, isPlaying: false, progress: 100 }));
    };

    utterance.onerror = () => {
      setAudioGuide(prev => ({ ...prev, isPlaying: false }));
    };

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [audioGuide.isPlaying, audioGuide.currentText, language]);

  const toggleFavorite = (muralId: string) => {
    setUser(prev => {
      const exists = prev.favorites.includes(muralId);
      const newFavs = exists
        ? prev.favorites.filter(id => id !== muralId)
        : [...prev.favorites, muralId];
      return { ...prev, favorites: newFavs };
    });
  };

  const isFavorite = (muralId: string) => {
    return user.favorites.includes(muralId);
  };

  const saveArtwork = (title: string, dataUrl: string) => {
    const newArt = {
      id: `art-${Date.now()}`,
      title,
      dataUrl,
      date: new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')
    };
    setUser(prev => ({
      ...prev,
      createdArtworks: [newArt, ...prev.createdArtworks]
    }));
  };

  const saveNote = (muralId: string, note: string) => {
    setUser(prev => ({
      ...prev,
      notes: { ...prev.notes, [muralId]: note }
    }));
  };

  const playAudioGuide = (muralId: string, title: string, text: string) => {
    setAudioGuide({
      isPlaying: true,
      muralId,
      title,
      currentText: text,
      progress: 0,
    });
  };

  const pauseAudioGuide = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    setAudioGuide(prev => ({ ...prev, isPlaying: false }));
  };

  const stopAudioGuide = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAudioGuide({
      isPlaying: false,
      muralId: null,
      currentText: '',
      title: '',
      progress: 0
    });
  };

  const t = (key: string): string => {
    return UI_STRINGS[key]?.[language] || key;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        user,
        toggleFavorite,
        isFavorite,
        saveArtwork,
        saveNote,
        audioGuide,
        playAudioGuide,
        pauseAudioGuide,
        stopAudioGuide,
        isOffline,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
