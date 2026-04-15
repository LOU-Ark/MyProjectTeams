---
description: プロジェクトの目的、スコープ、関係者を定義する「立ち上げフェーズ」のテンプレート。
---
# WORKFLOW: 01-initiation

## ACTOR
- Skill: `requirements-analyst`

## TRIGGER
- `🌟_Kickoff_Master` からの要求整理の実行指示。

## STEPS
1. **INPUT**: ユーザーが入力したプロジェクト要望を受け取る。
2. **CLARIFY (Optional)**: 要望が不明瞭な場合は、ユーザーに質問して意図を明確にする。
3. **DRAFT**: `01-requirements-doc.md` テンプレートを展開し、ヒアリング内容をもとに要件定義（Business Goal, MoSCoW, Acceptance Criteria）を記述する。
4. **ENFORCE RULE**: `01-breadcrumb-mandatory` ルールを適用し、ファイルの先頭にパンくずリストが配置されていることを確認する。
5. **OUTPUT**: 完成したファイルを `01_Requirements/` フォルダ内に保存する。
6. **NEXT**: `02-planning` ワークフローへ制御を移行する。
