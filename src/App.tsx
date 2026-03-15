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
  { verb: "Feel", text: "a change in temperature" },
  { verb: "Feel", text: "sunlight on your face" },
  { verb: "Feel", text: "the air around you" },
  { verb: "Feel", text: "the breeze on your skin" },
  { verb: "Feel", text: "the ground beneath you" },
  { verb: "Find", text: "something bigger than your hand" },
  { verb: "Find", text: "something blue" },
  { verb: "Find", text: "something colorful" },
  { verb: "Find", text: "something interesting nearby" },
  { verb: "Find", text: "something older than you" },
  { verb: "Find", text: "something rough" },
  { verb: "Find", text: "something round" },
  { verb: "Find", text: "something smaller than your thumb" },
  { verb: "Find", text: "something soft" },
  { verb: "Find", text: "something square" },
  { verb: "Find", text: "something symmetrical" },
  { verb: "Find", text: "something textured" },
  { verb: "Find", text: "something wooden" },
  { verb: "Find", text: "something yellow" },
  { verb: "Hear", text: "a bird" },
  { verb: "Hear", text: "a distant sound" },
  { verb: "Hear", text: "an insect" },
  { verb: "Hear", text: "leaves rustling" },
  { verb: "Hear", text: "something far away" },
  { verb: "Hear", text: "the wind moving" },
  { verb: "Hear", text: "three sounds nearby" },
  { verb: "Hear", text: "two sounds at once" },
  { verb: "Notice", text: "a color you like" },
  { verb: "Notice", text: "a repeating pattern" },
  { verb: "Notice", text: "a small detail" },
  { verb: "Notice", text: "how the light changes" },
  { verb: "Notice", text: "something changing" },
  { verb: "Notice", text: "something moving" },
  { verb: "Notice", text: "something you usually ignore" },
  { verb: "See", text: "a moving shadow" },
  { verb: "See", text: "light through leaves" },
  { verb: "See", text: "something bright" },
  { verb: "See", text: "something growing" },
  { verb: "See", text: "something reflecting light" },
  { verb: "See", text: "something swaying in the wind" },
  { verb: "Spot", text: "a hidden detail" },
  { verb: "Spot", text: "slow movement" },
  { verb: "Spot", text: "something tiny" },
  { verb: "Spot", text: "something very still" },
  { verb: "Touch", text: "something cool" },
  { verb: "Touch", text: "something dry" },
  { verb: "Touch", text: "something rough" },
  { verb: "Touch", text: "something smooth" },
  { verb: "Touch", text: "something warm from the sun" },
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

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
    });
  }, [hasWon]);

  function toggleSquare(indexToToggle: number) {
    setSquares((prevSquares) =>
      prevSquares.map((square, index) =>
        index === indexToToggle ? { ...square, marked: !square.marked } : square,
      ),
    );
  }

  function restartGame() {
    setSquares(createSquares());
    setTimer(0);
    hasCelebratedRef.current = false;
  }

  return (
    <main className="bg-notice-bg text-notice-text flex min-h-screen flex-col px-4 py-6 sm:px-6">
      <div className="flex flex-1 flex-col items-center">
        <header className="mb-6 flex flex-col items-center text-center">
          <img src={noticeLogo} alt="Notice" className="mb-2 h-auto w-28 sm:w-32" />
          <h1 className="text-notice-accent text-2xl font-semibold sm:text-3xl">Notice Outside</h1>
          <p className="text-notice-accent mt-2 max-w-md text-sm sm:text-base">
            Step outside and notice the little things.
          </p>
        </header>

        <div
          className="grid w-full max-w-88 grid-cols-3 gap-3 sm:max-w-md sm:gap-4"
          aria-label="Bingo Grid"
        >
          {squares.map((square, index) => {
            const isFreeSquare = square.prompt.verb === "FREE";

            const buttonClassName = [
              "flex aspect-square w-full items-center justify-center rounded-lg border border-4 p-3 text-center text-xs shadow-md transition-all duration-200 ease-in-out sm:p-4 sm:text-sm",
              square.marked
                ? "border-notice-accent bg-notice-accent text-white"
                : "border-white/10 bg-notice-card text-notice-text",
              !isFreeSquare && !hasWon ? "cursor-pointer hover:scale-[1.02]" : "",
              isFreeSquare ? "border-notice-accent" : "",
              hasWon ? "opacity-90" : "",
            ].join(" ");

            return (
              <button
                key={`${index}-${square.prompt.text}`}
                type="button"
                disabled={isFreeSquare || hasWon}
                onClick={() => toggleSquare(index)}
                aria-pressed={square.marked}
                className={buttonClassName}
              >
                {isFreeSquare ? (
                  <span className="font-semibold tracking-wide">FREE</span>
                ) : (
                  <span>
                    <span className="font-semibold">{square.prompt.verb}</span> {square.prompt.text}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-center" role="status" aria-live="polite">
          {hasWon ? (
            <p className="bg-linear-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
              You won in {formatTime(timer)}
            </p>
          ) : (
            <p className="text-notice-accent text-sm">Time: {formatTime(timer)}</p>
          )}
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={restartGame}
            className="bg-notice-accent text-notice-bg rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
          >
            New board
          </button>
        </div>
      </div>

      <footer className="text-notice-accent pt-6 text-center text-xs">
        Created for the WebDev Challenge:{" "}
        <a
          href="https://codetv.dev/hackathon/wdc-s3e1-playful-apps"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          S3E1 Playful Apps
        </a>
        .
      </footer>
    </main>
  );
}

export default App;
