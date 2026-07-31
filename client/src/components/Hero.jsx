const CHIPS = [
  { code: '2368T', name: 'Horizon Blue', color: '#e3bd98', rotate: -18 },
  { code: '10BB13/362', name: 'Ships at Sea', color: '#9e7000', rotate: -13 },
  { code: '1M3-8', name: 'Par Three', color: '#5d9e34', rotate: -8 },
  { code: '373C', name: 'Pantone', color: '#8ce8d9', rotate: -3 },
  { code: '06 E 50', name: 'British Standard', color: '#7ab9ff', rotate: 2 },
  { code: '1E1-6', name: 'Watermelon Wish', color: '#9289f0', rotate: 7 },
  { code: '2271T', name: 'Cupid', color: '#cb9cdd', rotate: 12 },
  { code: '2645C', name: 'Pantone', color: '#db9aa0', rotate: 17 },
];

export default function Hero() {
  return (
    <section className="overflow-hidden py-18 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-7 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-2.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.12em] text-accent">
            Nairobi &middot; Custom tinting since day one
          </p>
          <h1 className="mb-5 font-display text-[40px] font-semibold leading-[1.02] tracking-tight sm:text-[52px] lg:text-[64px]">
            Every colour,<br />mixed to match.
          </h1>
          <p className="mb-8 max-w-[46ch] text-lg text-ink-soft">
            Search our full colour library — RAL, NCS, Pantone, British Standard and more — and we'll tint it fresh, on the spot, in the finish you need.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a href="#search" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-dark">
              Search a colour code
            </a>
            <a href="#products" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink">
              See our finishes
            </a>
          </div>
        </div>

        <div className="group relative flex h-[260px] items-center justify-center md:h-[340px]" aria-hidden="true">
          {CHIPS.map((chip, i) => (
            <div
              key={i}
              className="chip absolute flex h-[170px] w-[76px] flex-col justify-end rounded-lg border border-black/5 px-2.5 py-3 shadow-[0_1px_2px_rgba(28,26,23,0.06),0_8px_24px_-12px_rgba(28,26,23,0.18)] hover:z-10 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)] md:h-[220px] md:w-24"
              style={{ backgroundColor: chip.color, transform: `rotate(${chip.rotate}deg)` }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = `rotate(${chip.rotate}deg) translateY(-26px)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = `rotate(${chip.rotate}deg)`; }}
            >
              <span className="block font-mono text-[10.5px] font-semibold text-black/65">{chip.code}</span>
              <span className="mt-0.5 block font-mono text-[9px] text-black/50">{chip.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
