"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface GalleryScreen {
  src: string;
  /** Natural pixel width/height of the file (captured at 2x device scale). */
  width: number;
  height: number;
  alt: string;
  label: string;
}

interface Props {
  basePath: string;
  screens: GalleryScreen[];
}

// The source screenshots were captured at device-scale-factor 2, so a CSS
// width of naturalWidth/2 reproduces the size the app actually renders at in
// a browser. 200% zoom (naturalWidth * 1.0) is a 1:1 physical-pixel mapping -
// the sharpest the source supports - so the steps never upscale past it.
const ZOOM_STEPS = [75, 100, 125, 150, 200];
const DEFAULT_ZOOM_INDEX = 1;

export function ScreenshotGallery({ basePath, screens }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function close() {
    const idx = openIndex;
    setOpenIndex(null);
    if (idx !== null) triggerRefs.current[idx]?.focus();
  }

  useEffect(() => {
    if (openIndex === null) return;
    setZoomIndex(DEFAULT_ZOOM_INDEX);
    closeButtonRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? i : Math.min(i + 1, screens.length - 1)));
      }
      if (event.key === "ArrowLeft") {
        setOpenIndex((i) => (i === null ? i : Math.max(i - 1, 0)));
      }
    }
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, screens.length]);

  const current = openIndex === null ? null : screens[openIndex];
  const zoom = ZOOM_STEPS[zoomIndex];

  return (
    <>
      <div className="support-screens">
        {screens.map((screen, i) => (
          <button
            key={screen.src}
            type="button"
            className="support-screen"
            ref={(el) => {
              triggerRefs.current[i] = el;
            }}
            onClick={() => setOpenIndex(i)}
            aria-label={`${screen.alt}（クリックで拡大表示）`}
          >
            <Image src={`${basePath}${screen.src}`} width={screen.width} height={screen.height} alt={screen.alt} unoptimized />
            <span className="support-screen-hint">拡大表示</span>
          </button>
        ))}
      </div>

      {current && (
        <div
          className="screenshot-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.label}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="screenshot-lightbox-panel">
            <div className="screenshot-lightbox-bar">
              <span className="screenshot-lightbox-label">{current.label}</span>
              <div className="screenshot-lightbox-controls">
                {screens.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenIndex((i) => (i === null ? i : Math.max(i - 1, 0)))}
                      disabled={openIndex === 0}
                      aria-label="前の画面"
                    >
                      ‹
                    </button>
                    <span className="screenshot-lightbox-count">
                      {openIndex !== null ? openIndex + 1 : 0} / {screens.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpenIndex((i) => (i === null ? i : Math.min(i + 1, screens.length - 1)))}
                      disabled={openIndex === screens.length - 1}
                      aria-label="次の画面"
                    >
                      ›
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setZoomIndex((z) => Math.max(z - 1, 0))}
                  disabled={zoomIndex === 0}
                  aria-label="縮小"
                >
                  －
                </button>
                <span className="screenshot-lightbox-zoom" aria-live="polite">
                  {zoom}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomIndex((z) => Math.min(z + 1, ZOOM_STEPS.length - 1))}
                  disabled={zoomIndex === ZOOM_STEPS.length - 1}
                  aria-label="拡大"
                >
                  ＋
                </button>
                <button type="button" className="screenshot-lightbox-close" onClick={close} ref={closeButtonRef} aria-label="閉じる">
                  ×
                </button>
              </div>
            </div>
            <div className="screenshot-lightbox-body">
              {/* Plain img: dynamic zoom width is simplest without next/image's fixed intrinsic sizing. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}${current.src}`}
                alt={current.alt}
                style={{ width: `${Math.round((current.width * zoom) / 200)}px`, maxWidth: "none" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
