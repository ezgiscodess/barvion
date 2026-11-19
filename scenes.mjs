// Çözüm sayfaları için vektör modellenmiş sahneler (PNG yok): makine, telefon, monitör, sunucu, geçit.
// Her sahne adımlıdır; data-in="1,2" ile hangi adımlarda göründüğü belirtilir. script.js adımları otomatik ilerletir.

const DEFS = `<defs>
  <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EEF1F6"/><stop offset=".55" stop-color="#C3CAD6"/><stop offset="1" stop-color="#8E97A8"/></linearGradient>
  <linearGradient id="steelD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A6578"/><stop offset="1" stop-color="#2C3445"/></linearGradient>
  <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#27406F"/><stop offset="1" stop-color="#0E1B38"/></linearGradient>
  <linearGradient id="blueG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4C86F0"/><stop offset="1" stop-color="#1F4BC4"/></linearGradient>
  <linearGradient id="green" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6C7A3A"/><stop offset="1" stop-color="#3F4A1F"/></linearGradient>
  <linearGradient id="beige" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6D9BC"/><stop offset="1" stop-color="#B9A87E"/></linearGradient>
  <linearGradient id="screenG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0F2A44"/><stop offset="1" stop-color="#0A1A30"/></linearGradient>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#000" flood-opacity=".5"/></filter>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>`

const st = (ins, inner, cls = '') => `<g class="st ${cls}" data-in="${ins}">${inner}</g>`
const T = (x, y, t, c = 'tx', a = 'start') => `<text x="${x}" y="${y}" class="${c}" text-anchor="${a}">${t}</text>`
const ICON = {
  wrench: (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})" class="ic"><path d="M30 6a14 14 0 0 0-12 20L4 40l8 8 14-14a14 14 0 0 0 20-12l-9 9-8-2-2-8z"/></g>`,
  check: (x, y, s = 1) => `<path transform="translate(${x},${y}) scale(${s})" class="ck" d="M0 10l10 11L28 0"/>`,
  warn: (x, y) => `<g transform="translate(${x},${y})"><path d="M0 -30L30 24H-30Z" class="wr"/><rect x="-3" y="-10" width="6" height="20" fill="#2A1A00"/><circle cy="16" r="3.4" fill="#2A1A00"/></g>`,
}
const qr = (x, y, s) => {
  const g = [[0,0],[1,0],[2,0],[4,0],[6,0],[0,1],[2,1],[3,1],[6,1],[0,2],[1,2],[2,2],[4,2],[5,2],[6,2],[3,3],[1,4],[2,4],[4,4],[6,4],[0,5],[3,5],[5,5],[6,5],[0,6],[2,6],[3,6],[4,6],[6,6]]
  return `<g transform="translate(${x},${y}) scale(${s})"><rect width="7.6" height="7.6" x="-.3" y="-.3" fill="#fff"/>${g.map(([a, b]) => `<rect x="${a}" y="${b}" width="1" height="1" fill="#0B1526"/>`).join('')}</g>`
}

