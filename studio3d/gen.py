import os
os.chdir('/Users/ezgisilacaglar/Desktop/projeler/barvion/studio3d/scenes')
HEAD = '''<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>%s</title>
<style>html,body{margin:0;height:100%%;background:#14171d;overflow:hidden}canvas{display:block}</style>
<script type="importmap">{"imports":{"three":"../node_modules/three/build/three.module.js","three/addons/":"../node_modules/three/examples/jsm/"}}</script></head><body>
<script type="module">
import { THREE, init, mat, M, mesh, at, box, cyl, caps, sph, worker, car, chain, belt, robot, grip, crate, ac, floorLight, reach, clamp, lerp, sm, eo, ei, rng, LOOP } from "./lib.js";
'''
TAIL = '''
</script></body></html>
'''
S = {}
S['otomotiv'] = '''
const { scene, start } = init({ camZ: 13.5 });
const B = belt(30, .45, 0, 1.7); scene.add(B);
const c = car(); scene.add(c);
const rail = box(30, .22, .26, mat.steelD); rail.position.set(0, 6.2, -1.6); scene.add(rail);
const CL = [2.2, 1.7, 2.6];
const chains = [-6.4, -2.4, 6.2].map((x, i) => { const g = chain(CL[i]); g.position.set(x, 6.1, -1.6); const bl = box(.5, .32, .42, M({ color: 0x5d6572, metalness: .9, roughness: .45 })); bl.position.y = -CL[i] - .36; g.add(bl); scene.add(g); return g; });
const rb = robot({ l1: 2.2, l2: 1.4 }); rb.position.set(.9, 0, -1.4); scene.add(rb);
const sparkN = 120, sg = new THREE.BufferGeometry(); sg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(sparkN * 3), 3));
const sparks = new THREE.Points(sg, new THREE.PointsMaterial({ size: .06, color: 0xffd27a, transparent: true, opacity: .95, depthWrite: false, blending: THREE.AdditiveBlending })); scene.add(sparks);
const wl = new THREE.PointLight(0xffc26a, 0, 5, 1.8); scene.add(wl);
const wA = worker(), wB = worker(); wA.position.set(-3.1, 0, 1.9); wB.position.set(3.0, 0, 1.9); wA.rotation.y = .4; wB.rotation.y = -.45; scene.add(wA, wB); floorLight(scene, -3.1, 1.9); floorLight(scene, 3.0, 1.9);
const panel = new THREE.Group(); panel.position.set(-2.35, 0, 1.55); scene.add(panel);
panel.add(at(box(.55, 1.05, .32, mat.steelD), 0, .52, 0));
panel.add(at(new THREE.Mesh(new THREE.PlaneGeometry(.4, .3), new THREE.MeshBasicMaterial({ color: 0x2f7fbf })), 0, .86, .165));
const clip = box(.2, .28, .015, M({ color: 0xf2f4f8, roughness: .6 })); wB.userData.arms.L.hand.add(clip); clip.position.set(0, -.02, .09);
const rr = rng(3); const sd = Array.from({ length: sparkN }, () => [rr(), rr(), rr(), rr()]);
const tip = new THREE.Object3D(); tip.position.y = .4; rb.userData.wr.add(tip);
start((t) => {
  let cx; if (t < 3) cx = lerp(-10, 0, eo(t / 3)); else if (t < 7) cx = 0; else cx = lerp(0, 10, ei((t - 7) / 3));
  c.position.set(cx, .5, 0); c.userData.wheels.forEach((w) => { w.rotation.z = -cx / .3; });
  const k = sm(clamp((t - 2.5) / 1.2)) * (1 - sm(clamp((t - 6.8) / 1.0)));
  const U = rb.userData; U.tur.rotation.y = lerp(.9, Math.sin(t * 1.3) * .04, k); U.a1.rotation.x = lerp(.1, .38, k); U.a2.rotation.x = lerp(-.3, 1.0, k); U.wr.rotation.x = lerp(0, 1.2, k); grip(rb, .5);
  rb.updateMatrixWorld(true); const tp = new THREE.Vector3().setFromMatrixPosition(tip.matrixWorld); const on = k > .85;
  const p = sg.attributes.position;
  for (let i = 0; i < sparkN; i++) { const [a, b, d, e] = sd[i], l = (t * 2.4 + e * 3) % 1, v = .5 + a * 1.4; p.array[i * 3] = tp.x + (b - .5) * v * l * 1.2; p.array[i * 3 + 1] = on ? tp.y + d * .9 * l * v - 1.2 * l * l : -10; p.array[i * 3 + 2] = tp.z + (a - .5) * v * l * 1.2; }
  p.needsUpdate = true; wl.position.copy(tp); wl.intensity = on ? 7 + Math.sin(t * 60) * 3 : 0;
  chains.forEach((g, i) => { g.rotation.z = Math.sin(t / LOOP * Math.PI * 2 + i * 2.1) * .03; });
  const look = sm(clamp((t - 3.3) / .6)) * (1 - sm(clamp((t - 7) / .6)));
  const A = wA.userData.arms, Bb = wB.userData.arms;
  A.R.sh.rotation.x = -1.3 + Math.sin(t * 2.4) * .07; A.R.el.rotation.x = -.5; A.L.sh.rotation.x = -.1;
  Bb.L.sh.rotation.x = -1.0; Bb.L.el.rotation.x = -.9; Bb.R.sh.rotation.x = -1.1 + Math.sin(t * 7) * .06 * look; Bb.R.el.rotation.x = -1.0 + Math.sin(t * 7) * .1 * look;
  wB.userData.head.rotation.x = .25 * look; wA.userData.head.rotation.y = .15;
});
'''
S['tekstil'] = '''
const { scene, start } = init({ camZ: 13.5 });
const ws = [], fabrics = [];
const cols = [0x2f7fbf, 0x57c9e9, 0xe6edf8];
[-3.1, 0, 3.1].forEach((x, i) => {
  const g = new THREE.Group(); g.position.set(x, 0, .6); scene.add(g);
  g.add(at(box(2.1, .08, 1.0, M({ color: 0x6a5a4a, roughness: .6 })), 0, .82, 0));
  for (const [dx, dz] of [[-.95, -.4], [.95, -.4], [-.95, .4], [.95, .4]]) g.add(at(box(.06, .8, .06, mat.steelD), dx, .4, dz));
  g.add(at(box(.7, .2, .5, mat.white), -.2, .96, -.1)); g.add(at(box(.16, .5, .22, mat.white), -.5, 1.2, -.12)); g.add(at(box(.7, .12, .2, mat.white), -.2, 1.46, -.12));
  g.add(at(box(.5, .04, .28, mat.steelL), -.2, .9, -.1));
  const ndl = box(.012, .16, .012, mat.steelL); ndl.position.set(-.05, 1.3, -.1); g.add(ndl);
  const fab = box(.55, .015, .4, M({ color: cols[i], roughness: .8 })); fab.position.set(-.2, .94, -.1); g.add(fab); fabrics.push(fab);
  g.add(at(box(.6, .06, .6, mat.steelD), -.2, .48, 1.0)); g.add(at(cyl(.03, .03, .45, mat.steelD, 12), -.2, .24, 1.0));
  floorLight(scene, x - .2, .9, .7);
  const w = worker({ seated: true }); w.position.set(-.2, -.43, 1.0); w.rotation.y = Math.PI; g.add(w); ws.push({ w, i });
});
start((t) => {
  ws.forEach(({ w, i }) => {
    const A = w.userData.arms, ph = t * 2.2 + i;
    w.userData.body.rotation.x = .2; w.userData.head.rotation.x = .12;
    A.L.sh.rotation.x = -1.25 + Math.sin(ph) * .05; A.L.el.rotation.x = -.5; A.R.sh.rotation.x = -1.25 + Math.sin(ph + 1) * .05; A.R.el.rotation.x = -.5;
  });
  fabrics.forEach((f, i) => { f.position.x = -.2 + Math.sin(t / LOOP * Math.PI * 2 * 4 + i) * .06; });
});
'''
S['gida'] = '''
const { scene, start } = init({ camZ: 13.5 });
const B = belt(30, .75, 0, 1.2); scene.add(B);
const boxes = []; for (let i = 0; i < 7; i++) { const b = crate(.62, .42, .5); scene.add(b); boxes.push(b); }
const wk = [{ w: worker({ coat: true }), x: -1.9, th: 2.2 }, { w: worker({ coat: true }), x: 2.1, th: -2.2 }];
wk.forEach(({ w, x, th }) => { w.position.set(x, 0, 1.15); w.rotation.y = th; scene.add(w); floorLight(scene, x, 1.15); });
const stack = new THREE.Group(); for (let i = 0; i < 3; i++) { const c = crate(.62, .42, .5); c.position.set(0, i * .43, 0); stack.add(c); } stack.position.set(5.0, .79, 0); scene.add(stack);
const SP = 3.4;
const hp = (w) => { const A = w.userData.arms, a = new THREE.Vector3(), b = new THREE.Vector3(); A.L.hand.getWorldPosition(a); A.R.hand.getWorldPosition(b); return a.add(b).multiplyScalar(.5); };
start((t) => {
  const u = t / LOOP, tot = SP * 7;
  wk.forEach(({ w }, i) => { const A = w.userData.arms; w.userData.head.rotation.x = .3; w.userData.head.rotation.y = 0; w.userData.carry = 0; wk[i].k = 0; });
  boxes.forEach((b, i) => { const x = ((((u * SP * 2 + i * SP) % tot) + tot) % tot) - tot / 2 + 1; b.position.set(x, .79, 0); b.visible = Math.abs(x) < 7; b.rotation.y = 0; b.userData.x = x; });
  // her işçi, önünden geçen kutuyu iki eliyle tutar, hafifçe kaldırıp bırakır
  wk.forEach((o) => {
    const { w, x } = o, A = w.userData.arms;
    let near = null; boxes.forEach((b) => { if (Math.abs(b.userData.x - x) < 1.1 && (!near || Math.abs(b.userData.x - x) < Math.abs(near.userData.x - x))) near = b; });
    const d = near ? Math.abs(near.userData.x - x) : 2, k = sm(clamp(1 - d / 1.0));
    A.L.sh.rotation.x = lerp(-.25, -1.15, k); A.R.sh.rotation.x = lerp(-.25, -1.15, k); A.L.sh.rotation.z = lerp(0, .35, k); A.R.sh.rotation.z = lerp(0, -.35, k); A.L.el.rotation.x = lerp(-.3, -.95, k); A.R.el.rotation.x = lerp(-.3, -.95, k);
    w.userData.body.rotation.x = .1 * k;
    if (near && k > .55) { const h = hp(w); w.updateMatrixWorld(true); near.position.lerp(new THREE.Vector3(h.x, h.y + .04, h.z - .12), sm(clamp((k - .55) / .45))); }
  });
});
'''
S['makine'] = '''
const { scene, start } = init({ camZ: 13.5 });
const cnc = new THREE.Group(); cnc.position.set(1.1, 0, -.3); scene.add(cnc);
const body = mat.steelL, dark = M({ color: 0x1b2030, roughness: .5 });
cnc.add(at(box(4.0, .35, 1.8, mat.steelD), 0, .17, 0));
cnc.add(at(box(.5, 2.5, 1.8, body), -1.75, 1.6, 0)); cnc.add(at(box(2.25, .5, 1.8, body), -.4, 2.62, 0)); cnc.add(at(box(2.25, .55, 1.8, body), -.4, .62, 0));
cnc.add(at(box(1.25, 2.9, 1.8, body), 1.38, 1.6, 0)); cnc.add(at(box(4.0, .2, 1.8, mat.white), 0, 3.1, 0));
cnc.add(at(box(2.3, 1.9, .1, M({ color: 0x2a3140, roughness: .6 })), -.4, 1.65, -.8));
cnc.add(at(box(2.3, .05, 1.4, M({ color: 0x6b7385, metalness: .8, roughness: .4 })), -.4, .9, 0));
const head = new THREE.Group(); head.position.set(-.4, 2.3, 0); cnc.add(head);
head.add(at(box(.5, .4, .5, mat.steelD), 0, 0, 0)); const sp = cyl(.07, .07, .7, mat.steelL, 16); sp.position.y = -.5; head.add(sp);
const chuck = cyl(.16, .16, .22, mat.steelD, 32); chuck.rotation.z = Math.PI / 2; chuck.position.set(-1.1, 1.5, 0); cnc.add(chuck);
const inPart = mesh(new THREE.CylinderGeometry(.11, .11, .4, 24), mat.steelL); inPart.rotation.z = Math.PI / 2; inPart.position.set(-.85, 1.5, 0); cnc.add(inPart);
cnc.add(at(new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.7), new THREE.MeshPhysicalMaterial({ color: 0x9bb8e0, transparent: true, opacity: .1, roughness: .05, clearcoat: 1 })), -.4, 1.65, .91));
cnc.add(at(box(.9, 1.8, .22, dark), 1.38, 1.75, .98));
cnc.add(at(new THREE.Mesh(new THREE.PlaneGeometry(.7, .5), new THREE.MeshBasicMaterial({ color: 0x2f7fbf })), 1.38, 2.25, 1.1));
for (let i = 0; i < 12; i++) cnc.add(at(box(.14, .09, .03, mat.steelD), 1.15 + (i % 3) * .2, 1.7 - Math.floor(i / 3) * .15, 1.1));
const tray = box(.9, .06, .7, mat.steelD); tray.position.set(-3.7, .85, 1.0); scene.add(tray); scene.add(at(box(.1, .85, .1, mat.steelD), -3.7, .42, 1.0));
const rb = robot({ l1: 1.5, l2: 1.3, m: mat.grayArm }); rb.position.set(-2.7, 0, 1.2); scene.add(rb);
const part = mesh(new THREE.CylinderGeometry(.11, .11, .32, 24), mat.steelL); scene.add(part);
const w = worker(); w.position.set(2.7, 0, 1.9); w.rotation.y = -.2; scene.add(w); floorLight(scene, 2.7, 1.9); floorLight(scene, -2.7, 1.2);
const P = { tray: new THREE.Vector3(-3.7, .98, 1.0), win: new THREE.Vector3(-1.9, 1.5, 1.25), home: new THREE.Vector3(-2.2, 2.0, 1.9) };
const seg = (t, a, b) => sm(clamp((t - a) / (b - a)));
start((t) => {
  const u = t / LOOP; let tg = new THREE.Vector3(), carry = false, gate = 0;
  if (u < .2) { tg.lerpVectors(P.home, P.tray, seg(u, 0, .2)); }
  else if (u < .5) { const k = seg(u, .2, .5); tg.lerpVectors(P.tray, P.win, k); tg.y += Math.sin(k * Math.PI) * .6; carry = true; }
  else if (u < .75) { tg.lerpVectors(P.win, P.home, seg(u, .5, .62)); if (u > .62) tg.copy(P.home); }
  else { const k = seg(u, .75, 1); tg.lerpVectors(P.home, P.tray, k * .0 + 0); tg.copy(P.home).lerp(P.tray, 0); tg.copy(P.home); }
  reach(rb, tg); grip(rb, carry ? .1 : .6);
  const wr = new THREE.Vector3(); rb.userData.wr.localToWorld(wr.set(0, .22, 0));
  const inside = u >= .5 && u < .8;
  part.visible = !inside; inPart.visible = inside; part.rotation.z = Math.PI / 2;
  part.position.copy(carry ? wr : (u < .2 ? P.tray.clone().add(new THREE.Vector3(0, -.12, 0)) : P.tray.clone().add(new THREE.Vector3(0, -.12, 0))));
  if (u >= .8) { part.visible = true; const k = seg(u, .8, 1); part.position.copy(P.win).lerp(P.tray, k).add(new THREE.Vector3(0, -.12 + Math.sin(k * Math.PI) * .5, 0)); if (k < 1) { reach(rb, part.position.clone().add(new THREE.Vector3(0, .12, 0))); grip(rb, .1); } }
  sp.rotation.y = t * 30; chuck.rotation.x = t * 20; head.position.y = 2.3 - (inside ? .08 * Math.sin(t * 3) : 0);
  const A = w.userData.arms; A.R.sh.rotation.x = -1.3 + Math.sin(t * 6) * .06; A.R.el.rotation.x = -.7; A.L.sh.rotation.x = -.25; w.userData.head.rotation.y = -.35; w.userData.head.rotation.x = .1;
});
'''
S['sogutma'] = '''
const { scene, start } = init({ camZ: 13.5 });
const B = belt(30, .75, 0, 1.4); scene.add(B);
const units = []; for (let i = 0; i < 7; i++) { const a = ac(); scene.add(a); units.push(a); }
const rail = box(28, .22, .3, mat.steelD); rail.position.set(0, 5.6, -1.0); scene.add(rail);
const rbs = [-2.6, 2.6].map((x) => { const r = robot({ l1: 1.1, l2: 1.0, m: mat.grayArm }); r.position.set(x, 5.5, -1.0); r.rotation.x = Math.PI; scene.add(r); return r; });
const wA = worker(), wB = worker(); wA.position.set(-1.0, 0, 1.45); wB.position.set(2.0, 0, 1.45); wA.rotation.y = Math.PI - .45; wB.rotation.y = Math.PI + .45; scene.add(wA, wB); floorLight(scene, -1.0, 1.45, 1.3); floorLight(scene, 2.0, 1.45, 1.3); floorLight(scene, 0, 0.3, 1.4);
const clipA = box(.2, .28, .015, M({ color: 0xf2f4f8, roughness: .6 })), clipB = clipA.clone(); wA.userData.arms.L.hand.add(clipA); wB.userData.arms.L.hand.add(clipB); clipA.position.set(0, -.02, .09); clipB.position.set(0, -.02, .09);
const SP = 3.4;
start((t) => {
  const u = t / LOOP, tot = SP * 7;
  units.forEach((a, i) => { const x = ((((u * SP * 2 + i * SP) % tot) + tot) % tot) - tot / 2 + .5; a.position.set(x, .79, 0); a.visible = Math.abs(x) < 7.2; a.userData.fan.rotation.z = t * 9; });
  rbs.forEach((r, i) => { const U = r.userData, k = sm(clamp(Math.sin(u * Math.PI * 2 + i * 2.4) * .5 + .5)); U.tur.rotation.y = lerp(-.3, .3, k); U.a1.rotation.x = lerp(.2, .55, k); U.a2.rotation.x = lerp(.3, .9, k); U.wr.rotation.x = lerp(0, .5, k); grip(r, 1 - k); });
  [[wA, 0], [wB, 1.6]].forEach(([w, ph]) => { const A = w.userData.arms; A.L.sh.rotation.x = -.9; A.L.el.rotation.x = -.9; A.R.sh.rotation.x = -1.1 + Math.sin(t * 4 + ph) * .1; A.R.el.rotation.x = -.8 + Math.sin(t * 4 + ph) * .15; w.userData.head.rotation.x = .25 + Math.sin(t * .9 + ph) * .1; w.userData.head.rotation.y = Math.sin(t * .6 + ph) * .3; });
});
'''
S['enerji'] = '''
const { scene, start } = init({ camZ: 13.5 });
const tr = new THREE.Group(); tr.position.set(.9, 0, -.4); scene.add(tr);
tr.add(at(box(3.0, 2.6, 1.6, mat.steelL), 0, 1.6, 0)); tr.add(at(box(3.2, .25, 1.8, mat.steelD), 0, .15, 0)); tr.add(at(box(3.1, .12, 1.7, mat.white), 0, 2.95, 0));
for (let i = 0; i < 3; i++) { const b = new THREE.Group(); b.position.set(-.9 + i * .9, 3.0, 0); for (let j = 0; j < 4; j++) b.add(at(cyl(.2 - j * .03, .2 - j * .03, .14, M({ color: 0x8a6f58, roughness: .5 }), 24), 0, .1 + j * .17, 0)); b.add(at(cyl(.05, .05, .2, mat.steelL, 12), 0, .8, 0)); tr.add(b); }
for (let i = 0; i < 8; i++) tr.add(at(box(.07, 2.2, .5, mat.steelL), 1.7 + i * .13, 1.7, 0));
const gauge = new THREE.Group(); gauge.position.set(-.8, 1.9, .83); tr.add(gauge);
const gd = cyl(.36, .36, .06, mat.white, 40); gd.rotation.x = Math.PI / 2; gauge.add(gd);
const np = new THREE.Group(); np.position.z = .05; const needle = box(.02, .28, .012, M({ color: 0xd1342c })); needle.position.y = .13; np.add(needle); gauge.add(np);
tr.add(at(new THREE.Mesh(new THREE.PlaneGeometry(.9, .55), new THREE.MeshBasicMaterial({ color: 0x0f1420 })), .6, 1.8, .83));
const bar = new THREE.Mesh(new THREE.PlaneGeometry(.7, .06), new THREE.MeshBasicMaterial({ color: 0x38e58e })); bar.position.set(.6, 1.78, .84); tr.add(bar);
for (const x of [-3.9, -2.7]) { const c = new THREE.Group(); c.position.set(x, 0, .4); c.add(at(box(1.0, 2.4, .7, mat.steelL), 0, 1.2, 0)); c.add(at(box(.6, .5, .02, M({ color: 0x14202e })), 0, 1.6, .36)); const l = new THREE.Mesh(new THREE.CircleGeometry(.05, 16), new THREE.MeshBasicMaterial({ color: 0x38e58e })); l.position.set(.3, 2.1, .36); c.add(l); scene.add(c); }
const wA = worker(), wB = worker(); wA.position.set(-.3, 0, 2.0); wB.position.set(-3.3, 0, 1.9); wA.rotation.y = .35; wB.rotation.y = .15; scene.add(wA, wB); floorLight(scene, -.3, 2.0); floorLight(scene, -3.3, 1.9);
const clip = box(.2, .28, .015, M({ color: 0xf2f4f8, roughness: .6 })); wB.userData.arms.L.hand.add(clip); clip.position.set(0, -.02, .09);
start((t) => {
  const u = t / LOOP; np.rotation.z = Math.sin(u * Math.PI * 2) * .5 - .2; bar.scale.x = .55 + .4 * Math.pow(Math.sin(u * Math.PI * 4), 2);
  const A = wA.userData.arms, B = wB.userData.arms;
  wA.userData.head.rotation.y = .2; A.R.sh.rotation.x = -.35; A.L.sh.rotation.x = -.15;
  B.L.sh.rotation.x = -1.15; B.L.el.rotation.x = -.8; B.R.sh.rotation.x = -1.2 + Math.sin(u * 40) * .05; B.R.el.rotation.x = -.95; wB.userData.head.rotation.x = .25;
});
'''
for k, v in S.items():
    open(k + '.html', 'w').write(HEAD % k + v + TAIL)
print('ok')
