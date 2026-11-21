// ================= TEMAS DO CAMPO DE BATALHA (16 planetas) + EFEITO DE COMPRA =================
// Cada planeta tem um campo próprio: cores, textura, casas, divisória e partículas.
// Referências (adaptadas, sem copiar): tabuleiros temáticos do Hearthstone, locais do Marvel Snap,
// regiões do Legends of Runeterra, campos do Gwent, Hollow Knight, Hades, Journey, Balatro e Darkest Dungeon.
const SVG=s=>`url("data:image/svg+xml,${encodeURIComponent(s)}")`;
const TEMAS={
 'Verdélia':{nome:'Bosque das Raízes',ref:'Hearthstone · Stranglethorn / Ori',bg:'radial-gradient(120% 60% at 50% 0%,#2f5a2a 0%,#173018 45%,#0b1a0d 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><g fill="none" stroke="#7fbf5a" stroke-opacity=".13" stroke-width="2"><path d="M0 60 Q30 40 60 60 T120 60"/><path d="M60 0 Q40 30 60 60 T60 120"/></g><circle cx="20" cy="22" r="6" fill="#9ad16a" fill-opacity=".08"/></svg>'),
   slot:'#8fd16a',glow:'rgba(143,209,106,.35)',mid:'linear-gradient(90deg,transparent,#6aa84f,#c8e88a,#6aa84f,transparent)',p:{n:34,cores:['#c8f08a','#ffe98a','#7fd16a'],forma:'folha',vy:[.15,.45],vx:[-.3,.3],tam:[3,7],brilho:1}},
 'Áurea':{nome:'Portões do Céu Partido',ref:'Darkest Dungeon (luz) · Diablo III (Paraíso)',bg:'linear-gradient(180deg,#221a30 0%,#3b2c44 32%,#8a6a4a 46%,#d9b46a 54%,#a8813e 70%,#3a2a18 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><g fill="none" stroke="#fff3c8" stroke-opacity=".18"><circle cx="100" cy="100" r="60"/><circle cx="100" cy="100" r="90"/></g></svg>'),
   slot:'#ffe08a',glow:'rgba(255,224,138,.45)',mid:'linear-gradient(90deg,transparent,#5a3d6e,#ffe9a8,#5a3d6e,transparent)',escuro:true,p:{n:26,cores:['#fff6d6','#ffe08a','#d9c3ff'],forma:'pena',vy:[.2,.5],vx:[-.25,.25],tam:[4,9],brilho:1}},
 'Pelágia':{nome:'Abismo de Coral',ref:'Hearthstone · Cidade Submersa / Subnautica',bg:'linear-gradient(180deg,#0a2f4a 0%,#0b1f38 55%,#050c1c 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><g fill="none" stroke="#7fe3ff" stroke-opacity=".10" stroke-width="3"><path d="M0 40 C40 20 80 60 160 30"/><path d="M0 110 C50 80 100 140 160 100"/></g></svg>'),
   slot:'#6fd8ff',glow:'rgba(111,216,255,.35)',mid:'linear-gradient(90deg,transparent,#1b6f99,#9ff0ff,#1b6f99,transparent)',causticas:true,p:{n:30,cores:['#bff4ff','#7fe3ff'],forma:'bolha',vy:[-.6,-.25],vx:[-.15,.15],tam:[2,7],brilho:.6}},
 'Micora':{nome:'Caverna dos Esporos',ref:'Hollow Knight · Ermos Fúngicos',bg:'radial-gradient(90% 60% at 50% 55%,#33204a 0%,#1d1430 50%,#0c0816 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90"><g fill="#c38cff" fill-opacity=".07"><circle cx="15" cy="20" r="9"/><circle cx="62" cy="58" r="13"/><circle cx="70" cy="15" r="5"/></g></svg>'),
   slot:'#c38cff',glow:'rgba(195,140,255,.4)',mid:'linear-gradient(90deg,transparent,#5b3d8a,#7ff0c8,#5b3d8a,transparent)',p:{n:40,cores:['#7ff0c8','#c38cff','#f0a8ff'],forma:'esporo',vy:[-.25,-.05],vx:[-.2,.2],tam:[2,5],brilho:1}},
 'Brasão':{nome:'Pátio da Fortaleza',ref:'Gwent · Reinos do Norte',bg:'linear-gradient(180deg,#2a2228 0%,#3a2f2c 40%,#2a221f 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40"><g fill="none" stroke="#000" stroke-opacity=".35" stroke-width="2"><path d="M0 0H80M0 20H80M0 40H80M20 0V20M60 0V20M0 20V40M40 20V40"/></g></svg>'),
   slot:'#e2b25c',glow:'rgba(214,72,60,.35)',mid:'linear-gradient(90deg,transparent,#8a1f1f,#e2b25c,#8a1f1f,transparent)',estandartes:true,p:{n:22,cores:['#ffb35a','#ff7a3a'],forma:'brasa',vy:[-.7,-.3],vx:[-.2,.2],tam:[1.5,3],brilho:1}},
 'Ferália':{nome:'Savana da Caçada',ref:'Monster Hunter · Ninho Antigo',bg:'linear-gradient(180deg,#5a2f16 0%,#a3561f 30%,#3d2414 62%,#1c1109 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="56" height="48"><path d="M14 0l14 8v16l-14 8-14-8V8z M42 24l14 8v16l-14 8-14-8V32z" fill="none" stroke="#ffcf6a" stroke-opacity=".08" stroke-width="2"/></svg>'),
   slot:'#ffbe5a',glow:'rgba(255,170,70,.35)',mid:'linear-gradient(90deg,transparent,#7a4a1a,#ffd27a,#7a4a1a,transparent)',p:{n:36,cores:['#ffd9a0','#e0a060'],forma:'poeira',vy:[-.05,.05],vx:[.25,.6],tam:[1,2.5],brilho:.5}},
 'Terrânia':{nome:'Barricada da Cidade',ref:'Legends of Runeterra · Noxus / Zaun',bg:'linear-gradient(180deg,#1f2630 0%,#2d333d 45%,#161a20 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><path d="M0 30H60M30 0V60" stroke="#9fb3c8" stroke-opacity=".08"/><rect x="4" y="4" width="22" height="22" fill="#9fb3c8" fill-opacity=".03"/></svg>'),
   slot:'#9fd0ff',glow:'rgba(255,90,70,.3)',mid:'linear-gradient(90deg,transparent,#c0392b,#f5f5f5,#2e6db4,transparent)',p:{n:24,cores:['#9aa7b5','#c9d2db'],forma:'fumaca',vy:[-.35,-.12],vx:[-.1,.2],tam:[8,18],brilho:.18}},
 'Sahárion':{nome:'Dunas do Sol Branco',ref:'Journey · Prince of Persia',bg:'linear-gradient(180deg,#f0b768 0%,#d98b3e 30%,#a85a24 55%,#5a2d12 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><path d="M0 40 Q50 10 100 40 T200 40" fill="none" stroke="#fff0c8" stroke-opacity=".14" stroke-width="3"/></svg>'),
   slot:'#fff0c8',glow:'rgba(255,230,170,.45)',mid:'linear-gradient(90deg,transparent,#8a4a18,#fff0c8,#8a4a18,transparent)',escuro:true,calor:true,p:{n:60,cores:['#ffe9b8','#f2c27a'],forma:'areia',vy:[-.05,.08],vx:[.8,1.6],tam:[1,2],brilho:.6}},
 'Arcânia':{nome:'Observatório Arcano',ref:'Hearthstone · Dalaran / Runeterra · Targon',bg:'radial-gradient(80% 50% at 50% 50%,#3b1f6e 0%,#1b0f38 55%,#08051a 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140"><g fill="#fff"><circle cx="12" cy="20" r="1"/><circle cx="90" cy="40" r="1.4"/><circle cx="50" cy="110" r="1"/><circle cx="125" cy="95" r="1.2"/></g></svg>'),
   slot:'#b28cff',glow:'rgba(178,140,255,.45)',mid:'linear-gradient(90deg,transparent,#5a2fb0,#ffd27a,#5a2fb0,transparent)',circulo:true,p:{n:28,cores:['#d7c2ff','#ffd27a','#8fd0ff'],forma:'runa',vy:[-.3,-.08],vx:[-.1,.1],tam:[8,13],brilho:1}},
 'Nexo':{nome:'Núcleo de Dados',ref:'Cyberpunk 2077 · Hacknet',bg:'linear-gradient(180deg,#05141c 0%,#0a0a1e 50%,#12051c 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M0 0H32V32" fill="none" stroke="#00f0ff" stroke-opacity=".12"/></svg>'),
   slot:'#00f0ff',glow:'rgba(255,0,200,.35)',mid:'linear-gradient(90deg,transparent,#ff00c8,#00f0ff,#ff00c8,transparent)',scan:true,p:{n:30,cores:['#00f0ff','#ff4fd8'],forma:'bit',vy:[.6,1.4],vx:[0,0],tam:[10,13],brilho:.9}},
 'Dracária':{nome:'Ninho do Vulcão',ref:'Skyrim · Hearthstone · Ermo dos Dragões',bg:'linear-gradient(180deg,#3a0f0a 0%,#6e1f0e 35%,#2a0c08 70%,#120604 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30"><path d="M0 30 Q20 0 40 30" fill="none" stroke="#ff9a4a" stroke-opacity=".12" stroke-width="2"/></svg>'),
   slot:'#ff9a4a',glow:'rgba(255,110,40,.45)',mid:'linear-gradient(90deg,transparent,#8a2a0a,#ffd27a,#8a2a0a,transparent)',sombra:true,p:{n:46,cores:['#ffcf6a','#ff7a2a','#ff4a1a'],forma:'brasa',vy:[-1.1,-.4],vx:[-.4,.4],tam:[1.5,3.5],brilho:1}},
 'Mercantia':{nome:'Salão do Grande Leilão',ref:'Balatro · Gwent (taverna)',bg:'radial-gradient(90% 60% at 50% 50%,#3d1a2c 0%,#24101c 55%,#12070e 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path d="M24 4l20 20-20 20L4 24z" fill="none" stroke="#e8c26a" stroke-opacity=".09"/></svg>'),
   slot:'#e8c26a',glow:'rgba(232,194,106,.45)',mid:'linear-gradient(90deg,transparent,#7a1d3a,#ffe08a,#7a1d3a,transparent)',p:{n:20,cores:['#ffe08a','#d9a63a'],forma:'moeda',vy:[.5,1],vx:[-.1,.1],tam:[5,8],brilho:1}},
 'Ossário':{nome:'Cripta da Névoa',ref:'Darkest Dungeon · Inscryption',bg:'linear-gradient(180deg,#0e1a1c 0%,#16282a 45%,#081012 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"><g fill="none" stroke="#bfe8d8" stroke-opacity=".07" stroke-width="3"><path d="M10 20h18M8 16a4 4 0 1 0 0 8M30 16a4 4 0 1 1 0 8"/><path d="M42 54h18M40 50a4 4 0 1 0 0 8M62 50a4 4 0 1 1 0 8"/></g></svg>'),
   slot:'#7ff0d0',glow:'rgba(127,240,208,.3)',mid:'linear-gradient(90deg,transparent,#2a5a50,#d8fff0,#2a5a50,transparent)',nevoa:true,p:{n:22,cores:['#9fffe0','#d8fff0'],forma:'alma',vy:[-.4,-.15],vx:[-.25,.25],tam:[3,6],brilho:1}},
 'Ígnea':{nome:'Forja do Magma',ref:'Hades · Diablo IV',bg:'linear-gradient(180deg,#1c0d08 0%,#2e140a 45%,#120704 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><path d="M0 50 L40 70 L70 40 L110 80 L160 60 M30 160 L60 120 L100 130 L130 100 L160 110 M80 0 L90 40" fill="none" stroke="#ff7a1a" stroke-opacity=".35" stroke-width="2"/></svg>'),
   slot:'#ff8a2a',glow:'rgba(255,120,30,.45)',mid:'linear-gradient(90deg,transparent,#5a1a08,#ffb35a,#5a1a08,transparent)',magma:true,p:{n:40,cores:['#ffd27a','#ff8a2a','#fff0a0'],forma:'faisca',vy:[-1.6,-.6],vx:[-.6,.6],tam:[1,2.4],brilho:1}},
 'Inférnia':{nome:'Trono das Correntes',ref:'DOOM Eternal · Hades (Asfódelo)',bg:'linear-gradient(180deg,#2a0508 0%,#4a0a10 40%,#1a0306 100%)',
   tex:SVG('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="80"><g fill="none" stroke="#000" stroke-opacity=".4" stroke-width="4"><ellipse cx="20" cy="20" rx="8" ry="14"/><ellipse cx="20" cy="60" rx="8" ry="14"/></g></svg>'),
   slot:'#ff4a4a',glow:'rgba(255,40,40,.45)',mid:'linear-gradient(90deg,transparent,#3a0006,#ff5a3a,#3a0006,transparent)',chamas:true,p:{n:34,cores:['#ff5a3a','#ffb35a','#3a3a3a'],forma:'cinza',vy:[-.9,-.3],vx:[-.3,.3],tam:[1.5,3.5],brilho:.8}},
 'Corsária':{nome:'Convés da Tempestade',ref:'Sea of Thieves · Hearthstone (piratas)',bg:'linear-gradient(180deg,#1a2a38 0%,#2a1d12 38%,#3a2616 70%,#1e130a 100%)',
   tex:'repeating-linear-gradient(90deg,rgba(0,0,0,.28) 0 2px,transparent 2px 64px),repeating-linear-gradient(0deg,rgba(255,220,160,.05) 0 1px,transparent 1px 9px)',
   slot:'#f0c27a',glow:'rgba(255,200,110,.35)',mid:'repeating-linear-gradient(90deg,#c9a26a 0 10px,#7a5a32 10px 14px)',lanterna:true,p:{n:28,cores:['#d8f0ff','#a8d0e8'],forma:'gota',vy:[.9,1.8],vx:[-.6,-.2],tam:[1,2],brilho:.5}}
};
const PLANETAS=Object.keys(TEMAS);
let TEMA=null;
// ---------- aplica o tema ----------
// ---------- estilo Regiões: cada planeta = cor de fundo + cor de destaque + arte das duas classes ----------
const RG={'Verdélia':['#0c1f14','#8fd16a','CELF','ZVER'],'Áurea':['#1c1a26','#ffe08a','CANJ','ZAUR'],'Pelágia':['#081c2c','#6fd8ff','COCE','ZPEL'],'Micora':['#1a1228','#c9a0ff','CMIC','ZMIC'],
 'Brasão':['#1f1a1c','#e2b25c','CGUE','ZBRA'],'Ferália':['#24170c','#ffbe5a','CFER','ZFER'],'Terrânia':['#141a22','#9fd0ff','CHUM','ZTER'],'Sahárion':['#2a1b0e','#ffd9a0','CSAH','ZSAH'],
 'Arcânia':['#150d2c','#b9a0ff','CMAG','ZARC'],'Nexo':['#06141c','#3fe8f5','CCIB','ZNEX'],'Dracária':['#240c08','#ff9a4a','CDRA','ZDRA'],'Mercantia':['#220f1a','#e8c26a','CMER','ZMER'],
 'Ossário':['#0c191b','#7ff0d0','CNEC','ZOSS'],'Ígnea':['#1c0d08','#ff8a2a','CELE','ZIGN'],'Inférnia':['#220508','#ff6a5a','CINF','ZINF'],'Corsária':['#121c26','#f0c27a','CPIR','ZCOR']};
