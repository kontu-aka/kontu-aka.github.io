# こんつの制作室 — kontu-aka portfolio

Next.js + React + TypeScriptの個人ポートフォリオ。現在のローカル公開候補はR5.1です。Human承認済みのデザインを維持し、公開前の限定修正を行っています。GitHubのmain・公開サイトへの反映は正式な公開承認後に行います。

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

制作実績は4件です。以下は現在のページの掲載内容・開発状況に合わせています。

- **政府調達データ分析ツール**: ソース公開済み。デジタル庁の公開調達一覧を保存し、前回との差分や現在の一覧を確認するツールです。
- **CTX HANDOFF**: 無料公開版を公開中。CTX HANDOFF Starter Kitへのリンクを設置しています。シリーズの他ツールは開発中です。
- **AI問い合わせ対応支援アプリ**: 試作版完成・開発中。模擬AIを使用したMock MVPの画面を掲載しています。実際のAIサービスとの接続は今後実装予定です。
- **企業向けCTX**: 無料体験版公開中・開発継続中。AI導入前の確認事項を整理する無料診断ツールです。掲載画像は公開中の無料版01〜05の画面・架空の回答例です。実際のアクセス制御や情報漏えい防止を行う製品ではありません。

企業向けCTXの紹介動画は既存のR5動画です。以前の画面と有料版「AI向け指示案」の紹介が含まれるため、動画の上に注意書きを表示しています。無料版では診断と改善提案を確認できます。

**お問い合わせフォーム**: 本サイトには[Formspree](https://formspree.io/)を使った送信可能なお問い合わせフォームがあります。お名前・会社名／メールアドレス／お問い合わせの種類／お問い合わせ内容の4項目を送信すると、Formspreeを経由して運営者に通知されます。フォーム自体に受信用メールアドレスは記載していません（Formspree側のダッシュボードで設定・管理）。送信にはブラウザのJavaScript（クライアント側）のみを使用し、本リポジトリ・本サイトにサーバーサイドのコードやAPIキーは含まれていません。

素材については [ASSETS.md](ASSETS.md) を参照してください。ソースや画像・動画に新たな包括的オープンソースライセンスは付与していません。

参考: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) / [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports) / [Formspree](https://formspree.io/)
