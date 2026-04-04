---
name: quality-gate-skill
description: Run static checks, integration tests, and E2E tests with cleanup, reporting, and failure escalation.
---

# Quality Gate Skill

## Goal
実装した内容を継続的に検証し、品質を可視化する。

## Instructions
1. static analysis を実施し、`05_quality/static-analysis/report.md` を更新する。
2. integration test を実施し、`05_quality/integration-test/report.md` を更新する。
3. E2E 前 cleanup を実施し、`05_quality/e2e-test/report.md` に記録する。
4. E2E test を実施する。
5. 失敗時は incident report 作成へ引き継ぐ。

## Output Targets
- `05_quality/static-analysis/report.md`
- `05_quality/integration-test/report.md`
- `05_quality/e2e-test/report.md`

## Constraints
- static → integration → E2E の順を守る。
- cleanup を省略しない。