# Barvion Premium 3D Showcase

Mevcut statik Barvion sitesi korunurken, bu klasörde Vite + React + TypeScript tabanlı bağımsız bir premium ürün vitrini bulunur.

## Çalıştırma

```bash
npm install
npm run dev
```

Üretim doğrulaması:

```bash
npm run typecheck
npm run build
npm run preview
```

Yerel adres: `http://127.0.0.1:4173`

## 3D sahne davranışı

- NEXUS·01 gerçek bir ürün veya indirilen model değildir; React Three Fiber ile oluşturulmuş prosedürel/geometrik bir demodur.
- WebGL açılmazsa veya sahne kodu hata verirse statik ürün görseli gösterilir.
- `prefers-reduced-motion` etkin olduğunda sürekli render ve otomatik ürün hareketi kapatılır.
- Canvas piksel oranı en fazla `1.5` ile sınırlandırılır; gölge ve yansıma çözünürlükleri mobil performans için kontrollüdür.

## Blender akışı

`tools/create_product_scene.py`, Blender kurulu bir makinede geometrik bir ürün sahnesi oluşturup GLB dışa aktarır:

```bash
blender --background --python tools/create_product_scene.py
```

Beklenen çıktı: `premium/public/models/nexus-01-demo.glb`
