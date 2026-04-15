# RULE: QLT-002 - Incident & Audit Logging

> [🏠 00_Master ] > [ .agent ] > [ rules ] > QLT-002-Incident-Handling

## 1. インシデントの定義と記録
技術的なエラー、不具合、または検証の失敗が発生した場合は、速やかに `05_Issue_Log` にその原因と対策を記録しなければならない。

## 2. フィードバック・ループ (Feedback Incorporation)
ユーザー様からの指摘や検証で見つかった課題は「負債」ではなく、規約やスキルの「アップデート・チャンス」と捉え、再発防止策を `management/07_Team_Analytics` に記録せよ。

## 3. 構造監査 (Conformance Audit)
各フェーズの完了時に、以下の「アーキテクチャ監査」をセルフ形式で実施せよ。
- 3層構造（STR-001）が維持されているか。
- ルートディレクトリに不要な作業ファイルがないか。
- 全ドキュメントにパンくずリスト（ENG-001）が存在するか。

---
**Standard**: 🔵 Mandatory
**Goal**: 失敗を知識に変換し、自己修復能力を最大化する。
