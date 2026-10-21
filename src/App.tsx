/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CaissonPortal } from './components/CaissonPortal';
import { VRCaveTour } from './components/VRCaveTour';
import { DeepZoomViewer } from './components/DeepZoomViewer';
import { DigitalGuide } from './components/DigitalGuide';
import { ArtWorkshop } from './components/ArtWorkshop';
import { DunhuangEncyclopedia } from './components/DunhuangEncyclopedia';
import { CulturalGame } from './components/CulturalGame';
import { ARView } from './components/ARView';
import { UserProfileGallery } from './components/UserProfileGallery';
import { AudioGuideBar } from './components/AudioGuideBar';
import { ArtPassportModal } from './components/ArtPassportModal';
import { GlobalDigitalCompanion } from './components/GlobalDigitalCompanion';
import { MURALS, Mural, CAVES } from './data/dunhuangData';
import { ChevronRight, Home } from 'lucide-react';

const MainContent: React.FC = () => {
  const { theme, language } = useApp();
  const [currentTab, setCurrentTab] = useState('portal');
  const [selectedCaveIdForVR, setSelectedCaveIdForVR] = useState('cave-257');
  const [selectedMuralIdForZoom, setSelectedMuralIdForZoom] = useState('mural-deer');
  const [selectedEncyclopediaTopic, setSelectedEncyclopediaTopic] = useState<string | undefined>(undefined);
  const [activeShareMural, setActiveShareMural] = useState<Mural | null>(null);

  const handleSelectMuralForZoom = (muralId: string) => {
    setSelectedMuralIdForZoom(muralId);
    setCurrentTab('zoom');
  };

  const handleSelectCaveForVR = (caveId: string) => {
    setSelectedCaveIdForVR(caveId);
    setCurrentTab('vr');
  };

  const handleOpenEncyclopedia = (topicId?: string) => {
    setSelectedEncyclopediaTopic(topicId);
    setCurrentTab('encyclopedia');
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'daylight':
        return 'bg-[#1a120c] text-[#f4ecd9]';
      case 'starry':
        return 'bg-[#0c0f17] text-[#dfe7f5]';
      case 'candle':
      default:
        return 'bg-[#120e0b] text-[#ede2d3]';
    }
  };

  const tabLabels: Record<string, { zh: string; en: string }> = {
    vr: { zh: '360° VR全景洞窟', en: '360° VR Caves' },
    zoom: { zh: '超高清微距壁画鉴赏', en: 'Deep Zoom Murals' },
    guide: { zh: 'AI数字人妙音导览', en: 'AI Celestial Guide' },
    workshop: { zh: '非遗矿彩修复工坊', en: 'Mineral Pigment Workshop' },
    encyclopedia: { zh: '敦煌学术百科', en: 'Encyclopedia' },
    game: { zh: '壁画复原拼图小游戏', en: 'Mural Puzzle Game' },
    ar: { zh: '增强现实AR空间特展', en: 'AR Experience' },
    profile: { zh: '个人艺术图鉴通行证', en: 'Art Passport' },
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${getThemeClass()}`}>
      {/* Top Main Navigation Bar */}
      <Navbar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Breadcrumb Navigation on subpages for convenient portal navigation */}
      {currentTab !== 'portal' && (
        <div className="w-full bg-[#17100b] border-b border-[#332418] px-4 py-2 text-xs flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center gap-1.5 text-[#a89582]">
            <button
              onClick={() => setCurrentTab('portal')}
              className="flex items-center gap-1 text-[#e5b869] hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{language === 'zh' ? '展厅首页' : 'Home'}</span>
            </button>
            <ChevronRight className="w-3 h-3 text-[#66503f]" />
            <span className="text-[#f5ecd9] font-serif font-medium">
              {tabLabels[currentTab]?.[language === 'zh' ? 'zh' : 'en'] || currentTab}
            </span>
            {currentTab === 'vr' && (
              <>
                <ChevronRight className="w-3 h-3 text-[#66503f]" />
                <span className="text-[#d4a359]">
                  {CAVES.find(c => c.id === selectedCaveIdForVR)?.number} · {CAVES.find(c => c.id === selectedCaveIdForVR)?.name.zh}
                </span>
              </>
            )}
            {currentTab === 'zoom' && (
              <>
                <ChevronRight className="w-3 h-3 text-[#66503f]" />
                <span className="text-[#d4a359]">
                  {MURALS.find(m => m.id === selectedMuralIdForZoom)?.title.zh}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Feature Viewport */}
      <main className="flex-1 w-full relative">
        {currentTab === 'portal' && (
          <CaissonPortal
            onEnterCave={handleSelectCaveForVR}
            onEnterMural={handleSelectMuralForZoom}
            onOpenDigitalGuide={() => setCurrentTab('guide')}
            onOpenWorkshop={() => setCurrentTab('workshop')}
            onOpenEncyclopedia={handleOpenEncyclopedia}
            onOpenGame={() => setCurrentTab('game')}
          />
        )}

        {currentTab === 'vr' && (
          <VRCaveTour
            initialCaveId={selectedCaveIdForVR}
            onSelectMuralForZoom={handleSelectMuralForZoom}
            onBackToPortal={() => setCurrentTab('portal')}
          />
        )}

        {currentTab === 'zoom' && (
          <DeepZoomViewer
            initialMuralId={selectedMuralIdForZoom}
            onOpenShareModal={(mural) => setActiveShareMural(mural)}
            onBackToVR={() => setCurrentTab('vr')}
          />
        )}

        {currentTab === 'guide' && <DigitalGuide />}

        {currentTab === 'workshop' && <ArtWorkshop />}

        {currentTab === 'encyclopedia' && (
          <DunhuangEncyclopedia initialEntryId={selectedEncyclopediaTopic} />
        )}

        {currentTab === 'game' && <CulturalGame />}

        {currentTab === 'ar' && (
          <ARView onBack={() => setCurrentTab('portal')} />
        )}

        {currentTab === 'profile' && (
          <UserProfileGallery onSelectMuralForZoom={handleSelectMuralForZoom} />
        )}
      </main>

      {/* Persistent Audio Guide Floating Player Bar */}
      <AudioGuideBar />

      {/* Global AI Digital Companion (全程跟进伴游导览) */}
      <GlobalDigitalCompanion
        currentTab={currentTab}
        selectedCaveId={selectedCaveIdForVR}
        selectedMuralId={selectedMuralIdForZoom}
        onNavigateToCave={handleSelectCaveForVR}
        onNavigateToMural={handleSelectMuralForZoom}
      />

      {/* Art Passport Share Modal */}
      {activeShareMural && (
        <ArtPassportModal
          mural={activeShareMural}
          onClose={() => setActiveShareMural(null)}
        />
      )}

      {/* Realistic Footer */}
      <footer className="w-full py-8 px-4 border-t border-[#38281d] bg-[#0e0a08] text-xs text-[#8c7866]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif-sc font-bold text-sm text-[#e5b869]">
              莫高幻境 · 敦煌莫高窟数字化体验馆
            </span>
            <span className="text-[11px] text-[#634f3f] mt-1">
              National Digital Heritage & Silk Road Arts Research Initiative
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#99836c]">
            <button onClick={() => handleSelectCaveForVR('cave-257')} className="hover:text-[#e5b869]">
              第257窟九色鹿
            </button>
            <button onClick={() => handleSelectCaveForVR('cave-112')} className="hover:text-[#e5b869]">
              第112窟反弹琵琶
            </button>
            <button onClick={() => handleSelectCaveForVR('cave-407')} className="hover:text-[#e5b869]">
              第407窟三兔藻井
            </button>
            <button onClick={() => handleSelectCaveForVR('cave-96')} className="hover:text-[#e5b869]">
              第96窟北大佛
            </button>
            <button onClick={() => setCurrentTab('workshop')} className="hover:text-[#e5b869]">
              矿彩修复工坊
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
