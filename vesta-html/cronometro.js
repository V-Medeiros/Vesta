const flame = document.getElementById("flame");
const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const pauseButton = document.getElementById("pause");

let rodando = false;
let timer = null;
let segundosPassados = 0;

function atualizarDisplay() {
    const minutos = Math.floor(segundosPassados / 60);
    const segundos = segundosPassados % 60;
    timerDisplay.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

function updateFlameState() {
    flame.classList.toggle("running", rodando);
    flame.classList.toggle("paused", !rodando && segundosPassados > 0);
}

function cronometro() {
    segundosPassados += 1;
    atualizarDisplay();
}

function startCronometro() {
    if (rodando) return;

    rodando = true;
    timer = setInterval(cronometro, 1000);
    updateFlameState();
}

function pauseCronometro() {
    clearInterval(timer);
    timer = null;
    rodando = false;
    updateFlameState();
}

function stopCronometro() {
    clearInterval(timer);
    timer = null;
    rodando = false;
    segundosPassados = 0;
    atualizarDisplay();
    updateFlameState();
}

startButton.addEventListener("click", startCronometro);
pauseButton.addEventListener("click", pauseCronometro);
stopButton.addEventListener("click", stopCronometro);

atualizarDisplay();
updateFlameState();
