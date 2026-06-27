const streakText = document.getElementById("streakText");
const flame = document.getElementById("flame");
const timerDisplay = document.getElementById("timerDisplay");


const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const pauseButton = document.getElementById("pause");
const durationButtons = document.querySelectorAll(".botaoDuracao");

const adicionarTask = document.getElementById("adicionarTask");
const taskList = document.getElementById("taskList");
const historyList = document.getElementById("historyList");

let tempoSelecionado = 25;
let segundosRestantes = tempoSelecionado * 60;
let rodando = false;
let timer = null;


function atualizarDisplay() {
    const minutos = Math.floor(segundosRestantes / 60);
    const segundos = segundosRestantes % 60;

    timerDisplay.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

function temporizador() {
    segundosRestantes -= 1;
    atualizarDisplay();

    if (segundosRestantes <= 0) {
        clearInterval(timer);
        rodando = false;
        timer = null;
        alert("funcionou");
    }
}

function startTemporizador() {
    if (rodando) return;

    if (segundosRestantes <= 0) {
        segundosRestantes = tempoSelecionado * 60;
    }

    rodando = true;
    timer = setInterval(temporizador, 1000);
}

function pauseTemporizador() {
    clearInterval(timer);
    timer = null;
    rodando = false;
}

function stopTemporizador() {
    clearInterval(timer);
    rodando = false;
    timer = null;
    segundosRestantes = tempoSelecionado * 60;
    atualizarDisplay();
}

function selecionarDuracao(minutos) {
    if (rodando) return;

    tempoSelecionado = minutos;
    segundosRestantes = tempoSelecionado * 60;
    atualizarDisplay();
}

function manterBotaoDuracao(event) {
    const button = event.target;
    const minutos = Number(button.textContent);

    selecionarDuracao(minutos);
}

startButton.addEventListener("click", startTemporizador);
pauseButton.addEventListener("click", pauseTemporizador);
stopButton.addEventListener("click", stopTemporizador);

durationButtons.forEach(function(button) {
  button.addEventListener("click", manterBotaoDuracao);
});

atualizarDisplay();
