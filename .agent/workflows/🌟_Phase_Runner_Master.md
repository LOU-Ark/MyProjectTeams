---
description: 各開発フェーズの実行から品質検証、最終納品までを全自動でオーケストレーションするマスターワークフロー。
---

# WORKFLOW: 🌟_Phase_Runner_Master

## GOAL
ユーザーからの「次のフェーズを実行して」という指示を受け取り、実装➔検証（バグがあればループ）➔報告のサイクルを全自動でオーケストレーションすること。最終フェーズであれば納品処理までを完遂すること。

## TRIGGER
- ユーザーからの「Phase XXを開始して」という入力。

## EXECUTION SEQUENCE
1. **Iteration Loop**: `03-execute-iteration` を起動する。内部で `04-verify-and-debug` と連携し、テストをパスするまで自律的にループさせる。
2. **Dashboard Update**: フェーズ完了後、`master-reporter` を起動し、`00_Master_Report.md` の該当フェーズの進捗を100%に更新、最新のGantt画像に差し替える。
3. **Phase Check**: 今回完了したフェーズが、WBS上で「最後のフェーズ」であるか判定する。
   - **No（まだ次がある）**: ユーザーへフェーズ完了の報告を行う。
   - **Yes（最後のフェーズだった）**: 
      1. `05-finalize-delivery` を起動し、納品パッケージを作成する。
      2. 続けて `🌟_Portal_Generator_Master` を起動し、`08_Documentation_Portal` を生成する。

## REPORTING FORMAT (フェーズ完了時)
「Phase XXが完了しました！
・ `03_Implementation/Phase_XX_Report.md` に本日の遂行ログを記録しています。
・ `04_Quality_Gate` にてテスト全パスを確認済みです。
・ `00_Master_Report.md` の進捗状況（ガントチャート）を最新化しました。
問題なければ、次のPhaseへ進みますか？」

## REPORTING FORMAT (最終納品時)
「お疲れ様でした！全フェーズの完了、および最終納品パッケージ（06_Delivery）とドキュメントポータル（08_Documentation_Portal）が完成しました。
`00_Master_Report.md` も完了状態にクローズしています。成果物をご確認ください。」
