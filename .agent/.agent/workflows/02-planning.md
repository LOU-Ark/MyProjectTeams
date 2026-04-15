---
description: まとまった要件を具体的なタスク（WBS）とスケジュール（ガントチャート）に落とし込む計画策定フェーズの実行指針です。
---
# WORKFLOW: 02-planning

## ACTOR
- Skill: `planning-architect`

## TRIGGER
- `01-initiation` ワークフローの完了。

## STEPS
1. **INPUT**: `01_Requirements/` に出力された要件定義書を読み込む。
2. **BREAKDOWN**: 要件を満たすためのタスクを洗い出し、フェーズごとに分割してWBS ID（TSK-xxx）を付与する。
3. **SCHEDULE**: 依存関係を考慮し、Mermaid形式のガントチャートを作成する。その際、各タスクにはホバー表示用の詳細説明を付加する準備を行う。
4. **DRAFT**: `02-planning-wbs.md` テンプレートを展開し、WBSとガントチャートを記述する。
5. **ULTRA VISUALIZE**: `.agent/knowledge/TEAM_KNOWLEDGE_MASTER.md` に基づき、40pxの余白と30pxの角丸、ホバー機能を備えた `view_planning.html` を生成し、計画を「一発で動く」形で可視化する。
6. **ENFORCE RULE**: `01-breadcrumb-mandatory` ルールを適用し、パンくずリストを配置する。
7. **OUTPUT**: 完成したファイルを `02_Planning/` フォルダ内に保存する。
8. **NOTIFY**: `master-reporter` に完了を通知し、ダッシュボードの更新（Rule: `03-dynamic-gantt-update`）を依頼する。
