---
description: プロジェクト全体の開始から計画策定までの流れを統括するマスタードキュメント。
---
# WORKFLOW: 🌟_Kickoff_Master

## GOAL
ユーザーからの「これを作りたい」という最初の要望を受け取り、要求整理から計画策定、ダッシュボード構築までのキックオフプロセスを全自動でオーケストレーションすること。

## TRIGGER
- ユーザーからの「プロジェクト立ち上げ（Initiate Project）」の入力。

## EXECUTION SEQUENCE
1. **Start Initiation**: `01-initiation` ワークフローを起動し、`requirements-analyst` に要件定義を行わせる。
2. **Start Planning**: 要件定義完了後、自動的に `02-planning` ワークフローを起動し、`planning-architect` にWBSとガントチャートを作成させる。
3. **Dashboard Setup**: 計画完了の通知を受け、`master-reporter` を起動する。
   - `00-master-dashboard.md` テンプレートを展開する。
   - Rule `03-dynamic-gantt-update` に従い、ガントチャート画像（仮想）を同期し、達成率を0%に設定する。
   - ルートディレクトリに `00_Master_Report.md` として出力する。
4. **Final Report**: すべての成果物が出揃った後、ユーザーに対して「キックオフ完了報告」を行う。

## REPORTING FORMAT
ユーザーへの最終報告は以下の形式で行うこと：
「準備完了！以下のキックオフ成果物を作成しました。
・ `01_Requirements` (要件定義)
・ `02_Planning` (WBSとガントチャート)
・ `00_Master_Report.md` (ダッシュボード)

内容をご確認いただけますか？問題なければ、Phase 1 の実装を開始します（`🌟_Phase_Runner_Master` を起動してください）。」