/* ---------- modeller ---------- */
const packMachine = (x, y) => `<g transform="translate(${x},${y})" filter="url(#soft)">
  <ellipse cx="290" cy="372" rx="300" ry="26" fill="rgba(0,0,0,.4)"/>
  <rect x="0" y="40" width="580" height="320" rx="22" fill="url(#steel)"/>
  <rect x="0" y="262" width="580" height="98" rx="16" fill="url(#steelD)" opacity=".18"/>
  <rect x="30" y="68" width="370" height="200" rx="12" fill="url(#glass)" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>
  <rect x="44" y="196" width="342" height="12" fill="#2C3445"/>
  <g class="belt-b"><rect x="60" y="172" width="42" height="24" fill="#F3F6FA"/><rect x="170" y="172" width="42" height="24" fill="#F3F6FA"/><rect x="290" y="172" width="42" height="24" fill="#F3F6FA"/></g>
  <rect x="150" y="96" width="14" height="76" fill="#9AA3B2"/><rect x="132" y="150" width="50" height="26" rx="4" fill="#C5CCD8"/>
  <rect x="428" y="68" width="124" height="200" rx="12" fill="#161F33"/>
  <rect x="440" y="82" width="100" height="70" rx="6" fill="url(#screenG)"/>
  <circle cx="452" cy="196" r="9" fill="#2FD27A"/><circle cx="484" cy="196" r="9" fill="#3E8BFF"/><circle cx="516" cy="196" r="9" fill="#E5463F"/>
  <rect x="266" y="0" width="36" height="46" rx="6" fill="#3A4252"/>
  <circle cx="284" cy="-10" r="22" class="lamp" filter="url(#glow)"/>
  <rect x="28" y="274" width="92" height="82" rx="6" fill="#F7F9FC"/>${qr(40, 284, 10)}
  ${T(74, 348, 'PK-04', 'tq', 'middle')}
  ${T(486, 128, '', 'mt', 'middle')}
</g>`
const phone = (x, y, inner) => `<g transform="translate(${x},${y}) rotate(-7)" filter="url(#soft)">
  <rect width="200" height="390" rx="34" fill="#0A0F1B" stroke="#4A5470" stroke-width="3"/>
  <rect x="12" y="14" width="176" height="362" rx="26" fill="url(#screenG)"/>
  <rect x="72" y="22" width="56" height="10" rx="5" fill="#0A0F1B"/>${inner}
</g>`
const monitor = (x, y, w, h, inner) => `<g transform="translate(${x},${y})" filter="url(#soft)">
  <rect width="${w}" height="${h}" rx="18" fill="#101826" stroke="#8B96AD" stroke-width="5"/>
  <rect x="14" y="14" width="${w - 28}" height="${h - 28}" rx="8" fill="url(#screenG)"/>${inner}
  <rect x="${w / 2 - 22}" y="${h}" width="44" height="46" fill="url(#steelD)"/>
  <ellipse cx="${w / 2}" cy="${h + 50}" rx="110" ry="14" fill="url(#steel)"/>
</g>`
const wave = (x, y, w, h) => `<polyline class="wv" points="${Array.from({ length: 28 }, (_, i) => `${x + (i * w) / 27},${y + h / 2 + Math.sin(i / 2.1) * (h / 2.4)}`).join(' ')}"/>`
const card = (x, y, w, h, inner) => `<g transform="translate(${x},${y})"><rect width="${w}" height="${h}" rx="22" class="cardr"/>${inner}</g>`
const row = (y, label, val, vcls = 'tv') => `${T(44, y, label, 'tl')}${T(430, y, val, vcls, 'end')}<line x1="30" x2="440" y1="${y + 18}" y2="${y + 18}" class="hr"/>`

/* ---------- sade kart yardımcıları ---------- */
// Satırlı bilgi kartı: başlık + (etiket, değer) satırları. Metin kutudan taşmaz: kart genişliği satırlara göre seçilir.
const info = (x, y, w, title, rows, o = {}) => {
  const top = 92, gap = 62
  const h = top + rows.length * gap + 18
  const body = rows.map(([l, v, c], i) => {
    const yy = top + 24 + i * gap
    return `${o.dots ? `<circle cx="42" cy="${yy - 9}" r="7" class="${c || 'gd'}"/>` : ''}${T(o.dots ? 66 : 40, yy, l, 'tl')}${v ? T(w - 40, yy, v, c === 'hi' ? 'tv hi' : 'tv', 'end') : ''}<line x1="40" x2="${w - 40}" y1="${yy + 20}" y2="${yy + 20}" class="hr"/>`
  }).join('')
  return `<g transform="translate(${x},${y})"><rect width="${w}" height="${h}" rx="6" class="cardr"/>${T(40, 58, title, 'ct')}${body}</g>`
}
const tag = (x, y, t) => `<g transform="translate(${x},${y})">${T(0, 0, t, 'tg', 'middle')}</g>`

