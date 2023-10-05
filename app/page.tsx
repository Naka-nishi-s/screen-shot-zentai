'use client'

import Image from 'next/image';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {

  // 画像を管理
  const [catImage, setCatImage] = useState("");

  /**
   * 事前に用意した猫画像(public/cat.png)を取得する
   */
  const getCatImage = async () => {
    try {
      // リクエストを送る
      const response = await fetch("/api/image-return", { method: "POST" });

      // 画像がバイナリデータで返ってくるのでblobに格納する
      // blobはバイナリデータの入れ物的な役割
      const blob = await response.blob();

      // blob（画像入り）へのアドレスを作成している。
      // ここを参照すれば画像が入ってる。
      const objectURL = URL.createObjectURL(blob);

      // アドレスをセット
      setCatImage(objectURL);
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <main className={styles.main}>
      <div>
        <button onClick={getCatImage}>猫を見よう</button>
      </div>
      <div>
        {catImage && (
          <Image src={catImage} width={500} height={500} alt='猫の画像' />
        )}
      </div>
    </main>
  )
}
