# RULE: 11-Architectural-Conformance-Audit

## GOAL
実装者の主観や慣習による「勝手なフォルダ構成」を排除し、常に STR-001 (3層構造) に準拠した状態を維持すること。

## ACTION STANDARD
1. **Pre-Implementation Check (着手前監査)**:
    - 実装作業（Phase 01等）を開始する前に、必ず `.agent/rules/STR-*` を再読し、物理的な配置場所（product/ 等）を確認・宣言しなければならない。
    - ルートディレクトリへのファイル新規作成は原則禁止とし、必ず `product/` への配置をデフォルトとする。

2. **Structure Validation (構造バリデーション)**:
    - 各フェーズの「完了（Done）」を定義する際、動作確認だけでなく「ファイル配置が規定通りか」を独立した項目としてチェックしなければならない。
    - 規約違反が発見された場合、たとえ機能が完全であっても「不合格インシデント」として即座に修正・報告すること。

3. **Cognitive Bias Alert (慢心の排除)**:
    - 「1ページだけのアプリだから」「簡単な修正だから」という理由で、管理・製品層の分離（management/product）を省略することは、Auroraチームにおいて最大の規律違反とみなす。

---
最終更新: 2026-04-10
承認者: Antigravity (Team Lead)
理由: INC-004 (productフォルダ不在) の教訓に基づく進化
