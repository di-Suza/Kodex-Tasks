import {
  User,
  secondIntoMinTime,
  startTimer,
  stopTimer,
  difficultyTexts,
  hideProblemStatusModal,
  showProblemStatusModal,
  hideUserAddingModal,
  showUserAddingModal,
  Debounce,
  getProblemsData,
  createDefaultOption,
  hideEditUserModal,
  showEditUserModal,
  getUsersCurrentSolvingTime,
  hideLeaderBoardModal,
  showLeaderBoardModal,
  generateRandomId,
} from "./helper.js";

// main content section (initially hidden)
let problemSelectingSection = document.querySelector(
  "#problemSelectingSection",
);
problemSelectingSection.style.display = "none";

// selecting user window
let selectYourName = document.querySelector(".selectYourName");

//getting users from localstorage if exists & getting current selected user if any selected
let users;
let selectedUser;

const getUsers = () => {
  users = JSON.parse(localStorage.getItem("users"));

  //getting current selected user if any selected
  if (users) {
    let user = users.filter((i) => i.selected);
    selectedUser = user[0];
  }
  // if selected user exist then it will not show the window for select users
  if (selectedUser) {
    selectYourName.style.display = "none";
    problemSelectingSection.style.display = "";
  }
};

// getting data for first the firstime
getUsers();

// to update user's location at every point, just in case if user reload the page then user can resume it where they leaved
const updateUsersCurrentLocation = (difficulty = "", problemNum = 0) => {
  selectedUser.currentlyWhere.difficulty = difficulty;
  selectedUser.currentlyWhere.problem = problemNum;
  users = users.map((user) =>
    user.uid === selectedUser.uid ? selectedUser : user,
  );
  localStorage.setItem("users", JSON.stringify(users));
  getUsers();
};

// get current location
const userCurrentLocation = (() => {
  if (selectedUser) {
    return selectedUser.currentlyWhere;
  }
  return { difficulty: "", problem: 0 };
})();

// first check if users exists or not,then decide to add eventlistener or not
if (!users) {
  document.addEventListener("DOMContentLoaded", () => {
    showUserAddingModal();
  });
}

// getting user name nd button
let userName = document.querySelector("#userName");
let form = document.querySelector("#nameForm");
let addNewUser = document.querySelector("#addNewUser");

addNewUser.addEventListener("click", () => {
  showUserAddingModal();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stops the default submit FOR NOW

  if (!form.checkValidity()) {
    form.reportValidity(); // force browser to show required warning
    return; // stop here if invalid
  }
  // generating unique uid -
  //   let func = await import("./extraCode.js");
  let uid = generateRandomId();

  let username = userName.value;
  if (username.trim() !== "") {
    if (users && users.length >= 0) {
      if (selectedUser) selectedUser.selected = false;
      let newUser = new User(username, uid);
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      // if there's no users found in local storage
      let newUsers = [];
      newUsers.push(new User(username, uid));
      localStorage.setItem("users", JSON.stringify(newUsers));
    }
    // to remove focus form any element before removing modal
    hideUserAddingModal();
    setUsersAsOptions();
    userName.value = "";
  }
});

// setting users as options for selection
let userSelect = document.querySelector("#userSelect");
let continueBtn = document.querySelector("#continueBtn");

const setUsersAsOptions = () => {
  getUsers(); // Refresh users from storage
  userSelect.innerHTML = "";

  // if No users found- open add user modal
  if (!Array.isArray(users) || users.length === 0) {
    showUserAddingModal();
    return;
  }

  const frag = document.createDocumentFragment();

  // if Multiple users- show default select option
  if (users.length > 1) {
    continueBtn.disabled = true;
    frag.appendChild(createDefaultOption());
  }

  // Add all users as <option>
  users.forEach((user) => {
    const opt = document.createElement("option");
    opt.value = user.uid;
    opt.textContent = user.username;
    frag.appendChild(opt);
  });

  userSelect.appendChild(frag);

  // if Only 1 user- auto-select & enable continue
  if (users.length === 1) {
    continueBtn.disabled = false;
    userSelect.value = users[0].uid; // explicitly set
  }
};
setUsersAsOptions();

