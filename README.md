# Wordle React

A single-page, six-turn word guessing game built with React and Vite. Enter
letters with your physical keyboard or the on-screen keyboard, then submit a
five-letter guess to reveal its green, yellow, and gray letter statuses.

This project builds on the original
[wordle-react repository](https://github.com/aaditya-prog/wordle-react) and its
[React Wordle walkthrough](https://medium.com/@aaditya.dulal/how-wordle-works-building-the-game-with-react-13520be7eeaa?source=friends_link&sk=b049baded482376d79da604369f689ca).

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Gameplay

- The board has six rows of five tiles.
- Type letters, use Backspace to edit, and press Enter to submit.
- Green marks a correct letter and position; yellow marks a letter in another
  position; gray means the letter is not in the solution.
- Solve the word to win, or use all six guesses to reveal the answer.
- Select **Play Again** to start a new round without reloading the page.

## Project layout

```text
src/
├── App.jsx
├── App.css
├── index.css
├── components/
│   ├── GameBoard.jsx
│   ├── GameOverModal.jsx
│   ├── Keyboard.jsx
│   ├── Row.jsx
│   └── Tile.jsx
├── data/
│   └── words.js
├── hooks/
│   └── useWordle.js
└── utils/
    └── checkGuess.js
```
