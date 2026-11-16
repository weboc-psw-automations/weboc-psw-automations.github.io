/* ===== Original inline script 1 (preserved in original execution order) ===== */
const FILE_ID = "";  // Drive file ID of the app (the part after /d/ in the file link). Empty = use the one from the script
const API_KEY = "";  // optional Google API key (Drive API only, locked to this site): direct download of any file type, even .exe
const FILE_URL = ""; // paste your GitHub Release file link here (direct download, no Google Drive)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzjH24rzYaTznkDhEI3hvk-uCOFGB4aFz04QBKs3vbO-PuPf2kMaSXmyq9LZ81p2oix/exec"; // from Deploy > Web app
const $ = id => document.getElementById(id), dlg = $("dlg"), f = $("f"), msg = $("msg"), go = $("go");
const say = (t, bad) => { msg.textContent = t; msg.className = bad ? "bad" : "ok"; };

$("dl").onclick = $("dl2").onclick = $("dl3").onclick = $("dl4").onclick = () => { say(""); dlg.showModal(); };
$("x").onclick = $("dx").onclick = () => dlg.close();
$("w").oninput = $("p").oninput = e => { e.target.value = e.target.value.toUpperCase().replace(/\s/g, ""); };

f.onsubmit = async e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  d.weboc_id = d.weboc_id.trim().toUpperCase(); d.psw_id = d.psw_id.trim().toUpperCase(); d.email = d.email.trim().toLowerCase();
  d.company = d.company.trim(); d.contact_person = d.contact_person.trim(); d.contact_number = d.contact_number.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return say("Enter a valid email address.", 1);
  if (!d.company) return say("Enter your company name.", 1);
  if (!d.contact_person) return say("Enter the contact person's name.", 1);
  if (!/^\+?[\d\s-]+$/.test(d.contact_number) || d.contact_number.replace(/\D/g, "").length < 10) return say("Enter a valid contact number (at least 10 digits).", 1);
  if (!d.weboc_id && !d.psw_id) return say("Enter at least one ID: WeBOC or PSW.", 1);
  if (d.weboc_id && !/^(TR|CA)-\d-\d{7}$/.test(d.weboc_id)) return say("WeBOC ID format: TR-0-0123456 or CA-0-1234567.", 1);
  if (d.psw_id && !/^UN-\d{2}-\d{7}$/.test(d.psw_id)) return say("PSW ID format: UN-00-0123396.", 1);
  if (!$("c").checked) return say("Please tick the agreement box.", 1);
  go.disabled = true; say("Saving...");
  try {
    const r = await new Promise((ok, no) => {
      const cb = "reg_cb_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
      const script = document.createElement("script");
      let settled = false;
      const timer = setTimeout(() => finish(new Error("The server did not respond in time. Please try again.")), 20000);
      function finish(err, data) {
        if (settled) return;
        settled = true; clearTimeout(timer);
        try { delete window[cb]; } catch (_) { window[cb] = undefined; }
        script.remove();
        if (err) no(err); else ok(data);
      }
      window[cb] = data => finish(null, data);
      script.onerror = () => finish(new Error("Could not reach the server. Check your connection and try again."));
      script.src = SCRIPT_URL + "?" + new URLSearchParams({ ...d, cb });
      document.body.appendChild(script);
    });
    if (!r || !r.ok) throw new Error((r && r.error) || "The server could not confirm your registration. Please try again.");
    const esc = u => encodeURI(u).replace(/&/g, "&amp;");
    f.innerHTML = '<h2>Thank you</h2><p>Your details are saved. Your download is ready.</p>' +
      '<p class="sub">Your Licence &amp; Profile Details will be shared with your email ID.<br>If not received within 24 hours, you may contact with <a href="mailto:automate4results@gmail.com">support team</a>.</p>' +
      ((FILE_URL || FILE_ID || r.file) ? '<div class="row"><button class="btn" id="get" type="button">&#11015; Download App</button></div><p class="sub" id="dlnote"></p><div id="dlbox"></div>'
              : '<p class="bad">Download link unavailable. Please contact support.</p>');
    if (FILE_URL || FILE_ID || r.file) $("get").onclick = () => {
      const id = FILE_ID || ((r.file || "").match(/[?&]id=([\w-]+)/) || [])[1];
      const url = FILE_URL ||
        (API_KEY ? "https://www.googleapis.com/drive/v3/files/" + id + "?alt=media&key=" + API_KEY   /* Drive API: direct file, no warning page */
                 : "https://drive.usercontent.google.com/download?id=" + id + "&export=download&confirm=t"); /* works without a warning for a .zip */
      location.href = url;                                   /* file downloads here; the page stays open */
      $("dlnote").textContent = "Your download should start shortly. Check your browser's Downloads.";
    };
  } catch (err) {
    say("Error: " + err.message, 1); console.error(err);
    go.disabled = false;
  }
};

