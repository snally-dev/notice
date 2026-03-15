import confetti from "canvas-confetti";
import { useEffect, useMemo, useRef, useState } from "react";

import noticeLogo from "./assets/notice-logo.png";

type BingoSquare = {
  prompt: Prompt;
  marked: boolean;
};

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

type Prompt = {
  verb: "Find" | "Hear" | "Touch" | "Notice" | "See" | "Spot" | "Feel" | "FREE";
  text: string;
};

const PROMPTS: readonly Prompt[] = [
  { verb: "Feel", text: "a change in the wind" },
  { verb: "Feel", text: "a surface that vibrates" },
  { verb: "Feel", text: "sunlight meet shade" },
  { verb: "Feel", text: "the coolest surface nearby" },
  { verb: "Feel", text: "the warmest surface nearby" },
  { verb: "Find", text: "a repeating pattern" },
  { verb: "Find", text: "something casting a strange shadow" },
  { verb: "Find", text: "something older than nearby buildings" },
  { verb: "Find", text: "something shaped by weather" },
  { verb: "Find", text: "something symmetrical" },
  { verb: "Find", text: "something unexpectedly textured" },
  { verb: "Hear", text: "a repeating rhythm" },
  { verb: "Hear", text: "a sound carried by wind" },
  { verb: "Hear", text: "a sound you can't identify" },
  { verb: "Hear", text: "the quietest sound around you" },
  { verb: "Hear", text: "two sounds at once" },
  { verb: "Notice", text: "a detail most miss" },
  { verb: "Notice", text: "light changing on a surface" },
  { verb: "Notice", text: "nature meeting design" },
  { verb: "Notice", text: "something slowly changing" },
  { verb: "Notice", text: "very slow movement" },
  { verb: "See", text: "a shifting shadow" },
  { verb: "See", text: "contrasting textures" },
  { verb: "See", text: "light through something thin" },
  { verb: "See", text: "movement in the distance" },
  { verb: "See", text: "something reflecting the sky" },
  { verb: "Spot", text: "a hidden detail" },
  { verb: "Spot", text: "a pattern repeating three times" },
  { verb: "Spot", text: "a small imperfection" },
  { verb: "Spot", text: "something tiny" },
  { verb: "Touch", text: "a slightly damp surface" },
  { verb: "Touch", text: "a sun-warmed surface" },
  { verb: "Touch", text: "something deeply textured" },
  { verb: "Touch", text: "something unexpectedly smooth" },
] as const;

function shufflePrompts(prompts: readonly Prompt[]): Prompt[] {
  const shuffledPrompts = [...prompts];

  for (let currentIndex = shuffledPrompts.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    [shuffledPrompts[currentIndex], shuffledPrompts[randomIndex]] = [
      shuffledPrompts[randomIndex],
      shuffledPrompts[currentIndex],
    ];
  }

  return shuffledPrompts;
}

function createSquares(): BingoSquare[] {
  const prompts = shufflePrompts(PROMPTS).slice(0, 8);
  const boardPrompts: Prompt[] = [
    ...prompts.slice(0, 4),
    { verb: "FREE", text: "" },
    ...prompts.slice(4),
  ];

  return boardPrompts.map((prompt, index) => ({
    prompt,
    marked: index === 4,
  }));
}

