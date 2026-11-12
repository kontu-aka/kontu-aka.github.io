# 配信する画像

- `public/images/park-a.webp`: 本人撮影として提供された写真A（階段・橋）の表示用画像。v0.8の公開準備時から変更していません。原本は含めません。
- `public/images/procurement-overview.jpg`: Gov IT Procurement Watchの実際の画面。2026-10-04保存データの表示です。政府の公式サービスを示すものではありません。
- `public/images/support-01-input.png` / `support-02-ai.png` / `support-03-confirm.png`: AI問い合わせ対応支援アプリ（ローカル: `ai-inquiry-triage`、Mock MVP）の実際のブラウザ画面を2026-10-26に撮影したもの。表示している問い合わせ本文・注文番号はすべて架空のテストデータで、実在の個人情報・取引情報は含みません。アプリ本体・ソースコードは非公開のままで、画像のみを掲載しています。
- `public/images/ctxent-r6-01-start.png` / `ctxent-r6-02-assessment.png` / `ctxent-r6-03-results.png` / `ctxent-r6-04-draft.png` / `ctxent-r6-05-review.png`: 企業向けCTX（公開リポジトリ `kontu-aka/ctx-enterprise`、公開サイト https://kontu-aka.github.io/ctx-enterprise/ ）の実際の画面を2026-11-07に撮影したもの。2026-11-07時点で公開されている無料版（R6）の5画面（01 AI導入前の準備／02 AI導入診断／03 診断結果／04 改善提案／05 改善内容の確認）の上部を、ブラウザ幅1280px・デバイス解像度2倍で撮影しています。診断の回答はサイト内の「架空の回答例を入れる」機能で生成した架空データで、会社名・実在する企業の情報は含みません。有料版のみで提供される06「AI向け指示案」の画面・内容は撮影・掲載していません。企業向けCTXの実装・公開サイトへの変更は行っていません。
- 2026-10-27に撮影した旧UI（R5以前）の画像 `ctxent-01-check.png` / `ctxent-02-results.png` / `ctxent-03-draft.png` は、2026-11-07のR6 UI更新にともない配信対象から削除しました（一度もcommitしていないため公開履歴には残りません）。
- CTX HANDOFFのビジュアルはHTML/CSSによる紹介用の文字・図形であり、実在するアプリ画面のスクリーンショットではありません。CTX HANDOFFと企業向けCTXは別の制作実績として掲載しています。

今回、外部画像・フォントを追加取得していません。これらの画像に第三者向けの再利用ライセンスを新たに付与するものではありません。

## 屋号ロゴ（2026-10-28）

- `public/images/kontu-studio-logo.png`: 「こんつの制作室」で正式採用済みの画像を、企業向けCTXの `assets/kontu-studio-logo.png` から無加工でコピー。原本の背景色を保ち、トリミング・透過・色変更・再生成は行っていません。
- 原本とコピーのSHA-256: `30c539f935c16d122dc3b1c6dd4e8a33a571177d81a05074dd7834689d0663a3`。第三者向けの再利用ライセンスを新たに付与するものではありません。

## 企業向けCTXの紹介動画（2026-11-12）

- `public/video/ctx-enterprise-r6-integrated-review-20261112.mp4`: Humanが映像・音声を確認し、正式公開を承認したR6統合修正版を無加工でコピー。企業向けCTXの公開サイトと同一内容。H.264/AAC・1920×1080・30fps・63.666667秒（表示は約64秒）・3,516,072バイト。SHA-256 `dab6d4402d89c9a5dbd23bfe098048da9e25743d918c2e89e31715b753cdda43`。
- `public/video/ctx-enterprise-r6-integrated-20261112-poster.jpg`: 同じ承認済みMP4の2.00秒のフレームから作成した1280×720のJPEG。53,292バイト、SHA-256 `1e1c7f3ecf0ff53fdf10f7961f2e05e51af41ba131be832e0d2b88fb5bd8e3ba`。両サイトで同一画像を使用。
- 動画は無料版01〜05と有料版06の機能を区別して紹介します。有料版06の実装・内部データは配信物に含めません。
- 再生はボタンを押したときだけ行い、自動再生・動画の先読みはしません（`preload="none"`）。動画・ポスターを日付入りの新しいファイル名にし、旧ファイルは配信対象から置き換えました。第三者向けの再利用ライセンスを新たに付与するものではありません。
