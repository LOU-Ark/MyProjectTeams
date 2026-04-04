---
description: 既存システムを解析し、現状仕様・改善要求・次回WBSまで作る
---

# Reverse Engineering Team

## Step 1: Scope
- 対象システム名、対象範囲、困りごと、利用者、利用中の技術を確認する。
- 対象フォルダと除外フォルダを明確にする。

## Step 2: Structural Reverse Engineering
- reverse-engineer Skill を使って以下を抽出する:
  - 全体構造
  - 主要モジュール
  - ディレクトリ構成
  - 技術スタック
  - 依存関係
- docs/reverse-engineering/overview.md の形でまとめる。

## Step 3: Business and Capability Analysis
- codebase-analysis-reverse-engineering Skill を使って以下を抽出する:
  - ドメインモデル
  - ユーザー機能
  - 外部連携
  - ビジネスルール
  - 暗黙仕様
- docs/reverse-engineering/capabilities.md の形でまとめる。

## Step 4: Clarification and Improvement Intake
- requirements-gathering Skill を使って不足情報を質問する。
- 改善候補を Must / Should / Could / Won't に分類する。

## Step 5: Improvement Planning
- pmbok-project-management Skill を使って以下を作る:
  - 改善バックログ
  - WBS
  - 優先順位
  - 依存関係
  - 次イテレーション計画

## Step 6: Final Output
- 最終的に以下をMarkdownで提示する:
  - 現状仕様サマリー
  - システム構造
  - 業務ルール一覧
  - 改善バックログ
  - 次回WBS