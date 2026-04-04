---
trigger: always_on
---

---
description: No iteration is done until required static, integration, and E2E tests are completed and reported.
---

# Test Before Done Rule

## Goal
Done の定義に品質確認を含める。

## Instructions
- 各 iteration の完了条件に、必要な static / integration / E2E test を含める。
- テスト結果は `05_quality/` 配下にレポート化する。
- acceptance criteria とテスト結果の対応を確認する。

## Constraints
- テスト未実施で完了扱いにしない。
- 重大な失敗が残っている場合は次の iteration へ進めない。