import express from "express";
import cors from "cors";
import { readFile, writeFile, access } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_FILE = join(__dirname, "cars.json");

// Middleware
app.use(cors());
app.use(express.json());
// Работа с файлами
async function initData() {
  try {
    await access(DATA_FILE);
  } catch {
    await writeFile(DATA_FILE, JSON.stringify({ cars: [] }, null, 2));
  }
}

async function loadCars() {
  const data = await readFile(DATA_FILE, "utf8");
  return JSON.parse(data).cars;
}

async function saveCars(cars) {
  await writeFile(DATA_FILE, JSON.stringify({ cars }, null, 2));
}

// Инициализация
await initData();

// === API МАШИНОК ===
app.get("/api/cars", async (req, res) => {
  const cars = await loadCars();
  res.json(cars);
});
app.post("/api/cars", async (req, res) => {
  const cars = await loadCars();
  const newCar = {
    id: Date.now().toString(),
    ...req.body,
    status: "created",
  };
  cars.push(newCar);
  await saveCars(cars);
  res.status(201).json(newCar);
});

app.put("/api/cars/:id", async (req, res) => {
  const cars = await loadCars();
  const index = cars.findIndex((car) => car.id === req.params.id);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...req.body };
    await saveCars(cars);
    res.json(cars[index]);
  } else {
    res.status(404).json({ error: "Car not found" });
  }
});

app.delete("/api/cars/:id", async (req, res) => {
  const cars = await loadCars();
  const filtered = cars.filter((car) => car.id !== req.params.id);
  await saveCars(filtered);
  res.status(204).send();
});

// === ЛОГИКА ГОНКИ ===
app.post("/api/race/:carId", async (req, res) => {
  const cars = await loadCars();
  const car = cars.find((c) => c.id === req.params.carId);

  if (!car) {
    return res.status(404).json({ error: "Car not found" });
  }

  const raceResult = Math.floor(Math.random() * 3) + 1;
  if (raceResult === 1) {
    car.status = "finished";
    await saveCars(cars);
    res.json({
      status: "success",
      message: "Машинка доехала до финиша! 🏁",
      progress: 100,
    });
  } else if (raceResult === 2) {
    car.status = "broken";
    await saveCars(cars);
    res.json({
      status: "error",
      message: "Поломалась на 50% пути 🚧",
      progress: 50,
    });
  } else {
    car.status = "engine_failed";
    await saveCars(cars);
    res.json({
      status: "failed",
      message: "Проблемы с двигателем 🚫",
      progress: 0,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚗 Сервер Async Race: http://localhost:${PORT}`);
  console.log(`📱 API: http://localhost:${PORT}/api/cars`);
});
