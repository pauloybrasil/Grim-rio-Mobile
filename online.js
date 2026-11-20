// ================= MODO ONLINE (2 jogadores) =================
// O anfitrião roda a partida (lado 'm') e o amigo é o lado 'o'.
// Cada dia os dois preparam em segredo; o amigo envia as jogadas ao tocar BATALHA;
// o anfitrião resolve a revelação e o combate e manda o estado da mesa para o amigo.
const SB_URL='https://jayfrrquibicrkhcezlk.supabase.co';
const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpheWZycnF1aWJpY3JraGNlemxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0NzcwMDIsImV4cCI6MjEwOTA1MzAwMn0.OxkSyMsO1jd82416c0gjqe6xF2fHlIBY8fxseABTzlM';
const ONL={on:false,host:false,guest:false,code:'',ch:null,plays:[],waiting:false,ready:null,lastTurn:0,partner:false,snapT:null,
 send(ev,data){if(!this.ch)return;try{this.ch.send(ev,data);}catch(e){}},
 snap(){if(!this.host||!S)return;clearTimeout(this.snapT);this.snapT=setTimeout(()=>{this.send('snap',{
   mine:S.mine,theirs:S.theirs,oh:S.oh,hn:S.hand.length,ml:S.ml,ol:S.ol,deck:S.deck.length,turn:S.turn,max:S.max,busy:!!S.busy&&!ONL.esperando,lane:S.lane,
   gmana:S.gmana||S.max,cem:S.cem.slice(0,40),log:S.log.slice(0,40),ESC});},60);}};
// troca a perspectiva das frases da narração (o que é "seu" para um é "do oponente" para o outro)
function inverter(t){const P=[['(seu)','(do oponente)'],['líder inimigo','seu líder'],['Vida dele','Sua vida'],['Você revela','Oponente revela'],['Você vence a coluna','O oponente vence a coluna']];
 let s=t;P.forEach(([a,b],k)=>{s=s.split(a).join('§A'+k+'§').split(b).join('§B'+k+'§');});P.forEach(([a,b],k)=>{s=s.split('§A'+k+'§').join(b).split('§B'+k+'§').join(a);});return s;}
// ---------- transporte: Supabase Realtime (ou BroadcastChannel para teste local com ?local=1) ----------
function abrirCanal(code,papel,onMsg,onPresenca){
 if(/[?&]local=1/.test(location.search)){const bc=new BroadcastChannel('gm-mobile-'+code);bc.onmessage=e=>{const m=e.data;if(m.ev==='hello'){onPresenca(true);if(papel==='host')bc.postMessage({ev:'hello-ack'});}else if(m.ev==='hello-ack')onPresenca(true);else onMsg(m.ev,m.data);};
   setTimeout(()=>bc.postMessage({ev:'hello'}),100);return {send:(ev,data)=>bc.postMessage({ev,data:JSON.parse(JSON.stringify(data))})};}
 if(!window.supabase){toast('Sem conexão com o servidor online');return null;}
 const sb=window.__sb||(window.__sb=supabase.createClient(SB_URL,SB_KEY));
 const ch=sb.channel('gm-mobile-'+code,{config:{broadcast:{self:false},presence:{key:papel}}});
 ch.on('broadcast',{event:'msg'},({payload})=>onMsg(payload.ev,payload.data));
 ch.on('presence',{event:'sync'},()=>{const st=ch.presenceState();onPresenca(Object.keys(st).length>=2);});
 ch.subscribe(async s=>{if(s==='SUBSCRIBED')await ch.track({papel,t:Date.now()});});
 return {send:(ev,data)=>ch.send({type:'broadcast',event:'msg',payload:{ev,data}})};}
// ---------- anfitrião ----------
function criarSala(){ONL.code=Math.random().toString(36).slice(2,6).toUpperCase();ONL.on=true;ONL.host=true;ONL.guest=false;abrirEscolha();toast('Escolha as classes e toque em Começar');}
function esperarAmigo(){ $('#onCode').textContent=ONL.code;$('#onMsg').textContent='Mande este código para o seu amigo. Ele toca em Jogar online → Entrar e digita o código.';show('online');$('#onWait').hidden=false;$('#onJoin').hidden=true;
 ONL.ch=abrirCanal(ONL.code,'host',hostMsg,ok=>{if(ok&&!ONL.partner){ONL.partner=true;comecarOnline();}else if(!ok&&ONL.partner){toast('Seu amigo saiu da sala');}});}
