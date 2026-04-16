import {
  fetchCars,
  fetchCar,
  createCar,
  updateCar,
  deleteCar,
  startEngine,
  driveEngine,
  stopEngine,
} from "../services/api";
import { CreateEl } from "../util/functionCreatev";
import "./garage.css";

const main = document.getElementById("app");

function GarageView() {
  inputGarage();
  carGarage();
  loadCars();
}

function inputGarage() {
  const titleGarage = CreateEl("h1", "titleGarage");
  titleGarage.innerText = "Garage";
  main.appendChild(titleGarage);

  const sectionInput = CreateEl("section", "garageInput");
  main.appendChild(sectionInput);

  const inputNameCar = CreateEl("input", "inputNameCar");
  inputNameCar.type = "text";
  inputNameCar.id = "nameCar";
  inputNameCar.placeholder = "name car";
  sectionInput.appendChild(inputNameCar);

  const inputColorCar = CreateEl("input", "inputColorCar");
  inputColorCar.type = "color";
  inputColorCar.id = "colorCar";
  inputColorCar.placeholder = "color car";
  sectionInput.appendChild(inputColorCar);

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

async function loadCars() {
  const sectionCar = document.getElementById("sectionCar");
  sectionCar.innerHTML = "";

  const { data } = await fetchCars(1, 7);
  console.log("Loaded cars from server:", data);
  data.map((e) => {
    renderCar(e);
  });
}

function handleSubmitCar() {
  const inputNameCar = document.getElementById("nameCar");
  const inputColorCar = document.getElementById("colorCar");

  const name = inputNameCar.value.trim();
  const color = inputColorCar.value;

  if (!name || !color) {
    console.log("ошибка не имя и не цвет");
    return;
  }

  const carId = inputNameCar.dataset.carId;

  if (carId) {
    updateCar({ id: carId, name, color })
      .then(() => {
        loadCars();
      })
      .catch((err) => {
        console.error("Update car failed:", err);
      });
  } else {
    createCar({ name, color })
      .then(() => {
        loadCars();
      })
      .catch((err) => {
        console.error("Create car failed:", err);
      });
  }

  console.log(name);
  console.log(color);

  inputNameCar.value = "";
  inputColorCar.value = "#000000";
}

function handleChangeCar(carId) {
  const inputNameCar = document.getElementById("nameCar");
  const inputColorCar = document.getElementById("colorCar");

  fetchCar(carId)
    .then((car) => {
      inputNameCar.value = car.name;
      inputColorCar.value = car.color;
      inputNameCar.dataset.carId = carId;
    })
    .catch((err) => {
      console.error("Create car failed:", err);
    });
}

function submitUpdate(carId) {
  const inputNameCar = document.getElementById("nameCar");
  const inputColorCar = document.getElementById("colorCar");

  const name = inputNameCar.value.trim();
  const color = inputColorCar.value;

  if (!name || !color) {
    return console.log("ошибка не имя и не цвет");
  }

  updateCar({ id: carId, name, color })
    .then(() => {
      loadCars();
      inputNameCar.value = "";
      inputColorCar.value = "#000000";

      delete inputNameCar.dataset.carId;
    })
    .catch((err) => {
      console.error("Update car failed:", err);
    });
}

function renderCar(car) {
  const sectionCar = document.getElementById("sectionCar");

  const carEl = CreateEl("article", "car-item");
  carEl.dataset.id = car.id;

  const carInfo = CreateEl("p", "car-info");
  carInfo.innerText = `${car.name}`;
  carInfo.style.color = car.color;

  const buttonDrive = CreateEl("button", "button-drive");
  buttonDrive.innerText = "Drive";

  const buttonDelete = CreateEl("button", "button-delete");
  buttonDelete.innerText = "Delete";
  buttonDelete.addEventListener("click", () => {
    const id = Number(carEl.dataset.id);
    deleteCar(id)
      .then(() => {
        loadCars();
      })
      .catch((err) => {
        console.error("Delete car failed:", err);
      });
  });

  const buttonUpdate = CreateEl("button", "button-update");
  buttonUpdate.innerText = "Update";
  buttonUpdate.addEventListener("click", () => {
    const id = Number(carEl.dataset.id);
    handleChangeCar(id);
  });

  carEl.append(carInfo, buttonDrive, buttonDelete, buttonUpdate);

  sectionCar.appendChild(carEl);
}

export { GarageView };