/* ---------- Bakım: 6 adım ---------- */
export const bakimScene = () => {
  const steps = ['Arızayı fark et', 'Bildirim oluştur', 'Teknisyene ata', 'Müdahale et', 'Test et ve doğrula', 'Geçmişe kaydet']
  const X = 820, W = 680, Y = 130
  const svg = `<svg viewBox="0 0 1600 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${DEFS}
  ${packMachine(70, 130)}
  ${st('1', `<g transform="translate(240,170)">${ICON.warn(0, 0)}</g>`, 'pop')}
  ${st('1', info(X, Y, W, 'Arıza algılandı', [['Makine', 'PK-04'], ['Durum', 'Sensör hatası', 'hi']]))}
  ${st('2', info(X, Y, W, 'Arıza bildirimi', [['Makine', 'PK-04'], ['Sorun', 'Sensör algılamıyor'], ['Öncelik', 'Yüksek', 'hi']]))}
  ${st('3', info(X, Y, W, 'İş emri #1042', [['Sorumlu', 'Bakım ekibi'], ['Öncelik', 'Yüksek', 'hi'], ['Durum', 'Atandı']]))}
  ${st('4', info(X, Y, W, 'İş emri #1042', [['Sensör bağlantısı kontrol edildi', '', 'gd'], ['Sensör ayarı yapılıyor', '', 'bd'], ['Test bekleniyor', '', 'id']], { dots: true }))}
  ${st('5', info(X, Y, W, 'Test başarılı', [['Sensör sinyali', 'Normal'], ['Makine', 'Çalışıyor']]))}
  ${st('6', info(X, Y, W, 'PK-04 · Bakım geçmişi', [['İşlem', 'Sensör ayarı'], ['Sonuç', 'Çalışma doğrulandı'], ['Kayıt', 'Tamamlandı']]))}
</svg>`
  return stepviz('bakim', 'Arızadan kayda, kayıttan <i>karara.</i>', steps, svg)
}

/* ---------- Veri toplama: 6 adım ---------- */
const lathe = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="150" cy="170" rx="165" ry="14" fill="rgba(0,0,0,.4)"/><rect x="0" y="100" width="300" height="62" rx="8" fill="url(#green)"/><rect x="14" y="40" width="90" height="62" rx="8" fill="#5C6B30"/><circle cx="60" cy="70" r="20" fill="#2C3445"/><rect x="104" y="80" width="150" height="14" fill="#C3CAD6"/><rect x="214" y="52" width="60" height="50" rx="6" fill="#5C6B30"/><circle cx="160" cy="132" r="22" fill="#C3CAD6" stroke="#2C3445" stroke-width="4"/><rect x="20" y="162" width="14" height="14" fill="#2C3445"/><rect x="266" y="162" width="14" height="14" fill="#2C3445"/></g>`
const cnc = (x, y, s = 1, body = 'beige') => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="130" cy="190" rx="150" ry="14" fill="rgba(0,0,0,.4)"/><rect x="0" y="20" width="270" height="168" rx="12" fill="url(#${body})"/><rect x="26" y="46" width="150" height="104" rx="8" fill="url(#glass)" stroke="#fff" stroke-opacity=".5" stroke-width="3"/><rect x="104" y="70" width="14" height="54" fill="#9AA3B2"/><rect x="190" y="40" width="64" height="112" rx="8" fill="#1B2438"/><rect x="198" y="48" width="48" height="36" rx="3" fill="url(#screenG)"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${200 + (i % 3) * 16}" y="${96 + Math.floor(i / 3) * 14}" width="11" height="9" rx="2" fill="#7B86A0"/>`).join('')}<rect x="20" y="0" width="90" height="26" rx="4" fill="#8E97A8"/></g>`

export const veriScene = () => {
  const steps = ['Mevcut makineler', 'Uygun bağlantıyı seç', 'Veriyi topla', 'Tek formata dönüştür', 'Doğrula ve kaydet', 'İzle ve kullan']
  const X = 1060, W = 480, Y = 100
  const bus = `<path class="lnk" d="M210 350 V250 H${X} M535 310 V250 M835 310 V250"/>`
  const svg = `<svg viewBox="0 0 1600 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${DEFS}
  ${lathe(60, 330, 1)}${cnc(400, 310, 1, 'beige')}${cnc(700, 310, 1, 'steel')}
  ${tag(210, 560, 'Torna-01')}${tag(535, 560, 'CNC-01')}${tag(835, 560, 'CNC-02')}
  ${st('1', info(X, Y, W, 'Mevcut durum', [['Torna-01', 'Veri yok'], ['CNC-01', 'Veri yok'], ['CNC-02', 'Veri yok']]))}
  ${st('2', bus + info(X, Y, W, 'Bağlantı seçenekleri', [['Seri port / RS-485'], ['Modbus'], ['LoRa']], { dots: true }))}
  ${st('3', bus + info(X, Y, W, 'Canlı veri', [['Durum', 'Çalışıyor'], ['Sayaç', '1248'], ['Sıcaklık', '42 °C']]))}
  ${st('4', bus + info(X, Y, W, 'Tek format', [['TEMP', '42'], ['STATE', 'RUN'], ['TIME', '14:32:08']]))}
  ${st('5', bus + info(X, Y, W, 'Doğrulama', [['Kaynak eşleşti'], ['Zaman eklendi'], ['Kayıt tamam']], { dots: true }))}
  ${st('6', info(X, Y, W, 'Üretim görünümü', [['Torna-01', 'Çalışıyor'], ['CNC-01', 'Çalışıyor'], ['CNC-02', 'Çalışıyor']]))}
