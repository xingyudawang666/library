import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, RotateCcw, Clock, Move, CheckCircle2, Eye, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

interface Tile {
  id: number;
  currentPos: number;
  correctPos: number;
}

export const CulturalGame: React.FC = () => {
  const { language } = useApp();
  const [gridSize, setGridSize] = useState<3 | 4>(3);
  const [muralKey, setMuralKey] = useState<'deer' | 'pipa' | 'caisson'>('deer');
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const muralImages: Record<string, { title: Record<string, string>; url: string; cave: string }> = {
    deer: {
      title: { zh: '九色鹿本生图', en: 'The Nine-Colored Deer' },
      url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=800&auto=format&fit=crop',
      cave: '第257窟 · 北魏'
    },
    pipa: {
      title: { zh: '反弹琵琶伎乐图', en: 'Reverse Pipa Dancer' },
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
      cave: '第112窟 · 中唐'
    },
    caisson: {
      title: { zh: '三兔飞天藻井图', en: 'Three Hares Caisson' },
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
      cave: '第407窟 · 隋代'
    }
  };

  // Initialize and shuffle tiles
  const initGame = () => {
    const total = gridSize * gridSize;
    const initialTiles: Tile[] = Array.from({ length: total }, (_, i) => ({
      id: i,
      currentPos: i,
      correctPos: i
    }));

    // Randomize tile positions
    const shuffledPositions = [...Array(total).keys()].sort(() => Math.random() - 0.5);
    const shuffled = initialTiles.map((t, idx) => ({
      ...t,
      currentPos: shuffledPositions[idx]
    }));

    setTiles(shuffled);
    setMoves(0);
    setElapsedTime(0);
    setStartTime(Date.now());
    setIsCompleted(false);
  };

  useEffect(() => {
    initGame();
  }, [gridSize, muralKey]);

  // Timer loop
  useEffect(() => {
    if (!startTime || isCompleted) return;
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, isCompleted]);

  // Handle tile click (swap with clicked target or adjacent)
  const handleTileClick = (clickedId: number) => {
    if (isCompleted) return;

    // Find the blank tile or simply swap with the empty position (last index total - 1)
    const blankId = gridSize * gridSize - 1;
    const clickedTile = tiles.find(t => t.id === clickedId);
    const blankTile = tiles.find(t => t.id === blankId);

    if (!clickedTile || !blankTile) return;

    const clickedPos = clickedTile.currentPos;
    const blankPos = blankTile.currentPos;

    // Check if adjacent in grid
    const rowClicked = Math.floor(clickedPos / gridSize);
    const colClicked = clickedPos % gridSize;
    const rowBlank = Math.floor(blankPos / gridSize);
    const colBlank = blankPos % gridSize;

    const isAdjacent =
      (Math.abs(rowClicked - rowBlank) === 1 && colClicked === colBlank) ||
      (Math.abs(colClicked - colBlank) === 1 && rowClicked === rowBlank);

    if (isAdjacent) {
      setTiles(prev =>
        prev.map(t => {
          if (t.id === clickedId) return { ...t, currentPos: blankPos };
          if (t.id === blankId) return { ...t, currentPos: clickedPos };
          return t;
        })
      );
      setMoves(m => m + 1);

      // Check win condition
      setTimeout(() => {
        setTiles(currentTiles => {
          const won = currentTiles.every(t => t.currentPos === t.correctPos);
          if (won) {
            setIsCompleted(true);
            confetti({
              particleCount: 70,
              spread: 90,
              colors: ['#d4a359', '#c1382b', '#244b7a', '#2e6355']
            });
          }
          return currentTiles;
        });
      }, 50);
    }
  };

  const activeMural = muralImages[muralKey];

  return (
    <div className="relative min-h-[92vh] bg-[#140e0b] text-[#f4ede1] p-4 md:p-8 flex flex-col items-center">
      {/* Title Header */}
      <div className="text-center max-w-xl mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#241a13] border border-[#d4a359]/30 text-xs text-[#e5b869] mb-2 font-serif">
          <Trophy className="w-3.5 h-3.5" />
          <span>{language === 'zh' ? '非遗文化解谜互动 · 莫高壁画复原拼图' : 'Mogao Mural Restoration Game'}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif-sc font-bold text-[#f5ecd9]">
          {language === 'zh' ? '残卷缀连 · 还原千年瑰宝' : 'Reconstruct the Sacred Murals'}
        </h2>
        <p className="mt-1 text-xs text-[#a89582]">
          {language === 'zh' ? '点击相邻瓦片滑动拼图，在规定时间内完整拼接敦煌壁画，赢取莫高守护人非遗勋章。' : 'Slide adjacent tiles to assemble ancient Dunhuang paintings.'}
        </p>
      </div>

      {/* Control Bar (Mural Picker + Difficulty + Timer + Moves) */}
      <div className="w-full max-w-md flex flex-wrap items-center justify-between gap-3 mb-4 p-3 rounded-xl bg-[#1e1510] border border-[#3d2b1f]">
        {/* Mural Selector */}
        <div className="flex items-center gap-1.5">
          {(['deer', 'pipa', 'caisson'] as const).map(k => (
            <button
              key={k}
              onClick={() => setMuralKey(k)}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif transition-colors ${
                muralKey === k ? 'bg-[#d4a359] text-[#18110b] font-bold' : 'text-[#c9b7a1] hover:text-white'
              }`}
            >
              {muralImages[k].title[language] || muralImages[k].title['zh']}
            </button>
          ))}
        </div>

        {/* Difficulty */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setGridSize(3)}
            className={`px-2 py-0.5 rounded text-xs ${
              gridSize === 3 ? 'bg-[#c1382b] text-white font-bold' : 'text-[#8c7866]'
            }`}
          >
            3×3
          </button>
          <button
            onClick={() => setGridSize(4)}
            className={`px-2 py-0.5 rounded text-xs ${
              gridSize === 4 ? 'bg-[#c1382b] text-white font-bold' : 'text-[#8c7866]'
            }`}
          >
            4×4
          </button>
        </div>
      </div>

      {/* Status Indicators (Time, Moves, Preview toggle) */}
      <div className="w-full max-w-md flex items-center justify-between text-xs text-[#c9b7a1] mb-3 px-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#e5b869]" />
            <span className="font-mono">{elapsedTime}s</span>
          </span>
          <span className="flex items-center gap-1">
            <Move className="w-3.5 h-3.5 text-[#e5b869]" />
            <span className="font-mono">{moves} {language === 'zh' ? '步' : 'moves'}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#241a13] hover:bg-[#35251a] text-[#e5b869] transition-colors"
          >
            <Eye className="w-3 h-3" />
            <span>{showPreview ? (language === 'zh' ? '隐藏参考图' : 'Hide') : (language === 'zh' ? '查看原画' : 'Hint')}</span>
          </button>
          <button
            onClick={initGame}
            className="p-1 rounded bg-[#241a13] hover:bg-[#35251a] text-[#c9b7a1]"
            title="重新洗牌"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Original Image Preview Drawer */}
      {showPreview && (
        <div className="w-full max-w-md mb-4 p-2.5 rounded-xl bg-[#241a13] border border-[#d4a359]/40 flex items-center gap-3 animate-fadeIn">
          <img src={activeMural.url} alt="Reference" className="w-16 h-16 object-cover rounded-lg border border-[#d4a359]/30" />
          <div className="text-xs">
            <div className="font-bold text-[#f5d697]">{activeMural.title[language] || activeMural.title['zh']}</div>
            <div className="text-[11px] text-[#99836c]">{activeMural.cave}</div>
            <div className="text-[10px] text-[#c9b7a1] mt-0.5">{language === 'zh' ? '将瓦片滑至与此画完全一致即可通关' : 'Match tiles to this masterwork.'}</div>
          </div>
        </div>
      )}

      {/* Main Puzzle Grid Canvas Container */}
      <div
        style={{
          width: '360px',
          height: '360px',
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          gap: '3px'
        }}
        className="p-2.5 rounded-2xl bg-[#241a13] border-2 border-[#d4a359]/50 shadow-2xl relative select-none"
      >
        {Array.from({ length: gridSize * gridSize }).map((_, slotIndex) => {
          const tile = tiles.find(t => t.currentPos === slotIndex);
          if (!tile) return <div key={slotIndex} />;

          const isBlank = tile.id === gridSize * gridSize - 1;
          const originalRow = Math.floor(tile.correctPos / gridSize);
          const originalCol = tile.correctPos % gridSize;

          const pctX = (originalCol / (gridSize - 1)) * 100;
          const pctY = (originalRow / (gridSize - 1)) * 100;

          if (isBlank && !isCompleted) {
            return (
              <div
                key={tile.id}
                className="w-full h-full rounded-lg bg-[#140e0b]/90 border border-dashed border-[#543b2a] flex items-center justify-center"
              >
                <span className="text-[10px] text-[#634934]">空</span>
              </div>
            );
          }

          return (
            <button
              key={tile.id}
              onClick={() => handleTileClick(tile.id)}
              style={{
                backgroundImage: `url(${activeMural.url})`,
                backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                backgroundPosition: `${pctX}% ${pctY}%`,
              }}
              className="w-full h-full rounded-lg border border-[#e5b869]/30 hover:border-[#e5b869] shadow-md transition-transform active:scale-95 cursor-pointer relative"
            >
              {/* Optional tile index watermark */}
              <span className="absolute bottom-1 right-1 px-1 rounded bg-black/60 text-[9px] text-[#d4a359] font-mono">
                {tile.correctPos + 1}
              </span>
            </button>
          );
        })}

        {/* Victory Celebration Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-[#160f0a]/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-fadeIn z-20">
            <Award className="w-16 h-16 text-[#e5b869] animate-bounce mb-2" />
            <h3 className="text-xl font-serif-sc font-bold text-[#f5ecd9]">
              {language === 'zh' ? '壁画复原圆满成功！' : 'Mural Restored!'}
            </h3>
            <p className="mt-2 text-xs text-[#c9b7a1]">
              {language === 'zh'
                ? `历时 ${elapsedTime} 秒，共 ${moves} 步。您已成功还原了 ${activeMural.title.zh}，荣获【莫高非遗修复特使】荣誉印记！`
                : `Completed in ${elapsedTime}s and ${moves} moves.`}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={initGame}
                className="px-4 py-2 rounded-xl bg-[#d4a359] text-[#18110b] font-bold text-xs shadow-md"
              >
                {language === 'zh' ? '再挑战一局' : 'Play Again'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
