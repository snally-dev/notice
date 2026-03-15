# Notice

Notice is a small playful web app: a 3×3 outdoor observation board that encourages you to step away from your screen and pay attention to the world around you.

## Why I made this

Notice was built for the [CodeTV](https://codetv.dev/) Web Dev Challenge [Hackathon](https://codetv.dev/hackathon/wdc-s3e1-playful-apps), Season 3 Episode 1. The prompt was “Build a playful app,” and I wanted to create something calm, simple, and meant to be used outside.

## Features

- Randomized 3×3 bingo board with outdoor prompts
- Free center square
- Built-in timer
- Win detection for rows, columns, and diagonals
- Confetti celebration on a completed line
- Quick restart for a fresh board

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- canvas-confetti

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` start the Vite dev server
- `npm run build` build for production
- `npm run preview` preview the production build
- `npm run lint` run `oxlint`
- `npm run lint:fix` run `oxlint --fix`
- `npm run fmt` run `oxfmt`
- `npm run fmt:check` check formatting with `oxfmt`

## Challenge context

Built for the CodeTV Web Dev Challenge (Season 3, Episode 1).

Prompt: “Build a playful app.”
Brief: “Build an app to help people reconnect with the world outside their screens.”

Challenge page: [https://codetv.dev/hackathon/wdc-s3e1-playful-apps](https://codetv.dev/hackathon/wdc-s3e1-playful-apps)

## Future improvements

- Larger prompt library and themed boards
- Accessibility improvements for input, contrast, and motion
- Optional score history or personal best tracking
- Light sound design or haptics for completed squares
