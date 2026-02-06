
 function q(k) {
   const u = new URL(location.href);
   return u.searchParams.get(k);
 }
 
 function ymd(d) {
   return { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() };
 }
 

const ALWAYS_UNLOCK = true;

const DAYS = [
   { d: 7, key: "rose", title: "Rose Day", desc: "Express love and friendship with roses.", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1280&auto=format&fit=crop" },
   { d: 8, key: "propose", title: "Propose Day", desc: "Confess love and take the next step.", img: "https://images.unsplash.com/photo-1520975922209-c0704a0e2591?q=80&w=1280&auto=format&fit=crop" },
   { d: 9, key: "chocolate", title: "Chocolate Day", desc: "Share affection by gifting chocolates.", img: "https://images.unsplash.com/photo-1497058072375-24e22d77f0f2?q=80&w=1280&auto=format&fit=crop" },
   { d: 10, key: "teddy", title: "Teddy Day", desc: "Gift a soft toy to express love.", img: "https://images.unsplash.com/photo-1602536052684-66105b0d09b8?q=80&w=1280&auto=format&fit=crop" },
   { d: 11, key: "promise", title: "Promise Day", desc: "Make commitments to strengthen the relationship.", img: "https://images.unsplash.com/photo-1514820720301-4f5fa417eeb6?q=80&w=1280&auto=format&fit=crop" },
   { d: 12, key: "hug", title: "Hug Day", desc: "Offer comfort and affection with a hug.", img: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=1280&auto=format&fit=crop" },
   { d: 13, key: "kiss", title: "Kiss Day", desc: "Romantic gestures and intimacy.", img: "https://images.unsplash.com/photo-1513026705753-bc3ba2ebc1f1?q=80&w=1280&auto=format&fit=crop" },
   { d: 14, key: "valentine", title: "Valentine's Day", desc: "Celebrate love in full bloom.", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1280&auto=format&fit=crop" }
 ];
 

function unlocked(day) {
  if (ALWAYS_UNLOCK) return true;
const now = new Date();
  const t = new Date(now.getFullYear(), 1, day);
  if (q("preview") === "all") return true;
  return now >= t;
}
 
 function storeOpen(day) {
   const k = "hiya-open";
   const s = JSON.parse(localStorage.getItem(k) || "[]");
   if (!s.includes(day)) {
     s.push(day);
     localStorage.setItem(k, JSON.stringify(s));
   }
 }
 
 function wasOpened(day) {
   const s = JSON.parse(localStorage.getItem("hiya-open") || "[]");
   return s.includes(day);
 }
 
 function fmt(day) {
   const now = new Date();
   const dt = new Date(now.getFullYear(), 1, day);
   const w = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][dt.getDay()];
   return "Feb " + day + " (" + w + ")";
 }
 
 function renderTimeline() {
   const root = document.getElementById("timeline-root");
   if (!root) return;
   applyUnlockParam();
   root.innerHTML = "";
   DAYS.forEach((item) => {

   const open = ALWAYS_UNLOCK || unlocked(item.d) || wasOpened(item.d);
     const el = document.createElement("a");
     el.className = "timeline-item " + (open ? "open" : "locked");
     el.href = open ? ("day.html?d=" + item.d) : "javascript:void(0)";
     el.innerHTML = `
       <div class="timeline-date">${fmt(item.d)}</div>
       <div class="timeline-title">${item.title}</div>
       <div class="timeline-desc">${item.desc}</div>
       <div class="timeline-action"><span class="badge rounded-pill ${open ? "text-bg-danger" : "text-bg-secondary"}">${open ? "Open" : "Locked"}</span></div>
     `;
     root.appendChild(el);
   });
   renderPreviewControls();
   startAmbientHearts();
 }
 
 function renderWelcome() {
   const nameEl = document.getElementById("hiya-name");
   if (nameEl) nameEl.textContent = "Hiya";
   const nextBtn = document.getElementById("go-timeline");
   if (nextBtn) nextBtn.addEventListener("click", () => location.href = "timeline.html");
 }
 
 function renderPreviewControls() {
   const ctr = document.getElementById("preview-controls");
   if (!ctr) return;
 -110,51 +113,51 @@ function relockFuture() {
 function startAmbientHearts() {
   const root = document.getElementById("hearts-root");
   if (!root) return;
   for (let i = 0; i < 12; i++) {
     setTimeout(() => spawnHeartAt(root, Math.random()*window.innerWidth, window.innerHeight - Math.random()*80, 10 + Math.random()*10), i*250);
   }
 }
 
 function applyUnlockParam() {
   const mode = q("unlock");
   if (mode === "all") {
     const all = DAYS.map(d => d.d);
     localStorage.setItem("hiya-open", JSON.stringify(all));
   }
 }
 
 function renderDay() {
   const root = document.getElementById("day-root");
   if (!root) return;
   const d = parseInt(q("d") || "0", 10);
   const item = DAYS.find(x => x.d === d);
   if (!item) {
     root.innerHTML = `<div class="locked-card"><div class="locked-title">Not Found</div><a class="button" href="timeline.html">Back</a></div>`;
     return;
   }

 const open = ALWAYS_UNLOCK || unlocked(item.d) || wasOpened(item.d);
   if (!open) {
     root.innerHTML = `
       <div class="locked-card">
         <div class="locked-title">${fmt(item.d)} • ${item.title}</div>
         <div class="locked-desc">This page unlocks on Feb ${item.d}. Come back then.</div>
         <a class="button" href="timeline.html">Back to Dates</a>
       </div>
     `;
     return;
   }
   storeOpen(item.d);
   root.innerHTML = `
     <section class="day-hero" style="background-image:url('${item.img}')">
       <div class="day-hero-overlay">
         <h2 class="day-hero-title">${item.title}</h2>
         <p class="day-hero-sub">${fmt(item.d)}</p>
         <div style="display:flex; gap:12px">
           <button id="surprise" class="button">Surprise</button>
           <button id="music-toggle" class="button">Music</button>
         </div>
       </div>
     </section>
     <section class="day-content">
       <div class="day-card">
         <h3 class="day-card-title">A note for you</h3>
