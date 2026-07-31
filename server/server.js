// Maridadi Coatings — API server
// Zero external dependencies: built-in http + built-in node:sqlite.
// Serves JSON only. The website itself is the separate React app in /client.

const http = require('node:http');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'data', 'paint.db');

const db = new DatabaseSync(DB_PATH, { readOnly: true });

const ALLOWED_ORIGIN = process.env.CLIENT_ORIGIN || '*';

function sendJSON(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(body);
}

const searchColorsStmt = db.prepare(`
  SELECT id, series_code, series_name, colour_code, colour_name, rgb_hex
  FROM colors
  WHERE colour_code LIKE ? COLLATE NOCASE
     OR colour_name LIKE ? COLLATE NOCASE
  ORDER BY
    CASE WHEN colour_code = ? COLLATE NOCASE THEN 0
         WHEN colour_code LIKE ? COLLATE NOCASE THEN 1
         ELSE 2 END,
    series_code, colour_code
  LIMIT 100
`);

const formulasForColorStmt = db.prepare(`
  SELECT product_code, product_name, base_code,
         colorant1, qty1, colorant2, qty2, colorant3, qty3, colorant4, qty4, colorant5, qty5
  FROM formulas
  WHERE color_id = ?
  ORDER BY product_code
`);

const colorantNameStmt = db.prepare(`SELECT name FROM colorants WHERE code = ?`);
function colorantName(code) {
  if (!code) return null;
  const row = colorantNameStmt.get(code);
  return row ? row.name : code;
}

function formulaToList(row) {
  const list = [];
  for (let i = 1; i <= 5; i++) {
    const code = row[`colorant${i}`];
    const qty = row[`qty${i}`];
    if (code) list.push({ code, name: colorantName(code), quantity: qty });
  }
  return list;
}

function handleSearch(req, res, query) {
  const q = (query.q || '').trim();
  if (!q) return sendJSON(res, 200, { query: q, results: [] });

  const like = `%${q}%`;
  const rows = searchColorsStmt.all(like, like, q, `${q}%`);

  const results = rows.map((c) => {
    const formulas = formulasForColorStmt.all(c.id).map((f) => ({
      product_code: f.product_code,
      product_name: f.product_name,
      base_code: f.base_code,
      colorants: formulaToList(f),
    }));
    return {
      id: c.id,
      series_code: c.series_code,
      series_name: c.series_name,
      colour_code: c.colour_code,
      colour_name: c.colour_name,
      rgb_hex: c.rgb_hex,
      formulas,
    };
  });

  sendJSON(res, 200, { query: q, count: results.length, results });
}

const productsStmt = db.prepare(`SELECT DISTINCT product_code, product_name FROM products ORDER BY product_code`);
function handleProducts(req, res) {
  sendJSON(res, 200, { products: productsStmt.all() });
}

const seriesStmt = db.prepare(`SELECT series_code, series_name, COUNT(*) as count FROM colors GROUP BY series_code ORDER BY count DESC`);
function handleSeries(req, res) {
  sendJSON(res, 200, { series: seriesStmt.all() });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const query = Object.fromEntries(url.searchParams.entries());

  if (pathname === '/api/search') return handleSearch(req, res, query);
  if (pathname === '/api/products') return handleProducts(req, res);
  if (pathname === '/api/series') return handleSeries(req, res);
  if (pathname === '/healthz') return sendJSON(res, 200, { ok: true });

  sendJSON(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Maridadi Coatings API running at http://localhost:${PORT}`);
});
