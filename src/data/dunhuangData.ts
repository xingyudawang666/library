export interface Hotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: Record<string, string>;
  description: Record<string, string>;
  detailHighlight?: string;
  pigment?: string;
}

export interface Mural {
  id: string;
  caveNumber: string;
  title: Record<string, string>;
  dynasty: Record<string, string>;
  eraPeriod: string;
  category: 'jataka' | 'apsara' | 'bodhisattva' | 'caisson' | 'buddha' | 'music';
  dimensions: string;
  imageUrl: string;
  detailUrl: string;
  lineArtUrl: string;
  description: Record<string, string>;
  story: Record<string, string>;
  artisticValue: Record<string, string>;
  pigments: string[];
  hotspots: Hotspot[];
  audioGuide: {
    duration: string;
    transcripts: Record<string, string>;
  };
  featured?: boolean;
}

export interface Cave {
  id: string;
  number: string;
  name: Record<string, string>;
  dynasty: Record<string, string>;
  era: string;
  coverImage: string;
  cliffLevel: string;
  tags: string[];
  highlightMuralId: string;
  description: Record<string, string>;
  panoramaBg: string;
  wallType: 'square' | 'dome' | 'inverted-funnel' | 'great-hall';
  hotspots: {
    id: string;
    x: number; // pitch/yaw or canvas position
    y: number;
    title: Record<string, string>;
    desc: Record<string, string>;
    targetMuralId?: string;
  }[];
}

export interface EncyclopediaEntry {
  id: string;
  category: 'pigment' | 'dynasty' | 'instrument' | 'preservation' | 'figure';
  title: Record<string, string>;
  subtitle: Record<string, string>;
  summary: Record<string, string>;
  content: Record<string, string[]>;
  image: string;
  attributes?: Record<string, string>;
}

