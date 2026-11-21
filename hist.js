// ===== MODO HISTÓRIA (v72): 4 trilhas, 16 histórias, 128 batalhas, cenas narradas com imagem e legenda =====
const H_INI=['CELF','CGUE','CCIB','CNEC'],H_ROM=['I','II','III','IV'];
const H_COD={};CLASSES.forEach(c=>H_COD[c.name]=c.code);
// alianças da batalha final: os 4 naipes de cada trilha
const H_ALI={'Nexo':['CCIB','CFER','CINF','CMIC'],'Brasão':['CGUE','CDRA','CELE','COCE'],'Verdélia':['CELF','CSAH','CMER','CPIR'],'Ossário':['CNEC','CANJ','CHUM','CMAG']};
const H_PROX_URL=''; // endereço do próximo jogo (Duelo de Grimório). Vazio = a carta só avisa que a história continua lá.
const H_MS=330; // ritmo estimado da leitura; quando a voz for gravada, a legenda passa a seguir os tempos reais
let HS={lib:[...H_INI],w:{},pri:{},fim:{},t:{}};try{const x=JSON.parse(localStorage.getItem('gm-hist'));if(x&&x.lib)HS=Object.assign(HS,x);}catch(e){}
H_INI.forEach(c=>{if(!HS.lib.includes(c))HS.lib.push(c);});HS.t=HS.t||{};HS.w=HS.w||{};HS.pri=HS.pri||{};HS.fim=HS.fim||{};
function hSalva(){try{localStorage.setItem('gm-hist',JSON.stringify(HS));}catch(e){}}
const hTem=c=>HS.lib.includes(c);
const hV=t=>(HS.t[t.id]=HS.t[t.id]||[0,0,0,0]);
function hAtual(){let n=0;LORE.trilhas.forEach(t=>hV(t).forEach(x=>n+=x));return n;} // batalhas vencidas na história
function hNaipe(code){const s=CL[code].s;return NAIPES[s]||Object.values(NAIPES).find(N=>N.k===s);}
function hChaveNaipe(code){const s=CL[code].s;return NAIPES[s]?s:Object.keys(NAIPES).find(k=>NAIPES[k].k===s);}
function hAjustaEsc(){Object.keys(ESC).forEach(k=>{if(!hTem(ESC[k])){const c=CLASSES.find(x=>hChaveNaipe(x.code)===k&&hTem(x.code));if(c)ESC[k]=c.code;}});}
const hCap=x=>x[0].toUpperCase()+x.slice(1);
function hOpCods(op){const a=op.match(/aliança de (.+)$/);return a?H_ALI[a[1]]:[H_COD[op.split(' · ')[0]]||'CGUE'];}
function hArte(el,code,n,w){if(!el)return;el.innerHTML='';const s=document.createElement('div');s.style.backgroundImage='url(s/'+code+'.webp)';s.style.backgroundPosition=((n-2)/18*100)+'% 0';el.appendChild(s);if(typeof hdSobre==='function')hdSobre(el,code,n,w||800);}
let HB=null,HT=null,HH=0; // batalha em curso, trilha aberta, história à vista

