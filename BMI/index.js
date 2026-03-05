const BMI_LS = "BMI";

// unit toggle
let isImperial = false;

// selection:
const nameInput = document.querySelector("#nameInput");
const heightInput = document.querySelector("#heightInput");
const weightInput = document.querySelector("#weightInput");
const nameErr = document.querySelector("#nameErr");
const heightErr = document.querySelector("#heightErr");
const weightErr = document.querySelector("#weightErr");
const resultCard = document.querySelector("#resultCard");
const resultName = document.querySelector("#resultName");
const resultUnits = document.querySelector("#resultUnits");
const resultBadge = document.querySelector("#resultBadge");
const bmiValue = document.querySelector("#bmiValue");
const bmiMarker = document.querySelector("#bmiMarker");
const historyList = document.querySelector("#historyList");
const historyEmpty = document.querySelector("#historyEmpty");
const unitToggle = document.querySelector("#unitToggle");
const unitLabel = document.querySelector("#unitLabel");
const heightUnit = document.querySelector("#heightUnit");
const weightUnit = document.querySelector("#weightUnit");

// labels and colours for diff categories
const categoryLabels = {
  underweight: "Underweight",
  normal: "Normal Weight",
  overweight: "Overweight",
  obese: "Obese",
};
const categoryColors = {
  underweight: { text: "#3b82f6", bg: "#eff6ff" },
  normal: { text: "#16a34a", bg: "#f0fdf4" },
  overweight: { text: "#ea580c", bg: "#fff7ed" },
  obese: { text: "#dc2626", bg: "#fef2f2" },
};

// unit toggle button
unitToggle.addEventListener("click", function () {
  isImperial = !isImperial;

  unitToggle.classList.toggle("imperial", isImperial);
  unitLabel.textContent = isImperial ? "ft / lbs" : "cm / kg";
  heightUnit.textContent = isImperial ? "(ft)" : "(cm)";
  weightUnit.textContent = isImperial ? "(lbs)" : "(kg)";

  heightInput.placeholder = isImperial ? "5.8" : "170";
  weightInput.placeholder = isImperial ? "143" : "65";
  heightInput.value = "";
  weightInput.value = "";

  heightErr.textContent = "";
  weightErr.textContent = "";
  resultCard.classList.add("hidden");
});

// helpers func
const getCategory = (bmi) => {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
};
const calculateBMI = (heightCm, weightKg) => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};
// getting percentage for marker
const getMarkerLeftPercent = (bmi) => {
  const val = Math.max(10, Math.min(40, bmi));
  return ((val - 10) / 30) * 100;
};

// validate form
const validate = () => {
  let isValid = true;

  /// first removing errors
  nameErr.textContent = "";
  heightErr.textContent = "";
  weightErr.textContent = "";
  nameInput.classList.remove("invalid");
  heightInput.classList.remove("invalid");
  weightInput.classList.remove("invalid");

  // name can't be empty
  if (!nameInput.value.trim()) {
    nameErr.textContent = "Please enter your name.";
    nameInput.classList.add("invalid");
    isValid = false;
  }

  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  // height should be positive
  if (!heightInput.value || isNaN(height) || height <= 0) {
    heightErr.textContent = "Enter a valid height greater than 0.";
    heightInput.classList.add("invalid");
    isValid = false;
    // checking if units selected in cm
  } else if (!isImperial && (height < 50 || height > 300)) {
    heightErr.textContent = "Enter height in cm (e.g. 170).";
    heightInput.classList.add("invalid");
    isValid = false;
    // checking if selected in feet
  } else if (isImperial && (height < 1 || height > 9)) {
    heightErr.textContent = "Enter height in feet (e.g. 5.8).";
    heightInput.classList.add("invalid");
    isValid = false;
  }

  // weight should be positive
  if (!weightInput.value || isNaN(weight) || weight <= 0) {
    weightErr.textContent = "Enter a valid weight greater than 0.";
    weightInput.classList.add("invalid");
    isValid = false;
    // if selected kg then
  } else if (!isImperial && (weight < 10 || weight > 500)) {
    weightErr.textContent = "Enter weight in kg (e.g. 65).";
    weightInput.classList.add("invalid");
    isValid = false;
    // if selected lbs then
  } else if (isImperial && (weight < 22 || weight > 1100)) {
    weightErr.textContent = "Enter weight in lbs (e.g. 143).";
    weightInput.classList.add("invalid");
    isValid = false;
  }

  return isValid;
};

