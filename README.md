# Notice

Notice is a small playful web app: a 3×3 outdoor observation board that encourages you to step away from your screen and pay attention to the world around you.

## Why I made this

Notice was built for the [CodeTV](https://codetv.dev/) Web Dev Challenge [Hackathon](https://codetv.dev/hackathon/wdc-s3e1-playful-apps), Season 3 Episode 1.

The prompt was **“Build a playful app.”** I wanted to create something calm, simple, and intentionally designed to be used outside.

## Design goals

- **Encourage stepping away from screens** — the app is meant to be used outdoors.
- **Simple and calm interaction** — minimal UI so attention stays on the environment.
- **Playful but lightweight** — quick to start, quick to restart, no accounts or setup.

## AI-assisted development

As part of the challenge, I experimented with Google’s AI development tools.

- **[Jules](https://jules.google/)** was used as a coding teammate to review the implementation, identify small improvements, and suggest minor accessibility and code clarity refinements.
- **[Stitch](https://stitch.withgoogle.com/)** was used to explore layout and spacing ideas and help polish parts of the interface.

Only small improvements from these tools were incorporated to keep the app simple and maintainable.

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

Built for the **CodeTV Web Dev Challenge (Season 3, Episode 1)**.

Prompt:

> “Build a playful app.”

The goal of the challenge was to create something interactive that encourages play and exploration.

Challenge page:
[https://codetv.dev/hackathon/wdc-s3e1-playful-apps](https://codetv.dev/hackathon/wdc-s3e1-playful-apps)

## Future improvements

- Larger prompt library and themed boards
- Accessibility improvements for input, contrast, and motion
- Optional score history or personal best tracking
- Light sound design or haptics for completed squares
