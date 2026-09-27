/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  Search,
  Copy,
  Check,
  Globe,
  Columns,
} from 'lucide-react';
import {
  Locale,
  ProjectCategory,
  HERO_IMAGE,
  PROJECTS,
  CAPABILITIES,
  EXPERIENCES,
  TESTIMONIALS,
  ESSAYS,
  UI_DICT,
  ProjectItem,
  EssayItem,
} from './i18n/PortfolioData';
import { ResilientImage } from './components/ResilientImage';
import { LightboxModal } from './components/LightboxModal';
import { EssayModal } from './components/EssayModal';

export default function App() {
  // 1. Language state with localStorage persistence
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem('portfolio_locale');
      if (saved === 'en' || saved === 'zh') return saved;
    } catch {
      // Ignore storage errors in restricted environments
    }
    return 'zh';
  });

  // Optional Dual-Script (Side-by-Side Chinese + English) reading mode
  const [dualScript, setDualScript] = useState<boolean>(false);

  // Filter & Search state for Selected Works
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active modals
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeEssay, setActiveEssay] = useState<EssayItem | null>(null);

  // Clipboard & Toast feedback
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedResume, setCopiedResume] = useState<boolean>(false);
  const [langToast, setLangToast] = useState<string | null>(null);

  // Commission Inquiry Form State
  const [formName, setFormName] = useState<string>('');
  const [formEmail, setFormEmail] = useState<string>('');
  const [formScope, setFormScope] = useState<string>('system');
  const [formBudget, setFormBudget] = useState<string>('flagship');
  const [formMessage, setFormMessage] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const dict = UI_DICT[locale];
  const secondaryLocale: Locale = locale === 'zh' ? 'en' : 'zh';

  // Sync HTML lang attribute and localStorage
  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    document.title =
      locale === 'zh'
        ? '林深 Lin Shen — 跨文化产品设计与前端工程作品集'
        : 'Lin Shen — Bilingual Design & Engineering Portfolio';
    try {
      localStorage.setItem('portfolio_locale', locale);
    } catch {
      // Ignore storage errors
    }
  }, [locale]);

  // Keyboard shortcut Alt + L to toggle language anytime
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        handleLanguageChange(locale === 'zh' ? 'en' : 'zh');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [locale]);

  const handleLanguageChange = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    setLocale(nextLocale);
    setLangToast(
      nextLocale === 'zh'
        ? '已切换为简体中文界面 (快捷键 Alt + L)'
        : 'Switched to English Interface (Shortcut Alt + L)'
    );
  };

  useEffect(() => {
    if (!langToast) return;
    const timer = setTimeout(() => setLangToast(null), 2400);
    return () => clearTimeout(timer);
  }, [langToast]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === 'all' || project.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        project.title.zh.toLowerCase().includes(q) ||
        project.title.en.toLowerCase().includes(q) ||
        project.client.zh.toLowerCase().includes(q) ||
        project.client.en.toLowerCase().includes(q) ||
        project.subtitle.zh.toLowerCase().includes(q) ||
        project.subtitle.en.toLowerCase().includes(q) ||
        project.exifOrSpec.zh.toLowerCase().includes(q) ||
        project.exifOrSpec.en.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('linshen@studio-linshen.ch');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyResume = () => {
    const summaryText =
      locale === 'zh'
        ? '林深 (Lin Shen) — 首席设计工程师 | 上海 · 苏黎世 | 8年跨国产品与硬件界面经验，主导42+款量产软硬件产品与双语设计系统 (linshen@studio-linshen.ch)'
        : 'Lin Shen (林深) — Principal Design Engineer | Shanghai · Zurich | 8+ years building multi-script design systems & tactile hardware interfaces across 42+ shipped products (linshen@studio-linshen.ch)';
    navigator.clipboard?.writeText(summaryText);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2400);
  };

  const handleInquireFromProject = (projectTitle: string) => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    setFormMessage(
      locale === 'zh'
        ? `您好林深，我对《${projectTitle}》案例中的架构与设计非常感兴趣，希望探讨类似的合作项目：`
        : `Hi Lin, I was impressed by the "${projectTitle}" case archive and would love to discuss a similar engagement:`
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;
    setFormSubmitted(true);
  };

  const activeProject: ProjectItem | null =
    activeProjectIndex !== null ? PROJECTS[activeProjectIndex] : null;

  return (
    <div id="top" className="min-h-screen bg-[#F4F4F0] text-[#121212] selection:bg-[#E11D48] selection:text-white">
      {/* Subtle Floating Toast for Language Switch */}
      {langToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-40 bg-[#121212] text-[#F4F4F0] px-4 py-2.5 rounded-xl shadow-lg border border-[#27272A] text-xs font-medium flex items-center gap-2 transition-opacity duration-150"
        >
          <Globe className="w-3.5 h-3.5 text-[#E11D48]" />
          <span>{langToast}</span>
        </div>
      )}

      {/* =====================================================================
          TOP BAR CONTRACT: Strict 1-Row, 3-Zone Header
          Zone 1: Single text element wordmark
          Zone 2: 5 single-line text navigation links
          Zone 3: Bilingual language switcher + Primary CTA
      ====================================================================== */}
      <header className="sticky top-0 z-30 bg-[#F4F4F0]/95 backdrop-blur-md border-b border-[#E4E4E0]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-xl font-editorial font-normal tracking-tight text-[#121212] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
          >
            {dict.brandName}
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav
            aria-label={locale === 'zh' ? '主导航' : 'Primary Navigation'}
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#52525B]"
          >
            <a
              href="#works"
              className="hover:text-[#121212] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {dict.nav.works}
            </a>
            <a
              href="#capabilities"
              className="hover:text-[#121212] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {dict.nav.capabilities}
            </a>
            <a
              href="#experience"
              className="hover:text-[#121212] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {dict.nav.experience}
            </a>
            <a
              href="#journal"
              className="hover:text-[#121212] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {dict.nav.journal}
            </a>
            <a
              href="#contact"
              className="hover:text-[#121212] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {dict.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Language Switcher & Primary Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Segmented Language Control (中文 / EN) */}
            <div
              role="group"
              aria-label={locale === 'zh' ? '语言切换' : 'Language Switcher'}
              className="inline-flex items-center p-0.5 bg-[#E4E4E0] rounded-lg border border-[#D4D4D0]"
            >
              <button
                type="button"
                onClick={() => handleLanguageChange('zh')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  locale === 'zh'
                    ? 'bg-[#121212] text-[#F4F4F0] shadow-xs'
                    : 'text-[#52525B] hover:text-[#121212]'
                }`}
                aria-pressed={locale === 'zh'}
              >
                中文
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  locale === 'en'
                    ? 'bg-[#121212] text-[#F4F4F0] shadow-xs'
                    : 'text-[#52525B] hover:text-[#121212]'
                }`}
                aria-pressed={locale === 'en'}
              >
                EN
              </button>
            </div>

            {/* Dual-Script (Side-by-Side) Toggle Button */}
            <button
              type="button"
              onClick={() => setDualScript((prev) => !prev)}
              title={
                locale === 'zh'
                  ? '开启/关闭中英双语同屏对照阅读'
                  : 'Toggle side-by-side Chinese & English display'
              }
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                dualScript
                  ? 'bg-[#E11D48]/10 text-[#E11D48] border-[#E11D48]/40'
                  : 'bg-transparent text-[#52525B] border-[#D4D4D0] hover:text-[#121212] hover:border-[#121212]'
              }`}
              aria-pressed={dualScript}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>{dualScript ? dict.actions.bilingualModeOn : dict.actions.bilingualModeOff}</span>
            </button>

            {/* Primary CTA */}
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#121212] hover:bg-[#E11D48] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
            >
              {dict.actions.bookCall}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* =====================================================================
            HERO SECTION: Split-Screen Editorial Layout
            Left: Oversized typographic impact, narrative bio, & tabular metrics
            Right: Documentary studio portrait with measured scrim & archival note
        ====================================================================== */}
        <section className="max-w-[1360px] mx-auto px-6 md:px-10 pt-10 pb-16 md:pt-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column (7 cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Unboxed Regional & Practice Kicker */}
                <p className="text-xs md:text-sm text-[#52525B] mb-5 tracking-wide">
                  <span>{dict.hero.kicker}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span className="text-[#E11D48] font-medium">{dict.hero.availability}</span>
                </p>

                {/* Primary Display Headline */}
                <h1
                  className={`font-editorial font-normal text-[#121212] tracking-tight [text-wrap:balance] ${
                    locale === 'zh'
                      ? 'text-4xl sm:text-5xl xl:text-[54px] leading-[1.22]'
                      : 'text-4xl sm:text-5xl xl:text-[60px] leading-[1.08]'
                  }`}
                >
                  {dict.hero.headline}
                </h1>

                {/* Dual-Script Secondary Headline if enabled */}
                {dualScript && (
                  <p className="mt-3 text-xl md:text-2xl font-editorial text-[#52525B] leading-snug [text-wrap:balance]">
                    {UI_DICT[secondaryLocale].hero.headline}
                  </p>
                )}

                {/* Body Lead */}
                <p
                  className={`mt-6 text-base md:text-lg text-[#3F3F46] max-w-2xl ${
                    locale === 'zh' ? 'leading-[1.75]' : 'leading-[1.6]'
                  }`}
                >
                  {dict.hero.subheadline}
                </p>
                {dualScript && (
                  <p className="mt-2 text-sm text-[#52525B] max-w-2xl leading-relaxed">
                    {UI_DICT[secondaryLocale].hero.subheadline}
                  </p>
                )}

                {/* Hero Action Row */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#works"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{dict.hero.primaryCta}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#121212] bg-white border border-[#D4D4D0] hover:border-[#121212] rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{dict.hero.secondaryCta}</span>
                  </a>
                </div>
              </div>

              {/* Quantitative Metrics Row (Tabular Numerals) */}
              <div className="mt-12 pt-8 border-t border-[#D4D4D0] grid grid-cols-1 sm:grid-cols-3 gap-6">
                {dict.hero.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-3xl md:text-4xl font-editorial font-normal text-[#121212] font-mono-tabular tracking-tight">
                      {m.value}
                    </span>
                    <span className="mt-1.5 text-sm font-semibold text-[#18181B]">
                      {m.label}
                    </span>
                    <span className="mt-1 text-xs text-[#52525B] leading-relaxed">
                      {m.context}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (5 cols on desktop): Visual Portrait Container */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#D4D4D0] bg-[#121212] group">
                <ResilientImage
                  src={HERO_IMAGE}
                  alt={dict.hero.portraitCaption}
                  fallbackTitle={dict.brandName}
                  className="w-full aspect-[4/3] lg:aspect-[4/4.6] object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                />
                {/* Measured Scrim Overlay for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <p className="font-editorial italic text-2xl text-white/95 tracking-wide">
                    “Form follows optical rhythm & mechanical truth.”
                  </p>
                  <p className="mt-2 text-xs text-[#D4D4D8] font-mono-tabular">
                    {dict.hero.portraitCaption}
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between gap-4">
                    <span className="text-xs text-[#E4E4E7]">
                      {locale === 'zh' ? '最新代表作：Sonance 01 控台' : 'Featured: Sonance 01 Console'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveProjectIndex(0)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-[#F43F5E] transition-colors whitespace-nowrap"
                    >
                      <span>{locale === 'zh' ? '检视档案' : 'Open Archive'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION DIVIDER: Subtle Animated Marquee Ribbon
        ====================================================================== */}
        <div
          aria-hidden="true"
          className="border-y border-[#D4D4D0] bg-[#EAEAE4] py-3 overflow-hidden select-none"
        >
          <div className="animate-marquee text-xs font-mono-tabular tracking-widest text-[#52525B]">
            <span className="mx-4">{dict.marquee}</span>
            <span className="mx-4">{dict.marquee}</span>
            <span className="mx-4">{dict.marquee}</span>
            <span className="mx-4">{dict.marquee}</span>
          </div>
        </div>

        {/* =====================================================================
            01. SELECTED WORKS: Dynamic Bento Grid & Interactive Filtering
        ====================================================================== */}
        <section id="works" className="max-w-[1360px] mx-auto px-6 md:px-10 py-16 md:py-24">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#E11D48] tracking-wide mb-2">
                {dict.worksSection.indexLabel}
              </p>
              <h2 className="text-3xl md:text-4xl font-editorial font-normal text-[#121212] tracking-tight [text-wrap:balance]">
                {dict.worksSection.heading}
              </h2>
              {dualScript && (
                <p className="mt-1 text-lg font-editorial text-[#52525B]">
                  {UI_DICT[secondaryLocale].worksSection.heading}
                </p>
              )}
              <p className="mt-3 text-sm text-[#52525B] leading-relaxed">
                {dict.worksSection.description}
              </p>
            </div>

            {/* Interactive Controls: Segmented Category Filter + Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Functional Segmented Filter Buttons */}
              <div
                role="tablist"
                aria-label={locale === 'zh' ? '作品类别筛选' : 'Filter works by category'}
                className="flex items-center gap-1 p-1 bg-[#E4E4E0] rounded-xl border border-[#D4D4D0] overflow-x-auto"
              >
                {(['all', 'systems', 'spatial', 'editorial'] as ProjectCategory[]).map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={activeCategory === cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                        activeCategory === cat
                          ? 'bg-white text-[#121212] shadow-xs font-semibold'
                          : 'text-[#52525B] hover:text-[#121212]'
                      }`}
                    >
                      {dict.worksSection.filters[cat]}
                    </button>
                  )
                )}
              </div>

              {/* Search Input */}
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={dict.worksSection.searchPlaceholder}
                  aria-label={dict.worksSection.searchPlaceholder}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#D4D4D0] rounded-xl text-[#121212] placeholder:text-[#71717A] focus:outline-none focus:border-[#121212] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Empty State if search matches nothing */}
          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E4E4E0]">
              <p className="text-sm text-[#52525B] mb-4">{dict.worksSection.emptyState}</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#121212] rounded-lg hover:bg-[#E11D48] transition-colors"
              >
                {dict.worksSection.clearSearch}
              </button>
            </div>
          ) : (
            /* Dynamic Bento Grid: Alternating 7-col and 5-col spans on desktop */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {filteredProjects.map((project) => {
                const originalIndex = PROJECTS.findIndex((p) => p.id === project.id);
                const colSpanClass =
                  project.bentoSpan === 'wide' || project.bentoSpan === 'panorama'
                    ? 'lg:col-span-7'
                    : 'lg:col-span-5';

                return (
                  <article
                    key={project.id}
                    onClick={() => setActiveProjectIndex(originalIndex)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveProjectIndex(originalIndex);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${project.title[locale]} — ${dict.worksSection.viewCaseStudy}`}
                    className={`${colSpanClass} group cursor-pointer bg-white rounded-2xl border border-[#E4E4E0] hover:border-[#121212] transition-colors overflow-hidden flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]`}
                  >
                    {/* Media Frame */}
                    <div className="relative overflow-hidden bg-[#121212] aspect-[16/10]">
                      <ResilientImage
                        src={project.image}
                        alt={project.imageAlt[locale]}
                        fallbackTitle={project.title[locale]}
                        className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                      />
                      {/* Measured Bottom Scrim with EXIF / Technical Specs */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 py-3.5 flex items-center justify-between text-xs text-white/90 font-mono-tabular">
                        <span className="truncate">{project.exifOrSpec[locale]}</span>
                        <span className="inline-flex items-center gap-1 font-sans font-medium text-white shrink-0 ml-3 group-hover:text-[#F43F5E] transition-colors">
                          <span>{dict.worksSection.viewCaseStudy}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Text Content Container (Zero-Pill Metadata Discipline) */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Quiet Unboxed Metadata Line */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#52525B] font-mono-tabular mb-3">
                          <span className="font-semibold text-[#121212]">{project.index}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.categoryLabel[locale]}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.year}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.client[locale]}</span>
                        </div>

                        {/* Project Title */}
                        <h3 className="text-xl md:text-2xl font-editorial font-normal text-[#121212] group-hover:text-[#E11D48] transition-colors leading-snug [text-wrap:balance]">
                          {project.title[locale]}
                        </h3>
                        {dualScript && (
                          <p className="mt-1 text-sm font-editorial text-[#52525B]">
                            {project.title[secondaryLocale]}
                          </p>
                        )}

                        {/* Subtitle */}
                        <p className="mt-2.5 text-sm text-[#3F3F46] leading-relaxed">
                          {project.subtitle[locale]}
                        </p>
                        {dualScript && (
                          <p className="mt-1.5 text-xs text-[#71717A] leading-relaxed">
                            {project.subtitle[secondaryLocale]}
                          </p>
                        )}
                      </div>

                      {/* Quantified Outcome Footer Line */}
                      <div className="mt-6 pt-4 border-t border-[#E4E4E0] flex items-center justify-between gap-4 text-xs text-[#52525B]">
                        <span className="font-mono-tabular text-[#18181B] font-medium">
                          {project.outcomeMetric[locale]}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* =====================================================================
            02. CAPABILITIES & QUANTIFIED ARCHITECTURE (Dark Editorial Surface)
        ====================================================================== */}
        <section id="capabilities" className="bg-[#121212] text-[#F4F4F0] py-16 md:py-24">
          <div className="max-w-[1360px] mx-auto px-6 md:px-10">
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-semibold text-[#F43F5E] tracking-wide mb-2">
                {dict.capabilitiesSection.indexLabel}
              </p>
              <h2 className="text-3xl md:text-4xl font-editorial font-normal text-white tracking-tight [text-wrap:balance]">
                {dict.capabilitiesSection.heading}
              </h2>
              {dualScript && (
                <p className="mt-1 text-lg font-editorial text-[#A1A1AA]">
                  {UI_DICT[secondaryLocale].capabilitiesSection.heading}
                </p>
              )}
              <p className="mt-3 text-sm md:text-base text-[#A1A1AA] leading-relaxed">
                {dict.capabilitiesSection.description}
              </p>
            </div>

            <div className="divide-y divide-[#27272A] border-y border-[#27272A]">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.index}
                  className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
                >
                  {/* Column 1: Editorial Number & Title */}
                  <div className="lg:col-span-5">
                    <h3 className="text-xl md:text-2xl font-editorial font-normal text-white tracking-wide">
                      <span className="font-mono-tabular text-[#F43F5E] mr-3">
                        {cap.index}.
                      </span>
                      {cap.title[locale]}
                    </h3>
                    {dualScript && (
                      <p className="mt-1 pl-9 text-sm text-[#A1A1AA]">
                        {cap.title[secondaryLocale]}
                      </p>
                    )}
                  </div>

                  {/* Column 2: Description & Unboxed Deliverables */}
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-sm md:text-base text-[#D4D4D8] leading-relaxed tracking-[0.01em]">
                      {cap.description[locale]}
                    </p>
                    {dualScript && (
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        {cap.description[secondaryLocale]}
                      </p>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#A1A1AA] border-t border-[#27272A]/70">
                      <div>
                        <span className="text-white font-semibold mr-2">
                          {dict.capabilitiesSection.deliverablesLabel}:
                        </span>
                        <span>{cap.deliverablesLine[locale]}</span>
                      </div>
                      <div className="font-mono-tabular text-[#F4F4F0] shrink-0">
                        <span>{cap.metricProof[locale]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            03. EXPERIENCE TIMELINE & ATTRIBUTABLE CLIENT PROOF
        ====================================================================== */}
        <section id="experience" className="max-w-[1360px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#E11D48] tracking-wide mb-2">
                {dict.experienceSection.indexLabel}
              </p>
              <h2 className="text-3xl md:text-4xl font-editorial font-normal text-[#121212] tracking-tight [text-wrap:balance]">
                {dict.experienceSection.heading}
              </h2>
              {dualScript && (
                <p className="mt-1 text-lg font-editorial text-[#52525B]">
                  {UI_DICT[secondaryLocale].experienceSection.heading}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleCopyResume}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#121212] bg-white border border-[#D4D4D0] hover:border-[#121212] rounded-xl transition-colors whitespace-nowrap self-start md:self-auto"
            >
              {copiedResume ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{dict.experienceSection.copiedResumeToast}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{dict.experienceSection.copyResumeBtn}</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 6 Cols: Career Timeline */}
            <div className="lg:col-span-6">
              <h3 className="text-sm font-semibold text-[#121212] pb-4 border-b border-[#D4D4D0]">
                {dict.experienceSection.timelineTitle}
              </h3>
              <div className="divide-y divide-[#E4E4E0]">
                {EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-[#52525B] font-mono-tabular mb-1.5">
                      <span className="font-semibold text-[#121212]">{exp.period}</span>
                      <span>
                        {exp.organization[locale]} · {exp.location[locale]}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-[#121212]">
                      {exp.role[locale]}
                    </h4>
                    {dualScript && (
                      <p className="text-xs text-[#52525B] mt-0.5">
                        {exp.role[secondaryLocale]} — {exp.organization[secondaryLocale]}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-[#3F3F46] leading-relaxed">
                      {exp.impact[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6 Cols: Attributable Client Testimonials (Claim-to-Proof Adjacency) */}
            <div className="lg:col-span-6">
              <h3 className="text-sm font-semibold text-[#121212] pb-4 border-b border-[#D4D4D0]">
                {dict.experienceSection.testimonialsTitle}
              </h3>
              <div className="space-y-6 mt-6">
                {TESTIMONIALS.map((item) => (
                  <blockquote
                    key={item.id}
                    className="p-6 md:p-8 bg-white rounded-2xl border border-[#E4E4E0]"
                  >
                    <p className="text-base font-editorial text-[#121212] leading-relaxed">
                      {item.quote[locale]}
                    </p>
                    {dualScript && (
                      <p className="mt-2 text-xs text-[#52525B] leading-relaxed">
                        {item.quote[secondaryLocale]}
                      </p>
                    )}

                    {/* Concrete Before/Change/Outcome Statement */}
                    <p className="mt-4 pt-4 border-t border-[#E4E4E0] text-xs font-mono-tabular text-[#E11D48] font-medium">
                      {item.beforeAfterOutcome[locale]}
                    </p>

                    <footer className="mt-3 text-xs text-[#52525B]">
                      <strong className="font-semibold text-[#121212]">
                        {item.author[locale]}
                      </strong>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{item.role[locale]}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{item.organization[locale]}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            04. EDITORIAL JOURNAL & BILINGUAL TYPOGRAPHY NOTES
        ====================================================================== */}
        <section
          id="journal"
          className="border-t border-[#D4D4D0] bg-[#EAEAE4]/60 py-16 md:py-24"
        >
          <div className="max-w-[1360px] mx-auto px-6 md:px-10">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold text-[#E11D48] tracking-wide mb-2">
                {dict.journalSection.indexLabel}
              </p>
              <h2 className="text-3xl md:text-4xl font-editorial font-normal text-[#121212] tracking-tight [text-wrap:balance]">
                {dict.journalSection.heading}
              </h2>
              {dualScript && (
                <p className="mt-1 text-lg font-editorial text-[#52525B]">
                  {UI_DICT[secondaryLocale].journalSection.heading}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ESSAYS.map((essay) => (
                <article
                  key={essay.id}
                  onClick={() => setActiveEssay(essay)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveEssay(essay);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  className="group cursor-pointer bg-white p-6 md:p-8 rounded-2xl border border-[#E4E4E0] hover:border-[#121212] transition-colors flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#52525B] font-mono-tabular mb-3">
                      <span>{essay.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{essay.topic[locale]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{essay.readTime[locale]}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-editorial font-normal text-[#121212] group-hover:text-[#E11D48] transition-colors leading-snug [text-wrap:balance]">
                      {essay.title[locale]}
                    </h3>
                    {dualScript && (
                      <p className="mt-1.5 text-sm font-editorial text-[#52525B]">
                        {essay.title[secondaryLocale]}
                      </p>
                    )}

                    <p className="mt-3 text-sm text-[#3F3F46] leading-relaxed">
                      {essay.excerpt[locale]}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E4E4E0] flex items-center justify-between text-xs font-semibold text-[#121212] group-hover:text-[#E11D48] transition-colors">
                    <span>{dict.journalSection.readArticle}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            05. COMMISSION INQUIRY & DIRECT CONTACT
        ====================================================================== */}
        <section id="contact" className="max-w-[1360px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 5 Cols: Direct Contact Info & Language Shortcut Guide */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-[#E11D48] tracking-wide mb-2">
                  {dict.contactSection.indexLabel}
                </p>
                <h2 className="text-3xl md:text-4xl font-editorial font-normal text-[#121212] tracking-tight [text-wrap:balance]">
                  {dict.contactSection.heading}
                </h2>
                {dualScript && (
                  <p className="mt-1 text-lg font-editorial text-[#52525B]">
                    {UI_DICT[secondaryLocale].contactSection.heading}
                  </p>
                )}
                <p className="mt-4 text-sm text-[#3F3F46] leading-relaxed">
                  {dict.contactSection.description}
                </p>

                <div className="mt-8 space-y-6 pt-6 border-t border-[#D4D4D0]">
                  <div>
                    <p className="text-xs text-[#52525B] mb-1">
                      {dict.contactSection.directEmailLabel}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-lg font-mono-tabular font-medium text-[#121212]">
                        linshen@studio-linshen.ch
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-[#D4D4D0] hover:border-[#121212] rounded-lg transition-colors whitespace-nowrap"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{dict.contactSection.copiedEmailBtn}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{dict.contactSection.copyEmailBtn}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-[#52525B] mb-1">
                      {dict.contactSection.locationLabel}
                    </p>
                    <p className="text-sm font-medium text-[#121212]">
                      {dict.contactSection.locationValue}
                    </p>
                  </div>
                </div>
              </div>

              {/* Language Switching Tip Box */}
              <div className="mt-10 p-5 bg-white rounded-2xl border border-[#E4E4E0]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-[#121212] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#E11D48]" />
                    {dict.contactSection.langTipTitle}
                  </span>
                  <span className="text-xs font-mono-tabular text-[#52525B]">Alt + L</span>
                </div>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  {dict.contactSection.langTipDesc}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleLanguageChange(locale === 'zh' ? 'en' : 'zh')}
                    className="px-3 py-1.5 text-xs font-semibold text-[#121212] bg-[#F4F4F0] hover:bg-[#E4E4E0] rounded-lg transition-colors whitespace-nowrap"
                  >
                    {dict.actions.switchToEn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDualScript((prev) => !prev)}
                    className="px-3 py-1.5 text-xs font-medium text-[#52525B] hover:text-[#121212] border border-[#D4D4D0] rounded-lg transition-colors whitespace-nowrap"
                  >
                    {dualScript ? dict.actions.bilingualModeOn : dict.actions.bilingualModeOff}
                  </button>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Interactive Project Commission Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 md:p-10 rounded-2xl border border-[#E4E4E0]">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-editorial text-[#121212]">
                      {dict.contactSection.form.successTitle}
                    </h3>
                    <p className="text-sm text-[#52525B] max-w-md mx-auto leading-relaxed">
                      {dict.contactSection.form.successDesc}
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormMessage('');
                        }}
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-[#121212] hover:bg-[#E11D48] rounded-xl transition-colors"
                      >
                        {dict.contactSection.form.resetBtn}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="inquiry-name"
                          className="block text-xs font-semibold text-[#121212] mb-2"
                        >
                          {dict.contactSection.form.nameLabel} *
                        </label>
                        <input
                          id="inquiry-name"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder={dict.contactSection.form.namePlaceholder}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#F4F4F0] border border-[#D4D4D0] rounded-xl text-[#121212] placeholder:text-[#71717A] focus:outline-none focus:border-[#121212] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-email"
                          className="block text-xs font-semibold text-[#121212] mb-2"
                        >
                          {dict.contactSection.form.emailLabel} *
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder={dict.contactSection.form.emailPlaceholder}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#F4F4F0] border border-[#D4D4D0] rounded-xl text-[#121212] placeholder:text-[#71717A] focus:outline-none focus:border-[#121212] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Interactive Scope Selector */}
                    <div>
                      <span className="block text-xs font-semibold text-[#121212] mb-2">
                        {dict.contactSection.form.scopeLabel}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {dict.contactSection.form.scopes.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setFormScope(s.id)}
                            className={`px-3.5 py-2.5 text-xs font-medium text-left rounded-xl border transition-colors truncate ${
                              formScope === s.id
                                ? 'bg-[#121212] text-white border-[#121212]'
                                : 'bg-[#F4F4F0] text-[#3F3F46] border-[#D4D4D0] hover:border-[#121212]'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Budget / Timeline Selector */}
                    <div>
                      <span className="block text-xs font-semibold text-[#121212] mb-2">
                        {dict.contactSection.form.budgetLabel}
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {dict.contactSection.form.budgets.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setFormBudget(b.id)}
                            className={`px-3.5 py-2.5 text-xs font-mono-tabular text-left rounded-xl border transition-colors truncate ${
                              formBudget === b.id
                                ? 'bg-[#121212] text-white border-[#121212]'
                                : 'bg-[#F4F4F0] text-[#3F3F46] border-[#D4D4D0] hover:border-[#121212]'
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label
                        htmlFor="inquiry-message"
                        className="block text-xs font-semibold text-[#121212] mb-2"
                      >
                        {dict.contactSection.form.messageLabel}
                      </label>
                      <textarea
                        id="inquiry-message"
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder={dict.contactSection.form.messagePlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F4F4F0] border border-[#D4D4D0] rounded-xl text-[#121212] placeholder:text-[#71717A] focus:outline-none focus:border-[#121212] focus:bg-white transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] rounded-xl transition-colors whitespace-nowrap"
                    >
                      {dict.contactSection.form.submitBtn}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          CLEAN EDITORIAL FOOTER
      ====================================================================== */}
      <footer className="border-t border-[#D4D4D0] py-10">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#52525B]">
          <div>
            <p className="font-medium text-[#121212]">{dict.footer.copyright}</p>
            <p className="mt-1">{dict.footer.colophon}</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => handleLanguageChange(locale === 'zh' ? 'en' : 'zh')}
              className="hover:text-[#121212] underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              {dict.actions.switchToEn}
            </button>
            <span aria-hidden="true">·</span>
            <a
              href="#top"
              className="hover:text-[#121212] transition-colors whitespace-nowrap"
            >
              {dict.footer.backToTop}
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FULLSCREEN LIGHTBOX MODAL FOR PROJECTS
      ====================================================================== */}
      <LightboxModal
        project={activeProject}
        locale={locale}
        dualScript={dualScript}
        onClose={() => setActiveProjectIndex(null)}
        onPrev={() =>
          setActiveProjectIndex((prev) =>
            prev === null ? null : (prev - 1 + PROJECTS.length) % PROJECTS.length
          )
        }
        onNext={() =>
          setActiveProjectIndex((prev) =>
            prev === null ? null : (prev + 1) % PROJECTS.length
          )
        }
        onInquireProject={handleInquireFromProject}
      />

      {/* =====================================================================
          EDITORIAL ESSAY MODAL
      ====================================================================== */}
      <EssayModal
        essay={activeEssay}
        locale={locale}
        dualScript={dualScript}
        onToggleDualScript={() => setDualScript((prev) => !prev)}
        onClose={() => setActiveEssay(null)}
      />
    </div>
  );
}
