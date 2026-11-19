import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
export { THREE };
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
export const LOOP = +(new URLSearchParams(location.search).get("loop") || 10);
export const M = (o) => new THREE.MeshPhysicalMaterial(o);
export const mesh = (g, m) => { const o = new THREE.Mesh(g, m); o.castShadow = o.receiveShadow = true; return o; };
export const at = (o, x, y, z) => { o.position.set(x, y, z); return o; };
export const box = (w, h, d, m) => { const r = Math.min(.07, Math.min(w, h, d) * .32); return mesh(new RoundedBoxGeometry(w, h, d, 3, r), m); };
export function label(text, { s = 1, color = "#EAF3FF", bg = "rgba(11,18,32,.78)", sub } = {}) {
  const cv = document.createElement("canvas"); cv.width = 512; cv.height = sub ? 200 : 128; const g = cv.getContext("2d");
  g.fillStyle = bg; g.beginPath(); g.roundRect(4, 4, 504, cv.height - 8, 28); g.fill(); g.strokeStyle = "rgba(143,180,245,.55)"; g.lineWidth = 3; g.stroke();
  g.fillStyle = color; g.font = "600 56px Poppins, Arial, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(text, 256, sub ? 74 : 66);
  if (sub) { g.fillStyle = "#9FB2D3"; g.font = "400 36px Poppins, Arial, sans-serif"; g.fillText(sub, 256, 142); }
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthTest: false })); sp.scale.set(2.4 * s, (sub ? 2.4 * 200 / 512 : 2.4 * .25) * s, 1); sp.renderOrder = 10; return sp;
}
export const cyl = (a, b, h, m, s = 32) => mesh(new THREE.CylinderGeometry(a, b, h, s), m);
export function setup({ bg = 0x0b1220, cam, look, fov = 30, bloom = .35 }) {
  const W = innerWidth, H = innerHeight, q = new URLSearchParams(location.search);
  const r = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  r.setPixelRatio(1); r.setSize(W, H); r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05; r.outputColorSpace = THREE.SRGBColorSpace;
  r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap; document.body.appendChild(r.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color(bg);
  const pm = new THREE.PMREMGenerator(r);
  scene.environment = (() => { const s = new THREE.Scene(); s.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color: 0x0a1424, side: THREE.BackSide })));
    [[8, 2, -4, 8, 4, 3, 0xf0f6ff], [1.4, 9, 8, 3, 2, 2, 0xcfe0ff], [1.2, 8, -8, 2, -3, 1.4, 0x8fb4f5]].forEach(([w, h, x, y, z, e, c]) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(e), side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); s.add(m); });
    return pm.fromScene(s, .04).texture; })();
  scene.add(new THREE.HemisphereLight(0x9db4e8, 0x05080f, .5));
  const key = new THREE.SpotLight(0xfff2e0, 160, 40, Math.PI * .3, .8, 1.3); key.position.set(-4, 12, 8); key.target.position.set(0, 0, 0); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -.0003; scene.add(key, key.target);
  const rim = new THREE.SpotLight(0x57c9e9, 90, 30, Math.PI * .3, .8, 1.3); rim.position.set(8, 6, -4); rim.target.position.set(0, 0, 0); scene.add(rim, rim.target);
  const camera = new THREE.PerspectiveCamera(fov, W / H, .05, 100); camera.position.set(...cam); camera.lookAt(...look);
  const c = new EffectComposer(r); c.addPass(new RenderPass(scene, camera)); c.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), bloom, .5, .85)); c.addPass(new OutputPass());
  const start = (pose) => { const f = (t) => { pose(((t % LOOP) + LOOP) % LOOP); c.render(); }; window.onSeek = f; f(0); if (!q.has("capture")) { const t0 = performance.now(); (function l() { f((performance.now() - t0) / 1000); requestAnimationFrame(l); })(); } window.__ready = true; };
  window.__ready = false; return { scene, camera, start };
}
export const html = (t, body) => `<!doctype html><html><head><meta charset="utf-8"><title>${t}</title><style>html,body{margin:0;height:100%;background:#0b1220;overflow:hidden}canvas{display:block}</style><script type="importmap">{"imports":{"three":"../node_modules/three/build/three.module.js","three/addons/":"../node_modules/three/examples/jsm/"}}</script></head><body><script type="module">${body}</script></body></html>`;
