const streakText = document.getElementById("streakText");
const flame = document.getElementById("flame");
const timerDisplay = document.getElementById("timerDisplay");

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const durationButtons = document.querySelectorAll(".botaoDuracao");

const adicionarTask = document.getElementById("adicionarTask");
const taskList = document.getElementById("taskList");
const historyList = document.getElementById("historyList");

let selectedMinutes = 0.2;
let remainingSeconds = selectedMinutes * 60;
let timerInterval = null;
let isRunning = false;

function updateTimerDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function tickTimer() {
  remainingSeconds -= 1;
  updateTimerDisplay();

  if (remainingSeconds <= 0) {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    alert("Runfou");
  }
}

function startTimer() {
  if (isRunning) return;

  if (remainingSeconds <= 0) {
    remainingSeconds = selectedMinutes * 60;
  }

  isRunning = true;
  timerInterval = setInterval(tickTimer, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;
  remainingSeconds = selectedMinutes * 60;
  updateTimerDisplay();
}

function selectDuration(minutes) {
  if (isRunning) return;

  selectedMinutes = minutes;
  remainingSeconds = selectedMinutes * 60;
  updateTimerDisplay();
}

function handleDurationButtonClick(event) {
  const button = event.target;
  const minutes = Number(button.textContent);

  selectDuration(minutes);
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);

for (let i = 0; i < durationButtons.length; i++) {
  durationButtons[i].addEventListener("click", handleDurationButtonClick);
}

updateTimerDisplay();