const GLIFO={'Verdélia':'M5 19c0-8 5-13 14-14 0 9-5 14-14 14zM5 19l8-8','Áurea':'M12 4a4 1.5 0 1 0 0 3 4 1.5 0 0 0 0-3zM12 10v10M12 12c-3-2-6-2-8 0 2 1 4 3 8 3M12 12c3-2 6-2 8 0-2 1-4 3-8 3','Pelágia':'M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0','Micora':'M4 12a8 7 0 0 1 16 0zM10 12v6a2 2 0 0 0 4 0v-6',
 'Brasão':'M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z','Ferália':'M6 20c0-6 1-11 3-15M11 20c0-6 1-11 3-15M16 20c0-6 1-10 3-13','Terrânia':'M6 21V9l3-3 3 3 3-3 3 3v12zM10 21v-5h4v5','Sahárion':'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2',
 'Arcânia':'M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z','Nexo':'M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4','Dracária':'M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z','Mercantia':'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM12 8l3 4-3 4-3-4z',
 'Ossário':'M6 11a6 6 0 1 1 12 0v4l-2 1v3H8v-3l-2-1zM9 11h1M14 11h1M12 14v2','Ígnea':'M4 8h13v3c-2 0-4 1-4 3h3v4H7v-4h3c0-2-2-3-6-3z','Inférnia':'M5 4c0 6 2 9 7 9s7-3 7-9M8 13v4l4 3 4-3v-4','Corsária':'M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 7v13M5 13c0 4 3 7 7 7s7-3 7-7M8 11h8'};