export const CAVES: Cave[] = [
  {
    id: 'cave-257',
    number: '第257窟',
    name: {
      zh: '九色鹿本生窟',
      en: 'Deer King Jātaka Cave',
      ja: '九色鹿本生窟',
      fr: 'Grotte du Cerf aux Neuf Couleurs'
    },
    dynasty: {
      zh: '北魏 (公元386-534年)',
      en: 'Northern Wei (386–534 CE)',
      ja: '北魏 (386-534年)',
      fr: 'Wei du Nord (386–534)'
    },
    era: '公元5世纪初',
    coverImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1200&auto=format&fit=crop',
    cliffLevel: '中层崖壁 · 中心塔柱窟',
    tags: ['连环画祖型', '鹿王本生', '北魏早期', '秀骨清像'],
    highlightMuralId: 'mural-deer',
    description: {
      zh: '莫高窟北魏经典中心塔柱窟。西壁中层以连环长卷形式绘制世界著名的《九色鹿经图》，色彩以土红、赭石打底，配以石青石绿，人物造型清秀修长，具西域犍陀罗与中原汉风交融之神韵。',
      en: 'A celebrated Northern Wei central-pillar cave. Features the world-renowned "Deer King Jātaka" comic-strip continuous narrative on the west wall, embodying early Buddhist morality and Silk Road cross-cultural synthesis.',
      ja: '北魏時代の代表的な中心塔柱窟。西壁には連環画形式で描かれた世界的に名高い「九色鹿経図」があり、西域のガンダーラ様式と中原の漢風が融合した美を見せています。',
      fr: 'Célèbre grotte à pilier central des Wei du Nord abritant la fresque narrative du Roi Cerf aux Neuf Couleurs, mariage sublime de l’art du Gandhara et du trait chinois.'
    },
    panoramaBg: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=2000&auto=format&fit=crop',
    wallType: 'square',
    hotspots: [
      {
        id: 'c257-h1',
        x: 35,
        y: 45,
        title: { zh: '九色鹿舍己救溺水人', en: 'Deer King Saves Drowning Man', ja: '溺れる者を救う九色鹿', fr: 'Le Cerf sauvant le noyé' },
        desc: { zh: '恒河惊涛之中，九色鹿不顾自身安危，负起溺水调达。', en: 'The sacred deer risks its life to rescue a drowning man from raging waters.', ja: '九色鹿が激流から溺れる者を救い上げる場面。', fr: 'Le cerf sacré sauvant l’homme emporté par les flots.' },
        targetMuralId: 'mural-deer'
      },
      {
        id: 'c257-h2',
        x: 68,
        y: 42,
        title: { zh: '王后梦鹿求皮角', en: 'Queen Dreams of the Deer', ja: '王妃の夢と皮角の要求', fr: 'Le songe de la reine' },
        desc: { zh: '王后贪求鹿皮华服，国王贴榜重金悬赏告密。', en: 'The queen demands robes made of the deer pelt; the king posts a bounty.', ja: '鹿皮の衣服を欲する王妃と、賞金を掲げる国王。', fr: 'La reine réclamant la peau tachetée du cerf enchanté.' },
        targetMuralId: 'mural-deer'
      },
      {
        id: 'c257-h3',
        x: 50,
        y: 18,
        title: { zh: '人字披顶仿木构天花', en: 'Gabled Timber Ceiling', ja: '人字形切妻天井', fr: 'Plafond en bâtière' },
        desc: { zh: '典型的北魏人字披结构，饰以忍冬纹和飞天。', en: 'Northern Wei gabled roof structure adorned with honeysuckle rinceaux and flying apsaras.', ja: '忍冬唐草文様と飛天で飾られた天井。', fr: 'Structure de toit à pignon ornée d’apsaras et de motifs chèvrefeuille.' }
      }
    ]
  },
  {
    id: 'cave-112',
    number: '第112窟',
    name: {
      zh: '反弹琵琶伎乐窟',
      en: 'Reverse Pipa Celestial Music Cave',
      ja: '反弾琵琶伎楽窟',
      fr: 'Grotte de la Musicienne au Pipa Inversé'
    },
    dynasty: {
      zh: '中唐 (公元781-848年)',
      en: 'Middle Tang (781–848 CE)',
      ja: '中唐 (781-848年)',
      fr: 'Tang Moyen (781–848)'
    },
    era: '公元8世纪中叶',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    cliffLevel: '下层崖壁 · 覆斗顶窟',
    tags: ['反弹琵琶', '乐舞经变', '盛唐燕乐', '兰叶描'],
    highlightMuralId: 'mural-pipa',
    description: {
      zh: '莫高窟极负盛名的中唐杰作。南壁观无量寿经变下方的“反弹琵琶”舞伎，以逆天技艺背负琵琶狂放拨弦，天衣随舞翻卷飞扬，被誉为大唐盛世音乐舞蹈艺术的不朽图腾。',
      en: 'Renowned Middle Tang masterpiece. The central dancer on the south wall plays the pipa behind her back while leaping, ribbon shawls twirling with dynamic vitality — the pinnacle of Tang dynasty choreography.',
      ja: '中唐期の不朽の傑作。南壁の観無量寿経変の下に描かれた舞妓は、琵琶を背中に回して奏でながら躍動し、大唐の宮廷音楽舞踊の極致を象徴しています。',
      fr: 'Chef-d’œuvre absolu des Tang moyens. La danseuse céleste joue du luth pipa derrière son dos, symbolisant l’apogée des arts chorégraphiques de la Route de la Soie.'
    },
    panoramaBg: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop',
    wallType: 'inverted-funnel',
    hotspots: [
      {
        id: 'c112-h1',
        x: 52,
        y: 50,
        title: { zh: '反弹琵琶舞伎神韵', en: 'Reverse Pipa Dancer', ja: '反弾琵琶の舞姿', fr: 'La Danseuse au Pipa' },
        desc: { zh: '双脚腾空踏步，反臂弹弦，眼神内敛含蓄，尽显盛唐雍容。', en: 'Suspended in mid-air rhythm, plucking strings behind her back with poise.', ja: '宙に舞い、背中で弦を弾く優美な姿。', fr: 'En apesanteur dans sa rotation virtuose.' },
        targetMuralId: 'mural-pipa'
      },
      {
        id: 'c112-h2',
        x: 32,
        y: 48,
        title: { zh: '极乐伎乐合奏乐队', en: 'Celestial Orchestra', ja: '天界の宮廷楽団', fr: 'L’Orchestre Céleste' },
        desc: { zh: '左侧乐伎演奏排箫、笙、阮咸，乐器刻画精美如实物。', en: 'Musicians playing paixiao flute, mouth organ sheng, and ruan lute in tight harmony.', ja: '排簫や笙、阮を奏でる天界の奏者たち。', fr: 'Musiciens jouant flûte de pan, sheng et luth ruan.' }
      }
    ]
  },
  {
    id: 'cave-407',
    number: '第407窟',
    name: {
      zh: '三兔飞天藻井窟',
      en: 'Three Hares & Flying Apsaras Caisson Cave',
      ja: '三兎飛天藻井窟',
      fr: 'Grotte du Plafond des Trois Lièvres'
    },
    dynasty: {
      zh: '隋代 (公元581-618年)',
      en: 'Sui Dynasty (581–618 CE)',
      ja: '隋代 (581-618年)',
      fr: 'Dynastie Sui (581–618)'
    },
    era: '公元6世纪末',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    cliffLevel: '中层崖壁 · 覆斗顶藻井',
    tags: ['三兔共耳', '视觉错觉', '八身飞天', '丝路密码'],
    highlightMuralId: 'mural-threehares',
    description: {
      zh: '隋代经典覆斗顶窟。窟顶正中的“三兔共耳”藻井，三只玉兔首尾相接追逐奔跑，共用三只耳朵却各具双耳视觉效果，外围飞天手捧鲜花凌空翱翔，天花花瓣层叠，几何韵律玄妙绝伦。',
      en: 'Features the world-famous "Three Hares Sharing Three Ears" caisson ceiling. Three hares chase each other around a central lotus, each appearing to have two ears while only three ears are drawn, surrounded by floating celestial apsaras.',
      ja: '隋代の覆斗天井窟。天井中心の「三兎共耳」藻井は、3羽の兎が円を描いて駆け巡り、3つの耳を共有して各々2本の耳に見える幾何学的奇跡。周囲を飛天が舞い散ります。',
      fr: 'Plafond à caisson mondialement célèbre des « Trois Lièvres ». Reliés par trois oreilles partagées tournoyant autour d’un lotus central ceint d’apsaras célestes.'
    },
    panoramaBg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop',
    wallType: 'inverted-funnel',
    hotspots: [
      {
        id: 'c407-h1',
        x: 50,
        y: 25,
        title: { zh: '三兔共耳几何中心', en: 'Three Hares Circular Center', ja: '三兎共耳の中心蓮華', fr: 'Le Mystère des Trois Lièvres' },
        desc: { zh: '三只兔子只画了三只耳朵，两两共用一只，在圆环中永恒奔逐。', en: 'Optical enigma: three rabbits sharing three ears in an eternal cosmic loop.', ja: '互いに耳を共有しながら走り続ける神秘の図像。', fr: 'Illusion optique ancestrale d’harmonie cyclique.' },
        targetMuralId: 'mural-threehares'
      },
      {
        id: 'c407-h2',
        x: 48,
        y: 38,
        title: { zh: '逆时针飞舞的八身飞天', en: 'Eight Flying Apsaras in Motion', ja: '逆回りに舞う八身の飛天', fr: 'Les Huit Apsaras Tournoyantes' },
        desc: { zh: '天衣与飘带顺应风势流转，与兔子奔跑方向呼应，极富动感。', en: 'Eight apsaras flying counter-clockwise, harmonizing with the rotational momentum of the hares.', ja: '風になびく天衣が兎の走る方向と共鸣して躍動。', fr: 'Les étoffes flottent dans le sens giratoire.' }
      }
    ]
  },
  {
    id: 'cave-57',
    number: '第57窟',
    name: {
      zh: '美人窟 · 观世音菩萨',
      en: 'The "Beauty Cave" Bodhisattva',
      ja: '美人窟 · 観音菩薩',
      fr: 'Grotte de la Beauté · Bodhisattva Guanyin'
    },
    dynasty: {
      zh: '初唐 (公元618-704年)',
      en: 'Early Tang (618–704 CE)',
      ja: '初唐 (618-704年)',
      fr: 'Tang Primitifs (618–704)'
    },
    era: '公元7世纪初',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    cliffLevel: '南区中层 · 方形平顶窟',
    tags: ['莫高美人', '沥粉贴金', '初唐贵妇仪态', '慈悲圣容'],
    highlightMuralId: 'mural-beauty',
    description: {
      zh: '因南壁观世音菩萨像华贵端庄、肌若凝脂而被誉为“美人窟”。沥粉贴金头冠、细弯柳眉、朱唇微启，金箔在烛光映照下熠熠生辉，展现了盛唐前夕东方美学对女性神圣柔美的最高赞歌。',
      en: 'Known as the "Mogao Cave of Beauties" for its breathtaking Avalokitesvara Bodhisattva on the south wall. Features intricate raised gold leaf (Lifèn Tiējīn) headwear, willow eyebrows, and compassionate ethereal grace.',
      ja: '「美人窟」と讃えられる名窟。南壁の観音菩薩は、瀝粉貼金の冠、透き通るような白肌、優美な伏し目で東洋の究極美を体現しています。',
      fr: 'Surnommée « Grotte de la Beauté » pour son Bodhisattva Avalokitesvara aux dorures en relief et au regard d’une infinie compassion.'
    },
    panoramaBg: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2000&auto=format&fit=crop',
    wallType: 'square',
    hotspots: [
      {
        id: 'c57-h1',
        x: 46,
        y: 42,
        title: { zh: '沥粉贴金菩萨金冠', en: 'Raised Gold Leaf Filigree Crown', ja: '瀝粉貼金の宝冠', fr: 'Couronne d’or repoussé' },
        desc: { zh: '工匠以矿物泥堆出立体纹理，再敷贴纯金箔，千年仍闪烁辉光。', en: 'Raised plaster mineral relief overlaid with pure gold leaf, still gleaming after 1,400 years.', ja: '立体的な泥盛り技法に金箔を貼った永遠の輝き。', fr: 'Technique magistrale de plâtre en relief et feuilles d’or pur.' },
        targetMuralId: 'mural-beauty'
      }
    ]
  },
  {
    id: 'cave-96',
    number: '第96窟',
    name: {
      zh: '九层楼北大佛窟',
      en: 'Nine-Storey Pagoda Colossal Buddha',
      ja: '九層楼北大仏窟',
      fr: 'Pagode à Neuf Étages du Grand Bouddha'
    },
    dynasty: {
      zh: '盛唐 / 武周 (公元695年)',
      en: 'High Tang / Wu Zetian (695 CE)',
      ja: '盛唐 / 武周 (695年)',
      fr: 'Tang Florissants (695)'
    },
    era: '公元695年 (武周延载二年)',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    cliffLevel: '标志性中轴核心 · 35.5米石胎泥塑',
    tags: ['九层飞檐红色楼阁', '全国第三大佛', '武则天时期', '施无畏印'],
    highlightMuralId: 'mural-buddha',
    description: {
      zh: '莫高窟标志性建筑九层楼所依附的巨型洞窟。窟内供奉高达35.5米的弥勒倚坐大佛，为全国第三大石胎泥塑坐佛。依山崖依窟凿塑，气宇轩昂，雄视沙海，代表盛唐磅礴自信的帝国气度。',
      en: 'The architectural symbol of Mogao Grottoes, sheltering the 35.5-meter seated Maitreya Buddha. Sculpted directly against the cliff face, it radiates imperial majesty from Empress Wu Zetian’s golden age.',
      ja: '敦煌莫高窟のシンボルである九層の赤い楼閣に収まる大仏窟。高さ35.5メートルの弥勒大仏が鎮座し、盛唐の壮大な威容を誇ります。',
      fr: 'Symbole emblématique de Mogao : la pagode rouge à neuf étages abritant le colossal Bouddha Maitreya de 35,5 mètres.'
    },
    panoramaBg: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2000&auto=format&fit=crop',
    wallType: 'great-hall',
    hotspots: [
      {
        id: 'c96-h1',
        x: 50,
        y: 40,
        title: { zh: '弥勒大佛与施无畏印', en: 'Maitreya Hand of Fearlessness', ja: '施無畏印を結ぶ大仏の御手', fr: 'Mudra de l’Absence de Crainte' },
        desc: { zh: '右手上扬作施无畏印，掌心饱满，抚慰大漠千年风霜。', en: 'The right hand raised in the Abhaya Mudra, offering solace and protection across the ages.', ja: '民衆の恐れを取り除く慈悲の印相。', fr: 'La main droite levée bénissant les pèlerins de la Route de la Soie.' }
      }
    ]
  },
  {
    id: 'cave-158',
    number: '第158窟',
    name: {
      zh: '中唐涅槃卧佛巨窟',
      en: 'Reclining Buddha Nirvana Cave',
      ja: '涅槃臥仏窟',
      fr: 'Grotte du Bouddha Couché au Nirvana'
    },
    dynasty: {
      zh: '中唐 (公元781-848年)',
      en: 'Middle Tang (781–848 CE)',
      ja: '中唐',
      fr: 'Tang Moyen'
    },
    era: '公元8世纪末',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    cliffLevel: '南区中层 · 巨型长方形横卷窟',
    tags: ['长15.8米卧佛', '安详涅槃', '各国王子举哀图', '吐蕃统治期'],
    highlightMuralId: 'mural-deer',
    description: {
      zh: '莫高窟规模最大、艺术造诣最高的涅槃窟。窟内横卧长达15.8米的彩塑释迦牟尼涅槃像，右胁而卧，神态宁静如水。后壁绘各国王子与弟子痛不欲生的举哀图，各民族服饰真实生动，反映了古代丝路万国咸集的史实。',
      en: 'The premier Nirvana cave at Mogao, housing a 15.8-meter reclining Buddha sculpture in serene repose. The back wall depicts mourning foreign kings and disciples from Persia, Sogdiana, and Tibet.',
      ja: '莫高窟最大の涅槃窟。15.8メートルに及ぶ巨大な釈迦涅槃像が横たわり、背後の壁には悲しみに暮れる世界各国の王子たちが描かれています。',
      fr: 'La plus majestueuse crypte du Nirvana, abritant un Bouddha couché de 15,8 mètres entouré de princes endeuillés de toute l’Asie.'
    },
    panoramaBg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    wallType: 'great-hall',
    hotspots: [
      {
        id: 'c158-h1',
        x: 50,
        y: 45,
        title: { zh: '15.8米彩塑卧佛恬淡法相', en: 'Serene 15.8m Nirvana Buddha', ja: '15.8m涅槃仏の静寂', fr: 'Le visage paisible du Bouddha' },
        desc: { zh: '双目微阖，面容安详，宛若在甜美的梦乡中沉思宇宙真理。', en: 'Eyes half-closed with timeless tranquility.', ja: '苦を離れ永遠の安らぎに入られたお姿。', fr: 'Une sérénité absolue défiant la mort.' }
      }
    ]
  },
  {
    id: 'cave-17',
    number: '第17窟',
    name: {
      zh: '藏经洞 · 万卷遗书密室',
      en: 'The Library Cave (Cave 17)',
      ja: '蔵経洞',
      fr: 'Grotte des Manuscrits'
    },
    dynasty: {
      zh: '晚唐 / 五代 (公元851年凿建，11世纪封存)',
      en: 'Late Tang (851 CE, sealed 11th c.)',
      ja: '晩唐 / 11世紀封印',
      fr: 'Tang Tardifs'
    },
    era: '公元851年开凿',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1200&auto=format&fit=crop',
    cliffLevel: '北区低层 · 附于第16窟甬道右壁',
    tags: ['6万卷珍罕写本', '洪辩高僧影堂', '世界记忆遗产', '1900年王道士发现'],
    highlightMuralId: 'mural-deer',
    description: {
      zh: '世界文化史上举世震撼的考古圣地。原为晚唐河西都僧统洪辩法师的影堂，11世纪初封存了4世纪至11世纪的历代经卷文书、绢画、丝织品达6万余件，1900年被王圆箓道士偶然发现，催生了举世闻名的“敦煌学”。',
      en: 'The sacred chamber that birthed global Dunhuangology. Sealed in the early 11th century with over 60,000 manuscripts and silk paintings, rediscovered by Daoist Wang Yuanlu in 1900.',
      ja: '世界の学術史を揺るがした聖地。6万点余りの古文書や絵画が秘匿され、1900年に王道士によって発見されました。',
      fr: 'Le sanctuaire secret qui donna naissance à la Dunhuangologie mondiale, renfermant 60 000 manuscrits ancestraux.'
    },
    panoramaBg: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2000&auto=format&fit=crop',
    wallType: 'square',
    hotspots: [
      {
        id: 'c17-h1',
        x: 48,
        y: 42,
        title: { zh: '洪辩法师真容彩塑', en: 'Statue of Master Hongbian', ja: '洪弁高僧像', fr: 'Statue du moine Hongbian' },
        desc: { zh: '端坐禅床，骨骼清奇，神情深邃，展现晚唐高僧的坚毅与睿智。', en: 'Realistic portrait sculpture of monk Hongbian seated in meditation.', ja: '晩唐の写実彫刻の傑作。', fr: 'Portrait sculpté d’un réalisme frappant.' }
      }
    ]
  }
];