// ---------- telas: escolha da trilha e trilha das 8 batalhas ----------
function hHistAtual(t){const v=hV(t),i=v.findIndex(x=>x<8);return i<0?3:i;}
function hDesenha(){const c=$('#hCorpo');
 if(!HT){$('#hProg').textContent='Quatro trilhas';c.scrollTop=0;
  c.innerHTML='<div class="ht-g">'+LORE.trilhas.map((t,i)=>{const N=NAIPES[t.naipe],v=hV(t),n=v.reduce((a,b)=>a+b,0);
   return `<button class="ht-c" data-t="${i}" style="--nc:${N.cor}"><span class="ht-a"></span><span class="ht-x"><small>${t.classe}</small><b>${t.nome}</b><span>${t.tema}</span></span>${HS.fim[t.id]?'<em>Concluída</em>':n?`<em>${n} de 32</em>`:''}</button>`}).join('')+'</div><button class="ht-r" id="hRever">Rever a apresentação</button>';
  c.querySelectorAll('.ht-c').forEach((b,i)=>hArte(b.querySelector('.ht-a'),LORE.trilhas[i].code,10,500));return;}
 const t=HT,N=NAIPES[t.naipe],V=hV(t),h=t.hist[HH],v=V[HH];c.style.setProperty('--nc',N.cor);
 $('#hProg').textContent=h.pl;
 c.innerHTML='<div class="htira">'+H_ROM.map((r,i)=>{const ab=i===0||V[i-1]>=8;return `<button class="${i===HH?'on':V[i]>=8?'ok':ab?'':'tr'}" data-h="${i}" ${ab?'':'disabled'}>${r}</button>`}).join('')+'</div>'+
  `<div class="ht-t"><small>História ${HH+1} de 4</small><h4>${h.t}</h4></div><div class="ht-rot">Você joga com</div><div class="ht-dk">`+h.deck.map((x,j)=>`<span class="${HH&&j===h.deck.length-1?'n':''}">${x}</span>`).join('')+'</div><div class="ht-rot">As 8 batalhas</div><div class="ht-bs">'+
  h.op.map((o,j)=>{const p=o.split(' · '),st=j<v?'ok':j===v?'at':'fe',sub=j===3?'libera '+h.l4:j===7?(HH<3?'libera '+h.l8:'batalha final'):'';
   return `<button class="ht-b ${st}" data-j="${j}" ${st==='fe'?'disabled':''}><span class="lz"><b>${j+1}</b></span><span class="hx6"><span class="ht-a"></span></span><span class="nm"><b>${hCap(p[1]||p[0])}</b><span>${p[1]&&!(HH===3&&j===7)?p[0]+(sub?' · ':''):''}${sub}</span></span><i class="ac">${st==='ok'?'Rever':st==='at'?'Lutar':''}</i></button>`}).join('')+
  '</div><button class="ht-r" id="hAbert">Rever a abertura</button>';
 c.querySelectorAll('.ht-b').forEach((b,j)=>hArte(b.querySelector('.ht-a'),hOpCods(h.op[j])[0],10,120));
 const at=c.querySelector('.ht-b.at');c.scrollTop=at?Math.max(0,at.offsetTop-c.clientHeight/2):0;}
function hAbrir(){HB=null;try{musica('calma');}catch(e){}hAjustaEsc();hDesenha();
 if(!HS.intro){HS.intro=1;hSalva();hcCena(hCenaIntro());}else show('historia');}
$('#hCorpo').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.id==='hRever')return hcCena(hCenaIntro());
 if(b.id==='hAbert')return hcCena(hCenaAbre(HT,HH,()=>show('historia')));
 if(b.dataset.t!=null){HT=LORE.trilhas[+b.dataset.t];HH=hHistAtual(HT);hDesenha();if(!hV(HT)[0]&&HH===0)hcCena(hCenaAbre(HT,0,()=>show('historia')));return;}
 if(b.dataset.h!=null){HH=+b.dataset.h;hDesenha();return;}
 if(b.dataset.j!=null){const j=+b.dataset.j;if(b.classList.contains('ok'))hcCena(hCenaBat(HT,HH,j,()=>show('historia')));else hLutar(HH,j);}});
$('#histBtn').onclick=()=>{destravarVoz('');hAbrir();};
$('#hBack').onclick=()=>{if(HT){HT=null;hDesenha();}else show('menu');};
$('#hI').onclick=()=>$('#hInfo').classList.add('on');$('#hInfo').onclick=()=>$('#hInfo').classList.remove('on');

// ---------- cenas narradas: imagem em tela cheia e legenda capitular a partir do meio ----------
function hFrases(par){const f=par.split(/(?<=[.!?…]"?)\s+(?=["A-ZÁÉÍÓÚÂÊÔÃÕÀ])/),o=[];for(const x of f){const u=o[o.length-1];if(u&&(u.split(' ').length+x.split(' ').length)<=24)o[o.length-1]=u+' '+x;else o.push(x);}return o;}
function hPassos(txt,imgs){const o=[];txt.split('\n\n').forEach((p,i)=>hFrases(p).forEach(f=>o.push({t:f,im:imgs[Math.min(i,imgs.length-1)]})));return o;}
function hCenaIntro(){const p=hPassos(LORE.intro,[['CMAG',10],['CGUE',6],['CELF',10]]);
 p.forEach(x=>{if(/Brasão/.test(x.t))x.im=['CGUE',6];if(/Nexo/.test(x.t))x.im=['CCIB',6];if(/Ossário/.test(x.t))x.im=['CNEC',6];if(/Verdélia/.test(x.t))x.im=['CELF',5];});
 return {sm:'A galáxia',nm:'Apresentação',ro:'G',ts:'Grimório',th:'O mesmo fim',p,cor:'#c8aa6e',fim:()=>{hDesenha();show('historia');}};}
