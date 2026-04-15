---
description: WBSに基づきコードを実装し、遂行プロセスをログに記録する実装イテレーション。
---
# WORKFLOW: 03-execute-iteration

## ACTOR
- Skill: `execution-builder`

## TRIGGER
- `🌟_Phase_Runner_Master` からの特定フェーズの実行指示、または `04-verify-and-debug` からのバグ修正（差し戻し）指示。

## STEPS
1. **WBS CHECK**: `02_Planning/02-planning-wbs.md` を確認し、対象フェーズのタスク（WBS ID）を特定する。
2. **DETAILED PLAN**: `03_Implementation/Phase_XX/Phase_XX_Plan.md` を作成し、具体的な実装プラン、設計、及び予想されるリスクを定義・宣言する。（Rule: `04-documentation-standard`）
3. **LOG INITIATION**: `03_Implementation/Phase_XX/Phase_XX_Report.md` を作成し、作業開始時刻と対象WBS IDを記録する。
4. **EXECUTION**: 実際のコード実装を行う。
5. **DOCUMENTATION & EVIDENCE**: 設計判断を記録し、**「最新のタスク進捗状況（％）」** と成果物の **「画像スクリーンショット」** を `Phase_XX_Report.md` に必ず埋め込む。
6. **HANDOFF**: `04-verify-and-debug` ワークフローへ制御を渡し、検証を依頼する。
