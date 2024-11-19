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
      Strengths: [
        "Innovative products",
        "Skilled team",
        "Strong leadership",
        "Financial stability",
        "Global reach",
        "Customer loyalty",
        "High-quality services",
        "Technological advantage",
        "Unique brand identity",
        "Efficient operations"
      ],
      Weaknesses: [
        "High production costs",
        "Limited customer base",
        "Dependence on few suppliers",
        "Weak marketing strategies",
        "Outdated technology",
        "Limited innovation",
        "Staff shortages",
        "Poor brand recognition",
        "Low operational efficiency",
        "Weak financial health"
      ],
      Opportunities: [
        "Growing market demand",
        "Partnership opportunities",
        "Emerging technologies",
        "Market expansion",
        "Increased digital presence",
        "Government incentives",
        "Untapped markets",
        "Diversified products",
        "New consumer trends",
        "Economic growth"
      ],
      Threats: [
        "Strong competition",
        "Economic downturn",
        "Changing regulations",
        "Supply chain disruptions",
        "Technological obsolescence",
        "Customer preferences shift",
        "Price wars",
        "Political instability",
        "Market saturation",
        "Cybersecurity risks"
      ]
    },
    scores: { Strengths: 0, Weaknesses: 0, Opportunities: 0, Threats: 0 }
  };

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

  const showScreen = (screen) => {
    Object.values(screens).forEach((el) => el.classList.add("hidden"));
    screen.classList.remove("hidden");
  };

  const updateTheme = (theme) => {
    document.body.className = theme;
    app.theme = theme;
  };

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  const renderOptions = (section) => {
    const options = shuffleArray(app.options[section]);
    swotOptionsContainer.innerHTML = options
      .map(
        (option) => `
      <button class="option-btn" data-section="${section}" data-value="${option}">
        ${option}
      </button>
    `
      )
      .join("");

    document.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const { section, value } = e.target.dataset;
        if (app.swotData[section].includes(value)) {
          app.swotData[section] = app.swotData[section].filter((item) => item !== value);
          e.target.classList.remove("selected");
        } else {
          app.swotData[section].push(value);
          e.target.classList.add("selected");
        }
      });
    });
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
  const url = "https://unstopablethinkerr.github.io/SWOT-ANALYSIS/";
  const score = getTotalScore();
  const text = `${app.name}\'s SWOT Analysis Score: ${score}. Get to know your score under 60 seconds! Check it out here: https://unstopablethinkerr.github.io/SWOT-ANALYSIS`;
  
  if (navigator.share) {
    navigator.share({ title: "SWOT Analysis", text, url });
  } else {
    alert("Sharing is not supported on this browser.");
  }
});


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
