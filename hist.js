// ===== MODO HISTÓRIA (offline, contra a IA) + COLEÇÃO =====
const H_INI=['CELF','CGUE','CMAG','CNEC'],H_ATO=[['I','O coração parou',1],['II','As velhas rivalidades',2],['III','A guerra aberta',3],['IV','O caminho de volta',4]];
const H_CAP=[
[0,'A floresta que acordou','Na noite em que o coração da galáxia parou, Verdélia acordou gritando. Em Brasão, fecharam os portões.',['Entrar na mata','ZVER'],['Segurar a muralha','ZBRA']],
[0,'A torre e a cripta','Dois sábios juram saber quem apagou o coração. Um deles mente.',['Subir a torre','ZARC'],['Descer à cripta','ZOSS']],
[0,'Asas sobre a savana','Os Anjos pedem ajuda pela primeira vez em mil anos. Na savana, a manada já começou a correr.',['Atender os Anjos','CANJ'],['Seguir a manada','CFER']],
[0,'Ferro e brasa','Sem o coração, as máquinas de Nexo esfriam e as forjas de Ígnea queimam sem controle.',['Religar as máquinas','CCIB'],['Domar o fogo','CELE']],
[1,'Os que caíram','Os Caídos querem voltar para casa. O enxame de Ferália quer a casa de todo mundo.',['Ouvir os Caídos','ZAUR'],['Queimar o enxame','ZFER']],
[1,'O que o laboratório esconde','Alguém abriu as jaulas de Nexo. Os Forjadores dizem que só vieram cobrar uma dívida.',['Fechar as jaulas','ZNEX'],['Cobrar os Forjadores','ZIGN']],
[1,'Maré alta','O mar de Pelágia subiu sem aviso. Em Terrânia, os Humanos erguem muros contra a água.',['Mergulhar','COCE'],['Defender a cidade','CHUM']],
[1,'Fogo no céu','Os dragões voam baixo demais. O portão de Inférnia está aberto, e não foi por dentro.',['Montar o dragão','CDRA'],['Atravessar o portão','CINF']],
[2,'O abismo responde','Alguma coisa no fundo de Pelágia respondeu ao silêncio. Os Rebeldes de Terrânia dizem que sabem o quê.',['Descer ao abismo','ZPEL'],['Procurar os Rebeldes','ZTER']],
[2,'Ninho de serpes','As Serpes guardam um ovo que não é delas. Os Condenados oferecem o nome do ladrão.',['Invadir o ninho','ZDRA'],['Soltar os Condenados','ZINF']],
[2,'O que cresce no escuro','Em Micora, a floresta pensa. Em Sahárion, os Nômades guardam o único mapa até o centro.',['Seguir os esporos','CMIC'],['Cruzar o deserto','CSAH']],
[2,'Tudo tem preço','Os Mercadores vendem a passagem para o centro. Os Piratas preferem tomar a de quem comprou.',['Fechar negócio','CMER'],['Abordar o navio','CPIR']],
[3,'Os que vivem dos outros','O que sobrou da guerra virou alimento. Parasitas e Saqueadores brigam pelo mesmo resto.',['Arrancar a raiz','ZMIC'],['Caçar os Saqueadores','ZSAH']],
[3,'O último contrato','Falta um exército e falta um caminho. Um se paga em ouro, o outro dorme debaixo do mar.',['Pagar os Mercenários','ZMER'],['Acordar o Leviatã','ZCOR']]];
const H_FIM=[['copas','A Batalha entre Planetas','Quando o coração parou, os planetas deixaram de girar juntos. Agora cada um quer o lugar do outro.'],['espadas','O Devorador','Ele não odeia ninguém. Só tem fome, e a galáxia é o que sobrou no prato.'],['ouros','Os Talismãs do Mal','Você conhece estes rostos. Lutou com eles. Só que agora alguma coisa brilha no peito de cada um.'],['paus','A Batalha de Deus','No fim de tudo há uma mesa, duas cadeiras, e alguém que já estava sentado antes de existir o tempo.']];
const H_R=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV'];
let HS={lib:[...H_INI],w:{},pri:{},fim:{}};try{const x=JSON.parse(localStorage.getItem('gm-hist'));if(x&&x.lib)HS=Object.assign(HS,x);}catch(e){}
function hSalva(){try{localStorage.setItem('gm-hist',JSON.stringify(HS));}catch(e){}}
const hTem=c=>HS.lib.includes(c),hNec=i=>H_ATO[H_CAP[i][0]][2];
const hCapOk=i=>hTem(H_CAP[i][3][1])&&hTem(H_CAP[i][4][1]);
function hAtual(){for(let i=0;i<H_CAP.length;i++)if(!hCapOk(i))return i;return H_CAP.length;}
const NK2=k=>Object.values(NAIPES).find(N=>N.k===k)||NAIPES[k];
function hNaipe(code){const s=CL[code].s;return NAIPES[s]||Object.values(NAIPES).find(N=>N.k===s);}
function hChaveNaipe(code){const s=CL[code].s;return NAIPES[s]?s:Object.keys(NAIPES).find(k=>NAIPES[k].k===s);}
function hAjustaEsc(){Object.keys(ESC).forEach(k=>{if(!hTem(ESC[k])){const c=CLASSES.find(x=>hChaveNaipe(x.code)===k&&hTem(x.code));if(c)ESC[k]=c.code;}});}
let HB=null,HVER=0;
function hPips(w,nec){let s='';for(let k=0;k<nec;k++)s+=`<i class="${k<w?'f':''}"></i>`;return `<span class="pp">${s}</span>`;}
function hPorta(i,j){const [t,code]=H_CAP[i][3+j],N=hNaipe(code),c=CL[code],ok=hTem(code),nec=hNec(i),w=ok?nec:(HS.w[code]||0),esp=HS.pri[i]!=null&&HS.pri[i]!==j&&!ok;
 return `<button class="hp ${ok?'ok':''}" data-i="${i}" data-j="${j}" style="--nc:${N.cor}"><i class="a" style="background-image:url(s/${code}.webp)"></i>${esp?'<span class="hmais">+5 de vida</span>':''}${ok?'<span class="hmais hv">vencida</span>':''}<span class="hx"><span class="hd"><b>${N.sym}</b></span><b>${t}</b><span class="hsub">${c.name} · ${c.pl}</span>${hPips(w,nec)}</span></button>`;}
