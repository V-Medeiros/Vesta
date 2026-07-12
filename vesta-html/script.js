const STORAGE_KEYS = {
    tasks: "vesta_tasks",
    sessions: "vesta_sessions",
    streak: "vesta_streak",
    settings: "vesta_settings",
};

const streakText = document.getElementById("streakText");
const flame = document.getElementById("flame");
const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const pauseButton = document.getElementById("pause");
const durationButtons = document.querySelectorAll(".botaoDuracao");
const adicionarTask = document.getElementById("adicionarTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const historyList = document.getElementById("historyList");
const daySessions = document.getElementById("daySessions");

let tasks = loadData(STORAGE_KEYS.tasks, []);
let sessions = loadData(STORAGE_KEYS.sessions, []);
let streak = loadData(STORAGE_KEYS.streak, {
    current: 0,
    lastSessionDate: null,
    longestEver: 0,
});
let settings = loadData(STORAGE_KEYS.settings, {
    defaultDuration: 25,
    soundEnabled: false,
});

let selectedTaskId = null;
let tempoSelecionado = settings.defaultDuration;
let segundosRestantes = tempoSelecionado * 60;
let rodando = false;
let timer = null;
let sessionStartedAt = null;
let sessionEndsAt = null;

function loadData(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        console.warn(`Nao foi possivel ler ${key}`, error);
        return fallback;
    }
}

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function saveAll() {
    saveData(STORAGE_KEYS.tasks, tasks);
    saveData(STORAGE_KEYS.sessions, sessions);
    saveData(STORAGE_KEYS.streak, streak);
    saveData(STORAGE_KEYS.settings, settings);
}

function createId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function getLocalDate(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function addDays(date, amount) {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + amount);
    return nextDate;
}

