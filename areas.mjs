// Uygulama alanları: antrasit duvarlı, hareketli (motion) vektör sahneler. Çalışanlar işini yapar; fotoğraf yok.
const SKIN = '#C49A7C'
const dur = (s) => `${s}s`
const anim = (type, vals, kt, d, begin = 0, extra = '') => `<animateTransform attributeName="transform" type="${type}" values="${vals}" ${kt ? `keyTimes="${kt}"` : ''} dur="${dur(d)}" begin="${begin}s" repeatCount="indefinite" ${extra}/>`
const oanim = (vals, kt, d, extra = '') => `<animate attributeName="opacity" values="${vals}" keyTimes="${kt}" dur="${dur(d)}" repeatCount="indefinite" ${extra}/>`

/* ---- zemin / duvar ---- */
const FRAMES = () => {
  const f = (x, y, w, h, inner, round) => `<g transform="translate(${x},${y})"><rect x="-6" y="-6" width="${w + 12}" height="${h + 12}" rx="${round ? (w + 12) / 2 : 3}" fill="#1B1E24"/><rect width="${w}" height="${h}" rx="${round ? w / 2 : 2}" fill="#0F2D57"/><clipPath id="fc${x}"><rect width="${w}" height="${h}" rx="${round ? w / 2 : 2}"/></clipPath><g clip-path="url(#fc${x})">${inner}</g></g>`
  return f(120, 70, 112, 78, `<rect width="112" height="78" fill="#1E5AA8"/><circle cx="40" cy="40" r="26" fill="#57C9E9" opacity=".85"/><circle cx="72" cy="40" r="26" fill="#0B2347" opacity=".7"/>`)
    + f(352, 66, 92, 92, `<circle cx="46" cy="46" r="46" fill="#2F7FBF"/><circle cx="46" cy="46" r="30" fill="#57C9E9"/><circle cx="46" cy="46" r="14" fill="#0B2347"/>`, true)
    + f(584, 70, 112, 78, `<rect width="112" height="78" fill="#0B2347"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${10 + i * 20}" y="${70 - (16 + i * 11)}" width="14" height="${16 + i * 11}" fill="${['#2F7FBF', '#57C9E9'][i % 2]}"/>`).join('')}`)
}
const BG = (extra = '') => `<defs>
  <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4C515C"/><stop offset="1" stop-color="#363A43"/></linearGradient>
  <linearGradient id="flr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2B2F37"/><stop offset="1" stop-color="#1D2026"/></linearGradient>
  <radialGradient id="lamp"><stop offset="0" stop-color="#FFF1CF" stop-opacity=".5"/><stop offset="1" stop-color="#FFF1CF" stop-opacity="0"/></radialGradient>
  <linearGradient id="swp" x1="0" x2="1"><stop offset="0" stop-color="#C6DAFF" stop-opacity="0"/><stop offset=".5" stop-color="#C6DAFF" stop-opacity=".09"/><stop offset="1" stop-color="#C6DAFF" stop-opacity="0"/></linearGradient>
  <radialGradient id="vig" cx=".5" cy=".5" r=".8"><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></radialGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4E8EF"/><stop offset=".6" stop-color="#B9C0CC"/><stop offset="1" stop-color="#8A93A3"/></linearGradient>
  <linearGradient id="metalD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A93A3"/><stop offset="1" stop-color="#555D6C"/></linearGradient>
  <linearGradient id="og" x1="0" x2="1"><stop offset="0" stop-color="#C95F0E"/><stop offset=".45" stop-color="#F59A3C"/><stop offset="1" stop-color="#D4690F"/></linearGradient>
  <linearGradient id="navyG" x1="0" x2="1"><stop offset="0" stop-color="#22344F"/><stop offset=".5" stop-color="#34496B"/><stop offset="1" stop-color="#22344F"/></linearGradient>
  <linearGradient id="coatG" x1="0" x2="1"><stop offset="0" stop-color="#C9CFDA"/><stop offset=".5" stop-color="#F2F4F8"/><stop offset="1" stop-color="#C9CFDA"/></linearGradient>
  <linearGradient id="vestG" x1="0" x2="1"><stop offset="0" stop-color="#C75A10"/><stop offset=".5" stop-color="#FF8A2B"/><stop offset="1" stop-color="#C75A10"/></linearGradient>
  <radialGradient id="helm" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#C5CBD6"/></radialGradient>
