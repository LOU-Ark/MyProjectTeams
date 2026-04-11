---
description: 実装されたコードを検証し、合格エビデンスの作成またはバグ修正の差し戻しを行う品質管理フロー。
---
# WORKFLOW: 04-verify-and-debug

## ACTOR
- Skill: `quality-inspector` (兼 `incident-responder`)

## TRIGGER
- `03-execute-iteration` からスの検証依頼。

## STEPS
1. **INSPECTION**: 実装されたコードに対し、要件（01）とWBS（02）を満たしているか、テスト（静的解析、プレビュー確認等）を実行する。
2. **DECISION (FAIL)**: もしバグや要件未達が発見された場合：
   - Rule: `05-incident-logging` を適用。
   - `05_Issue_Log/INC-xxx_Report.md` を作成し、バグの再現手順とログを記録。
   - `Phase_XX_Report.md` にINC番号を追記。
   - `03-execute-iteration` に制御を戻し、修正を指示する。
3. **DECISION (TOOL ERROR)**: ツールの回数制限や503エラーでE2E等の検証が行えない場合：
   - `05_Issue_Log/INC-xxx_Tool_Limit.md` を作成し、エビデンス取得不能の状況を記録。
   - レポートに「技術的制限によりE2E未検証」と明記し、ユーザーへ判断を仰ぐ。
4. **DECISION (PASS)**: すべてのテストをクリアした場合：
   - Rule: `04-test-before-done` を適用。
   - `04_Quality_Gate/02_Verification_Log_Phase_XX.md` に合格エビデンスを記録。
   - `Phase_XX_Report.md` にエビデンスへのリンクを貼り、ステータスを「完了」にする。
   - `master-reporter` に完了を通知する。
5. **CLEANUP**: 成否に関わらず、検証に使用したブラウザタブおよびバックグラウンドのサーバープロセスをすべて終了（Rule: 06 適用）させ、リソースを初期状態に戻すこと。
