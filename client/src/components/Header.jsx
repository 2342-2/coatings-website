export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-7 py-4">
        <a href="#top" className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink no-underline">
          <span
            aria-hidden="true"
            className="h-3.5 w-3.5 flex-none rounded-full"
            style={{ background: 'conic-gradient(from 200deg, #2E4BD1, #E3A63E, #5d9e34, #db9aa0, #2E4BD1)' }}
          />
          Maridadi <span className="font-medium text-ink-soft">Coatings</span>
        </a>
        <nav aria-label="Primary" className="hidden gap-7 md:flex">
          <a href="#search" className="text-[15px] font-medium text-ink-soft hover:text-ink">Colour Search</a>
          <a href="#products" className="text-[15px] font-medium text-ink-soft hover:text-ink">Products</a>
          <a href="#about" className="text-[15px] font-medium text-ink-soft hover:text-ink">About</a>
          <a href="#contact" className="text-[15px] font-medium text-ink-soft hover:text-ink">Contact</a>
        </nav>
        <a href="#search" className="rounded-full bg-ink px-[18px] py-[9px] text-sm font-semibold text-bg transition hover:bg-accent">
          Find a colour
        </a>
      </div>
    </header>
  );
}
