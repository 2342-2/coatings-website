export default function Footer() {
  return (
    <footer className="border-t border-line py-6.5">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-7 text-[13px] text-ink-soft">
        <span>&copy; {new Date().getFullYear()} Maridadi Coatings, Nairobi.</span>
        <span>Colour data for reference — final match confirmed in-store.</span>
      </div>
    </footer>
  );
}
