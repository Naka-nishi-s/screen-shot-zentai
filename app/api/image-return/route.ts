import { promises } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";


export async function POST(request: NextRequest) {

  // リファラを取得
  const refererURL = request.headers.get('referer')

  // リファラ取得出来なかったら終了
  if (!refererURL) {
    return new NextResponse(JSON.stringify({ err: "Sorry...うまく処理出来なかったヨ..." }), { status: 500 })
  }

  // ファイルパスを設定
  const filePath = path.join(process.cwd(), 'public', 'cat.png');

  // 画像を取りに行く
  const file = await promises.readFile(filePath);

  // レスポンスを作成
  // 画像はバイナリデータで取れるので、そのままResponseに突っ込んで返せる
  const response = new NextResponse(file);
  response.headers.set('Content-Type', 'image/png')

  return response
}
