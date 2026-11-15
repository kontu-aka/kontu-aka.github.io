# こんつの制作室 — kontu-aka portfolio

Next.js + React + TypeScriptの個人ポートフォリオ。現在のローカル公開候補はR5.2aです。Human承認済みのデザインを維持し、公開前の限定修正を行っています。GitHubのmain・公開サイトへの反映は正式な公開承認後に行います。

R5.2aで変更したのは次の6点です。配色・書体・カード自体のデザインは変更していません。

1. お問い合わせフォームのJavaScript非実行時の送信先を明示（下記「お問い合わせフォーム」参照）
2. ファーストビューと自己紹介の文章に、相談できる仕事の内容を追記
3. 制作実績を相談につながりやすい順に並べ替え、4件とも同じ大型カードに統一。説明文を「困りごと」起点に書き直し
4. 検索・共有用のメタデータと画像を新規追加（下記「検索・共有設定」参照）
5. お問い合わせセクションに、ご相談・お見積もりが無料であることと、有料になる範囲の案内を追加
6. 公開前監査（コウくんによる独立監査）の指摘を受け、`scripts/verify-export.mjs` のフォーム検査を強化し、本READMEを実態に合わせて更新

## 開発と静的確認

Node.js 24.x（.nvmrc参照）とnpmを使用します。

```sh
npm ci
npm run build
npm run typecheck
npm run verify
npm run preview
```

`npm run verify` は既存の `npm run verify:export` を実行する別名です。GitHub Actionsでは引き続き `verify:export` を使用します。

ローカルURL: http://127.0.0.1:3010/ 。開発時は `npm run dev` を使用します。

`output: 'export'` で `out/` にHTML・CSS・JavaScriptと画像・動画を生成します。Node.jsサーバー、データベース、APIキーは公開時に不要です。フォントはOSの標準フォントを利用するため、端末間では通常の字体差が生じます。

## GitHub Pages

公開URL: https://kontu-aka.github.io/

既存のPublicリポジトリ `kontu-aka/kontu-aka.github.io` のmainを使用します。ルートURLなので `NEXT_PUBLIC_BASE_PATH` は空です。ソース一式ではなく `out/` だけをPagesの配信物にします。`public/.nojekyll` を含め、`_next/` 以下の静的ファイルを維持します。

1. 公開候補の差分・追加素材・commit用メール設定を確認し、既存の未commit変更を保護する。
2. Humanの承認後、対象ファイルだけをcommit・pushし、レビューした変更をmainへ反映する。
3. Settings → PagesのSourceが **GitHub Actions** であること、および `github-pages` environmentの公開対象ブランチを確認する。既存workflowはmainでの実行に限定している。
4. 公開承認後、Actions → Publish portfolio to GitHub Pages → Run workflowを承認対象のmainで手動実行する。
5. デプロイ成功後、PC・スマートフォンで画像・動画・リンク・お問い合わせ導線・詳細開閉・ギャラリー・ホバーを再確認する。フォームの実送信テストはHumanの指示のもと実施する。

pushによるPagesの自動公開は設定していません。ただし、Publicリポジトリへのpush時点でソースと素材は公開されます。ワークフローのGITHUB_TOKENはGitHubが発行するものを利用し、個人アクセストークンや追加Secretは不要です。ビルドはread権限、デプロイだけpages/write・id-token/writeを使用します。

将来プロジェクト用URLへ切り替える場合は、NEXT_PUBLIC_BASE_PATHとワークフローのリポジトリ条件を変更して再ビルド・再検証が必要です。現在の設定は上記ルートURL専用です。

## 掲載内容・素材

制作実績は4件です。以下は現在のページの掲載内容・開発状況に合わせています。掲載順はページと同じで、企業向けの相談につながりやすい順に並べています。

