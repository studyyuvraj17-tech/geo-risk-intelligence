let chart;

const baseData = {
  India: { lat:20.6, lon:78.9, Political:38, Conflict:45, Sanctions:20, Unrest:50, Terrorism:35, Legal:40 },
  Pakistan: { lat:30.3, lon:69.3, Political:65, Conflict:70, Sanctions:60, Unrest:65, Terrorism:60, Legal:70 },
  USA: { lat:37.1, lon:-95.7, Political:45, Conflict:60, Sanctions:25, Unrest:65, Terrorism:30, Legal:40 },
  China: { lat:35.8, lon:104.1, Political:30, Conflict:65, Sanctions:50, Unrest:50, Terrorism:40, Legal:50 },
  Russia: { lat:61.5, lon:105.3, Political:40, Conflict:90, Sanctions:95, Unrest:50, Terrorism:40, Legal:60 }
};

function clone(obj){
  return JSON.parse(JSON.stringify(obj));
}

/* 🧠 KEYWORD-BASED SCORING */
function adjustScores(data, newsText){

  const text = newsText.toLowerCase();

  if(text.includes("war") || text.includes("conflict")){
    data.Conflict += 10;
  }

  if(text.includes("sanction")){
    data.Sanctions += 10;
  }

  if(text.includes("protest") || text.includes("violence")){
    data.Unrest += 10;
  }

  if(text.includes("terror")){
    data.Terrorism += 10;
  }

  return data;
}

/* 📰 FETCH NEWS */
async function fetchNews(country){

  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
    "https://news.google.com/rss/search?q=" + country
  )}`;

  try{
    const res = await fetch(url);
    const data = await res.json();

    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents,"text/xml");

    const items = xml.querySelectorAll("item");

    let newsHTML = "";
    let combinedText = "";

    items.forEach((item,i)=>{
      if(i<5){
        const title = item.querySelector("title").textContent;
        newsHTML += `<li>${title}</li>`;
        combinedText += " " + title;
      }
    });

    document.getElementById("news").innerHTML = newsHTML;

    return combinedText;

  } catch{
    document.getElementById("news").innerHTML = "<li>No data</li>";
    return "";
  }
}

/* 🧠 ANALYSIS */
function generateAnalysis(c){
  let insights = [];

  if(c.Conflict > 70) insights.push("active conflict");
  if(c.Sanctions > 60) insights.push("economic pressure");
  if(c.Unrest > 50) insights.push("internal instability");

  return "This country shows " + insights.join(", ") + ".";
}

/* 🎯 DOTS */
function createDots(){
  const map = document.getElementById("map");
  const container = document.querySelector(".map-container");

  const width = map.clientWidth;
  const height = map.clientHeight;

  for(let name in baseData){
    const c = baseData[name];

    let x = (c.lon+180)*(width/360);
    let y = (90-c.lat)*(height/180);

    if(name==="USA"){ x-=25; y+=20; }
    if(name==="Pakistan"){ x-=12; y+=12; }
    if(name==="India"){ x-=12; }
    if(name==="China"){ x-=12; y+=12; }
    if(name==="Russia"){ x-=25; }

    const dot = document.createElement("div");
    dot.className = "dot";

    dot.style.left = x+"px";
    dot.style.top = y+"px";

    dot.onclick = ()=>showCountry(name);

    container.appendChild(dot);
  }
}

/* 🚀 MAIN FUNCTION */
async function showCountry(name){

  let data = clone(baseData[name]);

  const newsText = await fetchNews(name);

  data = adjustScores(data, newsText);

  const values = [
    data.Political,data.Conflict,data.Sanctions,
    data.Unrest,data.Terrorism,data.Legal
  ];

  const avg = Math.round(values.reduce((a,b)=>a+b)/6);

  document.getElementById("country").innerText = name;
  document.getElementById("risk").innerText =
    avg<34?"Low Risk":avg<67?"Medium Risk":"High Risk";

  document.getElementById("analysis").innerText = generateAnalysis(data);

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type:"radar",
    data:{
      labels:["Political","Conflict","Sanctions","Unrest","Terrorism","Legal"],
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
}

function closePanel(){
  document.getElementById("panel").classList.remove("active");
}

window.onload = createDots;