userSelect.addEventListener("change", () => {
  if (userSelect.value !== "") {
    continueBtn.disabled = false;
  } else {
    continueBtn.disabled = true;
  }
});

// cache DOM elements
const selectNameAgainBtn = problemSelectingSection.querySelector(
  "#selectNameAgainBtn",
);
const selectedUserNameEl =
  problemSelectingSection.querySelector("#selectedUserName");

// Set initial selected username
if (selectedUser) selectedUserNameEl.textContent = selectedUser.username;

// Continue button clicked
continueBtn.addEventListener("click", () => {
  const selectedUID = userSelect.value;

  // If no user selected- return immediately
  if (!selectedUID) return;

  // Updating selected user by matching uids and with setting selected true
  users = users.map((user) => ({
    ...user,
    selected: user.uid === selectedUID,
  }));

  // Save updated users
  localStorage.setItem("users", JSON.stringify(users));

  // Get selected user directly
  selectedUser = users.find((user) => user.selected);

  // Update displayed name
  selectedUserNameEl.textContent = selectedUser.username;

  // Switch UI sections
  selectYourName.style.display = "none";
  problemSelectingSection.style.display = "";

  updateDifficultyUI();
});

// select name again
selectNameAgainBtn.addEventListener("click", () => {
  selectYourName.style.display = "";
  problemSelectingSection.style.display = "none";
});

// Selecting difficulty buttons
const difficultyButtons = {
  easy: document.querySelector("#easy"),
  medium: document.querySelector("#medium"),
  hard: document.querySelector("#hard"),
};

// Problems sections
const sections = {
  easy: document.querySelector("#problemsSectionEasy"),
  medium: document.querySelector("#problemsSectionMedium"),
  hard: document.querySelector("#problemsSectionHard"),
};

const displayUserName = document.querySelectorAll(".displayUserName");
const backButtons = document.querySelectorAll(".backToChooseDifficulty");

// Hide all sections initially
Object.values(sections).forEach((sec) => (sec.style.display = "none"));

// Update all username places
const updateUserName = () => {
  displayUserName.forEach((e) => (e.textContent = selectedUser.username));
};

// Show selected difficulty section
const showDifficultySection = (level) => {
  // Save user location
  updateUsersCurrentLocation(level);

  // Hide all
  Object.values(sections).forEach((sec) => (sec.style.display = "none"));

  // Show selected difficulty only
  sections[level].style.display = "";

  // Hide difficulty selection UI
  problemSelectingSection.style.display = "none";

  updateUserName();
};

// Register click events for difficulty buttons dynamically
Object.keys(difficultyButtons).forEach((level) => {
  difficultyButtons[level].addEventListener("click", () => {
    showDifficultySection(level);
  });
});

const problemDifficulty = document.querySelector("#problemDifficulty");
const updateDifficultyUI = () => {
  // Map difficulty- element ID
  const levels = {
    easy: problemDifficulty.querySelector("#easy"),
    medium: problemDifficulty.querySelector("#medium"),
    hard: problemDifficulty.querySelector("#hard"),
  };

  if (selectedUser) {
    Object.entries(levels).forEach(([level, element]) => {
      const solved = selectedUser.solvedProblems[level].length;
      const remaining = 10 - solved;
      const cardText = element.querySelector(".card-text");

      cardText.innerHTML =
        solved === 10
          ? `${difficultyTexts[level]}<br/><i class="bi bi-check2-circle text-success"> Completed</i>`
          : `${difficultyTexts[level]}<br/><i class="bi bi-clock-history text-secondary"> ${remaining} Remaining</i>`;
    });

    return;
  }
};

