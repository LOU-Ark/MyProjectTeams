---
name: schedule-planner-skill
description: Convert a WBS into a phase schedule, milestones, and Mermaid gantt chart with rendered image validation.
---

# Schedule Planner Skill

## Goal
WBS をもとに、依存関係と日程を持つガントチャートへ変換する。

## Instructions
1. `03_planning/wbs.md` を読み、フェーズ順にタスクを並べる。
2. 各タスクに所要期間、依存関係、マイルストーンを設定する。
3. Mermaid 形式で `03_planning/gantt.md` を作る。
4. Mermaid を PNG または SVG にレンダリングし、`03_planning/gantt.png` を生成する。
5. planning report 用に以下を整理する:
   - フェーズ一覧
   - 期間
   - 依存関係
   - マイルストーン
   - 前提

## Output Targets
- `03_planning/gantt.md`
- `03_planning/gantt.png`

## Constraints
- WBS のないスケジュールを作らない。
- レンダリング確認前に完了扱いにしない。
