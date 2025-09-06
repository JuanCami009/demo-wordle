const styleByState = {
  idle: "bg-slate-200 hover:bg-slate-300 text-slate-900",
  hit: "bg-green-600 text-white",
  present: "bg-yellow-500 text-white",
  miss: "bg-gray-500 text-white",
};

export default function Key({ label, onClick, state = "idle", wide = false, disabled }) {
  const base =
    "select-none rounded-md text-sm font-semibold px-3 py-2 transition active:scale-[.98]";
  const width = wide ? "col-span-2" : "col-span-1";
  const color = styleByState[state] ?? styleByState.idle;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      onClick={onClick}
      className={`${base} ${width} ${color} disabled:opacity-50`}
    >
      {label}
    </button>
  );
}
