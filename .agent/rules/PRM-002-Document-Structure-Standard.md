# RULE: PRM-002-Document-Structure-Standard

## GOAL
チームが生成する全ての Markdown レポートにおいて、一貫性のあるナビゲーション、構造、および署名を提供すること。

## STANDARD STRUCTURE
1. **Title (H1)**: ドキュメントの名称を明記する。
2. **Breadcrumbs (Navigation)**: タイトルの直下に配置する。フォーマットは `[Parent](../) > [Current](Path.md)` とする。
3. **Context Box (Blockquote)**: 必要に応じてプロジェクト名や目的を引用形式で記載する。
4. **Body Sections (H2-H4)**: 業務内容を論理的に構成する。
5. **Footer (Horizontal Rule)**: セクションの終了を示す横線を引く。
6. **Metadata**: 「報告日時」および「作成者（ロール名）」を明記する。

## EXAMPLE
```markdown
# Phase XX Report
[Home](../../) > [Implementation](../) > [This](This.md)

## 1. Status
...実装内容...

---
報告日時: 2026-04-10
作成者: execution-builder
```

## ENFORCEMENT
今後生成される全てのレポート、および `generate-portal-skill.js` が扱う全てのドキュメントにこの基準を適用する。
