import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  Compass,
  RotateCw,
  Eye,
  Volume2,
  VolumeX,
  Maximize2,
  Layers,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Smartphone
} from 'lucide-react';
import { CAVES, Cave, MURALS, Mural } from '../data/dunhuangData';
import { useApp } from '../context/AppContext';

interface VRCaveTourProps {
  initialCaveId?: string;
  onSelectMuralForZoom: (muralId: string) => void;
  onBackToPortal: () => void;
}

export const VRCaveTour: React.FC<VRCaveTourProps> = ({
  initialCaveId = 'cave-257',
  onSelectMuralForZoom,
  onBackToPortal
}) => {
  const { language, playAudioGuide } = useApp();
  const [currentCaveId, setCurrentCaveId] = useState(initialCaveId);
  const [vrSplitScreen, setVrSplitScreen] = useState(false);
  const [candleMode, setCandleMode] = useState(true);
  const [ambientAudio, setAmbientAudio] = useState(false);
  const [gyroActive, setGyroActive] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<{
    id: string;
    title: string;
    desc: string;
    targetMuralId?: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const candleLightRef = useRef<THREE.PointLight | null>(null);
  const dustParticlesRef = useRef<THREE.Points | null>(null);

  // Sound oscillator for ambient cave resonance
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);

  // Interaction variables for drag rotation
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const lonRef = useRef(0);
  const latRef = useRef(0);
  const targetLonRef = useRef(0);
  const targetLatRef = useRef(0);
  const fovRef = useRef(75);

  const currentCave: Cave = CAVES.find(c => c.id === currentCaveId) || CAVES[0];

  useEffect(() => {
    setCurrentCaveId(initialCaveId);
  }, [initialCaveId]);

  // Helper to generate a rich procedural canvas texture for caves if network photo is slow
  const createCaveCanvasTexture = useCallback((cave: Cave) => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Base sandstone rock background
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#2e1e14'); // ceiling
    grad.addColorStop(0.3, '#3b281b');
    grad.addColorStop(0.5, '#4a3222'); // mural middle wall
    grad.addColorStop(0.8, '#332317');
    grad.addColorStop(1, '#1b120c'); // floor
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sandstone noise & cave rock fissures
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let i = 0; i < 4000; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      const rw = Math.random() * 4 + 1;
      const rh = Math.random() * 4 + 1;
      ctx.fillRect(rx, ry, rw, rh);
    }

    // Painted murals along the panoramic horizon
    // Wall paintings representation
    ctx.fillStyle = 'rgba(212, 163, 89, 0.12)';
    ctx.fillRect(0, 320, canvas.width, 380);

    // Mural frame borders (ochre / lapis)
    ctx.strokeStyle = '#c1382b';
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 340, 560, 340);
    ctx.strokeRect(700, 340, 620, 340);
    ctx.strokeRect(1380, 340, 580, 340);

    // Calligraphy banner inside cave
    ctx.font = 'bold 36px "Noto Serif SC", serif';
    ctx.fillStyle = '#f8ecd4';
    ctx.fillText(`${cave.number} · ${cave.name.zh}`, 760, 420);
    ctx.font = '24px "Noto Serif SC", serif';
    ctx.fillStyle = '#d4a359';
    ctx.fillText(`${cave.dynasty.zh} | ${cave.era}`, 760, 465);

    // Decorative Buddhist silhouettes on canvas
    ctx.fillStyle = 'rgba(212, 163, 89, 0.4)';
    // Seated Buddha / Bodhisattva shape
    ctx.beginPath();
    ctx.arc(360, 500, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(360, 420, 35, 0, Math.PI * 2);
    ctx.fill();

    // Flying Apsara fluttering ribbons on the right wall
    ctx.strokeStyle = '#2e6355';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(1440, 480);
    ctx.bezierCurveTo(1520, 380, 1620, 580, 1720, 460);
    ctx.stroke();

    ctx.strokeStyle = '#c1382b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(1460, 510);
    ctx.bezierCurveTo(1540, 410, 1640, 610, 1740, 490);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Initialize Three.js 360 sphere
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.1);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Sphere geometry (inside-out)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    // Load initial texture
    const texture = createCaveCanvasTexture(currentCave);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    // If online, try loading the real panoramic photo texture with smooth fallback
    const loader = new THREE.TextureLoader();
    loader.load(
      currentCave.panoramaBg,
      (loadedTexture) => {
        loadedTexture.mapping = THREE.EquirectangularReflectionMapping;
        if (sphereRef.current) {
          (sphereRef.current.material as THREE.MeshBasicMaterial).map = loadedTexture;
          (sphereRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
        }
      },
      undefined,
      (err) => {
        console.warn('Network panorama image fallback applied:', err);
      }
    );

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, candleMode ? 0.4 : 0.9);
    scene.add(ambientLight);

    // Candlelight Point Light (flickering in center)
    const candleLight = new THREE.PointLight(0xff9933, candleMode ? 1.8 : 0.4, 600);
    candleLight.position.set(0, -20, 0);
    scene.add(candleLight);
    candleLightRef.current = candleLight;

    // Floating Dust Particles in Cave
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 300;
      particlePos[i + 1] = (Math.random() - 0.5) * 200;
      particlePos[i + 2] = (Math.random() - 0.5) * 300;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe5b869,
      size: 3,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);
    dustParticlesRef.current = dustParticles;

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera interpolation
      lonRef.current += (targetLonRef.current - lonRef.current) * 0.1;
      latRef.current += (targetLatRef.current - latRef.current) * 0.1;
      latRef.current = Math.max(-85, Math.min(85, latRef.current));

      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      const targetX = 500 * Math.sin(phi) * Math.cos(theta);
      const targetY = 500 * Math.cos(phi);
      const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(targetX, targetY, targetZ);

      // Flickering candle light effect
      if (candleLightRef.current && candleMode) {
        candleLightRef.current.intensity = 1.6 + Math.sin(time * 6) * 0.2 + Math.cos(time * 11) * 0.15;
      }

      // Slowly float dust particles
      if (dustParticlesRef.current) {
        dustParticlesRef.current.rotation.y = time * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [candleMode, createCaveCanvasTexture, currentCave]);

  // Update texture when cave changes
  useEffect(() => {
    if (!sphereRef.current) return;

    // Immediately show procedural canvas representation
    const canvasTex = createCaveCanvasTexture(currentCave);
    (sphereRef.current.material as THREE.MeshBasicMaterial).map = canvasTex;
    (sphereRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;

    // Load photo
    const loader = new THREE.TextureLoader();
    loader.load(
      currentCave.panoramaBg,
      (loadedTexture) => {
        if (sphereRef.current) {
          (sphereRef.current.material as THREE.MeshBasicMaterial).map = loadedTexture;
          (sphereRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
        }
      },
      undefined,
      (err) => console.log('Panorama texture loaded with procedural backing:', err)
    );
  }, [currentCaveId, createCaveCanvasTexture, currentCave]);

  // Mouse & Touch Drag Controls
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - prevMousePosRef.current.x;
    const deltaY = e.clientY - prevMousePosRef.current.y;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };

    targetLonRef.current -= deltaX * 0.2;
    targetLatRef.current += deltaY * 0.2;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    fovRef.current = Math.max(35, Math.min(100, fovRef.current + e.deltaY * 0.05));
    if (cameraRef.current) {
      cameraRef.current.fov = fovRef.current;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  // Gyroscope orientation for mobile VR
  const toggleGyroscope = async () => {
    if (gyroActive) {
      setGyroActive(false);
      return;
    }

    if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
        if (permission === 'granted') {
          setGyroActive(true);
        }
      } catch (e) {
        console.warn('Orientation permission denied:', e);
      }
    } else if ('ondeviceorientation' in window) {
      setGyroActive(true);
    }
  };

  useEffect(() => {
    if (!gyroActive) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null && e.beta !== null) {
        targetLonRef.current = e.alpha;
        targetLatRef.current = (e.beta - 90) * 0.8;
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [gyroActive]);

  // Ambient cave audio tone synthesis
  const toggleAmbientSound = () => {
    if (ambientAudio) {
      if (ambientOscRef.current) {
        ambientOscRef.current.stop();
        ambientOscRef.current.disconnect();
        ambientOscRef.current = null;
      }
      setAmbientAudio(false);
    } else {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Deep cave drone resonance (110Hz A2 + sub-bass)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(108, ctx.currentTime);

        // Low pass filter for muffled cave echo
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        ambientOscRef.current = osc;
        setAmbientAudio(true);
      } catch (err) {
        console.warn('Audio start failed:', err);
      }
    }
  };

  const handleHotspotClick = (h: { id: string; title: Record<string, string>; desc: Record<string, string>; targetMuralId?: string }) => {
    setActiveHotspot({
      id: h.id,
      title: h.title[language] || h.title['zh'],
      desc: h.desc[language] || h.desc['zh'],
      targetMuralId: h.targetMuralId
    });
  };

  const currentHighlightMural = MURALS.find(m => m.id === currentCave.highlightMuralId);

  return (
    <div className="relative w-full h-[90vh] bg-[#120e0b] overflow-hidden select-none">
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        className={`w-full h-full cursor-grab active:cursor-grabbing ${vrSplitScreen ? 'opacity-90' : ''}`}
      />

      {/* VR Split-Screen Divider (Stereo View) */}
      {vrSplitScreen && (
        <div className="absolute inset-0 pointer-events-none flex">
          <div className="w-1/2 h-full border-r-2 border-black/80 flex items-center justify-center">
            <div className="text-[10px] text-white/40 tracking-widest uppercase">VR Left Eye</div>
          </div>
          <div className="w-1/2 h-full flex items-center justify-center">
            <div className="text-[10px] text-white/40 tracking-widest uppercase">VR Right Eye</div>
          </div>
        </div>
      )}

      {/* Top Floating Controls Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        {/* Left: Cave Title & Era */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={onBackToPortal}
            className="px-3 py-1.5 rounded-lg bg-[#1e1712]/90 hover:bg-[#2c2017] border border-[#d4a359]/30 text-xs text-[#e5b869] flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>{language === 'zh' ? '返回迎宾殿' : 'Caisson Portal'}</span>
          </button>

          <div className="px-3 py-1.5 rounded-lg bg-[#1e1712]/90 backdrop-blur-md border border-[#d4a359]/30">
            <div className="flex items-center gap-2">
              <span className="font-serif-sc font-bold text-sm text-[#f5ecd9]">{currentCave.number}</span>
              <span className="text-xs text-[#d4a359]">{currentCave.name[language] || currentCave.name['zh']}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#33251a] text-[#c9b7a1]">
                {currentCave.dynasty[language] || currentCave.dynasty['zh']}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Immersive Mode Toggles */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Candlelight Atmosphere Toggle */}
          <button
            onClick={() => setCandleMode(!candleMode)}
            className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
              candleMode
                ? 'bg-[#332213] border-[#e5b869] text-[#f5d697] shadow-[0_0_15px_rgba(229,184,105,0.3)]'
                : 'bg-[#1e1712]/80 border-[#554030] text-[#a89582]'
            }`}
            title="切换莫高窟幽暗烛光与白天照明"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e5b869]" />
            <span className="hidden sm:inline">{candleMode ? (language === 'zh' ? '幽境烛光' : 'Candlelight') : (language === 'zh' ? '白昼照明' : 'Daylight')}</span>
          </button>

          {/* Ambient Sound */}
          <button
            onClick={toggleAmbientSound}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              ambientAudio
                ? 'bg-[#332213] border-[#d4a359] text-[#e5b869]'
                : 'bg-[#1e1712]/80 border-[#554030] text-[#8c7a69]'
            }`}
            title="洞窟低频共鸣音效"
          >
            {ambientAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Gyroscope Orientation for Mobile */}
          <button
            onClick={toggleGyroscope}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              gyroActive
                ? 'bg-[#1f2b38] border-[#4a85c8] text-[#8dc0ff]'
                : 'bg-[#1e1712]/80 border-[#554030] text-[#8c7a69]'
            }`}
            title="陀螺仪体感漫游"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          {/* VR Split-Screen Cardboard Toggle */}
          <button
            onClick={() => setVrSplitScreen(!vrSplitScreen)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
              vrSplitScreen
                ? 'bg-[#2b172e] border-[#b054cc] text-[#ea99ff]'
                : 'bg-[#1e1712]/80 border-[#554030] text-[#8c7a69]'
            }`}
            title="VR眼镜分屏模式"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">VR</span>
          </button>
        </div>
      </div>

      {/* Floating 3D Hotspot Buttons on Screen */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {currentCave.hotspots.map((hs, idx) => (
          <div
            key={hs.id}
            style={{
              position: 'absolute',
              left: `${hs.x}%`,
              top: `${hs.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="pointer-events-auto"
          >
            <button
              onClick={() => handleHotspotClick(hs)}
              className="relative group flex items-center justify-center w-8 h-8 rounded-full bg-[#1e1712]/90 border-2 border-[#e5b869] text-[#e5b869] shadow-[0_0_15px_rgba(229,184,105,0.6)] hover:scale-125 transition-transform"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e5b869] opacity-35" />
              <Eye className="w-4 h-4 relative z-10" />

              {/* Tooltip on hover */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center pointer-events-none whitespace-nowrap z-20">
                <span className="px-2.5 py-1 rounded bg-[#241a13]/95 text-xs text-[#f7ecd4] border border-[#d4a359]/40 shadow-xl">
                  {hs.title[language] || hs.title['zh']}
                </span>
                <span className="w-1.5 h-1.5 bg-[#241a13] rotate-45 -mt-1 border-r border-b border-[#d4a359]/40" />
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Active Hotspot Modal / Pop-over Details */}
      {activeHotspot && (
        <div className="absolute bottom-20 left-4 right-4 md:left-auto md:right-8 md:w-96 p-4 rounded-xl bg-[#241c16]/95 backdrop-blur-md border border-[#d4a359]/50 shadow-2xl z-30 animate-fadeIn">
          <div className="flex items-start justify-between">
            <h4 className="font-serif-sc font-bold text-[#f7ecd4] text-base">{activeHotspot.title}</h4>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-[#a89582] hover:text-[#f8edd5] text-sm px-1.5 py-0.5"
            >
              ✕
            </button>
          </div>
          <p className="mt-2 text-xs text-[#c9b7a1] leading-relaxed">
            {activeHotspot.desc}
          </p>

          <div className="mt-3.5 pt-3 border-t border-[#4a3627] flex items-center justify-between gap-2">
            {activeHotspot.targetMuralId && (
              <button
                onClick={() => onSelectMuralForZoom(activeHotspot.targetMuralId!)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d4a359] hover:bg-[#e5b869] text-[#18110b] font-bold text-xs transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{language === 'zh' ? '进入微距细节鉴赏' : 'Ultra-HD Deep Zoom'}</span>
              </button>
            )}

            {currentHighlightMural && (
              <button
                onClick={() => {
                  playAudioGuide(
                    currentHighlightMural.id,
                    currentHighlightMural.title[language] || currentHighlightMural.title['zh'],
                    currentHighlightMural.audioGuide.transcripts[language] || currentHighlightMural.audioGuide.transcripts['zh']
                  );
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#332418] hover:bg-[#473322] text-[#e5b869] text-xs transition-colors"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{language === 'zh' ? '听语音导览' : 'Audio Guide'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bottom Cave Navigation Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        {/* Interactive drag hint */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1e1712]/80 border border-[#4a382a] text-[11px] text-[#a3907d]">
          <RotateCw className="w-3 h-3 text-[#d4a359]" />
          <span>{language === 'zh' ? '按住鼠标任意拖拽即可360°环视 · 滚轮缩放景深' : 'Drag to look around 360° · Scroll wheel to zoom'}</span>
        </div>

        {/* Cave Carousel selector */}
        <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-xl bg-[#1e1712]/90 border border-[#d4a359]/30 backdrop-blur-md max-w-full">
          {CAVES.map(cave => {
            const isSelected = cave.id === currentCaveId;
            return (
              <button
                key={cave.id}
                onClick={() => {
                  setCurrentCaveId(cave.id);
                  setActiveHotspot(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#d4a359] to-[#b87d3b] text-[#18110b] font-bold shadow-md'
                    : 'text-[#c9b7a1] hover:bg-[#2c2017]'
                }`}
              >
                <span>{cave.number}</span>
                <span className="hidden sm:inline text-[11px] opacity-80">
                  {cave.name[language] || cave.name['zh']}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
