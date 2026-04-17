import { CreateEl } from "../util/functionCreatev";
import { loadCars, handleSubmitCar, submitUpdate } from "./logic/car";
import { startAll, startRace, stopRace } from "./logic/start";
import "./garage.css";
import { carImg } from "./logic/imagiCar";

const main = document.getElementById("app");

function GarageView() {
  inputGarage();
  sectionButtonRace();
  carGarage();
  loadCars();
}

function inputGarage() {
  const titleGarage = CreateEl("h1", "titleGarage");
  titleGarage.innerText = "Garage";
  main.appendChild(titleGarage);

  const sectionInput = CreateEl("section", "garageInput");
  sectionInput.id = "sectionInput";
  main.appendChild(sectionInput);

  const titleCreateCar = CreateEl("h2", "titleCreateCar");
  titleCreateCar.innerText = "Создать / Редактировать Машинку";
  sectionInput.appendChild(titleCreateCar);

  const articleContainerInput = CreateEl("article", "articleContainerInput");
  sectionInput.appendChild(articleContainerInput);

  const inputNameCar = CreateEl("input", "inputNameCar");
  inputNameCar.type = "text";
  inputNameCar.id = "nameCar";
  inputNameCar.placeholder = "name car";
  articleContainerInput.appendChild(inputNameCar);

  const inputColorCar = CreateEl("input", "inputColorCar");
  inputColorCar.type = "color";
  inputColorCar.id = "colorCar";
  inputColorCar.placeholder = "color car";
  articleContainerInput.appendChild(inputColorCar);

  const titleContainerCarH2 = CreateEl("h2", "titleContainerCarH2");
  titleContainerCarH2.innerText = "выбери машинку";
  sectionInput.appendChild(titleContainerCarH2);

  carImg();

  const buttonCreateCar = CreateEl("button", "buttonCreateCar");
  buttonCreateCar.innerText = "submit car";
  sectionInput.appendChild(buttonCreateCar);
  buttonCreateCar.addEventListener("click", () => {
    const id = inputNameCar.dataset.carId;
    if (!id) {
      handleSubmitCar();
    } else {
      submitUpdate(id);
    }
  });

  const titleErrorName = CreateEl("p", "titleErrorName");
  titleErrorName.id = "titleErrorName";
  titleErrorName.innerText = "ошибка не имя и не цвет";
  titleErrorName.style.display = "none";
  sectionInput.appendChild(titleErrorName);
}

function sectionButtonRace() {
  const sectionButtonRac = CreateEl("section", "sectionButtonRac");
  main.appendChild(sectionButtonRac);

  const titleRace = CreateEl("h2", "titleRace");
  titleRace.innerText = "Управление всем гаражом";
  sectionButtonRac.appendChild(titleRace);

  const buttonRaceAll = CreateEl("button", "buttonRaceAll");
  buttonRaceAll.innerText = "Запустить все машинки";
  sectionButtonRac.appendChild(buttonRaceAll);
  buttonRaceAll.addEventListener("click", () => {
    startAll().then(() => {
      startRaceButton.disabled = false;
    });
  });

  const startRaceButton = CreateEl("button", "startRaceButton");
  startRaceButton.innerText = "Начать заезд";
  startRaceButton.disabled = true;
  startRaceButton.addEventListener("click", () => {
    startRace();
    startRaceButton.disabled = true;
  });
  sectionButtonRac.appendChild(startRaceButton);

  const stopRaceButton = CreateEl("button", "stopRaceButton");
  stopRaceButton.innerText = "Выключить мотор";
  stopRaceButton.addEventListener("click", () => {
    startRaceButton.disabled = true;
    stopRace();
  });
  sectionButtonRac.appendChild(stopRaceButton);
}

function carGarage() {
  const sectionContainerGar = CreateEl("section", "sectionContainerGar");
  main.appendChild(sectionContainerGar);

  const titleRace = CreateEl("h2", "titleRace");
  titleRace.innerText = "Race";
  sectionContainerGar.appendChild(titleRace);

  const sectionCar = CreateEl("section", "sectionCar");
  sectionCar.id = "sectionCar";
  sectionContainerGar.appendChild(sectionCar);
}

//____________________________________________________________________________

export { GarageView };
