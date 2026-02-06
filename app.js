
 function q(k) {
   const u = new URL(location.href);
   return u.searchParams.get(k);
 }
 
 function ymd(d) {
   return { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() };
 }
 
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
  const now = new Date();
  const t = new Date(now.getFullYear(), 1, day);
  if (q("preview") === "all") return true;
  return now >= t;
}
function unlocked(day) {
  return true;
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
