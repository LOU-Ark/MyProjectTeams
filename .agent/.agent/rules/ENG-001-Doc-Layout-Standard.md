# RULE: ENG-001 - Document Layout & Structure Standard

> [🏠 00_Master ] > [ .agent ] > [ rules ] > ENG-001-Doc-Layout-Standard

## 1. パンくずリスト (Breadcrumb Mandatory)
全ての Markdown ファイルの最上部（1行目）には、プロジェクト内の現在地を示す引用ブロック形式のナビゲーションを配置せよ。
- **Format**: `> [🏠 00_Master ] > [ Parent_Folder ] > Current_File`
- **Rule**: 更新・新規作成を問わず、例外は一切認めない。

## 2. セマンティック・ヘッディング (Heading Hierarchy)
ドキュメントの論理構造を維持するため、以下の H1~H3 の使い分けを徹底せよ。
- **H1 (#)**: ファイルの主タイトル。1つのみ。
- **H2 (##)**: 内容の大見出し（セクション）。
- **H3 (###)**: 詳細な項目。
- **Rule**: 装飾目的の見出しレベルのスキップ（H2の次にH4を使う等）は禁止する。

## 4. 管理ディレクトリのラッピング (Directory Wrapping Rule)
管理資料（01_Requirements, 02_Planning 等）を配置する際は、ルートや親フォルダ直下にファイルを置くのではなく、必ず「ファイル名と同名のディレクトリ」でラップせよ。
- **正**: `management/01_Requirements/01_Requirements.md`
- **誤**: `management/01_Requirements.md`
- **目的**: 関連する資産（画像、サブドキュメント等）を将来的に同一フォルダ内で管理可能にし、構造の整合性を保つため。

---
**Last Updated**: 2024-04-11
**Compliance**: 🔵 Standard
