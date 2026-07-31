import { useEffect } from 'react';

export default function ColorDetailModal({ color, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const swatch = color.rgb_hex || '#e5e0d3';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="max-h-[82vh] w-full max-w-[640px] overflow-y-auto rounded-2xl bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]">
        <div className="relative h-[110px]" style={{ backgroundColor: swatch }}>
          <button onClick={onClose} aria-label="Close" className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-base leading-none">✕</button>
        </div>
        <div className="px-7 pb-8 pt-6">
          <h3 className="font-display text-[22px] font-semibold">{color.colour_name}</h3>
          <div className="mb-5 font-mono text-[12.5px] text-ink-soft">
            {color.series_name} &middot; {color.colour_code} &middot; {swatch.toUpperCase()}
          </div>
          {color.formulas.length ? (
            color.formulas.map((f, i) => (
              <div key={i} className="mt-4 border-t border-line pt-4">
                <h4 className="mb-2 text-[14.5px] font-semibold">
                  {f.product_name} <span className="font-normal text-ink-soft">— {f.base_code}</span>
                </h4>
                {f.colorants.length ? (
                  <table className="w-full border-collapse text-[13.5px]">
                    <tbody>
                      {f.colorants.map((c, j) => (
                        <tr key={j} className="border-b border-dashed border-line">
                          <td className="py-1.5">{c.name || c.code} <span className="text-ink-soft">({c.code})</span></td>
                          <td className="py-1.5 text-right font-mono text-ink-soft">{c.quantity} g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-[13.5px] text-ink-soft">No colorant breakdown on file for this finish.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-ink-soft">No tinting formula on file for this colour yet — ask in-store for a manual match.</p>
          )}
        </div>
      </div>
    </div>
  );
}
