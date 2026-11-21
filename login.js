// ===== LOGIN COM GOOGLE (Supabase Auth) + RANKING NA NUVEM =====
// Só funciona no site publicado; dentro do mockup do Claude a página não alcança o servidor.
const LG={user:null,linha:null,lista:null,t:0};
function lgSb(){try{if(!window.supabase)return null;return window.__sb||(window.__sb=supabase.createClient(SB_URL,SB_KEY));}catch(e){return null;}}
function lgNums(){return {pontos:rPontos(),vit:HS.vit||0,der:HS.der||0,baralhos:Math.min(32,Math.max(4,HS.lib.length)),capitulos:Math.min(hAtual(),14),finais:Object.keys(HS.fim).length};}
async function lgEntrar(){const sb=lgSb();if(!sb){toast('Sem conexão com o servidor');return;}
 try{const r=await fetch(SB_URL+'/auth/v1/settings',{headers:{apikey:SB_KEY}});const j=await r.json();if(!j.external||!j.external.google){toast('O login com Google ainda não foi ativado');return;}}catch(e){toast('Sem conexão com o servidor');return;}
 const {error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}});if(error)toast('Não deu para entrar: '+error.message);}
async function lgSair(){const sb=lgSb();if(sb)await sb.auth.signOut();LG.user=null;LG.lista=null;rDesenha();toast('Você saiu da conta');}
function lgJunta(p){if(!p||!p.lib)return;HS.lib=[...new Set([...HS.lib,...p.lib])];Object.entries(p.w||{}).forEach(([k,v])=>HS.w[k]=Math.max(HS.w[k]||0,v));Object.entries(p.pri||{}).forEach(([k,v])=>{if(HS.pri[k]==null)HS.pri[k]=v;});Object.assign(HS.fim,p.fim||{});HS.vit=Math.max(HS.vit||0,p.vit||0);HS.der=Math.max(HS.der||0,p.der||0);if(p.t){HS.t=HS.t||{};Object.entries(p.t).forEach(([k,a])=>{HS.t[k]=[0,1,2,3].map(i=>Math.max((HS.t[k]||[])[i]||0,(a||[])[i]||0));});}if(p.intro)HS.intro=1;}
async function lgSobe(){const sb=lgSb();if(!sb||!LG.user)return;const m=LG.user.user_metadata||{};
 const linha=Object.assign({id:LG.user.id,nome:String(m.full_name||m.name||'Jogador').slice(0,40),foto:m.avatar_url||null,progresso:HS,atualizado:new Date().toISOString()},lgNums());
 const {error}=await sb.from('gm_mobile_jogadores').upsert(linha);if(!error)LG.linha=linha;}
async function lgBaixa(){const sb=lgSb();if(!sb||!LG.user)return;const {data}=await sb.from('gm_mobile_jogadores').select('progresso').eq('id',LG.user.id).maybeSingle();
 if(data&&data.progresso){lgJunta(data.progresso);hSalva0();hAjustaEsc();}await lgSobe();}
async function lgRanking(){const sb=lgSb();if(!sb)return;const {data,error}=await sb.from('gm_mobile_jogadores').select('id,nome,foto,pontos,vit,baralhos').order('pontos',{ascending:false}).order('atualizado',{ascending:true}).limit(50);LG.lista=error?null:data;lgRender();}
function lgRender(){const v=$('#rVaz'),l=$('#rLista');if(!v||!l)return;
 if(!LG.user){v.style.display='';l.innerHTML='';return;}
 v.style.display='none';const m=LG.user.user_metadata||{},pos=LG.lista?LG.lista.findIndex(x=>x.id===LG.user.id):-1;
 $('#rEu').innerHTML=`<span class="rpos">${pos>=0?pos+1+'º':'—'}</span><i ${m.avatar_url?`style="background-image:url(${m.avatar_url})"`:''}></i><div><b>${(m.full_name||m.name||'Você').replace(/</g,'')}</b><small>Conta Google · progresso salvo</small></div><strong>${rPontos()}<small>pontos</small></strong>`;
 l.innerHTML=(LG.lista?LG.lista.map((x,i)=>`<div class="rln ${x.id===LG.user.id?'eu':''}"><span>${i+1}</span><b>${String(x.nome).replace(/</g,'')}</b><small>${x.vit} vitórias · ${x.baralhos} baralhos</small><strong>${x.pontos}</strong></div>`).join(''):'<div class="rcar">Carregando o ranking…</div>')+`<button class="sec" id="rSair" style="width:100%;height:44px;margin-top:14px;font-size:14px">SAIR DA CONTA</button>`;
 $('#rSair').onclick=lgSair;}
const hSalva0=hSalva;hSalva=function(){hSalva0();clearTimeout(LG.t);LG.t=setTimeout(lgSobe,1500);};
const rDesenha0=rDesenha;rDesenha=function(){rDesenha0();lgRender();if(LG.user)lgRanking();};
$('#rEntrar').onclick=lgEntrar;
(function(){const sb=lgSb();if(!sb)return;try{sb.auth.onAuthStateChange((ev,s)=>{const u=s&&s.user||null,novo=u&&(!LG.user||LG.user.id!==u.id);LG.user=u;if(novo)setTimeout(async()=>{await lgBaixa();if($('#ranking').classList.contains('on'))rDesenha();else toast('Você entrou como '+((u.user_metadata||{}).name||'jogador'));},0);});}catch(e){}})();
