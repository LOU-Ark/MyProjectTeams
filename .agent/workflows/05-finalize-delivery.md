---
description: 全フェーズ完了後にリリースノートや納品書を作成し、プロジェクトを正式にクローズする納品フロー。
---
# WORKFLOW: 05-finalize-delivery

## ACTOR
- Skill: `delivery-manager`

## TRIGGER
- `🌟_Phase_Runner_Master` から「これが最終フェーズであった」との判定を受けた時。

## STEPS
1. **AGGREGATE**: 全フェーズの `04_Quality_Gate` の結果を集計し、`06_Delivery/02_Final_Test_Summary.md`（総合品質証明書）を作成する。
2. **DOCUMENT**: 開発内容をユーザー向けに翻訳し、`06_Delivery/01_Release_Notes.md`（取扱説明書）を作成する。
3. **PACKAGE**: プロジェクトの完了を確認し、`06_Delivery/03_Delivery_Note.md`（納品書）を作成する。
4. **MASTER CLOSE**: `master-reporter` に指示し、`00_Master_Report.md` のプロジェクトステータスを「Completed」に更新させる。
5. **NOTIFY USER**: 納品パッケージが完成したことをユーザーに報告する。