(() => {
  if (!selectedUser) return;
  const { difficulty, problem } = userCurrentLocation;

  updateUserName();
  updateDifficultyUI();
  if (!difficulty) return;
  const sectionMap = {
    easy: problemsSectionEasy,
    medium: problemsSectionMedium,
    hard: problemsSectionHard,
  };

  // Hide selector
  problemSelectingSection.style.display = "none";

  // Show correct section
  sectionMap[difficulty].style.display = "";
  if (problem !== 0) {
    // user ko directly us accordion p open kra skte hai yha s
    problemSelectingSection.style.display = "none";
  }
})();

// TEST User Code function
// Setting the inputs value as it is
const formatValue = (val) => {
  if (!Array.isArray(val)) return val; // safety
  if (val.length === 1) return JSON.stringify(val[0]);
  return val.map((v) => JSON.stringify(v)).join(", ");
};

// Func for checking outputs
const deepEqual = (a, b) => {
  // Same reference
  if (a === b) return true;

  // If any is null or undefined
  if (a == null || b == null) return a === b;

  // If types differ → not equal
  if (typeof a !== typeof b) return false;

  // Handle Date objects
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Handle Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }

  // Handle Objects
  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => deepEqual(a[key], b[key]));
  }

  // Primitive types (number, string, boolean)
  return a === b;
};
// Code executer
const codeExecuter = async (userCode, test) => {
  // return an object which shows the user output and expected and if mathced return true also in success
  try {
    let exec = new Function(`return (${userCode})`)();
    let arrOfArguements = JSON.parse(`[${formatValue(test.input)}]`);
    let resultOfExec = exec(...arrOfArguements);

    let details = {
      result: deepEqual(resultOfExec, test.expected),
      input: test.input,
      expected: test.expected,
      yourOutput: resultOfExec,
      error: false,
    };
    return details;
  } catch (error) {
    return { errorMessage: error.message, result: false, error: true };
  }
};

const runTests = async (userCode, Tests) => {
  // return all test cases results and success and failure
  return Promise.all(Tests.map((test) => codeExecuter(userCode, test)));
};

//locked or unlocked-- icons
let islocked = `<i class="bi bi-lock-fill text-secondary"></i>`;
let isUnlocked = `<i class="bi bi-check2 text-secondary"></i>`;
let solved = `<i class="bi bi-check2-all text-success"></i>`;

// unlock next question
const unlockNextProblem = (item) => {
  const EM = "\u2003\u2003"; // 2 &emsp;
  let accordionButtonOfSolvedItem = item.querySelector("button");
  let parts1 = accordionButtonOfSolvedItem.innerHTML.split(EM);
  accordionButtonOfSolvedItem.innerHTML = parts1[0] + "&emsp;&emsp;" + solved;

  const nextItem = item.nextElementSibling;
  if (nextItem) {
    let accordionButtonOfNextItem = nextItem.querySelector("button");
    let parts2 = accordionButtonOfNextItem.innerHTML.split(EM);
    accordionButtonOfNextItem.innerHTML =
      parts2[0] + "&emsp;&emsp;" + isUnlocked;
    accordionButtonOfNextItem.removeAttribute("disabled", "");
  }
};

//creating accordion

