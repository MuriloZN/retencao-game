import { phases } from "./data.js";

const canvas=document.querySelector("#game"),ctx=canvas.getContext("2d");
const xpEl=document.querySelector("#xp"),phaseEl=document.querySelector("#phase-label"),hint=document.querySelector("#hint");
const dialog=document.querySelector("#dialog"),title=document.querySelector("#dialog-title"),body=document.querySelector("#dialog-text"),actions=document.querySelector("#dialog-actions"),feedback=document.querySelector("#feedback");
const W=canvas.width,H=canvas.height,worldWidth=2600;
let xp=0,phaseIndex=0,customerIndex=0,dialogOpen=false,camera=0,helpUsed=false,completed=new Set();
const keys={left:false,right:false};let player={x:90,y:390,vx:0,vy:0,w:34,h:54,onGround:false};
const coins=Array.from({length:22},(_,i)=>({x:260+i*105,y:390-(i%3)*35,taken:false}));
let npcs=[];
function currentPhase(){return phases[phaseIndex]}
function currentEncounter(){const p=currentPhase();return customerIndex<p.customers.length?p.customers[customerIndex]:p.boss}
function rebuildNpcs(){npcs=[];let x=570;currentPhase().customers.forEach((c,i)=>{npcs.push({x:x+i*480,name:c.name,type:"customer",index:i})});npcs.push({x:2100,name:"CHEFE",type:"boss",index:3})}
rebuildNpcs();
function addXP(n){xp+=n;xpEl.textContent=xp}
function openDialog(encounter,tag="ATENDIMENTO"){dialogOpen=true;dialog.classList.remove("hidden");document.querySelector("#dialog-tag").textContent=tag;title.textContent=encounter.name;body.textContent=encounter.issue+" "+encounter.question;actions.innerHTML="";feedback.textContent="";helpUsed=false;
 const help=document.createElement("button");help.textContent="Pedir orientação à supervisão";help.onclick=()=>{if(helpUsed)return;helpUsed=true;feedback.textContent="Dica: faça uma pergunta aberta, confirme o que entendeu e só então apresente opções realistas.";help.disabled=true};actions.append(help);
 encounter.options.forEach((o)=>{const b=document.createElement("button");b.textContent=o.text;b.onclick=()=>{const earned=helpUsed?Math.max(2,Math.floor(o.xp*.6)):o.xp;addXP(earned);feedback.textContent=o.feedback+"  +"+earned+" XP"+(helpUsed?" (bônus reduzido pela ajuda)":"");for(const btn of actions.querySelectorAll("button"))btn.disabled=true;const next=document.createElement("button");next.textContent="Continuar";next.onclick=()=>{closeDialog();completeEncounter()};actions.append(next)};actions.append(b)});
}
function closeDialog(){dialogOpen=false;dialog.classList.add("hidden")}
function completeEncounter(){const key=phaseIndex+":"+customerIndex;if(completed.has(key))return;completed.add(key);customerIndex++;if(customerIndex>currentPhase().customers.length){if(phaseIndex<phases.length-1){phaseIndex++;customerIndex=0;rebuildNpcs();phaseEl.textContent="FASE "+(phaseIndex+1)+" · "+currentPhase().name.toUpperCase();openSupervisor()}else{openDialog({name:"Parabéns!",issue:"Você concluiu as três etapas do protótipo. O próximo passo é ampliar os cenários, arte e feedback.",question:"Obrigado por jogar!",options:[{text:"Finalizar",xp:0,good:true,feedback:"Protótipo concluído."}]},"FIM DE DEMONSTRAÇÃO")}}}
function openSupervisor(){openDialog({name:currentPhase().supervisor,issue:currentPhase().intro,question:"Está pronto para ajudar os clientes?",options:[{text:"Vamos começar!",xp:10,good:true,feedback:"Missão iniciada. Explore a área!"}]},"BRIEFING DA FASE")}
function interact(){if(dialogOpen)return;const npc=npcs.find(n=>Math.abs((n.x+17)-(player.x+player.w/2))<85);if(npc){const p=currentPhase();const enc=npc.type==="boss"?p.boss:p.customers[npc.index];const key=phaseIndex+":"+npc.index;if(completed.has(key)){hint.textContent="Você já concluiu este atendimento.";return}openDialog(enc,npc.type==="boss"?"CHEFE DA FASE":"ATENDIMENTO")}else hint.textContent="Chegue mais perto de um personagem para conversar."}
function drawBackground(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"#51b9ff");g.addColorStop(1,"#d4f4ff");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 // clouds
 for(let i=0;i<8;i++){let x=((i*190-camera*.25)%(W+180)+W+180)%(W+180)-70;ctx.fillStyle="#f4fbff";ctx.fillRect(x,75+(i%3)*35,75,18);ctx.fillRect(x+18,60+(i%3)*35,40,20)}
 // office facade scrolls behind fence
 ctx.fillStyle="#e7edf4";ctx.fillRect(340-camera*.55,170,1250,270);ctx.fillStyle="#24436b";ctx.fillRect(420-camera*.55,215,1180,170);
 for(let i=0;i<12;i++){ctx.fillStyle="#40a9ed";ctx.fillRect(450+i*92-camera*.55,230,65,135)}
 ctx.fillStyle="#533b37";ctx.fillRect(900-camera*.55,205,420,185);ctx.fillStyle="#fff";ctx.font="bold 34px Nunito";ctx.fillText("DESKTOP",1000-camera*.55,280);
 // trees
 for(let i=0;i<15;i++){let x=(i*230-camera*.8)%(W+200);ctx.fillStyle="#765137";ctx.fillRect(x,350,15,100);ctx.fillStyle=i%2?"#258b4b":"#329e55";ctx.beginPath();ctx.arc(x+8,340,38,0,Math.PI*2);ctx.fill()}
}
function draw(){drawBackground();ctx.save();ctx.translate(-camera,0);
 // ground
 ctx.fillStyle="#344d43";ctx.fillRect(0,445,worldWidth,95);ctx.fillStyle="#7bd34c";ctx.fillRect(0,438,worldWidth,12);ctx.fillStyle="#b9c7d2";ctx.fillRect(0,450,worldWidth,13);
 // platforms
 for(let i=0;i<7;i++){let x=390+i*330;ctx.fillStyle="#8c5b3b";ctx.fillRect(x,365-(i%2)*40,120,16);ctx.fillStyle="#7bd34c";ctx.fillRect(x,360-(i%2)*40,120,8)}
 // coins
 coins.forEach(c=>{if(c.taken)return;ctx.fillStyle="#ffca38";ctx.beginPath();ctx.arc(c.x,c.y,12,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#fff1a5";ctx.lineWidth=3;ctx.stroke();ctx.fillStyle="#86520c";ctx.font="bold 13px Nunito";ctx.fillText("XP",c.x-8,c.y+5)});
 // NPCs
 npcs.forEach(n=>{ctx.fillStyle=n.type==="boss"?"#643a83":"#8b3f56";ctx.fillRect(n.x,390,34,48);ctx.fillStyle="#e9b18b";ctx.fillRect(n.x+7,365,21,24);ctx.fillStyle="#17213b";ctx.fillRect(n.x+6,435,9,17);ctx.fillRect(n.x+22,435,9,17);ctx.fillStyle="#17213b";ctx.font="bold 13px Nunito";ctx.fillText(n.name,n.x-12,355);ctx.fillStyle="#fff";ctx.fillText("E",n.x+11,380)});
 // player
 ctx.fillStyle="#6b3046";ctx.fillRect(player.x,player.y+17,player.w,player.h-17);ctx.fillStyle="#e9b18b";ctx.fillRect(player.x+7,player.y,22,23);ctx.fillStyle="#243451";ctx.fillRect(player.x+5,player.y+player.h-8,12,8);ctx.fillRect(player.x+22,player.y+player.h-8,12,8);ctx.fillStyle="#fff";ctx.fillRect(player.x+22,player.y+8,4,4);
 ctx.restore();
 // progress marker
 ctx.fillStyle="#17264d";ctx.fillRect(18,18,220,10);ctx.fillStyle="#ffc83d";ctx.fillRect(18,18,220*(player.x/worldWidth),10);
}
function loop(){if(!dialogOpen){if(keys.left)player.vx=-3.2;else if(keys.right)player.vx=3.2;else player.vx*=.78;player.x=Math.max(0,Math.min(worldWidth-player.w,player.x+player.vx));player.vy+=.55;player.y+=player.vy;if(player.y+player.h>=438){player.y=438-player.h;player.vy=0;player.onGround=true}else player.onGround=false;coins.forEach(c=>{if(!c.taken&&Math.abs(c.x-player.x-17)<24&&Math.abs(c.y-player.y-25)<40){c.taken=true;addXP(5)}});camera=Math.max(0,Math.min(worldWidth-W,player.x-W*.35));}
 draw();requestAnimationFrame(loop)}
function setKey(k,v){if(k==="left"||k==="right")keys[k]=v;if(k==="jump"&&v&&player.onGround&&!dialogOpen){player.vy=-10;player.onGround=false}if(k==="interact"&&v)interact()}
window.addEventListener("keydown",e=>{if(["ArrowLeft","ArrowRight","ArrowUp"," "].includes(e.key))e.preventDefault();if(e.key==="ArrowLeft"||e.key.toLowerCase()==="a")setKey("left",true);if(e.key==="ArrowRight"||e.key.toLowerCase()==="d")setKey("right",true);if((e.key===" "||e.key==="ArrowUp"||e.key.toLowerCase()==="w")&&!e.repeat)setKey("jump",true);if(e.key.toLowerCase()==="e"&&!e.repeat)setKey("interact",true);if(e.key==="Escape")closeDialog()});
window.addEventListener("keyup",e=>{if(e.key==="ArrowLeft"||e.key.toLowerCase()==="a")setKey("left",false);if(e.key==="ArrowRight"||e.key.toLowerCase()==="d")setKey("right",false)});
document.querySelectorAll("[data-key]").forEach(b=>{const k=b.dataset.key;b.addEventListener("pointerdown",e=>{e.preventDefault();setKey(k,true)});["pointerup","pointerleave","pointercancel"].forEach(ev=>b.addEventListener(ev,()=>{if(k==="left"||k==="right")setKey(k,false)}))});
document.querySelector("#close-dialog").onclick=closeDialog;
document.querySelector("#restart").onclick=()=>{xp=0;phaseIndex=0;customerIndex=0;completed.clear();coins.forEach(c=>c.taken=false);player={x:90,y:390,vx:0,vy:0,w:34,h:54,onGround:false};xpEl.textContent="0";phaseEl.textContent="FASE 1 · INSATISFAÇÃO";rebuildNpcs();closeDialog();openSupervisor()};
openSupervisor();loop();
