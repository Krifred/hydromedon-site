export default function NavBar() {
  return (
    <header className="w-full py-6 border-b border-gray-200">
      <nav className="mx-auto max-w-5xl flex items-center justify-between px-4">
        <a href="/" className="text-lg font-semibold tracking-tight">
          Hydromedon
        </a>

        <div className="flex items-center space-x-6">
          <a
            href="/sheet-music"
            className="text-gray-700 hover:text-black transition"
          >
            Sheet Music
          </a>
        </div>
      </nav>
    </header>
  );
}
