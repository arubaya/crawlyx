import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium-min";

chromium.setHeadlessMode = true;

const getBrowser = async () => {
  const browser = await puppeteer.launch({
    args: process.env.NODE_ENV === "development" ? undefined : chromium.args,
    defaultViewport:
      process.env.NODE_ENV === "development"
        ? undefined
        : chromium.defaultViewport,
    executablePath:
      process.env.NODE_ENV === "development"
        ? undefined
        : await chromium.executablePath(
            "https://github.com/Sparticuz/chromium/releases/download/v122.0.0/chromium-v122.0.0-pack.tar"
          ),
    headless: process.env.NODE_ENV === "development" ? false : true,
  });
  return browser;
  // return process.env.NODE_ENV === "development"
  //   ? await puppeteer.launch({ headless: false })
  //   : await puppeteerCore.launch({
  //       args: chromium.args,
  //       defaultViewport: chromium.defaultViewport,
  //       executablePath: await chromium.executablePath(
  //         "https://github.com/Sparticuz/chromium/releases/download/v122.0.0/chromium-v122.0.0-pack.tar"
  //       ),
  //     });
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const browser = await getBrowser();
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
      { message: "error", errorMessage: e.message },
      {
        status: 500,
      }
    );
  }
}
