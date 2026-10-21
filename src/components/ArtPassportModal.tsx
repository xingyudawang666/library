import React, { useRef, useEffect, useState } from 'react';
import { Download, Share2, Copy, Check, Sparkles, X, Award } from 'lucide-react';
import { Mural } from '../data/dunhuangData';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

interface ArtPassportModalProps {
  mural: Mural;
  onClose: () => void;
}

export const ArtPassportModal: React.FC<ArtPassportModalProps> = ({ mural, onClose }) => {
  const { user, language } = useApp();
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate luxury Dunhuang Art Passport on HTML5 canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 840;

    // Draw Ancient Silk Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, '#281c15');
    bgGrad.addColorStop(0.5, '#201610');
    bgGrad.addColorStop(1, '#18100b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Dunhuang Gold Borders
    ctx.strokeStyle = '#d4a359';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.strokeStyle = '#c1382b';
    ctx.lineWidth = 1;
    ctx.strokeRect(26, 26, canvas.width - 52, canvas.height - 52);

    // Corner Ornaments
    const drawCorner = (x: number, y: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = '#f5d697';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(24, 0);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 24);
      ctx.stroke();
      ctx.restore();
    };

    drawCorner(32, 32, 0);
    drawCorner(canvas.width - 32, 32, Math.PI / 2);
    drawCorner(canvas.width - 32, canvas.height - 32, Math.PI);
    drawCorner(32, canvas.height - 32, -Math.PI / 2);

    // Header Title
    ctx.font = 'bold 22px "Noto Serif SC", serif';
    ctx.fillStyle = '#f5ecd9';
    ctx.textAlign = 'center';
    ctx.fillText('莫高幻境 · 敦煌数字化艺术珍藏图鉴', canvas.width / 2, 70);

    ctx.font = '12px "Cinzel", serif';
    ctx.fillStyle = '#d4a359';
    ctx.fillText('DUNHUANG MOGAO GROTTOES ART PASSPORT', canvas.width / 2, 94);

    // Load Mural Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Draw image inside decorative box
      const imgX = 50;
      const imgY = 120;
      const imgW = 500;
      const imgH = 340;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgW, imgH, 12);
      ctx.clip();
      ctx.drawImage(img, imgX, imgY, imgW, imgH);
      ctx.restore();

      // Image border
      ctx.strokeStyle = '#d4a359';
      ctx.lineWidth = 2;
      ctx.strokeRect(imgX, imgY, imgW, imgH);

      // Artwork Cave & Title
      ctx.font = 'bold 26px "Noto Serif SC", serif';
      ctx.fillStyle = '#f8ecd4';
      ctx.textAlign = 'left';
      ctx.fillText(mural.title.zh, 50, 500);

      ctx.font = '14px "Noto Serif SC", serif';
      ctx.fillStyle = '#d4a359';
      ctx.fillText(`${mural.caveNumber}  •  ${mural.dynasty.zh}  •  ${mural.dimensions}`, 50, 530);

      // Description / Quote excerpt
      ctx.font = '13px "Noto Serif SC", serif';
      ctx.fillStyle = '#c9b7a1';
      const quote = '“画工以血肉之躯，借矿物晶光，使千载神圣跃然壁间。虽大漠风沙侵蚀，道义之美永世长存。”';
      ctx.fillText(quote, 50, 565);

      // Divider Line
      ctx.strokeStyle = '#4a3627';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(50, 600);
      ctx.lineTo(550, 600);
      ctx.stroke();

      // Collector Info
      ctx.font = '13px "Noto Serif SC", serif';
      ctx.fillStyle = '#a89582';
      ctx.fillText('特约守护人：', 50, 635);
      ctx.font = 'bold 16px "Noto Serif SC", serif';
      ctx.fillStyle = '#f5ecd9';
      ctx.fillText(user.name, 140, 635);

      ctx.font = '12px "Noto Serif SC", serif';
      ctx.fillStyle = '#d4a359';
      ctx.fillText(`称号：${user.title}`, 140, 660);

      ctx.font = '12px "Noto Serif SC", serif';
      ctx.fillStyle = '#a89582';
      ctx.fillText(`收藏日期：${new Date().toLocaleDateString('zh-CN')}`, 50, 695);

      ctx.font = '11px "Cinzel", serif';
      ctx.fillStyle = '#9e856c';
      ctx.fillText(`NO. MG-735-${mural.id.toUpperCase()}-${Math.floor(Math.random() * 8999 + 1000)}`, 50, 720);

      // Traditional Chinese Red Seal Stamp (朱红篆刻印章)
      const sealX = 460;
      const sealY = 660;
      ctx.save();
      ctx.strokeStyle = '#b83b2a';
      ctx.fillStyle = '#b83b2a';
      ctx.lineWidth = 3;
      ctx.strokeRect(sealX - 40, sealY - 40, 80, 80);

      ctx.font = 'bold 22px "Noto Serif SC", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('莫高', sealX, sealY - 14);
      ctx.fillText('珍赏', sealX, sealY + 14);
      ctx.restore();

      // Footer
      ctx.font = '11px "Noto Serif SC", serif';
      ctx.fillStyle = '#6e5745';
      ctx.textAlign = 'center';
      ctx.fillText('敦煌莫高窟数字化永久留存凭证 · 丝绸之路文明见证', canvas.width / 2, 790);
    };

    // If image fails to load via CORS, draw a nice gradient placeholder
    img.onerror = () => {
      ctx.fillStyle = '#3a271c';
      ctx.fillRect(50, 120, 500, 340);
      ctx.font = '24px "Noto Serif SC", serif';
      ctx.fillStyle = '#e5b869';
      ctx.textAlign = 'center';
      ctx.fillText(mural.title.zh, canvas.width / 2, 290);
    };

    img.src = mural.imageUrl;
  }, [mural, user]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `dunhuang-passport-${mural.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    confetti({ particleCount: 35, spread: 60, colors: ['#d4a359', '#c1382b'] });
  };

  const handleShare = async () => {
    const shareData = {
      title: `莫高幻境 · ${mural.title.zh}`,
      text: `我正在莫高幻境欣赏敦煌莫高窟${mural.caveNumber}《${mural.title.zh}》，体验三维全景与超高清微距细节！`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled:', err);
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#1e1510] border-2 border-[#d4a359]/60 rounded-2xl p-6 shadow-2xl flex flex-col items-center max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#a89582] hover:text-white rounded-full bg-[#291e16] border border-[#4a3627] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1 text-xs text-[#e5b869] font-serif uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'zh' ? '专属艺术图鉴生成' : 'Art Passport Generator'}</span>
          </div>
          <h3 className="text-xl font-serif-sc font-bold text-[#f5ecd9] mt-1">
            {mural.title[language] || mural.title['zh']}
          </h3>
        </div>

        {/* Passport Preview Canvas */}
        <div className="w-full flex items-center justify-center my-2 p-2 rounded-xl bg-[#140e0b] border border-[#3d2b1f] shadow-inner">
          <canvas
            ref={canvasRef}
            className="w-full max-w-sm h-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 w-full">
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#b87d3b] hover:from-[#e5b869] hover:to-[#c98c48] text-[#18110b] font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'zh' ? '下载高清专属图鉴' : 'Download Passport'}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2.5 rounded-xl bg-[#291e16] hover:bg-[#38281d] border border-[#d4a359]/40 text-[#e5b869] text-xs md:text-sm flex items-center gap-2 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{language === 'zh' ? '链接已复制！' : 'Link Copied!'}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>{language === 'zh' ? '分享至社交平台' : 'Share to Friends'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
