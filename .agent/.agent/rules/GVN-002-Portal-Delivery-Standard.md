# RULE: GVN-002 - Portal & Delivery Standard

> [🏠 00_Master ] > [ .agent ] > [ rules ] > GVN-002-Portal-Delivery-Standard

## 1. ポータル同期のトリガー (Real-time Sync)
ドキュメント（Requirements, Planning, Report等）を更新した場合、担当エージェントは直ちに `generate-portal-skill` を実行し、`08_Documentation_Portal/index.html` を最新化しなければならない。**「保存して終わり」は未完了とみなす。**

## 2. ドキュメント構成の 3-Tier 原則
各フェーズ（Phase XX）のフォルダ内には、以下の3種を必ず揃え、ポニータルから辿れるようにすること。
1. **Plan.md**: ガントチャートを含む実行計画。
2. **Report.md**: 遂行プロセスと視覚的エビデンス（画像・Mermaid）。
3. **Verification_Log.md**: 品質検証結果（QAログ）へのリンク。

## 3. 納品物の定義 (Final Delivery)
プロジェクトのクローズおよび納品には、以下が不備なく揃っていることが必須である。
- **06_Delivery/**: ユーザーマニュアル、セットアップ手順、リリースノート（.md）。
- **08_Documentation_Portal/**: 全工程の証跡を網羅したブラウジング可能な HTML ポータル。
- **Product Assets**: ソースコード一式。

## 4. パス指定と資産の整合性
ポータル内での画像・リンク切れを防ぐため、以下のルールを厳守せよ。
- **Relative Path Only**: ドキュメント内のリンクは必ずプロジェクトルートまたはファイルからの相対パスで記述する。
- **Asset Migration**: ドキュメントで使用する画像は、ポータルの `assets/` ディレクトリへ同期されていること（自動スクリプト推奨）。

## 5. Hyper-Gantt 準拠 (KPI Integration)
ポータルの進捗表示面において、`VIS-003` に基づく Hyper-Gantt プロトコルに完全準拠すること。
- **KPI必須項目**: Human Plan (Days), AI Actual (Min), Acceleration (X) の3要素が表示されていること。
- **インタラクティブ性**: タイムライン上の各タスクにホバー・ツールチップによる詳細説明が実装されていること。

---
**Status**: 🔵 Mandatory
**Compliance**: `VIS-003` を含めた完全準拠が品質合格（Quality Gate 4）の条件となる。
