let timer;
let timerSeconds = 600;

function startTimer() {
  timer = setInterval(() => {
    timerSeconds--;
    if (timerSeconds <= 0) {
      timerSeconds = 0;
      clearInterval(timer);
      // hitZero();
    }
    console.log(timerSeconds);
    chrome.storage.local.set({ timerSeconds: timerSeconds });
    chrome.storage.local.set({ timerRunning: true });
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  chrome.storage.local.set({ timerRunning: false });
}

function resetTimer(resetSeconds) {
  clearInterval(timer);
  timerSeconds = resetSeconds || 600;
  chrome.storage.local.set({ timerSeconds: timerSeconds });
  chrome.storage.local.set({ timerRunning: false });
}

// async function hitZero() {
//   chrome.declarativeNetRequest.updateEnabledRulesets({
//     enableRulesetIds: ["block_videos"],
//   });
//   console.log("enabled rule");
//   // wait 5 seconds and disable the rule (loop )
//   // setTimeout(() => {
//   //   chrome.declarativeNetRequest.updateEnabledRulesets({
//   //     disableRulesetIds: ["block_videos"],
//   //   });
//   //   console.log("disabled rule");
//   //   setTimeout(() => {
//   //     hitZero();
//   //   }, 5000);
//   // }, 5000);
// }

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