</svg>`
  return stepviz('veri', 'Makineniz aynı. <i>Veriniz görünür.</i>', steps, svg)
}


/* ---------- ERP / SAP: 3 adım ---------- */
const cube = (x, y, w, label, sub, grad) => `<g transform="translate(${x},${y})" filter="url(#soft)"><polygon points="0,40 ${w},40 ${w + 50},0 50,0" fill="${grad === 'blue' ? '#7FA9F5' : '#E4E8EF'}"/><polygon points="${w},40 ${w + 50},0 ${w + 50},${w * 0.95 - 40} ${w},${w * 0.95}" fill="${grad === 'blue' ? '#1C3F9A' : '#8E97A8'}"/><rect x="0" y="40" width="${w}" height="${w * 0.95 - 40}" fill="${grad === 'blue' ? 'url(#blueG)' : 'url(#steel)'}"/>${T(w / 2, w * 0.45 + 20, label, grad === 'blue' ? 'cubeW' : 'cubeD', 'middle')}${T(w / 2, w * 0.45 + 56, sub, grad === 'blue' ? 'cubeWs' : 'cubeDs', 'middle')}<circle cx="${w - 24}" cy="66" r="7" class="dot2"/></g>`
export const erpScene = () => {
  const steps = ['Bağlan', 'Eşleştir', 'Senkronize et']
  const lanes = ['API', 'IDoc', 'BAPI', 'RFC']
  const ys = [170, 270, 370, 470]
  const left = lanes.map((l, i) => `<g transform="translate(430,${ys[i] - 26})" class="lane-chip"><rect width="130" height="52" rx="12"/>${T(65, 34, l, 'cp', 'middle')}</g>`).join('')
  const right = lanes.map((l, i) => `<g transform="translate(1040,${ys[i] - 26})" class="lane-chip lc2"><rect width="130" height="52" rx="12"/>${T(65, 34, l, 'cp', 'middle')}</g>`).join('')
  const paths = lanes.map((l, i) => `<path id="ep${i}" d="M560,${ys[i]} C680,${ys[i]} 700,320 800,320 C900,320 920,${ys[i]} 1040,${ys[i]}" class="epath"/>`).join('')
  const pk = lanes.map((l, i) => [0, 1].map((k) => `<rect class="pkt" x="-9" y="-9" width="18" height="18" rx="4"><animateMotion dur="3.6s" begin="${(i * 0.5 + k * 1.8).toFixed(1)}s" repeatCount="indefinite" keyPoints="${(i + k) % 2 ? '1;0' : '0;1'}" keyTimes="0;1" calcMode="linear"><mpath href="#ep${i}"/></animateMotion></rect>`).join('')).join('')
  const svg = `<svg viewBox="0 0 1600 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${DEFS}
  ${cube(40, 190, 280, 'BARVION', 'Özel yazılımlar', 'blue')}
  ${cube(1240, 190, 280, 'ERP / SAP', 'Kurumsal sistem', 'gray')}
  ${st('1,2,3', left + right)}
  ${st('1,2,3', paths)}
  ${st('2,3', pk)}
  <g transform="translate(800,320)" filter="url(#soft)"><ellipse rx="110" ry="46" cy="26" fill="#1B2438"/><ellipse rx="110" ry="46" fill="url(#steelD)" stroke="#8B96AD" stroke-width="3"/><circle r="30" fill="none" stroke="#8FC0FF" stroke-width="5" class="corering"/><path d="M-12 6l-8 8a9 9 0 0 0 13 0l5-5M12 -6l8 -8a9 9 0 0 0 -13 0l-5 5M-8 8l16 -16" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>
  ${T(800, 252, 'Entegrasyon', 'ct2', 'middle')}
  ${st('1', T(800, 560, 'Sistemler arasında kontrollü bağlantılar kurulur', 'tl', 'middle'))}
  ${st('2', T(800, 560, 'Alanlar ve yetkiler iki sistemde eşleştirilir', 'tl', 'middle'))}
  ${st('3', T(800, 560, 'Veri iki yönde, tanımlı kapsamda akar', 'tl', 'middle'))}
