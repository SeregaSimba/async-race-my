import { CreateEl } from "../../util/functionCreatev";
import "./registration.css";

const containerUsers = [];

function Registration() {
  const main = document.getElementById("app");

  const containerFormReg = CreateEl("section", "containerFormReg");
  main.appendChild(containerFormReg);

  const labelName = CreateEl("label", "labelName");
  labelName.innerText = "Name";
  containerFormReg.appendChild(labelName);

  const inputName = CreateEl("input", "name");
  inputName.setAttribute("type", "text");
  containerFormReg.appendChild(inputName);

  const labelPass = CreateEl("label", "labelPass");
  labelPass.innerText = "Password";
  containerFormReg.appendChild(labelPass);

  const inputPass = CreateEl("input", "Password");
  inputPass.setAttribute("type", "password");
  containerFormReg.appendChild(inputPass);

  const buttonReg = CreateEl("button", "buttonReg");
  buttonReg.innerText = "Submit";
  containerFormReg.appendChild(buttonReg);

  const buttonRegTEST = CreateEl("button", "buttonReg");
  buttonRegTEST.innerText = "buttonRegTEST";
  containerFormReg.appendChild(buttonRegTEST);
  buttonRegTEST.addEventListener("click", () => {
    console.log(containerUsers);
  });
}

function getValueE(e) {
  const res = e.target.value;
  containerUsers.push(res);
}

export { Registration };
