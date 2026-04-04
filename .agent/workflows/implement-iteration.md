---
description: Implement the next iteration for Career Site Brief Generator
---

# Implement Iteration

## Purpose
`03_planning/gantt.md` を基準に、次のフェーズまたは次の未完了タスクを実装する。

## Inputs
- `03_planning/wbs.md`
- `03_planning/gantt.md`
- `08_reports/master-report.md`
- 対象フェーズの `04_implementation/phase-XX/implementation-report.md`

## Steps

1. `03_planning/gantt.md` を確認する。
2. 現在のフェーズと未完了タスクを特定する。
3. 実装対象のスコープを確認する。
4. 必要なコード変更を行う。
5. 対象フェーズの `04_implementation/phase-XX/implementation-report.md` を作成または更新する。
6. レポートに Gantt 参照を追加する。
7. レポートに今回完了した Gantt タスクと未完了タスクを記録する。
8. `Plan vs Actual` に予定と実績の差分があれば記録する。
9. `Incidents` があれば記録する。
10. フェーズ完了時は `08_reports/master-report.md` の `Phase Status`、`Iteration Log`、`Plan vs Actual` を更新する。
11. `master-report.md` が `03_planning/gantt.md` を基準に整合していることを確認する。

## Report Requirements
- Include a Gantt reference in the implementation report.
- Summarize which Gantt tasks were completed in this iteration.
- Summarize which tasks remain pending or blocked.
- Update phase progress based on the Gantt plan.
- Reflect any schedule or effort deviation in `Plan vs Actual` when applicable.
- If the phase changes status, update `master-report.md` accordingly.

## Gantt Requirement
- Add a section linking to `03_planning/gantt.md`.
- If helpful, embed the Gantt image from `03_planning/gantt.png`.
- Record the tasks completed in this iteration against the planned Gantt items.

## Output
- Updated application code
- `04_implementation/phase-XX/implementation-report.md`
- Updated `08_reports/master-report.md` if needed

## Notes
- Do not duplicate detailed implementation notes in `master-report.md`.
- Keep detailed work history in the phase report.
- Use `03_planning/gantt.md` as the source of truth for progress tracking.

## Report Generation (MANDATORY)
- **Rule 06-master-report-required-sections を適用**
- Copy `.agent/templates/report-template.md` to `04_implementation/phase-01/implementation-report.md`
- Copy `.agent/templates/report-template.md` to `08_reports/master-report.md` (if not exists)
- **Rule 04-test-before-done を適用**: 静的解析・ビルドテストを実行
- **Rule 05-incident-report-required を適用**: 問題があれば INC-XXX で記録
- Update master-report Phase Status and Iteration Log

## FINAL STEPS (MANDATORY - Rules 04, 05, 06)
1. Create phase report from report-template.md
2. Update master-report Phase Status and Iteration Log
3. Run quality checks (static analysis, build test)
4. Record incidents if any
5. Confirm Gantt progress alignment