# VIS-004: Aurora Portal Architecture Standard

## 1. 目的
プロジェクトポータルを「成果物の展示場」ではなく、「プロジェクト統治の全体像（Big Picture）の監視塔」として定義し、常に一定の構造を保つことで透明性を確保する。

## 1. Directory & File Placement
- **Master Dashboard**: プロジェクト全体の「脳」である `00_Master_Report.md` は、プロジェクトルートではなく `management/00_Master_Report/` に配置されなければならない。
- **Pillar Directories**: 01〜08の各ディレクトリは、常に最新のプロジェクト構成（Requirements, Planning, Implementation, Quality_Gate, Delivery, Governance, Team_Analytics）と同期している必要がある。
- **Portal Entry**: `index.html` および関連エンジンは `management/08_Documentation_Portal/` に集約すること。

## 2. Navigation & Experience (Direct Path Fetching)
- **Zero-Exit Browsing**: ポータル内の Markdown に記述されたファイル間リンクをクリックした際、ブラウザがポータルを離脱することを禁止する。
- **Dynamic Fetching**: ポータルは内容を静的に保持せず、`data.js` に記述された物理パスに対して `fetch()` を行い、リアルタイムにコンテンツを表示すること。
- **Path Transparency**: 各ドキュメント表示の冒頭に、参照している物理パスを明示し、情報の透明性を 100% 確保すること。
- **動的バインド**: 各項目に対して、フォルダ内の最新の `.md` ファイルを自動的に紐付けること。

## 3. コンテンツ表示基準 (Content Stewardship)
- **Pending 表示の義務**: フォルダが空、または成果物が未着手の場合、タイトルを表示した上で本文エリアに以下の標準メッセージを表示すること。
  - 「⏳ **Pending**: 本フェーズは現在準備中、または未着手です。」
- **Full Fidelity**: 存在するドキュメントは、要約せず全文をインライン表示すること。

## 4. データ構造 (Logic)
- `data.js` はコンテンツを保持せず、物理ファイルへの相対パスのみを `window.projectDocs` オブジェクトにマッピングすること。


---
**Status**: Adopted (2026-04-12)
**Owner**: documentation-architect (Antigravity)
