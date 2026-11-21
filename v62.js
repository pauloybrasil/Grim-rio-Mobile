// ===== v62: tema global, galeria de cartas, mão do oponente, sem emojis, diagnóstico de som =====
function temaGlobal(pl){const r=RG[pl];if(!r)return;const d=document.documentElement.style;d.setProperty('--tb',r[0]);d.setProperty('--ts',r[1]);d.setProperty('--tg',r[1]+'55');d.setProperty('--ta',`url(s/${r[2]}.webp)`);
 document.querySelectorAll('.gly').forEach(p=>p.setAttribute('d',GLIFO[pl]||''));document.querySelectorAll('.plnm').forEach(e=>e.textContent=pl);}
const aplicarTema0=aplicarTema;aplicarTema=function(pl){aplicarTema0(pl);temaGlobal(pl);};
(function(){let pl=null;try{pl=localStorage.getItem('gm-tema');}catch(e){}if(!pl||!RG[pl]||!temaLivre(pl))pl=CL[Object.values(ESC)[0]].pl;temaGlobal(pl);})();
// textos de aviso sem emojis
const semEmoji=t=>typeof t==='string'?t.replace(/[\p{Extended_Pictographic}️‍]/gu,'').replace(/\s{2,}/g,' ').trim():t;
const pop0=pop;pop=function(l,i,t){return pop0(l,i,semEmoji(t));};const lg0=lg;lg=function(t,x){return lg0(semEmoji(t),x);};const toast0=toast;toast=function(t){return toast0(semEmoji(t));};
// arte em alta: menu, portas da história, zoom e cartão de baralho novo
// tela inicial: a arte muda a cada vez que o jogo abre; o jogador pode fixar uma carta da coleção
function capaAplica(){let c=null;try{c=JSON.parse(localStorage.getItem('gm-capa'));}catch(e){}
 if(!c||!CL[c.code]||!hTem(c.code)){const L=HS.lib.filter(x=>CL[x]);c={code:L[Math.floor(Math.random()*L.length)],v:2+Math.floor(Math.random()*9)};}
 const a=$('.mA-art');a.style.backgroundImage=`url(s/${c.code}.webp)`;a.style.backgroundPosition=`${(c.v-2)/18*100}% 20%`;hdSobre(a,c.code,c.v,900);}
function capaFixa(code,v){try{if(code)localStorage.setItem('gm-capa',JSON.stringify({code,v}));else localStorage.removeItem('gm-capa');}catch(e){}capaAplica();}
capaAplica();
const hDesenha0=hDesenha;hDesenha=function(v){hDesenha0(v);document.querySelectorAll('#hCorpo .hp').forEach(b=>{const c=H_CAP[+b.dataset.i][3+ +b.dataset.j][1];hdSobre(b.querySelector('.a'),c,10,600);});};
const abrirZoom0=abrirZoom;abrirZoom=function(c,i){abrirZoom0(c,i);if(!c.token)hdSobre($('#zc .card'),c.code,c.ai,800);};
const fimTela0=fimTela;fimTela=function(v,x){fimTela0(v,x);const i=$('#fimX .fnv i');if(i){const m=/s\/(\w+)\.webp/.exec(i.getAttribute('style')||'');if(m)hdSobre(i,m[1],10,240);}};
// galeria: todas as cartas da classe, toque para ampliar
const GAL={code:null,k:0,de:'colecao'};
function galAbrir(code,de){const c=CL[code],N=hNaipe(code);GAL.code=code;GAL.de=de||'colecao';$('#gT').textContent=c.name;$('#gS').textContent=c.pl+' · '+N.nome;$('#galeria').style.setProperty('--nc',N.cor);
 $('#gGrid').innerHTML=[2,3,4,5,6,7,8,9,10].map(v=>{const k=carta(code,v);return `<button class="gc" data-v="${v}"><div class="gcf">${cardHTML(k)}</div><b>${k.hab}</b><small>custo ${k.cost}</small></button>`}).join('');
 $('#galV').classList.remove('on');show('galeria');document.querySelectorAll('#gGrid .gc').forEach(b=>hdSobre(b.querySelector('.card'),code,+b.dataset.v,300));}
function galVer(v){GAL.k=v;const k=carta(GAL.code,v),f=$('#gvF');f.innerHTML=`<div style="background-image:url(s/${k.code}.webp);background-position:${(v-2)/18*100}% 0"></div><span class="gvn">${v}</span>`;hdSobre(f.firstElementChild,k.code,v,900);
 let cp=null;try{cp=JSON.parse(localStorage.getItem('gm-capa'));}catch(e){}const eh=cp&&cp.code===k.code&&cp.v===v;
 $('#gvT').innerHTML=`<b>${k.hab}</b><span>${k.fx}</span>${k.flav?`<em>“${k.flav}”</em>`:''}<button class="gcapa ${eh?'on':''}" id="gCapa">${eh?'Na tela inicial · tocar para voltar a sortear':'Usar na tela inicial'}</button>`;
 $('#gCapa').onclick=e=>{e.stopPropagation();if(eh){capaFixa(null);toast('A tela inicial volta a sortear');}else{capaFixa(k.code,v);toast('Carta colocada na tela inicial');}galVer(v);};$('#galV').classList.add('on');}
