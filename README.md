トップページ：
1. ボタンを押すとサーバー側で画像を取得し、レスポンスとして返す
2. フロント側でレスポンスから画像を取り出し、表示

/screen-shot：
1. ボタンを押すとサーバー側でpuppeteerを起動。スクリーンショットを撮って、レスポンスとして返す
2. フロント側でレスポンスから画像を取り出し、表示
3. 「ダウンロード」ボタンの出現
4. ダウンロードボタンを押すと、confirmでダウンロードするか聞く
5. サーバー側でpuppeteerを起動。スクリーンショットを撮って、レスポンスとして返す
6. content-typeにatattimentが指定されているので、ブラウザ側で強制的にダウンロードさせる