let HVIS=4; // visual escolhido: Trilha
function hVisual(k){HVIS=k;const s=$('#historia');for(let i=1;i<=5;i++)s.classList.toggle('hv'+i,i===k);document.querySelectorAll('#hVis button').forEach(b=>b.classList.toggle('on',+b.dataset.k===k));try{localStorage.setItem('gm-hvis',k);}catch(e){}}
function hDesenha(v){const at=hAtual();if(v==null)v=Math.min(at,H_CAP.length);HVER=v;
 $('#hProg').textContent=v<14?`Capítulo ${v+1} de 14`:'Epílogo';
 let h='';
 if(v<H_CAP.length){const [a,t,f]=H_CAP[v],A=H_ATO[a];
  h+=`<div class="hcab"><div class="hato">Ato ${A[0]} · ${A[1]}</div><div class="hk"><i><b>${H_R[v]}</b></i><div><small>Capítulo ${v+1}</small><h2>${t}</h2></div></div><div class="hnar">${f}</div></div>`;
  h+=v>at?`<div class="htrv">Vença o capítulo ${at+1} para abrir este.</div>`:`<div class="hps">${hPorta(v,0)}${hPorta(v,1)}</div>`;
 }else{h+=`<div class="hcab"><div class="hato">Epílogo</div><div class="hk"><i><b>★</b></i><div><small>Depois do capítulo 14</small><h2>Os quatro finais</h2></div></div><div class="hnar">No centro da galáxia, o coração está guardado. São quatro finais, um por naipe.</div></div>`;
  if(at<H_CAP.length)h+=`<div class="htrv">Feche os 14 capítulos para chegar aqui.</div>`;
  else h+=`<div class="hfs">`+H_FIM.map(([s,t,f],k)=>{const N=NAIPES[s]||Object.values(NAIPES)[k];return `<button class="hf ${HS.fim[k]?'ok':''}" data-f="${k}" style="--nc:${N.cor}"><span class="hd"><b>${N.sym}</b></span><div><b>${t}</b><span>${HS.fim[k]?'Vencido':'Líder com 40 de vida'}</span></div></button>`}).join('')+`</div>`;}
 $('#hCorpo').innerHTML=h;
 $('#hTira').innerHTML=H_R.map((r,i)=>`<button class="${i===v?'on':''} ${hCapOk(i)?'ok':i>at?'tr':''} ${i%4===0||i===12?'ia':''}" data-v="${i}"><b>${i+1}</b></button>`).join('')+`<button class="${v===14?'on':''} ${at<14?'tr':''} ia" data-v="14"><b>★</b></button>`;
 const on=$('#hTira .on');if(on&&on.scrollIntoView)on.scrollIntoView({inline:'center',block:'nearest'});}