export const MURALS: Mural[] = [
  {
    id: 'mural-deer',
    caveNumber: '第257窟',
    title: {
      zh: '九色鹿本生图 (鹿王本生)',
      en: 'Deer King Jātaka (Nine-Colored Deer)',
      ja: '九色鹿本生図',
      fr: 'Jātaka du Roi Cerf aux Neuf Couleurs'
    },
    dynasty: {
      zh: '北魏 (公元386-534年)',
      en: 'Northern Wei (386–534 CE)',
      ja: '北魏',
      fr: 'Wei du Nord'
    },
    eraPeriod: '公元5世纪',
    category: 'jataka',
    dimensions: '高 96 cm × 长 385 cm',
    imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1600&auto=format&fit=crop',
    detailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1600&auto=format&fit=crop',
    lineArtUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
    description: {
      zh: '本图是敦煌壁画中最家喻户晓的连环故事杰作。画面采用横卷式构图，叙事自两端向中心展开：九色鹿舍身救起溺水商人调达，调达发誓永不泄密；然而当国王悬赏鹿皮时，调达背信弃义带兵入山围猎。九色鹿从容向国王控诉调达的不义，国王大受震撼降旨庇护神鹿，背信者浑身生疮落水受惩。',
      en: 'The most celebrated continuous narrative mural in Dunhuang. Painted from both ends moving inward toward the dramatic climax: The Nine-Colored Deer saves a drowning man who vows eternal secrecy, only to betray the deer for royal gold. The deer confronts the king with moral righteousness, winning eternal sanctuary while the traitor is punished.',
      ja: '敦煌壁画で最も親しまれている連環物語画。溺れる調達を救った美しい鹿と、国王の報奨金に目がくらみ裏切った男の因果応報を、左右両端から中央へと向かう独自の絵巻構図で活写しています。',
      fr: 'Le chef-d’œuvre narratif le plus universel de Dunhuang. Une composition bilatérale où le cerf immaculé dénonce la trahison devant le roi bienveillant.'
    },
    story: {
      zh: '释迦牟尼佛前世为九色灵鹿，毛发如雪，角白如玉，常游于恒河水畔。见人溺水呼号，九色鹿不顾险阻渡水救援。溺水者调达叩头谢恩，誓死保密。后来王后梦见九色鹿想制成大衣，国王悬赏重金分半江山。调达利欲熏心入宫告密引兵搜捕。九色鹿被围时临危不乱，向国王陈情始末。国王悔悟下令凡伤神鹿者诛九族。调达立时浑身流脓恶臭落水而亡。',
      en: 'In a past life, the Buddha was born as the Nine-Colored Deer living near the Ganges. When he rescued a drowning merchant named Tiaoda, the man promised silence. Later, the queen coveted the deer’s radiant pelt. Blinded by greed, Tiaoda led the royal army to the forest. The deer boldly approached the king and exposed the betrayal. Deeply moved, the king declared the deer protected by imperial decree.',
      ja: '釈迦の前世である九色鹿は、激流で溺れかけた調達を救う。しかし王妃が鹿の毛皮を求めた際、調達は恩を忘れて密告。軍勢に囲まれた九色鹿は恐れることなく国王に真実を語り、恥じ入った国王は鹿を保護。裏切り者の調达は業報を受けて身を滅ぼした。',
      fr: 'Dans une vie antérieure, Bouddha s’était réincarné en un cerf aux neuf teintes éclatantes. Sauvé par le cerf, un homme jure fidélité avant de le dénoncer pour la récompense royale. Devant le roi, la noble créature rappelle la sainteté de la promesse humaine.'
    },
    artisticValue: {
      zh: '北魏壁画艺术的巅峰。人物与鹿均采用西域“凹凸法”（铁线描与晕染）刻画，土红底色历经千百年氧化形成沉静质感。画面左右推进、中间聚焦的叙事节奏，比现代蒙太奇手法早诞生一千余年。',
      en: 'A pinnacle of Northern Wei painting. Utilizing Western Region chiaroscuro and iron-wire line drawing. The centripetal narrative composition predated modern cinematic montage by over a millennium.',
      ja: '北魏仏教絵画の最高峰。立体感を生む暈染技法と中原の流麗な鉄線描が融合。映画のモンタージュを1000年以上先取りした劇的な構成美を誇ります。',
      fr: 'Une merveille de la technique dite « fer et fil », où le rouge ocre minéral et les dégradés confèrent une modernité cinématographique saisissante.'
    },
    pigments: ['赭石 (Ochre)', '朱砂 (Cinnabar)', '石青 (Lapis Lazuli)', '石绿 (Malachite)', '铅白 (White Lead)'],
    hotspots: [
      {
        id: 'hs-deer-1',
        x: 48,
        y: 44,
        title: { zh: '九色神鹿之威严站姿', en: 'The Majestic Stand of the Deer', ja: '気高き神鹿の立ち姿', fr: 'La posture majestueuse du cerf' },
        description: { zh: '九色鹿昂首挺胸，鹿角如珊瑚琼枝，毫无惧色地直视国王，显现超拔的神性与道德正义。', en: 'Standing fearless before arrows, antlers branching like coral, personifying divine integrity.', ja: '矢を番える国王の軍勢の前で、堂々と正義を問う凛々しい姿。', fr: 'Tête haute et ramure semblable à du corail blanc, défiant les archers.' },
        pigment: '矿物白垩与铅白'
      },
      {
        id: 'hs-deer-2',
        x: 82,
        y: 52,
        title: { zh: '溺水者调达跪谢恩情', en: 'Tiaoda Kneeling in Gratitude', ja: '救われ膝まずく調達', fr: 'L’homme prosterné en serment' },
        description: { zh: '被救出恒河的调达跪倒在地，双手合十发誓，与后文的背信弃义形成极其鲜明讽刺的对比。', en: 'Pledging eternal loyalty upon being saved from the torrent — a tragic prologue to betrayal.', ja: '命を救われ、決して秘密を漏らさないと合掌して誓う調達。', fr: 'Prosterné devant son bienfaiteur dans un serment bientôt trahi.' }
      },
      {
        id: 'hs-deer-3',
        x: 18,
        y: 48,
        title: { zh: '国王听闻陈情的顿悟', en: 'The King’s Epiphany', ja: '真実を知る国王の驚嘆', fr: 'L’illumination du roi' },
        description: { zh: '身着北魏鲜卑胡服的国王勒住缰绳，神情从追捕猎物的贪婪转变为对神鹿教诲的肃然起敬。', en: 'Mounted on horseback in Xianbei attire, the king reigns in his troops, struck with awe.', ja: '狩猟服を身にまとった国王が、鹿の徳の高さに胸を打たれる瞬間。', fr: 'Le monarque ordonnant l’arrêt immédiat de la traque.' }
      }
    ],
    audioGuide: {
      duration: '03:45',
      transcripts: {
        zh: '各位朋友，现在我们正在凝视的是莫高窟第257窟的《九色鹿本生图》。这是一幅创作于公元5世纪北魏时期的连环壁画。画家并没有采用单向的时间轴，而是巧妙地将故事的高潮——九色鹿与国王对峙陈情的场面置于中央。你仔细看九色鹿那双清澈的大眼和舒展的鹿角，它使用的是来自西域鸣沙山矿物的天然石色，哪怕时光流逝了1600年，依然散发着宁静而摄人心魄的道德光辉……',
        en: 'Welcome. You are gazing upon the Deer King Jātaka from Cave 257, crafted in the 5th century during the Northern Wei dynasty. Notice how the painter placed the climactic confrontation right in the center. The pigments you see — natural ochre, cinnabar, and lapis lazuli — still radiate moral purity after sixteen centuries of desert silence.',
        ja: '皆様、第257窟に描かれた「九色鹿本生図」へようこそ。西暦5世紀、北魏の絵師が遺したこの連環画は、恩を仇で返した人間の業と、それを許し諭す神鹿の徳を語りかけています。1600年の砂塵を越えて届く、東洋倫理の不滅の光をお聴きください。',
        fr: 'Bienvenue dans la Grotte 257. Devant vous se déploie la célèbre fresque du Cerf aux Neuf Couleurs peinte au Ve siècle. Admirez la noblesse du trait minéral et la composition spatiale qui transcende le temps pour nous parler de fidélité et d’honneur.'
      }
    },
    featured: true
  },
  {
    id: 'mural-pipa',
    caveNumber: '第112窟',
    title: {
      zh: '反弹琵琶伎乐图 (观无量寿经变)',
      en: 'Playing Pipa Behind the Back (Rebirth in Pure Land)',
      ja: '反弾琵琶伎楽図',
      fr: 'La Danseuse au Pipa Inversé'
    },
    dynasty: {
      zh: '中唐 (公元781-848年)',
      en: 'Middle Tang (781–848 CE)',
      ja: '中唐',
      fr: 'Tang Moyen'
    },
    eraPeriod: '公元8世纪',
    category: 'music',
    dimensions: '高 82 cm × 宽 65 cm (局部)',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop',
    detailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop',
    lineArtUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200&auto=format&fit=crop',
    description: {
      zh: '敦煌壁画舞姿艺术的无上极品。舞伎半裸上身，双臂环抱琵琶置于颈背之后，侧身抬右腿屈膝腾空，赤足踏于锦筵之上。五色飘带宛若波涛凌空翻飞，把盛唐丝绸之路乐舞文化的浪漫热烈与高超绝技凝固在千年岩壁之中。',
      en: 'The indisputable apex of Dunhuang dance iconography. The dancer arches her body, fingers plucking the four-stringed pipa held behind her neck while leaping with dynamic poise. Ribbons trail like surging wind, capturing the festive splendor of the Silk Road golden age.',
      ja: '敦煌舞踊壁画の最高傑作。裸身の舞妓が琵琶を首の後ろへ回して弦を弾き、片足を跳ね上げて蓮華の筵の上を軽やかに躍動。大唐帝国の爛漫たる宮廷音楽舞踊の精華がここに凝縮されています。',
      fr: 'Le summum de l’art chorégraphique des Tang. La danseuse céleste fait tournoyer son luth à quatre cordes dans son dos avec une cambrure époustouflante, dans un envol de soieries sacrées.'
    },
    story: {
      zh: '盛唐时期，长安作为世界文化中心，西域胡旋舞、胡腾舞与中原宫廷燕乐高度融合。第112窟的乐舞场面再现了净土极乐世界诸天伎乐齐鸣的盛况。反弹琵琶是当时琵琶演奏家与宫廷顶尖舞者的炫技绝活，唐代诗人岑参曾赞誉：“凉州七里十万家，胡人半解弹琵琶”。',
      en: 'During the Tang Dynasty, Chang’an absorbed Persian, Sogdian, and Central Asian dance movements. The reverse pipa maneuver was an extraordinary feat combining virtuosic musicianship and extreme contortion. Tang poets marveled at how Silk Road rhythms set the whole empire dancing.',
      ja: '大唐の都・長安ではソグドやペルシャ渡来の「胡旋舞」が大流行しました。背中で琵琶を弾きながら踊るこの至高の技は、仏教の極楽浄土の歓喜を地上のあらゆる民族が分かち合う象徴でした。',
      fr: 'À l’époque Tang, Chang’an vibrait au son des danses sogdiennes et persanes. Ce mouvement de pipa inversé était une prouesse physique et musicale réservée aux plus grands artistes impériaux.'
    },
    artisticValue: {
      zh: '线描艺术的登峰造极之作。画家运用“兰叶描”与“莼菜条描”，线条刚柔相济，转折圆润有力。人物肌肉线条丰润饱满，天衣飘带富有强烈的空间穿透力与节奏韵律，开创了东方舞蹈美学的新范式。',
      en: 'Pinnacle of "Orchid Leaf" and "Water Shield" Chinese brush line techniques. The swirling drapery implies continuous circular velocity, establishing an iconic aesthetic monument of world dance history.',
      ja: '「蘭葉描」と呼ばれる筆法により、天衣のしなやかさと肉体の躍動感が完璧に調和。静止した壁画でありながら、音楽の拍子と風の音が聴こえてくるかのような生命力に満ちています。',
      fr: 'Une maîtrise absolue du trait au pinceau où l’élasticité des muscles et la légèreté des soies évoquent la fugacité d’une note suspendue dans l’éternité.'
    },
    pigments: ['朱砂 (Cinnabar)', '石青 (Lapis Lazuli)', '泥金 (Gold Leaf)', '赭石 (Ochre)', '石绿 (Malachite)'],
    hotspots: [
      {
        id: 'hs-pipa-1',
        x: 52,
        y: 35,
        title: { zh: '反背勾弦手势细节', en: 'Fingering the Reverse Pipa', ja: '背後で弦を弾く指先', fr: 'Le doigté sur le pipa inversé' },
        description: { zh: '舞伎纤纤玉指轻捻琴弦，左手反扣琴柄，右手后扬拨弦，指法与乐理完全吻合。', en: 'Slender fingers delicately pluck the silk strings in anatomically and musically precise fingering.', ja: '指先の細やかな関節まで正確に描写された驚異的な指使い。', fr: 'La précision musicale du pincement des cordes derrière la nuque.' },
        pigment: '朱砂勾线与泥金贴箔'
      },
      {
        id: 'hs-pipa-2',
        x: 64,
        y: 65,
        title: { zh: '腾空盘旋之赤足', en: 'Barefoot Floating Stride', ja: '宙に舞う素足', fr: 'Le pied nu en suspension' },
        description: { zh: '右腿屈起悬空，脚趾微微翘起，展现出极强的弹跳力与重心控制，似踏云海。', en: 'The hooked bare foot demonstrates extreme acrobatic core control and rhythmic elevation.', ja: '蓮の敷物の上で瞬時に飛び跳ねる、軽やかな足運び。', fr: 'La grâce aérienne du pied soulevé sur le tapis de lotus.' }
      },
      {
        id: 'hs-pipa-3',
        x: 36,
        y: 50,
        title: { zh: '回旋流光之天衣飘带', en: 'Dynamic Silk Cascades', ja: '渦巻く天衣の飛沫', fr: 'Le tourbillon des étoffes célestes' },
        description: { zh: '两道翠绿与朱红交织的长帔顺着身体旋转甩出大S形弧线，使二维画面呈现出强烈的3D空间感。', en: 'Two-tone silk scarves wrap the dancer in a centrifugal spiral, injecting 3D spatial velocity.', ja: '鮮やかな朱と緑の帯が、舞の回転に合わせて美しいS字を描く。', fr: 'Les rubans vermillon et émeraude matérialisant le souffle de la rotation.' }
      }
    ],
    audioGuide: {
      duration: '04:12',
      transcripts: {
        zh: '如果你曾去过丝绸之路，你一定见过反弹琵琶的剪影。她就诞生在这里——莫高窟第112窟南壁。请闭上双眼想象一下：在遥远的唐代洞窟里，摇曳的烛光照亮了金箔与朱砂。舞伎脚尖轻点，一个迅疾的旋转，右手已经把四弦琵琶背过肩头。琵琶声如珍珠落玉盘，天衣飘带像大漠狂风一样腾空卷起。这不仅仅是一幅画，这是大唐盛世对自由与炽热生命的颂歌……',
        en: 'If you have ever traveled the Silk Road, you have seen this silhouette. She was born right here in Cave 112. Picture the 8th-century chamber illuminated by flickering butter lamps: the dancer leaps, spins, and sends her four-stringed pipa behind her neck, fingers cascading over the strings like pearls dropping on jade.',
        ja: 'シルクロードの象徴、反弾琵琶の舞姫です。第112窟の薄暗い洞窟に灯明が揺れる中、舞妓は一瞬の旋回とともに琵琶を背中に回しました。指先からこぼれる調べと、天衣が巻き起こす風。大唐帝国が誇る自由と生命の歓喜が、ここに永遠に封じ込められています。',
        fr: 'Fermez les yeux et imaginez une lueur de bougie dans la pénombre de la grotte 112 au VIIIe siècle. La danseuse virevolte, le pipa bascule derrière sa nuque, et ses doigts égrainent une mélodie céleste comme une pluie de perles sur le jade.'
      }
    },
    featured: true
  },
  {
    id: 'mural-threehares',
    caveNumber: '第407窟',
    title: {
      zh: '三兔共耳飞天藻井图',
      en: 'Three Hares & Flying Apsaras Caisson',
      ja: '三兎共耳飛天藻井図',
      fr: 'Plafond des Trois Lièvres et Apsaras'
    },
    dynasty: {
      zh: '隋代 (公元581-618年)',
      en: 'Sui Dynasty (581–618 CE)',
      ja: '隋代',
      fr: 'Dynastie Sui'
    },
    eraPeriod: '公元6世纪末',
    category: 'caisson',
    dimensions: '藻井内框 168 cm × 168 cm',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    detailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop',
    lineArtUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    description: {
      zh: '莫高窟藻井艺术的千古奇观。藻井中心绘八瓣大莲花，莲心画三只兔子相互追逐，巧妙借用几何错觉，仅画三只耳朵却使每只兔子看起来都有一双长耳。四周八身飞天逆向翱翔撒花，四角配以流云与几何边饰，象征宇宙循环不息与日月共生。',
      en: 'An immortal enigma of ancient optics and sacred geometry. At the center of an eight-petaled lotus, three hares race in an eternal circle. With pure genius, the artist painted only three ears, yet each hare visually possesses two. Around them, eight apsaras scatter blossoms through swirling celestial currents.',
      ja: '古代の幾何学と仏教宇宙観が生んだ奇跡の天井画。八弁の蓮華の中を3羽の白兎が駆け巡ります。耳は3本しか描かれていないにもかかわらず、どの兎も2本の耳を持っているように見える驚異の錯視デザイン。周囲を8体の飛天が花を散らしながら旋回します。',
      fr: 'Une énigme optique et spirituelle de la Route de la Soie. Trois lièvres partagent trois oreilles au cœur d’un lotus à huit pétales, encerclés par huit apsaras semant des pétales célestes.'
    },
    story: {
      zh: '“三兔共耳”不仅在莫高窟多个洞窟（如第305、406窟）中出现，而且在波斯金属器、埃及织物、乃至中世纪欧洲英国和德国的天主教教堂建筑中亦有跨欧亚大陆的广泛流传！学者考证这一图腾沿着丝绸之路从敦煌向西传播，成为欧亚文化大交流的“世界密码”。兔子在东方代表月亮与长生，在佛教代表释迦牟尼舍身救人的菩萨化身。',
      en: 'The "Three Hares" motif is a true Silk Road mystery: identical designs appear in Persian metalwork, Egyptian textiles, and across medieval European cathedrals in Devon and Germany. Originating along the Silk Road, it represents time, celestial renewal, and Buddhist compassion.',
      ja: '三兎共耳の文様は敦煌にとどまらず、ペルシャの青銅器やエジプトの染織、さらには中世ヨーロッパの寺院建築にまでシルクロードを通じて伝播した「世界の謎」です。ウサギは月と不死、そして自らを薪に捧げた慈悲の菩薩の象徴でもあります。',
      fr: 'Ce motif mystique a voyagé de Dunhuang jusqu’aux cathédrales médiévales de France, d’Angleterre et d’Allemagne le long de la Route de la Soie, symbole d’éternité et de renaissance cosmique.'
    },
    artisticValue: {
      zh: '隋代绘画由质朴走向华丽的枢纽之作。莲花花瓣层叠舒展，青金石的石青与石绿相互映衬，外层飞天随风穿梭，线条圆转自如，极大地提升了仰视洞窟顶部的空间深邃感与动感体验。',
      en: 'A bridge between archaic simplicity and Tang exuberance. Mineral lapis and malachite create chromatic depth, while the counter-clockwise apsaras generate an illusion of celestial ascension.',
      ja: '隋代から初唐への美意識の変遷を象徴する作品。鉱物顔料の鮮やかな青と緑の階調が、天井を見上げる観る者を天界の深淵へと引き込みます。',
      fr: 'Une transition magistrale vers l’opulence des Tang. Les tons lapis-lazuli et malachite créent un vertige ascendant vers la voûte céleste.'
    },
    pigments: ['石青 (Lapis Lazuli)', '石绿 (Malachite)', '铅丹 (Minium)', '土黄 (Yellow Ochre)', '炭黑 (Carbon Black)'],
    hotspots: [
      {
        id: 'hs-hares-1',
        x: 50,
        y: 50,
        title: { zh: '三兔三耳视觉错觉核心', en: 'The Optical Hare Triangle', ja: '三羽で三つの耳の錯視構造', fr: 'L’illusion des trois oreilles' },
        description: { zh: '正中央三只兔子成等边三角形旋转，任何一只兔子的左耳同时是前一只的右耳，极简而充满哲学隐喻。', en: 'Triangular symmetry where every single ear serves two adjacent hares simultaneously.', ja: '隣り合う2羽が1本の耳を共有することで成立する、究極の幾何学的錯視。', fr: 'Chaque oreille appartient simultanément à deux lièvres consécutifs.' },
        pigment: '矿物石青与赭石'
      },
      {
        id: 'hs-hares-2',
        x: 32,
        y: 28,
        title: { zh: '散花飞天回翔云海', en: 'Apsaras Scattering Lotus Petals', ja: '散花する飛天の舞', fr: 'L’apsara semant les fleurs' },
        description: { zh: '飞天两腿向后屈起，双手高托莲花果盘，花瓣在空中逆风翻滚飘零。', en: 'Flying apsara holding a platter of blossoms, drapery sweeping across starry clouds.', ja: '両手を掲げて蓮の花びらを撒き散らす飛天の流麗なライン。', fr: 'Tenant un plateau de pétales divins emportés par le vent.' }
      }
    ],
    audioGuide: {
      duration: '03:50',
      transcripts: {
        zh: '抬头仰望，你正置身于隋代第407窟的覆斗顶之下。正中心盛开的一朵八瓣大莲花里，三只兔子正永远追逐着彼此。请仔细数数它们的耳朵——只有三只！但当你单独注视任何一只兔子时，它都拥有一双完整的长耳。不仅如此，当你顺时针看兔子时，外围的八身飞天却在逆时针飞翔，这种顺逆相对的视觉冲击，仿佛让整个穹顶都旋转了起来……',
        en: 'Look up toward the caisson apex of Cave 407. Three hares chase one another in an infinite loop inside the lotus center. Count the ears: only three! Yet each rabbit appears whole. Outside the lotus, eight celestial beings swirl counter-clockwise, creating an optical vortex that seems to spin the entire cosmos.',
        ja: '見上げてください。隋代第407窟の天井に咲く巨大な蓮の花です。中央で三羽の兎が追いかけっこをしています。耳の数を数えてみてください。不思議なことに、たった3本しかありません。外側を舞う飛天と相まって、洞窟の天井全体が静かに回り続けているかのような錯覚を覚えます。',
        fr: 'Levez les yeux vers la voûte en pyramide tronquée de la grotte 407. Au cœur du grand lotus, trois lièvres se poursuivent sans fin. Comptez les oreilles : trois seulement ! Pourtant chacune en possède deux aux yeux de l’observateur attentif.'
      }
    },
    featured: true
  },
  {
    id: 'mural-beauty',
    caveNumber: '第57窟',
    title: {
      zh: '观世音菩萨像 (莫高美人窟)',
      en: 'The Bodhisattva of Cave 57 ("Cave of Beauties")',
      ja: '観世音菩薩像 (美人窟)',
      fr: 'Le Bodhisattva de la Compassion (Grotte de la Beauté)'
    },
    dynasty: {
      zh: '初唐 (公元618-704年)',
      en: 'Early Tang (618–704 CE)',
      ja: '初唐',
      fr: 'Tang Primitifs'
    },
    eraPeriod: '公元7世纪',
    category: 'bodhisattva',
    dimensions: '高 145 cm × 宽 60 cm',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop',
    detailUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1600&auto=format&fit=crop',
    lineArtUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200&auto=format&fit=crop',
    description: {
      zh: '初唐人物画的冠冕之作。菩萨面如满月，双眉如初月修长，双目微垂下视，神情安详恬静。头戴贴金七宝花冠，身披红绿相映天衣，颈佩璎珞项圈，腕套玉钏金镯。肌肤施以细腻的白粉与淡红晕染，吹弹可破，展现了由神性向人性温情转化的艺术高峰。',
      en: 'The quintessential masterpiece of Early Tang portraiture. Standing with serene, downcast eyes and a moon-like face, adorned with raised gold filigree crowns, jade bangles, and pearl necklaces. The pale, lifelike complexion marked a historical shift from austere divinity to tender, humanistic beauty.',
      ja: '初唐期における仏教肖像画の最高峰。満月のような面立ち、優しく伏せられた切れ長の瞳、瀝粉貼金で細工されたきらびやかな宝冠。神々しさの中に人間の慈母のような温もりを宿し、訪れる人々を魅了し続けています。',
      fr: 'Le joyau absolu de la peinture des Tang primitifs. Un visage rond comme la pleine lune, couronné de parures d’or étincelantes et nimbé d’une bienveillance maternelle.'
    },
    story: {
      zh: '在初唐贞观至高宗时期，大唐国力蒸蒸日上，佛教造像逐渐褪去北朝的消瘦清峻（“秀骨清像”），转向丰满健美、雍容华贵的仕女风貌。第57窟的画师将当时长安最时尚的贵妇妆容与头饰巧妙融入了菩萨画作中，既是佛门大慈大悲的具象化，也是大唐盛世女性自信与雍容风韵的历史镜像。',
      en: 'During the early Tang golden age, Buddhist figures shed the ascetic thinness of the Northern Wei and adopted the luxuriant, graceful poise of Chang’an noblewomen. The artist harmonized sacred compassion with the pinnacle of cosmopolitan court elegance.',
      ja: '唐の国力が頂点に向かう頃、仏像の表現はそれまでの厳格な痩身から、豊満で気品に満ちた姿へと進化しました。当時の長安の貴婦人の化粧や装飾品を取り入れたこの観音像は、大唐文化の爛熟を今に伝えています。',
      fr: 'Reflet de l’opulence de Chang’an sous l’empereur Taizong, cette figure marie la sacralité bouddhique aux standards de beauté de la cour impériale.'
    },
    artisticValue: {
      zh: '沥粉贴金技艺的集大成者。画师用矿物白粉调胶，装在细管中挤出立体线纹，再覆以金箔并用玛瑙打磨，历经千年依然金光璀璨。面部晕染采用“天竺遗法”，层层敷色，呈现白里透红的细腻肤质。',
      en: 'A textbook example of the Lifèn Tiējīn technique: mineral paste piped through fine cones to create relief outlines before pure gold leaf application, creating gleaming jewelry that catches the candlelight.',
      ja: '泥盛りした立体的な線に本金箔を貼る「瀝粉貼金」の極致。薄暗い洞窟の中で蝋燭の火を反射し、永遠の輝きを放ちます。',
      fr: 'Une technique de dorure en relief saisissante qui s’anime sous le vacillement des flammes de suif de la crypte.'
    },
    pigments: ['泥金 (Pure Gold Leaf)', '朱砂 (Cinnabar)', '铅白 (White Lead)', '石绿 (Malachite)', '石青 (Lapis Lazuli)'],
    hotspots: [
      {
        id: 'hs-beauty-1',
        x: 48,
        y: 25,
        title: { zh: '沥粉贴金化佛宝冠', en: 'Gold Relief Transformation Buddha Crown', ja: '瀝粉貼金の化仏宝冠', fr: 'Diadème doré au Bouddha d’émanation' },
        description: { zh: '宝冠中央塑有一尊小化佛，周围缠绕珍珠玉串与金叶，金箔在强光下反光耀眼。', en: 'Tiny transformation Buddha seated within the relief gold filigree crown draped in seed pearls.', ja: '宝冠の中央に座す小化仏と、周囲を彩る精緻な金細工。', fr: 'Le petit Bouddha d’émanation enchâssé au cœur de la résille d’or.' },
        pigment: '纯金箔与沥粉'
      },
      {
        id: 'hs-beauty-2',
        x: 52,
        y: 40,
        title: { zh: '秀美如玉的面容与微启朱唇', en: 'Porcelain Complexion & Gentle Lips', ja: '白磁のような肌と紅を差した唇', fr: 'Le teint de nacre et les lèvres carmin' },
        description: { zh: '敷粉晕染出的鹅蛋脸庞，鼻梁笔直，两片朱唇点染红丹，流露出沉静微笑。', en: 'Delicate rouge blush on porcelain white lead skin, smiling with eternal transcendental calm.', ja: '幾重にも重ねられた鉱物顔料による、透き通るような肌のグラデーション。', fr: 'Un dégradé subtil de fard vermillon sur une carnation d’albâtre.' }
      }
    ],
    audioGuide: {
      duration: '03:30',
      transcripts: {
        zh: '当你第一眼看到第57窟南壁的这位观音菩萨时，你或许会屏住呼吸。她被常书鸿先生等老一辈敦煌学者爱称为“莫高美人”。看她的眼神，微垂的眼帘中满含母性的慈悲与洞察；再看她的头冠，工匠用细管挤出立体纹样，再贴上一层层纯金箔，在千年前的油灯下闪烁如繁星。她不仅是神，更是盛唐对美、对生命最深情的礼赞……',
        en: 'You might gasp when your gaze first meets the Bodhisattva of Cave 57. Affectionately nicknamed the "Mogao Beauty" by generations of scholars, her downcast eyes radiate a motherly gentleness. Notice the raised gold relief on her crown, glittering like constellations under ancient candlelight.',
        ja: '第57窟の観音菩薩の前に立つと、思わず息を呑むことでしょう。「敦煌のモナリザ」とも称されるこの像は、慈愛に満ちた眼差しで私たちを見つめています。金箔を惜しみなく使った宝冠の輝きと、絹のように滑らかな白い肌。大唐の美の粋がここに宿っています。',
        fr: 'Un frisson vous saisit devant cette figure que les conservateurs surnomment « La Joconde de Mogao ». Sa couronne d’or pur sculptée en relief capte chaque lueur, tandis que son regard dispense une paix absolue.'
      }
    },
    featured: true
  },
  {
    id: 'mural-buddha',
    caveNumber: '第96窟',
    title: {
      zh: '弥勒大佛与北大佛巨窟',
      en: 'Maitreya Colossal Buddha of Cave 96',
      ja: '弥勒大仏と九層楼',
      fr: 'Le Colosse de Maitreya de la Pagode Rouge'
    },
    dynasty: {
      zh: '盛唐 / 武周 (公元695年)',
      en: 'High Tang (695 CE)',
      ja: '盛唐',
      fr: 'Tang Florissants'
    },
    eraPeriod: '公元695年',
    category: 'buddha',
    dimensions: '坐高 35.5 米',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    detailUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=1600&auto=format&fit=crop',
    lineArtUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1200&auto=format&fit=crop',
    description: {
      zh: '莫高窟第一大佛，全国第三大石胎泥塑坐佛。大佛依鸣沙山东麓断崖开凿，倚坐于悬崖之内，高35.5米。面部饱满庄重，双耳垂肩，右手施无畏印，左手扶膝，外部依崖修建了著名的九层飞檐红色楼阁，成为敦煌乃至整个丝绸之路的世界级地理地标。',
      en: 'The largest Buddha at Mogao, standing 35.5 meters tall. Carved into the sandstone cliff under Empress Wu Zetian, seated with right hand in the Abhaya Mudra (dispelling fear). Encased within the iconic nine-tiered crimson pavilion towering over the dunes.',
      ja: '莫高窟最大の巨仏で、高さは35.5メートル。崖の断崖をくり抜いて造立された弥勒菩薩の倚坐像で、右手を挙げて民衆の恐れを除く「施無畏印」を結んでいます。赤い九層楼が外壁を覆い、敦煌の象徴となっています。',
      fr: 'Le géant de Mogao s’élevant à 35,5 mètres sous le règne de l’impératrice Wu Zetian. Abrité dans la majestueuse pagode vermillon adossée aux falaises de sable.'
    },
    story: {
      zh: '公元695年（武周延载二年），禅师灵隐与阴祖在此开凿北大佛。武则天称帝时期大力提倡弥勒信仰，将弥勒降世救济苍生与自己的政权合法性紧密联系。开凿大佛需要削平数十米岩壁，千百工匠悬挂在绳索上凌空凿石、敷泥彩绘，历时数载方成此惊世壮举。',
      en: 'Constructed in 695 CE under the patronage of Empress Wu Zetian, who championed Maitreya prophecies to legitimize her reign. Hundreds of artisans dangled from hemp ropes along the sheer 40-meter cliff, carving the sandstone matrix before applying layers of riverbed silt and mineral paint.',
      ja: '西暦695年、武則天の治世に開削された北大仏。弥勒下生の信仰を背景に、国家の繁栄と民衆の安寧を願って造られました。垂直の断崖から何百人もの石工が身を乗り出して削り出した奇跡の仏像です。',
      fr: 'Édifié sous le règne de l’impératrice Wu Zetian pour célébrer la venue du Bouddha du Futur. Des centaines d’ouvriers suspendus aux falaises ont sculpté le grès tendre avant de le draper de stuc peint.'
    },
    artisticValue: {
      zh: '大佛比例雄伟而严谨，从底部仰视时视角修正精准，既不显畸变，又令人自然产生对佛陀智慧与博大胸怀的敬仰之情。外建九层楼木结构飞檐历经各代重修，体现了中国古代木构建筑与崖壁石窟的完美融合。',
      en: 'Remarkable optical foreshortening perspective: viewed from ground level, the head and torso proportions are subtly exaggerated so the colossus gazes directly into the pilgrim’s heart without optical distortion.',
      ja: '見上げる参拝者の視線を計算し尽くした遠近法が施されており、足元から仰ぎ見ても不自然な歪みを感じさせません。中国木造楼閣と石窟が見事に調和した建築美です。',
      fr: 'Une correction optique ingénieuse qui donne au fidèle l’impression que le géant penche doucement la tête vers lui dans un geste de pardon éternel.'
    },
    pigments: ['赭石 (Ochre)', '朱红 (Vermilion)', '青金石 (Lapis Lazuli)', '白云石 (Dolomite)'],
    hotspots: [
      {
        id: 'hs-buddha-1',
        x: 48,
        y: 20,
        title: { zh: '弥勒大佛慈悲法相', en: 'The Face of Maitreya', ja: '弥勒大仏の慈顔', fr: 'Le visage bienveillant de Maitreya' },
        description: { zh: '双眉修长入鬓，双目微睁俯视众生，嘴角含一丝若有若无的睿智微笑。', en: 'Eyes half-opened, looking downward across the desert floor with universal compassion.', ja: '衆生を静かに見下ろす、深遠な慈愛に満ちた表情。', fr: 'Regard mi-clos tourné vers les pèlerins traversant le désert de Gobi.' }
      },
      {
        id: 'hs-buddha-2',
        x: 42,
        y: 55,
        title: { zh: '巨型施无畏印法手', en: 'Colossal Abhaya Hand', ja: '巨大な施無畏印の手掌', fr: 'La main colossale de la protection' },
        description: { zh: '右手手掌高达数米，线条圆润饱满，指节分明，象征驱散世间一切恐惧与灾厄。', en: 'The right palm raised several meters high, dispelling all fear and worldly tribulation.', ja: '恐れを取り除き安らぎを与える、力強くも柔らかな手のひら。', fr: 'Une paume de plusieurs mètres symbolisant la délivrance de toute angoisse terrestre.' }
      }
    ],
    audioGuide: {
      duration: '04:00',
      transcripts: {
        zh: '当你走出幽暗的狭道，一抬头，三十五米高的弥勒大佛正端坐在九层楼的深窟中静静俯瞰着你。请注意大佛的右手，那叫“施无畏印”。在大漠风沙刮了千年的戈壁滩上，古代跋涉数千里九死一生的驼队商人和僧侣，在看到这尊大佛的一瞬间，心中的恐惧与疲惫便烟消云散了……',
        en: 'Step out of the narrow corridor, and suddenly you are dwarfed by the 35-meter Colossal Buddha seated inside the cliffs of Mount Mingsha. His right hand forms the Abhaya Mudra, the gesture of fearlessness. For weary Silk Road travelers battling ruthless desert storms, this sight meant safe harbor.',
        ja: '狭い回廊を抜けると、目の前に35メートルの北大仏が圧倒的な存在感で現れます。右手の「施無畏印」は、恐れることはないと語りかけています。過酷なタクラマカン砂漠を越えてきた旅人たちは、この大仏を見上げて涙を流し、生きて辿り着けたことに感謝しました。',
        fr: 'Imaginez les caravaniers franchissant les dunes après des mois de périls : apercevoir la Pagode Rouge et pénétrer au pied de ce titan haut de trente-cinq mètres signifiait que la vie l’avait emporté sur le désert.'
      }
    },
    featured: true
  }
];

