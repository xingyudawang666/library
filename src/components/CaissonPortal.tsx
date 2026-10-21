import React, { useState } from 'react';
import {
  Compass,
  Eye,
  Headphones,
  Sparkles,
  ArrowRight,
  Layers,
  MapPin,
  Clock,
  BookOpen,
  Palette,
  Trophy,
  Volume2,
  ChevronRight,
  Award,
  Maximize2,
  Route
} from 'lucide-react';
import { CAVES, Cave, MURALS, Mural } from '../data/dunhuangData';
import { useApp } from '../context/AppContext';
import { SilkRoadMap } from './SilkRoadMap';

interface CaissonPortalProps {
  onEnterCave: (caveId: string) => void;
  onEnterMural: (muralId: string) => void;
  onOpenDigitalGuide: () => void;
  onOpenWorkshop: () => void;
  onOpenEncyclopedia: (topicId?: string) => void;
  onOpenGame: () => void;
}

export const CaissonPortal: React.FC<CaissonPortalProps> = ({
  onEnterCave,
  onEnterMural,
  onOpenDigitalGuide,
  onOpenWorkshop,
  onOpenEncyclopedia,
  onOpenGame,
}) => {
  const { language, playAudioGuide } = useApp();
  const [activeFilterDynasty, setActiveFilterDynasty] = useState<string>('all');
  const [hoveredCaveId, setHoveredCaveId] = useState<string | null>(null);

  const dynasties = [
    { id: 'all', label: { zh: '全部朝代', en: 'All Eras' } },
    { id: 'wei', label: { zh: '北魏 (4-6世纪)', en: 'Northern Wei' } },
    { id: 'sui', label: { zh: '隋代 (6-7世纪)', en: 'Sui Dynasty' } },
    { id: 'tang', label: { zh: '盛唐 (7-9世纪)', en: 'Tang Dynasty' } },
    { id: 'late', label: { zh: '晚唐/五代 (9-11世纪)', en: 'Late Tang' } },
  ];

  const filteredCaves = CAVES.filter(c => {
    if (activeFilterDynasty === 'all') return true;
    if (activeFilterDynasty === 'wei') return c.dynasty.zh.includes('北魏');
    if (activeFilterDynasty === 'sui') return c.dynasty.zh.includes('隋');
    if (activeFilterDynasty === 'tang') return c.dynasty.zh.includes('盛唐') || c.dynasty.zh.includes('初唐') || c.dynasty.zh.includes('中唐');
    if (activeFilterDynasty === 'late') return c.dynasty.zh.includes('晚唐') || c.dynasty.zh.includes('五代');
    return true;
  });

  return (
    <div className="relative w-full min-h-screen bg-[#0d0907] text-[#f7ede1] overflow-x-hidden selection:bg-[#d4a359]/30 selection:text-[#fff]">
      {/* 
        ========================================================================
        HERO BANNER: High-End Grand Museum Entrance with Dunhuang Caisson & Desert Cliff
        ========================================================================
      */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        {/* Layer 1: Background Panoramic High-Res Desert & Mogao Cliff Imagery */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none filter brightness-50 contrast-110"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2400&auto=format&fit=crop)',
          }}
        />

        {/* Layer 2: Authentic Dunhuang Caisson Vault Ceiling Overhead (Atmospheric Ceiling Vignette) */}
        <div
          className="absolute -top-32 w-[900px] h-[900px] md:w-[1300px] md:h-[1300px] rounded-full bg-cover bg-center pointer-events-none opacity-30 mix-blend-screen filter saturate-150 animate-spin"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop)',
            animationDuration: '180s',
          }}
        />

        {/* Layer 3: Cinematic Vignette & Deep Sandstone Shadow Gradient */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(13,9,7,0.3)_0%,_rgba(13,9,7,0.85)_60%,_rgba(10,7,5,1)_100%)]" />

        {/* Subtle Floating Gold Sand Dust Sparkles */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#d4a359_1px,transparent_1px)] [background-size:36px_36px] opacity-15" />

        {/* Foreground Content: Grand Museum Portal Typography & Hero CTA */}
        <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center px-4">
          {/* Institutional Clean Header (Anti-pill) */}
          <div className="flex items-center gap-2 text-xs font-serif tracking-[0.25em] text-[#e5b869] mb-5 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5b869] animate-pulse" />
            <span>世界文化遗产 · 莫高窟第440号遗址 · 数字艺术总览</span>
          </div>

          {/* Grand Calligraphic Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-sc font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#fff7ed] via-[#f5d697] to-[#ba8142] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] leading-[1.15]">
            {language === 'zh' ? '莫高幻境' : 'Mogao Mirage'}
          </h1>

          <div className="mt-3 text-sm sm:text-base md:text-xl font-cinzel tracking-[0.3em] text-[#d4a359] uppercase">
            {language === 'zh' ? '敦煌莫高窟数字化沉浸漫游与学术艺术宝库' : 'The Digital Sanctuary of Mogao Murals'}
          </div>

          {/* Subtitle / Editorial Excerpt */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#ded0be] max-w-3xl leading-relaxed font-light">
            {language === 'zh'
              ? '开凿于公元366年鸣沙山东麓断崖，融汇西域犍陀罗、波斯波罗与中原汉唐之气象。全窟存壁画四万五千平方米，泥质彩塑两千四百余身。点击任意洞窟，即可瞬时步入360° VR全景展厅、微距鉴赏传世名作、与AI数字人妙音对话。'
              : 'Hewn into the cliffs of Mount Mingsha since 366 CE, synthesizing Hellenistic, Persian, Indian, and Han Chinese imperial civilizations. Step directly into 360° VR caves and examine masterworks in gigapixel detail.'}
          </p>

          {/* Luxury Museum Unified Metrics Ledger */}
          <div className="mt-12 w-full max-w-4xl py-6 px-6 rounded-2xl bg-[#17100b]/90 border border-[#3d2b1f] backdrop-blur-md shadow-2xl grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#382618]">
            <div className="p-3 flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-serif-sc font-bold text-[#e5b869]">
                735<span className="text-xs font-normal text-[#99836c] ml-1">窟</span>
              </span>
              <span className="text-[11px] text-[#a89582] mt-1 tracking-wider uppercase font-serif">
                {language === 'zh' ? '千年石窟群落' : 'Caves Preserved'}
              </span>
            </div>
            <div className="p-3 flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-serif-sc font-bold text-[#e5b869]">
                45,000<span className="text-xs font-normal text-[#99836c] ml-1">㎡</span>
              </span>
              <span className="text-[11px] text-[#a89582] mt-1 tracking-wider uppercase font-serif">
                {language === 'zh' ? '传世壁画遗珍' : 'Wall Paintings'}
              </span>
            </div>
            <div className="p-3 flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-serif-sc font-bold text-[#e5b869]">
                2,415<span className="text-xs font-normal text-[#99836c] ml-1">身</span>
              </span>
              <span className="text-[11px] text-[#a89582] mt-1 tracking-wider uppercase font-serif">
                {language === 'zh' ? '彩塑神佛罗汉' : 'Painted Sculptures'}
              </span>
            </div>
            <div className="p-3 flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-serif-sc font-bold text-[#e5b869]">
                1,650<span className="text-xs font-normal text-[#99836c] ml-1">年</span>
              </span>
              <span className="text-[11px] text-[#a89582] mt-1 tracking-wider uppercase font-serif">
                {language === 'zh' ? '丝路不朽华章' : 'Years of History'}
              </span>
            </div>
          </div>

          {/* Grand CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <button
              onClick={() => onEnterCave('cave-257')}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#e5b869] to-[#b87d3b] hover:from-[#e5b869] hover:to-[#c98c48] text-[#120d09] font-serif font-bold text-sm md:text-base flex items-center gap-3 shadow-[0_4px_30px_rgba(212,163,89,0.45)] hover:shadow-[0_8px_40px_rgba(212,163,89,0.65)] transform hover:-translate-y-0.5 transition-all"
            >
              <Compass className="w-5 h-5 text-[#120d09] group-hover:rotate-45 transition-transform" />
              <span>{language === 'zh' ? '开启 360° VR 全景洞窟漫游' : 'Begin 360° VR Caves Tour'}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={() => onEnterMural('mural-deer')}
              className="px-7 py-4 rounded-xl bg-[#1e150f]/90 hover:bg-[#2d1e15] border border-[#d4a359]/50 hover:border-[#e5b869] text-[#f8ecd4] text-sm md:text-base flex items-center gap-2.5 shadow-xl transition-all"
            >
              <Eye className="w-4 h-4 text-[#e5b869]" />
              <span>{language === 'zh' ? '微距鉴赏传世壁画' : 'Deep Zoom Murals'}</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('silk-road-map-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-4 rounded-xl bg-[#251911]/90 hover:bg-[#362418] border border-[#d4a359]/60 hover:border-[#f5d697] text-[#f5d697] text-sm md:text-base flex items-center gap-2.5 shadow-xl transition-all"
            >
              <Route className="w-4 h-4 text-[#e5b869]" />
              <span>{language === 'zh' ? '丝路敦煌节点地图' : 'Silk Road Map'}</span>
            </button>

            <button
              onClick={onOpenDigitalGuide}
              className="px-7 py-4 rounded-xl bg-[#16212e]/85 hover:bg-[#203042] border border-[#4a85c8]/50 hover:border-[#7db5f5] text-[#d6e5fb] text-sm md:text-base flex items-center gap-2.5 shadow-xl transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#7db5f5]" />
              <span>{language === 'zh' ? 'AI数字人妙音伴游' : 'AI Docent Miaoyin'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 1: INTERACTIVE SILK ROAD DUNHUANG NODE MAP (丝绸之路敦煌节点地图)
        ========================================================================
      */}
      <section id="silk-road-map-section" className="relative z-10 max-w-7xl mx-auto px-4 py-16 border-t border-[#d4a359]/20">
        <SilkRoadMap
          onEnterCave={onEnterCave}
          onEnterMural={onEnterMural}
          onOpenEncyclopedia={onOpenEncyclopedia}
          onOpenWorkshop={onOpenWorkshop}
        />
      </section>

      {/* 
        ========================================================================
        SECTION 2: DIGITAL CAVES GALLERIES (数字石窟巡礼 · 点击直接进入)
        ========================================================================
      */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 border-t border-[#d4a359]/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4a359] font-serif uppercase tracking-[0.22em] mb-2">
              <Compass className="w-4 h-4 text-[#e5b869]" />
              <span>DIGITAL CAVE PAVILIONS · CLICK TO ENTER DIRECTLY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-[#f7ecd4] tracking-wide drop-shadow-md">
              {language === 'zh' ? '数字石窟巡礼 · 点选漫游' : 'Master Cave Pavilions'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#bca792] max-w-2xl font-serif leading-relaxed font-light">
              {language === 'zh'
                ? '遴选莫高窟历经北魏、隋、唐四朝最具代表性的殿堂。点击任一卡片即可推门入窟，体验高精度三维全景与真实回声。'
                : 'Selected masterpiece caves spanning Northern Wei, Sui, and Tang dynasties. Click any cave to step inside.'}
            </p>
          </div>

          {/* Dynasty Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-[#1c140e]/95 border border-[#d4a359]/30 shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_12px_rgba(212,163,89,0.08)] self-start md:self-end">
            {dynasties.map(d => (
              <button
                key={d.id}
                onClick={() => setActiveFilterDynasty(d.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-serif whitespace-nowrap transition-all ${
                  activeFilterDynasty === d.id
                    ? 'bg-[#d4a359] text-[#120d09] font-bold shadow-[0_0_12px_rgba(212,163,89,0.4)]'
                    : 'text-[#c9b7a1] hover:text-white'
                }`}
              >
                {(d.label as Record<string, string>)[language] || d.label.zh}
              </button>
            ))}
          </div>
        </div>

        {/* Cave Cards Grid (High-End Photographic Presentation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaves.map((cave, index) => {
            const highlightMural = MURALS.find(m => m.id === cave.highlightMuralId);

            return (
              <div
                key={cave.id}
                onClick={() => onEnterCave(cave.id)}
                onMouseEnter={() => setHoveredCaveId(cave.id)}
                onMouseLeave={() => setHoveredCaveId(null)}
                className="group relative rounded-3xl dunhuang-panel dunhuang-panel-hover overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={cave.coverImage}
                      alt={cave.name.zh}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-90 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18110b] via-black/20 to-black/40" />

                    {/* Serial Tag + Dynasty (Clean unboxed metadata) */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-serif drop-shadow-md">
                      <span className="font-bold text-sm tracking-wide text-[#fff7ed] bg-[#120d09]/80 px-2.5 py-1 rounded backdrop-blur-sm border border-[#d4a359]/40">
                        {cave.number}
                      </span>
                      <span className="text-[#ded0be] text-xs font-light">
                        {cave.era}
                      </span>
                    </div>

                    {/* Roman Index Watermark */}
                    <span className="absolute top-3 right-4 font-cinzel text-xl font-bold text-white/20 group-hover:text-[#d4a359]/40 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Cliff Level Position Pin */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-[#e5b869] drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-[#e5b869]" />
                      <span className="font-serif">{cave.cliffLevel}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6">
                    <h3 className="font-serif-sc font-bold text-xl text-[#f8ecd4] group-hover:text-[#e5b869] transition-colors flex items-center justify-between">
                      <span>{cave.name[language] || cave.name.zh}</span>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-[#bca792] leading-relaxed line-clamp-3 font-light">
                      {cave.description[language] || cave.description.zh}
                    </p>

                    {/* Characteristic Tags (Unboxed inline metadata with separators) */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#a89582] font-serif">
                      {cave.tags.map((tag, idx) => (
                        <span key={idx} className="flex items-center gap-1.5">
                          {idx > 0 && <span className="text-[#594231]" aria-hidden="true">·</span>}
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 bg-[#140e09] border-t border-[#2d1e14] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#d4a359] font-serif font-medium group-hover:translate-x-1.5 transition-transform">
                    <span>{language === 'zh' ? '推门入窟 · 360°漫游' : 'Enter 360° Cave'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (highlightMural) {
                        playAudioGuide(
                          highlightMural.id,
                          highlightMural.title[language] || highlightMural.title.zh,
                          highlightMural.audioGuide.transcripts[language] || highlightMural.audioGuide.transcripts.zh
                        );
                      }
                    }}
                    className="p-2 rounded-xl bg-[#22170f] hover:bg-[#332216] border border-[#423021] text-[#c9b7a1] hover:text-[#e5b869] transition-colors"
                    title="听洞窟解说"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 2: MOGAO CLIFF THREE TIERS MAP (莫高窟崖壁断崖空间分布)
        ========================================================================
      */}
      {/* 
        ========================================================================
        SECTION 2: MOGAO CLIFF THREE TIERS MAP (莫高窟崖壁断崖空间分布)
        ========================================================================
      */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 border-t border-[#d4a359]/20">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="text-xs text-[#d4a359] font-serif uppercase tracking-[0.22em] mb-2 flex items-center justify-center gap-2">
            <span>MOGAO SANDSTONE CLIFF FACADE · TIERED HIERARCHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-[#f7ecd4] tracking-wide drop-shadow-md">
            {language === 'zh' ? '莫高窟断崖三层立体分布' : 'Cliff-Face Architectural Tiers'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#bca792] font-serif leading-relaxed font-light">
            {language === 'zh'
              ? '历代石窟自上而下依鸣沙山东麓断崖开凿。点击任意层级洞窟，即可瞬时穿梭入窟。'
              : 'Click any cave marker on the cliff to teleport inside.'}
          </p>
        </div>

        {/* Cliff Hierarchy Visual Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upper Tier */}
          <div className="dunhuang-panel dunhuang-panel-hover p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#d4a359]/20">
                <span className="text-xs font-serif font-bold text-[#e5b869] uppercase tracking-wide">上层崖壁 (Upper Tier)</span>
                <span className="text-xs text-[#a89582] font-serif">高僧禅修与覆斗顶</span>
              </div>
              <p className="mt-3 text-xs text-[#b8a592] leading-relaxed font-light">
                距地面较高，主要分布隋代与唐代覆斗顶藻井窟、小型禅修石室，通风干燥，壁画保存最为完好。
              </p>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => onEnterCave('cave-407')}
                  className="w-full p-2.5 rounded-xl bg-[#241a13]/80 hover:bg-[#33241a] border border-[#d4a359]/25 hover:border-[#d4a359]/60 text-left text-xs flex items-center justify-between group transition-all"
                >
                  <span className="font-serif font-bold text-[#f5ecd9]">第407窟 · 三兔飞天藻井窟</span>
                  <span className="text-[10px] text-[#e5b869] group-hover:translate-x-1 transition-transform">入窟 →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Middle Tier */}
          <div className="dunhuang-panel dunhuang-panel-hover p-6 rounded-3xl border-[#d4a359]/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#d4a359]/20">
                <span className="text-xs font-serif font-bold text-[#e5b869] uppercase tracking-wide">中层崖壁 (Middle Tier)</span>
                <span className="text-xs text-[#e5b869] font-serif font-medium">精萃核心区</span>
              </div>
              <p className="mt-3 text-xs text-[#b8a592] leading-relaxed font-light">
                莫高窟艺术造诣最高的核心区域，北魏中心塔柱窟与唐代观音经变大窟多凿于此。
              </p>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => onEnterCave('cave-257')}
                  className="w-full p-2.5 rounded-xl bg-[#241a13]/80 hover:bg-[#33241a] border border-[#d4a359]/25 hover:border-[#d4a359]/60 text-left text-xs flex items-center justify-between group transition-all"
                >
                  <span className="font-serif font-bold text-[#f5ecd9]">第257窟 · 九色鹿本生窟</span>
                  <span className="text-[10px] text-[#e5b869] group-hover:translate-x-1 transition-transform">入窟 →</span>
                </button>
                <button
                  onClick={() => onEnterCave('cave-57')}
                  className="w-full p-2.5 rounded-xl bg-[#241a13]/80 hover:bg-[#33241a] border border-[#d4a359]/25 hover:border-[#d4a359]/60 text-left text-xs flex items-center justify-between group transition-all"
                >
                  <span className="font-serif font-bold text-[#f5ecd9]">第57窟 · 莫高美人观世音窟</span>
                  <span className="text-[10px] text-[#e5b869] group-hover:translate-x-1 transition-transform">入窟 →</span>
                </button>
                <button
                  onClick={() => onEnterCave('cave-158')}
                  className="w-full p-2.5 rounded-xl bg-[#241a13]/80 hover:bg-[#33241a] border border-[#d4a359]/25 hover:border-[#d4a359]/60 text-left text-xs flex items-center justify-between group transition-all"
                >
                  <span className="font-serif font-bold text-[#f5ecd9]">第158窟 · 15.8米涅槃卧佛窟</span>
                  <span className="text-[10px] text-[#e5b869] group-hover:translate-x-1 transition-transform">入窟 →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Lower Tier */}
          <div className="dunhuang-panel dunhuang-panel-hover p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#d4a359]/20">
                <span className="text-xs font-serif font-bold text-[#e5b869] uppercase tracking-wide">底层崖壁 (Ground Level)</span>
                <span className="text-xs text-[#a89582] font-serif">地标巨型窟</span>
              </div>
              <p className="mt-3 text-xs text-[#b8a592] leading-relaxed font-light">
                依崖壁下端开凿，包含三十五米九层楼北大佛、乐舞经变窟与著名的藏经洞密室。
              </p>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => onEnterCave('cave-96')}
                  className="w-full p-2.5 rounded-xl bg-[#241a13]/80 hover:bg-[#33241a] border border-[#d4a359]/25 hover:border-[#d4a359]/60 text-left text-xs flex items-center justify-between group transition-all"
                >
                  <span className="font-serif font-bold text-[#f5ecd9]">第96窟 · 九层楼北大佛窟</span>
                  <span className="text-[10px] text-[#e5b869] group-hover:translate-x-1 transition-transform">入窟 →</span>
                </button>
                <button
                  onClick={() => onEnterCave('cave-112')}
                  className="w-full p-2.5 rounded-xl bg-[#241a13]/80 hover:bg-[#33241a] border border-[#d4a359]/25 hover:border-[#d4a359]/60 text-left text-xs flex items-center justify-between group transition-all"
                >
                  <span className="font-serif font-bold text-[#f5ecd9]">第112窟 · 反弹琵琶伎乐窟</span>
                  <span className="text-[10px] text-[#e5b869] group-hover:translate-x-1 transition-transform">入窟 →</span>
                </button>
                <button
                  onClick={() => onEnterCave('cave-17')}
                  className="w-full p-2.5 rounded-xl bg-[#241a13]/80 hover:bg-[#33241a] border border-[#d4a359]/25 hover:border-[#d4a359]/60 text-left text-xs flex items-center justify-between group transition-all"
                >
                  <span className="font-serif font-bold text-[#f5ecd9]">第17窟 · 藏经洞万卷遗书</span>
                  <span className="text-[10px] text-[#e5b869] group-hover:translate-x-1 transition-transform">入窟 →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 3: MASTERPIECE MURALS DEEP ZOOM (镇馆壁画特展 · 点击微距鉴赏)
        ========================================================================
      */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 border-t border-[#d4a359]/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4a359] font-serif uppercase tracking-[0.22em] mb-2">
              <Eye className="w-4 h-4 text-[#e5b869]" />
              <span>GIGAPIXEL DEEP ZOOM GALLERY · CLICK TO INSPECT DETAILS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-[#f7ecd4] tracking-wide drop-shadow-md">
              {language === 'zh' ? '镇馆壁画微距鉴赏特展' : 'Masterpiece Murals Deep Zoom'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#bca792] max-w-2xl font-serif leading-relaxed font-light">
              {language === 'zh'
                ? '借助亿级像素数字显微镜头，观察沥粉贴金、铁线描与天然矿物晶体颗粒。支持放大至800%原尺寸鉴赏。'
                : 'Examine brushwork and mineral pigment crystallization under ultra-high magnification up to 800%.'}
            </p>
          </div>
        </div>

        {/* Murals Grid with Mineral Pigments Swatches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MURALS.map((mural, idx) => (
            <div
              key={mural.id}
              onClick={() => onEnterMural(mural.id)}
              className="group rounded-3xl dunhuang-panel dunhuang-panel-hover overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Photo Preview */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={mural.imageUrl}
                    alt={mural.title.zh}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18110b] via-transparent to-black/30" />

                  {/* Cave Number & Dimensions (Clean unboxed metadata) */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 text-xs font-serif drop-shadow-md">
                    <span className="font-bold text-sm text-[#fff7ed] bg-[#120d09]/80 px-2 py-0.5 rounded backdrop-blur-sm border border-[#d4a359]/40">
                      {mural.caveNumber}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 text-xs text-[#ded0be] font-light drop-shadow-md bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {mural.dimensions}
                  </div>
                </div>

                {/* Mural Info */}
                <div className="p-5">
                  <span className="text-xs text-[#a89582] font-serif">
                    {mural.dynasty[language] || mural.dynasty.zh}
                  </span>
                  <h4 className="font-serif-sc font-bold text-base text-[#f8ecd4] mt-1 group-hover:text-[#e5b869] transition-colors">
                    {mural.title[language] || mural.title.zh}
                  </h4>
                  <p className="mt-2 text-xs text-[#b8a592] line-clamp-2 leading-relaxed font-light">
                    {mural.description[language] || mural.description.zh}
                  </p>

                  {/* Pigment chips on card (Clean unboxed inline metadata) */}
                  <div className="mt-3 pt-3 border-t border-[#d4a359]/15 flex items-center gap-x-2 text-xs text-[#a89582] font-serif">
                    <span className="text-[#8c7866] text-[11px]">矿颜：</span>
                    {mural.pigments.slice(0, 3).map((p, pIdx) => (
                      <span key={pIdx} className="flex items-center gap-1.5">
                        {pIdx > 0 && <span className="text-[#594231]" aria-hidden="true">·</span>}
                        <span>{p.split(' ')[0]}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="px-5 py-3 bg-[#140e09]/90 border-t border-[#d4a359]/15 flex items-center justify-between text-xs">
                <span className="text-[#e5b869] font-serif font-medium flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                  <span>{language === 'zh' ? '进入微距显微镜' : 'Inspect Micro Zoom'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <Maximize2 className="w-3.5 h-3.5 text-[#8c7866]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 4: DIGITAL SATELLITE HUBS (点进去的特色互动展馆)
        ========================================================================
      */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 border-t border-[#d4a359]/20">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="text-xs text-[#d4a359] font-serif uppercase tracking-[0.22em] mb-2 flex items-center justify-center gap-2">
            <span>SPECIALIZED DIGITAL STUDIOS & ARCHIVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-[#f7ecd4] tracking-wide drop-shadow-md">
            {language === 'zh' ? '非遗体验与学术探索展厅' : 'Specialized Interactive Hubs'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#bca792] font-serif leading-relaxed font-light">
            {language === 'zh'
              ? '沉浸式数字艺术工坊与学术考据殿堂，点选任意展厅即刻开启深度文化探索。'
              : 'Interactive master workshops and academic archives for Dunhuang heritage.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hub 1: AI Docent Miaoyin */}
          <div
            onClick={onOpenDigitalGuide}
            className="dunhuang-panel dunhuang-panel-hover p-8 rounded-3xl dunhuang-corner-accents cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#1b2533] border border-[#4a85c8]/50 flex items-center justify-center text-[#7db5f5] mb-6 shadow-[0_0_15px_rgba(74,133,200,0.25)] group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-serif-sc font-bold text-2xl text-[#f8ecd4] group-hover:text-[#7db5f5] transition-colors">
                {language === 'zh' ? 'AI 数字人妙音导览室' : 'AI Celestial Guide Miaoyin'}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#bca792] leading-relaxed font-light">
                {language === 'zh'
                  ? '与唐代菩萨化身的智能数字人妙音进行深度学术对话。支持语音实时答疑、壁画典故解析，并内置DeepSeek大模型推理接入。'
                  : 'Engage with AI docent Miaoyin on Dunhuang iconography, Buddhist sutras, and Silk Road trade.'}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-serif font-bold text-[#7db5f5] group-hover:translate-x-1.5 transition-transform">
              <span>{language === 'zh' ? '推门进入导览室' : 'Enter Consultation Room'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Hub 2: Mineral Art Coloring Workshop */}
          <div
            onClick={onOpenWorkshop}
            className="dunhuang-panel dunhuang-panel-hover p-8 rounded-3xl dunhuang-corner-accents cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#291e16] border border-[#d4a359]/50 flex items-center justify-center text-[#e5b869] mb-6 shadow-[0_0_15px_rgba(212,163,89,0.25)] group-hover:scale-110 transition-transform">
                <Palette className="w-7 h-7" />
              </div>
              <h3 className="font-serif-sc font-bold text-2xl text-[#f8ecd4] group-hover:text-[#e5b869] transition-colors">
                {language === 'zh' ? '非遗天然矿彩修复工坊' : 'Mineral Pigment Coloring Studio'}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#bca792] leading-relaxed font-light">
                {language === 'zh'
                  ? '采用阿富汗青金石、辰砂朱砂、孔雀石绿与金箔等纯天然矿物色料，为敦煌白描线稿敷彩，并钤盖莫高红泥篆刻印章。'
                  : 'Restore ancient outline sketches with authentic mineral paints and stamp with royal seals.'}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-serif font-bold text-[#e5b869] group-hover:translate-x-1.5 transition-transform">
              <span>{language === 'zh' ? '步入非遗工坊' : 'Enter Art Studio'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Hub 3: Scholarly Encyclopedia & Pigment Lab */}
          <div
            onClick={() => onOpenEncyclopedia()}
            className="dunhuang-panel dunhuang-panel-hover p-8 rounded-3xl dunhuang-corner-accents cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#17241f] border border-[#2e6355]/50 flex items-center justify-center text-[#4ea88c] mb-6 shadow-[0_0_15px_rgba(46,99,85,0.25)] group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="font-serif-sc font-bold text-2xl text-[#f8ecd4] group-hover:text-[#4ea88c] transition-colors">
                {language === 'zh' ? '敦煌学术百科与光化演变室' : 'Encyclopedia & Aging Lab'}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#bca792] leading-relaxed font-light">
                {language === 'zh'
                  ? '互动式光化学时间轴模拟器（公元400年至2026年铅丹氧化机理）、丝路乐器谱系考据及随堂非遗文化答卷。'
                  : 'Interactive 1,600-year pigment photo-oxidation timeline, Silk Road instruments, and cultural quiz.'}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-serif font-bold text-[#4ea88c] group-hover:translate-x-1.5 transition-transform">
              <span>{language === 'zh' ? '查阅学术典籍' : 'Explore Scholarly Archive'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