function hCenaAbre(t,i,fim){const h=t.hist[i];return {sm:h.pl+' · história '+H_ROM[i],nm:h.t,ro:H_ROM[i],ts:t.classe+' · '+h.pl,th:h.t,p:hPassos(h.x,[2,4,6,8,10].map(n=>[h.code,n])),cor:NAIPES[t.naipe].cor,fim};}
function hCenaBat(t,i,j,fim){const h=t.hist[i],c=hOpCods(h.op[j])[0],ult=i===3&&j===7;
 const imgs=ult?[[c,9],[h.code,10],[t.code,10],[t.code,9]]:[[c,2+((j*2+i)%9)]];
 return {sm:h.pl+' · batalha '+(j+1)+' de 8',nm:hCap(h.op[j].split(' · ').pop()),p:hPassos(h.b[j],imgs),cor:NAIPES[t.naipe].cor,ro:ult?'F':'',ts:ult?t.desfecho:'',th:ult?'A Batalha entre Planetas':'',fim};}
function hCenaGancho(){return {sm:'Cena final',nm:'O Devorador',ro:'D',ts:'Depois da batalha',th:'O chão treme',p:hPassos(LORE.gancho,[['ZCOR',9],['CMAG',10],['ZPEL',9],['CNEC',10]]),cor:'#c8aa6e',fim:hCarta};}
const HC={c:null,ix:0,pal:0,tm:null,par:false,lado:0,im:''};
function hcCena(c){HC.c=c;HC.ix=-1;HC.par=false;HC.im='';$('#hcPP').classList.remove('pa');$('#hcena').style.setProperty('--nc',c.cor);
 $('#hcSm').textContent=c.sm;$('#hcNm').textContent=c.nm;$('#hcPg').innerHTML=c.p.map(()=>'<i><u></u></i>').join('');$('#hcP').innerHTML='';
 show('hcena');hcImg(c.p[0].im);clearTimeout(HC.tm);
 if(c.th){$('#hcRo').textContent=c.ro;$('#hcTs').textContent=c.ts;$('#hcTh').textContent=c.th;$('#hcTit').classList.add('on');$('#hcLeg').classList.add('sai');HC.tm=setTimeout(()=>hcPasso(1),2400);}
 else{$('#hcTit').classList.remove('on');hcPasso(1);}}
function hcImg(im){const k=im.join();if(k===HC.im)return;HC.im=k;HC.lado^=1;const a=$('#hcena .hc-art.a'),b=$('#hcena .hc-art.b');
 if(HC.lado){hArte(b,im[0],im[1],900);b.classList.add('on');}else{hArte(a,im[0],im[1],900);b.classList.remove('on');}}
function hcPasso(d){const C=HC.c;if(!C)return;clearTimeout(HC.tm);$('#hcTit').classList.remove('on');HC.ix+=d;if(HC.ix<0)HC.ix=0;if(HC.ix>=C.p.length)return hcFim();
 const s=C.p[HC.ix];hcImg(s.im);$('#hcLeg').classList.add('sai');
 setTimeout(()=>{if(HC.c!==C)return;$('#hcP').innerHTML=s.t.split(' ').map(w=>'<w>'+w.replace(/</g,'&lt;')+'</w>').join(' ');$('#hcLeg').classList.remove('sai');HC.pal=0;
  [...$('#hcPg').children].forEach((e,k)=>{e.firstChild.style.width=k<HC.ix?'100%':'0';});
  $('#hcInf').textContent=(HC.ix+1)+' de '+C.p.length+' · toque para avançar';if(!HC.par)hcAnda();},280);}
function hcAnda(){if(!HC.c)return;const ws=$('#hcP').children;if(HC.pal>=ws.length){HC.tm=setTimeout(()=>hcPasso(1),1100);return;}
 if(HC.pal)ws[HC.pal-1].classList.remove('ag');ws[HC.pal].classList.add('on','ag');HC.pal++;
 const b=$('#hcPg').children[HC.ix];if(b)b.firstChild.style.width=(HC.pal/ws.length*100)+'%';
 const w=ws[HC.pal-1].textContent;HC.tm=setTimeout(hcAnda,H_MS+(/[.,:;!?]/.test(w)?260:0)+Math.max(0,w.length-6)*22);}
