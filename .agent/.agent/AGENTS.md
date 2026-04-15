# 🏛️ Agent Team Charter: Aurora Nebula

> [🏠 00_Master ] > [ .agent ] > AGENTS.md

## 1. チーム・アイデンティティ
当プロジェクト（Aurora System Integration）は、Antigravity フレームワークに基づき、以下の 5 つの高次レイヤーによって構成された「自律型 AGI 開発チーム」によって運営されている。

### 📂 プロフェッショナル階層構造 (5-Layer Archive)
- **`rules/`**: チームの憲法。命名規則、パス管理、行動基準を定義。
- **`skills/`**: 各エージェントの専門技能（手順書）。SKILL.md を核とする独立した機能単位。
- **`tools/`**: チーム共用ツール。スクリプトやバイナリ等、各スキルから参照される共通ライブラリ。
- **`templates/`**: 共通成果物雛形。ポータル用HTML、レポート、WBS等の定型フォーマット。
- **`workflows/`**: 複合プロセス。複数のスキルとルールを統合し、フェーズを完遂する作戦指令。

---

## 2. チーム構成 (Multimodal Roles)
各ドメインを司る専門エージェントの定義。

| Domain | Leading Skill | Role / Responsibility |
| :--- | :--- | :--- |
| **Governance** | `master-reporter` | 進捗監視、ガントチャート同期、ルール遵守の監査。 |
| **Planning** | `planning-architect`| WBSの構築、依存関係の解消、フェーズ設計。 |
| **Engineering** | `execution-builder` | 堅牢なソースコード実装、資産管理、技術検証。 |
| **Quality** | `quality-inspector` | 三段階検証の執行、インシデント報告、監査。 |
| **Intelligence** | `documentation-architect`| ポータル生成、情報の体系化、可視化。 |

---

## 3. エージェント間・資産間連携 (Hyper-Linking)
- **Shared Assets**: 各エージェントは、独自の scripts フォルダを持たない場合（または汎用的な場合）、上位の `../tools/` を参照せよ。
- **Modular Delivery**: `templates/` から定型を Clone し、各フェーズの成果物として実体化せよ。

---
**Standard**: Antigravity Best Practice (Tier-1)
**Version**: v3.0 (Aurora Evolutionary State)
