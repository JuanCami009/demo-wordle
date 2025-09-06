import Key from "./Key";

const rows = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"],
];

export default function Keyboard({
  onKey,
  onEnter,
  onBackspace,
  keyStates = {},
  disabled = false,
}) {
  const handlePress = (label) => {
    if (disabled) return;
    if (label === "ENTER") onEnter?.();
    else if (label === "⌫") onBackspace?.();
    else onKey?.(label);
  };

  return (
    <div className="mt-5 space-y-2">
      {rows.map((row, rIdx) => (
        <div
          key={rIdx}
          className="grid grid-cols-10 gap-2 justify-items-center"
        >
          {row.map((label) => {
            const wide = label === "ENTER" || label === "⌫";
            const keyLabel = label === "⌫" ? "Backspace" : label;
            const state =
              keyStates[label] ??
              (label.length === 1 ? "idle" : "idle");

            return (
              <Key
                key={label}
                label={label}
                state={state}
                wide={wide}
                disabled={disabled}
                onClick={() => handlePress(keyLabel)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