function hAbrir(){HB=null;musica('calma');hAjustaEsc();hDesenha();show('historia');}
function hLutar(b){hAjustaEsc();HB=b;HB.esc=Object.assign({},ESC);try{HB.tema=localStorage.getItem('gm-tema');}catch(e){}
 if(b.code){ESC[hChaveNaipe(b.code)]=b.code;}
 nova();if(b.vida){S.ol+=b.vida;}
 if(b.code){try{aplicarTema(CL[b.code].pl);}catch(e){}const o=$('#oAv');o.style.backgroundImage=`url(s/${b.code}.webp)`;o.style.backgroundSize='1900% auto';o.style.backgroundPosition='100% 18%';}
 render();show('duelo');toast(b.nome);}
function hSaiDaLuta(){if(!HB)return;Object.assign(ESC,HB.esc);try{HB.tema?localStorage.setItem('gm-tema',HB.tema):localStorage.removeItem('gm-tema');}catch(e){}const o=$('#oAv');o.style.backgroundImage='url(art/necromante2.webp)';o.style.backgroundSize='';o.style.backgroundPosition='';}
const fim0=fim;
function fimTela(v,x){const f=$('#fim');f.classList.toggle('der',!v);$('#fimX').innerHTML=x||'';}
fim=function(v,t){if(typeof ONL==='undefined'||!ONL.guest){const emp=/mpate/.test(t||'');if(!emp){HS[v?'vit':'der']=(HS[v?'vit':'der']||0)+1;hSalva();}}if(!HB){fimTela(v,'');$('#denovo').textContent='JOGAR DE NOVO';return fim0(v,/turno/.test(t)?t.replace(/no turno (\d+)\./,(m,n)=>`no ${n}º dia.`):t);}
 const b=HB;let msg='',x='';
 if(v&&b.code){const c=CL[b.code],N=hNaipe(b.code);HS.w[b.code]=(HS.w[b.code]||0)+1;
  if(HS.w[b.code]>=b.nec){if(!hTem(b.code))HS.lib.push(b.code);msg='Você ganhou um baralho novo.';if(CLASSES.filter(q=>q.s===c.s).every(q=>hTem(q.code)))msg=`Rota de ${N.nome} completa: o tema de ${N.nome} foi liberado.`;x=`<div class="fnv" style="--nc:${N.cor}"><i style="background-image:url(s/${b.code}.webp)"></i><div><small>Novo baralho · ${N.nome}</small><b>${c.name}</b><span>${c.pl}</span></div></div>`;}
  else{const fal=b.nec-HS.w[b.code];msg=fal===1?`Falta 1 vitória para liberar ${c.name}.`:`Faltam ${fal} vitórias para liberar ${c.name}.`;x=`<div class="fpp" style="--nc:${N.cor}">${hPips(HS.w[b.code],b.nec)}</div>`;}}
 else if(v&&b.fim!=null){HS.fim[b.fim]=true;msg=`Você venceu ${b.nome}.`;}
 else if(!v)msg=/desist/i.test(t)?'Você deixou a batalha. A porta continua aberta.':'Seu líder caiu. A porta continua aberta.';
 hSalva();hSaiDaLuta();fim0(v,msg);fimTela(v,x);$('#denovo').textContent=v?'CONTINUAR':'TENTAR DE NOVO';};
