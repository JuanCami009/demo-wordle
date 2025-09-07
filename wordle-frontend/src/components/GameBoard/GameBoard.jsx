import Row from "./Row";

export default function GameBoard({ rows = [], columns = 5, maxRows = 6 }) {
  const emptyRows = Array.from({ length: Math.max(0, maxRows - rows.length) }, () => ({ text: "", mask: [] }));
  const allRows = [...rows, ...emptyRows];

  return (
    <section className="space-y-2 flex flex-col items-center">
      {allRows.slice(0, maxRows).map((r, i) => (
        <Row key={i} text={r.text} mask={r.mask} columns={columns} />
      ))}
    </section>
  );
}