/* ===== Original inline script 2 (preserved in original execution order) ===== */
/* TUTORIALS: paste each video's Google Drive file ID in "id".
   Drive link: https://drive.google.com/file/d/FILE_ID/view  -> FILE_ID is the part between /d/ and /view.
   Each video must be shared as "Anyone with the link: Viewer". Leave id empty to show "coming soon". */
(function () {
  const VIDEOS = [
    { id: "", title: "App Installation", desc: "Application Installation and Setup." },
    { id: "1Jtze3e8HpY97G1HdBP5sQzL8Oiuxj9HK", title: "App Features", desc: "A quick tour of everything the application features." },
    { id: "1XzjFAwnhJkg6XRoarw8M9ueu4Y5REacN", title: "Login PSW / WeBOC", desc: "How to sign in to PSW/WeBOC from the App." },
    { id: "18ezIUr9K50K5BSHvo8LZIxvYc6BTiDgT", title: "Fetch GDs List", desc: "Pick Import or Export, choose a date range or month and fetch List of GDs." },
    { id: "1vw4EWfBYY9lPY1-TfGS8CL7DfAy-9XYu", title: "Fetch GDs Details", desc: "Fetch complete GD data — packages, items, duties and bond entries — into your workbook." },
    { id: "10CBSFCh6NX6VtvJR3icN7cZZnEE4O4ip", title: "Download GDs PDFs", desc: "All pages of GD into one PDF." },
    { id: "1R3iAX5R2Qk6dtaXKr5g8h21y5vrRNijm", title: "Fetch Warehouse Balances", desc: "Update Warehouse Balances of all Running GDs after the table fully loads." },
    { id: "1smzfbmAo5G09tnMjwdpdMMmu0Yb1wLMn", title: "Fetch Local Balances", desc: "Update Local Purchase Balances of all Running GDs after the table fully loads." },
    { id: "1CnSWbYcrfY-B9TFkN0H2nZKX12D--_uN", title: "Data Posting into Master", desc: "Post Data into the Master Sheet." },
    { id: "1X6_mHjEZ9i-zS3f7uQzyY6O6wy97TiZg", title: "Clean Working Sheet", desc: "Clear All Sheet of the Working Book." },
  ];
  const screen = document.getElementById("screen"), vt = document.getElementById("vt"),
        vd = document.getElementById("vd"), vlist = document.getElementById("vlist");
  const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  function setMax(on) {
    screen.classList.toggle("max", on);
    document.documentElement.classList.toggle("noscroll", on);
    const x = screen.querySelector(".xbtn");
    if (x) {
      x.textContent = on ? "✕" : "⤢";
      x.title = on ? "Close (Esc)" : "Expand video"; x.setAttribute("aria-label", x.title);
    }
  }
  document.addEventListener("keydown", e => { if (e.key === "Escape" && screen.classList.contains("max")) setMax(false); });

  function show(i, autoplay) {
    const v = VIDEOS[i];
    vt.textContent = (i + 1) + ". " + v.title; vd.textContent = v.desc;
    [...vlist.children].forEach((b, k) => b.setAttribute("aria-current", k === i ? "true" : "false"));
    setMax(false);
    screen.innerHTML = "";
    if (!v.id) {
      screen.innerHTML = '<div class="poster soon"><span>Video coming soon</span></div>';
      return;
    }
    if (autoplay) return load(v);
    const p = document.createElement("button");
    p.className = "poster"; p.type = "button"; p.setAttribute("aria-label", "Play: " + v.title);
    p.style.backgroundImage = 'url("https://drive.google.com/thumbnail?id=' + encodeURIComponent(v.id) + '&sz=w1000"), linear-gradient(135deg,#0a6f6a,#0e171c)';
    p.innerHTML = '<span class="play">' + PLAY + '</span>';
    p.onclick = () => load(v);
    screen.appendChild(p);
  }
  function load(v) {
    const fr = document.createElement("iframe");
    fr.src = "https://drive.google.com/file/d/" + encodeURIComponent(v.id) + "/preview";
    fr.allow = "autoplay; fullscreen"; fr.allowFullscreen = true; fr.title = v.title;
    screen.innerHTML = ""; screen.appendChild(fr);
    /* covers Drive's own pop-out icon and expands the video on this page instead */
    const x = document.createElement("button");
    x.type = "button"; x.className = "xbtn";
    x.onclick = () => setMax(!screen.classList.contains("max"));
    screen.appendChild(x); setMax(false);
  }
  VIDEOS.forEach((v, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "item"; b.setAttribute("role", "listitem");
    b.innerHTML = '<span class="n">' + (i + 1) + '</span><span><b></b><small></small></span>';
    b.querySelector("b").textContent = v.title;
    b.querySelector("small").textContent = v.id ? "Watch video" : "Coming soon";
    b.onclick = () => show(i, true);
    vlist.appendChild(b);
  });
  show(0, false);
})();