$('#gGrid').addEventListener('click',e=>{const b=e.target.closest('.gc');if(b)galVer(+b.dataset.v);});
$('#galV').addEventListener('click',e=>{if(e.target.closest('.gnav'))return;$('#galV').classList.remove('on');});
$('#gPrev').onclick=()=>galVer(GAL.k<=2?10:GAL.k-1);$('#gNext').onclick=()=>galVer(GAL.k>=10?2:GAL.k+1);
$('#gBack').onclick=()=>{if(GAL.de==='escolha'){desenhaEsc();show('escolha');}else{cDesenha();show('colecao');}};
$('#cGrade').addEventListener('click',e=>{const c=e.target.closest('.cc');if(!c)return;if(c.classList.contains('tr')){toast('Libere este baralho na História');return;}galAbrir(c.dataset.c,'colecao');});
// mão do oponente: abre um painel com as cartas viradas
$('#oMaoIt').onclick=()=>{if(!S)return;fecharTudo();const n=S.oh.length;$('#pnT').textContent='Mão do oponente';
 $('#pnB').innerHTML=`<div class="omao">${Array.from({length:n},(_,i)=>`<i style="--k:${i-(n-1)/2}"></i>`).join('')||'<p class="vazio" style="margin:0">Sem cartas na mão.</p>'}</div><ul><li>O oponente tem <b>${n} ${n===1?'carta':'cartas'}</b> na mão (o máximo é 7).</li><li>Restam <b>${S.deck.length}</b> cartas no baralho, que é comum aos dois.</li><li>Há <b>${S.cem.length}</b> ${S.cem.length===1?'carta':'cartas'} no cemitério.</li></ul>`;$('#pn').classList.add('on');};
// diagnóstico de som (abra o site com ?diag para ver)
if(/[?&]diag/.test(location.search)){const d=document.createElement('pre');d.id='diag';document.body.appendChild(d);let n=0;const t=setInterval(()=>{n++;d.textContent=`som pronto:${SOM.pronto} falas:${Object.keys(SOM.clips).length} efeitos:${Object.keys(SOM.sfx).length} trilhas:${Object.keys(SOM.mus||{}).length} ctx:${SOM.ctx?SOM.ctx.state:'-'}`;if(n>40)clearInterval(t);},1000);}

// ===== v63: arte em alta em todas as telas =====
function temaArte(pl){const r=RG[pl];if(!r)return;const u=hdURL(r[2],10,800);if(u)document.documentElement.style.setProperty('--tah',`url("${u}")`);
 hdSobre($('#tDecor .d1'),r[3],10,800,'50% 15%');hdSobre($('#tDecor .d2'),r[2],10,800,'50% 15%');}
const temaGlobal1=temaGlobal;temaGlobal=function(pl){temaGlobal1(pl);temaArte(pl);};temaArte((function(){let pl=null;try{pl=localStorage.getItem('gm-tema');}catch(e){}return pl&&RG[pl]&&temaLivre(pl)?pl:CL[Object.values(ESC)[0]].pl;})());
const desenhaEsc1=desenhaEsc;desenhaEsc=function(){desenhaEsc1();document.querySelectorAll('#nGrid .rs').forEach(sec=>{const k=sec.querySelector('.rsh').dataset.ab;hdSobre(sec.querySelector('.rsa'),ESC[k],10,700,'50% 22%');});
 document.querySelectorAll('#nGrid .rhx').forEach(b=>{if(!b.classList.contains('tr'))hdSobre(b.querySelector('i'),b.dataset.c,10,180,'50% 18%');});};
const cDesenha1=cDesenha;cDesenha=function(){cDesenha1();document.querySelectorAll('#cGrade .cc:not(.tr)').forEach(c=>hdSobre(c.querySelector('i'),c.dataset.c,10,180,'50% 18%'));};
const abrirTemas1=abrirTemas;abrirTemas=function(){abrirTemas1();document.querySelectorAll('#temaGrade .tm-b:not(.tr)').forEach(b=>{const r=RG[b.dataset.pl];hdSobre(b.querySelector('.tm-a'),r[2],10,500,'50% 22%');});};

// ===== v65: estilos da mão do oponente =====
const MAON=[null,['Arco','Hearthstone'],['Borda','Legends of Runeterra'],['Contador','Marvel Snap'],['Fileira','Magic Arena'],['Pilha','Gwent']];let MAOK=1; // escolhido: Arco
function maoEstilo(k){MAOK=k;const o=$('#oHand');o.className='ohand mo'+k;try{localStorage.setItem('gm-mao',k);}catch(e){}}
new MutationObserver(()=>{$('#oHand').dataset.n=$('#oHand').children.length;}).observe($('#oHand'),{childList:true});maoEstilo(MAOK);
