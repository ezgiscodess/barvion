// Barvion Group — çok sayfalı site üreticisi.  Çalıştır:  node build.mjs
// Kaynak: src/home.html (bölümler yorum işaretleriyle ayrılmıştır). Çıktı: klasör başına bir sayfa.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { areaScene } from './areas.mjs'
import { stepIcon } from './icons.mjs'
import { brandBoard, brandThemes } from './mport.mjs'
import { bakimScene, veriScene, erpScene, markaScene, webScene } from './scenes.mjs'
const BUILD = Date.now().toString(36)
const ROOT = path.dirname(fileURLToPath(import.meta.url))
const src = fs.readFileSync(path.join(ROOT, 'src/home.html'), 'utf8')

const mainHtml = src.slice(src.indexOf('<main'), src.indexOf('</main>'))
const part = (name) => {
  const a = mainHtml.indexOf(`<!-- ${name}`)
  if (a < 0) throw new Error('bölüm yok: ' + name)
  const b = mainHtml.indexOf('<!-- ', a + 5)
  return mainHtml.slice(mainHtml.indexOf('-->', a) + 3, b < 0 ? undefined : b).trim()
}
const S = {
  hero: part('AÇILIŞ'), problem: part('01 GÖRÜNMEYEN'), approach: part('02 YAKLAŞIM'), solutions: part('03 ÇÖZÜMLER'),
  folgan: part('04 FOLGAN'), why: part('05 NEDEN'), model: part('ÇALIŞMA MODELİ'), areas: part('06 UYGULAMA'),
  tech: part('TEKNOLOJİ'), about: part('07 HAKKIMIZDA'),
}
const intro = src.slice(src.indexOf('<!-- GİRİŞ'), src.indexOf('<a class="skip"'))
const sprite = src.slice(src.indexOf('<svg width="0"'), src.indexOf('</svg>') + 6)
const footer = src.slice(src.indexOf('<!-- 08 İLETİŞİM'), src.indexOf('<script src'))
const ARW = '<svg class="arrow"><use href="#ar"/></svg>'

/* ---------- Çözümler: metinler orijinal siteden; açıklama paragrafları orijinal ifadelerden türetilmiştir ---------- */
const SOL = [
  { slug: 'bakim-yonetimi', n: '01', tag: 'BKM', title: 'Bakım Yönetimi', form: 'FOLGAN Bakım Yönetimi', img: 'bakim', color: '#1E4FD0',
    lede: 'Arıza bildiriminden iş emrine, teknisyen atamasından makine geçmişine kadar bakım süreçlerini merkezi olarak yönetin.',
    list: ['QR kodla arıza bildirimi', 'İş emri oluşturma ve atama', 'Makine bakım geçmişi', 'Tekrarlayan arıza analizi', 'MTTR ve duruş süresi takibi', 'Bakım ekibi iş yükü', 'Risk skorlama ve önleyici bakım'],
    product: true, viz: 'ticket',
    head: 'Arızadan kayda, kayıttan <i>karara.</i>',
    text: ['Sahadan gelen her arıza talebi QR kodla başlar; kaybolmaz, iş emrine dönüşür ve sorumlu teknisyene atanır.', 'Her müdahale makinenin geçmişine eklenir. Tekrarlayan arızalar, MTTR ve duruş süreleri bu kayıtlardan okunur; risk skorlama önleyici bakımın temelini oluşturur.'],
    steps: ['Bildirim', 'Atama', 'Müdahale', 'Doğrulama'] },
  { slug: 'uretim-takip-sistemleri', n: '02', tag: 'ÜRT', title: 'Üretim Takip Sistemleri', form: 'Üretim Takip Sistemi', img: 'uretim', color: '#3E7BC4',
    lede: 'Makine, hat, vardiya ve operatör bazında üretimi anlık olarak izleyin.',
    list: ['Anlık üretim miktarı', 'Hedef ve gerçekleşen karşılaştırması', 'Makine çalışma ve duruş durumu', 'Operatör performansı', 'Hat ve vardiya analizleri', 'Verimlilik ve randıman', 'Günlük, haftalık ve aylık raporlar'],
    viz: 'bars',
    head: 'Hat başındaki gerçeği <i>anlık</i> görün.',
    text: ['Üretim miktarı, hedef ile gerçekleşen arasındaki fark, makinenin çalışma ya da duruş durumu ve operatör performansı hat ve vardiya bazında izlenir.', 'Günlük, haftalık ve aylık raporlar aynı verilerden hazırlanır; verimlilik ve randıman tek bakışta görünür.'] },
  { slug: 'endustriyel-veri-toplama', n: '03', tag: 'VERİ', title: 'Endüstriyel Veri Toplama', form: 'Makine Verisi Toplama', img: 'veri', color: '#1B3F8F',
    lede: 'Mevcut makinelerinizi tamamen değiştirmeden, farklı haberleşme ve veri kaynaklarından bilgi toplayın.',
    note: 'Uygulanabilir protokol ve veri kapsamı, makine altyapısı ile saha koşulları incelendikten sonra netleştirilir.',
    list: ['Seri port', 'RS-485', 'Modbus', 'API', 'SQL veri tabanları', 'LoRa', 'Sayaç ve sensör entegrasyonu', 'Eski sistemlerden veri aktarımı'],
    viz: 'hub', hubNodes: ['Seri port', 'RS-485', 'Modbus', 'API', 'SQL', 'LoRa'],
    head: 'Makineyi değiştirmeden veriyi <i>alın.</i>',
    text: ['Seri port, RS-485, Modbus, API, SQL veri tabanları ve LoRa gibi farklı yollardan; sayaç ve sensörlerden, hatta eski sistemlerden veri toplanır.', 'Hangi protokolün ve verinin kapsama gireceği, makine altyapısı ile saha koşulları incelendikten sonra netleşir.'] },
  { slug: 'dashboard-ve-veri-analizi', n: '04', tag: 'KPI', title: 'Dashboard ve Veri Analizi', form: 'Dashboard ve Veri Analizi', img: 'dashboard', color: '#3E7BC4',
    lede: 'Dağınık verileri yönetici ve operasyon ekipleri için anlaşılır ekranlara dönüştürün.',
    list: ['Canlı KPI ekranları', 'Trend ve karşılaştırma grafikleri', 'Pareto analizleri', 'Fire ve yeniden işleme analizi', 'Enerji ve üretim ilişkisi', 'Makine ve vardiya karşılaştırması', 'Yönetici raporları'],
    viz: 'chart',
    head: 'Dağınık veri, tek ekranda <i>anlam.</i>',
    text: ['Canlı KPI ekranları, trend ve karşılaştırma grafikleri, Pareto, fire ve yeniden işleme analizi; yöneticilerin ve operasyon ekiplerinin anlayacağı biçimde sunulur.', 'Enerji ile üretim arasındaki ilişki, makine ve vardiya karşılaştırmaları yönetici raporlarına dönüşür.'] },
  { slug: 'ozel-yazilim-gelistirme', n: '05', tag: 'ÖZEL', title: 'Özel Yazılım Geliştirme', form: 'Özel Yazılım Projesi', img: 'ozel', color: '#26354F',
    lede: 'Hazır paketlerin işletmenize uymadığı durumlarda, süreçlerinize göre özel yazılım geliştiriyoruz.',
    list: ['İhtiyaç analizi', 'Kullanıcı ve süreç tasarımı', 'Modüler geliştirme', 'Devreye alma ve iyileştirme'],
    viz: 'blocks', steps: ['İhtiyaç analizi', 'Kullanıcı ve süreç tasarımı', 'Modüler geliştirme', 'Devreye alma'],
    head: 'Süreciniz neyse, yazılım <i>da o.</i>',
    text: ['Hazır paketlerin işletmeye uymadığı yerde önce ihtiyaç analizi yapılır, kullanıcı ve süreç tasarlanır.', 'Sistem modüller halinde geliştirilir; devreye alma sonrasında da kullanımdan gelen verilerle iyileştirilir.'] },
  { slug: 'erp-ve-sap-entegrasyonu', n: '06', tag: 'ERP', title: 'ERP ve SAP Entegrasyonu', form: 'ERP / SAP Entegrasyonu', img: 'erp', color: '#4F6A8F',
    lede: 'Barvion sistemleri, kullanılan ERP veya SAP altyapısının sunduğu API, servis, IDoc, BAPI, RFC veya veri aktarım imkânlarına bağlı olarak mevcut kurumsal sistemlerle entegre edilebilir.',
    note: 'Entegrasyon kapsamı; müşteri sistemindeki yetkiler, kullanılan modüller ve teknik erişim olanakları incelendikten sonra netleştirilir.',
    list: ['API ve servisler', 'IDoc', 'BAPI', 'RFC', 'Kontrollü veri aktarımı'],
    viz: 'link',
    head: 'Mevcut kurumsal sistemlerle <i>konuşan</i> çözümler.',
    text: ['ERP veya SAP altyapısının sunduğu API, servis, IDoc, BAPI, RFC ya da veri aktarım imkânları kullanılarak veri iki yönde kontrollü biçimde aktarılır.', 'Kapsam; müşteri sistemindeki yetkiler, kullanılan modüller ve teknik erişim olanakları incelendikten sonra netleşir.'] },
]

