let chart;

const countries = {
  India: { lat:20.6, lon:78.9, Political:38, Conflict:45, Sanctions:20, Unrest:50, Terrorism:35, Legal:40 },
  Pakistan: { lat:30.3, lon:69.3, Political:65, Conflict:70, Sanctions:60, Unrest:65, Terrorism:60, Legal:70 },
  USA: { lat:37.1, lon:-95.7, Political:45, Conflict:60, Sanctions:25, Unrest:65, Terrorism:30, Legal:40 },
  China: { lat:35.8, lon:104.1, Political:30, Conflict:65, Sanctions:50, Unrest:50, Terrorism:40, Legal:50 },
  Russia: { lat:61.5, lon:105.3, Political:40, Conflict:90, Sanctions:95, Unrest:50, Terrorism:40, Legal:60 }
};

const labels = ["Political","Conflict","Sanctions","Unrest","Terrorism","Legal"];

function getRisk(avg){
  if(avg<34) return "low";
  if(avg<67) return "medium";
  return "high";
}

/* ANALYSIS ENGINE */
function generateAnalysis(c){
  let insights = [];

  if(c.Political > 40) insights.push("political instability");
  else insights.push("stable governance");

  if(c.Conflict > 70) insights.push("active conflict");
  else if(c.Conflict > 40) insights.push("geopolitical tensions");

  if(c.Sanctions > 50) insights.push("economic pressure");

  if(c.Unrest > 50) insights.push("social unrest");

  return "This country shows " + insights.join(", ") + ".";
}

/* DOTS */
function createDots(){
  const map = document.getElementById("map");
  const container = document.querySelector(".map-container");

  const width = map.clientWidth;
  const height = map.clientHeight;

  for(let name in countries){
    const c = countries[name];
    const values = [c.Political,c.Conflict,c.Sanctions,c.Unrest,c.Terrorism,c.Legal];
    const avg = Math.round(values.reduce((a,b)=>a+b)/6);

    let x = (c.lon+180)*(width/360);
    let y = (90-c.lat)*(height/180);

    /* YOUR POSITION FIXES */
    if(name==="USA"){ x -= 25; y += 20; }
    if(name==="Pakistan"){ x -= 12; y += 12; }
    if(name==="India"){ x -= 12; }
    if(name==="China"){ x -= 12; y += 12; }
    if(name==="Russia"){ x -= 25; }

    const dot = document.createElement("div");
    dot.className = "dot " + getRisk(avg);

    dot.style.left = x+"px";
    dot.style.top = y+"px";

    dot.onclick = ()=>showCountry(name);

    container.appendChild(dot);
  }
}

/* PANEL */
function showCountry(name){
  const c = countries[name];
  const panel = document.getElementById("panel");

  panel.classList.add("active");

  const values = [c.Political,c.Conflict,c.Sanctions,c.Unrest,c.Terrorism,c.Legal];
  const avg = Math.round(values.reduce((a,b)=>a+b)/6);

  document.getElementById("country").innerText = name;
  document.getElementById("risk").innerText =
    avg<34?"Low Risk":avg<67?"Medium Risk":"High Risk";

  document.getElementById("analysis").innerText = generateAnalysis(c);

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type:"radar",
    data:{
      labels:labels,
      datasets:[{
        data:values,
        borderColor:"#00f0ff",
        backgroundColor:"rgba(0,240,255,0.15)"
      }]
    },
    options:{
      plugins:{ legend:{ display:false }},
      scales:{ r:{ ticks:{ display:false }}}
    }
  });

  let html="";
  values.forEach((v,i)=>{
    html += `<p>${labels[i]}: ${v}</p>`;
  });

  document.getElementById("details").innerHTML = html;
}

function closePanel(){
  document.getElementById("panel").classList.remove("active");
}

window.onload = createDots;
