import Image from "next/image";
import ContactForm from "./ContactForm";
import { ScreenshotGallery } from "./ScreenshotGallery";
import { IntroVideo } from "./IntroVideo";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
const repository = "https://github.com/kontu-aka/gov-it-procurement-watch";
const ctxStarterKitRepository = "https://github.com/kontu-aka/ctx-handoff-starter-kit";
const ctxEnterpriseUrl = "https://kontu-aka.github.io/ctx-enterprise/";
// R6 free edition routes on the hash: start / assessment / results / draft / review.
const ctxEnterpriseStartUrl = `${ctxEnterpriseUrl}#start`;

const supportScreens = [
  {
    src: "/images/support-01-input.png",
    width: 1536,
    height: 1436,
    alt: "①問い合わせ入力画面。架空の問い合わせ本文を入力した状態。",
    label: "①問い合わせ入力画面",
  },
  {
    src: "/images/support-02-ai.png",
    width: 1536,
    height: 2702,
    alt: "②AI分析候補の画面。要約・分類・優先度・返信下書きが表示されている（Mock AIの出力）。",
    label: "②AIによる要約・分類・返信案の表示画面",
  },
  {
    src: "/images/support-03-confirm.png",
    width: 1480,
    height: 1942,
    alt: "③人が内容を確認し、チェックを入れて保存する画面。",
    label: "③人による確認と保存の画面",
  },
];

const ctxentScreens = [
  {
    src: "/images/ctxent-r6-01-start.png",
    width: 2560,
    height: 1250,
    alt: "①企業向けCTXのスタート画面。左のサイドバーに5画面の進め方、本文に診断の説明と紹介動画カードを表示。",
    label: "①AI導入前の準備（スタート画面）",
  },
  {
    src: "/images/ctxent-r6-02-assessment.png",
    width: 2560,
    height: 1840,
    alt: "②AI導入診断画面。9つのテーマに4つの選択肢で回答する。架空の回答例を入れて9件すべて回答した状態。",
    label: "②AI導入診断（9テーマに回答）",
  },
  {
    src: "/images/ctxent-r6-03-results.png",
    width: 2560,
    height: 1840,
    alt: "③診断結果画面。できている2件・一部できている・できていない5件・わからない・未回答2件の集計と、テーマごとの想定されるリスクと必要な対策を表示。",
    label: "③診断結果",
  },
  {
    src: "/images/ctxent-r6-04-draft.png",
    width: 2560,
    height: 1840,
    alt: "④改善提案画面。改善の進め方の提案7件と、テーマごとの改善を目指す点・次にすること・確認先の候補を表示。",
    label: "④改善提案",
  },
  {
    src: "/images/ctxent-r6-05-review.png",
    width: 2560,
    height: 1840,
    alt: "⑤改善内容の確認画面。確認が必要なテーマ7件／全9テーマの改善の要点と確認先をまとめて表示。",
    label: "⑤改善内容の確認",
  },
];

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function ExternalLink({ href, children, className = "" }: {
  href: string; children: React.ReactNode; className?: string;
}) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only">（新しいタブで開きます）</span></a>;
}

/* R3: the same CTA is written twice - once after the heading (phones), once
   after the tags (desktop) - and CSS display:none hides the one that does not
   apply. Only one is ever rendered, so reading order and Tab order stay in
   step; a CSS `order` swap would have moved the button visually while leaving
   Tab where it was. */
