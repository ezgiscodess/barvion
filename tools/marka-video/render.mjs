import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('/opt/homebrew/lib/node_modules/@playwright/cli/node_modules/playwright-core')
import fs from 'node:fs'
const out = process.argv[2], fps = 24, dur = 12, step = process.argv[3] ? +process.argv[3] : 1
fs.mkdirSync(out, { recursive: true })
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } })
await p.goto('file://' + new URL('./scene.html', import.meta.url).pathname)
await p.waitForTimeout(500)
const n = fps * dur
for (let i = 0; i < n; i += step) {
  await p.evaluate((t) => window.seek(t), (i / fps) * 1000)
  await p.screenshot({ path: `${out}/f${String(i).padStart(4, '0')}.png` })
}
await b.close()
