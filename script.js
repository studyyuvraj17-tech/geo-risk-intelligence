document.querySelectorAll(".country").forEach(el => {
  el.addEventListener("click", () => showCountry(el.id));
});

const data = {
  India: {
    analysis: "Moderate political and social pressures.",
    values: [38,45,20,50,35,40]
  },
  Pakistan: {
    analysis: "High instability and economic stress.",
    values: [65,70,60,65,60,70]
  },
  USA: {
    analysis: "Stable but facing polarization.",
    values: [45,60,25,65,30,40]
  },
  China: {
    analysis: "Strong control with global tensions.",
    values: [30,65,50,50,40,50]
  },
  Russia: {
    analysis: "High conflict and sanctions risk.",
    values: [40,90,95,50,40,60]
  }
};

const labels = [
  "Political Instability",
  "Armed Conflict",
  "Economic Sanctions",
  "Civil Unrest",
  "Terrorism & Extremism",
  "Legal Risk"
];

function showCountry(country) {
  const c = data[country];
  const panel = document.getElementById("dashboard");

  panel.classList.add("active");

  document.getElementById("country-name").innerText = country;
  document.getElementById("analysis").innerText = c.analysis;

  const avg = Math.round(c.values.reduce((a,b)=>a+b)/6);

  document.getElementById("score").innerText = avg;

  updateMeter(avg);

  const dimDiv = document.getElementById("dimensions");
  dimDiv.innerHTML = "";

  c.values.forEach((v,i) => {
    let color = v<34?"low":v<67?"medium":"high";

    dimDiv.innerHTML += `
      <div class="dimension">
        <strong>${labels[i]}: ${v}</strong>
        <div class="bar">
          <div class="fill ${color}" style="width:${v}%"></div>
        </div>
      </div>
    `;
  });
}

function updateMeter(score){
  const fill = document.getElementById("meter-fill");
  const text = document.getElementById("meter-text");

  fill.style.width = score+"%";

  if(score<34){ fill.style.background="green"; text.innerText="Low"; }
  else if(score<67){ fill.style.background="orange"; text.innerText="Medium"; }
  else { fill.style.background="red"; text.innerText="High"; }
}

function closePanel(){
  document.getElementById("dashboard").classList.remove("active");
}
