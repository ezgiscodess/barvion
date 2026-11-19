// Barvion 3B sahne kitaplığı — Volkan Bey hero filmiyle aynı yöntem (Three.js, PBR, PMREM, bokeh+bloom, onSeek deterministik).
// Ortak: antrasit duvar + üç mavi tablo + sarkıt lambalar, sade ön görünüm, profesyonel işçi / araç / makine modelleri.
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
export { THREE };

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const sm = (x) => x * x * (3 - 2 * x);
export const eo = (x) => 1 - Math.pow(1 - x, 3);
export const ei = (x) => x * x * x;
export const rng = (seed) => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
export const LOOP = 10;

export const M = (o) => new THREE.MeshPhysicalMaterial(o);
export const mat = {
  wall: M({ color: 0x2c2f36, roughness: .85, metalness: .1 }),
  wallD: M({ color: 0x202228, roughness: .9 }),
  floor: M({ color: 0x1c1f26, roughness: .5, metalness: .5 }),
  steel: M({ color: 0x8e95a1, metalness: 1, roughness: .34 }),
  steelD: M({ color: 0x4b525e, metalness: .9, roughness: .5 }),
  steelL: M({ color: 0xc3c9d3, metalness: 1, roughness: .28 }),
  black: M({ color: 0x0c0e13, roughness: .8 }),
  white: M({ color: 0xeceff4, roughness: .45, clearcoat: .4 }),
  paint: M({ color: 0x8c929c, metalness: .85, roughness: .28, clearcoat: 1, clearcoatRoughness: .12 }),
  glass: M({ color: 0x0c1a2e, metalness: .2, roughness: .06, clearcoat: 1, opacity: .9, transparent: true }),
  rubber: M({ color: 0x0b0c0f, roughness: .9 }),
  orange: M({ color: 0xe8761a, metalness: .25, roughness: .38, clearcoat: .5 }),
  grayArm: M({ color: 0xa5adba, metalness: .6, roughness: .35, clearcoat: .4 }),
  navy: M({ color: 0x24334f, roughness: .75 }),
  pants: M({ color: 0x3c4862, roughness: .8 }),
  skin: M({ color: 0xc49a7c, roughness: .6 }),
  hair: M({ color: 0x1b1511, roughness: .8 }),
  helmet: M({ color: 0xf1f3f7, roughness: .3, clearcoat: .6 }),
  vest: M({ color: 0xff7a1c, roughness: .6, emissive: 0x3a1500, emissiveIntensity: .3 }),
  refl: M({ color: 0xe9ecf2, roughness: .35 }),
  glove: M({ color: 0x3a82c4, roughness: .7 }),
  boot: M({ color: 0x2a2d35, roughness: .6 }),
  coat: M({ color: 0xeef1f6, roughness: .7 }),
  brand: M({ color: 0x2f7fbf, roughness: .5 }),
  cardboard: M({ color: 0xb98d56, roughness: .8 }),
};
export const mesh = (geo, m, cast = true) => { const o = new THREE.Mesh(geo, m); o.castShadow = cast; o.receiveShadow = true; return o; };
export const at = (o, x, y, z) => { o.position.set(x, y, z); return o; };
export const box = (w, h, d, m, r = 0) => mesh(r ? new THREE.BoxGeometry(w, h, d, 1, 1, 1) : new THREE.BoxGeometry(w, h, d), m);
export const cyl = (r1, r2, h, m, seg = 32) => mesh(new THREE.CylinderGeometry(r1, r2, h, seg), m);
export const caps = (r, len, m) => mesh(new THREE.CapsuleGeometry(r, len, 8, 20), m);
export const sph = (r, m) => mesh(new THREE.SphereGeometry(r, 32, 20), m);

