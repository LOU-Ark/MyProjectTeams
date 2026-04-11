> [🏠 00_Master ] > [ 02_Planning ]

# 🗓️ Project Planning: WBS & Schedule

## 1. Work Breakdown Structure (WBS辞書)
要件を満たすための具体的なタスク一覧です。開発時はこのIDを必ず参照します。

| WBS ID | フェーズ | タスク名 | 詳細・備考 |
| :--- | :--- | :--- | :--- |
| TSK-01 | Phase 1 | {{タスク名}} | {{具体的な作業内容}} |
| TSK-02 | Phase 1 | {{タスク名}} | {{具体的な作業内容}} |
| TSK-03 | Phase 2 | {{タスク名}} | {{具体的な作業内容}} |

## 2. Gantt Chart (Mermaid スケジュール)
以下のMermaidコードは、作業が進むごとに `done` や `active` タグが付与され、画像としてダッシュボードにレンダリングされます。

```mermaid
gantt
    title プロジェクト・スケジュール
    dateFormat  YYYY-MM-DD
    section Phase 1: {{フェーズ名}}
    {{タスク名}} : TSK-01, {{開始日}}, {{期間}}
    {{タスク名}} : TSK-02, after TSK-01, {{期間}}
    
    section Phase 2: {{フェーズ名}}
    {{タスク名}} : TSK-03, after TSK-02, {{期間}}
```
