const monthlyList = document.getElementById("monthlyList");
const sessions = loadSessions();

function loadSessions() {
    try {
        return JSON.parse(localStorage.getItem("vesta_sessions")) || [];
    } catch (error) {
        console.warn("Nao foi possivel carregar as sessoes.", error);
        return [];
    }
}

function getMonthLabel(monthKey) {
    const [year, month] = monthKey.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);

    return date.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
    });
}

function formatMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) {
        return `${minutes} min`;
    }

    return `${hours}h ${String(minutes).padStart(2, "0")}min`;
}

function getMonthlyTotals() {
    return sessions
        .filter(function(session) {
            return session.status === "completed";
        })
        .reduce(function(totals, session) {
            const monthKey = session.date.slice(0, 7);
            totals[monthKey] = (totals[monthKey] || 0) + session.durationMinutes;
            return totals;
        }, {});
}

function renderMonthlyTotals() {
    const totals = getMonthlyTotals();
    const months = Object.keys(totals).sort().reverse();

    monthlyList.innerHTML = "";

    if (months.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-state";
        emptyItem.textContent = "Nenhuma sessao concluida ainda.";
        monthlyList.appendChild(emptyItem);
        return;
    }

    months.forEach(function(monthKey) {
        const item = document.createElement("li");
        const label = document.createElement("span");
        const total = document.createElement("strong");

        label.textContent = getMonthLabel(monthKey);
        total.textContent = formatMinutes(totals[monthKey]);

        item.append(label, total);
        monthlyList.appendChild(item);
    });
}

renderMonthlyTotals();
