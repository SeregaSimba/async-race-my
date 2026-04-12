const API_URL = "http://127.0.0.1:3000";

export const fetchCars = async (page = 1, limit = 7) => { ... };
export const fetchCar = async (id) => { ... };
export const createCar = async (carDate) => { ... };
export const updateCar = async (car) => { ... };
export const deleteCar = async (id) => { ... };
export const startEngine = async (id) => { ... };
export const stopEngine = async (id) => { ... };
export const driveEngine = async (id) => { ... };
export const sendStatusToServer = async (statusInfo) => { ... };
export const fetchWinners = async (page = 1, limit = 7, sort = "id", order = "ASC") => { ... };
export const fetchWinner = async (id) => { ... };
export const createWinner = async (winnerData) => { ... };
export const updateWinner = async (id, winnerData) => { ... };
export const deleteWinner = async (id) => { ... };


// import { Car } from "../../components/Garage";

export const fetchCars = async (page: number = 1, limit: number = 7) => {
  const response = await fetch(
    `${API_URL}/garage?_page=${page}&_limit=${limit}`
  );
  const totalCount = response.headers.get("X-Total-Count");
  const data = await response.json();
  return { data, totalCount };
};

export const fetchCar = async (id: number) => {
  const response = await fetch(`${API_URL}/garage/${id}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Car not found");
  }
};

export const createCar = async (carDate: { name: string; color: string }) => {
  const response = await fetch(`${API_URL}/garage/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carDate),
  });
  return await response.json();
};

export const updateCar = async (car: {
  id: number;
  name: string;
  color: string;
}) => {
  const response = await fetch(`${API_URL}/garage/${car.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
  return await response.json();
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${API_URL}/garage/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};

export const startEngine = async (id: number) => {
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
};

export const stopEngine = async (id: number) => {
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
};

export const driveEngine = async (id: number) => {
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
};

export const sendStatusToServer = async (statusInfo: {
  id: number;
  status: string;
}) => {
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
  page: number = 1,
  limit: number = 7,
  sort: string = "id",
  order: string = "ASC"
) => {
  const response = await fetch(
    `${API_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
  );
  const totalCount = response.headers.get("X-Total-Count");
  const data = await response.json();
  return { data, totalCount };
};

export const fetchWinner = async (id: number) => {
  const response = await fetch(`${API_URL}/winners/${id}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Winner not found");
  }
};

export const createWinner = async (winnerData: {
  id: number;
  name: string;
  wins: number;
  bestTime: number;
}) => {
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

export const updateWinner = async (
  id: number,
  winnerData: {
    wins: number;
    time: number;
  }
) => {
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

export const deleteWinner = async (id: number) => {
  const response = await fetch(`${API_URL}/winners/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    return true;
  } else {
    throw new Error("Winner not found");
  }
};

// export const startRase = async (carIds: number[]) => {
//   const response = await fetch(
//     `${API_URL}/engine?ids=${carIds.join(",")}&status=drive`
//   );

//   const data = await response.json();
//   if (data.success) {
//     const carElement = document.getElementById(`car${carIds}`);
//     if (carElement) {
//       carElement.style.transform = `translateX(${10}px)`;
//     }
//   }
//   return response.json();
// };

// export async function resetCars(carIds: number[]): Promise<any> {
//   const promises = carIds.map((id) =>
//     fetch(`${API_URL}/engine?id=${id}&status=stopped`)
//   );
//   return Promise.all(promises);
// }