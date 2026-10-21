import React, { useState } from 'react';
import {
  Compass,
  Eye,
  Bot,
  Palette,
  BookOpen,
  Trophy,
  Camera,
  User,
  Globe,
  Sun,
  Moon,
  Flame,
  Menu,
  X,
  Sparkles,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useApp, Language, ThemeMode } from '../context/AppContext';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const { language, setLanguage, theme, setTheme, isOffline, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navItems = [
    { id: 'portal', label: t('navHome'), icon: Sparkles },
    { id: 'vr', label: t('navVR'), icon: Compass },
    { id: 'zoom', label: t('navGallery'), icon: Eye },
    { id: 'guide', label: t('navDigitalGuide'), icon: Bot },
    { id: 'workshop', label: t('navWorkshop'), icon: Palette },
    { id: 'encyclopedia', label: t('navEncyclopedia'), icon: BookOpen },
    { id: 'game', label: t('navGame'), icon: Trophy },
    { id: 'ar', label: t('navAR'), icon: Camera },
    { id: 'profile', label: t('navProfile'), icon: User },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'zh', label: '简体中文' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'fr', label: 'Français' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#160f0b]/95 backdrop-blur-md border-b border-[#d4a359]/20 shadow-[0_4px_25px_rgba(0,0,0,0.7),0_1px_15px_rgba(212,163,89,0.08)] select-none">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('portal')}
          className="flex items-center gap-2.5 group text-left transition-transform active:scale-98"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#c1382b] to-[#d4a359] p-0.5 shadow-[0_0_16px_rgba(212,163,89,0.45)] flex items-center justify-center">
            <span className="font-calligraphy text-lg font-bold text-[#140e0a]">莫</span>
          </div>
          <div>
            <div className="font-serif-sc font-bold text-base md:text-lg text-[#f8ecd4] tracking-wider group-hover:text-[#e5b869] transition-colors">
              {t('appName')}
            </div>
            <div className="text-[10px] text-[#a89582] font-cinzel tracking-widest hidden sm:block">
              DUNHUANG MOGAO DIGITAL SANCTUARY
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-serif flex items-center gap-1.5 transition-all ${
                  active
                    ? 'text-[#f5d697] bg-[#241911] border border-[#d4a359]/60 shadow-[0_0_12px_rgba(212,163,89,0.2)]'
                    : 'text-[#baa591] hover:text-[#fff7ed] hover:bg-[#1f150f]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#e5b869]' : 'text-[#8c7866]'}`} />
                <span className="tracking-wide">{item.label}</span>
                {active && (
                  <span className="w-1.5 h-0.5 rounded-full bg-[#e5b869] absolute bottom-0.5 left-1/2 -translate-x-1/2 shadow-[0_0_6px_#e5b869]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Tools (Language Switch + Theme + Offline Status + Hamburger) */}
        <div className="flex items-center gap-2.5">
          {/* Offline / Cloud Status (Clean unboxed indicator) */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2 py-1 text-xs font-serif"
            title={isOffline ? '已启用离线缓存保护' : '云端实时同步'}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOffline ? 'bg-amber-400' : 'bg-emerald-400'
              } animate-pulse`}
            />
            <span className="hidden md:inline text-[11px] text-[#a89582]">
              {isOffline ? '离线就绪' : '数据同步'}
            </span>
          </div>

          {/* Theme Mode Toggle (Candlelight vs Daylight vs Starry) */}
          <button
            onClick={() => {
              const themes: ThemeMode[] = ['candle', 'daylight', 'starry'];
              const next = themes[(themes.indexOf(theme) + 1) % themes.length];
              setTheme(next);
            }}
            className="p-2 rounded-xl bg-[#241a13] border border-[#d4a359]/30 hover:border-[#d4a359] text-[#e5b869] shadow-[0_0_12px_rgba(212,163,89,0.1)] transition-all"
            title={`当前主题：${theme} (点击切换)`}
          >
            {theme === 'candle' && <Flame className="w-4 h-4 text-[#f5a742] animate-candle" />}
            {theme === 'daylight' && <Sun className="w-4 h-4 text-[#e5b869]" />}
            {theme === 'starry' && <Moon className="w-4 h-4 text-[#7db5f5]" />}
          </button>

          {/* Multi-language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-2 rounded-xl bg-[#241a13] border border-[#d4a359]/30 hover:border-[#d4a359] text-[#c9b7a1] hover:text-white shadow-[0_0_12px_rgba(212,163,89,0.1)] transition-all flex items-center gap-1"
              title="切换语言 / Multi-language"
            >
              <Globe className="w-4 h-4 text-[#d4a359]" />
              <span className="text-[11px] uppercase font-mono hidden md:inline text-[#f5ecd9]">{language}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-[#221812]/98 border border-[#d4a359]/50 shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(212,163,89,0.2)] py-1.5 z-50 backdrop-blur-md">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between ${
                      language === l.code ? 'bg-[#3b2718] text-[#e5b869] font-bold' : 'text-[#ded2c1] hover:bg-[#2c2017]'
                    }`}
                  >
                    <span>{l.label}</span>
                    {language === l.code && <span className="text-xs text-[#e5b869]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-[#241a13] border border-[#3d2b1f] text-[#f5ecd9]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1b140f] border-b border-[#3d2c1e] px-4 py-3 space-y-1 animate-fadeIn">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-serif flex items-center gap-2.5 ${
                  active ? 'bg-[#d4a359] text-[#18110b] font-bold' : 'text-[#c9b7a1] hover:bg-[#261c14]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
