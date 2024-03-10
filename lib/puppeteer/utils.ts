import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium-min";
import { join } from "path";

export const getBrowser = async () => {
  const dirRelativeChromiumFolder = "chromium-pack";

  const browser = await puppeteer.launch({
    args: process.env.NODE_ENV === "development" ? undefined : chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath:
      process.env.NODE_ENV === "development"
        ? undefined
        : await chromium.executablePath(
            join(__dirname, dirRelativeChromiumFolder)
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
