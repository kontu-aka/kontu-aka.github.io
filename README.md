# kontu-aka portfolio

Next.js + React + TypeScriptの個人ポートフォリオ。デザイン・掲載内容はローカル版v0.15（ノアによる独立レビュー: PASS_WITH_MINOR、BLOCKER 0 / MAJOR 0）を継承しています。

## 開発と静的確認

Node.js 24.x（.nvmrc参照）とnpmを使用します。

```sh
npm ci
npm run build
npm run typecheck
npm run verify:export
npm run preview
```

ローカルURL: http://127.0.0.1:3010/ 。開発時は `npm run dev` を使用します。

`output: 'export'` で `out/` にHTML・CSS・JavaScriptと画像を生成します。Node.jsサーバー、データベース、APIキーは公開時に不要です。フォントはOSの標準フォントを利用するため、端末間では通常の字体差が生じます。

## GitHub Pages

公開予定: https://kontu-aka.github.io/

Publicリポジトリ `kontu-aka/kontu-aka.github.io` のmainを使用します。ルートURLなので `NEXT_PUBLIC_BASE_PATH` は空です。ソース一式ではなく `out/` だけをPagesの配信物にします。`public/.nojekyll` を含め、`_next/` 以下の静的ファイルを維持します。

1. 承認後にリポジトリを作成し、このフォルダーだけをcommit・pushする。
2. Settings → Pages → Build and deployment → Sourceを **GitHub Actions** にする。
3. `github-pages` environmentのデプロイ可能ブランチをmainに限定する。
4. 承認後にActions → Publish portfolio to GitHub Pages → Run workflowをmainで手動実行する。
5. デプロイ成功後、PC・スマートフォンで画像・リンク・お問い合わせフォームの表示・詳細開閉・ホバーを再確認する。

pushによる自動公開は設定していません。ワークフローのGITHUB_TOKENはGitHubが発行するものを利用し、個人アクセストークンや追加Secretは不要です。ビルドはread権限、デプロイだけpages/write・id-token/writeを使用します。

将来プロジェクト用URLへ切り替える場合は、NEXT_PUBLIC_BASE_PATHとワークフローのリポジトリ条件を変更して再ビルド・再検証が必要です。現在の設定は上記ルートURL専用です。

## 掲載内容・素材

制作実績はソース公開済み1件、開発中2件です。CTXには公開リポジトリへのリンクを設置していません。

**お問い合わせフォームについて（v0.8からの変更点）**: 本サイトには[Formspree](https://formspree.io/)を使った送信可能なお問い合わせフォームがあります。お名前・会社名／メールアドレス／お問い合わせの種類／お問い合わせ内容の4項目を送信すると、Formspreeを経由して運営者に通知されます。フォーム自体に受信用メールアドレスは記載していません（Formspree側のダッシュボードで設定・管理）。送信にはブラウザのJavaScript（クライアント側）のみを使用し、本リポジトリ・本サイトにサーバーサイドのコードやAPIキーは含まれていません。

素材については [ASSETS.md](ASSETS.md) を参照してください。ソースや画像に新たな包括的オープンソースライセンスは付与していません。

参考: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) / [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports) / [Formspree](https://formspree.io/)