</svg>`
  return stepviz('erp', 'Sistemleriniz <i>aynı dili</i> konuşsun.', steps, svg)
}

function stepviz(id, title, steps, svg) {
  return `<div class="sv sv--${id}" data-step="1" data-n="${steps.length}">
  <h3 class="sv__t">${title}</h3>
  <div class="sv__scene">${svg}</div>
  <div class="sv__bar">${steps.map((s, i) => `<button type="button" class="sv__s${i ? '' : ' on'}" data-i="${i + 1}"><b>${String(i + 1).padStart(2, '0')}</b><span>${s}</span><i></i></button>`).join('')}</div>
</div>`
}

/* ================= Reklam ve Marka: 5 adım ================= */
const swatch = (x, y, c, d) => `<g transform="translate(${x},${y})"><rect width="64" height="64" rx="10" fill="${c}" stroke="rgba(255,255,255,.35)"/></g>`
export const markaScene = () => {
  const steps = ['Keşif', 'Kimlik', 'Mesaj', 'Uygulama', 'Yayın']
  const X = 60, W = 760
  const svg = `<svg viewBox="0 0 1600 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${DEFS}
  ${st('1', info(X, 100, W, 'Marka analizi', [['Sektör', 'Üretim · B2B'], ['Hedef kitle', 'Satın alma ve teknik ekipler'], ['Mevcut durum', 'Dağınık görsel dil', 'hi']]) + `<g transform="translate(980,120)"><circle r="92" cx="120" cy="130" fill="none" stroke="#6BA8FF" stroke-width="5"/><path d="M186 196 L250 262" stroke="#6BA8FF" stroke-width="9" stroke-linecap="round"/><g transform="translate(120,130)"><circle r="14" fill="#57C9E9" class="pulse"/><circle r="44" fill="none" stroke="#57C9E9" stroke-width="2" opacity=".5"/></g></g>`)}
  ${st('2', `<g transform="translate(${X},100)"><rect width="${W}" height="400" rx="6" class="cardr"/><g transform="translate(60,50)"><path d="M0 120 A110 110 0 1 1 220 120 A110 110 0 1 1 0 120z" fill="none" stroke="#fff" stroke-width="6" class="draw"/><path d="M60 150 L110 50 L160 150 M80 112 H140" fill="none" stroke="#57C9E9" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" class="draw d2"/></g><text x="330" y="86" class="ct">MARKANIZ</text><text x="330" y="124" class="tl">Marka işareti ve yazı karakteri</text><g transform="translate(330,170)">${swatch(0, 0, '#0B2347')}${swatch(80, 0, '#2F7FBF')}${swatch(160, 0, '#57C9E9')}${swatch(240, 0, '#EAF3FB')}</g><text x="330" y="318" class="ct" style="font-size:72px;font-weight:600">Aa</text><text x="470" y="318" class="tl" style="font-size:72px;font-weight:300">Aa</text></g>`)}
  ${st('3', info(X, 100, W, 'Marka mesajı', [['Slogan', 'Kısa, akılda kalır'], ['Değer önerisi', 'Neden siz?'], ['Ton', 'Güvenilir, sade, net']]) + `<g transform="translate(900,110)">${[0, 1, 2].map((i) => `<g transform="translate(${i * 60},${i * 96})"><rect width="520" height="76" rx="16" class="notif"/><rect x="26" y="22" width="${300 - i * 40}" height="10" rx="5" fill="#fff"/><rect x="26" y="44" width="${420 - i * 70}" height="8" rx="4" fill="#9FB2D3"/></g>`).join('')}</g>`)}
  ${st('4', `<g transform="translate(${X},120)"><rect width="300" height="180" rx="12" fill="#0B2347" stroke="rgba(255,255,255,.4)"/><text x="26" y="64" class="ct">MARKANIZ</text><text x="26" y="150" class="tl" style="font-size:20px">Ad Soyad · Görev</text><rect x="0" y="0" width="300" height="6" fill="#57C9E9"/></g>
    <g transform="translate(400,120)"><rect width="420" height="270" rx="10" fill="#fff"/><rect width="420" height="28" fill="#E4E9F0"/><rect x="20" y="52" width="230" height="22" rx="4" fill="#0B2347"/><rect x="20" y="92" width="360" height="10" rx="5" fill="#CBD3DF"/><rect x="20" y="114" width="300" height="10" rx="5" fill="#CBD3DF"/><rect x="20" y="150" width="140" height="44" rx="6" fill="#2F7FBF"/><rect x="280" y="140" width="110" height="100" rx="8" fill="#57C9E9" opacity=".7"/></g>
    <g transform="translate(900,120)"><rect width="320" height="320" rx="12" fill="#2F7FBF"/><circle cx="160" cy="150" r="70" fill="none" stroke="#fff" stroke-width="8"/><text x="160" y="276" text-anchor="middle" class="ct">Kısa mesaj</text></g>
    <g transform="translate(1260,120)"><rect width="260" height="470" rx="26" fill="#0B1020" stroke="#4A5470" stroke-width="3"/><rect x="14" y="14" width="232" height="442" rx="18" fill="#17315F"/><rect x="34" y="50" width="192" height="170" rx="10" fill="#57C9E9" opacity=".8"/><rect x="34" y="244" width="150" height="12" rx="6" fill="#fff"/><rect x="34" y="272" width="190" height="9" rx="4" fill="#9FB2D3"/></g>`)}
  ${st('5', info(X, 100, W, 'Yayın ve görünürlük', [['Web sitesi', 'Hazır', 'hi'], ['Sosyal medya', 'Şablonlar hazır'], ['Basılı ve fuar', 'Materyaller hazır']]) + `<g transform="translate(900,120)"><rect width="620" height="400" rx="6" class="cardr"/><g transform="translate(50,330)">${[60, 120, 190, 260, 340, 430].map((h, i) => `<rect x="${i * 88}" y="${-h}" width="56" height="${h}" rx="6" fill="${i % 2 ? '#57C9E9' : '#2F7FBF'}" class="grow" style="animation-delay:${i * .12}s"/>`).join('')}</g><text x="50" y="62" class="ct">Görünürlük</text></g>`)}