/* ---------- sahne kurulumu ---------- */
export function init({ camY = 2.7, camZ = 13.5, look = [0, 2.7, 0], fov = 28 } = {}) {
  const q = new URLSearchParams(location.search);
  const W = innerWidth, H = innerHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(+(q.get("pr") || 1)); renderer.setSize(W, H);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = .95;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x1c1f26);
  scene.fog = new THREE.Fog(0x2a2d35, 18, 40);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = (() => {
    const s = new THREE.Scene();
    s.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color: 0x14181f, side: THREE.BackSide })));
    const strip = (w, h, x, y, z, e, c) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(e), side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); s.add(m); };
    strip(10, 2.4, -4, 8, 6, 3.2, 0xf4f6ff); strip(1.4, 9, 9, 3, 2, 2.2, 0xdfe8ff); strip(1.2, 8, -9, 2, -3, 1.4, 0x9bb8f5); strip(14, 1.2, 0, -1, 8, .35, 0xb0c0e0);
    return pmrem.fromScene(s, .04).texture;
  })();

  /* duvar: antrasit paneller */
  const wallZ = -2.6;
  const wall = box(30, 12, .2, mat.wall); wall.position.set(0, 6, wallZ); wall.castShadow = false; scene.add(wall);
  for (let x = -14; x <= 14; x += 1.9) scene.add(at(box(.07, 12, .06, mat.wallD), x, 6, wallZ + .12));
  scene.add(at(box(30, .5, .1, mat.wallD), 0, .25, wallZ + .1));
  const fl = box(34, .2, 14, mat.floor); fl.position.set(0, -.1, 4); fl.castShadow = false; scene.add(fl);
  for (let i = 0; i < 6; i++) scene.add(at(box(34, .006, .03, M({ color: 0x2c313b, roughness: .6 }), 0), 0, .003, -1.2 + i * 1.8));

  /* üç mavi tablo (dikdörtgen, yuvarlak, dikdörtgen) — hepsinde aynı tasarım */
  const tex = (draw) => { const c = document.createElement("canvas"); c.width = 512; c.height = 400; const g = c.getContext("2d"); draw(g); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
  const t1 = tex((g) => { g.fillStyle = "#1e5aa8"; g.fillRect(0, 0, 512, 400); g.fillStyle = "#57c9e9"; g.beginPath(); g.arc(205, 200, 105, 0, 7); g.fill(); g.fillStyle = "rgba(11,35,71,.8)"; g.beginPath(); g.arc(305, 200, 105, 0, 7); g.fill(); });
  const t2 = tex((g) => { g.fillStyle = "#2f7fbf"; g.fillRect(0, 0, 512, 400); g.fillStyle = "#57c9e9"; g.beginPath(); g.arc(256, 200, 170, 0, 7); g.fill(); g.fillStyle = "#0b2347"; g.beginPath(); g.arc(256, 200, 62, 0, 7); g.fill(); g.strokeStyle = "#9bd3f5"; g.lineWidth = 14; g.beginPath(); g.arc(256, 200, 118, 0, 7); g.stroke(); });
  const t3 = tex((g) => { g.fillStyle = "#0b2347"; g.fillRect(0, 0, 512, 400); [60, 110, 170, 240, 330].forEach((h, i) => { g.fillStyle = i % 2 ? "#57c9e9" : "#2f7fbf"; g.fillRect(50 + i * 84, 360 - h, 60, h); }); });
  const frame = (x, w, h, t, round) => {
    const gp = new THREE.Group(); gp.position.set(x, 4.9, wallZ + .15);
    const fr = round ? mesh(new THREE.CylinderGeometry(w / 2 + .1, w / 2 + .1, .1, 64), M({ color: 0x15171c, roughness: .6 })) : box(w + .2, h + .2, .1, M({ color: 0x15171c, roughness: .6 }));
    if (round) fr.rotation.x = Math.PI / 2; gp.add(fr);
    const pic = new THREE.Mesh(round ? new THREE.CircleGeometry(w / 2, 64) : new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: .7, color: 0xb8c0cc })); pic.position.z = .06; gp.add(pic);
    scene.add(gp);
  };
  frame(-3.4, 2.2, 1.6, t1, false); frame(0, 1.9, 1.9, t2, true); frame(3.4, 2.2, 1.6, t3, false);

  /* sarkıt lambalar + duvarda ışık havuzu */
  const lamp = (x) => {
    const gp = new THREE.Group(); gp.position.set(x, 6.6, wallZ + 1.4);
    gp.add(at(cyl(.02, .02, 2.2, mat.steelD, 8), 0, 1.1, 0));
    const sh = mesh(new THREE.CylinderGeometry(.18, .48, .24, 40, 1, true), M({ color: 0x3e434e, metalness: .7, roughness: .4, side: THREE.DoubleSide })); gp.add(sh);
    const d = new THREE.Mesh(new THREE.CircleGeometry(.3, 40), new THREE.MeshBasicMaterial({ color: 0xfff1cf })); d.rotation.x = Math.PI / 2; d.position.y = -.1; gp.add(d);
    scene.add(gp);
    const s = new THREE.SpotLight(0xfff0d8, 38, 14, Math.PI * .22, .9, 1.3); s.position.set(x, 6.4, wallZ + 1.4); s.target.position.set(x, 1.8, wallZ); scene.add(s, s.target);
  };
  lamp(-5); lamp(-1.7); lamp(1.7); lamp(5);

  scene.add(new THREE.HemisphereLight(0xaab9e0, 0x0a0c12, .35));
  const key = new THREE.SpotLight(0xfff2e0, 110, 40, Math.PI * .2, .8, 1.3); key.position.set(-4, 11, 10); key.target.position.set(0, 1, 0); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -.0003; key.shadow.radius = 4; scene.add(key, key.target);
  const rim = new THREE.SpotLight(0x6f93e0, 80, 30, Math.PI * .25, .8, 1.3); rim.position.set(8, 6, -2); rim.target.position.set(0, 1.5, 0); scene.add(rim, rim.target);
  const fill = new THREE.PointLight(0x57c9e9, 14, 18, 1.8); fill.position.set(0, 3, 8); scene.add(fill);

  const camera = new THREE.PerspectiveCamera(fov, W / H, .05, 80);
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bokeh = new BokehPass(scene, camera, { focus: camZ, aperture: .0007, maxblur: .004 }); composer.addPass(bokeh);
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), .16, .5, .88));
  composer.addPass(new OutputPass());
  const lookV = new THREE.Vector3(...look);
  const camUpdate = (t) => {
    camera.position.set(0, camY, camZ);
    camera.lookAt(lookV); bokeh.uniforms.focus.value = camera.position.distanceTo(lookV);
  };
  const render = () => composer.render();
  const start = (pose) => {
    const f = (t) => { const tt = ((t % LOOP) + LOOP) % LOOP; pose(tt); camUpdate(tt); render(); };
    window.onSeek = f; f(0);
    if (!q.has("capture")) { const t0 = performance.now(); const loop = () => { f(((performance.now() - t0) / 1000) % LOOP); requestAnimationFrame(loop); }; loop(); }
    window.__ready = true;
  };
  window.__ready = false;
  return { scene, camera, start, wallZ };
}

