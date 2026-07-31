"""
Rebuild server/data/paint.db from a Gamma-style tinting export (.xlsx).

Usage:
    python3 build_db.py /path/to/GAMMA_DB_FILE.xlsx

Requires: pandas, openpyxl (pip install pandas openpyxl --break-system-packages)
Run this whenever the source spreadsheet is updated, then restart the server
(and redeploy, if hosted).
"""

import sys, os, math, sqlite3
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(HERE, "..", "data", "paint.db")


def rgb_to_hex(val):
    if val is None or (isinstance(val, float) and math.isnan(val)):
        return None
    v = int(val)
    return "#%02x%02x%02x" % ((v >> 16) & 255, (v >> 8) & 255, v & 255)


def clean(v):
    if v is None or (isinstance(v, float) and math.isnan(v)):
        return None
    return v


def main(xlsx_path):
    xl = pd.ExcelFile(xlsx_path)
    colorant_df = xl.parse("Colorant")
    formula_df = xl.parse("Formula")
    prefill_df = xl.parse("Prefillcans")

    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.executescript("""
    CREATE TABLE colorants (code TEXT PRIMARY KEY, name TEXT);
    CREATE TABLE colors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      series_code TEXT, series_name TEXT, colour_code TEXT, colour_name TEXT, rgb_hex TEXT,
      UNIQUE(series_code, colour_code)
    );
    CREATE TABLE formulas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      color_id INTEGER, product_code TEXT, product_name TEXT, base_code TEXT,
      colorant1 TEXT, qty1 REAL, colorant2 TEXT, qty2 REAL, colorant3 TEXT, qty3 REAL,
      colorant4 TEXT, qty4 REAL, colorant5 TEXT, qty5 REAL,
      FOREIGN KEY(color_id) REFERENCES colors(id)
    );
    CREATE TABLE products (
      product_code TEXT, product_name TEXT, base_code TEXT, can_name TEXT,
      can_capacity REAL, can_unit TEXT,
      PRIMARY KEY(product_code, base_code, can_name)
    );
    CREATE INDEX idx_colors_code ON colors(colour_code COLLATE NOCASE);
    CREATE INDEX idx_colors_name ON colors(colour_name COLLATE NOCASE);
    CREATE INDEX idx_colors_series ON colors(series_code);
    CREATE INDEX idx_formulas_color ON formulas(color_id);
    """)

    for _, r in colorant_df.iterrows():
        cur.execute("INSERT OR IGNORE INTO colorants(code,name) VALUES (?,?)",
                     (r["Colorant Code"], r["Colorant Name"]))

    color_cache = {}
    formula_rows = []
    for _, r in formula_df.iterrows():
        key = (r["Series Code"], r["Colour Code"])
        if key not in color_cache:
            cur.execute(
                "INSERT OR IGNORE INTO colors(series_code, series_name, colour_code, colour_name, rgb_hex) VALUES (?,?,?,?,?)",
                (r["Series Code"], r["Series Name"], r["Colour Code"], r["Colour Name"], rgb_to_hex(r["RGB"])),
            )
            cid = cur.execute("SELECT id FROM colors WHERE series_code=? AND colour_code=?", key).fetchone()[0]
            color_cache[key] = cid
        else:
            cid = color_cache[key]
            if rgb_to_hex(r["RGB"]):
                cur.execute("UPDATE colors SET rgb_hex=? WHERE id=? AND rgb_hex IS NULL", (rgb_to_hex(r["RGB"]), cid))

        formula_rows.append((
            cid, str(r["Product Code"]), r["Product Name"], r["Base Code"],
            clean(r["Colorant1()"]), clean(r["Quantity1"]),
            clean(r["Colorant2"]), clean(r["Quantity2"]),
            clean(r["Colorant3"]), clean(r["Quantity3"]),
            clean(r["Colorant4"]), clean(r["Quantity4"]),
            clean(r["Colorant5"]), clean(r["Quantity5"]),
        ))

    cur.executemany(
        """INSERT INTO formulas(color_id, product_code, product_name, base_code,
           colorant1, qty1, colorant2, qty2, colorant3, qty3, colorant4, qty4, colorant5, qty5)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
        formula_rows,
    )

    prod_seen = set()
    for _, r in prefill_df.iterrows():
        key = (str(r["Product Code"]), r["Base Code"], r["Can Name"])
        if key in prod_seen:
            continue
        prod_seen.add(key)
        cur.execute(
            "INSERT OR IGNORE INTO products(product_code, product_name, base_code, can_name, can_capacity, can_unit) VALUES (?,?,?,?,?,?)",
            (str(r["Product Code"]), r["Product Name"], r["Base Code"], r["Can Name"], r["Can Capacity"], r["Can Unit"]),
        )

    conn.commit()
    print("colorants:", cur.execute("SELECT COUNT(*) FROM colorants").fetchone()[0])
    print("colors:", cur.execute("SELECT COUNT(*) FROM colors").fetchone()[0])
    print("formulas:", cur.execute("SELECT COUNT(*) FROM formulas").fetchone()[0])
    print("products:", cur.execute("SELECT COUNT(*) FROM products").fetchone()[0])
    conn.close()
    print(f"\nDatabase written to {os.path.abspath(DB_PATH)}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 build_db.py /path/to/GAMMA_DB_FILE.xlsx")
        sys.exit(1)
    main(sys.argv[1])
