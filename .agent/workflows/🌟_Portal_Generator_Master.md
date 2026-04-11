---
description: プロジェクト内の全Markdownドキュメントを体系的に整理し、グラスモーフィズムデザインのブラウジング可能なHTMLポータルを生成するマスターワークフロー。
---

# WORKFLOW: 🌟_Portal_Generator_Master

## GOAL
開発者が作成した各フェーズのドキュメント（.md）を自動統合し、ブラウザでクリック遷移しながら閲覧できるプレミアムなポータルサイト（index.html）を生成すること。

## ACTOR
- Skill: `documentation-architect`

## TRIGGER
- ユーザーからの「ポータルを作成して」「HTMLで見れるようにして」等の指示。
- プロジェクトクローズ時の自動生成要求。

## RULES
- **Full Fidelity**: Markdownの内容を要約・省略せず、全文をインラインで埋め込むこと。
- **Zero-Config**: 外部リクエストを避け、ローカルファイルをダブルクリックするだけでブラウジング可能にすること。

## EXECUTION SEQUENCE
1. **Structure Mapping**: ルートディレクトリの `01_Requirements` から `07_Team_Analytics` までを走査し、すべての `.md` ファイルのパスと見出しを抽出する。
2. **Template Expansion**: グラスモーフィズムを採用したポータルテンプレート（サイドバー＋メインビュー）を展開する。
3. **Link Construction**: 抽出したドキュメントをサイドバーのナビゲーションとして体系的に配置する。
4. **Content Integration**: 各ドキュメントを HTML 内でプレビュー可能にする仕組み（Markdownレンダラーの埋め込み等）を構築する。
5. **Output**: `08_Documentation_Portal/index.html` として生成し、サーバーを介して閲覧可能な状態にする。
