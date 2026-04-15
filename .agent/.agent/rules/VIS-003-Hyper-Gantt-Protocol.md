# VIS-003: Aurora Hyper-Gantt Protocol

## 1. 目的
プロジェクトの「加速（Acceleration）」を定量化し、人間（Human）とAIの工数対比を美しく、かつ厳格に可視化することで、統治の透明性を極大化する。

## 2. 定義規格 (Visual Architecture)
- **カラーパレット**: 
  - AI Actual: `linear-gradient(90deg, #00f2fe 0%, #7028e4 100%)` (極光グラデーション)
  - Human Plan: `rgba(255, 255, 255, 0.15)` (ゴーストスタイル)
- **KPI表示**: 以下の3点を必須項目として最上部に配置する。
  1. **Human Plan (Total Days)**: 人間が作業した場合の見積もり。
  2. **AI Actual (Total Minutes)**: AIが実際に費やした作業時間。
  3. **Acceleration (X-Factor)**: 人間工数/AI工数による加速倍率。

## 3. レイアウト基準 (Portal Integration)
- **Inline Embedded Mode**: ダッシュボード（`00_Master_Report.md`）の「📈 進捗可視化」セクション直下に、Hyper-Gantt を埋め込み形式でインジェクトすること。
- **Horizontal Scroll**: 埋め込みエリア内での横スクロールを必須とし、情報の全体像がレポートの縦の流れを分断しないように設計する。
- **Fullscreen Capability**: 埋め込みエリアの右横（またはヘッダー）に「全画面表示」ボタンを設置し、別レイヤーまたは別窓でガントチャートを最大化表示できる機能を備えること。
- **Structural Integrity**: 縦方向の分割（スプリットビュー）は原則禁止とし、レポートの文脈の中で自然に進捗を確認できる構成とする。

## 4. データ構造 (Logic)
- 進捗データは `const tasks = [...]` 形式のJSONオブジェクトとしてポータルに内包し、外部の `fetch` 制限を受けない設計とすること。

---
**Status**: Adopted (2026-04-12)
**Owner**: documentation-architect
