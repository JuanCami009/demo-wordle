export default function Header({ onReset }) {
  return (
    <header className="sticky top-0 z-20 border-b border-green-600/30 bg-green-500/90 backdrop-blur">
      <div className="mx-auto max-w-3xl px-4">
        <div className="grid grid-cols-3 items-center py-3">
          <div className="h-9" />
          <h1 className="justify-self-center text-3xl sm:text-4xl font-extrabold tracking-wide text-white">
            Wordle
          </h1>

          <div className="justify-self-end">
            <button
              onClick={onReset}
              className="h-9 px-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              Nuevo juego
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
