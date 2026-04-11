# 🌌 Aurora Agentic Team Framework

[![Team Status](https://img.shields.io/badge/Team-Active-brightgreen.svg)]()
[![Framework](https://img.shields.io/badge/Framework-Gemini--3--Flash-blue.svg)]()
[![Type](https://img.shields.io/badge/Type-Autonomous--AI--Team-blueviolet.svg)]()

## 📍 概要
このリポジトリは、高度に自律化したAIエージェント・チーム「Aurora Nebula」を構成するためのコア定義ファイル群（`.agent`）を格納したマスター・リポジトリです。本構成により、企画から設計、実装、品質検証、そして納品までを一貫してAI自身がオーケストレーションすることが可能となります。

---

## 👥 チーム構成と役割
本リポジトリに含まれるワークフローを介して、以下のバーチャル・ロールが協調動作します。

| ロール名 | 役割概要 | 関連定義 |
| :--- | :--- | :--- |
| **Strategy Lead** | プロジェクトの目的定義、スコープ管理、初期キックオフを統括 | `/01-initiation` |
| **Architect / Planner** | WBSの策定、ガントチャートによる時間軸管理、リソース最適化 | `/02-planning` |
| **Implementer Agent** | 実装イテレーション、コード品質の維持、継続的開発 | `/03-execute-iteration` |
| **Quality Auditor** | 品質ゲートの監視、エビデンス（画像・動画）の取得、テスト実行 | `/04-verify-and-debug` |
| **Delivery Specialist** | リリースノート作成、最終ポータル同期、プロジェクト・クローズ | `/05-finalize-delivery` |

---

## 🛠 コア・プロトコル (`.agent/rules` )
本チームは以下の厳格なルールに基づいて動作し、常に高いアウトプット品質を維持します。

*   **📊 Dynamic Traceability**: WBSと実装の100%紐付け。すべてのタスクは計画から追跡可能です。
*   **🛡 Quality Gate Protocol**: 実装完了前に必ずテストとエビデンス取得を強制する仕組み。
*   **📐 Mermaid Standardization**: 全てのプロセスを視覚化し、人間がリアルタイムで状況を把握可能な階層構造。
*   **🔗 Semantic Intelligence**: プロジェクト間の知識を「Knowledge Items」として集約し、継続的に進化。

---

## 📂 ディレクトリ構造
```text
.agent/
├── rules/        # チームの行動指針・品質基準
├── skills/       # 特化した技術スキルの定義
├── templates/    # 標準化されたドキュメント・レポート形式
├── tools/        # 遂行補助・視覚化のための独自ツール群
└── workflows/     # フェーズごとの自律遂行フロー
```

## 🚀 導入方法
本リポジトリの内容を、自身が使用するAIアシスタントのコンテキスト（`.agent` フォルダ）に配置することで、本チームの能力とワークフローを即座に有効化できます。

---
**© 2026 Aurora Nebula Project.** This team definition is optimized for *Eternal Full Fidelity* environments.
