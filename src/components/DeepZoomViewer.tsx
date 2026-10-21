import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Bookmark,
  BookmarkCheck,
  Share2,
  Headphones,
  Sliders,
  Sparkles,
  Search,
  Eye,
  Layers,
  ChevronLeft,
  ChevronRight,
  Info,
  Download
} from 'lucide-react';
import { MURALS, Mural, Hotspot } from '../data/dunhuangData';
import { useApp } from '../context/AppContext';

interface DeepZoomViewerProps {
  initialMuralId?: string;
  onOpenShareModal: (mural: Mural) => void;
  onBackToVR?: () => void;
}

export const DeepZoomViewer: React.FC<DeepZoomViewerProps> = ({
  initialMuralId = 'mural-deer',
  onOpenShareModal,
  onBackToVR
}) => {
  const { language, isFavorite, toggleFavorite, playAudioGuide, audioGuide, stopAudioGuide } = useApp();
  const [selectedMuralId, setSelectedMuralId] = useState(initialMuralId);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Inspection mode: 'original' (aged patina), 'restored' (vibrant mineral), 'lineart' (brushwork)
  const [viewMode, setViewMode] = useState<'original' | 'restored' | 'lineart'>('original');

  // Loupe magnifier glass lens mode
  const [loupeActive, setLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 200, y: 200 });

  // Selected hotspot popup
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const currentMural = MURALS.find(m => m.id === selectedMuralId) || MURALS[0];
  const isBookmarked = isFavorite(currentMural.id);

  // Reset zoom on mural switch
  useEffect(() => {
    setSelectedMuralId(initialMuralId);
  }, [initialMuralId]);

  useEffect(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setActiveHotspot(null);
  }, [selectedMuralId]);

  // Handle Pan Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (loupeActive) return;
    setIsPanning(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Update loupe position if active
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setLoupePos({ x, y });
    }

    if (!isPanning || loupeActive) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Zoom controls with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.2 : 0.85;
    setZoomLevel(prev => Math.max(1, Math.min(8, prev * zoomFactor)));
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(8, prev + 0.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(1, prev - 0.5));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Switch display image URL based on view mode
  const getActiveImageUrl = () => {
    switch (viewMode) {
      case 'restored':
        return currentMural.detailUrl;
      case 'lineart':
        return currentMural.lineArtUrl;
      case 'original':
      default:
        return currentMural.imageUrl;
    }
  };

  return (
    <div className="relative w-full min-h-[92vh] bg-[#140f0c] text-[#f4ede1] flex flex-col md:flex-row overflow-hidden">
      {/* Left/Main: Deep Zoom Canvas Stage */}
      <div className="flex-1 relative h-[65vh] md:h-auto overflow-hidden bg-[#0e0a08] flex items-center justify-center select-none">
        {/* Top Control Bar Over Viewer */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Mural Cave & Title Pill */}
          <div className="pointer-events-auto flex items-center gap-2">
            {onBackToVR && (
              <button
                onClick={onBackToVR}
                className="px-3 py-1.5 rounded-lg bg-[#241a13]/90 hover:bg-[#35261c] border border-[#d4a359]/30 text-xs text-[#e5b869] flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{language === 'zh' ? '回VR洞窟' : 'To VR'}</span>
              </button>
            )}

            <div className="px-3 py-1.5 rounded-lg bg-[#241a13]/90 backdrop-blur-md border border-[#d4a359]/30 flex items-center gap-2">
              <span className="font-serif-sc font-bold text-sm text-[#f5d697]">{currentMural.caveNumber}</span>
              <span className="text-xs text-[#ded2c1] font-medium">{currentMural.title[language] || currentMural.title['zh']}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#3d2c1e] text-[#bca58d]">
                {currentMural.dynasty[language] || currentMural.dynasty['zh']}
              </span>
            </div>
          </div>

          {/* Mode Toggles (Patina vs Restored vs Line Art) */}
          <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-xl bg-[#241a13]/90 backdrop-blur-md border border-[#d4a359]/30">
            <button
              onClick={() => setViewMode('original')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                viewMode === 'original' ? 'bg-[#d4a359] text-[#18110b] font-bold' : 'text-[#c9b7a1] hover:text-white'
              }`}
            >
              {language === 'zh' ? '千载古貌' : 'Ancient Patina'}
            </button>
            <button
              onClick={() => setViewMode('restored')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                viewMode === 'restored' ? 'bg-[#c1382b] text-white font-bold' : 'text-[#c9b7a1] hover:text-white'
              }`}
            >
              {language === 'zh' ? '盛彩复原' : 'Digital Restore'}
            </button>
            <button
              onClick={() => setViewMode('lineart')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                viewMode === 'lineart' ? 'bg-[#3b6ea5] text-white font-bold' : 'text-[#c9b7a1] hover:text-white'
              }`}
            >
              {language === 'zh' ? '铁线白描' : 'Line Art'}
            </button>
          </div>
        </div>

        {/* Zoom & Pan Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          className={`w-full h-full flex items-center justify-center relative overflow-hidden ${
            isPanning ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Main Display Image */}
          <div
            style={{
              transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: isPanning ? 'none' : 'transform 0.15s ease-out',
            }}
            className="relative max-w-[90%] max-h-[85%] flex items-center justify-center"
          >
            <img
              ref={imageRef}
              src={getActiveImageUrl()}
              alt={currentMural.title[language] || currentMural.title['zh']}
              className={`max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl transition-all duration-300 ${
                viewMode === 'lineart' ? 'filter grayscale contrast-175 invert brightness-90' : ''
              }`}
            />

            {/* Hotspots pinned on mural image */}
            {currentMural.hotspots.map(hs => (
              <button
                key={hs.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(hs);
                }}
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
              >
                <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#c1382b] border-2 border-[#f7e0a3] text-white shadow-[0_0_12px_rgba(193,56,43,0.8)] hover:scale-125 transition-transform">
                  <span className="text-[11px] font-bold">✦</span>
                </div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex whitespace-nowrap px-2 py-0.5 rounded bg-[#1c140e] text-[11px] text-[#f7e0a3] border border-[#d4a359]/40 z-30 shadow-lg">
                  {hs.title[language] || hs.title['zh']}
                </div>
              </button>
            ))}
          </div>

          {/* Loupe / Magnifying Lens Simulation */}
          {loupeActive && (
            <div
              style={{
                left: `${loupePos.x - 90}px`,
                top: `${loupePos.y - 90}px`,
                backgroundImage: `url(${getActiveImageUrl()})`,
                backgroundSize: `${1600 * 2.5}px auto`,
                backgroundPosition: `-${loupePos.x * 2.5 - 90}px -${loupePos.y * 2.5 - 90}px`,
              }}
              className="pointer-events-none absolute w-[180px] h-[180px] rounded-full border-4 border-[#e5b869] shadow-[0_0_35px_rgba(0,0,0,0.8)] bg-no-repeat z-30"
            >
              <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded-full bg-black/75 text-[#f5d697]">
                3.5x 矿物显微
              </div>
            </div>
          )}
        </div>

        {/* Hotspot Drawer / Card */}
        {activeHotspot && (
          <div className="absolute bottom-20 left-6 right-6 md:left-auto md:right-8 md:w-[420px] p-4 rounded-xl bg-[#221812]/95 backdrop-blur-md border border-[#d4a359]/60 shadow-2xl z-30 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#452b1b] text-[#e5b869] uppercase tracking-wider">
                  {language === 'zh' ? '微距鉴赏要义' : 'Macro Analysis'}
                </span>
                <h4 className="font-serif-sc font-bold text-base text-[#f5d697] mt-1">
                  {activeHotspot.title[language] || activeHotspot.title['zh']}
                </h4>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-[#99836c] hover:text-[#fff] text-sm px-1.5"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-xs text-[#ded2c1] leading-relaxed">
              {activeHotspot.description[language] || activeHotspot.description['zh']}
            </p>
            {activeHotspot.pigment && (
              <div className="mt-2 text-[11px] text-[#c49a62] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#e5b869]" />
                <span>{language === 'zh' ? `矿物颜料考证：${activeHotspot.pigment}` : `Pigment: ${activeHotspot.pigment}`}</span>
              </div>
            )}
          </div>
        )}

        {/* Bottom Floating Viewer Toolbar */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Zoom controls */}
          <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-xl bg-[#241a13]/90 backdrop-blur-md border border-[#d4a359]/30">
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg hover:bg-[#38281b] text-[#e5b869] transition-colors"
              title="放大细节"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-xs px-2 text-[#d4a359] font-mono font-bold">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg hover:bg-[#38281b] text-[#e5b869] transition-colors"
              title="缩小"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 rounded-lg hover:bg-[#38281b] text-[#c9b7a1] transition-colors"
              title="重置比例"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Loupe toggle */}
            <button
              onClick={() => setLoupeActive(!loupeActive)}
              className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                loupeActive ? 'bg-[#d4a359] text-[#18110b] font-bold' : 'text-[#c9b7a1] hover:text-white'
              }`}
              title="放大镜显微镜模式"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'zh' ? '放大镜' : 'Loupe'}</span>
            </button>
          </div>

          {/* Quick Switch Mural Thumbnails Carousel */}
          <div className="pointer-events-auto flex items-center gap-2 overflow-x-auto max-w-sm p-1 rounded-xl bg-[#241a13]/90 backdrop-blur-md border border-[#d4a359]/30">
            {MURALS.map(m => {
              const active = m.id === currentMural.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMuralId(m.id)}
                  className={`relative flex-shrink-0 w-12 h-10 rounded-lg overflow-hidden border transition-all ${
                    active ? 'border-[#e5b869] ring-2 ring-[#e5b869]/50' : 'border-[#473425] opacity-60 hover:opacity-100'
                  }`}
                  title={m.title[language] || m.title['zh']}
                >
                  <img src={m.imageUrl} alt="" className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Mural Scholarly Insight & Actions Panel */}
      <div className="w-full md:w-[380px] lg:w-[420px] bg-[#1a1410] border-l border-[#3d2d20] flex flex-col h-auto md:h-[92vh] overflow-y-auto p-5">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#3d281a] border border-[#d4a359]/30 text-[#e5b869] text-xs font-serif font-bold">
              {currentMural.caveNumber}
            </span>
            <span className="text-xs text-[#a3907d]">
              {currentMural.dynasty[language] || currentMural.dynasty['zh']}
            </span>
          </div>

          {/* Action buttons: Bookmark + Share Passport */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(currentMural.id)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                isBookmarked
                  ? 'bg-[#3b2718] border-[#e5b869] text-[#e5b869]'
                  : 'bg-[#241a13] border-[#4a3627] text-[#a3907d] hover:text-[#f8edd5]'
              }`}
              title={isBookmarked ? '已收藏在个人图鉴中' : '收藏此壁画'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onOpenShareModal(currentMural)}
              className="p-2 rounded-lg bg-[#241a13] border border-[#d4a359]/40 hover:border-[#d4a359] text-[#e5b869] transition-colors"
              title="生成专属敦煌艺术图鉴与社交卡片"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-3 text-2xl font-serif-sc font-bold text-[#f7ecd4]">
          {currentMural.title[language] || currentMural.title['zh']}
        </h2>

        {/* Dimensions & Pigments Tags */}
        <div className="mt-2 text-xs text-[#99836c] flex items-center gap-3">
          <span>{currentMural.dimensions}</span>
          <span>•</span>
          <span>{currentMural.eraPeriod}</span>
        </div>

        {/* Audio Guide Playbar */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#261d16] border border-[#d4a359]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-[#e5b869]" />
              <span className="text-xs font-bold text-[#f5d697]">
                {language === 'zh' ? 'AI智能语音导览' : 'AI Audio Narration'}
              </span>
            </div>
            <span className="text-[11px] text-[#99836c] font-mono">
              {currentMural.audioGuide.duration}
            </span>
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            <button
              onClick={() => {
                if (audioGuide.isPlaying && audioGuide.muralId === currentMural.id) {
                  stopAudioGuide();
                } else {
                  playAudioGuide(
                    currentMural.id,
                    currentMural.title[language] || currentMural.title['zh'],
                    currentMural.audioGuide.transcripts[language] || currentMural.audioGuide.transcripts['zh']
                  );
                }
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[#d4a359] to-[#b87d3b] hover:from-[#e5b869] hover:to-[#c98c48] text-[#18110b] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              {audioGuide.isPlaying && audioGuide.muralId === currentMural.id ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#18110b] animate-ping" />
                  <span>{language === 'zh' ? '正在解说中 · 点击暂停' : 'Playing · Tap to Pause'}</span>
                </>
              ) : (
                <>
                  <span>▶</span>
                  <span>{language === 'zh' ? '聆听学者深度解说' : 'Listen to Audio Guide'}</span>
                </>
              )}
            </button>
          </div>

          {/* Real-time Subtitles / Transcript preview */}
          <div className="mt-2.5 p-2 rounded bg-[#1c140e] text-[11px] text-[#c9b7a1] italic max-h-24 overflow-y-auto leading-relaxed border border-[#3d2b1f]">
            {currentMural.audioGuide.transcripts[language] || currentMural.audioGuide.transcripts['zh']}
          </div>
        </div>

        {/* Section: Mineral Pigments Applied */}
        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4a359] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#e5b869]" />
            <span>{language === 'zh' ? '赋存天然矿物颜料' : 'Natural Mineral Pigments'}</span>
          </h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {currentMural.pigments.map((p, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-[#291e16] border border-[#523c2a] text-xs text-[#dfd0bd]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Section: Scholarly Artwork Description */}
        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4a359]">
            {language === 'zh' ? '作品艺术评述' : 'Artistic Value'}
          </h4>
          <p className="mt-2 text-xs text-[#c9b7a1] leading-relaxed">
            {currentMural.description[language] || currentMural.description['zh']}
          </p>
        </div>

        {/* Section: The Story Behind The Mural */}
        <div className="mt-5 mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4a359]">
            {language === 'zh' ? '历史故事与典故' : 'Story & Iconography'}
          </h4>
          <p className="mt-2 text-xs text-[#c9b7a1] leading-relaxed">
            {currentMural.story[language] || currentMural.story['zh']}
          </p>
        </div>
      </div>
    </div>
  );
};
