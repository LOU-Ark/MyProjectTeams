---
description: VIS-004 基準に基づき、プロジェクト管理全フェーズ（01-07）を網羅した、最高品質の監視ポータル（index.html）を生成・維持すること。
---
# WORKFLOW: 🌟_Portal_Generator_Master

## GOAL
VIS-004 基準に基づき、プロジェクト管理全フェーズ（01-07）を網羅した、最高品質の監視ポータル（index.html）を生成・維持すること。

## ACTOR
- Skill: `documentation-architect`

## TRIGGER
- ユーザーからの指示、またはプロジェクトの進捗更新時。

## RULES (MANDATORY)
- **Compliance**: `VIS-004` に 100% 準拠すること。
- **Auto-Scan Principle**: ファイル名を指定して収集するのではなく、`management/` 下を物理スキャンして全証跡を自動抽出すること。
- **Full Fidelity**: Markdown の全文を一文字も漏らさず埋め込むこと（要約厳禁）。
- **Structural Persistence**: サイドバーは `engine.js` により動的にネスト生成され、過去の全フェーズ履歴が閲覧可能であること。

## EXECUTION SEQUENCE
1. **Asset Deployment**: 
   - `.agent/assets/style.css` (v10.6) を `management/08_Documentation_Portal/` へ展開。
   - `.agent/assets/engine.js` (動的ナビ生成機能付き/v6.0+) を `management/08_Documentation_Portal/` へ展開。
   - `.agent/assets/scanner.js` (動的ディレクトリ走査エンジン) を `management/08_Documentation_Portal/` へ展開。
   - `.agent/assets/template.html` を `management/08_Documentation_Portal/index.html` として展開。
2. **Dynamic Sync Verification**:
   - サーバー（python http.server 等）を起動し、ポータルを開く。
   - `scanner.js` が `management/` 下のファイルを検出し、コンソールに `[Scanner] Scan Complete` と表示されることを確認。
3. **Data Integrity Check**: 
   - サイドバーに自動検出されたドキュメントが漏れなくリストアップされていることを確認（Master Report, Requirements, Phase Logs等）。
4. **Final Audit**: 
   - 任意のドキュメントをクリックし、Markdownが全文（Full Fidelity）正しくレンダリングされていることを目認確認する。

---
**Version:** 4.1.0 (Auto-Scan & Full Fidelity Standard)