function formatTime(isoDate) {
    return new Date(isoDate).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function atualizarDisplay() {
    const minutos = Math.floor(segundosRestantes / 60);
    const segundos = segundosRestantes % 60;
    timerDisplay.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

function renderStreak() {
    updateStreakForToday();
    streakText.textContent = `${streak.current} dia${streak.current === 1 ? "" : "s"}`;
}

function updateStreakForToday() {
    const today = getLocalDate();

    if (!streak.lastSessionDate) {
        streak.current = 0;
        saveData(STORAGE_KEYS.streak, streak);
        return;
    }

    const yesterday = getLocalDate(addDays(new Date(), -1));
    const streakIsActive = streak.lastSessionDate === today || streak.lastSessionDate === yesterday;

    if (!streakIsActive) {
        streak.current = 0;
        saveData(STORAGE_KEYS.streak, streak);
    }
}

function updateStreakAfterCompletedSession(sessionDate) {
    const yesterday = getLocalDate(addDays(new Date(`${sessionDate}T12:00:00`), -1));

    if (streak.lastSessionDate === sessionDate) {
        return;
    }

    if (streak.lastSessionDate === yesterday) {
        streak.current += 1;
    } else {
        streak.current = 1;
    }

    streak.lastSessionDate = sessionDate;
    streak.longestEver = Math.max(streak.longestEver, streak.current);
}

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-state";
        emptyItem.textContent = "Nenhuma tarefa criada ainda.";
        taskList.appendChild(emptyItem);
        return;
    }

    tasks.forEach(function(task) {
        const item = document.createElement("li");
        item.className = "task-item";

        if (task.completed) {
            item.classList.add("completed");
        }

        if (task.id === selectedTaskId) {
            item.classList.add("selected");
        }

        const selectButton = document.createElement("button");
        selectButton.type = "button";
        selectButton.className = "task-select";
        selectButton.textContent = task.text;
        selectButton.addEventListener("click", function() {
            selectedTaskId = selectedTaskId === task.id ? null : task.id;
            renderTasks();
        });

        const meta = document.createElement("span");
        meta.className = "task-meta";
        meta.textContent = `${task.sessionsCount} sessoes`;

        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.className = "task-action";
        completeButton.textContent = task.completed ? "Reabrir" : "Concluir";
        completeButton.addEventListener("click", function() {
            task.completed = !task.completed;
            task.updatedAt = new Date().toISOString();
            saveData(STORAGE_KEYS.tasks, tasks);
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "task-action danger";
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", function() {
            const shouldDelete = confirm(`Excluir a tarefa "${task.text}"?`);
            if (!shouldDelete) return;

            tasks = tasks.filter(function(currentTask) {
                return currentTask.id !== task.id;
            });

            if (selectedTaskId === task.id) {
                selectedTaskId = null;
            }

            saveData(STORAGE_KEYS.tasks, tasks);
            renderTasks();
            renderHistory();
        });

        item.append(selectButton, meta, completeButton, deleteButton);
        taskList.appendChild(item);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const now = new Date().toISOString();
    const task = {
        id: createId("task"),
        text,
        completed: false,
        sessionsCount: 0,
        createdAt: now,
        updatedAt: now,
    };

    tasks.unshift(task);
    selectedTaskId = task.id;
    taskInput.value = "";
    saveData(STORAGE_KEYS.tasks, tasks);
    renderTasks();
}

function saveSession(status) {
    const now = new Date();
    const endedAt = now.toISOString();
    const startedAt = sessionStartedAt || endedAt;
    const sessionDate = getLocalDate(now);
    const session = {
        id: createId("session"),
        date: sessionDate,
        durationMinutes: tempoSelecionado,
        taskId: selectedTaskId,
        status,
        startedAt,
        endedAt,
    };

    sessions.unshift(session);

    if (status === "completed") {
        const task = tasks.find(function(currentTask) {
            return currentTask.id === selectedTaskId;
        });

        if (task) {
            task.sessionsCount += 1;
            task.updatedAt = endedAt;

            const shouldCompleteTask = confirm(`Sessao concluida. Marcar "${task.text}" como concluida?`);
            if (shouldCompleteTask) {
                task.completed = true;
            }
        } else {
            alert("Sessao concluida.");
        }

        updateStreakAfterCompletedSession(sessionDate);
    }

    saveAll();
    renderAll();
}

function temporizador() {
    const remainingMilliseconds = Math.max(0, sessionEndsAt - Date.now());
    segundosRestantes = Math.ceil(remainingMilliseconds / 1000);
    atualizarDisplay();

    if (segundosRestantes <= 0) {
        clearInterval(timer);
        rodando = false;
        timer = null;
        saveSession("completed");
        resetTimer();
        updateFlameState();
    }
}

function startTemporizador() {
    if (rodando) return;

    if (segundosRestantes <= 0) {
        segundosRestantes = tempoSelecionado * 60;
    }

    sessionStartedAt = sessionStartedAt || new Date().toISOString();
    sessionEndsAt = Date.now() + segundosRestantes * 1000;
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
}

function resetTimer() {
    sessionStartedAt = null;
    sessionEndsAt = null;
    segundosRestantes = tempoSelecionado * 60;
    atualizarDisplay();
}

function stopTemporizador() {
    if (rodando || sessionStartedAt) {
        const shouldStop = confirm("Abandonar esta sessao?");
        if (!shouldStop) return;

        saveSession("abandoned");
    }

    clearInterval(timer);
    rodando = false;
    timer = null;
    resetTimer();
}

function selecionarDuracao(minutos) {
    if (rodando || sessionStartedAt) return;

    tempoSelecionado = minutos;
    segundosRestantes = tempoSelecionado * 60;
    settings.defaultDuration = minutos;
    saveData(STORAGE_KEYS.settings, settings);
    atualizarDisplay();
    highlightSelectedDuration();
}

function highlightSelectedDuration() {
    durationButtons.forEach(function(button) {
        const minutes = Number(button.textContent);
        button.classList.toggle("selected", minutes === tempoSelecionado);
    });
}

function manterBotaoDuracao(event) {
    const button = event.target;
    const minutos = Number(button.textContent);
    selecionarDuracao(minutos);
}

function getTaskName(taskId) {
    const task = tasks.find(function(currentTask) {
        return currentTask.id === taskId;
    });

    return task ? task.text : "Sem tarefa";
}

function renderHistory() {
    historyList.innerHTML = "";

    for (let index = 13; index >= 0; index -= 1) {
        const date = addDays(new Date(), -index);
        const dateKey = getLocalDate(date);
        const daySessionsList = sessions.filter(function(session) {
            return session.date === dateKey;
        });
        const hasCompleted = daySessionsList.some(function(session) {
            return session.status === "completed";
        });
        const hasAbandoned = daySessionsList.some(function(session) {
            return session.status === "abandoned";
        });

        const dayButton = document.createElement("button");
        dayButton.type = "button";
        dayButton.className = "history-day";
        dayButton.title = date.toLocaleDateString("pt-BR");
        dayButton.textContent = String(date.getDate()).padStart(2, "0");

        if (hasCompleted) {
            dayButton.classList.add("lit");
        } else if (hasAbandoned) {
            dayButton.classList.add("ash");
        }

        dayButton.addEventListener("click", function() {
            renderDaySessions(dateKey, daySessionsList);
        });

        historyList.appendChild(dayButton);
    }
}

function renderDaySessions(dateKey, daySessionsList) {
    daySessions.innerHTML = "";

    const title = document.createElement("h3");
    title.textContent = new Date(`${dateKey}T12:00:00`).toLocaleDateString("pt-BR");
    daySessions.appendChild(title);

    if (daySessionsList.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "Nenhuma sessao registrada neste dia.";
        daySessions.appendChild(empty);
        return;
    }

    const list = document.createElement("ul");
    daySessionsList.forEach(function(session) {
        const item = document.createElement("li");
        const status = session.status === "completed" ? "concluida" : "abandonada";
        item.textContent = `${formatTime(session.startedAt)} - ${session.durationMinutes} min - ${getTaskName(session.taskId)} - ${status}`;
        list.appendChild(item);
    });

    daySessions.appendChild(list);
}

function updateFlameState() {
    flame.classList.toggle("running", rodando);
    flame.classList.toggle("paused", !rodando && Boolean(sessionStartedAt));
}

function renderAll() {
    renderStreak();
    renderTasks();
    renderHistory();
    highlightSelectedDuration();
    updateFlameState();
}

startButton.addEventListener("click", function() {
    startTemporizador();
    updateFlameState();
});
pauseButton.addEventListener("click", function() {
    pauseTemporizador();
    updateFlameState();
});
stopButton.addEventListener("click", function() {
    stopTemporizador();
    updateFlameState();
});
adicionarTask.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

durationButtons.forEach(function(button) {
    button.addEventListener("click", manterBotaoDuracao);
});

atualizarDisplay();
renderAll();
