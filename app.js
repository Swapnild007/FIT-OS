const pages=[...document.querySelectorAll(".screen")];
const buttons=[...document.querySelectorAll("[data-page]")];
const toast=document.getElementById("toast");
let toastTimer;
const defaultState={water:2.1,steps:2864,calories:1840,protein:126,workout:false,checkin:false,mood:"",soreness:"",exerciseDone:[]};
let state;
try{state={...defaultState,...JSON.parse(localStorage.getItem("fitos.today")||"{}")};state.exerciseDone=Array.isArray(state.exerciseDone)?state.exerciseDone:[]}catch{state={...defaultState}}

const save=()=>localStorage.setItem("fitos.today",JSON.stringify(state));
function showToast(message){if(!toast)return;clearTimeout(toastTimer);toast.textContent=message;toast.classList.add("show");toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)}
function go(id){const target=document.getElementById(id)||document.getElementById("home");pages.forEach(page=>page.classList.toggle("active",page===target));document.querySelectorAll(".bottom-nav button").forEach(button=>button.classList.toggle("active",button.dataset.page===target.id));history.replaceState(null,"","#"+target.id);window.scrollTo({top:0,behavior:"smooth"})}
buttons.forEach(button=>button.addEventListener("click",()=>go(button.dataset.page)));

function updateTopDate(){const now=new Date();const el=document.querySelector(".topbar .date");if(el)el.textContent=now.toLocaleDateString("en-IN",{weekday:"short",day:"2-digit",month:"short",year:"numeric"}).toUpperCase()}
function updateToday(){
  const water=Math.min(3,Math.max(0,state.water)),steps=Math.max(0,state.steps),cal=Math.max(0,state.calories),protein=Math.max(0,state.protein);
  const completed=(state.workout?1:0)+(steps>=8000?1:0)+(protein>=150?1:0)+(state.checkin?1:0),pct=Math.round(completed/4*100);
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value};
  set("waterValue",water.toFixed(1));set("waterSmall",water.toFixed(1)+"L");set("stepsValue",steps.toLocaleString());set("planSteps",steps.toLocaleString());set("proteinToday",protein);set("proteinSmall",protein+"g");set("caloriesToday",cal.toLocaleString());set("dayPercent",pct+"%");set("planDone",completed+" of 4 complete");set("walkState",Math.min(100,Math.round(steps/8000*100))+"%");set("fuelState",Math.min(100,Math.round(protein/150*100))+"%");set("workoutState",state.workout?"DONE ✓":"START ›");set("recoverState",state.checkin?"DONE ✓":"OPEN");set("checkinStatus",state.checkin?(state.mood+" · logged"):"Quick check-in");
  const bar=document.getElementById("dayBar");if(bar)bar.style.width=pct+"%";const calorieBar=document.getElementById("calorieBar");if(calorieBar)calorieBar.style.width=Math.min(100,Math.round(cal/2300*100))+"%";
  set("nextAction",completed===4?"Day complete · great work":!state.workout?"Next: Start workout":steps<8000?"Next: keep moving":protein<150?"Next: close protein target":"Next: evening check-in");
}
function setTodayCopy(){const now=new Date(),hour=now.getHours();const greeting=document.getElementById("greetingTime"),date=document.getElementById("todayDate"),message=document.getElementById("dailyMessage");if(greeting)greeting.textContent=hour<12?"GOOD MORNING":hour<18?"GOOD AFTERNOON":"GOOD EVENING";if(date)date.textContent=now.toLocaleDateString("en-IN",{weekday:"short",day:"2-digit",month:"short"}).toUpperCase();if(message)message.textContent=hour<12?"Your body is ready. Let's make today count.":hour<18?"Keep the momentum. One good decision at a time.":"Finish the day with recovery, not perfection."}

function openTodayModal(content){const modal=document.getElementById("todayModal"),body=document.getElementById("modalContent");if(!modal||!body)return;body.innerHTML=content;modal.classList.add("open");modal.setAttribute("aria-hidden","false")}
function closeTodayModal(){const modal=document.getElementById("todayModal");if(modal){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}}
document.getElementById("modalClose")?.addEventListener("click",closeTodayModal);
document.getElementById("todayModal")?.addEventListener("click",event=>{if(event.target.id==="todayModal")closeTodayModal()});

