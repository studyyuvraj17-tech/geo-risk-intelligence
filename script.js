const data = {
  India: {
    score: 42,
    analysis: "India shows moderate geopolitical risk.",
    dimensions: {
      Stability: 38,
      Conflict: 45,
      Economic: 50,
      Social: 55,
      External: 30
    }
  },

  Pakistan: {
    score: 65,
    analysis: "Pakistan faces instability.",
    dimensions: {
      Stability: 65,
      Conflict: 70,
      Economic: 75,
      Social: 65,
      External: 60
    }
  },

  USA: {
    score: 48,
    analysis: "USA faces global tensions.",
    dimensions: {
      Stability: 45,
      Conflict: 60,
      Economic: 55,
      Social: 65,
      External: 30
    }
  },

  China: {
    score: 55,
    analysis: "China shows strong governance.",
    dimensions: {
      Stability: 30,
      Conflict: 65,
      Economic: 60,
      Social: 50,
      External: 70
    }
  },

  Russia: {
    score: 70,
    analysis: "Russia faces high risk.",
    dimensions: {
      Stability: 40,
      Conflict: 90,
      Economic: 65,
      Social: 50,
      External: 85
    }
  }
};

function showCountry(country) {
  const c = data[country];

  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("country-name").innerText = country;
  document.getElementById("analysis").innerText = c.analysis;
  document.getElementById("score").innerText = c.score;

  document.getElementById("risk-level").innerText =
    c.score < 34 ? "Low Risk" :
    c.score < 67 ? "Medium Risk" :
    "High Risk";

  drawRadarChart(c.dimensions);

  const dimDiv = document.getElementById("dimensions");
  dimDiv.innerHTML = "";

  for (let key in c.dimensions) {
    let value = c.dimensions[key];
    let color = value < 34 ? "low" : value < 67 ? "medium" : "high";

    let div = document.createElement("div");
    div.className = "dimension";

    div.innerHTML = `
      <strong>${key}: ${value}</strong>
      <div class="bar">
        <div class="fill ${color}" style="width:${value}%"></div>
      </div>
    `;

    dimDiv.appendChild(div);
  }
}

function drawRadarChart(dataObj) {
  const canvas = document.getElementById("radarChart");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 300, 300);

  const values = Object.values(dataObj);
  const labels = Object.keys(dataObj);
  const centerX = 150;
  const centerY = 150;
  const radius = 100;

  const angleStep = (2 * Math.PI) / values.length;

  ctx.beginPath();

  values.forEach((value, i) => {
    const angle = i * angleStep;
    const r = (value / 100) * radius;

    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.closePath();
  ctx.strokeStyle = "#00f0ff";
  ctx.stroke();
}
