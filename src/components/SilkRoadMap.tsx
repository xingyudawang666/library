import React, { useState, useRef } from 'react';
import {
  Compass,
  MapPin,
  Sparkles,
  ArrowRight,
  Eye,
  BookOpen,
  Volume2,
  VolumeX,
  Layers,
  ChevronRight,
  Info,
  Maximize2,
  X,
  Route,
  Navigation
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface SilkRoadNode {
  id: string;
  name: { zh: string; en: string; ja: string; fr: string };
  pinyin: string;
  ancientName: string;
  coordinates: { x: number; y: number }; // Percentage 0-100 on map
  routeType: 'hexi' | 'north' | 'south' | 'eurasia' | 'india';
  distanceFromDunhuang: string; // e.g. "0 km (核心节点)"
  historicalRole: { zh: string; en: string };
  highlights: string[];
  image: string;
  targetCaveId?: string;
  targetMuralId?: string;
  targetTopicId?: string;
  keyFigures: string[];
  tradeGoods: string[];
  historicalQuote?: { quote: string; author: string };
}

export const SILK_ROAD_NODES: SilkRoadNode[] = [
  {
    id: 'node-dunhuang',
    name: { zh: '敦煌 · 莫高窟', en: 'Dunhuang · Mogao Caves', ja: '敦煌 · 莫高窟', fr: 'Dunhuang · Grottes de Mogao' },
    pinyin: 'Dūnhuáng',
    ancientName: '沙州 / 敦煌郡',
    coordinates: { x: 57, y: 55 },
    routeType: 'hexi',
    distanceFromDunhuang: '0 km (总枢纽咽喉)',
    historicalRole: {
      zh: '丝绸之路总枢纽与“两关咽喉”。北道经玉门关通高昌、西域，南道由阳关通楼兰、于阗。鸣沙山东麓营建千余年莫高窟，存壁画四万五千平米。季羡林先生誉为“世界四大文明体系汇流之独一无二圣地”。',
      en: 'The vital throat of the Silk Road where four great civilizations converged: Chinese, Indian, Greco-Roman, and Islamic/Persian. Home to 735 Mogao caves spanning over a thousand years.'
    },
    highlights: ['莫高窟735洞窟', '三兔飞天藻井', '反弹琵琶', '九色鹿连环画', '藏经洞6万卷古籍'],
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    targetCaveId: 'cave-257',
    targetMuralId: 'mural-deer',
    keyFigures: ['乐僴禅师 (开山)', '洪辩法师', '常书鸿 (敦煌守护神)', '樊锦诗 (敦煌女儿)'],
    tradeGoods: ['阿富汗青金石', '波斯织锦', '和田羊脂玉', '中原丝绸瓷器', '佛经写本'],
    historicalQuote: {
      quote: '敦，大也；煌，盛也。以其广开西域，故以盛名。',
      author: '应劭《汉书·地理志注》'
    }
  },
  {
    id: 'node-changan',
    name: { zh: '长安 · 丝路东方起点', en: 'Chang’an · Eastern Origin', ja: '長安 · 東の起点', fr: 'Chang’an · Origine Orientale' },
    pinyin: 'Cháng’ān',
    ancientName: '西京 / 大兴城',
    coordinates: { x: 88, y: 72 },
    routeType: 'hexi',
    distanceFromDunhuang: '约 1,800 km',
    historicalRole: {
      zh: '汉唐帝国极盛时期的世界超级大都会，丝绸之路的东方起点。西域诸胡列肆、万国使臣云集西市，中原丝绸、瓷器、漆器由此源源不断西运欧亚，深刻影响莫高窟盛唐大窟的宫廷风范。',
      en: 'Imperial cosmopolitan capital of Han and Tang dynasties and eastern origin of the Silk Road. The origin of high Tang aesthetics directly inspiring Mogao Cave 57 and Cave 158.'
    },
    highlights: ['大明宫紫宸殿', '长安西市胡姬酒肆', '唐三彩胡商骆驼俑', '大慈恩寺大雁塔'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    targetCaveId: 'cave-57',
    targetMuralId: 'mural-beauty',
    keyFigures: ['汉武帝', '唐太宗', '玄奘三藏', '岑参'],
    tradeGoods: ['鲁锦与蜀锦', '秘色瓷与青瓷', '茶叶与中草药', '铜镜与漆器'],
    historicalQuote: {
      quote: '九天阊阖开宫殿，万国衣冠拜冕旒。',
      author: '王维《和贾舍人早朝大明宫之作》'
    }
  },
  {
    id: 'node-hexi',
    name: { zh: '河西走廊 · 武威与张掖', en: 'Hexi Corridor · Liangzhou & Ganzhou', ja: '河西回廊 · 武威/張掖', fr: 'Corridor du Hexi · Liangzhou' },
    pinyin: 'Héxī Zǒuláng',
    ancientName: '凉州 / 甘州 / 肃州',
    coordinates: { x: 74, y: 64 },
    routeType: 'hexi',
    distanceFromDunhuang: '约 600 - 1,100 km',
    historicalRole: {
      zh: '南倚祁连雪峰，北阻巴丹吉林大漠。“断匈奴之臂，张中国之掖”。武威天梯山石窟被誉为“石窟鼻祖”，凉州乐舞融入中原雅乐，是佛教沿丝绸之路东渐并扎根中原的关键走廊。',
      en: 'The legendary Hexi Corridor bordered by snow-capped Qilian mountains. The critical artery transmitting Buddhist cave art from Central Asia to inland China.'
    },
    highlights: ['武威天梯山石窟', '张掖马蹄寺三十三天', '铜奔马 (马踏飞燕)', '祁连山冰川雪水'],
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1200&auto=format&fit=crop',
    targetCaveId: 'cave-257',
    targetTopicId: 'history',
    keyFigures: ['霍去病', '昙曜法师', '鸠摩罗什 (羁留凉州17载)'],
    tradeGoods: ['凉州葡萄酒', '河西优质马匹', '祁连美玉', '石膏与矿物朱砂'],
    historicalQuote: {
      quote: '凉州七里十万家，胡人半解弹琵琶。',
      author: '岑参《凉州馆中与诸判官夜集》'
    }
  },
  {
    id: 'node-passes',
    name: { zh: '玉门关与阳关 · 双雄隘口', en: 'Yumen & Yang Passes', ja: '玉門関と陽関', fr: 'Passes de Yumen et Yangguan' },
    pinyin: 'Yùmén Guān & Yáng Guān',
    ancientName: '阳关 / 玉门都尉',
    coordinates: { x: 52, y: 56 },
    routeType: 'hexi',
    distanceFromDunhuang: '西出 70 - 90 km',
    historicalRole: {
      zh: '汉武帝所设“两关”守护丝路西域出入境。玉门关控丝路北道，阳关扼丝路南道。商队在此验过所、备水粮、听烽燧。藏经洞出土大量两关边塞戍防简牍与通关过所，见证两千年壮怀激烈。',
      en: 'Twin western gate fortresses erected by Emperor Wu of Han. Gateways dividing the northern and southern paths of the desert caravan network.'
    },
    highlights: ['汉长城烽燧遗址', '悬泉置驿站汉简', '玉门关大方盘城', '阳关古董滩'],
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1200&auto=format&fit=crop',
    targetCaveId: 'cave-17',
    targetTopicId: 'preservation',
    keyFigures: ['班超 (投笔从戎)', '王之涣', '王维', '玄奘'],
    tradeGoods: ['和田玉料通关检验', '丝绸通关过所文牒', '西域良种苜蓿与葡萄'],
    historicalQuote: {
      quote: '羌笛何须怨杨柳，春风不度玉门关。',
      author: '王之涣《凉州词》'
    }
  },
  {
    id: 'node-qiuci',
    name: { zh: '龟兹 · 克孜尔石窟', en: 'Qiuci & Kizil Grottoes', ja: '亀茲 · キジル石窟', fr: 'Koutcha & Kizil' },
    pinyin: 'Qiūcí / Kùchē',
    ancientName: '龟兹大王国',
    coordinates: { x: 38, y: 44 },
    routeType: 'north',
    distanceFromDunhuang: '约 1,300 km',
    historicalRole: {
      zh: '天山南麓龟兹故国，丝路北道最大的乐舞与佛教艺术中心。克孜尔千佛洞比莫高窟更早开凿，独创“菱格因缘故事画”与天宫伎乐，是敦煌莫高窟第112窟反弹琵琶伎乐之母体源泉。',
      en: 'Ancient oasis kingdom of Kucha and home to Kizil Caves, the cradle of Buddhist dance and music that directly nurtured Dunhuang’s reverse pipa iconography.'
    },
    highlights: ['克孜尔菱格因缘壁画', '苏幕遮乐舞', '曲项四弦五弦琵琶', '鸠摩罗什辩经台'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    targetCaveId: 'cave-112',
    targetMuralId: 'mural-pipa',
    targetTopicId: 'music-pipa',
    keyFigures: ['鸠摩罗什 (三藏法师)', '龟兹乐舞师白明达'],
    tradeGoods: ['胡乐器 (曲项琵琶、羯鼓、筚篥)', '郁金香香料', '龟兹铁器与织绵'],
    historicalQuote: {
      quote: '管弦繁细，特善诸国。伎乐入华夏，四方莫不崇仰。',
      author: '《隋书·音乐志》'
    }
  },
  {
    id: 'node-gaochang',
    name: { zh: '高昌与吐鲁番 · 丝路北道重镇', en: 'Gaochang & Turpan Oasis', ja: '高昌 · トルファン', fr: 'Gaochang & Tourfan' },
    pinyin: 'Gāochāng / Tǔlǔfān',
    ancientName: '高昌王国 / 西州都督府',
    coordinates: { x: 48, y: 46 },
    routeType: 'north',
    distanceFromDunhuang: '约 800 km',
    historicalRole: {
      zh: '吐鲁番盆地绿洲，高昌故城城垣绵亘。玄奘法师西行求法曾在此与高昌王鞠文泰结拜为兄弟。柏孜克里克千佛洞与莫高窟同脉相承，出土粟特文、回鹘文、摩尼教古籍文献。',
      en: 'Vital oasis depot beneath the Flaming Mountains where monk Xuanzang formed a sworn brotherhood with King Qu Wentai before crossing the desert.'
    },
    highlights: ['高昌故城遗址', '交河故城崖台', '柏孜克里克千佛洞', '坎儿井地下暗渠'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    targetCaveId: 'cave-407',
    targetMuralId: 'mural-threehares',
    keyFigures: ['玄奘', '鞠文泰', '安西都护府长官'],
    tradeGoods: ['无核白葡萄干', '坎儿井纯净水粮', '丝路文牒通行印信'],
    historicalQuote: {
      quote: '地当东西交会之冲，客胡通贾，岁计以亿。',
      author: '《新唐书·地理志》'
    }
  },
  {
    id: 'node-yutian',
    name: { zh: '于阗 · 羊脂玉之国', en: 'Khotan · Kingdom of Jade', ja: '于闐 · 和田玉の国', fr: 'Khotan · Royaume du Jade' },
    pinyin: 'Yútián / Hétián',
    ancientName: '于阗大宝国',
    coordinates: { x: 34, y: 62 },
    routeType: 'south',
    distanceFromDunhuang: '约 1,400 km',
    historicalRole: {
      zh: '丝绸之路南道最强盛的大乘佛教王国，以昆仑山羊脂美玉闻名于世。于阗王室与莫高窟曹氏归义军节度使世代联姻，莫高窟第98窟和第61窟存有高达两米的于阗国王李圣天巨幅供养人壁画。',
      en: 'Southern Silk Road royal power famous for nephrite jade and deep dynastic alliances with Dunhuang’s Guiyijun rulers, depicted in monumental murals.'
    },
    highlights: ['玉龙喀什河捞玉石', '莫高窟第98窟于阗国王像', '丹丹乌里克古遗址', '于阗塞语贝叶经'],
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    targetCaveId: 'cave-17',
    targetTopicId: 'history',
    keyFigures: ['于阗国王李圣天', '天寿天子', '曹氏归义军天公主'],
    tradeGoods: ['昆仑白玉与墨玉', '艾德莱斯桑蚕丝绸', '地毯与香精'],
    historicalQuote: {
      quote: '国人善织文罽，修佛重礼，岁贡美玉于中国。',
      author: '《大唐西域记》'
    }
  },
  {
    id: 'node-samarkand',
    name: { zh: '葱岭与撒马尔罕 · 粟特商枢', en: 'Samarkand & Sogdiana', ja: 'サマルカンド · ソグド商都', fr: 'Samarcande & Sogdiane' },
    pinyin: 'Sāmǎ’ěrhǎn / Cōnglǐng',
    ancientName: '康国 / 粟特九姓城',
    coordinates: { x: 18, y: 46 },
    routeType: 'eurasia',
    distanceFromDunhuang: '约 3,200 km',
    historicalRole: {
      zh: '翻越葱岭（帕米尔高原）后的中亚明珠。粟特商人（昭武九姓）是丝路商队的终生行者，操一口粟特语穿梭于中原与波斯之间。莫高窟所用昂贵的“青金石”即经撒马尔罕由阿富汗巴达赫尚矿脉输入。',
      en: 'The jewel of Sogdiana beyond the Pamir knot. Sogdian merchant caravans spanned Europe to China, conveying precious lapis lazuli and rare pigments.'
    },
    highlights: ['阿弗拉西阿卜大使壁画', '雷吉斯坦古商铺广场', '粟特商队驼铃驼队', '阿富汗巴达赫尚青金石'],
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1200&auto=format&fit=crop',
    targetTopicId: 'pigment-lapis',
    targetCaveId: 'cave-407',
    keyFigures: ['粟特商主萨宝 (Sartpao)', '安禄山先祖', '波斯行商'],
    tradeGoods: ['阿富汗巴达赫尚纯青金石', '波斯银币', '乳香没药', '罗马毛呢'],
    historicalQuote: {
      quote: '生儿以蜜涂口，掌纳明胶，欲其长而说甘言、执钱如胶也。',
      author: '《大唐西域记·康国》'
    }
  },
  {
    id: 'node-gandhara',
    name: { zh: '犍陀罗与天竺 · 佛法源境', en: 'Gandhara & India', ja: 'ガンダーラ · 天竺', fr: 'Gandhara & Inde' },
    pinyin: 'Jiāntuóluó / Tiānzhú',
    ancientName: '犍陀罗国 / 摩揭陀',
    coordinates: { x: 22, y: 68 },
    routeType: 'india',
    distanceFromDunhuang: '约 3,500 km',
    historicalRole: {
      zh: '希腊化亚历山大远征与印度佛教交汇之地。最早诞生具有阿波罗面孔的立体佛像。莫高窟早期北凉、北魏石窟（如第257窟）的高鼻深目、波浪卷发、通肩大衣与凹凸晕染，直接继承自犍陀罗。',
      en: 'The cradle of Greco-Buddhist art where Hellenistic sculpting met Buddhist compassion. Directly molded early Mogao murals with wave-folded drapery and realistic anatomy.'
    },
    highlights: ['片岩犍陀罗佛立像', '亚历山大希腊化立柱', '那烂陀寺大学', '佛陀降生菩提树'],
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=1200&auto=format&fit=crop',
    targetCaveId: 'cave-257',
    targetMuralId: 'mural-deer',
    targetTopicId: 'history',
    keyFigures: ['阿育王', '迦腻色伽王', '法显', '玄奘'],
    tradeGoods: ['梵文贝叶经', '旃檀木佛雕', '红白檀香', '藏红花'],
    historicalQuote: {
      quote: '法显于此得经律，自天竺泛舟还汉地。',
      author: '《佛国记》'
    }
  },
  {
    id: 'node-rome',
    name: { zh: '大秦与波斯 · 丝路极西之境', en: 'Rome & Persia (Da Qin)', ja: 'ローマ / ペルシャ (大秦)', fr: 'Rome & Perse' },
    pinyin: 'Dà Qín / Bōsī',
    ancientName: '萨珊波斯 / 拜占庭大秦',
    coordinates: { x: 6, y: 38 },
    routeType: 'eurasia',
    distanceFromDunhuang: '约 7,000 km',
    historicalRole: {
      zh: '古代丝绸之路的最西端彼岸。波斯萨珊王朝的联珠纹锦缎、三兔共耳图腾、罗马吹制彩色琉璃杯沿着丝路跨欧亚流传至敦煌莫高窟。第407窟三兔纹在中世纪英国德文郡、德国教堂亦有完全一致的出现！',
      en: 'The westernmost horizon of the Silk Road. Persian pearl roundels, blown Roman glass, and the mysterious Three Hares mandala traveled across continents from Dunhuang to medieval European cathedrals.'
    },
    highlights: ['萨珊联珠对鸟纹锦', '罗马吹制彩色琉璃器', '英国中世纪三兔教堂', '安提阿大丝绸交易所'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    targetCaveId: 'cave-407',
    targetMuralId: 'mural-threehares',
    targetTopicId: 'pigment-gold',
    keyFigures: ['甘英 (出使大秦临西海)', '波斯萨珊沙阿', '马可·波罗'],
    tradeGoods: ['吹制彩色玻璃器皿', '黄金与琥珀', '萨珊银币', '石榴与胡桃'],
    historicalQuote: {
      quote: '其人长大平正，有类中国，故谓之大秦。多金银、奇畜、异物。',
      author: '《后汉书·西域传》'
    }
  }
];

interface SilkRoadMapProps {
  onEnterCave: (caveId: string) => void;
  onEnterMural: (muralId: string) => void;
  onOpenEncyclopedia: (topicId?: string) => void;
  onOpenWorkshop?: () => void;
}

export const SilkRoadMap: React.FC<SilkRoadMapProps> = ({
  onEnterCave,
  onEnterMural,
  onOpenEncyclopedia,
  onOpenWorkshop,
}) => {
  const { language } = useApp();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-dunhuang');
  const [activeRouteFilter, setActiveRouteFilter] = useState<string>('all');
  const [audioChimeActive, setAudioChimeActive] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const selectedNode = SILK_ROAD_NODES.find(n => n.id === selectedNodeId) || SILK_ROAD_NODES[0];

  // Synthesize peaceful desert camel bells upon clicking audio toggle
  const playCamelBell = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // 3 subtle harmonic bells
      const freqs = [587.33, 880, 1174.66]; // D5, A5, D6 - traditional pentatonic gong bell resonance
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 1.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.8);
      });
      setAudioChimeActive(true);
      setTimeout(() => setAudioChimeActive(false), 2000);
    } catch {
      // Audio fallback silent
    }
  };

  const handleSelectNode = (node: SilkRoadNode) => {
    setSelectedNodeId(node.id);
    playCamelBell();
  };

  const routeFilters = [
    { id: 'all', label: { zh: '全部丝路干线 (All Routes)', en: 'All Trade Routes' } },
    { id: 'hexi', label: { zh: '河西走廊与两关 (Hexi Corridor)', en: 'Hexi & Passes' } },
    { id: 'north', label: { zh: '丝路北道 (Kucha & Turpan)', en: 'Northern Path' } },
    { id: 'south', label: { zh: '丝路南道 (Khotan & Yutian)', en: 'Southern Path' } },
    { id: 'eurasia', label: { zh: '欧亚极西线 (Central Asia to Rome)', en: 'Eurasia Trunk' } },
  ];

  const isNodeVisibleInFilter = (node: SilkRoadNode) => {
    if (activeRouteFilter === 'all') return true;
    if (activeRouteFilter === 'hexi') return node.routeType === 'hexi';
    if (activeRouteFilter === 'north') return node.routeType === 'north' || node.id === 'node-dunhuang';
    if (activeRouteFilter === 'south') return node.routeType === 'south' || node.id === 'node-dunhuang';
    if (activeRouteFilter === 'eurasia') return node.routeType === 'eurasia' || node.routeType === 'india' || node.id === 'node-dunhuang';
    return true;
  };

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#140e09] via-[#1a120c] to-[#0e0906] border border-[#4d3826] shadow-2xl overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Header section with scholarly title and route filter */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#3d2b1d]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#d4a359] font-serif uppercase tracking-[0.22em] mb-2">
            <Route className="w-4 h-4 text-[#e5b869]" />
            <span>INTERACTIVE SILK ROAD CARTOGRAPHY · DUNHUANG CROSSROADS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-[#f7ecd4] tracking-wide drop-shadow-md flex flex-wrap items-center gap-3">
            <span>丝绸之路敦煌节点交互地图</span>
            <span className="hidden sm:inline-block text-xs font-serif font-normal px-3 py-1 rounded-full bg-[#291e16]/90 border border-[#d4a359]/40 text-[#f5d697] shadow-sm">
              点击点位 · 瞬时直达对应洞窟或文化专题
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#bca792] max-w-3xl font-serif leading-relaxed font-light">
            {language === 'zh'
              ? '敦煌是古丝绸之路欧亚四达之咽喉。向东经河西走廊直抵大唐长安，向西分南北两道直通西域城郭、跨越葱岭直达波斯萨珊与古罗马大秦。点击下方地图任意节点，可查看史料考据，并一键跳转进入该节点在莫高窟的对应洞窟与壁画！'
              : 'Dunhuang was the grand crossroads where ancient East met West. Click any node along the trade corridors to explore historical documents and jump directly into the corresponding Mogao caves and murals.'}
          </p>
        </div>

        {/* Ambient Camel Bell Sound Effect Button & Route Selector */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end">
          <button
            onClick={playCamelBell}
            className={`px-3.5 py-2 rounded-xl border text-xs font-serif flex items-center gap-1.5 transition-all ${
              audioChimeActive
                ? 'bg-[#d4a359] text-[#120d09] border-[#e5b869] shadow-[0_0_15px_rgba(212,163,89,0.5)]'
                : 'bg-[#22170f]/90 hover:bg-[#332216] border-[#d4a359]/30 hover:border-[#d4a359] text-[#c9b7a1] hover:text-[#e5b869]'
            }`}
            title="聆听大漠驼铃与青铜钟磐声"
          >
            <Volume2 className={`w-3.5 h-3.5 ${audioChimeActive ? 'animate-bounce' : ''}`} />
            <span>{language === 'zh' ? '大漠驼铃钟韵' : 'Desert Camel Chime'}</span>
          </button>
        </div>
      </div>

      {/* Route Filter Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        {routeFilters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveRouteFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all ${
              activeRouteFilter === filter.id
                ? 'bg-[#d4a359] text-[#120d09] font-bold shadow-[0_0_12px_rgba(212,163,89,0.35)]'
                : 'bg-[#1c140e]/90 hover:bg-[#2c1d14] text-[#bca792] border border-[#d4a359]/25 hover:border-[#d4a359]/50'
            }`}
          >
            {(filter.label as Record<string, string>)[language] || filter.label.zh}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map Canvas (Left) + Detailed Node Inspection Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Map Visualizer (lg:col-span-8) */}
        <div className="lg:col-span-8 relative w-full h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl dunhuang-panel dunhuang-corner-accents overflow-hidden group">
          {/* Layer 1: Stylized Aged Silk & Desert Sandstone Topographic Texture */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity filter contrast-125"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop)',
            }}
          />

          {/* Layer 2: Parchment Grid & Compass Rose */}
          <div className="absolute inset-0 bg-[radial-gradient(#d4a359_1px,transparent_1px)] [background-size:40px_40px] opacity-10 pointer-events-none" />

          {/* Ancient Compass Watermark in Upper Right */}
          <div className="absolute top-4 right-4 pointer-events-none opacity-20 flex flex-col items-center">
            <Compass className="w-16 h-16 text-[#e5b869] animate-spin-slow" />
            <span className="text-[10px] font-cinzel text-[#d4a359] mt-1 tracking-widest">N · 北</span>
          </div>

          {/* Ancient Topography Labels (Qilian Mts, Taklamakan, Tianshan, Pamir) */}
          <div className="absolute top-12 left-10 pointer-events-none text-[11px] font-serif text-[#8f7560]/70 tracking-widest">
            【 大 宛 · 康 国 · 欧 亚 商 途 】
          </div>
          <div className="absolute top-24 left-24 pointer-events-none text-[11px] font-serif text-[#a68a72]/60 tracking-widest">
            ▲ 天山山脉 (TIANSHAN MTS)
          </div>
          <div className="absolute top-44 left-32 pointer-events-none text-[11px] font-serif text-[#ba9a7e]/50 tracking-widest">
            〰 塔克拉玛干大沙漠 (TAKLAMAKAN DESERT)
          </div>
          <div className="absolute bottom-16 right-36 pointer-events-none text-[11px] font-serif text-[#b89574]/60 tracking-widest">
            ▲ 祁连雪山 · 河西走廊 (HEXI CORRIDOR)
          </div>
          <div className="absolute bottom-12 left-20 pointer-events-none text-[11px] font-serif text-[#8c745f]/50 tracking-widest">
            ▲ 昆仑山脉 (KUNLUN MOUNTAINS)
          </div>

          {/* SVG Route Lines and Flowing Particles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="silkGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8c5828" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#f5d697" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e5b869" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="silkGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2e6355" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#4ea88c" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Path 1: Chang'an ➔ Hexi ➔ Dunhuang (Trunk Arterial Path) */}
            <path
              d="M 88% 72% Q 78% 68%, 74% 64% T 57% 55%"
              fill="none"
              stroke="url(#silkGoldGrad)"
              strokeWidth="3.5"
              strokeDasharray="6 3"
              className="animate-pulse"
              filter="url(#glowGold)"
            />

            {/* Path 2: Dunhuang ➔ Passes (Yumen & Yangguan) */}
            <path
              d="M 57% 55% L 52% 56%"
              fill="none"
              stroke="#f5d697"
              strokeWidth="4"
              filter="url(#glowGold)"
            />

            {/* Path 3: Northern Route (Yumen ➔ Turpan ➔ Qiuci/Kucha ➔ Samarkand) */}
            <path
              d="M 52% 56% Q 50% 50%, 48% 46% Q 43% 45%, 38% 44% Q 28% 45%, 18% 46%"
              fill="none"
              stroke="#e5b869"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              opacity="0.85"
            />

            {/* Path 4: Southern Route (Yangguan ➔ Khotan/Yutian ➔ Pamir ➔ Gandhara) */}
            <path
              d="M 52% 56% Q 44% 60%, 34% 62% Q 28% 66%, 22% 68%"
              fill="none"
              stroke="#d4a359"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              opacity="0.85"
            />

            {/* Path 5: Beyond Pamirs to Samarkand & Rome */}
            <path
              d="M 18% 46% Q 12% 42%, 6% 38%"
              fill="none"
              stroke="#c29153"
              strokeWidth="2"
              strokeDasharray="3 3"
              opacity="0.75"
            />
          </svg>

          {/* Interactive Nodes Placed Absolutely Based on Coordinates */}
          {SILK_ROAD_NODES.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isVisible = isNodeVisibleInFilter(node);
            const isDunhuang = node.id === 'node-dunhuang';

            if (!isVisible) return null;

            return (
              <div
                key={node.id}
                style={{
                  left: `${node.coordinates.x}%`,
                  top: `${node.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => handleSelectNode(node)}
                className={`absolute z-20 cursor-pointer flex flex-col items-center group/node transition-transform duration-300 ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                }`}
              >
                {/* Node Beacon Rings */}
                <div className="relative flex items-center justify-center">
                  {/* Outer Pulsing Aura for Dunhuang Hub or Selected Node */}
                  {(isDunhuang || isSelected) && (
                    <span className="absolute w-10 h-10 rounded-full bg-[#d4a359]/30 animate-ping pointer-events-none" />
                  )}
                  {isSelected && (
                    <span className="absolute w-8 h-8 rounded-full border border-[#f5d697] animate-pulse pointer-events-none" />
                  )}

                  {/* Marker Circle */}
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 transition-all shadow-xl ${
                      isSelected
                        ? 'bg-[#e5b869] border-white text-[#120d09] ring-4 ring-[#d4a359]/50 shadow-[0_0_20px_#e5b869]'
                        : isDunhuang
                        ? 'bg-[#d4a359] border-[#fdf3dc] text-[#120d09]'
                        : 'bg-[#22160e] border-[#d4a359]/70 text-[#f5d697] group-hover/node:border-white group-hover/node:bg-[#332216]'
                    }`}
                  >
                    {isDunhuang ? (
                      <Sparkles className="w-3 h-3 text-[#120d09] animate-spin-slow" />
                    ) : (
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    )}
                  </div>
                </div>

                {/* Node Text Label with Shadow */}
                <div
                  className={`mt-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-serif whitespace-nowrap transition-all shadow-md ${
                    isSelected
                      ? 'bg-[#e5b869] text-[#120d09] font-bold ring-1 ring-white/50'
                      : isDunhuang
                      ? 'bg-[#1b130e]/90 text-[#f5d697] font-bold border border-[#d4a359]/60'
                      : 'bg-[#140e0a]/80 text-[#ded0be] border border-[#3d2b1f] group-hover/node:text-white group-hover/node:border-[#d4a359]'
                  }`}
                >
                  {(node.name as Record<string, string>)[language] || node.name.zh}
                </div>
              </div>
            );
          })}

          {/* Map Legend Overlay in Lower Left */}
          <div className="absolute bottom-3 left-3 bg-[#160f0a]/90 backdrop-blur-md border border-[#3d2c1e] p-2.5 rounded-xl text-[10px] text-[#c9b7a1] pointer-events-none flex flex-col gap-1 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-0.5 bg-[#f5d697] inline-block" />
              <span>丝绸之路中原及河西主干道</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-0.5 bg-[#d4a359] border-b border-dashed border-[#d4a359] inline-block" />
              <span>丝路天山北道 & 昆仑南道</span>
            </div>
            <div className="flex items-center gap-2 text-[#e5b869]">
              <Sparkles className="w-2.5 h-2.5" />
              <span>莫高窟核心枢纽 (点击任意点位直达)</span>
            </div>
          </div>
        </div>

        {/* Detailed Node Inspector & Quick-Jump Action Card (lg:col-span-4) */}
        <div className="lg:col-span-4 dunhuang-panel dunhuang-panel-hover rounded-2xl overflow-hidden dunhuang-corner-accents flex flex-col justify-between">
          <div>
            {/* Node Banner Photo with Ancient Title */}
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={selectedNode.image}
                alt={selectedNode.name.zh}
                className="w-full h-full object-cover filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18110b] via-black/30 to-transparent" />

              {/* Badges on Top (Clean unboxed metadata) */}
              <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-serif drop-shadow-md">
                <span className="font-bold text-sm tracking-wide text-[#fff7ed] bg-[#120d09]/80 px-2.5 py-1 rounded backdrop-blur-sm border border-[#d4a359]/40">
                  {selectedNode.ancientName}
                </span>
                <span className="text-[#ded0be] text-xs font-light">
                  {selectedNode.distanceFromDunhuang}
                </span>
              </div>

              {/* Title & Pinyin on Banner */}
              <div className="absolute bottom-2 left-3 right-3">
                <span className="text-[10px] text-[#d4a359] font-cinzel tracking-wider uppercase">
                  {selectedNode.pinyin}
                </span>
                <h3 className="font-serif-sc font-bold text-xl text-[#fff7ed] drop-shadow-md flex items-center justify-between">
                  <span>{(selectedNode.name as Record<string, string>)[language] || selectedNode.name.zh}</span>
                </h3>
              </div>
            </div>

            {/* Body Information */}
            <div className="p-5 space-y-4">
              {/* Historical Role Narrative */}
              <div>
                <span className="text-[11px] text-[#d4a359] font-serif font-bold uppercase tracking-wider block mb-1">
                  【 丝 路 史 诗 考 据 】
                </span>
                <p className="text-xs text-[#ded0be] leading-relaxed font-light">
                  {(selectedNode.historicalRole as Record<string, string>)[language] || selectedNode.historicalRole.zh}
                </p>
              </div>

              {/* Classical Quote if available (Refined museum typography without thick left accent border) */}
              {selectedNode.historicalQuote && (
                <div className="p-3.5 rounded-xl bg-[#1d140e] border border-[#3d2b1f] text-xs">
                  <p className="text-[#f5d697] italic font-serif leading-relaxed">
                    “{selectedNode.historicalQuote.quote}”
                  </p>
                  <span className="text-[10px] text-[#99836c] block text-right mt-1.5 font-serif">
                    —— {selectedNode.historicalQuote.author}
                  </span>
                </div>
              )}

              {/* Key Highlights (Clean unboxed inline metadata) */}
              <div>
                <span className="text-[10px] text-[#a89582] uppercase tracking-wider block mb-1.5 font-serif">
                  文化地标与考古发现：
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#c9b7a1] font-serif">
                  {selectedNode.highlights.map((h, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      {i > 0 && <span className="text-[#594231]" aria-hidden="true">·</span>}
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Trade Goods & Key Historical Figures */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2d1e14] text-[11px]">
                <div>
                  <span className="text-[10px] text-[#8c7866] block">主要交流物资：</span>
                  <span className="text-[#d6c4aa] line-clamp-1">{selectedNode.tradeGoods.slice(0, 2).join('、')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8c7866] block">关键历史人物：</span>
                  <span className="text-[#d6c4aa] line-clamp-1">{selectedNode.keyFigures.slice(0, 2).join('、')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick-Jump Action Buttons Section: The user specifically requested to quickly jump to caves or topics */}
          <div className="p-5 bg-[#140e09] border-t border-[#332216] space-y-2">
            <span className="text-[10px] text-[#e5b869] font-serif uppercase tracking-wider block font-bold">
              快速穿梭 · 直达对应洞窟或文化专题：
            </span>

            {/* Jump to Cave */}
            {selectedNode.targetCaveId && (
              <button
                onClick={() => onEnterCave(selectedNode.targetCaveId!)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#b87d3b] hover:from-[#e5b869] hover:to-[#c98c48] text-[#120d09] font-serif font-bold text-xs flex items-center justify-between shadow-md transition-all group/btn"
              >
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>
                    {language === 'zh' ? '推门漫游对应洞窟 (360° VR)' : 'Enter Associated Cave (360° VR)'}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Jump to Mural Deep Zoom */}
            {selectedNode.targetMuralId && (
              <button
                onClick={() => onEnterMural(selectedNode.targetMuralId!)}
                className="w-full py-2 px-3 rounded-xl bg-[#241a12] hover:bg-[#332418] border border-[#d4a359]/50 hover:border-[#e5b869] text-[#f5ecd9] font-serif text-xs flex items-center justify-between transition-colors group/btn2"
              >
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#e5b869]" />
                  <span>
                    {language === 'zh' ? '微距鉴赏该节点传世壁画' : 'Deep Zoom Masterpiece Mural'}
                  </span>
                </div>
                <ArrowRight className="w-3 h-3 text-[#e5b869] group-hover/btn2:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Jump to Encyclopedia Topic or Workshop */}
            {selectedNode.targetTopicId ? (
              <button
                onClick={() => onOpenEncyclopedia(selectedNode.targetTopicId)}
                className="w-full py-2 px-3 rounded-xl bg-[#1b2533]/80 hover:bg-[#203042] border border-[#4a85c8]/50 text-[#d6e5fb] font-serif text-xs flex items-center justify-between transition-colors group/btn3"
              >
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#7db5f5]" />
                  <span>
                    {language === 'zh' ? '查阅丝路学术百科考据' : 'View Scholarly Encyclopedia Topic'}
                  </span>
                </div>
                <ArrowRight className="w-3 h-3 text-[#7db5f5] group-hover/btn3:translate-x-1 transition-transform" />
              </button>
            ) : onOpenWorkshop ? (
              <button
                onClick={onOpenWorkshop}
                className="w-full py-2 px-3 rounded-xl bg-[#1d261e] hover:bg-[#273829] border border-[#4ea88c]/40 text-[#c8eedf] font-serif text-xs flex items-center justify-between transition-colors group/btn4"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#4ea88c]" />
                  <span>
                    {language === 'zh' ? '进入非遗矿彩工坊体验矿颜' : 'Enter Mineral Pigment Studio'}
                  </span>
                </div>
                <ArrowRight className="w-3 h-3 text-[#4ea88c] group-hover/btn4:translate-x-1 transition-transform" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
