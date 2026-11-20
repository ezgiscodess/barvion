// Reklam ve Marka Danışmanlığı — özel, hareketli sayfa düzeni
const MARQ = ['Logo', 'Kurumsal kimlik', 'Renk sistemi', 'Tipografi', 'Sosyal medya', 'Dijital reklam', 'SEO', 'GEO', 'Katalog', 'Fuar standı', 'Kartvizit', 'Mesaj dili']
const STEPS = [
  ['Logo ve işaret', 'Markanızın ilk bakışta tanınan imzası. Tek renk, ters renk, küçük boyut: her kullanımda okunur olacak varyasyonları çiziyoruz.', 'logo'],
  ['Renk sistemi', 'Ana, destek ve vurgu renkleri, hangisinin nerede kullanılacağıyla birlikte tanımlanır. Ekranda da baskıda da aynı marka görünür.', 'color'],
  ['Tipografi ve dil', 'Başlık ve metin yazı tipleri ile konuşma tonu birlikte belirlenir. Katalog da, reklam da aynı sesle konuşur.', 'type'],
  ['Her yerde uygulama', 'Kartvizit, sosyal medya, reklam ve fuar materyalleri aynı sistemden üretilir; yeni bir iş çıktığında baştan başlanmaz.', 'apply'],
]
const SVC = [
  ['01', 'Logo ve kurumsal kimlik', 'Strateji ve konumlandırmayla başlar; işaret, renk ve yazı kurallarıyla biter.', 'M12 3l8 4.5v9L12 21l-8-4.5v-9z'],
  ['02', 'Sosyal medya', 'Hesaplarınızın görsel dili, içerik takvimi ve paylaşım şablonları.', 'M4 5h16v11H9l-5 4z'],
  ['03', 'Dijital reklam', 'Hedef kitle, kreatif ve ölçümü birlikte kuran küçük bütçeli testler.', 'M4 18V9m5 9V5m5 13v-7m5 7V8'],
  ['04', 'SEO', 'Müşterinizin aradığı kelimelerde, hızlı açılan sayfalarla görünmek.', 'M11 4a7 7 0 100 14 7 7 0 000-14zm9 16l-4-4'],
  ['05', 'GEO: yapay zekâ aramaları', 'Yapay zekâ cevaplarında markanızın doğru bilgiyle yer alması.', 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z'],
  ['06', 'Basılı ve fuar', 'Kartvizit, katalog, sunum ve fuar standı: dijitalle aynı görünüm.', 'M5 4h10l4 4v12H5zM15 4v4h4'],
]
const FLOW = [['Keşif', 'Markanızı, sektörünüzü ve hedef kitlenizi dinleriz.'], ['Kimlik', 'İşaret, renk ve yazı karakterini tasarlarız.'], ['Mesaj', 'Anlatım dilini ve temel mesajları netleştiririz.'], ['Uygulama', 'Materyalleri hazırlar, kılavuzla teslim ederiz.']]
const mark = '<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M100 12 L176 56 L176 144 L100 188 L24 144 L24 56 Z" fill="none" stroke="currentColor" stroke-width="8" stroke-linejoin="round" pathLength="1"/><path d="M70 54H110Q140 54 140 82Q140 100 122 105Q146 110 146 130Q146 150 112 150H70ZM92 72V96H108Q120 96 120 84Q120 72 108 72ZM92 114V134H110Q124 134 124 124Q124 114 110 114Z" fill="currentColor" fill-rule="evenodd"/></svg>'
const stage = `<div class="bp-stage" data-stage="0">
  <div class="bp-pane" data-p="logo"><div class="bp-mark">${mark}</div><div class="bp-wm">BARVION</div></div>
  <div class="bp-pane" data-p="color"><div class="bp-sws">${['#2358D6', '#57C9E9', '#0B2347', '#F2F4F6', '#FF8A3D'].map((c, i) => `<i style="--c:${c};--i:${i}"><b>${c}</b></i>`).join('')}</div></div>
  <div class="bp-pane" data-p="type"><div class="bp-aa">A<i>a</i></div><p class="bp-tl">Başlık · Metin · Vurgu</p></div>
  <div class="bp-pane" data-p="apply"><div class="bp-mock m1"><span class="bp-mk">${mark}</span><b>Ad Soyad</b></div><div class="bp-mock m2"><span class="bp-mk">${mark}</span><b>Yeni sezon</b></div><div class="bp-mock m3"><b>www.firma.com</b></div></div>
</div>`
export const brandPage = ({ ARW, contactHref }) => `
<div class="bp-marq" aria-hidden="true"><div class="bp-marq__t">${[...MARQ, ...MARQ].map((m) => `<span>${m}</span><i></i>`).join('')}</div></div>

<section class="sec bp-sys" data-bp-sys>
  <div class="wrap">
    <p class="label rv">Marka sistemi</p>
    <h2 class="huge rv" style="max-width:900px">Bir logo değil, <i>çalışan bir sistem</i></h2>
    <div class="bp-sys__g">
      <div class="bp-sys__l">${stage}</div>
      <ol class="bp-sys__r">${STEPS.map(([t, d], i) => `<li class="bp-st${i === 0 ? ' on' : ''}" data-s="${i}"><b>${String(i + 1).padStart(2, '0')}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
    </div>
  </div>
</section>

<section class="sec bp-svc">
  <div class="wrap">
    <p class="label rv">Hizmet alanları</p>
    <h2 class="huge rv" style="max-width:900px">Markayla ilgili <i>her şey</i> tek yerde</h2>
    <div class="bp-cards">${SVC.map(([n, t, d, p]) => `<article class="bp-card rv" data-tilt><span class="bp-card__n">${n}</span><svg class="bp-card__i" viewBox="0 0 24 24" aria-hidden="true"><path d="${p}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><h3>${t}</h3><p>${d}</p><i class="bp-card__g"></i></article>`).join('')}</div>
  </div>
</section>

<section class="sec bp-flow">
  <div class="wrap">
    <p class="label light rv">Çalışma biçimi</p>
    <h2 class="huge rv" style="max-width:900px;color:#fff">Dört adımda <i>kimlikten yayına</i></h2>
    <ol class="bp-fl" data-bp-flow><span class="bp-fl__line"><i></i></span>${FLOW.map(([t, d], i) => `<li class="bp-fl__s"><b>${String(i + 1).padStart(2, '0')}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="sec bp-cta">
  <div class="wrap bp-cta__in">
    <div class="bp-cta__orb" aria-hidden="true"></div>
    <h2 class="huge rv">Markanız her yerde <i>aynı güvenle</i> konuşsun</h2>
    <p class="para rv">Sektörünüzü ve hedef kitlenizi dinleyelim, kimlik sistemini birlikte kuralım.</p>
    <p class="rv"><a class="btn btn--white" href="${contactHref}">Reklam ve Marka Danışmanlığı için görüşelim ${ARW}</a></p>
  </div>
</section>`
