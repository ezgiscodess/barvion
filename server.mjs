// Barvion statik sunucu (bağımlılıksız). Railway: PORT ortam değişkenini kullanır.
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'
const root = path.dirname(fileURLToPath(import.meta.url))
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' }
const BLOCK = /^\/(src|studio3d|premium|tools|node_modules|\.git)(\/|$)|\.(mjs|json|lock|md|py)$/
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  if (BLOCK.test(p) && p !== '/server.mjs') p = '/__404'
  let f = path.join(root, path.normalize(p).replace(/^(\.\.[/\\])+/, ''))
  if (!f.startsWith(root)) f = path.join(root, '__404')
  try { if (fs.statSync(f).isDirectory()) { if (!p.endsWith('/')) { res.writeHead(301, { Location: p + '/' }); return res.end() } f = path.join(f, 'index.html') } } catch {}
  if (!fs.existsSync(f)) { res.writeHead(404, { 'Content-Type': T['.html'] }); return res.end('<!doctype html><meta charset=utf-8><title>404</title><p>Sayfa bulunamadı. <a href="/">Ana sayfa</a>') }
  const ext = path.extname(f).toLowerCase(), h = { 'Content-Type': T[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400' }
  if (ext === '.mp4') { const st = fs.statSync(f), r = req.headers.range
    if (r) { const [a, b] = r.replace('bytes=', '').split('-'), s = +a, e = b ? +b : st.size - 1; res.writeHead(206, { ...h, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${s}-${e}/${st.size}`, 'Content-Length': e - s + 1 }); return fs.createReadStream(f, { start: s, end: e }).pipe(res) }
    res.writeHead(200, { ...h, 'Accept-Ranges': 'bytes', 'Content-Length': st.size }); return fs.createReadStream(f).pipe(res) }
  if (/^(text|application\/(json|xml)|image\/svg)/.test(h['Content-Type']) && /gzip/.test(req.headers['accept-encoding'] || '')) { res.writeHead(200, { ...h, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' }); return fs.createReadStream(f).pipe(zlib.createGzip()).pipe(res) }
  res.writeHead(200, h); fs.createReadStream(f).pipe(res)
}).listen(process.env.PORT || 3000, '0.0.0.0')
