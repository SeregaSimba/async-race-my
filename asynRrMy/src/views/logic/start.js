import {
  driveEngine,
  startEngine,
  stopEngine,
  fetchWinners,
  createWinner,
  updateWinner,
} from "../../services/api";

const raceState = {};

function startAll() {
  const sectionCar = document.querySelectorAll(".carSvg");
  const promises = [];

  sectionCar.forEach((car) => {
    const id = Number(car.dataset.id);
    const promise = startEngine(id)
      .then(() => {
        console.log("Все машинки завелись:", id);
      })
      .catch((err) => {
        console.error("ошибка при запуске всех машинок", err);
      });
    promises.push(promise);
  });
  return Promise.all(promises);
}

async function startRace() {
  const sectionCar = document.querySelectorAll(".carSvg");
  const promise = [];
  const horizontalPosition = window.innerWidth;

  sectionCar.forEach((car) => {
    const id = Number(car.dataset.id);

    raceState[id] = {
      startTime: Date.now(),
      isBroken: false,
    };

    const p = driveEngine(id)
      .then((response) => {
        const durationMs = response.duration || 8000;
        const finishDistancePx = horizontalPosition - 500;
        console.log("Поехал id:", id, "доехал за:", durationMs, "ms");

        return moveCar(car, finishDistancePx, durationMs);
      })
      .then(() => {
        const finishTime = Date.now();

        raceState[id].finishTime = finishTime;
        raceState[id].duration = finishTime - raceState[id].startTime;
      })
      .catch((err) => {
        console.error("ошибка при заезде всех машинок", err, id);
        raceState[id].isBroken = true;

        car.style.borderColor = "red";
        car.style.backgroundColor = "lightcoral";
        highlightBroken(id);
      });
    promise.push(p);
  });
  await Promise.all(promise);
  determineWinner();
}

function moveCar(carEl, xDistancePx, durationMs) {
  carEl.style.transition = `transform: ${durationMs}ms linear`;
  carEl.style.transform = `translateX(${xDistancePx}px)`;

  return new Promise((res) => {
    setTimeout(() => res(), durationMs);
  });
}

function highlightBroken(id) {
  const brokenCar = document.querySelector(`.carSvg[data-id="${id}"]`);

  if (brokenCar) {
    brokenCar.style.transform = `rotate(${-5}deg)`;
    brokenCar.style.border = "1px solid red";
    brokenCar.style.backgroundColor = "lightcoral";
    brokenCar.innerHTML += " 💣 Сломалась";
  }
}

async function determineWinner() {
  const candidates = Object.entries(raceState).filter(([, data]) => {
    return data.finishTime && !data.isBroken;
  });

  if (candidates.length === 0) {
    console.log("Никто не финишировал");
    return;
  }

  const winners = candidates.reduce(
    (winners, [id, data]) => {
      if (winners.duration === undefined || data.duration < winners.duration) {
        return { id: id, duration: data.duration };
      }
      return winners;
    },
    { id: null, duration: undefined },
  );
  console.log("Победитель машина id:", winners.id, "в", winners.duration, "ms");

  highlightWinner(winners.id);

  await saveWinnerAfterRace({
    id: Number(winners.id),
    time: Math.round(winners.duration / 1000),
  });
}

function highlightWinner(id) {
  const winnerCar = document.querySelector(`.carSvg[data-id="${id}"]`);

  if (winnerCar) {
    winnerCar.style.border = "1px solid gold";
    winnerCar.style.backgroundColor = "rgba(255, 215, 0, 0.3)";
    winnerCar.innerHTML += " 🏆 Победитель";
  }
}

function stopRace() {
  const sectionCar = document.querySelectorAll(".carSvg");

  sectionCar.forEach((car) => {
    const id = Number(car.dataset.id);

    stopEngine(id)
      .then(() => {
        console.log("Все машинки остановлены:", id);
        resetCarStyles(car);
        resetCarBrokenStyles(car);
      })
      .catch((err) => {
        console.error("ошибка при остановке всех машинок", err, id);
      });
  });

  for (const id in raceState) {
    delete raceState[id];
  }
}

function resetCarStyles(carEl) {
  carEl.style.border = "";
  carEl.style.backgroundColor = "";
  carEl.innerHTML = carEl.innerHTML.replace(" 🏆 Победитель", "");
  carEl.style.transform = "translateX(0)";
}

function resetCarBrokenStyles(carEl) {
  carEl.style.border = "";
  carEl.style.backgroundColor = "";
  carEl.style.transform = "";
  carEl.innerHTML = carEl.innerHTML.replace(" 💣 Сломалась", "");
}

async function saveWinnerAfterRace({ id, time }) {
  const response = await fetchWinners(1, 100, "wins", "DESC");
  const existing = response.data.find((item) => item.id === id);

  if (existing) {
    return await updateWinner(id, {
      ...existing,
      wins: existing.wins + 1,
      time,
    });
  }

  return await createWinner({
    id,
    wins: 1,
    time,
  });
}

export { startAll, startRace, stopRace };
