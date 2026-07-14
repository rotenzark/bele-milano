/* ============ BELÈ MILANO — interazioni ============ */
(function(){
  'use strict';

  var intro=document.getElementById('intro');
  if(intro){
    window.addEventListener('load',function(){setTimeout(function(){intro.classList.add('gone');},1200);});
    setTimeout(function(){intro.classList.add('gone');},2700);
  }

  /* orari (getDay 0=Dom..6=Sab) */
  var HOURS={0:[],1:[[10,19]],2:[[10,19]],3:[[10,19]],4:[[10,19]],5:[[10,19]],6:[]};
  var DAYS_IT=['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
  var DAYS_EN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function romeNow(){try{return new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Rome'}));}catch(e){return new Date();}}
  function fmt(h){var hh=Math.floor(h),mm=Math.round((h-hh)*60);return hh+(mm?(':'+(mm<10?'0':'')+mm):'');}
  function computeStatus(){
    var now=romeNow(),d=now.getDay(),cur=now.getHours()+now.getMinutes()/60,today=HOURS[d]||[],i,w;
    for(i=0;i<today.length;i++){w=today[i];if(cur>=w[0]&&cur<w[1])return {open:true,until:w[1]};}
    for(i=0;i<today.length;i++){if(cur<today[i][0])return {open:false,next:today[i][0],nextDay:d,sameDay:true};}
    for(var k=1;k<=7;k++){var nd=(d+k)%7,arr=HOURS[nd]||[];if(arr.length)return {open:false,next:arr[0][0],nextDay:nd,sameDay:false};}
    return {open:false};
  }
  function renderStatus(lang){
    var s=computeStatus(),badge=document.getElementById('openBadge');if(!badge)return;
    var t=badge.querySelector('.t'),en=(lang==='en');badge.classList.toggle('op',s.open);
    if(s.open){t.innerHTML='<b>'+(en?'Open now':'Aperto ora')+'</b>'+(en?'until ':'fino alle ')+fmt(s.until);}
    else if(s.next!=null){var day=s.sameDay?(en?'today':'oggi'):(en?DAYS_EN[s.nextDay]:DAYS_IT[s.nextDay]);t.innerHTML='<b>'+(en?'Closed':'Chiuso')+'</b>'+(en?'opens ':'apre ')+day+' '+fmt(s.next);}
    else{t.innerHTML='<b>'+(en?'Closed':'Chiuso')+'</b>'+(en?'see hours':'vedi orari');}
  }
  function renderHours(lang){
    var box=document.getElementById('hoursList');if(!box)return;var en=(lang==='en'),today=romeNow().getDay(),order=[1,2,3,4,5,6,0];
    box.innerHTML=order.map(function(d){
      var arr=HOURS[d]||[],label=en?DAYS_EN[d]:DAYS_IT[d];
      var val=arr.length?arr.map(function(w){return fmt(w[0])+'–'+fmt(w[1]);}).join(' · '):(en?'Closed':'Chiuso');
      return '<div class="hourrow'+(d===today?' today':'')+'"><span class="d">'+label+'</span><span>'+val+'</span></div>';
    }).join('');
  }

  /* i18n */
  var I18N={en:{
    "nav.story":"Story","nav.bench":"The bench","nav.serv":"What we do","nav.gallery":"Jewels","nav.visit":"Find us",
    "bar.book":"Contact us",
    "hero.kick":"Goldsmith workshop · Milan Porta Romana",
    "hero.h1":"Jewellery made<br>by hand, <em>at the bench</em>",
    "hero.sub":"Belè is a goldsmith's workshop in the heart of Milan: fifty years of craft passed from father to son, and jewels shaped one by one — bespoke, restored, reinvented.",
    "hero.book":"Come to the bench","hero.serv":"What we do",
    "hero.f1n":"50","hero.f1l":"years of craft",
    "hero.f2n":"4,5★","hero.f2l":"Google reviews",
    "hero.f3n":"1:1","hero.f3l":"made to order",
    "hero.tag":"corallo & oro","hero.tagl":"handmade",
    "ribbon":"CREAZIONI SU MISURA · RESTAURI · CORALLO · ORO · GIOIELLI ANTICHI · PIETRE PREZIOSE · INCISIONI · AL BANCHETTO ·",
    "story.kick":"Since 2015 · a craft of fifty years",
    "story.h2":"Fifty years, <em>from father to son</em>",
    "story.p1":"Belè opened as a workshop in April 2015, but its craft was born more than fifty years ago — passed down from father to son, day after day, bent over the goldsmith's bench.",
    "story.pull":"“The culture of reuse meets a refined taste — extraordinary, timeless jewels.”",
    "story.p2":"The idea was to put every skill of the goldsmith's art directly at the client's service: to give form to the most personal desires. A corner of Milan where old meets new, and an ancient craft is kept alive — simply, by coming to the bench.",
    "story.sign":"Giacomo & his son · goldsmiths",
    "bench.kick":"Al banchetto",
    "bench.h2":"From a wish <em>to a jewel</em>",
    "bench.sub":"Every bespoke piece follows the same short path — from a first idea to the finished jewel, all made here, at the bench.",
    "s1.n":"01","s1.t":"L'idea","s1.p":"You bring a wish, a stone, an old piece to reinvent. We listen and imagine it together.",
    "s2.n":"02","s2.t":"Il disegno","s2.p":"The idea becomes a sketch: form, metal, stones — until the drawing feels right.",
    "s3.n":"03","s3.t":"Il banchetto","s3.p":"At the bench, by hand: casting, setting, engraving, gilding. The craft of fifty years.",
    "s4.n":"04","s4.t":"Il gioiello","s4.p":"A one-of-a-kind piece, yours — timeless, and made to last a lifetime.",
    "serv.kick":"In bottega",
    "serv.h2":"What we do",
    "v1.t":"Creazioni su misura","v1.p":"Bespoke jewellery in gold and silver, designed and made by hand to your wish.",
    "v2.t":"Gioielli antichi e d'epoca","v2.p":"A selection of antique and vintage jewels — and the culture of giving them new life.",
    "v3.t":"Restauri e rimesse a nuovo","v3.p":"Repair and restoration of modern and antique jewels in gold, silver, bronze, copper, brass and steel.",
    "v4.t":"Incassature e incisioni","v4.p":"Stone settings, engravings, gilding, silvering, stringing and stone cutting.",
    "v5.t":"Pietre e corallo","v5.p":"Diamonds, precious and semi-precious stones, hard stones and the red coral we love.",
    "v6.t":"Orologi","v6.p":"Repair of modern and antique watches and battery changes, with the finest specialists.",
    "gal.kick":"The jewels",
    "gal.h2":"Made one <em>by one</em>",
    "rev.kick":"What people say","rev.h2":"A small treasure","rev.sub":"4,5 on Google",
    "rc1":"“A rare and precious place in Milan, a small heritage to protect. The culture of reuse meets refined taste — extraordinary, timeless jewels.”",
    "rc1m":"Marco Groppi · Google",
    "rc2":"“A fine artisan jewellery shop! Beautiful necklaces, bracelets and earrings, all handmade. Giacomo is a truly skilful goldsmith.”",
    "rc2m":"Luca Angelo Turcato · Local Guide",
    "rc3":"“A historic bottega in the centre of Milan with impeccable service. A shop from another time — ready-made pieces, and jewels made to measure.”",
    "rc3m":"Martina Potesilova · Local Guide",
    "visit.kick":"Find us","visit.h2":"Via Osti 6, Porta Romana",
    "visit.addr":"Address","visit.hours":"Opening hours","visit.phone":"Phone","visit.email":"Email","visit.book":"Contact us","visit.dir":"Directions",
    "faq.kick":"Good to know","faq.h2":"Questions & answers",
    "q1":"Where is Belè and what is it?","a1":"Belè is a goldsmith's workshop (laboratorio orafo) at Via Osti 6, in the Porta Romana / Crocetta area of central Milan, near the old Ca' Granda. It opened in 2015, carrying on a craft of over fifty years.",
    "q2":"Do you make bespoke jewellery?","a2":"Yes. Made-to-order pieces are the heart of what we do: bring an idea, a stone or an old jewel to reinvent, and we shape it by hand at the bench, in gold or silver.",
    "q3":"Do you repair and restore old jewellery?","a3":"Yes — we repair and restore modern, antique and vintage jewels in gold, silver, bronze, copper, brass and steel, with settings, engravings, gilding, silvering and stone cutting.",
    "q4":"Do you buy or sell antique jewellery?","a4":"We sell jewels of our own making and a selection of antique and vintage pieces, along with diamonds, precious and semi-precious stones and coral.",
    "q5":"When are you open?","a5":"Monday to Friday, 10:00–19:00. Closed Saturday and Sunday. For a bespoke piece it's best to call ahead: 349 128 2688.",
    "ft.tag":"Goldsmith's workshop in Porta Romana, Milan. Bespoke jewellery, restoration and antique pieces — made by hand, at the bench.",
    "ft.explore":"Explore","ft.contact":"Contact","ft.rights":"Demo site — not the official workshop site.",
    "ft.disc":"Independent demonstration site created to show a possible online presence for Belè Milano. Photos, reviews and details come from public sources (Google Maps and the workshop's own site) and belong to their owners. Not affiliated with the workshop."
  }};
  var current='it',ITCACHE={};
  function collectIT(){document.querySelectorAll('[data-i18n]').forEach(function(el){ITCACHE[el.getAttribute('data-i18n')]=el.innerHTML;});}
  function apply(lang){
    current=lang;var dict=(lang==='en')?I18N.en:null;
    document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(lang==='en'){if(dict[k]!=null)el.innerHTML=dict[k];}else{if(ITCACHE[k]!=null)el.innerHTML=ITCACHE[k];}});
    document.documentElement.lang=lang;
    document.querySelectorAll('.lang button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-l')===lang);});
    renderHours(lang);renderStatus(lang);
  }

  function initReveal(){
    var els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    els.forEach(function(e){io.observe(e);});
  }

  document.addEventListener('DOMContentLoaded',function(){
    collectIT();
    document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){apply(b.getAttribute('data-l'));});});
    var burger=document.querySelector('.burger'),links=document.querySelector('nav.links');
    if(burger){burger.addEventListener('click',function(){
      if(links.style.display==='flex'){links.style.display='';}
      else{links.style.display='flex';links.style.position='absolute';links.style.top='72px';links.style.right='20px';links.style.flexDirection='column';links.style.background='var(--paper)';links.style.padding='16px 22px';links.style.border='1px solid var(--line)';links.style.boxShadow='var(--shadow)';}
    });}
    document.querySelectorAll('nav.links a').forEach(function(a){a.addEventListener('click',function(){if(links&&window.innerWidth<=940)links.style.display='';});});
    renderHours('it');renderStatus('it');initReveal();
    setInterval(function(){renderStatus(current);},60000);
  });
})();
