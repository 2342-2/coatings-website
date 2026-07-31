import { useState, useEffect, useRef, useCallback } from 'react';
import { searchColors } from '../api.js';
import ColorDetailModal from './ColorDetailModal.jsx';

const HINTS = ['RAL 1015', 'Pantone', 'ivory'];

export default function ColorSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState(null);
  const requestId = useRef(0);
  const debounceRef = useRef(null);

  const runSearch = useCallback(async (q) => {
    const id = ++requestId.current;
    try {
      const data = await searchColors(q);
      if (id !== requestId.current) return;
      setResults(data.results);
      setStatus(
        data.results.length
          ? `${data.count} match${data.count === 1 ? '' : 'es'} for "${data.query}"`
          : `No matches for "${data.query}". Try a shorter code or partial name.`
      );
    } catch (err) {
      if (id !== requestId.current) return;
      setResults([]);
      setStatus('Search is unavailable right now — please try again.');
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    const q = query.trim();
    if (!q) { setResults([]); setStatus(''); return; }
    setStatus('Searching…');
    debounceRef.current = setTimeout(() => runSearch(q), 250);
    return () => clearTimeout(debounceRef.current);
  }, [query, runSearch]);

  return (
    <section id="search" className="border-y border-line bg-bg-alt py-22">
      <div className="mx-auto max-w-6xl px-7">
        <p className="mb-2.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.12em] text-accent">Colour library</p>
        <h2 className="mb-3 font-display text-[28px] font-semibold sm:text-[38px]">Find a colour code</h2>
        <p className="max-w-[58ch] text-[17px] text-ink-soft">
          Type a code or a name — try{' '}
          {HINTS.map((hint, i) => (
            <span key={hint}>
              <button onClick={() => setQuery(hint)} className="rounded-md border border-line bg-white px-2 py-0.5 font-mono text-[13px] text-accent hover:border-accent">
                {hint}
              </button>
              {i < HINTS.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </p>

        <div className="mt-7 flex max-w-[620px] items-center gap-3 rounded-2xl border-[1.5px] border-line bg-white px-5 py-3.5 shadow-[0_1px_2px_rgba(28,26,23,0.06),0_8px_24px_-12px_rgba(28,26,23,0.18)] focus-within:border-accent">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-none text-ink-soft">
            <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13.3 13.3 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by colour code or name…" autoComplete="off"
            className="w-full border-none bg-transparent text-[17px] text-ink outline-none"
          />
        </div>

        <div className="mt-4.5 min-h-[18px] font-mono text-[13px] text-ink-soft" aria-live="polite">{status}</div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map((c) => (
            <button
              key={c.id} onClick={() => setSelected(c)}
              className="flex flex-col overflow-hidden rounded-[10px] border border-line bg-white text-left transition hover:-translate-y-0.75 hover:shadow-[0_1px_2px_rgba(28,26,23,0.06),0_8px_24px_-12px_rgba(28,26,23,0.18)]"
            >
              <div className="h-[78px]" style={{ backgroundColor: c.rgb_hex || '#e5e0d3' }} />
              <div className="px-4 pb-4 pt-3.5">
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{c.series_name}</div>
                <div className="mt-1 font-mono text-[14.5px] font-semibold">{c.colour_code}</div>
                <div className="text-[13.5px] text-ink-soft">{c.colour_name}</div>
                <div className="mt-2 font-mono text-[11.5px] text-ink-soft">{c.rgb_hex ? c.rgb_hex.toUpperCase() : 'no swatch on file'}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <ColorDetailModal color={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
