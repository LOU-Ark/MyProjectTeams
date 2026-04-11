# RULE: 10-real-time-portal-sync

## 1. 目的
プロジェクトの透明性と進捗確認の即時性を高めるため、ドキュメントの更新とポータルの同期を完全に連動させる。

## 2. 適用条件
- `Requirements`, `Planning`, `Execution`, `Implementation` 等、ユーザーへの公開を前提としたドキュメントを新規作成または更新した場合。

## 3. 義務事項
- 担当エージェント（Skill）は、ファイルの保存直後に `generate-portal-skill.js` を実行し、ポータル（`index.html` および関連アセット）を再生成しなければならない。
- 生成完了後、ポータルへのアクセスリンクを報告に含めること。

---
報告日時: 2026-04-10 10:42:00
作成者: Antigravity
