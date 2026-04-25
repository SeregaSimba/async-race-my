import { CreateEl } from "../util/functionCreatev";
import { fetchWinners, fetchCars } from "../services/api";

import "./winners.css";

const body = document.getElementById("app2");

async function winnersBor() {
  const titleWinners = CreateEl("h1", "titleWinners");
  titleWinners.innerText = "Winners Board";

  const sectionWinner = CreateEl("section", "sectionWinner");

  const containerWinners = CreateEl("section", "containerWinners");

  const table = CreateEl("table", "winnerTable");
  const tHead = CreateEl("thead", "winnerTHead");
  const tBody = CreateEl("tbody", "winnerTbody");

  const headerRow = CreateEl("tr", "winnerRow");

  const headersT = ["Place", "name", "Id", "Wins", "Time"];

  headersT.forEach((text) => {
    const th = CreateEl("th", "tableHeader");

    th.innerText = text;
    headerRow.append(th);
  });

  body.append(titleWinners, sectionWinner);
  sectionWinner.append(containerWinners);
  table.append(tHead, tBody);
  tHead.append(headerRow);
  containerWinners.append(table);

  const response = await fetchWinners(1, 7, "wins", "DESC");
  const result = processWinners(response.data, 1, 7);

  const carsResponse = await fetchCars(1, 100);
  const mergedWinners = mergeWinnerWithCar(result.items, carsResponse.data);

  renderWinners(mergedWinners, tBody);
}

function renderWinners(items, tbody) {
  tbody.innerHTML = "";

  items.forEach((wins) => {
    const row = CreateEl("tr", "winnerRow");

    const nameWin = CreateEl("td", "nameWin");
    nameWin.innerText = wins.name || "-";

    const place = CreateEl("td", "winnerPlace");
    place.innerText = wins.place;

    const tdId = CreateEl("td", "winnersId");
    tdId.innerText = wins.id;

    const winner = CreateEl("td", "winnerWin");
    winner.innerText = wins.wins;

    const time = CreateEl("td", "winnerTime");
    time.innerText = wins.time;

    row.append(place, nameWin, tdId, winner, time);
    tbody.append(row);
  });
}

function mergeWinnerWithCar(winner, cars) {
  return winner.map((win) => {
    const car = cars.find((item) => item.id === win.id);
    return {
      ...win,
      name: car ? car.name : "-",
    };
  });
}

function processWinners(winners, page = 1, limit = 7) {
  const sorted = [...winners].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return a.time - b.time;
  });

  const start = (page - 1) * limit;
  const end = start + limit;
  const pageItems = sorted.slice(start, end);

  return {
    items: pageItems.map((win, i) => ({
      ...win,
      place: start + i + 1,
    })),
    totalCount: sorted.length,
  };
}

export { winnersBor };
