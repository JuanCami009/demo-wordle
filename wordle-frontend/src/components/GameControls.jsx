export default function GameControls({ onNewGame, disabled }) {
  return (
    <div className="mt-3 flex gap-2">
      <button
        onClick={onNewGame}
        disabled={disabled}
        className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50 disabled:opacity-50"
      >
        Nuevo juego
      </button>
    </div>
  );
}
