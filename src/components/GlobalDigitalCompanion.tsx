import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  MessageSquare,
  X,
  Send,
  HelpCircle,
  Minimize2,
  Maximize2,
  Settings,
  ChevronDown,
  Headphones,
  Compass,
  Eye,
  Key
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAVES, MURALS } from '../data/dunhuangData';

interface GlobalDigitalCompanionProps {
  currentTab: string;
  selectedCaveId: string;
  selectedMuralId: string;
  onNavigateToCave?: (caveId: string) => void;
  onNavigateToMural?: (muralId: string) => void;
}

interface CompanionMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const GlobalDigitalCompanion: React.FC<GlobalDigitalCompanionProps> = ({
  currentTab,
  selectedCaveId,
  selectedMuralId,
  onNavigateToCave,
  onNavigateToMural
}) => {
  const { language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentThought, setCurrentThought] = useState<string>('');
  const [messages, setMessages] = useState<CompanionMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [persona, setPersona] = useState<'miaoyin' | 'scholar'>('miaoyin');
  const [showApiModal, setShowApiModal] = useState(false);

  // DeepSeek / custom model config
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('dh_deepseek_key') || '');
  const [apiEndpoint, setApiEndpoint] = useState(() => localStorage.getItem('dh_deepseek_endpoint') || 'https://api.deepseek.com/v1');
  const [modelName, setModelName] = useState(() => localStorage.getItem('dh_deepseek_model') || 'deepseek-chat');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const previousSceneRef = useRef<string>('');

  // Current context details
  const activeCave = CAVES.find(c => c.id === selectedCaveId) || CAVES[0];
  const activeMural = MURALS.find(m => m.id === selectedMuralId) || MURALS[0];

  // Speech handler
  const speakVoice = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = persona === 'scholar' ? 0.9 : 1.15;
    const langCodes: Record<string, string> = {
      zh: 'zh-CN',
      en: 'en-US',
      ja: 'ja-JP',
      fr: 'fr-FR'
    };
    utterance.lang = langCodes[language] || 'zh-CN';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Scene-aware greeting & context commentary
  useEffect(() => {
    const sceneKey = `${currentTab}-${selectedCaveId}-${selectedMuralId}`;
    if (sceneKey === previousSceneRef.current) return;
    previousSceneRef.current = sceneKey;

    let commentary = '';
    let quickTitle = '';

    if (currentTab === 'portal') {
      commentary = language === 'zh'
        ? '欢迎来到莫高幻境！我是您的专属敦煌AI伴游导览员妙音，将全程为您解说。展厅上线了【丝绸之路敦煌节点交互地图】，点击地图上的长安、龟兹、于阗、撒马尔罕等点位，即可随我瞬时穿梭至对应洞窟与文化专题！'
        : 'Welcome to Mogao Mirage! I am Miaoyin, your dedicated Dunhuang AI companion. Explore the new Silk Road Node Map below, or click any cave to journey with me!';
      quickTitle = '莫高窟数字化展厅 · 丝路地图';
    } else if (currentTab === 'vr') {
      commentary = language === 'zh'
        ? `我们现在已步入${activeCave.number}（${activeCave.name.zh}）。${activeCave.description.zh.slice(0, 95)}……您可以按住鼠标360度环视，或点击壁画热点。`
        : `We are now inside ${activeCave.number} (${activeCave.name.en}). Drag to explore the panoramic cave interior.`;
      quickTitle = `${activeCave.number} 全景导览`;
    } else if (currentTab === 'zoom') {
      commentary = language === 'zh'
        ? `当前正在微距鉴赏《${activeMural.title.zh}》（${activeMural.caveNumber}）。画中运用了天然朱砂、石青与纯金箔。您可以使用放大镜观察千年矿物微粒与开裂包浆。`
        : `Now examining "${activeMural.title.en}" under deep zoom. Notice the genuine mineral pigments and aged patina.`;
      quickTitle = `${activeMural.title.zh} 微距解说`;
    } else if (currentTab === 'workshop') {
      commentary = language === 'zh'
        ? '这里是非遗矿物彩绘工坊。古代画师选用朱砂、泥金、石青与石绿等天然矿石调胶敷彩，您可以选择白描线稿亲手重染盛唐绚烂。'
        : 'Welcome to the Mineral Pigment Workshop! Paint ancient Dunhuang outlines with genuine cinnabar and gold leaf.';
      quickTitle = '矿彩工坊伴随指引';
    } else if (currentTab === 'encyclopedia') {
      commentary = language === 'zh'
        ? '欢迎查阅敦煌学术百科。在这里您可以滑动时间轴观察1600年铅丹氧化变黑的科学模拟，亦可探秘丝路古乐器。'
        : 'Exploring the Dunhuang Encyclopedia. Simulate 1,600 years of pigment aging or study ancient Silk Road instruments.';
      quickTitle = '学术百科伴学';
    } else if (currentTab === 'game') {
      commentary = language === 'zh'
        ? '这是莫高壁画还原拼图挑战！点击相邻瓦片滑动拼合残卷，完成即可荣获【莫高非遗修复特使】勋章。'
        : 'Slide adjacent tiles to reconstruct ancient frescoes and unlock your cultural guardian badge.';
      quickTitle = '壁画修复小游戏指引';
    } else if (currentTab === 'ar') {
      commentary = language === 'zh'
        ? 'AR增强现实已启动，我将在您的现实空间中投射全息散花飞天与洞窟壁画，您可以调节缩放与旋转拍摄快照。'
        : 'AR experience active. Celestial apsaras are projected into physical space.';
      quickTitle = 'AR增强现实全息伴游';
    } else if (currentTab === 'profile') {
      commentary = language === 'zh'
        ? '这里是您的专属敦煌画谱图鉴与学习档案。您可以查看已收藏的壁画、个人创作成果，并参与文博社区讨论。'
        : 'Your personal Dunhuang Art Passport and study archives.';
      quickTitle = '个人图鉴管家';
    }

    setCurrentThought(commentary);

    // Add proactive message to dialogue stream if appropriate
    setMessages(prev => [
      ...prev,
      {
        id: `guide-${Date.now()}`,
        sender: 'ai',
        text: commentary,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    // Speak proactive commentary
    if (speechEnabled) {
      speakVoice(commentary);
    }
  }, [currentTab, selectedCaveId, selectedMuralId, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Context-specific suggested questions
  const getContextQuestions = () => {
    if (currentTab === 'vr' && selectedCaveId === 'cave-257') {
      return [
        '九色鹿面对国王为什么毫无畏惧？',
        '为什么这幅画自两头向中间叙事？',
        '北魏壁画人物为什么看起来清瘦？'
      ];
    }
    if (currentTab === 'vr' && selectedCaveId === 'cave-112') {
      return [
        '反弹琵琶是真实存在的舞蹈动作吗？',
        '壁画里的四弦琵琶和现在的琵琶有什么区别？',
        '画中的乐队演奏了哪些丝路乐器？'
      ];
    }
    if (currentTab === 'vr' && selectedCaveId === 'cave-407') {
      return [
        '三只兔子为什么只有三只耳朵？',
        '三兔图腾是如何传到欧洲大教堂的？',
        '为什么外围的飞天要逆时针飞翔？'
      ];
    }
    if (currentTab === 'vr' && selectedCaveId === 'cave-96') {
      return [
        '北大佛为什么高达35.5米？',
        '大佛的右手是什么手印？有什么寓意？',
        '九层楼红色飞檐是什么年代修建的？'
      ];
    }
    if (currentTab === 'zoom') {
      return [
        '为什么人物皮肤会变成黑褐色？',
        '沥粉贴金技艺是怎样制作的？',
        '天然矿物颜料为什么能千年不褪色？'
      ];
    }
    return [
      '为什么壁画里的人脸会变黑？',
      '反弹琵琶是真实存在的舞蹈吗？',
      '三兔共耳有什么历史文化寓意？',
      '藏经洞是怎么被偶然发现的？'
    ];
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMsg: CompanionMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsThinking(true);

    // If custom API key is present, attempt custom endpoint call
    if (apiKey && apiEndpoint) {
      try {
        const response = await fetch(`${apiEndpoint}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              {
                role: 'system',
                content: `你是在莫高窟全程陪伴游客的AI数字导览员“妙音”。当前游客正位于页面【${currentTab}】，当前洞窟【${activeCave.number} · ${activeCave.name.zh}】，当前壁画【${activeMural.title.zh}】。请以典雅、渊博、温和亲切的东方学者口吻解答问题。`
              },
              { role: 'user', content: text }
            ],
            temperature: 0.7
          })
        });

        if (response.ok) {
          const data = await response.json();
          const aiReply = data.choices?.[0]?.message?.content || getScholarlyAnswer(text);
          const aiMsg: CompanionMessage = {
            id: `ai-${Date.now() + 1}`,
            sender: 'ai',
            text: aiReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, aiMsg]);
          setIsThinking(false);
          speakVoice(aiReply);
          return;
        }
      } catch (err) {
        console.warn('API error, using built-in knowledge base:', err);
      }
    }

    // Built-in intelligent response
    setTimeout(() => {
      const reply = getScholarlyAnswer(text);
      const aiMsg: CompanionMessage = {
        id: `ai-${Date.now() + 1}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
      speakVoice(reply);
    }, 600);
  };

  const getScholarlyAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('黑') || q.includes('变色') || q.includes('black') || q.includes('oxid')) {
      return language === 'zh'
        ? '【妙音考据 · 壁画面容变黑之谜】早期莫高窟壁画中人物面部呈黑褐色，源于画师使用四氧化三铅（铅丹）和白铅粉调制肉色。千百年间在大漠微量硫化物与光氧作用下，铅丹氧化为深黑色的二氧化铅（PbO2）。现代敦煌研究院利用高光谱无损反演，证实当时初绘时原本是白璧无瑕的红润肤色。'
        : 'Early figures have darkened skin because lead red (minium) photo-oxidized over 1,500 years into black lead dioxide (PbO2). Multispectral imaging confirms their original porcelain blush.';
    }

    if (q.includes('三兔') || q.includes('兔子') || q.includes('407') || q.includes('hare')) {
      return language === 'zh'
        ? '【妙音考据 · 三兔共耳的世界密码】第407窟隋代藻井三只兔子首尾相接，巧夺天工地只画了三只耳朵，两两相邻共用一只，在视觉错觉中每只兔子都拥有一双长耳。这一图案沿丝绸之路向西传播，在中世纪波斯铜器与欧洲英国、法国、德国的天主教教堂建筑中亦有广泛流传，是文明交流互鉴的明证。'
        : 'The Three Hares caisson in Cave 407 shares three ears among three hares in an eternal loop. Identical motifs appear in medieval cathedrals in Britain, France, and Germany.';
    }

    if (q.includes('反弹琵琶') || q.includes('琵琶') || q.includes('112') || q.includes('pipa')) {
      return language === 'zh'
        ? '【妙音考据 · 反弹琵琶真实性】第112窟南壁的“反弹琵琶”舞伎绝非空想。舞蹈史学界已证实它是盛唐健舞（胡旋舞、胡腾舞）高潮阶段的一项高难度炫技动作，舞者在腾空旋转的刹那将曲项琵琶负于颈后反手弹拨。日本正仓院保存至今的唐代螺钿紫檀琵琶与壁画所绘如出一辙。'
        : 'The reverse pipa dancer in Cave 112 depicts a real Tang acrobatic choreography where court dancers plucked four-stringed lutes behind their neck mid-rotation.';
    }

    if (q.includes('九色鹿') || q.includes('257') || q.includes('调达')) {
      return language === 'zh'
        ? '【妙音考据 · 九色鹿的故事与艺术】第257窟的《鹿王本生》采用独特的横卷式双向构图，故事从左右两端向中心高潮演进。九色鹿舍身救起溺水者调达，调达贪图重赏引兵围捕。神鹿坦然向国王陈情，以道义感化君王，背信者自食恶果。这种构图比西方蒙太奇早了千余年。'
        : 'Cave 257 portrays Buddha’s past life as the Nine-colored Deer saving a drowning man who later betrayed it for gold. The deer’s plea moved the king to forbid hunting forever.';
    }

    if (q.includes('藏经洞') || q.includes('王道士') || q.includes('17')) {
      return language === 'zh'
        ? '【妙音考据 · 藏经洞的惊世发现】1900年王圆箓道士清理积沙时发现第17窟密室，封存了4至11世纪六万余件经卷、文书、绢画，涵盖汉文、藏文、梵文、粟特文等十余种文字。随后斯坦因、伯希和等人低价买走大批珍卷。如今数字敦煌工程正在让这些散落全球的遗书在数字云端重聚。'
        : 'Cave 17 (Library Cave) was discovered in 1900 with over 60,000 ancient manuscripts and paintings sealed for 900 years, establishing international Dunhuangology.';
    }

    return language === 'zh'
      ? `【妙音解答】关于“${query}”，莫高窟承载了公元4世纪至14世纪跨越千年的丝路文明，735座石窟中蕴藏着世界现存规模最大的佛教艺术遗存。您在当前【${currentTab}】漫游时，可随时点击任一壁画细节，妙音将持续为您考据解密。`
      : `Regarding "${query}", Mogao Grottoes represents over a millennium of Silk Road exchange across 735 caves. Feel free to ask more as we continue our tour.`;
  };

  return (
    <>
      {/* 
        ========================================================================
        PERSISTENT GLOBAL FLOATING COMPANION BADGE (全程跟进小助手)
        ========================================================================
      */}
      <aside
        aria-label="数字人妙音伴游助手"
        className="fixed bottom-5 right-5 z-50 flex flex-col items-end select-none"
      >
        {/* Subtle Live Speech Thought Bubble (when collapsed or speaking) */}
        {!isOpen && currentThought && (
          <div
            onClick={() => setIsOpen(true)}
            className="mb-2 max-w-xs sm:max-w-sm p-3.5 rounded-2xl dunhuang-panel dunhuang-panel-hover text-xs text-[#f5ecd9] cursor-pointer animate-fadeIn"
          >
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#d4a359]/20 text-[10px] text-[#e5b869]">
              <span className="flex items-center gap-1 font-serif font-bold">
                <Sparkles className="w-3 h-3 text-[#d4a359] animate-spin" style={{ animationDuration: '6s' }} />
                <span>妙音实时导览</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-[#a89582]">点击展开对话</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentThought('');
                  }}
                  className="p-0.5 text-[#8c7866] hover:text-[#fff7ed] transition-colors"
                  title="稍后提醒"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
            <p className="line-clamp-2 leading-relaxed text-[#ded2c1] font-serif font-light">
              {currentThought}
            </p>
          </div>
        )}

        {/* Main Floating Trigger Button with Realistic Portrait & Glow Halo */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="relative group flex items-center gap-2 p-1.5 pr-4 rounded-full bg-[#1e1510]/95 border border-[#d4a359]/80 hover:border-[#f8edd5] shadow-[0_0_22px_rgba(212,163,89,0.45)] hover:shadow-[0_0_32px_rgba(212,163,89,0.7)] transition-all duration-300 transform hover:scale-105"
            title="点击唤起数字人妙音，全程智能解说与答疑"
          >
            {/* Halo pulse */}
            <span className="absolute -inset-1 rounded-full bg-[#d4a359]/25 blur-sm group-hover:bg-[#d4a359]/45 transition-all pointer-events-none" />

            {/* Realistic Avatar Image */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/40 shadow-inner flex-shrink-0">
              <img
                src={
                  persona === 'miaoyin'
                    ? 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=200&auto=format&fit=crop'
                    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
                }
                alt="妙音"
                className="w-full h-full object-cover filter contrast-110"
              />
              {isSpeaking && (
                <div className="absolute inset-0 bg-[#c1382b]/30 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                </div>
              )}
            </div>

            {/* Label & Sound Indicator */}
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-serif-sc font-bold text-xs text-[#f7ecd4]">
                  {persona === 'miaoyin' ? '数字人 · 妙音' : '莫高学者'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[10px] text-[#e5b869] font-serif">
                {isSpeaking ? '正在实时解说…' : '全程导览已就绪'}
              </div>
            </div>

            {/* Sound Toggle Icon on Badge */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (speechEnabled) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
                setSpeechEnabled(!speechEnabled);
              }}
              className="ml-1 p-1.5 rounded-full bg-[#2a1d15] hover:bg-[#3d2a1e] text-[#c9b7a1] hover:text-[#f8edd5] transition-colors"
              title={speechEnabled ? '关闭语音' : '开启语音'}
            >
              {speechEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#e5b869]" /> : <VolumeX className="w-3.5 h-3.5 text-[#8c7866]" />}
            </div>
          </button>
        )}

        {/* 
          ========================================================================
          EXPANDED DIALOGUE & GUIDANCE CONSOLE (可折叠对话控制台)
          ========================================================================
        */}
        {isOpen && (
          <div
            className={`w-[92vw] sm:w-[420px] dunhuang-panel dunhuang-corner-accents rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_28px_rgba(212,163,89,0.2)] flex flex-col overflow-hidden backdrop-blur-xl animate-fadeIn transition-all ${
              isMinimized ? 'h-16' : 'h-[580px] max-h-[85vh]'
            }`}
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[#241a13] border-b border-[#3d2c1e] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#d4a359] shadow">
                  <img
                    src={
                      persona === 'miaoyin'
                        ? 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=200&auto=format&fit=crop'
                        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {isSpeaking && (
                    <div className="absolute inset-0 bg-[#c1382b]/30 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif-sc font-bold text-sm text-[#f7ecd4]">
                      {persona === 'miaoyin' ? '数字人妙音 · 全程跟进导览' : '莫高考古学者'}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#d4a359]">
                    当前伴游：{currentTab === 'vr' ? `${activeCave.number}全景` : currentTab === 'zoom' ? activeMural.title.zh : '数字化展厅'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {/* Voice mute/unmute */}
                <button
                  onClick={() => {
                    if (speechEnabled) {
                      window.speechSynthesis?.cancel();
                      setIsSpeaking(false);
                    }
                    setSpeechEnabled(!speechEnabled);
                  }}
                  className="p-1.5 rounded-lg text-[#c9b7a1] hover:text-white hover:bg-[#332418] transition-colors"
                  title="语音合成朗读"
                >
                  {speechEnabled ? <Volume2 className="w-4 h-4 text-[#e5b869]" /> : <VolumeX className="w-4 h-4 text-[#8c7866]" />}
                </button>

                {/* API Settings */}
                <button
                  onClick={() => setShowApiModal(true)}
                  className="p-1.5 rounded-lg text-[#c9b7a1] hover:text-white hover:bg-[#332418] transition-colors"
                  title="接入 DeepSeek / 自定义大模型"
                >
                  <Settings className="w-4 h-4" />
                </button>

                {/* Minimize / Maximize */}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg text-[#c9b7a1] hover:text-white hover:bg-[#332418] transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>

                {/* Close to badge */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[#c9b7a1] hover:text-white hover:bg-[#332418] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body (only when not minimized) */}
            {!isMinimized && (
              <div className="flex-1 flex flex-col overflow-hidden bg-[#160f0b]">
                {/* Real-time Scene Info Strip */}
                <div className="px-3.5 py-1.5 bg-[#1b130e] border-b border-[#33251a] flex items-center justify-between text-[11px] text-[#a3907d]">
                  <span className="flex items-center gap-1 text-[#e5b869]">
                    <Compass className="w-3 h-3 text-[#e5b869]" />
                    <span>场景感知已锁定：{currentTab === 'vr' ? activeCave.name.zh : currentTab === 'zoom' ? activeMural.title.zh : '展厅全景'}</span>
                  </span>

                  {/* Switch Persona */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPersona('miaoyin')}
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        persona === 'miaoyin' ? 'bg-[#d4a359] text-[#18110b] font-bold' : 'text-[#8c7866]'
                      }`}
                    >
                      妙音
                    </button>
                    <button
                      onClick={() => setPersona('scholar')}
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        persona === 'scholar' ? 'bg-[#d4a359] text-[#18110b] font-bold' : 'text-[#8c7866]'
                      }`}
                    >
                      学者
                    </button>
                  </div>
                </div>

                {/* Chat Messages Stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
                  {messages.map(m => {
                    const isAI = m.sender === 'ai';
                    return (
                      <div
                        key={m.id}
                        className={`flex gap-2.5 max-w-full ${isAI ? 'mr-4' : 'ml-auto flex-row-reverse'}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] ${
                            isAI ? 'bg-[#c1382b] text-white shadow' : 'bg-[#3b2b1d] text-[#e5b869]'
                          }`}
                        >
                          {isAI ? <Sparkles className="w-3.5 h-3.5" /> : '游客'}
                        </div>

                        <div className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
                          <div
                            className={`p-3 rounded-xl leading-relaxed shadow-md ${
                              isAI
                                ? 'bg-[#221812] text-[#f4ecd9] border border-[#d4a359]/30 rounded-tl-none'
                                : 'bg-[#d4a359] text-[#18110b] font-medium rounded-tr-none'
                            }`}
                          >
                            {m.text}
                          </div>
                          <span className="mt-1 text-[9px] text-[#6e5d4e]">{m.timestamp}</span>
                        </div>
                      </div>
                    );
                  })}

                  {isThinking && (
                    <div className="flex items-center gap-2 text-[#e5b869] text-xs italic">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e5b869] animate-ping" />
                      <span>妙音正在参详莫高秘籍……</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Dynamic Context Suggestions (根据当前所在的洞窟或页面实时变幻) */}
                <div className="p-2.5 bg-[#1b130e] border-t border-[#33251a]">
                  <div className="flex items-center gap-1 text-[10px] text-[#99836c] mb-1.5">
                    <HelpCircle className="w-3 h-3 text-[#d4a359]" />
                    <span>针对当前场景，您可以这样问妙音：</span>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {getContextQuestions().map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="px-2.5 py-1 rounded-full bg-[#271d16] hover:bg-[#382a1f] border border-[#473425] text-[11px] text-[#ded2c1] whitespace-nowrap transition-colors flex-shrink-0"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-[#1e1510] border-t border-[#3d2c1e] flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="向妙音提问当前洞窟、壁画构图或历史……"
                    className="flex-1 bg-[#120d0a] border border-[#473426] focus:border-[#d4a359] rounded-xl px-3 py-2 text-xs text-white placeholder-[#6e5d4e] outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isThinking}
                    className="px-3.5 py-2 rounded-xl bg-[#d4a359] hover:bg-[#e5b869] disabled:opacity-40 text-[#18110b] font-bold text-xs flex items-center gap-1 shadow transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>探询</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* DeepSeek & Model Configuration Modal */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#221812] border border-[#d4a359]/60 rounded-2xl p-6 shadow-2xl text-[#f4ede1]">
            <div className="flex items-center justify-between pb-3 border-b border-[#3d2b1f]">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#e5b869]" />
                <h3 className="font-serif-sc font-bold text-base text-[#f5d697]">
                  数字人大模型 API 接口配置
                </h3>
              </div>
              <button
                onClick={() => setShowApiModal(false)}
                className="text-[#8c7866] hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="mt-3 text-xs text-[#c9b7a1] leading-relaxed">
              平台默认搭载高精度敦煌学者文献库。您可在此输入 DeepSeek API Key 启用 deepseek-chat 或 deepseek-reasoner 进行更深度的文化推理。
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-[#e5b869] font-medium block mb-1">
                  DeepSeek API Key (密钥)
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3 top-2.5 text-[#8c7866]" />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full bg-[#140e0b] border border-[#473426] focus:border-[#d4a359] rounded-lg pl-9 pr-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#e5b869] font-medium block mb-1">
                  API Endpoint (终端服务地址)
                </label>
                <input
                  type="text"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  placeholder="https://api.deepseek.com/v1"
                  className="w-full bg-[#140e0b] border border-[#473426] focus:border-[#d4a359] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-[#e5b869] font-medium block mb-1">
                  模型名称
                </label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="deepseek-chat"
                  className="w-full bg-[#140e0b] border border-[#473426] focus:border-[#d4a359] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowApiModal(false)}
                className="px-4 py-2 rounded-lg bg-[#2a1e16] hover:bg-[#382a1f] text-xs text-[#c9b7a1]"
              >
                取消
              </button>
              <button
                onClick={() => {
                  localStorage.setItem('dh_deepseek_key', apiKey);
                  localStorage.setItem('dh_deepseek_endpoint', apiEndpoint);
                  localStorage.setItem('dh_deepseek_model', modelName);
                  setShowApiModal(false);
                }}
                className="px-5 py-2 rounded-lg bg-[#d4a359] hover:bg-[#e5b869] text-xs text-[#18110b] font-bold"
              >
                保存并启用
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
