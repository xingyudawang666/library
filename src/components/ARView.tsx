import React, { useState, useRef, useEffect } from 'react';
import { Camera, Sparkles, RotateCw, ZoomIn, Download, Layers, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MURALS } from '../data/dunhuangData';

interface ARViewProps {
  onBack: () => void;
}

export const ARView: React.FC<ARViewProps> = ({ onBack }) => {
  const { language } = useApp();
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [selectedMuralId, setSelectedMuralId] = useState('mural-pipa');
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(0.9);
  const [arMode, setArMode] = useState<'apsara' | 'mural'>('apsara');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError(
        language === 'zh'
          ? '未检测到可用摄像头或权限被拒绝，已启用敦煌大漠实景模拟背底进行AR全息演示。'
          : 'Camera unavailable. Enabling simulated backdrop.'
      );
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const currentMural = MURALS.find(m => m.id === selectedMuralId) || MURALS[1];

  const captureSnapshot = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background video or fallback simulated desert room
    if (videoRef.current && cameraActive) {
      ctx.drawImage(videoRef.current, 0, 0, 1280, 720);
    } else {
      ctx.fillStyle = '#1e1610';
      ctx.fillRect(0, 0, 1280, 720);
    }

    // Draw watermark
    ctx.font = 'bold 24px "Noto Serif SC", serif';
    ctx.fillStyle = '#e5b869';
    ctx.fillText('莫高幻境 · 敦煌AR数字化特展', 40, 680);
    ctx.font = '16px "Noto Serif SC", serif';
    ctx.fillStyle = '#f5ecd9';
    ctx.fillText(new Date().toLocaleDateString(), 40, 705);

    const link = document.createElement('a');
    link.download = `dunhuang-ar-snapshot-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="relative w-full h-[90vh] bg-black text-[#f5ecd9] overflow-hidden select-none">
      {/* Background Camera Video Stream or Desert Simulation Backdrop */}
      {cameraActive ? (
        <video
          ref={videoRef}
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-75"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop)'
          }}
        />
      )}

      {/* AR Grid plane laser scanning line */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(212,163,89,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(212,163,89,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-3 py-1.5 rounded-lg bg-[#1e1510]/90 border border-[#d4a359]/30 text-xs text-[#e5b869] flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'zh' ? '退出AR' : 'Exit AR'}</span>
        </button>

        <div className="px-3 py-1.5 rounded-lg bg-[#1e1510]/90 backdrop-blur-md border border-[#d4a359]/30 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#e5b869] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-serif font-bold text-[#f7ecd4]">
            {language === 'zh' ? '莫高全息AR空间投影' : 'Dunhuang Holographic AR'}
          </span>
        </div>

        <button
          onClick={captureSnapshot}
          className="px-3.5 py-1.5 rounded-lg bg-[#d4a359] text-[#18110b] font-bold text-xs flex items-center gap-1.5 shadow-lg"
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{language === 'zh' ? 'AR快照' : 'Snapshot'}</span>
        </button>
      </div>

      {/* Notice if camera simulated */}
      {cameraError && (
        <div className="absolute top-16 left-4 right-4 z-20 max-w-md mx-auto p-2.5 rounded-xl bg-[#291a10]/90 border border-[#d4a359]/40 text-xs text-[#d6c4aa] flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#e5b869] flex-shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* AR Floating Hologram in Center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            opacity: opacity,
            transition: 'transform 0.1s ease-out'
          }}
          className="relative max-w-sm md:max-w-md flex flex-col items-center justify-center drop-shadow-[0_0_40px_rgba(212,163,89,0.7)]"
        >
          {arMode === 'apsara' ? (
            /* Holographic Flying Apsara */
            <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
              <img
                src={currentMural.imageUrl}
                alt=""
                className="w-full h-full object-contain rounded-2xl border-2 border-[#e5b869] shadow-2xl"
              />
              {/* Ethereal golden aura ring */}
              <div className="absolute -inset-2 rounded-2xl border border-[#e5b869]/50 animate-ping opacity-25" />
            </div>
          ) : (
            /* Projected Wall Mural */
            <div className="w-80 md:w-96 rounded-xl overflow-hidden border-4 border-[#d4a359] shadow-[0_0_50px_rgba(212,163,89,0.8)]">
              <img src={currentMural.imageUrl} alt="" className="w-full h-auto" />
            </div>
          )}

          {/* Golden floating pedestal */}
          <div className="w-44 h-8 rounded-full bg-[#d4a359]/20 blur-md mt-4 border border-[#e5b869]/40" />
        </div>
      </div>

      {/* Bottom AR Sliders and Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl bg-[#1e1510]/95 backdrop-blur-md border border-[#d4a359]/40 shadow-2xl max-w-2xl w-full">
          {/* AR Mode Switch */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#140e0b] border border-[#3d2c1e]">
            <button
              onClick={() => setArMode('apsara')}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif ${
                arMode === 'apsara' ? 'bg-[#d4a359] text-[#18110b] font-bold' : 'text-[#c9b7a1]'
              }`}
            >
              {language === 'zh' ? '全息飞天' : 'Hologram'}
            </button>
            <button
              onClick={() => setArMode('mural')}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif ${
                arMode === 'mural' ? 'bg-[#d4a359] text-[#18110b] font-bold' : 'text-[#c9b7a1]'
              }`}
            >
              {language === 'zh' ? '实景壁画投影' : 'Wall Project'}
            </button>
          </div>

          {/* Scale Slider */}
          <div className="flex items-center gap-2 text-xs text-[#c9b7a1]">
            <ZoomIn className="w-3.5 h-3.5 text-[#e5b869]" />
            <input
              type="range"
              min="0.5"
              max="2.2"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-24 accent-[#d4a359]"
            />
          </div>

          {/* Rotate Slider */}
          <div className="flex items-center gap-2 text-xs text-[#c9b7a1]">
            <RotateCw className="w-3.5 h-3.5 text-[#e5b869]" />
            <input
              type="range"
              min="-180"
              max="180"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-24 accent-[#d4a359]"
            />
          </div>

          {/* Mural picker */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {MURALS.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMuralId(m.id)}
                className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap ${
                  m.id === selectedMuralId ? 'bg-[#c1382b] text-white font-bold' : 'bg-[#291e16] text-[#c9b7a1]'
                }`}
              >
                {m.caveNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
