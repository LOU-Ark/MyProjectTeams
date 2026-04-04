---
trigger: always_on
---

---
description: Every significant implementation or test failure must create an incident report with cause, fix, and retest results.
---

# Incident Report Required Rule

## Goal
失敗の経緯を再利用可能な形で残す。

## Instructions
- static, integration, E2E, build, deploy の重大失敗時は incident を作る。
- incident には以下を含める:
  - 症状
  - 再現条件
  - 原因
  - 対処
  - 変更ファイル
  - 再テスト結果
  - 残リスク
- `06_debug/incidents/INC-xxx/` に保存する。

## Constraints
- 原因や再テストなしでクローズしない。