/* ---------- çalışan modeli ---------- */
// opts: coat (beyaz önlük), seated, hat. Döner: grup; userData: armL/armR (omuz), foL/foR (dirsek), torso, head
export function worker({ coat = false, seated = false, shirt } = {}) {
  const g = new THREE.Group();
  const top = coat ? mat.coat : (shirt || mat.navy), trou = coat ? M({ color: 0x4a5468, roughness: .8 }) : mat.pants;
  const legH = .46, shin = .46;
  const mkLeg = (x) => {
    const hip = new THREE.Group(); hip.position.set(x, .93, 0);
    const th = mesh(new THREE.CylinderGeometry(.088, .072, legH, 20), trou); th.position.y = -legH / 2; hip.add(th);
    const kn = new THREE.Group(); kn.position.y = -legH; hip.add(kn);
    const sh = mesh(new THREE.CylinderGeometry(.07, .056, shin, 20), trou); sh.position.y = -shin / 2; kn.add(sh);
    const ft = box(.11, .075, .26, mat.boot); ft.position.set(0, -shin - .02, .06); kn.add(ft);
    g.add(hip); return { hip, kn };
  };
  const L = mkLeg(-.1), R = mkLeg(.1);
  if (seated) { for (const l of [L, R]) { l.hip.rotation.x = -Math.PI / 2; l.kn.rotation.x = Math.PI / 2; } }
  g.userData.legs = [L, R];
  const body = new THREE.Group(); body.position.y = .98; g.add(body); g.userData.body = body;
  const torso = mesh(new THREE.CapsuleGeometry(.165, .36, 10, 24), top); torso.scale.set(1.18, 1, .74); torso.position.y = .3; body.add(torso);
  if (!coat) {
    const v = mesh(new THREE.CylinderGeometry(.205, .22, .46, 32, 1, true), M({ color: 0xff7a1c, roughness: .6, emissive: 0x3a1500, emissiveIntensity: .3, side: THREE.DoubleSide })); v.scale.set(1.18, 1, .78); v.position.y = .3; body.add(v);
    for (const y of [.22, .4]) { const b = mesh(new THREE.CylinderGeometry(.208, .214, .05, 32, 1, true), M({ color: 0xe9ecf2, roughness: .35, side: THREE.DoubleSide })); b.scale.set(1.18, 1, .78); b.position.y = y; body.add(b); }
  } else { const b = box(.02, .5, .02, M({ color: 0xaab3c2, roughness: .6 })); b.position.set(0, .3, .17); body.add(b); }
  const neck = cyl(.05, .055, .09, mat.skin, 16); neck.position.y = .64; body.add(neck);
  const head = new THREE.Group(); head.position.y = .76; body.add(head); g.userData.head = head;
  const skull = sph(.1, mat.skin); skull.scale.set(.95, 1.18, 1.05); head.add(skull);
  const nose = sph(.018, mat.skin); nose.position.set(0, -.01, .105); head.add(nose);
  const glasses = box(.15, .028, .02, M({ color: 0x0f1218, roughness: .2, metalness: .3 })); glasses.position.set(0, .015, .098); head.add(glasses);
  const hair = mesh(new THREE.SphereGeometry(.103, 24, 14, 0, Math.PI * 2, Math.PI * .1, Math.PI * .45), mat.hair); hair.scale.set(.96, 1.19, 1.06); hair.position.y = -.002; hair.rotation.x = -.35; head.add(hair);
  const hel = mesh(new THREE.SphereGeometry(.118, 32, 18, 0, Math.PI * 2, 0, Math.PI * .5), mat.helmet); hel.scale.set(1.0, 1.02, 1.12); hel.position.y = .035; head.add(hel);
  const brim = mesh(new THREE.CylinderGeometry(.122, .122, .014, 32), mat.helmet); brim.position.set(0, .038, .02); brim.scale.set(1, 1, 1.18); head.add(brim);
  const ridge = box(.026, .018, .22, mat.helmet); ridge.position.set(0, .152, 0); head.add(ridge);
  const mkArm = (s) => {
    const sh = new THREE.Group(); sh.position.set(s * .225, .5, 0); body.add(sh);
    sh.add(sph(.062, top));
    const up = caps(.05, .22, top); up.position.y = -.17; sh.add(up);
    const el = new THREE.Group(); el.position.y = -.31; sh.add(el);
    el.add(sph(.05, top));
    const fo = caps(.044, .2, top); fo.position.y = -.14; el.add(fo);
    const hand = new THREE.Group(); hand.position.y = -.28; el.add(hand);
    hand.add(sph(.05, mat.glove)); const th = sph(.02, mat.glove); th.position.set(s * -.04, .0, .03); hand.add(th);
    return { sh, el, hand };
  };
  g.userData.arms = { L: mkArm(-1), R: mkArm(1) };
  return g;
}

