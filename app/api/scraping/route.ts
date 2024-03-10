import { NextResponse } from "next/server";
import { getBrowser } from "@/lib/puppeteer/utils";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.goto(data.url);

    await page.waitForSelector("html");

    const elementText = await page.$eval("html", (el) => el.innerHTML);

    await browser.close();

    return NextResponse.json(
      {
        message: `Success go to: ${data.url}`,
        content: `<html>${elementText}</html>`,
      },
      {
        status: 200,
      }
    );
  } catch (e: any) {
    console.log("Error:", e);
    return NextResponse.json(
      { message: "error", errorMessage: e.message },
      {
        status: 500,
      }
    );
  }
}
