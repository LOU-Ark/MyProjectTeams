# RULE: ENG-003 - Shared Asset Referencing Standard

> [🏠 00_Master ] > [ .agent ] > [ rules ] > ENG-003-Shared-Asset-Referencing

## 1. 原則: 上位レイヤーの優先利用 (Shared-First)
各技能（Skill）に関連するスクリプトやテンプレートを作成・更新する際は、以下の基準で配置場所を選択すること。
- **汎用資産**: 複数のスキルから利用される、または将来的に共通化されるべき資産は、必ず直近の `skills/` 内ではなく、上位の `tools/` または `templates/` に配置せよ。
- **固有資産**: そのスキルでしか絶対に使用しない、極めて特化したロジックのみ `skills/<skill-name>/scripts/` への配置を認める。

## 2. 相対パスによる参照規則 (Path Resolution)
`SKILL.md` や ワークフロー内での参照は、環境依存を避けるため以下の相対パス形式を厳守せよ。

- **Tools 参照**: `../../tools/<tool-name>`
- **Templates 参照**: `../../templates/<template-name>`
- **スキルの内部資産参照**: `./scripts/<script-name>` または `./assets/<asset-name>`

## 3. 重複の禁止 (Zero-Redundancy)
共通ツール（例：Mermaid レンダラー、CSV パーサーなど）を複数のスキル内にコピーしてはならない。カスケード（上位参照）による解決を徹底すること。

---
**Standard**: 🔵 Recommended
**Scope**: All Agents & Skills