function aplicarTema(pl){$('#rgGly').setAttribute('d',GLIFO[pl]||'');$('#pzGly').setAttribute('d',GLIFO[pl]||'');$('#pzPl').textContent=pl;['#shGly','#pnGly'].forEach(k=>$(k).setAttribute('d',GLIFO[pl]||''));$('#shPl').textContent=pl;$('#pnPl').textContent=pl;{const r=RG[pl],p=$('#pausa');if(r){[p,$('#sheet'),$('#pn')].forEach(p=>{p.style.setProperty('--tb',r[0]);p.style.setProperty('--ts',r[1]);p.style.setProperty('--tg',r[1]+'55');p.style.setProperty('--ta',`url(s/${r[2]}.webp)`);});}}$('#duelo').style.setProperty('--tx',(TEMAS[pl]||{}).tex||'none');const t=TEMAS[pl],r=RG[pl];if(!t||!r)return;TEMA=pl;const d=$('#duelo');d.dataset.tema=pl;d.classList.add('rg');
 d.style.setProperty('--tb',r[0]);d.style.setProperty('--tt','none');d.style.setProperty('--ts',r[1]);d.style.setProperty('--tg',r[1]+'55');d.style.setProperty('--tm',r[1]);
 d.style.setProperty('--ta',`url(s/${r[2]}.webp)`);$('#tDecor .d1').style.backgroundImage=`url(s/${r[3]}.webp)`;$('#tDecor .d2').style.backgroundImage=`url(s/${r[2]}.webp)`;
 $('#temaNome').textContent=pl;$('#rgNome').textContent=pl;$('#rgSub').textContent=t.nome;iniciarParticulas({...t.p,n:Math.round(t.p.n*.45)});try{localStorage.setItem('gm-tema',pl);}catch(e){}}
