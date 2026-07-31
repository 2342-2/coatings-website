import { useState } from 'react';

export default function Contact() {
  const [note, setNote] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setNote('Thanks — wire this form up to your email or CRM to go live.');
    e.target.reset();
  };
  return (
    <section id="contact" className="py-22">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-7 md:grid-cols-2">
        <div>
          <p className="mb-2.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.12em] text-accent">Get in touch</p>
          <h2 className="max-w-[18ch] font-display text-[26px] font-semibold sm:text-[34px]">Visit, call, or send us your colour code.</h2>
          <p className="mt-3 max-w-[58ch] text-[17px] italic text-gold">Placeholder details below — swap in your real address, phone and email.</p>
          <ul className="mt-6 grid gap-3.5">
            {[['Address','Industrial Area, Nairobi, Kenya'],['Phone','+254 7XX XXX XXX'],['Email','info@maridadicoatings.co.ke'],['Hours','Mon–Sat, 8:00–17:00']].map(([label,value]) => (
              <li key={label} className="flex flex-col text-[15.5px]">
                <span className="mb-0.5 font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-soft">{label}</span>
                {value}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="grid content-start gap-4">
          <label className="grid gap-1.5 text-[13.5px] font-medium text-ink-soft">Name
            <input type="text" name="name" required className="rounded-lg border-[1.5px] border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none focus:border-accent" />
          </label>
          <label className="grid gap-1.5 text-[13.5px] font-medium text-ink-soft">Email
            <input type="email" name="email" required className="rounded-lg border-[1.5px] border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none focus:border-accent" />
          </label>
          <label className="grid gap-1.5 text-[13.5px] font-medium text-ink-soft">Message
            <textarea name="message" rows={4} required className="resize-y rounded-lg border-[1.5px] border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none focus:border-accent" />
          </label>
          <button type="submit" className="justify-self-start rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-dark">Send message</button>
          <p className="min-h-[18px] text-[13px] text-accent">{note}</p>
        </form>
      </div>
    </section>
  );
}
