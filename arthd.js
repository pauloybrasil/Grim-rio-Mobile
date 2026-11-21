// ===== ARTE EM ALTA: originais das cartas no Supabase (o sprite local fica por baixo enquanto carrega) =====
const ARTE_BASE='https://jayfrrquibicrkhcezlk.supabase.co/storage/v1/object/public/gemini/';
const ARTE_HD={CANJ:'6b2570,8c312b,1a9ac2,4c426f,c33868,e4f425,801cde,5d0195,131ca7',CCIB:'99dc3c,e3daf2,ceefd3,248a10,e0f75d,e2c58c,a4980e,de723a,101b62',CDRA:'1b0b58,297563,6bf17d,51a316,928fa7,61a519,80dbce,bd86a4,031d2e',
CELE:'f02271,bab44f,d3aff4,3717d9,fa46f9,3472b8,94a25b,43e197,f67d64',CELF:'e2772d,a7e0d1,2f1291,0f68a6,b909cd,0fe554,f26ee4,01e01d,576da8',CFER:'fdae00,1c58b8,c37a8e,377cba,7c90a3,6d3298,77af09,20d3bd,6c21d2',
CGUE:'75ce48,d60ce3,a3534a,2cd62f,eb3852,416996,2b38fe,cc84e2,2f303f',CHUM:'58d4ec,e7f52e,a542bf,6fcbde,4af647,b89c5f,7ea3dc,10e130,a9a34d',CINF:'124427,ae9c65,faa5f4,618a99,f4d144,529b27,7254dc,a6ae30,02ce36',
CMAG:'a866ef,7e3565,e62bed,de248f,7b95dd,cdc1c7,1c1be0,4c31fd,e59f71',CMER:'0ec1d5,f80a96,078226,d13174,dddeb0,020a68,cbf4ca,866451,e1e4bb',CMIC:'31988f,9be9cd,067568,f3d3f1,4726d2,f0dcbf,8c16fb,f61256,39a349',
CNEC:'2245bf,e9332e,4b6e8b,3ffcd3,f9de78,6e34a3,a52a24,8a8486,2885d7',COCE:'87d843,864358,248e42,7d43d0,249f64,5d7a08,cdbac6,1f27b4,8c00e9',CPIR:'dd6b89,5a3be1,1c00d4,e1253a,24c9bc,cc1e2b,be66e0,effb09,d33b48',
CSAH:'10e26d,7d0989,b26eef,93a184,97b2f9,364bca,e765e1,bab859,88f450',ZARC:'238575,5c9c27,9c1078,c78ed1,b3f581,7a7775,02cd91,68c620,d3b35b',ZAUR:'217bb9,a01ca8,ca2221,5f7c5a,fb5673,5b5995,d84ba2,fa2ad6,13cfcc',
ZBRA:'8c4cee,b8d865,691a52,8f4a0a,0d52c4,7c3cd8,1ffec0,b39f73,3913cd',ZCOR:'e03e04,dbe744,2fe736,f174f2,adb9f0,8481f3,c4274b,b2a4a0,2f65db',ZDRA:'489425,06bef3,28f9e5,ff25b6,35bade,17e082,06ee27,542662,9b9a86',
ZFER:'7f7a28,d26c9a,e2382c,b9b5cd,35aca1,a050af,e695a8,c2a44f,4d173e',ZIGN:'a8e82e,463ace,dcd421,b52edd,29ed36,47e79e,ce175a,543f1c,0c6226',ZINF:'2a6c99,75c55c,8276e9,528f1e,8596f0,f9258c,6ca86a,254975,1b4883',
ZMER:'1ea63c,69291a,346376,248e2a,737322,b27fbc,a601eb,e07158,ad17b5',ZMIC:'e9def1,abb342,48b8c9,31224a,9a0758,442201,ae865c,258674,1680e1',ZNEX:'4e2953,6a5577,c5a557,bfa4a9,cd67d2,0123d0,504ccc,bb7b84,33f288',
ZOSS:'c47212,60389b,c02a3f,35d68c,dad600,4b28e6,f3bd4e,c7478e,db85e8',ZPEL:'c3bf25,2c5966,3a974c,3a4282,677945,1d567a,827bfc,7202d1,bd71c2',ZSAH:'44d667,e7c565,ebb4b6,eeba37,deeea2,3432fb,77b9db,11721e,406827',
ZTER:'573e21,efbe25,66b62a,26e4b2,a42a8f,eb5b1c,d49d7a,802fae,6cbf33',ZVER:'8a9565,baf26e,499f69,666cf5,aca536,0c9c13,a0769d,bab937,1a9af6'};
const ARTE_RENDER='https://jayfrrquibicrkhcezlk.supabase.co/storage/v1/render/image/public/gemini/';
// w = largura pedida em pixels (o servidor redimensiona; a proporção das artes é 2:3)
function hdURL(code,n,w){const h=ARTE_HD[code];if(!h||n<2||n>10)return null;const k=code.toLowerCase(),pasta=code[0]==='C'?k.slice(1):k,arq=pasta+'/'+k+'-'+String(n).padStart(2,'0')+'-'+h.split(',')[n-2]+'.jpg';
 return w?ARTE_RENDER+arq+'?width='+w+'&height='+Math.round(w*1.5)+'&resize=cover&quality=82':ARTE_BASE+arq;}
function hdSobre(el,code,n,w,pos){if(!el)return;const u=hdURL(code,n,w||700);const velho=el.querySelector(':scope>img.ahd');if(velho&&velho.dataset.u===u)return;if(velho)velho.remove();if(!u)return;
 const im=new Image();im.className='ahd';im.alt='';im.decoding='async';im.dataset.u=u;if(pos)im.style.objectPosition=pos;im.onload=()=>im.classList.add('ok');im.onerror=()=>im.remove();im.src=u;el.insertBefore(im,el.firstChild);}
