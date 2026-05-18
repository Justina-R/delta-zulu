const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      // Token expirado o inválido -> Limpiar sesión y redirigir
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login?expired=true";
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Error en la petición");
  }
  return response.json();
};

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  post: async (endpoint, body) => {
    const headers = getHeaders();
    if (body === undefined) {
      delete headers["Content-Type"];
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return handleResponse(response);
  },

  put: async (endpoint, body) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const headers = getHeaders();
    delete headers["Content-Type"];

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });
    return handleResponse(response);
  },
};