/* Madde açıklamaları (orijinal madde başlıkları; alt satırlar kısa açıklayıcı ifadelerdir) */
const DESC = {
  'QR kodla arıza bildirimi': 'Makinenin üzerindeki QR kodu okutan herkes arızayı saniyeler içinde, fotoğrafıyla birlikte bildirir.',
  'İş emri oluşturma ve atama': 'Bildirim iş emrine dönüşür ve sorumlu teknisyene atanır; kimin neyle ilgilendiği görünür.',
  'Makine bakım geçmişi': 'Her arıza ve müdahale, makinenin kalıcı geçmişine işlenir.',
  'Tekrarlayan arıza analizi': 'Aynı makinede yinelenen arızalar öne çıkar; kök neden konuşulabilir hale gelir.',
  'MTTR ve duruş süresi takibi': 'Ortalama onarım süresi ve duruş süreleri kayıtlardan hesaplanır.',
  'Bakım ekibi iş yükü': 'Ekibin üzerindeki iş dağılımı görünür; planlama gerçek yüke göre yapılır.',
  'Risk skorlama ve önleyici bakım': 'Kritik makineler risk skoruyla sıralanır; müdahale arıza olmadan önce planlanır.',
  'Anlık üretim miktarı': 'Hat ve makine bazında üretilen miktar anlık olarak izlenir.',
  'Hedef ve gerçekleşen karşılaştırması': 'Hedefle gerçekleşen arasındaki fark vardiya içinde fark edilir.',
  'Makine çalışma ve duruş durumu': 'Hangi makinenin çalıştığı, beklediği ya da durduğu tek ekranda görünür.',
  'Operatör performansı': 'Operatör bazında üretim ve performans karşılaştırılabilir.',
  'Hat ve vardiya analizleri': 'Hatlar ve vardiyalar yan yana kıyaslanır; darboğazlar belirginleşir.',
  'Verimlilik ve randıman': 'Verimlilik ve randıman göstergeleri kayıttan otomatik hesaplanır.',
  'Günlük, haftalık ve aylık raporlar': 'Raporlar elle hazırlanmaz; üretim verisinden kendiliğinden oluşur.',
  'Seri port': 'Seri haberleşmeyle konuşan makine ve cihazlardan doğrudan veri alınır.',
  'RS-485': 'Sahada yaygın RS-485 hatları üzerindeki cihazlar sisteme bağlanır.',
  'Modbus': 'Modbus destekli PLC, sayaç ve sürücülerin verisi okunur.',
  'API': 'API sunan sistemlerden veri çekilir ya da onlara veri gönderilir.',
  'SQL veri tabanları': 'Mevcut SQL veri tabanlarındaki kayıtlar yeni yapıya dahil edilir.',
  'LoRa': 'Kablolamanın zor olduğu noktalardaki sensörler LoRa ile bağlanır.',
  'Sayaç ve sensör entegrasyonu': 'Enerji, su, basınç, sıcaklık gibi ölçümler tek yapıda toplanır.',
  'Eski sistemlerden veri aktarımı': 'Yıllardır tutulan eski kayıtlar kaybolmadan yeni sisteme taşınır.',
  'Canlı KPI ekranları': 'Önemli göstergeler sahadan geldiği anda ekrana yansır.',
  'Trend ve karşılaştırma grafikleri': 'Dünle, geçen haftayla ve geçen ayla kıyaslama tek bakışta yapılır.',
  'Pareto analizleri': 'Kayıpların büyük kısmına yol açan birkaç neden öne çıkarılır.',
  'Fire ve yeniden işleme analizi': 'Fire ve yeniden işleme nedenleri hat ve ürün bazında izlenir.',
  'Enerji ve üretim ilişkisi': 'Üretilen miktar ile harcanan enerji birlikte okunur.',
  'Makine ve vardiya karşılaştırması': 'Makineler ve vardiyalar aynı ölçüyle yan yana değerlendirilir.',
  'Yönetici raporları': 'Yönetim için özet raporlar düzenli olarak hazırlanır.',
  'İhtiyaç analizi': 'Süreç, kullanıcı ve veri kaynakları dinlenerek gerçek ihtiyaç netleştirilir.',
  'Kullanıcı ve süreç tasarımı': 'Ekranlar ve iş akışları sahada çalışanların kullanımına göre tasarlanır.',
  'Modüler geliştirme': 'Önce çekirdek ihtiyaç çözülür; yeni modüller zamanla eklenir.',
  'Devreye alma ve iyileştirme': 'Sistem kontrollü biçimde devreye alınır, kullanım verisiyle iyileştirilir.',
  'API ve servisler': 'Sistemlerin sunduğu API ve servisler üzerinden veri akışı kurulur.',
  'IDoc': 'SAP tarafında IDoc ile belge bazlı veri aktarımı yapılabilir.',
  'BAPI': 'BAPI çağrılarıyla SAP iş mantığı üzerinden kontrollü işlem yapılır.',
  'RFC': 'RFC bağlantısıyla SAP fonksiyonları çağrılır.',
  'Kontrollü veri aktarımı': 'Aktarımın kapsamı, yetkileri ve zamanlaması önceden tanımlanır.',
}
const FEAT = [
  ['QR kodla makineye erişim', 'Makinenin QR kodu okutulur; geçmişi ve açık işleri ekrana gelir.'],
  ['Arıza kaydı', 'Sahadan gelen her talep kayıt altına alınır, kaybolmaz.'],
  ['İş emri havuzu', 'Tüm açık işler tek havuzda toplanır ve öncelik sırasına göre görünür.'],
  ['Teknisyen atama', 'İşler sorumlu teknisyenlere atanır; kim neyi yapıyor bellidir.'],
  ['Durum ve süre takibi', 'İşin hangi aşamada olduğu ve ne kadar sürdüğü izlenir.'],
  ['Fotoğraf ve açıklama', 'Arıza, fotoğraf ve notlarla belgelenir.'],
  ['Makine geçmişi', 'Makinenin tüm arıza ve bakım kayıtları kalıcı geçmişte durur.'],
  ['MTTR analizi', 'Ortalama onarım süresi makine ve ekip bazında ölçülür.'],
  ['Tekrarlayan arızalar', 'Yinelenen arızalar kendiliğinden öne çıkarılır.'],
  ['Bakım ekip performansı', 'Ekibin iş yükü ve müdahale performansı görünür olur.'],
  ['Kritik makine analizi', 'En çok duran ve en kritik makineler belirlenir.'],
  ['Risk skorlama', 'Makineler risk skoruyla sıralanır, önleyici bakım planlanır.'],
  ['Dashboard ve raporlama', 'Yöneticiler için özet ekranlar ve raporlar hazırdır.'],
]
const FGROUPS = [
  ['Kaydeder', 'Sahadan gelen her bilgi kayıt altına alınır.', [0, 1, 5, 6]],
  ['Yönetir', 'İşler atanır, izlenir ve raporlanır.', [2, 3, 4, 12]],
  ['Ölçer', 'Bakım performansı kayıtlardan ölçülür.', [7, 8, 9, 10, 11]],
]
const BEN = [
  ['Daha hızlı müdahale', 'Bildirimden atamaya geçen süre kısalır; arıza sahada beklemez.'],
  ['Daha güçlü kayıt disiplini', 'Her iş kayda geçtiği için bilgi kişilerde değil, sistemde durur.'],
  ['Daha düşük plansız duruş', 'Tekrarlayan arızalar ve riskler önceden görülür.'],
  ['Daha görünür bakım performansı', 'Bakım ekibinin yaptığı iş rakamlarla ortaya çıkar.'],
]
const AREAS = [
  ['Tekstil üretimi', 'Dokuma, örme ve konfeksiyon hatlarında makine ve vardiya takibi.'],
  ['Gıda üretimi', 'Hat duruşları, partiler ve bakım kayıtlarının izlenebilir hale gelmesi.'],
  ['Makine ve ekipman üretimi', 'Üretim istasyonları, iş emirleri ve kalite verisinin tek yapıda toplanması.'],
  ['Otomotiv yan sanayi', 'Yüksek tempolu hatlarda verimlilik, fire ve duruş analizi.'],
  ['Soğutma ve dayanıklı tüketim', 'Montaj hatlarında üretim takibi ve bakım yönetimi.'],
  ['Enerji yoğun üretim tesisleri', 'Enerji tüketimi ile üretimin birlikte izlenmesi.'],
]

const CHG = {
  'bakim-yonetimi': [['Arıza artık kaybolmaz', 'WhatsApp mesajında ya da kâğıt notta kalan talepler, takip edilen bir iş emrine dönüşür.'], ['Makinenin bir hafızası olur', 'Geçmiş arızalar ve müdahaleler kalıcıdır; sahaya yeni gelen teknisyen de aynı bilgiye ulaşır.'], ['Bakım öngörülebilir hale gelir', 'Tekrarlayan arıza ve risk skoru, plansız duruşu azaltan kararların zeminini oluşturur.']],
  'uretim-takip-sistemleri': [['Gerçek an ekranda', 'Vardiya sonunu beklemeden hedefin neresinde olduğunuzu görürsünüz.'], ['Duruş sebepsiz kalmaz', 'Makinenin neden durduğu kayda geçer; aynı sebep tekrar ettiğinde fark edilir.'], ['Raporlar kendiliğinden gelir', 'Günlük, haftalık ve aylık raporlar elle hazırlanmaz, üretim verisinden oluşur.']],
  'endustriyel-veri-toplama': [['Eski makineler de konuşur', 'Yeni yatırım yapmadan, mevcut makinelerin verisi sisteme akar.'], ['Tek veri yapısı', 'Farklı protokollerden gelen veriler aynı biçimde, aynı yerde toplanır.'], ['Kesintisiz kayıt', 'Elle girişe bağlı kalan boşluklar kapanır; veri sahadan geldiği gibi saklanır.']],
  'dashboard-ve-veri-analizi': [['Yönetici gerçeği görür', 'Toplantıdan önce rakamları toplamaya gerek kalmaz; ekran zaten günceldir.'], ['Kayıp nerede, bellidir', 'Pareto ve fire analizleri, kayıpların en büyük kaynağını açıkça gösterir.'], ['Karar hızlanır', 'Karşılaştırmalı ekranlar tartışmayı görüşten veriye taşır.']],
  'ozel-yazilim-gelistirme': [['Yazılım sürece uyar', 'Süreç yazılıma değil, yazılım sürece göre şekillenir.'], ['Küçük başlar, büyür', 'Önce en çok zorlayan sorun çözülür; sistem yeni modüllerle genişler.'], ['Kullanıcıyla birlikte tasarlanır', 'Ekranlar, onları her gün kullanacak insanların diliyle ortaya çıkar.']],
  'erp-ve-sap-entegrasyonu': [['Çift giriş biter', 'Aynı bilgi iki ayrı sisteme elle girilmez.'], ['Yetkiler korunur', 'Entegrasyon, müşteri sistemindeki yetki ve erişim sınırları içinde çalışır.'], ['Kapsam netleşmeden başlanmaz', 'Hangi modül, hangi veri, hangi yön: saha ve sistem incelendikten sonra belirlenir.']],
}
const WHO = `
<section class="sec who">
  <div class="wrap">
    <p class="label rv">Biz Kimiz</p>
    <div class="two"><h2 class="huge rv">Sahayı bilen, yazılımı seven bir <i>ekibiz.</i></h2>
      <p class="para rv">Barvion'da çalışan herkes bir fabrikanın nasıl nefes aldığını bilir: vardiya değişimini, makine başındaki sessiz sabırsızlığı, bir arızanın zincirleme etkisini. Bu bilgiyi, her gün daha iyi yazdığımız yazılımla birleştiriyoruz.</p></div>
    <div class="who3">
      <div class="rv"><b>01</b><h3>Saha deneyimi</h3><p>Çözümü masa başında değil, hattın yanında düşünürüz. Operatörün ve bakımcının günlük dilini biliriz.</p></div>
      <div class="rv"><b>02</b><h3>Yazılım disiplini</h3><p>Temiz kod, modüler mimari ve ölçülebilir hedefler. Hızlı çalışan, sade görünen, uzun yaşayan sistemler kurarız.</p></div>
      <div class="rv"><b>03</b><h3>Birlikte kurmak</h3><p>Müşteri bizim için hazır kalıpla gelen biri değil, birlikte yol aldığımız ortaktır. Sistem sizin ölçünüzde şekillenir.</p></div>
    </div>
  </div>
</section>`
const AFTER = `
<section class="sec after">
  <div class="wrap">
    <p class="label rv">Sonrasında ne olur</p>
    <h2 class="huge rv" style="max-width:900px">Bir mesaj, üç adım, net bir <i>yol haritası.</i></h2>
    <ol class="steps3 tl3"><i class="tl3__bar"></i>
      <li class="rv"><b>01</b><h3>Görüşme</h3><p>İhtiyacınızı ve mevcut yapınızı dinleriz; sorulacak soruları birlikte netleştiririz.</p></li>
      <li class="rv"><b>02</b><h3>Keşif</h3><p>Süreçleri, kullanıcıları, veri kaynaklarını ve teknik kısıtları yerinde veya uzaktan inceleriz.</p></li>
      <li class="rv"><b>03</b><h3>Yol haritası</h3><p>Kapsamı, adımları ve başarı ölçütlerini birlikte belirler, uygulanabilir bir plan sunarız.</p></li>
    </ol>
  </div>
</section>`
const SOLSTATE = `
<section class="sec sol-state">
  <div class="wrap two">
    <h2 class="huge rv">Her çözüm tek başına çalışır, birlikte <i>güçlenir.</i></h2>
    <p class="para rv">Bakımdan üretime, veri toplamadan analize kadar her çözüm tek başına devreye alınabilir. Aynı veri yapısını paylaştıkları için birlikte kullanıldığında birbirini besler: bakımın kaydı üretimin verisini, üretimin verisi yöneticinin ekranını tamamlar.</p>
  </div>
</section>`
const URL = { home: '/', sol: '/cozumler/', prod: '/urunler/', app: '/yaklasimimiz/', about: '/hakkimizda/', contact: '/iletisim/' }
const solUrl = (s) => `${URL.sol}${s.slug}/`

/* ---------- Ortak parçalar ---------- */
const fixLinks = (h) => h
  .replaceAll('href="#cozumler"', `href="${URL.sol}"`).replaceAll('href="#urunler"', `href="${URL.prod}"`)
  .replaceAll('href="#yaklasim"', `href="${URL.app}"`).replaceAll('href="#hakkimizda"', `href="${URL.about}"`)
  .replaceAll('href="#iletisim"', `href="${URL.contact}"`).replaceAll('href="#ana-sayfa"', 'href="/"')

