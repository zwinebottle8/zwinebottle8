import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Locale, ProjectItem } from '../i18n/PortfolioData';
import { ResilientImage } from './ResilientImage';

interface LightboxModalProps {
  project: ProjectItem | null;
  locale: Locale;
  dualScript: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onInquireProject: (projectTitle: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  project,
  locale,
  dualScript,
  onClose,
  onPrev,
  onNext,
  onInquireProject,
}) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  const secondaryLocale: Locale = locale === 'zh' ? 'en' : 'zh';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#050505]/95 text-[#F4F4F0] overflow-y-auto backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
    >
      {/* Sticky Top Control Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-4 bg-[#050505]/90 border-b border-[#27272A]">
        <div className="flex items-center gap-3 text-xs text-[#A1A1AA] font-mono-tabular">
          <span>{project.index} / 04</span>
          <span aria-hidden="true">·</span>
          <span>{project.categoryLabel[locale]}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#E4E4E7] hover:text-white border border-[#27272A] rounded-lg hover:bg-[#18181B] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
            aria-label={locale === 'zh' ? '上一个项目' : 'Previous project'}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{locale === 'zh' ? '上一项' : 'Prev'}</span>
          </button>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#E4E4E7] hover:text-white border border-[#27272A] rounded-lg hover:bg-[#18181B] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
            aria-label={locale === 'zh' ? '下一个项目' : 'Next project'}
          >
            <span>{locale === 'zh' ? '下一项' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={locale === 'zh' ? '关闭案例档案 (ESC)' : 'Close archive (ESC)'}
          >
            <X className="w-4 h-4" />
            <span>ESC</span>
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
        {/* Title & Metadata Header */}
        <div className="max-w-4xl mb-8">
          <p className="text-xs text-[#A1A1AA] mb-3">
            <span>{project.client[locale]}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{project.role[locale]}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{project.duration[locale]}</span>
          </p>
          <h2
            id="lightbox-project-title"
            className="text-3xl md:text-5xl font-normal tracking-tight text-white leading-tight [text-wrap:balance]"
          >
            {project.title[locale]}
          </h2>
          {dualScript && (
            <p className="mt-2 text-lg md:text-xl text-[#A1A1AA] font-normal">
              {project.title[secondaryLocale]}
            </p>
          )}
          <p className="mt-4 text-base md:text-lg text-[#D4D4D8] leading-relaxed max-w-3xl">
            {project.subtitle[locale]}
          </p>
        </div>

        {/* High-Resolution Media Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-[#27272A] bg-[#121212] mb-10">
          <ResilientImage
            src={project.image}
            alt={project.imageAlt[locale]}
            fallbackTitle={project.title[locale]}
            className="w-full max-h-[620px] object-cover"
          />
          <div className="px-6 py-3.5 bg-[#09090B] border-t border-[#27272A] flex flex-wrap items-center justify-between gap-4 text-xs text-[#A1A1AA] font-mono-tabular">
            <span>{project.exifOrSpec[locale]}</span>
            <span>{project.imageAlt[locale]}</span>
          </div>
        </div>

        {/* Case Study 3-Column Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b border-[#27272A]">
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              {locale === 'zh' ? '01. 核心挑战与背景' : '01. Problem & Context'}
            </h3>
            <p className="text-sm text-[#D4D4D8] leading-relaxed">
              {project.challenge[locale]}
            </p>
            {dualScript && (
              <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                {project.challenge[secondaryLocale]}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              {locale === 'zh' ? '02. 系统架构与工艺细节' : '02. Architecture & Craft'}
            </h3>
            <p className="text-sm text-[#D4D4D8] leading-relaxed">
              {project.architecture[locale]}
            </p>
            {dualScript && (
              <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                {project.architecture[secondaryLocale]}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              {locale === 'zh' ? '03. 量化验证成果' : '03. Verified Outcome'}
            </h3>
            <p className="text-sm text-[#F4F4F0] font-medium leading-relaxed font-mono-tabular">
              {project.outcomeMetric[locale]}
            </p>
            {dualScript && (
              <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                {project.outcomeMetric[secondaryLocale]}
              </p>
            )}
          </div>
        </div>

        {/* Deliverables & Action Bar */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-[#A1A1AA] mb-2">
              {locale === 'zh' ? '交付清单与工程模块' : 'Delivered Engineering Modules'}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#E4E4E7]">
              {project.deliverables.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[#52525B]" aria-hidden="true">·</span>}
                  <span>{item[locale]}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                onInquireProject(project.title[locale]);
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] rounded-lg transition-colors whitespace-nowrap"
            >
              {locale === 'zh' ? '咨询同类架构合作' : 'Commission Similar Scope'}
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onInquireProject(project.title[locale]);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#E4E4E7] border border-[#27272A] hover:bg-[#18181B] rounded-lg transition-colors whitespace-nowrap"
            >
              <span>{locale === 'zh' ? '索取完整技术白皮书' : 'Request Technical Dossier'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
