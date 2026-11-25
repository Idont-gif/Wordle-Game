// src/App.jsx
// -----------------------------------------------------------------------------
// THE TOP-LEVEL COMPONENT that assembles the whole game.
//
// Think of App as the "conductor of the orchestra". It:
//   1. Picks the secret answer.
//   2. Calls our useWordle hook to get the game state + input handler.
//   3. Listens for real (physical) keyboard presses.
//   4. Renders the Board and Keyboard.
//   5. Shows a win/lose message and a "Play Again" button when the game ends.
// -----------------------------------------------------------------------------

import { useCallback, useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import GameOverModal from './components/GameOverModal';
import Keyboard from './components/Keyboard';
import { GAME_STATUS, useWordle } from './hooks/useWordle';
import { getRandomWord } from './data/words';
import './App.css';

export default function App() {
  const [solutionWord, setSolutionWord] = useState(() => getRandomWord());
  const {
    currentGuess,
    pastGuesses,
    evaluations,
    gameStatus,
    usedKeys,
    inputError,
    handleKeyInput,
    resetGame,
  } = useWordle(solutionWord);

  const onPhysicalKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (
        event.key === 'Enter' ||
        event.key === 'Backspace' ||
        /^[a-z]$/i.test(event.key)
      ) {
        event.preventDefault();
        handleKeyInput(event.key);
      }
    },
    [handleKeyInput]
  );

  useEffect(() => {
    if (gameStatus !== GAME_STATUS.IN_PROGRESS) return undefined;
    window.addEventListener('keydown', onPhysicalKeyDown);
    return () => window.removeEventListener('keydown', onPhysicalKeyDown);
  }, [gameStatus, onPhysicalKeyDown]);

  const handlePlayAgain = () => {
    resetGame();
    setSolutionWord(getRandomWord());
  };

  return (
    <main className="app">
      <header className="game-header">
        <h1>Wordle</h1>
        <p className="subtitle">Guess the 5-letter word in 6 tries</p>
      </header>

      <GameBoard
        currentGuess={currentGuess}
        pastGuesses={pastGuesses}
        evaluations={evaluations}
        gameStatus={gameStatus}
      />
      <p className="input-error" role="status" aria-live="polite">
        {inputError}
      </p>
      <Keyboard
        usedKeys={usedKeys}
        onKeyPress={handleKeyInput}
        disabled={gameStatus !== GAME_STATUS.IN_PROGRESS}
      />

      {gameStatus !== GAME_STATUS.IN_PROGRESS && (
        <GameOverModal
          won={gameStatus === GAME_STATUS.WON}
          solutionWord={solutionWord}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </main>
  );
}
