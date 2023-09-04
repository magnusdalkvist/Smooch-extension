let toggleButton = document.querySelector("#toggleTimer");
let resetButton = document.querySelector("#resetTimer");
let inputTime = document.querySelector("input[type='number']");
let timerRunning = false;

inputTime.addEventListener("change", () => {
  resetTimer(inputTime.value);
});

chrome.storage.local.get("timerSeconds").then((data) => {
  inputTime.value = data.timerSeconds;
});

toggleButton.addEventListener("click", () => {
  toggleTimer();
});

resetButton.addEventListener("click", () => {
  resetTimer(inputTime.value);
});

function toggleTimer() {
  if (timerRunning) {
    stopTimer();
  } else {
    startTimer();
  }
  timerRunning = !timerRunning;
}

function startTimer() {
  chrome.runtime.sendMessage({ message: "startTimer" });
  toggleButton.innerHTML = "Stop Timer";
}

function stopTimer() {
  chrome.runtime.sendMessage({ message: "stopTimer" });
  toggleButton.innerHTML = "Start Timer";
}

function resetTimer(resetSeconds) {
  chrome.runtime.sendMessage({ message: "resetTimer", seconds: resetSeconds });
  toggleButton.innerHTML = "Start Timer";
  timerRunning = false;
}

// get updates from chrome api when storage changes
chrome.storage.onChanged.addListener(function (changes) {
  inputTime.value = changes.timerSeconds.newValue;
});
