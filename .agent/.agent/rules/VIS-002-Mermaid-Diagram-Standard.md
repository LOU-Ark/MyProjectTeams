# RULE: VIS-002 - Mermaid Diagram Standard

> [🏠 00_Master ] > [ .agent ] > [ rules ] > VIS-002-Mermaid-Diagram-Standard

## 1. デザインと配色 (Visual Standard)
Mermaid 図は Aurora Visual Identity との調和を図るため、以下の構成を推奨する。
- **Theme**: `dark` または `neutral` を基本とする。
- **Emphasis**: 特定のノードを強調する場合は、Aurora 背景色に近い `#005aff` 等のアクセントカラーを使用せよ。

## 2. 日本語ラッピング規則 (Text Treatment)
ノード内のテキストが途切れたり重なったりすることを防ぐため、以下の記法を推奨する。
- **Manual Wrap**: 長いテキストには `<br/>` を挿入し、視認性を確保せよ。
- **Quote Usage**: 特殊文字を含む、または長いラベルは必ず引用符 `"` で囲むこと（例: `id["長文ラベル<br/>の例"]`）。

## 3. ガントチャートの精度
ガントチャートを出力する場合、単なる日付だけでなく、可能な限り実稼働時間（HH:mm）を含めた精密なプロットを行え。

---
**Focus**: 可読性、配色の一貫性、ラッピング処理。