const createAccordionItem = (problem, unlocked) => {
  const originalPoints = problem.points;

  // accordion item
  const item = document.createElement("div");
  item.className = "accordion-item";

  // header
  const header = document.createElement("h2");
  header.className = "accordion-header";

  const collapseBtn = document.createElement("button");
  collapseBtn.className = "accordion-button collapsed";
  collapseBtn.type = "button";
  collapseBtn.setAttribute("data-bs-toggle", "collapse");
  collapseBtn.setAttribute("data-bs-target", `#collapse-${problem.problem}`);
  if (!unlocked) collapseBtn.setAttribute("disabled", "");
  collapseBtn.innerHTML =
    problem.title + "&emsp;&emsp;" + (unlocked ? isUnlocked : islocked);

  header.appendChild(collapseBtn);
  item.appendChild(header);

  // collapse part
  const collapse = document.createElement("div");
  collapse.id = `collapse-${problem.problem}`;
  collapse.className = "accordion-collapse collapse";
  collapse.setAttribute("data-bs-parent", `#${problem.parentId}`);

  const body = document.createElement("div");
  body.className = "accordion-body";

  const row = document.createElement("div");
  row.className = "row g-3";

  // left column
  const left = document.createElement("div");
  left.className = "col-12 col-lg-8";

  const questionDiv = document.createElement("div");
  questionDiv.className = "mb-3";
  questionDiv.innerHTML = `<p>${problem.description}</p>`;
  left.appendChild(questionDiv);

  // hints section
  const remainingPoints = document.createElement("h5");
  const hintHeading = document.createElement("h6");
  const hintList = document.createElement("ul");
  const showHintsBtn = document.createElement("button");
  const warning = document.createElement("i");

  if (problem.hints && problem.hints.length > 0) {
    hintHeading.innerText = "Hints:";
    hintHeading.className = "fw-bold mt-3";
    left.appendChild(hintHeading);

    problem.hints.forEach((h) => {
      const li = document.createElement("li");
      li.innerText = h;
      hintList.appendChild(li);
    });

    warning.textContent = " *If you take hints, your points will deduct!";
    showHintsBtn.textContent = "Show Hints";
    showHintsBtn.classList = "btn btn-link ";
    showHintsBtn.setAttribute(
      "title",
      "If you take hints, your points will deduct!",
    );

    hintHeading.after(warning);
    hintHeading.append(showHintsBtn);
    showHintsBtn.after(hintList);

    showHintsBtn.addEventListener("click", () => {
      hintHeading.style.display = "";
      hintList.style.display = "";

      problem.points -= 40;
      problem.hintsPointDeducted = true;
      remainingPoints.textContent = "Remaining Points:" + problem.points;

      problem.userCode = selectedUser.currentlySolving[problem.difficulty]
        ?.userCode
        ? selectedUser.currentlySolving[problem.difficulty].userCode
        : problem.starterCode;
      problem.userTime = getUsersCurrentSolvingTime();
      selectedUser.currentlySolving[problem.difficulty] = problem;

      users = users.map((user) =>
        user.uid === selectedUser.uid ? selectedUser : user,
      );
      localStorage.setItem("users", JSON.stringify(users));
      updateUsersCurrentLocation(problem.difficulty, problem.problem);
      problemSelectingSection.style.display = "none";

      showHintsBtn.style.display = "none";
      warning.style.display = "none";
    });
  }

  // hints hidden by default
  showHintsBtn.style.display = "none";
  warning.style.display = "none";
  hintHeading.style.display = "none";
  hintList.style.display = "none";

  // example of input and outputs
  if (problem.testCases && problem.testCases.length > 0) {
    const exampleHeading = document.createElement("h6");
    exampleHeading.className = "fw-bold mt-3";
    exampleHeading.innerText = "Example Input / Output:";
    left.appendChild(exampleHeading);

    const exampleDiv = document.createElement("div");
    exampleDiv.className = "p-2 border rounded mb-2";
    exampleDiv.innerHTML = `
      <strong>Input:</strong> ${formatValue(problem.testCases[0].input)} <br>
      <strong>Output:</strong> ${JSON.stringify(problem.testCases[0].expected)}
    `;
    left.appendChild(exampleDiv);
  }

  // remaining points
  remainingPoints.textContent = "Remaining Points:" + problem.points;
  if (
    selectedUser.currentlySolving[problem.difficulty]?.problem ===
    problem.problem
  ) {
    remainingPoints.textContent =
      "Remaining Points:" +
      selectedUser.currentlySolving[problem.difficulty]?.points;
  }
  left.appendChild(remainingPoints);

  // right column
  const right = document.createElement("div");
  right.className = "col-12 col-lg-4 d-flex flex-column";

  const editorDiv = document.createElement("div");
  editorDiv.className = "p-2 border rounded flex-grow-1 d-flex flex-column";

  const timerDiv = document.createElement("div");
  timerDiv.className = "p-2 border rounded flex-grow-1 justify-content-center";
  timerDiv.textContent = "Time: " + secondIntoMinTime(0);
  editorDiv.appendChild(timerDiv);

  const runBtn = document.createElement("button");
  runBtn.className = "btn btn-primary mt-3 w-100";
  runBtn.innerText = "Run Code";

  const codeArea = document.createElement("textarea");
  codeArea.className = "form-control flex-grow-1";
  codeArea.style.minHeight = "250px";
  codeArea.style.fontFamily = "monospace";
  codeArea.style.fontSize = "14px";
  codeArea.style.whiteSpace = "pre";
  codeArea.style.tabSize = 2;

  // loading initial code
  codeArea.value = problem.starterCode;

  if (selectedUser.solvedProblems[problem.difficulty].length > 0) {
    selectedUser.solvedProblems[problem.difficulty].forEach((solvedItem) => {
      if (solvedItem.problem === problem.problem) {
        codeArea.value = solvedItem?.userCode;
        codeArea.setAttribute("disabled", "");
        runBtn.classList = "btn btn-success";
        runBtn.textContent = "Successfully Solved!";
        runBtn.setAttribute("disabled", "");
        collapseBtn.innerHTML = problem.title + "&emsp;&emsp;" + solved;
        timerDiv.textContent = `Solved in ${secondIntoMinTime(solvedItem.userTime)}`;
        showHintsBtn.style.display = "none";
        warning.style.display = "none";
        hintHeading.style.display = "";
        hintList.style.display = "";
        remainingPoints.innerHTML = `Remaining Points: ${solvedItem.points}`;
      } else {
        codeArea.value = problem.starterCode;
      }
    });
  }

  if (
    selectedUser.currentlySolving[problem.difficulty]?.problem ===
    problem.problem
  ) {
    codeArea.value =
      selectedUser.currentlySolving[problem.difficulty]?.userCode;
    timerDiv.textContent = `Time: ${secondIntoMinTime(
      selectedUser.currentlySolving[problem.difficulty]?.userTime - 1,
    )}`;
  }

  // code editor input events with debounce
  codeArea.addEventListener(
    "input",
    Debounce((e) => {
      problem.userCode = e.target.value;
      if (problem.userCode?.trim() !== problem.starterCode?.trim()) {
        selectedUser.currentlySolving[problem.difficulty] = problem;
      } else {
        selectedUser.currentlySolving[problem.difficulty] = {};
      }
      users = users.map((user) =>
        user.uid === selectedUser.uid ? selectedUser : user,
      );
      localStorage.setItem("users", JSON.stringify(users));
      updateUsersCurrentLocation(problem.difficulty, problem.problem);
      problemSelectingSection.style.display = "none";
    }, 400),
  );

  codeArea.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = this.selectionStart;
      this.value =
        this.value.substring(0, start) +
        "  " +
        this.value.substring(this.selectionEnd);
      this.selectionStart = this.selectionEnd = start + 2;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const start = this.selectionStart;
      const before = this.value.substring(0, start);
      const after = this.value.substring(this.selectionEnd);
      const lastLine = before.split("\n").pop();
      const indentMatch = lastLine.match(/^\s+/);
      const indent = indentMatch ? indentMatch[0] : "";
      this.value = before + "\n" + indent + after;
      this.selectionStart = this.selectionEnd = start + 1 + indent.length;
    }
  });

  // back buttons
  const hideBackBtns = () => {
    backButtons.forEach((btn) => (btn.disabled = true));
  };
  const showBackBtns = () =>
    backButtons.forEach((btn) => (btn.disabled = false));

  // helper:
  // is it next solving one
  const isNextProblem = () => {
    const solved = selectedUser.solvedProblems[problem.difficulty];
    if (solved.length === 0) return true;
    return solved[solved.length - 1]?.problem + 1 === problem.problem;
  };

  // currentlySolving se problem fields loads
  const loadFromCurrentlySolving = () => {
    const current = selectedUser.currentlySolving[problem.difficulty];
    problem.userCode = current?.userCode
      ? current.userCode
      : problem.starterCode;
    problem.userTime = current?.userTime ? current.userTime : 0;
    problem.hintsPointDeducted = current?.hintsPointDeducted
      ? current.hintsPointDeducted
      : false;
    problem.points = problem.hintsPointDeducted
      ? current.points
      : originalPoints;
  };

  //  hint UI update
  const updateHintUI = () => {
    if (selectedUser.currentlySolving[problem.difficulty].hintsPointDeducted) {
      hintHeading.style.display = "";
      hintList.style.display = "";
      showHintsBtn.style.display = "none";
      warning.style.display = "none";
    } else {
      hintHeading.style.display = "";
      warning.style.display = "";
      hintList.style.display = "none";
      showHintsBtn.style.display = "";
    }
  };

  // users + localStorage save
  const saveToStorage = () => {
    users = users.map((user) =>
      user.uid === selectedUser.uid ? selectedUser : user,
    );
    localStorage.setItem("users", JSON.stringify(users));
    updateUsersCurrentLocation(problem.difficulty, problem.problem);
    problemSelectingSection.style.display = "none";
  };

  // accordion open
  collapse.addEventListener("shown.bs.collapse", () => {
    hideBackBtns();
    if (!isNextProblem()) {
      problem.points = originalPoints;
      return;
    }

    loadFromCurrentlySolving();
    startTimer(timerDiv, problem.userTime);
    selectedUser.currentlySolving[problem.difficulty] = problem;
    saveToStorage();
    problem.points = originalPoints;
    updateHintUI();
  });

  // accordion close
  collapse.addEventListener("hidden.bs.collapse", () => {
    showBackBtns();

    if (!isNextProblem()) {
      problem.points = originalPoints;
      return;
    }
    loadFromCurrentlySolving();
    problem.userTime = stopTimer();
    selectedUser.currentlySolving[problem.difficulty] = problem;
    saveToStorage();
    problem.points = originalPoints;
  });

  // modal for results
  let problemStatusModal = document.querySelector("#problem-status");
  let modalBody = problemStatusModal.querySelector(".modal-body");
  let modalEmptybody = "";
  let modalTitle = problemStatusModal.querySelector(".modal-title");
  let modalCloseBtn = problemStatusModal.querySelector(".modalCloseBtn");

  modalCloseBtn.addEventListener("click", () => {
    modalTitle.textContent = "";
    modalBody.innerHTML = "";
    modalEmptybody = "";
    hideProblemStatusModal();
  });

  // code execute run button
  runBtn.addEventListener("click", async () => {
    let results = await runTests(codeArea.value, problem.testCases);

    const hasNoErrors = results.every((e) => !e.error);
    const allPassed = results.every((e) => e.result);

    if (hasNoErrors && allPassed) {
      modalTitle.style.color = "green";
      modalTitle.textContent = "HURREY, YOU DID IT!";

      let solvedIn_Seconds = stopTimer();
      timerDiv.textContent = `Solved in ${secondIntoMinTime(solvedIn_Seconds)}`;

      selectedUser.currentlySolving[problem.difficulty].userTime =
        solvedIn_Seconds;
      selectedUser.solvedProblems[problem.difficulty].push(
        selectedUser.currentlySolving[problem.difficulty],
      );
      selectedUser.currentlySolving[problem.difficulty] = {};

      users = users.map((user) =>
        user.uid === selectedUser.uid ? selectedUser : user,
      );
      localStorage.setItem("users", JSON.stringify(users));
      updateUsersCurrentLocation(problem.difficulty, problem.problem + 1);
      problemSelectingSection.style.display = "none";

      codeArea.setAttribute("disabled", "");
      runBtn.classList = "btn btn-success";
      runBtn.textContent = "Successfully Solved!";
      runBtn.setAttribute("disabled", "");
      unlockNextProblem(item);

      hintHeading.style.display = "";
      hintList.style.display = "";
      warning.style.display = "none";
      showHintsBtn.style.display = "none";
    } else if (!hasNoErrors) {
      modalTitle.style.color = "red";
      modalTitle.textContent = "ERROR IN YOUR CODE!";
      modalBody.innerHTML = `<h5>Error Message: "${results[0].errorMessage}"</h5>`;
    } else {
      modalTitle.textContent = "FAILED!";
    }

    results.length > 0 &&
      results.forEach((resultItem) => {
        if (resultItem && resultItem.error !== true) {
          modalEmptybody += `
          <div class="border p-3 mb-3 bg-light rounded shadow-sm w-100" style="max-width:500px;">
            <p><strong>Result:</strong>
              <span class="text-${resultItem.result ? "success" : "danger"}">
                ${resultItem.result ? "Passed" : "Failed"}
              </span>
            </p>
            <p><strong>Input:</strong>${formatValue(resultItem.input)}</p>
            <p><strong>Your Output:</strong>${resultItem.yourOutput}</p>
            <p><strong>Expected Output:</strong>${JSON.stringify(resultItem.expected)}</p>
          </div>`;
        }
      });

    if (hasNoErrors) modalBody.innerHTML = modalEmptybody;

    showProblemStatusModal();
  });

  // appending nodes
  editorDiv.appendChild(codeArea);
  right.appendChild(editorDiv);
  right.appendChild(runBtn);

  row.appendChild(left);
  row.appendChild(right);
  body.appendChild(row);
  collapse.appendChild(body);
  item.appendChild(collapse);

  return item;
};