function hcPausa(){HC.par=!HC.par;$('#hcPP').classList.toggle('pa',HC.par);clearTimeout(HC.tm);if(!HC.par)hcAnda();}
function hcFim(){clearTimeout(HC.tm);const f=HC.c&&HC.c.fim;HC.c=null;if(f)f();}
$('#hcPula').onclick=hcFim;$('#hcPP').onclick=hcPausa;$('#hcV').onclick=()=>hcPasso(-1);$('#hcA').onclick=()=>hcPasso(1);
// carta final
function hCarta(){$('#hkC').classList.remove('v');$('#hkH').textContent='Vire a carta';$('#hkB').textContent='VIRAR A CARTA';$('#hkB').dataset.e='0';show('hcarta');}
$('#hkB').onclick=()=>{const b=$('#hkB');if(b.dataset.e==='0'){$('#hkC').classList.add('v');$('#hkH').textContent='O Devorador de Mundos';b.textContent=H_PROX_URL?'IR AO DUELO':'VOLTAR';b.dataset.e='1';return;}
 if(H_PROX_URL){location.href=H_PROX_URL;return;}HT=null;hDesenha();show('historia');};

// ---------- batalha da história: o seu baralho é o da trilha, o do oponente é só dele ----------
function hBaralho(cods){const cop=[4,4,2,2,1][cods.length]||1,d=[];for(let b=0;b<cop;b++)cods.forEach(code=>{for(let v=2;v<=10;v++)d.push(carta(code,v));});
 for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]];}return d;}
const baralho0h=baralho;baralho=function(){return HB&&HB.viva?hBaralho(HB.meu):baralho0h();};
function baralhoOp(){return HB&&HB.viva?hBaralho(HB.op):null;}
function hLutar(i,j){const t=HT,h=t.hist[i];HB={t,i,j,viva:true,nome:hCap(h.op[j].split(' · ').pop()),meu:h.deck.map(n=>H_COD[n]),op:hOpCods(h.op[j]),esc:Object.assign({},ESC)};
 try{HB.tema=localStorage.getItem('gm-tema');}catch(e){}
 HB.meu.forEach(c=>ESC[hChaveNaipe(c)]=c);
 nova();S.ol+=j===7?(i===3?15:10):j===3?5:0; // os chefes da 4ª e da 8ª batalha têm mais vida
 try{aplicarTema(h.pl);}catch(e){}const o=$('#oAv');o.style.backgroundImage=`url(s/${HB.op[0]}.webp)`;o.style.backgroundSize='1900% auto';o.style.backgroundPosition='100% 18%';
 render();show('duelo');toast(HB.nome);}
function hSaiDaLuta(){if(!HB)return;HB.viva=false;Object.assign(ESC,HB.esc);try{HB.tema?localStorage.setItem('gm-tema',HB.tema):localStorage.removeItem('gm-tema');}catch(e){}const o=$('#oAv');o.style.backgroundImage='url(art/necromante2.webp)';o.style.backgroundSize='';o.style.backgroundPosition='';}
const fim0=fim;
function fimTela(v,x){const f=$('#fim');f.classList.toggle('der',!v);$('#fimX').innerHTML=x||'';}
fim=function(v,t){if(typeof ONL==='undefined'||!ONL.guest){const emp=/mpate/.test(t||'');if(!emp){HS[v?'vit':'der']=(HS[v?'vit':'der']||0)+1;hSalva();}}
 if(!HB){fimTela(v,'');$('#denovo').textContent='JOGAR DE NOVO';return fim0(v,/turno/.test(t)?t.replace(/no turno (\d+)\./,(m,n)=>`no ${n}º dia.`):t);}
 const b=HB,h=b.t.hist[b.i],V=hV(b.t);let msg='',x='';b.venceu=!!v;
 if(v){msg='A história continua.';
  if(b.j===V[b.i]){V[b.i]=b.j+1;const lb=b.j===3?h.l4:(b.j===7&&b.i<3)?h.l8:null,code=lb&&H_COD[lb];
   if(code){const c=CL[code],N=hNaipe(code);if(!hTem(code))HS.lib.push(code);msg='Você ganhou um baralho novo.';if(CLASSES.filter(q=>q.s===c.s).every(q=>hTem(q.code)))msg=`Todos os baralhos de ${N.nome}: o tema de ${N.nome} foi liberado.`;
    x=`<div class="fnv" style="--nc:${N.cor}"><i style="background-image:url(s/${code}.webp)"></i><div><small>Novo baralho · ${N.nome}</small><b>${c.name}</b><span>${c.pl}</span></div></div>`;}
   if(b.i===3&&b.j===7){HS.fim[b.t.id]=true;msg='Você venceu a Batalha entre Planetas.';}}}
 else msg=/desist/i.test(t)?'Você deixou a batalha. Ela continua à sua espera.':'Seu líder caiu. A batalha continua à sua espera.';
 hSalva();hSaiDaLuta();fim0(v,msg);fimTela(v,x);$('#denovo').textContent=v?'CONTINUAR':'TENTAR DE NOVO';};
