document.addEventListener("DOMContentLoaded", () => {
  const app = {
    name: "",
    theme: "light",
    currentSection: 0,
    swotData: {
      Strengths: [],
      Weaknesses: [],
      Opportunities: [],
      Threats: []
    },
    options: {
      Strengths: ["High quality", "Strong brand", "Expert team", "Large market share"],
      Weaknesses: ["Limited resources", "Low brand recognition", "High costs", "Weak distribution"],
      Opportunities: ["Emerging markets", "New technologies", "Market demand", "Partnerships"],
      Threats: ["Competitors", "Economic downturn", "Regulations", "Changing trends"]
    },
    scores: { Strengths: 0, Weaknesses: 0, Opportunities: 0, Threats: 0 }
  };

  // Screens
  const screens = {
    welcome: document.getElementById("welcome-screen"),
    theme: document.getElementById("theme-screen"),
    swot: document.getElementById("swot-screen"),
    result: document.getElementById("result-screen")
  };

  const nameInput = document.getElementById("user-name");
  const swotSection = document.getElementById("swot-section");
  const swotOptionsContainer = document.getElementById("strengths-options");
  const swotTitle = document.getElementById("swot-title");
  const nextSectionButton = document.getElementById("next-section");
  const userNameDisplay = document.getElementById("user-name-display");
  const swotScoreDisplay = document.getElementById("swot-score-display");
  const shareButton = document.getElementById("share-button");

  // Utility Functions
  const showScreen = (screen) => {
    Object.values(screens).forEach((el) => el.classList.add("hidden"));
    screen.classList.remove("hidden");
  };

  const updateTheme = (theme) => {
    document.body.className = theme;
    app.theme = theme;
  };

  const renderOptions = (section) => {
    const options = app.options[section];
    swotOptionsContainer.innerHTML = options
      .map(
        (option, index) => `
      <label>
        <input type="checkbox" value="${option}" id="${section.toLowerCase()}-option-${index}">
        ${option}
      </label>
    `
      )
      .join("");
  };

  const calculateScores = () => {
    for (const section in app.swotData) {
      app.scores[section] = app.swotData[section].length;
    }
  };

  const getTotalScore = () => {
    return (
      app.scores.Strengths +
      app.scores.Opportunities -
      app.scores.Weaknesses -
      app.scores.Threats
    );
  };

  // Event Handlers
  document.getElementById("start-theme-selection").addEventListener("click", () => {
    app.name = nameInput.value.trim();
    if (app.name === "") {
      alert("Please enter your name.");
      return;
    }
    showScreen(screens.theme);
  });

  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      updateTheme(e.target.dataset.theme);
    });
  });

  document.getElementById("start-analysis").addEventListener("click", () => {
    showScreen(screens.swot);
    app.currentSection = 0;
    renderCurrentSection();
  });

  nextSectionButton.addEventListener("click", () => {
    // Save selected options
    const currentSection = Object.keys(app.swotData)[app.currentSection];
    const selectedOptions = Array.from(
      swotOptionsContainer.querySelectorAll("input:checked")
    ).map((checkbox) => checkbox.value);
    app.swotData[currentSection] = selectedOptions;

    // Move to next section
    app.currentSection++;
    if (app.currentSection < Object.keys(app.swotData).length) {
      renderCurrentSection();
    } else {
      calculateScores();
      showScreen(screens.result);
      renderResults();
    }
  });

  shareButton.addEventListener("click", () => {
    const url = window.location.href;
    const score = getTotalScore();
    const text = `${app.name}'s SWOT Analysis Score: ${score}. Check it out here: ${url}`;
    if (navigator.share) {
      navigator.share({ title: "SWOT Analysis", text, url });
    } else {
      alert("Sharing is not supported on this browser.");
    }
  });

  // Render Functions
  const renderCurrentSection = () => {
    const sectionKeys = Object.keys(app.swotData);
    const currentSection = sectionKeys[app.currentSection];
    swotTitle.textContent = `SWOT Analysis - ${currentSection}`;
    renderOptions(currentSection);
  };

  const renderResults = () => {
    userNameDisplay.textContent = `Name: ${app.name}`;
    swotScoreDisplay.textContent = `SWOT Score: ${getTotalScore()}`;
  };
});