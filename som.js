// ================= SOM: narração gravada (ElevenLabs · voz Eliel), efeitos e trilha =================
const AUD_BASE='https://jayfrrquibicrkhcezlk.supabase.co/storage/v1/object/public/gemini/grimorio-mobile/audio/';
const SOM={ctx:null,clips:{},lotes:{},pronto:false,fila:Promise.resolve(),musica:null,musAtual:'',sfx:{},vol:{voz:1,sfx:.7,mus:.32},on:true,musOn:true};
const NUMW=['zero','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove','vinte'];
for(let i=21;i<=40;i++)NUMW[i]=(i<30?'vinte':i<40?'trinta':'quarenta')+(i%10?' e '+NUMW[i%10]:'');NUMW[30]='trinta';NUMW[40]='quarenta';
const normS=t=>String(t).toLowerCase().replace(/−/g,'-').replace(/\+(\d+)/g,' mais $1 ').replace(/-(\d+)/g,' menos $1 ').replace(/\d+/g,d=>{const n=+d;return ' '+(NUMW[n]||d)+' ';}).replace(/[^\p{L}\s]/gu,' ').replace(/\s+/g,' ').trim();
function somCtx(){if(!SOM.ctx){try{SOM.ctx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}if(SOM.ctx&&SOM.ctx.state==='suspended')SOM.ctx.resume();return SOM.ctx;}
async function carregarSom(){try{const r=await fetch('audio/indice.json?v=32');if(!r.ok)return;const ix=await r.json();
 const ctx=somCtx();if(!ctx)return;
 // lotes de narração: um mp3 por lote + trechos (início, fim) de cada fala
 await Promise.all((ix.lotes||[]).map(async L=>{try{const b=await fetch(AUD_BASE+L.arq).then(x=>x.arrayBuffer());const buf=await ctx.decodeAudioData(b);SOM.lotes[L.arq]=buf;
   L.itens.forEach(it=>{SOM.clips[normS(it.t)]={buf,a:it.a,b:it.b};});}catch(e){}}));
 await Promise.all(Object.entries(ix.sfx||{}).map(async([k,arq])=>{try{const b=await fetch(AUD_BASE+arq).then(x=>x.arrayBuffer());SOM.sfx[k]=await ctx.decodeAudioData(b);}catch(e){}}));
 SOM.mus=ix.musica||{};SOM.pronto=true;SOM.maxW=Math.max(...Object.keys(SOM.clips).map(k=>k.split(' ').length));
 if(SOM.musPend)musica(SOM.musPend);}catch(e){}}
// quebra o texto em falas gravadas (o maior pedaço possível primeiro)
function fatiar(t){const w=normS(t).split(' ').filter(Boolean),out=[];let i=0;
 while(i<w.length){let ok=0;for(let n=Math.min(SOM.maxW||1,w.length-i);n>0;n--){const k=w.slice(i,i+n).join(' ');if(SOM.clips[k]){out.push(SOM.clips[k]);i+=n;ok=1;break;}}if(!ok)return null;}
 return out;}
function tocarClip(c){return new Promise(res=>{const ctx=somCtx();if(!ctx)return res();const s=ctx.createBufferSource(),g=ctx.createGain();g.gain.value=SOM.vol.voz;s.buffer=c.buf;s.connect(g).connect(ctx.destination);s.onended=res;s.start(0,c.a,Math.max(.05,c.b-c.a));SOM.atual=s;});}
// fala com a voz gravada; devolve false se faltar algum pedaço (aí usa a voz do aparelho)
function falarGravado(t,esperar){if(!SOM.pronto||!SOM.on)return false;const p=fatiar(t);if(!p||!p.length)return false;
 const g=SOM.gen||0;const tarefa=SOM.fila.then(async()=>{for(const c of p){if((SOM.gen||0)!==g)return;await tocarClip(c);await new Promise(r=>setTimeout(r,40));}});
 SOM.fila=tarefa.catch(()=>{});return esperar?tarefa:Promise.resolve();}
function calarGravado(){SOM.gen=(SOM.gen||0)+1;try{SOM.atual&&SOM.atual.stop();}catch(e){}SOM.fila=Promise.resolve();}
// efeitos sonoros
function sfx(k,vol){if(!SOM.on||!SOM.sfx[k])return;const ctx=somCtx();if(!ctx)return;const s=ctx.createBufferSource(),g=ctx.createGain();g.gain.value=(vol||1)*SOM.vol.sfx;s.buffer=SOM.sfx[k];s.connect(g).connect(ctx.destination);s.start();}
// trilha: 'calma' (preparação) e 'batalha'
function musica(k){if(!SOM.pronto){SOM.musPend=k;return;}if(SOM.musAtual===k)return;SOM.musAtual=k;const arq=SOM.mus&&SOM.mus[k];
 const velha=SOM.musica;if(velha){const v=velha;let x=v.volume;const t=setInterval(()=>{x-=.04;if(x<=0){clearInterval(t);v.pause();}else v.volume=x;},50);}
 if(!arq||!SOM.musOn||!k){SOM.musica=null;return;}const a=new Audio(AUD_BASE+arq);a.loop=true;a.volume=0;a.crossOrigin='anonymous';SOM.musica=a;a.play().catch(()=>{});
 let x=0;const t=setInterval(()=>{x+=.03;if(x>=SOM.vol.mus){clearInterval(t);x=SOM.vol.mus;}a.volume=x;},60);}
SOM.carga=carregarSom();
