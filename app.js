const pages=[...document.querySelectorAll(".screen")];const buttons=[...document.querySelectorAll("[data-page]")];const toast=document.getElementById("toast");let toastTimer;
function showToast(t){clearTimeout(toastTimer);toast.textContent=t;toast.classList.add("show");toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)}
function go(id){const target=document.getElementById(id)||document.getElementById("home");pages.forEach(p=>p.classList.toggle("active",p===target));document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===target.id));history.replaceState(null,"","#"+target.id);scrollTo({top:0,behavior:"smooth"})}
buttons.forEach(b=>b.addEventListener("click",()=>go(b.dataset.page)));
document.getElementById("startWorkout")?.addEventListener("click",e=>{e.currentTarget.innerHTML="<span>✓</span> Workout Active <b>›</b>";showToast("Workout started. Your session is live.")});
document.getElementById("logMeal")?.addEventListener("click",()=>showToast("Meal logging is ready for the next build."));
document.getElementById("coachSend")?.addEventListener("click",()=>showToast("Coach input will connect to the remote AI layer."));
document.querySelectorAll(".segmented button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".segmented button").forEach(x=>x.classList.remove("active"));b.classList.add("active");showToast(b.textContent+" view selected.")}));
window.addEventListener("hashchange",()=>go(location.hash.slice(1)||"home"));go(location.hash.slice(1)||"home");