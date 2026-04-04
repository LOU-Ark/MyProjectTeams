---
trigger: always_on
---

---
description: At the end of every iteration, record planned work, actual work, actual time, and variance in the project report.
---

# Plan vs Actual Reporting Rule

## Goal
各 iteration の予定と実績を比較できるようにする。

## Instructions
- iteration 開始前に、対象範囲、予定工数、AI協働予定工数を記録する。
- iteration 終了時に、実際に行った手順、実績工数、一般工数との差分、AI協働予定との差分を記録する。
- 記録先は `08_reports/master-report.md` の該当フェーズ直下とする。
- 差分理由を必ず明記する。

## Constraints
- 実装だけ完了してレポート未更新の状態を作らない。
- 工数は未記録のままにしない。