/* ---------- araç gövdesi ---------- */
export function car() {
  const g = new THREE.Group();
  const s = new THREE.Shape();
  s.moveTo(-2.2, .12); s.lineTo(-2.2, .46); s.bezierCurveTo(-2.22, .64, -2.1, .7, -1.85, .72); s.lineTo(-1.15, .78);
  s.bezierCurveTo(-.78, 1.12, -.45, 1.3, .1, 1.32); s.lineTo(.6, 1.31); s.bezierCurveTo(1.1, 1.26, 1.35, 1.0, 1.55, .82);
  s.lineTo(2.0, .72); s.bezierCurveTo(2.18, .66, 2.24, .58, 2.22, .44); s.lineTo(2.22, .12); s.lineTo(-2.2, .12);
  const geo = new THREE.ExtrudeGeometry(s, { depth: .9, bevelEnabled: true, bevelThickness: .14, bevelSize: .11, bevelSegments: 8, curveSegments: 48 }); geo.translate(0, 0, -.45);
  g.add(mesh(geo, mat.paint));
  // yan camlar + sütunlar
  const gs = new THREE.Shape(); gs.moveTo(-1.0, .82); gs.bezierCurveTo(-.72, 1.14, -.42, 1.25, .1, 1.27); gs.lineTo(.58, 1.26); gs.bezierCurveTo(1.0, 1.2, 1.25, 1.0, 1.38, .82); gs.lineTo(-1.0, .82);
  const gg = new THREE.ExtrudeGeometry(gs, { depth: .96, bevelEnabled: true, bevelThickness: .14, bevelSize: .012, bevelSegments: 2 }); gg.translate(0, 0, -.48); g.add(mesh(gg, mat.glass, false));
  for (const z of [-.6, .6]) { g.add(at(box(.05, .46, .02, mat.black), .15, 1.04, z)); g.add(at(box(.03, .56, .02, M({ color: 0x23262d, roughness: .4 })), .58, .55, z)); g.add(at(box(.03, .56, .02, M({ color: 0x23262d, roughness: .4 })), -.55, .55, z)); g.add(at(box(.22, .045, .03, mat.steelL), .38, .66, z * 1.02)); g.add(at(box(1.2, .03, .02, mat.steelD), 0, .22, z)); }
  for (const z of [-.5, .5]) { const m = box(.11, .08, .1, mat.paint); m.position.set(1.15, .86, z * 1.18); g.add(m); }
  // ön/arka lambalar, tampon
  for (const z of [-.33, .33]) { const h = sph(.08, M({ color: 0xfff4cf, emissive: 0xfff0b0, emissiveIntensity: 1.2 })); h.scale.set(.5, .6, 1.8); h.position.set(2.27, .58, z); g.add(h); const t = sph(.07, M({ color: 0xff3b30, emissive: 0xff2a20, emissiveIntensity: .7 })); t.scale.set(.5, .5, 1.9); t.position.set(-2.27, .6, z); g.add(t); }
  g.add(at(box(.1, .13, 1.0, mat.black), 2.26, .24, 0)); g.add(at(box(.1, .13, 1.0, mat.black), -2.26, .24, 0));
  // tekerlek + çamurluk kemeri
  g.userData.wheels = [];
  for (const [x, z] of [[-1.38, .52], [-1.38, -.52], [1.38, .52], [1.38, -.52]]) {
    const w = new THREE.Group(); w.position.set(x, .32, z * 1.06);
    w.add(mesh(new THREE.TorusGeometry(.3, .1, 24, 48), mat.rubber));
    const rim = cyl(.23, .23, .16, mat.steelL, 40); rim.rotation.x = Math.PI / 2; w.add(rim);
    for (let k = 0; k < 5; k++) { const sp = box(.05, .21, .03, mat.steelD); sp.position.z = z > 0 ? .085 : -.085; sp.rotation.z = k * Math.PI * 2 / 5; w.add(sp); }
    const arch = mesh(new THREE.TorusGeometry(.4, .035, 12, 32, Math.PI), mat.black); arch.position.set(x, .32, z * .93); arch.rotation.z = 0; g.add(arch);
    g.add(w); g.userData.wheels.push(w);
  }
  return g;
}

