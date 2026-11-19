(function(){
  var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  var intro=$('#intro'), body=document.body, done=false, timers=[];

  /* ---------- Giriş: eller uzanır, dokunur, BARVION GROUP, perde açılır ---------- */
  function finish(){
    if(done)return;done=true;timers.forEach(clearTimeout);
    intro.classList.add('title','open');
    setTimeout(function(){intro.classList.add('gone');body.classList.remove('is-loading')},1700);
  }
  var seen=false;try{seen=sessionStorage.getItem('bv-intro')==='1'}catch(e){}
  if(!intro){}
  else if(seen||matchMedia('(prefers-reduced-motion:reduce)').matches){intro.classList.add('gone');body.classList.remove('is-loading')}
  else{
    try{sessionStorage.setItem('bv-intro','1')}catch(e){}
    var fr=$$('#frames .ifr');
    function showF(i){fr.forEach(function(f,j){f.classList.toggle('on',j===i)})}
    showF(0);
    fr.forEach(function(_,i){if(i>0)timers.push(setTimeout(function(){showF(i)},i*1150))});
    timers.push(setTimeout(function(){intro.classList.add('touch')},5300));
    timers.push(setTimeout(function(){intro.classList.add('title')},5900));
    timers.push(setTimeout(finish,8800));
    if($('#skip'))$('#skip').onclick=finish;
  }

  /* ---------- Menü ---------- */
  var header=$('#header'),burger=$('#burger'),navEl=$('#nav');
  function sc(){header.classList.toggle('solid',scrollY>60)}
  addEventListener('scroll',sc,{passive:true});sc();
  function setMenu(open){
    header.classList.toggle('is-open',open);document.body.classList.toggle('menu-open',open);
    burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');
    if(open){var f=navEl.querySelector('a');if(f)setTimeout(function(){f.focus()},30)}
  }
  burger.onclick=function(){setMenu(!header.classList.contains('is-open'))};
  $$('#nav a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  document.addEventListener('keydown',function(e){
    if(!header.classList.contains('is-open'))return;
    if(e.key==='Escape'){setMenu(false);burger.focus();return}
    if(e.key==='Tab'){
      var items=[burger].concat($$('#nav a')).filter(function(x){return x.offsetParent!==null});
      var i=items.indexOf(document.activeElement);
      if(e.shiftKey&&(i<=0)){e.preventDefault();items[items.length-1].focus()}
      else if(!e.shiftKey&&(i===items.length-1)){e.preventDefault();items[0].focus()}
    }
  });
  matchMedia('(min-width:901px)').addEventListener('change',function(m){if(m.matches)setMenu(false)});

  /* ---------- Belirme ---------- */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('rv-in');io.unobserve(e.target)}})},{threshold:0,rootMargin:'0px 0px 12% 0px'});
  $$('.rv').forEach(function(el){io.observe(el)});

  /* ---------- Hero video ---------- */
  var v=$('#vid');
  if(v){v.muted=true;
  var play=function(){v.play().catch(function(){})};play();
  ['touchstart','pointerdown','scroll'].forEach(function(n){addEventListener(n,function(){if(v.paused)play()},{passive:true,once:true})});
  new IntersectionObserver(function(e){e[0].isIntersecting?play():v.pause()}).observe($('#ana-sayfa'));}

  /* ---------- Yaklaşım: kaydırdıkça 01 · 02 · 03 · 04 (masaüstü); mobilde dokunma/otomatik ---------- */
  var st=$$('#steps li'),sl=$$('.sl'),stt=$$('.stt'),ci=-1,story=$('#story');
  function pick(i){if(i===ci)return;ci=i;st.forEach(function(l,k){l.classList.toggle('on',k===i)});sl.forEach(function(x,k){x.classList.toggle('on',k===i)});stt.forEach(function(x,k){x.classList.toggle('on',k===i)})}
  if(st.length){
    var wide=function(){return matchMedia('(min-width:961px)').matches};
    pick(0);
    var want=0,last=0;
    function onStory(){
      if(!story||!wide())return;
      var r=story.getBoundingClientRect(),span=story.offsetHeight-innerHeight;if(span<=0)return;
      var p=Math.max(0,Math.min(1,-r.top/span));
      want=Math.min(st.length-1,Math.floor(p*st.length*.999));
      step();
    }
    var settle;
    function step(){
      if(want===ci)return;var n=performance.now();
      if(n-last>=700){last=n;pick(ci+(want>ci?1:-1))}
      clearTimeout(settle);settle=setTimeout(onStory,720);
    }
    addEventListener('scroll',onStory,{passive:true});addEventListener('resize',onStory);onStory();
    st.forEach(function(l,i){$('button',l).onclick=function(){
      if(wide()&&story){var span=story.offsetHeight-innerHeight;scrollTo({top:story.getBoundingClientRect().top+scrollY+span*(i+.5)/st.length,behavior:'auto'});want=i;last=0;pick(i)}else pick(i)}});
    setInterval(function(){if(!wide())pick((ci+1)%st.length)},6000);
  }

  /* ---------- Açılış: her cümle kendi videosuyla, başlık harf harf belirir ---------- */
  var hs=$$('.hslide'),hd=$$('#hdots button'),hv=$$('#hmedia .hv'),hi=0,hstart=performance.now(),HD=9000;
  function splitChars(el){
    var n=0;
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(c){
        if(c.nodeType===3){
          var f=document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function(w){
            if(!w)return;
            if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(' '));return}
            var ws=document.createElement('span');ws.className='hw';
            w.split('').forEach(function(ch){var s=document.createElement('span');s.className='hc';s.style.setProperty('--d',(n++*38)+'ms');s.textContent=ch;ws.appendChild(s)});
            f.appendChild(ws);
          });
          c.parentNode.replaceChild(f,c);
        }else if(c.nodeType===1)walk(c);
      });
    })(el);
  }
  hs.forEach(function(s){var t=$('h1',s);if(t){t.setAttribute('aria-label',t.textContent);splitChars(t)}});
  function hshow(k){hi=k;
    hs.forEach(function(x,i){x.classList.toggle('on',i===k)});
    hd.forEach(function(d,i){d.classList.toggle('on',i===k);$('i',d).style.setProperty('--p',0)});
    hv.forEach(function(v,i){
      if(hv.length===1)return;
      v.classList.toggle('on',i===k);
      if(i===k){try{v.currentTime=0}catch(e){};var p=v.play();if(p&&p.catch)p.catch(function(){})}
      else setTimeout(function(){if(!v.classList.contains('on'))v.pause()},1000);
    });
    hstart=performance.now()}
  if(hs.length){
    hv.forEach(function(v){v.muted=true});
    hd.forEach(function(d,i){d.onclick=function(){hshow(i)}});
    (function t(now){var p=Math.min(1,(now-hstart)/HD);$('i',hd[hi]).style.setProperty('--p',p.toFixed(3));if(p>=1)hshow((hi+1)%hs.length);requestAnimationFrame(t)})(performance.now());
  }

  /* ---------- Sayfa videoları: görünürken oynar ---------- */
  var vio=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.1});
  $$('video[data-auto]').forEach(function(v){v.muted=true;vio.observe(v)});

  /* ---------- Adımlı çözüm sahneleri ---------- */
  $$('.sv').forEach(function(sv){
    var n=+sv.getAttribute('data-n'),cur=0,btns=$$('.sv__s',sv),sts=$$('.st',sv),tm,vis=false,D=4400;
    sv.style.setProperty('--d',D+'ms');
    function set(i){cur=i;sv.setAttribute('data-step',i);
      sts.forEach(function(g){g.classList.toggle('on',(g.getAttribute('data-in')||'').split(',').indexOf(String(i))>-1)});
      btns.forEach(function(b,k){b.classList.remove('on');if(k===i-1){void b.offsetWidth;b.classList.add('on')}})}
    function run(){clearInterval(tm);tm=setInterval(function(){if(vis)set(cur%n+1)},D)}
    btns.forEach(function(b){b.onclick=function(){set(+b.getAttribute('data-i'));run()}});
    new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis&&!cur)set(1)},{threshold:.25}).observe(sv);
    set(1);run();
  });

  /* ---------- FOLGAN akışı ---------- */
  $$('[data-ff]').forEach(function(ff){
    var ss=$$('.ff__s',ff),bs=$$('.stp b',ff),k=0;
    function go(i){var p=k;k=i;ss.forEach(function(s,n){s.classList.toggle('prev',n===p&&p!==i);s.classList.toggle('on',n===i)});bs.forEach(function(b,n){b.classList.toggle('on',n===i)})}
    bs.forEach(function(b,n){b.onclick=function(){go(n)}});
    setInterval(function(){go((k+1)%ss.length)},3200);
  });

  /* ---------- Çözümler akordeon ---------- */
  $$('.work__h').forEach(function(b){b.onclick=function(){var w=b.parentNode,o=w.classList.contains('on');$$('.work').forEach(function(x){x.classList.remove('on')});if(!o)w.classList.add('on')}});

  /* ---------- Kayan yazı ---------- */
  var m=$('#marq');if(m)m.innerHTML+=m.innerHTML;


  /* ---- Marka laboratuvarı + panolar (Mallow'dan) ---- */
  var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  $$('[data-brand-themes]').forEach((lab) => {
    const pin = $('.tl-pin', lab), stage = $('.tl-stage', lab);
    const layers = $$('[data-theme-layer]', lab), dots = $$('[data-theme-dot]', lab);
    const controls = $('.tl-controls', lab);
    const status = $('[data-theme-status]', lab), motion = matchMedia('(prefers-reduced-motion: reduce)');
    const last = layers.length - 1, clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
    let value = 0, active = -1, pinned = false, visible = false, paused = motion.matches;
    let timer = 0, frame = 0, scrollFrame = 0, resizeFrame = 0, travel = 1, header = 72;
    controls.hidden = false;

    const draw = (position) => {
      value = clamp(position, 0, last);
      const base = Math.min(Math.floor(value), last), next = Math.min(base + 1, last);
      const wipe = clamp((value - base - .12) / .78), y = 116 - wipe * 132;
      layers.forEach((layer, i) => {
        layer.hidden = i !== base && !(wipe > 0 && i === next);
        if (layer.hidden) return;
        layer.style.zIndex = i === base ? '0' : '1';
        layer.style.clipPath = i === base ? 'none' : `polygon(0 ${y}%, 100% ${y + 16}%, 100% 100%, 0 100%)`;
      });
      const selected = wipe > .5 ? next : base;
      if (selected !== active) {
        active = selected;
        dots.forEach((d, i) => d.classList.toggle('is-on', i === selected));
        status.textContent = dots[selected]?.dataset.themeName || '';
      }
    };
    const syncPlayback = () => {};
    const schedule = () => {
      clearTimeout(timer);
      if (!pinned && visible && !paused && !document.hidden && !motion.matches) {
        timer = setTimeout(() => {
          // Son temadan başa dönüş de aynı yönde süpürülür; sahne bir anda sıçramaz.
          if (active === last) transition(0, true);
          else transition(active + 1);
        }, 3600);
      }
    };
    const transition = (target, wrap = false) => {
      clearTimeout(timer); cancelAnimationFrame(frame);
      if (motion.matches) { draw(target); return; }
      const from = value, start = performance.now(), duration = 1450;
      const tick = (now) => {
        const p = clamp((now - start) / duration), eased = p * p * (3 - 2 * p);
        if (wrap) {
          layers.forEach((l, i) => { l.hidden = i !== 0 && i !== last; });
          layers[last].style.zIndex = '0'; layers[last].style.clipPath = 'none';
          layers[0].style.zIndex = '1';
          const y = 116 - eased * 132;
          layers[0].style.clipPath = `polygon(0 ${y}%, 100% ${y + 16}%, 100% 100%, 0 100%)`;
        } else draw(from + (target - from) * eased);
        if (p < 1) frame = requestAnimationFrame(tick);
        else { frame = 0; draw(target); schedule(); }
      };
      frame = requestAnimationFrame(tick);
    };
    const scrub = () => {
      scrollFrame = 0;
      if (pinned) draw(clamp((header - lab.getBoundingClientRect().top) / travel) * last);
    };
    const layout = () => {
      cancelAnimationFrame(frame); frame = 0;
      header = $('#header')?.offsetHeight || 72;
      lab.classList.remove('is-scroll');
      // Bölüm her ekranda kaydırmayla ilerler: sayfa aşağı indikçe tema değişir.
      const available = innerHeight - header - $('.brand-themes__head', lab).offsetHeight - controls.offsetHeight - 54;
      pinned = available >= 240;
      lab.classList.toggle('is-scroll', pinned);
      if (pinned) {
        travel = Math.round(innerHeight * 1.85);
        lab.style.setProperty('--tl-stage-h', `${Math.min(available, 580)}px`);
        lab.style.setProperty('--tl-travel', `${travel}px`);
        lab.style.setProperty('--tl-pin-h', `${pin.offsetHeight}px`);
        scrub();
      } else draw(active < 0 ? 0 : active);
      syncPlayback(); schedule();
    };
    const suspend = () => {
      if (!visible || document.hidden) { cancelAnimationFrame(frame); frame = 0; if (!pinned) draw(active); }
      schedule();
    };
    if ('IntersectionObserver' in window) new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting; suspend();
    }, { threshold: .15 }).observe(stage);
    else visible = true;
    addEventListener('scroll', () => { if (pinned && !scrollFrame) scrollFrame = requestAnimationFrame(scrub); }, { passive: true });
    addEventListener('resize', () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(layout); }, { passive: true });
    document.addEventListener('visibilitychange', suspend);
    motion.addEventListener('change', () => { if (motion.matches) paused = true; layout(); });
    layout();
    document.fonts?.ready.then(layout);
  });

  /* Marka panosu: fare hareketiyle kartlar farklı derinlikte kayar (--d), panoya derinlik verir. */
  if (!RM && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $$("[data-parallax]").forEach((bb) => {
      const alan = bb.closest("section") || bb;
      let kare = 0;
      alan.addEventListener("pointermove", (e) => {
        const r = alan.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 2 - 1, y = ((e.clientY - r.top) / r.height) * 2 - 1;
        cancelAnimationFrame(kare);
        kare = requestAnimationFrame(() => { bb.style.setProperty("--mx", x.toFixed(3)); bb.style.setProperty("--my", y.toFixed(3)); });
      });
      alan.addEventListener("pointerleave", () => { bb.style.setProperty("--mx", "0"); bb.style.setProperty("--my", "0"); });
    });
  }


  /* ---------- Form ---------- */
  var form=$('#form'),sel=document.querySelector('select[name=cozum]');
  function setCozum(v){if(!sel||!v)return;var o=[].slice.call(sel.options).filter(function(x){return x.text.trim()===v.trim()})[0];if(o)sel.value=o.value||o.text}
  setCozum(new URLSearchParams(location.search).get('cozum'));
  if(location.pathname.indexOf('/urunler')===0&&!sel.value)setCozum('FOLGAN Bakım Yönetimi');
  $$('[data-cozum]').forEach(function(a){a.addEventListener('click',function(){setCozum(a.getAttribute('data-cozum'))})});
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var st=$('#fstatus'),btn=form.querySelector('button[type=submit]');
    if(!form.checkValidity()){form.reportValidity();return}
    var f=new FormData(form),ep=form.getAttribute('data-endpoint')||'';
    function mailto(){
      var b='Ad Soyad: '+f.get('ad')+'\nFirma: '+f.get('firma')+'\nGörev: '+f.get('gorev')+'\nE-posta: '+f.get('mail')+'\nTelefon: '+f.get('tel')+'\nÇözüm: '+f.get('cozum')+'\n\n'+f.get('mesaj');
      location.href='mailto:baran@barviongroup.com?subject='+encodeURIComponent('Görüşme Talebi')+'&body='+encodeURIComponent(b);
    }
    btn.disabled=true;st.className='fstatus full';st.textContent='Gönderiliyor…';
    if(!ep||ep.indexOf('FORM_ENDPOINT')===0){st.className='fstatus full err';st.textContent='Gönderim adresi henüz tanımlanmadı; e-posta uygulamanız açılıyor.';btn.disabled=false;mailto();return}
    fetch(ep,{method:'POST',body:f,headers:{Accept:'application/json'}}).then(function(r){
      if(!r.ok)throw new Error(r.status);form.reset();st.className='fstatus full ok';st.textContent='Talebiniz alındı. En kısa sürede size dönüş yapacağız.';
    }).catch(function(){st.className='fstatus full err';st.innerHTML='Gönderilemedi. Lütfen tekrar deneyin veya <a href="mailto:baran@barviongroup.com" style="text-decoration:underline">e-posta ile yazın</a>.'}).then(function(){btn.disabled=false});
  });
})();

