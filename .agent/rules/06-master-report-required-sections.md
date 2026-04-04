---
trigger: always_on
---

---
description: Keep master report aligned with the Gantt plan and phase implementation reports.
---

---
priority: HIGH
mandatory: true
---

# Master Report Required (MANDATORY)
**このルールは無条件で適用される。**
- すべてのイテレーション終了後に master-report を更新
- phase report も必ず作成

# Master Report Policy

## Purpose
`08_reports/master-report.md` を、`03_planning/gantt.md` と `04_implementation/phase-XX/implementation-report.md` を基準に更新する。

## Rules
- `03_planning/gantt.md` を進捗更新の基準にする。
- Phase Status は Gantt 上のタスク進行と整合させる。
- Iteration Log には実際に完了した作業だけを書く。
- Plan vs Actual には見積と実績の差分を書く。
- master-report は毎回全文を書き直さず、変更箇所だけ更新する。
- 新しいフェーズに入ったら、対応する Phase Status を In Progress に更新する。
- フェーズ完了時は Done と 100% に更新する。
- 進捗判断が曖昧な場合は、Gantt のタスク完了状況を優先する。

## Phase Report Synchronization
- After each phase implementation, update the corresponding `04_implementation/phase-XX/implementation-report.md`.
- Reflect only the summary of that phase in `08_reports/master-report.md`.
- Keep detailed implementation notes in the phase report.
- Update `Phase Status`, `Iteration Log`, `Plan vs Actual`, and `Incidents` as needed.
- Do not duplicate full implementation details in master-report.

## Required Sections
- Project Summary
- Planning Snapshot
- Schedule Snapshot
- Phase Status
- Iteration Log
- Plan vs Actual
- Quality Status
- Incidents
- Next Action