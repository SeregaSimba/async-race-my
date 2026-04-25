import {
  createCar,
  fetchCars,
  driveEngine,
  stopEngine,
  startEngine,
  deleteCar,
  fetchCar,
  updateCar,
} from "../../services/api";

import { CreateEl } from "../../util/functionCreatev";
import { arrImgContainer } from "../logic/imagiCar";

async function loadCars() {
  const sectionCar = document.getElementById("sectionCar");
  sectionCar.innerHTML = "";

  const { data } = await fetchCars(1, 7);
  console.log("Loaded cars from server:", data);

  data.map((e) => {
    renderCar(e);
  });
}

function renderCar(car) {
  const sectionCar = document.getElementById("sectionCar");

  const carEl = CreateEl("article", "car-item");

  carEl.dataset.id = car.id;

  const butEl = CreateEl("article", "butEl");

  const carInfo = CreateEl("p", "car-info");
  carInfo.innerText = `${car.name}: `;
  carInfo.style.color = car.color;

  const carSvg = CreateEl("p", "carSvg");
  carSvg.id = car.id;
  carSvg.dataset.id = car.id;
  carSvg.style.color = car.color;
  carSvg.innerHTML = car.imageCar;

  const buttonDrive = CreateEl("button", "button-drive");
  buttonDrive.innerText = "Drive";
  buttonDrive.disabled = true;
  buttonDrive.addEventListener("click", () => {
    const id = Number(carEl.dataset.id);
    driveEngine(id)
      .then((response) => {
        buttonDrive.disabled = true;
        console.log("Машинка поехала id:", id, response);
      })
      .catch((err) => {
        console.error("Drive failed:", err);
      });
  });

  const buttonStop = CreateEl("button", "button-stop");
  buttonStop.innerText = "Stop";
  buttonStop.addEventListener("click", () => {
    const id = Number(carEl.dataset.id);
    stopEngine(id)
      .then(() => {
        buttonDrive.disabled = true;

        console.log("мотор остановлен у машинки id:", id);
      })
      .catch((err) => {
        console.error("Stop failed:", err);
      });
  });

  const buttonStart = CreateEl("button", "button-start");
  buttonStart.innerText = "Start";
  buttonStart.addEventListener("click", () => {
    const id = Number(carEl.dataset.id);
    startEngine(id)
      .then(() => {
        buttonDrive.disabled = false;
        console.log("Мотор включен у id:", id);
      })
      .catch((err) => {
        console.error("Start failed:", err);
      });
  });

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

  sectionCar.append(carEl, butEl);

  carEl.append(carInfo, carSvg);
  butEl.append(
    buttonStart,
    buttonDrive,
    buttonStop,
    buttonUpdate,
    buttonDelete,
  );

  return carEl;
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

function handleSubmitCar() {
  const inputNameCar = document.getElementById("nameCar");
  const inputColorCar = document.getElementById("colorCar");
  const titleErrorName = document.getElementById("titleErrorName");
  const reducCarImd = document.getElementById("reducCarImd");

  const name = inputNameCar.value.trim();
  const color = inputColorCar.value;
  const imageCar = arrImgContainer;

  if (!name || !color || !imageCar) {
    titleErrorName.style.display = "block";
    console.log("ошибка не имя и не цвет");
    return;
  }

  titleErrorName.style.display = "none";

  const carId = inputNameCar.dataset.carId;

  if (carId) {
    updateCar({ id: carId, name, color, imageCar })
      .then(() => {
        reducCarImd.innerHTML = "";
        loadCars();
      })
      .catch((err) => {
        console.error("Update car failed:", err);
      });
  } else {
    createCar({ name, color, imageCar })
      .then(() => {
        reducCarImd.innerHTML = "";
        inputNameCar.value = "";
        inputColorCar.value = "#000000";
        loadCars();
      })
      .catch((err) => {
        console.error("Create car failed:", err);
      });
  }
}

function submitUpdate(carId) {
  const inputNameCar = document.getElementById("nameCar");
  const inputColorCar = document.getElementById("colorCar");
  const reducCarImd = document.getElementById("reducCarImd");

  const name = inputNameCar.value.trim();
  const color = inputColorCar.value;

  if (!name || !color) {
    return console.log("ошибка не имя и не цвет");
  }

  updateCar({ id: carId, name, color, imageCar: arrImgContainer })
    .then(() => {
      loadCars();
      inputNameCar.value = "";
      inputColorCar.value = "#000000";
      reducCarImd.innerHTML = "";
      delete inputNameCar.dataset.carId;
    })
    .catch((err) => {
      console.error("Update car failed:", err);
    });
}

export { loadCars, handleSubmitCar, submitUpdate };