export const ENCYCLOPEDIA_ENTRIES: EncyclopediaEntry[] = [
  {
    id: 'pigment-lapis',
    category: 'pigment',
    title: { zh: '青金石 (石青) · 跨越帕米尔的深蓝', en: 'Lapis Lazuli (Ultramarine Blue)', ja: '青金石 (ラピスラズリ)', fr: 'Lapis-lazuli (Bleu Outremer)' },
    subtitle: { zh: '阿富汗巴达赫尚矿脉的奇迹', en: 'From the Mines of Badakhshan', ja: 'バダフシャーン鉱山からの至宝', fr: 'Le trésor des mines de Badakhshan' },
    summary: {
      zh: '敦煌壁画中最贵重的天然矿物颜料之一。来自数千公里外阿富汗巴达赫尚山脉，硬度高，提纯极其繁琐，千年不褪色。',
      en: 'One of the most precious minerals used at Mogao, transported thousands of miles from Badakhshan. Impervious to sunlight and moisture.',
      ja: '敦煌壁画で最も高貴な青。数千キロ離れたアフガニスタンからシルクロードを渡って運ばれた不変の鉱物。',
      fr: 'Le pigment le plus noble des grottes, convoyé depuis les montagnes afghanes et éclatant d’une vivacité inaltérable.'
    },
    content: {
      zh: [
        '成分与产地：主要成分为含硫的硅酸钠铝矿物（Na8-10Al6Si6O24S2-4）。中国境内并不出产宝石级青金石，敦煌莫高窟使用的青金石几乎全部通过丝绸之路驼队从今阿富汗东北部巴达赫尚省输入。',
        '艺术应用：主要用于佛陀的肉髻螺发、菩萨天衣裙边、天宫祥云及藻井花心。其深邃神秘的湛蓝，象征着佛教宇宙中神圣的琉璃界。',
        '千古不朽之谜：与有机植物染料不同，优质矿物石青晶体化学性质极其稳定，即使历经戈壁风沙氧化上千年，依旧保持着如星空般的宝石光芒。'
      ],
      en: [
        'Origin & Trade: Transported along ancient caravan trails across the Pamir knot from northeastern Afghanistan.',
        'Sacred Symbolism: Applied to the Buddha’s hair ushnisha, celestial garments, and pure land skies.',
        'Durability: Resistant to UV light and alkaline wall reactions, retaining crystal brilliance for over 1,500 years.'
      ],
      ja: [
        '産地と交易：パミール高原を越えてアフガニスタンから輸入された最高級の鉱物顔料。',
        '宗教的象徴：仏の螺髪や天界の空を描くために惜しみなく使われ、極楽浄土の荘厳さを表しました。',
        '耐久性：光や風化に極めて強く、現代でも鮮やかなコバルトブルーを放ち続けています。'
      ],
      fr: [
        'Commerce de la Soie : Acheminé depuis l’Hindu Kush par les caravanes marchandes.',
        'Emploi Sacré : Réservé aux chevelures bouddhiques et aux ciels du Paradis d’Amitabha.',
        'Résistance Éternelle : Sa composition minérale cristalline brave l’oxydation des siècles.'
      ]
    },
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    attributes: {
      '化学成分': 'Na8[AlSiO4]6(SO4,S,Cl)2',
      '古代产地': '阿富汗巴达赫尚 (Badakhshan)',
      '代表窟号': '第257窟、第407窟、第112窟',
      '颜料特性': '耐光、抗碱、色泽深邃永恒'
    }
  },
  {
    id: 'pigment-cinnabar',
    category: 'pigment',
    title: { zh: '朱砂与铅丹 · 岁月的色彩嬗变', en: 'Cinnabar & Minium Red', ja: '朱砂と鉛丹', fr: 'Cinabre et Minium' },
    subtitle: { zh: '红颜黑变中的化学秘密', en: 'The Alchemy of Pigment Transformation', ja: '赤から黒への変色の科学', fr: 'La métamorphose chromatique' },
    summary: {
      zh: '为什么早期敦煌壁画的人物皮肤很多变成了黑褐色？这源于含铅、汞矿物颜料在千年光线与潮气中的化学氧化过程。',
      en: 'Why do early Dunhuang figures have dark, coffee-colored skin? This is caused by the light-induced photo-oxidation of lead and mercury pigments.',
      ja: '初期の壁画の人物の肌がなぜ黒ずんでいるのか？鉛や水銀を含む顔料が千年の歳月で酸化したためです。',
      fr: 'Le mystère des visages noirs des dynasties primitives : une oxydation photochimique fascinante du minium de plomb.'
    },
    content: {
      zh: [
        '变色之谜：十六国与北朝洞窟中，许多原本粉嫩白皙的人物面容与肌体如今呈现暗棕色或铅灰色。这是因为画师调配肉色时大量使用了“铅丹（四氧化三铅 Pb3O4）”与“白铅粉”。在自然界微量硫化气体、光照与湿气作用下，二氧化铅（黑色 PbO2）生成，从而造成了逆向“晒黑”。',
        '朱砂的尊崇：与铅丹不同，真正的天然矿物硫化汞（HgS）朱砂稳定性更高，主要用来勾勒佛唇、璎珞与华丽背光。朱砂在中原古代不仅是上乘颜料，亦被视为驱邪祈福的灵石。',
        '现代保护科技：敦煌研究院通过高光谱成像、多光谱扫描与拉曼光谱分析，已成功在计算机中无损还原出1600年前壁画初绘时的粉润面容！'
      ],
      en: [
        'Chemical Oxidation: Lead red (Pb3O4) converts to dark lead dioxide (PbO2) under humidity and photochemical exposure.',
        'Cinnabar Durability: Pure mercuric sulfide (HgS) cinnabar retains radiant scarlet hue when sheltered from light.',
        'Digital Restoration: Modern Dunhuang researchers use Raman spectroscopy to calculate and restore original skin tones.'
      ],
      ja: [
        '変色の秘密：鉛丹が二酸化鉛へと酸化することにより、肌の色が黒褐色へと変化しました。',
        '朱砂の気高さ：天然の硫化水銀である朱砂は、仏の唇や宝冠の輪郭線に今も鮮やかに残っています。',
        'デジタル修復：敦煌研究院の最先端スペクトル解析により、創建当時の白い肌が蘇っています。'
      ],
      fr: [
        'Oxydation Minérale : Le minium orangé s’est mué au contact de l’air en dioxyde de plomb bistre.',
        'Restauration Virtuelle : L’Académie de Dunhuang utilise l’imagerie multispectrale pour retrouver les chairs d’albâtre originales.'
      ]
    },
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1200&auto=format&fit=crop',
    attributes: {
      '主要成分': '天然硫化汞 (HgS) / 四氧化三铅 (Pb3O4)',
      '化学现象': '铅丹氧化生成暗褐色二氧化铅 (PbO2)',
      '数字化应用': '多光谱无损原貌数字反演',
      '鉴赏要诀': '深沉如岁月封存，原貌白璧无瑕'
    }
  },
  {
    id: 'instrument-pipa',
    category: 'instrument',
    title: { zh: '曲项四弦琵琶 · 丝路绝响', en: 'Crooked-Neck Four-String Pipa', ja: '曲項四弦琵琶', fr: 'Luth Pipa à Manche Recourbé'
    },
    subtitle: { zh: '波斯巴尔巴特琴与华夏乐舞的融合', en: 'From Persian Barbat to Silk Road Symphony', ja: 'ペルシャから日本へ渡った胡楽の調べ', fr: 'De la Perse à Chang’an' },
    summary: {
      zh: '莫高窟壁画中共绘制了近700只琵琶！从反弹、卧抱到高举，它是丝绸之路上流传最广、地位最尊崇的弹拨乐器。',
      en: 'Over 700 pipas are depicted in Mogao murals. Tracing its lineage from Persian Barbat to Tang court marvels.',
      ja: '莫高窟の壁画には約700本もの琵琶が描かれています。正倉院の宝物とも繋がる、東西音楽融合の証。',
      fr: 'Plus de 700 représentations de luths ornent les parois de Mogao, pont mélodique entre la Perse et l’Asie orientale.'
    },
    content: {
      zh: [
        '乐器形制：唐代莫高窟壁画中的琵琶多为“曲项四弦”，琴头向后弯曲成直角，琴身呈半梨形，面板开两个月牙形音孔（凤眼）。演奏者多使用大型拨子（木拨或象牙拨）或直接以手指弹奏。',
        '反弹绝技考证：反弹琵琶是否真正存在于历史上？根据唐代文献记载与现代舞蹈家戴爱莲、敦煌舞首创者高金荣等专家的复原实践，反弹琵琶是唐代宫廷健舞（如胡旋、胡腾）高潮阶段的一项高难度炫技动作，既是真乐器演奏，亦是惊鸿之舞。',
        '正仓院珍宝印证：日本奈良正仓院至今完好保存着唐代传入的“螺钿紫檀五弦琵琶”与“枫木曲项琵琶”，其形制、花纹与莫高窟壁画中所绘如出一辙，是千年丝路文明相通的铁证。'
      ],
      en: [
        'Anatomy: Features a 90-degree bent pegbox, pear-shaped body, and two crescent soundholes.',
        'Historical Reality: Tang records and Dunhuang Academy dance masters confirm reverse plucking as an elite virtuosic finale.',
        'Global Legacy: Identical instruments survive in the Shosoin Treasury of Nara, Japan.'
      ],
      ja: [
        '構造の特徴：棹の先がほぼ直角に後ろに曲がった「曲項琵琶」。撥を使って力強く弾かれます。',
        '反弾琵琶の真実：舞踊研究者による検証により、反弾琵琶は単なる画家の空想ではなく、実在した超絶技巧の舞であることが証明されています。',
        '正倉院との絆：奈良・正倉院に収蔵される「螺鈿紫檀五弦琵琶」と瓜二つの姿が壁画に息づいています。'
      ],
      fr: [
        'Morphologie : Manche coudé à angle droit et table d’harmonie piriforme à ouïes en croissant.',
        'Témoignage Universel : Le Trésor impérial du Shōsō-in au Japon abrite encore des pièces soeurs de celles peintes à Dunhuang.'
      ]
    },
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200&auto=format&fit=crop',
    attributes: {
      '弦数形制': '四弦四相 / 曲项半梨形',
      '壁画出镜率': '莫高窟出现超 680 次，位居乐器之首',
      '相关历史名曲': '《霓裳羽衣曲》、《凉州词》、《倾杯乐》',
      '同款传世国宝': '日本正仓院藏唐代螺钿紫檀五弦琵琶'
    }
  },
  {
    id: 'figure-guardians',
    category: 'figure',
    title: { zh: '常书鸿与樊锦诗 · 莫高窟的一生守护', en: 'Guardians of Dunhuang: Chang Shuhong & Fan Jinshi', ja: '敦煌の守り人 · 常書鴻と樊錦詩', fr: 'Les Gardiens de Dunhuang' },
    subtitle: { zh: '择一事，终一生，守候大漠瑰宝', en: 'Devoting a Lifetime to the Desert Treasure', ja: '生涯をかけて莫高窟を守り抜いた魂', fr: 'Une vie dédiée au désert de Gobi' },
    summary: {
      zh: '从巴黎塞纳河畔毅然归国的“敦煌守护神”常书鸿，到扎根大漠六十载、开拓数字敦煌的“敦煌的女儿”樊锦诗。',
      en: 'From Chang Shuhong, who left Parisian salons to guard the dunes, to Fan Jinshi, who dedicated six decades to pioneering Digital Dunhuang.',
      ja: 'パリの栄華を捨て砂漠に身を捧げた常書鴻、60年間洞窟を守りデジタル化を拓いた樊錦詩の記録。',
      fr: 'L’épopée des pionniers qui ont sauvé les grottes de l’oubli et propulsé Dunhuang dans l’ère numérique.'
    },
    content: {
      zh: [
        '常书鸿的归国抉择：1935年，在巴黎画坛声名鹊起的青年画家常书鸿在塞纳河畔旧书摊偶然读到伯希和《敦煌石窟图录》，震惊于中华艺术竟有如此旷世杰作而在荒漠中风蚀倒塌。他毅然放弃巴黎的优渥生活，于1943年率队抵达荒凉风沙中的莫高窟，在无水无电的艰苦环境下成立敦煌艺术研究所，奠定了莫高窟抢救性保护的基础。',
        '樊锦诗与数字敦煌：北京大学考古专业毕业的樊锦诗，自1963年奔赴敦煌，一扎根就是一个甲子。面对壁画不可逆转的物理老化风化，她前瞻性提出“数字敦煌”构想：用毫米级高精度摄影与三维激光扫描，将壁画永久存档，让敦煌艺术跨越时空与地理限制，实现全球共享。',
        '莫高精神：坚守大漠、勇于担当、甘于奉献、开拓进取。正是几代莫高窟守护者在风沙中的孤勇坚守，才让我们今天能够透过屏幕触摸这些千年前的瑰丽文明。'
      ],
      en: [
        'Chang Shuhong’s Vision: Stumbled upon Dunhuang photographic albums in Paris; renounced fame to pioneer protective restoration in 1943.',
        'Fan Jinshi & Digital Dunhuang: Stationed in the desert for 60 years, pioneering gigapixel 3D archival digitization to preserve murals for eternity.',
        'The Mogao Spirit: Uncompromising dedication against relentless desert winds, ensuring humanity keeps this cultural oasis.'
      ],
      ja: [
        '常書鴻の決意：パリでの名声を捨て、1943年に荒涼としたゴビ砂漠へ。水も電気もない過酷な環境で研究所を創設。',
        '樊錦詩とデジタル敦煌：北京大学を卒業後、60年間にわたり莫高窟に寄り添い、壁画の超高精細デジタル化を推進。',
        '砂漠の魂：世代を超えた研究者たちの献身が、千年の美を現代の私たちへと繋いでいます。'
      ],
      fr: [
        'Chang Shuhong : Quittant la bohème parisienne pour affronter la tempête de sable en 1943.',
        'Fan Jinshi : Soixante ans de dévotion ininterrompue pour inventer le Dunhuang Virtuel en ultra-haute résolution.'
      ]
    },
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=1200&auto=format&fit=crop',
    attributes: {
      '第一任所长': '常书鸿 (1904-1994)',
      '名誉院长': '樊锦诗 (1938-至今，“敦煌的女儿”)',
      '核心贡献': '流沙清理、石窟加固、数字敦煌工程',
      '精神内核': '莫高精神：坚守大漠、甘于奉献'
    }
  }
];

