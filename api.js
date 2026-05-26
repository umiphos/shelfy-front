
const API_URL = "https://shelfy-jlr2.onrender.com";


const getToken = () => localStorage.getItem("token");
const setToken = (t) => localStorage.setItem("token", t);
const clearToken = () => localStorage.removeItem("token");
const isLoggedIn = () => !!getToken();

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}


async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, options);
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Error desconocido");
  return data;
}


async function register({ name, email, password, whatsapp_number }) {
  return request("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, whatsapp_number }),
  });
}

async function login(email, password) {
  const form = new URLSearchParams({ username: email, password });
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Credenciales incorrectas");
  setToken(data.access_token);
  return data;
}

function logout() {
  clearToken();
  window.location.href = "login.html";
}

async function getMyProducts() {
  return request("/products/mine", { headers: authHeaders() });
}

async function createProduct(product) {
  return request("/products/", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(product),
  });
}

async function updateProduct(id, product) {
  return request(`/products/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(product),
  });
}

async function toggleProduct(id) {
  return request(`/products/${id}/toggle`, {
    method: "PATCH",
    headers: authHeaders(),
  });
}

async function deleteProduct(id) {
  return request(`/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

async function getCatalog(slug) {
  return request(`/catalog/${slug}`);
}

async function getCatalogProducts(slug, { category, available_only } = {}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (available_only) params.set("available_only", "true");
  const qs = params.toString() ? `?${params}` : "";
  return request(`/catalog/${slug}/products${qs}`);
}