/* ---------- gri zincir ---------- */
export function chain(len, material = mat.steel) {
  const g = new THREE.Group();
  const link = new THREE.TorusGeometry(.05, .016, 10, 24), n = Math.floor(len / .08);
  const inst = new THREE.InstancedMesh(link, material, n); inst.castShadow = true;
  const m4 = new THREE.Matrix4(), q0 = new THREE.Quaternion(), q1 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  for (let i = 0; i < n; i++) { m4.compose(new THREE.Vector3(0, -i * .08, 0), i % 2 ? q1 : q0, new THREE.Vector3(1, 1.5, 1)); inst.setMatrixAt(i, m4); }
  g.add(inst);
  const hook = mesh(new THREE.TorusGeometry(.12, .032, 12, 32, Math.PI * 1.6), material); hook.position.y = -len - .1; hook.rotation.z = Math.PI * .7; g.add(hook);
  return g;
}

/* ---------- konveyör ---------- */
export function belt(len = 30, y = .45, z = 0, w = 1.6) {
  const g = new THREE.Group(); g.position.set(0, 0, z);
  g.add(at(box(len, .08, w, mat.black), 0, y, 0));
  for (const s of [-1, 1]) g.add(at(box(len, .16, .08, mat.steel), 0, y - .04, s * w / 2));
  const rollers = [];
  for (let i = -len / 2; i <= len / 2; i += 1) { const r = cyl(.05, .05, w - .06, mat.steelD, 16); r.rotation.x = Math.PI / 2; r.position.set(i, y + .045, 0); r.castShadow = false; g.add(r); rollers.push(r); }
  for (let i = -len / 2; i <= len / 2; i += 2.5) for (const s of [-1, 1]) g.add(at(box(.1, y - .1, .1, mat.steelD), i, (y - .1) / 2, s * (w / 2 - .06)));
  g.userData.rollers = rollers; return g;
}

