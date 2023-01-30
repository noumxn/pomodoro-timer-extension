const pomodoroDuration = 25 * 60; // 25 minutes in seconds
const startTimeKey = "pomodoroStartTime";
let timerInterval;

function startTimer() {
  let startTime = localStorage.getItem(startTimeKey);
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem(startTimeKey, startTime);
  }
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const timeLeft = pomodoroDuration - elapsedTime;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").innerHTML = "Time's up!";
    } else {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById("timer").innerHTML = `${minutes}:${seconds}`;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  localStorage.removeItem(startTimeKey);
  startTimer();
}

document.addEventListener("DOMContentLoaded", () => {
  startTimer();
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", resetTimer);
});
