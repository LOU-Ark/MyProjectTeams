---
description: Generate WBS, Gantt, and initialize master report for Career Site Brief Generator
---

# Generate WBS and Gantt

## Purpose
Career Site Brief Generator の planning 成果物として、WBS、Gantt、master-report 初期版を作成する。

## Input Requirements

### Project Name
Career Site Brief Generator

### Background
履歴書、職務経歴書、実績メモ、学びの断片が分散しており、LP生成やHP更新に再利用しにくい。

### Purpose
履歴書・職務経歴書をもとに、LP生成エージェントとHP生成エージェントの共通入力となる `career-site-brief.md` を生成できるようにする。

### Target Users
- 自分自身。
- 将来的には同様にキャリア情報を整理したい個人。

### Problems to Solve
- 経歴情報が複数ファイルに散在している。
- 毎回同じ自己紹介や実績要約を書き直している。
- LP用の短い訴求と、HP用の継続更新情報が分離されていない。
- AIに渡す入力が都度ぶれて出力品質が安定しない。

### Value
- 履歴書・職務経歴書から共通ブリーフを自動生成する。
- フォーム入力とチャット補完を両立する。
- 生成されたブリーフをそのまま downstream agent に渡せる。

### Scope
- 履歴書・職務経歴書フォーム入力。
- PDF / DOCX / TXT 読込。
- AIチャットによる不足項目補完。
- 共通ブリーフ生成。
- Markdown 保存。

### Non-scope
- 直接の求人応募最適化。
- ATS 最適化の高度分析。
- 本格的な public portfolio サイト公開機能。
- 多人数向け管理画面。

### Functional Requirements
- フォーム入力機能。
- ファイル読込機能。
- テキスト抽出機能。
- フィールド自動マッピング機能。
- チャット補完機能。
- 手動修正機能。
- 不足項目提示機能。
- 共通ブリーフ生成機能。
- 保存機能。

### Non-functional Requirements
- 可読性。
- 修正容易性。
- 安定性。
- 拡張性。
- 追跡性。

### Constraints
- 初期版は単一ユーザー前提。
- 初期版は日本語中心。
- OCR や複雑なレイアウト解析は初期版では限定対応でもよい。
- 最終出力は `career-site-brief.md` を優先する。

### Acceptance Criteria
- 履歴書・職務経歴書フォームを手入力で埋められる。
- PDF / DOCX / TXT をアップロードできる。
- アップロード内容をフォームへ反映できる。
- チャットで不足項目を聞き、反映できる。
- ユーザーが最終確認・修正できる。
- `career-site-brief.md` を生成・保存できる。
- LP用要約とHP用実績・学びの元情報がブリーフに含まれる。

## Steps

1. プロジェクト名を確認する。
2. 要求定義、背景、目的、対象ユーザー、課題、提供価値、スコープ、非スコープ、要件定義、制約、受け入れ基準を整理する。
3. WBS を `03_planning/wbs.md` に作成する。
4. Gantt を `03_planning/gantt.md` に作成する。
5. 必要に応じて `03_planning/gantt.png` を作成または更新する。
6. Planning Report を `08_reports/planning-master-report.md` に作成する。
7. If `08_reports/master-report.md` does not exist, copy `.agent/templates/master-report-template.md` to `08_reports/master-report.md`.
8. Replace `[プロジェクト名]` with the actual project name in `08_reports/master-report.md`.
9. Ensure the master report uses `03_planning/gantt.md` as the source of truth for progress tracking.
10. Ensure the following links are correct in `08_reports/master-report.md`:
   - `03_planning/wbs.md`
   - `03_planning/gantt.md`
   - `03_planning/gantt.png`
   - `08_reports/planning-master-report.md`
   - `04_implementation/`
11. Update `Next Action` in `08_reports/master-report.md` to reflect the current state.
12. Confirm that the master report is the single source of truth for project status.

## Output
- `03_planning/wbs.md`
- `03_planning/gantt.md`
- `03_planning/gantt.png`
- `08_reports/planning-master-report.md`
- `08_reports/master-report.md`

## Notes
- 新規プロジェクト開始時は、この workflow を最初に実行する。
- master-report は planning の完了時点で必ず生成する。
- 以降の iteration では、この master-report を更新し続ける。
- 進捗更新は `03_planning/gantt.md` を基準に行う。