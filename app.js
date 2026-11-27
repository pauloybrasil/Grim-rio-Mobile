// v91: instalar no celular e baixar tudo para jogar sem internet
(function(){
 const SVG='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
 let pedido=null,reg=null;
 const instalado=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
 if('serviceWorker' in navigator&&location.protocol==='https:'||location.hostname==='localhost'){
  navigator.serviceWorker&&navigator.serviceWorker.register('sw.js').then(r=>{reg=r;}).catch(()=>{});}
 addEventListener('beforeinstallprompt',e=>{e.preventDefault();pedido=e;atualiza();});
 addEventListener('appinstalled',()=>{pedido=null;atualiza();toast&&toast('Jogo instalado no celular');});
 // lista do que precisa vir da internet: vozes, efeitos, música e a narração da História
 function listaExtra(){const B=(typeof AUD_BASE!=='undefined'?AUD_BASE:'');const L=[];
  try{const d=window.__audIdx;if(d){(d.lotes||[]).forEach(x=>L.push(B+x.arq));Object.values(d.sfx||{}).forEach(a=>L.push(B+a));Object.values(d.musica||{}).forEach(a=>L.push(B+a));}}catch(e){}
  for(let i=0;i<=16;i++){const k='h'+String(i).padStart(2,'0');L.push(B+'hist/'+k+'.mp3',B+'hist/'+k+'.json');}
  L.push('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
  return [...new Set(L)];}
 fetch('audio/indice.json').then(r=>r.json()).then(d=>{window.__audIdx=d;}).catch(()=>{});
 // botão no menu
 const bar=document.querySelector('.mA-b');
 if(bar){bar.style.gridTemplateColumns='repeat(5,1fr)';const b=document.createElement('button');b.id='appBtn';
  b.innerHTML=SVG+'<path d="M12 4v11"/><path d="M7.5 10.5 12 15l4.5-4.5"/><path d="M5 19h14"/></svg>Baixar';bar.appendChild(b);b.onclick=abrir;}
 const css=document.createElement('style');css.textContent=`#appSheet{position:absolute;inset:0;z-index:95;display:none;align-items:center;justify-content:center;padding:22px;background:rgba(3,7,10,.88)}#appSheet.on{display:flex}
 #appSheet .ap-b{width:100%;max-width:330px;padding:22px 20px;border:1px solid rgba(200,170,110,.45);border-radius:6px;background:linear-gradient(#0d1a22,#070d12);color:#f0e6d2;box-shadow:0 20px 60px rgba(0,0,0,.6)}
 #appSheet h3{margin:0 0 4px;font:600 19px/1.2 Cinzel,serif;letter-spacing:.05em;color:#c8aa6e;text-align:center}#appSheet p{margin:8px 0;font:400 14px/1.45 Inter,sans-serif;color:#d8d2c2}
 #appSheet .ap-x{display:block;width:100%;margin-top:12px;padding:13px;border:1px solid #c8aa6e;border-radius:4px;background:linear-gradient(#c8aa6e,#8a6f3e);color:#120c04;font:700 13px Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase}
 #appSheet .ap-x.sec{background:transparent;color:#f0e6d2;border-color:rgba(200,170,110,.45)}#appSheet .ap-x:disabled{opacity:.5}
 #appSheet .ap-bar{height:6px;margin-top:10px;border-radius:3px;background:rgba(255,255,255,.1);overflow:hidden}#appSheet .ap-bar i{display:block;height:100%;width:0;background:#c8aa6e;transition:width .2s}
 #appSheet ol{margin:6px 0 0;padding-left:20px;font:400 14px/1.5 Inter,sans-serif;color:#d8d2c2}#appSheet .ap-ok{color:#7dffa8}`;document.head.appendChild(css);
 const sh=document.createElement('div');sh.id='appSheet';sh.innerHTML='<div class="ap-b"><h3>Jogar no celular</h3><div id="apInst"></div><p style="margin-top:16px"><b>Sem internet</b>: o jogo contra o computador e a História funcionam offline depois de baixar. O online com amigo precisa de internet.</p><button class="ap-x" id="apBaixar">Baixar tudo para jogar sem internet</button><div class="ap-bar"><i id="apProg"></i></div><p id="apMsg" style="font-size:12px;opacity:.8"></p><button class="ap-x sec" id="apFechar">Fechar</button></div>';
 (document.getElementById('phone')||document.body).appendChild(sh);
 function atualiza(){const el=document.getElementById('apInst');if(!el)return;
  if(instalado())el.innerHTML='<p class="ap-ok">O jogo já está instalado neste aparelho.</p>';
  else if(pedido)el.innerHTML='<p>Instale o Grimório como um aplicativo: ele ganha ícone na tela inicial e abre em tela cheia.</p><button class="ap-x" id="apInstalar">Instalar no celular</button>';
  else if(ios)el.innerHTML='<p>No iPhone, instale pelo Safari:</p><ol><li>Toque em <b>Compartilhar</b> (o quadrado com a seta).</li><li>Escolha <b>Adicionar à Tela de Início</b>.</li><li>Toque em <b>Adicionar</b>.</li></ol>';
  else el.innerHTML='<p>No Android, abra o menu do navegador (os três pontos) e toque em <b>Instalar aplicativo</b> ou <b>Adicionar à tela inicial</b>.</p>';
  const bi=document.getElementById('apInstalar');if(bi)bi.onclick=async()=>{if(!pedido)return;pedido.prompt();try{await pedido.userChoice;}catch(e){}pedido=null;atualiza();};}
 function abrir(){atualiza();sh.classList.add('on');try{if(localStorage.getItem('gm-offline'))document.getElementById('apMsg').textContent='Já baixado em '+localStorage.getItem('gm-offline')+'. Toque de novo para atualizar.';}catch(e){}}
 document.getElementById('apFechar').onclick=()=>sh.classList.remove('on');
 document.getElementById('apBaixar').onclick=async()=>{const bt=document.getElementById('apBaixar'),msg=document.getElementById('apMsg'),pr=document.getElementById('apProg');
  if(!('serviceWorker' in navigator)){msg.textContent='Este navegador não permite jogar sem internet.';return;}
  bt.disabled=true;msg.textContent='Preparando…';const r=await navigator.serviceWorker.ready;const ctl=r.active;if(!ctl){msg.textContent='Tente de novo em alguns segundos.';bt.disabled=false;return;}
  if(navigator.storage&&navigator.storage.persist)try{await navigator.storage.persist();}catch(e){}
  const L=listaExtra();
  const ouve=e=>{const d=e.data||{};if(d.tipo!=='progresso'&&d.tipo!=='fim')return;pr.style.width=Math.round(100*(d.ok+d.falha)/d.total)+'%';
   const mb=(d.bytes/1048576).toFixed(1);msg.textContent=d.tipo==='fim'?(d.falha?`Pronto, com ${d.falha} arquivo${d.falha>1?'s':''} que não baixou. Toque de novo com internet boa.`:'Pronto! Agora dá para jogar sem internet.')+` (${mb} MB novos)`:`Baixando ${d.ok+d.falha} de ${d.total}… ${mb} MB`;
   if(d.tipo==='fim'){bt.disabled=false;navigator.serviceWorker.removeEventListener('message',ouve);if(!d.falha)try{localStorage.setItem('gm-offline',new Date().toLocaleDateString('pt-BR'));}catch(x){}}};
  navigator.serviceWorker.addEventListener('message',ouve);ctl.postMessage({tipo:'baixar',urls:L});};
})();
