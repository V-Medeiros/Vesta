const flame = document.getElementById("flame");
const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const pauseButton = document.getElementById("pause");
const durationButtons = document.querySelectorAll(".botaoDuracao");

let tempoSelecionado = 15;
let segundosRestantes = tempoSelecionado * 60;
let rodando = false;
let timer = null;
let timerEndsAt = null;

function atualizarDisplay() {
    const minutos = Math.floor(segundosRestantes / 60);
    const segundos = segundosRestantes % 60;
    timerDisplay.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

function updateFlameState() {
    flame.classList.toggle("running", rodando);
    flame.classList.toggle("paused", !rodando && segundosRestantes < tempoSelecionado * 60);
}

function highlightSelectedDuration() {
    durationButtons.forEach(function(button) {
        const minutes = Number(button.textContent);
        button.classList.toggle("selected", minutes === tempoSelecionado);
    });
}

function resetTimer() {
    timerEndsAt = null;
    segundosRestantes = tempoSelecionado * 60;
    atualizarDisplay();
    updateFlameState();
}

function temporizador() {
    const remainingMilliseconds = Math.max(0, timerEndsAt - Date.now());
    segundosRestantes = Math.ceil(remainingMilliseconds / 1000);
    atualizarDisplay();

    if (segundosRestantes <= 0) {
        clearInterval(timer);
        timer = null;
        rodando = false;
        alert("Sessao concluida.");
        resetTimer();
    }

    updateFlameState();
}

function startTemporizador() {
    if (rodando) return;

    if (segundosRestantes <= 0) {
        segundosRestantes = tempoSelecionado * 60;
    }

    timerEndsAt = Date.now() + segundosRestantes * 1000;
    rodando = true;
    timer = setInterval(temporizador, 250);
    temporizador();
}

function pauseTemporizador() {
    if (!rodando) return;

    clearInterval(timer);
    timer = null;
    rodando = false;
    temporizador();
    updateFlameState();
}

function stopTemporizador() {
    clearInterval(timer);
    timer = null;
    rodando = false;
    resetTimer();
}

function selecionarDuracao(minutos) {
    if (rodando || segundosRestantes < tempoSelecionado * 60) return;

    tempoSelecionado = minutos;
    resetTimer();
    highlightSelectedDuration();
}

durationButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        selecionarDuracao(Number(button.textContent));
    });
});

startButton.addEventListener("click", startTemporizador);
pauseButton.addEventListener("click", pauseTemporizador);
stopButton.addEventListener("click", stopTemporizador);

atualizarDisplay();
highlightSelectedDuration();
updateFlameState();
