import heroStudioImg from '../assets/images/hero_studio_portrait_1790504940485.jpg';
import spatialAudioImg from '../assets/images/project_spatial_audio_1790504954978.jpg';
import fintechSystemImg from '../assets/images/project_fintech_system_1790504964494.jpg';
import kineticTypeImg from '../assets/images/project_kinetic_type_1790504977646.jpg';
import botanicalArchiveImg from '../assets/images/project_botanical_archive_1790504989795.jpg';

export type Locale = 'zh' | 'en';
export type ProjectCategory = 'all' | 'systems' | 'spatial' | 'editorial';

export interface BilingualText {
  zh: string;
  en: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: BilingualText;
  year: string;
  client: BilingualText;
  role: BilingualText;
  duration: BilingualText;
  title: BilingualText;
  subtitle: BilingualText;
  summary: BilingualText;
  challenge: BilingualText;
  architecture: BilingualText;
  outcomeMetric: BilingualText;
  deliverables: BilingualText[];
  image: string;
  imageAlt: BilingualText;
  exifOrSpec: BilingualText;
  bentoSpan: 'wide' | 'compact' | 'panorama';
  liveUrl: string;
}

export interface CapabilityItem {
  index: string;
  title: BilingualText;
  description: BilingualText;
  deliverablesLine: BilingualText;
  metricProof: BilingualText;
}

export interface ExperienceItem {
  period: string;
  role: BilingualText;
  organization: BilingualText;
  location: BilingualText;
  impact: BilingualText;
}

export interface TestimonialItem {
  id: string;
  quote: BilingualText;
  beforeAfterOutcome: BilingualText;
  author: BilingualText;
  role: BilingualText;
  organization: BilingualText;
}

export interface EssayItem {
  id: string;
  date: string;
  readTime: BilingualText;
  topic: BilingualText;
  title: BilingualText;
  excerpt: BilingualText;
  paragraphs: BilingualText[];
}

export const HERO_IMAGE = heroStudioImg;