// setting problems in accordion
let mainContentBox = document.querySelectorAll(".mainContentBox");
let accordionDocFragment = document.createDocumentFragment();
const addAccordion = (problem, parentId, unlocked) => {
  problem.parentId = parentId;
  return createAccordionItem(problem, unlocked);
};

mainContentBox.forEach((ele) => {
  const btnToStart = ele.querySelector("button");
  const accordion = ele.querySelector(".accordion");
  const levelType = accordion.dataset.levelType;

  btnToStart.addEventListener("click", async () => {
    accordion.innerHTML = "";

    const problemsData = await getProblemsData(levelType);
    const solvedProblemCount = selectedUser.solvedProblems[levelType].length;

    //checking how much solved and unlocking only those problems which is solved
    problemsData.forEach((item, index) => {
      const unlocked = solvedProblemCount >= index;
      accordionDocFragment.appendChild(
        addAccordion(item, accordion.id, unlocked),
      );
    });

    accordion.appendChild(accordionDocFragment);
    updateUsersCurrentLocation(levelType, 1);
    btnToStart.style.display = "none";
    problemSelectingSection.style.display = "none";
  });
});

// BACK buttons- go back to choose difficulty
backButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    Object.values(sections).forEach((sec) => (sec.style.display = "none"));
    problemSelectingSection.style.display = "";
    updateUsersCurrentLocation();
    mainContentBox.forEach((ele) => {
      let btnToStart = ele.querySelector("button");
      let accordion = ele.querySelector(".accordion");
      accordion.innerHTML = "";
      btnToStart.style.display = "";
    });

    updateDifficultyUI();
  });
});

