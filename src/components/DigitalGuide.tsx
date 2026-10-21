import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Volume2,
  VolumeX,
  Settings,
  Bot,
  User,
  HelpCircle,
  Key,
  Globe,
  Radio,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const DigitalGuide: React.FC = () => {
  const { language } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-welcome',
      sender: 'ai',
      text: language === 'zh'
        ? '善男子、善女人，吾乃莫高窟飞天妙音。关于丝路驼铃、鸣沙壁画、千年矿彩与古卷秘辛，汝皆可垂询。'
        : 'Greetings, traveler of the Silk Road. I am Miaoyin, the Celestial Guide of Dunhuang. Inquire of the ancient murals, sacred pigments, or cave secrets.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [avatarPersona, setAvatarPersona] = useState<'miaoyin' | 'deer' | 'scholar'>('miaoyin');
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // DeepSeek / Custom Model settings
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('dh_deepseek_key') || '');
  const [apiEndpoint, setApiEndpoint] = useState(() => localStorage.getItem('dh_deepseek_endpoint') || 'https://api.deepseek.com/v1');
  const [modelName, setModelName] = useState(() => localStorage.getItem('dh_deepseek_model') || 'deepseek-chat');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const speakText = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = avatarPersona === 'scholar' ? 0.9 : 1.15;
    const langCodes: Record<string, string> = {
      zh: 'zh-CN',
      en: 'en-US',
      ja: 'ja-JP',
      fr: 'fr-FR'
    };
    utterance.lang = langCodes[language] || 'zh-CN';
    window.speechSynthesis.speak(utterance);
  };

  // Scholarly Knowledge Base Matcher for instant authoritative answers
  const queryScholarlyKnowledge = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('黑') || q.includes('变色') || q.includes('black') || q.includes('oxid') || q.includes('変色')) {
      return language === 'zh'
        ? '【壁画面容变色之谜】早期（如北凉、北魏、北周）壁画中，人物面容与肌肤常呈深褐黑灰色，这并非画师原意。画师在调制肉色时大量使用了含铅矿物“铅丹”（Pb3O4）与“白铅粉”。千百年来，在戈壁干燥环境中的微量硫化气体、光线与潮气作用下，铅丹被氧化分解为深褐黑色的“二氧化铅”（PbO2）。现代敦煌研究院利用高光谱无损反演，已证实当时原本是白里透红的晶莹肤色！'
        : 'Early Dunhuang murals feature darkened figures due to photo-oxidation. Ancient painters mixed lead minium (Pb3O4) for porcelain fleshtones. Over 1,500 years, atmospheric exposure oxidized this pigment into black lead dioxide (PbO2). Digital multispectral imaging has successfully calculated their original vibrant, blushing carnations.';
    }

    if (q.includes('三兔') || q.includes('兔子') || q.includes('耳朵') || q.includes('hare') || q.includes('rabbit') || q.includes('407')) {
      return language === 'zh'
        ? '【三兔共耳的几何奇迹与丝路传播】第407窟隋代藻井中央的三只玉兔，画家巧妙运用了几何错视：整个画面中只画了三只耳朵，两两相邻共用一只，却让每只兔子在注视时都拥有两只完整的耳朵！更令人惊叹的是，该纹样从敦煌沿着丝绸之路向西传播，不仅见于波斯铜盘、叙利亚陶器，甚至出现在英国德文郡、法国和德国的中世纪大教堂建筑中，是东西方文明互鉴的“世界密码”。'
        : 'The Three Hares motif in Cave 407 caisson ceiling paints only three ears total, yet each hare visually claims two through shared adjacent positioning. This optical design traveled thousands of miles across the Silk Road, appearing in Persian ceramics and medieval cathedrals across France, Britain, and Germany.';
    }

    if (q.includes('反弹琵琶') || q.includes('琵琶') || q.includes('pipa') || q.includes('112') || q.includes('跳舞')) {
      return language === 'zh'
        ? '【反弹琵琶是否真实存在】第112窟南壁的“反弹琵琶”舞伎，是大唐音乐舞蹈艺术的最高图腾。舞蹈史学家戴爱莲与敦煌艺术研究所专家考证，反弹琵琶是盛唐胡旋舞、胡腾舞与中原宫廷燕乐结合后的绝技动作。演奏者需具备惊人的柔韧性与指法肌肉记忆，在单足腾空旋转的瞬间将四弦琵琶置于颈后，反手拨弦。日本正仓院至今保存着唐代传入的“螺钿紫檀五弦琵琶”，证明所绘乐器完全写实。'
        : 'The "Playing Pipa Behind the Back" dancer in Cave 112 depicts a real historical choreographic marvel. Tang historical annals document Persian and Sogdian dances merged into imperial banquets, where acrobatic musicians placed the four-stringed pipa behind their neck mid-twirl. Surviving Tang lutes in Japan’s Shosoin Treasury verify its precise anatomical and musical authenticity.';
    }

    if (q.includes('九色鹿') || q.includes('deer') || q.includes('257') || q.includes('调达')) {
      return language === 'zh'
        ? '【九色鹿本生图的叙事艺术与哲学】第257窟的《鹿王本生》采用横卷式对称连环构图，故事自两端向中心演进。神鹿舍己救起溺水者调达，调达却因贪图国王厚赏而告密引兵。在面对国王的刀箭时，神鹿昂首挺胸从容辩白，以道德正义感化了国王，背信弃义者则浑身生疮受报。该壁画不仅宣扬诚信与因果，其构图比西方现代电影蒙太奇早诞生了一千多年。'
        : 'The Deer King Jātaka in Cave 257 is a Northern Wei masterpiece depicting the past life of Buddha as the radiant nine-colored deer. It rescued a drowning man who later betrayed it for a king’s gold bounty. The deer’s courageous plea moved the king to ban all hunting, while the betrayer met divine karmic retribution.';
    }

    if (q.includes('藏经洞') || q.includes('王道士') || q.includes('斯坦因') || q.includes('library cave') || q.includes('stein')) {
      return language === 'zh'
        ? '【藏经洞的惊世发现与流散】1900年6月22日，道士王圆箓在清理第16窟积沙时，偶然敲击墙壁发现空响，凿开后发现了密闭近千年的第17窟（藏经洞）。洞内封存了公元4世纪至11世纪的经卷、文书、织绣、绢画达6万余件，涵盖汉文、藏文、梵文、粟特文、回鹘文等。随后英国斯坦因、法国伯希和等人低价骗购，大量敦煌遗书流散至伦敦、巴黎。如今“数字敦煌”正在让这些散落全球的瑰宝重新在数字空间聚合！'
        : 'In June 1900, Daoist Wang Yuanlu discovered the hidden Cave 17 (Library Cave) holding over 60,000 ancient manuscripts, textiles, and silk paintings sealed since the 11th century. Explorers like Aurel Stein and Paul Pelliot transported thousands of scrolls to London and Paris. Today, Digital Dunhuang is reuniting these global artifacts online.';
    }

    if (q.includes('颜料') || q.includes('矿物') || q.includes('青金石') || q.includes('pigment')) {
      return language === 'zh'
        ? '【莫高窟天然矿物颜料之谜】敦煌壁画之所以千年不褪色，是因为画师全部使用大自然馈赠的天然矿石：青金石（石青，来自阿富汗巴达赫尚）、孔雀石（石绿）、朱砂（硫化汞）、雌黄雄黄（三硫化二砷）、白垩与纯金箔。这些晶体颗粒结构极难被光照分解，经动物皮胶调和后渗透进河泥与草秸抹成的崖壁地仗层中，历经千年依然灿若晚霞。'
        : 'Dunhuang murals retained their brilliance for 1,600 years because artisans used pure inorganic mineral ores: Afghan lapis lazuli (ultramarine), malachite (mineral green), cinnabar (mercuric red), and pure gold leaf bound with animal hide glue into desert alluvial mud plaster.';
    }

    // Default intelligent response
    return language === 'zh'
      ? `关于您提及的“${query}”，莫高窟作为丝绸之路上矗立千年的文化交汇枢纽，见证了汉唐盛世、西域诸国与佛教艺术的融合。全窟现存洞窟735个，壁画4.5万平方米，泥质彩塑2400余身。您也可以在上方【微距壁画鉴赏】中放大千亿像素细节，或进入【非遗矿彩工坊】亲手为千年线条敷彩。请问您还想探寻哪段历史？`
      : `Regarding "${query}", Dunhuang stands as humanity's premier crossroads where Hellenistic, Persian, Indian, and Han Chinese civilizations blended. With 735 caves and 45,000 square meters of murals, every brushstroke whispers Silk Road history. What other aspects would you like to explore?`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // If custom API key is present, try DeepSeek / custom model endpoint
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
                content: '你是一位精通敦煌学、佛教石窟艺术、中国美术史与丝绸之路考古的学者与数字人“妙音仙子”。请以典雅、专业、富有东方文化底蕴的口吻，回答游客关于莫高窟壁画、彩塑、藻井与历史的提问。'
              },
              { role: 'user', content: text }
            ],
            temperature: 0.7
          })
        });

        if (response.ok) {
          const data = await response.json();
          const aiReply = data.choices?.[0]?.message?.content || queryScholarlyKnowledge(text);
          const aiMsg: Message = {
            id: `msg-${Date.now() + 1}`,
            sender: 'ai',
            text: aiReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, aiMsg]);
          setIsTyping(false);
          speakText(aiReply);
          return;
        }
      } catch (err) {
        console.warn('Custom API call error, falling back to scholarly engine:', err);
      }
    }

    // High fidelity scholarly engine response
    setTimeout(() => {
      const scholarlyReply = queryScholarlyKnowledge(text);
      const aiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: scholarlyReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      speakText(scholarlyReply);
    }, 700);
  };

  const handleSaveApiConfig = () => {
    localStorage.setItem('dh_deepseek_key', apiKey);
    localStorage.setItem('dh_deepseek_endpoint', apiEndpoint);
    localStorage.setItem('dh_deepseek_model', modelName);
    setShowConfigModal(false);
  };

  const quickQuestions = [
    { label: language === 'zh' ? '为什么壁画人脸会变黑？' : 'Why do mural faces turn black?' },
    { label: language === 'zh' ? '三兔共耳为什么只有三只耳朵？' : 'Why do Three Hares share three ears?' },
    { label: language === 'zh' ? '反弹琵琶是真实存在的舞蹈吗？' : 'Did reverse pipa dancing really exist?' },
    { label: language === 'zh' ? '藏经洞是怎样被发现的？' : 'How was the Library Cave found?' }
  ];

  return (
    <div className="relative min-h-[92vh] bg-[#120e0b] text-[#f4ece1] flex flex-col lg:flex-row overflow-hidden">
      {/* Left Column: Visual Interactive Digital Guide Avatar */}
      <div className="w-full lg:w-[420px] bg-gradient-to-b from-[#211812] to-[#16100c] border-b lg:border-b-0 lg:border-r border-[#3d2b1f] p-6 flex flex-col items-center justify-between relative">
        {/* Top Digital Human Title & Status */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-serif-sc font-bold text-sm text-[#f5d697]">
              {language === 'zh' ? '莫高数字人 · 妙音' : 'Digital Guide Miaoyin'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                speechEnabled ? 'bg-[#3b281a] border-[#e5b869] text-[#e5b869]' : 'border-[#473426] text-[#7a6857]'
              }`}
              title="语音合成朗读"
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowConfigModal(true)}
              className="p-1.5 rounded-lg border border-[#473426] hover:border-[#d4a359] text-[#c9b7a1] transition-colors"
              title="配置 DeepSeek / 智能大模型接口"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Digital Guide Animated Canvas / SVG Figure */}
        <div className="relative my-6 flex flex-col items-center justify-center">
          {/* Sacred Golden Halo */}
          <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-[#c1382b]/20 via-[#d4a359]/30 to-[#244b7a]/20 blur-xl absolute -z-0" />

          {/* Persona Visual Container - Realistic Photographic Presentation */}
          <div className="relative z-10 w-52 h-52 rounded-full border-2 border-[#d4a359]/60 p-2 shadow-[0_0_35px_rgba(212,163,89,0.35)] bg-[#1e1510] flex items-center justify-center overflow-hidden group">
            {avatarPersona === 'miaoyin' && (
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center animate-float">
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop"
                  alt="妙音飞天"
                  className="w-full h-full object-cover rounded-full filter contrast-110 brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                {isTyping && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#c1382b]/90 text-[10px] text-white font-serif flex items-center gap-1 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>妙音解说中</span>
                  </div>
                )}
              </div>
            )}

            {avatarPersona === 'deer' && (
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center animate-float">
                <img
                  src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=600&auto=format&fit=crop"
                  alt="九色鹿仙"
                  className="w-full h-full object-cover rounded-full filter contrast-115"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                {isTyping && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#2e6355]/90 text-[10px] text-white font-serif flex items-center gap-1 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>神鹿低吟中</span>
                  </div>
                )}
              </div>
            )}

            {avatarPersona === 'scholar' && (
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center animate-float">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
                  alt="莫高学者"
                  className="w-full h-full object-cover rounded-full filter sepia-25 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                {isTyping && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#d4a359]/90 text-[10px] text-[#18110b] font-bold font-serif flex items-center gap-1 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18110b] animate-ping" />
                    <span>学者考证中</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Persona selector tabs */}
          <div className="mt-4 flex items-center gap-2 p-1 rounded-full bg-[#1b140f] border border-[#3d2b1f]">
            <button
              onClick={() => setAvatarPersona('miaoyin')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                avatarPersona === 'miaoyin' ? 'bg-[#d4a359] text-[#18110b] font-bold' : 'text-[#a3907d] hover:text-[#f8edd5]'
              }`}
            >
              {language === 'zh' ? '妙音飞天' : 'Apsara'}
            </button>
            <button
              onClick={() => setAvatarPersona('deer')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                avatarPersona === 'deer' ? 'bg-[#d4a359] text-[#18110b] font-bold' : 'text-[#a3907d] hover:text-[#f8edd5]'
              }`}
            >
              {language === 'zh' ? '九色鹿仙' : 'Deer Spirit'}
            </button>
            <button
              onClick={() => setAvatarPersona('scholar')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                avatarPersona === 'scholar' ? 'bg-[#d4a359] text-[#18110b] font-bold' : 'text-[#a3907d] hover:text-[#f8edd5]'
              }`}
            >
              {language === 'zh' ? '莫高学者' : 'Scholar'}
            </button>
          </div>
        </div>

        {/* Live Subtitle Box for Real-time accessibility */}
        <div className="w-full p-3.5 rounded-xl bg-[#1a130e] border border-[#d4a359]/30 text-xs text-[#ded2c1] leading-relaxed min-h-[72px] flex items-center justify-center text-center italic shadow-inner">
          {isTyping ? (
            <span className="flex items-center gap-1.5 text-[#e5b869]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5b869] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5b869] animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5b869] animate-bounce" style={{ animationDelay: '0.4s' }} />
              <span>{language === 'zh' ? '妙音正在查阅莫高万卷古籍……' : 'Consulting ancient Mogao scrolls...'}</span>
            </span>
          ) : (
            <span>
              {messages[messages.length - 1]?.sender === 'ai'
                ? messages[messages.length - 1].text.slice(0, 110) + '...'
                : language === 'zh'
                  ? '点击下方或输入您对莫高窟的任何疑问，妙音为您智能解读。'
                  : 'Ask any question regarding Mogao murals, history or pigments.'}
            </span>
          )}
        </div>
      </div>

      {/* Right Column: Conversational Dialogue Stream & Input */}
      <div className="flex-1 flex flex-col justify-between h-[60vh] lg:h-[92vh] bg-[#140e0b]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map(m => {
            const isAI = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-3xl ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                    isAI ? 'bg-[#c1382b] text-white shadow-md' : 'bg-[#3d2f23] text-[#e5b869]'
                  }`}
                >
                  {isAI ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-lg ${
                      isAI
                        ? 'bg-[#221812] text-[#ede2d3] border border-[#d4a359]/30 rounded-tl-none'
                        : 'bg-[#d4a359] text-[#1a120b] font-medium rounded-tr-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="mt-1 text-[10px] text-[#73604f]">{m.timestamp}</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Questions Bar */}
        <div className="px-4 py-2 bg-[#1a130e] border-t border-[#33251a] flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] text-[#8c7866] flex-shrink-0 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-[#d4a359]" />
            {language === 'zh' ? '大家都在问：' : 'Popular:'}
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.label)}
              className="px-2.5 py-1 rounded-full bg-[#261d16] hover:bg-[#382a1f] border border-[#4d3928] text-xs text-[#d6c5b0] whitespace-nowrap transition-colors"
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#1e1510] border-t border-[#3d2b1f]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                language === 'zh'
                  ? '向妙音仙子提问，例如：“为什么壁画里的人脸会变黑？”'
                  : 'Ask Miaoyin, e.g., "Why do mural faces turn black over time?"'
              }
              className="flex-1 bg-[#120d0a] border border-[#4d3928] focus:border-[#d4a359] rounded-xl px-4 py-3 text-xs md:text-sm text-[#f5ecd9] placeholder-[#7a6857] outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#b87d3b] hover:from-[#e5b869] hover:to-[#c98c48] disabled:opacity-50 text-[#18110b] font-bold text-xs md:text-sm flex items-center gap-1.5 shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'zh' ? '探询' : 'Send'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Model Configuration Modal for DeepSeek / Custom AI Engine */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#221812] border border-[#d4a359]/60 rounded-2xl p-6 shadow-2xl text-[#f4ede1]">
            <div className="flex items-center justify-between pb-3 border-b border-[#3d2b1f]">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#e5b869]" />
                <h3 className="font-serif-sc font-bold text-base text-[#f5d697]">
                  {language === 'zh' ? '智能大模型 API 接口配置' : 'AI Model API Configuration'}
                </h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-[#8c7866] hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="mt-3 text-xs text-[#c9b7a1] leading-relaxed">
              {language === 'zh'
                ? '平台默认搭载高精度敦煌文献学者引擎。您亦可在此直接接入 DeepSeek 或兼容 OpenAI 协议的自建文化大模型进行深层逻辑推理分析。'
                : 'Built-in scholarly engine active by default. You can also connect DeepSeek or any OpenAI-compatible API key for enhanced reasoning.'}
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-[#e5b869] font-medium block mb-1">
                  {language === 'zh' ? 'API Key (密钥)' : 'API Key'}
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
                  {language === 'zh' ? 'API Endpoint (服务终端地址)' : 'API Endpoint'}
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
                  {language === 'zh' ? '模型名称 (Model Name)' : 'Model Name'}
                </label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="deepseek-chat or deepseek-reasoner"
                  className="w-full bg-[#140e0b] border border-[#473426] focus:border-[#d4a359] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 rounded-lg bg-[#2a1e16] hover:bg-[#382a1f] text-xs text-[#c9b7a1]"
              >
                {language === 'zh' ? '取消' : 'Cancel'}
              </button>
              <button
                onClick={handleSaveApiConfig}
                className="px-5 py-2 rounded-lg bg-[#d4a359] hover:bg-[#e5b869] text-xs text-[#18110b] font-bold"
              >
                {language === 'zh' ? '保存并启用' : 'Save & Enable'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
