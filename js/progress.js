const days = {
    "Sunday": "SO",
    "Monday": "MO",
    "Tuesday": "DI",
    "Wednesday": "MI",
    "Thursday": "DO",
    "Friday": "FR",
    "Saturday": "SA"
}

document.addEventListener("DOMContentLoaded", async () => {
    const [row1, row2, row3] = document.querySelectorAll(".kalender-box tr");

    const data = await getProgress();

    for (let i = 0; i < 7; i++) {
        const date = moment().subtract(6-i, 'days');
        const entry = data.find(e => e.Datum == date.format("YYYY-MM-DD"));

        row1.children[i].textContent = days[date.format("dddd")];
        row2.children[i].textContent = date.format("DD.MM");
        row3.children[i].textContent = entry?.Erledigt == 2 ? "😊" : "😞";
    }


    const statusText = document.querySelector(".status-text p strong");
    statusText.textContent = claculateStreak(data) + " Tage am Stück erledigt!";
});

async function getProgress() {
    const response = await fetch("api/getProgress.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch progress data");
    }

    return await response.json();
}

function claculateStreak(data) {
    const date = moment();
    let streak = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].Datum == date.format("YYYY-MM-DD") && data[i].Erledigt == 2) {
            date.subtract(1, 'days');
            streak++;
        } else {
            break;
        }
    }

    return streak;
}