// showing result card
const showResult = (name, heightRaw, weightRaw, bmi, category) => {
  // getting category's color
  const color = categoryColors[category];

  // removing hidden class first
  resultCard.classList.remove("hidden");
  // setting border
  resultCard.style.borderColor = color.text;

  // user name
  resultName.textContent = name;
  // showing units according to selected
  resultUnits.textContent = isImperial
    ? `${heightRaw} ft  ·  ${weightRaw} lbs`
    : `${heightRaw} cm  ·  ${weightRaw} kg`;

  // category labels and colors
  resultBadge.textContent = categoryLabels[category];
  resultBadge.style.background = color.bg;
  resultBadge.style.color = color.text;

  // bmi value
  bmiValue.textContent = bmi.toFixed(2);
  bmiValue.style.color = color.text;

  // getting marker percentage
  bmiMarker.style.left = getMarkerLeftPercent(bmi) + "%";
};
// getting data from Local storage
const getHistory = () => {
  return JSON.parse(localStorage.getItem(BMI_LS)) || [];
}

// save history to local storage
const saveToHistory = (name, height, weight, bmi, category) => {
  const history = getHistory();
  
  history.unshift({
    name,
    height,
    weight,
    bmi,
    category,
    unit: isImperial ? "imperial" : "metric",
    date: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  });

  localStorage.setItem(BMI_LS, JSON.stringify(history));
}

const renderHistory = () => {
  const history = getHistory();

  // first remove all history elements
  document.querySelectorAll(".history-item").forEach((el) => el.remove());
  // show empty div if no history
  historyEmpty.style.display = history.length ? "none" : "block";

  // if history length > thenn 0
  history.forEach((entry) => {
    const color = categoryColors[entry.category];
    const unitStr =
      entry.unit === "imperial"
        ? `${entry.height} ft · ${entry.weight} lbs`
        : `${entry.height} cm · ${entry.weight} kg`;

    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <div class="history-left">
        <div class="history-name">${entry.name}</div>
        <div class="history-meta">${unitStr} · ${entry.date}</div>
      </div>
      <div class="history-right">
        <div class="history-bmi" style="color:${color.text}">${entry.bmi}</div>
        <div class="history-cat" style="color:${color.text}">${categoryLabels[entry.category]}</div>
      </div>
    `;

    historyList.appendChild(item);
  });
}


// events 

// handling form 
document.querySelector("#bmiForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // validate all the inputs
  if (!validate()) return;

  const name = nameInput.value.trim();
  const heightRaw = parseFloat(heightInput.value);
  const weightRaw = parseFloat(weightInput.value);

  // converting values according to isImperial value
  const heightCm = isImperial ? heightRaw * 30.48 : heightRaw;
  const weightKg = isImperial ? weightRaw * 0.453592 : weightRaw;

  // getting bmi and category
  const bmi = calculateBMI(heightCm, weightKg);
  const category = getCategory(bmi);

  //save and render results...
  showResult(name, heightRaw, weightRaw, bmi, category);
  saveToHistory(name, heightRaw, weightRaw, bmi.toFixed(2), category);
  renderHistory();
});

// handle reset button
document.querySelector("#resetBtn").addEventListener("click", function () {
  document.querySelector("#bmiForm").reset();

  nameErr.textContent = "";
  heightErr.textContent = "";
  weightErr.textContent = "";
  nameInput.classList.remove("invalid");
  heightInput.classList.remove("invalid");
  weightInput.classList.remove("invalid");

  resultCard.classList.add("hidden");
});

// handle clear history
document.querySelector("#clearHistory").addEventListener("click", function () {
  // if empty array then return
  if (!getHistory().length) return;
  // if user cancelts it then also return
  if (!confirm("Clear all BMI history? This cannot be undone.")) return;
  // otherwise remove
  localStorage.removeItem(BMI_LS);
  renderHistory();
});


//initialize history 
renderHistory();