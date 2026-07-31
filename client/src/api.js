const API_BASE = import.meta.env.VITE_API_URL || '';

export async function searchColors(query) {
  const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);
  return res.json();
}

export async function getSeries() {
  const res = await fetch(`${API_BASE}/api/series`);
  if (!res.ok) throw new Error(`Failed to load series: ${res.status}`);
  return res.json();
}
