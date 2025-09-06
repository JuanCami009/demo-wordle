const stylesByMask = {
  G: "bg-green-600 text-white border-green-600",
  Y: "bg-yellow-500 text-white border-yellow-500",
  B: "bg-gray-500 text-white border-gray-500",
  "": "bg-white text-slate-900 border-slate-300",
};

export default function Cell({ char = "", mask = "" }) {
  const cls = stylesByMask[mask] ?? stylesByMask[""];
  return (
    <div
      className={`w-12 h-12 grid place-items-center border-2 font-extrabold uppercase rounded-lg ${cls}`}
    >
      {char}
    </div>
  );
}