function comecarOnline(){nova();S.gmana=S.max;show('duelo');ONL.send('start',{ESC});setTimeout(()=>ONL.snap(),300);narrar('Seu amigo entrou. Que comece o duelo.',false,true);}
function hostMsg(ev,d){if(ev==='plays'){ONL.guestPlays=d.plays||[];if(ONL.ready){const r=ONL.ready;ONL.ready=null;r();}else toast('Seu amigo já preparou as cartas');}
 if(ev==='hello2')ONL.snap();
 if(ev==='desiste')fim(true,'Seu amigo desistiu.');}
async function aplicarJogadasAmigo(){ // entra no lugar do oponente do computador
 let mana=S.gmana||S.max;const plays=ONL.guestPlays||[];ONL.guestPlays=null;let trocou=false;
 for(const p of plays){const k=S.oh.findIndex(c=>c&&c.id===p.id);if(k<0)continue;const c=S.oh[k];if(c.cost>mana)continue;
   if(S.theirs[p.slot]){if(trocou)continue;trocou=true;await sair('o',p.slot);}
   S.oh.splice(k,1);mana-=c.cost;c.novo=1;S.theirs[p.slot]=c;}
 S.omanaSobra=mana;render();}
// ---------- amigo (convidado) ----------
function entrarSala(){const code=($('#onIn').value||'').trim().toUpperCase();if(code.length<4){toast('Digite o código de 4 letras');return;}
 ONL.code=code;ONL.on=true;ONL.guest=true;ONL.host=false;$('#onMsg').textContent='Conectando à sala '+code+'…';
 ONL.ch=abrirCanal(code,'guest',guestMsg,ok=>{if(ok){$('#onMsg').textContent='Conectado! Esperando o anfitrião começar…';ONL.send('hello2',{});}});}
function guestMsg(ev,d){
 if(ev==='start'){ESC=d.ESC;S=null;show('duelo');narrar('Você entrou na sala. Que comece o duelo.',false,true);}
 if(ev==='snap')aplicarSnap(d);
 if(ev==='nar'){narrar(inverter(d.t),false,true);}
 if(ev==='fim'){fim(!d.v,d.tg);}
 if(ev==='banner'){if(S){S.turn=d.turn;banner(true);}}}
function aplicarSnap(d){
 const novoDia=!S||d.turn!==ONL.lastTurn;ESC=d.ESC||ESC;
 S=S||{sel:-1,hide:new Set(),pend:{m:0,o:0},log:[]};
 S.mine=d.theirs;S.theirs=d.mine;S.hand=d.oh;S.oh=Array(d.hn).fill(0);S.ml=d.ol;S.ol=d.ml;S.deck=Array(d.deck).fill(0);S.turn=d.turn;S.max=d.max;S.lane=d.lane;
 S.cem=(d.cem||[]).map(c=>({...c,lado:c.lado==='m'?'o':'m'}));S.log=(d.log||[]).map(l=>({...l,t:inverter(l.t)}));
 if(novoDia&&!d.busy){ONL.lastTurn=d.turn;ONL.plays=[];ONL.waiting=false;S.trocou=false;}
 if(ONL.waiting&&!d.busy&&!novoDia){}
 // reaplica as cartas que o amigo preparou e ainda não enviou
 let gasto=0;for(const p of ONL.plays){const k=S.hand.findIndex(c=>c&&c.id===p.c.id);if(k>=0)S.hand.splice(k,1);S.mine[p.slot]={...p.c,novo:1};gasto+=p.c.cost;}
 S.mana=Math.max(0,(d.gmana||d.max)-gasto);S.busy=d.busy||ONL.waiting;
 if(!S.hide)S.hide=new Set();render();
 $('#turn').textContent=ONL.waiting&&!d.busy?'Esperando o anfitrião · '+ORD(S.turn,1):$('#turn').textContent;}
async function jogarConvidado(hi,slot){const c=S.hand[hi];if(!c||c.cost>S.mana||S.busy)return;
 if(S.mine[slot]){if(S.trocou){toast('Você já trocou uma carta neste dia');return;}S.trocou=true;}
 S.hand.splice(hi,1);S.mana-=c.cost;S.sel=-1;ONL.plays=ONL.plays.filter(p=>p.slot!==slot);ONL.plays.push({c,slot,id:c.id});S.mine[slot]={...c,novo:1};render();cls(cardEl('m',slot),'slam',400);}
function batalhaConvidado(){if(S.busy)return;ONL.send('plays',{plays:ONL.plays.map(p=>({id:p.id,slot:p.slot}))});ONL.waiting=true;S.busy=true;render();$('#turn').textContent='Esperando o amigo resolver a batalha · '+ORD(S.turn,1);narrar('Cartas enviadas. Esperando a batalha.',false,true);}
