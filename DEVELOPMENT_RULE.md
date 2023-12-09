# フォーマッター
Prettierを用いる

# コミットルール

## Prefixをつける
- feat: 新しい機能
- fix: バグの修正
- docs: ドキュメントのみの変更
- style: 空白、フォーマット、セミコロン追加など
- refactor: 仕様に影響がないコード改善(リファクタ)
- chore: ビルド、補助ツール、ライブラリ関連

## その他
- 可能な限り理由を書く（〇〇なため、△△を追加）
- 日本語で書く（時間の節約のため）

参考
[僕が考える最強のコミットメッセージの書き方](https://qiita.com/konatsu_p/items/dfe199ebe3a7d2010b3e)

# ブランチ名
- feature/xxxxxxxx: 機能の追加。 develop から分岐し develop にプルリクエストし、マージ
- fix/xxxxxxxx: 修正用ブランチ
- xxxの部分はケバブケース(xxx-yyy-zzz)とする

参考
[【私的】GitHub ブランチ運用ルール](https://zenn.dev/kazunori_kimura/articles/e7b75e60316ded6480a6)

# 変数名、関数名
- キャメルケースを用いる
  - はじめの単語はすべて小文字、2番目以降の単語の先頭文字を大文字にする記述法

参考
[【JavaScriptの入門】変数名のルールと命名規則](https://tcd-theme.com/2022/02/javascript-variable-rule.html)