// edit users ---
let editUsers = selectYourName.querySelector(".editUsers");
let editUserModal = document.querySelector("#editUserModal");
let closeEditUserModalBtn = editUserModal.querySelector(".closeModal");
let usersList = editUserModal.querySelector(".usersList");

// creating user list
const createUserListItem = (item) => {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center my-3";

  // LEFT  Username
  const nameSpan = document.createElement("span");
  nameSpan.textContent = item.username;

  // RIGHT  Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.textContent = "Delete User";

  deleteBtn.addEventListener("click", () => {
    const updatedUsers = users.filter((u) => u.uid !== item.uid);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    getUsers(); // users update ho gaya

    selectYourName.style.display = "";
    problemSelectingSection.style.display = "none";

    if (updatedUsers.length === 0) {
      usersList.innerHTML = `<li class="list-group-item text-center text-muted">No users found</li>`;
    } else {
      const listSpace = document.createDocumentFragment();
      updatedUsers.forEach((u) => listSpace.appendChild(createUserListItem(u)));
      usersList.innerHTML = "";
      usersList.appendChild(listSpace);
    }
  });
  // append
  li.appendChild(nameSpan);
  li.appendChild(deleteBtn);

  return li;
};

closeEditUserModalBtn.addEventListener("click", () => {
  setUsersAsOptions();
  hideEditUserModal();
  selectYourName.style.display = "";
  problemSelectingSection.style.display = "none";
  usersList.innerHTML = "";
  if (users.length === 0) {
    showUserAddingModal();
  }
});

