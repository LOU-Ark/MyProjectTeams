# RULE: ENG-002 - Resource Hygiene & Asset Path Management

> [🏠 00_Master ] > [ .agent ] > [ rules ] > ENG-002-Asset-Path-Management

## 1. 相対パスの厳守 (Relative Path Standard)
ドキュメント内での画像埋め込み、およびファイルリンクには、必ず **実行環境に依存しない相対パス** （`./img.png` や `../../management/`）を使用せよ。
- **Illegal**: `C:\Users\...` や `file:///C:/...` のような絶対パスの記述は、ポータルでの表示不良を招くため「規約違反」とみなす。

## 2. 資産の階層管理 (Asset Locality)
ドキュメントに紐づく画像、データ、動画は、そのドキュメントが属するフォルダ内の `assets/` フォルダ、またはポータル指定の共通資産ディレクトリに集約せよ。

## 3. リソースの衛生管理 (Resource Hygiene)
不要になった一時ファイル、中間生成物、および古いバージョンの重複ファイルは、フェーズ完了時に速やかに削除しなければならない。
- **Target**: ルートディレクトリの作業残渣、古い `_Report_old.md` 等。
- **Rule**: プロジェクトルートには、主要3層（.agent, management, product）以外のフォルダを生成してはならない。

---
**Standard**: 🔴 Critical
**Check Item**: 相対パスの整合、作業残渣の有無。