// ---------- partículas do fundo ----------
let PT=[],PTcfg=null,PTraf=0;
function iniciarParticulas(cfg){PTcfg=cfg;const cv=$('#fxBg');if(!cv)return;const W=cv.width=innerWidth*devicePixelRatio,H=cv.height=innerHeight*devicePixelRatio;const r=(a)=>a[0]+Math.random()*(a[1]-a[0]);
 PT=Array.from({length:cfg.n},()=>({x:Math.random()*W,y:Math.random()*H,vx:r(cfg.vx)*devicePixelRatio,vy:r(cfg.vy)*devicePixelRatio,s:r(cfg.tam)*devicePixelRatio,c:cfg.cores[Math.random()*cfg.cores.length|0],a:Math.random()*6.28,g:Math.random()*'ᚠᚢᚦᚨᚱᚲᚷᚹ01'.length|0}));
 if(!PTraf)PTraf=requestAnimationFrame(passo);}
function passo(){PTraf=requestAnimationFrame(passo);const cv=$('#fxBg');if(!cv||!PTcfg||!$('#duelo').classList.contains('on'))return;const x=cv.getContext('2d'),W=cv.width,H=cv.height,f=PTcfg.forma;x.clearRect(0,0,W,H);
 for(const p of PT){p.x+=p.vx;p.y+=p.vy;p.a+=.02;if(p.y<-20)p.y=H+20;if(p.y>H+20)p.y=-20;if(p.x>W+20)p.x=-20;if(p.x<-20)p.x=W+20;
  const tw=.55+.45*Math.sin(p.a*2);x.globalAlpha=(PTcfg.brilho||1)*tw;x.fillStyle=p.c;x.strokeStyle=p.c;
  if(f==='folha'||f==='pena'){x.save();x.translate(p.x+Math.sin(p.a)*8,p.y);x.rotate(p.a);x.beginPath();x.ellipse(0,0,p.s,p.s*.4,0,0,6.28);x.fill();x.restore();}
  else if(f==='bolha'){x.lineWidth=1.2*devicePixelRatio;x.beginPath();x.arc(p.x+Math.sin(p.a)*4,p.y,p.s,0,6.28);x.stroke();}
  else if(f==='runa'||f==='bit'){x.font=`${p.s}px ${f==='bit'?'monospace':'serif'}`;x.fillText(f==='bit'?(Math.random()<.02?(p.g=(p.g+1)%2,p.g):p.g%2):'ᚠᚢᚦᚨᚱᚲᚷᚹ'[p.g%8],p.x,p.y);}
  else if(f==='moeda'){x.save();x.translate(p.x,p.y);x.scale(Math.abs(Math.cos(p.a*2))+.15,1);x.beginPath();x.arc(0,0,p.s,0,6.28);x.fill();x.restore();}
  else if(f==='fumaca'){x.globalAlpha=(PTcfg.brilho)*.8;const g=x.createRadialGradient(p.x,p.y,0,p.x,p.y,p.s*2);g.addColorStop(0,p.c);g.addColorStop(1,'transparent');x.fillStyle=g;x.fillRect(p.x-p.s*2,p.y-p.s*2,p.s*4,p.s*4);}
  else if(f==='gota'||f==='areia'){x.lineWidth=p.s;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(p.x-p.vx*6,p.y-p.vy*6);x.stroke();}
  else{if(f==='alma'||f==='esporo'){x.shadowColor=p.c;x.shadowBlur=10*devicePixelRatio;}x.beginPath();x.arc(p.x+(f==='alma'?Math.sin(p.a)*6:0),p.y,p.s,0,6.28);x.fill();x.shadowBlur=0;}}
 x.globalAlpha=1;}