function checkWin(squares: BingoSquare[]): boolean {
  return WINNING_LINES.some((line) => line.every((index) => squares[index]?.marked));
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function App() {
  const [squares, setSquares] = useState<BingoSquare[]>(() => createSquares());
  const [timer, setTimer] = useState(0);

  const hasWon = useMemo(() => checkWin(squares), [squares]);
  const hasCelebratedRef = useRef(false);

  useEffect(() => {
    if (hasWon) {
      return;
    }

    const interval = window.setInterval(() => {
      setTimer((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [hasWon]);

  useEffect(() => {
    if (!hasWon || hasCelebratedRef.current) return;

    hasCelebratedRef.current = true;

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([30, 40, 120]);
    }

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
    });
  }, [hasWon]);

  function toggleSquare(indexToToggle: number) {
    const square = squares[indexToToggle];
    if (!square || hasWon || square.prompt.verb === "FREE") {
      return;
    }

    setSquares((prevSquares) =>
      prevSquares.map((currentSquare, index) =>
        index === indexToToggle
          ? { ...currentSquare, marked: !currentSquare.marked }
          : currentSquare,
      ),
    );
  }

  function restartGame() {
    setSquares(createSquares());
    setTimer(0);
    hasCelebratedRef.current = false;
  }

  async function handleShare() {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: "Notice Outside",
        text: `I just completed a Notice Outside board in ${formatTime(timer)}.`,
        url: window.location.href,
      });
    } catch {
      // user cancelled share
    }
  }

  return (
    <main className="bg-notice-bg text-notice-text flex min-h-screen flex-col px-6 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center">
        <header className="mb-12 flex flex-col items-center text-center">
          <img src={noticeLogo} alt="Notice" className="mb-4 h-auto w-24 opacity-90 sm:w-28" />
          <h1 className="text-notice-accent text-3xl font-bold tracking-tight sm:text-4xl">
            Notice Outside
          </h1>
          <p className="text-notice-muted mt-3 max-w-xs text-sm leading-relaxed sm:text-base">
            Step outside and notice the little things.
          </p>
        </header>

        <div
          className="grid w-full grid-cols-3 gap-3 sm:gap-4"
          role="grid"
          aria-label="Bingo Board"
        >
          {[0, 1, 2].map((rowIndex) => (
            <div key={rowIndex} role="row" className="contents">
              {squares.slice(rowIndex * 3, rowIndex * 3 + 3).map((square, colIndex) => {
                const index = rowIndex * 3 + colIndex;
                const isFreeSquare = square.prompt.verb === "FREE";

                const buttonClassName = [
                  "flex aspect-square w-full items-center justify-center rounded-xl border-2 p-3 text-center text-xs shadow-sm transition-all duration-300 ease-out sm:p-4 sm:text-sm",
                  square.marked
                    ? "border-notice-accent bg-notice-accent text-notice-bg font-medium"
                    : "border-notice-border bg-notice-surface text-notice-text/80",
                  !isFreeSquare &&
                    !hasWon &&
                    "cursor-pointer hover:border-notice-accent/50 active:scale-95",
                  isFreeSquare && "border-notice-accent/40",
                  hasWon && !square.marked && "opacity-60",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <button
                    key={`${index}-${square.prompt.text}`}
                    type="button"
                    role="gridcell"
                    disabled={isFreeSquare || hasWon}
                    aria-pressed={square.marked}
                    className={buttonClassName}
                    onClick={() => toggleSquare(index)}
                  >
                    {isFreeSquare ? (
                      <span className="text-notice-bg font-semibold tracking-wider">FREE</span>
                    ) : (
                      <span>
                        <span className="font-bold opacity-100">{square.prompt.verb}</span>{" "}
                        <span className="font-normal">{square.prompt.text}</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center" role="status" aria-live="polite">
          {hasWon ? (
            <div className="animate-in fade-in zoom-in duration-500">
              <p className="text-notice-accent text-3xl font-bold tracking-tight sm:text-4xl">
                Bingo!
              </p>

              <p className="text-notice-muted mt-1 text-sm">Completed in {formatTime(timer)}</p>

              {typeof navigator !== "undefined" && "share" in navigator && (
                <button
                  type="button"
                  onClick={handleShare}
                  className="text-notice-accent mt-3 text-sm"
                >
                  Share ↗
                </button>
              )}
            </div>
          ) : (
            <p className="text-notice-muted font-mono text-xs tracking-widest uppercase">
              Time {formatTime(timer)}
            </p>
          )}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={restartGame}
            className="border-notice-accent text-notice-accent hover:bg-notice-accent hover:text-notice-bg rounded-full border px-8 py-2.5 text-sm font-medium transition-all duration-200"
          >
            New board
          </button>
        </div>
      </div>

      <footer className="text-notice-muted mt-auto pt-12 text-center text-[10px] tracking-wide uppercase opacity-60">
        Created for the WebDev Challenge:{" "}
        <a
          href="https://codetv.dev/hackathon/wdc-s3e1-playful-apps"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-notice-accent underline underline-offset-4 transition-colors"
        >
          S3E1 Playful Apps
        </a>
      </footer>
    </main>
  );
}

export default App;
