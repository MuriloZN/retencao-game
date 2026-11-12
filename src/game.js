import { phases } from "./data.js";

const canvas=document.querySelector("#game"),ctx=canvas.getContext("2d");
const xpEl=document.querySelector("#xp"),phaseEl=document.querySelector("#phase-label"),hint=document.querySelector("#hint");
const dialog=document.querySelector("#dialog"),title=document.querySelector("#dialog-title"),body=document.querySelector("#dialog-text"),actions=document.querySelector("#dialog-actions"),feedback=document.querySelector("#feedback");
const W=canvas.width,H=canvas.height,worldWidth=3500,groundY=438;
let xp=0,phaseIndex=0,customerIndex=0,dialogOpen=false,camera=0,helpUsed=false,completed=new Set(),activeEncounter=null,stageIndex=0,retention=50,earnedThisTalk=0,gameStarted=false,selectedCharacter="pman";
const facadeImage=new Image();facadeImage.src="./assets/back.png";
const characterSprites={pman:new Image(),pfem:new Image()};
characterSprites.pman.src="./assets/player-male-sprite.png";
characterSprites.pfem.src="./assets/player-female-sprite.png";
let animationTick=0,gamePaused=false;
const portraitCanvas=document.querySelector("#player-portrait"),portraitCtx=portraitCanvas?.getContext("2d");
const keys={left:false,right:false};
let player={x:90,y:groundY-54,vx:0,vy:0,w:42,h:64,onGround:true,jumpsRemaining:2};
const terrain=[
 {x:0,w:500,y:438},{x:780,w:470,y:390},{x:1510,w:470,y:340},
 {x:2250,w:530,y:410},{x:3020,w:480,y:350}
];
const platforms=[
 {x:520,y:395,w:155,h:16},{x:680,y:350,w:130,h:16},
 {x:1270,y:350,w:130,h:16},{x:1405,y:300,w:125,h:16},
 {x:2000,y:300,w:125,h:16},{x:2130,y:350,w:120,h:16},
 {x:2790,y:350,w:120,h:16},{x:2915,y:300,w:120,h:16}
];
const coins=[
 {x:340,y:390},{x:570,y:350},{x:735,y:305},{x:930,y:345},
 {x:1330,y:305},{x:1465,y:255},{x:1690,y:295},{x:2055,y:255},
 {x:2190,y:305},{x:2450,y:365},{x:2835,y:305},{x:2970,y:255},
 {x:3220,y:315},{x:3380,y:315}
].map(c=>({...c,taken:false}));
let npcs=[];
const supervisors=[{x:155,name:"Supervisora 1",flip:false},{x:245,name:"Supervisora 2",flip:true}];
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
function currentPhase(){return phases[phaseIndex]}
function currentEncounter(){const p=currentPhase();return customerIndex<p.customers.length?p.customers[customerIndex]:p.boss}
function rebuildNpcs(){const spots=[930,1690,2450];npcs=currentPhase().customers.map((c,i)=>({x:spots[i],name:c.name,type:"customer",index:i}));npcs.push({x:3380,name:"CHEFE",type:"boss",index:3})}
function addXP(n){
 xp+=n;xpEl.textContent=xp;
 const level=Math.floor(xp/100)+1,progress=xp%100;
 const levelText=document.querySelector("#hud-level"),xpText=document.querySelector("#hud-xp"),bar=document.querySelector("#hud-xp-fill");
 if(levelText)levelText.textContent="Nível "+level+" · "+(level===1?"Aprendiz":level<4?"Atendente":"Especialista");
 if(xpText)xpText.textContent=progress+" / 100";
 if(bar)bar.style.width=progress+"%";
 const coinCount=document.querySelector("#coin-count");if(coinCount)coinCount.textContent=xp;
}
function createMeter(){
 let meter=document.querySelector("#retention-meter");
 if(!meter){meter=document.createElement("div");meter.id="retention-meter";meter.className="retention-meter";meter.innerHTML='<div class="meter-heading"><strong>Intenção de permanecer</strong><b id="meter-value">50%</b></div><div class="meter-track"><span id="meter-fill"></span></div><div class="meter-labels"><span>Cancelar</span><span>Continuar</span></div>';body.after(meter)}
 updateMeter();
}
function updateMeter(){
 const fill=document.querySelector("#meter-fill"),value=document.querySelector("#meter-value");
 if(fill){fill.style.width=retention+"%";fill.style.background=retention>=65?"#4caa78":retention<=35?"#d45b62":"#e1ae45";}
 if(value)value.textContent=retention+"%";
}
function getStage(enc,index){
 if(index===0)return {prompt:"Para começar, investigue melhor o que está acontecendo. Qual pergunta ou atitude ajuda a entender a necessidade?",options:enc.options.map(o=>({text:o.text,delta:o.good?12:-12,xp:o.xp,feedback:o.feedback}))};
 if(index===1){
  const finance=phaseIndex===1,technical=phaseIndex===2;
  if(finance)return {prompt:"Com o contexto mais claro, como você pode encaminhar uma solução sem criar falsas expectativas?",options:[
   {text:"Apresentar apenas condições que foram verificadas e comparar alternativas com transparência.",delta:18,xp:22,feedback:"Você trouxe clareza e respeitou a capacidade de decisão do cliente."},
   {text:"Prometer um desconto ou parcelamento antes de consultar as regras.",delta:-22,xp:3,feedback:"Promessas não confirmadas quebram a confiança. Verifique as condições antes."},
   {text:"Explicar o que é possível fazer e perguntar qual alternativa cabe melhor na realidade dele.",delta:15,xp:20,feedback:"Boa condução: opções reais e escolha compartilhada."}
  ]};
  if(technical)return {prompt:"Agora é hora de encaminhar o atendimento técnico. Qual é a melhor forma de avançar?",options:[
   {text:"Organizar os sintomas, consultar o histórico e seguir os testes adequados antes de concluir.",delta:18,xp:22,feedback:"Você evitou diagnóstico precipitado e estruturou a investigação."},
   {text:"Garantir que o problema nunca mais vai acontecer.",delta:-24,xp:3,feedback:"Não prometa resultado absoluto antes de identificar e tratar a causa."},
   {text:"Explicar o próximo procedimento, o prazo esperado e como o cliente receberá retorno.",delta:15,xp:20,feedback:"Alinhar expectativas e retorno também faz parte da solução."}
  ]};
  return {prompt:"Você reconheceu o problema. Como deve encaminhar a solução e recuperar a confiança?",options:[
   {text:"Combinar uma ação concreta, responsável e prazo de retorno, confirmando se faz sentido para o cliente.",delta:18,xp:22,feedback:"Você transformou a escuta em um próximo passo claro."},
   {text:"Oferecer um benefício sem relação com o problema para encerrar logo.",delta:-20,xp:4,feedback:"Uma oferta isolada não resolve a causa da insatisfação."},
   {text:"Explicar o que pode ser feito agora e confirmar se a necessidade foi atendida.",delta:15,xp:20,feedback:"Boa prática: solução compreensível e confirmação com o cliente."}
  ]};
 }
 return {prompt:"Depois de ouvir e encaminhar, o que você deve fazer para concluir com respeito?",options:[
  {text:"Confirmar se ficou alguma dúvida, resumir o combinado e respeitar a decisão do cliente.",delta:15,xp:18,feedback:"Você encerrou com transparência e autonomia para o cliente."},
  {text:"Insistir para que ele permaneça, mesmo dizendo que prefere cancelar.",delta:-25,xp:2,feedback:"Pressionar não é retenção responsável. A decisão do cliente deve ser respeitada."},
  {text:"Perguntar se a alternativa proposta atende à necessidade e explicar os próximos passos.",delta:12,xp:16,feedback:"Você verificou a adequação da solução antes de finalizar."}
 ]};
}
function renderStage(){
 const enc=activeEncounter,stage=getStage(enc,stageIndex);
 const customerVoice=stageIndex===1
  ? enc.name+" complementa: "+enc.issue+" O que você precisa considerar antes de encaminhar uma alternativa?"
  : enc.name+" aguarda uma conclusão clara. Como você confirma o entendimento, combina os próximos passos e respeita a decisão?";
 body.textContent=stageIndex===0?enc.issue+" "+enc.question:customerVoice+" "+stage.prompt;
 actions.innerHTML="";feedback.textContent="";
 const help=document.createElement("button");help.textContent="Pedir orientação à supervisão";help.className="help-button";
 help.onclick=()=>{if(helpUsed)return;helpUsed=true;feedback.textContent="Dica: "+(stageIndex===0?"use perguntas abertas e confirme o que entendeu antes de sugerir algo.":stageIndex===1?"avalie se a alternativa é realista, verificável e adequada ao contexto.":"resuma o combinado e respeite a autonomia do cliente.")+" A ajuda reduz o bônus de XP desta conversa.";help.disabled=true};
 actions.append(help);
 stage.options.forEach(o=>{
  const b=document.createElement("button");b.textContent=o.text;
  b.onclick=()=>{
   retention=clamp(retention+o.delta,0,100);updateMeter();
   const earned=helpUsed?Math.max(1,Math.floor(o.xp*.6)):o.xp;earnedThisTalk+=earned;addXP(earned);
   feedback.textContent=o.feedback+"  +"+earned+" XP"+(helpUsed?" (bônus reduzido pela ajuda)":"");
   for(const btn of actions.querySelectorAll("button"))btn.disabled=true;
   const next=document.createElement("button");
   next.textContent=stageIndex<2?"Continuar conversa":"Concluir atendimento";
   next.onclick=()=>{
    stageIndex++;
    if(stageIndex<3){renderStage();return}
    finishConversation();
   };
   actions.append(next);
  };
  actions.append(b);
 });
}
function openDialog(enc,tag="ATENDIMENTO"){
 dialogOpen=true;activeEncounter=enc;stageIndex=0;retention=50;earnedThisTalk=0;helpUsed=false;
 dialog.classList.remove("hidden");document.querySelector("#dialog-tag").textContent=tag;title.textContent=enc.name;
 createMeter();renderStage();
}
function closeDialog(){dialogOpen=false;dialog.classList.add("hidden")}
function finishConversation(){
 let outcome,summary,bonus=0;
 if(retention>=65){outcome="Cliente aceita continuar";summary="A conversa recuperou confiança e a solução apresentada foi considerada adequada.";bonus=15}
 else if(retention<=35){outcome="Cliente mantém o cancelamento";summary="O cliente decidiu cancelar. Respeitar uma decisão consciente também é um atendimento correto."}
 else {outcome="Cliente ainda está em dúvida";summary="A confiança melhorou parcialmente, mas o cliente precisa avaliar os próximos passos."}
 if(bonus){addXP(bonus);earnedThisTalk+=bonus}
 body.textContent=outcome+". "+summary;
 const meter=document.querySelector("#retention-meter");if(meter)meter.classList.add("final-meter");
 actions.innerHTML="";feedback.textContent="Resultado: "+earnedThisTalk+" XP nesta conversa"+(bonus?" (inclui bônus por solução adequada)":"")+".";
 const done=document.createElement("button");done.textContent="Voltar ao cenário";done.onclick=()=>{closeDialog();completeEncounter()};actions.append(done);
}
function completeEncounter(){
 const key=phaseIndex+":"+customerIndex;if(completed.has(key))return;completed.add(key);customerIndex++;
 if(customerIndex>currentPhase().customers.length){
  if(phaseIndex<phases.length-1){phaseIndex++;customerIndex=0;rebuildNpcs();phaseEl.textContent="FASE "+(phaseIndex+1)+" · "+currentPhase().name.toUpperCase();const phaseHud=document.querySelector("#hud-phase");if(phaseHud)phaseHud.textContent=phaseEl.textContent;openSupervisor()}
  else openDialog({name:"Parabéns!",issue:"Você concluiu as três etapas do protótipo.",question:"Obrigado por jogar!",options:[{text:"Finalizar",xp:0,good:true,feedback:"Protótipo concluído."}]},"FIM DE DEMONSTRAÇÃO");
 }
}
function openSupervisor(){openDialog({name:"Briefing da fase",issue:currentPhase().intro+" Duas supervisoras estão no ponto de partida para orientar você.",question:"Está pronto para atravessar o percurso e ajudar os clientes?",options:[{text:"Vamos começar! Vou explorar o caminho e conversar com cada cliente.",xp:10,good:true,feedback:"Missão iniciada. O trajeto exige saltos e pulo duplo; observe as plataformas à frente."}]},"BRIEFING DA FASE")}
function interact(){
 if(dialogOpen)return;
 const npc=npcs.find(n=>Math.abs((n.x+17)-(player.x+player.w/2))<85);
 if(npc){const p=currentPhase(),enc=npc.type==="boss"?p.boss:p.customers[npc.index],key=phaseIndex+":"+npc.index;if(completed.has(key)){hint.textContent="Você já concluiu este atendimento.";return}openDialog(enc,npc.type==="boss"?"CHEFE DA FASE":"ATENDIMENTO")}
 else hint.textContent="Chegue mais perto de um personagem para conversar.";
}
function drawBackground(){
 const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"#1688f4");g.addColorStop(1,"#b9e7ff");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 if(facadeImage.complete&&facadeImage.naturalWidth){
  const scale=Math.max(W/facadeImage.naturalWidth,H/facadeImage.naturalHeight);
  const dw=facadeImage.naturalWidth*scale,dh=facadeImage.naturalHeight*scale;
  const dx=(W-dw)/2-camera*.12;
  ctx.drawImage(facadeImage,dx,(H-dh)/2,dw,dh);
 }else{
  ctx.fillStyle="#e8edf4";ctx.fillRect(160-camera*.12,155,900,245);
 }
}
function drawPlayerSprite(){
 const sprite=characterSprites[selectedCharacter];
 if(!sprite?.complete||!sprite.naturalWidth){
  ctx.fillStyle="#6b3046";ctx.fillRect(player.x+4,player.y+20,34,44);return;
 }
 const moving=Math.abs(player.vx)>.4;
 const frame=player.onGround?(moving?1+(Math.floor(animationTick/7)%2):0):3;
 const drawW=51.2,drawH=64,drawX=player.x-4.6,drawY=player.y;
 ctx.save();ctx.imageSmoothingEnabled=false;
 if(player.vx<-.2){ctx.translate(drawX*2+drawW,0);ctx.scale(-1,1)}
 ctx.drawImage(sprite,frame*32,0,32,40,drawX,drawY,drawW,drawH);
 ctx.restore();
}
function updatePortrait(){
 if(!portraitCtx)return;
 const sprite=characterSprites[selectedCharacter];
 portraitCtx.clearRect(0,0,portraitCanvas.width,portraitCanvas.height);
 if(sprite?.complete&&sprite.naturalWidth){
  portraitCtx.imageSmoothingEnabled=false;
  portraitCtx.drawImage(sprite,0,0,32,40,8,2,56,70);
 }
}
Object.values(characterSprites).forEach(img=>img.addEventListener("load",updatePortrait));
\nfunction draw(){
 drawBackground();ctx.save();ctx.translate(-camera,0);
 terrain.forEach(t=>{ctx.fillStyle="#60422f";ctx.fillRect(t.x,t.y,t.w,H-t.y);ctx.fillStyle="#438b38";ctx.fillRect(t.x,t.y-8,t.w,10);ctx.fillStyle="#83d64d";ctx.fillRect(t.x,t.y-8,t.w,4);ctx.fillStyle="#9b7651";for(let x=t.x+12;x<t.x+t.w-8;x+=42)ctx.fillRect(x,t.y+18,20,5)});
 platforms.forEach(p=>{ctx.fillStyle="#815235";ctx.fillRect(p.x,p.y,p.w,p.h+24);ctx.fillStyle="#3d9b42";ctx.fillRect(p.x,p.y-7,p.w,9);ctx.fillStyle="#a5e65c";ctx.fillRect(p.x,p.y-7,p.w,3)});
 coins.forEach(c=>{if(c.taken)return;ctx.fillStyle="#ffca38";ctx.beginPath();ctx.arc(c.x,c.y,12,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#fff1a5";ctx.lineWidth=3;ctx.stroke();ctx.fillStyle="#86520c";ctx.font="bold 13px Nunito";ctx.fillText("XP",c.x-8,c.y+5)});
 supervisors.forEach((sp,i)=>{const x=sp.x;ctx.save();if(sp.flip){ctx.translate(x*2+34,0);ctx.scale(-1,1);ctx.translate(-x,0)}ctx.fillStyle="#63394c";ctx.fillRect(x+4,385,30,48);ctx.fillStyle="#e5ae8b";ctx.fillRect(x+8,360,23,27);ctx.fillStyle="#4b2d27";ctx.fillRect(x+6,356,26,10);ctx.fillStyle="#17213b";ctx.fillRect(x+8,430,9,15);ctx.fillRect(x+23,430,9,15);ctx.restore();ctx.fillStyle="#fff";ctx.font="bold 12px Nunito";ctx.fillText("SUPERVISÃO",x-14,348)});
 npcs.forEach(n=>{const floor=terrain.find(t=>n.x>=t.x&&n.x<t.x+t.w);const y=floor?floor.y:438;ctx.fillStyle=n.type==="boss"?"#643a83":"#8b3f56";ctx.fillRect(n.x,y-52,36,35);ctx.fillStyle="#e9b18b";ctx.fillRect(n.x+7,y-78,22,27);ctx.fillStyle="#17213b";ctx.fillRect(n.x+6,y-18,10,18);ctx.fillRect(n.x+23,y-18,10,18);ctx.fillStyle="#17213b";ctx.font="bold 13px Nunito";ctx.fillText(n.name,n.x-12,y-84);ctx.fillStyle="#fff";ctx.fillText("E",n.x+12,y-57)});
 drawPlayerSprite();
 ctx.restore();ctx.fillStyle="#17264d";ctx.fillRect(18,18,220,10);ctx.fillStyle="#ffc83d";ctx.fillRect(18,18,220*(player.x/worldWidth),10);
}
function overlaps(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}
function movePlayer(){
 const accel=keys.left?-3.2:keys.right?3.2:0;
 player.vx=accel||player.vx*.78;
 const oldX=player.x,oldY=player.y;
 player.x=clamp(player.x+player.vx,0,worldWidth-player.w);
 // Horizontal collision prevents snagging on platform sides.
 for(const p of platforms){if(overlaps(player,p)){if(player.vx>0)player.x=p.x-player.w;else if(player.vx<0)player.x=p.x+p.w;player.vx=0}}
 player.vy=Math.min(player.vy+.55,13);player.y+=player.vy;player.onGround=false;
 if(player.vy>=0){
  let landing=null;
  for(const p of [...platforms,...terrain]){if(oldY+player.h<=p.y+2&&player.y+player.h>=p.y&&player.x+player.w>p.x+2&&player.x<p.x+p.w-2){if(!landing||p.y<landing.y)landing=p}}
  if(landing){player.y=landing.y-player.h;player.vy=0;player.onGround=true;player.jumpsRemaining=2}
 }else{
  for(const p of platforms){if(oldY>=p.y+p.h&&player.y<=p.y+p.h&&player.x+player.w>p.x+2&&player.x<p.x+p.w-2){player.y=p.y+p.h;player.vy=0}}
  for(const t of terrain){if(oldY>=t.y&&player.y<=t.y&&player.x+player.w>t.x&&player.x<t.x+t.w){player.y=t.y;player.vy=0}}
 }
 coins.forEach(c=>{if(!c.taken&&Math.abs(c.x-player.x-17)<24&&Math.abs(c.y-player.y-25)<40){c.taken=true;addXP(5)}});
 if(player.y>H+100){const safe=terrain.filter(t=>t.x<=player.x).at(-1)||terrain[0];player.x=safe.x+Math.min(60,safe.w/3);player.y=safe.y-player.h;player.vy=0;player.vx=0;player.jumpsRemaining=2;hint.textContent="Você caiu! Retorne ao trecho seguro e tente novamente."}
 camera=clamp(player.x-W*.35,0,worldWidth-W);
}
function loop(){animationTick++;if(gameStarted&&!dialogOpen&&!gamePaused)movePlayer();draw();requestAnimationFrame(loop)}
function setKey(k,v){if(k==="left"||k==="right")keys[k]=v;if(k==="jump"&&v&&!dialogOpen&&!gamePaused&&player.jumpsRemaining>0){player.vy=player.jumpsRemaining===2?-11:-9.5;player.jumpsRemaining--;player.onGround=false}if(k==="interact"&&v&&!gamePaused)interact()}
window.addEventListener("keydown",e=>{if(["ArrowLeft","ArrowRight","ArrowUp"," "].includes(e.key))e.preventDefault();if(e.key==="ArrowLeft"||e.key.toLowerCase()==="a")setKey("left",true);if(e.key==="ArrowRight"||e.key.toLowerCase()==="d")setKey("right",true);if((e.key===" "||e.key==="ArrowUp"||e.key.toLowerCase()==="w")&&!e.repeat)setKey("jump",true);if(e.key.toLowerCase()==="e"&&!e.repeat)setKey("interact",true);if(e.key==="Escape")closeDialog()});
window.addEventListener("keyup",e=>{if(e.key==="ArrowLeft"||e.key.toLowerCase()==="a")setKey("left",false);if(e.key==="ArrowRight"||e.key.toLowerCase()==="d")setKey("right",false)});
document.querySelectorAll("[data-key]").forEach(b=>{const k=b.dataset.key;b.addEventListener("pointerdown",e=>{e.preventDefault();setKey(k,true)});["pointerup","pointerleave","pointercancel"].forEach(ev=>b.addEventListener(ev,()=>{if(k==="left"||k==="right")setKey(k,false)}))});
document.querySelector("#close-dialog").onclick=closeDialog;
function selectCharacter(id){
 selectedCharacter=id;
 updatePortrait();
 document.querySelectorAll("[data-character]").forEach(card=>{const active=card.dataset.character===id;card.classList.toggle("selected",active);card.setAttribute("aria-pressed",String(active))});
 const name=document.querySelector("#selected-character-name");
 if(name)name.textContent=id==="pman"?"Personagem masculino":"Personagem feminino";
 const preview=document.querySelector("#lobby-selected-sprite");if(preview)preview.src=id==="pman"?"./assets/player-male-sprite.png":"./assets/player-female-sprite.png";
}
document.querySelectorAll("[data-character]").forEach(card=>card.addEventListener("click",()=>selectCharacter(card.dataset.character)));
document.querySelector("#start-game").addEventListener("click",()=>{
 if(gameStarted)return;
 gameStarted=true;gamePaused=false;
 document.querySelector("#pause-game").textContent="Ⅱ";
 document.querySelector("#lobby").classList.add("hidden");
 hint.textContent="Explore o local e encontre alguém para ajudar.";
 openSupervisor();
});
document.querySelector("#restart").onclick=()=>{
 xp=0;phaseIndex=0;customerIndex=0;completed.clear();coins.forEach(c=>c.taken=false);
 player={x:90,y:groundY-64,vx:0,vy:0,w:42,h:64,onGround:true,jumpsRemaining:2};
 camera=0;gamePaused=false;xpEl.textContent="0";phaseEl.textContent="FASE 1 · INSATISFAÇÃO";const phaseHud=document.querySelector("#hud-phase");if(phaseHud)phaseHud.textContent=phaseEl.textContent;const levelText=document.querySelector("#hud-level"),xpText=document.querySelector("#hud-xp"),bar=document.querySelector("#hud-xp-fill"),coinCount=document.querySelector("#coin-count");if(levelText)levelText.textContent="Nível 1 · Aprendiz";if(xpText)xpText.textContent="0 / 100";if(bar)bar.style.width="0%";if(coinCount)coinCount.textContent="0";
 rebuildNpcs();closeDialog();gameStarted=false;document.querySelector("#lobby").classList.remove("hidden");
};
document.querySelector("#pause-game")?.addEventListener("click",()=>{
 gamePaused=!gamePaused;
 document.querySelector("#pause-game").textContent=gamePaused?"▶":"Ⅱ";
 hint.textContent=gamePaused?"Jogo pausado. Pressione continuar para voltar.":"Jogo retomado.";
});
selectCharacter("pman");rebuildNpcs();loop();