export const PROJECTS: ProjectItem[] = [
  {
    id: 'sonance-spatial-console',
    index: '01',
    category: 'spatial',
    categoryLabel: { zh: '空间与硬件交互', en: 'Spatial & Hardware' },
    year: '2026',
    client: { zh: 'Klangwerk 声学实验室 (苏黎世)', en: 'Klangwerk Acoustic Lab (Zurich)' },
    role: { zh: '首席产品与工业交互设计师', en: 'Lead Product & Industrial Interaction Designer' },
    duration: { zh: '7 个月 · 已量产交付', en: '7 Months · Shipped to Production' },
    title: {
      zh: 'Sonance 01 空间声学控台与波束界面',
      en: 'Sonance 01 Spatial Audio Console & Wave Interface',
    },
    subtitle: {
      zh: '将 64 声道三维声场参数转化为零延迟的铝合金触觉旋钮与高对比度电子墨水屏界面。',
      en: 'Translating 64-channel 3D acoustic parameters into tactile anodized aluminum dials and a zero-latency matte display.',
    },
    summary: {
      zh: '传统混音台在空间音频制作中存在严重的视觉过载。我们重新设计了物理阻尼旋钮与屏幕几何声波之间的映射机制，让声音工程师在不离开听音甜点区的情况下完成毫米级声像定位。',
      en: 'Traditional mixing desks create severe cognitive overload during spatial audio production. We re-engineered the mapping between variable-torque rotary encoders and real-time acoustic wave geometry.',
    },
    challenge: {
      zh: '混音师在处理杜比全景声与 Ambisonics 轨时，需要在 3 个独立显示器之间频繁切换，导致平均每次声源定位耗时超过 14 秒，且误触率高达 18%。',
      en: 'Sound engineers juggling Dolby Atmos and Ambisonics stems had to context-switch across three separate monitors, averaging 14 seconds per sound-object placement with an 18% error rate.',
    },
    architecture: {
      zh: '采用定制 120Hz 哑光微晶玻璃面板配合无刷力反馈编码器。界面摒弃拟物仪表盘，完全采用高对比度几何切面与等宽数值读数，支持中英德三语固件秒级热切换。',
      en: 'Built on a custom 120Hz etched matte display paired with brushless haptic encoders. The UI strips away skeuomorphic gauges in favor of crisp geometric cross-sections and tabular readouts.',
    },
    outcomeMetric: {
      zh: '混音师盲操定位速度提升 64%，连续 6 小时工作视觉疲劳指数下降 48%，获 2026 iF 工业交互金奖。',
      en: '+64% faster blind spatial panning in studio trials, -48% visual fatigue across 6-hour scoring sessions.',
    },
    deliverables: [
      { zh: '硬件人机工学与阻尼曲线规范', en: 'Hardware Ergonomics & Torque Curve Spec' },
      { zh: '嵌入式 120Hz WebGL 声波渲染引擎', en: 'Embedded 120Hz WebGL Wave Renderer' },
      { zh: '多语言设备固件字库与排版系统', en: 'Multilingual Firmware Typography System' },
    ],
    image: spatialAudioImg,
    imageAlt: {
      zh: '阳极氧化铝空间音频控制器与哑光声波显示屏',
      en: 'Anodized aluminum spatial audio controller and matte acoustic wave display',
    },
    exifOrSpec: {
      zh: 'CNC 6061 铝材 · 120Hz 哑光屏 · 0.4ms 触觉反馈延迟',
      en: 'CNC 6061 Aluminum · 120Hz Matte Display · 0.4ms Haptic Latency',
    },
    bentoSpan: 'wide',
    liveUrl: 'https://klangwerk-sonance.example.com',
  },
  {
    id: 'meridian-fintech-design-system',
    index: '02',
    category: 'systems',
    categoryLabel: { zh: '产品与设计系统', en: 'Product & Systems' },
    year: '2025',
    client: { zh: 'Meridian 跨境清算网络 (新加坡 / 香港)', en: 'Meridian Clearing Network (SG / HK)' },
    role: { zh: '设计系统架构师', en: 'Design Systems Architect' },
    duration: { zh: '9 个月 · 覆盖 14 个核心业务端', en: '9 Months · 14 Core Product Surfaces' },
    title: {
      zh: 'Meridian 瑞士网格金融设计系统與双语排版引擎',
      en: 'Meridian Swiss-Grid Financial System & Bilingual Type Engine',
    },
    subtitle: {
      zh: '为日均清算额 42 亿美元的机构交易平台构建严格对齐的多语种高密度数据组件库。',
      en: 'Engineering a high-density, strictly aligned multi-script component library for an institutional desk clearing $4.2B daily.',
    },
    summary: {
      zh: '针对亚太与欧美交易员同时使用繁简中文与英文界面的场景，解决了中英文混排基线偏移、表格数字跳动与高密度报价单闪烁问题。',
      en: 'Solved baseline shifts, numeric jitter, and high-density order-book flicker across Simultaneous Chinese and English trading workspaces.',
    },
    challenge: {
      zh: '原有的 14 个子系统由不同团队各自维护，中英文切换时按钮溢出率达 23%，且报价表格在每秒 60 次行情刷新下频繁触发页面重排（Reflow）。',
      en: 'Across 14 legacy sub-products, switching between Chinese and English caused a 23% label overflow rate and triggered costly layout reflows during 60fps market ticks.',
    },
    architecture: {
      zh: '建立基于 CSS 变量与光学字号补偿的双语 Token 体系：中文模式下自动微调行高 (+0.08em) 与字重对比，所有金融数值强制启用等宽表格数字 (tabular-nums)。',
      en: 'Created an optical bilingual design token pipeline that dynamically adjusts line-height (+0.08em) and tracking per script, enforcing strict tabular numerals across 92 accessible React primitives.',
    },
    outcomeMetric: {
      zh: '跨团队前端交付周期缩短 52%，双语界面零溢出，交易员大宗报单录入准确率提升至 99.94%。',
      en: '-52% frontend feature delivery time across 8 squads; 99.94% institutional order entry accuracy.',
    },
    deliverables: [
      { zh: '92 个无障碍 React + TypeScript 基础组件', en: '92 Accessible React + TypeScript Primitives' },
      { zh: '中英双语光学基线对齐规范 (Figma + CSS Tokens)', en: 'Bilingual Optical Baseline Tokens (Figma + CSS)' },
      { zh: '高频行情零重排虚拟表格架构', en: 'Zero-Reflow Virtualized Order Book Grid' },
    ],
    image: fintechSystemImg,
    imageAlt: {
      zh: '金融设计系统组件规范与瑞士网格印刷样张',
      en: 'Financial design system interface alongside printed Swiss grid typography specimens',
    },
    exifOrSpec: {
      zh: '92 核心组件 · WCAG AAA 对比度 · 60fps 行情渲染',
      en: '92 Core Primitives · WCAG AAA Contrast · 60fps Tick Rendering',
    },
    bentoSpan: 'compact',
    liveUrl: 'https://meridian-design-system.example.com',
  },
  {
    id: 'vermilion-kinetic-typography',
    index: '03',
    category: 'editorial',
    categoryLabel: { zh: '视觉与出版方向', en: 'Editorial & Brand' },
    year: '2025',
    client: { zh: '上海当代艺术文献馆 / 巴塞尔艺术书展', en: 'PSA Archive Shanghai / Art Basel Publications' },
    role: { zh: '艺术指导与生成式排版设计', en: 'Art Direction & Generative Typography' },
    duration: { zh: '4 个月 · 展览与精装出版物', en: '4 Months · Exhibition & Hardcover Monograph' },
    title: {
      zh: '《朱砂与铅字》汉字动态骨骼展览及双语文献集',
      en: 'Vermilion & Lead: Kinetic CJK Typography Exhibition & Monograph',
    },
    subtitle: {
      zh: '探索宋代刻本字口与瑞士现代主义网格在数字可变字体时代的跨文化对话。',
      en: 'Investigating the dialogue between Song Dynasty woodblock serifs and Swiss modernist grids through variable fonts.',
    },
    summary: {
      zh: '为文献展打造的生成式排版系统与 420 页中英双语精装画册。展览现场通过可变字体轴（字重、中宫、重心）实时响应观众步伐。',
      en: 'A generative editorial identity and 420-page bilingual monograph where variable font axes (weight, counters, gravity) respond in real time to gallery visitor movement.',
    },
    challenge: {
      zh: '在双语学术出版物中，中文方块字与拉丁字母的灰度密度差异极大，传统左右分栏排版常导致视觉重心严重失衡。',
      en: 'In bilingual scholarly publications, the ink density gap between CJK ideographs and Latin alphabets often destabilizes dual-column spreads.',
    },
    architecture: {
      zh: '设计了一套12栏非对称黄金比例网格，结合定制的可变衬线字库，使中文竖排引文与英文横排注释在同一页面的墨色灰度误差控制在 3% 以内。',
      en: 'Devised a 12-column asymmetric modular grid paired with optical ink-density balancing, keeping greyscale variance between Chinese and English columns under 3%.',
    },
    outcomeMetric: {
      zh: '首印 5,000 册于开展三周内售罄，入选东京 TDC 年度提名作品与纽约 Type Directors Club 馆藏。',
      en: 'First print run of 5,000 copies sold out in 3 weeks; selected for Tokyo TDC Annual Nomination.',
    },
    deliverables: [
      { zh: '420 页中英双语裸脊线装文献集', en: '420-Page Smyth-Sewn Bilingual Monograph' },
      { zh: '展厅实时可变字体互动投影装置', en: 'Real-Time Variable Font Gallery Projection' },
      { zh: '双语数字导览与在线文献检索库', en: 'Bilingual Digital Exhibition Reader' },
    ],
    image: kineticTypeImg,
    imageAlt: {
      zh: '石头展台上的动态排版展览画册与朱砂红视觉折页',
      en: 'Kinetic typography exhibition catalog resting on a stone plinth with cinnabar red accents',
    },
    exifOrSpec: {
      zh: '12 栏非对称网格 · 特种棉纸四色加专色印制 · 可变字体引擎',
      en: '12-Column Asymmetric Grid · Pantone Spot Print · Variable Font Engine',
    },
    bentoSpan: 'compact',
    liveUrl: 'https://vermilion-type-archive.example.com',
  },
  {
    id: 'herbarium-digital-archive',
    index: '04',
    category: 'editorial',
    categoryLabel: { zh: '视觉与出版方向', en: 'Editorial & Brand' },
    year: '2026',
    client: { zh: '东亚高山植物数字化联盟 (京都 / 昆明)', en: 'East Asian Alpine Herbarium Consortium (Kyoto / Kunming)' },
    role: { zh: '数字策展人与前端架构师', en: 'Digital Curator & Lead Frontend Architect' },
    duration: { zh: '6 个月 · 馆藏数字展厅与公开检索平台', en: '6 Months · Museum Installation & Open Web Archive' },
    title: {
      zh: '横断山脉高山植物标本馆：八亿像素无损检视系统',
      en: 'Hengduan Alpine Herbarium: 800-Megapixel Botanical Archive',
    },
    subtitle: {
      zh: '为跨越百年的 18,000 份珍稀植物蜡叶标本建立拉丁学名、中文正名与英文文献的沉浸式检索平台。',
      en: 'An architectural glass installation and web archive indexing 18,000 century-old botanical specimens across Latin, Chinese, and English taxonomies.',
    },
    summary: {
      zh: '通过分块金字塔瓦片渲染技术，让研究人员与公众能够在浏览器和美术馆透明OLED大屏上，以微米级清晰度观察植物叶脉与百年前采集者的手写墨迹标签。',
      en: 'Using deep-zoom pyramidal tile streaming, botanists and museum visitors inspect leaf venation and 1920s handwritten collector labels at micron fidelity.',
    },
    challenge: {
      zh: '单张标本扫描件高达 1.8GB，且每份标本涉及拉丁双名法、中国植物志中文名及英文生境记录，传统科研数据库检索响应慢且缺乏视觉美感。',
      en: 'Raw specimen scans averaged 1.8GB each with trilingual taxonomic metadata, trapped inside slow, uninspiring legacy academic databases.',
    },
    architecture: {
      zh: '构建基于 IIIF 国际图像互操作框架的 WebGL 瓦片流式查看器，实现 160ms 内首屏高清加载，并设计了静谧的编辑式分类检索界面。',
      en: 'Architected an IIIF-compliant WebGL tile viewer achieving sub-160ms first-meaningful paint alongside a serene editorial taxonomy browser.',
    },
    outcomeMetric: {
      zh: '上线首季全球植物学者跨语种检索量增长 310%，展厅观众平均单件标本驻留时长达 4 分 20 秒。',
      en: '+310% cross-lingual taxonomic queries in Q1; 4m 20s average visitor dwell time per gallery display.',
    },
    deliverables: [
      { zh: 'IIIF 8亿像素 WebGL 无损缩放检视器', en: 'IIIF 800MP WebGL Deep-Zoom Viewer' },
      { zh: '拉丁 / 中文 / 英文三语植物分类检索引擎', en: 'Trilingual Botanical Taxonomy Search Engine' },
      { zh: '展厅 65 英寸透明 OLED 触控交互终端', en: '65-inch Transparent OLED Gallery Kiosk' },
    ],
    image: botanicalArchiveImg,
    imageAlt: {
      zh: '美术馆无框玻璃显示屏上的高山植物标本数字档案装置',
      en: 'Digital botanical archive installation on a frameless architectural glass display in a gallery',
    },
    exifOrSpec: {
      zh: 'IIIF 瓦片渲染 · 18,000+ 馆藏标本 · 160ms 检索响应',
      en: 'IIIF Tile Streaming · 18,000+ Specimens · 160ms Query Latency',
    },
    bentoSpan: 'panorama',
    liveUrl: 'https://alpine-herbarium.example.com',
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    index: '01',
    title: {
      zh: '跨文化设计系统与双语排版架构',
      en: 'Cross-Cultural Design Systems & Bilingual Typography',
    },
    description: {
      zh: '针对同时服务中文与西方市场的数字产品，构建从底层 Design Tokens、中英文字体光学配比、行高自适应到 React 无障碍组件库的完整工程体系。',
      en: 'Architecting end-to-end design token pipelines, optical CJK/Latin font pairings, adaptive line-height scales, and accessible React component libraries for global products.',
    },
    deliverablesLine: {
      zh: 'Figma 架构 · CSS 变量系统 · React / TypeScript 组件库 · WCAG AA/AAA 审计',
      en: 'Figma Architecture · CSS Token Pipelines · React / TypeScript Libraries · WCAG Audits',
    },
    metricProof: {
      zh: '平均为研发团队减少 45%–55% 的多语言界面样式修复工时',
      en: 'Reduces multilingual UI layout bug-fix hours by 45%–55% across engineering squads',
    },
  },
  {
    index: '02',
    title: {
      zh: '空间计算与智能硬件触觉界面',
      en: 'Spatial Computing & Hardware Tactile Interfaces',
    },
    description: {
      zh: '连接工业设计与数字软件，为专业音频设备、精密光学仪器与车载/空间显示屏设计高帧率、低认知负荷的物理-数字融合交互体验。',
      en: 'Bridging industrial design and software by crafting high-framerate, low-cognitive-load interfaces for audio consoles, scientific instruments, and spatial displays.',
    },
    deliverablesLine: {
      zh: '物理旋钮/触控映射 · 120Hz 嵌入式界面原型 · WebGL 数据可视化 · 硬件固件字库',
      en: 'Physical-Digital Mapping · 120Hz Embedded Prototypes · WebGL Visualization · Firmware Fonts',
    },
    metricProof: {
      zh: '已助力 6 款量产硬件产品获 iF 与 Red Dot 交互设计奖项',
      en: 'Shipped across 6 mass-produced hardware instruments recognized by iF and Red Dot',
    },
  },
  {
    index: '03',
    title: {
      zh: '艺术出版、数字策展与品牌视觉叙事',
      en: 'Editorial Direction, Digital Curation & Brand Systems',
    },
    description: {
      zh: '以博物馆画册与瑞士网格的严苛标准打造品牌官网、年度报告与高留存交互叙事网页，让复杂的技术与文化内容兼具学术深度与阅读愉悦感。',
      en: 'Bringing monograph-grade editorial rigor and Swiss grid precision to flagship brand sites, digital exhibitions, and interactive annual reports.',
    },
    deliverablesLine: {
      zh: '创意指导 · 可变字体互动叙事 · 高清图像瓦片展厅 · 双语出版物设计',
      en: 'Creative Direction · Variable Font Storytelling · Deep-Zoom Galleries · Bilingual Monographs',
    },
    metricProof: {
      zh: '策展型网页平均访客有效阅读停留时长提升至 3.8 分钟以上',
      en: 'Elevates average visitor editorial reading dwell time beyond 3.8 minutes',
    },
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2023 — 2026',
    role: { zh: '创始人 & 首席设计工程师', en: 'Founder & Principal Design Engineer' },
    organization: { zh: 'Studio Lin Shen (林深设计事务所)', en: 'Studio Lin Shen' },
    location: { zh: '上海 · 苏黎世', en: 'Shanghai · Zurich' },
    impact: {
      zh: '主导 16 个跨国科技、声学硬件与文化机构的旗舰产品重塑，所有交付项目均具备完整的中英/多语种原生架构。',
      en: 'Directed 16 flagship product and hardware interface transformations across Asia and Europe with native multilingual architecture.',
    },
  },
  {
    period: '2020 — 2023',
    role: { zh: '资深设计系统负责人 (Staff Design Lead)', en: 'Staff Design Systems Lead' },
    organization: { zh: 'Chronos Financial Technologies', en: 'Chronos Financial Technologies' },
    location: { zh: '新加坡', en: 'Singapore' },
    impact: {
      zh: '从零组建 12 人设计工程团队，构建服务 800 万机构与专业投资者的多语言交易终端设计系统，组件复用率达 99.4%。',
      en: 'Built and led a 12-person Design Engineering team serving 8M+ institutional users across 5 languages with 99.4% token adoption.',
    },
  },
  {
    period: '2018 — 2020',
    role: { zh: '高级交互设计师', en: 'Senior Interaction Designer' },
    organization: { zh: 'Atelier Nord 工业与数字设计工作室', en: 'Atelier Nord Industrial & Digital' },
    location: { zh: '巴塞尔 · 柏林', en: 'Basel · Berlin' },
    impact: {
      zh: '负责精密实验仪器与欧洲当代艺术博物馆的数字导览及嵌入式触控界面设计。',
      en: 'Designed embedded touch interfaces for precision laboratory instruments and European contemporary art museums.',
    },
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'klangwerk-ceo',
    quote: {
      zh: '“林深罕见地同时精通工业人机工学、高频前端渲染与多语言排版细节。他交付的不仅是设计稿，而是可以直接烧录进硬件控台的生产级代码。”',
      en: '“Lin Shen possesses a rare command of hardware ergonomics, high-frequency rendering, and multilingual typography. He delivered production-ready interface code straight to our embedded firmware team.”',
    },
    beforeAfterOutcome: {
      zh: '改造前：64声道定位平均耗时 14 秒 · 改造后：盲操定位缩短至 5 秒内，首年硬件预订量超预期 140%',
      en: 'Before: 14s avg spatial panning · After: Under 5s tactile panning, +140% first-year hardware pre-orders',
    },
    author: { zh: 'Lukas Vance 博士', en: 'Dr. Lukas Vance' },
    role: { zh: '联合创始人兼首席声学架构师', en: 'Co-Founder & Chief Acoustic Architect' },
    organization: { zh: 'Klangwerk 声学实验室 (苏黎世)', en: 'Klangwerk Acoustic Lab, Zurich' },
  },
  {
    id: 'meridian-vp',
    quote: {
      zh: '“在林深重构我们的双语设计系统之前，每次发布新功能都要花两周修复中英文折行错位。现在 14 个交易子系统实现了毫秒级语言切换与零排版崩坏。”',
      en: '“Before Lin re-architected our bilingual design system, every release required two weeks of fixing CJK/English line-wrap bugs. Now all 14 trading surfaces switch scripts instantaneously with zero layout shift.”',
    },
    beforeAfterOutcome: {
      zh: '改造前：23% 多语言界面溢出率 · 改造后：0% 布局偏移，前端跨团队交付效率提升 52%',
      en: 'Before: 23% bilingual label overflow · After: 0% layout shift and +52% faster feature shipping',
    },
    author: { zh: '陈婉仪 (Evelyn Tan)', en: 'Evelyn Tan' },
    role: { zh: '产品工程副总裁', en: 'VP of Product Engineering' },
    organization: { zh: 'Meridian 跨境清算网络 (新加坡)', en: 'Meridian Clearing Network, Singapore' },
  },
];

