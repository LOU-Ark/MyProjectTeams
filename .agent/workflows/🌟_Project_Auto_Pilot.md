---
description: 現在の進捗を自律的に点検し、未完了のタスクがある場合は該当フェーズを自動実行、すべて完了している場合はプロジェクトをクローズするマスターワークフロー。
---

# WORKFLOW: 🌟_Project_Auto_Pilot

## GOAL
WBSと成果物を照合し、実装の抜け漏れやドキュメントの不足を自動で特定・補完し、プロジェクトを完璧な納品状態に導くこと。

## TRIGGER
- ユーザーからの「進捗を確認して進めて」等の継続指示。
- フェーズ完了後の自動ステータスチェック。

## EXECUTION SEQUENCE
1. **WBS Scan**: `02_Planning/02_Planning.md` を読み込み、タスク（TSK-xxx）のステータスを確認する。
2. **Artifact & Quality Integrity Check**: 
   - WBS で完了となっているタスクに対し、対応する `03_Implementation/Phase_XX/` 内のレポートが存在するか。
   - 同様に、`04_Quality_Gate/` 内に**正式な品質レポート (QA Report)** と検証エビデンスが存在するかを確認する。
3. **Decision Making**:
   - **未完了タスク・未検証タスクあり**: 該当フェーズの `03-execute-iteration` または `04-verify-and-debug` を起動。
   - **すべて完了 & 品質合格**: 
     1. `05-finalize-delivery` を起動し、納品パッケージを確認・固定する。
     2. `🌟_Portal_Generator_Master` を起動し、08_Documentation_Portal を生成する。
4. **Final Sync**: `00_Master_Report.md` を最新の状態に同期し、ユーザーに完了を報告する。
