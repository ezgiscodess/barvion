# Araç ve MCP Durumu

Son kontrol: 16 Kasım 2026

## Yerel araçlar

| Araç | Durum |
| --- | --- |
| Node.js | Kurulu: `v25.8.2` |
| npm | Kurulu: `11.11.1` |
| Codex CLI | Kurulu: `0.169.0` |
| Blender | PATH üzerinde bulunamadı |

## MCP bağlantıları

Kullanıcının mevcut `~/.codex/config.toml` dosyası korunmuştur; aynı bağlantılar yeniden eklenmemiştir.

- Figma: etkin, `streamable_http`, resmî `https://mcp.figma.com/mcp` uç noktası. Bu oturumda OAuth/araç çağrısı sonucu alınamadığı için bağlantı doğrulanmış sayılmaz. Gerekirse kullanıcı `codex mcp login figma` komutuyla hesabında oturum açmalıdır.
- Playwright: etkin, `stdio`, `npx -y @playwright/mcp@latest`. Yapılandırma resmî örnekle eşleşir. npm kayıt defterine DNS erişimi olmadığı için sunucu paketi indirilememiş ve tarayıcı oturumu doğrulanamamıştır.

## Engelli doğrulamalar

Bu çalışma oturumunda `registry.npmjs.org` DNS çözümlemesi `ENOTFOUND` ile başarısız oldu. Sonuç olarak `npm install`, `npm run typecheck`, `npm run build` ve Playwright ekran görüntüsü akışı tamamlanamadı. Ağ erişimi olan bir kabukta:

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Ardından Playwright MCP istemcisini yeniden başlatıp `http://127.0.0.1:4173` adresini masaüstü ve mobil viewport'larda doğrulayın.
