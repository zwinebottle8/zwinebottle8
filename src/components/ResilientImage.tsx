import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1C1C1F] via-[#27272A] to-[#121212] text-[#F4F4F0] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-8 h-8 text-[#E11D48] mb-3 opacity-80" />
        <p className="font-editorial text-lg tracking-tight max-w-xs">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
