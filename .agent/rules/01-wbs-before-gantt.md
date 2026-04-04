---
trigger: always_on
---

---
description: Always create a WBS before generating a gantt chart.
---

# WBS Before Gantt Rule

## Goal
ガントチャートを先に作らず、必ず要件から WBS を作成してからスケジュール化する。

## Instructions
- 要求定義・要件定義を読み、まず作業分解構造 (WBS) を作成する。
- WBS には、フェーズ、成果物、主要タスク、タスク粒度、依存関係の元情報を含める。
- ガントチャートは WBS を入力として生成する。
- WBS なしにガントだけを生成して完了扱いにしない。

## Constraints
- タスクが要件と結びついていない場合は再分解する。
- 実装・テスト・レポート・納品準備を WBS から漏らさない。
