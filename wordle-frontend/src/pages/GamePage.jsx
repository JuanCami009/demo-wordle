// src/pages/GamePage.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import Header from "../components/Header";
import StatusBar from "../components/StatusBar";
import AttemptsCounter from "../components/AttemptsCounter";
import GameBoard from "../components/GameBoard/GameBoard";
import Keyboard from "../components/KeyBoard/KeyBoard";
import Loading from "../components/Loading";

import { createGame } from "../services/gameService";
import { submitGuess } from "../services/guessService";

const KEY_PRIORITY = { idle: 0, miss: 1, present: 2, hit: 3 };
const onlyLetters = (s) => s.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, "");
const norm = (s) => s.toUpperCase();

function mergeKeyState(prev, next) {
  return KEY_PRIORITY[next] > KEY_PRIORITY[prev ?? "idle"] ? next : (prev ?? next);
}
function accumulateKeyStates(keyStates, guessText, mask) {
  const upd = { ...keyStates };
  for (let i = 0; i < guessText.length; i++) {
    const ch = guessText[i];
    const m = mask[i];
    const next = m === "G" ? "hit" : m === "Y" ? "present" : m === "B" ? "miss" : "idle";
    upd[ch] = mergeKeyState(upd[ch], next);
  }
  return upd;
}

export default function GamePage() {
  const [game, setGame] = useState(null);
  const [rows, setRows] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [keyStates, setKeyStates] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "info" });

  const columns = useMemo(() => game?.solution_len ?? 5, [game]);

  const startNewGame = useCallback(async () => {
    setLoading(true);
    try {
      const g = await createGame();
      setGame(g);
      setRows([]);
      setCurrentGuess("");
      setKeyStates({});
      setMsg({ text: "", type: "info" });
    } catch {
      setMsg({ text: "No se pudo crear la partida", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const canType = game && game.status === "playing" && !loading;

  const handleKey = useCallback(
    (letter) => {
      if (!canType) return;
      const up = norm(onlyLetters(letter));
      if (!up) return;
      if (currentGuess.length >= columns) return;
      setCurrentGuess((s) => (s + up).slice(0, columns));
    },
    [canType, currentGuess.length, columns]
  );

  const handleBackspace = useCallback(() => {
    if (!canType) return;
    setCurrentGuess((s) => s.slice(0, -1));
  }, [canType]);

  const handleEnter = useCallback(async () => {
    if (!canType) return;
    if (currentGuess.length !== columns) {
      setMsg({ text: `La palabra debe tener ${columns} letras`, type: "warning" });
      return;
    }
    setLoading(true);
    try {
      const res = await submitGuess(game.id, norm(currentGuess));
      const played = norm(currentGuess);
      setRows((r) => [...r, { text: played, mask: res.mask }]);
      setKeyStates((ks) => accumulateKeyStates(ks, played, res.mask));
      setGame((g) => ({ ...g, attempts_left: res.attempts_left, status: res.status }));
      setCurrentGuess("");
      if (res.status === "won") setMsg({ text: "¡Ganaste!", type: "success" });
      else if (res.status === "lost") setMsg({ text: "Perdiste", type: "error" });
      else setMsg({ text: "", type: "info" });
    } catch {
      setMsg({ text: "Palabra inválida o error del servidor", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [canType, currentGuess, columns, game?.id]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === "Enter") {
        e.preventDefault();
        handleEnter();
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
        return;
      }

      const letter = e.key.toUpperCase();
      if (/^[A-ZÑÁÉÍÓÚÜ]$/.test(letter)) {
        e.preventDefault();
        handleKey(letter);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleEnter, handleBackspace, handleKey]);

  const visualRows = useMemo(() => {
    const vr = [...rows];
    if (game?.status === "playing") vr.push({ text: currentGuess, mask: [] });
    return vr;
  }, [rows, currentGuess, game]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header onReset={startNewGame} />

      <main className="pt-6">
        <div className="mx-auto w-[20rem] px-2 flex flex-col items-center">
          <div className="w-full">
            <StatusBar message={msg.text} type={msg.type} />
            {game && <AttemptsCounter attemptsLeft={game.attempts_left} />}
            {loading && <Loading />}
          </div>

          <section className="mt-4 w-full flex justify-center">
            <GameBoard rows={visualRows} columns={columns} maxRows={6} />
          </section>

          <div className="w-full">
            <Keyboard
              disabled={!canType}
              keyStates={keyStates}
              onKey={handleKey}
              onEnter={handleEnter}
              onBackspace={handleBackspace}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
