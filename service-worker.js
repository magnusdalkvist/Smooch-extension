let timer;
let timerSeconds;

function startTimer() {
  timer = setInterval(() => {
    timerSeconds--;
    if (timerSeconds <= 0) {
      timerSeconds = 0;
      clearInterval(timer);
    }
    console.log(timerSeconds);
    chrome.storage.local.set({ timerSeconds: timerSeconds });
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer(resetSeconds) {
  clearInterval(timer);
  timerSeconds = resetSeconds;
  chrome.storage.local.set({ timerSeconds: timerSeconds });
}

//fetch message from chrome api
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  if (request.message === "startTimer") {
    startTimer();
  } else if (request.message === "stopTimer") {
    stopTimer();
  } else if (request.message === "resetTimer") {
    resetTimer(request.seconds);
  }
});