addEventListener('resize',()=>PTcfg&&iniciarParticulas(PTcfg));
// ---------- seletor de tema (mockup) ----------

// ===== temas de naipe: prêmio por liberar todos os baralhos do naipe =====
const TNAIPE={'Copas':['copas','#240d10','#e0685f','CELF','CANJ','Verdélia','M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z','Coração da galáxia'],
 'Espadas':['espadas','#0c1826','#6fb0e6','CGUE','CHUM','Terrânia','M12 3s7 5.5 7 10a3.5 3.5 0 0 1-6 2.5V19h2v2H9v-2h2v-3.5A3.5 3.5 0 0 1 5 13c0-4.5 7-10 7-10z','Fio da lâmina'],
 'Ouros':['ouros','#241a08','#e6b84a','CMAG','CDRA','Mercantia','M12 3l7 9-7 9-7-9z','Cofre do mundo'],
 'Paus':['paus','#170f26','#a988d8','CNEC','CINF','Micora','M12 3a3.5 3.5 0 0 1 3 5.3A3.5 3.5 0 1 1 13 14v5h2v2H9v-2h2v-5a3.5 3.5 0 1 1-2-5.7A3.5 3.5 0 0 1 12 3z','Cinza e brasa']};
Object.entries(TNAIPE).forEach(([n,[k,b,c,a1,a2,base,g,sub]])=>{const T=TEMAS[base];TEMAS[n]=Object.assign({},T,{nome:sub,p:Object.assign({},T.p,{cores:[c,'#ffffff',c]})});RG[n]=[b,c,a1,a2];GLIFO[n]=g;});
function temaLivre(pl){const t=TNAIPE[pl];if(!t||typeof hTem!=='function')return true;return CLASSES.filter(x=>x.s===t[0]).every(x=>hTem(x.code));}
function abrirTemas(){const g=$('#temaGrade');g.innerHTML=Object.keys(TNAIPE).concat(PLANETAS).map(pl=>{const t=TEMAS[pl],r=RG[pl];return `<button class="tm-b ${pl===TEMA?'on':''} ${TNAIPE[pl]?'tn':''} ${temaLivre(pl)?'':'tr'}" data-pl="${pl}"><i class="tm-a"></i><span class="tm-d"></span><span class="tm-x"><b>${pl}</b><small>${temaLivre(pl)?t.nome:'Libere os 8 baralhos'}</small></span></button>`}).join('');
 g.querySelectorAll('.tm-b').forEach(b=>{const r=RG[b.dataset.pl];b.style.setProperty('--tb',r[0]);b.style.setProperty('--ts',r[1]);b.querySelector('.tm-a').style.backgroundImage=`url(s/${r[2]}.webp)`;b.onclick=()=>{if(b.classList.contains('tr')){toast('Libere todos os baralhos de '+b.dataset.pl);return;}aplicarTema(b.dataset.pl);$('#temaSheet').style.display='none';};});$('#temaSheet').style.display='flex';}
