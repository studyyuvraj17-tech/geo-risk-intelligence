let chart;

const countries = {
  India: { lat:20.6, lon:78.9, values:[38,45,20,50,35,40] },
  Pakistan: { lat:30.3, lon:69.3, values:[65,70,60,65,60,70] },
  USA: { lat:37.1, lon:-95.7, values:[45,60,25,65,30,40] },
  China: { lat:35.8, lon:104.1, values:[30,65,50,50,40,50] },
  Russia: { lat:61.5, lon:105.3, values:[40,90,95,50,40,60] }
};

const labels = [
  "Political Instability",
  "Armed Conflict",
  "Sanctions",
  "Civil Unrest",
  "Terrorism",
  "Legal Risk"
];

function getRisk(avg){
  if(avg<34) return "low";
  if(avg<67) return "medium";
  return "high";
}

function createDots(){
  const map = document.getElementById("map");
  const container = document.querySelector(".map-container");

  const width = map.clientWidth;
  const height = map.clientHeight;

  for(let name in countries){
    const c = countries[name];
    const avg = Math.round(c.values.reduce((a,b)=>a+b)/6);

    const x = (c.lon+180)*(width/360);
    const y = (90-c.lat)*(height/180);

    const dot = document.createElement("div");
    dot.className = "dot " + getRisk(avg);

    dot.style.left = x+"px";
    dot.style.top = y+"px";

    dot.onclick = ()=>showCountry(name);

    container.appendChild(dot);
  }
}

function showCountry(name){
  const c = countries[name];
  const panel = document.getElementById("panel");

  panel.classList.add("active");

  const avg = Math.round(c.values.reduce((a,b)=>a+b)/6);

  document.getElementById("country").innerText = name;
  document.getElementById("risk").innerText =
    avg<34?"Low Risk":avg<67?"Medium Risk":"High Risk";

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type:"radar",
    data:{
      labels:labels,
      datasets:[{
        data:c.values,
        borderColor:"#00f0ff",
        backgroundColor:"rgba(0,240,255,0.2)"
      }]
    },
    options:{
      scales:{ r:{ min:0, max:100 } }
    }
  });

  let html="";
  c.values.forEach((v,i)=>{
    html += `<p>${labels[i]}: ${v}</p>`;
  });

  document.getElementById("details").innerHTML = html;
}

function closePanel(){
  document.getElementById("panel").classList.remove("active");
}

window.onload = createDots;
