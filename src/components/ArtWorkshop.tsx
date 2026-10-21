import React, { useState, useRef, useEffect } from 'react';
import {
  Palette,
  Brush,
  PaintBucket,
  RotateCcw,
  Download,
  Save,
  Sparkles,
  Eraser,
  CheckCircle,
  Undo2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

interface OutlineTemplate {
  id: string;
  name: Record<string, string>;
  dynasty: string;
  description: Record<string, string>;
  svgPath: string;
}

const PIGMENTS = [
  { name: { zh: '朱砂 (Cinnabar)', en: 'Cinnabar' }, color: '#c1382b', desc: '天然硫化汞，千年鲜红' },
  { name: { zh: '泥金 (Gilded Gold)', en: 'Gold Leaf' }, color: '#d4a359', desc: '纯金研箔，皇家雍容' },
  { name: { zh: '石青 (Lapis Lazuli)', en: 'Lapis Lazuli' }, color: '#244b7a', desc: '阿富汗宝蓝，琉璃佛国' },
  { name: { zh: '石绿 (Malachite)', en: 'Malachite' }, color: '#2e6355', desc: '孔雀石翠绿，仙衣翡翠' },
  { name: { zh: '赭石 (Ochre)', en: 'Ochre' }, color: '#a44322', desc: '鸣沙山土红，沉浑沧桑' },
  { name: { zh: '雌黄 (Orpiment)', en: 'Orpiment' }, color: '#e5b869', desc: '天然三硫化砷，灿若金晖' },
  { name: { zh: '铅白 (White Lead)', en: 'White Lead' }, color: '#f5edd6', desc: '微光素粉，肌若凝脂' },
  { name: { zh: '松烟墨 (Carbon Ink)', en: 'Pine Ink' }, color: '#1f1915', desc: '古法松烟，铁线勾魂' },
];

export const ArtWorkshop: React.FC = () => {
  const { language, saveArtwork } = useApp();
  const [selectedPigment, setSelectedPigment] = useState(PIGMENTS[0].color);
  const [tool, setTool] = useState<'brush' | 'fill' | 'eraser' | 'goldStamp'>('brush');
  const [brushSize, setBrushSize] = useState(8);
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const templates: OutlineTemplate[] = [
    {
      id: 'deer-outline',
      name: { zh: '九色神鹿本生线稿', en: 'Nine-Colored Deer Outline' },
      dynasty: '北魏',
      description: {
        zh: '体验北魏画师的铁线描笔法，用石青、石绿和朱砂还原神鹿的超拔神性。',
        en: 'Northern Wei iron-wire lines. Recreate the divine deer using lapis and malachite.'
      },
      svgPath: 'deer'
    },
    {
      id: 'pipa-outline',
      name: { zh: '反弹琵琶乐舞线稿', en: 'Reverse Pipa Dancer Outline' },
      dynasty: '中唐',
      description: {
        zh: '盛唐兰叶描天衣飞卷，施以泥金与朱红，体验狂放激昂的大唐舞姿。',
        en: 'Middle Tang sweeping ribbons. Embellish with gold leaf and cinnabar.'
      },
      svgPath: 'pipa'
    },
    {
      id: 'caisson-outline',
      name: { zh: '三兔飞天藻井线稿', en: 'Three Hares Caisson Outline' },
      dynasty: '隋代',
      description: {
        zh: '隋代八瓣莲花与三兔追逐，施以五色矿物，重现千年穹顶的宇宙幻境。',
        en: 'Sui Dynasty lotus and racing hares mandala.'
      },
      svgPath: 'caisson'
    }
  ];

  // Draw template outline on canvas
  const drawTemplateOnCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number, type: string) => {
    // Fill aged silk/mineral sandstone paper background
    ctx.fillStyle = '#efe3ce';
    ctx.fillRect(0, 0, width, height);

    // Subtle paper texture noise
    ctx.fillStyle = 'rgba(164, 67, 34, 0.03)';
    for (let i = 0; i < 3000; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }

    // Border framing
    ctx.strokeStyle = '#8c5820';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, width - 32, height - 32);
    ctx.strokeStyle = '#c1382b';
    ctx.lineWidth = 1;
    ctx.strokeRect(22, 22, width - 44, height - 44);

    ctx.strokeStyle = '#231812';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (type === 'deer') {
      // Draw Nine-Colored Deer outline
      const cx = width / 2;
      const cy = height / 2 + 20;

      // Deer Torso
      ctx.beginPath();
      ctx.ellipse(cx, cy, 110, 60, -0.1, 0, Math.PI * 2);
      ctx.stroke();

      // Graceful Neck & Head
      ctx.beginPath();
      ctx.moveTo(cx - 70, cy - 20);
      ctx.quadraticCurveTo(cx - 100, cy - 110, cx - 110, cy - 150);
      ctx.quadraticCurveTo(cx - 70, cy - 165, cx - 60, cy - 130);
      ctx.quadraticCurveTo(cx - 50, cy - 70, cx - 40, cy - 20);
      ctx.stroke();

      // Antlers branching
      ctx.beginPath();
      ctx.moveTo(cx - 95, cy - 155);
      ctx.quadraticCurveTo(cx - 130, cy - 205, cx - 110, cy - 230);
      ctx.moveTo(cx - 115, cy - 180);
      ctx.lineTo(cx - 145, cy - 195);
      ctx.moveTo(cx - 105, cy - 210);
      ctx.lineTo(cx - 85, cy - 225);

      ctx.moveTo(cx - 75, cy - 155);
      ctx.quadraticCurveTo(cx - 50, cy - 205, cx - 40, cy - 235);
      ctx.moveTo(cx - 65, cy - 180);
      ctx.lineTo(cx - 30, cy - 190);
      ctx.stroke();

      // Slender Legs
      ctx.beginPath();
      // Front legs
      ctx.moveTo(cx - 70, cy + 30);
      ctx.lineTo(cx - 75, cy + 150);
      ctx.moveTo(cx - 50, cy + 35);
      ctx.lineTo(cx - 55, cy + 145);
      // Hind legs
      ctx.moveTo(cx + 60, cy + 30);
      ctx.lineTo(cx + 65, cy + 150);
      ctx.moveTo(cx + 85, cy + 25);
      ctx.lineTo(cx + 90, cy + 145);
      ctx.stroke();

      // River currents underneath
      ctx.strokeStyle = '#5a7894';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(40, cy + 160 + i * 16);
        ctx.bezierCurveTo(width * 0.3, cy + 140 + i * 16, width * 0.6, cy + 175 + i * 16, width - 40, cy + 155 + i * 16);
        ctx.stroke();
      }
    } else if (type === 'pipa') {
      // Reverse Pipa outline
      const cx = width / 2;
      const cy = height / 2;

      // Pipa Body
      ctx.beginPath();
      ctx.ellipse(cx + 40, cy - 90, 45, 65, 0.4, 0, Math.PI * 2);
      ctx.stroke();

      // Pipa Neck
      ctx.beginPath();
      ctx.moveTo(cx + 60, cy - 140);
      ctx.lineTo(cx + 100, cy - 170);
      ctx.stroke();

      // Dancer Torso & Head
      ctx.beginPath();
      ctx.ellipse(cx - 20, cy - 60, 22, 28, 0, 0, Math.PI * 2); // head
      ctx.moveTo(cx - 20, cy - 32);
      ctx.quadraticCurveTo(cx - 10, cy + 20, cx - 25, cy + 60); // arched back
      ctx.stroke();

      // Leaping legs
      ctx.beginPath();
      ctx.moveTo(cx - 25, cy + 60);
      ctx.quadraticCurveTo(cx - 80, cy + 80, cx - 60, cy + 140);
      ctx.moveTo(cx - 25, cy + 60);
      ctx.quadraticCurveTo(cx + 40, cy + 80, cx + 50, cy + 150);
      ctx.stroke();

      // Flowing silk scarves (large S curves)
      ctx.strokeStyle = '#c1382b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 100, cy - 20);
      ctx.bezierCurveTo(cx - 120, cy + 100, cx + 120, cy - 20, cx + 110, cy + 120);
      ctx.stroke();
    } else {
      // Caisson Three Hares outline
      const cx = width / 2;
      const cy = height / 2;

      // Outer rings
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, 65, 0, Math.PI * 2);
      ctx.stroke();

      // 8 Petals
      for (let i = 0; i < 8; i++) {
        const rad = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(rad) * 120, cy + Math.sin(rad) * 120);
        ctx.stroke();
      }
    }
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawTemplateOnCanvas(ctx, canvas.width, canvas.height, templates[activeTemplateIndex].svgPath);
  };

  useEffect(() => {
    initCanvas();
  }, [activeTemplateIndex]);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    if (tool === 'goldStamp') {
      // Apply Traditional Red Seal Stamp
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.save();
        ctx.fillStyle = '#b83b2a';
        ctx.strokeStyle = '#b83b2a';
        ctx.lineWidth = 3;
        ctx.strokeRect(x - 24, y - 24, 48, 48);
        ctx.font = 'bold 16px "Noto Serif SC", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('莫高', x, y - 9);
        ctx.fillText('心印', x, y + 9);
        ctx.restore();
      }
      return;
    }

    isDrawingRef.current = true;
    lastPointRef.current = { x, y };

    // Draw single point dot
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = tool === 'eraser' ? '#efe3ce' : selectedPigment;
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#efe3ce' : selectedPigment;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPointRef.current = { x, y };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const handleClear = () => {
    initCanvas();
  };

  const handleSaveToPassport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    saveArtwork(templates[activeTemplateIndex].name[language] || templates[activeTemplateIndex].name['zh'], dataUrl);

    setSavedSuccess(true);
    confetti({ particleCount: 40, spread: 60, colors: ['#d4a359', '#c1382b', '#244b7a'] });
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `dunhuang-mural-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="relative min-h-[92vh] bg-[#140e0b] text-[#f5ecd9] p-4 md:p-8 flex flex-col items-center">
      {/* Title & Banner */}
      <div className="text-center max-w-2xl mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#291e16] border border-[#d4a359]/30 text-xs text-[#e5b869] mb-2 font-serif">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'zh' ? '非物质文化遗产 · 天然矿物颜料数字拓色工坊' : 'Dunhuang Mineral Coloring Workshop'}</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-serif-sc font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f5ecd9] via-[#e5b869] to-[#c1382b]">
          {language === 'zh' ? '莫高画壁 · 妙笔生花' : 'Dunhuang Art Creation Studio'}
        </h2>
        <p className="mt-2 text-xs md:text-sm text-[#bca790]">
          {language === 'zh'
            ? '选用朱砂、石青、泥金等千年天然矿物颜料，为古拙精绝的敦煌壁画线稿重染盛世斑斓。'
            : 'Select mineral pigments — cinnabar, lapis, and gold leaf — to restore ancient line art.'}
        </p>
      </div>

      {/* Main Studio Workspace Grid */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Left: Interactive Canvas Viewport */}
        <div className="flex-1 w-full flex flex-col items-center">
          {/* Template Selection Tabs */}
          <div className="flex items-center gap-2 mb-3 overflow-x-auto max-w-full p-1 rounded-xl bg-[#1e1510] border border-[#3d2c1e]">
            {templates.map((tpl, idx) => (
              <button
                key={tpl.id}
                onClick={() => setActiveTemplateIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif whitespace-nowrap transition-all ${
                  activeTemplateIndex === idx
                    ? 'bg-[#d4a359] text-[#18110b] font-bold shadow-md'
                    : 'text-[#c9b7a1] hover:text-white'
                }`}
              >
                <span>{tpl.name[language] || tpl.name['zh']}</span>
                <span className="ml-1 text-[10px] opacity-75">({tpl.dynasty})</span>
              </button>
            ))}
          </div>

          {/* Canvas Box */}
          <div className="relative p-2 rounded-2xl bg-[#241a13] border-2 border-[#d4a359]/40 shadow-2xl overflow-hidden">
            <canvas
              ref={canvasRef}
              width={640}
              height={500}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="bg-[#efe3ce] rounded-xl cursor-crosshair max-w-full h-auto shadow-inner"
              style={{ maxHeight: '60vh' }}
            />
          </div>

          {/* Action Bar (Clear, Undo, Save to Passport, Download) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleClear}
              className="px-3 py-2 rounded-lg bg-[#241a13] hover:bg-[#35251a] border border-[#4a3627] text-xs text-[#c9b7a1] flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'zh' ? '重置画布' : 'Reset'}</span>
            </button>

            <button
              onClick={handleSaveToPassport}
              className="px-4 py-2 rounded-lg bg-[#d4a359] hover:bg-[#e5b869] text-[#18110b] font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-800" />
                  <span>{language === 'zh' ? '已收录进个人图鉴！' : 'Saved to Passport!'}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{language === 'zh' ? '收录进艺术图鉴' : 'Save to Passport'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-lg bg-[#241a13] hover:bg-[#35251a] border border-[#d4a359]/40 text-xs text-[#e5b869] flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'zh' ? '下载高清作品' : 'Download PNG'}</span>
            </button>
          </div>
        </div>

        {/* Right: Mineral Pigments Palette & Tool Controls */}
        <div className="w-full lg:w-80 bg-[#1e1510] border border-[#3d2c1e] rounded-2xl p-5 flex flex-col gap-5">
          {/* Tool Switcher */}
          <div>
            <span className="text-xs font-serif font-bold text-[#e5b869] uppercase tracking-wider block mb-2">
              {language === 'zh' ? '绘画工具' : 'Brushes & Tools'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTool('brush')}
                className={`py-2 rounded-lg text-xs flex flex-col items-center gap-1 border transition-all ${
                  tool === 'brush' ? 'bg-[#3b2718] border-[#e5b869] text-[#f5d697]' : 'border-[#3a2b1f] text-[#a3907d]'
                }`}
              >
                <Brush className="w-4 h-4" />
                <span>{language === 'zh' ? '矿彩画笔' : 'Brush'}</span>
              </button>
              <button
                onClick={() => setTool('eraser')}
                className={`py-2 rounded-lg text-xs flex flex-col items-center gap-1 border transition-all ${
                  tool === 'eraser' ? 'bg-[#3b2718] border-[#e5b869] text-[#f5d697]' : 'border-[#3a2b1f] text-[#a3907d]'
                }`}
              >
                <Eraser className="w-4 h-4" />
                <span>{language === 'zh' ? '石青擦' : 'Eraser'}</span>
              </button>
              <button
                onClick={() => setTool('goldStamp')}
                className={`py-2 rounded-lg text-xs flex flex-col items-center gap-1 border transition-all ${
                  tool === 'goldStamp' ? 'bg-[#3b2718] border-[#e5b869] text-[#f5d697]' : 'border-[#3a2b1f] text-[#a3907d]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#c1382b]" />
                <span>{language === 'zh' ? '朱红印章' : 'Red Seal'}</span>
              </button>
            </div>
          </div>

          {/* Brush Size Slider */}
          <div>
            <div className="flex justify-between items-center text-xs text-[#a3907d] mb-1.5">
              <span>{language === 'zh' ? '笔触粗细' : 'Brush Size'}</span>
              <span className="font-mono text-[#e5b869]">{brushSize}px</span>
            </div>
            <input
              type="range"
              min="2"
              max="36"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full accent-[#d4a359] cursor-pointer"
            />
          </div>

          {/* Dunhuang Mineral Pigments Swatches */}
          <div>
            <span className="text-xs font-serif font-bold text-[#e5b869] uppercase tracking-wider block mb-2.5">
              {language === 'zh' ? '敦煌天然矿物颜料匣' : 'Mineral Pigment Chest'}
            </span>
            <div className="space-y-2">
              {PIGMENTS.map(p => {
                const active = selectedPigment === p.color;
                return (
                  <button
                    key={p.color}
                    onClick={() => {
                      setSelectedPigment(p.color);
                      if (tool === 'eraser') setTool('brush');
                    }}
                    className={`w-full p-2 rounded-xl flex items-center gap-3 border text-left transition-all ${
                      active ? 'bg-[#2b1c13] border-[#e5b869] shadow-md' : 'bg-[#18110c] border-[#38281d] hover:border-[#634934]'
                    }`}
                  >
                    <span
                      style={{ backgroundColor: p.color }}
                      className="w-6 h-6 rounded-full border border-white/30 flex-shrink-0 shadow-inner"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#f5ecd9] truncate">
                        {(p.name as Record<string, string>)[language] || p.name.zh}
                      </div>
                      <div className="text-[10px] text-[#99836c] truncate">{p.desc}</div>
                    </div>
                    {active && <span className="text-[#e5b869] text-xs font-bold">●</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
