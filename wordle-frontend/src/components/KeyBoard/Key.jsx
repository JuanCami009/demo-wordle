const styleByState = {
  idle: "bg-slate-200 hover:bg-slate-300 text-slate-900",
  hit: "bg-green-600 text-white",
  present: "bg-yellow-500 text-white",
  miss: "bg-gray-500 text-white",
};

export default function Key({ label, onClick, state = "idle", wide = false, disabled }) {
  const color = styleByState[state] ?? styleByState.idle;
  const size = wide
    ? "min-w-[84px] h-11 px-3"
    : "min-w-[40px] h-11 px-2";

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      onClick={onClick}
      className={`select-none rounded-md text-sm font-semibold ${size} transition active:scale-[.98] ${color} disabled:opacity-50`}
    >
      {label}
    </button>
  );
}
