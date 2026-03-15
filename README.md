# Notice

Notice is a small playful web app: a 3×3 outdoor observation board that encourages you to step away from your screen and pay attention to the world around you. Complete a row, column, or diagonal by noticing things around you.

It turns a quick moment outside into a small game of observation.

## Why I made this

Notice was built for the [CodeTV](https://codetv.dev/) Web Dev Challenge [Hackathon](https://codetv.dev/hackathon/wdc-s3e1-playful-apps), Season 3 Episode 1.

The prompt was **“Build a playful app.”** I wanted to create something calm, simple, and intentionally designed to be used outside. I really enjoyed this challenge and look forward to using the app myself as an excuse to step outside and notice more of the world around me.

## Design goals

- **Encourage stepping away from screens** — the app is meant to be used outdoors.
- **Simple and calm interaction** — minimal UI so attention stays on the environment.
- **Playful but lightweight** — quick to start, quick to restart, no accounts or setup.

## AI-assisted development

The challenge encouraged participants to explore Google’s new AI development tools, and it was a great opportunity to experiment with them during development.

- **[Jules](https://jules.google/)** worked like a coding teammate, helping review the implementation, surface small improvements, and suggest minor accessibility and code clarity refinements.
- **[Stitch](https://stitch.withgoogle.com/)** was a surprisingly helpful way to explore layout and spacing ideas while polishing parts of the interface.

These tools were genuinely fun to use and made it easy to iterate quickly while still keeping the app simple and maintainable.

## Features

- Randomized 3×3 bingo board with outdoor prompts
- Free center square
- Built-in timer
- Win detection for rows, columns, and diagonals
- Confetti celebration on a completed line
- Subtle haptic feedback on win (Vibration API)
- Native share support on mobile (Web Share API)
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

In the meantime, I plan to keep using the app as a small reminder to step outside and notice the details around me.
