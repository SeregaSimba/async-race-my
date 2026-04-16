import "./style.css";
import Header from "./component/header/header";
import { Registration } from "./component/registration/registration";
import * as API from "./services/api";
import { GarageView } from "./views/GarageView";

// async function loadCars() {
//   const { data, totalCount } = await API.fetchCars(1, 7);
//   console.log("Cars:", data);
// }

// loadCars();
Header();
GarageView();
// Registration();