const nav = (active) => {
  const a = (k, label) => `<a href="${URL[k]}" class="${active === k ? 'is-active' : ''}">${label}</a>`
  return `
    <nav class="nav" id="nav">
      ${a('home', 'Ana Sayfa')}
      <div class="dd"><a href="${URL.sol}" class="${active === 'sol' ? 'is-active' : ''}">Çözümler <i></i></a>
        <div class="dd__panel"><div class="dd__in">
          ${SOL.map((s) => `<a href="${solUrl(s)}"><b>${s.n}</b><span>${s.title}</span></a>`).join('')}${EXTRA.map((s) => `<a href="${solUrl(s)}"><b>${s.n}</b><span>${s.title}</span></a>`).join('')}
          <a href="${URL.sol}" class="dd__all">Tüm çözümler →</a>
        </div></div></div>
      ${a('prod', 'Ürünler')}${a('app', 'Yaklaşımımız')}${a('about', 'Hakkımızda')}${a('contact', 'İletişim')}
      <a href="${URL.contact}" class="nav__cta">Projenizi Anlatın ${ARW}</a>
    </nav>`
}
const header = (active, solid) => `
<header class="header${solid ? ' solid' : ''}" id="header">
  <div class="bar">
    <a href="/" class="logo"><b>BARVION</b><i>GROUP</i></a>${nav(active)}
    <a href="${URL.contact}" class="cta-link">Projenizi Anlatın ${ARW}</a>
    <button class="burger" id="burger" aria-label="Menüyü aç" aria-expanded="false" aria-controls="nav"><span></span><span></span></button>
  </div>
</header>`

