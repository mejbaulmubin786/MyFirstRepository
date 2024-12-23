let timerInterval;
let remainingTime = 0;
let isPaused = false;

const sound = document.getElementById("timer-sound");
const stopAlarmContainer = document.getElementById("stop-alarm-container");
const customRingtoneInput = document.getElementById("custom-ringtone");

// পেইজ লোড হওয়ার সাথে সাথে কাস্টম সাউন্ড সেট করা
window.onload = function () {
    const savedRingtone = localStorage.getItem("selectedRingtone");
    const savedCustomRingtone = localStorage.getItem("customRingtone");

    if (savedRingtone) {
        document.getElementById("ringtone").value = savedRingtone;
        changeRingtone();
    }

    if (savedCustomRingtone) {
        sound.src = savedCustomRingtone;
        document.getElementById("ringtone").value = "custom";
    }

    const savedVolume = localStorage.getItem("volumeLevel");
    if (savedVolume) {
        sound.volume = parseFloat(savedVolume);
        document.getElementById("volume").value = savedVolume;
    }
};

// Start Timer
function startTimer() {
    const hoursInput = document.getElementById("hours").value;
    const minutesInput = document.getElementById("minutes").value;
    const secondsInput = document.getElementById("seconds").value;
    const display = document.getElementById("timer-display");

    if (
        (!hoursInput && !minutesInput && !secondsInput) ||
        isNaN(hoursInput) ||
        isNaN(minutesInput) ||
        isNaN(secondsInput)
    ) {
        alert("Please enter valid time values.");
        return;
    }

    if (!isPaused) {
        const hours = parseInt(hoursInput) || 0;
        const minutes = parseInt(minutesInput) || 0;
        const seconds = parseInt(secondsInput) || 0;
        remainingTime = hours * 3600 + minutes * 60 + seconds; // Convert to seconds
    }

    clearInterval(timerInterval);
    updateDisplay(display);

    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateDisplay(display);
        } else {
            clearInterval(timerInterval);
            playSound();
            alert("Time's up! Kaizen accomplished!");
        }
    }, 1000);

    isPaused = false;
}

// Update Timer Display
function updateDisplay(display) {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    display.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Pause Timer
function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
}

// Reset Timer
function resetTimer() {
    clearInterval(timerInterval);
    remainingTime = 0;
    isPaused = false;
    document.getElementById("timer-display").textContent = "00:00:00";
    stopAlarm(); // Stop alarm if running
}

// Play Sound
function playSound() {
    if (sound.src) {
        sound.currentTime = 0;
        sound.play();
        stopAlarmContainer.style.display = "block"; // Show Stop Alarm button
    } else {
        alert("Please select a ringtone.");
    }
}

// Stop Alarm
function stopAlarm() {
    sound.pause();
    sound.currentTime = 0; // Reset audio to start
    stopAlarmContainer.style.display = "none"; // Hide Stop Alarm button
}

// Change Ringtone
function changeRingtone() {
    const ringtone = document.getElementById("ringtone").value;

    localStorage.setItem("selectedRingtone", ringtone); // Save selected ringtone

    if (ringtone === "default") {
        sound.src = "https://www.soundjay.com/button/beep-07.wav";
    } else if (ringtone === "alarm") {
        sound.src = "https://www.soundjay.com/button/beep-09.wav";
    } else if (ringtone === "chime") {
        sound.src = "https://www.soundjay.com/misc/bell-chime-01.wav";
    } else if (ringtone === "custom") {
        customRingtoneInput.style.display = "inline";
    } else {
        customRingtoneInput.style.display = "none";
    }
}

// Upload Custom Ringtone
function uploadRingtone(input) {
    if (input.files && input.files[0]) {
        const fileURL = URL.createObjectURL(input.files[0]);
        sound.src = fileURL;
        customRingtoneInput.style.display = "none";

        localStorage.setItem("customRingtone", fileURL); // Save custom ringtone
        localStorage.setItem("selectedRingtone", "custom"); // Set "custom" as selected
    }
}

// Adjust Volume
function adjustVolume(value) {
    sound.volume = value;
    localStorage.setItem("volumeLevel", value); // Save volume level
}