export const ESSAYS: EssayItem[] = [
  {
    id: 'bilingual-optical-grid',
    date: '2026.08',
    readTime: { zh: '6 分钟阅读', en: '6 min read' },
    topic: { zh: '排版工程', en: 'Typographic Engineering' },
    title: {
      zh: '为什么中英文双语网站不能只做“字符串替换”？论光学字号与基线补偿',
      en: 'Why Bilingual Interfaces Require More Than String Swapping: Optical Scale & Baseline Math',
    },
    excerpt: {
      zh: '当拉丁字母的 x-height 遇上汉字的满框字面率，相同的 16px 字号在视觉上会产生高达 14% 的体量偏差。本文详解如何通过 CSS 自定义属性实现语言感知的排版切换。',
      en: 'When Latin x-height meets CJK ideographic density, an identical 16px font size creates a 14% visual volume disparity. Here is how we engineer script-aware CSS tokens.',
    },
    paragraphs: [
      {
        zh: '在大多数多语言 Web 应用中，开发者往往认为国际化（i18n）仅仅是维护一份 JSON 字典，把英文单词替换成中文字符串。然而，当设计师审视切换后的界面时，常常会发现原本精致的英文排版在切为中文后显得拥挤沉闷，或者原本紧凑的中文界面在切为英文后出现大量折行与留白失衡。',
        en: 'In most multilingual web applications, internationalization (i18n) is treated purely as a JSON key-value lookup. Yet designers immediately notice that a layout tuned for English looks cramped when switched to Chinese, while a layout tuned for Chinese fractures into awkward line wraps in English.',
      },
      {
        zh: '根本原因在于两种文字截然不同的几何拓扑结构：拉丁字母拥有升部（Ascender）、降部（Descender）和决定视觉大小的 x-height，行间自带天然呼吸感；而汉字呈方块字面结构，笔画密度高且没有升降部缓冲。因此，16px 的中文正文字体在视觉墨色重量上大约相当于 17.5px 的拉丁无衬线体。',
        en: 'The root cause lies in script topology: Latin alphabets rely on ascenders, descenders, and x-height that create natural interlinear breathing room. CJK characters occupy a uniform em-square with dense strokes. Consequently, 16px Chinese body text carries the visual weight of roughly 17.5px Latin sans-serif.',
      },
      {
        zh: '在我们的生产级双语设计系统中，语言切换不仅触发文本替换，还会同步更新根节点 `lang` 属性，并通过 CSS 变量自动调整三个核心维度：中文正文行高从 1.55 提升至 1.72；大标题字距从 -0.02em 放宽至 +0.01em；信息密度容器的最大阅读宽度从 68ch 动态收敛至 38em。',
        en: 'In our production bilingual systems, toggling the language updates the root `lang` attribute and recalculates three typographic variables: Chinese body line-height expands from 1.55 to 1.72; display tracking relaxes from -0.02em to +0.01em; and prose measure adjusts smoothly to preserve reading cadence.',
      },
    ],
  },
  {
    id: 'tactile-latency-budget',
    date: '2026.05',
    readTime: { zh: '5 分钟阅读', en: '5 min read' },
    topic: { zh: '硬件与交互', en: 'Hardware & Interaction' },
    title: {
      zh: '16毫秒的边界：在物理旋钮与高刷屏幕之间建立“机械真实感”',
      en: 'The 16-Millisecond Threshold: Crafting Mechanical Truth Between Rotary Dials and Screens',
    },
    excerpt: {
      zh: '为什么许多触控屏取代物理按键后会让人产生“失控感”？从声学控台开发经验出发，探讨帧率、缓动曲线与跨感官同步。',
      en: 'Why do touchscreens often feel disconnected compared to analog instruments? Lessons from engineering a 64-channel spatial audio console.',
    },
    paragraphs: [
      {
        zh: '人类手指对物理阻尼变化的感知阈值约为 5 至 10 毫秒，而视觉对屏幕图形跟随滞后的容忍极限约为 16 毫秒。当工业设备用廉价的 60Hz 网页视图包裹复杂的仪表盘动画时，旋钮转动与画面响应之间的微小撕裂就会瓦解专业用户的肌肉记忆。',
        en: 'Human fingertips detect torque changes within 5 to 10 milliseconds, while visual perception notices screen lag above 16 milliseconds. When embedded instruments wrap heavy animations inside sluggish views, the micro-disconnect shatters muscle memory.',
      },
      {
        zh: '在 Sonance 01 空间声学控台的研发中，我们砍掉了所有装饰性的发光阴影和渐变滤镜，只保留由 GPU 合成器直接驱动的几何线框与等宽数字。每一次旋钮微调都在单帧（8.3ms @ 120Hz）内完成视觉反馈，让数字屏幕真正成为金属机械结构的自然延伸。',
        en: 'While building the Sonance 01 console, we stripped away decorative blurs and drop shadows, leaving only GPU-composited geometric wireframes and tabular numerals. Every encoder tick resolves visually within 8.3ms at 120Hz.',
      },
    ],
  },
];

