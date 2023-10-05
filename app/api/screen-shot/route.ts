import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(request: NextRequest) {

  // リファラを取得
  const refererURL = request.headers.get('referer')

  // リファラ取得出来なかったら終了
  if (!refererURL) {
    return new NextResponse(JSON.stringify({ err: "Sorry...うまく処理出来なかったヨ..." }), { status: 500 })
  }

  // ブラウザを作成
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  // 新しいページを作成
  const page = await browser.newPage();

  // ページ遷移
  await page.goto(refererURL, { waitUntil: 'networkidle2' })
  const screenShot = await page.screenshot({ fullPage: true });

  await browser.close();

  // レスポンスを作成
  const response: any = new NextResponse(screenShot);
  response.headers.set('Content-Type', 'image/png')
  response.headers.set('Content-Disposition', 'attachment; filename=screenshot.png')

  return response
}


export async function POST(request: NextRequest) {

  // リファラを取得
  const refererURL = request.headers.get('referer')

  // リファラ取得出来なかったら終了
  if (!refererURL) {
    return new NextResponse(JSON.stringify({ err: "Sorry...うまく処理出来なかったヨ..." }), { status: 500 })
  }

  // ブラウザを作成
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  // 新しいページを作成
  const page = await browser.newPage();

  // ページ遷移
  await page.goto(refererURL, { waitUntil: 'networkidle2' })
  const screenShot = await page.screenshot({ fullPage: true });

  await browser.close();

  // レスポンスを作成
  const response: any = new NextResponse(screenShot);
  response.headers.set('Content-Type', 'image/png')
  response.headers.set('Content-Disposition', 'attachment; filename=screenshot.png')

  return response
}
