// src/components/Board.jsx
// -----------------------------------------------------------------------------
// The game board is six rows stacked vertically.
//
// Its job is to figure out, for each of the 6 rows, WHICH state that row is in
// and hand the right data down to the <Row /> component:
//   - Rows BEFORE the current turn  -> a submitted guess (coloured).
//   - The row AT the current turn   -> the live text being typed.
//   - Rows AFTER the current turn   -> empty.
// -----------------------------------------------------------------------------

import Row from './Row';
import { GAME_STATUS, MAX_TURNS, WORD_LENGTH } from '../hooks/useWordle';

export default function GameBoard({
  currentGuess,
  pastGuesses,
  evaluations,
  gameStatus,
}) {
  return (
    <div className="board" role="grid" aria-label="Wordle game board">
      {Array.from({ length: MAX_TURNS }).map((_, index) => {
        const isCurrentRow =
          index === pastGuesses.length &&
          gameStatus === GAME_STATUS.IN_PROGRESS;

        return (
          <Row
            key={index}
            guess={pastGuesses[index] || ''}
            evaluation={evaluations[index]}
            letters={isCurrentRow ? currentGuess : ''}
            tileCount={WORD_LENGTH}
          />
        );
      })}
    </div>
  );
}
