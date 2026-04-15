---
description: プロジェクト終了後に、チームのパフォーマンス、スキル、ワークフローの有効性を評価し、改善を行う振り返りフロー。
---
# WORKFLOW: 07-team-retrospective

## ACTOR
- Skill: `team-leader`

## TRIGGER
- `05-finalize-delivery` ワークフローの完了（納品完了の直後）。

## STEPS
1. **REVIEW**: `03_Implementation/` および `04_Quality_Gate/` の全レポート、インシデント（05）、納品物（06）を確認する。
2. **EVALUATE**: 以下の観点で各エージェントおよびフローを評価し、`07_Team_Analytics/01_Retrospective_ProjectXXX.md` を作成する。
    - **Efficiency**: WBS の計画に対する遅延の有無。
    - **Quality**: テスト合格後の不具合発見の有無。
    - **Stability**: ツールや環境起因のエラーへの対応品質。
3. **IMPROVE (Aurora Evolutionary Cycle)**: 
    - 発見された技術課題や独自エンジンを **Knowledge Item (KI)** または `.agent/skills` に資産化する。
    - 環境依存の仕様（パス指定等）を発見した場合、`.agent/rules` を即座に更新する。
4. **MASTER UPDATE**: `00_Team_Status.md` の改善履歴を更新し、今回獲得した「新スキル」や「新ルール」を記録する。
5. **CLOSE**: 次のプロジェクトに向けた「チーム強化内容」を報告し、サーバーを停止してセッションを終了する。
