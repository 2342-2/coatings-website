const PRODUCTS = [
  { name: 'Super Gloss Enamel', color: '#e8e2d3', desc: 'A hard, reflective finish for doors, frames and trim that takes daily wear.' },
  { name: 'Eggshell Enamel', color: '#d7cdb8', desc: 'A low-sheen enamel for interior woodwork where a softer glow suits the room.' },
  { name: 'Luxury Silk Emulsion', color: '#c9b9a3', desc: 'A smooth, washable wall finish with a gentle sheen for living spaces.' },
  { name: 'Luxury Gloss Emulsion', color: '#e0d4b8', desc: 'A brighter, more reflective wall emulsion for spaces that want to catch the light.' },
  { name: 'Vinyl Matt Premium Emulsion', color: '#ded6c4', desc: 'A flat, forgiving matt finish that hides wall imperfections on ceilings and walls.' },
];

export default function Products() {
  return (
    <section id="products" className="py-22">
      <div className="mx-auto max-w-6xl px-7">
        <p className="mb-2.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.12em] text-accent">Product range</p>
        <h2 className="max-w-[20ch] font-display text-[28px] font-semibold sm:text-[38px]">Five finishes, three bases, any colour.</h2>
        <p className="mt-3 max-w-[58ch] text-[17px] text-ink-soft">
          Every finish below is tinted to order from the same colour library, in bases A, B and C, in 1L, 4L and 20L cans.
        </p>
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PRODUCTS.map((p) => (
            <article key={p.name} className="rounded-[10px] border border-line bg-white px-5 py-5.5">
              <div className="mb-4 h-10 w-10 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]" style={{ backgroundColor: p.color }} />
              <h3 className="mb-2 text-[17px] font-semibold">{p.name}</h3>
              <p className="text-[14.5px] text-ink-soft">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