const head = (title, desc, home) => `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">

<script>document.documentElement.className+=" js"</script>${home ? `
<style>html.bi-pre body>*:not(.bi){visibility:hidden}.bi{position:fixed;inset:0;z-index:9999;background:#000}</style>
<script>try{var _t=+localStorage.getItem('bv-bi-t')||0;if(!(sessionStorage.getItem('bv-bi')||Date.now()-_t<432e5)&&!matchMedia('(prefers-reduced-motion:reduce)').matches)document.documentElement.classList.add('bi-pre')}catch(e){}</script>` : ''}
<link rel="stylesheet" href="/fonts/poppins-3016686f.css">
<link rel="stylesheet" href="/fonts/lora-a4db5c61.css">
<link rel="stylesheet" href="/style.css?v=${BUILD}">
<link rel="stylesheet" href="/mallow-port.css">
</head>
<body class="${home ? '' : 'inner'}">
${sprite}
`
const tail = `\n<script src="/script.js?v=${BUILD}"></script>\n</body>\n</html>\n`

const crumbs = (items) => `<nav class="crumbs" aria-label="Sayfa yolu"><a href="/">Ana Sayfa</a>${items.map(([l, h]) => ` <span>/</span> ${h ? `<a href="${h}">${l}</a>` : `<b>${l}</b>`}`).join('')}</nav>`
const phero = ({ crumb, label, title, lede, actions = '', media, color, short, sol, flip, uni }) => `
<section class="phero${short ? ' phero--short' : ''}${media ? '' : ' phero--plain'}${sol ? ' phero--sol' : ''}${uni ? ' phero--uni' : ''}${flip ? ' phero--flip' : ''}"${color ? ` style="--pc:${color}"` : ''}>
  ${media ? `<video class="phero__video" data-auto muted loop playsinline preload="metadata" poster="/img/pages/${media}.jpg"><source src="/video/pages/${media}.mp4" type="video/mp4"></video>` : ''}
  <div class="phero__bg"></div>
  <div class="wrap phero__in">
    ${crumbs(crumb)}
    ${label ? `<p class="label light">${label}</p>` : ''}
    <h1 class="phero__title">${title}</h1>
    ${lede ? `<p class="phero__lede">${lede}</p>` : ''}
    ${actions ? `<div class="phero__acts">${actions}</div>` : ''}
  </div>
</section>`

const write = (rel, html) => {
  const file = path.join(ROOT, rel, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
}
const renumber = (html, home) => { let n = 0; return html.replace(/(<p class="label[^"]*"[^>]*>)\d\d — /g, (m, pre) => home ? `${pre}${String(++n).padStart(2, '0')} — ` : pre) }

const INTRO = `<div class="bi" id="bi" aria-hidden="true"><div class="bi__line"></div><div class="bi__glow"></div><div class="bi__word">${[...'BARVION'].map((c, i) => `<span style="--i:${i}">${c}</span>`).join('')}<i class="bi__sweep"></i></div></div>
<script>(function(){var d=document.documentElement,bi=document.getElementById('bi'),seen=0;try{var ts=+localStorage.getItem('bv-bi-t')||0;seen=sessionStorage.getItem('bv-bi')||(Date.now()-ts<432e5)}catch(e){}
if(!bi)return;if(seen||matchMedia('(prefers-reduced-motion:reduce)').matches){bi.remove();d.classList.remove('bi-pre');return}
d.classList.add('bi-lock');try{sessionStorage.setItem('bv-bi','1');localStorage.setItem('bv-bi-t',Date.now())}catch(e){}
function end(){if(!bi.parentNode)return;bi.classList.add('out');setTimeout(function(){bi.remove();d.classList.remove('bi-lock','bi-pre')},900)}
var t=setTimeout(end,3300);bi.addEventListener('click',function(){clearTimeout(t);end()});setTimeout(function(){d.classList.remove('bi-lock','bi-pre')},5200)})()</script>`
const page = ({ rel, title, desc, active, home = false, body }) =>
  write(rel, renumber( head(`${title} | Barvion Group`, desc, home) + (home ? INTRO : '') + '<a class="skip" href="#icerik">İçeriğe geç</a>\n' +
    header(active, !home) + `\n<main id="icerik">\n${fixLinks(body)}\n</main>\n` + fixLinks(footer) + tail, home))


const AREAS2 = [
  ['tekstil', 'Tekstil üretimi', 'Dokuma, örme ve konfeksiyon hatlarında makine ve vardiya takibi.', 'Hat başındaki makinelerden gelen duruş ve üretim bilgisi tek ekranda toplanır. Vardiya bazlı verimlilik ve fire görünür olur; bakım talepleri QR kodla bildirilerek iş emrine dönüşür.'],
  ['gida', 'Gıda üretimi', 'Hat duruşları, partiler ve bakım kayıtlarının izlenebilir hale gelmesi.', 'Hat duruşları ve bakım kayıtları tarih, makine ve kişi bilgisiyle saklanır. Üretim verisi parti bazında izlenir; raporlar elle hazırlanmak yerine kayıtlardan oluşur.'],
  ['makine', 'Makine ve ekipman üretimi', 'Üretim istasyonları, iş emirleri ve kalite verisinin tek yapıda toplanması.', 'İstasyon bazlı üretim, iş emri akışı ve kalite verisi tek yapıda birleşir. Mevcut ERP veya SAP altyapısıyla veri alışverişi, sistemin sunduğu imkânlar ölçüsünde kurulabilir.'],
  ['otomotiv', 'Otomotiv yan sanayi', 'Yüksek tempolu hatlarda verimlilik, fire ve duruş analizi.', 'Yüksek tempolu hatlarda duruş nedenleri ve fire kayıtları anlık toplanır. Pareto ve karşılaştırma ekranları, kaybın en büyük kaynağını yönetime açıkça gösterir.'],
  ['sogutma', 'Soğutma ve dayanıklı tüketim', 'Montaj hatlarında üretim takibi ve bakım yönetimi.', 'Montaj hattındaki istasyonlar izlenir, hedef ile gerçekleşen karşılaştırılır. Tekrarlayan arızalar ve bakım yükü kayıtlardan okunarak önleyici bakım planlanır.'],
  ['enerji', 'Enerji yoğun üretim tesisleri', 'Enerji tüketimi ile üretimin birlikte izlenmesi.', 'Sayaç ve sensör verisi üretim verisiyle aynı yapıda toplanır. Enerji ile üretim arasındaki ilişki raporlanır; kritik makineler risk skoruyla öne çıkar.'],
]
const WHY = {
  tekstil: ['Dokuma, örme ve konfeksiyon hatlarında duruşlar ve vardiya farkları çoğu zaman defterde ya da hat sorumlusunun hafızasında kalır. Hangi makinenin ne kadar durduğu sonradan tahmin edilir.', 'Hat sorumlusu vardiya sonunu beklemeden hangi istasyonun geride kaldığını görür. Fire ve duruş nedenleri, bir sonraki vardiyada tekrar etmeden önce konuşulabilir hale gelir.'],
  gida: ['Gıda hatlarında bir duruş yalnızca zaman kaybı değil, parti ve izlenebilirlik sorunu da yaratır. Kayıtlar farklı kâğıtlarda ve dosyalarda dağınık kalınca sorunun kaynağına inmek zorlaşır.', 'Parti, hat ve vardiya bilgisi aynı kayıtta durduğundan denetim ve raporlama için dosya aramak gerekmez. Bakım ekibi planlı kontrolleri de unutmadan takip eder.'],
  makine: ['Makine ve ekipman üretiminde her iş emri farklı istasyonlardan geçer. İstasyonlar arası bilgi aktarımı elle yapıldığında işin nerede beklediği görünmez.', 'İş emirleri istasyon istasyon izlenir; bekleyen iş ve kalite kayıtları tek yerde toplanır. Planlama ekibi sahaya sormadan işin durumunu görebilir.'],
  otomotiv: ['Yüksek tempolu hatlarda kısa duruşlar bile birikince büyük kayba dönüşür. Duruş nedenleri çoğu zaman vardiya sonunda ve hafızadan yazılır.', 'Duruşlar ve fire, nedeniyle birlikte anında kaydedilir. Karşılaştırma ekranları kaybın en büyük kaynağını gösterdiği için iyileştirme çalışması doğru yere yönelir.'],
  sogutma: ['Montaj hatlarında bir istasyondaki gecikme sonraki istasyonları da bekletir. Tekrarlayan arızalar ise bakım ekibine çoğunlukla sözlü iletilir ve takibi zorlaşır.', 'Hedef ile gerçekleşen karşılaştırılır. Arıza kayıtları biriktikçe önleyici bakım planlanabilir ve plansız duruşların önüne geçilir.'],
  enerji: ['Enerji yoğun tesislerde tüketim ile üretim çoğu zaman ayrı sistemlerde izlenir. İkisi birbirine bağlanmadığında maliyetin hangi üretim koşulundan geldiği görünmez.', 'Sayaç ve sensör verisi üretimle aynı yapıda toplanır. Kritik makineler risk skoruyla öne çıkar; bakım ve enerji kararları aynı veriye dayanır.'],
}
const areasHtml = `
<section class="sec areas2">
  <div class="wrap">
    <p class="label rv">06 — Uygulama Alanları</p>
    <h2 class="huge rv" style="max-width:1100px">Farklı üretim ortamlarına uyarlanabilen çözüm alanları</h2>
    <p class="note-s rv">Bu alanlar müşteri referansı değil, Barvion çözümlerinin saha analizi sonrasında uygulanabileceği üretim ortamlarıdır.</p>
    <div class="arx-list">${AREAS2.map(([img, t, d, long], i) => `
      <article class="arx ${i % 2 ? 'arx--r' : ''} rv">
        <div class="arx__t"><svg class="arx__n" viewBox="0 0 108 100" preserveAspectRatio="xMinYMid meet" aria-hidden="true"><text x="0" y="86" textLength="104" lengthAdjust="spacingAndGlyphs">${String(i + 1).padStart(2, '0')}</text></svg><h3>${t}</h3><p class="arx__s">${d}</p>
          <div class="arx__q"><b>Neden?</b><p>${WHY[img][0]}</p></div><div class="arx__q"><b>Nasıl?</b><p>${long}</p></div><div class="arx__q"><b>İşinizi nasıl geliştirir?</b><p>${WHY[img][1]}</p></div></div>
        <div class="arx__img">${areaScene(img)}</div>
      </article>`).join('')}</div>
  </div>
</section>`

/* ---------- Ana sayfa özel bölümleri ---------- */
/* Üstten görünüm makineler: bant boyunca soldan sağa tek şeritte akar */
const TOP = {
  torna: `<rect x="-95" y="-38" width="190" height="76" rx="8" fill="#5C6B30"/><rect x="-95" y="-38" width="190" height="14" rx="6" fill="#7A8A44"/><rect x="-88" y="-26" width="58" height="52" rx="6" fill="#47531F"/><circle cx="-59" cy="0" r="17" fill="#2C3445"/><circle cx="-59" cy="0" r="8" fill="#C3CAD6"/><rect x="-30" y="-5" width="96" height="10" fill="#C3CAD6"/><rect x="52" y="-24" width="36" height="48" rx="5" fill="#47531F"/><rect x="-4" y="14" width="40" height="16" rx="3" fill="#2C3445"/>`,
  cnc1: `<rect x="-70" y="-56" width="140" height="112" rx="10" fill="#D9CCAB"/><rect x="-70" y="-56" width="140" height="14" rx="8" fill="#EDE3C8"/><rect x="-58" y="-34" width="82" height="68" rx="6" fill="#1B2B4D" stroke="#fff" stroke-opacity=".6" stroke-width="3"/><rect x="-46" y="-22" width="58" height="44" rx="3" fill="#2A4574"/><rect x="34" y="-40" width="28" height="80" rx="5" fill="#1B2438"/><rect x="38" y="-36" width="20" height="16" rx="2" fill="#2F7FBF"/>${[0,1,2,3,4,5].map(i=>`<rect x="${38+(i%2)*10}" y="${-12+Math.floor(i/2)*12}" width="8" height="7" rx="1.5" fill="#7B86A0"/>`).join('')}`,
  cnc2: `<rect x="-70" y="-56" width="140" height="112" rx="10" fill="#CBD1DC"/><rect x="-70" y="-56" width="140" height="14" rx="8" fill="#E9EDF3"/><rect x="-58" y="-34" width="82" height="68" rx="6" fill="#1B2B4D" stroke="#fff" stroke-opacity=".6" stroke-width="3"/><rect x="-46" y="-22" width="58" height="44" rx="3" fill="#2A4574"/><rect x="34" y="-40" width="28" height="80" rx="5" fill="#1B2438"/><rect x="38" y="-36" width="20" height="16" rx="2" fill="#2F7FBF"/>${[0,1,2,3,4,5].map(i=>`<rect x="${38+(i%2)*10}" y="${-12+Math.floor(i/2)*12}" width="8" height="7" rx="1.5" fill="#7B86A0"/>`).join('')}`,
  robot: `<rect x="-60" y="-60" width="120" height="120" rx="12" fill="#4A505C"/><circle r="40" fill="#2C3445"/><g><animateTransform attributeName="transform" type="rotate" values="-35;25;-35" dur="4s" repeatCount="indefinite"/><rect x="-14" y="-12" width="100" height="24" rx="12" fill="#F28A1E"/><circle r="22" fill="#D96F0B"/><g transform="translate(86,0)"><animateTransform attributeName="transform" type="rotate" additive="sum" values="30;-30;30" dur="4s" repeatCount="indefinite"/><circle r="15" fill="#D96F0B"/><rect x="0" y="-10" width="70" height="20" rx="10" fill="#F28A1E"/><rect x="62" y="-17" width="14" height="10" rx="2" fill="#2C3445"/><rect x="62" y="7" width="14" height="10" rx="2" fill="#2C3445"/></g></g>`,
}
const spr = (k, i) => { const d = 4 * i
  return `<g opacity="0"><animateMotion dur="18s" begin="${d}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#lbelt"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.05;.93;1" dur="18s" begin="${d}s" repeatCount="indefinite" fill="remove"/><g transform="scale(.58)" style="filter:brightness(.72) saturate(.7) drop-shadow(0 10px 8px rgba(0,0,0,.5))">${TOP[k]}</g></g>` }
const lItems = () => {
  const cnc = (x) => `<g transform="translate(${x},50)"><rect width="124" height="66" rx="7"/><rect x="12" y="12" width="64" height="36" rx="4"/><rect x="88" y="12" width="24" height="42" rx="4"/><circle cx="100" cy="24" r="4"/><path d="M92 38h16M92 46h16"/><path d="M12 58h64" class="d2"/></g>`
  const crate = (x) => `<g transform="translate(${x},58)"><rect width="76" height="52" rx="4"/><path d="M0 18h76M0 34h76" class="d2"/><rect x="48" y="38" width="20" height="10" rx="2"/></g>`
  const lathe = (x) => `<g transform="translate(${x},56)"><rect width="150" height="22" rx="4" transform="translate(0,34)"/><rect x="6" width="42" height="46" rx="5"/><circle cx="27" cy="22" r="11"/><path d="M48 22h72"/><rect x="104" y="10" width="34" height="30" rx="4"/><circle cx="76" cy="44" r="9"/></g>`
  const parts = (x) => `<g transform="translate(${x},60)"><rect width="104" height="14" rx="7"/><rect y="20" width="104" height="14" rx="7"/><rect y="40" width="104" height="14" rx="7"/></g>`
  return cnc(30) + crate(250) + lathe(410) + parts(630)
}
const lSvg = `<svg class="l2__svg l2__draw" viewBox="0 0 1600 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <g class="ld-belt"><path d="M0 34H1600M0 128H1600" class="rail"/><path d="M0 34H1600M0 128H1600" class="rail2"/><g class="ribs"><path d="${Array.from({ length: 66 }, (_, i) => `M${i * 26 - 26} 38V124`).join('')}"/></g></g>
  <g class="ld-items"><g>${lItems()}</g><g transform="translate(800,0)">${lItems()}</g><g transform="translate(1600,0)">${lItems()}</g></g>
</svg>`
const aboutTeaser = `
<section class="sec l2" id="hakkinda-l">
  <div class="wrap l2__wrap">
    <div class="l2__text">
      <p class="label rv">07 — Hakkımızda</p>
      <h2 class="huge rv">Üretim sahası ile yazılım dünyası arasında <i>köprü kuruyoruz.</i></h2>
      <p class="para rv">Barvion, sanayi işletmelerinin bakım, üretim ve operasyon süreçlerini dijitalleştirmek amacıyla kurulmuş bir yazılım ve teknoloji şirketidir. Saha deneyimini modern yazılım geliştirme, veri analizi ve endüstriyel entegrasyon yetkinlikleriyle bir araya getirir.</p>
      <a href="${URL.about}" class="more rv">Bizi tanıyın ${ARW}</a>
    </div>
    ${lSvg}
  </div>
</section>`

const tile = (s, cls = '') => `
<a class="mt ${cls} rv" href="${solUrl(s)}" style="--c:${s.color}">
  <span class="mt__img" style="background-image:url(/img/pages/${s.img}.jpg)"></span><span class="mt__tint"></span>
  <span class="mt__top"><b>${s.n}</b><em>${s.tag}</em></span>
  <span class="mt__body"><h3>${s.title}</h3><p>${s.lede}</p><span class="more">İncele ${ARW}</span></span>
</a>`
const EXTRA = [
  { n: '07', tag: 'RMD', slug: 'reklam-ve-marka-danismanligi', title: 'Reklam ve Marka Danışmanlığı', form: 'Reklam ve Marka Danışmanlığı', lede: 'Markanızın kimliğini, mesajını ve görünürlüğünü birlikte planlıyoruz.', color: '#2358D6', art: 'brand', img: 'hero-toplar' },
  { n: '08', tag: 'WEB', slug: 'web-sitesi-tasarimi', title: 'Web Sitesi Tasarımı', form: 'Web Sitesi Tasarımı', lede: 'Kurumsal kimliğinize uygun, hızlı ve sade web siteleri tasarlıyoruz.', color: '#0E7490', art: 'web', img: 'hero-insa' },
]
const ART = { web: `<svg class="mt__art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
<g transform="translate(180,24)"><rect width="206" height="140" rx="8" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.35)"/><rect width="206" height="16" rx="8" fill="rgba(255,255,255,.14)"/><circle cx="12" cy="8" r="2.6" fill="#fff" opacity=".6"/><circle cx="21" cy="8" r="2.6" fill="#fff" opacity=".6"/><circle cx="30" cy="8" r="2.6" fill="#fff" opacity=".6"/>
<rect x="12" y="26" width="182" height="46" rx="4" fill="rgba(255,255,255,.18)"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.12;.22;.9;1" dur="8s" repeatCount="indefinite"/></rect>
<rect x="12" y="80" width="56" height="48" rx="4" fill="rgba(255,255,255,.14)"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.28;.38;.9;1" dur="8s" repeatCount="indefinite"/></rect>
<rect x="75" y="80" width="56" height="48" rx="4" fill="rgba(255,255,255,.14)"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.38;.48;.9;1" dur="8s" repeatCount="indefinite"/></rect>
<rect x="138" y="80" width="56" height="48" rx="4" fill="rgba(255,255,255,.14)"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.48;.58;.9;1" dur="8s" repeatCount="indefinite"/></rect>
<rect x="12" y="26" width="0" height="46" rx="4" fill="#57C9E9" opacity=".35"><animate attributeName="width" values="0;182;182;0" keyTimes="0;.3;.9;1" dur="8s" repeatCount="indefinite"/></rect></g>
<g transform="translate(24,70)"><rect width="150" height="110" rx="8" fill="rgba(6,14,28,.7)" stroke="rgba(255,255,255,.25)"/>
${[[14, 60, '#57C9E9'], [26, 90, '#F5B945'], [26, 46, '#9AD28A'], [38, 76, '#57C9E9'], [26, 34, '#F5B945'], [14, 100, '#9AD28A'], [14, 52, '#57C9E9']].map(([x, w, c], i) => `<rect x="${x}" y="${14 + i * 13}" width="0" height="5" rx="2.5" fill="${c}"><animate attributeName="width" values="0;0;${w};${w};0" keyTimes="0;${(.05 + i * .09).toFixed(2)};${(.14 + i * .09).toFixed(2)};.92;1" dur="8s" repeatCount="indefinite"/></rect>`).join('')}
<rect x="14" y="98" width="5" height="9" fill="#57C9E9"><animate attributeName="opacity" values="1;0;1" dur=".9s" repeatCount="indefinite"/></rect></g>
<circle cx="360" cy="214" r="18" fill="none" stroke="#57C9E9" stroke-width="2" opacity=".6"><animate attributeName="r" values="14;34;14" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0;.7" dur="3s" repeatCount="indefinite"/></circle><circle cx="360" cy="214" r="6" fill="#57C9E9"/></svg>`, brand: `<svg class="mt__art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
<g transform="translate(206,30)">${['#0B2347', '#2F7FBF', '#57C9E9', '#EAF3FB'].map((c, i) => `<rect x="${i * 46}" y="0" width="38" height="38" rx="8" fill="${c}" stroke="rgba(255,255,255,.35)" opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;${(.04 + i * .08).toFixed(2)};${(.14 + i * .08).toFixed(2)};.92;1" dur="8s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 14;0 14;0 0;0 0;0 14" keyTimes="0;${(.04 + i * .08).toFixed(2)};${(.14 + i * .08).toFixed(2)};.92;1" dur="8s" repeatCount="indefinite"/></rect>`).join('')}</g>
<text x="30" y="150" font-size="96" font-weight="600" fill="rgba(255,255,255,.16)" font-family="Poppins,sans-serif">Aa</text>
<g transform="translate(290,170)"><circle r="40" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2.4" stroke-dasharray="252" stroke-dashoffset="252"><animate attributeName="stroke-dashoffset" values="252;0;0;252" keyTimes="0;.4;.9;1" dur="8s" repeatCount="indefinite"/></circle>
<path d="M-18 14 L0 -22 L18 14 M-10 2 H10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="110" stroke-dashoffset="110"><animate attributeName="stroke-dashoffset" values="110;110;0;0;110" keyTimes="0;.25;.55;.9;1" dur="8s" repeatCount="indefinite"/></path>
<circle r="40" fill="none" stroke="#57C9E9" stroke-width="1.6"><animate attributeName="r" values="40;78;40" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".6;0;.6" dur="4s" repeatCount="indefinite"/></circle></g>
${[0, 1, 2, 3, 4].map((i) => `<rect x="${30 + i * 22}" y="${250 - (14 + i * 12)}" width="14" height="${14 + i * 12}" rx="3" fill="${i % 2 ? '#57C9E9' : '#8FB4F5'}" opacity=".55"><animate attributeName="height" values="6;${14 + i * 12};6" dur="${(3 + i * .4).toFixed(1)}s" repeatCount="indefinite"/><animate attributeName="y" values="244;${250 - (14 + i * 12)};244" dur="${(3 + i * .4).toFixed(1)}s" repeatCount="indefinite"/></rect>`).join('')}</svg>` }
const extraTile = (s) => `
<a class="mt mt--x rv" href="${URL.sol}${s.slug}/" style="--c:${s.color}">
  ${s.img ? `<span class="mt__img" style="background-image:url(/img/pages/${s.img}.jpg)"></span>` : ART[s.art]}<span class="mt__tint"></span>
  <span class="mt__top"><b>${s.n}</b><em>${s.tag}</em></span>
  <span class="mt__body"><h3>${s.title}</h3><p>${s.lede}</p><span class="more">İncele ${ARW}</span></span>
</a>`
const solMosaic = `
<section class="sec sec--pb" id="cozumler">
  <div class="wrap">
    <p class="label rv">03 — Çözümler</p>
    <h2 class="huge huge--full rv">Sahadaki ihtiyaca göre şekillenen <i>sistemler</i></h2>
    <div class="mosaic">${SOL.map((s, i) => tile(s, i === 0 ? 'mt--big' : '')).join('')}${EXTRA.map(extraTile).join('')}</div>
    <p class="rv" style="margin-top:34px"><a class="more" href="${URL.sol}">Tüm çözümler ${ARW}</a></p>
  </div>
</section>`

const FF_STEPS = [
  ['Bildirim', 'Yeni arıza bildirimi', 'QR kod okutuldu', [['Makine', 'PK-04'], ['Sorun', 'Sensör algılamıyor'], ['Öncelik', 'Yüksek']]],
  ['Atama', 'İş emri oluşturuldu', 'Bakım ekibine atandı', [['İş emri', '#1042'], ['Sorumlu', 'Bakım ekibi'], ['Durum', 'Atandı']]],
  ['Müdahale', 'Müdahale sürüyor', 'Sensör ayarı yapılıyor', [['Kontrol', 'Bağlantı tamam'], ['Ayar', 'Yapılıyor'], ['Test', 'Bekleniyor']]],
  ['Doğrulama', 'Test başarılı', 'Bakım geçmişine eklendi', [['Sinyal', 'Normal'], ['Makine', 'Çalışıyor'], ['Kayıt', 'Tamamlandı']]],
]
const ffHtml = () => `<div class="mock dk ff" data-ff>
  <div class="mock-h"><span>FOLGAN / İş Emri Akışı</span><em>AKIŞ</em></div>
  <div class="stp">${FF_STEPS.map((s, i) => `<b class="${i ? '' : 'on'}">${i + 1} ${s[0]}</b>`).join('')}</div>
  <div class="ff__stage">${FF_STEPS.map((s, i) => `<div class="ff__s${i ? '' : ' on'}"><div class="ff__t"><em>${s[0] === 'Doğrulama' ? '✓' : 'QR'}</em><div><b>${s[1]}</b><small>${s[2]}</small></div></div>${s[3].map(([k, v]) => `<p><span>${k}</span><b>${v}</b></p>`).join('')}<div class="ff__bar"><i></i></div></div>`).join('')}</div>
  <div class="legend"><em>örnek arayüz</em></div></div>`

const folganTeaser = `
<section class="folgan-t" id="urunler">
  <div class="wrap fx">
    <div class="fx__l">
      <h3 class="folgan-t__name rv">FOLGAN</h3>
      <p class="folgan-t__p rv">Bakım süreçlerini kayıt altına alan, ölçen ve yöneten bakım yönetim platformu</p>
      <ul class="fx__pts rv"><li><b>Kaydeder</b><span>Arıza, bakım ve iş emri kalıcı kayıtta.</span></li><li><b>Ölçer</b><span>MTTR ve tekrarlayan arızalar kayıttan okunur.</span></li><li><b>Yönetir</b><span>İşler atanır, ekip yükü ve risk izlenir.</span></li></ul>
      <a href="${URL.prod}" class="btn btn--white rv">Ürünü inceleyin ${ARW}</a>
    </div>
    <div class="fx__r rv">${ffHtml()}</div>
  </div>
</section>`

const areasRail = `
<section class="sec rail" id="uygulama-alanlari">
  <div class="wrap">
    <p class="label rv">06 — Uygulama Alanları</p>
    <h2 class="huge rv" style="max-width:1100px">Farklı üretim ortamlarına uyarlanabilen çözüm alanları</h2>
    <p class="note-s rv">Bu alanlar müşteri referansı değil, Barvion çözümlerinin saha analizi sonrasında uygulanabileceği üretim ortamlarıdır.</p>
  </div>
  <div class="rail__track" tabindex="0" aria-label="Uygulama alanları">${AREAS2.map(([img, t, d], i) => `
    <article class="rail__card"><div class="rail__img">${areaScene(img)}</div><div class="rail__b"><b>${String(i + 1).padStart(2, '0')}</b><h3>${t}</h3><p>${d}</p></div></article>`).join('')}</div>
</section>`
const quoteHome = `
<section class="sec quote-s">
  <div class="wrap">
    <blockquote class="rv">Bakım, üretim ve operasyon süreçlerini; saha verileri, özel yazılımlar, veri analizi ve endüstriyel entegrasyonlarla tek bir dijital yapıda birleştiriyoruz.</blockquote>
    <p class="rv" style="margin-top:34px"><a class="btn btn--blue" href="${URL.contact}">Projenizi Görüşelim ${ARW}</a></p>
  </div>
</section>`

page({
  rel: '.', home: true, active: 'home', title: 'Endüstriyel Yazılım ve Dijital Dönüşüm Çözümleri',
  desc: 'Fabrikanızdaki veriyi operasyona, operasyonu doğru kararlara dönüştürüyoruz.',
  body: [S.hero, aboutTeaser, S.problem, S.approach, solMosaic, folganTeaser, areasRail, quoteHome].join('\n\n'),
})

/* ---------- Çözümler (liste) ---------- */
const solCards = `
<section class="sec sec--pb">
  <div class="wrap">
    <div class="mosaic">${SOL.map((s, i) => tile(s, i === 0 ? 'mt--big' : '')).join('')}${EXTRA.map(extraTile).join('')}</div>
  </div>
</section>`
page({
  rel: 'cozumler', active: 'sol', title: 'Çözümler', desc: 'Sahadaki ihtiyaca göre şekillenen sistemler.',
  body: phero({ uni: true, media: 'urunler', crumb: [['Çözümler']], label: '', title: 'Çözümler', lede: 'Sahadaki ihtiyaca göre şekillenen sistemler. Hazır bir kalıbı dayatmak yerine, mevcut süreçleri ve teknik altyapıyı inceleyerek doğru çözüm kapsamını belirliyoruz.'}) + SOLSTATE + solCards + S.model,
})

/* ---------- Çözüm sayfaları: her birinin kendi videosu, rengi, anlatımı ve hareketli şeması ---------- */

const STEPS = {
  'bakim-yonetimi': [['Arızayı fark et', 'Operatör ya da teknisyen sahada arızayı fark eder. Makinenin üzerindeki QR kod, hangi makine olduğunu tek okutmada belirler.'], ['Bildirim oluştur', 'Makine, sorun ve öncelik bilgisi birkaç dokunuşla kayda geçer. WhatsApp mesajı ya da kâğıt not gerekmez.'], ['Teknisyene ata', 'İş emri uygun bakım ekibine atanır. Sorumlu kişi, öncelik ve beklenen süre baştan netleşir.'], ['Müdahale et', 'Teknisyen yaptığı işlemleri, kullandığı parçaları ve notlarını iş emrine adım adım ekler.'], ['Test et ve doğrula', 'Müdahale sonrası makine test edilir. Sonuç doğrulanmadan iş emri kapanmaz.'], ['Geçmişe kaydet', 'Tüm işlem makinenin bakım geçmişine eklenir. Tekrarlayan arızalar ve duruş süreleri bu kayıttan okunur.']],
  'endustriyel-veri-toplama': [['Mevcut makineler', 'Fabrikadaki torna, CNC ve hat makineleri olduğu gibi kalır. Makineyi değiştirmeye gerek yoktur.'], ['Uygun bağlantıyı seç', 'Her makinenin altyapısına göre seri port, Modbus, LoRa, API veya SQL gibi uygun bağlantı yöntemi seçilir.'], ['Veriyi topla', 'Durum, sayaç ve sıcaklık gibi değerler makineden canlı olarak alınır.'], ['Tek formata dönüştür', 'Farklı makinelerin farklı biçimlerdeki verisi ortak bir yapıya, ortak birim ve zaman damgasına çevrilir.'], ['Doğrula ve kaydet', 'Veri kaynağıyla eşleştirilir, zaman bilgisi eklenir ve kayıt güvenilir biçimde saklanır.'], ['İzle ve kullan', 'Toplanan veri üretim görünümünde, raporlarda ve ERP gibi sistemlerde kullanılır.']],
  'erp-ve-sap-entegrasyonu': [['Bağlan', 'Barvion sistemleri ile ERP / SAP arasında API, IDoc, BAPI veya RFC gibi yöntemlerle kontrollü bağlantılar kurulur.'], ['Eşleştir', 'Alanlar ve yetkiler iki sistem arasında eşleştirilir; hangi verinin nereye gideceği baştan tanımlanır.'], ['Senkronize et', 'Veri iki yönde, tanımlı kapsamda akar. İş emri, stok ve üretim bilgisi tek yerde tutarlı kalır.']],
}

const STEPX = {
  'bakim-yonetimi': [['Makine üzerindeki QR kod okutulur', 'Makine ve konum otomatik gelir', 'Fotoğraf eklenebilir'], ['Sorun türü seçilir', 'Öncelik belirlenir', 'Bildirim kayda geçer'], ['Uygun ekip seçilir', 'Beklenen süre tanımlanır', 'Sorumluya bildirim gider'], ['İşlemler adım adım yazılır', 'Kullanılan parçalar eklenir', 'Duruş süresi ölçülür'], ['Makine test edilir', 'Sonuç kayda eklenir', 'Onay olmadan kapanmaz'], ['Bakım geçmişi güncellenir', 'MTTR ve duruş süresi hesaplanır', 'Tekrarlayan arıza görünür']],
  'endustriyel-veri-toplama': [['Torna, CNC ve hat makineleri', 'Mevcut altyapı korunur', 'Makine değişikliği gerekmez'], ['Seri port / RS-485', 'Modbus, LoRa, API veya SQL', 'Makineye göre seçilir'], ['Durum, sayaç, sıcaklık', 'Canlı akış', 'Kesinti anında kayıt tutulur'], ['Ortak birim ve zaman damgası', 'Makine kimliği eklenir', 'Tek şema'], ['Kaynak eşleştirilir', 'Zaman bilgisi eklenir', 'Güvenli saklanır'], ['Üretim görünümü', 'Rapor ve analiz', 'ERP bağlantısı']],
  'erp-ve-sap-entegrasyonu': [['API, IDoc, BAPI, RFC', 'Yetkili ve kontrollü erişim', 'Test ortamında doğrulanır'], ['Alan eşleştirme tablosu', 'Yetki ve kapsam tanımı', 'Hata durumunda kayıt'], ['İki yönlü veri akışı', 'Tanımlı kapsam', 'İş emri, stok, üretim bilgisi']],
}
const stepsHtml = (s) => {
  const st = STEPS[s.slug]; if (!st) return ''
  const pos = ['12% 30%', '88% 20%', '30% 85%', '75% 70%', '50% 10%', '20% 55%']
  return `<div class="wrap ssteps">${st.map(([t, d], i) => `<article class="sstep ${i % 2 ? 'sstep--r' : ''} rv"><div class="sstep__fig"><span>${String(i + 1).padStart(2, '0')}</span>${stepIcon(s.slug, i)}</div><div class="sstep__t"><p class="label">Adım ${i + 1} / ${st.length}</p><h3>${t}</h3><p>${d}</p><ul>${(STEPX[s.slug] || [])[i] ? STEPX[s.slug][i].map((x) => `<li>${x}</li>`).join('') : ''}</ul></div></article>`).join('')}</div>`
}
const vizHtml = (s) => {
  if (s.viz === 'ticket') return bakimScene()
  if (s.viz === 'hub') return veriScene()
  if (s.viz === 'link') return erpScene()
  const NS = (n, c = 0) => String(n).padStart(c, '0')
  switch (s.viz) {
    case 'hub': {
      const nodes = s.hubNodes, ys = [90, 210, 330]
      let defs = '', pk = '', boxes = ''
      nodes.forEach((t, i) => {
        const left = i < 3, yc = ys[i % 3]
        const d = left ? `M220,${yc} C430,${yc} 440,210 542,210` : `M980,${yc} C770,${yc} 760,210 658,210`
        defs += `<path id="hp${i}" d="${d}" class="hpath"/>`
        for (let k = 0; k < 2; k++) pk += `<rect class="pkt" x="-6" y="-6" width="12" height="12"><animateMotion dur="3.4s" begin="${(i * 0.45 + k * 1.7).toFixed(2)}s" repeatCount="indefinite"><mpath href="#hp${i}"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="3.4s" begin="${(i * 0.45 + k * 1.7).toFixed(2)}s" repeatCount="indefinite"/></rect>`
        const x = left ? 30 : 980
        boxes += `<g class="hnode" style="--d:${i * 0.35}s"><rect x="${x}" y="${yc - 29}" width="190" height="58"/><circle cx="${x + 26}" cy="${yc}" r="5" class="led"/><text x="${x + 46}" y="${yc + 7}">${t}</text></g>`
      })
      return `<div class="vz vz-hub"><svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid meet"><defs><radialGradient id="cg"><stop offset="0" stop-color="#7FB0FF"/><stop offset="1" stop-color="#2149B8"/></radialGradient></defs>${defs}${pk}${boxes}<circle class="rg r1" cx="600" cy="210" r="66"/><circle class="rg r2" cx="600" cy="210" r="66"/><circle cx="600" cy="210" r="58" fill="url(#cg)" class="core"/><text x="600" y="217" text-anchor="middle" class="ctext">Barvion</text><text x="600" y="372" text-anchor="middle" class="cap">Tek veri yapısı</text><rect x="480" y="384" width="240" height="4" class="capbar"/><rect x="480" y="384" width="240" height="4" class="capfill"/></svg></div>`
    }
    case 'chart': {
      const H = [120, 150, 100, 190, 140, 215, 170, 125, 205, 150, 230, 180]
      const bars = H.map((h, i) => `<rect class="cb" style="--i:${i}" x="${26 + i * 98}" y="${250 - h}" width="58" height="${h}"/>`).join('')
      return `<div class="vz vz-chart"><div class="kp"><div><small>Üretim</small><b class="n" style="animation-name:c87;--t:87;--u:'%'"></b></div><div><small>Verimlilik</small><b class="n" style="animation-name:c94;--t:94;--u:'%'"></b></div><div><small>Plansız duruş</small><b class="n n3" style="animation-name:c12;--t:12;--u:' dk'"></b></div><div><small>Raporlar</small><b class="n" style="animation-name:c24;--t:24;--u:' / 24'"></b></div></div><svg viewBox="0 0 1200 260" preserveAspectRatio="none"><g class="gr">${[50, 110, 170, 230].map((y) => `<line x1="0" x2="1200" y1="${y}" y2="${y}"/>`).join('')}</g>${bars}<polyline class="cl" vector-effect="non-scaling-stroke" points="55,150 153,120 251,170 349,80 447,130 545,55 643,100 741,145 839,65 937,120 1035,40 1133,90"/></svg><div class="scanl"><span>Barvion</span></div></div>`
    }
    case 'ticket': {
      const xs = [180, 460, 740, 1020], st = s.steps
      const lines = [0, 1, 2].map((i) => `<line class="tl" style="--d:${i * 2}s" x1="${xs[i] + 40}" y1="210" x2="${xs[i + 1] - 40}" y2="210"/>`).join('')
      const nodes = xs.map((x, i) => `<g class="tn" style="--d:${i * 2}s"><circle cx="${x}" cy="210" r="40"/><text x="${x}" y="218" text-anchor="middle" class="tnn">${i + 1}</text><text x="${x}" y="290" text-anchor="middle" class="tnl">${st[i]}</text><path class="tck" d="M${x - 11},206 l8,9 l15,-17" /></g>`).join('')
      return `<div class="vz vz-ticket"><svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid meet"><g class="qr" transform="translate(70,170)"><rect width="52" height="52"/><path d="M8,8h14v14h-14zM30,8h14v14h-14zM8,30h14v14h-14zM30,32h6v6h-6zM38,40h6v4h-6z"/></g><text x="96" y="150" text-anchor="middle" class="tnl">QR kod</text>${lines}${nodes}<rect class="tok" x="-9" y="-9" width="18" height="18"><animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.67;1" calcMode="linear" path="M96,196 L1020,196"/></rect><g class="card"><rect x="400" y="326" width="400" height="64"/><text x="428" y="354" class="ctl">Sensör kontrolü</text><text x="428" y="376" class="cts">Paketleme Hattı · Bakım ekibi</text><text x="772" y="364" text-anchor="end" class="ctg">Atandı</text></g></svg></div>`
    }
    case 'bars': {
      const rows = [['Hat A', 78, 70], ['Hat B', 64, 48], ['Hat C', 88, 84], ['Hat D', 56, 30]]
      return `<div class="vz vz-bars"><div class="vh"><span>Hedef ve gerçekleşen</span><span class="lg"><i class="a"></i>Hedef <i class="b"></i>Gerçekleşen</span></div>${rows.map(([n, t, a], i) => `<div class="vr" style="--i:${i};--t:${t}%;--a:${a}"><span class="vn">${n}</span><div class="trk"><i class="tg"></i><i class="ac"></i></div><b class="vv" style="animation-name:b${a}"></b></div>`).join('')}</div>`
    }
    case 'blocks': {
      const mods = s.steps
      return `<div class="vz vz-blocks"><div class="cw"><div class="cwh"><i></i><i></i><i></i><span>modul.ts</span></div>${[62, 84, 48, 74, 38, 66].map((w, i) => `<span class="cl2" style="--w:${w}%;--i:${i}"></span>`).join('')}<em class="cur"></em></div><div class="mg">${mods.map((m, i) => `<div class="mod" style="--i:${i}"><b>${NS(i + 1, 2)}</b><span>${m}</span></div>`).join('')}</div></div>`
    }
    case 'link': {
      const L = ['API', 'IDoc', 'BAPI', 'RFC']
      return `<div class="vz vz-link"><div class="sys s1"><b>Barvion</b><span>Sistemler</span><i class="led"></i></div><div class="lanes">${L.map((x, i) => `<div class="lane" style="--i:${i}"><span class="ln2">${x}</span><div class="rail"><i class="p p1"></i><i class="p p2"></i></div></div>`).join('')}</div><div class="sys s2"><b>ERP / SAP</b><span>Kurumsal sistem</span><i class="led"></i></div></div>`
    }
  }
  return ''
}
SOL.forEach((s, i) => {
  const prev = SOL[(i + SOL.length - 1) % SOL.length], next = SOL[(i + 1) % SOL.length]
  const scope = `<ol class="scope">${s.list.map((x, k) => `<li class="rv"><span class="sn">${String(k + 1).padStart(2, '0')}</span><h3>${x}</h3><p>${DESC[x] || ''}</p></li>`).join('')}</ol>`
  const others = [...SOL, ...EXTRA].filter((x) => x !== s).map((x) => `<a href="${solUrl(x)}" class="ot rv" style="--c:${x.color}">${x.img ? `<span class="ot__img" style="background-image:url(/img/pages/${x.img}.jpg)"></span>` : ''}<span class="ot__tint"></span><span class="ot__top"><b>${x.n}</b><em>${x.tag}</em></span><span class="ot__t">${x.title}</span></a>`).join('')
  const body = phero({
    sol: true, media: s.img, color: s.color, crumb: [['Çözümler', URL.sol], [s.title]], label: `Çözüm — ${s.tag}`, title: s.title, lede: s.lede,
    actions: `<a class="btn btn--white" href="${URL.contact}?cozum=${encodeURIComponent(s.form)}">Görüşme Talep Et ${ARW}</a>${s.product ? `<a class="btn btn--ghost" href="${URL.prod}">FOLGAN platformu</a>` : ''}`,
  }) + `
<section class="sec sol-intro" style="--c:${s.color}">
  <div class="wrap two">
    <div><p class="label rv">Nasıl çalışır</p><h2 class="huge rv">${s.head}</h2></div>
    <div>${s.text.map((t) => `<p class="para rv">${t}</p>`).join('')}</div>
  </div>
  ${stepsHtml(s)}
</section>
<section class="sec chg" style="--c:${s.color}">
  <div class="wrap">
    <p class="label rv">Sahada ne değişir</p>
    <div class="chg3">${(CHG[s.slug] || []).map(([t, d], k) => `<div class="rv"><b>${String(k + 1).padStart(2, '0')}</b><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </div>
</section>
<section class="sec dark sol-scope" style="--c:${s.color}">
  <div class="wrap">
    <p class="label light rv">Kapsam</p>
    <div class="two"><h2 class="huge rv">${s.title} <i>kapsamında</i></h2>${s.note ? `<p class="para rv note-p">${s.note}</p>` : '<span></span>'}</div>
    <div class="scope-wrap">${scope}</div>
  </div>
</section>
<section class="sec others" style="--c:${s.color}">
  <div class="wrap"><p class="label rv">Diğer çözümler</p><div class="orail">${others}</div></div>
</section>
${S.model}`
  page({ rel: `cozumler/${s.slug}`, active: 'sol', title: s.title, desc: s.lede, body })
})

/* ---------- Ürünler: FOLGAN tam tanıtım ---------- */
const SHOT = ['folgan-ekran.jpg', 'folgan-ekran.png', 'folgan-ekran.webp'].find((f) => fs.existsSync(path.join(ROOT, 'img', f)))
const folganPage = `
<section class="sec fo-intro">
  <div class="wrap">
    <div class="fo-grid">
      <div>
        <p class="label rv">Ürün</p>
        <h2 class="fo-name rv">FOLGAN</h2>
        <h3 class="fo-sub rv">Bakım süreçlerini kayıt altına alan, ölçen ve yöneten bakım yönetim platformu</h3>
        <p class="para rv">FOLGAN, fabrika içerisindeki arıza, bakım ve iş emri süreçlerini tek noktada toplar. Sahadan gelen taleplerin kaybolmasını önler, görevlerin sorumlulara atanmasını sağlar ve makine geçmişini kalıcı hale getirir.</p>
        <p class="para rv">Bir makine durduğunda ilk soru hep aynıdır: ne zaman, kim, ne yaptı? FOLGAN bu sorunun cevabını WhatsApp gruplarında ve kâğıtlarda değil, tek bir kayıtta tutar.</p>
        <a href="#form" data-cozum="FOLGAN Bakım Yönetimi" class="btn btn--blue rv">FOLGAN için Görüşme Talep Et ${ARW}</a>
      </div>
      <div class="fo-visual rv">
        <div class="fo-frame">
          <div class="fo-bg" style="background-image:url(/img/pages/folgan.jpg)"></div>
          ${SHOT ? `<img class="fo-shot" src="/img/${SHOT}" alt="FOLGAN ekran görüntüsü">` : ''}${ffHtml()}
        </div>
      </div>
    </div>
    <div class="pill3">
      <div class="rv"><b>01</b><h3>Kaydeder</h3><p>Arıza, bakım ve iş emri; fotoğraf ve açıklamasıyla birlikte kalıcı kayda geçer.</p></div>
      <div class="rv"><b>02</b><h3>Ölçer</h3><p>MTTR, duruş süresi ve tekrarlayan arızalar kayıtlardan hesaplanır.</p></div>
      <div class="rv"><b>03</b><h3>Yönetir</h3><p>İşler atanır, ekip yükü ve makine riski izlenir; kararlar veriye dayanır.</p></div>
    </div>
  </div>
</section>
<section class="sec dark fo-feat">
  <div class="wrap">
    <p class="label light rv">Platform özellikleri</p>
    <div class="two"><h2 class="huge rv">Bakımın her adımı <i>kayıtta.</i></h2><span></span></div>
    ${FGROUPS.map(([g, d, ids]) => `<div class="fgp rv"><div class="fgp__h"><h3>${g}</h3><p>${d}</p></div><ol class="scope scope--f" style="--n:${ids.length}">${ids.map((i, k) => `<li><span class="sn">${String(k + 1).padStart(2, '0')}</span><h3>${FEAT[i][0]}</h3><p>${FEAT[i][1]}</p></li>`).join('')}</ol></div>`).join('')}
    <p class="fo-cta rv"><a href="#form" data-cozum="FOLGAN Bakım Yönetimi" class="btn btn--blue">FOLGAN için Görüşme Talep Et ${ARW}</a></p>
  </div>
</section>
<section class="sec fo-ben">
  <div class="wrap">
    <p class="label rv">Operasyonel faydalar</p>
    <h2 class="huge rv" style="max-width:900px">Sahada hissedilen <i>fark.</i></h2>
    <ol class="ben2">${BEN.map(([t, d], k) => `<li class="rv"><span>${String(k + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>`
page({
  rel: 'urunler', active: 'prod', title: 'Ürünler — FOLGAN', desc: 'Bakım süreçlerini kayıt altına alan, ölçen ve yöneten bakım yönetim platformu.',
  body: phero({ uni: true, media: 'urunler', crumb: [['Ürünler']], label: '', title: 'Ürünler', lede: 'Sahada doğan ihtiyaçtan çıkan ürünlerimiz. Bakım, kayıt ve iş emri süreçlerini tek platformda toplayan FOLGAN ile başlıyoruz.'}) + folganPage,
})

/* ---------- Yaklaşımımız ---------- */
page({
  rel: 'yaklasimimiz', active: 'app', title: 'Yaklaşımımız', desc: 'Sahadan yönetime uzanan tek bir dijital akış.',
  body: phero({ uni: true, media: 'urunler', crumb: [['Yaklaşımımız']], label: '', title: 'Yaklaşımımız', lede: 'Sahadan yönetime uzanan tek bir dijital akış. Veriyi yalnızca göstermek için değil, operasyonun doğru zamanda harekete geçebilmesi için yapılandırıyoruz.'}) +
    [S.problem, S.approach, S.why, S.model].join('\n'),
})

const aboutPage = `
<section class="sec abp">
  <div class="wrap">
    <p class="label rv">Hakkımızda</p>
    <h2 class="huge huge--full rv">Üretim sahası ile yazılım dünyası arasında <i>köprü kuruyoruz.</i></h2>
    <div class="abp__cols">
      <p class="para rv">Barvion, sanayi işletmelerinin bakım, üretim ve operasyon süreçlerini dijitalleştirmek amacıyla kurulmuş bir yazılım ve teknoloji şirketidir. Saha deneyimini modern yazılım geliştirme, veri analizi ve endüstriyel entegrasyon yetkinlikleriyle bir araya getirir.</p>
      <p class="para rv">Amacımız işletmelere yalnızca yeni ekranlar sunmak değil; verinin doğru toplanmasını, güvenilir şekilde saklanmasını ve karar süreçlerinde aktif olarak kullanılmasını sağlamaktır.</p>
    </div>
    <blockquote class="rv">Bakım, üretim ve operasyon süreçlerini; saha verileri, özel yazılımlar, veri analizi ve endüstriyel entegrasyonlarla tek bir dijital yapıda birleştiriyoruz.</blockquote>
    <div class="vmx">
      <div class="vmx__r rv"><h3>Vizyon</h3><p>Üretim işletmelerinin kendi verileriyle daha hızlı, daha kontrollü ve daha doğru karar alabildiği dijital sistemler geliştirmek.</p></div>
      <div class="vmx__r rv"><h3>Misyon</h3><p>Karmaşık saha süreçlerini sade, ölçülebilir ve sürdürülebilir yazılım çözümlerine dönüştürmek.</p></div>
    </div>
  </div>
</section>`
/* ---------- Hakkımızda ---------- */
page({
  rel: 'hakkimizda', active: 'about', title: 'Hakkımızda', desc: 'Üretim sahası ile yazılım dünyası arasında köprü kuruyoruz.',
  body: phero({ uni: true, media: 'urunler', crumb: [['Hakkımızda']], label: '', title: 'Hakkımızda', lede: 'Üretim sahası ile yazılım dünyası arasında köprü kuruyoruz. Saha deneyimini yazılım, veri analizi ve endüstriyel entegrasyonla bir araya getiriyoruz.'}) +
    [aboutPage, WHO, areasHtml].join('\n'),
})

/* ---------- İletişim ---------- */
page({
  rel: 'iletisim', active: 'contact', title: 'İletişim', desc: 'Fabrikanızdaki süreci birlikte inceleyelim.',
  body: phero({ uni: true, media: 'urunler', crumb: [['İletişim']], label: '', title: 'İletişim', lede: 'Bakım, üretim, veri toplama veya özel yazılım ihtiyacınızı anlatın.'}) + AFTER,
})
/* ---------- Yasal sayfalar (YER TUTUCU: hukuki metin sağlanmadı) ---------- */
const LEGAL = [['kvkk', 'KVKK Aydınlatma Metni'], ['gizlilik', 'Gizlilik Politikası'], ['cerez-politikasi', 'Çerez Politikası']]
LEGAL.forEach(([slug, title]) => page({
  rel: slug, active: '', title, desc: title,
  body: phero({ media: '', short: true, crumb: [[title]], label: '', title }) + `
<section class="sec legal"><div class="wrap"><div class="legal__box rv"><p class="label">Yer tutucu</p><h2 class="huge">Bu metin yakında <i>yayında.</i></h2>
<p class="para">[HUKUKİ METİN BURAYA EKLENECEK] — ${title} metni hukuk danışmanınız tarafından hazırlandıktan sonra bu alana eklenmelidir. Sorularınız için <a href="mailto:baran@barviongroup.com">baran@barviongroup.com</a> adresine yazabilirsiniz.</p></div></div></section>`,
}))

/* ---------- Reklam ve Marka / Web Sitesi: kendi sayfaları ---------- */

const SECT = [
  { k: 'Sağlık', u: 'klinik-ornek.com', br: '#1F8A8A', ac: '#7FE0D0', sf: '#10303A', h: 'Randevunuzu iki dokunuşta alın.', cta: 'Randevu al', c: ['Poliklinikler', 'Doktorlarımız', 'Online randevu'], d: 'Randevu odaklı, güven veren sade yapı.', fw: 500 },
  { k: 'Restoran', u: 'restoran-ornek.com', br: '#B5532A', ac: '#F5B945', sf: '#2E1A12', h: 'Masanızı ayırtın, menüyü keşfedin.', cta: 'Rezervasyon', c: ['Menü', 'Şefin önerisi', 'Rezervasyon'], d: 'Menü ve rezervasyon tek akışta.', fw: 600 },
  { k: 'E-ticaret', u: 'magaza-ornek.com', br: '#6B4BD8', ac: '#FF8AD8', sf: '#1B1640', h: 'Aradığınızı bulun, güvenle sipariş verin.', cta: 'Alışverişe başla', c: ['Yeni gelenler', 'Çok satanlar', 'Kampanyalar'], d: 'Hızlı arama ve kısa ödeme adımları.', fw: 500 },
  { k: 'Hukuk', u: 'hukuk-ornek.com', br: '#2B3A67', ac: '#C9A24A', sf: '#141B30', h: 'Hukuki sürecinizde yanınızdayız.', cta: 'Görüşme talep et', c: ['Çalışma alanları', 'Ekibimiz', 'Makaleler'], d: 'Ağırbaşlı, güven veren ve okunur yapı.', fw: 400 },
  { k: 'Emlak', u: 'emlak-ornek.com', br: '#2E7D5B', ac: '#A8E063', sf: '#0F2A22', h: 'Size uygun evi filtreyle bulun.', cta: 'İlanları gör', c: ['Satılık', 'Kiralık', 'Değerleme'], d: 'Filtre ve harita odaklı ilan sayfaları.', fw: 500 },
  { k: 'Spor', u: 'spor-ornek.com', br: '#D9402B', ac: '#FFD24A', sf: '#2A1210', h: 'İlk dersinizi bugün planlayın.', cta: 'Ücretsiz deneme', c: ['Programlar', 'Antrenörler', 'Ders takvimi'], d: 'Enerjik, üyelik formuna yönlendiren yapı.', fw: 700 },
  { k: 'Üretim', u: 'uretim-ornek.com', br: '#1E4FD0', ac: '#9BD3F5', sf: '#0B2347', h: 'Ürünlerimizi inceleyin, teklif isteyin.', cta: 'Teklif iste', c: ['Ürünler', 'Kapasite', 'Sertifikalar'], d: 'Katalog ve teklif talebi odaklı kurumsal site.', fw: 500 },
]
const mockSite = (s) => `<div class="mb"><div class="mb__bar"><i></i><i></i><i></i><span>${s.u}</span></div><div class="mb__pg"><div class="mb__hero"><small>${s.k}</small><b>${s.h}</b><u>${s.cta}</u></div><div class="mb__cards">${s.c.map((x) => `<div><i></i><b>${x}</b></div>`).join('')}</div><div class="mb__row"><span></span><span></span><span></span></div><div class="mb__row mb__row--b"><span></span><span></span></div></div></div>`
const mockBrand = (s) => `<div class="bd"><div class="bd__pal">${[s.sf, s.br, s.ac, '#F2F4F6'].map((c) => `<i style="background:${c}"><b>${c}</b></i>`).join('')}</div><div class="bd__row"><div class="bd__type" style="font-weight:${s.fw}">Aa<small>Başlık · Metin</small></div><div class="bd__card"><small>Marka Adı</small><b>Ad Soyad</b><span>Görev · ${s.k}</span></div></div><div class="bd__web"><i></i><i></i><i></i><u></u></div></div>`
const sectorRail = (slug) => {
  const brand = slug === 'reklam-ve-marka-danismanligi'
  const cards = SECT.map((s) => `<article class="srail__c" style="--br:${s.br};--ac:${s.ac};--sf:${s.sf}">${brand ? mockBrand(s) : mockSite(s)}<h3>${s.k}</h3><p>${s.d}</p></article>`).join('')
  return `<div class="srail rv" aria-label="${brand ? 'Sektöre göre marka kimliği örnekleri' : 'Sektöre göre örnek web siteleri'}"><div class="srail__t">${cards}${cards}</div></div><p class="wrap note-s">${brand ? 'Örnek kimlik panolarıdır; gerçek bir müşteriyi göstermez.' : 'Örnek tasarımlardır; gerçek bir müşteri sitesi değildir.'}</p>`
}

const SVCROWS = {
  'reklam-ve-marka-danismanligi': [
    ['Logo ve kurumsal kimlik', 'Logo yalnızca sistemin en görünür parçasıdır. Asıl iş; rengin, yazı tipinin ve konuşma tonunun her yerde aynı kalmasını sağlayan kuralları kurmaktır. Strateji ve konumlandırmayla başlar, logo ve varyasyonlarıyla devam eder, marka kılavuzuyla biter.', ['Strateji ve konumlandırma', 'Logo, renk paleti ve tipografi sistemi', 'Marka kılavuzu ve kaynak dosyalar']],
    ['Sosyal medya', 'Sosyal medyada kimse sizi aramıyor, akışı kaydırıyor. Hesaplarınızın görsel dilini markanızla uyumlu kurar, içerik takvimini planlar ve paylaşımları aynı kimlik sisteminden üretiriz.', ['Hesap tasarımı ve içerik şablonları', 'İçerik takvimi', 'Dikey video ve görsel üretimi']],
    ['Dijital reklam', 'Reklamın ilk iki saniyede dikkat çekmesi, doğru kişiye gösterilmesi ve tıklayanı sorunsuz bir sayfaya taşıması gerekir. Hedef kitle, kreatif ve ölçümü birlikte kurar, mesajları küçük bütçelerle test ederiz.', ['Hedef kitle ve mesaj stratejisi', 'Platforma özel kreatifler', 'Dönüşüm ölçümü ve raporlama']],
    ['SEO', 'Potansiyel müşterileriniz sizi aramıyor, ihtiyaçlarını arıyor. SEO, bu aramaların sonuçlarında doğru mesajla ve hızlı açılan sayfanızın görünmesini sağlar. Teknik altyapıyı ve içeriği birlikte ele alırız. Sıralama garantisi vermeyiz, kalıcı ve ölçülebilir görünürlük hedefleriz.', ['Teknik denetim ve sayfa optimizasyonu', 'Anahtar kelime ve içerik planı', 'Düzenli raporlama']],
    ['GEO: yapay zekâ aramaları', 'İnsanlar artık yalnızca arama yapmıyor, soru soruyor. Cevabı bazen bir sonuç listesi değil, yapay zekânın yazdığı birkaç cümle oluyor. GEO, markanızın bu cevaplarda doğru bilgiyle yer almasını hedefler; sitenizin kim olduğunuzu makinelerin de okuyabileceği biçimde anlatmasını sağlar.', ['Soruyu doğrudan yanıtlayan içerik', 'Yapılandırılmış veri ile kurum tanımı', 'Web genelinde tutarlı marka bilgisi']],
    ['Basılı ve fuar materyalleri', 'Kartvizit, katalog, sunum ve fuar standı aynı sistemden çıktığında marka her yerde tanınır. Dijitalde ve basılı ortamda tutarlı bir görünüm kurar, materyalleri baskıya hazır teslim ederiz.', ['Kartvizit ve kurumsal evrak', 'Katalog ve sunum şablonları', 'Fuar ve basılı uygulamalar']],
  ],
  'web-sitesi-tasarimi': [
    ['Logo ve kurumsal kimlik uyumu', 'Web sitesi, markanın en çok görülen yüzeyidir. Logo, renk ve yazı tipini siteye tek sistem olarak uygularız; kimlik henüz yoksa önce kimliği, ardından siteyi kurarız.', ['Kimliğe uygun tasarım sistemi', 'Logo ve renklerin siteye uygulanması', 'Marka kılavuzuna uyum']],
    ['SEO: aranan yerde görünmek', 'Siteyi kodladığımız için teknik SEO sonradan eklenen bir katman olmaz, altyapının parçasıdır. Sayfa yapısı, başlıklar, hız ve site haritası baştan doğru kurulur. Sıralama garantisi vermeyiz.', ['Hızlı ve taranabilir sayfa yapısı', 'Başlık, açıklama ve iç bağlantılar', 'Site haritası ve yönlendirmeler']],
    ['GEO: yapay zekâ aramalarında görünmek', 'Yapay zekâ cevap yazarken sitenizi okuyabilmesi gerekir. Kurumunuzu, hizmetlerinizi ve sorulara net yanıtlarınızı yapılandırılmış veriyle tanımlar, içeriği alıntılanabilir yazarız.', ['Yapılandırılmış veri', 'Soru-cevap odaklı içerik blokları', 'Tutarlı kurum bilgisi']],
    ['Sosyal medya bağlantısı', 'Sitenizi sosyal medya hesaplarınızla aynı dilde konuşturur, paylaşımlarınızın önizlemesini markanıza uygun tasarlarız. Reklam ve kampanya sayfalarını da aynı sistemde kurarız.', ['Paylaşım önizleme görselleri', 'Kampanya ve açılış sayfaları', 'Sosyal hesaplarla uyumlu görünüm']],
  ],
}
const svcRows = (slug) => { const r = SVCROWS[slug]; if (!r) return ''
  return `<section class="sec svcrows"><div class="wrap"><p class="label rv">Hizmet alanları</p><h2 class="huge rv" style="max-width:900px">Markayla ilgili <i>her şey</i> tek yerde</h2></div><div class="wrap ssteps">${r.map(([t, d, l], i) => `<article class="sstep ${i % 2 ? 'sstep--r' : ''} rv"><div class="sstep__fig"><span>${String(i + 1).padStart(2, '0')}</span>${stepIcon(slug, i)}</div><div class="sstep__t"><p class="label">Hizmet ${i + 1} / ${r.length}</p><h3>${t}</h3><p>${d}</p><ul>${l.map((x) => `<li>${x}</li>`).join('')}</ul></div></article>`).join('')}</div></section>` }
const SVC = {
  'reklam-ve-marka-danismanligi': {
    ex: EXTRA[0], vid: 'marka-sahne', scene: markaScene, label: 'Çözüm — Marka', color: '#2358D6',
    rows: [['Kimlik', 'Markanıza özel, şablonsuz', 'İşaret, renk ve yazı karakterini tek bir tasarım sistemi olarak kuruyoruz. Yeni bir materyal hazırlamak, kimliği baştan çizmek anlamına gelmiyor.', ['İşaret ve varyasyonları: renkli, tek renk, negatif', 'Renk paleti ve tipografi ölçeği', 'Marka kullanım kılavuzu']], ['Uygulama', 'Her yüzeyde aynı dil', 'Kartvizit, sunum, katalog, web ve sosyal medya görselleri aynı sistemden çıkar; böylece marka her yerde tanınır.', ['Kartvizit ve kurumsal evrak', 'Sunum ve katalog şablonları', 'Dijital reklam ve sosyal medya görselleri']]],
    title: 'Markanızı sahadaki gerçekle <i>aynı dilde</i> anlatın',
    lede: 'Kimliğinizi, mesajınızı ve görünürlüğünüzü tek bir çizgide topluyoruz. Sahada ne yapıyorsanız, masada ve ekranda da aynı güvenle anlatılsın.',
    head: 'Kimlikten yayına <i>tek çizgi.</i>',
    text: ['Üretim işletmelerinde iş çoğu zaman çok iyidir; ama anlatımı dağınıktır. Katalog bir dilde, web sitesi başka bir dilde, fuar standı bir başkasında konuşur.', 'Önce markanızı ve hedef kitlenizi anlıyor, sonra kimliği, mesajı ve uygulamaları aynı sistem içinde tasarlıyoruz. Böylece her materyal, bir öncekinin devamı olur.'],
    scope: ['Marka analizi ve konumlandırma', 'Logo ve kurumsal kimlik sistemi', 'Renk ve tipografi kılavuzu', 'Mesaj ve sunum dili', 'Kartvizit, katalog ve sunum tasarımı', 'Dijital reklam ve sosyal medya görselleri', 'Fuar ve basılı materyaller', 'Marka kullanım kılavuzu'],
    gain: [['Tutarlı görünüm', 'Web sitesinden kataloğa kadar her materyal aynı kimliği taşır.'], ['Net mesaj', 'Ne yaptığınız ve neden fark yarattığınız kısa ve anlaşılır biçimde söylenir.'], ['Kolay uygulama', 'Kılavuz sayesinde yeni bir materyal hazırlamak için sıfırdan başlamak gerekmez.']],
    steps: [['Keşif', 'Markanızı, sektörünüzü ve hedef kitlenizi dinleriz.'], ['Kimlik', 'İşaret, renk ve yazı karakterini tasarlarız.'], ['Mesaj', 'Anlatım dilini ve temel mesajları netleştiririz.'], ['Uygulama', 'Materyalleri aynı sistem içinde üretiriz.']],
  },
  'web-sitesi-tasarimi': {
    ex: EXTRA[1], vid: 'web-sahne', scene: webScene, label: 'Çözüm — Web', color: '#0E7490',
    rows: [['Tasarım', 'Markanıza özel, şablonsuz', 'Renk, tipografi ve bileşenleri tek bir tasarım sistemi olarak kuruyoruz. Yeni bir sayfa eklemek, siteyi baştan tasarlamak anlamına gelmiyor.', ['Masaüstü, tablet ve mobil için ayrı ayrı test', 'Erişilebilir kontrast ve klavye kullanımı', 'Marka dilinize uygun mikro animasyonlar']], ['Altyapı', 'Hızlı ve bakımı kolay', 'Sayfalar sade ve hafif kodlanır; gereksiz eklenti yüklenmez. Bu hem hız hem güvenlik demektir.', ['Görseller sıkıştırılmış, videolar gerektiğinde yüklenir', 'Arama motorları için yapılandırılmış veri ve site haritası', 'TR ve EN sayfaları birbirine doğru bağlı']]],
    title: 'Kurumsal duruşunuza uygun, <i>hızlı ve sade</i> web siteleri',
    lede: 'Planlamadan yayına kadar siteyi sizinle birlikte kuruyoruz. Her sayfa mobilde de masaüstünde de rahat okunur, hızlı açılır ve arama motorlarına uygun hazırlanır.',
    head: 'Plandan yayına <i>tek akış.</i>',
    text: ['Bir kurumsal web sitesi yalnızca güzel görünmemeli; ziyaretçinin aradığını hızlıca bulmasını ve size ulaşmasını sağlamalı.', 'Sayfa yapısını önce planlıyor, sonra tasarlıyor ve kodluyoruz. Yayından önce farklı cihazlarda ve hız ile erişilebilirlik açısından test ediyoruz.'],
    scope: ['Kurumsal web sitesi tasarımı', 'Mobil uyumlu, hızlı sayfalar', 'İçerik yapısı ve arama motoru uyumu', 'Çok dilli yapı (TR / EN)', 'İletişim ve teklif formları', 'Ürün ve çözüm tanıtım sayfaları', 'İçerik güncelleme paneli', 'Yayın sonrası bakım ve destek'],
    gain: [['Hızlı açılış', 'Sade ve hafif sayfalar, ziyaretçiyi bekletmez.'], ['Her cihazda rahat', 'Telefon, tablet ve bilgisayarda aynı kalitede görünür.'], ['Kolay güncelleme', 'İçeriği kendi ekibiniz, kod yazmadan değiştirebilir.']],
    steps: [['Planlama', 'Sayfa yapısını ve içeriği birlikte belirleriz.'], ['Tasarım', 'Kimliğinize uygun arayüzü hazırlarız.'], ['Kodlama ve test', 'Siteyi kodlar, cihazlarda test ederiz.'], ['Yayın', 'Yayına alır, sonrasında destek veririz.']],
  },
}
Object.entries(SVC).forEach(([slug, v]) => {
  const form = v.ex.form
  const others = [...SOL, ...EXTRA].filter((x) => x !== v.ex).map((x) => `<a href="${solUrl(x)}" class="ot rv" style="--c:${x.color}">${x.img ? `<span class="ot__img" style="background-image:url(/img/pages/${x.img}.jpg)"></span>` : ''}<span class="ot__tint"></span><span class="ot__top"><b>${x.n}</b><em>${x.tag}</em></span><span class="ot__t">${x.title}</span></a>`).join('')
  page({
    rel: `cozumler/${slug}`, active: 'sol', title: v.ex.title, desc: v.ex.lede,
    body: phero({ sol: true, flip: slug === 'web-sitesi-tasarimi', media: slug === 'web-sitesi-tasarimi' ? 'hero-insa' : 'hero-toplar', color: v.color, crumb: [['Çözümler', URL.sol], [v.ex.title]], label: v.label, title: v.title, lede: v.lede, actions: `<a class="btn btn--white" href="${URL.contact}?cozum=${encodeURIComponent(form)}">Görüşme Talep Et ${ARW}</a><a class="btn btn--ghost" href="#tema-laboratuvari">Kimlik setlerini gör</a>` }) + brandThemes('tr') + `
<section class="sec sol-intro" style="--c:${v.color}">
  <div class="wrap two">
    <div><p class="label rv">Nasıl çalışır</p><h2 class="huge rv">${v.head}</h2></div>
    <div>${v.text.map((t) => `<p class="para rv">${t}</p>`).join('')}</div>
  </div>
  ${sectorRail(slug)}
</section>
${svcRows(slug)}
<section class="sec chg" style="--c:${v.color}">
  <div class="wrap">
    <p class="label rv">Neler kazanırsınız</p>
    <div class="chg3">${v.gain.map(([t, d], k) => `<div class="rv"><b>${String(k + 1).padStart(2, '0')}</b><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </div>
</section>
<section class="sec dark sol-scope" style="--c:${v.color}">
  <div class="wrap">
    <p class="label light rv">Kapsam</p>
    <div class="two"><h2 class="huge rv">${v.ex.title} <i>kapsamında</i></h2><span></span></div>
    <div class="scope-wrap"><ol class="scope">${v.scope.map((x, k) => `<li class="rv"><span class="sn">${String(k + 1).padStart(2, '0')}</span><h3>${x}</h3></li>`).join('')}</ol></div>
  </div>
</section>
<section class="sec wsteps">
  <div class="wrap">
    <p class="label rv">Çalışma biçimi</p>
    <ol class="wst">${v.steps.map(([t, d], k) => `<li class="rv"><b>${String(k + 1).padStart(2, '0')}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
    <p class="rv" style="margin-top:44px"><a class="btn btn--blue" href="${URL.contact}?cozum=${encodeURIComponent(form)}">${v.ex.title} için görüşelim ${ARW}</a></p>
  </div>
</section>
<section class="sec others" style="--c:${v.color}">
  <div class="wrap"><p class="label rv">Diğer çözümler</p><div class="orail">${others}</div></div>
</section>`,
  })
})

console.log('Sayfalar üretildi.')