</svg>`
  return stepviz('marka', 'Kimlikten yayına, <i>tek çizgi.</i>', steps, svg)
}

/* ================= Web Sitesi Tasarımı: 5 adım ================= */
export const webScene = () => {
  const steps = ['Planlama', 'Tasarım', 'Kodlama', 'Test', 'Yayın']
  const lines = [['<', 'html', '>'], ['  <', 'header', '>'], ['    <', 'nav', ' />'], ['  <', 'main', '>'], ['    <', 'section', ' class="hero">'], ['    <', 'section', ' class="cozumler">'], ['  <', 'footer', ' />']]
  const code = lines.map(([a, b, c], i) => `<text x="40" y="${86 + i * 44}" class="cd" style="--i:${i}"><tspan fill="#57C9E9">${a.replace(/</g, '&lt;')}${b}</tspan><tspan fill="#F5B945">${c.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</tspan></text>`).join('')
  const svg = `<svg viewBox="0 0 1600 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${DEFS}
  ${st('1', `<g transform="translate(560,70)"><g class="nd"><rect x="150" y="0" width="260" height="70" rx="12" class="cardr"/>${T(280, 44, 'Ana sayfa', 'ct2', 'middle')}</g>${['Çözümler', 'Ürünler', 'Hakkımızda', 'İletişim'].map((n, i) => `<path d="M280 70 V120 H${i * 240 - 30 + 130} V170" fill="none" class="lnk"/><g transform="translate(${i * 240 - 30},170)" class="nd" style="animation-delay:${.2 + i * .15}s"><rect width="260" height="70" rx="12" class="cardr"/>${T(130, 44, n, 'tl', 'middle')}</g>`).join('')}<g transform="translate(-30,330)" class="nd"><rect width="260" height="60" rx="10" class="cardr" opacity=".6"/>${T(130, 38, 'Alt sayfalar', 'tg', 'middle')}</g></g>`)}
  ${st('2', `<g transform="translate(200,60)"><rect width="1000" height="470" rx="14" fill="#fff"/><rect width="1000" height="40" rx="14" fill="#E4E9F0"/><circle cx="26" cy="20" r="6" fill="#C7CFDB"/><circle cx="48" cy="20" r="6" fill="#C7CFDB"/><circle cx="70" cy="20" r="6" fill="#C7CFDB"/><rect x="40" y="66" width="220" height="22" rx="4" fill="#0B2347" class="grow"/><rect x="540" y="70" width="420" height="14" rx="7" fill="#CBD3DF"/><rect x="40" y="130" width="600" height="190" rx="12" fill="#17315F" class="grow"/><rect x="70" y="170" width="380" height="26" rx="5" fill="#fff"/><rect x="70" y="214" width="300" height="12" rx="6" fill="#9FB2D3"/><rect x="70" y="262" width="150" height="40" rx="8" fill="#57C9E9"/><rect x="680" y="130" width="280" height="190" rx="12" fill="#2F7FBF" opacity=".8" class="grow"/>${[0, 1, 2].map((i) => `<rect x="${40 + i * 324}" y="350" width="296" height="90" rx="10" fill="#EAF0F8" class="grow" style="animation-delay:${.3 + i * .2}s"/>`).join('')}</g>`)}
  ${st('3', `<g transform="translate(60,70)"><rect width="640" height="430" rx="12" fill="#10182A" stroke="rgba(255,255,255,.2)"/><rect width="640" height="38" rx="12" fill="#18233B"/><circle cx="24" cy="19" r="5.5" fill="#3A4766"/><circle cx="44" cy="19" r="5.5" fill="#3A4766"/><circle cx="64" cy="19" r="5.5" fill="#3A4766"/><g transform="translate(0,34)">${code}</g><rect x="40" y="396" width="14" height="26" fill="#57C9E9" class="blink"/></g>
    <g transform="translate(780,70)"><rect width="760" height="430" rx="12" fill="#fff"/><rect width="760" height="30" rx="12" fill="#E4E9F0"/><rect x="30" y="56" width="180" height="18" rx="4" fill="#0B2347"/><rect x="30" y="100" width="700" height="150" rx="10" fill="#17315F"/><rect x="50" y="130" width="300" height="20" rx="4" fill="#fff"/><rect x="50" y="170" width="220" height="10" rx="5" fill="#9FB2D3"/>${[0, 1, 2].map((i) => `<rect x="${30 + i * 236}" y="278" width="216" height="110" rx="10" fill="#EAF0F8"/>`).join('')}<rect x="0" y="0" width="760" height="430" rx="12" fill="#0A1224" class="wipe"/></g>`)}
  ${st('4', `<g transform="translate(80,100)"><rect width="640" height="400" rx="10" fill="#fff"/><rect width="640" height="26" rx="10" fill="#E4E9F0"/><rect x="24" y="50" width="200" height="16" rx="4" fill="#0B2347"/><rect x="24" y="90" width="592" height="130" rx="8" fill="#17315F"/><rect x="24" y="240" width="184" height="130" rx="8" fill="#EAF0F8"/><rect x="228" y="240" width="184" height="130" rx="8" fill="#EAF0F8"/><rect x="432" y="240" width="184" height="130" rx="8" fill="#EAF0F8"/></g>
    <g transform="translate(790,170)"><rect width="230" height="320" rx="12" fill="#fff" stroke="#4A5470" stroke-width="3"/><rect x="16" y="26" width="150" height="14" rx="4" fill="#0B2347"/><rect x="16" y="56" width="198" height="90" rx="8" fill="#17315F"/><rect x="16" y="164" width="198" height="60" rx="8" fill="#EAF0F8"/><rect x="16" y="236" width="198" height="60" rx="8" fill="#EAF0F8"/></g>
    <g transform="translate(1070,230)"><rect width="130" height="240" rx="18" fill="#0B1020" stroke="#4A5470" stroke-width="3"/><rect x="10" y="26" width="110" height="190" rx="8" fill="#fff"/><rect x="18" y="38" width="70" height="10" rx="3" fill="#0B2347"/><rect x="18" y="58" width="94" height="60" rx="6" fill="#17315F"/><rect x="18" y="128" width="94" height="30" rx="5" fill="#EAF0F8"/><rect x="18" y="166" width="94" height="30" rx="5" fill="#EAF0F8"/></g>
    ${['Hız', 'Erişilebilirlik', 'Arama motoru uyumu', 'Mobil uyum'].map((t, i) => `<g transform="translate(1260,${130 + i * 92})" class="nd" style="animation-delay:${.3 + i * .35}s"><rect width="300" height="64" rx="32" class="okbar"/>${ICON.check(26, 20, .9)}${T(76, 40, t, 'ct2')}</g>`).join('')}`)}
  ${st('5', `<g transform="translate(300,80)"><rect width="1000" height="420" rx="14" fill="#fff"/><rect width="1000" height="48" rx="14" fill="#E4E9F0"/><rect x="100" y="10" width="520" height="28" rx="14" fill="#fff"/><text x="124" y="30" font-size="16" fill="#0B2347" font-weight="500">markaniz.com</text><circle cx="26" cy="24" r="6" fill="#C7CFDB"/><circle cx="48" cy="24" r="6" fill="#C7CFDB"/><circle cx="70" cy="24" r="6" fill="#C7CFDB"/><rect x="40" y="90" width="920" height="200" rx="12" fill="#17315F"/><rect x="80" y="140" width="420" height="26" rx="5" fill="#fff"/><rect x="80" y="190" width="300" height="12" rx="6" fill="#9FB2D3"/><rect x="80" y="236" width="160" height="40" rx="8" fill="#57C9E9"/>${[0, 1, 2].map((i) => `<rect x="${40 + i * 310}" y="316" width="290" height="80" rx="10" fill="#EAF0F8"/>`).join('')}</g>
    <g transform="translate(1000,420)" class="nd"><rect width="320" height="90" rx="45" class="okbar"/>${ICON.check(40, 32, 1.2)}${T(100, 56, 'Yayında', 'ct')}</g>`)}
</svg>`
  return stepviz('web', 'Plandan yayına, <i>tek akış.</i>', steps, svg)
}
