---
description: Prepare final release documents, quality summary, and delivery note after implementation is complete.
---

# Prepare Delivery

## Goal
実装完了後に、最終レポートと納品文書をまとめる。

## Inputs
- `08_reports/master-report.md`
- `05_quality/`
- `06_debug/`
- `04_implementation/`

## Steps
1. 完了済みスコープを確認する。
2. テスト結果を集計する。
3. 未解決事項を既知制約として整理する。
4. `delivery-skill` を使って以下を生成する:
   - `07_release/release-notes.md`
   - `07_release/final-test-summary.md`
   - `07_release/delivery-note.md`
5. 納品準備完了を `master-report.md` に反映する。

## Outputs
- `07_release/release-notes.md`
- `07_release/final-test-summary.md`
- `07_release/delivery-note.md`
- `08_reports/master-report.md`