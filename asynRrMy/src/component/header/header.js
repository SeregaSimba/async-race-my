import { CreateEl } from "../../util/functionCreatev";
import iconHeader from "../../icon/icons8-js.svg";
import "./header.css";

export default function Header() {
  const bodyContainer = document.getElementById("body");

  const header = CreateEl("header", "header");
  bodyContainer.prepend(header);

  const sectionIconHeader = CreateEl("section", "iconHeader");
  header.appendChild(sectionIconHeader);

  const imgIcon = CreateEl("img", "imgIcon");
  imgIcon.setAttribute("src", iconHeader);
  sectionIconHeader.appendChild(imgIcon);

  const NameUser = CreateEl("h2", "nameUser");
  NameUser.innerText = "My Name";
  sectionIconHeader.appendChild(NameUser);

  const imgHeader = CreateEl("img", "imgHeaderIcon");
  sectionIconHeader.appendChild(imgHeader);

  const sectionTitleHeader = CreateEl("section", "titleHeader");
  header.appendChild(sectionTitleHeader);

  const h1HeaderLabel = CreateEl("h1", "headerLabel");
  h1HeaderLabel.innerText = "Star Race";
  sectionTitleHeader.appendChild(h1HeaderLabel);

  const sectionNavHeader = CreateEl("section", "navHeader");
  header.appendChild(sectionNavHeader);

  const spa1Border = CreateEl("span", "span1");
  sectionNavHeader.appendChild(spa1Border);

  const spa2Border = CreateEl("span", "span1");
  sectionNavHeader.appendChild(spa2Border);

  const spa3Border = CreateEl("span", "span1");
  sectionNavHeader.appendChild(spa3Border);

  //   const navHeader = CreateEl("nav", "navHeader");
  //   sectionNavHeader.appendChild(navHeader);
}