/* ---------- robot kol (gri veya turuncu), iki parmaklı kıskaç ---------- */
export function robot({ l1 = 1.4, l2 = 1.2, m = mat.orange } = {}) {
  const g = new THREE.Group();
  g.add(at(cyl(.5, .58, .2, mat.steelD, 48), 0, .1, 0));
  const tur = new THREE.Group(); tur.position.y = .2; g.add(tur);
  tur.add(at(cyl(.34, .42, .44, m, 48), 0, .22, 0));
  const sh = new THREE.Group(); sh.position.y = .5; tur.add(sh);
  { const c = cyl(.2, .2, .46, mat.steelD, 32); c.rotation.z = Math.PI / 2; sh.add(c); }
  const a1 = new THREE.Group(); sh.add(a1);
  a1.add(at(box(.3, l1, .26, m), 0, l1 / 2, 0));
  const el = new THREE.Group(); el.position.y = l1; a1.add(el);
  { const c = cyl(.17, .17, .42, mat.steelD, 32); c.rotation.z = Math.PI / 2; el.add(c); }
  const a2 = new THREE.Group(); el.add(a2);
  a2.add(at(box(.23, l2, .21, m), 0, l2 / 2, 0));
  const wr = new THREE.Group(); wr.position.y = l2; a2.add(wr);
  wr.add(sph(.13, mat.steelD));
  wr.add(at(box(.2, .06, .12, mat.steelD), 0, .14, 0));
  const fL = box(.035, .2, .05, mat.steelL), fR = box(.035, .2, .05, mat.steelL); fL.position.set(-.07, .26, 0); fR.position.set(.07, .26, 0); wr.add(fL, fR);
  g.userData = { tur, sh, a1, el, a2, wr, fL, fR, l1, l2 };
  return g;
}
export const grip = (r, open) => { r.userData.fL.position.x = -.035 - open * .06; r.userData.fR.position.x = .035 + open * .06; };