// tema da partida: o planeta de uma das suas classes (ou o último escolhido)
const nova0=nova;nova=function(){nova0();let pl=null;try{pl=localStorage.getItem('gm-tema');}catch(e){}
 if(!pl||!TEMAS[pl]){const pls=Object.values(ESC).map(c=>CL[c]&&CL[c].pl).filter(Boolean);pl=pls[Math.random()*pls.length|0]||'Arcânia';}aplicarTema(pl);distribuir();};
// ---------- EFEITO DE COMPRA ----------
// a carta sai do baralho (pilha à direita), vira no centro com brilho do naipe e voa para a mão.
// Mão cheia: ela queima e vira mana. Inspirado no Hearthstone (carta mostrada ao comprar), Marvel Snap e Runeterra.
const NCORT={copas:'#ff5a6a',espadas:'#7fb8ff',ouros:'#ffd27a',paus:'#7fe39a'};
const COSTA='<div class="card costa-c"></div>';
function retDeck(){return R($('#deckP'));}
function retCentro(){const b=R($('.board'));const w=Math.min(170,innerWidth*.42),h=w*4/3;return {x:b.cx-w/2,y:b.y+b.h/2-h/2,w,h,cx:b.cx,cy:b.y+b.h/2};}
async function mostrar(c,ok,rapido){const ce=retCentro(),d=add('drawfx '+(ok?'':'cheia'),ce.x,ce.y,null,{width:ce.w+'px',height:ce.h+'px'});d.style.setProperty('--nc',NCORT[c.s]||'#ffd27a');
 d.innerHTML=`<div class="dr-anel"></div><div class="dr-raios"></div><div class="dr-carta">${cardHTML(c)}</div><div class="dr-tag">${ok?'+1 CARTA':'MÃO CHEIA · +1 MANA'}</div>`;
 try{sfx(ok?'reveal':'down',.7);}catch(e){}burst(ce.cx,ce.cy,NCORT[c.s]||'#ffd27a',ok?18:26);
 await w(rapido?260:560);return d;}