/* ===== Original inline script 3 (preserved in original execution order) ===== */
(function () {
  const r = document.documentElement, b = document.getElementById("tt"), mq = matchMedia("(prefers-color-scheme:dark)");
  const cur = () => r.dataset.theme || (mq.matches ? "dark" : "light");
  const paint = () => {
    const d = cur() === "dark";
    b.textContent = d ? "☀️" : "🌙";
    b.setAttribute("aria-label", d ? "Switch to light theme" : "Switch to dark theme");
    b.title = d ? "Light theme" : "Dark theme";
  };
  b.onclick = () => {
    const n = cur() === "dark" ? "light" : "dark";
    r.dataset.theme = n;
    try { localStorage.setItem("theme", n); } catch (e) {}
    paint();
  };
  if (mq.addEventListener) mq.addEventListener("change", paint);
  paint();
})();

/* ===== Original inline script 4 (preserved in original execution order) ===== */
/* ===== PRICING: edit this block only ===== */
var ICON = {
  bolt:'<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  star:'<path d="m12 2 3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>',
  gem:'<path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6M2 9h20"/>'
};
var INCLUDED = [
  {t:"WeBOC & PSW automation", c:"#f97316", i:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>'},
  {t:"GD data straight into Excel", c:"#2563eb", i:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>'},
  {t:"GD PDFs merged in one file", c:"#7c3aed", i:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>'},
  {t:"EFS balance tracking", c:"#059669", i:'<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20M16 15h2"/>'},
  {t:"Encrypted, stays on your PC", c:"#dc2626", i:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'},
  {t:"Auto backups, resumable runs", c:"#0891b2", i:'<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>'}
];
var PLANS = [
  {id:"launch", name:"Limited Time Special Launch Offer", title:"Special Launch Offer", tag:"Best price to get started",
   price:5000,  total:5000,  reg:10000, label:"Billed monthly", off:"50% OFF", badge:"Limited time", icon:"bolt",
   best:"Getting started", save:"Save Rs. 5,000 every month",
   pts:["Half the regular price","Free live demo","Limited-time only"],
   c1:"#ff8a00", c2:"#e11d48"},
  {id:"m1", name:"Subscription Monthly", title:"Monthly", tag:"Flexible, pay month to month",
   price:10000, total:10000, label:"Billed monthly", icon:"cal",
   best:"Short-term needs", save:"No commitment",
   pts:["Pay month to month","Stop whenever you like","Full access, day one"],
   c1:"#3b82f6", c2:"#1d4ed8"},
  {id:"m6", name:"Subscription 6 Months", title:"6 Months", tag:"Save more with 6 months",
   price:8500,  total:51000, reg:10000, label:"Billed Rs. 51,000 for 6 months", off:"15% OFF", icon:"star",
   best:"Frequent users", save:"Save Rs. 9,000 in total",
   pts:["Save Rs. 1,500/month","Pay once, 6 months","Fewer renewals"],
   c1:"#8b5cf6", c2:"#6d28d9"},
  {id:"y1", name:"Subscription Yearly", title:"Yearly", tag:"Lowest monthly cost",
   price:7000,  total:84000, reg:10000, label:"Billed Rs. 84,000 for 12 months", off:"30% OFF", badge:"Best value", icon:"gem",
   best:"Long-term users", save:"Save Rs. 36,000 in total",
   pts:["Save Rs. 3,000/month","Pay once, 12 months","Lowest rate per month"],
   c1:"#10b981", c2:"#047857"}
];
var METHODS = [
  {id:"jazz", name:"JazzCash",      qr:"./images/qr-jazzcash.png",  info:[["Account title","Muhammad Adnan"],["JazzCash number","0321-2121147"]]},
  {id:"easy", name:"EasyPaisa",     qr:"./images/qr-easypaisa.png", info:[["Account title","Muhammad Adnan"],["EasyPaisa number","0321-2121147"]]},
  {id:"bank", name:"Bank Transfer", qr:"./images/qr-bank.png",      info:[["Bank","Bank AL Habib"],["Account title","Muhammad Adnan"],["Account no.","1001-0081-156088-01-4"],["IBAN","PK26 BAHL 1001 0081 1560 8801"]]}
];
/* ========================================= */
(function(){
  var $=function(i){return document.getElementById(i)};
  var money=function(n){return "Rs. "+n.toLocaleString("en-PK")};
  var plan=null, meth=METHODS[0];
  $("payx").onclick=function(){ $("pay").close() };
  $("pay").addEventListener("click",function(e){ if(e.target===this) this.close() });

  var box=$("plans");
  var CHK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4 10-10"/></svg>';
  PLANS.forEach(function(p){
    var d=document.createElement("article");
    d.className="pc"; d.dataset.id=p.id;
    d.style.setProperty("--c1",p.c1); d.style.setProperty("--c2",p.c2);
    d.innerHTML=
      '<div class="ph">'+(p.badge?'<span class="bd">'+p.badge+'</span>':'')+
        '<div class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">'+ICON[p.icon]+'</svg></div>'+
        '<h3></h3><p class="tg"></p></div>'+
      '<div class="pb">'+
        '<div class="bf"><span>Best for</span><b></b></div>'+
        '<div class="prow"><span class="pr"><span class="cur">Rs.</span>'+p.price.toLocaleString("en-PK")+'</span><span class="per">/month</span></div>'+
        '<div class="sv">'+(p.reg?'<s>'+money(p.reg)+'</s> <b>'+p.off+'</b>':'<span class="reg">Regular price</span>')+'</div>'+
        '<div class="bl"></div>'+
        '<div class="sb"><span class="sbi">&#10022;</span><span class="sbt"></span></div>'+
        '<div class="dy">About <b>Rs. '+Math.round(p.price/30).toLocaleString("en-PK")+'</b> per day</div>'+
        '<ul class="ft">'+p.pts.map(function(){return '<li>'+CHK+'<span></span></li>'}).join("")+'</ul>'+
        '<button type="button" class="cta" aria-pressed="false">Select plan</button>'+
      '</div>';
    d.querySelector("h3").textContent=p.title;
    d.querySelector(".tg").textContent=p.tag;
    d.querySelector(".bf b").textContent=p.best;
    d.querySelector(".bl").textContent=p.label;
    d.querySelector(".sbt").textContent=p.save;
    var items=d.querySelectorAll(".ft span");
    for(var i=0;i<items.length;i++) items[i].textContent=p.pts[i];
    d.onclick=function(){ choose(p) };
    box.appendChild(d);
  });

  var inc=$("inc");
  INCLUDED.forEach(function(x){
    var e=document.createElement("div"); e.className="ci"; e.style.setProperty("--c",x.c);
    e.innerHTML='<span class="cic"><svg viewBox="0 0 24 24" aria-hidden="true">'+x.i+'</svg></span><span></span>';
    e.lastChild.textContent=x.t; inc.appendChild(e);
  });

  var mbox=$("methods");
  METHODS.forEach(function(m){
    var b=document.createElement("button");
    b.type="button"; b.className="mth"; b.textContent=m.name; b.setAttribute("aria-pressed","false"); b.dataset.id=m.id;
    b.onclick=function(){ meth=m; showMethod() };
    mbox.appendChild(b);
  });

  function showMethod(){
    [].forEach.call(mbox.children,function(b){ b.setAttribute("aria-pressed", b.dataset.id===meth.id) });
    var img=$("qr"); img.style.display=""; $("nq").style.display="none";
    img.onerror=function(){ img.style.display="none"; $("nq").style.display="block" };
    img.alt=meth.name+" QR code"; img.src=meth.qr;
    var ul=$("acct"); ul.innerHTML="";
    meth.info.concat([["Amount",money(plan.total)]]).forEach(function(r){
      var li=document.createElement("li"), a=document.createElement("span"), v=document.createElement("span");
      a.textContent=r[0]; v.textContent=r[1]; li.appendChild(a); li.appendChild(v); ul.appendChild(li);
    });
  }


  var FORM_HTML =
    '<div class="pfw"><h3>Submit payment details</h3>'+
    '<p class="sub" style="margin:0">Use the same email you used to download the app.</p>'+
    '<form id="pf" novalidate><div class="pfg">'+
    '<div><label for="pe">Email</label><input id="pe" name="email" type="email" autocomplete="email" placeholder="name@example.com" required></div>'+
    '<div><label for="pn">Name / Company</label><input id="pn" name="name" type="text" autocomplete="organization" maxlength="120" required></div>'+
    '<div><label for="pt">Transaction ID</label><input id="pt" name="txn" type="text" autocomplete="off" maxlength="100" required></div>'+
    '<div><label for="ps">Transfer screenshot (image)</label><input id="ps" name="shot" type="file" accept="image/jpeg,image/png,image/webp" required></div>'+
    '<input class="hp" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">'+
    '</div><p id="pmsg" role="status"></p>'+
    '<div class="row"><button class="btn" id="pgo" type="submit">Submit payment details</button></div></form></div>';

  function shrink(file){
    return new Promise(function(ok,no){
      if(!file || !["image/jpeg","image/png","image/webp"].includes(file.type)) return no(new Error("Please attach a JPG, PNG or WebP screenshot."));
      if(file.size>8*1024*1024) return no(new Error("Screenshot is larger than 8 MB. Please choose a smaller image."));
      var img=new Image(), u=URL.createObjectURL(file);
      img.onload=function(){
        try{
          var k=Math.min(1,1400/Math.max(img.width,img.height)), c=document.createElement("canvas");
          c.width=Math.max(1,Math.round(img.width*k)); c.height=Math.max(1,Math.round(img.height*k));
          var ctx=c.getContext("2d"); if(!ctx) throw new Error("Your browser could not process this image.");
          ctx.drawImage(img,0,0,c.width,c.height);
          var encoded=c.toDataURL("image/jpeg",0.72).split(",")[1]; URL.revokeObjectURL(u); ok(encoded);
        }catch(err){URL.revokeObjectURL(u);no(err)}
      };
      img.onerror=function(){URL.revokeObjectURL(u);no(new Error("Could not read the image. Please select another screenshot."))};
      img.src=u;
    });
  }

  function renderForm(){
    $("pfw").innerHTML=FORM_HTML;
    var f=$("pf"), say=function(t,bad){ var m=$("pmsg"); m.textContent=t; m.className=bad?"bad":"ok" };
    f.onsubmit=async function(e){
      e.preventDefault();
      var email=f.email.value.trim().toLowerCase(), name=f.name.value.trim(), txn=f.txn.value.trim(), file=f.shot.files[0];
      if(f.website.value) return;
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say("Enter a valid email address.",1);
      if(!name) return say("Enter your name or company.",1);
      if(txn.length<4) return say("Enter the Transaction ID.",1);
      if(!file) return say("Attach the transfer screenshot.",1);
      $("pgo").disabled=true; say("Uploading... please wait.");
      var ctl=new AbortController(), timer;
      try{
        var img=await shrink(file); timer=setTimeout(function(){ctl.abort()},45000);
        var res=await fetch(SCRIPT_URL,{method:"POST",signal:ctl.signal,body:JSON.stringify({
          action:"payment", email:email, name:name, txn:txn, plan:plan.name, method:meth.name, amount:plan.total, img:img
        })});
        if(!res.ok) throw new Error("The payment service returned an error ("+res.status+"). Please try again.");
        var r; try{r=await res.json()}catch(_){throw new Error("The server response could not be read. Please contact support before submitting again.")}
        if(!r || !r.ok) throw new Error((r&&r.error)||"The server could not confirm your payment submission.");
        $("pfw").innerHTML='<div class="done"><div class="big">✅</div><h3>Payment details received</h3><p style="margin:0 auto">Our support team will verify your payment and activate your account. If not activated within 24 hours, contact <a href="mailto:automate4results@gmail.com">support</a>.</p></div>';
      }catch(err){
        say("Error: "+(err.name==="AbortError"?"The request timed out. Check your connection and contact support before submitting again.":err.message),1);
        $("pgo").disabled=false;
      }finally{if(timer)clearTimeout(timer)}
    };
  }

  function choose(p){
    plan=p;
    [].forEach.call(box.children,function(b){
      var on=b.dataset.id===p.id; b.classList.toggle("on",on);
      var c=b.querySelector(".cta"); c.setAttribute("aria-pressed",on); c.textContent=on?"Selected":"Select plan";
    });
    $("spn").textContent=p.name;
    $("spa").textContent=money(p.total);
    showMethod();
    renderForm();
    if(!$("pay").open) $("pay").showModal();
  }
})();

/* ===== Original inline script 5 (preserved in original execution order) ===== */
/* ===== TESTIMONIALS + TEAM: edit this block only ===== */
var TESTIMONIALS = [];

var TEAM = [
  {name:"Muhammad Adnan", role:"Founder & Lead Developer & Automation Specialist", bio:"Builds and maintains the automation engine, handles WeBOC and PSW portal integrations, and ensures data accuracy across every release.", initials:"MA", photo:"./images/team-adnan.png", c1:"#0a6f6a", c2:"#064643"},
  {name:"Ms Nida Khurram", role:"Quality & Testing", bio:"Tests every release against real portal data before it ships — catching issues before they reach you.", initials:"QT", photo:"./images/team-nida.png", c1:"#3b82f6", c2:"#1d4ed8"},
  {name:"Muhammad Rameez", role:"Customer Support &<br> UI/UX Designer", bio:"Onboards new users, issues licences, and answers support queries quickly also an Expert UI/UX designers using clean & intuitive interfaces.", initials:"CS", photo:"./images/team-rameez.png", c1:"#f97316", c2:"#e11d48"}
];

(function(){
  var $=function(i){return document.getElementById(i)};

  /* ---- Testimonials ---- */
  var track=$("tstTrack"), dots=$("tstDots");
  function addT(t){
    t.stars=Math.max(1,Math.min(5,Math.round(+t.stars)||5));
    var card=document.createElement("article");
    card.className="tst-card";
    card.setAttribute("role","listitem");
    card.innerHTML=
      '<div class="tst-q" aria-hidden="true">“</div>'+
      '<p></p>'+
      '<div class="tst-stars" aria-label="'+t.stars+' out of 5 stars">'+("★".repeat(t.stars))+("☆".repeat(5-t.stars))+'</div>'+
      '<div class="tst-who"><span class="tst-av" aria-hidden="true"></span><span><b></b><small></small></span></div>';
    card.querySelector("p").textContent=t.quote;
    card.querySelector(".tst-av").textContent=(t.name||"?").charAt(0).toUpperCase();
    card.querySelector(".tst-who b").textContent=t.name;
    card.querySelector(".tst-who small").textContent=t.role;
    card.querySelector(".tst-av").style.setProperty("--c1",t.c1);
    card.querySelector(".tst-av").style.setProperty("--c2",t.c2);
    track.appendChild(card);
  }
  TESTIMONIALS.forEach(addT);
  var nav=track.parentElement.querySelector(".tst-nav");
  function renderEmptyState(){
    track.innerHTML='<div class="tst-empty">No approved reviews yet. Be among the first users to share your experience.</div>';
    nav.hidden=true; dots.hidden=true;
  }
  if(!TESTIMONIALS.length) renderEmptyState();
  var PAL=[["#f97316","#e11d48"],["#3b82f6","#1d4ed8"],["#8b5cf6","#6d28d9"],["#10b981","#047857"],["#0891b2","#0e7490"]];
  /* real reviews from the sheet replace the built-in sample cards (the samples stay only if the sheet has none) */
  window.__setReviews=function(items){
    TESTIMONIALS.length=0; track.innerHTML=""; dots.innerHTML="";
    var safeItems=Array.isArray(items)?items.filter(function(it){
      return it && typeof it.comment==="string" && it.comment.trim() && typeof it.name==="string" && it.name.trim();
    }).slice(0,30):[];
    safeItems.forEach(function(it,i){
      var c=PAL[i%PAL.length];
      var t={quote:it.comment.trim(),name:it.name.trim(),role:(typeof it.company==="string"&&it.company.trim())?it.company.trim():"Verified user",stars:it.rating,c1:c[0],c2:c[1]};
      TESTIMONIALS.push(t); addT(t);
    });
    track.scrollLeft=0;
    if(!TESTIMONIALS.length){renderEmptyState();return;}
    nav.hidden=false; dots.hidden=false; paintDots();
  };


  function pageCount(){
    var per = window.matchMedia("(max-width:640px)").matches ? 1 : window.matchMedia("(max-width:1100px)").matches ? 2 : 3;
    return Math.ceil(TESTIMONIALS.length/per);
  }
  function currentPage(){
    var w=track.clientWidth; if(!w) return 0;
    return Math.round(track.scrollLeft/w);
  }
  function paintDots(){
    var n=pageCount(), cur=Math.min(currentPage(),Math.max(0,n-1));
    dots.innerHTML="";
    for(var i=0;i<n;i++){
      var d=document.createElement("button");
      d.type="button"; d.setAttribute("aria-label","Go to testimonial page "+(i+1));
      d.setAttribute("aria-current",i===cur?"true":"false");
      d.style.cssText="width:9px;height:9px;padding:0;border:0;border-radius:50%;background:"+(i===cur?"var(--acc)":"var(--line)")+";cursor:pointer";
      (function(page){d.addEventListener("click",function(){track.scrollTo({left:page*track.clientWidth,behavior:"smooth"})})})(i);
      dots.appendChild(d);
    }
    nav.hidden=n<=1; dots.hidden=n<=1;
  }
  function go(dir){
    var w=track.clientWidth;
    track.scrollBy({left:dir*w, behavior:"smooth"});
  }
  $("tstPrev").onclick=function(){ go(-1) };
  $("tstNext").onclick=function(){ go(1) };
  track.addEventListener("scroll",function(){ requestAnimationFrame(paintDots) });
  window.addEventListener("resize",paintDots);
  paintDots();

  /* ---- Team ---- */
  var grid=$("teamGrid");
  TEAM.forEach(function(m){
    var el=document.createElement("article");
    el.className="tm";
    el.style.setProperty("--c1",m.c1);
    el.style.setProperty("--c2",m.c2);
    var av = m.photo
      ? '<img src="'+m.photo+'" alt="'+m.name+'" loading="lazy" onerror="this.replaceWith(document.createTextNode(\''+m.initials+'\'))">'
      : m.initials;
    el.innerHTML=
      '<div class="tm-av">'+av+'</div>'+
      '<h3></h3><span class="role"></span><p></p>';
    el.querySelector("h3").textContent=m.name;
    el.querySelector(".role").innerHTML=m.role;
    el.querySelector("p").textContent=m.bio;
    grid.appendChild(el);
  });


})();

/* ===== Original inline script 6 (preserved in original execution order) ===== */
/* ===== FEEDBACK: licensed users share a review (published after admin approval) ===== */
(function(){
  var $=function(i){return document.getElementById(i)};
  var W=/^(TR|CA)-\d-\d{7}$/, P=/^UN-\d{2}-\d{7}$/, M=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var dlg=$("fbd"), rating=0, email="", idv="";

  function jp(params){
    return new Promise(function(ok,no){
      var cb="fb"+Date.now()+Math.floor(Math.random()*1e4), s=document.createElement("script"), t;
      function done(){ clearTimeout(t); delete window[cb]; s.remove(); }
      window[cb]=function(r){ done(); ok(r) };
      s.onerror=function(){ done(); no(new Error("Could not reach the server.")) };
      t=setTimeout(function(){ done(); no(new Error("Timed out. Please try again.")) },20000);
      s.src=SCRIPT_URL+"?"+new URLSearchParams(Object.assign({},params,{cb:cb}));
      document.body.appendChild(s);
    });
  }
  function say(id,t,bad){ var m=$(id); m.textContent=t; m.className="fbm "+(bad?"bad":"ok") }
  function show(n){ ["fbs1","fbs2","fbs3"].forEach(function(x,i){ $(x).hidden=(i+1!==n) }) }

  /* stars */
  var st=$("fbst");
  for(var i=1;i<=5;i++){
    (function(n){
      var b=document.createElement("button"); b.type="button"; b.textContent="★";
      b.setAttribute("role","radio"); b.setAttribute("aria-checked","false"); b.setAttribute("aria-label",n+(n===1?" star":" stars"));
      b.onclick=function(){ rating=n; paint() };
      st.appendChild(b);
    })(i);
  }
  function paint(){ [].forEach.call(st.children,function(b,i){ b.classList.toggle("on",i<rating); b.setAttribute("aria-checked",i+1===rating) }) }

  $("fbOpen").onclick=function(){ show(1); say("fbm1",""); dlg.showModal() };
  $("fbx").onclick=$("fbc1").onclick=$("fbdone").onclick=function(){ dlg.close() };
  dlg.addEventListener("click",function(e){ if(e.target===dlg) dlg.close() });
  $("fbback").onclick=function(){ show(1) };
  $("fbt").addEventListener("input",function(){ $("fbcnt").textContent=this.value.length+"/400" });

  /* step 1: send the code */
  $("fb1").onsubmit=async function(e){
    e.preventDefault();
    if($("fbh").value) return;
    var em=$("fbe").value.trim().toLowerCase(), id=$("fbi").value.trim().toUpperCase();
    if(!M.test(em)) return say("fbm1","Enter a valid email address.",1);
    if(!W.test(id)&&!P.test(id)) return say("fbm1","Enter your WeBOC (TR-0-0123456) or PSW (UN-00-0123396) ID.",1);
    $("fbgo1").disabled=true; say("fbm1","Sending code...");
    try{
      var r=await jp({action:"fb_code",email:em,id:id});
      if(!r.ok) throw new Error(r.error||"Could not send the code.");
      email=em; idv=id;
      $("fbsent").textContent="We sent a 6-digit code to "+em+". Enter it below with your review.";
      $("fbc").value=""; say("fbm2",""); show(2);
    }catch(err){ say("fbm1",err.message,1) }
    $("fbgo1").disabled=false;
  };

  /* step 2: submit the review */
  $("fb2").onsubmit=async function(e){
    e.preventDefault();
    var code=$("fbc").value.trim(), name=$("fbn").value.trim(), co=$("fbo").value.trim(), txt=$("fbt").value.trim();
    if(!/^\d{6}$/.test(code)) return say("fbm2","Enter the 6-digit code from your email.",1);
    if(!rating) return say("fbm2","Please choose a star rating.",1);
    if(name.length<2) return say("fbm2","Enter the name to show.",1);
    if(txt.length<15) return say("fbm2","Please write at least 15 characters.",1);
    if(!$("fbk").checked) return say("fbm2","Please allow publishing to continue.",1);
    $("fbgo2").disabled=true; say("fbm2","Submitting...");
    try{
      var r=await jp({action:"fb_submit",email:email,id:idv,code:code,rating:rating,name:name,company:co,comment:txt,consent:"1"});
      if(!r.ok) throw new Error(r.error||"Could not save.");
      show(3);
    }catch(err){ say("fbm2",err.message,1) }
    $("fbgo2").disabled=false;
  };


/* Automatically refresh approved testimonials */
var lastReviews = "";

function loadReviews() {
  jp({ action: "fb_list", refresh: Date.now() })
    .then(function(r) {
      if (!r || !r.ok || !Array.isArray(r.items)) return;

      var signature = JSON.stringify(r.items);

      if (signature !== lastReviews && window.__setReviews) {
        lastReviews = signature;
        window.__setReviews(r.items);
      }
    })
    .catch(function(err) {
      console.warn("Testimonials refresh failed:", err);
    });
}

// Initial load
loadReviews();

// Refresh every 30 seconds
var testimonialRefresh = setInterval(loadReviews, 30000);

// Refresh immediately when visitor returns to the tab
document.addEventListener("visibilitychange", function() {
  if (!document.hidden) loadReviews();
});

})();

/* ===== Original inline script 7 (preserved in original execution order) ===== */
/* Accessible responsive navigation */
(function(){
  var toggle=document.getElementById('menuToggle');
  var nav=document.getElementById('mainNav');
  if(!toggle||!nav) return;
  function closeMenu(){
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open navigation menu');
  }
  toggle.addEventListener('click',function(){
    var opening=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(opening));
    toggle.setAttribute('aria-label',opening?'Close navigation menu':'Open navigation menu');
    nav.classList.toggle('is-open',opening);
  });
  nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',closeMenu);});
  document.addEventListener('keydown',function(event){if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
  window.addEventListener('resize',function(){if(window.innerWidth>760) closeMenu();});
  document.addEventListener('click',function(event){
    if(window.innerWidth<=760&&!nav.contains(event.target)&&!toggle.contains(event.target)) closeMenu();
  });
})();