/* ---------- koli ---------- */
export function crate(w = .6, h = .42, d = .5, m = mat.cardboard) {
  const g = new THREE.Group();
  g.add(at(box(w, h, d, m), 0, h / 2, 0));
  g.add(at(box(w * 1.01, .012, .1, M({ color: 0xd9c9a8, roughness: .6 })), 0, h + .002, 0));
  g.add(at(box(.18, .1, .005, mat.white), w * .2, h * .55, d / 2 + .004));
  return g;
}

/* ---------- gri klima dış ünitesi ---------- */
export function ac() {
  const g = new THREE.Group();
  g.add(at(box(.95, .72, .38, mat.white), 0, .36, 0));
  g.add(at(box(.95, .06, .38, mat.steelL), 0, .03, 0));
  const fan = new THREE.Group(); fan.position.set(-.16, .38, .2); g.add(fan);
  fan.add(at(cyl(.27, .27, .03, M({ color: 0x252a33, roughness: .5 }), 40), 0, 0, 0)).rotation.x = Math.PI / 2;
  const bl = new THREE.Group(); for (let i = 0; i < 4; i++) { const b = box(.045, .22, .01, mat.steelD); b.position.y = .12; const p = new THREE.Group(); p.rotation.z = i * Math.PI / 2; p.add(b); bl.add(p); } bl.position.z = .03; fan.add(bl); g.userData.fan = bl;
  for (let i = 0; i < 6; i++) g.add(at(box(.14, .012, .02, mat.steelD), .34, .2 + i * .07, .2));
  return g;
}

export function floorLight(scene, x, z, i = 1) {
  const c = document.createElement("canvas"); c.width = c.height = 256; const g = c.getContext("2d");
  const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128); gr.addColorStop(0, "rgba(255,244,220,.55)"); gr.addColorStop(.5, "rgba(255,244,220,.18)"); gr.addColorStop(1, "rgba(255,244,220,0)"); g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  const p = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: i }));
  p.rotation.x = -Math.PI / 2; p.position.set(x, .012, z); scene.add(p);
  const s = new THREE.SpotLight(0xfff0d8, 30 * i, 8, Math.PI * .16, .8, 1.4); s.position.set(x, 5, z + .3); s.target.position.set(x, 0, z); scene.add(s, s.target);
}

/* robot kol iki eklemli ters kinematik: gövdeden hedef noktaya (dünya koordinatı) uzanır, tutucu aşağı bakar */
export function reach(rb, target, lift = .38) {
  const U = rb.userData; rb.updateMatrixWorld(true);
  const base = new THREE.Vector3(); U.sh.getWorldPosition(base);
  const dx = target.x - base.x, dz = target.z - base.z, h = target.y + lift - base.y;
  U.tur.rotation.y = Math.atan2(dx, dz) - rb.rotation.y;
  const d = Math.hypot(dx, dz), l1 = U.l1, l2 = U.l2;
  const r = Math.min(Math.hypot(d, h), l1 + l2 - .02), phi = Math.atan2(d, h);
  const al = Math.acos(clamp((l1 * l1 + r * r - l2 * l2) / (2 * l1 * r), -1, 1));
  const be = Math.acos(clamp((l1 * l1 + l2 * l2 - r * r) / (2 * l1 * l2), -1, 1));
  const t1 = phi - al, t2 = Math.PI - be;
  U.a1.rotation.x = t1; U.a2.rotation.x = t2; U.wr.rotation.x = Math.PI - (t1 + t2);
}
