const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error en la petición");
    }
    return response.json();
  },

  post: async (endpoint, body) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error en la petición");
    }
    return response.json();
  },

  put: async (endpoint, body) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error en la petición");
    }
    return response.json();
  },

  delete: async (endpoint) => {
    const headers = getHeaders();
    delete headers["Content-Type"];

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error en la petición");
    }
    return response.json();
  },
};
