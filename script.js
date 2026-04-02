const data = {
  India: { values:[38,45,20,50,35,40], text:"Moderate risk" },
  Pakistan: { values:[65,70,60,65,60,70], text:"High instability" },
  USA: { values:[45,60,25,65,30,40], text:"Stable but tense" },
  China: { values:[30,65,50,50,40,50], text:"Strong but tense" },
  Russia: { values:[40,90,95,50,40,60], text:"High conflict risk" }
};

const labels = [
  "Political Instability",
  "Armed Conflict",
  "Economic Sanctions",
  "Civil Unrest",
  "Terrorism",
  "Legal Risk"
];

function showCountry(c){
  const d = data[c];
  const panel = document.getElementById("panel");

  panel.classList.add("active");

  document.getElementById("country").innerText = c;
  document.getElementById("analysis").innerText = d.text;

  const avg = Math.round(d.values.reduce((a,b)=>a+b)/6);
  document.getElementById("score").innerText = avg;

  updateMeter(avg);

  let html = "";
  d.values.forEach((v,i)=>{
    let color = v<34?"low":v<67?"medium":"high";

    html += `
      <div>
        ${labels[i]}: ${v}
        <div class="bar">
          <div class="fill ${color}" style="width:${v}%"></div>
        </div>
      </div>
    `;
  });

  document.getElementById("data").innerHTML = html;
}

function updateMeter(score){
  const fill = document.getElementById("fill");
  const label = document.getElementById("label");

  fill.style.width = score+"%";

  if(score<34){ fill.style.background="green"; label.innerText="Low"; }
  else if(score<67){ fill.style.background="orange"; label.innerText="Medium"; }
  else { fill.style.background="red"; label.innerText="High"; }
}

function closePanel(){
  document.getElementById("panel").classList.remove("active");
}
