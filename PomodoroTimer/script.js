let timerInterval;
let isRunning = false;
let isBreak = false;
let workTime = 25 * 60; // Default work time in seconds
let breakTime = 5 * 60; // Default break time in seconds
let timeLeft = workTime;
let sessionCount = 0;

let focusSound;
let breakSound;

const timeDisplay = document.getElementById("time-display");
const statusText = document.getElementById("status-text");
const sessionCountDisplay = document.getElementById("session-count");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const applySettingsButton = document.getElementById("apply-settings");
const workTimeInput = document.getElementById("work-time");
const breakTimeInput = document.getElementById("break-time");
const focusSoundInput = document.getElementById("focus-sound");
const breakSoundInput = document.getElementById("break-sound");

focusSoundInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    focusSound = new Audio(URL.createObjectURL(file));
  }
});

breakSoundInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    breakSound = new Audio(URL.createObjectURL(file));
  }
});

// Start the timer
startButton.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
});

// Pause the timer
pauseButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
});

// Reset the timer
resetButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
  isBreak = false;
  timeLeft = workTime;
  updateDisplay();
  statusText.textContent = "Time to Focus!";
});

// Update the timer every second
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    isBreak = !isBreak;

    if (isBreak) {
      if (breakSound) breakSound.play();
      timeLeft = breakTime;
      statusText.textContent = "Time for a Break!";
    } else {
      if (focusSound) focusSound.play();
      timeLeft = workTime;
      sessionCount++;
      sessionCountDisplay.textContent = sessionCount;
      statusText.textContent = "Time to Focus!";
    }

    timerInterval = setInterval(updateTimer, 1000);
  }
}

// Update the timer display
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Apply settings for work and break times
applySettingsButton.addEventListener("click", () => {
  workTime = parseInt(workTimeInput.value) * 60 || 25 * 60;
  breakTime = parseInt(breakTimeInput.value) * 60 || 5 * 60;
  resetButton.click(); // Reset the timer with new settings
});
