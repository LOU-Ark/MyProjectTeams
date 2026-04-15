# 🛰️ VIS-004: Hyper-Gantt Implementation Standard v4.0

## 1. 概要
本プロジェクトにおけるガントチャート（Hyper-Gantt）は、人間とAIの協調を視覚化する中核コンポーネントであり、以下の基準を 100% 満たさなければならない。

## 2. 記述プロトコル (Markdown)
- **WBSテーブル基準**: 以下の 5 列構成の Markdown テーブルを必須とする。
  `| Phase | Task ID | Task Name | Description | Status |`
  - ポータルエンジンはこのテーブルを検出し、自動的にリッチな「WBSカード」へ変換する。
- **期間データの紐付け**: `02-Planning` 内の Mermaid セクションにあるタスク名と期間（例: `Task Name :TSK-01, 2026-04-13, 2d`）をキーとして、ガントのバー長さを決定する。
- **ID体系**: `TSK-\d+`（例: TSK-01）の WBS ID を必須とする。

## 3. 視覚的基準 (Visuals)
- **WBSカード (UI Card)**:
  - グラスモーフィズム（透過率 3%）を基調とし、フェーズごとにアクセントカラーを適用する。
  - 右端にステータスバッジ（例: 0%）を配置する。
- **ガント・セパレートレイアウト**:
  - 情報の重なりを避けるため、左側に「Phase/Task情報（280px固定）」、右側に「タイムライン・プロット」の 2 カラム構造を維持すること。
- **バー・グラデーション**: ネオン・グラデーション（`#00f2fe` → `#39ff14`）と 15px の Glow 効果を適用する。

## 4. 機能的基準 (Portal Engine)
- **Asset Integrity**: `style.css`、`engine.js` は、必ず `.agent/assets/` のゴールデン・アセットと同期させること。
- **Gantt Source Redirection**: 
  - 現在のドキュメント内に WBS テーブルがない場合、エンジンはプロジェクト内の `02_Planning` 他から自動的にデータを収集・統合する努力をすること。
  - データが完全に不足している場合は、標準の Mermaid `gantt` ブロックの描画を阻害（置換）してはならない。
- **HUD Injection**: 「進捗可視化」または「Gantt Chart」の見出し直下に、KPI 3指標と Hyper-Gantt 本体を自動注入すること。
- **Analysis HUD**: 全画面表示モードを備え、大規模な WBS でも 1 画面で俯瞰できる One-Screen Fit 機能を保持すること。
- **Extraction Fidelity (NN-AAAA Pattern)**: エンジンは、Task ID が WBS 標準形式（`TSK-\d+` または `\d{2}-[A-Z0-9]+`）に厳密に一致する行のみをタスクとして抽出すること。ディレクトリ一覧（単なる数値ID）やヘッダー文字を含む行は、KPI汚染防止のため物理的に除外しなければならない。

## 5. データの透明性 (Full Fidelity Rule)
- **要約の絶対禁止**: ポータル（index.html）にドキュメントを埋め込む際、いかなる理由があろうとも「要約」や「抜粋」を行ってはならない。常に 100% の情報を全文同期させること。
- **マスター・ファースト**: `management/00_Master_Report/00_Master_Report.md` を唯一の正解（Single Source of Truth）としてポータル・ダッシュボードのトップに全文表示すること。

## 6. 統治と再現性 (Governance & Reproducibility)
- **Governance First**: 不備を発見した際は、個別のファイル修正に先立ち、必ず `.agent/rules/` および `.agent/templates/` を修正すること。
- **Template Synchronization**: 成果物は常にテンプレートから生成される状態を維持し、手動による構造改変を禁止する。
- **Consistency Audit**: 修正後は `🌟_Portal_Generator_Master` 等を用いて、システム全体としての整合性が 100% 保たれているかを確認すること。

---
**Version:** 4.1.0 (Governance Integration Standard)