export const UI_DICT = {
  zh: {
    brandName: '林深 · Lin Shen',
    nav: {
      works: '精选作品',
      capabilities: '专长体系',
      experience: '履历与口碑',
      journal: '设计随笔',
      contact: '合作洽谈',
    },
    actions: {
      bookCall: '发起合作委托',
      switchToEn: '切换至英文 (EN)',
      bilingualModeOn: '双语对照：开启',
      bilingualModeOff: '双语对照',
    },
    hero: {
      kicker: '上海 · 苏黎世 — 跨文化产品设计与前端工程事务所',
      headline: '以瑞士网格精度与东方编辑美学，构建全球化数字产品与硬件交互。',
      subheadline:
        '我是林深（Lin Shen），深耕设计系统架构、空间声学硬件交互与双语出版级网页体验。致力于消除设计概念与生产级代码之间的断层。',
      primaryCta: '浏览精选案例',
      secondaryCta: '预约项目沟通',
      availability: '2026 第四季度开放 2 个定制设计工程席位',
      portraitCaption: '摄于苏黎世西区工作室 · 2026 春 · 徕卡 35mm 纪实档案',
      metrics: [
        {
          value: '42+',
          label: '款已量产全球软硬件产品',
          context: '覆盖苏黎世、新加坡、上海与东京团队',
        },
        {
          value: '1,800万+',
          label: '日均活跃界面交互触达',
          context: '横跨机构金融终端与公共数字展厅',
        },
        {
          value: '99.4%',
          label: '双语设计系统组件覆盖率',
          context: '实现中英德三语零溢出实时热切换',
        },
      ],
    },
    marquee:
      '精选案例与工程档案 · SELECTED WORKS & ARCHITECTURE · 跨文化双语设计系统 · SPATIAL & HARDWARE INTERFACES · 编辑级数字叙事 · ',
    worksSection: {
      indexLabel: '01. 精选作品与工程档案',
      heading: '跨越软件系统、精密硬件与学术出版的代表作',
      description:
        '点击任意作品卡片可打开高分辨率案例档案（支持键盘 ← → 切换与 ESC 关闭），检视挑战背景、技术架构与量化成果。',
      filters: {
        all: '全部作品 (4)',
        systems: '产品与系统 (1)',
        spatial: '空间与硬件 (1)',
        editorial: '视觉与出版 (2)',
      },
      searchPlaceholder: '搜索项目名称、客户、技术关键词...',
      clearSearch: '重置筛选',
      emptyState: '未找到匹配该关键词的项目，请尝试其他搜索词或重置筛选条件。',
      viewCaseStudy: '检视完整档案',
      clientPrefix: '委托方',
      rolePrefix: '担任角色',
    },
    capabilitiesSection: {
      indexLabel: '02. 专长体系与量化交付标准',
      heading: '从底层字库光学网格到 120Hz 生产级前端工程',
      description:
        '拒绝停留在静态画布的概念图。每一项设计决策均经过真实代码验证、多语种极端压力测试与可衡量的商业指标检验。',
      deliverablesLabel: '核心交付物',
      proofLabel: '量化验证',
    },
    experienceSection: {
      indexLabel: '03. 职业履历与合作方实证',
      heading: '八年跨国一线产品工程沉淀与客户口碑',
      timelineTitle: '核心执业履历',
      testimonialsTitle: '委托方量化实证反馈',
      copyResumeBtn: '复制中英双语履历摘要',
      copiedResumeToast: '已复制中英双语履历摘要至剪贴板',
    },
    journalSection: {
      indexLabel: '04. 设计与工程随笔',
      heading: '关于多语言排版数学、硬件交互延迟与系统架构的思考',
      readArticle: '阅读全文',
    },
    contactSection: {
      indexLabel: '05. 合作委托与直接联系',
      heading: '准备好打造兼具文化质感与工程精度的下一代产品了吗？',
      description:
        '无论您需要构建支持多语种的企业级设计系统、打磨智能硬件交互界面，还是定制出版级品牌官网，我通常会在 24 小时内使用您偏好的语言（中文或英文）回复。',
      directEmailLabel: '工作室直通邮箱',
      copyEmailBtn: '复制邮箱地址',
      copiedEmailBtn: '邮箱已复制',
      locationLabel: '常驻工作室与时区',
      locationValue: '上海 (UTC+8) · 苏黎世 (UTC+1)',
      langTipTitle: '语言设置快捷键提示',
      langTipDesc: '您随时可以点击顶部导航栏右侧的「中文 / EN」按钮，或开启「双语对照」模式，甚至按下键盘快捷键 Alt + L 秒级切换全站语言。',
      form: {
        nameLabel: '您的姓名或称呼',
        namePlaceholder: '例如：张明 / Alex Zhang',
        emailLabel: '工作邮箱',
        emailPlaceholder: 'name@company.com',
        scopeLabel: '期望合作的领域',
        scopes: [
          { id: 'system', label: '多语言设计系统与组件库架构' },
          { id: 'product', label: '核心数字产品 / 硬件界面重塑' },
          { id: 'editorial', label: '旗舰品牌官网与数字展厅定制' },
          { id: 'advisory', label: '设计工程团队顾问与工作坊' },
        ],
        budgetLabel: '预计项目周期与预算区间',
        budgets: [
          { id: 'sprint', label: '4–6 周专项冲刺 (¥120k – ¥200k / $18k – $30k)' },
          { id: 'flagship', label: '2–4 个月完整交付 (¥220k – ¥450k / $32k – $65k)' },
          { id: 'retainer', label: '长期架构顾问合作 (按季度定制)' },
        ],
        messageLabel: '项目背景与核心目标',
        messagePlaceholder: '请简述您的产品现状、目标受众语言环境以及期望达成的时间节点...',
        submitBtn: '发送项目委托简报',
        successTitle: '委托简报已成功送达工作室',
        successDesc: '感谢您的信任！林深已收到您的项目需求，将在 1 个工作日内通过邮件与您确认首次视频沟通时间。',
        resetBtn: '发送另一份简报',
      },
    },
    footer: {
      copyright: '© 2026 林深设计工程事务所 (Studio Lin Shen). 保留所有权利。',
      colophon: '本网站原生支持中英双语实时切换及双语对照检视 · 遵循 WCAG AA 无障碍标准构建',
      backToTop: '返回顶部 ↑',
    },
  },
  en: {
    brandName: 'Lin Shen · 林深',
    nav: {
      works: 'Selected Works',
      capabilities: 'Capabilities',
      experience: 'Experience & Proof',
      journal: 'Journal',
      contact: 'Contact',
    },
    actions: {
      bookCall: 'Commission Inquiry',
      switchToEn: '切换至中文 (ZH)',
      bilingualModeOn: 'Dual-Script: ON',
      bilingualModeOff: 'Dual-Script View',
    },
    hero: {
      kicker: 'Shanghai · Zurich — Cross-Cultural Design & Frontend Engineering Practice',
      headline: 'Crafting global digital products and tactile hardware interfaces with Swiss grid rigor.',
      subheadline:
        'I am Lin Shen (林深), a Principal Design Engineer specializing in multi-script design systems, spatial audio hardware interfaces, and monograph-grade web architecture.',
      primaryCta: 'Explore Selected Works',
      secondaryCta: 'Start a Project Inquiry',
      availability: '2 Commission Slots Open for Q4 2026',
      portraitCaption: 'Zurich West Studio · Spring 2026 · Leica 35mm Archival Frame',
      metrics: [
        {
          value: '42+',
          label: 'Shipped Global Hardware & Software Products',
          context: 'Across teams in Zurich, Singapore, Shanghai & Tokyo',
        },
        {
          value: '18M+',
          label: 'Daily Active Interface Sessions',
          context: 'Spanning institutional trading desks & public exhibitions',
        },
        {
          value: '99.4%',
          label: 'Bilingual Design System Adoption Rate',
          context: 'Zero-reflow runtime switching across CJK & Latin scripts',
        },
      ],
    },
    marquee:
      'SELECTED WORKS & ARCHITECTURE · 精选案例与工程档案 · BILINGUAL DESIGN SYSTEMS · 空间与硬件交互 · EDITORIAL DIGITAL CURATION · ',
    worksSection: {
      indexLabel: '01. Selected Works & Case Archives',
      heading: 'Flagship engagements across design systems, hardware instruments, and editorial archives',
      description:
        'Select any project tile to open the high-resolution archival lightbox (supports keyboard ← → navigation and ESC), detailing problem context, system architecture, and verified outcomes.',
      filters: {
        all: 'All Works (4)',
        systems: 'Product & Systems (1)',
        spatial: 'Spatial & Hardware (1)',
        editorial: 'Editorial & Brand (2)',
      },
      searchPlaceholder: 'Filter by title, client, or engineering keyword...',
      clearSearch: 'Reset Filters',
      emptyState: 'No projects match your current filter criteria. Try clearing the search query.',
      viewCaseStudy: 'Inspect Full Archive',
      clientPrefix: 'Client',
      rolePrefix: 'Role',
    },
    capabilitiesSection: {
      indexLabel: '02. Capabilities & Verified Standards',
      heading: 'From optical script grids to 120Hz production frontend architecture',
      description:
        'Moving beyond static mockups. Every design system and interface is validated in real production code, stress-tested across multiple scripts, and tied to measurable operational outcomes.',
      deliverablesLabel: 'Core Deliverables',
      proofLabel: 'Verified Impact',
    },
    experienceSection: {
      indexLabel: '03. Track Record & Client Proof',
      heading: 'Eight years of cross-continental engineering leadership and attributable outcomes',
      timelineTitle: 'Practice & Leadership Timeline',
      testimonialsTitle: 'Attributable Client Endorsements',
      copyResumeBtn: 'Copy Bilingual CV Summary',
      copiedResumeToast: 'Bilingual CV summary copied to clipboard',
    },
    journalSection: {
      indexLabel: '04. Editorial Journal & Notes',
      heading: 'Essays on bilingual typographic math, tactile latency budgets, and system architecture',
      readArticle: 'Read Full Essay',
    },
    contactSection: {
      indexLabel: '05. Commissions & Direct Contact',
      heading: 'Ready to build a product with cultural nuance and engineering precision?',
      description:
        'Whether you are scaling a multi-script enterprise design system, crafting an embedded hardware interface, or commissioning an editorial flagship site, I respond within 24 hours in English or Chinese.',
      directEmailLabel: 'Direct Studio Dispatch',
      copyEmailBtn: 'Copy Email Address',
      copiedEmailBtn: 'Email Copied',
      locationLabel: 'Studio Bases & Timezones',
      locationValue: 'Shanghai (UTC+8) · Zurich (UTC+1)',
      langTipTitle: 'Language Switching Shortcut',
      langTipDesc: 'You can switch between Chinese (中文) and English (EN), toggle the Side-by-Side Dual-Script mode in the top bar, or press Alt + L anytime.',
      form: {
        nameLabel: 'Your Name',
        namePlaceholder: 'e.g., Alex Zhang / 张明',
        emailLabel: 'Work Email',
        emailPlaceholder: 'name@company.com',
        scopeLabel: 'Engagement Scope',
        scopes: [
          { id: 'system', label: 'Multi-Script Design System & Component Library' },
          { id: 'product', label: 'Core Product / Hardware Interface Architecture' },
          { id: 'editorial', label: 'Flagship Editorial Website & Digital Exhibition' },
          { id: 'advisory', label: 'Design Engineering Advisory & Team Workshop' },
        ],
        budgetLabel: 'Estimated Timeline & Investment',
        budgets: [
          { id: 'sprint', label: '4–6 Week Focused Sprint ($18k – $30k / ¥120k – ¥200k)' },
          { id: 'flagship', label: '2–4 Month Flagship Delivery ($32k – $65k / ¥220k – ¥450k)' },
          { id: 'retainer', label: 'Quarterly Principal Advisory Retainer' },
        ],
        messageLabel: 'Project Context & Objectives',
        messagePlaceholder: 'Briefly describe your product, target markets/languages, and desired launch window...',
        submitBtn: 'Dispatch Commission Brief',
        successTitle: 'Commission Brief Received',
        successDesc: 'Thank you for reaching out. Lin Shen has received your project brief and will reply within 1 business day to schedule an introductory call.',
        resetBtn: 'Send Another Inquiry',
      },
    },
    footer: {
      copyright: '© 2026 Studio Lin Shen (林深设计工程事务所). All rights reserved.',
      colophon: 'Engineered with native Chinese/English runtime switching & Dual-Script comparison · WCAG AA Compliant',
      backToTop: 'Back to Top ↑',
    },
  },
};
