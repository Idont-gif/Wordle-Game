import { useCallback, useRef, useState } from 'react';
import { checkGuess } from '../utils/checkGuess';

export const WORD_LENGTH = 5;
export const MAX_TURNS = 6;
export const GAME_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS',
  WON: 'WON',
  LOST: 'LOST',
};

const STATUS_RANK = {
  absent: 1,
  present: 2,
  correct: 3,
};

export function useWordle(solutionWord) {
  const [currentGuess, setCurrentGuess] = useState('');
  const [pastGuesses, setPastGuesses] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.IN_PROGRESS);
  const [usedKeys, setUsedKeys] = useState({});
  const [inputError, setInputError] = useState('');
  const lastSubmittedTurn = useRef(null);

  const resetGame = useCallback(() => {
    setCurrentGuess('');
    setPastGuesses([]);
    setEvaluations([]);
    setGameStatus(GAME_STATUS.IN_PROGRESS);
    setUsedKeys({});
    setInputError('');
    lastSubmittedTurn.current = null;
  }, []);

  const submitGuess = useCallback(() => {
    if (gameStatus !== GAME_STATUS.IN_PROGRESS) return;

    if (currentGuess.length !== WORD_LENGTH) {
      setInputError('Enter 5 letters before submitting.');
      return;
    }

    const turn = pastGuesses.length;
    if (lastSubmittedTurn.current === turn) return;
    lastSubmittedTurn.current = turn;

    const evaluation = checkGuess(currentGuess, solutionWord);
    const nextGuesses = [...pastGuesses, currentGuess];
    setPastGuesses(nextGuesses);
    setEvaluations((previous) => [...previous, evaluation]);
    setCurrentGuess('');
    setInputError('');

    setUsedKeys((previous) => {
      const next = { ...previous };
      evaluation.forEach(({ letter, status }) => {
        if (STATUS_RANK[status] > (STATUS_RANK[next[letter]] || 0)) {
          next[letter] = status;
        }
      });
      return next;
    });

    if (currentGuess === solutionWord) {
      setGameStatus(GAME_STATUS.WON);
    } else if (nextGuesses.length === MAX_TURNS) {
      setGameStatus(GAME_STATUS.LOST);
    }
  }, [currentGuess, gameStatus, pastGuesses, solutionWord]);

  const handleKeyInput = useCallback(
    (key) => {
      if (gameStatus !== GAME_STATUS.IN_PROGRESS) return;

      if (key === 'Enter') {
        submitGuess();
      } else if (key === 'Backspace') {
        setCurrentGuess((previous) => previous.slice(0, -1));
        setInputError('');
      } else if (/^[a-z]$/i.test(key)) {
        setCurrentGuess((previous) =>
          previous.length < WORD_LENGTH
            ? previous + key.toLowerCase()
            : previous
        );
        setInputError('');
      }
    },
    [gameStatus, submitGuess]
  );

  return {
    currentGuess,
    pastGuesses,
    evaluations,
    gameStatus,
    usedKeys,
    inputError,
    handleKeyInput,
    resetGame,
  };
}