function checkin(){
  openTodayModal('<h2 class="modal-title">How are you feeling today?</h2><p class="modal-sub">Add your energy and soreness so FIT-OS can use your human signal alongside training data.</p><div class="check-options" id="moods"><button data-v="Great"><small>ENERGY</small><b>Great</b></button><button data-v="Good" class="selected"><small>ENERGY</small><b>Good</b></button><button data-v="Okay"><small>ENERGY</small><b>Okay</b></button><button data-v="Low"><small>ENERGY</small><b>Low</b></button></div><div class="check-options" id="soreness"><button data-v="None" class="selected"><small>SORENESS</small><b>None</b></button><button data-v="Mild"><small>SORENESS</small><b>Mild</b></button><button data-v="Moderate"><small>SORENESS</small><b>Moderate</b></button><button data-v="High"><small>SORENESS</small><b>High</b></button></div><button class="modal-submit" id="saveCheckin">Save check-in</button>');
  let mood="Good",soreness="None";
  document.querySelectorAll("#moods button").forEach(button=>button.addEventListener("click",()=>{mood=button.dataset.v;document.querySelectorAll("#moods button").forEach(x=>x.classList.remove("selected"));button.classList.add("selected")}));
  document.querySelectorAll("#soreness button").forEach(button=>button.addEventListener("click",()=>{soreness=button.dataset.v;document.querySelectorAll("#soreness button").forEach(x=>x.classList.remove("selected"));button.classList.add("selected")}));
  document.getElementById("saveCheckin")?.addEventListener("click",()=>{state.checkin=true;state.mood=mood;state.soreness=soreness;save();updateToday();closeTodayModal();showToast("Check-in saved. Today's context updated.")});
}
function addWater(){state.water=Math.min(3,state.water+.25);save();updateToday();showToast(state.water>=3?"Hydration target reached.":"Added 250 ml of water.")}
function addSteps(){state.steps=Math.min(12000,state.steps+500);save();updateToday();showToast(state.steps>=8000?"Step target reached.":"Added 500 steps.")}
function logMeal(){state.calories=Math.min(3000,state.calories+250);state.protein=Math.min(180,state.protein+12);save();updateToday();showToast("Meal logged: +250 kcal · +12g protein.")}
document.querySelectorAll("[data-action]").forEach(button=>button.addEventListener("click",()=>{const action=button.dataset.action;if(action==="checkin")checkin();else if(action==="hydration")addWater();else if(action==="steps")addSteps();else if(action==="meal")logMeal()}));
document.getElementById("readinessInfo")?.addEventListener("click",()=>openTodayModal('<h2 class="modal-title">Your readiness, explained.</h2><p class="modal-sub">This product signal combines recovery context and recent training load. These are demo values until real data sources are connected.</p><div class="modal-meter"><div><span>Readiness</span><b>78 / 100</b></div><div class="modal-meter-bar"><i style="width:78%"></i></div></div><div class="modal-actions"><button>Sleep · 7h 32m</button><button>Resting HR · 62</button><button>Load · 42%</button><button>Stress · Low</button></div>'));
document.getElementById("logMeal")?.addEventListener("click",logMeal);

