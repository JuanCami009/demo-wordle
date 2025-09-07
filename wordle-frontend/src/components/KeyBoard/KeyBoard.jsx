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
    if (label === "ENTER") return onEnter?.();
    if (label === "⌫" || label === "Backspace") return onBackspace?.();
    if (label.length === 1) return onKey?.(label);
  };

  return (
    <div className="mt-6 w-full flex justify-center">
      <div className="space-y-2">
        {/* fila 1 */}
        <div className="flex justify-center gap-2">
          {rows[0].map((label) => (
            <Key
              key={label}
              label={label}
              state={keyStates[label] ?? (label.length === 1 ? "idle" : "idle")}
              onClick={() => handlePress(label)}
              disabled={disabled}
            />
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <div className="w-[22px]" />
          {rows[1].map((label) => (
            <Key
              key={label}
              label={label}
              state={keyStates[label] ?? "idle"}
              onClick={() => handlePress(label)}
              disabled={disabled}
            />
          ))}
          <div className="w-[22px]" />
        </div>

        <div className="flex justify-center gap-2">
          {rows[2].map((label) => (
            <Key
              key={label}
              label={label}
              wide={label === "ENTER" || label === "⌫"}
              state={keyStates[label] ?? "idle"}
              onClick={() => handlePress(label)}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