</defs>
<rect width="800" height="600" fill="url(#wall)"/>${[1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${i * 100 - 2}" y="0" width="4" height="470" fill="#2A2D34" opacity=".55"/>`).join('')}
${FRAMES()}
<rect y="446" width="800" height="24" fill="#2D3139"/><rect y="470" width="800" height="130" fill="url(#flr)"/><line x1="0" x2="800" y1="470" y2="470" stroke="#555B68" stroke-width="2"/>
${[0, 1, 2, 3].map((i) => `<line x1="0" x2="800" y1="${492 + i * 28}" y2="${492 + i * 28}" stroke="#2A2E36" stroke-width="1"/>`).join('')}${extra}`
const FG = () => `<rect x="-300" y="0" width="300" height="600" fill="url(#swp)"><animateTransform attributeName="transform" type="translate" values="0 0;1100 0" dur="9s" repeatCount="indefinite"/></rect><rect width="800" height="600" fill="url(#vig)"/><rect x="1.5" y="1.5" width="797" height="597" fill="none" stroke="#0E1014" stroke-width="3"/>`

/* ---- ayakta çalışan: kollar a1 (ön), a2 (arka) ---- */
const armG = (a, sleeve, x, glove) => {
  if (!a) a = { v: '4' }
  const animated = String(a.v).includes(';')
  const st = animated ? '' : ` transform="rotate(${a.v})"`
  return `<g transform="translate(${x},-74)"><g${st}>${animated ? anim('rotate', a.v, a.kt, a.d || 1) : ''}
    <path d="M-5.5 -3 Q0 -6 5.5 -3 L5 22 L-5 22z" fill="${sleeve}"/><path d="M-5 20 L5 20 L4.5 32 Q0 34 -4.5 32z" fill="${sleeve}" opacity=".92"/>
    <rect x="-4.6" y="30" width="9.2" height="7" rx="3" fill="${glove}"/>${a.item || ''}</g></g>`
}
const CLIP = `<g transform="translate(2,30) rotate(-6)"><rect x="-2" y="-4" width="24" height="32" rx="2" fill="#F1F3F7"/><rect x="5" y="-7" width="10" height="6" rx="1.5" fill="#5B6472"/><path d="M3 6h16M3 12h16M3 18h11" stroke="#8D96A6" stroke-width="1.4"/></g>`
const W = (x, y, o = {}) => {
  const { side = 1, a1, a2, coat = false, d = 0 } = o
  const shirt = coat ? 'url(#coatG)' : 'url(#navyG)', sleeve = coat ? '#E3E7EE' : '#2B3B58', dark = coat ? '#C0C7D3' : '#1E2B44', glove = coat ? '#6EA8E0' : '#3C424D'
  return `<g transform="translate(${x},${y}) scale(${side},1)">
  <ellipse cx="0" cy="2" rx="25" ry="5" fill="rgba(0,0,0,.4)"/>
  ${armG(a2, dark, -4, glove)}
  <g>${anim('translate', '0 0;0 -1.4;0 0', '0;.5;1', 2.8, d)}
  <path d="M-10.5 -40 L-9.5 -6 L-0.5 -6 L0 -40z" fill="#202737"/><path d="M0.5 -40 L1 -6 L10 -6 L11 -40z" fill="#262E40"/>
  <path d="M-12 -6 h13 a2.5 2.5 0 0 1 2.5 2.5 v3.5 h-17z" fill="#0E1015"/><path d="M0 -6 h13 q4 0 4 3 v3 h-17z" fill="#14171E"/>
  <path d="M-13 -42 Q0 -38 13 -42 L13.5 -34 Q0 -30 -13.5 -34z" fill="${coat ? '#D7DCE5' : '#1A2132'}"/>
  <path d="M-15 -78 Q-15 -83 -10 -83 L10 -83 Q15 -83 15 -78 L13.5 -36 Q0 -32 -13.5 -36z" fill="${shirt}"/>
  ${coat ? `<path d="M0 -83 L0 -36" stroke="#B5BDCA" stroke-width="1"/>` : `<path d="M-15 -78 Q-15 -83 -10 -83 L-5 -83 L0 -70 L5 -83 L10 -83 Q15 -83 15 -78 L13.5 -38 Q0 -34 -13.5 -38z" fill="url(#vestG)"/><rect x="-14" y="-62" width="28" height="4.5" fill="#E9ECF2" opacity=".92"/><rect x="-14" y="-50" width="28" height="4.5" fill="#E9ECF2" opacity=".92"/><path d="M-5 -83 L0 -70 L5 -83" fill="none" stroke="#1E2B44" stroke-width="1.2"/>`}
  ${armG(a1, sleeve, 11, glove)}
  <rect x="-4" y="-88" width="8" height="7" rx="2" fill="#B58B6E"/>
  <ellipse cx="0" cy="-95" rx="9.5" ry="11.5" fill="#CDA384"/><path d="M9 -96 Q13.5 -93 9.5 -90z" fill="#CDA384"/><ellipse cx="-7" cy="-94" rx="2" ry="3" fill="#B58B6E"/>
  <path d="M-1 -97 L6 -97" stroke="#2A2E38" stroke-width="1.6" stroke-linecap="round"/><circle cx="3" cy="-95" r="1.1" fill="#1B1D22"/>
  <path d="M-12 -97 Q-12 -111 0 -111 Q12 -111 12 -97 L12 -96 L-12 -96z" fill="${coat ? '#EAF4FF' : 'url(#helm)'}"/><rect x="-13.5" y="-98" width="27" height="3.5" rx="1.5" fill="${coat ? '#BFD6EE' : '#C3CAD6'}"/><rect x="-1.5" y="-111" width="3" height="13" fill="#000" opacity=".08"/>
  </g></g>`
}

/* ---- ortak parçalar ---- */
const belt = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="16" rx="3" fill="#0E1015"/><rect x="${x}" y="${y}" width="${w}" height="3" fill="#4A515E"/><line x1="${x + 6}" x2="${x + w - 6}" y1="${y + 9}" y2="${y + 9}" stroke="#3B414D" stroke-width="3" stroke-dasharray="2 18"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.1s" repeatCount="indefinite"/></line><rect x="${x + 30}" y="${y + 16}" width="10" height="${446 - y}" fill="#3A404B"/><rect x="${x + w - 40}" y="${y + 16}" width="10" height="${446 - y}" fill="#3A404B"/>`
const painting = (x, y, w, h, art) => `<g transform="translate(${x},${y})"><rect x="-6" y="-6" width="${w + 12}" height="${h + 12}" fill="#0F1115"/><rect width="${w}" height="${h}" fill="#0B2347"/>${art(w, h)}<rect width="${w}" height="${h}" fill="none" stroke="#8A8F99" stroke-width="1.5"/></g>`
const ART = [
  (w, h) => `<circle cx="${w * .38}" cy="${h * .5}" r="${h * .3}" fill="#2F7FBF"/><circle cx="${w * .62}" cy="${h * .5}" r="${h * .3}" fill="#57C9E9" opacity=".8"/>`,
  (w, h) => `<path d="M0 ${h}L${w * .35} ${h * .3}L${w * .6} ${h * .7}L${w * .8} ${h * .4}L${w} ${h}z" fill="#2F7FBF"/><circle cx="${w * .78}" cy="${h * .2}" r="${h * .1}" fill="#57C9E9"/>`,
  (w, h) => `${[0, 1, 2, 3, 4].map((i) => `<rect x="${i * w / 5}" y="${h - (30 + i * 12)}" width="${w / 5 - 4}" height="${30 + i * 12}" fill="${i % 2 ? '#57C9E9' : '#2F7FBF'}"/>`).join('')}`,
]
const lampG = (x, y) => `<g transform="translate(${x},${y})"><line x1="0" x2="0" y1="-26" y2="0" stroke="#3A3F49" stroke-width="2"/><path d="M-22 14a22 14 0 0 1 44 0z" fill="#3E434E"/><ellipse cy="14" rx="22" ry="3" fill="#FFE7B8"/><ellipse cy="110" rx="130" ry="150" fill="url(#lamp)"/></g>`

/* ============ TEKSTİL: oturan dikişçiler ============ */
const sewer = (x, body, fabric, d) => `<g transform="translate(${x},470)">
  <rect x="-34" y="-92" width="6" height="46" rx="3" fill="#3A3F4A"/><rect x="-32" y="-48" width="38" height="8" rx="3" fill="#434956"/><rect x="-14" y="-40" width="4" height="40" fill="#2E323B"/><rect x="-30" y="-4" width="34" height="4" rx="2" fill="#2E323B"/>
  <rect x="8" y="-48" width="11" height="48" rx="4" fill="#161B28"/><rect x="8" y="-5" width="20" height="5" rx="2" fill="#0C0E13"/>
  <rect x="-20" y="-56" width="38" height="14" rx="6" fill="#161B28"/>
  <g transform="rotate(7 -6 -50)"><rect x="-20" y="-112" width="28" height="64" rx="10" fill="${body}"/><rect x="-20" y="-112" width="28" height="64" rx="10" fill="#D9691A" opacity=".0"/></g>
  <circle cx="2" cy="-124" r="11" fill="${SKIN}"/><path d="M-9 -127a12 12 0 0 1 22-3l-3 8z" fill="#1B1511"/>
  <rect x="-6" y="-70" width="176" height="8" rx="2" fill="#5B5148"/><rect x="0" y="-62" width="6" height="62" fill="#3A3F4A"/><rect x="156" y="-62" width="6" height="62" fill="#3A3F4A"/>
  <rect x="34" y="-82" width="98" height="12" rx="2" fill="#C5CAD4"/><rect x="112" y="-126" width="20" height="46" rx="6" fill="#DDE0E7"/><rect x="48" y="-126" width="84" height="18" rx="7" fill="#DDE0E7"/><rect x="50" y="-120" width="40" height="4" fill="#2F7FBF"/>
  <circle cx="122" cy="-134" r="7" fill="#8A93A5"/>
  <rect x="26" y="-84" width="70" height="4" fill="${fabric}"/><rect x="-6" y="-80" width="40" height="10" fill="${fabric}" opacity=".85"/>
  <line x1="54" x2="54" y1="-110" y2="-84" stroke="#EEF1F6" stroke-width="2"><animate attributeName="y2" values="-84;-93;-84" dur=".32s" repeatCount="indefinite"/></line>
  <line x1="30" x2="90" y1="-84" y2="-84" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-16" dur=".6s" repeatCount="indefinite"/></line>
  <path stroke="${body}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"><animate attributeName="d" values="M-2 -102 L14 -92 L38 -88;M-2 -102 L14 -93 L43 -89;M-2 -102 L14 -92 L38 -88" dur=".9s" begin="${d}s" repeatCount="indefinite"/></path>
  <circle r="4.5" fill="${SKIN}"><animate attributeName="cx" values="38;43;38" dur=".9s" begin="${d}s" repeatCount="indefinite"/><animate attributeName="cy" values="-88;-89;-88" dur=".9s" begin="${d}s" repeatCount="indefinite"/></circle></g>`

/* ============ GIDA: bant önünde duran çalışanlar, kolileri işler ============ */
const gida = () => {
  const D = 12, k = '0;.28;.32;.41;.45;.68;.72;.8;.85;1'
  const box = `<g><animateTransform attributeName="transform" type="translate" values="30 0;251 0;251 0;521 0;521 0;760 0" keyTimes="0;.28;.45;.68;.85;1" dur="${D}s" repeatCount="indefinite"/>
    <g><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -18;0 -18;0 0;0 0;0 -18;0 -18;0 0;0 0" keyTimes="${k}" dur="${D}s" repeatCount="indefinite"/>
    <rect x="0" y="378" width="52" height="38" rx="3"><animate attributeName="fill" calcMode="discrete" values="#A8814C;#C69B57;#D9AE63" keyTimes="0;.45;.85" dur="${D}s" repeatCount="indefinite"/></rect><rect x="0" y="378" width="52" height="8" rx="2" fill="#000" opacity=".15"/><rect x="14" y="392" width="24" height="10" rx="1" fill="#EDEFF3" opacity=".9"><animate attributeName="opacity" calcMode="discrete" values="0;0;.9" keyTimes="0;.68;.85" dur="${D}s" repeatCount="indefinite"/></rect></g></g>`
  const stack = (x) => [0, 1].map((i) => `<rect x="${x + i * 30}" y="${i ? 394 : 394}" width="${28}" height="22" rx="2" fill="#B38A52"/>`).join('') + `<rect x="${x + 6}" y="372" width="28" height="22" rx="2" fill="#C29A5C"/>`
  const arm = (kt) => ({ v: `-8;-8;-88;-88;-8;-8`, kt, d: D })
  return `${BG()}${lampG(200, 120)}${lampG(560, 120)}
  <rect x="60" y="80" width="680" height="8" fill="#3A3F49"/>
  ${belt(70, 416, 670)}${stack(690)}
  ${box}
  ${W(230, 470, { coat: true, a1: arm('0;.26;.30;.43;.47;1') })}${W(500, 470, { coat: true, side: 1, a1: arm('0;.66;.70;.83;.87;1'), d: .4 })}`
}

/* robot kol: taban, omuz, iki bağlantı, bilek ve iki parmaklı kıskaç */
const robot = ({ x, y, l1 = 110, l2 = 100, a1, a2, k, D, held = '' }) => `<g transform="translate(${x},${y})">
  <ellipse cy="2" rx="62" ry="7" fill="rgba(0,0,0,.4)"/><rect x="-46" y="-16" width="92" height="16" rx="4" fill="#2F343E"/><rect x="-30" y="-50" width="60" height="36" rx="9" fill="url(#og)"/><rect x="-30" y="-24" width="60" height="4" fill="#2F343E" opacity=".5"/>
  <g transform="translate(0,-50)"><circle r="24" fill="#2F343E"/><circle r="15" fill="url(#og)"/>
  <g>${anim('rotate', a1, k, D)}
    <rect x="-13" y="${-l1}" width="26" height="${l1}" rx="13" fill="url(#og)" stroke="#8A3D06" stroke-opacity=".5"/><rect x="-6" y="${-l1 + 10}" width="4" height="${l1 - 20}" rx="2" fill="#fff" opacity=".28"/>
    <path d="M12 -10 C 30 ${-l1 / 2} 30 ${-l1 / 2} 12 ${-l1 + 14}" fill="none" stroke="#1B1E24" stroke-width="3"/>
    <g transform="translate(0,${-l1})"><circle r="17" fill="#2F343E"/><circle r="10" fill="url(#og)"/>
    <g>${anim('rotate', a2, k, D)}
      <rect x="-11" y="${-l2}" width="22" height="${l2}" rx="11" fill="url(#og)" stroke="#8A3D06" stroke-opacity=".5"/><rect x="-5" y="${-l2 + 10}" width="4" height="${l2 - 20}" rx="2" fill="#fff" opacity=".28"/>
      <g transform="translate(0,${-l2})"><circle r="12" fill="#2F343E"/><rect x="-14" y="-12" width="28" height="12" rx="3" fill="#3B414D"/>
        <rect x="-12" y="-36" width="6" height="26" rx="2" fill="#6B7383"><animate attributeName="x" values="-12;-9;-12" dur="2s" repeatCount="indefinite"/></rect><rect x="6" y="-36" width="6" height="26" rx="2" fill="#6B7383"><animate attributeName="x" values="6;3;6" dur="2s" repeatCount="indefinite"/></rect>${held}</g>
    </g></g></g></g></g>`

/* ============ MAKİNE: operatör makinenin önünde kodluyor; robot parçayı makineye yükler ============ */
const makine = () => {
  const D = 9, k = '0;.2;.32;.45;.7;.82;1'
  const part = `<rect x="-9" y="-62" width="18" height="22" rx="3" fill="#B5BCC8" stroke="#6E7686"/><rect x="-9" y="-56" width="18" height="3" fill="#6E7686"/>`
  return `${BG(lampG(330, 190) + lampG(600, 190))}
  <g transform="translate(240,0)">
    <rect x="90" y="250" width="320" height="220" rx="8" fill="url(#metal)"/><rect x="90" y="250" width="320" height="16" rx="6" fill="#F0F3F8"/><rect x="90" y="440" width="320" height="30" fill="#7A8393"/>
    <rect x="112" y="282" width="196" height="132" rx="5" fill="#10161F" stroke="#F2F4F8" stroke-width="4"/><rect x="120" y="290" width="180" height="116" fill="#233752"/><rect x="120" y="290" width="180" height="116" fill="#9CC8F5" opacity=".14"/>
    <rect x="198" y="300" width="14" height="60" fill="#C9CFDA"><animate attributeName="height" values="60;86;60" dur="2.6s" repeatCount="indefinite"/></rect><rect x="190" y="396" width="30" height="10" fill="#6B7385"/>
    <rect x="318" y="268" width="74" height="150" rx="6" fill="#171C26"/><rect x="326" y="276" width="58" height="40" rx="3" fill="#2F7FBF"><animate attributeName="opacity" values="1;.7;1" dur="2.4s" repeatCount="indefinite"/></rect>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<rect x="${328 + (i % 3) * 19}" y="${328 + Math.floor(i / 3) * 18}" width="14" height="11" rx="2" fill="#7B879E"/>`).join('')}
  </g>
  <rect x="20" y="430" width="100" height="40" rx="3" fill="#3C424D"/><rect x="26" y="436" width="88" height="6" fill="#2A2E36"/>
  <g><animate attributeName="opacity" calcMode="discrete" values="1;0;1" keyTimes="0;.32;.95" dur="${D}s" repeatCount="indefinite"/><rect x="51" y="408" width="18" height="22" rx="3" fill="#B5BCC8" stroke="#6E7686"/></g>
  ${robot({ x: 150, y: 470, a1: '10;-45;-45;10;55;55;10', a2: '50;225;225;50;35;35;50', k, D, held: `<g><animate attributeName="opacity" calcMode="discrete" values="0;1;0" keyTimes="0;.32;.82" dur="${D}s" repeatCount="indefinite"/>${part}</g>` })}
  <g transform="translate(548,470)"><rect x="-2" y="-84" width="4" height="84" fill="#3C424D"/><rect x="-22" y="-8" width="44" height="6" rx="2" fill="#3C424D"/>
    <g transform="translate(26,-84)"><path d="M0 0 L58 0 L64 -46 L6 -52z" fill="#10141C" stroke="#7C8596" stroke-width="2"/><rect x="2" y="2" width="58" height="9" rx="2" fill="#B9C0CC"/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${12 + (i % 2) * 6}" y="${-42 + i * 7.5}" width="${28 + (i * 9) % 20}" height="3" rx="1.5" fill="${['#57C9E9', '#9BE7A8', '#8FB4F5'][i % 3]}"><animate attributeName="opacity" values="0;1;1" keyTimes="0;${.1 + i * .15};1" dur="4s" repeatCount="indefinite"/></rect>`).join('')}</g></g>
  ${W(492, 470, { a1: { v: '-80;-72;-82;-70;-80', kt: '0;.25;.5;.75;1', d: .6 } })}`
}

/* ============ OTOMOTİV ============ */
const otomotiv = () => {
  const D = 12
  const car = `<g><animateTransform attributeName="transform" type="translate" values="-270 0;290 0;290 0;820 0" keyTimes="0;.3;.65;1" dur="${D}s" repeatCount="indefinite"/>
    <ellipse cx="125" cy="436" rx="130" ry="8" fill="rgba(0,0,0,.5)"/>
    <defs><linearGradient id="cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C7CCD4"/><stop offset=".5" stop-color="#8E959F"/><stop offset="1" stop-color="#5A6069"/></linearGradient></defs>
    <path d="M4 424 L4 396 Q4 386 16 384 L62 376 Q82 352 112 346 L168 346 Q196 350 214 372 L238 380 Q250 384 250 398 L250 424z" fill="url(#cb)"/>
    <path d="M78 374 Q92 356 114 354 L132 354 L132 374z" fill="#2E3A4C"/><path d="M140 354 L166 354 Q186 358 198 374 L140 374z" fill="#2E3A4C"/>
    <path d="M78 374 L198 374" stroke="#3B424D" stroke-width="2"/><rect x="236" y="390" width="14" height="6" rx="2" fill="#F3E6B0"/><rect x="4" y="392" width="10" height="6" rx="2" fill="#B33"/>
    <rect x="4" y="412" width="246" height="6" fill="#3A3F49"/>
    <circle cx="62" cy="424" r="21" fill="#14161B"/><circle cx="62" cy="424" r="11" fill="#9AA1AD"/><circle cx="196" cy="424" r="21" fill="#14161B"/><circle cx="196" cy="424" r="11" fill="#9AA1AD"/></g>`
  const weld = `${robot({ x: 430, y: 470, l1: 130, l2: 104, a1: '-25;-25;-12;-8;-12;-25;-25', a2: '40;40;172;176;172;40;40', k: '0;.28;.36;.5;.62;.7;1', D, held: `<g>${oanim('0;0;1;0;1;0;0', '0;.34;.37;.42;.5;.62;1', D)}<circle cy="-40" r="8" fill="#FFD15A"><animate attributeName="r" values="4;10;5;9" dur=".3s" repeatCount="indefinite"/></circle><circle cy="-40" r="16" fill="#FFB347" opacity=".35"/></g>` })}`
  const cab = `<rect x="112" y="378" width="58" height="92" rx="5" fill="#2B303B"/><rect x="118" y="386" width="46" height="30" rx="3" fill="#2F7FBF"><animate attributeName="opacity" values="1;.65;1" dur="2s" repeatCount="indefinite"/></rect>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${120 + (i % 3) * 15}" y="${424 + Math.floor(i / 3) * 14}" width="11" height="9" rx="2" fill="#6E7A91"/>`).join('')}`
  return `${BG()}${lampG(260, 110)}${lampG(560, 110)}
  ${belt(40, 430, 720)}
  ${weld}${car}${cab}
  ${W(98, 470, { a1: { v: '-82;-72;-82', kt: '0;.5;1', d: .7 } })}
  ${W(660, 470, { side: -1, a2: { v: '-60', item: CLIP }, a1: { v: '-8;-8;-76;-70;-77;-70;-77;-70;-8', kt: '0;.62;.67;.72;.77;.82;.87;.92;1', d: D, item: '' } , d: .3 })}`
}

