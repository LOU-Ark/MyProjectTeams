---
name: planning-orchestrator-skill
description: Coordinate requirement intake, planning flow, output validation, and planning report generation for WBS and gantt creation.
---

# Planning Orchestrator Skill

## Goal
Planning Team 全体を進行し、入力確認、出力保存、最終レポート整理を行う。

## When to Use
- 要求定義・要件定義から planning 成果物を起こすとき
- WBS とガントの出力を一式そろえたいとき
- planning レポートをまとめたいとき

## Instructions
1. 入力ファイルの存在確認を行う。
2. requirement-definition、functional requirements、non-functional requirements、acceptance criteria を読み、planning に必要な前提を抽出する。
3. WBS Designer と Schedule Planner へ処理を委譲する。
4. 出力ファイルの存在確認を行う。
5. `08_reports/planning-master-report.md` を作成または更新する。

## Output Targets
- `08_reports/planning-master-report.md`

## Constraints
- 入力不足のまま planning を開始しない。
- WBS とガントの両方が揃うまで完了扱いにしない。