editUsers.addEventListener("click", () => {
  usersList.innerHTML = "";
  showEditUserModal();
  let listSpace = document.createDocumentFragment();
  if (users && users.length > 0) {
    users.forEach((item) => {
      let li = createUserListItem(item);
      listSpace.appendChild(li);
    });
    usersList.appendChild(listSpace);
  } else {
    usersList.innerHTML = `<li class="list-group-item text-center text-muted">
  No users found
</li>`;
  }
});

//  leader board logic
let ShowLeaderBoardBtn = document.querySelector("#ShowLeaderBoardBtn");
let leaderBoardModal = document.querySelector("#leaderBoardModal");
let leaderboardCloseBtn = leaderBoardModal.querySelector(".closeModal");
let leaderBoardBody = leaderBoardModal.querySelector(".modal-body");

ShowLeaderBoardBtn.addEventListener("click", () => {
  showLeaderBoardModal();

  if (!users || users.length === 0) {
    leaderBoardBody.innerHTML = `
      <ul class="list-group">
        <li class="list-group-item d-flex align-items-center">
          <div class="col-12">No Users</div>
        </li>
      </ul>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  // header
  const header = document.createElement("ul");
  header.className = "list-group mb-2";
  header.innerHTML = `
    <li class="list-group-item d-flex fw-bold">
      <div class="col-6">User Name</div>
      <div class="col-3 text-center">Solved</div>
      <div class="col-3 text-center">Points</div>
    </li>`;
  fragment.appendChild(header);

  users.forEach((user) => {
    // teeno difficulty ek saath
    const allSolved = [
      ...user.solvedProblems.easy,
      ...user.solvedProblems.medium,
      ...user.solvedProblems.hard,
    ];

    const numOfSolvedProblems = allSolved.length;
    const totalPoints = allSolved.reduce((sum, prob) => sum + prob.points, 0);

    const ul = document.createElement("ul");
    ul.className = "list-group";
    ul.innerHTML = `
      <li class="list-group-item d-flex align-items-center">
        <div class="col-6">${user.username}</div>
        <div class="col-3 text-center">${numOfSolvedProblems}</div>
        <div class="col-3 text-center">${totalPoints}</div>
      </li>`;
    fragment.appendChild(ul);
  });

  leaderBoardBody.innerHTML = "";
  leaderBoardBody.appendChild(fragment);
});

leaderboardCloseBtn.addEventListener("click", () => {
  hideLeaderBoardModal();
  leaderBoardBody.innerHTML = "";
});