/* ============ KLİMA HATTI: bant önünde not alan işçiler, tavanda gri robotlar ============ */
const acUnit = (x, y) => `<g transform="translate(${x},${y})"><rect width="96" height="70" rx="5" fill="#E3E6EB"/><rect y="62" width="96" height="8" rx="3" fill="#A9B0BC"/><circle cx="40" cy="34" r="25" fill="#2A2F39" stroke="#B6BCC8" stroke-width="3"/><g transform="translate(40,34)"><g>${anim('rotate', '0;360', null, 1.2)}${[0, 1, 2, 3].map((i) => `<ellipse rx="5" ry="11" cy="-11" transform="rotate(${i * 90})" fill="#8C94A3"/>`).join('')}</g></g><circle cx="40" cy="34" r="4" fill="#C9CED8"/><rect x="74" y="12" width="14" height="40" rx="2" fill="#C5CAD3"/>${[0, 1, 2, 3, 4].map((i) => `<line x1="74" x2="88" y1="${18 + i * 8}" y2="${18 + i * 8}" stroke="#8E96A4" stroke-width="1.5"/>`).join('')}</g>`
const gantry = (x0, x1, D, begin) => {
  const kt = '0;.1;.2;.5;.6;.65;.75;1', X = `${x0};${x0};${x0};${x1};${x1};${x1};${x1};${x0}`, L = [118, 222, 118, 118, 252, 252, 118, 118]
  const xs = X.split(';')
  const car = (n, vals) => `<animateTransform attributeName="transform" type="translate" values="${vals}" keyTimes="${kt}" dur="${D}s" begin="${begin}s" repeatCount="indefinite"/>`
  return `<g>${car(0, xs.map((x) => `${x} 0`).join(';'))}<rect x="-26" y="92" width="52" height="22" rx="4" fill="url(#metalD)"/><rect x="-9" y="112" width="18" height="${L[0] - 112 + 0}" fill="#8E97A6" stroke="#4B5362">
    <animate attributeName="height" values="${L.map((l) => l - 112).join(';')}" keyTimes="${kt}" dur="${D}s" begin="${begin}s" repeatCount="indefinite"/></rect></g>
  <g>${car(0, xs.map((x, i) => `${x} ${L[i]}`).join(';'))}<rect x="-24" y="2" width="48" height="12" rx="3" fill="#5A6272"/><rect x="-24" y="12" width="6" height="22" fill="#5A6272"/><rect x="18" y="12" width="6" height="22" fill="#5A6272"/></g>
  <g>${car(0, xs.map((x, i) => `${x} ${L[i] + 14}`).join(';'))}<g transform="translate(-48,0)" opacity="1"><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.64;.65;1" dur="${D}s" begin="${begin}s" repeatCount="indefinite"/>${acUnit(0, 0)}</g></g>
  <g><animateTransform attributeName="transform" type="translate" values="${x1 - 48} 358;${x1 - 48} 358;${x1 + 330} 358;${x1 + 330} 358" keyTimes="0;.65;1;1" dur="${D}s" begin="${begin}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.64;.66;.97;1" dur="${D}s" begin="${begin}s" repeatCount="indefinite"/>${acUnit(0, 0)}</g>`
}
const klima = () => `${BG()}${lampG(200, 120)}${lampG(600, 120)}
  <rect x="60" y="86" width="680" height="10" rx="3" fill="#4B5160"/><rect x="60" y="96" width="680" height="3" fill="#202329"/>
  <g transform="translate(0,0)">${gantry(120, 300, 14, 0)}</g>
  <g transform="translate(540,100)"><rect x="-18" y="-10" width="36" height="14" rx="3" fill="url(#metalD)"/><g transform="translate(0,4)"><g>${anim('rotate', '-30;25;-30', null, 5)}<rect x="-9" y="0" width="18" height="86" rx="9" fill="#A5ADBA" stroke="#4B5362"/><circle cy="86" r="11" fill="#6E7788"/><g transform="translate(0,86)"><g>${anim('rotate', '50;-40;50', null, 5)}<rect x="-8" y="0" width="16" height="70" rx="8" fill="#A5ADBA" stroke="#4B5362"/><rect x="-12" y="68" width="24" height="10" rx="3" fill="#4B5160"/></g></g></g></g></g>
  <rect x="40" y="388" width="60" height="28" rx="3" fill="#E3E6EB"/><rect x="48" y="372" width="60" height="16" rx="3" fill="#C9CED8"/>
  ${belt(70, 416, 670)}
  ${W(380, 470, { a2: { v: '-62', item: CLIP }, a1: { v: '-74;-68;-76;-70;-74', kt: '0;.25;.5;.75;1', d: .9 } })}
  ${W(590, 470, { side: -1, a2: { v: '-62', item: CLIP }, a1: { v: '-76;-70;-77;-70;-76', kt: '0;.3;.55;.8;1', d: 1.1 }, d: .5 })}`

