const streakText = document.getElementById("streakText");
const flame = document.getElementById("flame");
const timerDisplay = document.getElementById("timerDisplay");


const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const pauseButton = document.getElementById("pause");

const adicionarTask = document.getElementById("adicionarTask");
const taskList = document.getElementById("taskList");
const historyList = document.getElementById("historyList");

let rodando = false;
let timer = null;
let segundosPassados = 0;


function atualizarDisplay() {
    const minutos = Math.floor(segundosPassados / 60);
    const segundos = segundosPassados % 60;

    timerDisplay.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

function cronometro(){
    segundosPassados += 1;
    atualizarDisplay();
}

function startCronometro(){
    if (rodando) return;

    rodando = true;
    timer = setInterval(cronometro, 1000);
}


function pauseCronometro(){
    clearInterval(timer);
    timer = null;
    rodando = false;
}

function stopCronometro(){
    clearInterval(timer);
    timer = null;
    rodando = false;
    segundosPassados = 0;
    atualizarDisplay();
}

startButton.addEventListener("click", startCronometro);
pauseButton.addEventListener("click", pauseCronometro);
stopButton.addEventListener("click", stopCronometro);

atualizarDisplay();
