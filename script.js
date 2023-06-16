var stopwatchInterval;
var stopwatchStartTime;
var stopwatchElapsedTime = 0;
var isStopwatchRunning = false;

var timerInterval;
var timerStartTime;
var timerEndTime;
var isTimerRunning = false;

function startStopwatch() {
    if (!isStopwatchRunning) {
        stopwatchStartTime = Date.now() - stopwatchElapsedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10);
        isStopwatchRunning = true;
    }
}

function pauseStopwatch() {
    if (isStopwatchRunning) {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    isStopwatchRunning = false;
    stopwatchElapsedTime = 0;
    updateStopwatchDisplay(stopwatchElapsedTime);
}

function updateStopwatch() {
    var currentElapsedTime = Date.now() - stopwatchStartTime;
    stopwatchElapsedTime = currentElapsedTime;
    updateStopwatchDisplay(stopwatchElapsedTime);
}

function updateStopwatchDisplay(elapsedTime) {
    var milliseconds = Math.floor(elapsedTime % 1000 / 10);
    var seconds = Math.floor(elapsedTime / 1000 % 60);
    var minutes = Math.floor(elapsedTime / 1000 / 60 % 60);
    var hours = Math.floor(elapsedTime / 1000 / 60 / 60);

    var display = document.getElementById("stopwatch-display");
    display.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds) + "." + formatTime(milliseconds);
}

function startTimer() {
    if (!isTimerRunning) {
        var hoursInput = document.getElementById("hours").value;
        var minutesInput = document.getElementById("minutes").value;
        var secondsInput = document.getElementById("seconds").value;

        var totalMilliseconds = calculateTotalMilliseconds(hoursInput, minutesInput, secondsInput);

        if (totalMilliseconds > 0) {
            timerStartTime = Date.now();
            timerEndTime = timerStartTime + totalMilliseconds;

            timerInterval = setInterval(updateTimer, 100);
            isTimerRunning = true;
        }
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    updateTimerDisplay(0);

    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
}

function updateTimer() {
    var remainingMilliseconds = timerEndTime - Date.now();

    if (remainingMilliseconds <= 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        updateTimerDisplay(0);
        alert("Time is up!");
        return;
    }

    updateTimerDisplay(remainingMilliseconds);
}

function updateTimerDisplay(remainingMilliseconds) {
    var hours = Math.floor(remainingMilliseconds / 3600000);
    var minutes = Math.floor((remainingMilliseconds % 3600000) / 60000);
    var seconds = Math.floor((remainingMilliseconds % 60000) / 1000);

    var display = document.getElementById("timer-display");
    display.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
}

function formatTime(time) {
    return time.toString().padStart(2, "0");
}

function calculateTotalMilliseconds(hours, minutes, seconds) {
    var totalHours = parseInt(hours) || 0;
    var totalMinutes = parseInt(minutes) || 0;
    var totalSeconds = parseInt(seconds) || 0;

    return (totalHours * 3600 + totalMinutes * 60 + totalSeconds) * 1000;
}
