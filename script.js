const countries = {
  India: { lat: 20.6, lon: 78.9, score: "Medium Risk" },
  Pakistan: { lat: 30.3, lon: 69.3, score: "High Risk" },
  USA: { lat: 37.1, lon: -95.7, score: "Medium Risk" },
  China: { lat: 35.8, lon: 104.1, score: "Medium Risk" },
  Russia: { lat: 61.5, lon: 105.3, score: "High Risk" }
};

const map = document.querySelector(".map-container");

function createDots() {
  const width = 1000;
  const height = 500;

  for (let name in countries) {
    const c = countries[name];

    const x = (c.lon + 180) * (width / 360);
    const y = (90 - c.lat) * (height / 180);

    const dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = x + "px";
    dot.style.top = y + "px";

    dot.title = name;

    dot.onclick = () => showCountry(name);

    map.appendChild(dot);
  }
}

function showCountry(name) {
  const panel = document.getElementById("panel");

  panel.classList.add("active");

  document.getElementById("country").innerText = name;
  document.getElementById("score").innerText =
    countries[name].score;
}

function closePanel() {
  document.getElementById("panel").classList.remove("active");
}

createDots();
