export default function Header({ onReset }) {
  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-bold tracking-wide">Wordle • FastAPI</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          Nuevo juego
        </button>
      </div>
    </header>
  );
}
