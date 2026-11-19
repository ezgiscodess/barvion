const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const P = {
  arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  back: '<path d="M20 12H4M10 6l-6 6 6 6"/>',
  down: '<path d="M12 4v16M6 14l6 6 6-6"/>',
  up: '<path d="M12 20V4M6 10l6-6 6 6"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M20 20a4 4 0 0 1-4 2h-3"/>',
  soundOn: '<path d="M4 10v4h4l5 4V6L8 10H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
  play: '<path d="M8 5l11 7-11 7z"/>',
  web: '<rect x="2.5" y="4" width="19" height="15" rx="2.5"/><path d="M2.5 8.5h19M6 6.3h.01M8.5 6.3h.01"/>',
  cart: '<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  speed: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 18l4-6"/>',
  mobile: '<rect x="6" y="2" width="12" height="20" rx="2.8"/><path d="M10.5 18.5h3"/>',
  erp: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16"/>',
  megaphone: '<path d="M3 10.5v3a1.5 1.5 0 0 0 1.5 1.5H7l6 4.5V4.5L7 9H4.5A1.5 1.5 0 0 0 3 10.5zM17 8.5a5 5 0 0 1 0 7"/>',
  social: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8"/>',
  video: '<rect x="2.5" y="5" width="14" height="14" rx="2.5"/><path d="M16.5 10l5-3v10l-5-3"/>',
  design: '<path d="M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M14 7l3 3"/>',
  ai: '<rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 3v4M9 12h.01M15 12h.01M9.5 16h5M2 12h3M19 12h3"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5a5 5 0 0 1 5.5 5"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M17 20h4M14 20v.01M20 17v3"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4M8 14h3"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2.5"/><path d="M3 10h18M16 15h2"/><path d="M6 6V4.5h11V6"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 0-2-2z"/>',
  factory: '<path d="M3 20V10l5 3V10l5 3V6h4l1 4h3v10z"/><path d="M7 16h2M12 16h2M17 16h1"/>',
  med: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/>',
  trade: '<path d="M4 7h13l-3-3M20 17H7l3 3"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
  whatsapp: '<path d="M12 3a9 9 0 0 0-7.8 13.4L3 21l4.7-1.2A9 9 0 1 0 12 3z"/><path d="M9 8.5c0 3.5 2.5 6.5 6.5 6.5l1-1.5-2-1-1 .8a5 5 0 0 1-2.8-2.8l.8-1-1-2z"/>',
};
const icon = (n, cls = "ico") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${P[n] || ""}</svg>`;
const mark = (size, id, cls) => `<img class="${cls}" src="/img/logo-sm.png" alt="" width="${size}" height="${size}">`;
export function brandBoard({ palette, mono, sign }) {
  // Sabit tohumlu sözde rastgele: her derlemede aynı pencereler yanar, sayfa titremez.
  let seed = 11;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const lights = ["var(--l1)", "var(--l2)", "var(--l3)", "var(--l4)"];
  const TOWERS = [
    { x: 0, w: 13, h: 40 }, { x: 11, w: 12, h: 56, t: "bands" }, { x: 22, w: 16, h: 58, t: "bill" }, { x: 37, w: 11, h: 44 },
    { x: 47, w: 15, h: 86, t: "neon" }, { x: 61, w: 13, h: 62 }, { x: 73, w: 12, h: 76 }, { x: 84, w: 16, h: 46 },
  ];
  const letters = [...String(sign)];
  // Panodaki logo hareketlidir: halkalar döner, marshmallow hafifçe süzülür.
  const ad = mono ? `<span class="bb__ad bb__tile"><b>${esc(mono)}</b></span>` : `<span class="bb__ad">${mark(200, "bbad", "bb__markad")}</span>`;
  const towers = TOWERS.map((b, k) => {
    const nc = Math.max(2, Math.round(b.w / 3.4)), nr = Math.max(3, Math.round(b.h / 6.5));
    let wins = "";
    if (b.t !== "bands") for (let r = 1; r < nr; r++) for (let c = 0; c < nc; c++) {
      if (rnd() > .42) continue;
      wins += `<i class="bb__win" style="--x:${(((c + .5) / nc) * 100).toFixed(1)}%;--y:${((r / nr) * 100).toFixed(1)}%;--c:${lights[Math.floor(rnd() * 4)]};--t:${(4 + rnd() * 6).toFixed(1)}s;--dl:${(-rnd() * 10).toFixed(1)}s"></i>`;
    }
    const extra = {
      bill: `<span class="bb__bill">${ad}<span class="bb__ad bb__ad--pal"></span></span>`,
      neon: `<span class="bb__neon${letters.length > 7 ? " bb__neon--side" : ""}" style="--n:${letters.length}">${letters.map((ch, i) => `<b style="--i:${i}">${esc(ch)}</b>`).join("")}</span>`,
      bands: `<span class="bb__bands">${[0, 1, 2, 3, 4].map((i) => `<i style="--i:${i}"></i>`).join("")}</span>`,
    }[b.t] || "";
    return `<span class="bb__bld${b.t ? ` bb__bld--${b.t}` : ""}" style="--x:${b.x}%;--w:${b.w}%;--h:${b.h}%;--k:${k}">${b.h > 70 ? `<i class="bb__ant"></i>` : ""}${wins}${extra}</span>`;
  }).join("");
  return `<div class="bb${mono ? " bb--kit" : ""}" data-parallax aria-hidden="true" style="--c1:${palette[0][0]};--c2:${palette[1][0]};--c3:${palette[2][0]};--c4:${palette[3][0]}">
    <div class="bb__scene">
      <span class="bb__sky"><i class="bb__shoot"></i></span>
      <span class="bb__beam"></span><span class="bb__beam bb__beam--2"></span>
      <div class="bb__moon" style="--d:4">${mono ? `<span class="bb__mono"><b>${esc(mono)}</b></span>` : mark(240, "bb", "bb__mark")}</div>
      <svg class="bb__far" style="--d:3" viewBox="0 0 600 120" preserveAspectRatio="none"><path d="M0 120V70h30V44h24v30h20V58h34V30h18v40h26V52h40V20h22v50h30V60h28V36h36v34h22V48h30V26h20v44h34V56h28V40h40v80z"/></svg>
      <div class="bb__city" style="--d:8">${towers}</div>
    </div>
  </div>`;
}



// Aynı tasarım sistemi dört ayrı karaktere dönüşür. Bütün panolar tek maskeyle
// açılır; referanstaki kaydırma fikri Mallow'un kendi bileşenleriyle yorumlanır.
export function brandThemes(lang) {
  const tr = lang === "tr";
  const t = (a, b) => tr ? a : b;
  const themes = [
    { key: "mallow", name: "Barvion", tag: t("Canlı · Dijital · Özgün", "Vivid · Digital · Original"), sector: t("Dijital ürün & yaratıcı markalar", "Digital products & creative brands") },
    { key: "night", name: t("Gece", "Night"), tag: t("Keskin · Güçlü · Odaklı", "Sharp · Bold · Focused"), sector: t("Teknoloji & yeni nesil hizmetler", "Technology & next-gen services") },
    { key: "atelier", name: t("Sıcak","Warm"), tag: t("Sıcak · Zarif · Zamansız", "Warm · Refined · Timeless"), sector: t("Yaşam tarzı & konaklama", "Lifestyle & hospitality") },
    { key: "ice", name: t("Buzul", "Glacier"), tag: t("Sade · Ferah · Güvenilir", "Clear · Fresh · Trusted"), sector: t("Sağlık & kurumsal markalar", "Healthcare & corporate brands") },
  ];
  const label = (text) => `<span class="tl-label">${text}</span>`;
  const palette = `<span class="tl-palette">${Array.from({ length: 5 }, (_, i) => `<i class="tl-color tl-color--${i + 1}"></i>`).join("")}</span>`;
  const tile = (cls, height, html) => `<div class="tl-tile ${cls}" style="--tile-h:${height}">${html}</div>`;
  const mosaic = (theme, i) => `<div class="tl-layer tl-theme--${theme.key}" data-theme-layer="${i}"${i ? " hidden" : ""}>
    <div class="tl-col tl-col--edge tl-col--one">
      ${tile("tl-levels", 17, `${label(t("Bir fikrin yolculuğu", "The path of an idea"))}<div class="tl-levels__rows">${[t("Keşif", "Discover"), t("Strateji", "Strategy"), t("Tasarım", "Design"), t("Deneyim", "Experience")].map((s, k) => `<span><small>${s}</small><i style="--level:${100 - k * 18}%"></i></span>`).join("")}</div>`)}
      ${tile("tl-balance", 14, `${label(t("Görsel denge", "Visual balance"))}<svg viewBox="0 0 150 120" class="tl-donut"><g transform="rotate(-90 75 60)" fill="none" stroke-width="13"><circle class="tl-stroke-soft" cx="75" cy="60" r="42"/><circle class="tl-stroke-a" cx="75" cy="60" r="42" stroke-dasharray="126 264" stroke-linecap="round"/><circle class="tl-stroke-b" cx="75" cy="60" r="42" stroke-dasharray="66 264" stroke-dashoffset="-138" stroke-linecap="round"/></g><text x="75" y="66" text-anchor="middle">Aa</text></svg>`)}
    </div>
    <div class="tl-col tl-col--two">
      ${tile("tl-mascot", 17, `${label(t("Biraz Barvion ruhu.", "A little Barvion spirit."))}<svg class="tl-shape" viewBox="0 0 120 80" aria-hidden="true"><circle cx="46" cy="40" r="28"/><circle cx="76" cy="40" r="28"/></svg><span class="tl-mascot__caption">${t("Fikirler hayat bulur.", "Ideas come to life.")}</span>`)}
      ${tile("tl-system", 23, `${label(t("Her temas noktasında", "At every touchpoint"))}<div class="tl-system__items">${[["layers", t("Kimlik", "Identity")], ["web", "Web"], ["mobile", t("Mobil", "Mobile")], ["play", t("Hareket", "Motion")], ["pen", t("Baskı", "Print")]].map(([ico, text], k) => `<span${k === 0 ? ' class="is-selected"' : ""}>${icon(ico)}${text}</span>`).join("")}</div><span class="tl-system__foot">${t("Tek bir görsel dil.", "One visual language.")}</span>`)}
    </div>
    <div class="tl-col tl-col--center">
      ${tile("tl-chart", 16, `<div class="tl-chart__head">${label(t("Markanın ritmi", "The brand's rhythm"))}${icon("chart")}</div><svg viewBox="0 0 240 118" preserveAspectRatio="none"><path class="tl-gridline" d="M0 25H240M0 60H240M0 95H240"/><path class="tl-stroke-soft" d="M4 101L40 71L78 86L117 43L156 62L194 28L236 44"/><path class="tl-stroke-a" d="M4 108L40 87L78 93L117 57L156 71L194 42L236 8"/><circle cx="236" cy="8" r="4" class="tl-dot"/></svg><div class="tl-chart__axis"><span>${t("Fikir", "Idea")}</span><span>${t("Etki", "Impact")}</span></div>`)}
      ${tile("tl-identity", 22, `<span class="tl-identity__eyebrow">BARVION / ${t("GÖRSEL DÜNYALAR", "VISUAL WORLDS")}</span><strong>${esc(theme.name)}</strong><span class="tl-identity__tag">${esc(theme.tag)}</span>${palette}<small>${esc(theme.sector)}</small>`)}
      ${tile("tl-signature", 6, `${icon("check")}<span>${t("Aynı fikir. Bambaşka bir his.", "One idea. A whole new feeling.")}</span>`)}
    </div>
    <div class="tl-col tl-col--four">
      ${tile("tl-colors", 15, `${label(t("Rengin karakteri", "Colour with character"))}<div class="tl-colors__grid">${[t("Ana renk", "Primary"), t("Vurgu", "Accent"), t("Yüzey", "Surface"), t("Mürekkep", "Ink")].map((s, k) => `<span class="tl-color--${k + 1}">${s}</span>`).join("")}</div>`)}
      ${tile("tl-tone", 9, `${label(t("Karakter ayarı", "Character dial"))}<span class="tl-range"><i></i><b></b></span><span class="tl-tone__ends"><small>${t("Sade", "Quiet")}</small><small>${t("Cesur", "Bold")}</small></span>`)}
      ${tile("tl-type", 15, `${label(t("Kelimelerin de bir sesi var.", "Words have a voice, too."))}<b>Aa<span>Bb</span></b><small>Poppins · 0123456789</small>`)}
    </div>
    <div class="tl-col tl-col--edge tl-col--five">
      ${tile("tl-bars", 19, `${label(t("Hareketin dili", "The language of motion"))}<div>${[28, 47, 38, 65, 53, 87, 66, 45, 73, 100, 76, 58, 84, 63, 94, 71, 52, 78].map((h) => `<i style="--bar:${h}%"></i>`).join("")}</div>`)}
      ${tile("tl-note", 17, `<span class="tl-note__badge">${t("Yeni bir başlangıç", "A new beginning")}</span><strong>${t("Fikriniz,<br>kendi renginde.", "Your idea,<br>in its own colour.")}</strong><span class="tl-note__cta">${t("Birlikte tasarlayalım", "Let's design together")}${icon("arrow")}</span>`)}
    </div>
  </div>`;
  return `<section class="brand-themes" id="tema-laboratuvari" data-brand-themes aria-labelledby="theme-lab-title">
    <div class="tl-pin"><div class="container">
      <div class="brand-themes__head"><span class="kicker">${t("TEMA LABORATUVARI", "THEME LAB")}</span><h2 id="theme-lab-title">${t("Her fikre kendi görsel evreni.", "Every idea, its own visual world.")}</h2><p>${t("Her sektöre, her fikre özgü bir karakter. Renkten tipografiye, arayüzden harekete kadar birlikte tasarlıyoruz.", "A distinct character for every sector and every idea. From colour and type to interfaces and motion, we design it all together.")}</p></div>
      <div class="tl-stage" aria-hidden="true">${themes.map(mosaic).join("").replace(/>([^<>]+)</g, "><")}</div>
      <div class="tl-controls" hidden><span class="tl-hint"><span class="tl-hint__scroll">${t("Kaydır, karakter değişsin", "Scroll to change the character")}${icon("down")}</span><span class="tl-dots" aria-hidden="true">${themes.map((theme, i) => `<i class="tl-theme--${theme.key}" data-theme-dot="${i}" data-theme-name="${esc(theme.name + ": " + theme.sector)}"></i>`).join("")}</span></span></div>
      <p class="sr-only" data-theme-status aria-live="polite" aria-atomic="true">${themes[0].name}: ${themes[0].sector}</p>
    </div></div>
  </section>`;
}