/* ---------- Performans: videolar yalnız görünürken oynar; tasarruf modunda / azaltılmış harekette durur ---------- */
(function(){
  var vs=[].slice.call(document.querySelectorAll('video'));if(!vs.length)return;
  var c=navigator.connection||{},lite=(c.saveData===true)||/(^|-)2g$/.test(c.effectiveType||'')||matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(lite){vs.forEach(function(v){v.removeAttribute('autoplay');v.pause();v.preload='none'});return}
  var hero=document.querySelector('#hmedia .hv');
  if(hero&&'IntersectionObserver' in window){new IntersectionObserver(function(e){var v=hero;if(e[0].isIntersecting){var p=v.play();p&&p.catch&&p.catch(function(){})}else v.pause()},{threshold:.05}).observe(document.getElementById('hmedia'))}
  document.addEventListener('visibilitychange',function(){if(document.hidden)vs.forEach(function(v){v.pause()});else if(hero){var p=hero.play();p&&p.catch&&p.catch(function(){})}});
})();

/* ---------- Safari / düşük güç modu: otomatik oynatma engellenirse ilk dokunuşta ve periyodik olarak yeniden dener ---------- */
(function(){
  var vs=[].slice.call(document.querySelectorAll('video'));if(!vs.length)return;
  var cn=navigator.connection||{},off=cn.saveData===true||matchMedia('(prefers-reduced-motion:reduce)').matches;if(off)return;
  function vis(v){var r=v.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}
  function kick(){vs.forEach(function(v){v.muted=true;v.setAttribute('playsinline','');if(v.paused&&vis(v)&&!document.hidden){var p=v.play();p&&p.catch&&p.catch(function(){})}})}
  kick();setTimeout(kick,400);setTimeout(kick,1500);
  ['pointerdown','touchstart','keydown','wheel','scroll','click'].forEach(function(n){addEventListener(n,kick,{passive:true})});
  vs.forEach(function(v){v.addEventListener('loadeddata',kick);v.addEventListener('canplay',kick)});
})();
