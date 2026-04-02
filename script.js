const data = {
  India: {
    score: 42,
    analysis: "India shows moderate geopolitical risk with stable governance but social and economic pressures.",
    dimensions: {
      "Government Stability": 38,
      "Political Legitimacy": 40,
      "Conflict & Security": 45,
      "Economic Stability": 50,
      "Social Cohesion": 55,
      "External Relations": 30,
      "Governance": 45,
      "Strategic Importance": 60
    }
  },

  Pakistan: {
    score: 65,
    analysis: "Pakistan faces high instability due to political tensions and economic stress.",
    dimensions: {
      "Government Stability": 65,
      "Political Legitimacy": 60,
      "Conflict & Security": 70,
      "Economic Stability": 75,
      "Social Cohesion": 65,
      "External Relations": 60,
      "Governance": 70,
      "Strategic Importance": 55
    }
  },

  USA: {
    score: 48,
    analysis: "USA remains stable but faces polarization and global tensions.",
    dimensions: {
      "Government Stability": 45,
      "Political Legitimacy": 50,
      "Conflict & Security": 60,
      "Economic Stability": 55,
      "Social Cohesion": 65,
      "External Relations": 30,
      "Governance": 40,
      "Strategic Importance": 90
    }
  },

  China: {
    score: 55,
    analysis: "China shows strong control but rising global tensions.",
    dimensions: {
      "Government Stability": 30,
      "Political Legitimacy": 55,
      "Conflict & Security": 65,
      "Economic Stability": 60,
      "Social Cohesion": 50,
      "External Relations": 70,
      "Governance": 50,
      "Strategic Importance": 85
    }
  },

  Russia: {
    score: 70,
    analysis: "Russia faces high geopolitical risk due to conflicts and sanctions.",
    dimensions: {
      "Government Stability": 40,
      "Political Legitimacy": 60,
      "Conflict & Security": 90,
      "Economic Stability": 65,
      "Social Cohesion": 50,
      "External Relations": 85,
      "Governance": 60,
      "Strategic Importance": 80
    }
  }
};

function showCountry(country) {
  const c = data[country];

  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("country-name").innerText = country;
  document.getElementById("analysis").innerText = c.analysis;
  document.getElementById("score").innerText = c.score;

  let level = "";
  if (c.score < 34) level = "Low Risk";
  else if (c.score < 67) level = "Medium Risk";
  else level = "High Risk";

  document.getElementById("risk-level").innerText = level;

  const dimDiv = document.getElementById("dimensions");
  dimDiv.innerHTML = "";

  for (let key in c.dimensions) {
    let value = c.dimensions[key];

    let colorClass = "low";
    if (value >= 34 && value < 67) colorClass = "medium";
    if (value >= 67) colorClass = "high";

    let div = document.createElement("div");
    div.className = "dimension";

    div.innerHTML = `
      <strong>${key}: ${value}</strong>
      <div class="bar">
        <div class="fill ${colorClass}" style="width:${value}%"></div>
      </div>
    `;

    dimDiv.appendChild(div);
  }
}
