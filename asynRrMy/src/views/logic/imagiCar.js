import car from "../../views/logic/icon/car.png";

const carSvg1 = `<svg width="70" height="70" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="80" cy="80" r="20" />
    <path d="M 60 80 H 40" />
    <path d="M 120 80 H 100" />
    <path d="M 40 80 V 50" />
    <path d="M 120 80 V 50" />
    <path d="M 40 80 V 110" />
    <path d="M 120 80 V 110" />
    <path d="M 66 55 v 10" />
    <path d="M 94 55 v 10" />
    <path d="M 55 70 v 17" />
    <path d="M 105 70 v 17" />
    <path d="M 80 45 v 13" />
    <path d="M 80 80 v 10" />
  </g>
</svg>`;

const carSvg2 = `<svg width="70" height="70" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="90" cy="80" r="20" />
    <path d="M 60 80 H 40" />
    <path d="M 120 80 H 100" />
    <path d="M 40 80 V 50" />
    <path d="M 120 80 V 50" />
    <path d="M 40 80 V 110" />
    <path d="M 120 80 V 110" />
    <path d="M 66 55 v 10" />
    <path d="M 94 55 v 10" />
    <path d="M 55 70 v 17" />
    <path d="M 105 70 v 17" />
    <path d="M 80 45 v 13" />
    <path d="M 80 80 v 10" />
  </g>
</svg>`;

import { CreateEl } from "../../util/functionCreatev";

const arrImageCar = [carSvg1, carSvg2];
let arrImgContainer = "";

function carImg() {
  const sectionInput = document.getElementById("sectionInput");

  const containerImgCars = CreateEl("article", "containerImgCars");
  containerImgCars.id = "containerImgCars";

  const buttonCarsImg1 = CreateEl("button", "buttonCarsImg");

  const cars1 = CreateEl("img", "cars1");
  cars1.setAttribute("src", car);
  buttonCarsImg1.appendChild(cars1);

  sectionInput.appendChild(containerImgCars);
  containerImgCars.append(buttonCarsImg1);
  createImageCar();
}

function createImageCar() {
  const containerImgCars = document.getElementById("containerImgCars");

  const resImag = arrImageCar.map((img, id) => {
    const buttonCarsImg = CreateEl("button", "buttonCarsImg");
    buttonCarsImg.innerHTML = img;

    buttonCarsImg.addEventListener("click", () => {
      const reducCarImd = document.getElementById("reducCarImd");
      reducCarImd.innerHTML = "";
      reducCarImd.innerHTML = img;
      arrImgContainer = img;

      console.log("hello is id: ", id);
      console.log("hello is container img: ", arrImgContainer);
    });

    containerImgCars.append(buttonCarsImg);
  });
  return resImag;
}

export { carImg, arrImgContainer };
