import car from "../../views/logic/icon/car.png";
import car2 from "../../views/logic/icon/car2.png";
import car3 from "../../views/logic/icon/car3.png";
import car4 from "../../views/logic/icon/car4.png";
import car5 from "../../views/logic/icon/car5.png";
import car6 from "../../views/logic/icon/car6.png";
import car7 from "../../views/logic/icon/car7.png";
import car8 from "../../views/logic/icon/car8.png";
import car9 from "../../views/logic/icon/car9.png";

import { CreateEl } from "../../util/functionCreatev";

function carImg() {
  const sectionInput = document.getElementById("sectionInput");

  const containerImgCars = CreateEl("article", "containerImgCars");

  const buttonCarsImg1 = CreateEl("button", "buttonCarsImg");
  const buttonCarsImg2 = CreateEl("button", "buttonCarsImg");
  const buttonCarsImg3 = CreateEl("button", "buttonCarsImg");
  const buttonCarsImg4 = CreateEl("button", "buttonCarsImg");
  const buttonCarsImg5 = CreateEl("button", "buttonCarsImg");
  const buttonCarsImg6 = CreateEl("button", "buttonCarsImg");
  const buttonCarsImg7 = CreateEl("button", "buttonCarsImg");
  const buttonCarsImg8 = CreateEl("button", "buttonCarsImg");
  const buttonCarsImg9 = CreateEl("button", "buttonCarsImg");

  const cars1 = CreateEl("img", "cars1");
  cars1.setAttribute("src", car);
  buttonCarsImg1.appendChild(cars1);

  const cars2 = CreateEl("img", "cars2");
  cars2.setAttribute("src", car2);
  buttonCarsImg2.appendChild(cars2);

  const cars3 = CreateEl("img", "cars2");
  cars3.setAttribute("src", car3);
  buttonCarsImg3.appendChild(cars3);

  const cars4 = CreateEl("img", "cars2");
  cars4.setAttribute("src", car4);
  buttonCarsImg4.appendChild(cars4);

  const cars5 = CreateEl("img", "cars2");
  cars5.setAttribute("src", car5);
  buttonCarsImg5.appendChild(cars5);

  const cars6 = CreateEl("img", "cars2");
  cars6.setAttribute("src", car6);
  buttonCarsImg6.appendChild(cars6);

  const cars7 = CreateEl("img", "cars2");
  cars7.setAttribute("src", car7);
  buttonCarsImg7.appendChild(cars7);

  const cars8 = CreateEl("img", "cars2");
  cars8.setAttribute("src", car8);
  buttonCarsImg8.appendChild(cars8);

  const cars9 = CreateEl("img", "cars2");
  cars9.setAttribute("src", car9);
  buttonCarsImg9.appendChild(cars9);

  sectionInput.appendChild(containerImgCars);
  containerImgCars.append(
    buttonCarsImg1,
    buttonCarsImg2,
    buttonCarsImg3,
    buttonCarsImg4,
    buttonCarsImg5,
    buttonCarsImg6,
    buttonCarsImg7,
    buttonCarsImg8,
    buttonCarsImg9,
  );
}

export { carImg };
