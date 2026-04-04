---
trigger: always_on
---

---
description: Every Mermaid gantt chart must be rendered as an image and visually validated.
---

# Mermaid Gantt Render Rule

## Goal
Mermaid ガントの構文エラーや表示崩れを防ぐ。

## Instructions
- Mermaid で `gantt.md` を作成したら、必ず PNG または SVG にレンダリングする。
- 画像化に失敗した場合は未完了扱いとする。
- 以下を確認する:
  - パースエラーがない
  - フェーズ名やタスク名が切れていない
  - 依存関係が見やすい
  - 日本語が崩れていない
- `03_planning/gantt.png` を正式成果物として保存する。

## Constraints
- Mermaid コードだけで完了にしない。
- レポートには Mermaid 元コードと画像パスの両方を記録する。
