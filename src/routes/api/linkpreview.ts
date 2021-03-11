import type { ServerResponse } from "node:http";
import type polka from "polka";
import { CookieJar, JSDOM } from "jsdom";
import { fixUrl } from "../../utils/fixurl";

export async function get(
  req: polka.Request,
  res: ServerResponse,
  next: () => void
) {
  let url = fixUrl(req.query["url"] as string);

  const cookieJar = new CookieJar();
  const dom = await JSDOM.fromURL(url, { cookieJar });
  const document = dom.window.document;

  const title =
    document.head
      .querySelector('meta[name="title"]')
      ?.getAttribute("content") ||
    document.head
      .querySelector('meta[property="og:title"]')
      ?.getAttribute("content") ||
    document.head
      .querySelector('meta[property="twitter:title"]')
      ?.getAttribute("content") ||
    document.head
      .querySelector('meta[property="og:site_name"]')
      ?.getAttribute("content") ||
    document.title;

  const description =
    document.head
      .querySelector('meta[name="description"]')
      ?.getAttribute("content") ||
    document.head
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content") ||
    document.head
      .querySelector('meta[property="twitter:description"]')
      ?.getAttribute("content") ||
    document.body.querySelector("p")?.innerText ||
    "";

  const image =
    document.head
      .querySelector('meta[property="og:image"]')
      ?.getAttribute("content") ||
    document.head
      .querySelector('meta[property="twitter:image"]')
      ?.getAttribute("content") ||
    document.head
      .querySelector('link[rel="apple-touch-icon"]')
      ?.getAttribute("href") ||
    "";

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ title, description, image, url }));
}
