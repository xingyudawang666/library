import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Sliders,
  HelpCircle,
  Award,
  Music,
  Clock,
  Layers,
  ChevronRight,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { ENCYCLOPEDIA_ENTRIES, EncyclopediaEntry, CULTURAL_QUIZ } from '../data/dunhuangData';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

interface DunhuangEncyclopediaProps {
  initialEntryId?: string;
}

export const DunhuangEncyclopedia: React.FC<DunhuangEncyclopediaProps> = ({ initialEntryId }) => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'entries' | 'lab' | 'quiz'>('entries');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEntry, setSelectedEntry] = useState<EncyclopediaEntry>(() => {
    if (initialEntryId) {
      const match = ENCYCLOPEDIA_ENTRIES.find(e => e.id === initialEntryId);
      if (match) return match;
    }
    return ENCYCLOPEDIA_ENTRIES[0];
  });

  // Pigment aging simulator states
  const [agingYears, setAgingYears] = useState(1600); // 0 to 1600 years

  // Quiz states
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);

  const categories = [
    { id: 'all', name: { zh: '全部百科', en: 'All' } },
    { id: 'pigment', name: { zh: '天然矿物颜料', en: 'Mineral Pigments' } },
    { id: 'instrument', name: { zh: '丝路古乐器', en: 'Ancient Instruments' } },
    { id: 'figure', name: { zh: '莫高守护名家', en: 'Guardians' } },
  ];

  const filteredEntries = selectedCategory === 'all'
    ? ENCYCLOPEDIA_ENTRIES
    : ENCYCLOPEDIA_ENTRIES.filter(e => e.category === selectedCategory);

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    if (selectedAnswers[qIdx] !== undefined) return;
    const isCorrect = optIdx === CULTURAL_QUIZ[qIdx].correctAnswer;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qIdx]: true }));

    if (isCorrect) {
      setScore(s => s + 1);
      confetti({ particleCount: 30, spread: 50, colors: ['#d4a359', '#2e6355'] });
    }
  };

  return (
    <div className="relative min-h-[92vh] bg-[#140e0b] text-[#f4ece1] p-4 md:p-8 flex flex-col items-center">
      {/* Top Header */}
      <div className="text-center max-w-2xl mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#241a13] border border-[#d4a359]/30 text-xs text-[#e5b869] mb-2 font-serif">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{language === 'zh' ? '敦煌学互动学术百科 · 探微索隐' : 'Interactive Dunhuang Encyclopedia'}</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-serif-sc font-bold text-[#f5ecd9]">
          {language === 'zh' ? '大漠千载 · 经变万卷' : 'The Dunhuang Chronicle'}
        </h2>
        <p className="mt-2 text-xs md:text-sm text-[#b5a089]">
          {language === 'zh'
            ? '深入了解莫高窟壁画矿物化学、唐宋乐器源流、千年变色演化实验与敦煌学史。'
            : 'Explore pigment chemistry, instrument taxonomy, and 1,600 years of cultural history.'}
        </p>

        {/* Top Feature Mode Tabs */}
        <div className="mt-4 inline-flex items-center p-1 rounded-xl bg-[#1e1510] border border-[#3d2b1f]">
          <button
            onClick={() => setActiveTab('entries')}
            className={`px-4 py-1.5 rounded-lg text-xs font-serif transition-colors ${
              activeTab === 'entries' ? 'bg-[#d4a359] text-[#18110b] font-bold shadow' : 'text-[#c9b7a1] hover:text-white'
            }`}
          >
            {language === 'zh' ? '典籍档案' : 'Scholarly Archive'}
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-4 py-1.5 rounded-lg text-xs font-serif transition-colors ${
              activeTab === 'lab' ? 'bg-[#d4a359] text-[#18110b] font-bold shadow' : 'text-[#c9b7a1] hover:text-white'
            }`}
          >
            {language === 'zh' ? '矿物老化实验室' : 'Pigment Oxidation Lab'}
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-1.5 rounded-lg text-xs font-serif transition-colors ${
              activeTab === 'quiz' ? 'bg-[#d4a359] text-[#18110b] font-bold shadow' : 'text-[#c9b7a1] hover:text-white'
            }`}
          >
            {language === 'zh' ? '非遗知识大闯关' : 'Cultural Quiz'}
          </button>
        </div>
      </div>

      {/* Tab 1: Scholarly Archive Entries */}
      {activeTab === 'entries' && (
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 items-start">
          {/* Left: Category list & Entries Navigator */}
          <div className="w-full md:w-80 flex flex-col gap-3">
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto p-1 rounded-xl bg-[#1e1510] border border-[#3d2c1e]">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors ${
                    selectedCategory === c.id ? 'bg-[#3b2718] text-[#e5b869] font-bold' : 'text-[#8c7866] hover:text-[#f8edd5]'
                  }`}
                >
                  {(c.name as Record<string, string>)[language] || c.name.zh}
                </button>
              ))}
            </div>

            {/* Entry cards */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredEntries.map(entry => {
                const active = entry.id === selectedEntry.id;
                return (
                  <button
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      active
                        ? 'bg-[#291d15] border-[#d4a359] shadow-md'
                        : 'bg-[#1a120d] border-[#38281d] hover:border-[#57402f]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#f5ecd9]">
                      {entry.title[language] || entry.title['zh']}
                    </div>
                    <div className="text-[10px] text-[#e5b869] mt-0.5">
                      {entry.subtitle[language] || entry.subtitle['zh']}
                    </div>
                    <div className="text-[11px] text-[#99836c] mt-1 line-clamp-2">
                      {entry.summary[language] || entry.summary['zh']}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Encyclopedia Article Reader */}
          <div className="flex-1 w-full bg-[#1e1510] border border-[#3d2c1e] rounded-2xl p-6 md:p-8 shadow-xl">
            {/* Article Image Banner */}
            <div className="w-full h-56 rounded-xl overflow-hidden border border-[#4d3828] relative mb-6">
              <img src={selectedEntry.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1510] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#c1382b] text-white font-serif">
                  {selectedEntry.category.toUpperCase()}
                </span>
                <h3 className="text-xl md:text-2xl font-serif-sc font-bold text-[#f7ecd4] mt-1">
                  {selectedEntry.title[language] || selectedEntry.title['zh']}
                </h3>
              </div>
            </div>

            {/* Fast Attributes Grid */}
            {selectedEntry.attributes && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 p-3.5 rounded-xl bg-[#140e0b] border border-[#38281d]">
                {Object.entries(selectedEntry.attributes).map(([k, v]) => (
                  <div key={k} className="text-xs">
                    <span className="text-[#a3907d]">{k}：</span>
                    <span className="text-[#e5b869] font-medium">{v}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-4 text-xs md:text-sm text-[#ded2c1] leading-relaxed">
              {(selectedEntry.content[language] || selectedEntry.content['zh']).map((p, idx) => (
                <p key={idx} className="indent-6">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Mineral Aging & Oxidation Interactive Simulator */}
      {activeTab === 'lab' && (
        <div className="w-full max-w-4xl bg-[#1e1510] border border-[#3d2c1e] rounded-2xl p-6 md:p-8 flex flex-col items-center">
          <div className="text-center max-w-xl mb-6">
            <h3 className="text-xl font-serif-sc font-bold text-[#f5d697]">
              {language === 'zh' ? '莫高窟矿物颜料1600年光化学演变模拟器' : '1,600 Years Pigment Oxidation Lab'}
            </h3>
            <p className="mt-2 text-xs text-[#a89582]">
              {language === 'zh'
                ? '拖动时间轴观察：铅丹与白铅如何在千年风沙湿度中氧化变黑，而纯矿物青金石与朱砂如何傲然不朽。'
                : 'Drag the timeline to simulate photo-oxidation of ancient mineral pigments.'}
            </p>
          </div>

          {/* Timeline Slider (Year 400 CE to 2026 CE) */}
          <div className="w-full max-w-lg mb-8">
            <div className="flex justify-between text-xs text-[#d4a359] font-serif mb-2">
              <span>公元400年 (初绘时刻)</span>
              <span className="font-bold font-mono text-sm">{agingYears} 年后 (公元 {400 + agingYears} 年)</span>
              <span>公元2026年 (现存状态)</span>
            </div>
            <input
              type="range"
              min="0"
              max="1626"
              value={agingYears}
              onChange={(e) => setAgingYears(Number(e.target.value))}
              className="w-full accent-[#d4a359] cursor-pointer"
            />
          </div>

          {/* Interactive Pigment Swatch Comparison Simulation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {/* Swatch 1: Minium / Lead Red (铅丹) */}
            {(() => {
              const oxidationFactor = agingYears / 1626; // 0 to 1
              // Turns from bright scarlet orange rgb(240, 90, 40) to dark lead oxide rgb(55, 40, 35)
              const r = Math.round(240 - oxidationFactor * 185);
              const g = Math.round(90 - oxidationFactor * 50);
              const b = Math.round(40 - oxidationFactor * 5);
              return (
                <div className="p-4 rounded-xl bg-[#160f0b] border border-[#3d2b1f] flex flex-col items-center text-center">
                  <div
                    style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                    className="w-20 h-20 rounded-full border-2 border-white/20 shadow-lg transition-colors duration-150 mb-3"
                  />
                  <div className="text-xs font-bold text-[#f5ecd9]">{language === 'zh' ? '铅丹 (Minium)' : 'Lead Minium'}</div>
                  <div className="text-[10px] text-[#c1382b] mt-0.5">
                    {oxidationFactor > 0.5 ? '氧化为黑色 PbO2' : '四氧化三铅 Pb3O4'}
                  </div>
                  <p className="text-[10px] text-[#99836c] mt-2">
                    {language === 'zh' ? '古代调配仕女与佛身肉色，千年后变暗沉咖啡色。' : 'Turns dark brown through photo-oxidation.'}
                  </p>
                </div>
              );
            })()}

            {/* Swatch 2: Lapis Lazuli (青金石) */}
            <div className="p-4 rounded-xl bg-[#160f0b] border border-[#3d2b1f] flex flex-col items-center text-center">
              <div
                style={{ backgroundColor: '#244b7a' }}
                className="w-20 h-20 rounded-full border-2 border-white/20 shadow-lg mb-3"
              />
              <div className="text-xs font-bold text-[#f5ecd9]">{language === 'zh' ? '青金石 (Lapis)' : 'Lapis Lazuli'}</div>
              <div className="text-[10px] text-[#5b8ec9] mt-0.5">永久耐候 · 零褪色</div>
              <p className="text-[10px] text-[#99836c] mt-2">
                {language === 'zh' ? '结构致密，经1600年日照光照依然宝石般纯净。' : 'Completely stable against UV & humidity.'}
              </p>
            </div>

            {/* Swatch 3: Pure Gold Leaf (泥金) */}
            <div className="p-4 rounded-xl bg-[#160f0b] border border-[#3d2b1f] flex flex-col items-center text-center">
              <div
                style={{ backgroundColor: '#d4a359' }}
                className="w-20 h-20 rounded-full border-2 border-white/20 shadow-lg mb-3"
              />
              <div className="text-xs font-bold text-[#f5ecd9]">{language === 'zh' ? '纯金贴箔 (Gold Leaf)' : 'Pure Gold Foil'}</div>
              <div className="text-[10px] text-[#e5b869] mt-0.5">永不氧化 · 熠熠生辉</div>
              <p className="text-[10px] text-[#99836c] mt-2">
                {language === 'zh' ? '沥粉贴金技艺，烛光映照下仍现大唐金碧辉煌。' : 'Unaffected by millennia in desert cave.'}
              </p>
            </div>

            {/* Swatch 4: Malachite (孔雀石石绿) */}
            <div className="p-4 rounded-xl bg-[#160f0b] border border-[#3d2b1f] flex flex-col items-center text-center">
              <div
                style={{ backgroundColor: '#2e6355' }}
                className="w-20 h-20 rounded-full border-2 border-white/20 shadow-lg mb-3"
              />
              <div className="text-xs font-bold text-[#f5ecd9]">{language === 'zh' ? '孔雀石 (Malachite)' : 'Malachite Green'}</div>
              <div className="text-[10px] text-[#4ea88c] mt-0.5">碳酸盐矿 · 历久弥翠</div>
              <p className="text-[10px] text-[#99836c] mt-2">
                {language === 'zh' ? '绘制菩萨璎珞与天衣披帛，常绿不凋。' : 'Enduring crystalline carbonate emerald.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Cultural Quiz */}
      {activeTab === 'quiz' && (
        <div className="w-full max-w-2xl bg-[#1e1510] border border-[#3d2c1e] rounded-2xl p-6 md:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#38281d]">
            <span className="text-xs text-[#e5b869] font-serif">
              {language === 'zh' ? `第 ${quizIndex + 1} / ${CULTURAL_QUIZ.length} 题` : `Question ${quizIndex + 1} of ${CULTURAL_QUIZ.length}`}
            </span>
            <span className="text-xs text-[#a3907d] flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>{language === 'zh' ? `已答对：${score} 题` : `Score: ${score}`}</span>
            </span>
          </div>

          {/* Current Question */}
          {(() => {
            const currentQ = CULTURAL_QUIZ[quizIndex];
            const answered = selectedAnswers[quizIndex] !== undefined;

            return (
              <div>
                <h4 className="text-base md:text-lg font-serif-sc font-bold text-[#f7ecd4] mb-4">
                  {currentQ.question[language] || currentQ.question['zh']}
                </h4>

                {/* Options List */}
                <div className="space-y-2.5">
                  {(currentQ.options[language] || currentQ.options['zh']).map((opt, optIdx) => {
                    const isSelected = selectedAnswers[quizIndex] === optIdx;
                    const isCorrect = optIdx === currentQ.correctAnswer;

                    let btnStyle = 'bg-[#18110c] border-[#38281d] text-[#ded2c1] hover:border-[#634934]';
                    if (answered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={answered}
                        onClick={() => handleSelectQuizOption(quizIndex, optIdx)}
                        className={`w-full p-3 rounded-xl border text-left text-xs md:text-sm flex items-center justify-between transition-all ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {answered && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                        {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {showExplanation[quizIndex] && (
                  <div className="mt-4 p-3.5 rounded-xl bg-[#291e16] border border-[#d4a359]/40 text-xs text-[#ede2d3] leading-relaxed animate-fadeIn">
                    <span className="font-bold text-[#e5b869] block mb-1">
                      {language === 'zh' ? '【学术考据与解析】' : 'Scholarly Commentary:'}
                    </span>
                    {currentQ.explanation[language] || currentQ.explanation['zh']}
                  </div>
                )}

                {/* Next Button */}
                <div className="mt-6 flex justify-end">
                  {quizIndex < CULTURAL_QUIZ.length - 1 ? (
                    <button
                      onClick={() => setQuizIndex(i => i + 1)}
                      className="px-4 py-2 rounded-xl bg-[#d4a359] hover:bg-[#e5b869] text-[#18110b] font-bold text-xs flex items-center gap-1"
                    >
                      <span>{language === 'zh' ? '下一题' : 'Next'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="text-xs text-[#e5b869] font-serif">
                      {language === 'zh' ? '恭喜完成答卷！荣誉印记已写入个人画谱。' : 'Quiz complete! Passport stamp earned.'}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
