// Grimório Mobile: jogo instalável e jogável sem internet
const VERSAO='v94';
const CORE=["./", "index.html", "manifest.webmanifest", "icone-192.png", "icone-512.png", "icone-mask-512.png", "icone-180.png", "audio/indice.json", "arthd.js", "classes.js", "hab.js", "habnovas.js", "hist.js", "login.js", "lore.js", "online.js", "som.js", "temas.js", "v62.js", "art/cen.webp", "art/costa.webp", "art/guerreiro2.webp", "art/necromante2.webp", "s/CANJ.webp", "s/CCIB.webp", "s/CDRA.webp", "s/CELE.webp", "s/CELF.webp", "s/CFER.webp", "s/CGUE.webp", "s/CHUM.webp", "s/CINF.webp", "s/CMAG.webp", "s/CMER.webp", "s/CMIC.webp", "s/CNEC.webp", "s/COCE.webp", "s/CPIR.webp", "s/CSAH.webp", "s/ZARC.webp", "s/ZAUR.webp", "s/ZBRA.webp", "s/ZCOR.webp", "s/ZDRA.webp", "s/ZFER.webp", "s/ZIGN.webp", "s/ZINF.webp", "s/ZMER.webp", "s/ZMIC.webp", "s/ZNEX.webp", "s/ZOSS.webp", "s/ZPEL.webp", "s/ZSAH.webp", "s/ZTER.webp", "s/ZVER.webp"];
const C_JOGO='gm-jogo-'+VERSAO, C_EXTRA='gm-extra';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C_JOGO).then(c=>Promise.all(CORE.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>null)))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('gm-jogo-')&&k!==C_JOGO).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
const soRede=u=>/supabase\.co\/(rest|auth|realtime|functions)\//.test(u)||u.includes('/storage/v1/object/sign/');
async function deRedePrimeiro(req){const c=await caches.open(C_JOGO);try{const ctl=new AbortController();const t=setTimeout(()=>ctl.abort(),4000);const r=await fetch(req,{signal:ctl.signal});clearTimeout(t);if(r&&r.ok)c.put(req,r.clone());return r;}catch(e){const m=await c.match(req,{ignoreSearch:true})||await caches.match(req,{ignoreSearch:true});if(m)return m;if(req.mode==='navigate')return c.match('index.html');throw e;}}
async function doCachePrimeiro(req){const m=await caches.match(req);if(m)return m;const r=await fetch(req);if(r&&r.status!==206&&(r.ok||r.type==='opaque')){const c=await caches.open(req.url.startsWith(self.location.origin)?C_JOGO:C_EXTRA);c.put(req,r.clone());}return r;}
// áudio: o tocador pede pedaços do arquivo (para pular para o trecho da narração); responde o pedaço certo a partir do arquivo inteiro guardado
async function audio(req){const u=req.url;let m=await caches.match(u,{ignoreVary:true});
 if(!m){try{const r=await fetch(u,{mode:'cors',credentials:'omit'});if(!r.ok)return fetch(req);const c=await caches.open(C_EXTRA);await c.put(u,r.clone());m=r;}catch(e){try{return await fetch(req);}catch(x){return new Response('',{status:504});}}}
 const rg=req.headers.get('range');if(!rg)return m;
 const blob=await m.blob(),tam=blob.size,mt=/bytes=(\d*)-(\d*)/.exec(rg)||[];let a=mt[1]?+mt[1]:0,b=mt[2]?+mt[2]:tam-1;if(!mt[1]&&mt[2]){a=Math.max(0,tam-+mt[2]);b=tam-1;}b=Math.min(b,tam-1);
 if(a>=tam)return new Response('',{status:416,headers:{'Content-Range':'bytes */'+tam}});
 return new Response(blob.slice(a,b+1),{status:206,statusText:'Partial Content',headers:{'Content-Type':m.headers.get('Content-Type')||'audio/mpeg','Content-Range':`bytes ${a}-${b}/${tam}`,'Content-Length':String(b-a+1),'Accept-Ranges':'bytes'}});}
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const u=req.url;if(!u.startsWith('http')||soRede(u))return;
 const local=u.startsWith(self.location.origin),pag=req.mode==='navigate'||/\.(html|js|json|webmanifest)(\?|$)/.test(u)&&local;
 if(local&&u.includes('/mock/'))return;
 if(/\.(mp3|ogg|m4a|wav)(\?|$)/.test(u)||req.destination==='audio'||req.headers.has('range')){e.respondWith(audio(req));return;}
 e.respondWith(pag?deRedePrimeiro(req):doCachePrimeiro(req));});
// baixar tudo: o jogo manda a lista de áudios e o trabalhador guarda e avisa o progresso
self.addEventListener('message',e=>{const d=e.data||{};if(d.tipo!=='baixar')return;const src=e.source;
 (async()=>{const c=await caches.open(C_EXTRA);let ok=0,falha=0,bytes=0;const L=d.urls||[];
  for(let i=0;i<L.length;i+=4){await Promise.all(L.slice(i,i+4).map(async u=>{try{if(await c.match(u)){ok++;return;}const r=await fetch(u,{mode:'cors'});if(!r.ok)throw 0;const b=await r.clone().blob();bytes+=b.size;await c.put(u,r);ok++;}catch(x){falha++;}}));
   src&&src.postMessage({tipo:'progresso',ok,falha,total:L.length,bytes});}
  src&&src.postMessage({tipo:'fim',ok,falha,total:L.length,bytes});})();});