export const CULTURAL_QUIZ = [
  {
    id: 'q1',
    question: {
      zh: '莫高窟第407窟著名的隋代藻井中，三只兔子一共画了几只耳朵？',
      en: 'In the famous Sui Dynasty caisson of Cave 407, how many ears are drawn for the three hares in total?',
      ja: '第407窟の有名な隋代の藻井において、3羽の兎には合計何本の耳が描かれているでしょうか？',
      fr: 'Dans le célèbre plafond de la grotte 407, combien d’oreilles au total sont dessinées pour les trois lièvres ?'
    },
    options: {
      zh: ['6只', '3只 (共用三只耳朵)', '4只', '9只'],
      en: ['6 ears', '3 ears (sharing three ears)', '4 ears', '9 ears'],
      ja: ['6本', '3本 (3羽で3本を共有)', '4本', '9本'],
      fr: ['6 oreilles', '3 oreilles (partagées)', '4 oreilles', '9 oreilles']
    },
    correctAnswer: 1,
    explanation: {
      zh: '三兔共耳藻井极具巧思地只画了3只耳朵，两两相邻共用一只，在视觉错觉中每只兔子看起来都有一双长耳！',
      en: 'The genius artist painted only 3 ears; each hare shares an ear with its neighbor, creating the optical illusion that each has two.',
      ja: '隣り合う兎同士が耳を1本ずつ共有しているため、描かれた耳はわずか3本でありながら、すべての兎に2本の耳があるように見えます。',
      fr: 'Chaque oreille est partagée par deux lièvres voisins, créant l’illusion parfaite que chacun possède deux oreilles.'
    }
  },
  {
    id: 'q2',
    question: {
      zh: '敦煌壁画中被誉为东方舞姿图腾的“反弹琵琶”，位于哪个洞窟？',
      en: 'In which Mogao cave is the iconic "Playing Pipa Behind the Back" mural located?',
      ja: '東洋舞踊の至宝と称される「反弾琵琶」の壁画がある洞窟は何番窟でしょうか？',
      fr: 'Dans quelle grotte se trouve la célèbre danseuse au luth « Pipa Inversé » ?'
    },
    options: {
      zh: ['第257窟 (九色鹿窟)', '第112窟 (中唐乐舞窟)', '第96窟 (北大佛窟)', '第17窟 (藏经洞)'],
      en: ['Cave 257 (Deer King)', 'Cave 112 (Middle Tang Music)', 'Cave 96 (Great Buddha)', 'Cave 17 (Library Cave)'],
      ja: ['第257窟 (九色鹿窟)', '第112窟 (中唐楽舞窟)', '第96窟 (北大仏窟)', '第17窟 (蔵経洞)'],
      fr: ['Grotte 257', 'Grotte 112', 'Grotte 96', 'Grotte 17']
    },
    correctAnswer: 1,
    explanation: {
      zh: '反弹琵琶舞伎绘于中唐第112窟南壁的观无量寿经变之中。',
      en: 'The reverse pipa dancer is painted on the south wall of Cave 112 from the Middle Tang dynasty.',
      ja: '第112窟の南壁に描かれた観無量寿経変の一角に描かれています。',
      fr: 'Elle figure sur la paroi sud de la grotte 112 des Tang moyens.'
    }
  },
  {
    id: 'q3',
    question: {
      zh: '早期莫高窟壁画中人物皮肤变黑变暗，主要是因为哪种矿物颜料发生了化学氧化？',
      en: 'What mineral pigment caused the darkening of skin tones in early Dunhuang murals through chemical oxidation?',
      ja: '初期の莫高窟壁画で人物の肌が黒褐色に変色した主な原因となった顔料は何でしょうか？',
      fr: 'Quel pigment minéral s’est oxydé pour noircir les chairs des peintures primitives ?'
    },
    options: {
      zh: ['含铅矿物 (铅丹/铅白氧化为二氧化铅)', '青金石 (石青)', '孔雀石 (石绿)', '纯金箔'],
      en: ['Lead minerals (Minium/Lead white turning into PbO2)', 'Lapis lazuli', 'Malachite', 'Pure gold leaf'],
      ja: ['鉛系顔料 (鉛丹・鉛白が二酸化鉛に酸化)', 'ラピスラズリ (青金石)', '孔雀石 (石緑)', '純金箔'],
      fr: ['Minéraux de plomb (minium devenant dioxyde de plomb)', 'Lapis-lazuli', 'Malachite', 'Feuille d’or']
    },
    correctAnswer: 0,
    explanation: {
      zh: '画师调制肉色使用的铅丹（Pb3O4）和铅白在空气与光线作用下转变为深褐黑色的二氧化铅（PbO2）。',
      en: 'Lead red and lead white used for fleshtones photo-oxidized over centuries into black lead dioxide (PbO2).',
      ja: '肌色に使われた鉛丹が、歳月とともに空気中の微量ガスや光によって黒い二酸化鉛へと変化しました。',
      fr: 'Le minium de plomb orangé s’est oxydé en dioxyde de plomb bistre et sombre.'
    }
  }
];

