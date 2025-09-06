export default function AttemptsCounter({ attemptsLeft }) {
  return (
    <p className="text-sm text-slate-600">
      Intentos restantes:{" "}
      <span className="font-semibold text-slate-900">{attemptsLeft}</span>
    </p>
  );
}
