// Hero filmini kare kare çeker ve ffmpeg ile kodlar.
//   node studio/render.mjs --layout wide --w 1920 --h 1080 --out studio/out/hero-wide.mp4
//   node studio/render.mjs --layout wide --w 1280 --h 720 --stills 0,2.5,4,5.5,7
// Sahne window.onSeek(t) ile deterministik çizilir.
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const { chromium } = require(path.join(here, "node_modules/playwright-core"));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) => (v.startsWith("--") ? [...acc, [v.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true]] : acc), []));
const W = +(args.w || 1920), H = +(args.h || 1080), FPS = +(args.fps || 24), DUR = +(args.dur || 8);
const PR = +(args.pr || 1), CRF = +(args.crf || 22);
const layout = args.layout || "wide";
const url = `${pathToFileURL(path.join(here, "scenes", `${args.scene || "terazi"}.html`)).href}?capture=1&layout=${layout}&pr=${PR}${args.q ? "&" + args.q : ""}`;

const browser = await chromium.launch({ executablePath: CHROME, args: ["--force-color-profile=srgb", "--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist", "--allow-file-access-from-files"] });
const page = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage();
page.on("pageerror", (e) => console.error("[sahne hatası]", e.message));
page.on("console", (m) => { if (m.type() === "error") console.error("[konsol]", m.text()); });
await page.goto(url, { waitUntil: "load" });
await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });

const grab = async (t) => {
  await page.evaluate((tt) => window.onSeek(tt), t);
  return page.evaluate(() => document.querySelector("canvas").toDataURL("image/png").split(",")[1]);
};

if (args.stills) {
  const dir = path.join(here, "out", "stills"); fs.mkdirSync(dir, { recursive: true });
  for (const t of String(args.stills).split(",").map(Number)) {
    const file = path.join(dir, `${layout}-${t}.png`);
    fs.writeFileSync(file, Buffer.from(await grab(t), "base64"));
    console.log(file);
  }
}

if (args.out) {
  const out = path.resolve(args.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const vf = [`scale=${args.outw || W}:-2:flags=lanczos`, "format=yuv420p"];
  const enc = out.endsWith(".webm")
    ? ["-c:v", "libvpx-vp9", "-b:v", "0", "-crf", String(CRF + 10), "-row-mt", "1", "-deadline", "good", "-cpu-used", "2"]
    : ["-c:v", "libx264", "-preset", "slow", "-crf", String(CRF), "-profile:v", "high", "-movflags", "+faststart", "-tune", "film"];
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-", "-vf", vf.join(","), "-an", ...enc, out], { stdio: ["pipe", "inherit", "inherit"] });
  const N = Math.round(DUR * FPS);
  for (let i = 0; i < N; i++) {
    ff.stdin.write(Buffer.from(await grab(i / FPS), "base64"));
    if (i % 24 === 0) process.stdout.write(`\r${i}/${N}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  console.log(`\n${out}`);
}

if (args.poster) {
  const file = path.resolve(args.poster);
  fs.writeFileSync(file, Buffer.from(await grab(+(args.posterT ?? 5.6)), "base64"));
  console.log(file);
}
await browser.close();