$('#denovo').addEventListener('click',e=>{if(HB){e.stopImmediatePropagation();hAbrir();}},true);
$('#voltar').addEventListener('click',()=>{if(HB){HB=null;$('#denovo').textContent='JOGAR DE NOVO';}});
$('#jogar').addEventListener('click',()=>{HB=null;hAjustaEsc();},true);
$('#histBtn').onclick=()=>{destravarVoz('');hAbrir();};$('#hBack').onclick=()=>show('menu');
$('#hCorpo').addEventListener('click',e=>{const p=e.target.closest('.hp');if(p){const i=+p.dataset.i,j=+p.dataset.j,[t,code]=H_CAP[i][3+j];if(hTem(code)){toast('Esta porta já foi vencida');return;}
  if(HS.pri[i]==null){HS.pri[i]=j;hSalva();}hLutar({code,nec:hNec(i),vida:HS.pri[i]!==j?5:0,nome:t});return;}
 const f=e.target.closest('.hf');if(f){const k=+f.dataset.f;hLutar({fim:k,vida:10,nome:H_FIM[k][1]});}});
$('#hTira').addEventListener('click',e=>{const b=e.target.closest('button');if(b)hDesenha(+b.dataset.v);});
// ---------- coleção ----------
function cDesenha(){const at=hAtual(),nf=Object.keys(HS.fim).length;
 $('#cRes').innerHTML=`<div><b>${HS.lib.length}</b><small>de 32 baralhos</small></div><div><b>${Math.min(at,14)}</b><small>de 14 capítulos</small></div><div><b>${nf}</b><small>de 4 finais</small></div>`;
 $('#cBar').style.setProperty('--p',Math.round(HS.lib.length/32*100)+'%');
 $('#cGrade').innerHTML=Object.entries(NAIPES).map(([k,N])=>{const cs=CLASSES.filter(x=>hChaveNaipe(x.code)===k),n=cs.filter(x=>hTem(x.code)).length;
  return `<div class="cn" style="--nc:${N.cor}"><div class="cnh"><span class="hd"><b>${N.sym}</b></span><b>${N.nome}</b><small>${n} de ${cs.length}</small></div><div class="ctm ${n===cs.length?'ok':''}"><i></i>Tema de ${N.nome}<em>${n===cs.length?'liberado':'libere os '+cs.length+' baralhos'}</em></div><div class="cg">${cs.map(x=>{const ok=hTem(x.code),cap=H_CAP.findIndex(c=>c[3][1]===x.code||c[4][1]===x.code);return `<div class="cc ${ok?'':'tr'}"><i style="background-image:url(s/${x.code}.webp)"></i><b>${x.name}</b><small>${ok?x.pl:'Capítulo '+(cap+1)}</small></div>`}).join('')}</div></div>`}).join('');}
$('#colBtn').onclick=()=>{cDesenha();show('colecao');};$('#cBack').onclick=()=>show('menu');
$('#cTudo').onclick=()=>{HS.lib=CLASSES.map(c=>c.code);hSalva();cDesenha();toast('Tudo liberado (teste)');};
$('#cZera').onclick=()=>{HS={lib:[...H_INI],w:{},pri:{},fim:{}};hSalva();hAjustaEsc();cDesenha();toast('História recomeçada');};
document.querySelectorAll('#hVis button').forEach(b=>b.onclick=()=>hVisual(+b.dataset.k));hVisual(HVIS);
$('#hI').onclick=()=>$('#hInfo').classList.add('on');$('#hInfo').onclick=()=>$('#hInfo').classList.remove('on');
// ---------- ranking (pronto para quando houver login) ----------
function rPontos(){return (HS.vit||0)*3+Math.max(0,HS.lib.length-4)*10+Object.keys(HS.fim).length*25;}
function rDesenha(){const v=HS.vit||0,d=HS.der||0;
 $('#rEu').innerHTML=`<span class="rpos">—</span><i></i><div><b>Você</b><small>Sem login · só neste aparelho</small></div><strong>${rPontos()}<small>pontos</small></strong>`;
 $('#rNum').innerHTML=`<div><b>${v}</b><small>vitórias</small></div><div><b>${d}</b><small>derrotas</small></div><div><b>${HS.lib.length}</b><small>baralhos</small></div><div><b>${Math.min(hAtual(),14)}</b><small>capítulos</small></div>`;}
$('#rankBtn').onclick=()=>{rDesenha();show('ranking');};$('#rBack').onclick=()=>show('menu');
document.querySelectorAll('#rAbas button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#rAbas button').forEach(x=>x.classList.toggle('on',x===b));});
$('#rEntrar').onclick=()=>toast('Login ainda não está pronto');
hAjustaEsc();
