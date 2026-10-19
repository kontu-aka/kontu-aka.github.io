import Image from "next/image";
import ContactForm from "./ContactForm";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
const repository = "https://github.com/kontu-aka/gov-it-procurement-watch";

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function ExternalLink({ href, children, className = "" }: {
  href: string; children: React.ReactNode; className?: string;
}) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only">（新しいタブで開きます）</span></a>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">本文へ移動</a>
      <div className="dark-intro" id="top">
        <header className="header wrap">
          <a className="brand" href="#top" aria-label="kontu-aka 先頭へ">kontu-aka<span className="brand-period">.</span><span className="brand-caption">AI &amp; PRACTICAL TOOLS</span></a>
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
              <a href="#works" className="button button-lime">制作実績を見る <span aria-hidden="true">↓</span></a>
              <div className="hero-keywords"><span>AI活用</span><span>データ分析</span><span>業務改善</span></div>
            </div>
            <div className="hero-showcase" role="group" aria-label="3作品のショーケース">
              <div className="showcase-heading"><span>SELECTED PROJECTS</span><span>01 — 03</span></div>
              <div className="showcase-stack">
                <a href="#project-procurement" className="showcase-card showcase-procurement" aria-label="政府調達データ分析ツールの紹介へ">
                  <div className="showcase-screen">
                    <div className="window-line"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>Gov IT Procurement Watch</span></div>
                    <Image src={`${basePath}/images/procurement-overview.jpg`} width={1280} height={720} alt="政府調達データ分析ツールの実画面。取得日時、案件件数などを表示。2026年10月4日の保存データ。" unoptimized priority />
                  </div>
                  <div className="showcase-caption"><span className="showcase-name">政府調達データ分析ツール</span><span className="showcase-arrow" aria-hidden="true"><Arrow /></span></div>
                </a>
                <a href="#project-ctx" className="showcase-card showcase-ctx" aria-label="CTX HANDOFFの紹介へ（無料版公開中）">
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
              <div className="works-heading"><h2 id="works-title">手を動かして、<br className="mobile-only" />かたちにしたもの。</h2><span className="work-count">03<span>PROJECTS</span></span></div>

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
                    <div className="project-status"><span className="status-dot" />無料版公開中<span className="project-type">AI / HANDOFF</span></div>
                    <h3 id="ctx-title">CTX HANDOFF</h3>
                    <p className="ctx-category">AIとの作業を、次のチャットへ引き継ぐ。</p>
                    <p>決定事項・保留事項・次の作業をまとめ、別のAIや新しいチャットで作業を再開しやすくする仕組みです。</p>
                    <p>複数のAIを使う方や、長いチャットでの説明の繰り返しに困っている方におすすめ。無料版はインストール不要のテンプレートです。</p>
                    <div className="secondary-bottom">
                      <ul className="tags" aria-label="分類"><li>無料テンプレート</li><li>引き継ぎ</li><li>複数AI</li></ul>
                      <span className="coming-soon">シリーズ開発中</span>
                    </div>
                    <ExternalLink href="https://github.com/kontu-aka/ctx-handoff-starter-kit" className="ctx-trial-link">無料版を使ってみる（GitHub） <Arrow /></ExternalLink>
                  </div>
                </article>

                <article className="secondary-project" id="project-support" aria-labelledby="support-title">
                  <div className="project-visual support-visual"><span className="visual-index">03 — WORK IN PROGRESS</span><span className="support-wordmark" aria-hidden="true">NEXT<br /><span>IN PROGRESS</span></span><span className="cover-caption">AI問い合わせ対応支援アプリ</span><span className="progress-label">制作中</span></div>
                  <div className="secondary-info"><div className="project-status developing"><span className="status-dot" />開発中・未公開<span className="project-type">AI / WORK SUPPORT</span></div><h3 id="support-title">AI問い合わせ対応支援アプリ</h3><p className="ctx-category">問い合わせの整理・対応判断をサポート</p><p>問い合わせ内容を整理し、対応時の確認や判断を支援するアプリを開発しています。</p><div className="secondary-bottom"><ul className="tags" aria-label="分類"><li>AI</li><li>業務支援</li></ul><span className="coming-soon">開発中</span></div></div>
                </article>
              </div>
              <p className="work-note">02・03のビジュアルは紹介用のタイトルデザインです。アプリの操作画面ではありません。</p>
            </div>
          </section>

          <section className="about-section" id="about" aria-labelledby="about-title">
            <div className="wrap">
              <div className="section-top"><p className="eyebrow">02 / ABOUT &amp; APPROACH</p><span className="about-signature">kontu-aka.</span></div>
              <div className="about-grid"><h2 id="about-title">小さく試して、<br />日々の仕事に<br /><span>役立つものへ。</span></h2><div className="about-text"><p className="about-lead">AIを使うことから、<br />使いやすい仕組みをつくることへ。</p><p>独学でAIを活用したツール制作に取り組んでいます。<br />身近な業務の困りごとを、使いやすい仕組みに変えることを目指しています。</p><p>情報を集める、整理する、見えるようにする。<br />日々の仕事を少しラクにするために、企画と試作を重ねています。</p></div></div>
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

        <footer className="footer light-section"><div className="wrap footer-inner"><a className="footer-brand" href="#top">kontu-aka.</a><p>AI &amp; PRACTICAL TOOLS / PORTFOLIO</p><a className="back-top" href="#top">Back to top <span aria-hidden="true">↑</span></a></div><div className="wrap photo-attribution">背景写真：本人撮影</div></footer>
      </div>
    </>
  );
}
