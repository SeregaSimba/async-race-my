import { CreateEl } from "../../util/functionCreatev";
import "./registration.css";

const containerUsers = [];
let user = { name: "", password: "" };

function Registration() {
  const main = document.getElementById("app");

  const containerFormReg = CreateEl("section", "containerFormReg");
  main.appendChild(containerFormReg);

  const labelName = CreateEl("label", "labelName");
  labelName.innerText = "Name";
  containerFormReg.appendChild(labelName);

  const inputName = CreateEl("input", "name");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("placeholder", "Name");
  containerFormReg.appendChild(inputName);
  inputName.addEventListener("input", (e) => getValueName(e));

  const pErrName = CreateEl("p", "pErrorName");
  pErrName.id = "errorName";
  containerFormReg.appendChild(pErrName);

  const pErrPass = CreateEl("p", "pErrorPass");
  pErrPass.id = "errorPass";
  containerFormReg.appendChild(pErrPass);

  const buttonReg = CreateEl("button", "buttonReg");
  buttonReg.innerText = "Submit";
  containerFormReg.appendChild(buttonReg);

  buttonReg.addEventListener("click", (e) => {
    e.preventDefault();
    validName(user.name, user.password);
    inputName.value = "";
    inputPass.value = "";
    console.log("containerUsers:", containerUsers);
  });

  const buttonRegTEST = CreateEl("button", "buttonReg");
  buttonRegTEST.innerText = "buttonRegTEST";
  containerFormReg.appendChild(buttonRegTEST);
  buttonRegTEST.addEventListener("click", () => {});

  containerFormReg.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.target.closest("button")) {
      e.preventDefault();
      buttonReg.click();
    }
  });
}

function getValueName(e) {
  const res = e.target.value;
  if (res.length > 3) {
  }
  user.name = res;
  console.log("name:", user);
}

function getValuePass(e) {
  const res = e.target.value;
  user.password = res;
  console.log("pass:", user);
}

function validName(nam, pas) {
  const headerTitle = document.getElementById("titleNameUser");
  const errName = document.getElementById("errorName");

  const splitChar = nam.split(" ");
  const jo = splitChar.join("");
  const trim = jo.trim();

  if (trim.length === 0) {
    errName.innerText = "Ведите Имя";
    return;
  }

  const upperTrim = trim.charAt(0).toUpperCase();
  const sliceChar = trim.slice(1).toLowerCase();
  const res = `${upperTrim}${sliceChar}`;

  if (res.length <= 1) {
    errName.innerText = "Имя Слишком Короткое";
    return;
  }
  if (res.length >= 20) {
    errName.innerText = "Имя Слишком Длинное";
    return;
  }

  headerTitle.innerText = res;

  containerUsers.push({ name: res, password: pas });
}

export { Registration, containerUsers };
