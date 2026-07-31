export default function About() {
  return (
    <section id="about" className="border-y border-line bg-bg-alt py-22">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-7 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-2.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.12em] text-accent">About us</p>
          <h2 className="mb-4 font-display text-[26px] font-semibold sm:text-[34px]">Colour, done properly.</h2>
          <p className="max-w-[52ch] text-base text-ink-soft">
            Maridadi Coatings is a Nairobi-based paint and coatings supplier. We tint every can to order from a colour library spanning international standards and custom shades, so what you see is what goes on the wall — matched, mixed and ready to collect.
          </p>
          <p className="mt-4 max-w-[52ch] text-base text-ink-soft">
            From single touch-up cans to full contract orders, our team measures, mixes and checks every batch before it leaves the shop.
          </p>
        </div>
        <dl className="grid gap-5.5 rounded-[10px] border border-line bg-white p-7">
          <div><dt className="font-display text-[30px] font-semibold text-accent">14,000+</dt><dd className="text-[13.5px] text-ink-soft">Colours in our library</dd></div>
          <div><dt className="font-display text-[30px] font-semibold text-accent">5</dt><dd className="text-[13.5px] text-ink-soft">Finishes</dd></div>
          <div><dt className="font-display text-[30px] font-semibold text-accent">3</dt><dd className="text-[13.5px] text-ink-soft">Tinting bases</dd></div>
        </dl>
      </div>
    </section>
  );
}