/* ============ ENERJİ: trafo ============ */
const trafo = () => `${BG()}${lampG(420, 90)}
  <g transform="translate(330,470)">
    ${[0, 1, 2].map((i) => `<g transform="translate(${60 + i * 62},-250)"><rect x="-7" y="-44" width="14" height="44" rx="3" fill="#7B6A58"/>${[0, 1, 2, 3].map((j) => `<rect x="-12" y="${-40 + j * 10}" width="24" height="5" rx="2" fill="#8F7C68"/>`).join('')}<rect x="-4" y="-56" width="8" height="12" fill="#B9C0CC"/></g>`).join('')}
    <rect x="30" y="-216" width="200" height="30" rx="14" fill="url(#metalD)"/>
    <rect x="0" y="-200" width="260" height="190" rx="8" fill="url(#metal)"/><rect x="0" y="-200" width="260" height="14" rx="6" fill="#E4E8EF"/><rect x="0" y="-26" width="260" height="16" fill="#5B6373"/>
    <rect x="10" y="-170" width="240" height="4" fill="#fff" opacity=".18"/>
    <circle cx="70" cy="-120" r="34" fill="#EEF1F5" stroke="#4B5362" stroke-width="4"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<line x1="0" x2="0" y1="-27" y2="-31" stroke="#333" stroke-width="2" transform="translate(70,-120) rotate(${-120 + i * 34})"/>`).join('')}
    <g transform="translate(70,-120)"><line x1="0" y1="0" x2="0" y2="-26" stroke="#D1342C" stroke-width="3" stroke-linecap="round">${anim('rotate', '-40;40;-40', null, 6)}</line><circle r="4" fill="#222"/></g>
    <rect x="130" y="-148" width="100" height="56" rx="3" fill="#0F141C"/><text x="180" y="-124" text-anchor="middle" font-size="11" fill="#6FD6A8" font-weight="600">TRAFO</text><rect x="140" y="-110" width="80" height="4" fill="#2FD27A"><animate attributeName="width" values="30;80;50;80" dur="5s" repeatCount="indefinite"/></rect>
    ${Array.from({ length: 12 }, (_, i) => `<rect x="${262 + i * 9}" y="-196" width="6" height="180" rx="2" fill="#98A1AF"/>`).join('')}
  </g>
  <g transform="translate(60,470)">${[0, 1].map((i) => `<g transform="translate(${i * 92},0)"><rect x="-4" y="-130" width="8" height="130" fill="#4B5160"/><rect x="2" y="-190" width="64" height="62" rx="5" fill="url(#metal)"/><rect x="12" y="-206" width="10" height="16" fill="#7B6A58"/><rect x="40" y="-206" width="10" height="16" fill="#7B6A58"/><circle cx="52" cy="-160" r="8" fill="#2FD27A"><animate attributeName="opacity" values="1;.3;1" dur="${1.4 + i * .5}s" repeatCount="indefinite"/></circle></g>`).join('')}</g>
  ${W(250, 470, { a2: { v: '-62', item: CLIP }, a1: { v: '-76;-70;-77;-70;-76', kt: '0;.25;.5;.75;1', d: .9 } })}
  ${W(675, 470, { side: -1, a1: { v: '-86;-86;-60;-86', kt: '0;.5;.7;1', d: 6 } })}`

const SC = {
  tekstil: () => `${BG(lampG(185, 190) + lampG(400, 190) + lampG(615, 190))}
    ${sewer(90, '#2B3A55', '#2F7FBF', 0)}${sewer(335, '#34455F', '#57C9E9', .3)}${sewer(580, '#2B3A55', '#E8EEF8', .6)}`,
  gida, makine, otomotiv, sogutma: klima, enerji: trafo,
}
const VID = { tekstil: '/video/pages/alan-tekstil.mp4', gida: '/video/pages/alan-gida.mp4', makine: '/video/pages/alan-makine.mp4', otomotiv: '/video/pages/alan-otomotiv.mp4', sogutma: '/video/pages/alan-sogutma.mp4', enerji: '/video/pages/alan-enerji.mp4' }
export const areaScene = (k) => VID[k] ? `<video class="arx__svg arx__vid" data-auto muted loop playsinline preload="metadata" src="${VID[k]}"></video>` :  `<svg viewBox="0 0 800 600" class="arx__svg" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">${SC[k]()}${FG()}</svg>`
