"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface GalleryScreen {
  src: string;
  /** Natural pixel width/height of the file. */
  width: number;
  height: number;
  alt: string;
  label: string;
  /** Short line under the thumbnail. Omitted galleries render no caption. */
  caption?: string;
  /**
   * Which band of a tall screenshot the thumbnail should show, as the
   * vertical object-position (0 = the top of the file, 100 = the bottom).
   * A full-page capture often has its point halfway down; without this the
   * tile would show four near-identical headers. Omitted = the top.
   */
  focus?: number;
  /**
   * Device scale the file was captured at. Most screenshots here were taken
   * at 2x, which is what the zoom steps below assume. A file captured at 1x
   * says so, otherwise its "100%" would render at half the size it should.
   */
  density?: number;
}

interface Props {
  basePath: string;
  screens: GalleryScreen[];
  /**
   * Open the lightbox at "fit to width" instead of a fixed percentage, and
   * offer that as a zoom step. Tall screenshots otherwise open wider than
   * the panel and need a horizontal scroll before anything can be read.
   * Opt-in, so the galleries that were sized for the percentage steps keep
   * behaving exactly as before.
   */
  defaultFit?: boolean;
}

// 100% means "the size the app actually renders at in a browser": a file
// captured at 2x is shown at naturalWidth/2, one captured at 1x at its own
// width. 200% is then a 1:1 physical-pixel mapping for a 2x capture - the
// sharpest its source supports.
const ZOOM_STEPS = [75, 100, 125, 150, 200] as const;
/** "fit" is a step like any other, so one index drives both modes. */
const FIT = "fit" as const;
type ZoomStep = typeof FIT | (typeof ZOOM_STEPS)[number];
const DEFAULT_DENSITY = 2;

export function ScreenshotGallery({ basePath, screens, defaultFit = false }: Props) {
  const zoomSteps: ZoomStep[] = defaultFit ? [FIT, ...ZOOM_STEPS] : [...ZOOM_STEPS];
  // Without the fit step the default stays the 100% it has always been.
  const defaultZoomIndex = defaultFit ? 0 : 1;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoomIndex, setZoomIndex] = useState(defaultZoomIndex);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function close() {
    const idx = openIndex;
    setOpenIndex(null);
    if (idx !== null) triggerRefs.current[idx]?.focus();
  }

  useEffect(() => {
    if (openIndex === null) return;
    setZoomIndex(defaultZoomIndex);
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
  const zoom = zoomSteps[zoomIndex];

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
            <Image
              src={`${basePath}${screen.src}`}
              width={screen.width}
              height={screen.height}
              alt={screen.alt}
              style={screen.focus === undefined ? undefined : { objectPosition: `center ${screen.focus}%` }}
              unoptimized
            />
            <span className="support-screen-hint">拡大表示</span>
            {screen.caption && <span className="support-screen-caption">{screen.caption}</span>}
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
                  {zoom === FIT ? "幅に合わせる" : `${zoom}%`}
                </span>
                <button
                  type="button"
                  onClick={() => setZoomIndex((z) => Math.min(z + 1, zoomSteps.length - 1))}
                  disabled={zoomIndex === zoomSteps.length - 1}
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
                style={
                  zoom === FIT
                    ? // Fits the panel, so the only scrolling is vertical.
                      { width: "100%", maxWidth: "100%" }
                    : {
                        width: `${Math.round((current.width * zoom) / (100 * (current.density ?? DEFAULT_DENSITY)))}px`,
                        maxWidth: "none",
                      }
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
