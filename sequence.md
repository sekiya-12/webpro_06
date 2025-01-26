
```mermaid
sequenceDiagram
  autonumber
  Webブラウザ ->> Webサーバ: Webページの取得
  Webサーバ ->> Webブラウザ:HTML,JS,CSS
  Webブラウザ ->> やることリストSPAクライアント:起動
  やることリストSPAクライアント ->> やることリストSPAサーバ:tasks/get(タスクを取得)
  やることリストSPAサーバ ->> やることリストSPAクライアント:タスクのリスト
  やることリストSPAクライアント ->> やることリストSPAサーバ:tasks(タスクを追加)
  やることリストSPAサーバ ->> やることリストSPAクライアント:追加したタスク
  やることリストSPAクライアント ->> やることリストSPAサーバ:tasks/delete(タスクを削除)
  やることリストSPAサーバ ->> やることリストSPAクライアント:削除したタスク
```
