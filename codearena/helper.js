export function generateRandomId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomPart = "";

  // generate 8 random characters
  for (let i = 0; i < 8; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)];
  }

  // combine random chars + current timestamp
  const uniqueId = randomPart + "_" + Date.now();

  return uniqueId;
}

// user class
export class User {
  constructor(username, uid) {
    this.username = username;
    this.uid = uid;

    this.selected = false;

    this.currentlyWhere = {
      difficulty: "",
      problem: 0,
    };
    this.solvedProblems = {
      easy: [],
      medium: [],
      hard: [],
    };
    this.currentlySolving = {
      easy: {},
      medium: {},
      hard: {},
    };
  }
}

export const secondIntoMinTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  // Convert to MM:SS format
  const m = mins.toString();
  const s = secs < 10 ? "0" + secs : secs.toString();

  return `${m}:${s}`;
};

export function timeOut() {
  // bs time and leaderboard rhgya and then designing
}

let timerId = null; // <-- Global ya outer scope me rakho
let time = 0;

export function startTimer(element, previosTime = 0) {
  time = previosTime;

  timerId = setInterval(() => {
    element.textContent = `Time: ${secondIntoMinTime(time)}`;
    time++;
  }, 1000);
}

// this function is only used when userClicks on showHints button
export function getUsersCurrentSolvingTime() {
  return time;
}

export function stopTimer() {
  clearInterval(timerId);
  return time;
}

export const difficultyTexts = {
  easy: "Basic level problems for warm-up and quick practice.",
  medium: "Balanced difficulty to improve problem-solving skills.",
  hard: "Challenging problems for advanced preparation.",
};

// debounce function
export function Debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

//getting problems data --
export const getProblemsData = async (level) => {
  switch (level) {
    case "easy":
      let easyProblems = await import("./problems/easyProblems.js");
      return easyProblems.easyProblems;
    case "medium":
      let mediumProblems = await import("./problems/mediumProblems.js");
      return mediumProblems.mediumProblems;
    case "hard":
      let hardProblems = await import("./problems/hardProblems.js");
      return hardProblems.hardProblems;
    default:
      break;
  }
};

// creating default option for select name
export const createDefaultOption = () => {
  let option = document.createElement("option");
  option.setAttribute("disabled", "");
  option.setAttribute("selected", "");
  option.value = "";
  option.textContent = "-- Select your name --";
  return option;
};

// getting problem status modal
let problemStatus = new bootstrap.Modal(
  document.getElementById("problem-status"),
  {
    backdrop: "static",
    keyboard: false,
  }
);
// hide and show user adding modal
export const hideProblemStatusModal = () => {
  document.activeElement.blur();
  problemStatus.hide();
};
export const showProblemStatusModal = () => {
  document.activeElement.blur();
  problemStatus.show();
};

// getting form modal
let nameFormModal = new bootstrap.Modal(document.getElementById("name-form"), {
  backdrop: "static",
  keyboard: false,
});
// hide and show user adding modal
export const hideUserAddingModal = () => {
  document.activeElement.blur();
  nameFormModal.hide();
};
export const showUserAddingModal = () => {
  document.activeElement.blur();
  nameFormModal.show();
};

// getting form modal
let editUsersModal = new bootstrap.Modal(
  document.getElementById("editUserModal"),
  {
    backdrop: "static",
    keyboard: false,
  }
);
// hide and show user adding modal
export const hideEditUserModal = () => {
  document.activeElement.blur();
  editUsersModal.hide();
};
export const showEditUserModal = () => {
  document.activeElement.blur();
  editUsersModal.show();
};

// getting leaderBoardModal
let leaderBoardModal = new bootstrap.Modal(
  document.getElementById("leaderBoardModal"),
  {
    backdrop: "static",
    keyboard: false,
  }
);
// hide and show user adding modal
export const hideLeaderBoardModal = () => {
  document.activeElement.blur();
  leaderBoardModal.hide();
};
export const showLeaderBoardModal = () => {
  document.activeElement.blur();
  leaderBoardModal.show();
};

