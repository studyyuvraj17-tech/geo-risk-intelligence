let chart;

const countries = {
  India: { lat:20.6, lon:78.9, values:[38,45,20,50,35,40] },
  Pakistan: { lat:30.3, lon:69.3, values:[65,70,60,65,60,70] },
  USA: { lat:37.1, lon:-95.7, values:[45,60,25,65,30,40] },
  China: { lat:35.8, lon:104.1, values:[30,65,50,50,40,50] },
  Russia: { lat:61.5, lon:105.3, values:[40,90,95,50,40,60] }
};

function getRisk(avg){
  if(avg<34) return "low";
  if(avg<67) return "medium";
  return "high";
}

/* 🔥 MAIN INIT (CORRECT WAY) */
window.addEventListener("load", () => {
  const map = document.getElementById("map");

  if(map.complete){
    createDots();
  } else {
    map.onload = createDots;
  }
});

function createDots(){
  const map = document.getElementById("map");
  const container = document.querySelector(".map-container");

  const width = map.clientWidth;
  const height = map.clientHeight;

  for(let name in countries){
    const c = countries[name];
    const avg = Math.round(c.values.reduce((a,b)=>a+b)/6);

    let x = (c.lon+180)*(width/360);
    let y = (90-c.lat)*(height/180);

    /* YOUR POSITION FIXES */
    if(name==="USA"){ x-=25; y+=20; }
    if(name==="Pakistan"){ x-=12; y+=12; }
    if(name==="India"){ x-=12; }
    if(name==="China"){ x-=12; y+=12; }
    if(name==="Russia"){ x-=25; }

    const dot = document.createElement("div");
    dot.className = "dot " + getRisk(avg);

    dot.style.left = x + "px";
    dot.style.top = y + "px";

    dot.onclick = () => showCountry(name);

    container.appendChild(dot);
  }
}

function showCountry(name){
  const panel = document.getElementById("panel");
  const c = countries[name];

  panel.classList.add("active");

  const avg = Math.round(c.values.reduce((a,b)=>a+b)/6);

  document.getElementById("country").innerText = name;
  document.getElementById("risk").innerText =
    avg<34?"Low Risk":avg<67?"Medium Risk":"High Risk";

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type:"radar",
    data:{
      labels:["Political","Conflict","Sanctions","Unrest","Terrorism","Legal"],
      datasets:[{
        data:c.values,
        borderColor:"#00f0ff",
        backgroundColor:"rgba(0,240,255,0.2)"
      }]
    },
    options:{
      plugins:{ legend:{ display:false }},
      scales:{ r:{ ticks:{ display:false }}}
    }
  });
}

function closePanel(){
  document.getElementById("panel").classList.remove("active");
}
