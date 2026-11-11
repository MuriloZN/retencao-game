import { phases } from "./data.js";

const canvas=document.querySelector("#game"),ctx=canvas.getContext("2d");
const xpEl=document.querySelector("#xp"),phaseEl=document.querySelector("#phase-label"),hint=document.querySelector("#hint");
const dialog=document.querySelector("#dialog"),title=document.querySelector("#dialog-title"),body=document.querySelector("#dialog-text"),actions=document.querySelector("#dialog-actions"),feedback=document.querySelector("#feedback");
const W=canvas.width,H=canvas.height,worldWidth=2600,groundY=438;
let xp=0,phaseIndex=0,customerIndex=0,dialogOpen=false,camera=0,helpUsed=false,completed=new Set(),activeEncounter=null,stageIndex=0,retention=50,earnedThisTalk=0;
const keys={left:false,right:false};
let player={x:90,y:groundY-54,vx:0,vy:0,w:34,h:54,onGround:true};
const platforms=Array.from({length:7},(_,i)=>({x:390+i*330,y:365-(i%2)*40,w:120,h:16}));
const coins=Array.from({length:22},(_,i)=>({x:260+i*105,y:390-(i%3)*35,taken:false}));
let npcs=[];
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
function currentPhase(){return phases[phaseIndex]}
function currentEncounter(){const p=currentPhase();return customerIndex<p.customers.length?p.customers[customerIndex]:p.boss}
function rebuildNpcs(){npcs=[];let x=570;currentPhase().customers.forEach((c,i)=>npcs.push({x:x+i*480,name:c.name,type:"customer",index:i}));npcs.push({x:2100,name:"CHEFE",type:"boss",index:3})}
function addXP(n){xp+=n;xpEl.textContent=xp}
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
 body.textContent=stageIndex===0?enc.issue+" "+enc.question:stage.prompt;
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
  if(phaseIndex<phases.length-1){phaseIndex++;customerIndex=0;rebuildNpcs();phaseEl.textContent="FASE "+(phaseIndex+1)+" · "+currentPhase().name.toUpperCase();openSupervisor()}
  else openDialog({name:"Parabéns!",issue:"Você concluiu as três etapas do protótipo.",question:"Obrigado por jogar!",options:[{text:"Finalizar",xp:0,good:true,feedback:"Protótipo concluído."}]},"FIM DE DEMONSTRAÇÃO");
 }
}
function openSupervisor(){openDialog({name:currentPhase().supervisor,issue:currentPhase().intro,question:"Está pronto para ajudar os clientes?",options:[{text:"Vamos começar!",xp:10,good:true,feedback:"Missão iniciada. Explore a área!"}]},"BRIEFING DA FASE")}
function interact(){
 if(dialogOpen)return;
 const npc=npcs.find(n=>Math.abs((n.x+17)-(player.x+player.w/2))<85);
 if(npc){const p=currentPhase(),enc=npc.type==="boss"?p.boss:p.customers[npc.index],key=phaseIndex+":"+npc.index;if(completed.has(key)){hint.textContent="Você já concluiu este atendimento.";return}openDialog(enc,npc.type==="boss"?"CHEFE DA FASE":"ATENDIMENTO")}
 else hint.textContent="Chegue mais perto de um personagem para conversar.";
}
function drawBackground(){
 const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"#51b9ff");g.addColorStop(1,"#d4f4ff");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 for(let i=0;i<8;i++){let x=((i*190-camera*.25)%(W+180)+W+180)%(W+180)-70;ctx.fillStyle="#f4fbff";ctx.fillRect(x,75+(i%3)*35,75,18);ctx.fillRect(x+18,60+(i%3)*35,40,20)}
 ctx.fillStyle="#e7edf4";ctx.fillRect(340-camera*.55,170,1250,270);ctx.fillStyle="#24436b";ctx.fillRect(420-camera*.55,215,1180,170);
 for(let i=0;i<12;i++){ctx.fillStyle="#40a9ed";ctx.fillRect(450+i*92-camera*.55,230,65,135)}
 ctx.fillStyle="#533b37";ctx.fillRect(900-camera*.55,205,420,185);ctx.fillStyle="#fff";ctx.font="bold 34px Nunito";ctx.fillText("DESKTOP",1000-camera*.55,280);
 for(let i=0;i<15;i++){let x=(i*230-camera*.8)%(W+200);ctx.fillStyle="#765137";ctx.fillRect(x,350,15,100);ctx.fillStyle=i%2?"#258b4b":"#329e55";ctx.beginPath();ctx.arc(x+8,340,38,0,Math.PI*2);ctx.fill()}
}
function draw(){
 drawBackground();ctx.save();ctx.translate(-camera,0);
 ctx.fillStyle="#344d43";ctx.fillRect(0,groundY,worldWidth,H-groundY);ctx.fillStyle="#7bd34c";ctx.fillRect(0,groundY-7,worldWidth,9);ctx.fillStyle="#b9c7d2";ctx.fillRect(0,groundY+5,worldWidth,13);
 platforms.forEach(p=>{ctx.fillStyle="#8c5b3b";ctx.fillRect(p.x,p.y,p.w,p.h);ctx.fillStyle="#7bd34c";ctx.fillRect(p.x,p.y-5,p.w,6)});
 coins.forEach(c=>{if(c.taken)return;ctx.fillStyle="#ffca38";ctx.beginPath();ctx.arc(c.x,c.y,12,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#fff1a5";ctx.lineWidth=3;ctx.stroke();ctx.fillStyle="#86520c";ctx.font="bold 13px Nunito";ctx.fillText("XP",c.x-8,c.y+5)});
 npcs.forEach(n=>{ctx.fillStyle=n.type==="boss"?"#643a83":"#8b3f56";ctx.fillRect(n.x,390,34,48);ctx.fillStyle="#e9b18b";ctx.fillRect(n.x+7,365,21,24);ctx.fillStyle="#17213b";ctx.fillRect(n.x+6,435,9,17);ctx.fillRect(n.x+22,435,9,17);ctx.fillStyle="#17213b";ctx.font="bold 13px Nunito";ctx.fillText(n.name,n.x-12,355);ctx.fillStyle="#fff";ctx.fillText("E",n.x+11,380)});
 ctx.fillStyle="#6b3046";ctx.fillRect(player.x,player.y+17,player.w,player.h-17);ctx.fillStyle="#e9b18b";ctx.fillRect(player.x+7,player.y,22,23);ctx.fillStyle="#243451";ctx.fillRect(player.x+5,player.y+player.h-8,12,8);ctx.fillRect(player.x+22,player.y+player.h-8,12,8);ctx.fillStyle="#fff";ctx.fillRect(player.x+22,player.y+8,4,4);
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
  for(const p of platforms){if(oldY+player.h<=p.y+2&&player.y+player.h>=p.y&&player.x+player.w>p.x+2&&player.x<p.x+p.w-2){if(!landing||p.y<landing.y)landing=p}}
  if(landing){player.y=landing.y-player.h;player.vy=0;player.onGround=true}
  if(player.y+player.h>=groundY){player.y=groundY-player.h;player.vy=0;player.onGround=true}
 }else{
  for(const p of platforms){if(oldY>=p.y+p.h&&player.y<=p.y+p.h&&player.x+player.w>p.x+2&&player.x<p.x+p.w-2){player.y=p.y+p.h;player.vy=0}}
 }
 coins.forEach(c=>{if(!c.taken&&Math.abs(c.x-player.x-17)<24&&Math.abs(c.y-player.y-25)<40){c.taken=true;addXP(5)}});
 camera=clamp(player.x-W*.35,0,worldWidth-W);
}
function loop(){if(!dialogOpen)movePlayer();draw();requestAnimationFrame(loop)}
function setKey(k,v){if(k==="left"||k==="right")keys[k]=v;if(k==="jump"&&v&&player.onGround&&!dialogOpen){player.vy=-10;player.onGround=false}if(k==="interact"&&v)interact()}
window.addEventListener("keydown",e=>{if(["ArrowLeft","ArrowRight","ArrowUp"," "].includes(e.key))e.preventDefault();if(e.key==="ArrowLeft"||e.key.toLowerCase()==="a")setKey("left",true);if(e.key==="ArrowRight"||e.key.toLowerCase()==="d")setKey("right",true);if((e.key===" "||e.key==="ArrowUp"||e.key.toLowerCase()==="w")&&!e.repeat)setKey("jump",true);if(e.key.toLowerCase()==="e"&&!e.repeat)setKey("interact",true);if(e.key==="Escape")closeDialog()});
window.addEventListener("keyup",e=>{if(e.key==="ArrowLeft"||e.key.toLowerCase()==="a")setKey("left",false);if(e.key==="ArrowRight"||e.key.toLowerCase()==="d")setKey("right",false)});
document.querySelectorAll("[data-key]").forEach(b=>{const k=b.dataset.key;b.addEventListener("pointerdown",e=>{e.preventDefault();setKey(k,true)});["pointerup","pointerleave","pointercancel"].forEach(ev=>b.addEventListener(ev,()=>{if(k==="left"||k==="right")setKey(k,false)}))});
document.querySelector("#close-dialog").onclick=closeDialog;
document.querySelector("#restart").onclick=()=>{xp=0;phaseIndex=0;customerIndex=0;completed.clear();coins.forEach(c=>c.taken=false);player={x:90,y:groundY-54,vx:0,vy:0,w:34,h:54,onGround:true};camera=0;xpEl.textContent="0";phaseEl.textContent="FASE 1 · INSATISFAÇÃO";rebuildNpcs();closeDialog();openSupervisor()};
rebuildNpcs();openSupervisor();loop();