async function animCompra(l,x,rapido){const c=x.c;
 if(l==='o'){const alvo=$('#oHand').lastElementChild;const de=retDeck();const pa=alvo?R(alvo):{x:innerWidth/2,y:40,w:16,h:22};if(alvo)alvo.style.visibility='hidden';await voo(de,{x:pa.x,y:pa.y,w:pa.w,h:pa.h},COSTA,rapido?260:380);if(alvo)alvo.style.visibility='';return;}
 const ce=retCentro();await voo(retDeck(),ce,COSTA,rapido?200:320);
 const d=await mostrar(c,x.ok,rapido);
 if(x.ok){S.hide.delete(c.id);render();const k=S.hand.indexOf(c);const el=$('#hand').children[k];let pa=el?R(el):{x:innerWidth/2,y:innerHeight-120,w:60,h:80};
   if(el)el.style.visibility='hidden';d.remove();await voo(ce,pa,cardHTML(c),rapido?220:320);if(el){el.style.visibility='';cls(el,'drawn',420);}try{sfx('place',.5);}catch(e){}}
 else{d.classList.add('queima');await w(520);d.remove();const m=R($('#mana'));burst(m.x+20,m.cy,'#7fc4ff',14);num(m.x+30,m.cy-10,1,true);}}
const comprar0=comprar;
comprar=async function(l,n,inicio){if(SPD>1||!S||!$('#duelo').classList.contains('on'))return comprar0(l,n,inicio);
 let extra=0;const novos=[];for(let k=0;k<n;k++){const c=compra();if(!c)break;const H=HD(l);if(H.length<MAOMAX){H.push(c);novos.push({c,ok:1});if(l==='m')S.hide.add(c.id);}else{S.cem.unshift({...c,lado:l,desc:1});extra++;novos.push({c,ok:0});}}
 if(extra){if(inicio){if(l==='m')S.mana+=extra;else S.omanaExtra=(S.omanaExtra||0)+extra;}else S.pend[l]=(S.pend[l]||0)+extra;lg(`🂠 Mão cheia: ${l==='m'?'você':'oponente'} descartou ${extra} e ganhou +${extra} de mana${inicio?'':' no próximo dia'}`);}
 render();for(const x of novos)await animCompra(l,x,novos.length>2);novos.forEach(x=>S.hide.delete(x.c.id));render();};
