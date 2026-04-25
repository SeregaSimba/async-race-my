const API_URL = "http://127.0.0.1:3000";

const STORAGE_KEY = "garageCars";
const ENGINE_KEY = "garageEngineState";

const readLocalCars = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveLocalCars = (cars) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
};

const readLocalEngine = () => {
  const raw = localStorage.getItem(ENGINE_KEY);
  return raw ? JSON.parse(raw) : {};
};

const saveLocalEngine = (engine) => {
  localStorage.setItem(ENGINE_KEY, JSON.stringify(engine));
};

export const fetchCars = async (page = 1, limit = 7) => {
  try {
    const response = await fetch(
      `${API_URL}/garage?_page=${page}&_limit=${limit}`,
    );
    const totalCount = response.headers.get("X-Total-Count");
    const data = await response.json();
    return { data, totalCount, source: "server" };
  } catch (error) {
    const data = readLocalCars();
    return {
      data: data.slice((page - 1) * limit, page * limit),
      totalCount: data.length,
      source: "local",
    };
  }
};

export const fetchCar = async (id) => {
  const response = await fetch(`${API_URL}/garage/${id}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Car not found");
  }
};

export const createCar = async (carDate) => {
  try {
    const response = await fetch(`${API_URL}/garage/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carDate),
    });
    return await response.json();
  } catch (err) {
    const cars = readLocalCars();
    const newCar = {
      ...carDate,
      id: Date.now(),
    };
    cars.push(newCar);
    saveLocalCars(cars);
    return newCar;
  }
};

export const updateCar = async (car) => {
  try {
    const response = await fetch(`${API_URL}/garage/${car.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });
    return await response.json();
  } catch (err) {
    const cars = readLocalCars();
    const i = cars.findIndex((item) => item.id === Number(car.id));

    if (i !== -1) {
      cars[i] = { ...cars[i], ...car };
      saveLocalCars(cars);
      return cars[i];
    }
    throw new Error("Car not found in local storage");
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/garage/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (err) {
    const cars = readLocalCars().filter((car) => car.id !== Number(id));
    saveLocalCars(cars);
    return true;
  }
};

export const startEngine = async (id) => {
  try {
    const response = await fetch(`${API_URL}/engine?id=${id}&status=started`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: "started" }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    const state = readLocalEngine();
    const velocity = Math.max(50, Math.floor(Math.random() * 200));
    const distance = 500000;

    state[id] = { status: "started", velocity };
    saveLocalEngine(state);
    return { velocity, distance, source: "local" };
  }
};

export const stopEngine = async (id) => {
  try {
    const response = await fetch(`${API_URL}/engine?id=${id}&status=stopped`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: "stopped" }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (err) {
    const state = readLocalEngine();
    delete state[id];
    saveLocalEngine(state);
    return { velocity: 0, distance: 500000, source: "local" };
  }
};

export const driveEngine = async (id) => {
  try {
    const response = await fetch(`${API_URL}/engine?id=${id}&status=drive`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: "drive" }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    const state = readLocalEngine();
    const current = state[id];

    if (!current || current.status !== "started") {
      throw new Error("Engine must be started first");
    }

    const distance = 500000;
    return {
      success: true,
      source: "local",
      duration: Math.round(distance / current.velocity),
    };
  }
};

export const sendStatusToServer = async (statusInfo) => {
  const { id, status } = statusInfo;
  try {
    await fetch(`${API_URL}/engine?id=${id}&status=${status}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statusInfo),
    });
  } catch (err) {
    console.error("Error sending status to server:", err);
  }
};

export const fetchWinners = async (
  page = 1,
  limit = 7,
  sort = "id",
  order = "ASC",
) => {
  const response = await fetch(
    `${API_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  );
  const totalCount = response.headers.get("X-Total-Count");
  const data = await response.json();
  return { data, totalCount };
};

export const fetchWinner = async (id) => {
  const response = await fetch(`${API_URL}/winners/${id}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Winner not found");
  }
};

export const createWinner = async (winnerData) => {
  const response = await fetch(`${API_URL}/winners`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(winnerData),
  });

  if (response.status === 201) {
    return await response.json();
  } else if (response.status === 500) {
    throw new Error("Unable to insert, duplicate id");
  }
};

export const updateWinner = async (id, winnerData) => {
  const response = await fetch(`${API_URL}/winners/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(winnerData),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Winner not found");
  }
};

export const deleteWinner = async (id) => {
  const response = await fetch(`${API_URL}/winners/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    return true;
  } else {
    throw new Error("Winner not found");
  }
};
