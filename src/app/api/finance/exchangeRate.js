let cached = null;
let cachedAt = 0;
const CACHE_MS = 5 * 60 * 1000;

export async function getUsdArsRate() {
  if (cached != null && Date.now() - cachedAt < CACHE_MS) {
    return cached;
  }
  try {
    const response = await fetch('https://dolarapi.com/v1/dolares/blue');
    const data = await response.json();
    const rate = (data.compra + data.venta) / 2;
    cached = rate;
    cachedAt = Date.now();
    return rate;
  } catch (e) {
    console.log(e);
    return cached;
  }
}
