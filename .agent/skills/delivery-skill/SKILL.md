---
name: delivery-skill
description: Compile final delivery documents from implementation, testing, and incident records.
---

# Delivery Skill

## Goal
納品に必要な最終文書を作成する。

## Instructions
1. 実装済みスコープを整理する。
2. テスト結果を集計する。
3. 未解決事項を既知制約としてまとめる。
4. 以下を生成する:
   - `07_release/release-notes.md`
   - `07_release/final-test-summary.md`
   - `07_release/delivery-note.md`

## Output Targets
- `07_release/release-notes.md`
- `07_release/final-test-summary.md`
- `07_release/delivery-note.md`

## Constraints
- テスト結果の裏付けなしで納品文書を作らない。