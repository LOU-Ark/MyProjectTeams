# 🛰️ GVN-004: Master-Planning Synchronization Protocol v1.0

## 1. 目的
`00_Master_Report.md`（全体概況）と `02_Planning.md`（詳細計画）におけるガントチャートの不一致を根絶し、プロジェクトの「真実の単一ソース」を維持する。

## 2. 同期の原則
* **Full Mirroring**: `00_Master_Report.md` の「進捗可視化」セクションにある Mermaid ブロックは、常に `02_Planning.md` の「進捗可視化」セクションの完全な複製でなければならない。
* **Atomic Update**: エージェントまたはユーザーが計画（期間、依存関係、タスク名）を変更した場合、一回のターン内で両方のファイルを更新しなければならない。分割して更新してはならない。

## 3. 運用手順 (Agent Instruction)
1.  `02_Planning.md` のガントチャートを修正する。
2.  修正した Mermaid ブロック（` ```mermaid ` から ` ``` ` まで）をコピーする。
3.  `00_Master_Report.md` の該当箇所にペーストして上書きする。
4.  WBSテーブルについても同様に同期を行う。

## 4. 検証基準
* ポータル（index.html）で Master Report を表示した際、Planning と寸分たがわぬガントチャートが表示されていること。
* フェーズの追加や削除が発生した際、ディレクトリ構造（01, 02...）とダッシュボードのテーブルが一致していること。

---
**Version:** 1.0.0 (Establishment of Sync Standard)