function CtxentCta({ className }: { className: string }) {
  return (
    <div className={className}>
      <ExternalLink href={ctxEnterpriseStartUrl} className="ctxent-cta-primary">無料診断を試す <Arrow /></ExternalLink>
      <p className="ctxent-cta-note">公開中の無料版（01〜05）の開始画面を新しいタブで開きます。</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">本文へ移動</a>
      <div className="dark-intro" id="top">
        <header className="header wrap">
          <a className="brand brand-studio" href="#top" aria-label="こんつの制作室（kontu-aka）先頭へ">こんつの制作室<span className="brand-caption">kontu-aka / AI &amp; PRACTICAL TOOLS</span></a>
          <nav aria-label="メインナビゲーション">
            <a href="#works">制作実績<span>Works</span></a>
            <a href="#about">自己紹介<span>About</span></a>
            <a href="#contact">お問い合わせ<span>Contact</span></a>
            <ExternalLink href="https://github.com/kontu-aka" className="nav-github">GitHub <Arrow /></ExternalLink>
          </nav>
        </header>

        <main id="main">
          <div className="masthead">
          <Image className="architecture-photo" src={`${basePath}/images/park-a.webp`} width={1088} height={912} alt="" aria-hidden="true" unoptimized priority />
          <div className="masthead-shade" aria-hidden="true" />
          <section className="hero wrap" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow"><span className="live-dot" />INDEPENDENT / PORTFOLIO</p>
              <h1 id="hero-title">アイデアを、<br /><span>使えるかたちに。</span></h1>
              <p className="hero-description">AIで、日々の仕事を少しラクに。<br />身近な困りごとから、業務改善ツールをつくっています。</p>
              <div className="hero-actions">
                <a href="#works" className="button button-lime">制作実績を見る <span aria-hidden="true">↓</span></a>
                <a href="#contact" className="button button-quiet">お仕事のご相談はこちら <span aria-hidden="true">→</span></a>
              </div>
              <div className="hero-keywords"><span>AI活用</span><span>データ分析</span><span>業務改善</span></div>
            </div>
            <div className="hero-showcase" role="group" aria-label="4作品のショーケース">
              <div className="showcase-heading"><span>SELECTED PROJECTS</span><span>01 — 04</span></div>
              <div className="showcase-stack">
                <a href="#project-ctxent" className="showcase-card showcase-ctxent" aria-label="企業向けCTXの紹介へ（無料体験版公開中）">
                  <div className="showcase-card-top"><span>04 / AI · ENTERPRISE</span></div>
                  <span className="showcase-ctxent-name">企業向けCTX</span>
                  <span className="showcase-arrow showcase-card-arrow" aria-hidden="true"><Arrow /></span>
                </a>
                <a href="#project-procurement" className="showcase-card showcase-procurement" aria-label="政府調達データ分析ツールの紹介へ">
                  <div className="showcase-screen">
                    <div className="window-line"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>Gov IT Procurement Watch</span></div>
                    <Image src={`${basePath}/images/procurement-overview.jpg`} width={1280} height={720} alt="政府調達データ分析ツールの実画面。取得日時、案件件数などを表示。2026年10月4日の保存データ。" unoptimized priority />
                  </div>
                  <div className="showcase-caption"><span className="showcase-name">政府調達データ分析ツール</span><span className="showcase-arrow" aria-hidden="true"><Arrow /></span></div>
                </a>
                <a href="#project-ctx" className="showcase-card showcase-ctx" aria-label="CTX HANDOFFの紹介へ（無料公開版：公開中）">
                  <div className="showcase-card-top"><span>02 / AI · HANDOFF</span></div>
                  <span className="showcase-ctx-name">CTX<span>HANDOFF<span className="showcase-period">.</span></span></span>
                  <span className="showcase-planes" aria-hidden="true"><i /><i /><i /></span>
                  <span className="showcase-arrow showcase-card-arrow" aria-hidden="true"><Arrow /></span>
                </a>
                <a href="#project-support" className="showcase-card showcase-support" aria-label="AI問い合わせ対応支援アプリの紹介へ（開発中）">
                  <div className="showcase-card-top"><span>03 / AI · WORK SUPPORT</span></div>
                  <span className="showcase-support-name">AI問い合わせ<br />対応支援アプリ</span>
                  <span className="showcase-orbit" aria-hidden="true"><i /><i /></span>
                  <span className="showcase-arrow showcase-card-arrow" aria-hidden="true"><Arrow /></span>
                </a>
              </div>
            </div>
          </section>
          <div className="intro-bottom wrap"><span>小さな試作から、仕事の新しい選択肢を。</span><span className="mono">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div>
          </div>

          <section className="works light-section" id="works" aria-labelledby="works-title">
            <div className="wrap">
              <div className="section-top"><p className="eyebrow section-kicker">01 / SELECTED WORKS</p><span className="section-aside">公開したもの、いまつくっているもの。</span></div>
              <div className="works-heading"><h2 id="works-title">手を動かして、<br className="mobile-only" />かたちにしたもの。</h2><span className="work-count">04<span>PROJECTS</span></span></div>

              <article className="featured-project" id="project-procurement" aria-labelledby="procurement-title">
                <div className="project-visual procurement-visual">
                  <span className="visual-index">01 — DATA TOOL</span>
                  <div className="project-screen"><Image src={`${basePath}/images/procurement-overview.jpg`} width={1280} height={720} alt="Gov IT Procurement Watchの公開資料にある実際のダッシュボード画面" unoptimized /></div>
                  <div className="visual-caption"><span>実際のアプリ画面</span><span>保存データ / 2026.10.04</span></div>
                </div>
                <div className="project-info">
                  <div className="project-status"><span className="status-dot" />ソース公開済み<span className="project-type">DATA / AUTOMATION</span></div>
                  <p className="project-en">Gov IT Procurement Watch</p>
                  <h3 id="procurement-title">公開データを、<br />確認しやすい情報へ。</h3>
                  <p className="project-name">政府調達データ分析ツール</p>
                  <p className="project-description">デジタル庁の公開調達一覧を保存し、前回との差分や現在の一覧を確認するツール。目視での確認を、取得・検証・比較・表示の流れにしています。</p>
                  <ul className="tags" aria-label="使用技術"><li>Python</li><li>Streamlit</li><li>データ可視化</li></ul>
                  <ExternalLink href={repository} className="project-cta">GitHubで制作内容を見る <Arrow /></ExternalLink>
                </div>
                <details className="project-detail">
                  <summary><span>制作の背景と、実装で工夫したこと</span><span className="detail-toggle" aria-hidden="true" /></summary>
                  <div className="detail-body"><p><strong>つくる目的</strong>公開一覧の目視確認を、保存したデータから再現できる仕組みにすること。</p><p><strong>実装の工夫</strong>取得と表示を分け、保存データから検索・集計・比較を行います。データ欠損や時系列の異常を検証し、曖昧な案件の照合は保留する設計です。</p><p className="detail-note">デジタル庁の公式サービスではありません。Webアプリとしての公開、AI分類・LLMによる解析は行っていません。掲載画像は過去の保存データを表示したものです。</p></div>
                </details>
              </article>

              <div className="secondary-projects">
                <article className="secondary-project" id="project-ctx" aria-labelledby="ctx-title">
                  <div className="project-visual ctx-visual">
                    <span className="visual-index">02 — AI / HANDOFF</span>
                    <span className="ctx-wordmark" aria-hidden="true">CTX<span>HANDOFF<span className="type-period">.</span></span></span>
                    <span className="ctx-structure" aria-hidden="true"><i /><i /><i /></span>
                    <span className="cover-caption">CONTEXT / WORK / NEXT</span>
                  </div>
                  <div className="secondary-info">
                    <div className="project-status"><span className="status-dot" />無料公開版：公開中<span className="project-type">AI / HANDOFF</span></div>
                    <h3 id="ctx-title">CTX HANDOFF</h3>
                    <p className="ctx-category">AIとの作業を、次のチャットへ引き継ぐ。</p>
                    <p>決定事項・保留事項・次の作業をまとめ、別のAIや新しいチャットで作業を再開しやすくする仕組みです。</p>
                    <p>複数のAIを使う方や、長いチャットでの説明の繰り返しに困っている方におすすめ。無料公開版はインストール不要のテンプレートです。</p>
                    <div className="secondary-bottom">
                      <ul className="tags" aria-label="分類"><li>無料テンプレート</li><li>引き継ぎ</li><li>複数AI</li></ul>
                      <span className="coming-soon">シリーズの他ツールは開発中</span>
                    </div>
                    <ExternalLink href={ctxStarterKitRepository} className="ctx-trial-link">無料公開版を使ってみる（GitHub） <Arrow /></ExternalLink>
                  </div>
                </article>

                <article className="secondary-project" id="project-support" aria-labelledby="support-title">
                  <div className="project-visual support-visual">
                    <ScreenshotGallery basePath={basePath} screens={supportScreens} />
                    <div className="support-screens-foot"><span>03 — MOCK MVP</span><span>クリックで拡大・スクロール表示（架空の問い合わせ）</span></div>
                  </div>
                  <div className="secondary-info"><div className="project-status developing"><span className="status-dot" />試作版完成・開発中<span className="project-type">AI / WORK SUPPORT</span></div><h3 id="support-title">AI問い合わせ対応支援アプリ</h3><p className="ctx-category">問い合わせの整理から返信文の作成、確認・保存までを支援</p><p>問い合わせを入力すると、要約・分類・優先度・返信文の下書きを表示します。AIの提案を人間が確認・編集してから保存する仕組みを実装しています。</p><p>現在は模擬AIを使用したMock MVPが完成し、ブラウザでの動作確認まで実施しています。</p><p className="support-ai-note">※実際のAIサービスとの接続は今後実装予定です。</p><div className="secondary-bottom"><ul className="tags" aria-label="分類"><li>AI</li><li>業務支援</li></ul><span className="coming-soon">Mock MVP完成</span></div></div>
                </article>
              </div>
              <p className="work-note">02のビジュアルは紹介用のタイトルデザインです。03・04はそれぞれ実際の画面です（03はMock MVP・架空の問い合わせ内容、04は公開中の体験版・架空の回答例）。</p>

              <article className="featured-project" id="project-ctxent" aria-labelledby="ctxent-title">
                <div className="project-visual ctxent-visual">
                  <ScreenshotGallery basePath={basePath} screens={ctxentScreens} />
                  <div className="support-screens-foot"><span>04 — ENTERPRISE AI</span><span>クリックで拡大・スクロール表示（公開中の体験版・架空の回答例）</span></div>
                  <CtxentCta className="ctxent-cta-group ctxent-cta-desktop" />
                </div>
                <div className="project-info">
                  <div className="project-status"><span className="status-dot" />無料体験版公開中・開発継続中<span className="project-type">AI / ENTERPRISE</span></div>
                  <p className="project-en">Enterprise CTX</p>
                  <h3 id="ctxent-title">企業のAI導入を、<br />安心して進めるために。</h3>
                  <p className="project-name">企業向けCTX</p>
                  <CtxentCta className="ctxent-cta-group ctxent-cta-mobile" />
                  <p className="project-description">CodexやClaude CodeなどのAIツールを企業で導入する際に、事前に確認しておきたいリスクや運用ルールを整理する無料診断ツールです。9つのテーマに沿って回答すると、診断結果・改善提案・改善内容のまとめを確認できます。専門知識がなくても、自社のAI導入について考え始められるように設計しています。</p>
                  <p className="project-note">※現在は診断体験版です。実際のアクセス制御や情報漏えい防止を行う製品ではありません。</p>
                  <ul className="tags" aria-label="分類"><li>AI導入診断</li><li>改善提案</li><li>無料体験版</li></ul>
                  <a href="#contact" className="project-cta-secondary">導入のご相談・お問い合わせはこちら</a>
                  <IntroVideo basePath={basePath} />
                </div>
              </article>
            </div>
          </section>

          <section className="about-section" id="about" aria-labelledby="about-title">
            <div className="wrap">
              <div className="section-top"><p className="eyebrow">02 / ABOUT &amp; APPROACH</p><span className="about-signature">kontu-aka.</span></div>
              <div className="about-grid"><div className="about-identity"><h2 id="about-title">小さく試して、<br />日々の仕事に<br /><span>役立つものへ。</span></h2><Image className="studio-logo" src={`${basePath}/images/kontu-studio-logo.png`} width={1448} height={1086} alt="こんつの制作室 / KONTU STUDIO のロゴ" unoptimized /></div><div className="about-text"><p className="about-lead">AIを使うことから、<br />使いやすい仕組みをつくることへ。</p><p>独学でAIを活用したツール制作に取り組んでいます。<br />身近な業務の困りごとを、使いやすい仕組みに変えることを目指しています。</p><p>情報を集める、整理する、見えるようにする。<br />日々の仕事を少しラクにするために、企画と試作を重ねています。</p><a className="about-contact-link" href="#contact">お問い合わせはこちら <span aria-hidden="true">→</span></a></div></div>
              <div className="capabilities" aria-label="できること"><div><span className="capability-number">01</span><h3>情報を、整理する。</h3><p>情報収集、整理の効率化</p></div><div><span className="capability-number">02</span><h3>データを、見える形に。</h3><p>データの集計、可視化</p></div><div><span className="capability-number">03</span><h3>アイデアを、試す。</h3><p>AIを活用した業務支援ツールの試作</p></div></div>
            </div>
          </section>

          <section className="connect-section light-section" aria-labelledby="connect-title"><div className="wrap connect-grid"><div><p className="eyebrow section-kicker">03 / FIND ME ON GITHUB</p><h2 id="connect-title">つくったものから、<br />知ってもらえたら。</h2><p>制作したコードや、取り組みの詳細を公開しています。</p></div><ExternalLink href="https://github.com/kontu-aka" className="github-button"><span>GitHub<span className="github-handle">@kontu-aka</span></span><Arrow /></ExternalLink></div></section>

          <section className="contact-section light-section" id="contact" aria-labelledby="contact-title">
            <div className="wrap connect-grid contact-grid">
              <div>
                <p className="eyebrow section-kicker">04 / GET IN TOUCH</p>
                <h2 id="contact-title">お問い合わせ</h2>
                <p>お仕事のご相談、ご意見・ご感想など、お気軽にお寄せください。</p>
              </div>
              <div className="contact-form">
                <ContactForm />
              </div>
            </div>
          </section>
        </main>

        <footer className="footer light-section"><div className="wrap footer-inner"><a className="footer-brand" href="#top">kontu-aka.</a><p>AI &amp; PRACTICAL TOOLS / PORTFOLIO</p><a className="back-top" href="#top">Back to top <span aria-hidden="true">↑</span></a></div><div className="wrap footer-meta"><p className="studio-credit">制作・運営：こんつの制作室</p><p className="photo-attribution">背景写真：本人撮影</p></div></footer>
      </div>
    </>
  );
}
