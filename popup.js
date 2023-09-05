let toggleButton = document.querySelector("#toggleTimer");
let resetButton = document.querySelector("#resetTimer");
let inputTime = document.querySelector("input[type='number']");
let timerRunning = false;

chrome.storage.local.get("timerRunning").then((data) => {
  timerRunning = data.timerRunning;
  if (timerRunning) {
    toggleButton.innerHTML = "Stop Timer";
    inputTime.disabled = true;
  } else {
    toggleButton.innerHTML = "Start Timer";
    inputTime.disabled = false;
  }
});

inputTime.addEventListener("change", () => {
  resetTimer(inputTime.value);
});

inputTime.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    if (!timerRunning) {
      event.preventDefault();
      startTimer();
    }
  }
});

chrome.storage.local.get("timerSeconds").then((data) => {
  inputTime.value = data.timerSeconds;
});

toggleButton.addEventListener("click", () => {
  toggleTimer();
});

resetButton.addEventListener("click", () => {
  resetTimer();
});

function toggleTimer() {
  if (timerRunning) {
    stopTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  chrome.runtime.sendMessage({ message: "startTimer" });
  toggleButton.innerHTML = "Stop Timer";
  timerRunning = true;
  inputTime.disabled = true;
}

function stopTimer() {
  chrome.runtime.sendMessage({ message: "stopTimer" });
  toggleButton.innerHTML = "Start Timer";
  timerRunning = false;
  inputTime.disabled = false;
}

function resetTimer(seconds) {
  chrome.runtime.sendMessage({ message: "resetTimer", seconds: seconds });
  toggleButton.innerHTML = "Start Timer";
  timerRunning = false;
  inputTime.disabled = false;
}

// get updates from chrome api when storage changes
chrome.storage.onChanged.addListener(function (changes) {
  if (changes.timerSeconds) {
    inputTime.value = changes.timerSeconds.newValue;
  }
});
