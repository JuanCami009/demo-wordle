import Cell from "./Cell";

export default function Row({ text = "", mask = [], columns = 5 }) {
  const letters = text.padEnd(columns).slice(0, columns).split("");
  const cells = Array.from({ length: columns }, (_, i) => ({ ch: letters[i] || "", m: mask[i] || "" }));

  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, 3rem)` }} // 3rem = 48px aprox
    >
      {cells.map((c, i) => <Cell key={i} char={c.ch} mask={c.m} />)}
    </div>
  );
}
