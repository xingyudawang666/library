import React from 'react';
import { Headphones, Pause, Play, X, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AudioGuideBar: React.FC = () => {
  const { audioGuide, pauseAudioGuide, playAudioGuide, stopAudioGuide, language } = useApp();

  if (!audioGuide.muralId) return null;

  return (
    <aside
      aria-label="AI语音导览播放器"
      className="fixed bottom-5 left-4 sm:left-6 z-40 w-[calc(100vw-32px)] sm:w-[420px] bg-[#1a120c]/95 backdrop-blur-md border border-[#d4a359]/60 rounded-2xl p-3.5 shadow-2xl flex flex-col gap-2 animate-fadeIn"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#d4a359] text-[#18110b] flex items-center justify-center font-bold">
            <Headphones className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-[#e5b869] uppercase font-serif tracking-wider">
              {language === 'zh' ? 'AI智能原声导览' : 'Live Audio Guide'}
            </span>
            <h4 className="text-xs font-serif-sc font-bold text-[#f5ecd9] truncate max-w-[240px]">
              {audioGuide.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              if (audioGuide.isPlaying) {
                pauseAudioGuide();
              } else {
                playAudioGuide(audioGuide.muralId!, audioGuide.title, audioGuide.currentText);
              }
            }}
            className="p-2 rounded-xl bg-[#d4a359] hover:bg-[#e5b869] text-[#18110b] transition-colors"
            title={audioGuide.isPlaying ? '暂停' : '播放'}
          >
            {audioGuide.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={stopAudioGuide}
            className="p-2 rounded-xl text-[#8c7866] hover:text-white hover:bg-[#2e2017] transition-colors"
            title="关闭解说"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Subtitle Snippet */}
      <div className="p-2 rounded-lg bg-[#140e0b] border border-[#38281d] text-[11px] text-[#c9b7a1] leading-relaxed line-clamp-2 italic">
        {audioGuide.currentText}
      </div>
    </aside>
  );
};
