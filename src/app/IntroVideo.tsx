"use client";

import { useRef, useState } from "react";

/** Byte-identical copy of the video published on the 企業向けCTX site. */
const VIDEO_SRC = "/video/ctx-enterprise-r6-integrated-review-20261112.mp4";
const POSTER_SRC = "/video/ctx-enterprise-r6-integrated-20261112-poster.jpg";
const PLAYER_ID = "ctxent-intro-video";
const CAUTION_ID = "ctxent-intro-video-caution";

interface Props {
  basePath: string;
}

export function IntroVideo({ basePath }: Props) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The <video> stays mounted behind the cover so play() runs inside the click
  // handler itself - the user gesture the browser requires for sound. Nothing
  // is fetched before that click: preload="none" on a hidden element loads no
  // media. The page never starts the video on its own.
  function start() {
    setStarted(true);
    const video = videoRef.current;
    // If the browser refuses, the player is still there with its own controls.
    video?.play().catch(() => {});
    video?.focus();
  }

  return (
    <div className="ctxent-video">
      {/* Stated above the player, and read out with the play control, because
          the R6 video introduces the free 01-05 flow and the paid 06 feature. */}
      <p className="ctxent-video-caution" id={CAUTION_ID}>
        このR6紹介動画は、無料版01〜05と有料版06の機能を紹介します。無料版では診断・改善提案・改善内容のまとめ、有料版06では共通ルール5件・基本指示9テーマの指示文の確認・コピー・保存ができます。実際のAI設定は変更しません。
      </p>
      <div className="ctxent-video-frame">
        <video
          ref={videoRef}
          id={PLAYER_ID}
          className="ctxent-video-element"
          controls
          playsInline
          preload="none"
          poster={`${basePath}${POSTER_SRC}`}
          width={1920}
          height={1080}
          hidden={!started}
          aria-label="企業向けCTXの紹介動画（約64秒・音声と字幕付き）"
        >
          <source src={`${basePath}${VIDEO_SRC}`} type="video/mp4" />
          お使いのブラウザでは動画を再生できません。
        </video>
        {!started && (
          <button
            type="button"
            className="ctxent-video-cover"
            onClick={start}
            aria-controls={PLAYER_ID}
            aria-describedby={CAUTION_ID}
            aria-label="約64秒の紹介動画を再生する（音声あり）"
          >
            {/* Plain img: the poster is a fixed 16:9 cover, not a layout image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${basePath}${POSTER_SRC}`} width={1280} height={720} alt="" />
            <span className="ctxent-video-play" aria-hidden="true">▶</span>
            <span className="ctxent-video-cover-label" aria-hidden="true">約64秒の紹介動画を見る</span>
          </button>
        )}
      </div>
      <p className="ctxent-video-note">
        音声があります。ページを開いただけでは再生されません（約64秒・字幕付き）。
      </p>
    </div>
  );
}
