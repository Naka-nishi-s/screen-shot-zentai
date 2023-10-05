'use client'
import Image from 'next/image';
import { useState } from 'react';

export default function ScreenShot() {

  // 画像を管理
  const [screenImage, setScreenImage] = useState("");
  /**
   * Node.js側でスクリーンショットを撮って、返却する
   */
  const getScreenShot = async () => {
    try {
      // リクエストを送る
      const response = await fetch("/api/screen-shot", { method: "POST" });

      // 画像がバイナリデータで返ってくるのでblobに格納する
      // blobはバイナリデータの入れ物的な役割
      const blob = await response.blob();

      // blob（画像入り）へのアドレスを作成している。
      // ここを参照すれば画像が入ってる。
      const objectURL = URL.createObjectURL(blob);

      // アドレスをセット
      setScreenImage(objectURL);
    } catch (e: any) {
      console.log(e);
    }
  }

  /**
   * スクショをダウンロードする
   */
  const downloadScreenShot = () => {
    const answer = confirm("ダウンロードする？")
    if (answer) {
      // react-routerのpushだと、クライアントサイドでのページ遷移なので、
      // サーバーサイドにリクエストが飛ばない。

      // サーバーサイドにリクエストを送らないとダウンロードが始まらないので、
      // かっこ悪いけどlocation.hrefを使用する。

      // サーバーサイドのレスポンスで「Content-Disposition:attachment」を使用しているので、
      // レスポンスの受け取りと同時に強制的にダウンロードさせることができる。
      window.location.href = "/api/screen-shot";
    }
  }

  return (
    <>
      <div>
        <button onClick={getScreenShot}>スクショを撮ろう</button>
        {screenImage && (
          <button onClick={downloadScreenShot}>スクショをダウンロード</button>
        )}
      </div>
      <div>
        <Image src={"/cat.png"} width={500} height={500} alt='猫の画像' />
      </div>
      <div>
        {screenImage && (
          <Image src={screenImage} width={500} height={500} alt='スクショの画像' />
        )}
      </div>
    </>
  )
}