function hDepois(b){HT=b.t;const fim=b.i===3&&b.j===7;
 hcCena(hCenaBat(b.t,b.i,b.j,()=>{if(fim)return hcCena(hCenaGancho());
  if(b.j===7&&hV(b.t)[b.i]>=8){HH=b.i+1;hDesenha();return hcCena(hCenaAbre(b.t,HH,()=>show('historia')));}
  HH=b.i;hDesenha();show('historia');}));}
$('#denovo').addEventListener('click',e=>{if(!HB)return;e.stopImmediatePropagation();const b=HB;HB=null;try{musica('calma');}catch(x){}if(b.venceu)hDepois(b);else{HT=b.t;HH=b.i;hLutar(b.i,b.j);}},true);
$('#voltar').addEventListener('click',()=>{if(HB){HB=null;$('#denovo').textContent='JOGAR DE NOVO';}});
$('#jogar').addEventListener('click',()=>{HB=null;hAjustaEsc();},true);
const show0h=show;show=function(id){if(id==='menu'&&HB){hSaiDaLuta();HB=null;}return show0h(id);};

// ---------- coleção ----------
const H_ONDE={};LORE.trilhas.forEach(t=>t.hist.forEach((h,i)=>{[h.l4,h.l8].forEach(n=>{if(H_COD[n])H_ONDE[H_COD[n]]=t.classe+' · '+H_ROM[i];});}));
function cDesenha(){const nf=Object.keys(HS.fim).length;
 $('#cRes').innerHTML=`<div><b>${HS.lib.length}</b><small>de 32 baralhos</small></div><div><b>${hAtual()}</b><small>de 128 batalhas</small></div><div><b>${nf}</b><small>de 4 finais</small></div>`;
 $('#cBar').style.setProperty('--p',Math.round(HS.lib.length/32*100)+'%');
 $('#cGrade').innerHTML=Object.entries(NAIPES).map(([k,N])=>{const cs=CLASSES.filter(x=>hChaveNaipe(x.code)===k),n=cs.filter(x=>hTem(x.code)).length;
  return `<div class="cn" style="--nc:${N.cor}"><div class="cnh"><span class="hd"><b>${N.sym}</b></span><b>${N.nome}</b><small>${n} de ${cs.length}</small></div><div class="ctm ${n===cs.length?'ok':''}"><i></i>Tema de ${N.nome}<em>${n===cs.length?'liberado':'libere os '+cs.length+' baralhos'}</em></div><div class="cg">${cs.map(x=>{const ok=hTem(x.code);return `<div class="cc ${ok?'':'tr'}" data-c="${x.code}"><i style="background-image:url(s/${x.code}.webp)"></i><b>${x.name}</b><small>${ok?x.pl:(H_ONDE[x.code]||'História')}</small></div>`}).join('')}</div></div>`}).join('');}
$('#colBtn').onclick=()=>{cDesenha();show('colecao');};$('#cBack').onclick=()=>show('menu');
$('#cTudo').onclick=()=>{HS.lib=CLASSES.map(c=>c.code);hSalva();cDesenha();toast('Tudo liberado (teste)');};
$('#cZera').onclick=()=>{HS={lib:[...H_INI],w:{},pri:{},fim:{},t:{}};HT=null;hSalva();hAjustaEsc();cDesenha();toast('História recomeçada');};
// ---------- ranking ----------
function rPontos(){return (HS.vit||0)*3+Math.max(0,HS.lib.length-4)*10+Object.keys(HS.fim).length*25;}
function rDesenha(){const v=HS.vit||0,d=HS.der||0;
 $('#rEu').innerHTML=`<span class="rpos">—</span><i></i><div><b>Você</b><small>Sem login · só neste aparelho</small></div><strong>${rPontos()}<small>pontos</small></strong>`;
 $('#rNum').innerHTML=`<div><b>${v}</b><small>vitórias</small></div><div><b>${d}</b><small>derrotas</small></div><div><b>${HS.lib.length}</b><small>baralhos</small></div><div><b>${hAtual()}</b><small>batalhas</small></div>`;}
$('#rankBtn').onclick=()=>{rDesenha();show('ranking');};$('#rBack').onclick=()=>show('menu');
document.querySelectorAll('#rAbas button').forEach((b,i)=>b.onclick=()=>{if(i)toast(b.textContent+': em breve');});
hAjustaEsc();