// distribuição inicial: 5 cartas para cada lado saindo do baralho
async function distribuir(){if(!S)return;const mh=S.hand.slice(),oh=S.oh.length;mh.forEach(c=>S.hide.add(c.id));S.oh=S.oh.slice();const ohc=S.oh.splice(0);render();
 for(let k=0;k<5;k++){if(mh[k]){S.hide.delete(mh[k].id);render();const el=$('#hand').children[k];if(el){el.style.visibility='hidden';await voo(retDeck(),R(el),COSTA,170);el.style.visibility='';cls(el,'flipin',380);}}
   if(ohc[k]){S.oh.push(ohc[k]);render();}}
 S.oh=S.oh.length?S.oh:ohc;render();}

// mão do oponente em leque (opção 1) e faixa central (opção 1), escolhidas pelo Paulo
function ohAjustar(){const o=$('#oHand'),n=o.children.length;[...o.children].forEach((el,i)=>el.style.setProperty('--k',i-(n-1)/2));}
new MutationObserver(ohAjustar).observe($('#oHand'),{childList:true});$('#oHand').classList.add('oh1');$('#duelo .mid').classList.add('cb1');ohAjustar();

document.querySelectorAll('#pausa .pz-cols b').forEach((b,k)=>{b.textContent=NKY[LN[k]].sym;b.style.color=NKY[LN[k]].cor;});
