// Image with two safety features:
//   1. loading="lazy" for below-the-fold images (pass priority to load immediately)
//   2. If the image URL fails (offline, broken link, blocked), we show a calm
//      placeholder instead of a broken-image icon. The page never looks broken.
//
// Food photos are NOT mirrored in RTL: <img> is never flipped by dir="rtl".
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

export default function SmartImage({ src, alt, className = "", priority = false, width, height }) {
  const [failed, setFailed] = useState(false);
  const { t } = useLanguage();

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-sand text-muted ${className}`}
      >
        <ImageOff className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs">{t("errors.imageFallback")}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
