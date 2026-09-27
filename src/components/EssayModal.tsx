import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { EssayItem, Locale } from '../i18n/PortfolioData';

interface EssayModalProps {
  essay: EssayItem | null;
  locale: Locale;
  dualScript: boolean;
  onToggleDualScript: () => void;
  onClose: () => void;
}

export const EssayModal: React.FC<EssayModalProps> = ({
  essay,
  locale,
  dualScript,
  onToggleDualScript,
  onClose,
}) => {
  useEffect(() => {
    if (!essay) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [essay, onClose]);

  if (!essay) return null;

  const secondaryLocale: Locale = locale === 'zh' ? 'en' : 'zh';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#121212]/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="essay-modal-title"
      onClick={onClose}
    >
      <article
        className="relative w-full max-w-3xl bg-[#F4F4F0] text-[#121212] rounded-2xl border border-[#D4D4D0] shadow-xl p-6 md:p-12 my-auto max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E4E4E0]">
          <div className="flex items-center gap-2 text-xs text-[#52525B] font-mono-tabular">
            <span>{essay.date}</span>
            <span aria-hidden="true">·</span>
            <span>{essay.topic[locale]}</span>
            <span aria-hidden="true">·</span>
            <span>{essay.readTime[locale]}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleDualScript}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                dualScript
                  ? 'bg-[#121212] text-[#F4F4F0] border-[#121212]'
                  : 'bg-white text-[#52525B] border-[#D4D4D0] hover:text-[#121212]'
              }`}
            >
              {locale === 'zh'
                ? dualScript
                  ? '中英对照：开启'
                  : '开启中英对照阅读'
                : dualScript
                  ? 'Dual-Script: ON'
                  : 'Side-by-Side Bilingual'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#121212] bg-[#E4E4E0] hover:bg-[#D4D4D0] rounded-lg transition-colors whitespace-nowrap"
            >
              <X className="w-3.5 h-3.5" />
              <span>ESC</span>
            </button>
          </div>
        </div>

        <h2
          id="essay-modal-title"
          className="text-2xl md:text-4xl font-normal tracking-tight text-[#121212] leading-snug [text-wrap:balance]"
        >
          {essay.title[locale]}
        </h2>
        {dualScript && (
          <p className="mt-2 text-lg text-[#52525B] font-normal leading-snug">
            {essay.title[secondaryLocale]}
          </p>
        )}

        <div className="mt-8 space-y-6">
          {essay.paragraphs.map((para, idx) => (
            <div
              key={idx}
              className={
                dualScript
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#E4E4E0] last:border-b-0'
                  : ''
              }
            >
              <p className="text-base text-[#18181B] leading-[1.75]">
                {para[locale]}
              </p>
              {dualScript && (
                <p className="text-sm text-[#52525B] leading-[1.7] font-normal">
                  {para[secondaryLocale]}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};