const exercises=[
{name:"Warm Up",type:"PREP",sets:1,reps:"8 min",rest:60,mode:"duration",desc:"Raise body temperature and prepare shoulders, elbows and upper back. Keep the pace easy."},
{name:"Bench Press",type:"PRIMARY",sets:4,reps:"8–10",rest:90,mode:"strength",desc:"Controlled descent, stable setup and consistent range. Use a load you can move with clean technique."},
{name:"Seated Row",type:"PRIMARY",sets:4,reps:"8–12",rest:90,mode:"strength",desc:"Pull smoothly, pause briefly, then return under control. Avoid turning the movement into a swing."},
{name:"Shoulder Press",type:"SECONDARY",sets:4,reps:"8–10",rest:90,mode:"strength",desc:"Keep the torso stable and move through a comfortable range. Reduce load if control drops."},
{name:"Lat Pulldown",type:"SECONDARY",sets:3,reps:"10–12",rest:60,mode:"strength",desc:"Drive elbows down, keep the ribs controlled and return the bar slowly."},
{name:"Cool Down",type:"FINISH",sets:1,reps:"8 min",rest:0,mode:"duration",desc:"Easy breathing and gentle mobility. Finish feeling better than you started."}
];
let restTimer=null,restLeft=0;
function syncTrainingUI(){
  document.querySelectorAll(".train-exercise").forEach((button,index)=>button.classList.toggle("completed",state.exerciseDone.includes(index)));
  const done=state.exerciseDone.length;
  const progress=document.getElementById("sessionProgress"),label=document.getElementById("sessionLabel");
  if(progress)progress.textContent=done+" / 6";
  if(label)label.textContent=done===6?"Session complete":done===0?"Ready when you are":"Exercise "+(done+1)+" of 6 ready";
  const start=document.getElementById("startWorkout");
  if(start&&state.workout)start.innerHTML="<span>✓</span> Session Complete <b>›</b>";
}
function renderRest(){const el=document.getElementById("restTime");if(el)el.textContent=String(Math.floor(restLeft/60)).padStart(2,"0")+":"+String(restLeft%60).padStart(2,"0")}
function stopRest(){if(restTimer){clearInterval(restTimer);restTimer=null}}
function startRest(seconds){stopRest();restLeft=seconds;renderRest();restTimer=setInterval(()=>{restLeft=Math.max(0,restLeft-1);renderRest();if(restLeft===0){stopRest();showToast("Rest complete. Ready for the next set.")}},1000)}
function closeExercise(){document.getElementById("exerciseModal")?.classList.remove("open");stopRest()}
function openExercise(index){
  const exercise=exercises[index],modal=document.getElementById("exerciseModal"),body=document.getElementById("exerciseModalContent");if(!exercise||!modal||!body)return;
  let setContent="";
  if(exercise.mode==="strength"){
    for(let set=1;set<=exercise.sets;set++)setContent+=`<span class="num">${set}</span><input aria-label="Set ${set} load" data-field="load" placeholder="Load"><input aria-label="Set ${set} reps" data-field="reps" value="${exercise.reps.split("–")[0]}" placeholder="Reps"><input aria-label="Set ${set} effort" data-field="rpe" placeholder="RPE">`;
    setContent=`<div class="set-grid"><span class="head">SET</span><span class="head">LOAD</span><span class="head">REPS</span><span class="head">RPE</span>${setContent}</div>`;
  }else{
    setContent=`<div class="duration-card"><small>DURATION</small><strong>${exercise.reps}</strong><p>Keep the intensity comfortable and controlled.</p></div>`;
  }
  body.innerHTML=`<div class="eyebrow">${exercise.type} · EXERCISE ${String(index+1).padStart(2,"0")}</div><h2>${exercise.name}</h2><p class="description">${exercise.desc}</p>${setContent}<button class="exercise-main-action" id="completeExercise">${index===exercises.length-1?"Complete session":"Complete & continue"} ›</button><div class="rest-panel"><small>REST TIMER</small><div class="rest-time" id="restTime">${String(Math.floor(exercise.rest/60)).padStart(2,"0")}:${String(exercise.rest%60).padStart(2,"0")}</div><div class="rest-controls"><button id="restStart">Start</button><button id="restPlus">+30s</button><button id="restStop">Stop</button></div></div>`;
  modal.classList.add("open");
  document.getElementById("completeExercise")?.addEventListener("click",()=>{if(!state.exerciseDone.includes(index))state.exerciseDone.push(index);if(index===exercises.length-1){state.workout=true;showToast("Session complete. Great work.")}else showToast("Logged "+exercise.name+". Next movement is ready.");save();syncTrainingUI();updateToday();closeExercise()});
  document.getElementById("restStart")?.addEventListener("click",()=>startRest(exercise.rest));
  document.getElementById("restPlus")?.addEventListener("click",()=>{restLeft+=30;renderRest()});
  document.getElementById("restStop")?.addEventListener("click",stopRest);
}
document.getElementById("exerciseClose")?.addEventListener("click",closeExercise);
document.getElementById("exerciseModal")?.addEventListener("click",event=>{if(event.target.id==="exerciseModal")closeExercise()});
document.querySelectorAll(".train-exercise").forEach(button=>button.addEventListener("click",()=>openExercise(Number(button.dataset.exercise))));
document.getElementById("warmupAction")?.addEventListener("click",()=>openExercise(0));
document.getElementById("startWorkout")?.addEventListener("click",()=>{if(state.workout){showToast("This session is already complete.")}else{showToast("Session started. Begin with Warm Up.");openExercise(exercises.findIndex((_,index)=>!state.exerciseDone.includes(index)))}});

document.getElementById("coachSend")?.addEventListener("click",()=>showToast("Remote AI coach connection will be added in the AI layer."));
document.querySelectorAll(".segmented button").forEach(button=>button.addEventListener("click",()=>{document.querySelectorAll(".segmented button").forEach(x=>x.classList.remove("active"));button.classList.add("active");showToast(button.textContent+" view selected.")}));

updateTopDate();setTodayCopy();updateToday();syncTrainingUI();
window.addEventListener("hashchange",()=>go(location.hash.slice(1)||"home"));
go(location.hash.slice(1)||"home");