export const INITIAL_COMMENTS = [
  {
    id: 'c-1',
    muralId: 'mural-deer',
    userName: '丝路行者 · 子敬',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    titleBadge: '莫高守护学者',
    timestamp: '2小时前',
    likes: 84,
    content: '第257窟的构图堪称神迹！自两头向中间发展的叙事结构，在世界美术史上罕有其匹。九色鹿从容直面国王弓矢的瞬间，那种超越生死的神性之美，每次凝视都让人眼眶发热。'
  },
  {
    id: 'c-2',
    muralId: 'mural-pipa',
    userName: '舞乐天 · 宛儿',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    titleBadge: '飞天琵琶乐工',
    timestamp: '5小时前',
    likes: 126,
    content: '放大细节看反弹琵琶舞伎的右手食指和中指，指法是标准的“勾”与“挑”，唐代乐舞画师对真实乐器的了解精确到令人发指！天衣的S形回旋把速度感完全画活了。'
  },
  {
    id: 'c-3',
    muralId: 'mural-threehares',
    userName: 'CosmicSilk · Julien',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    titleBadge: '敦煌学探索者',
    timestamp: '1天前',
    likes: 59,
    content: 'The Three Hares motif connects Mogao directly with medieval European churches across France and England. Seeing the high-resolution caisson here feels like uncovering humanity’s shared artistic subconscious.'
  }
];
