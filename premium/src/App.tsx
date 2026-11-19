import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import SceneStage from "./SceneStage";

const modes = [
  {
    id: "observe",
    label: "İzle",
    accent: "#ff9f45",
    title: "Sinyali gürültüden ayırır.",
    copy: "Titreşim, sıcaklık ve akım verilerini tek bir davranış akışında birleştiren temsili izleme modu.",
    stat: "24/7",
  },
  {
    id: "predict",
    label: "Öngör",
    accent: "#9fd8c4",
    title: "Sapmayı erken görünür kılar.",
    copy: "Eşik yerine örüntüye odaklanan temsili analiz katmanı, bakım ekiplerine anlaşılır bir öncelik sırası sunar.",
    stat: "03 katman",
  },
  {
    id: "protect",
    label: "Koru",
    accent: "#b4c7ff",
    title: "Kararı sahaya taşır.",
    copy: "Kritik değişimleri bağlama göre sınıflandıran temsili karar akışı; gerçek bir ürün iddiası değildir.",
    stat: "< 1 sn",
  },
] as const;

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function App() {
  const [modeIndex, setModeIndex] = useState(0);
  const reduceMotion = Boolean(useReducedMotion());
  const activeMode = modes[modeIndex];
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Barvion Concept Lab ana sayfa">
          <span className="brand-mark" aria-hidden="true"><i /><i /></span>
          <span>BARVION</span>
          <small>CONCEPT LAB</small>
        </a>
        <nav aria-label="Ana navigasyon">
          <a href="#product">Ürün</a>
          <a href="#system">Sistem</a>
          <a href="#details">Detaylar</a>
        </nav>
        <a className="nav-cta" href="#contact">Demo iste <Arrow /></a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <motion.div
            className="hero-copy"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={reveal}
            transition={transition}
          >
            <p className="eyebrow"><span /> Endüstriyel zeka · Konsept 01</p>
            <h1>Veriyi değil,<br /><em>davranışı</em> görün.</h1>
            <p className="hero-lede">
              NEXUS·01, üretim ekiplerinin makine davranışını daha erken okumasını anlatan kurgusal bir ürün deneyimidir.
            </p>
            <div className="hero-actions">
              <a className="button button--light" href="#product">Deneyimi keşfet <Arrow /></a>
              <span>React · R3F · Motion</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.15 }}
          >
            <SceneStage accent={activeMode.accent} reduceMotion={reduceMotion} />
          </motion.div>

          <div className="hero-meta">
            <span>Fictional edge sensor</span>
            <span>WebGL / Static fallback</span>
            <span>2026 · Istanbul</span>
          </div>
        </section>

        <section className="manifesto" id="product">
          <motion.p
            className="section-index"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={reveal}
            transition={transition}
          >01 — Yaklaşım</motion.p>
          <div className="manifesto-layout">
            <motion.h2
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={reveal}
              transition={transition}
            >
              Bir makine arızalanmadan önce, <em>ritmi değişir.</em>
            </motion.h2>
            <div className="manifesto-copy">
              <p>
                Bu örnek, güçlü tipografi ile ölçülü bir 3D deneyimin aynı hikâyeyi nasıl taşıyabileceğini gösterir.
                NEXUS·01 gerçek bir ticari ürün değil; web üzerinde ışık, malzeme ve etkileşim kalitesini doğrulamak için tasarlanmış geometrik bir demodur.
              </p>
              <a href="#system">Sistemi incele <Arrow /></a>
            </div>
          </div>
          <div className="signal-line" aria-hidden="true">
            {Array.from({ length: 38 }, (_, i) => <i key={i} style={{ height: `${12 + ((i * 17) % 46)}px` }} />)}
          </div>
        </section>

        <section className="system-section" id="system">
          <div className="system-heading">
            <p className="section-index section-index--light">02 — Etkileşim</p>
            <h2>Tek gövde.<br />Üç okuma biçimi.</h2>
          </div>
          <div className="mode-panel">
            <div className="mode-tabs" role="tablist" aria-label="Ürün modları">
              {modes.map((mode, index) => (
                <button
                  key={mode.id}
                  className={modeIndex === index ? "is-active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={modeIndex === index}
                  aria-controls="mode-description"
                  onClick={() => setModeIndex(index)}
                >
                  <span>0{index + 1}</span>{mode.label}
                </button>
              ))}
            </div>
            <motion.div
              className="mode-copy"
              id="mode-description"
              role="tabpanel"
              key={activeMode.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <strong style={{ color: activeMode.accent }}>{activeMode.stat}</strong>
              <h3>{activeMode.title}</h3>
              <p>{activeMode.copy}</p>
            </motion.div>
            <div className="mode-orbit" style={{ "--mode-accent": activeMode.accent } as React.CSSProperties} aria-hidden="true">
              <i /><i /><i /><span />
            </div>
          </div>
        </section>

        <section className="details" id="details">
          <p className="section-index">03 — Yapı</p>
          <div className="details-head">
            <h2>Malzeme hissi,<br />performans disiplini.</h2>
            <p>Sahne; düşük poligonlu prosedürel geometri, sıkıştırılmış tek bir yedek görsel ve sınırlı piksel oranıyla web için tasarlandı.</p>
          </div>
          <div className="detail-grid">
            {[
              ["01", "Grafit çerçeve", "Mat ve fırçalanmış yüzeylerin dengesi, ışığın formu tanımlamasına izin verir."],
              ["02", "Füme çekirdek", "Şeffaflık katmanı iç yapıyı ima eder; görsel karmaşayı büyütmez."],
              ["03", "Tek vurgu", "Durum rengi seçilen moda göre değişir ve aynı anda yalnızca bir odak üretir."],
            ].map(([number, title, copy]) => (
              <motion.article
                key={number}
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={reveal}
                transition={transition}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <p className="eyebrow"><span /> Barvion Concept Lab</p>
          <h2>Bir ürünü sadece göstermeyin.<br /><em>Hissettirin.</em></h2>
          <a className="button button--dark" href="#product">Deneyimi yeniden izle <Arrow /></a>
          <p className="contact-note">Bu sayfa teknik ve görsel doğrulama amacıyla hazırlanmış çalışan bir örnektir.</p>
        </section>
      </main>

      <footer>
        <a className="brand brand--footer" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /></span><span>BARVION</span></a>
        <p>NEXUS·01 / Geometrik ürün demosu</p>
        <p>© 2026 Barvion Concept Lab</p>
      </footer>
    </div>
  );
}
