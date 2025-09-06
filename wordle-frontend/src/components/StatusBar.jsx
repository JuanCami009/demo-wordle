export default function StatusBar({ message, type = "info" }) {
  if (!message) return null;

  const bg = {
    info: "bg-blue-50 text-blue-700 border-blue-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    error: "bg-red-50 text-red-700 border-red-200",
  }[type] || "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <div className={`my-2 border ${bg} px-3 py-2 rounded-xl text-sm`}>
      {message}
    </div>
  );
}