- **01 企業向けCTX**: 無料体験版公開中・開発継続中。AI導入前の確認事項を整理する無料診断ツールです。掲載画像は公開中の無料版01〜05の画面・架空の回答例です。実際のアクセス制御や情報漏えい防止を行う製品ではありません。
- **02 AI問い合わせ対応支援アプリ**: ソース公開済み（R3）。リポジトリは [kontu-aka/ai-inquiry-triage](https://github.com/kontu-aka/ai-inquiry-triage) です。掲載画像は同リポジトリ `docs/screenshots/` の4枚とバイト一致で、すべて架空の問い合わせです。実装状況は下記のとおりです。
  - 実装済み: ローカルLLM（Ollama）への接続、要約・分類・優先度・返信案の生成、人が確認・編集しないと保存できない確定フロー、AIの候補と人が確定した内容の両方を1件に保存する仕組み。
  - 未実装: 外部のホスト型AIサービスへの接続（設定値 `LLM_PROVIDER` は `mock` と `ollama` のみを受け付け、既定値は `mock`。`openai` は拒否されます）、返信の送信機能、認証・複数人運用。
  - デモ用アプリです。実在の個人情報・機密情報を入力する想定ではありません。
- **03 政府調達データ分析ツール**: ソース公開済み。デジタル庁の公開調達一覧を保存し、前回との差分や現在の一覧を確認するツールです。Webアプリとしての公開、AI分類・LLMによる解析は行っていません。
- **04 CTX HANDOFF**: 無料公開版を公開中。CTX HANDOFF Starter Kitへのリンクを設置しています。シリーズの他ツールは開発中です。ページ上のビジュアルはHTML/CSSによる紹介用のタイトルデザインで、アプリ画面ではありません。

企業向けCTXの紹介動画は、2026-11-12にHumanが映像・音声を確認し、公開を承認したR6統合修正版です（約64秒）。承認済みMP4を無加工で掲載しています。このR6紹介動画は、無料版01〜05と有料版06の機能を紹介します。無料版では診断・改善提案・改善内容のまとめ、有料版06では共通ルール5件・基本指示9テーマの指示文の確認・コピー・保存ができます。実際のAI設定は変更しません。

**お問い合わせフォーム**: 本サイトには[Formspree](https://formspree.io/)を使った送信可能なお問い合わせフォームがあります。お名前・会社名／メールアドレス／お問い合わせの種類／お問い合わせ内容の4項目を送信すると、Formspreeを経由して運営者に通知されます。フォーム自体に受信用メールアドレスは記載していません（Formspree側のダッシュボードで設定・管理）。本リポジトリ・本サイトにサーバーサイドのコードやAPIキーは含まれていません。

JavaScriptが動作する通常の環境では、これまでどおりクライアント側のJavaScript（`@formspree/react`）が送信を行います。R5.2では、JavaScriptが動作しない場合に備えて `<form>` に `method="POST"` と `action="https://formspree.io/f/mqpenzan"` を明示しました。属性を持たない `<form>` のHTML既定動作は「現在のURLへのGET」で、入力内容がクエリ文字列としてアドレスバー・履歴・リファラに残る可能性があります。明示後は、JavaScriptが動かない場合も同じFormspreeの宛先へPOSTされ、入力内容はURLではなくリクエスト本文に入ります。JavaScriptが動作する場合は `handleSubmit` が `preventDefault()` を呼ぶため、この属性が使われることはなく、従来の送受信動作は変わりません。R5.2aでは、この状態が将来くずれないように `scripts/verify-export.mjs` の検査を強化しました。ビルド成果物に対して次をすべて検査し、1つでも満たさなければ失敗します。

- `<form>` が**ちょうど1個**であること（0個・2個以上はいずれも失敗）
- `action` 属性が存在し、値が `https://formspree.io/f/mqpenzan` と完全一致すること（属性の欠落も失敗）
- `method` 属性が存在し、`POST` であること（属性の欠落・GETはいずれも失敗）
- ページ内に `formaction` 属性と `mailto:` リンクが無いこと
- 配信JSにフォームID `mqpenzan` が含まれ、JSが組み立てる送信先URLのホストが `formspree.io` のみであること（別ホスト・別IDは失敗）

強化前は「誤った `action` 値」しか検出できず、`action` の欠落・`method` のGET化・`<form>` の消失・JS側の送信先変更はすべて素通りしていました。強化後はいずれも検出します。意図的な違反12種類を隔離環境のコピーに対して試し、対照群（無改変）のみ成功し、違反11種類すべてで失敗することを確認しています。

## 検索・共有設定（R5.2）

- `src/app/layout.tsx` の `metadata` で、title・description・canonical・OGP（og:*）・Twitterカード・アイコンを指定しています。`metadataBase` は `https://kontu-aka.github.io/` です。
- 共有画像は `public/og-cover.png`（1200×630）。アイコンは `public/icon.svg`（タブ用・図形のみ）、`public/favicon.ico`（32px）、`public/apple-touch-icon.png`（180px）です。
- `src/app/robots.ts` と `src/app/sitemap.ts` が `out/robots.txt` と `out/sitemap.xml` を生成します。どちらも `output: 'export'` のため `export const dynamic = "force-static"` を指定しています。`sitemap.xml` に `lastModified` は入れていません（ビルドのたびに出力バイトが変わるのを避けるため）。
- `NEXT_PUBLIC_BASE_PATH` を設定してプロジェクトURLへ切り替える場合、これらのURLにも同じ接頭辞が付きます。ドメインを変更する場合は `metadataBase`・`robots.ts`・`sitemap.ts` の絶対URLを合わせて変更してください。

**ご相談の費用について**: お問い合わせセクションに、ご相談・お見積もりが無料であること、調査・設計・制作は有料であること、有料作業は着手前に金額を提示し了承後に着手することを記載しています。初回限定・回数制限といった条件は設けていません。具体的な金額、返信期限、所在地はページに記載していません。

素材については [ASSETS.md](ASSETS.md) を参照してください。ソースや画像・動画に新たな包括的オープンソースライセンスは付与していません。

参考: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) / [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports) / [Formspree](https://formspree.io/)
