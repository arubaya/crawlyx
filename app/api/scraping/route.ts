import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 738 });

    await page.goto(data.url);

    await page.waitForSelector("body");

    const elementText = await page.$eval("body", (el) => el.innerHTML);

    await browser.close();

    return NextResponse.json(
      { message: `Success go to: ${data.url}`, content: elementText },
      {
        status: 200,
      }
    );
  } catch (e: any) {
    console.log("Error:", e);
    return NextResponse.json(
      { message: "error" },
      {
        status: 500,
      }
    );
  }
}
